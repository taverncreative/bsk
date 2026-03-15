'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Globe, Clock, User, MessageSquare, ExternalLink, Calendar } from 'lucide-react';

export default function LeadInboxPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('unified_leads')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        // If the table doesn't exist yet, we catch it smoothly.
        if (error.code === 'PGRST205') {
          console.warn('Unified leads table not created yet.');
          setLeads([]);
        } else {
          console.error('Error fetching leads:', error);
        }
      } else {
        setLeads(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-800 border-t-brand-gold animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Lead Inbox</h1>
        <p className="text-zinc-400">View and manage all incoming enquiries from website forms, Elle, and bookings.</p>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        {leads.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No leads found yet.</p>
            <p className="text-sm mt-1">Once a user submits a form, they will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/60">
            {leads.map((lead) => (
              <div key={lead.id} className="p-6 md:p-8 hover:bg-zinc-900/40 transition-colors flex flex-col md:flex-row gap-8">
                {/* Left Col: Lead Identity */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{lead.name || 'Unnamed Form Submit'}</h3>
                      <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-zinc-800 text-zinc-300 mt-1">
                        {lead.submission_type}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 ps-13">
                    {lead.email && (
                      <div className="flex items-center text-sm text-zinc-400 gap-3 group">
                        <Mail className="w-4 h-4 shrink-0 text-zinc-600 group-hover:text-brand-gold transition-colors" />
                        <a href={`mailto:${lead.email}`} className="hover:text-white transition-colors break-all">
                          {lead.email}
                        </a>
                      </div>
                    )}
                    {lead.phone && (
                      <div className="flex items-center text-sm text-zinc-400 gap-3 group">
                        <svg className="w-4 h-4 shrink-0 text-zinc-600 group-hover:text-brand-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${lead.phone}`} className="hover:text-white transition-colors">
                          {lead.phone}
                        </a>
                      </div>
                    )}
                    {lead.website_url && (
                      <div className="flex items-center text-sm text-zinc-400 gap-3 group">
                        <Globe className="w-4 h-4 shrink-0 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                        <a href={lead.website_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1 break-all">
                          {lead.website_url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Col: Timestamp & Message */}
                <div className="flex-1 pl-0 md:pl-8 md:border-l border-zinc-800/60">
                  <div className="flex items-center text-xs text-zinc-500 mb-4 gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(lead.timestamp).toLocaleString('en-GB', {
                      day: 'numeric', month: 'long', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                  
                  {lead.message && (
                    <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                      {lead.message}
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-xs text-zinc-600">
                    <span className="font-semibold text-zinc-500">Source:</span> {lead.page_context}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
