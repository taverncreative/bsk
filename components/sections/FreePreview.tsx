import { Check } from 'lucide-react';
import FreePreviewForm from '@/components/sections/FreePreviewForm';

interface FreePreviewProps {
  variant?: 'section' | 'page';
}

const promises = [
  'A working homepage at a temporary URL',
  'Built in 2–3 working days',
  'No deposit, no card details, no follow-up email if you pass',
  'If you like it, £280 covers finishing and launching on your domain',
];

export default function FreePreview({ variant = 'section' }: FreePreviewProps) {
  return (
    <section
      id="free-preview"
      className={`bg-paper-raised ${
        variant === 'section' ? 'border-t border-paper-border' : ''
      } py-24 md:py-32`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="border-l-4 border-brand-gold pl-6 md:pl-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
            Free · No obligation
          </p>
          <h2 className="font-display text-ink mb-6 max-w-3xl">
            We’ll build it first. You decide if you want it.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed max-w-2xl">
            Tell us about your business. We’ll build a working preview of your new website at a
            temporary URL, set up the way we’d actually build it for you. Take your time deciding.
            If you like it, £280 finishes and launches it on your domain. If not, that’s the end of
            it. No charge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 mt-14 md:mt-20 pl-6 md:pl-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mb-5">
              What you get
            </p>
            <ul className="space-y-4 text-base">
              {promises.map((promise) => (
                <li key={promise} className="flex items-start gap-3 text-ink">
                  <Check className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span>{promise}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-paper-border">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mb-3">
                Why we can do this
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">
                AI tooling made building websites faster. A working preview takes hours, not weeks.
                That cost is ours to absorb, not yours to gamble.
              </p>
            </div>
          </div>

          <div>
            <FreePreviewForm />
          </div>
        </div>
      </div>
    </section>
  );
}
