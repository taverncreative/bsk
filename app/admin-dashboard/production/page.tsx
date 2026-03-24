'use client';

import { useState, useEffect } from 'react';
import { Plus, MoreHorizontal, Calendar, Users, X, Trash2, Layers, Tag } from 'lucide-react';
import { createClient } from '@/lib/supabaseClient';
import Link from 'next/link';

const STAGES = ['Briefing', 'Design', 'Development', 'Review', 'QA', 'Live'];

interface ProjectForm {
  name: string;
  client_id: string;
  value: string;
  priority: string;
  start_date: string;
  end_date: string;
  description: string;
  production_stage: string;
}

const emptyForm: ProjectForm = {
  name: '',
  client_id: '',
  value: '',
  priority: 'normal',
  start_date: '',
  end_date: '',
  description: '',
  production_stage: 'Briefing',
};

export default function ProductionPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('id, name, client_id, value, status, start_date, end_date, description, production_stage, priority, created_at, updated_at, clients(company_name)')
      .order('created_at', { ascending: false });
    if (!error && data) setProjects(data);
  };

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('id, company_name')
      .order('company_name', { ascending: true });
    if (!error && data) setClients(data);
  };

  const handleDragStart = (e: React.DragEvent, projectId: string) => {
    e.dataTransfer.setData('projectId', projectId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData('projectId');
    if (!projectId) return;

    const project = projects.find(p => p.id === projectId);
    if (!project || project.production_stage === newStage) return;

    const previousStage = project.production_stage;

    // Optimistic update
    setProjects(current =>
      current.map(p => p.id === projectId ? { ...p, production_stage: newStage } : p)
    );

    const { error } = await supabase
      .from('projects')
      .update({ production_stage: newStage, updated_at: new Date().toISOString() })
      .eq('id', projectId);

    if (error) {
      // Revert on error
      setProjects(current =>
        current.map(p => p.id === projectId ? { ...p, production_stage: previousStage } : p)
      );
      setToast({ message: 'Failed to update production stage', type: 'error' });
      return;
    }

    // Log activity
    await supabase.from('activity_log').insert([{
      entity_type: 'project',
      entity_id: projectId,
      action: 'production_stage_changed',
      description: `${project.name} moved from ${previousStage} to ${newStage}`,
      metadata: { from: previousStage, to: newStage },
    }]);

    setToast({ message: `${project.name} moved to ${newStage}`, type: 'success' });
  };

  const saveProject = async () => {
    if (!form.name.trim()) {
      setToast({ message: 'Project name is required', type: 'error' });
      return;
    }
    if (!form.client_id) {
      setToast({ message: 'Please select a client', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from('projects').insert([{
        name: form.name,
        client_id: form.client_id,
        value: form.value ? parseFloat(form.value) : null,
        priority: form.priority,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
        description: form.description,
        production_stage: form.production_stage,
        status: 'active',
      }]);

      if (error) {
        setToast({ message: 'Failed to create project', type: 'error' });
        return;
      }

      setToast({ message: 'Project created successfully!', type: 'success' });
      setShowAddModal(false);
      setForm(emptyForm);
      fetchProjects();
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (project: any) => {
    if (!confirm(`Delete "${project.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('projects').delete().eq('id', project.id);
    if (error) {
      setToast({ message: 'Failed to delete project', type: 'error' });
    } else {
      setProjects(prev => prev.filter(p => p.id !== project.id));
      setExpandedProject(null);
      setToast({ message: `${project.name} deleted`, type: 'success' });
    }
  };

  const getStageHeaderColor = (stage: string) => {
    switch (stage) {
      case 'Briefing': return 'bg-zinc-800 text-zinc-300';
      case 'Design': return 'bg-purple-900/40 text-purple-400 border-t-2 border-purple-500';
      case 'Development': return 'bg-blue-900/40 text-blue-400 border-t-2 border-blue-500';
      case 'Review': return 'bg-amber-900/40 text-amber-400 border-t-2 border-amber-500';
      case 'QA': return 'bg-orange-900/40 text-orange-400 border-t-2 border-orange-500';
      case 'Live': return 'bg-green-900/40 text-green-400 border-t-2 border-green-500';
      default: return 'bg-zinc-800 text-zinc-400';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">Low</span>;
      case 'normal':
        return <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-900/40 text-blue-400">Normal</span>;
      case 'high':
        return <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-900/40 text-amber-400">High</span>;
      case 'urgent':
        return <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-900/40 text-red-400">Urgent</span>;
      default:
        return null;
    }
  };

  const getClientName = (project: any) => {
    if (project.clients?.company_name) return project.clients.company_name;
    return 'Unknown Client';
  };

  const totalValue = projects
    .filter(p => p.production_stage !== 'Live')
    .reduce((sum, p) => sum + (parseFloat(p.value) || 0), 0);

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
          <h1 className="text-3xl font-bold text-white mb-2">Production Board</h1>
          <p className="text-sm text-zinc-400">
            {projects.length} project{projects.length !== 1 ? 's' : ''} in production
            {totalValue > 0 && <span className="ml-3 text-brand-gold font-medium">Active value: £{totalValue.toLocaleString()}</span>}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex flex-shrink-0 items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 shadow-brand-glow transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </button>
      </div>

      <div className="flex flex-1 overflow-x-auto overflow-y-hidden gap-x-6 pb-8 snap-x">
        {STAGES.map((stage) => {
          const stageProjects = projects.filter(p => p.production_stage === stage);
          return (
            <div
              key={stage}
              className="flex-shrink-0 w-80 flex flex-col snap-center bg-zinc-950/70 border border-zinc-900 rounded-lg"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className={`px-4 py-3 flex justify-between items-center rounded-t-xl ${getStageHeaderColor(stage)}`}>
                <h3 className="font-semibold text-sm tracking-wide uppercase">{stage}</h3>
                <span className="text-xs font-medium px-2 py-0.5 bg-black/30 rounded-full">{stageProjects.length}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {stageProjects.map((project) => (
                  <div
                    key={project.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, project.id)}
                    className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-sm hover:shadow-brand-glow transition-all cursor-grab active:cursor-grabbing group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white group-hover:text-brand-gold transition-colors">{project.name}</h4>
                      <button
                        onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                        className="text-zinc-500 hover:text-white"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center text-xs text-zinc-400">
                        <Users className="h-3.5 w-3.5 mr-1 text-zinc-500" />
                        {getClientName(project)}
                      </div>
                      {project.priority && getPriorityBadge(project.priority)}
                    </div>

                    <div className="space-y-1.5 mb-3">
                      {project.start_date && (
                        <div className="flex items-center text-xs text-zinc-400">
                          <Calendar className="h-3.5 w-3.5 mr-2 text-zinc-500" />
                          Start: {new Date(project.start_date).toLocaleDateString('en-GB')}
                        </div>
                      )}
                      {project.end_date && (
                        <div className="flex items-center text-xs text-brand-gold font-medium bg-brand-gold/10 px-2 py-1.5 rounded w-fit">
                          <Calendar className="h-3.5 w-3.5 mr-2" />
                          Due: {new Date(project.end_date).toLocaleDateString('en-GB')}
                        </div>
                      )}
                    </div>

                    {/* Expanded details */}
                    {expandedProject === project.id && (
                      <div className="border-t border-zinc-800 pt-3 mt-2 space-y-3">
                        {project.description && (
                          <div className="bg-black/50 p-2.5 rounded-lg">
                            <p className="text-xs text-zinc-400 whitespace-pre-wrap">{project.description}</p>
                          </div>
                        )}

                        {project.value && (
                          <div className="flex items-center text-sm font-semibold text-brand-gold">
                            <Tag className="h-3.5 w-3.5 mr-2" />
                            £{parseFloat(project.value).toLocaleString()}
                          </div>
                        )}

                        <Link
                          href={`/admin-dashboard/projects?id=${project.id}`}
                          className="w-full px-3 py-2 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded-lg hover:bg-brand-gold/20 transition-colors flex items-center justify-center gap-2"
                        >
                          <Layers className="h-3.5 w-3.5" /> Edit Project
                        </Link>

                        <button
                          onClick={() => deleteProject(project)}
                          className="w-full px-3 py-2 bg-red-900/20 text-red-400 text-xs font-bold rounded-lg hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete Project
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {stageProjects.length === 0 && (
                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl text-sm text-zinc-600 font-medium">
                    Drop project here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Add New Project</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Project Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  placeholder="Website Redesign"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Client *</label>
                  <select
                    value={form.client_id}
                    onChange={e => setForm({ ...form, client_id: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  >
                    <option value="">Select a client...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.company_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Project Value (£)</label>
                  <input
                    type="number"
                    value={form.value}
                    onChange={e => setForm({ ...form, value: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                    placeholder="2500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Priority</label>
                  <select
                    value={form.priority}
                    onChange={e => setForm({ ...form, priority: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Production Stage</label>
                  <select
                    value={form.production_stage}
                    onChange={e => setForm({ ...form, production_stage: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  >
                    {STAGES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={form.start_date}
                    onChange={e => setForm({ ...form, start_date: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={form.end_date}
                    onChange={e => setForm({ ...form, end_date: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm"
                  placeholder="Project details and scope..."
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-zinc-700 rounded-md text-sm font-medium text-zinc-400 bg-transparent hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveProject}
                  disabled={saving}
                  className="px-4 py-2 rounded-md text-sm font-medium text-black bg-brand-gold hover:bg-yellow-500 shadow-brand-glow transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Create Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
