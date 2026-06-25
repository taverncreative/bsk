import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Business Sorted Kent',
  description:
    'How we approach accessibility on businesssortedkent.co.uk, known issues, and how to report problems.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/accessibility',
  },
};

const LAST_UPDATED = '20 May 2026';

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Legal
          </p>
          <h1 className="font-display text-ink mb-8">Accessibility Statement</h1>
          <p className="text-lg text-ink-muted leading-relaxed max-w-3xl">
            How we approach accessibility on businesssortedkent.co.uk and what to do if something
            isn&apos;t working for you. Last updated {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="space-y-12 text-ink-muted">
            <div>
              <h2 className="font-display text-ink mb-4">What we aim for</h2>
              <p className="leading-relaxed">
                We aim to meet{' '}
                <a
                  href="https://www.w3.org/TR/WCAG21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:underline"
                >
                  WCAG 2.1
                </a>{' '}
                Level AA on every page. That means:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>You can navigate the site with a keyboard alone.</li>
                <li>Text contrasts strongly with its background.</li>
                <li>Images that carry meaning have alt text.</li>
                <li>Forms are labelled and screen-reader friendly.</li>
                <li>Headings, lists and landmarks describe the page structure.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Where we may fall short</h2>
              <p className="leading-relaxed">
                We&apos;re a small team and the site changes often. Some areas we know are not
                perfect:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  Some older case-study and guide pages may not yet meet our heading-structure
                  goals.
                </li>
                <li>
                  Decorative animations don&apos;t always respect the &quot;reduce motion&quot;
                  browser setting yet.
                </li>
                <li>
                  A handful of icons may not have accessible names. We fix these as we find them.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Tell us if something is broken</h2>
              <p className="leading-relaxed">
                If you find an accessibility problem, please email{' '}
                <a
                  href="mailto:hello@businesssortedkent.co.uk"
                  className="text-brand-gold hover:underline"
                >
                  hello@businesssortedkent.co.uk
                </a>{' '}
                with the page URL and a short description. We&apos;ll respond within five working
                days and aim to fix the issue within a month.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Technical details</h2>
              <p className="leading-relaxed">
                The site is built with Next.js and served by Vercel. Content is rendered as
                semantic HTML with progressive enhancement. No third-party widget is loaded unless
                you trigger it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
