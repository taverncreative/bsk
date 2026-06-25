import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | Business Sorted Kent',
  description:
    'What cookies Business Sorted Kent uses, why, and how to manage your preferences.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/cookies',
  },
};

const LAST_UPDATED = '20 May 2026';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Legal
          </p>
          <h1 className="font-display text-ink mb-8">Cookie Policy</h1>
          <p className="text-lg text-ink-muted leading-relaxed max-w-3xl">
            Small files our site stores on your device, and what we use them for. Last updated{' '}
            {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="space-y-12 text-ink-muted">
            <div>
              <h2 className="font-display text-ink mb-4">What cookies are</h2>
              <p className="leading-relaxed">
                Cookies are small text files that websites place on your device so they can
                remember you between visits or pages. Some are essential for the site to work,
                others are used for analytics or marketing.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">What we use</h2>
              <p className="leading-relaxed">
                We aim to keep this short. At the time of writing, we only use cookies that are
                strictly necessary for the site to function — they do not need your consent under
                UK regulations (PECR).
              </p>

              <div className="mt-6 border border-paper-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-paper-raised text-ink">
                    <tr>
                      <th className="text-left p-4 font-semibold">Cookie</th>
                      <th className="text-left p-4 font-semibold">Purpose</th>
                      <th className="text-left p-4 font-semibold">Lifetime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-paper-border">
                    <tr>
                      <td className="p-4 font-mono text-xs">bsk_cookie_consent</td>
                      <td className="p-4">Remembers your cookie preferences so we don&apos;t ask again.</td>
                      <td className="p-4">12 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="leading-relaxed mt-6">
                If we ever add analytics or marketing cookies (for example Google Analytics), they
                will only fire after you accept them through the cookie banner. You can change your
                mind at any time by clearing your site data or contacting us.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Managing cookies</h2>
              <p className="leading-relaxed">
                Most browsers let you block or delete cookies through their settings. Doing so will
                not stop our site from working but will reset any preferences we have stored.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold hover:underline"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">More information</h2>
              <p className="leading-relaxed">
                For how we handle any personal data we collect, see our{' '}
                <Link href="/privacy" className="text-brand-gold hover:underline">
                  Privacy Policy
                </Link>
                . Questions? Email{' '}
                <a
                  href="mailto:hello@businesssortedkent.co.uk"
                  className="text-brand-gold hover:underline"
                >
                  hello@businesssortedkent.co.uk
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
