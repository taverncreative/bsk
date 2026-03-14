import Link from 'next/link';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import GridBackground from '@/components/ui/GridBackground';
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
    <section className="relative overflow-hidden pt-48 pb-32 bg-gradient-to-b from-black to-neutral-900 border-b border-neutral-800">
      
      <GridBackground />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center flex flex-col items-center">
        
        <Reveal>
          <h1 
            className="font-extrabold tracking-tight text-white mb-6"
            style={{ fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 1.05 }}
          >
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 mt-6 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <MagneticButton href={primaryCTA.href}>
              {primaryCTA.text}
            </MagneticButton>
            
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
