'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function RequestsPage() {
  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const { data, error } = await supabase.from('tickets').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setTickets(data);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // In a real app, bind client_id from auth user. RLS will protect us here.
    const { error } = await supabase.from('tickets').insert({
      title: formData.get('title'),
      description: formData.get('description'),
      ticket_type: formData.get('type'),
      priority: formData.get('priority'),
      page_url: formData.get('url'),
      status: 'Submitted'
    });

    setLoading(false);
    if (!error) {
      setShowModal(false);
      fetchTickets();
    } else {
      console.error(error);
      alert('Error saving ticket');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'In Progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Scheduled': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'In Review': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-zinc-800 text-zinc-300 border-zinc-700'; // Submitted
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Website Requests</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors shadow-brand-glow"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Request
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg shadow overlow-hidden">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-2.5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search requests..." 
              className="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold sm:text-sm"
            />
          </div>
          <button className="flex items-center text-zinc-400 hover:text-white text-sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </button>
        </div>
        
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-zinc-900/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Request ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Submitted</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-950 divide-y divide-zinc-800">
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-zinc-500">No requests found.</td>
              </tr>
            ) : tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-zinc-900/50 transition-colors cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-300">
                  {ticket.id.substring(0, 8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{ticket.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">{ticket.ticket_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">{new Date(ticket.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Submit New Request</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Request Type</label>
                <select name="type" required className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm">
                  <option>Website update</option>
                  <option>SEO request</option>
                  <option>Content change</option>
                  <option>Technical issue</option>
                  <option>New feature request</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Title</label>
                <input required name="title" type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="e.g., Update staff photos" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Page URL (Optional)</label>
                <input name="url" type="url" className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
                <textarea required name="description" rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="Please describe what needs to be changed..."></textarea>
              </div>

              <div className="flex justify-between items-center space-x-4 pt-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Priority</label>
                  <select name="priority" className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Attachments</label>
                  <input type="file" className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer" />
                </div>
              </div>

              <div className="pt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-zinc-700 rounded-md shadow-sm text-sm font-medium text-zinc-300 bg-transparent hover:bg-zinc-800">
                  Cancel
                </button>
                <button disabled={loading} type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-brand-gold hover:bg-yellow-500 shadow-brand-glow disabled:opacity-50">
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}