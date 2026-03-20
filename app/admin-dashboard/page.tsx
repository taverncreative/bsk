'use client';

import { useState, useEffect } from 'react';
import { Users, PoundSterling, LayoutGrid, TrendingUp, ArrowUpRight, Activity, Clock, Plus, FileText, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function AdminOverview() {
  const [stats, setStats] = useState({ leads: 0, pipelineValue: 0, clients: 0, revenue: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    try {
      // Fetch all data in parallel
      const [leadsRes, clientsRes, invoicesRes, activityRes] = await Promise.all([
        supabase.from('leads').select('*'),
        supabase.from('clients').select('*'),
        supabase.from('invoices').select('*'),
        supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(10),
      ]);

      const leads = leadsRes.data || [];
      const clients = clientsRes.data || [];
      const invoices = invoicesRes.data || [];

      // Calculate stats
      const now = new Date();
      const thisMonth = leads.filter(l => {
        const d = new Date(l.created_at);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });

      const pipelineValue = leads
        .filter(l => l.stage !== 'Lost' && l.stage !== 'Won')
        .reduce((sum: number, l: any) => sum + (parseFloat(l.value) || 0), 0);

      const revenue = invoices
        .filter((i: any) => i.status === 'paid')
        .reduce((sum: number, i: any) => sum + (parseFloat(i.total) || 0), 0);

      setStats({
        leads: thisMonth.length,
        pipelineValue,
        clients: clients.filter((c: any) => c.status === 'active').length,
        revenue,
      });

      setRecentLeads(leads.slice(0, 5));
      setRecentActivity(activityRes.data || []);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin"></div>
      </div>
    );
  }

  const kpis = [
    { name: 'New Leads (This Month)', value: stats.leads.toString(), icon: TrendingUp, href: '/admin-dashboard/pipeline', color: 'text-blue-400' },
    { name: 'Pipeline Value', value: `£${stats.pipelineValue.toLocaleString()}`, icon: LayoutGrid, href: '/admin-dashboard/pipeline', color: 'text-purple-400' },
    { name: 'Active Clients', value: stats.clients.toString(), icon: Users, href: '/admin-dashboard/clients', color: 'text-green-400' },
    { name: 'Revenue (Paid)', value: `£${stats.revenue.toLocaleString()}`, icon: PoundSterling, href: '/admin-dashboard/invoices', color: 'text-brand-gold' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Agency Control Centre</h1>
        <div className="flex gap-3">
          <Link href="/admin-dashboard/pipeline" className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors text-sm">
            <Plus className="h-4 w-4 mr-2" /> Add Lead
          </Link>
          <Link href="/admin-dashboard/invoices" className="flex items-center px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg font-medium hover:border-brand-gold transition-colors text-sm">
            <FileText className="h-4 w-4 mr-2" /> New Invoice
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpis.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="relative bg-zinc-950 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors group"
          >
            <dt>
              <div className="absolute bg-brand-gold/20 rounded-md p-3">
                <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-zinc-400 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <ArrowRight className="ml-auto h-4 w-4 text-zinc-600 group-hover:text-brand-gold transition-colors" />
            </dd>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Pipeline Snapshot */}
        <div className="bg-zinc-950 shadow rounded-lg px-4 py-5 sm:p-6 border border-zinc-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg leading-6 font-medium text-white">Pipeline Snapshot</h2>
            <Link href="/admin-dashboard/pipeline" className="text-xs text-brand-gold hover:text-white transition-colors">View All →</Link>
          </div>
          <div className="flow-root">
            {recentLeads.length === 0 ? (
              <p className="text-sm text-zinc-500 py-4 text-center">No leads in pipeline yet.</p>
            ) : (
              <ul className="-my-5 divide-y divide-zinc-800">
                {recentLeads.map((lead) => (
                  <li key={lead.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{lead.business_name}</p>
                        <p className="text-sm text-zinc-400 truncate">
                          {lead.stage}
                          {lead.value && ` — £${parseFloat(lead.value).toLocaleString()}`}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lead.stage === 'Won' ? 'bg-green-900/50 text-green-200' :
                          lead.stage === 'Lost' ? 'bg-red-900/50 text-red-200' :
                          lead.stage === 'Proposal Sent' ? 'bg-purple-900/50 text-purple-200' :
                          'bg-blue-900/50 text-blue-200'
                        }`}>
                          {lead.stage}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-zinc-950 shadow rounded-lg px-4 py-5 sm:p-6 border border-zinc-800">
          <h2 className="text-lg leading-6 font-medium text-white mb-4">Recent Activity</h2>
          <div className="flow-root">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-zinc-500 py-4 text-center">No activity recorded yet.</p>
            ) : (
              <ul className="-mb-8">
                {recentActivity.slice(0, 6).map((event, idx) => (
                  <li key={event.id} className="relative pb-6">
                    {idx < recentActivity.length - 1 && (
                      <span className="absolute left-3 top-5 -ml-px h-full w-0.5 bg-zinc-800" aria-hidden="true" />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-6 w-6 rounded-full flex items-center justify-center ring-4 ring-zinc-950 ${
                          event.action === 'converted_from_lead' ? 'bg-green-900' :
                          event.action === 'stage_changed' ? 'bg-blue-900' :
                          event.action === 'invoice_sent' ? 'bg-purple-900' :
                          event.action === 'invoice_paid' ? 'bg-brand-gold/30' :
                          'bg-zinc-800'
                        }`}>
                          <Activity className="h-3 w-3 text-zinc-300" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-zinc-300">{event.description}</p>
                        <p className="mt-0.5 text-xs text-zinc-600">
                          {new Date(event.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
