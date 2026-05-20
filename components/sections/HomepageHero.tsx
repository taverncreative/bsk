import Link from 'next/link';
import Image from 'next/image';
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
    <section className="relative bg-white border-b border-paper-border pt-36 md:pt-44 pb-20 md:pb-28">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,780px)] gap-12 lg:gap-16 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-10">
              {eyebrow}
            </p>

            <h1 className="font-display text-ink mb-6">
              {title || 'Websites, SEO and automations for Kent businesses.'}
            </h1>

            <p className="font-display text-2xl md:text-4xl text-ink/80 leading-tight mb-8">
              {deck || (
                <>
                  <span className="block">
                    Websites used to cost{' '}
                    <span className="font-mono text-[0.78em] align-middle line-through decoration-2 text-ink-faint">
                      £3000
                    </span>
                    .
                  </span>
                  <span className="block">
                    Yours costs <span className="font-mono text-brand-gold">£280</span>.
                  </span>
                </>
              )}
            </p>

            <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10">
              {subtitle || (
                <>
                  AI changed how websites get built, so we changed how much we charge for it. The checks for speed, security and SEO are the same as on a £3000 site.
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

          <div className="hidden lg:block">
            <Image
              src="/hero-portfolio.webp"
              alt="A selection of websites Business Sorted Kent has built for Kent businesses, including inspection, salon, cleaning, stationery and iPhone repair brands"
              width={1200}
              height={900}
              priority
              sizes="(min-width: 1024px) 780px, 0px"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
