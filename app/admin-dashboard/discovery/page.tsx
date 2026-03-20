'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { ClipboardList, ChevronLeft, Calendar, Building2 } from 'lucide-react';

interface DiscoverySubmission {
  id: string;
  client_slug: string;
  form_data: Record<string, string>;
  completed_at: string;
  created_at: string;
}

export default function DiscoveryPage() {
  const [submissions, setSubmissions] = useState<DiscoverySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<DiscoverySubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('discovery_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST205' || error.code === '42P01') {
          console.warn('Discovery submissions table not created yet.');
          setSubmissions([]);
        } else {
          console.error('Error fetching discovery submissions:', error);
        }
      } else {
        setSubmissions(data || []);
      }
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
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to submissions
        </button>

        <div className="flex items-center gap-3 mb-2">
          <Building2 className="h-6 w-6 text-brand-gold" />
          <h1 className="text-2xl font-bold text-white">
            {formatSlug(selected.client_slug)}
          </h1>
        </div>
        <p className="text-zinc-500 text-sm mb-8">
          Submitted {formatDate(selected.completed_at || selected.created_at)}
        </p>

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
      <div className="flex items-center gap-3 mb-2">
        <ClipboardList className="h-6 w-6 text-brand-gold" />
        <h1 className="text-2xl font-bold text-white">Discovery Forms</h1>
      </div>
      <p className="text-zinc-500 text-sm mb-8">
        Client discovery form submissions
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
              <button
                key={sub.id}
                onClick={() => setSelected(sub)}
                className="w-full text-left bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-brand-gold/40 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-zinc-600 group-hover:text-brand-gold transition-colors" />
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-brand-gold transition-colors">
                        {formatSlug(sub.client_slug)}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Calendar className="h-3 w-3" />
                          {formatDate(sub.completed_at || sub.created_at)}
                        </span>
                        <span className="text-xs text-zinc-600">
                          {fieldCount} field{fieldCount !== 1 ? 's' : ''} completed
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-zinc-700 rotate-180 group-hover:text-brand-gold transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
