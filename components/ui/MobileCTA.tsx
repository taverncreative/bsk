'use client';

import Link from 'next/link';
import { Search, Phone, MessageSquare } from 'lucide-react';

export default function MobileCTA() {
  const triggerElleReview = () => {
    window.dispatchEvent(new CustomEvent('open-elle-context', { 
      detail: { message: "[RENDER_REVIEW_FORM]" } 
    }));
  };

  const triggerElleMessage = () => {
    window.dispatchEvent(new CustomEvent('open-elle-context', { 
      detail: { message: "Tell me a little about what you need help with and I'll point you in the right direction." } 
    }));
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-neutral-950 p-3 pb-safe border-t border-neutral-900 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
      <div className="flex gap-2 max-w-sm mx-auto">
        <button 
          onClick={triggerElleReview}
          className="flex-1 flex flex-col items-center justify-center py-2.5 px-1 bg-[#151515] border border-neutral-800 rounded-lg hover:border-brand-gold/50 active:scale-95 transition-all min-h-[56px] min-w-[48px]"
        >
          <Search className="w-5 h-5 text-brand-gold mb-1" />
          <span className="text-[10px] font-semibold text-neutral-300 uppercase tracking-tighter">Review</span>
        </button>
        <a 
          href="tel:07522388055" 
          className="flex-1 flex flex-col items-center justify-center py-2.5 px-1 bg-brand-gold rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(214,173,103,0.2)] min-h-[56px] min-w-[48px]"
        >
          <Phone className="w-5 h-5 text-black mb-1" />
          <span className="text-[10px] font-extrabold text-black uppercase tracking-tighter">Call Now</span>
        </a>
        <button 
          onClick={triggerElleMessage}
          className="flex-1 flex flex-col items-center justify-center py-2.5 px-1 bg-[#151515] border border-neutral-800 rounded-lg hover:border-brand-gold/50 active:scale-95 transition-all min-h-[56px] min-w-[48px]"
        >
          <MessageSquare className="w-5 h-5 text-brand-gold mb-1" />
          <span className="text-[10px] font-semibold text-neutral-300 uppercase tracking-tighter">Message</span>
        </button>
      </div>
    </div>
  );
}
