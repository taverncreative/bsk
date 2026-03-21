'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { ClipboardList, ChevronLeft, Calendar, Building2, Trash2, KanbanSquare, Users, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface DiscoverySubmission {
  id: string;
  client_slug: string;
  form_data: Record<string, string>;
  completed_at: string;
  created_at: string;
}

interface LinkedLead {
  id: string;
  business_name: string;
  discovery_submission_id: string;
}

interface LinkedClient {
  id: string;
  company_name: string;
  discovery_submission_id: string;
}

export default function DiscoveryPage() {
  const [submissions, setSubmissions] = useState<DiscoverySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<DiscoverySubmission | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [linkedLeads, setLinkedLeads] = useState<Record<string, LinkedLead>>({});
  const [linkedClients, setLinkedClients] = useState<Record<string, LinkedClient>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      const [subsRes, leadsRes, clientsRes] = await Promise.all([
        supabase.from('discovery_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('leads').select('id, business_name, discovery_submission_id').not('discovery_submission_id', 'is', null),
        supabase.from('clients').select('id, company_name, discovery_submission_id').not('discovery_submission_id', 'is', null),
      ]);

      if (subsRes.error) {
        if (subsRes.error.code === 'PGRST205' || subsRes.error.code === '42P01') {
          setSubmissions([]);
        } else {
          console.error('Error fetching discovery submissions:', subsRes.error);
        }
      } else {
        setSubmissions(subsRes.data || []);
      }

      // Build lookup maps
      const leadsMap: Record<string, LinkedLead> = {};
      (leadsRes.data || []).forEach((l: LinkedLead) => {
        if (l.discovery_submission_id) leadsMap[l.discovery_submission_id] = l;
      });
      setLinkedLeads(leadsMap);

      const clientsMap: Record<string, LinkedClient> = {};
      (clientsRes.data || []).forEach((c: LinkedClient) => {
        if (c.discovery_submission_id) clientsMap[c.discovery_submission_id] = c;
      });
      setLinkedClients(clientsMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (s) => s.toUpperCase())
      .replace(/_/g, ' ');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatSlug = (slug: string) => {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission? This cannot be undone.')) return;
    try {
      setDeleting(id);
      const supabase = createClient();
      const { error } = await supabase
        .from('discovery_submissions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting submission:', error);
        setToast({ message: 'Failed to delete submission', type: 'error' });
      } else {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        if (selected?.id === id) setSelected(null);
        setToast({ message: 'Submission deleted', type: 'success' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  const addAsLead = async (sub: DiscoverySubmission) => {
    setActionLoading(`lead-${sub.id}`);
    try {
      const supabase = createClient();
      const fd = sub.form_data;

      // Build notes from all form fields
      const noteLines = Object.entries(fd)
        .filter(([, v]) => v && v.trim())
        .map(([k, v]) => `${formatLabel(k)}: ${v}`)
        .join('\n');

      const { data, error } = await supabase.from('leads').insert([{
        business_name: formatSlug(sub.client_slug),
        contact_name: fd.contactName || fd.name || '',
        email: fd.email || fd.contactEmail || '',
        phone: fd.phone || fd.contactPhone || '',
        website_url: fd.website || fd.websiteUrl || fd.currentWebsite || '',
        notes: `Discovery form submission\n\n${noteLines}`,
        source: 'Discovery Form',
        stage: 'New Lead',
        discovery_submission_id: sub.id,
      }]).select().single();

      if (error) {
        setToast({ message: 'Failed to add as lead', type: 'error' });
        return;
      }

      if (data) {
        await supabase.from('activity_log').insert([{
          entity_type: 'lead',
          entity_id: data.id,
          action: 'created_from_discovery',
          description: `Lead created from ${formatSlug(sub.client_slug)} discovery form`,
        }]);

        setLinkedLeads(prev => ({ ...prev, [sub.id]: { id: data.id, business_name: data.business_name, discovery_submission_id: sub.id } }));
        setToast({ message: `${formatSlug(sub.client_slug)} added to pipeline!`, type: 'success' });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Something went wrong', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  const addAsClient = async (sub: DiscoverySubmission) => {
    setActionLoading(`client-${sub.id}`);
    try {
      const supabase = createClient();
      const fd = sub.form_data;

      const noteLines = Object.entries(fd)
        .filter(([, v]) => v && v.trim())
        .map(([k, v]) => `${formatLabel(k)}: ${v}`)
        .join('\n');

      const { data, error } = await supabase.from('clients').insert([{
        company_name: formatSlug(sub.client_slug),
        contact_name: fd.contactName || fd.name || '',
        email: fd.email || fd.contactEmail || '',
        phone: fd.phone || fd.contactPhone || '',
        website: fd.website || fd.websiteUrl || fd.currentWebsite || '',
        notes: `From discovery form\n\n${noteLines}`,
        discovery_submission_id: sub.id,
        status: 'active',
      }]).select().single();

      if (error) {
        setToast({ message: 'Failed to add as client', type: 'error' });
        return;
      }

      if (data) {
        await supabase.from('activity_log').insert([{
          entity_type: 'client',
          entity_id: data.id,
          action: 'created_from_discovery',
          description: `Client created from ${formatSlug(sub.client_slug)} discovery form`,
        }]);

        setLinkedClients(prev => ({ ...prev, [sub.id]: { id: data.id, company_name: data.company_name, discovery_submission_id: sub.id } }));
        setToast({ message: `${formatSlug(sub.client_slug)} added as client!`, type: 'success' });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Something went wrong', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  const renderLinkedStatus = (subId: string) => {
    const lead = linkedLeads[subId];
    const client = linkedClients[subId];

    if (!lead && !client) return null;

    return (
      <div className="flex flex-wrap gap-2">
        {lead && (
          <Link
            href="/admin-dashboard/pipeline"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-900/40 text-blue-300 hover:bg-blue-900/60 transition-colors"
          >
            <CheckCircle className="h-3 w-3" />
            In Pipeline: {lead.business_name}
          </Link>
        )}
        {client && (
          <Link
            href={`/admin-dashboard/clients?id=${client.id}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-900/40 text-green-300 hover:bg-green-900/60 transition-colors"
          >
            <CheckCircle className="h-3 w-3" />
            Client: {client.company_name}
          </Link>
        )}
      </div>
    );
  };

  const renderActionButtons = (sub: DiscoverySubmission) => {
    const hasLead = !!linkedLeads[sub.id];
    const hasClient = !!linkedClients[sub.id];

    if (hasLead && hasClient) return null;

    return (
      <div className="flex gap-2">
        {!hasLead && (
          <button
            onClick={(e) => { e.stopPropagation(); addAsLead(sub); }}
            disabled={actionLoading === `lead-${sub.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-gold text-black hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            {actionLoading === `lead-${sub.id}` ? (
              <div className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
            ) : (
              <KanbanSquare className="h-3 w-3" />
            )}
            Add as Lead
          </button>
        )}
        {!hasClient && (
          <button
            onClick={(e) => { e.stopPropagation(); addAsClient(sub); }}
            disabled={actionLoading === `client-${sub.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-green-500 hover:text-green-400 transition-colors disabled:opacity-50"
          >
            {actionLoading === `client-${sub.id}` ? (
              <div className="w-3 h-3 rounded-full border-2 border-zinc-400 border-t-transparent animate-spin" />
            ) : (
              <Users className="h-3 w-3" />
            )}
            Add as Client
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin"></div>
      </div>
    );
  }

  // Detail view
  if (selected) {
    const fields = Object.entries(selected.form_data).filter(
      ([, v]) => v && v.trim()
    );

    return (
      <div>
        {toast && (
          <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
            toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'
          }`}>{toast.message}</div>
        )}

        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to submissions
        </button>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-brand-gold" />
            <h1 className="text-2xl font-bold text-white">
              {formatSlug(selected.client_slug)}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {renderActionButtons(selected)}
            <button
              onClick={() => handleDelete(selected.id)}
              disabled={deleting === selected.id}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {deleting === selected.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <p className="text-zinc-500 text-sm">
            Submitted {formatDate(selected.completed_at || selected.created_at)}
          </p>
          {renderLinkedStatus(selected.id)}
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="divide-y divide-zinc-800">
            {fields.map(([key, value]) => (
              <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
                <div className="text-sm font-medium text-zinc-400">
                  {formatLabel(key)}
                </div>
                <div className="md:col-span-2 text-sm text-white whitespace-pre-wrap">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {fields.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            No form data recorded for this submission.
          </div>
        )}
      </div>
    );
  }

  // List view
  return (
    <div>
      {toast && (
        <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
          toast.type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' : 'bg-red-900/90 text-red-200 border border-red-700'
        }`}>{toast.message}</div>
      )}

      <div className="flex items-center gap-3 mb-2">
        <ClipboardList className="h-6 w-6 text-brand-gold" />
        <h1 className="text-2xl font-bold text-white">Discovery Forms</h1>
      </div>
      <p className="text-zinc-500 text-sm mb-8">
        Client discovery form submissions — link them to your pipeline or client list.
      </p>

      {submissions.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
          <ClipboardList className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 text-lg font-medium">No submissions yet</p>
          <p className="text-zinc-600 text-sm mt-1">
            Discovery form submissions will appear here once clients complete them.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {submissions.map((sub) => {
            const fieldCount = Object.values(sub.form_data).filter(
              (v) => v && v.trim()
            ).length;
            return (
              <div
                key={sub.id}
                className="w-full text-left bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-brand-gold/40 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <button
                    onClick={() => setSelected(sub)}
                    className="flex items-center gap-3 text-left flex-1 min-w-0"
                  >
                    <Building2 className="h-5 w-5 text-zinc-600 group-hover:text-brand-gold transition-colors shrink-0" />
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold group-hover:text-brand-gold transition-colors">
                        {formatSlug(sub.client_slug)}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Calendar className="h-3 w-3" />
                          {formatDate(sub.completed_at || sub.created_at)}
                        </span>
                        <span className="text-xs text-zinc-600">
                          {fieldCount} field{fieldCount !== 1 ? 's' : ''} completed
                        </span>
                      </div>
                      <div className="mt-2">
                        {renderLinkedStatus(sub.id)}
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    {renderActionButtons(sub)}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(sub.id);
                      }}
                      disabled={deleting === sub.id}
                      className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete submission"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setSelected(sub)}
                      className="p-2 text-zinc-600 hover:text-brand-gold transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
