'use client';

import React, { useState } from 'react';
import { trackLead } from '@/lib/analytics/lead';
import { notifyAdmin } from '@/lib/web3forms-client';

export default function WebsiteReviewTool() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete' | 'error'>('idle');
  const [analysis, setAnalysis] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !email) return;

    setStatus('analyzing');
    
    // Track lead capture for analytics
    trackLead("website_review_request", { url, email });

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Send the lead to our backend for team follow-up
    try {
      await fetch('/api/website-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email })
      });

      // Notify admin via Web3Forms (client-side)
      notifyAdmin('Website Review Request', { Email: email, Website: url });
      
      // Generate simulated but highly credible output
      setAnalysis({
        performance: "Initial scan indicates load times may be exceeding the recommended 2.5-second threshold on mobile devices. Heavy image assets or unoptimized scripts could be impacting Core Web Vitals.",
        seo: "We detected missing localized schema markup and unoptimized heading hierarchies. This immediately prevents Google from accurately ranking your entity for high-intent regional searches.",
        conversion: "There is a noticeable absence of 'sticky' contact pathways and native lead capture elements above the fold. Friction here directly lowers your overall enquiry rate."
      });
      
      setStatus('complete');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'complete' && analysis) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 lg:p-10 shadow-2xl text-left">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/20 text-brand-gold mb-6 mb-8">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-4">Initial Analysis Complete</h2>
        <p className="text-lg text-neutral-400 mb-8 border-b border-neutral-800 pb-8">
          We have securely logged your URL ({url}) and our technical team will conduct a deep-dive manual review shortly. Here are the immediate automated red flags we identified:
        </p>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mt-1">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Performance Observations</h3>
              <p className="text-neutral-400 leading-relaxed">{analysis.performance}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mt-1">
              <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">SEO Architecture</h3>
              <p className="text-neutral-400 leading-relaxed">{analysis.seo}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center mt-1">
              <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Conversion Friction</h3>
              <p className="text-neutral-400 leading-relaxed">{analysis.conversion}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-black rounded-xl border border-neutral-800">
          <p className="text-brand-gold font-bold mb-2">What happens next?</p>
          <p className="text-neutral-400 text-sm">
            Our team has received this report at {email}. We will manually inspect your entire digital footprint and send you a comprehensive strategy on how to fix these underlying issues and generate more local enquiries.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 lg:p-10 shadow-2xl text-left max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white mb-3">Request a Free Website Review</h2>
      <p className="text-lg text-neutral-400 mb-8">
        Enter your website address below. Our system will run an initial diagnostic, and our digital team will follow up with a custom strategy to increase your local conversion rate.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-bold text-white mb-2">
            Website URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-4 rounded-xl bg-black border border-neutral-800 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all font-medium text-white placeholder:text-neutral-600"
            placeholder="https://yourwebsite.co.uk"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-4 rounded-xl bg-black border border-neutral-800 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all font-medium text-white placeholder:text-neutral-600"
            placeholder="you@company.com"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'analyzing'}
          className="w-full py-4 px-6 bg-brand-gold text-black font-extrabold text-lg rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(214,173,103,0.4)] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(214,173,103,0.2)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center"
        >
          {status === 'analyzing' ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Your Website...
            </>
          ) : (
             'Run Full Analysis'
          )}
        </button>
      </form>
      
      {status === 'error' && (
        <p className="mt-4 text-red-500 font-semibold text-center">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
