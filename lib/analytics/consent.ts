/**
 * Single source of truth for the analytics consent gate.
 *
 * The cookie banner (CookieConsent) records the visitor's choice under this
 * key; anything that sets tracking cookies or sends analytics events must
 * check `hasAnalyticsConsent()` first. This keeps the promise made in the
 * banner: no analytics runs unless the visitor explicitly accepts.
 */
export const CONSENT_STORAGE_KEY = 'bsk_cookie_consent';

/**
 * Dispatched on `window` when the visitor accepts/rejects, so listeners
 * (e.g. GoogleAnalytics) can react without a page reload.
 */
export const CONSENT_EVENT = 'bsk-consent-change';

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return false;
    return JSON.parse(stored)?.choice === 'accepted';
  } catch {
    return false;
  }
}
