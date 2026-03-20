'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Users, Mail, Phone, Globe, MapPin, Search, Plus, X, Edit3, Save, ArrowLeft, FileText, ClipboardList, LayoutGrid, Tag, PoundSterling, Clock, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ company_name: '', contact_name: '', email: '', phone: '', address: '', website: '', notes: '', project_value: '', monthly_value: '' });
  const [clientInvoices, setClientInvoices] = useState<any[]>([]);
  const [clientActivity, setClientActivity] = useState<any[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const supabase = createClient();
  const searchParams = useSearchParams();

  useEffect(() => { fetchClients(); }, []);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && clients.length > 0) {
      const client = clients.find(c => c.id === id);
      if (client) openClientDetail(client);
    }
  }, [searchParams, clients]);

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    if (!error) setClients(data || []);
    setLoading(false);
  };

  const openClientDetail = async (client: any) => {
    setSelectedClient(client);
    setEditForm(client);
    setEditing(false);

    // Fetch invoices and activity for this client
    const [invRes, actRes] = await Promise.all([
      supabase.from('invoices').select('*').eq('client_id', client.id).order('created_at', { ascending: false }),
      supabase.from('activity_log').select('*').eq('entity_type', 'client').eq('entity_id', client.id).order('created_at', { ascending: false }).limit(20),
    ]);
    setClientInvoices(invRes.data || []);
    setClientActivity(actRes.data || []);
  };

  const saveClient = async () => {
    setSaving(true);
    const { error } = await supabase.from('clients').update({
      company_name: editForm.company_name,
      contact_name: editForm.contact_name,
      email: editForm.email,
      phone: editForm.phone,
      address: editForm.address,
      website: editForm.website,
      notes: editForm.notes,
      status: editForm.status,
      project_value: editForm.project_value ? parseFloat(editForm.project_value) : null,
      monthly_value: editForm.monthly_value ? parseFloat(editForm.monthly_value) : null,
      updated_at: new Date().toISOString(),
    }).eq('id', selectedClient.id);

    if (error) {
      setToast({ message: 'Failed to save', type: 'error' });
    } else {
      setToast({ message: 'Client updated!', type: 'success' });
      setEditing(false);
      fetchClients();
      setSelectedClient({ ...selectedClient, ...editForm });
    }
    setSaving(false);
  };

  const addClient = async () => {
    if (!addForm.company_name.trim()) {
      setToast({ message: 'Company name is required', type: 'error' });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('clients').insert([{
      company_name: addForm.company_name,
      contact_name: addForm.contact_name,
      email: addForm.email,
      phone: addForm.phone,
      address: addForm.address,
      website: addForm.website,
      notes: addForm.notes,
      project_value: addForm.project_value ? parseFloat(addForm.project_value) : null,
      monthly_value: addForm.monthly_value ? parseFloat(addForm.monthly_value) : null,
      status: 'active',
    }]);

    if (error) {
      setToast({ message: 'Failed to add client', type: 'error' });
    } else {
      setToast({ message: 'Client added!', type: 'success' });
      setShowAddModal(false);
      setAddForm({ company_name: '', contact_name: '', email: '', phone: '', address: '', website: '', notes: '', project_value: '', monthly_value: '' });
      fetchClients();
    }
    setSaving(false);
  };

  const deleteClient = async () => {
    if (!selectedClient) return;
    setDeleting(true);
    const { error } = await supabase.from('clients').delete().eq('id', selectedClient.id);
    if (error) {
      setToast({ message: 'Failed to delete client', type: 'error' });
    } else {
      setToast({ message: 'Client deleted', type: 'success' });
      setSelectedClient(null);
      fetchClients();
    }
    setDeleting(false);
  };

  const filtered = clients.filter(c => {
    const matchSearch = !search || c.company_name?.toLowerCase().includes(search.toLowerCase()) || c.contact_name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-900/50 text-green-300';
      case 'completed': return 'bg-blue-900/50 text-blue-300';
      case 'churned': return 'bg-red-900/50 text-red-300';
      default: return 'bg-zinc-800 text-zinc-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin"></div>
      </div>
    );
  }

  // Detail View
  if (selectedClient) {
    return (
      <div>
        {toast && (
          <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
            toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'
          }`}>{toast.message}</div>
        )}

        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setSelectedClient(null)} className="flex items-center text-zinc-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Clients
          </button>
          <div className="flex gap-3">
            {!editing ? (
              <>
                <button onClick={() => setEditing(true)} className="flex items-center px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg font-medium hover:border-brand-gold text-sm transition-colors">
                  <Edit3 className="h-4 w-4 mr-2" /> Edit
                </button>
                <button onClick={deleteClient} disabled={deleting} className="flex items-center px-4 py-2 bg-zinc-900 border border-red-900/50 text-red-400 rounded-lg font-medium hover:bg-red-900/20 text-sm transition-colors disabled:opacity-50">
                  <Trash2 className="h-4 w-4 mr-2" /> {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setEditing(false); setEditForm(selectedClient); }} className="px-4 py-2 border border-zinc-700 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={saveClient} disabled={saving} className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium text-sm disabled:opacity-50">
                  <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-brand-gold" />
                </div>
                <div>
                  {editing ? (
                    <input value={editForm.company_name || ''} onChange={e => setEditForm({ ...editForm, company_name: e.target.value })}
                      className="text-2xl font-bold bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white w-full" />
                  ) : (
                    <h1 className="text-2xl font-bold text-white">{selectedClient.company_name}</h1>
                  )}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold mt-1 ${statusBadge(selectedClient.status)}`}>
                    {editing ? (
                      <select value={editForm.status || 'active'} onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                        className="bg-transparent border-none text-xs p-0 focus:ring-0">
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="churned">Churned</option>
                      </select>
                    ) : (
                      selectedClient.status
                    )}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Contact Name', key: 'contact_name', icon: Users },
                  { label: 'Email', key: 'email', icon: Mail },
                  { label: 'Phone', key: 'phone', icon: Phone },
                  { label: 'Website', key: 'website', icon: Globe },
                  { label: 'Address', key: 'address', icon: MapPin },
                ].map(field => (
                  <div key={field.key} className="flex items-start gap-3">
                    <field.icon className="w-4 h-4 text-zinc-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-zinc-500">{field.label}</p>
                      {editing ? (
                        <input value={editForm[field.key] || ''} onChange={e => setEditForm({ ...editForm, [field.key]: e.target.value })}
                          className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white w-full mt-0.5" />
                      ) : (
                        <p className="text-sm text-zinc-300">{selectedClient[field.key] || '—'}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <PoundSterling className="w-4 h-4 text-zinc-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500">Project Value</p>
                    {editing ? (
                      <input type="number" value={editForm.project_value || ''} onChange={e => setEditForm({ ...editForm, project_value: e.target.value })}
                        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white w-full mt-0.5" />
                    ) : (
                      <p className="text-sm text-zinc-300">{selectedClient.project_value ? `£${parseFloat(selectedClient.project_value).toLocaleString()}` : '—'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <p className="text-xs text-zinc-500 mb-1">Notes</p>
                {editing ? (
                  <textarea value={editForm.notes || ''} onChange={e => setEditForm({ ...editForm, notes: e.target.value })} rows={4}
                    className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white w-full" />
                ) : (
                  <p className="text-sm text-zinc-300 whitespace-pre-wrap">{selectedClient.notes || 'No notes yet.'}</p>
                )}
              </div>
            </div>

            {/* Invoices for this client */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Invoices</h2>
                <Link href={`/admin-dashboard/invoices?client_id=${selectedClient.id}`} className="text-xs text-brand-gold hover:text-white transition-colors">
                  Create Invoice →
                </Link>
              </div>
              {clientInvoices.length === 0 ? (
                <p className="text-sm text-zinc-500 py-4 text-center">No invoices yet.</p>
              ) : (
                <div className="space-y-3">
                  {clientInvoices.map(inv => (
                    <div key={inv.id} className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-3">
                      <div>
                        <p className="text-sm font-medium text-white">{inv.invoice_number}</p>
                        <p className="text-xs text-zinc-500">{inv.due_date ? new Date(inv.due_date).toLocaleDateString('en-GB') : 'No due date'}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-white">£{parseFloat(inv.total || 0).toLocaleString()}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          inv.status === 'paid' ? 'bg-green-900/50 text-green-300' :
                          inv.status === 'sent' ? 'bg-blue-900/50 text-blue-300' :
                          inv.status === 'overdue' ? 'bg-red-900/50 text-red-300' :
                          'bg-zinc-800 text-zinc-400'
                        }`}>{inv.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Links & Activity */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Quick Links</h3>
              <div className="space-y-2">
                {selectedClient.lead_id && (
                  <Link href="/admin-dashboard/pipeline" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-brand-gold transition-colors py-1">
                    <LayoutGrid className="h-4 w-4" /> View in Pipeline
                  </Link>
                )}
                {selectedClient.discovery_submission_id && (
                  <Link href="/admin-dashboard/discovery" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-brand-gold transition-colors py-1">
                    <ClipboardList className="h-4 w-4" /> View Discovery Form
                  </Link>
                )}
                <Link href={`/admin-dashboard/invoices?client_id=${selectedClient.id}`} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-brand-gold transition-colors py-1">
                  <FileText className="h-4 w-4" /> Invoices
                </Link>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Activity</h3>
              {clientActivity.length === 0 ? (
                <p className="text-xs text-zinc-600 text-center py-4">No activity yet.</p>
              ) : (
                <div className="space-y-4">
                  {clientActivity.map(event => (
                    <div key={event.id} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs text-zinc-300">{event.description}</p>
                        <p className="text-xs text-zinc-600 mt-0.5">
                          {new Date(event.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Timestamps */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Dates</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Created</span>
                  <span className="text-zinc-300">{new Date(selectedClient.created_at).toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Updated</span>
                  <span className="text-zinc-300">{new Date(selectedClient.updated_at || selectedClient.created_at).toLocaleDateString('en-GB')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div>
      {toast && (
        <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
          toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'
        }`}>{toast.message}</div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Clients</h1>
          <p className="text-zinc-400">{clients.length} total client{clients.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors text-sm">
          <Plus className="h-4 w-4 mr-2" /> Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:ring-brand-gold focus:border-brand-gold"
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg py-2 px-3 text-sm text-white focus:ring-brand-gold focus:border-brand-gold">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="churned">Churned</option>
        </select>
      </div>

      {/* Client Cards */}
      {filtered.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
          <p className="text-zinc-500">No clients found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(client => (
            <button
              key={client.id}
              onClick={() => openClientDetail(client)}
              className="text-left bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-white group-hover:text-brand-gold transition-colors">{client.company_name}</h3>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusBadge(client.status)}`}>{client.status}</span>
              </div>
              {client.contact_name && <p className="text-sm text-zinc-400 mb-1">{client.contact_name}</p>}
              {client.email && <p className="text-xs text-zinc-500 mb-1">{client.email}</p>}
              {client.project_value && (
                <p className="text-sm font-semibold text-brand-gold mt-2">£{parseFloat(client.project_value).toLocaleString()}</p>
              )}
              <p className="text-xs text-zinc-600 mt-2">
                Added {new Date(client.created_at).toLocaleDateString('en-GB')}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Add Client</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Company Name *</label>
                <input value={addForm.company_name} onChange={e => setAddForm({ ...addForm, company_name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Company Ltd" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Contact Name</label>
                  <input value={addForm.contact_name} onChange={e => setAddForm({ ...addForm, contact_name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
                  <input value={addForm.email} onChange={e => setAddForm({ ...addForm, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="john@company.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Phone</label>
                  <input value={addForm.phone} onChange={e => setAddForm({ ...addForm, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="07..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Website</label>
                  <input value={addForm.website} onChange={e => setAddForm({ ...addForm, website: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="company.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Address</label>
                <input value={addForm.address} onChange={e => setAddForm({ ...addForm, address: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Kent, UK" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Project Value (£)</label>
                  <input type="number" value={addForm.project_value} onChange={e => setAddForm({ ...addForm, project_value: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="2500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Monthly Value (£)</label>
                  <input type="number" value={addForm.monthly_value} onChange={e => setAddForm({ ...addForm, monthly_value: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="200" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Notes</label>
                <textarea value={addForm.notes} onChange={e => setAddForm({ ...addForm, notes: e.target.value })} rows={3}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Any notes..." />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-zinc-700 rounded-md text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={addClient} disabled={saving} className="px-4 py-2 bg-brand-gold text-black rounded-md text-sm font-medium hover:bg-yellow-500 disabled:opacity-50">{saving ? 'Adding...' : 'Add Client'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
