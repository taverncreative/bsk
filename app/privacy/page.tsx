import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Business Sorted Kent',
  description:
    'How Business Sorted Kent collects, uses and protects your personal data. Plain English, UK GDPR compliant.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/privacy',
  },
};

const LAST_UPDATED = '20 May 2026';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Legal
          </p>
          <h1 className="font-display text-ink mb-8">Privacy Policy</h1>
          <p className="text-lg text-ink-muted leading-relaxed max-w-3xl">
            How we handle your personal data. Plain English, no surprises. Last updated{' '}
            {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="prose-content space-y-12 text-ink-muted">
            <div>
              <h2 className="font-display text-ink mb-4">Who we are</h2>
              <p className="leading-relaxed">
                Business Sorted Kent is a sole-trader digital agency based in Kent, United Kingdom.
                We provide web design, SEO and automation services to small businesses. For the
                purposes of UK GDPR and the Data Protection Act 2018, the data controller is the
                trading business named at the bottom of this page.
              </p>
              <p className="leading-relaxed mt-4">
                Questions about your data? Email{' '}
                <a
                  href="mailto:hello@businesssortedkent.co.uk"
                  className="text-brand-gold hover:underline"
                >
                  hello@businesssortedkent.co.uk
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">What we collect</h2>
              <p className="leading-relaxed">
                We only collect personal data you give us directly. That usually means:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  Your name, email address and (optionally) a website URL or message, when you fill
                  in our contact form or free-website-review form.
                </li>
                <li>
                  Information you share by email or during a call about your business and what you
                  need.
                </li>
                <li>
                  Basic technical data your browser sends to our hosting provider (IP address,
                  browser type, pages visited) for security and performance.
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                We do not buy data, scrape data, or build profiles from third-party sources.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Why we use it</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To reply to your enquiry and discuss whether we can help.</li>
                <li>To deliver work you have hired us to do.</li>
                <li>To send transactional emails about your project (e.g. invoices, updates).</li>
                <li>
                  To keep the website running and secure (logs, abuse prevention, error tracking).
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                We do not send marketing emails unless you explicitly ask to be on our list.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Legal basis</h2>
              <p className="leading-relaxed">We rely on the following bases under UK GDPR:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  <strong className="text-ink">Legitimate interests</strong> — to respond to
                  enquiries you have initiated and to operate our website.
                </li>
                <li>
                  <strong className="text-ink">Contract</strong> — to deliver services you have
                  engaged us for.
                </li>
                <li>
                  <strong className="text-ink">Legal obligation</strong> — to keep tax and
                  accounting records.
                </li>
                <li>
                  <strong className="text-ink">Consent</strong> — for any non-essential cookies (we
                  ask first; see our{' '}
                  <Link href="/cookies" className="text-brand-gold hover:underline">
                    Cookie Policy
                  </Link>
                  ).
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Who we share it with</h2>
              <p className="leading-relaxed">
                We share data with a small number of trusted service providers who help us run the
                business. They only process your data on our instructions.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  <strong className="text-ink">Vercel</strong> — website hosting (data may be
                  processed in the EU/US under standard contractual clauses).
                </li>
                <li>
                  <strong className="text-ink">Supabase</strong> — database for storing enquiries
                  (EU region).
                </li>
                <li>
                  <strong className="text-ink">Web3Forms</strong> — relays form submissions to our
                  inbox.
                </li>
                <li>
                  <strong className="text-ink">Email and accounting software</strong> — to
                  correspond with you and keep records.
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                We do not sell your data and we do not share it with advertisers.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">How long we keep it</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enquiries we never turn into work: deleted within 12 months.</li>
                <li>Client records: kept for 7 years after the last invoice, for HMRC purposes.</li>
                <li>Marketing list (if you joined one): until you unsubscribe.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Your rights</h2>
              <p className="leading-relaxed">Under UK GDPR you have the right to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Ask what data we hold about you.</li>
                <li>Ask us to correct anything that is wrong.</li>
                <li>Ask us to delete data we no longer need a legal basis to keep.</li>
                <li>Object to processing, or ask us to restrict it.</li>
                <li>Ask for a copy of your data in a portable format.</li>
                <li>Withdraw any consent you have given.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Email{' '}
                <a
                  href="mailto:hello@businesssortedkent.co.uk"
                  className="text-brand-gold hover:underline"
                >
                  hello@businesssortedkent.co.uk
                </a>{' '}
                and we will respond within 30 days.
              </p>
              <p className="leading-relaxed mt-4">
                If you are unhappy with how we have handled your data you have the right to complain
                to the Information Commissioner&apos;s Office at{' '}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:underline"
                >
                  ico.org.uk
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Cookies</h2>
              <p className="leading-relaxed">
                See our{' '}
                <Link href="/cookies" className="text-brand-gold hover:underline">
                  Cookie Policy
                </Link>{' '}
                for details on what we use and how to manage them.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Changes to this policy</h2>
              <p className="leading-relaxed">
                If we change anything material, we will update the date at the top of this page and,
                where appropriate, let you know directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
