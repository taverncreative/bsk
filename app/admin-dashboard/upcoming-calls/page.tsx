'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar as CalendarIcon, Clock, PhoneCall, Globe, User, Mail, MessageSquare } from 'lucide-react';

export default function UpcomingCallsPage() {
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: true })
        .order('booking_time', { ascending: true });

      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        // Filter out past bookings to only show upcoming
        const todayStr = new Date().toISOString().split('T')[0];
        const upcoming = data.filter((b: any) => b.booking_date >= todayStr);
        setCalls(upcoming);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getWebsiteFromNotes = (notes: string) => {
    if (!notes) return null;
    const match = notes.match(/Website:\s*([^\n]+)/);
    return match ? match[1].trim() : null;
  };
  
  const cleanNotes = (notes: string) => {
    if (!notes) return null;
    return notes.replace(/Website:\s*([^\n]+)\n\nNotes:\s*/, '').trim();
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
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Upcoming Calls</h1>
        <p className="text-zinc-400">View and manage your scheduled consultations across all calendar times.</p>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        {calls.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            <PhoneCall className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No upcoming calls right now.</p>
            <p className="text-sm mt-1">Bookings will appear here automatically when clients submit the calendar form.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/60">
            {calls.map((call) => {
              const website = getWebsiteFromNotes(call.notes);
              const actualNotes = cleanNotes(call.notes);
              
              const d = new Date(call.booking_date);
              const formattedDate = d.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
              const timeString = call.booking_time ? call.booking_time.slice(0, 5) : 'Unknown';

              return (
                <div key={call.id} className="p-6 md:p-8 hover:bg-zinc-900/40 transition-colors flex flex-col md:flex-row gap-8 items-start">
                  
                  {/* Left Col: Target Date Block */}
                  <div className="w-full md:w-48 shrink-0 flex flex-col gap-3">
                    <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-4 text-center">
                       <span className="block text-brand-gold font-bold text-sm uppercase tracking-wider mb-1">
                         {d.toLocaleDateString('en-GB', { month: 'short' })}
                       </span>
                       <span className="block text-4xl font-black text-white">
                         {d.toLocaleDateString('en-GB', { day: 'numeric' })}
                       </span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-zinc-300 font-semibold bg-zinc-900 border border-zinc-800 py-3 rounded-xl mt-1">
                      <Clock className="w-4 h-4 text-brand-gold" />
                      {timeString}
                    </div>
                  </div>

                  {/* Mid Col: Details */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
                        <User className="w-5 h-5 text-zinc-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{call.name}</h3>
                        <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-900/40 text-emerald-400 mt-1 border border-emerald-900/50">
                          {call.status === 'confirmed' ? 'Call Confirmed' : call.status}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 ps-13 mb-5">
                      <div className="flex items-center text-sm text-zinc-400 gap-3">
                        <Mail className="w-4 h-4 shrink-0 text-zinc-600" />
                        <a href={`mailto:${call.email}`} className="hover:text-white transition-colors break-all">
                           {call.email}
                        </a>
                      </div>
                      {website && (
                        <div className="flex items-center text-sm text-zinc-400 gap-3">
                          <Globe className="w-4 h-4 shrink-0 text-brand-gold/60" />
                          <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="text-brand-gold/80 hover:text-brand-gold transition-colors break-all">
                             {website}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    {actualNotes && actualNotes !== 'None' && (
                      <div className="ps-13">
                        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-sm text-zinc-300">
                          <span className="flex items-center gap-2 font-bold text-zinc-500 mb-2 text-xs uppercase tracking-wider">
                            <MessageSquare className="w-3.5 h-3.5" /> Meeting Context / Notes
                          </span>
                          {actualNotes}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
