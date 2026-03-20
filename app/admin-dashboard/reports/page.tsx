'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { BarChart3, TrendingUp, Users, PoundSterling, Download, Calendar } from 'lucide-react';

type ReportType = 'monthly' | 'pipeline' | 'revenue';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('monthly');
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const supabase = createClient();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const [leadsRes, clientsRes, invoicesRes] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('clients').select('*'),
      supabase.from('invoices').select('*').order('created_at', { ascending: false }),
    ]);
    setLeads(leadsRes.data || []);
    setClients(clientsRes.data || []);
    setInvoices(invoicesRes.data || []);
    setLoading(false);
  };

  const filterByDate = (items: any[], dateField: string = 'created_at') => {
    if (!dateRange.from && !dateRange.to) return items;
    return items.filter(item => {
      const d = new Date(item[dateField]);
      if (dateRange.from && d < new Date(dateRange.from)) return false;
      if (dateRange.to && d > new Date(dateRange.to + 'T23:59:59')) return false;
      return true;
    });
  };

  const exportCSV = (data: string[][], filename: string) => {
    const csv = data.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin"></div>
      </div>
    );
  }

  // Report calculations
  const filteredLeads = filterByDate(leads);
  const filteredInvoices = filterByDate(invoices);
  const filteredClients = filterByDate(clients);

  const leadsWon = filteredLeads.filter(l => l.stage === 'Won').length;
  const leadsLost = filteredLeads.filter(l => l.stage === 'Lost').length;
  const conversionRate = filteredLeads.length > 0 ? ((leadsWon / filteredLeads.length) * 100).toFixed(1) : '0';

  const paidInvoices = filteredInvoices.filter(i => i.status === 'paid');
  const totalRevenue = paidInvoices.reduce((s: number, i: any) => s + parseFloat(i.total || 0), 0);
  const outstandingInvoices = filteredInvoices.filter(i => i.status === 'sent' || i.status === 'overdue');
  const outstandingAmount = outstandingInvoices.reduce((s: number, i: any) => s + parseFloat(i.total || 0), 0);

  const stageDistribution = ['New Lead', 'Contacted', 'Discovery Call', 'Proposal Sent', 'Won', 'Lost'].map(stage => ({
    stage,
    count: filteredLeads.filter(l => l.stage === stage).length,
  }));

  const maxStageCount = Math.max(1, ...stageDistribution.map(s => s.count));

  // Monthly revenue breakdown
  const monthlyRevenue: { month: string; amount: number }[] = [];
  paidInvoices.forEach(inv => {
    const d = new Date(inv.paid_at || inv.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    const existing = monthlyRevenue.find(m => m.month === label);
    if (existing) existing.amount += parseFloat(inv.total || 0);
    else monthlyRevenue.push({ month: label, amount: parseFloat(inv.total || 0) });
  });

  const maxMonthlyRevenue = Math.max(1, ...monthlyRevenue.map(m => m.amount));

  const stageColor = (stage: string) => {
    switch (stage) {
      case 'New Lead': return 'bg-zinc-600';
      case 'Contacted': return 'bg-blue-500';
      case 'Discovery Call': return 'bg-indigo-500';
      case 'Proposal Sent': return 'bg-purple-500';
      case 'Won': return 'bg-green-500';
      case 'Lost': return 'bg-red-500';
      default: return 'bg-zinc-500';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Reports</h1>
          <p className="text-zinc-400">Business intelligence at a glance.</p>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'monthly' as ReportType, label: 'Monthly Summary', icon: BarChart3 },
          { key: 'pipeline' as ReportType, label: 'Pipeline Report', icon: TrendingUp },
          { key: 'revenue' as ReportType, label: 'Revenue Report', icon: PoundSterling },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setReportType(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              reportType === tab.key
                ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/30'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date Filter */}
      <div className="flex items-center gap-4 mb-8">
        <Calendar className="h-4 w-4 text-zinc-500" />
        <input type="date" value={dateRange.from} onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
          className="bg-zinc-900 border border-zinc-800 rounded-md py-1.5 px-3 text-sm text-white" />
        <span className="text-zinc-600">to</span>
        <input type="date" value={dateRange.to} onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
          className="bg-zinc-900 border border-zinc-800 rounded-md py-1.5 px-3 text-sm text-white" />
        {(dateRange.from || dateRange.to) && (
          <button onClick={() => setDateRange({ from: '', to: '' })} className="text-xs text-zinc-500 hover:text-white">Clear</button>
        )}
      </div>

      {/* Monthly Summary */}
      {reportType === 'monthly' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total Leads</p>
              <p className="text-2xl font-bold text-white">{filteredLeads.length}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold text-green-400">{conversionRate}%</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Active Clients</p>
              <p className="text-2xl font-bold text-white">{filteredClients.filter(c => c.status === 'active').length}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Revenue</p>
              <p className="text-2xl font-bold text-brand-gold">£{totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => exportCSV(
                [
                  ['Metric', 'Value'],
                  ['Total Leads', String(filteredLeads.length)],
                  ['Leads Won', String(leadsWon)],
                  ['Leads Lost', String(leadsLost)],
                  ['Conversion Rate', `${conversionRate}%`],
                  ['Active Clients', String(filteredClients.filter(c => c.status === 'active').length)],
                  ['Revenue', `£${totalRevenue.toFixed(2)}`],
                  ['Outstanding', `£${outstandingAmount.toFixed(2)}`],
                ],
                'bsk-monthly-summary.csv'
              )}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white transition-colors"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>
      )}

      {/* Pipeline Report */}
      {reportType === 'pipeline' && (
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">Leads by Stage</h3>
            <div className="space-y-4">
              {stageDistribution.map(s => (
                <div key={s.stage} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-zinc-300 shrink-0">{s.stage}</div>
                  <div className="flex-1 bg-zinc-900 rounded-full h-6 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stageColor(s.stage)} transition-all`}
                      style={{ width: `${(s.count / maxStageCount) * 100}%` }}
                    />
                  </div>
                  <div className="w-8 text-right text-sm font-medium text-white">{s.count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Won</p>
              <p className="text-2xl font-bold text-green-400">{leadsWon}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Lost</p>
              <p className="text-2xl font-bold text-red-400">{leadsLost}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold text-brand-gold">{conversionRate}%</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => exportCSV(
                [['Stage', 'Count'], ...stageDistribution.map(s => [s.stage, String(s.count)])],
                'bsk-pipeline-report.csv'
              )}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white transition-colors"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>
      )}

      {/* Revenue Report */}
      {reportType === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-green-400">£{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Outstanding</p>
              <p className="text-2xl font-bold text-yellow-400">£{outstandingAmount.toLocaleString()}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Invoices Sent</p>
              <p className="text-2xl font-bold text-white">{filteredInvoices.length}</p>
            </div>
          </div>

          {monthlyRevenue.length > 0 && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">Revenue by Month</h3>
              <div className="space-y-4">
                {monthlyRevenue.map(m => (
                  <div key={m.month} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-zinc-300 shrink-0">{m.month}</div>
                    <div className="flex-1 bg-zinc-900 rounded-full h-6 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-gold transition-all"
                        style={{ width: `${(m.amount / maxMonthlyRevenue) * 100}%` }}
                      />
                    </div>
                    <div className="w-24 text-right text-sm font-medium text-white">£{m.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invoice breakdown */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Invoice Breakdown</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              {['draft', 'sent', 'paid', 'overdue'].map(status => (
                <div key={status}>
                  <p className="text-2xl font-bold text-white">{filteredInvoices.filter(i => i.status === status).length}</p>
                  <p className="text-xs text-zinc-500 capitalize">{status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => exportCSV(
                [
                  ['Invoice', 'Client', 'Amount', 'Status', 'Date'],
                  ...filteredInvoices.map(i => [
                    i.invoice_number,
                    i.clients?.company_name || '',
                    `£${parseFloat(i.total || 0).toFixed(2)}`,
                    i.status,
                    new Date(i.created_at).toLocaleDateString('en-GB'),
                  ]),
                ],
                'bsk-revenue-report.csv'
              )}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white transition-colors"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
