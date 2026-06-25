import type { Metadata } from 'next';
import WebsiteReviewTool from '@/components/forms/WebsiteReviewTool';

export const metadata: Metadata = {
  title: 'Free website review | Business Sorted Kent',
  description:
    'Send us your website. We will tell you what is working, what is not, and what is worth fixing first. Free, no obligation.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/free-website-review',
  },
};

export default function FreeWebsiteReviewPage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Free website review
          </p>
          <h1 className="font-display text-ink mb-8 max-w-4xl">
            Send us your site. We will tell you what is worth fixing.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
            A short, honest review of your existing website. What is loading slowly, what Google is
            missing, and where visitors are bouncing. Free, no follow-up if you pass.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mb-5">
                What you’ll get
              </p>
              <ul className="space-y-5 text-lg">
                <li className="flex items-start gap-4 text-ink">
                  <span className="font-mono text-sm text-ink-faint pt-1">01</span>
                  <span>Where your site is loading slowly and what to do about it.</span>
                </li>
                <li className="flex items-start gap-4 text-ink">
                  <span className="font-mono text-sm text-ink-faint pt-1">02</span>
                  <span>What Google is and is not indexing, and why.</span>
                </li>
                <li className="flex items-start gap-4 text-ink">
                  <span className="font-mono text-sm text-ink-faint pt-1">03</span>
                  <span>The bits of your site where visitors are likely to drop off.</span>
                </li>
                <li className="flex items-start gap-4 text-ink">
                  <span className="font-mono text-sm text-ink-faint pt-1">04</span>
                  <span>A short list of what would be worth doing next, in priority order.</span>
                </li>
              </ul>

              <div className="mt-10 pt-8 border-t border-paper-border max-w-md">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mb-3">
                  No card details
                </p>
                <p className="text-sm text-ink-muted">
                  We use your URL to run the review. Nothing else. No mailing list, no follow-up if
                  you pass.
                </p>
              </div>
            </div>

            <WebsiteReviewTool />
          </div>
        </div>
      </section>
    </main>
  );
}
