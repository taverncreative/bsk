import Link from 'next/link';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import GridBackground from '@/components/ui/GridBackground';
import Reveal from '@/components/ui/Reveal';
import GrowthEngine from '@/components/visuals/GrowthEngine';
import { ReactNode } from 'react';

interface CTA {
  text: string;
  href: string;
}

interface ServiceHeroProps {
  title: ReactNode;
  subtitle: string;
  primaryCTA: CTA;
  secondaryCTA?: CTA;
}

export default function ServiceHero({ title, subtitle, primaryCTA, secondaryCTA }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 bg-gradient-to-b from-black to-neutral-900 border-b border-neutral-800">
      
      <GridBackground />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          
          {/* Left Side: Copy & Calls to Action */}
          <div className="max-w-3xl">
            <Reveal>
              <h1 
                className="font-extrabold tracking-tight text-white mb-6"
                style={{ fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 1.05 }}
              >
                {title}
              </h1>
              <p className="text-lg text-neutral-400 mt-6 leading-relaxed max-w-xl">
                {subtitle}
              </p>
              
              <div className="mt-10 flex flex-wrap items-center gap-4">
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

          {/* Right Side: Growth Engine Diagram */}
          <div className="relative w-full mt-10 lg:mt-0 flex items-center justify-center lg:justify-end">
            <GrowthEngine />
          </div>

        </div>
      </div>
    </section>
  );
}
