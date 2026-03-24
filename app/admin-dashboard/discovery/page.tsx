'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { ClipboardList, ChevronLeft, Calendar, Building2, Trash2, KanbanSquare, Users, CheckCircle, ArrowRight, Plus, Sparkles, Copy, ExternalLink, Eye, Edit3, X, Save, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import Link from 'next/link';

interface DiscoverySubmission {
  id: string;
  client_slug: string;
  form_data: Record<string, string>;
  completed_at: string;
  created_at: string;
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'radio';
  prefilled?: string;
  placeholder?: string;
  helpText?: string;
  options?: string[];
}

interface FormSection {
  id: string;
  title: string;
  subtitle?: string;
  fields: FormField[];
}

interface DiscoveryForm {
  id: string;
  client_slug: string;
  client_name: string;
  password: string;
  sections: FormSection[];
  status: string;
  view_count: number;
  last_viewed_at: string | null;
  created_at: string;
}

interface LinkedLead { id: string; business_name: string; discovery_submission_id: string; }
interface LinkedClient { id: string; company_name: string; discovery_submission_id: string; }

// Company Profile Component - loads/creates profile from discovery submission
function CompanyProfile({ submission, supabase, toast }: { submission: DiscoverySubmission; supabase: any; toast: (t: { message: string; type: 'success' | 'error' }) => void }) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingJobs, setEditingJobs] = useState(false);
  const [newJob, setNewJob] = useState('');
  const [newSuggestion, setNewSuggestion] = useState('');
  const [profileNotes, setProfileNotes] = useState('');

  useEffect(() => { loadProfile(); }, [submission.id]);

  const loadProfile = async () => {
    setLoading(true);
    const { data } = await supabase.from('company_profiles').select('*').eq('discovery_submission_id', submission.id).single();
    if (data) {
      setProfile(data);
      setProfileNotes(data.notes || '');
    }
    setLoading(false);
  };

  const createProfile = async () => {
    const fd = submission.form_data;
    const name = fd.companyName || fd.businessName || fd.company_name || submission.client_slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
    const { data, error } = await supabase.from('company_profiles').insert([{
      discovery_submission_id: submission.id,
      business_name: name,
      form_data: fd,
      immediate_jobs: [],
      future_suggestions: [],
    }]).select().single();
    if (!error && data) { setProfile(data); toast({ message: 'Company profile created!', type: 'success' }); }
    else { toast({ message: 'Failed to create profile', type: 'error' }); }
  };

  const addJob = async () => {
    if (!newJob.trim() || !profile) return;
    const jobs = [...(profile.immediate_jobs || []), { title: newJob, added_to_todos: false, added_to_production: false }];
    await supabase.from('company_profiles').update({ immediate_jobs: jobs, updated_at: new Date().toISOString() }).eq('id', profile.id);
    setProfile({ ...profile, immediate_jobs: jobs });
    setNewJob('');
  };

  const addSuggestion = async () => {
    if (!newSuggestion.trim() || !profile) return;
    const suggestions = [...(profile.future_suggestions || []), { title: newSuggestion }];
    await supabase.from('company_profiles').update({ future_suggestions: suggestions, updated_at: new Date().toISOString() }).eq('id', profile.id);
    setProfile({ ...profile, future_suggestions: suggestions });
    setNewSuggestion('');
  };

  const addJobToTodo = async (job: any, idx: number) => {
    await supabase.from('todos').insert([{ title: job.title, notes: `From ${profile.business_name} company profile` }]);
    const jobs = [...profile.immediate_jobs];
    jobs[idx] = { ...jobs[idx], added_to_todos: true };
    await supabase.from('company_profiles').update({ immediate_jobs: jobs }).eq('id', profile.id);
    setProfile({ ...profile, immediate_jobs: jobs });
    toast({ message: `"${job.title}" added to To-Do`, type: 'success' });
  };

  const addJobToProduction = async (job: any, idx: number) => {
    await supabase.from('projects').insert([{ name: job.title, description: `From ${profile.business_name} company profile`, production_stage: 'briefing', client_id: profile.client_id || null }]);
    const jobs = [...profile.immediate_jobs];
    jobs[idx] = { ...jobs[idx], added_to_production: true };
    await supabase.from('company_profiles').update({ immediate_jobs: jobs }).eq('id', profile.id);
    setProfile({ ...profile, immediate_jobs: jobs });
    toast({ message: `"${job.title}" added to Production`, type: 'success' });
  };

  const saveNotes = async () => {
    if (!profile) return;
    await supabase.from('company_profiles').update({ notes: profileNotes, updated_at: new Date().toISOString() }).eq('id', profile.id);
    toast({ message: 'Notes saved', type: 'success' });
  };

  if (loading) return <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 mb-6 animate-pulse h-20" />;

  if (!profile) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 mb-6 text-center">
        <p className="text-zinc-400 mb-3">No company profile yet for this submission.</p>
        <button onClick={createProfile} className="px-4 py-2 bg-brand-gold text-black rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors">
          Create Company Profile
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-1">{profile.business_name}</h3>
        <p className="text-xs text-zinc-500 mb-4">Company Profile — Last updated {new Date(profile.updated_at).toLocaleDateString('en-GB')}</p>

        {/* Immediate Jobs */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-brand-gold uppercase tracking-wider mb-3">Immediate Jobs</h4>
          {(profile.immediate_jobs || []).length === 0 && <p className="text-xs text-zinc-600 mb-2">No jobs added yet.</p>}
          <div className="space-y-2 mb-3">
            {(profile.immediate_jobs || []).map((job: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between bg-zinc-900/50 rounded-lg px-3 py-2">
                <span className="text-sm text-zinc-300">{job.title}</span>
                <div className="flex gap-2">
                  {!job.added_to_todos && (
                    <button onClick={() => addJobToTodo(job, idx)} className="text-xs text-brand-gold hover:text-white transition-colors">+ To-Do</button>
                  )}
                  {!job.added_to_production && (
                    <button onClick={() => addJobToProduction(job, idx)} className="text-xs text-blue-400 hover:text-white transition-colors">+ Production</button>
                  )}
                  {job.added_to_todos && <span className="text-xs text-green-600">In To-Do</span>}
                  {job.added_to_production && <span className="text-xs text-blue-600">In Production</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newJob} onChange={e => setNewJob(e.target.value)} onKeyDown={e => e.key === 'Enter' && addJob()}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md py-1.5 px-3 text-sm text-white placeholder:text-zinc-600" placeholder="Add a job..." />
            <button onClick={addJob} className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-300 hover:text-white transition-colors">Add</button>
          </div>
        </div>

        {/* Future Suggestions */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Future Expansion</h4>
          {(profile.future_suggestions || []).length === 0 && <p className="text-xs text-zinc-600 mb-2">No suggestions yet.</p>}
          <div className="space-y-2 mb-3">
            {(profile.future_suggestions || []).map((s: any, idx: number) => (
              <div key={idx} className="bg-zinc-900/50 rounded-lg px-3 py-2">
                <span className="text-sm text-zinc-300">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newSuggestion} onChange={e => setNewSuggestion(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSuggestion()}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md py-1.5 px-3 text-sm text-white placeholder:text-zinc-600" placeholder="Add a suggestion..." />
            <button onClick={addSuggestion} className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md text-xs text-zinc-300 hover:text-white transition-colors">Add</button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Profile Notes</h4>
          <textarea value={profileNotes} onChange={e => setProfileNotes(e.target.value)} rows={3}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-sm text-white mb-2" placeholder="Additional notes..." />
          <button onClick={saveNotes} className="text-xs text-brand-gold hover:text-white transition-colors">Save Notes</button>
        </div>
      </div>
    </div>
  );
}

export default function DiscoveryPage() {
  const [activeTab, setActiveTab] = useState<'forms' | 'submissions'>('forms');
  const [submissions, setSubmissions] = useState<DiscoverySubmission[]>([]);
  const [forms, setForms] = useState<DiscoveryForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<DiscoverySubmission | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [linkedLeads, setLinkedLeads] = useState<Record<string, LinkedLead>>({});
  const [linkedClients, setLinkedClients] = useState<Record<string, LinkedClient>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Form builder state
  const [showBuilder, setShowBuilder] = useState(false);
  const [meetingNotes, setMeetingNotes] = useState('');
  const [generating, setGenerating] = useState(false);
  const [editingForm, setEditingForm] = useState<{ clientName: string; clientSlug: string; password: string; sections: FormSection[] } | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => { fetchAll(); }, []);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const fetchAll = async () => {
    setLoading(true);
    const [subsRes, formsRes, leadsRes, clientsRes] = await Promise.all([
      supabase.from('discovery_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('discovery_forms').select('*').order('created_at', { ascending: false }),
      supabase.from('leads').select('id, business_name, discovery_submission_id').not('discovery_submission_id', 'is', null),
      supabase.from('clients').select('id, company_name, discovery_submission_id').not('discovery_submission_id', 'is', null),
    ]);
    setSubmissions(subsRes.data || []);
    setForms(formsRes.data || []);

    const leadsMap: Record<string, LinkedLead> = {};
    (leadsRes.data || []).forEach((l: LinkedLead) => { if (l.discovery_submission_id) leadsMap[l.discovery_submission_id] = l; });
    setLinkedLeads(leadsMap);
    const clientsMap: Record<string, LinkedClient> = {};
    (clientsRes.data || []).forEach((c: LinkedClient) => { if (c.discovery_submission_id) clientsMap[c.discovery_submission_id] = c; });
    setLinkedClients(clientsMap);
    setLoading(false);
  };

  const formatLabel = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).replace(/_/g, ' ');
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const formatSlug = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const handleDelete = async (id: string, table: string = 'discovery_submissions') => {
    if (!confirm('Delete this? This cannot be undone.')) return;
    setDeleting(id);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      setToast({ message: 'Failed to delete', type: 'error' });
    } else {
      if (table === 'discovery_submissions') {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        if (selected?.id === id) setSelected(null);
      } else {
        setForms(prev => prev.filter(f => f.id !== id));
      }
      setToast({ message: 'Deleted', type: 'success' });
    }
    setDeleting(null);
  };

  const addAsLead = async (sub: DiscoverySubmission) => {
    setActionLoading(`lead-${sub.id}`);
    const fd = sub.form_data;
    const name = formatSlug(sub.client_slug);
    const email = fd.email || fd.contactEmail || '';
    const noteLines = Object.entries(fd).filter(([, v]) => v && v.trim()).map(([k, v]) => `${formatLabel(k)}: ${v}`).join('\n');

    // Check for existing lead with same name or email
    let query = supabase.from('leads').select('id, business_name, notes').limit(1);
    if (email) {
      query = query.or(`business_name.ilike.${name},email.eq.${email}`);
    } else {
      query = query.ilike('business_name', name);
    }
    const { data: existing } = await query.maybeSingle();

    if (existing) {
      const updatedNotes = `${existing.notes || ''}\n\n--- Discovery Form Data ---\n${noteLines}`.trim();
      await supabase.from('leads').update({ discovery_submission_id: sub.id, notes: updatedNotes }).eq('id', existing.id);
      setLinkedLeads(prev => ({ ...prev, [sub.id]: { id: existing.id, business_name: existing.business_name, discovery_submission_id: sub.id } }));
      setToast({ message: `Linked to existing lead: ${existing.business_name}`, type: 'success' });
    } else {
      const { data, error } = await supabase.from('leads').insert([{
        business_name: name, contact_name: fd.contactName || fd.name || '',
        email, phone: fd.phone || fd.contactPhone || '',
        website_url: fd.website || fd.websiteUrl || fd.currentWebsite || '',
        notes: `Discovery form submission\n\n${noteLines}`, source: 'Discovery Form', stage: 'New Lead', discovery_submission_id: sub.id,
      }]).select().single();
      if (!error && data) {
        await supabase.from('activity_log').insert([{ entity_type: 'lead', entity_id: data.id, action: 'created_from_discovery', description: `Lead created from ${name} discovery form` }]);
        setLinkedLeads(prev => ({ ...prev, [sub.id]: { id: data.id, business_name: data.business_name, discovery_submission_id: sub.id } }));
        setToast({ message: `${name} added to pipeline!`, type: 'success' });
      } else { setToast({ message: 'Failed to add as lead', type: 'error' }); }
    }
    setActionLoading(null);
  };

  const addAsClient = async (sub: DiscoverySubmission) => {
    setActionLoading(`client-${sub.id}`);
    const fd = sub.form_data;
    const name = formatSlug(sub.client_slug);
    const email = fd.email || fd.contactEmail || '';
    const noteLines = Object.entries(fd).filter(([, v]) => v && v.trim()).map(([k, v]) => `${formatLabel(k)}: ${v}`).join('\n');

    // Check for existing client with same name or email
    let query = supabase.from('clients').select('id, company_name, notes').limit(1);
    if (email) {
      query = query.or(`company_name.ilike.${name},email.eq.${email}`);
    } else {
      query = query.ilike('company_name', name);
    }
    const { data: existing } = await query.maybeSingle();

    if (existing) {
      const updatedNotes = `${existing.notes || ''}\n\n--- Discovery Form Data ---\n${noteLines}`.trim();
      await supabase.from('clients').update({ discovery_submission_id: sub.id, notes: updatedNotes }).eq('id', existing.id);
      setLinkedClients(prev => ({ ...prev, [sub.id]: { id: existing.id, company_name: existing.company_name, discovery_submission_id: sub.id } }));
      setToast({ message: `Linked to existing client: ${existing.company_name}`, type: 'success' });
    } else {
      const { data, error } = await supabase.from('clients').insert([{
        company_name: name, contact_name: fd.contactName || fd.name || '',
        email, phone: fd.phone || fd.contactPhone || '',
        website: fd.website || fd.websiteUrl || fd.currentWebsite || '',
        notes: `From discovery form\n\n${noteLines}`, discovery_submission_id: sub.id, status: 'active',
      }]).select().single();
      if (!error && data) {
        await supabase.from('activity_log').insert([{ entity_type: 'client', entity_id: data.id, action: 'created_from_discovery', description: `Client created from ${name} discovery form` }]);
        setLinkedClients(prev => ({ ...prev, [sub.id]: { id: data.id, company_name: data.company_name, discovery_submission_id: sub.id } }));
        setToast({ message: `${name} added as client!`, type: 'success' });
      } else { setToast({ message: 'Failed to add as client', type: 'error' }); }
    }
    setActionLoading(null);
  };

  // AI Form Builder
  const generateForm = async () => {
    if (!meetingNotes.trim()) { setToast({ message: 'Paste some meeting notes first', type: 'error' }); return; }
    setGenerating(true);
    try {
      const res = await fetch('/api/discovery/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: meetingNotes }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
      const data = await res.json();
      setEditingForm({
        clientName: data.clientName || '',
        clientSlug: data.clientSlug || '',
        password: 'bsk2025',
        sections: data.sections || [],
      });
      setToast({ message: 'Form generated! Review and edit below.', type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to generate form', type: 'error' });
    }
    setGenerating(false);
  };

  const publishForm = async () => {
    if (!editingForm || !editingForm.clientName.trim()) { setToast({ message: 'Client name is required', type: 'error' }); return; }
    setSaving(true);
    const slug = editingForm.clientSlug || editingForm.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    const { data, error } = await supabase.from('discovery_forms').insert([{
      client_name: editingForm.clientName,
      client_slug: slug,
      password: editingForm.password || 'bsk2025',
      sections: editingForm.sections,
      status: 'published',
    }]).select().single();
    if (error) {
      setToast({ message: `Failed to publish: ${error.message}`, type: 'error' });
    } else {
      setToast({ message: 'Form published!', type: 'success' });
      setEditingForm(null);
      setShowBuilder(false);
      setMeetingNotes('');
      fetchAll();
    }
    setSaving(false);
  };

  // Form editor helpers
  const updateSection = (sectionIdx: number, key: string, value: string) => {
    if (!editingForm) return;
    const sections = [...editingForm.sections];
    (sections[sectionIdx] as any)[key] = value;
    setEditingForm({ ...editingForm, sections });
  };

  const updateField = (sectionIdx: number, fieldIdx: number, key: string, value: any) => {
    if (!editingForm) return;
    const sections = [...editingForm.sections];
    (sections[sectionIdx].fields[fieldIdx] as any)[key] = value;
    setEditingForm({ ...editingForm, sections });
  };

  const addField = (sectionIdx: number) => {
    if (!editingForm) return;
    const sections = [...editingForm.sections];
    sections[sectionIdx].fields.push({
      id: `field_${Date.now()}`, label: 'New Field', type: 'text', prefilled: '', placeholder: '', helpText: '',
    });
    setEditingForm({ ...editingForm, sections });
  };

  const removeField = (sectionIdx: number, fieldIdx: number) => {
    if (!editingForm) return;
    const sections = [...editingForm.sections];
    sections[sectionIdx].fields.splice(fieldIdx, 1);
    setEditingForm({ ...editingForm, sections });
  };

  const addSection = () => {
    if (!editingForm) return;
    setEditingForm({
      ...editingForm,
      sections: [...editingForm.sections, { id: `section_${Date.now()}`, title: 'New Section', subtitle: '', fields: [{ id: `field_${Date.now()}`, label: 'New Field', type: 'text', prefilled: '', placeholder: '', helpText: '' }] }],
    });
  };

  const removeSection = (idx: number) => {
    if (!editingForm) return;
    const sections = [...editingForm.sections];
    sections.splice(idx, 1);
    setEditingForm({ ...editingForm, sections });
  };

  const getFormUrl = (form: DiscoveryForm) => {
    return (form as any).form_url || `/discovery/form/${form.id}`;
  };

  const copyLink = (form: DiscoveryForm) => {
    const url = `${window.location.origin}${getFormUrl(form)}`;
    navigator.clipboard.writeText(url);
    setCopied(form.id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin"></div></div>;
  }

  // Submission detail view
  if (selected) {
    const fields = Object.entries(selected.form_data).filter(([, v]) => v && v.trim());
    return (
      <div>
        {toast && <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'}`}>{toast.message}</div>}
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"><ChevronLeft className="h-4 w-4" /> Back</button>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-brand-gold" />
            <h1 className="text-2xl font-bold text-white">{formatSlug(selected.client_slug)}</h1>
          </div>
          <div className="flex items-center gap-2">
            {!linkedLeads[selected.id] && <button onClick={() => addAsLead(selected)} disabled={actionLoading === `lead-${selected.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-gold text-black hover:bg-yellow-500 transition-colors disabled:opacity-50"><KanbanSquare className="h-3 w-3" /> Add as Lead</button>}
            {!linkedClients[selected.id] && <button onClick={() => addAsClient(selected)} disabled={actionLoading === `client-${selected.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-green-500 hover:text-green-400 transition-colors disabled:opacity-50"><Users className="h-3 w-3" /> Add as Client</button>}
            <button onClick={() => handleDelete(selected.id)} disabled={deleting === selected.id} className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
          </div>
        </div>
        <p className="text-zinc-500 text-sm mb-8">Submitted {formatDate(selected.completed_at || selected.created_at)}</p>

        {/* Company Profile Section */}
        <CompanyProfile submission={selected} supabase={supabase} toast={setToast} />

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden mt-6">
          <div className="px-4 py-3 border-b border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Raw Form Data</h3>
          </div>
          <div className="divide-y divide-zinc-800">
            {fields.map(([key, value]) => (
              <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
                <div className="text-sm font-medium text-zinc-400">{formatLabel(key)}</div>
                <div className="md:col-span-2 text-sm text-white whitespace-pre-wrap">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {toast && <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'}`}>{toast.message}</div>}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Discovery</h1>
          <p className="text-zinc-500 text-sm">Create, manage, and track client discovery forms.</p>
        </div>
        <button onClick={() => { setShowBuilder(!showBuilder); setEditingForm(null); }}
          className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors text-sm">
          <Sparkles className="h-4 w-4 mr-2" /> {showBuilder ? 'Close Builder' : 'Create Form'}
        </button>
      </div>

      {/* AI Form Builder */}
      {showBuilder && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 mb-8">
          {!editingForm ? (
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Generate Discovery Form with AI</h2>
              <p className="text-sm text-zinc-400 mb-4">Paste your meeting notes, client info, or anything you know about the project. AI will generate a structured discovery form with pre-filled fields.</p>
              <textarea value={meetingNotes} onChange={e => setMeetingNotes(e.target.value)} rows={8}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 px-4 text-white text-sm placeholder:text-zinc-600 mb-4"
                placeholder="E.g. Met with John from Acme Plumbing. They're based in Ashford, been trading 15 years. Current website is outdated, built on WordPress. They want a modern site that generates leads. Main services: boiler installation, central heating, emergency plumbing. Budget around £2-3k for the website..." />
              <button onClick={generateForm} disabled={generating}
                className="flex items-center px-5 py-2.5 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors text-sm disabled:opacity-50">
                <Sparkles className="h-4 w-4 mr-2" /> {generating ? 'Generating...' : 'Generate Form'}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Edit Discovery Form</h2>
                <div className="flex gap-2">
                  <button onClick={() => setEditingForm(null)} className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                  <button onClick={publishForm} disabled={saving}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-500 transition-colors disabled:opacity-50">
                    <Save className="h-4 w-4 mr-2" /> {saving ? 'Publishing...' : 'Publish Form'}
                  </button>
                </div>
              </div>

              {/* Client details */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Client Name</label>
                  <input value={editingForm.clientName} onChange={e => setEditingForm({ ...editingForm, clientName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">URL Slug</label>
                  <input value={editingForm.clientSlug} onChange={e => setEditingForm({ ...editingForm, clientSlug: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Password</label>
                  <input value={editingForm.password} onChange={e => setEditingForm({ ...editingForm, password: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" />
                </div>
              </div>

              {/* Sections editor */}
              <div className="space-y-4">
                {editingForm.sections.map((section, si) => (
                  <div key={section.id} className="border border-zinc-800 rounded-lg overflow-hidden">
                    <button onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      className="w-full flex items-center justify-between p-4 bg-zinc-900/50 hover:bg-zinc-900 transition-colors text-left">
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-4 w-4 text-zinc-600" />
                        <div>
                          <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                          <p className="text-xs text-zinc-500">{section.fields.length} field{section.fields.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); removeSection(si); }} className="text-zinc-600 hover:text-red-400 transition-colors p-1"><Trash2 className="h-3.5 w-3.5" /></button>
                        {expandedSection === section.id ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
                      </div>
                    </button>

                    {expandedSection === section.id && (
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-zinc-500 mb-1">Section Title</label>
                            <input value={section.title} onChange={e => updateSection(si, 'title', e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-700 rounded-md py-1.5 px-2.5 text-white text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs text-zinc-500 mb-1">Subtitle</label>
                            <input value={section.subtitle || ''} onChange={e => updateSection(si, 'subtitle', e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-700 rounded-md py-1.5 px-2.5 text-white text-sm" />
                          </div>
                        </div>

                        {/* Fields */}
                        <div className="space-y-3">
                          {section.fields.map((field, fi) => (
                            <div key={field.id} className="bg-zinc-900/50 rounded-lg p-3">
                              <div className="grid grid-cols-12 gap-2 items-start">
                                <div className="col-span-4">
                                  <label className="block text-[10px] text-zinc-600 mb-0.5">Label</label>
                                  <input value={field.label} onChange={e => updateField(si, fi, 'label', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-white" />
                                </div>
                                <div className="col-span-2">
                                  <label className="block text-[10px] text-zinc-600 mb-0.5">Type</label>
                                  <select value={field.type} onChange={e => updateField(si, fi, 'type', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-white">
                                    <option value="text">Text</option>
                                    <option value="textarea">Textarea</option>
                                    <option value="select">Select</option>
                                    <option value="radio">Radio</option>
                                  </select>
                                </div>
                                <div className="col-span-5">
                                  <label className="block text-[10px] text-zinc-600 mb-0.5">Pre-filled Value</label>
                                  <input value={field.prefilled || ''} onChange={e => updateField(si, fi, 'prefilled', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-white" placeholder="Leave empty if unknown" />
                                </div>
                                <div className="col-span-1 flex justify-center pt-4">
                                  <button onClick={() => removeField(si, fi)} className="text-zinc-600 hover:text-red-400"><X className="h-3.5 w-3.5" /></button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                  <label className="block text-[10px] text-zinc-600 mb-0.5">Placeholder</label>
                                  <input value={field.placeholder || ''} onChange={e => updateField(si, fi, 'placeholder', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-white" />
                                </div>
                                <div>
                                  <label className="block text-[10px] text-zinc-600 mb-0.5">Help Text</label>
                                  <input value={field.helpText || ''} onChange={e => updateField(si, fi, 'helpText', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-white" />
                                </div>
                              </div>
                              {(field.type === 'select' || field.type === 'radio') && (
                                <div className="mt-2">
                                  <label className="block text-[10px] text-zinc-600 mb-0.5">Options (comma-separated)</label>
                                  <input value={(field.options || []).join(', ')} onChange={e => updateField(si, fi, 'options', e.target.value.split(',').map((o: string) => o.trim()).filter(Boolean))}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-white" placeholder="Option 1, Option 2, Option 3" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <button onClick={() => addField(si)} className="text-xs text-brand-gold hover:text-white transition-colors flex items-center gap-1">
                          <Plus className="h-3 w-3" /> Add Field
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addSection} className="mt-4 text-sm text-brand-gold hover:text-white transition-colors flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Section
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveTab('forms')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'forms' ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/30' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'}`}>
          Sent Forms ({forms.length})
        </button>
        <button onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'submissions' ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/30' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'}`}>
          Submissions ({submissions.length})
        </button>
      </div>

      {/* Sent Forms Tab */}
      {activeTab === 'forms' && (
        <div>
          {forms.length === 0 ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
              <ClipboardList className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg font-medium">No forms created yet</p>
              <p className="text-zinc-600 text-sm mt-1">Use the AI builder above to create your first discovery form.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {forms.map(form => (
                <div key={form.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold">{form.client_name}</h3>
                    <div className="flex items-center gap-4 mt-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${form.status === 'published' ? 'bg-green-900/50 text-green-300' : 'bg-zinc-800 text-zinc-400'}`}>{form.status}</span>
                      <span className="flex items-center gap-1 text-xs text-zinc-500"><Eye className="h-3 w-3" /> {form.view_count} view{form.view_count !== 1 ? 's' : ''}</span>
                      {form.last_viewed_at && <span className="text-xs text-zinc-600">Last opened: {formatDate(form.last_viewed_at)}</span>}
                      <span className="text-xs text-zinc-600">Created: {formatDate(form.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => copyLink(form)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${copied === form.id ? 'bg-green-900/50 text-green-300' : 'bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white'}`}>
                      {copied === form.id ? <><CheckCircle className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy Link</>}
                    </button>
                    <a href={getFormUrl(form)} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white transition-colors">
                      <ExternalLink className="h-3 w-3" /> Open
                    </a>
                    <button onClick={() => handleDelete(form.id, 'discovery_forms')} disabled={deleting === form.id}
                      className="p-2 text-zinc-600 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submissions Tab */}
      {activeTab === 'submissions' && (
        <div>
          {submissions.length === 0 ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
              <ClipboardList className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg font-medium">No submissions yet</p>
              <p className="text-zinc-600 text-sm mt-1">Submissions will appear here once clients complete their forms.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {submissions.map(sub => {
                const fieldCount = Object.values(sub.form_data).filter(v => v && v.trim()).length;
                return (
                  <div key={sub.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-brand-gold/40 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <button onClick={() => setSelected(sub)} className="flex items-center gap-3 text-left flex-1 min-w-0">
                        <Building2 className="h-5 w-5 text-zinc-600 shrink-0" />
                        <div className="min-w-0">
                          <h3 className="text-white font-semibold">{formatSlug(sub.client_slug)}</h3>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className="flex items-center gap-1 text-xs text-zinc-500"><Calendar className="h-3 w-3" />{formatDate(sub.completed_at || sub.created_at)}</span>
                            <span className="text-xs text-zinc-600">{fieldCount} fields</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {linkedLeads[sub.id] && <Link href="/admin-dashboard/pipeline" className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-900/40 text-blue-300"><CheckCircle className="h-3 w-3" /> In Pipeline</Link>}
                            {linkedClients[sub.id] && <Link href={`/admin-dashboard/clients?id=${linkedClients[sub.id].id}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/40 text-green-300"><CheckCircle className="h-3 w-3" /> Client</Link>}
                          </div>
                        </div>
                      </button>
                      <div className="flex items-center gap-2 shrink-0">
                        {!linkedLeads[sub.id] && <button onClick={() => addAsLead(sub)} disabled={actionLoading === `lead-${sub.id}`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-gold text-black hover:bg-yellow-500 transition-colors disabled:opacity-50"><KanbanSquare className="h-3 w-3" /> Lead</button>}
                        {!linkedClients[sub.id] && <button onClick={() => addAsClient(sub)} disabled={actionLoading === `client-${sub.id}`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-green-400 transition-colors disabled:opacity-50"><Users className="h-3 w-3" /> Client</button>}
                        <button onClick={() => handleDelete(sub.id)} disabled={deleting === sub.id} className="p-2 text-zinc-600 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        <button onClick={() => setSelected(sub)} className="p-2 text-zinc-600 hover:text-brand-gold transition-colors"><ArrowRight className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
