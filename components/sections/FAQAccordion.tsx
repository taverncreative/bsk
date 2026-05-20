'use client';

import { useState } from 'react';
import type { FAQItem } from './FAQ';

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-paper-border border-y border-paper-border">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="py-2">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 rounded-sm"
              aria-expanded={isOpen}
            >
              <span
                className={`font-display text-lg md:text-xl leading-snug transition-colors ${
                  isOpen ? 'text-ink' : 'text-ink'
                }`}
              >
                {faq.question}
              </span>
              <span
                className={`flex-shrink-0 w-7 h-7 flex items-center justify-center text-ink-faint transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-brand-gold' : ''
                }`}
                aria-hidden="true"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!isOpen}
            >
              <p className="pb-6 pr-12 text-ink-muted leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
