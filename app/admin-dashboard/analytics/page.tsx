'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { BarChart3, Users, TrendingUp, Clock, Target, Loader2, PoundSterling, RefreshCw, FolderOpen } from 'lucide-react';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [elleLeads, setElleLeads] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const supabase = createClient();
    const [leadsRes, clientsRes, reportsRes, projectsRes, invoicesRes] = await Promise.all([
      supabase.from('leads').select('*').ilike('source', '%elle%'),
      supabase.from('clients').select('*'),
      supabase.from('reports').select('*, clients(company_name)'),
      supabase.from('projects').select('*, clients(company_name)'),
      supabase.from('invoices').select('*').eq('status', 'paid'),
    ]);

    if (leadsRes.data) setElleLeads(leadsRes.data);
    if (clientsRes.data) setClients(clientsRes.data);
    if (reportsRes.data) setReports(reportsRes.data);
    if (projectsRes.data) setProjects(projectsRes.data);
    if (invoicesRes.data) setInvoices(invoicesRes.data);

    setLoading(false);
  };

  // MRR from active clients
  const activeClients = clients.filter(c => c.status === 'active');
  const mrr = activeClients.reduce((sum, c) => sum + (parseFloat(c.monthly_value) || 0), 0);
  const arr = mrr * 12;

  // Project revenue
  const completedProjects = projects.filter(p => p.status === 'completed');
  const projectRevenue = completedProjects.reduce((sum, p) => sum + (parseFloat(p.value) || 0), 0);
  const activeProjectValue = projects.filter(p => p.status === 'in_progress').reduce((sum, p) => sum + (parseFloat(p.value) || 0), 0);

  // Invoice revenue
  const totalInvoiceRevenue = invoices.reduce((sum, i) => sum + (parseFloat(i.total) || 0), 0);

  // Elle leads
  const totalElleLeads = elleLeads.length;

  // Reports data
  const clientProfitMap: Record<string, number> = {};
  const clientHoursMap: Record<string, number> = {};
  reports.forEach((r) => {
    const cid = r.client_id;
    clientProfitMap[cid] = (clientProfitMap[cid] || 0) + Number(r.profit || 0);
    clientHoursMap[cid] = (clientHoursMap[cid] || 0) + Number(r.hours_spent || 0);
  });

  return (
    <div className="flex flex-col h-full bg-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Central Analytics</h1>
        <p className="text-sm text-zinc-400">Revenue breakdown, MRR tracking, project analytics, and client profitability.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12 text-zinc-500">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">

          {/* Revenue KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><RefreshCw className="w-16 h-16 text-brand-gold" /></div>
              <p className="text-sm font-medium text-zinc-400 mb-1">Monthly Recurring Revenue</p>
              <p className="text-3xl font-bold text-brand-gold">£{mrr.toLocaleString()}</p>
              <p className="text-xs text-zinc-600 mt-1">ARR: £{arr.toLocaleString()}</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><FolderOpen className="w-16 h-16 text-purple-500" /></div>
              <p className="text-sm font-medium text-zinc-400 mb-1">Project Revenue</p>
              <p className="text-3xl font-bold text-white">£{projectRevenue.toLocaleString()}</p>
              <p className="text-xs text-zinc-600 mt-1">{completedProjects.length} completed</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><PoundSterling className="w-16 h-16 text-green-500" /></div>
              <p className="text-sm font-medium text-zinc-400 mb-1">Total Revenue Collected</p>
              <p className="text-3xl font-bold text-green-400">£{totalInvoiceRevenue.toLocaleString()}</p>
              <p className="text-xs text-zinc-600 mt-1">{invoices.length} paid invoices</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Target className="w-16 h-16 text-blue-500" /></div>
              <p className="text-sm font-medium text-zinc-400 mb-1">Elle Leads Generated</p>
              <p className="text-3xl font-bold text-white">{totalElleLeads}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* MRR Breakdown by Client */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow">
              <div className="p-5 border-b border-zinc-800 bg-zinc-900/40">
                <h3 className="font-semibold text-white">MRR Breakdown</h3>
                <p className="text-xs text-zinc-500 mt-1">Monthly recurring revenue by client</p>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/20 text-xs uppercase text-zinc-400 border-b border-zinc-800">
                    <th className="p-4 font-medium">Client</th>
                    <th className="p-4 font-medium">Package</th>
                    <th className="p-4 font-medium text-right">Monthly Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-sm">
                  {activeClients.sort((a, b) => (parseFloat(b.monthly_value) || 0) - (parseFloat(a.monthly_value) || 0)).map(client => (
                    <tr key={client.id} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4 font-medium text-zinc-200">{client.company_name}</td>
                      <td className="p-4 text-zinc-400">{client.package_name || '—'}</td>
                      <td className="p-4 text-right text-brand-gold font-medium">
                        {client.monthly_value ? `£${parseFloat(client.monthly_value).toLocaleString()}` : '—'}
                      </td>
                    </tr>
                  ))}
                  {activeClients.length === 0 && (
                    <tr><td colSpan={3} className="p-8 text-center text-zinc-500">No active clients yet.</td></tr>
                  )}
                </tbody>
                {activeClients.length > 0 && (
                  <tfoot>
                    <tr className="border-t border-zinc-700 bg-zinc-900/30">
                      <td colSpan={2} className="p-4 text-sm font-semibold text-zinc-300">Total MRR</td>
                      <td className="p-4 text-right text-sm font-bold text-brand-gold">£{mrr.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>

            {/* Project Revenue Breakdown */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow">
              <div className="p-5 border-b border-zinc-800 bg-zinc-900/40">
                <h3 className="font-semibold text-white">Project Revenue</h3>
                <p className="text-xs text-zinc-500 mt-1">One-off project work breakdown</p>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/20 text-xs uppercase text-zinc-400 border-b border-zinc-800">
                    <th className="p-4 font-medium">Project</th>
                    <th className="p-4 font-medium">Client</th>
                    <th className="p-4 font-medium text-center">Status</th>
                    <th className="p-4 font-medium text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-sm">
                  {projects.map(proj => (
                    <tr key={proj.id} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4 font-medium text-zinc-200">{proj.name}</td>
                      <td className="p-4 text-zinc-400">{proj.clients?.company_name || '—'}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          proj.status === 'completed' ? 'bg-green-900/50 text-green-300' :
                          proj.status === 'in_progress' ? 'bg-blue-900/50 text-blue-300' :
                          proj.status === 'on_hold' ? 'bg-yellow-900/50 text-yellow-300' :
                          'bg-zinc-800 text-zinc-400'
                        }`}>{proj.status?.replace(/_/g, ' ')}</span>
                      </td>
                      <td className="p-4 text-right font-medium text-white">
                        {proj.value ? `£${parseFloat(proj.value).toLocaleString()}` : '—'}
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr><td colSpan={4} className="p-8 text-center text-zinc-500">No projects yet.</td></tr>
                  )}
                </tbody>
                {projects.length > 0 && (
                  <tfoot>
                    <tr className="border-t border-zinc-700 bg-zinc-900/30">
                      <td colSpan={3} className="p-4 text-sm font-semibold text-zinc-300">
                        Completed: £{projectRevenue.toLocaleString()} | In Progress: £{activeProjectValue.toLocaleString()}
                      </td>
                      <td className="p-4 text-right text-sm font-bold text-white">
                        £{(projectRevenue + activeProjectValue).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>

            {/* Client Profitability (from reports) */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow">
              <div className="p-5 border-b border-zinc-800 bg-zinc-900/40">
                <h3 className="font-semibold text-white">Client Profitability</h3>
                <p className="text-xs text-zinc-500 mt-1">From monthly reports data</p>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/20 text-xs uppercase text-zinc-400 border-b border-zinc-800">
                    <th className="p-4 font-medium">Client</th>
                    <th className="p-4 font-medium">Hours Logged</th>
                    <th className="p-4 font-medium text-right">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-sm">
                  {clients.map(client => {
                    const hours = clientHoursMap[client.id] || 0;
                    const profit = clientProfitMap[client.id] || 0;
                    if (!hours && !profit) return null;
                    return (
                      <tr key={client.id} className="hover:bg-zinc-900/50 transition-colors">
                        <td className="p-4 font-medium text-zinc-200">{client.company_name}</td>
                        <td className="p-4 text-zinc-400">{hours}h</td>
                        <td className="p-4 text-right text-brand-gold font-medium">£{profit.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                  {Object.keys(clientProfitMap).length === 0 && (
                    <tr><td colSpan={3} className="p-8 text-center text-zinc-500">No report data yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Revenue Summary */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow">
              <div className="p-5 border-b border-zinc-800 bg-zinc-900/40">
                <h3 className="font-semibold text-white">Revenue Summary</h3>
                <p className="text-xs text-zinc-500 mt-1">Combined retainer + project revenue</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-zinc-400">Monthly Retainers (MRR)</p>
                    <p className="text-xs text-zinc-600">{activeClients.length} active clients</p>
                  </div>
                  <p className="text-lg font-bold text-brand-gold">£{mrr.toLocaleString()}/mo</p>
                </div>
                <div className="border-t border-zinc-800"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-zinc-400">Project Revenue (Completed)</p>
                    <p className="text-xs text-zinc-600">{completedProjects.length} projects</p>
                  </div>
                  <p className="text-lg font-bold text-white">£{projectRevenue.toLocaleString()}</p>
                </div>
                <div className="border-t border-zinc-800"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-zinc-400">In-Progress Projects</p>
                    <p className="text-xs text-zinc-600">{projects.filter(p => p.status === 'in_progress').length} projects</p>
                  </div>
                  <p className="text-lg font-bold text-blue-400">£{activeProjectValue.toLocaleString()}</p>
                </div>
                <div className="border-t border-zinc-700 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-white">Total Revenue Collected</p>
                    <p className="text-xl font-bold text-green-400">£{totalInvoiceRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
