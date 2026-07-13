/**
 * Custom Analytics Tracking Engine
 *
 * Centralized utility for tracking high-value conversion events across the site.
 * Logs to console for debugging/future CRM ingestion and forwards GA4 events —
 * but only after the visitor has accepted cookies (see hasAnalyticsConsent).
 */

import { hasAnalyticsConsent } from './consent';

interface LeadData {
  service?: string;
  town?: string;
  sourcePage?: string;
  industry?: string;
  [key: string]: any; // Allow arbitrary metric payloads for future flexibility
}

export const trackLead = (eventName: string, data: LeadData = {}) => {
  // 1. Core Browser execution guard to prevent Next.js SSR crashes
  if (typeof window === 'undefined') return;

  // 2. Structured logging for current debugging
  console.group(`📈 [ANALYTICS EVENT]: ${eventName}`);
  console.log('Timestamp:', new Date().toISOString());
  console.log('Payload:', data);
  console.groupEnd();

  // 3. Google Analytics (GA4) forwarding.
  //    Consent-gated: only fires once the visitor has accepted cookies, honouring
  //    the cookie banner's promise. gtag is loaded by <GoogleAnalytics /> on accept
  //    and routes events to the configured measurement ID automatically.
  if (hasAnalyticsConsent() && typeof window.gtag === 'function') {
    // Strip PII before it leaves the browser — GA4 must never receive email
    // addresses (Google's policy + UK GDPR). Keep non-personal fields (service,
    // magnet, town, url, sourcePage, industry) for conversion analysis.
    const gaParams = { ...data };
    delete gaParams.email;
    window.gtag('event', eventName, gaParams);
  }

  // 4. Example PostHog Integration Map (commented out for future use)
  /*
  if (window.posthog) {
    window.posthog.capture(eventName, data);
  }
  */
};
