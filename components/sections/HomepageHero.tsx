import Link from 'next/link';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import GridBackground from '@/components/ui/GridBackground';
import Reveal from '@/components/ui/Reveal';
import GrowthEngine from '@/components/visuals/GrowthEngine';
import CredibilityMetrics from '@/components/sections/CredibilityMetrics';
import { ReactNode } from 'react';

interface CTA {
  text: string;
  href: string;
}

interface HomepageHeroProps {
  title: ReactNode;
  subtitle: string;
  primaryCTA: CTA;
  secondaryCTA?: CTA;
}

export default function HomepageHero({ title, subtitle, primaryCTA, secondaryCTA }: HomepageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 bg-gradient-to-b from-black to-neutral-900 border-b border-neutral-800">
      
      <GridBackground />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          
          {/* Left Side: Copy & Calls to Action */}
          <div className="max-w-3xl">
            <Reveal>
              <h1 
                className="font-extrabold tracking-tight text-white mb-6 lg:mb-8"
                style={{ fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 1.05 }}
              >
                {title}
              </h1>

              {/* Trust Strip */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                <div className="bg-[#111] border border-white/5 py-2 px-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-2.5"></span>
                  <span className="text-[13px] sm:text-[14px] text-neutral-300 font-medium">Kent Businesses</span>
                </div>
                
                <div className="bg-[#111] border border-white/5 py-2 px-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-2.5"></span>
                  <span className="text-[13px] sm:text-[14px] text-neutral-300 font-medium">Local Service Specialists</span>
                </div>

                <div className="bg-[#111] border border-white/5 py-2 px-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-2.5"></span>
                  <span className="text-[13px] sm:text-[14px] text-neutral-300 font-medium">Proven Lead Systems</span>
                </div>
              </div>

              <p className="text-lg text-neutral-400 leading-relaxed max-w-xl">
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

              <p className="text-sm md:text-base text-neutral-500 font-medium mt-8 border-t border-neutral-800 pt-6 max-w-lg">
                Supporting businesses across Ashford, Canterbury, Maidstone, Folkestone, Thanet and Medway.
              </p>
            </Reveal>
          </div>

          {/* Right Side: Growth Engine Diagram */}
          <div className="relative w-full mt-10 lg:mt-0 flex items-center justify-center lg:justify-end">
            <GrowthEngine />
          </div>

        </div>

        {/* Below Hero Grid: Stats */}
        <div className="mt-16 lg:mt-20 w-full">
          <CredibilityMetrics />
        </div>
      </div>
    </section>
  );
}
