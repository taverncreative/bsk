'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, MoreHorizontal, Calendar, Globe, MapPin, Building, Activity, X, Users, Mail, Phone, PoundSterling, ArrowRight, CheckCircle, Trash2, Link2 } from 'lucide-react';
import { createClient } from '@/lib/supabaseClient';
import Link from 'next/link';

const STAGES = ['New Lead', 'Contacted', 'Discovery Call', 'Proposal Sent', 'Won', 'Lost'];

interface LeadForm {
  business_name: string;
  website_url: string;
  location: string;
  industry: string;
  source: string;
  contact_name: string;
  email: string;
  phone: string;
  value: string;
  follow_up_date: string;
  notes: string;
}

const emptyForm: LeadForm = {
  business_name: '', website_url: '', location: '', industry: '',
  source: 'Manual entry', contact_name: '', email: '', phone: '',
  value: '', follow_up_date: '', notes: '',
};

export default function PipelinePage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState<any | null>(null);
  const [form, setForm] = useState<LeadForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => { fetchLeads(); }, []);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const fetchLeads = async () => {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error && data) setLeads(data);
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (!leadId) return;

    const lead = leads.find(l => l.id === leadId);
    if (!lead || lead.stage === newStage) return;

    // Optimistic update
    setLeads(current => current.map(l => l.id === leadId ? { ...l, stage: newStage } : l));

    const { error } = await supabase.from('leads').update({ stage: newStage }).eq('id', leadId);
    if (error) {
      // Revert on error
      setLeads(current => current.map(l => l.id === leadId ? { ...l, stage: lead.stage } : l));
      setToast({ message: 'Failed to update stage', type: 'error' });
      return;
    }

    // Log activity
    await supabase.from('activity_log').insert([{
      entity_type: 'lead',
      entity_id: leadId,
      action: 'stage_changed',
      description: `${lead.business_name} moved from ${lead.stage} to ${newStage}`,
      metadata: { from: lead.stage, to: newStage },
    }]);

    if (newStage === 'Won') {
      setShowConvertModal(leads.find(l => l.id === leadId) || { ...lead, stage: newStage });
    }
  };

  const saveLead = async () => {
    if (!form.business_name.trim()) {
      setToast({ message: 'Business name is required', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from('leads').insert([{
        business_name: form.business_name,
        website_url: form.website_url,
        location: form.location,
        industry: form.industry,
        source: form.source,
        contact_name: form.contact_name,
        email: form.email,
        phone: form.phone,
        value: form.value ? parseFloat(form.value) : null,
        follow_up_date: form.follow_up_date || null,
        notes: form.notes,
        stage: 'New Lead',
      }]);

      if (error) {
        setToast({ message: 'Failed to save lead', type: 'error' });
        return;
      }

      setToast({ message: 'Lead created successfully!', type: 'success' });
      setShowAddModal(false);
      setForm(emptyForm);
      fetchLeads();
    } finally {
      setSaving(false);
    }
  };

  const convertToClient = async (lead: any) => {
    setConverting(true);
    try {
      // Create client
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .insert([{
          company_name: lead.business_name,
          contact_name: lead.contact_name || '',
          email: lead.email || '',
          phone: lead.phone || '',
          website: lead.website_url || '',
          notes: lead.notes || '',
          lead_id: lead.id,
          discovery_submission_id: lead.discovery_submission_id || null,
          project_value: lead.value || null,
          status: 'active',
        }])
        .select()
        .single();

      if (clientError || !client) {
        setToast({ message: 'Failed to convert to client', type: 'error' });
        return;
      }

      // Update lead with conversion info
      await supabase.from('leads').update({
        converted_at: new Date().toISOString(),
        converted_client_id: client.id,
      }).eq('id', lead.id);

      // Log activity
      await supabase.from('activity_log').insert([{
        entity_type: 'client',
        entity_id: client.id,
        action: 'converted_from_lead',
        description: `${lead.business_name} converted from lead to client`,
        metadata: { lead_id: lead.id },
      }]);

      setToast({ message: `${lead.business_name} is now a client!`, type: 'success' });
      setShowConvertModal(null);
      fetchLeads();
    } finally {
      setConverting(false);
    }
  };

  const deletePipelineLead = async (lead: any) => {
    if (!confirm(`Delete "${lead.business_name}" from pipeline? This cannot be undone.`)) return;
    const { error } = await supabase.from('leads').delete().eq('id', lead.id);
    if (error) {
      setToast({ message: 'Failed to delete lead', type: 'error' });
    } else {
      setLeads(prev => prev.filter(l => l.id !== lead.id));
      setToast({ message: `${lead.business_name} deleted`, type: 'success' });
    }
  };

  const getStageHeaderColor = (stage: string) => {
    switch (stage) {
      case 'New Lead': return 'bg-zinc-800 text-zinc-300';
      case 'Contacted': return 'bg-blue-900/40 text-blue-400 border-t-2 border-blue-500';
      case 'Discovery Call': return 'bg-indigo-900/40 text-indigo-400 border-t-2 border-indigo-500';
      case 'Proposal Sent': return 'bg-purple-900/40 text-purple-400 border-t-2 border-purple-500';
      case 'Won': return 'bg-green-900/40 text-green-400 border-t-2 border-green-500';
      case 'Lost': return 'bg-red-900/40 text-red-400 border-t-2 border-red-500';
      default: return 'bg-zinc-800 text-zinc-400';
    }
  };

  const pipelineValue = leads
    .filter(l => l.stage !== 'Lost' && l.stage !== 'Won')
    .reduce((sum, l) => sum + (parseFloat(l.value) || 0), 0);

  return (
    <div className="flex flex-col h-full bg-black min-h-screen">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
          toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">CRM Pipeline</h1>
          <p className="text-sm text-zinc-400">
            {leads.length} lead{leads.length !== 1 ? 's' : ''} in pipeline
            {pipelineValue > 0 && <span className="ml-3 text-brand-gold font-medium">Pipeline value: £{pipelineValue.toLocaleString()}</span>}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/add-lead`);
              setToast({ message: 'Lead form link copied!', type: 'success' });
            }}
            className="flex flex-shrink-0 items-center px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg font-medium hover:border-brand-gold hover:text-white transition-colors"
          >
            <Link2 className="h-4 w-4 mr-2" />
            Share Form
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex flex-shrink-0 items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 shadow-brand-glow transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Lead
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-x-auto overflow-y-hidden gap-x-6 pb-8 snap-x">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter(l => l.stage === stage);
          return (
            <div
              key={stage}
              className="flex-shrink-0 w-80 flex flex-col snap-center bg-zinc-950/70 border border-zinc-900 rounded-lg"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className={`px-4 py-3 flex justify-between items-center rounded-t-xl ${getStageHeaderColor(stage)}`}>
                <h3 className="font-semibold text-sm tracking-wide uppercase">{stage}</h3>
                <span className="text-xs font-medium px-2 py-0.5 bg-black/30 rounded-full">{stageLeads.length}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-sm hover:shadow-brand-glow transition-all cursor-grab active:cursor-grabbing group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white group-hover:text-brand-gold transition-colors">{lead.business_name}</h4>
                      <button
                        onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                        className="text-zinc-500 hover:text-white"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    {lead.value && (
                      <div className="text-sm font-semibold text-brand-gold mb-2">£{parseFloat(lead.value).toLocaleString()}</div>
                    )}

                    <div className="space-y-1.5 mb-3">
                      {lead.contact_name && (
                        <div className="flex items-center text-xs text-zinc-400">
                          <Users className="h-3.5 w-3.5 mr-2 text-zinc-500" /> {lead.contact_name}
                        </div>
                      )}
                      {lead.website_url && (
                        <div className="flex items-center text-xs text-zinc-400">
                          <Globe className="h-3.5 w-3.5 mr-2 text-zinc-500" /> {lead.website_url}
                        </div>
                      )}
                      {lead.location && (
                        <div className="flex items-center text-xs text-zinc-400">
                          <MapPin className="h-3.5 w-3.5 mr-2 text-zinc-500" /> {lead.location}
                        </div>
                      )}
                      {lead.industry && (
                        <div className="flex items-center text-xs text-zinc-400">
                          <Building className="h-3.5 w-3.5 mr-2 text-zinc-500" /> {lead.industry}
                        </div>
                      )}
                      {lead.source && (
                        <div className="flex items-center text-xs text-zinc-400">
                          <Activity className="h-3.5 w-3.5 mr-2 text-zinc-500" /> {lead.source}
                        </div>
                      )}
                    </div>

                    {lead.notes && (
                      <div className="bg-black/50 p-2.5 rounded-lg mb-3">
                        <p className="text-xs text-zinc-400 line-clamp-3 whitespace-pre-wrap">{lead.notes}</p>
                      </div>
                    )}

                    {lead.follow_up_date && (
                      <div className="flex items-center text-xs text-brand-gold font-medium bg-brand-gold/10 px-2 py-1.5 rounded w-fit mb-3">
                        <Calendar className="h-3.5 w-3.5 mr-2" />
                        Follow Up: {new Date(lead.follow_up_date).toLocaleDateString('en-GB')}
                      </div>
                    )}

                    {/* Expanded actions */}
                    {expandedLead === lead.id && (
                      <div className="border-t border-zinc-800 pt-3 mt-2 space-y-2">
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-brand-gold transition-colors">
                            <Mail className="h-3.5 w-3.5" /> {lead.email}
                          </a>
                        )}
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-brand-gold transition-colors">
                            <Phone className="h-3.5 w-3.5" /> {lead.phone}
                          </a>
                        )}
                        {stage === 'Won' && !lead.converted_client_id && (
                          <button
                            onClick={() => setShowConvertModal(lead)}
                            className="w-full mt-2 px-3 py-2 bg-green-900/50 text-green-400 text-xs font-bold rounded-lg hover:bg-green-900 transition-colors flex items-center justify-center gap-2"
                          >
                            <ArrowRight className="h-3.5 w-3.5" /> Convert to Client
                          </button>
                        )}
                        {lead.converted_client_id && (
                          <Link
                            href={`/admin-dashboard/clients?id=${lead.converted_client_id}`}
                            className="w-full mt-2 px-3 py-2 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded-lg hover:bg-brand-gold/20 transition-colors flex items-center justify-center gap-2"
                          >
                            <Users className="h-3.5 w-3.5" /> View Client
                          </Link>
                        )}
                        <button
                          onClick={() => deletePipelineLead(lead)}
                          className="w-full mt-2 px-3 py-2 bg-red-900/20 text-red-400 text-xs font-bold rounded-lg hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete Lead
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl text-sm text-zinc-600 font-medium">
                    Drop lead here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Create New Lead</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Business Name *</label>
                  <input type="text" value={form.business_name} onChange={e => setForm({ ...form, business_name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Contact Name</label>
                  <input type="text" value={form.contact_name} onChange={e => setForm({ ...form, contact_name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="John Smith" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="john@acme.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Phone</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="07..." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Website URL</label>
                  <input type="url" value={form.website_url} onChange={e => setForm({ ...form, website_url: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="acme.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Project Value (£)</label>
                  <input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="2500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Location</label>
                  <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="Ashford, Kent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Industry</label>
                  <input type="text" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="Construction" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Lead Source</label>
                  <select value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm">
                    <option>Website Form</option>
                    <option>Elle Chatbot</option>
                    <option>Manual entry</option>
                    <option>Referral</option>
                    <option>Discovery Form</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Follow-up Date</label>
                  <input type="date" value={form.follow_up_date} onChange={e => setForm({ ...form, follow_up_date: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Notes</label>
                <textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="Details about this lead..."></textarea>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-zinc-700 rounded-md text-sm font-medium text-zinc-400 bg-transparent hover:bg-zinc-800 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={saveLead} disabled={saving}
                  className="px-4 py-2 rounded-md text-sm font-medium text-black bg-brand-gold hover:bg-yellow-500 shadow-brand-glow transition-all disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Lead'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Convert to Client Modal */}
      {showConvertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowConvertModal(null)} />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Convert to Client</h2>
              <p className="text-sm text-zinc-400 mt-2">
                Convert <span className="text-brand-gold font-semibold">{showConvertModal.business_name}</span> from a lead into an active client?
              </p>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4 mb-6 space-y-2 text-sm">
              {showConvertModal.contact_name && <div className="text-zinc-300"><span className="text-zinc-500">Contact:</span> {showConvertModal.contact_name}</div>}
              {showConvertModal.email && <div className="text-zinc-300"><span className="text-zinc-500">Email:</span> {showConvertModal.email}</div>}
              {showConvertModal.value && <div className="text-zinc-300"><span className="text-zinc-500">Value:</span> £{parseFloat(showConvertModal.value).toLocaleString()}</div>}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowConvertModal(null)}
                className="flex-1 px-4 py-2 border border-zinc-700 rounded-md text-sm font-medium text-zinc-400 hover:bg-zinc-800 transition-colors">
                Not Yet
              </button>
              <button onClick={() => convertToClient(showConvertModal)} disabled={converting}
                className="flex-1 px-4 py-2 rounded-md text-sm font-medium text-black bg-green-500 hover:bg-green-400 transition-colors disabled:opacity-50">
                {converting ? 'Converting...' : 'Yes, Convert'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
