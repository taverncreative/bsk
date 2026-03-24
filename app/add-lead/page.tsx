'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AddLeadPage() {
  const [form, setForm] = useState({
    business_name: '',
    contact_name: '',
    email: '',
    phone: '',
    website_url: '',
    value: '',
    location: '',
    industry: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.business_name.trim()) {
      setError('Business name is required.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const [res] = await Promise.all([
        fetch('/api/add-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }),
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: '31fb5677-3e73-4a83-abc3-4c668ba876df',
            subject: `New Lead Added: ${form.business_name} (via Shared Link)`,
            from_name: 'Business Sorted Kent',
            Business: form.business_name,
            Contact: form.contact_name,
            Email: form.email,
            Value: form.value,
          }),
        }).catch(() => {}),
      ]);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to add lead.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#D6AD67]/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-[#D6AD67]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Lead Added Successfully</h1>
          <p className="text-neutral-400 text-lg mb-8">
            <span className="text-[#D6AD67] font-semibold">{form.business_name}</span> has been added to the pipeline.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                business_name: '', contact_name: '', email: '', phone: '',
                website_url: '', value: '', location: '', industry: '', notes: '',
              });
            }}
            className="inline-block px-8 py-3 bg-[#D6AD67] text-black font-bold rounded-xl hover:bg-white transition-colors"
          >
            Add Another Lead
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Image src="/logo.png" alt="Business Sorted Kent" width={36} height={36} className="w-9 h-9" />
          <span className="text-white font-bold text-lg tracking-tight">Business Sorted Kent</span>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">Add a Lead</h1>
          <p className="text-neutral-400 text-lg">Fill in the details below to add a new lead to the pipeline.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name - Required */}
          <div>
            <label htmlFor="business_name" className="block text-sm font-semibold text-neutral-300 mb-1.5">
              Business Name <span className="text-[#D6AD67]">*</span>
            </label>
            <input
              id="business_name"
              name="business_name"
              type="text"
              required
              value={form.business_name}
              onChange={handleChange}
              placeholder="e.g. Smith & Sons Plumbing"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D6AD67] focus:ring-1 focus:ring-[#D6AD67] transition-colors"
            />
          </div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact_name" className="block text-sm font-semibold text-neutral-300 mb-1.5">Contact Name</label>
              <input
                id="contact_name"
                name="contact_name"
                type="text"
                value={form.contact_name}
                onChange={handleChange}
                placeholder="e.g. John Smith"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D6AD67] focus:ring-1 focus:ring-[#D6AD67] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-300 mb-1.5">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D6AD67] focus:ring-1 focus:ring-[#D6AD67] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-neutral-300 mb-1.5">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="07XXX XXXXXX"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D6AD67] focus:ring-1 focus:ring-[#D6AD67] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="website_url" className="block text-sm font-semibold text-neutral-300 mb-1.5">Website URL</label>
              <input
                id="website_url"
                name="website_url"
                type="url"
                value={form.website_url}
                onChange={handleChange}
                placeholder="https://example.co.uk"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D6AD67] focus:ring-1 focus:ring-[#D6AD67] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="value" className="block text-sm font-semibold text-neutral-300 mb-1.5">Estimated Value (&pound;)</label>
              <input
                id="value"
                name="value"
                type="text"
                inputMode="decimal"
                value={form.value}
                onChange={handleChange}
                placeholder="e.g. 2500"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D6AD67] focus:ring-1 focus:ring-[#D6AD67] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-neutral-300 mb-1.5">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Maidstone, Kent"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D6AD67] focus:ring-1 focus:ring-[#D6AD67] transition-colors"
              />
            </div>
          </div>

          {/* Industry - Full Width */}
          <div>
            <label htmlFor="industry" className="block text-sm font-semibold text-neutral-300 mb-1.5">Industry</label>
            <input
              id="industry"
              name="industry"
              type="text"
              value={form.industry}
              onChange={handleChange}
              placeholder="e.g. Construction, Hospitality, Retail"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D6AD67] focus:ring-1 focus:ring-[#D6AD67] transition-colors"
            />
          </div>

          {/* Notes - Textarea */}
          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-neutral-300 mb-1.5">Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional details about this lead..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D6AD67] focus:ring-1 focus:ring-[#D6AD67] transition-colors resize-none"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-10 py-3.5 bg-[#D6AD67] text-black font-bold rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Adding Lead...' : 'Add Lead to Pipeline'}
          </button>
        </form>
      </div>
    </main>
  );
}
