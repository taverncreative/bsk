'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Plus, X, Check, ChevronDown, ChevronRight, Calendar, RefreshCw, Users, FolderOpen, Clock, CheckCircle2, Trash2, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface Todo {
  id: string;
  title: string;
  notes: string | null;
  due_date: string | null;
  is_recurring: boolean;
  recurrence_days: number | null;
  completed_at: string | null;
  client_id: string | null;
  project_id: string | null;
  created_at: string;
  clients?: { company_name: string } | null;
  projects?: { name: string } | null;
}

interface SubTask {
  id: string;
  todo_id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedTodo, setExpandedTodo] = useState<string | null>(null);
  const [subtasks, setSubtasks] = useState<Record<string, SubTask[]>>({});
  const [newSubtask, setNewSubtask] = useState('');
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Add form
  const [form, setForm] = useState({
    title: '', due_date: '', is_recurring: false, recurrence_days: 7,
    client_id: '', project_id: '', notes: '',
  });
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  useEffect(() => { loadData(); }, []);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const loadData = async () => {
    const [todosRes, clientsRes, projectsRes] = await Promise.all([
      supabase.from('todos').select('*, clients(company_name), projects(name)').order('due_date', { ascending: true, nullsFirst: false }),
      supabase.from('clients').select('id, company_name').eq('status', 'active').order('company_name'),
      supabase.from('projects').select('id, name').order('name'),
    ]);
    setTodos(todosRes.data || []);
    setClients(clientsRes.data || []);
    setProjects(projectsRes.data || []);
    setLoading(false);
  };

  const loadSubtasks = async (todoId: string) => {
    const { data } = await supabase.from('todo_subtasks').select('*').eq('todo_id', todoId).order('created_at');
    setSubtasks(prev => ({ ...prev, [todoId]: data || [] }));
  };

  const toggleExpand = async (todoId: string) => {
    if (expandedTodo === todoId) {
      setExpandedTodo(null);
      setEditingNotes(null);
    } else {
      setExpandedTodo(todoId);
      setEditingNotes(null);
      if (!subtasks[todoId]) await loadSubtasks(todoId);
    }
  };

  const addTodo = async () => {
    if (!form.title.trim()) { setToast({ message: 'Title is required', type: 'error' }); return; }
    setSaving(true);
    const { data, error } = await supabase.from('todos').insert([{
      title: form.title,
      due_date: form.due_date || null,
      is_recurring: form.is_recurring,
      recurrence_days: form.is_recurring ? form.recurrence_days : null,
      client_id: form.client_id || null,
      project_id: form.project_id || null,
      notes: form.notes || null,
    }]).select();
    if (error || !data || data.length === 0) {
      console.error('Todo insert failed:', { error, data });
      setToast({ message: `Failed to add to-do: ${error?.message || 'Permission denied — run the RLS migration'}`, type: 'error' });
    } else {
      setToast({ message: 'To-do added!', type: 'success' });
      setShowAddModal(false);
      setForm({ title: '', due_date: '', is_recurring: false, recurrence_days: 7, client_id: '', project_id: '', notes: '' });
      loadData();
    }
    setSaving(false);
  };

  const completeTodo = async (todo: Todo) => {
    if (todo.is_recurring && todo.recurrence_days && todo.due_date) {
      // Reset due date forward
      const nextDue = new Date(todo.due_date);
      nextDue.setDate(nextDue.getDate() + todo.recurrence_days);
      await supabase.from('todos').update({
        due_date: nextDue.toISOString(),
        completed_at: null,
      }).eq('id', todo.id);
      setToast({ message: `Recurring — next due ${nextDue.toLocaleDateString('en-GB')}`, type: 'success' });
    } else {
      await supabase.from('todos').update({ completed_at: new Date().toISOString() }).eq('id', todo.id);
      setToast({ message: 'Marked complete!', type: 'success' });
    }
    loadData();
  };

  const uncompleteTodo = async (todoId: string) => {
    await supabase.from('todos').update({ completed_at: null }).eq('id', todoId);
    loadData();
  };

  const deleteTodo = async (todoId: string) => {
    await supabase.from('todos').delete().eq('id', todoId);
    setExpandedTodo(null);
    setToast({ message: 'To-do deleted', type: 'success' });
    loadData();
  };

  const saveNotes = async (todoId: string) => {
    await supabase.from('todos').update({ notes: notesValue }).eq('id', todoId);
    setEditingNotes(null);
    setTodos(prev => prev.map(t => t.id === todoId ? { ...t, notes: notesValue } : t));
    setToast({ message: 'Notes saved', type: 'success' });
  };

  const addSubtask = async (todoId: string) => {
    if (!newSubtask.trim()) return;
    await supabase.from('todo_subtasks').insert([{ todo_id: todoId, title: newSubtask }]);
    setNewSubtask('');
    loadSubtasks(todoId);
  };

  const toggleSubtask = async (subtask: SubTask) => {
    await supabase.from('todo_subtasks').update({ completed: !subtask.completed }).eq('id', subtask.id);
    loadSubtasks(subtask.todo_id);
  };

  const deleteSubtask = async (subtask: SubTask) => {
    await supabase.from('todo_subtasks').delete().eq('id', subtask.id);
    loadSubtasks(subtask.todo_id);
  };

  // Progress calculation
  const getProgress = (todo: Todo) => {
    if (!todo.due_date) return null;
    const now = new Date().getTime();
    const created = new Date(todo.created_at).getTime();
    const due = new Date(todo.due_date).getTime();
    const total = due - created;
    if (total <= 0) return 100;
    const elapsed = now - created;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const getProgressColor = (pct: number) => {
    if (pct >= 100) return 'bg-red-500';
    if (pct >= 80) return 'bg-red-400';
    if (pct >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const activeTodos = todos.filter(t => !t.completed_at);
  const completedTodos = todos.filter(t => t.completed_at);

  // Sort: overdue first, then by due date, then no-date at bottom
  const sortedActive = [...activeTodos].sort((a, b) => {
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {toast && (
        <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
          toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'
        }`}>{toast.message}</div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">To-Do</h1>
          <p className="text-zinc-400">{activeTodos.length} active task{activeTodos.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors text-sm">
          <Plus className="h-4 w-4 mr-2" /> Add To-Do
        </button>
      </div>

      {/* Active To-Dos */}
      {sortedActive.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
          <p className="text-zinc-500">All clear! No tasks to do.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedActive.map((todo) => {
            const progress = getProgress(todo);
            const isOverdue = todo.due_date && new Date(todo.due_date) < new Date();
            const isExpanded = expandedTodo === todo.id;
            const todoSubtasks = subtasks[todo.id] || [];

            return (
              <div key={todo.id} className={`bg-zinc-950 border rounded-xl overflow-hidden transition-colors ${
                isOverdue ? 'border-red-900/60' : 'border-zinc-800'
              }`}>
                {/* Main row */}
                <div className="flex items-center gap-4 p-4">
                  <button onClick={() => completeTodo(todo)}
                    className="shrink-0 w-6 h-6 rounded-full border-2 border-zinc-600 hover:border-green-400 hover:bg-green-900/30 transition-colors flex items-center justify-center group">
                    <Check className="h-3.5 w-3.5 text-transparent group-hover:text-green-400 transition-colors" />
                  </button>

                  <button onClick={() => toggleExpand(todo.id)} className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white truncate">{todo.title}</h3>
                      {todo.is_recurring && <RefreshCw className="h-3 w-3 text-blue-400 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {todo.due_date && (
                        <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-400 font-medium' : 'text-zinc-500'}`}>
                          <Calendar className="h-3 w-3" />
                          {isOverdue ? 'Overdue — ' : ''}{new Date(todo.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                      {todo.clients?.company_name && (
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Users className="h-3 w-3" /> {todo.clients.company_name}
                        </span>
                      )}
                      {todo.projects?.name && (
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <FolderOpen className="h-3 w-3" /> {todo.projects.name}
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Progress bar */}
                  {progress !== null && (
                    <div className="w-24 shrink-0">
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${getProgressColor(progress)}`}
                          style={{ width: `${Math.min(progress, 100)}%` }} />
                      </div>
                      <p className="text-[10px] text-zinc-600 text-right mt-0.5">
                        {progress >= 100 ? 'Overdue' : `${Math.round(progress)}%`}
                      </p>
                    </div>
                  )}

                  <button onClick={() => toggleExpand(todo.id)} className="shrink-0 text-zinc-600 hover:text-white transition-colors">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-zinc-800 p-4 space-y-4 bg-zinc-900/30">
                    {/* Notes */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Notes</p>
                        {editingNotes !== todo.id ? (
                          <button onClick={() => { setEditingNotes(todo.id); setNotesValue(todo.notes || ''); }}
                            className="text-xs text-brand-gold hover:text-white transition-colors">Edit</button>
                        ) : (
                          <button onClick={() => saveNotes(todo.id)}
                            className="text-xs text-green-400 hover:text-white transition-colors">Save</button>
                        )}
                      </div>
                      {editingNotes === todo.id ? (
                        <textarea value={notesValue} onChange={e => setNotesValue(e.target.value)} rows={3}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white" placeholder="Add notes..." />
                      ) : (
                        <p className="text-sm text-zinc-400 whitespace-pre-wrap">{todo.notes || 'No notes yet.'}</p>
                      )}
                    </div>

                    {/* Sub-tasks */}
                    <div>
                      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Sub-tasks {todoSubtasks.length > 0 && `(${todoSubtasks.filter(s => s.completed).length}/${todoSubtasks.length})`}
                      </p>
                      <div className="space-y-2">
                        {todoSubtasks.map(st => (
                          <div key={st.id} className="flex items-center gap-3 group">
                            <button onClick={() => toggleSubtask(st)}
                              className={`shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                st.completed ? 'bg-green-900/50 border-green-600' : 'border-zinc-600 hover:border-green-400'
                              }`}>
                              {st.completed && <Check className="h-2.5 w-2.5 text-green-400" />}
                            </button>
                            <span className={`text-sm flex-1 ${st.completed ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}>
                              {st.title}
                            </span>
                            <button onClick={() => deleteSubtask(st)}
                              className="text-zinc-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <input value={newSubtask} onChange={e => setNewSubtask(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && addSubtask(todo.id)}
                          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-zinc-600"
                          placeholder="Add sub-task..." />
                        <button onClick={() => addSubtask(todo.id)}
                          className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors">
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                      <button onClick={() => deleteTodo(todo.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Completed section */}
      {completedTodos.length > 0 && (
        <div className="mt-8">
          <button onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-3">
            {showCompleted ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            Completed ({completedTodos.length})
          </button>
          {showCompleted && (
            <div className="space-y-2">
              {completedTodos.map(todo => (
                <div key={todo.id} className="bg-zinc-950/50 border border-zinc-900 rounded-xl p-4 flex items-center gap-4">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-600 line-through truncate">{todo.title}</p>
                    <p className="text-xs text-zinc-700">
                      Completed {todo.completed_at && new Date(todo.completed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <button onClick={() => uncompleteTodo(todo.id)}
                    className="text-zinc-700 hover:text-zinc-400 transition-colors" title="Undo">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}
                    className="text-zinc-700 hover:text-red-400 transition-colors" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add To-Do Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">New To-Do</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="What needs doing?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Due Date</label>
                  <input type="date" value={form.due_date} onChange={e => setForm({ ...form, due_date: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Recurring</label>
                  <div className="flex items-center gap-3 mt-1">
                    <button onClick={() => setForm({ ...form, is_recurring: !form.is_recurring })}
                      className={`relative w-10 h-5 rounded-full transition-colors ${form.is_recurring ? 'bg-brand-gold' : 'bg-zinc-700'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.is_recurring ? 'left-5.5' : 'left-0.5'}`}
                        style={{ left: form.is_recurring ? '22px' : '2px' }} />
                    </button>
                    {form.is_recurring && (
                      <select value={form.recurrence_days} onChange={e => setForm({ ...form, recurrence_days: parseInt(e.target.value) })}
                        className="bg-zinc-900 border border-zinc-800 rounded-md py-1 px-2 text-white text-xs">
                        <option value={1}>Daily</option>
                        <option value={7}>Weekly</option>
                        <option value={14}>Fortnightly</option>
                        <option value={30}>Monthly</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Client (optional)</label>
                  <select value={form.client_id} onChange={e => setForm({ ...form, client_id: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm">
                    <option value="">None</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Project (optional)</label>
                  <select value={form.project_id} onChange={e => setForm({ ...form, project_id: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm">
                    <option value="">None</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Notes</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white text-sm" placeholder="Any details..." />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-zinc-700 rounded-md text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={addTodo} disabled={saving}
                  className="px-4 py-2 bg-brand-gold text-black rounded-md text-sm font-medium hover:bg-yellow-500 disabled:opacity-50">{saving ? 'Adding...' : 'Add To-Do'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
