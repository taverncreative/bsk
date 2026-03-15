'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileScrollCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkScroll = () => {
      // Don't show if dismissed, shown this session, or on desktop
      if (hasShownThisSession || isDismissed || window.innerWidth >= 768) return;
      
      // Check if user has opened Elle (we can use sessionStorage or a global variable)
      const hasElleOpened = sessionStorage.getItem('elle_opened') === 'true';
      if (hasElleOpened) return;

      const scrollPosition = window.scrollY;
      const windowSize = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;
      const scrollDepth = (scrollPosition + windowSize) / bodyHeight;

      if (scrollDepth > 0.6 && scrollDepth < 0.9) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [hasShownThisSession, isDismissed]);

  const getContextualContent = () => {
    if (pathname.includes('/seo')) {
      return {
        message: "Want to know why your website isn't appearing on Google?",
        buttonText: "Check My Website",
        elleMessage: "I can take a quick look at your website and highlight anything that may be affecting search visibility. Just share your website URL."
      };
    }
    if (pathname.includes('/web-design')) {
      return {
        message: "Thinking about a new website? We can review your current one.",
        buttonText: "Request Website Review",
        elleMessage: "I can review your current website to see where a new design could improve your conversion rate. What's your current website URL?"
      };
    }
    if (pathname.includes('/business-automation')) {
      return {
        message: "Want to see how automation could save time in your business?",
        buttonText: "Get Automation Advice",
        elleMessage: "We can help you discover processes that can be automated to save you hours every week. What manual tasks are taking up most of your time?"
      };
    }
    if (pathname.includes('/lead-capture')) {
      return {
        message: "Not getting enough enquiries from your website?",
        buttonText: "Check My Website",
        elleMessage: "I can look at your website to see why visitors might not be contacting you. What is your website URL?"
      };
    }
    if (pathname.includes('/towns')) {
      return {
        message: "Want to see how your business could rank locally in Kent?",
        buttonText: "Check My Website",
        elleMessage: "I can look at your site to see what local SEO improvements could help you rank higher in your area. Can you share your website URL?"
      };
    }
    if (pathname.includes('/industries')) {
      return {
        message: "Curious how businesses like yours get found online?",
        buttonText: "Check My Website",
        elleMessage: "I can review your website and show you what leading competitors in your industry are doing right online. Just share your URL."
      };
    }
    if (pathname.includes('/guides')) {
      return {
        message: "Want us to take a quick look at your website?",
        buttonText: "Request Website Review",
        elleMessage: "If you'd like, I can do a quick review of your website to find immediate opportunities for growth. What's your website URL?"
      };
    }
    
    // Default / Homepage fallback
    return {
      message: "Want a quick website review? We'll highlight opportunities.",
      buttonText: "Check My Website",
      elleMessage: "I can take a quick look at your website and highlight the most impactful opportunities for growth. What's your website URL?"
    };
  };

  const handleCTAAction = () => {
    const context = getContextualContent();
    setIsVisible(false);
    setHasShownThisSession(true);
    setIsDismissed(true);
    sessionStorage.setItem('elle_opened', 'true');
    sessionStorage.setItem('scroll_cta_shown', 'true');

    // Dispatch event to open Elle
    const e = new CustomEvent('open-elle-context', { 
      detail: { 
        message: context.elleMessage 
      } 
    });
    window.dispatchEvent(e);
  };

  if (!isVisible) return null;

  const content = getContextualContent();

  return (
    <div className="md:hidden fixed bottom-24 left-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-neutral-900 border border-brand-gold/30 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/10 to-transparent pointer-events-none" />
        <button 
          onClick={() => {
            setIsVisible(false);
            setIsDismissed(true);
            sessionStorage.setItem('scroll_cta_shown', 'true');
          }}
          className="absolute top-2 right-2 text-neutral-500 hover:text-white"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex gap-3 items-start pr-6 relative z-10">
          <div className="w-10 h-10 shrink-0 rounded-full bg-black border border-brand-gold/50 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-white leading-snug">
            {content.message}
          </p>
        </div>
        <button 
          onClick={handleCTAAction}
          className="w-full bg-brand-gold text-black font-extrabold py-2.5 rounded-xl text-sm active:scale-95 transition-transform mt-1"
        >
          {content.buttonText}
        </button>
      </div>
    </div>
  );
}
