'use client';

import { MonitorSmartphone } from 'lucide-react';

interface MegaMenuCTAProps {
  onClick?: () => void;
}

export default function MegaMenuCTA({ onClick }: MegaMenuCTAProps) {
  const handleReviewClick = () => {
    if (onClick) onClick();
    
    // Slight delay to allow menu to close if needed
    setTimeout(() => {
      const e = new CustomEvent('open-elle-context', { 
        detail: { 
          message: "I can take a quick look at your website and highlight anything that may be affecting visibility. Just share your website URL." 
        } 
      });
      window.dispatchEvent(e);
      
      // Also ensure assistant opens if the context event isn't caught
      const forceOpenEvent = new CustomEvent('force-open-elle');
      window.dispatchEvent(forceOpenEvent);
    }, 150);
  };

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 h-full flex flex-col group relative overflow-hidden transition-colors hover:border-brand-gold/30">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-brand-gold/5 to-transparent pointer-events-none group-hover:from-brand-gold/10 transition-colors duration-500" />
      <div className="w-10 h-10 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-4 group-hover:border-brand-gold/50 group-hover:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
        <MonitorSmartphone className="w-5 h-5 text-brand-gold" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2 relative z-10">Free Website Review</h3>
      <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow relative z-10">
        We&#39;ll take a quick look at your website and highlight opportunities to improve visibility and enquiries.
      </p>
      <button 
        onClick={handleReviewClick}
        className="w-full bg-brand-gold text-black font-extrabold py-3 px-4 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(214,173,103,0.1)] hover:shadow-[0_0_20px_rgba(214,173,103,0.3)] hover:brightness-110 active:scale-95 relative z-10 block"
      >
        Request Review
      </button>
    </div>
  );
}
