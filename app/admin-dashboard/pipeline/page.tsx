'use client';

import { useState, useEffect } from 'react';
import { Plus, MoreHorizontal, Calendar, Globe, MapPin, Building, Activity } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const STAGES = ['New Lead', 'Contacted', 'Discovery Call', 'Proposal Sent', 'Won', 'Lost'];

export default function PipelinePage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setLeads(data);
    }
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (!leadId) return;

    setLeads(current => current.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
    await supabase.from('leads').update({ stage: newStage }).eq('id', leadId);
  };

  // Helper to visually distinct headers
  const getStageHeaderColor = (stage: string) => {
    switch (stage) {
      case 'New Lead': return 'bg-zinc-800 text-zinc-300';
      case 'Contacted': return 'bg-blue-900/40 text-blue-400 border-t-2 border-blue-500';
      case 'Discovery Call': return 'bg-indigo-900/40 text-indigo-400 border-t-2 border-indigo-500';
      case 'Proposal Sent': return 'bg-purple-900/40 text-purple-400 border-t-2 border-purple-500';
      case 'Won': return 'bg-green-900/40 text-green-400 border-t-2 border-green-500';
      case 'Lost': return 'bg-red-900/40 text-red-400 border-t-2 border-red-500';
      default: return 'bg-zinc-800 text-zinc-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-black min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">CRM Pipeline</h1>
          <p className="text-sm text-zinc-400">Track and manage prospective clients through your agency sales funnel.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex flex-shrink-0 items-center px-4 py-2 bg-brand-gold text-black rounded-lg font-medium hover:bg-yellow-500 shadow-brand-glow transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Lead
        </button>
      </div>

      <div className="flex flex-1 overflow-x-auto overflow-y-hidden gap-x-6 pb-8 snap-x">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter(l => l.stage === stage);
          return (
            <div 
              key={stage} 
              className="flex-shrink-0 w-80 flex flex-col snap-center bg-zinc-950/70 border border-zinc-900 rounded-lg"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className={`px-4 py-3 flex justify-between items-center rounded-t-xl ${getStageHeaderColor(stage)}`}>
                <h3 className="font-semibold text-sm tracking-wide uppercase">{stage}</h3>
                <span className="text-xs font-medium px-2 py-0.5 bg-black/30 rounded-full">{stageLeads.length}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {stageLeads.map((lead) => (
                  <div 
                    key={lead.id} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-sm hover:shadow-brand-glow transition-all cursor-grab active:cursor-grabbing group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white group-hover:text-brand-gold transition-colors">{lead.business_name}</h4>
                      <button className="text-zinc-500 hover:text-white"><MoreHorizontal className="h-4 w-4" /></button>
                    </div>
                    
                    <div className="space-y-1.5 mb-4">
                      {lead.website_url && (
                        <div className="flex items-center text-xs text-zinc-400">
                          <Globe className="h-3.5 w-3.5 mr-2 text-zinc-500" /> {lead.website_url}
                        </div>
                      )}
                      {lead.location && (
                        <div className="flex items-center text-xs text-zinc-400">
                          <MapPin className="h-3.5 w-3.5 mr-2 text-zinc-500" /> {lead.location}
                        </div>
                      )}
                      {lead.industry && (
                        <div className="flex items-center text-xs text-zinc-400">
                          <Building className="h-3.5 w-3.5 mr-2 text-zinc-500" /> {lead.industry}
                        </div>
                      )}
                      {lead.source && (
                        <div className="flex items-center text-xs text-zinc-400">
                          <Activity className="h-3.5 w-3.5 mr-2 text-zinc-500" /> {lead.source}
                        </div>
                      )}
                    </div>
                    
                    {lead.notes && (
                      <div className="bg-black/50 p-2.5 rounded-lg mb-3">
                        <p className="text-xs text-zinc-400 line-clamp-3 whitespace-pre-wrap">{lead.notes}</p>
                      </div>
                    )}

                    {lead.follow_up_date && (
                      <div className="flex items-center text-xs text-brand-gold font-medium bg-brand-gold/10 px-2 py-1.5 rounded w-fit">
                        <Calendar className="h-3.5 w-3.5 mr-2" />
                        Follow Up: {lead.follow_up_date}
                      </div>
                    )}
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl text-sm text-zinc-600 font-medium">
                    Drop lead here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Create New Lead</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Business Name</label>
                  <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Website URL</label>
                  <input type="url" className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="acme.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Location</label>
                  <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="Ashford" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Industry</label>
                  <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="Roofing" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Lead Source</label>
                  <select className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm">
                    <option>Website forms</option>
                    <option>Elle chatbot</option>
                    <option>Manual entry</option>
                    <option>Referrals</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Follow-up Reminder</label>
                  <input type="date" className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Notes</label>
                <textarea rows={3} className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 px-3 text-white focus:ring-brand-gold focus:border-brand-gold sm:text-sm" placeholder="Details about this lead..."></textarea>
              </div>

              <div className="pt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-zinc-700 rounded-md shadow-sm text-sm font-medium text-zinc-400 bg-transparent hover:bg-zinc-800 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-brand-gold hover:bg-yellow-500 shadow-brand-glow transition-all">
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}