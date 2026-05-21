'use client';

import React, { useState } from 'react';
import { trackLead } from '@/lib/analytics/lead';

export default function WebsiteReviewTool() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'complete' | 'error'>('idle');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !email) return;

    setStatus('sending');

    // Honeypot tripped — show the success state but drop the submission.
    if (honeypot) {
      setSubmittedUrl(url);
      setSubmittedEmail(email);
      setStatus('complete');
      return;
    }

    // Track lead capture for analytics
    trackLead('website_review_request', { url, email });

    // Send the lead to our backend for team follow-up
    try {
      await Promise.all([
        fetch('/api/website-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, email, hp_website: honeypot }),
        }),
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: '31fb5677-3e73-4a83-abc3-4c668ba876df',
            subject: `New Website Review Request from ${email}`,
            from_name: 'Business Sorted Kent',
            Name: 'Website Review Request',
            Email: email,
            Website: url,
            Message: `New website review request.\n\nWebsite: ${url}\nEmail: ${email}\n\nPlease run a manual review and follow up with the visitor.`,
            botcheck: honeypot,
          }),
        }).catch(() => {}),
      ]);

      setSubmittedUrl(url);
      setSubmittedEmail(email);
      setStatus('complete');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'complete') {
    return (
      <div className="bg-paper-raised border border-paper-border rounded-2xl p-8 lg:p-10 shadow-2xl text-left">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/20 text-brand-gold mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-ink mb-4">Thanks — we&apos;ve got your site.</h2>
        <p className="text-lg text-ink-muted mb-6">
          A human (not a bot) is reviewing{' '}
          <strong className="text-ink break-all">{submittedUrl}</strong> now. You&apos;ll have
          specific findings by email at{' '}
          <strong className="text-ink break-all">{submittedEmail}</strong> within 24 hours.
        </p>
        <div className="mt-8 p-6 bg-paper rounded-xl border border-paper-border">
          <p className="font-bold text-ink mb-3">What we look at:</p>
          <ul className="space-y-2.5 text-ink-muted">
            <li className="flex gap-3">
              <span className="text-brand-gold font-mono text-sm pt-0.5">01</span>
              <span>Page speed and Core Web Vitals — especially on mobile</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold font-mono text-sm pt-0.5">02</span>
              <span>What Google&apos;s actually indexing, and what&apos;s missing</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold font-mono text-sm pt-0.5">03</span>
              <span>Mobile usability and layout shift</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold font-mono text-sm pt-0.5">04</span>
              <span>Conversion paths — where enquiries might be leaking out</span>
            </li>
          </ul>
        </div>
        <p className="mt-6 text-sm text-ink-faint">
          Free, no obligation, no follow-up if you pass.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-paper-raised border border-paper-border rounded-2xl p-8 lg:p-10 shadow-2xl text-left max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold text-ink mb-3">Request a free website review</h2>
      <p className="text-lg text-ink-muted mb-8">
        Drop your URL and email below. We&apos;ll review the site by hand — page speed, mobile,
        Google indexing, conversion paths — and reply within 24 hours with specific findings.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div>
          <label htmlFor="url" className="block text-sm font-bold text-ink mb-2">
            Website URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-4 rounded-xl bg-paper border border-paper-border focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all font-medium text-ink placeholder:text-ink-faint"
            placeholder="https://yourwebsite.co.uk"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-ink mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-4 rounded-xl bg-paper border border-paper-border focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all font-medium text-ink placeholder:text-ink-faint"
            placeholder="you@company.com"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-4 px-6 bg-brand-gold text-black font-extrabold text-lg rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(214,173,103,0.4)] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(214,173,103,0.2)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center"
        >
          {status === 'sending' ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending…
            </>
          ) : (
            'Request review'
          )}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-4 text-red-500 font-semibold text-center">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
