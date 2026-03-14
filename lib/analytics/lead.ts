/**
 * Custom Analytics Tracking Engine
 * 
 * Centralized utility for tracking high-value conversion events across the site.
 * Currently routing to console.log, but architected for drop-in replacement 
 * with Google Analytics (GA4), PostHog, or Meta Pixel via unified schemas.
 */

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

  // 3. Example GA4 Integration Map (commented out for future use)
  /*
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...data,
      send_to: 'G-XXXXXXXXXX',
    });
  }
  */

  // 4. Example PostHog Integration Map (commented out for future use)
  /*
  if (window.posthog) {
    window.posthog.capture(eventName, data);
  }
  */
};
