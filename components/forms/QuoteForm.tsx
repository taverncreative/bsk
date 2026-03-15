'use client';

import React, { useState } from 'react';
import { trackLead } from '@/lib/analytics/lead';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Fire the analytics payload BEFORE executing form submission logic
    trackLead("quote_request", {
      service: formData.service
    });

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          website_url: null,
          message: `Service Required: ${formData.service}\n\nMessage: ${formData.message}`,
          page_context: window.location.pathname,
          submission_type: 'Quote Request',
        }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to submit');
      }
      
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setError('An error occurred. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-neutral-800 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all font-medium text-neutral-800 placeholder:text-neutral-400"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-neutral-800 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all font-medium text-neutral-800 placeholder:text-neutral-400"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-neutral-800 mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all font-medium text-neutral-800 placeholder:text-neutral-400"
              placeholder="07700 900000"
            />
          </div>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-bold text-neutral-800 mb-2">
            Service Required
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all bg-white font-medium text-neutral-800"
          >
            <option value="" disabled>Select a service</option>
            <option value="Web Design">Web Design</option>
            <option value="SEO">SEO</option>
            <option value="Business Automation">Business Automation</option>
            <option value="Branding">Branding</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-neutral-800 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all resize-none font-medium text-neutral-800 placeholder:text-neutral-400"
            placeholder="Tell us a bit about your project..."
          />
        </div>

        {error && (
          <div className="p-4 bg-red-900/30 border border-red-500 rounded-xl text-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        {success ? (
          <div className="p-6 bg-green-900/20 border border-brand-gold rounded-xl text-center">
            <h3 className="text-xl font-bold text-brand-gold mb-2">Quote Request Sent!</h3>
            <p className="text-neutral-300">We will review your details and aim to contact you within 24 hours.</p>
          </div>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-brand-gold text-black font-extrabold text-lg rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(214,173,103,0.4)] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(214,173,103,0.2)] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending Request...' : 'Request Quote'}
          </button>
        )}
      </form>
    </div>
  );
}
