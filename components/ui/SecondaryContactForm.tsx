'use client';

import { useState } from 'react';
import { Send, User, Mail, Briefcase } from 'lucide-react';
import { notifyAdmin } from '@/lib/web3forms-client';

export default function SecondaryContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', service_required: '', message: '' });
  const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Send email notification via Web3Forms (client-side)
        notifyAdmin(`New Enquiry: ${formData.name}`, {
          Name: formData.name,
          Email: formData.email,
          'Service Required': formData.service_required || 'N/A',
          Message: formData.message || 'N/A',
        });
        setStatus('success');
        setFormData({ name: '', email: '', service_required: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-neutral-900 border border-brand-gold/30 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="w-8 h-8 text-black" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Message Sent Successfully</h3>
        <p className="text-neutral-300">Thank you for getting in touch. We will review your enquiry and back to you shortly.</p>
        <button 
          onClick={() => setStatus('')}
          className="mt-8 text-brand-gold text-sm font-bold hover:text-white transition-colors"
        >
          Send Another Message &rarr;
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 lg:p-10 shadow-2xl space-y-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
      
      {status === 'error' && (
        <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 font-medium mb-2">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
          <input 
            required
            type="text" 
            placeholder="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 pl-12 pr-4 focus:border-brand-gold outline-none transition-all placeholder:text-neutral-600 focus:ring-1 focus:ring-brand-gold"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
          <input 
            required
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 pl-12 pr-4 focus:border-brand-gold outline-none transition-all placeholder:text-neutral-600 focus:ring-1 focus:ring-brand-gold"
          />
        </div>
      </div>

      <div className="relative">
        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
        <select 
          required
          value={formData.service_required}
          onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
          className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-xl py-4 pl-12 pr-4 focus:border-brand-gold outline-none transition-all focus:ring-1 focus:ring-brand-gold appearance-none"
        >
          <option value="" disabled>Select Service Required</option>
          <option value="Website Design">Website Design</option>
          <option value="SEO & Rankings">SEO & Google Rankings</option>
          <option value="Lead Capture">Lead Capture Systems</option>
          <option value="Business Automation">Business Automation</option>
          <option value="Not Sure / General Enquiry">Not Sure / General Enquiry</option>
        </select>
      </div>

      <div className="relative">
        <textarea 
          required
          placeholder="How can we help?" 
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 px-5 min-h-[140px] focus:border-brand-gold outline-none transition-all placeholder:text-neutral-600 focus:ring-1 focus:ring-brand-gold"
        />
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full bg-brand-gold text-black font-extrabold py-5 rounded-xl text-lg flex items-center justify-center gap-3 transition-all hover:bg-white active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(214,173,103,0.15)] hover:shadow-[0_0_30px_rgba(214,173,103,0.3)] mt-2"
      >
        {status === 'loading' ? 'Sending Message...' : 'Send Message'}
      </button>
    </form>
  );
}
