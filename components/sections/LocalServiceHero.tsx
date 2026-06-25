import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { ReactNode } from 'react';

interface CTA {
  text: string;
  href: string;
}

interface LocalServiceHeroProps {
  title: ReactNode;
  subtitle: string;
  primaryCTA: CTA;
  secondaryCTA?: CTA;
}

export default function LocalServiceHero({ title, subtitle, primaryCTA, secondaryCTA }: LocalServiceHeroProps) {
  return (
    <section className="relative bg-paper border-b border-paper-border pt-36 md:pt-44 pb-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Reveal>
          <h1 className="font-display text-ink mb-6 max-w-3xl">{title}</h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mb-10">
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button href={primaryCTA.href}>{primaryCTA.text}</Button>
            {secondaryCTA && (
              <Button variant="secondary" href={secondaryCTA.href}>
                {secondaryCTA.text}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
