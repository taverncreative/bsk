'use client';

import { useState, useEffect, Suspense } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { FileText, Plus, X, Send, CheckCircle, Clock, AlertCircle, PoundSterling, Trash2, ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

export default function InvoicesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin"></div></div>}>
      <InvoicesPageInner />
    </Suspense>
  );
}

function InvoicesPageInner() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [sending, setSending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Create form
  const [clientId, setClientId] = useState('');
  const [items, setItems] = useState<LineItem[]>([{ description: '', quantity: 1, rate: 0 }]);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const supabase = createClient();
  const searchParams = useSearchParams();

  useEffect(() => { loadData(); }, []);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);
  useEffect(() => {
    const cid = searchParams.get('client_id');
    if (cid) { setClientId(cid); setShowCreate(true); }
  }, [searchParams]);

  const loadData = async () => {
    const [invRes, clientRes] = await Promise.all([
      supabase.from('invoices').select('*, clients(company_name)').order('created_at', { ascending: false }),
      supabase.from('clients').select('id, company_name, email').order('company_name'),
    ]);
    setInvoices(invRes.data || []);
    setClients(clientRes.data || []);
    setLoading(false);
  };

  const getNextInvoiceNumber = () => {
    const existing = invoices.map(i => {
      const match = i.invoice_number?.match(/BSK-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const max = Math.max(0, ...existing);
    return `BSK-${String(max + 1).padStart(3, '0')}`;
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  const createInvoice = async () => {
    if (!clientId) { setToast({ message: 'Select a client', type: 'error' }); return; }
    if (items.every(i => !i.description.trim())) { setToast({ message: 'Add at least one line item', type: 'error' }); return; }

    setSaving(true);
    const invoiceNumber = getNextInvoiceNumber();
    const validItems = items.filter(i => i.description.trim());

    const { data, error } = await supabase.from('invoices').insert([{
      client_id: clientId,
      invoice_number: invoiceNumber,
      items: validItems,
      subtotal,
      vat,
      total,
      status: 'draft',
      due_date: dueDate || null,
      notes,
    }]).select('*, clients(company_name)').single();

    if (error) {
      setToast({ message: 'Failed to create invoice', type: 'error' });
    } else {
      // Log activity
      await supabase.from('activity_log').insert([{
        entity_type: 'client',
        entity_id: clientId,
        action: 'invoice_created',
        description: `Invoice ${invoiceNumber} created for £${total.toFixed(2)}`,
        metadata: { invoice_id: data.id },
      }]);

      setToast({ message: `Invoice ${invoiceNumber} created!`, type: 'success' });
      setShowCreate(false);
      resetForm();
      loadData();
    }
    setSaving(false);
  };

  const resetForm = () => {
    setClientId('');
    setItems([{ description: '', quantity: 1, rate: 0 }]);
    setDueDate('');
    setNotes('');
  };

  const sendInvoice = async (invoice: any) => {
    const client = clients.find(c => c.id === invoice.client_id);
    if (!client?.email) {
      setToast({ message: 'Client has no email address', type: 'error' });
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/invoices/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId: invoice.id }),
      });

      if (!res.ok) {
        setToast({ message: 'Failed to send invoice', type: 'error' });
        return;
      }

      // Update status
      await supabase.from('invoices').update({ status: 'sent', sent_at: new Date().toISOString() }).eq('id', invoice.id);

      await supabase.from('activity_log').insert([{
        entity_type: 'client',
        entity_id: invoice.client_id,
        action: 'invoice_sent',
        description: `Invoice ${invoice.invoice_number} sent to ${client.email}`,
      }]);

      setToast({ message: `Invoice sent to ${client.email}!`, type: 'success' });
      loadData();
    } finally {
      setSending(false);
    }
  };

  const markPaid = async (invoice: any) => {
    await supabase.from('invoices').update({ status: 'paid', paid_at: new Date().toISOString() }).eq('id', invoice.id);

    await supabase.from('activity_log').insert([{
      entity_type: 'client',
      entity_id: invoice.client_id,
      action: 'invoice_paid',
      description: `Invoice ${invoice.invoice_number} marked as paid (£${parseFloat(invoice.total).toFixed(2)})`,
    }]);

    setToast({ message: 'Invoice marked as paid!', type: 'success' });
    loadData();
    if (selectedInvoice?.id === invoice.id) {
      setSelectedInvoice({ ...invoice, status: 'paid', paid_at: new Date().toISOString() });
    }
  };

  const deleteInvoice = async (invoice: any) => {
    await supabase.from('invoices').delete().eq('id', invoice.id);
    setToast({ message: 'Invoice deleted', type: 'success' });
    setSelectedInvoice(null);
    loadData();
  };

  const addLineItem = () => setItems([...items, { description: '', quantity: 1, rate: 0 }]);
  const removeLineItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const updateLineItem = (idx: number, field: keyof LineItem, value: string | number) => {
    setItems(items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'sent': return <Send className="h-4 w-4 text-blue-400" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-400" />;
      default: return <Clock className="h-4 w-4 text-zinc-500" />;
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-900/50 text-green-300';
      case 'sent': return 'bg-blue-900/50 text-blue-300';
      case 'overdue': return 'bg-red-900/50 text-red-300';
      default: return 'bg-zinc-800 text-zinc-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin"></div>
      </div>
    );
  }

  // Invoice Detail View
  if (selectedInvoice) {
    const client = clients.find(c => c.id === selectedInvoice.client_id);
    const invoiceItems = selectedInvoice.items || [];

    return (
      <div>
        {toast && (
          <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
            toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'
          }`}>{toast.message}</div>
        )}

        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setSelectedInvoice(null)} className="flex items-center text-zinc-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Invoices
          </button>
          <div className="flex gap-3">
            {selectedInvoice.status === 'draft' && (
              <button onClick={() => sendInvoice(selectedInvoice)} disabled={sending}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-500 disabled:opacity-50 transition-colors">
                <Send className="h-4 w-4 mr-2" /> {sending ? 'Sending...' : 'Send Invoice'}
              </button>
            )}
            {(selectedInvoice.status === 'sent' || selectedInvoice.status === 'overdue') && (
              <button onClick={() => markPaid(selectedInvoice)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-500 transition-colors">
                <CheckCircle className="h-4 w-4 mr-2" /> Mark as Paid
              </button>
            )}
            <button onClick={() => deleteInvoice(selectedInvoice)}
              className="flex items-center px-4 py-2 bg-zinc-900 border border-red-900/50 text-red-400 rounded-lg font-medium text-sm hover:bg-red-900/20 transition-colors">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </button>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 max-w-3xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">{selectedInvoice.invoice_number}</h1>
              <p className="text-zinc-400 mt-1">
                {client?.company_name || 'Unknown Client'}
              </p>
              {client && (
                <Link href={`/admin-dashboard/clients?id=${client.id}`} className="text-xs text-brand-gold hover:text-white transition-colors">
                  View Client →
                </Link>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge(selectedInvoice.status)}`}>
              {selectedInvoice.status}
            </span>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
            <div>
              <p className="text-zinc-500">Created</p>
              <p className="text-white">{new Date(selectedInvoice.created_at).toLocaleDateString('en-GB')}</p>
            </div>
            {selectedInvoice.due_date && (
              <div>
                <p className="text-zinc-500">Due Date</p>
                <p className="text-white">{new Date(selectedInvoice.due_date).toLocaleDateString('en-GB')}</p>
              </div>
            )}
            {selectedInvoice.paid_at && (
              <div>
                <p className="text-zinc-500">Paid</p>
                <p className="text-green-400">{new Date(selectedInvoice.paid_at).toLocaleDateString('en-GB')}</p>
              </div>
            )}
          </div>

          {/* Line Items */}
          <table className="w-full mb-6">
            <thead>
              <tr className="border-b border-zinc-800 text-xs text-zinc-500 uppercase">
                <th className="text-left py-2">Description</th>
                <th className="text-right py-2 w-20">Qty</th>
                <th className="text-right py-2 w-28">Rate</th>
                <th className="text-right py-2 w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item: any, idx: number) => (
                <tr key={idx} className="border-b border-zinc-900">
                  <td className="py-3 text-sm text-white">{item.description}</td>
                  <td className="py-3 text-sm text-zinc-300 text-right">{item.quantity}</td>
                  <td className="py-3 text-sm text-zinc-300 text-right">£{parseFloat(item.rate).toFixed(2)}</td>
                  <td className="py-3 text-sm text-white text-right font-medium">£{(item.quantity * item.rate).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="border-t border-zinc-800 pt-4 space-y-2 text-sm max-w-xs ml-auto">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>£{parseFloat(selectedInvoice.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>VAT (20%)</span>
              <span>£{parseFloat(selectedInvoice.vat).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white text-lg font-bold pt-2 border-t border-zinc-700">
              <span>Total</span>
              <span>£{parseFloat(selectedInvoice.total).toFixed(2)}</span>
            </div>
          </div>

          {selectedInvoice.notes && (
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 mb-1">Notes</p>
              <p className="text-sm text-zinc-300">{selectedInvoice.notes}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // List View / Create View
  return (
    <div>
      {toast && (
        <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
          toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'
        }`}>{toast.message}</div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Invoices</h1>
          <p className="text-zinc-400">
            {invoices.length} invoice{invoices.length !== 1 ? 's' : ''}
            {invoices.filter(i => i.status === 'paid').length > 0 && (
              <span className="ml-3 text-green-400">
                £{invoices.filter(i => i.status === 'paid').reduce((s: number, i: any) => s + parseFloat(i.total || 0), 0).toLocaleString()} received
              </span>
            )}
          </p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors text-sm">
          <Plus className="h-4 w-4 mr-2" /> Create Invoice
        </button>
      </div>

      {/* Invoice List */}
      {invoices.length === 0 && !showCreate ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
          <p className="text-zinc-500">No invoices yet. Create your first one.</p>
        </div>
      ) : !showCreate ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 text-xs text-zinc-500 uppercase">
                <th className="text-left py-3 px-6">Invoice</th>
                <th className="text-left py-3 px-4">Client</th>
                <th className="text-right py-3 px-4">Amount</th>
                <th className="text-center py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Due</th>
                <th className="text-right py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors cursor-pointer" onClick={() => setSelectedInvoice(inv)}>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-white">{inv.invoice_number}</p>
                    <p className="text-xs text-zinc-600">{new Date(inv.created_at).toLocaleDateString('en-GB')}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-zinc-300">{inv.clients?.company_name || '—'}</p>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <p className="text-sm font-semibold text-white">£{parseFloat(inv.total || 0).toFixed(2)}</p>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(inv.status)}`}>
                      {statusIcon(inv.status)} {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-zinc-400">{inv.due_date ? new Date(inv.due_date).toLocaleDateString('en-GB') : '—'}</p>
                  </td>
                  <td className="py-4 px-6 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-end gap-2">
                      {inv.status === 'draft' && (
                        <button onClick={() => sendInvoice(inv)} disabled={sending}
                          className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-medium hover:bg-blue-900/50 transition-colors disabled:opacity-50">
                          Send
                        </button>
                      )}
                      {(inv.status === 'sent' || inv.status === 'overdue') && (
                        <button onClick={() => markPaid(inv)}
                          className="px-3 py-1 bg-green-900/30 text-green-400 rounded text-xs font-medium hover:bg-green-900/50 transition-colors">
                          Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {/* Create Invoice Form */}
      {showCreate && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Create Invoice</h2>
            <button onClick={() => { setShowCreate(false); resetForm(); }} className="text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Client *</label>
                <select value={clientId} onChange={e => setClientId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm">
                  <option value="">Select client...</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.company_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Due Date</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" />
              </div>
            </div>

            {/* Line Items */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">Line Items</label>
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-6">
                      <input value={item.description} onChange={e => updateLineItem(idx, 'description', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Description" />
                    </div>
                    <div className="col-span-2">
                      <input type="number" min="1" value={item.quantity} onChange={e => updateLineItem(idx, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm text-center" placeholder="Qty" />
                    </div>
                    <div className="col-span-3">
                      <input type="number" step="0.01" value={item.rate || ''} onChange={e => updateLineItem(idx, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Rate (£)" />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {items.length > 1 && (
                        <button onClick={() => removeLineItem(idx)} className="text-zinc-600 hover:text-red-400 transition-colors">
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={addLineItem} className="mt-3 text-sm text-brand-gold hover:text-white transition-colors flex items-center gap-1">
                <Plus className="h-3.5 w-3.5" /> Add line item
              </button>
            </div>

            {/* Totals */}
            <div className="border-t border-zinc-800 pt-4 space-y-2 text-sm max-w-xs ml-auto">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>VAT (20%)</span>
                <span>£{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white text-lg font-bold pt-2 border-t border-zinc-700">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Notes</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Payment terms, additional info..." />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => { setShowCreate(false); resetForm(); }}
                className="px-4 py-2 border border-zinc-700 rounded-md text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={createInvoice} disabled={saving}
                className="px-4 py-2 bg-brand-gold text-black rounded-md text-sm font-medium hover:bg-yellow-500 disabled:opacity-50">{saving ? 'Creating...' : 'Create Invoice'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
