import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Got it · Free preview · Business Sorted Kent',
  description: 'Your free website preview request was received. Here’s what happens next.',
  robots: { index: false, follow: false },
};

const steps = [
  {
    when: 'Today',
    what: 'We confirm your request',
    detail:
      'A short email from a real person at hello@businesssortedkent.co.uk so you know it landed.',
  },
  {
    when: 'Day 1',
    what: 'We get to work',
    detail:
      'We sketch the structure, pull the right copy direction and start building the homepage preview.',
  },
  {
    when: 'Day 2–3',
    what: 'Your preview goes live',
    detail:
      'A working URL lands in your inbox. Have a look on your own time. No pressure either way.',
  },
  {
    when: 'When you’re ready',
    what: 'You decide',
    detail:
      'If you like it, £280 covers finishing and launching on your domain. If not, that’s the end of it. No charge.',
  },
];

export default function FreePreviewThanksPage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Got it
          </p>
          <h1 className="font-display text-ink max-w-3xl mb-6">
            Thanks. Your preview is in the queue.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl">
            We’ve received your details and we’ll have a working preview at a temporary URL within
            the next 2–3 working days. Here’s what happens between now and then.
          </p>
        </div>
      </section>

      <section className="bg-paper-raised py-24 md:py-32 border-t border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-10">
            What happens next
          </p>

          <ol className="divide-y divide-paper-border border-y border-paper-border">
            {steps.map((step) => (
              <li
                key={step.when}
                className="grid grid-cols-[auto_1fr] md:grid-cols-[160px_1fr] gap-6 md:gap-10 py-8 md:py-10"
              >
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint pt-1">
                  {step.when}
                </div>
                <div className="max-w-2xl">
                  <h2 className="font-display text-2xl md:text-3xl text-ink mb-3 leading-tight">
                    {step.what}
                  </h2>
                  <p className="text-ink-muted leading-relaxed">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-brand-gold hover:text-ink transition-colors"
            >
              Back to the homepage
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center bg-transparent border border-ink/30 text-ink font-medium px-6 py-3 rounded-md hover:border-ink hover:bg-ink hover:text-paper transition-colors"
            >
              See some recent work
              <Check className="w-4 h-4 ml-2 hidden" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
