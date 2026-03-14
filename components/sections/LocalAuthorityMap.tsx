'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import { MapPin, ChevronRight } from 'lucide-react';

interface TownData {
  id: string;
  name: string;
  slug: string;
  x: number;
  y: number;
  services: { name: string; baseSlug: string }[];
}

const towns: TownData[] = [
  {
    id: 'ashford',
    name: 'Ashford',
    slug: 'ashford',
    x: 250,
    y: 160,
    services: [
      { name: 'Web Design', baseSlug: 'web-design' },
      { name: 'SEO', baseSlug: 'seo' },
      { name: 'Business Automation', baseSlug: 'business-automation' },
    ]
  },
  {
    id: 'canterbury',
    name: 'Canterbury',
    slug: 'canterbury',
    x: 310,
    y: 110,
    services: [
      { name: 'Web Design', baseSlug: 'web-design' },
      { name: 'SEO', baseSlug: 'seo' },
      { name: 'Business Automation', baseSlug: 'business-automation' },
    ]
  },
  {
    id: 'maidstone',
    name: 'Maidstone',
    slug: 'maidstone',
    x: 180,
    y: 120,
    services: [
      { name: 'Web Design', baseSlug: 'web-design' },
      { name: 'SEO', baseSlug: 'seo' },
      { name: 'Business Automation', baseSlug: 'business-automation' },
    ]
  },
  {
    id: 'folkestone',
    name: 'Folkestone',
    slug: 'folkestone',
    x: 330,
    y: 200,
    services: [
      { name: 'Web Design', baseSlug: 'web-design' },
      { name: 'SEO', baseSlug: 'seo' },
      { name: 'Business Automation', baseSlug: 'business-automation' },
    ]
  },
  {
    id: 'tunbridge-wells',
    name: 'Tunbridge Wells',
    slug: 'tunbridge-wells',
    x: 80,
    y: 180,
    services: [
      { name: 'Web Design', baseSlug: 'web-design' },
      { name: 'SEO', baseSlug: 'seo' },
      { name: 'Business Automation', baseSlug: 'business-automation' },
    ]
  }
];

interface LocalAuthorityMapProps {
  headlineOverride?: React.ReactNode;
}

