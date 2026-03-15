import React from 'react';
import Link from 'next/link';
import { Town, Service } from '@/types';
import Reveal from '@/components/ui/Reveal';
import CTA from '@/components/sections/CTA';

interface MicroLocationPageProps {
  service: Service;
  town: Town;
  nearbyTowns: { name: string; slug: string }[];
}

export default function MicroLocationPage({ service, town, nearbyTowns }: MicroLocationPageProps) {
  const seed = town.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + service.name.length;

  const subtitles = [
    `Local, professional ${service.name.toLowerCase()} services tailored for businesses close to ${town.name}. We help you grow online.`,
    `Expert ${service.name.toLowerCase()} for companies located just outside ${town.name}. Attract more local enquiries today.`,
    `Supporting businesses around ${town.name} with reliable ${service.name.toLowerCase()} systems engineered to capture local traffic.`,
    `Looking for trusted ${service.name.toLowerCase()} near ${town.name}? We specialise in digital solutions for Kent-based trades and service companies.`,
    `A dedicated approach to ${service.name.toLowerCase()} for businesses operating in the immediate ${town.name} area.`
  ];
  const selectedSubtitle = subtitles[seed % subtitles.length];

  const p1Variations = [
    `Finding the right digital partner near ${town.name} shouldn't be difficult. Whether you need a simple online presence or a complete growth system, our ${service.name.toLowerCase()} strategies are engineered to capture local traffic and convert it into real enquiries.`,
    `If you operate close to ${town.name}, standing out from the local competition is crucial. Our custom ${service.name.toLowerCase()} services are built specifically to put your business in front of the customers actively searching for what you do.`,
    `Businesses on the outskirts of ${town.name} often struggle to compete with central companies. We level the playing field by providing highly optimised ${service.name.toLowerCase()} frameworks that dominate the surrounding search results.`,
    `We understand the ${town.name} market. Providing actionable ${service.name.toLowerCase()} isn’t just about making things look good; it’s about deploying strategic digital assets that make your phone ring locally.`
  ];
  const selectedP1 = p1Variations[(seed + 1) % p1Variations.length];

  const p2Variations = [
    `As a locally-focused team, we understand the Kent market intimately. We don't just build websites; we build scalable digital assets designed to position your business as the leading authority in your area. Avoid working with generic national agencies and partner with specialists who know the region.`,
    `When you choose a partner physically aware of the Kent demographic, you get better results. We bypass generic templates and implement proven ${service.name.toLowerCase()} workflows tailored directly for the residents searching for services near ${town.name}.`,
    `We believe local businesses deserve enterprise-grade technology. Working directly with companies near ${town.name}, we deploy systematic ${service.name.toLowerCase()} upgrades designed strictly around generating a clear return on investment.`,
    `Your digital infrastructure represents your reputation in ${town.name}. By trusting a dedicated local agency, you circumvent the slow communication and cookie-cutter approaches of large firms, securing a tailor-made digital footprint.`
  ];
  const selectedP2 = p2Variations[(seed + 2) % p2Variations.length];

  return (
    <main className="min-h-screen bg-neutral-950 pt-32 lg:pt-40">
      
      {/* 1. Micro Location Hero */}
      <section className="container mx-auto px-4 max-w-4xl text-center py-12 md:py-24">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-sm md:text-base text-neutral-300 font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
            Serving areas near {town.name}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            {service.name} Near {town.name}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            {selectedSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-neutral-950 font-bold rounded-lg hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(214,173,103,0.3)]"
            >
              Get Pricing & Availability
            </Link>
            <Link 
              href={`/${service.slug}`} 
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white font-bold rounded-lg border border-neutral-800 hover:bg-neutral-800 transition-colors"
            >
              Learn More About Our System
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 2. Quick Service Explanation */}
      <section className="py-20 border-t border-neutral-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Expert {service.name} Near You</h2>
              <div className="text-lg text-neutral-300 leading-relaxed max-w-3xl mx-auto space-y-6">
                <p>{selectedP1}</p>
                <p>{selectedP2}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Nearby Areas Supported */}
      {nearbyTowns.length > 0 && (
        <section className="py-20 border-t border-neutral-800 bg-neutral-950/50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Reveal>
              <h2 className="text-3xl font-bold text-white mb-4">Areas We Cover Near {town.name}</h2>
              <p className="text-lg text-neutral-400 mb-12">While we work with businesses across Kent, here are some nearby locations our {service.name.toLowerCase()} services frequently support:</p>
              
              <div className="flex flex-wrap justify-center gap-4">
                {nearbyTowns.map((nearby, i) => (
                  <Link 
                    key={i} 
                    href={`/${service.slug}-${nearby.slug}`}
                    className="px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-300 hover:text-brand-gold hover:border-brand-gold/50 transition-all font-medium"
                  >
                    {nearby.name}
                  </Link>
                ))}
                
                <Link 
                  href={`/${service.slug}-${town.slug}`}
                  className="px-6 py-3 bg-neutral-900 border border-brand-gold/30 rounded-full text-brand-gold font-bold shadow-[0_0_15px_rgba(214,173,103,0.1)] hover:bg-neutral-800 transition-all"
                >
                  {town.name} Central
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 4. Cross-link to Hub */}
      <section className="py-12 text-center text-sm text-neutral-500">
        <p>Looking for a different location? Built for businesses across <Link href="/towns" className="text-brand-gold hover:underline">Kent</Link>.</p>
      </section>

      {/* 5. CTA Section */}
      <CTA />

    </main>
  );
}
