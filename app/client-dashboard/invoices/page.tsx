'use client';

import { useState, useEffect } from 'react';
import { Download, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const { data, error } = await supabase.from('invoices').select('*').order('due_date', { ascending: false });
    if (!error && data) {
      setInvoices(data);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'unpaid': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'overdue': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Invoices & Billing</h1>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-zinc-900/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Invoice #</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Due Date</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-zinc-500">Loading invoices...</td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-zinc-500">No invoices found.</td>
              </tr>
            ) : invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-zinc-900/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{inv.invoice_number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">£{inv.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full border ${getStatusColor(inv.status)}`}>
                    {inv.status.toLowerCase() === 'paid' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">{new Date(inv.due_date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {inv.file_url ? (
                    <a href={inv.file_url} target="_blank" rel="noreferrer" className="text-brand-gold hover:text-yellow-400 flex items-center justify-end">
                      <Download className="w-4 h-4 mr-1" /> Download PDF
                    </a>
                  ) : (
                    <span className="text-zinc-600">Processing</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}