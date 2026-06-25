'use client';

import { useState, useEffect } from 'react';
import { Send, User, Mail, Briefcase } from 'lucide-react';

// Service slug (URL query value) → dropdown <option value> in this form.
// Add new entries here when adding new deep-link CTAs from service pages.
const SERVICE_SLUG_TO_DROPDOWN: Record<string, string> = {
  'web-design': 'Website Design',
  seo: 'SEO & Rankings',
  'lead-capture': 'Lead Capture',
  'business-automation': 'Business Automation',
};

// Intent (URL query value) → message-textarea prefill.
// Add new entries when adding new deep-link CTAs from service pages.
const INTENT_TO_MESSAGE: Record<string, string> = {
  audit: 'Please run a free SEO audit on my site.',
};

export default function SecondaryContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', service_required: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('');

  // Read URL params on mount and pre-fill service + message when present.
  // e.g. arriving from /seo's 'Get a free SEO audit' CTA, the URL is
  // /contact?service=seo&intent=audit and we pre-select 'SEO & Rankings'
  // plus pre-fill the message textarea. Visitor can still edit either.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const intent = params.get('intent');
    const updates: Partial<typeof formData> = {};
    if (service && SERVICE_SLUG_TO_DROPDOWN[service]) {
      updates.service_required = SERVICE_SLUG_TO_DROPDOWN[service];
    }
    if (intent && INTENT_TO_MESSAGE[intent]) {
      updates.message = INTENT_TO_MESSAGE[intent];
    }
    if (Object.keys(updates).length > 0) {
      setFormData((prev) => ({ ...prev, ...updates }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Honeypot tripped — pretend success, drop submission.
    if (honeypot) {
      setStatus('success');
      setFormData({ name: '', email: '', service_required: '', message: '' });
      return;
    }

    try {
      // Submit to our API, which emails the enquiry via Resend.
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, hp_website: honeypot }),
      });

      if (res.ok) {
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
      <div className="bg-paper-raised border border-brand-gold/30 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="w-8 h-8 text-black" />
        </div>
        <h3 className="text-2xl font-bold text-ink mb-3">Message Sent Successfully</h3>
        <p className="text-ink">Thank you for getting in touch. We will review your enquiry and back to you shortly.</p>
        <button 
          onClick={() => setStatus('')}
          className="mt-8 text-brand-gold text-sm font-bold hover:text-ink transition-colors"
        >
          Send Another Message &rarr;
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-paper-raised border border-paper-border rounded-3xl p-8 lg:p-10 shadow-2xl space-y-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

      {/* Honeypot: hidden from humans, bots tend to fill every input. */}
      <input
        type="text"
        name="hp_website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      />

      {status === 'error' && (
        <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 font-medium mb-2">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
          <input 
            required
            type="text" 
            placeholder="Full Name" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-paper border border-paper-border text-ink rounded-xl py-4 pl-12 pr-4 focus:border-brand-gold outline-none transition-all placeholder:text-ink-faint focus:ring-1 focus:ring-brand-gold"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
          <input 
            required
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-paper border border-paper-border text-ink rounded-xl py-4 pl-12 pr-4 focus:border-brand-gold outline-none transition-all placeholder:text-ink-faint focus:ring-1 focus:ring-brand-gold"
          />
        </div>
      </div>

      <div className="relative">
        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
        <select 
          required
          value={formData.service_required}
          onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
          className="w-full bg-paper border border-paper-border text-ink rounded-xl py-4 pl-12 pr-4 focus:border-brand-gold outline-none transition-all focus:ring-1 focus:ring-brand-gold appearance-none"
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
          className="w-full bg-paper border border-paper-border text-ink rounded-xl py-4 px-5 min-h-[140px] focus:border-brand-gold outline-none transition-all placeholder:text-ink-faint focus:ring-1 focus:ring-brand-gold"
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
