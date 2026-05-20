import Link from 'next/link';
import { ReactNode } from 'react';

interface CTA {
  text: string;
  href: string;
}

interface HomepageHeroProps {
  title?: ReactNode;
  deck?: ReactNode;
  subtitle?: ReactNode;
  primaryCTA?: CTA;
  secondaryCTA?: CTA;
  eyebrow?: string;
}

export default function HomepageHero({
  title,
  deck,
  subtitle,
  primaryCTA = { text: 'See what yours could look like', href: '#free-preview' },
  secondaryCTA = { text: 'See pricing', href: '#services' },
  eyebrow = 'Web · SEO · Automations · Kent',
}: HomepageHeroProps) {
  return (
    <section className="relative bg-paper border-b border-paper-border pt-36 md:pt-44 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-10">
          {eyebrow}
        </p>

        <h1 className="font-display text-ink mb-6 max-w-4xl">
          {title || 'Websites, SEO and automations for Kent businesses.'}
        </h1>

        <p className="font-display text-2xl md:text-4xl text-ink/80 leading-tight max-w-3xl mb-8">
          {deck || (
            <>
              Websites used to cost{' '}
              <span className="font-mono text-[0.78em] align-middle line-through decoration-2 text-ink-faint">£3,000</span>
              . Yours costs{' '}
              <span className="font-mono text-brand-gold">£280</span>.
            </>
          )}
        </p>

        <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mb-10">
          {subtitle || (
            <>
              AI changed how websites get built, so we changed how much we charge for it. The checks for speed, security and SEO are the same as on a £3,000 site.
            </>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={primaryCTA.href}
            className="inline-flex items-center bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-brand-gold hover:text-ink transition-colors"
          >
            {primaryCTA.text}
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center bg-transparent border border-ink/30 text-ink font-medium px-6 py-3 rounded-md hover:border-ink hover:bg-ink hover:text-paper transition-colors"
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
