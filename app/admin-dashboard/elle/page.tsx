'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Loader2, Calendar, MessageSquare, Target, PhoneCall, AlertTriangle, X } from 'lucide-react';

interface ChatLog {
  id: string;
  session_id: string;
  page_context: string;
  detected_url?: string;
  visitor_message: string;
  elle_response: string;
  action_triggered: string;
  problem_detected?: string;
  lead_intent_score?: string;
  visitor_ip: string;
  created_at: string;
}

export default function ElleLogsPage() {
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('All');
  const [filterDate, setFilterDate] = useState('All'); // Today, 7Days, 30Days, All

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [transcriptLogs, setTranscriptLogs] = useState<ChatLog[]>([]);
  const [loadingTranscript, setLoadingTranscript] = useState(false);

  useEffect(() => {
    fetch('/api/elle-logs')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setLogs(data || []);
        }
      })
      .catch((err) => {
        setError('Failed to load chat logs');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = log.visitor_message?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            log.page_context?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAction = filterAction === 'All' || log.action_triggered === filterAction;
      
      let matchesDate = true;
      const logDate = new Date(log.created_at).getTime();
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      
      if (filterDate === 'Today') {
        matchesDate = (now - logDate) < oneDay;
      } else if (filterDate === '7Days') {
        matchesDate = (now - logDate) < 7 * oneDay;
      } else if (filterDate === '30Days') {
        matchesDate = (now - logDate) < 30 * oneDay;
      }

      return matchesSearch && matchesAction && matchesDate;
    });
  }, [logs, searchTerm, filterAction, filterDate]);

  // Compute stats
  const stats = useMemo(() => {
    const rawConversationsToday = logs.filter(l => 
      l.action_triggered === 'conversation_started' && 
      (Date.now() - new Date(l.created_at).getTime()) < (24 * 60 * 60 * 1000)
    ).length;

    // Use total messages if conversation_started isn't present yet, as a fallback estimate
    const messageGroupsToday = new Set(
      logs.filter(l => (Date.now() - new Date(l.created_at).getTime()) < (24 * 60 * 60 * 1000)).map(l => l.session_id)
    ).size;
    const totalConversationsToday = Math.max(rawConversationsToday, messageGroupsToday);

    const reviewsRequested = filteredLogs.filter(l => l.action_triggered === 'Website Review Requested').length;
    const callsBooked = filteredLogs.filter(l => l.action_triggered === 'Call Offered').length;
    
    const problemCounts = filteredLogs.reduce((acc: any, log) => {
      const prob = log.problem_detected;
      if (prob && prob !== 'unknown') {
        acc[prob] = (acc[prob] || 0) + 1;
      }
      return acc;
    }, {});
    
    let topProblem = 'None Detected';
    let maxProbCount = 0;
    for (const [prob, count] of Object.entries(problemCounts)) {
      if ((count as number) > maxProbCount) {
        maxProbCount = count as number;
        // Capitalize safely
        if (typeof prob === 'string') {
          topProblem = prob.charAt(0).toUpperCase() + prob.slice(1);
        }
      }
    }

    return { totalConversationsToday, reviewsRequested, callsBooked, topProblem };
  }, [logs, filteredLogs]);

  const fetchTranscript = async (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setLoadingTranscript(true);
    setTranscriptLogs([]);
    try {
      const res = await fetch(`/api/elle-logs/${sessionId}`);
      const data = await res.json();
      if (!data.error) {
        setTranscriptLogs(data || []);
      }
    } catch (err) {
      console.error('Failed to load transcript', err);
    } finally {
      setLoadingTranscript(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Elle Conversations</h1>
        <div className="flex gap-4">
           {/* Date filter global */}
           <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-md">
            <Calendar className="h-4 w-4 text-brand-gold" />
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-transparent text-sm text-neutral-400 focus:outline-none"
            >
              <option value="Today">Today</option>
              <option value="7Days">7 Days</option>
              <option value="30Days">30 Days</option>
              <option value="All">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <MessageSquare className="h-5 w-5 text-brand-gold" />
            <h3 className="text-sm font-medium">Conversations (Today)</h3>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalConversationsToday}</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Target className="h-5 w-5 text-green-400" />
            <h3 className="text-sm font-medium">Reviews Requested</h3>
          </div>
          <p className="text-3xl font-bold text-white">{stats.reviewsRequested}</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <PhoneCall className="h-5 w-5 text-blue-400" />
            <h3 className="text-sm font-medium">Calls Offered</h3>
          </div>
          <p className="text-3xl font-bold text-white">{stats.callsBooked}</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <AlertTriangle className="h-5 w-5 text-purple-400" />
            <h3 className="text-sm font-medium">Top Problem</h3>
          </div>
          <p className="text-xl font-bold text-white leading-tight capitalize truncate mt-1">{stats.topProblem}</p>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-lg mb-8">
        <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
          
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search by message or page..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-neutral-500" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="bg-black border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-gold"
            >
              <option value="All">All Actions</option>
              <option value="conversation_started">Chat Opened</option>
              <option value="Website Review Requested">Review Requested</option>
              <option value="Call Offered">Call Offered</option>
              <option value="Message Submission Form">Message Form</option>
              <option value="None">No Action</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center p-12 text-zinc-500">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-3">Loading logs...</span>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-400">
              {error}
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-zinc-500">
              No conversations found matching your filters.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-zinc-800 text-sm">
              <thead className="bg-zinc-900/50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-zinc-300">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-zinc-300">Visitor Message</th>
                  <th className="px-6 py-4 text-left font-semibold text-zinc-300">Context / Intent</th>
                  <th className="px-6 py-4 text-left font-semibold text-zinc-300">Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredLogs.map((log) => (
                  <tr 
                    key={log.id} 
                    className="hover:bg-zinc-900/30 transition-colors cursor-pointer group"
                    onClick={() => fetchTranscript(log.session_id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-400">
                      {new Date(log.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium line-clamp-1 group-hover:text-brand-gold transition-colors">
                        {log.visitor_message || 'N/A'}
                      </div>
                      <div className="text-zinc-500 mt-1 line-clamp-1 italic text-xs">
                        {log.action_triggered === 'conversation_started' ? 'Widget opened by visitor' : log.elle_response || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-zinc-400 truncate max-w-[200px] text-xs mb-1">
                        {log.page_context === 'Unknown' ? '-' : log.page_context.replace('https://businesssortedkent.co.uk', '')}
                      </div>
                      {log.lead_intent_score && log.lead_intent_score !== 'cold' && (
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                            log.lead_intent_score === 'hot' ? 'bg-red-500/20 text-red-400' :
                            'bg-orange-500/20 text-orange-400'
                        }`}>
                          {log.lead_intent_score} INTENT
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex flex-col items-start gap-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                        log.action_triggered === 'Website Review Requested' ? 'bg-green-400/10 text-green-400' :
                        log.action_triggered === 'Call Offered' ? 'bg-blue-400/10 text-blue-400' :
                        log.action_triggered === 'Message Submission Form' ? 'bg-purple-400/10 text-purple-400' :
                        log.action_triggered === 'conversation_started' ? 'bg-zinc-800/80 text-zinc-300' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {log.action_triggered === 'conversation_started' ? 'Conversation Started' : log.action_triggered}
                      </span>
                      
                      {log.problem_detected && log.problem_detected !== 'unknown' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-neutral-800 text-neutral-300 uppercase">
                          Prob: {log.problem_detected}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Transcript Modal */}
      {selectedSessionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-900/50">
              <div>
                <h2 className="text-xl font-bold text-white">Chat Transcript</h2>
                <p className="text-sm text-zinc-500 mt-1 flex items-center gap-2">
                  Session ID: <span className="font-mono text-zinc-400">{selectedSessionId.slice(0, 8)}...</span>
                </p>
              </div>
              <button 
                onClick={() => setSelectedSessionId(null)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {loadingTranscript ? (
                <div className="flex flex-col items-center justify-center h-40 text-zinc-500 space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <p className="text-sm">Loading full transcript...</p>
                </div>
              ) : transcriptLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-zinc-500">
                  <p className="text-sm">No transcript found.</p>
                </div>
              ) : (
                transcriptLogs.map((entry, i) => (
                  <div key={entry.id} className="space-y-4">
                    {/* Visitor Message */}
                    {entry.visitor_message && (
                      <div className="flex justify-end pl-12">
                        <div className="bg-zinc-800 text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm shadow-sm inline-block">
                          {entry.visitor_message}
                          <div className="text-[10px] text-zinc-400 mt-1.5 font-medium border-t border-zinc-700/50 pt-1.5 flex justify-between items-center gap-4">
                            <span>Visitor</span>
                            <span>{new Date(entry.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Elle Response */}
                    {entry.elle_response && (
                      <div className="flex justify-start pr-12">
                        <div className="bg-brand-gold/10 border border-brand-gold/20 text-white px-4 py-3 rounded-2xl rounded-tl-sm text-sm shadow-sm inline-block">
                          {entry.elle_response}
                          <div className="text-[10px] text-brand-gold/70 mt-1.5 font-bold tracking-wide border-t border-brand-gold/10 pt-1.5 flex justify-between items-center gap-4">
                            <span>Elle AI</span>
                            <span className="text-brand-gold/50 font-medium">
                              {new Date(entry.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}