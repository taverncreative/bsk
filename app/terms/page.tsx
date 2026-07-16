import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Business Sorted Kent',
  description:
    'The rules for using businesssortedkent.co.uk and the services Business Sorted Kent provides.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/terms',
  },
};

const LAST_UPDATED = '20 May 2026';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Legal
          </p>
          <h1 className="font-display text-ink mb-8">Terms &amp; Conditions</h1>
          <p className="text-lg text-ink-muted leading-relaxed max-w-3xl">
            The rules for using this website. Specific work we do for clients is governed by a
            separate engagement letter. Last updated {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="space-y-12 text-ink-muted">
            <div>
              <h2 className="font-display text-ink mb-4">About these terms</h2>
              <p className="leading-relaxed">
                These terms govern your use of businesssortedkent.co.uk. By using the site you
                agree to them. If you don&apos;t, please stop using the site.
              </p>
              <p className="leading-relaxed mt-4">
                Paid work — websites, SEO, automations — is delivered under a separate written
                agreement we send you before any work starts. Nothing on this page replaces that.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Using the site</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may browse, link to and share our pages for personal or business use.</li>
                <li>
                  You may not scrape the site, attempt to break it, abuse the contact forms, or
                  submit content that is unlawful, defamatory, or infringes someone else&apos;s
                  rights.
                </li>
                <li>
                  All content on the site — copy, design, images, code we wrote ourselves — is
                  owned by Business Sorted Kent unless stated otherwise. Don&apos;t copy substantial
                  parts of it without asking.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Accuracy</h2>
              <p className="leading-relaxed">
                We try to keep examples and information up to date, but the website is not a
                binding quote. The price of any specific job is whatever we agree in writing before
                we start.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Third-party links</h2>
              <p className="leading-relaxed">
                We sometimes link to other websites where the information was helpful. We don&apos;t
                control those sites and aren&apos;t responsible for what they publish or how they
                handle your data.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Liability</h2>
              <p className="leading-relaxed">
                We provide this website &quot;as is&quot;. To the extent the law allows, we accept
                no liability for any loss arising from your use of it. Nothing in these terms limits
                our liability for fraud, death or personal injury caused by negligence, or anything
                else that cannot be limited under English law.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Governing law</h2>
              <p className="leading-relaxed">
                These terms are governed by the laws of England and Wales. Any dispute will be
                handled by the English courts.
              </p>
            </div>

            <div>
              <h2 className="font-display text-ink mb-4">Contact</h2>
              <p className="leading-relaxed">
                Questions about these terms? Email{' '}
                <a
                  href="mailto:hello@businesssortedkent.co.uk"
                  className="text-brand-gold hover:underline"
                >
                  hello@businesssortedkent.co.uk
                </a>
                . For data and cookies see our{' '}
                <Link href="/privacy" className="text-brand-gold hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/cookies" className="text-brand-gold hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
