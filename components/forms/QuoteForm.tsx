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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Fire the analytics payload BEFORE executing form submission logic
    trackLead("quote_request", {
      service: formData.service
    });

    console.log('Form submitted with data:', formData);
    // Future API processing logic goes here
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

        <button
          type="submit"
          className="w-full py-4 px-6 bg-brand-gold text-black font-extrabold text-lg rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(214,173,103,0.4)] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(214,173,103,0.2)] mt-6"
        >
          Request Quote
        </button>
      </form>
    </div>
  );
}
