import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from '@/lib/web3forms';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Daily Summary Email
 *
 * Call this endpoint to send a daily business summary to your inbox.
 * Protect with a secret key to prevent abuse.
 *
 * Set up a daily cron job (e.g. via Vercel Cron, cron-job.org, or GitHub Actions)
 * to hit: POST /api/daily-summary with header Authorization: Bearer <CRON_SECRET>
 */
export async function POST(req: Request) {
  // Simple auth check
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayISO = yesterday.toISOString();

    // Fetch today's data in parallel
    const [leadsRes, clientsRes, allClientsRes, todosRes, pipelineRes] = await Promise.all([
      // New leads in last 24h
      supabase.from('unified_leads').select('*').gte('timestamp', yesterdayISO).order('timestamp', { ascending: false }),
      // New clients in last 24h
      supabase.from('clients').select('*').gte('created_at', yesterdayISO),
      // All active clients (for MRR)
      supabase.from('clients').select('company_name, monthly_value, package_name, status').eq('status', 'active'),
      // Overdue or due-today todos
      supabase.from('todos').select('title, due_date, is_recurring, clients(company_name)').is('completed_at', null).lte('due_date', now.toISOString()).order('due_date'),
      // Pipeline leads (not Won/Lost)
      supabase.from('leads').select('business_name, stage, value').not('stage', 'in', '("Won","Lost")'),
    ]);

    const newLeads = leadsRes.data || [];
    const newClients = clientsRes.data || [];
    const activeClients = allClientsRes.data || [];
    const dueTodos = todosRes.data || [];
    const pipelineLeads = pipelineRes.data || [];

    // Calculate MRR
    const mrr = activeClients.reduce((sum, c) => sum + (parseFloat(c.monthly_value) || 0), 0);
    const pipelineValue = pipelineLeads.reduce((sum, l) => sum + (parseFloat(l.value) || 0), 0);

    // Build summary
    const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    let summary = `DAILY BUSINESS SUMMARY — ${dateStr}\n`;
    summary += `${'='.repeat(50)}\n\n`;

    // KPIs
    summary += `KEY METRICS\n`;
    summary += `Monthly Recurring Revenue: £${mrr.toLocaleString()}\n`;
    summary += `Annual Run Rate: £${(mrr * 12).toLocaleString()}\n`;
    summary += `Active Clients: ${activeClients.length}\n`;
    summary += `Pipeline Value: £${pipelineValue.toLocaleString()}\n`;
    summary += `Pipeline Leads: ${pipelineLeads.length}\n\n`;

    // New leads
    summary += `NEW LEADS (Last 24h): ${newLeads.length}\n`;
    if (newLeads.length > 0) {
      newLeads.forEach(l => {
        summary += `  - ${l.name || 'Unknown'} (${l.submission_type || 'N/A'}) — ${l.email || 'no email'}\n`;
      });
    } else {
      summary += `  No new leads in the last 24 hours.\n`;
    }
    summary += `\n`;

    // New clients
    summary += `NEW CLIENTS (Last 24h): ${newClients.length}\n`;
    if (newClients.length > 0) {
      newClients.forEach(c => {
        summary += `  - ${c.company_name} — £${parseFloat(c.monthly_value || 0).toLocaleString()}/mo\n`;
      });
    }
    summary += `\n`;

    // Due/overdue todos
    summary += `TASKS DUE/OVERDUE: ${dueTodos.length}\n`;
    if (dueTodos.length > 0) {
      dueTodos.slice(0, 10).forEach(t => {
        const client = (t as any).clients?.company_name;
        const dueDate = t.due_date ? new Date(t.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'No date';
        summary += `  - ${t.title}${client ? ` (${client})` : ''} — Due: ${dueDate}${t.is_recurring ? ' [Recurring]' : ''}\n`;
      });
    } else {
      summary += `  All clear — no tasks overdue.\n`;
    }
    summary += `\n`;

    // Pipeline breakdown
    summary += `PIPELINE BREAKDOWN\n`;
    const stages = ['New Lead', 'Contacted', 'Discovery Call', 'Proposal Sent'];
    stages.forEach(stage => {
      const count = pipelineLeads.filter(l => l.stage === stage).length;
      if (count > 0) {
        summary += `  ${stage}: ${count}\n`;
      }
    });
    summary += `\n`;

    // Client list
    summary += `ACTIVE CLIENT ROSTER (${activeClients.length})\n`;
    activeClients.forEach(c => {
      summary += `  - ${c.company_name}${c.package_name ? ` (${c.package_name})` : ''} — £${parseFloat(c.monthly_value || 0).toLocaleString()}/mo\n`;
    });

    summary += `\n${'='.repeat(50)}\n`;
    summary += `View Dashboard: https://businesssortedkent.co.uk/admin-dashboard\n`;

    await sendEmail(`BSK Daily Summary — ${dateStr}`, summary);

    return NextResponse.json({ success: true, message: 'Daily summary sent' });
  } catch (error: any) {
    console.error('Error generating daily summary:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
