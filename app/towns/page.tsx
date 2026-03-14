import type { Metadata } from 'next';
import Link from 'next/link';
import LocalAuthorityMap from '@/components/sections/LocalAuthorityMap';
import CTA from '@/components/sections/CTA';
import Reveal from '@/components/ui/Reveal';
import { getAllTowns } from '@/lib/queries';
import { MapPin, Briefcase, Zap, TrendingUp, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Areas We Cover in Kent | Business Sorted',
  description: 'Explore the specific Kent towns and regions where we actively help businesses rank on Google, generate leads, and automate client acquisition.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/towns',
  },
};

export default async function TownsPage() {
  const allTowns = await getAllTowns();
  
  // Sort and group towns
  const districts = allTowns.filter(t => t.county === 'Kent District').sort((a,b) => a.name.localeCompare(b.name));
  const primaryTowns = allTowns.filter(t => t.county !== 'Kent District').sort((a,b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen bg-neutral-950 pt-40">
      
      {/* 1. Introduction Hero */}
      <div className="container mx-auto px-4 text-center max-w-4xl pt-12 pb-24">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-sm md:text-base text-neutral-300 font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
            Serving Businesses Across Kent
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Kent SEO & Digital Authority
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            From Ashford to Tunbridge Wells, we specialise in helping local Kent businesses dominate their search radius, generate enquiries, and scale systematically.
          </p>
          <p className="text-neutral-500 max-w-2xl mx-auto mb-12">
            We don't restrict our services to a single town. Our strategies are specifically designed to capture market share across entire districts and the surrounding villages.
          </p>
        </Reveal>
      </div>

      {/* 2. Kent Coverage Map */}
      <section className="py-24 border-y border-neutral-900 bg-neutral-950/50">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Interactive Kent Coverage</h2>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">Click any primary location to explore the targeted services and strategies we deploy in that area.</p>
            </div>
          </Reveal>
          <LocalAuthorityMap towns={primaryTowns} />
        </div>
      </section>

      {/* 3. Major Towns Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Major Kent Towns</h2>
              <p className="text-lg text-neutral-400 max-w-2xl">We build highly converting programmatic digital assets for these core locations.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {primaryTowns.map((town) => (
                <Link 
                  key={town.id} 
                  href={`/towns/${town.slug}`}
                  className="group flex flex-col p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-brand-gold/50 hover:bg-neutral-900/80 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-all"></div>
                  <MapPin className="w-6 h-6 text-brand-gold mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{town.name}</h3>
                  <div className="flex items-center text-sm font-medium text-neutral-500 group-hover:text-brand-gold transition-colors mt-auto pt-4">
                    View Services <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. District Coverage */}
      {districts.length > 0 && (
        <section className="py-24 bg-neutral-900 border-y border-neutral-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/3">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">District Level SEO</h2>
                  <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                    Looking to dominate a larger territory? Our system also supports wider structural SEO targeting at the borough and district level, ensuring maximum visibility across multiple connected towns.
                  </p>
                </div>
                <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {districts.map(district => (
                    <div key={district.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-center flex items-center justify-center">
                      <span className="font-bold text-neutral-300">{district.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 5. Nearby Areas / Call to Action */}
      <CTA />
      
    </main>
  );
}
