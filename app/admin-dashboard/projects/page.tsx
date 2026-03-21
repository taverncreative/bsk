'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { FolderOpen, Plus, X, ArrowLeft, Edit3, Save, Trash2, Users, Calendar, PoundSterling, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [linkedTodos, setLinkedTodos] = useState<any[]>([]);

  const [addForm, setAddForm] = useState({
    name: '', client_id: '', value: '', status: 'in_progress',
    start_date: '', end_date: '', description: '',
  });

  const supabase = createClient();

  useEffect(() => { loadData(); }, []);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const loadData = async () => {
    const [projRes, clientsRes] = await Promise.all([
      supabase.from('projects').select('*, clients(company_name)').order('created_at', { ascending: false }),
      supabase.from('clients').select('id, company_name').order('company_name'),
    ]);
    setProjects(projRes.data || []);
    setClients(clientsRes.data || []);
    setLoading(false);
  };

  const openDetail = async (project: any) => {
    setSelectedProject(project);
    setEditForm(project);
    setEditing(false);
    const { data } = await supabase.from('todos').select('*').eq('project_id', project.id).order('due_date');
    setLinkedTodos(data || []);
  };

  const addProject = async () => {
    if (!addForm.name.trim()) { setToast({ message: 'Project name is required', type: 'error' }); return; }
    setSaving(true);
    const { error } = await supabase.from('projects').insert([{
      name: addForm.name,
      client_id: addForm.client_id || null,
      value: addForm.value ? parseFloat(addForm.value) : null,
      status: addForm.status,
      start_date: addForm.start_date || null,
      end_date: addForm.end_date || null,
      description: addForm.description || null,
    }]);
    if (error) {
      setToast({ message: 'Failed to add project', type: 'error' });
    } else {
      setToast({ message: 'Project created!', type: 'success' });
      setShowAddModal(false);
      setAddForm({ name: '', client_id: '', value: '', status: 'in_progress', start_date: '', end_date: '', description: '' });
      loadData();
    }
    setSaving(false);
  };

  const saveProject = async () => {
    setSaving(true);
    const { error } = await supabase.from('projects').update({
      name: editForm.name,
      client_id: editForm.client_id || null,
      value: editForm.value ? parseFloat(editForm.value) : null,
      status: editForm.status,
      start_date: editForm.start_date || null,
      end_date: editForm.end_date || null,
      description: editForm.description || null,
      updated_at: new Date().toISOString(),
    }).eq('id', selectedProject.id);
    if (error) {
      setToast({ message: 'Failed to save', type: 'error' });
    } else {
      setToast({ message: 'Project updated!', type: 'success' });
      setEditing(false);
      loadData();
      setSelectedProject({ ...selectedProject, ...editForm });
    }
    setSaving(false);
  };

  const deleteProject = async () => {
    await supabase.from('projects').delete().eq('id', selectedProject.id);
    setToast({ message: 'Project deleted', type: 'success' });
    setSelectedProject(null);
    loadData();
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-zinc-800 text-zinc-300';
      case 'in_progress': return 'bg-blue-900/50 text-blue-300';
      case 'completed': return 'bg-green-900/50 text-green-300';
      case 'on_hold': return 'bg-yellow-900/50 text-yellow-300';
      default: return 'bg-zinc-800 text-zinc-300';
    }
  };

  const statusLabel = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin"></div></div>;
  }

  // Detail view
  if (selectedProject) {
    return (
      <div>
        {toast && <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'}`}>{toast.message}</div>}

        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setSelectedProject(null)} className="flex items-center text-zinc-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
          </button>
          <div className="flex gap-3">
            {!editing ? (
              <>
                <button onClick={() => setEditing(true)} className="flex items-center px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg font-medium hover:border-brand-gold text-sm transition-colors">
                  <Edit3 className="h-4 w-4 mr-2" /> Edit
                </button>
                <button onClick={deleteProject} className="flex items-center px-4 py-2 bg-zinc-900 border border-red-900/50 text-red-400 rounded-lg font-medium hover:bg-red-900/20 text-sm transition-colors">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setEditing(false); setEditForm(selectedProject); }} className="px-4 py-2 border border-zinc-700 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={saveProject} disabled={saving} className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium text-sm disabled:opacity-50">
                  <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <FolderOpen className="w-7 h-7 text-brand-gold" />
                </div>
                <div>
                  {editing ? (
                    <input value={editForm.name || ''} onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      className="text-2xl font-bold bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white w-full" />
                  ) : (
                    <h1 className="text-2xl font-bold text-white">{selectedProject.name}</h1>
                  )}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold mt-1 ${statusBadge(selectedProject.status)}`}>
                    {editing ? (
                      <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                        className="bg-transparent border-none text-xs p-0 focus:ring-0">
                        <option value="planning">Planning</option>
                        <option value="in_progress">In Progress</option>
                        <option value="on_hold">On Hold</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : statusLabel(selectedProject.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-zinc-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500">Client</p>
                    {editing ? (
                      <select value={editForm.client_id || ''} onChange={e => setEditForm({ ...editForm, client_id: e.target.value })}
                        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white w-full mt-0.5">
                        <option value="">None</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                      </select>
                    ) : (
                      <p className="text-sm text-zinc-300">{selectedProject.clients?.company_name || '—'}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PoundSterling className="w-4 h-4 text-zinc-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500">Project Value</p>
                    {editing ? (
                      <input type="number" value={editForm.value || ''} onChange={e => setEditForm({ ...editForm, value: e.target.value })}
                        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white w-full mt-0.5" />
                    ) : (
                      <p className="text-sm text-zinc-300">{selectedProject.value ? `£${parseFloat(selectedProject.value).toLocaleString()}` : '—'}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-zinc-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500">Start Date</p>
                    {editing ? (
                      <input type="date" value={editForm.start_date || ''} onChange={e => setEditForm({ ...editForm, start_date: e.target.value })}
                        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white w-full mt-0.5" />
                    ) : (
                      <p className="text-sm text-zinc-300">{selectedProject.start_date ? new Date(selectedProject.start_date).toLocaleDateString('en-GB') : '—'}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-zinc-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500">End Date</p>
                    {editing ? (
                      <input type="date" value={editForm.end_date || ''} onChange={e => setEditForm({ ...editForm, end_date: e.target.value })}
                        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white w-full mt-0.5" />
                    ) : (
                      <p className="text-sm text-zinc-300">{selectedProject.end_date ? new Date(selectedProject.end_date).toLocaleDateString('en-GB') : '—'}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs text-zinc-500 mb-1">Description</p>
                {editing ? (
                  <textarea value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={3}
                    className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white w-full" />
                ) : (
                  <p className="text-sm text-zinc-300 whitespace-pre-wrap">{selectedProject.description || 'No description.'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Linked To-Dos</h3>
              {linkedTodos.length === 0 ? (
                <p className="text-xs text-zinc-600 text-center py-4">No to-dos linked to this project.</p>
              ) : (
                <div className="space-y-2">
                  {linkedTodos.map(todo => (
                    <div key={todo.id} className="flex items-center gap-2">
                      {todo.completed_at ? <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" /> : <Clock className="h-3.5 w-3.5 text-zinc-500 shrink-0" />}
                      <span className={`text-xs ${todo.completed_at ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}>{todo.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Dates</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-zinc-500">Created</span><span className="text-zinc-300">{new Date(selectedProject.created_at).toLocaleDateString('en-GB')}</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">Updated</span><span className="text-zinc-300">{new Date(selectedProject.updated_at || selectedProject.created_at).toLocaleDateString('en-GB')}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      {toast && <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'}`}>{toast.message}</div>}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Projects</h1>
          <p className="text-zinc-400">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors text-sm">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
          <FolderOpen className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
          <p className="text-zinc-500">No projects yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map(proj => (
            <button key={proj.id} onClick={() => openDetail(proj)}
              className="text-left bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-white group-hover:text-brand-gold transition-colors">{proj.name}</h3>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusBadge(proj.status)}`}>{statusLabel(proj.status)}</span>
              </div>
              {proj.clients?.company_name && <p className="text-sm text-zinc-400 mb-1">{proj.clients.company_name}</p>}
              {proj.value && <p className="text-sm font-semibold text-brand-gold mt-2">£{parseFloat(proj.value).toLocaleString()}</p>}
              <div className="flex items-center gap-3 mt-2">
                {proj.start_date && <span className="text-xs text-zinc-600">{new Date(proj.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>}
                {proj.start_date && proj.end_date && <span className="text-xs text-zinc-700">→</span>}
                {proj.end_date && <span className="text-xs text-zinc-600">{new Date(proj.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">New Project</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Project Name *</label>
                <input value={addForm.name} onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Website Build" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Client</label>
                  <select value={addForm.client_id} onChange={e => setAddForm({ ...addForm, client_id: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm">
                    <option value="">Select client...</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Value (£)</label>
                  <input type="number" value={addForm.value} onChange={e => setAddForm({ ...addForm, value: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="2500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Status</label>
                  <select value={addForm.status} onChange={e => setAddForm({ ...addForm, status: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm">
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Start Date</label>
                  <input type="date" value={addForm.start_date} onChange={e => setAddForm({ ...addForm, start_date: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">End Date</label>
                  <input type="date" value={addForm.end_date} onChange={e => setAddForm({ ...addForm, end_date: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
                <textarea value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })} rows={3}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Project details..." />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-zinc-700 rounded-md text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={addProject} disabled={saving}
                  className="px-4 py-2 bg-brand-gold text-black rounded-md text-sm font-medium hover:bg-yellow-500 disabled:opacity-50">{saving ? 'Creating...' : 'Create Project'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
