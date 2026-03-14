'use client';

import { useState } from 'react';
import type { FAQItem } from './FAQ';

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  // Automatically open the first FAQ to encourage interaction
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        
        return (
          <div 
            key={index} 
            className={`border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 ${
              isOpen ? 'bg-slate-50 border-brand/50 shadow-sm' : 'bg-white hover:border-slate-300'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-opacity-50"
              aria-expanded={isOpen}
            >
              <span className={`text-lg font-bold pr-8 transition-colors ${isOpen ? 'text-brand' : 'text-slate-900'}`}>
                {faq.question}
              </span>
              
              {/* Plus/Minus Indicator Animation */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isOpen ? 'border-brand bg-brand text-black' : 'border-slate-300 text-slate-500'
              }`}>
                <svg 
                  className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {/* Smooth Expandable Answer Body */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!isOpen}
            >
              <div className="p-6 pt-0 text-slate-600 text-lg leading-relaxed border-t border-slate-100 mt-2">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
