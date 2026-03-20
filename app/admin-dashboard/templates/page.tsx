'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Plus, X, Edit3, Trash2, FileText, Mail, Receipt, Eye, Save, Copy } from 'lucide-react';

type TemplateType = 'email' | 'invoice' | 'proposal';

const TEMPLATE_VARIABLES = [
  { var: '{{client_name}}', desc: 'Company name' },
  { var: '{{contact_name}}', desc: 'Contact person' },
  { var: '{{project_value}}', desc: 'Project value' },
  { var: '{{invoice_number}}', desc: 'Invoice number' },
  { var: '{{due_date}}', desc: 'Due date' },
  { var: '{{total}}', desc: 'Invoice total' },
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form
  const [name, setName] = useState('');
  const [type, setType] = useState<TemplateType>('email');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const supabase = createClient();

  useEffect(() => { fetchTemplates(); }, []);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const fetchTemplates = async () => {
    const { data } = await supabase.from('templates').select('*').order('created_at', { ascending: false });
    setTemplates(data || []);
    setLoading(false);
  };

  const resetForm = () => {
    setName(''); setType('email'); setSubject(''); setBody('');
    setEditingId(null);
  };

  const openEditor = (template?: any) => {
    if (template) {
      setEditingId(template.id);
      setName(template.name);
      setType(template.type);
      setSubject(template.subject || '');
      setBody(template.body || '');
    } else {
      resetForm();
    }
    setShowEditor(true);
    setShowPreview(false);
  };

  const saveTemplate = async () => {
    if (!name.trim() || !body.trim()) {
      setToast({ message: 'Name and body are required', type: 'error' });
      return;
    }
    setSaving(true);

    const payload = {
      name,
      type,
      subject,
      body,
      variables: TEMPLATE_VARIABLES.filter(v => body.includes(v.var) || subject.includes(v.var)).map(v => v.var),
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      const { error } = await supabase.from('templates').update(payload).eq('id', editingId);
      if (error) { setToast({ message: 'Failed to update', type: 'error' }); }
      else { setToast({ message: 'Template updated!', type: 'success' }); }
    } else {
      const { error } = await supabase.from('templates').insert([payload]);
      if (error) { setToast({ message: 'Failed to create', type: 'error' }); }
      else { setToast({ message: 'Template created!', type: 'success' }); }
    }

    setSaving(false);
    setShowEditor(false);
    resetForm();
    fetchTemplates();
  };

  const deleteTemplate = async (id: string) => {
    await supabase.from('templates').delete().eq('id', id);
    setToast({ message: 'Template deleted', type: 'success' });
    fetchTemplates();
  };

  const duplicateTemplate = async (template: any) => {
    await supabase.from('templates').insert([{
      name: `${template.name} (Copy)`,
      type: template.type,
      subject: template.subject,
      body: template.body,
      variables: template.variables,
    }]);
    setToast({ message: 'Template duplicated', type: 'success' });
    fetchTemplates();
  };

  const previewBody = () => {
    return body
      .replace(/\{\{client_name\}\}/g, 'Acme Corp')
      .replace(/\{\{contact_name\}\}/g, 'John Smith')
      .replace(/\{\{project_value\}\}/g, '£2,500')
      .replace(/\{\{invoice_number\}\}/g, 'BSK-001')
      .replace(/\{\{due_date\}\}/g, '15 April 2026')
      .replace(/\{\{total\}\}/g, '£3,000');
  };

  const typeIcon = (t: string) => {
    switch (t) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'invoice': return <Receipt className="h-4 w-4" />;
      case 'proposal': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const typeBadge = (t: string) => {
    switch (t) {
      case 'email': return 'bg-blue-900/50 text-blue-300';
      case 'invoice': return 'bg-green-900/50 text-green-300';
      case 'proposal': return 'bg-purple-900/50 text-purple-300';
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

  // Editor View
  if (showEditor) {
    return (
      <div>
        {toast && (
          <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
            toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'
          }`}>{toast.message}</div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">{editingId ? 'Edit Template' : 'New Template'}</h1>
          <div className="flex gap-3">
            <button onClick={() => setShowPreview(!showPreview)}
              className="flex items-center px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg text-sm hover:text-white transition-colors">
              <Eye className="h-4 w-4 mr-2" /> {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={() => { setShowEditor(false); resetForm(); }}
              className="px-4 py-2 border border-zinc-700 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
            <button onClick={saveTemplate} disabled={saving}
              className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg text-sm font-medium hover:bg-yellow-500 disabled:opacity-50">
              <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Template Name *</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Welcome Email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Type</label>
                <select value={type} onChange={e => setType(e.target.value as TemplateType)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm">
                  <option value="email">Email</option>
                  <option value="invoice">Invoice</option>
                  <option value="proposal">Proposal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Subject Line</label>
              <input value={subject} onChange={e => setSubject(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Subject for {{client_name}}" />
            </div>

            {showPreview ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 min-h-[300px]">
                <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">Preview (with sample data)</p>
                {subject && <p className="text-sm font-semibold text-white mb-4 pb-3 border-b border-zinc-800">{previewBody().split('\n')[0] || subject.replace(/\{\{client_name\}\}/g, 'Acme Corp')}</p>}
                <div className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{previewBody()}</div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Body *</label>
                <textarea value={body} onChange={e => setBody(e.target.value)} rows={14}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-3 px-4 text-white text-sm font-mono leading-relaxed" placeholder="Hi {{contact_name}},&#10;&#10;Thank you for choosing Business Sorted Kent..." />
              </div>
            )}
          </div>

          {/* Variables sidebar */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 h-fit">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Variables</h3>
            <p className="text-xs text-zinc-600 mb-4">Click to insert into body.</p>
            <div className="space-y-2">
              {TEMPLATE_VARIABLES.map(v => (
                <button
                  key={v.var}
                  onClick={() => setBody(body + v.var)}
                  className="w-full text-left px-3 py-2 bg-zinc-900 rounded-lg text-xs hover:bg-zinc-800 transition-colors group"
                >
                  <span className="text-brand-gold font-mono">{v.var}</span>
                  <span className="text-zinc-600 ml-2 group-hover:text-zinc-400">{v.desc}</span>
                </button>
              ))}
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
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Templates</h1>
          <p className="text-zinc-400">{templates.length} template{templates.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => openEditor()} className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors text-sm">
          <Plus className="h-4 w-4 mr-2" /> New Template
        </button>
      </div>

      {templates.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
          <p className="text-zinc-500 mb-2">No templates yet.</p>
          <p className="text-xs text-zinc-600">Create reusable email, invoice, and proposal templates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {templates.map(template => (
            <div key={template.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {typeIcon(template.type)}
                  <h3 className="font-bold text-white group-hover:text-brand-gold transition-colors">{template.name}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeBadge(template.type)}`}>{template.type}</span>
              </div>

              {template.subject && (
                <p className="text-sm text-zinc-400 mb-2 truncate">{template.subject}</p>
              )}

              <p className="text-xs text-zinc-500 line-clamp-3 mb-4">{template.body}</p>

              {template.variables?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.variables.map((v: string) => (
                    <span key={v} className="px-1.5 py-0.5 bg-zinc-900 rounded text-xs text-brand-gold font-mono">{v}</span>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-3 border-t border-zinc-800">
                <button onClick={() => openEditor(template)} className="flex items-center gap-1 px-3 py-1.5 bg-zinc-900 rounded text-xs text-zinc-400 hover:text-white transition-colors">
                  <Edit3 className="h-3 w-3" /> Edit
                </button>
                <button onClick={() => duplicateTemplate(template)} className="flex items-center gap-1 px-3 py-1.5 bg-zinc-900 rounded text-xs text-zinc-400 hover:text-white transition-colors">
                  <Copy className="h-3 w-3" /> Duplicate
                </button>
                <button onClick={() => deleteTemplate(template.id)} className="flex items-center gap-1 px-3 py-1.5 bg-zinc-900 rounded text-xs text-red-400 hover:text-red-300 transition-colors ml-auto">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
