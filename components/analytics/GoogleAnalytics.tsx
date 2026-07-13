'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { hasAnalyticsConsent, CONSENT_EVENT } from '@/lib/analytics/consent';

export const GA_MEASUREMENT_ID = 'G-06M1LTD86L';

/**
 * Loads Google Analytics (GA4) only after the visitor accepts cookies.
 * Honours the promise made in the cookie banner: no analytics runs unless
 * consent is explicitly given. Starts immediately on accept (no reload)
 * because CookieConsent dispatches a `bsk-consent-change` event.
 */
export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());

    const update = () => setConsented(hasAnalyticsConsent());
    window.addEventListener(CONSENT_EVENT, update);
    // Also react to consent changes made in another tab.
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(CONSENT_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
