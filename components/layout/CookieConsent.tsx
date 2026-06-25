'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'bsk_cookie_consent';

type Choice = 'accepted' | 'rejected';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const record = (choice: Choice) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice, at: new Date().toISOString() })
      );
    } catch {
      // localStorage unavailable (private mode, etc.) — silently drop.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 md:left-auto md:right-6 md:bottom-6 md:max-w-md"
    >
      <div className="bg-ink text-paper rounded-2xl shadow-2xl border border-white/10 p-5 md:p-6">
        <p className="font-display text-lg mb-2">Cookies on this site</p>
        <p className="text-sm text-paper/70 leading-relaxed mb-5">
          We only use cookies that are needed for the site to work. If we ever add analytics, it
          will only run if you accept. See our{' '}
          <Link href="/cookies" className="text-brand-gold hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => record('rejected')}
            className="flex-1 px-4 py-2.5 rounded-lg border border-white/20 text-paper/80 hover:text-paper hover:border-white/40 transition-colors text-sm font-semibold"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => record('accepted')}
            className="flex-1 px-4 py-2.5 rounded-lg bg-brand-gold text-black hover:bg-white transition-colors text-sm font-extrabold"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