export default function LocalAuthorityMap({ headlineOverride }: LocalAuthorityMapProps = {}) {
  const [activeTown, setActiveTown] = useState<string | null>(null);

  const handleTownClick = (id: string) => {
    setActiveTown(id);
    const element = document.getElementById(`town-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section className="py-28 bg-neutral-950 border-t border-neutral-900 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal>
          <div className="text-center md:text-left mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              {headlineOverride || (
                <>Based in Ashford<br/>Supporting Businesses Across Kent</>
              )}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-4">
              We work with businesses across Ashford, Canterbury, Maidstone, Folkestone, Thanet and Medway.
            </p>
            <p className="text-lg text-neutral-400 leading-relaxed">
              While our strategic hubs are based in these locations, our digital growth systems and services are engineered to support companies throughout the entirety of Kent, generating consistent local enquiries wherever you're based.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: SVG Map */}
          <Reveal>
            <div className="relative w-full aspect-video lg:aspect-[4/3] bg-neutral-900/40 rounded-2xl border border-neutral-800 p-4 sm:p-8 flex items-center justify-center shadow-inner overflow-hidden top-0 lg:sticky lg:top-24">
              <LazyMotion features={domAnimation}>
                <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
                  {/* Abstract Kent Path */}
                  <path 
                    d="M 50 60 C 120 40, 200 20, 280 40 C 340 50, 380 20, 390 80 C 400 120, 390 160, 360 200 C 390 250, 350 280, 280 270 C 200 260, 100 290, 40 230 C 10 180, 0 100, 50 60 Z" 
                    fill="#171717"
                    stroke="#262626"
                    strokeWidth="3"
                    className="transition-colors duration-500 hover:stroke-neutral-700"
                  />
                  
                  {/* Grid lines inside map for tech feel */}
                  <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>
                  </pattern>
                  <path 
                    d="M 50 60 C 120 40, 200 20, 280 40 C 340 50, 380 20, 390 80 C 400 120, 390 160, 360 200 C 390 250, 350 280, 280 270 C 200 260, 100 290, 40 230 C 10 180, 0 100, 50 60 Z" 
                    fill="url(#mapGrid)" 
                  />

                  {towns.map((town) => (
                    <m.g
                      key={town.id}
                      className="cursor-pointer group outline-none"
                      onClick={() => handleTownClick(town.id)}
                      onMouseEnter={() => setActiveTown(town.id)}
                      onMouseLeave={() => setActiveTown(null)}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, type: 'spring' }}
                    >
                      {/* Glow Effect */}
                      <circle 
                        cx={town.x} 
                        cy={town.y} 
                        r="16" 
                        fill="rgba(214,173,103,0.15)"
                        className={`transition-all duration-300 transform-gpu origin-center ${activeTown === town.id ? 'scale-150 opacity-100' : 'scale-50 opacity-0 group-hover:scale-125 group-hover:opacity-100'}`}
                        style={{ transformOrigin: `${town.x}px ${town.y}px` }}
                      />
                      {/* Core Dot */}
                      <circle 
                        cx={town.x} 
                        cy={town.y} 
                        r="6" 
                        className={`transition-all duration-300 ${activeTown === town.id ? 'fill-brand-gold shadow-lg shadow-brand-gold' : 'fill-white group-hover:fill-brand-gold'}`}
                      />
                      
                      {/* Tooltip Background */}
                      <rect 
                        x={town.x - 45} 
                        y={town.y - 40} 
                        width="90" 
                        height="24" 
                        ry="6"
                        className={`fill-neutral-900 stroke-neutral-700 transition-all duration-300 pointer-events-none origin-bottom ${activeTown === town.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'}`}
                      />
                      {/* Tooltip Text */}
                      <text 
                        x={town.x} 
                        y={town.y - 23} 
                        textAnchor="middle" 
                        className={`text-[12px] font-bold fill-white transition-all duration-300 pointer-events-none ${activeTown === town.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}
                      >
                        {town.name}
                      </text>
                    </m.g>
                  ))}
                </svg>
              </LazyMotion>
            </div>
          </Reveal>

          {/* Right: Town Cards */}
          <div className="flex flex-col gap-6 max-h-[600px] lg:max-h-[800px] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {towns.map((town, index) => (
              <Reveal key={town.id} delay={index * 0.1}>
                <div 
                  id={`town-card-${town.id}`}
                  className={`bg-neutral-900 border rounded-xl p-6 transition-all duration-500 ease-out ${
                    activeTown === town.id 
                    ? 'border-brand-gold shadow-[0_0_40px_rgba(214,173,103,0.15)] scale-[1.02]' 
                    : 'border-neutral-800 hover:border-neutral-700 hover:shadow-lg'
                  }`}
                  onMouseEnter={() => setActiveTown(town.id)}
                  onMouseLeave={() => setActiveTown(null)}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg transition-colors ${activeTown === town.id ? 'bg-brand-gold/10 text-brand-gold' : 'bg-neutral-800 text-neutral-400'}`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {town.name}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3">
                    {town.services.map((service) => (
                      <Link 
                        key={`${service.baseSlug}-${town.slug}`}
                        href={`/${service.baseSlug}-${town.slug}`}
                        className="group/link flex items-center justify-between p-3 rounded-lg bg-neutral-950/50 border border-neutral-800/50 hover:bg-neutral-800 hover:border-brand-gold/50 transition-all duration-300"
                      >
                        <span className="text-sm font-medium text-neutral-300 group-hover/link:text-white transition-colors">
                          {service.name} {town.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-brand-gold opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
