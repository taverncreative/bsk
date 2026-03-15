'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';

interface ChatLog {
  id: string;
  session_id: string;
  page_context: string;
  visitor_message: string;
  elle_response: string;
  action_triggered: string;
  visitor_ip: string;
  created_at: string;
}

export default function ElleLogsPage() {
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('All');

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

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.visitor_message?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.page_context?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'All' || log.action_triggered === filterAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Elle Conversations</h1>
        <div className="text-sm text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-md">
          Total Logs: {logs.length}
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
                  <th className="px-6 py-4 text-left font-semibold text-zinc-300">Context / URL</th>
                  <th className="px-6 py-4 text-left font-semibold text-zinc-300">Action Taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-900/30 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-400">
                      {new Date(log.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium line-clamp-1 group-hover:text-brand-gold transition-colors">
                        {log.visitor_message || 'N/A'}
                      </div>
                      <div className="text-zinc-500 mt-1 line-clamp-1 italic text-xs">
                        {log.elle_response || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 truncate max-w-[200px]">
                      {log.page_context === 'Unknown' ? '-' : log.page_context}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                        log.action_triggered === 'Website Review Requested' ? 'bg-green-400/10 text-green-400' :
                        log.action_triggered === 'Call Offered' ? 'bg-blue-400/10 text-blue-400' :
                        log.action_triggered === 'Message Submission Form' ? 'bg-purple-400/10 text-purple-400' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {log.action_triggered}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}