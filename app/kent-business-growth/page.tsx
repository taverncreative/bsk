import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllTowns, getAllIndustries, getAllServices } from '@/lib/queries';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Kent business directory | Business Sorted Kent',
  description:
    'A directory of the towns, industries and services we cover across Kent. One page to find what you need.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/kent-business-growth',
  },
};

export default async function KentBusinessGrowthPage() {
  const [towns, industries, services] = await Promise.all([
    getAllTowns(),
    getAllIndustries(),
    getAllServices(),
  ]);

  return (
    <main className="min-h-screen bg-paper">
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Kent business directory
          </p>
          <h1 className="font-display text-ink mb-8 max-w-4xl">
            Everything in one place.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
            One page listing the towns, industries and services we cover. Pick the relevant link
            to land on the page that actually matches what you do.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-24 bg-paper border-t border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
            Services
          </p>
          <h2 className="font-display text-ink mb-10">What we do.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-border">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="group block bg-paper p-6 transition-colors hover:bg-paper-raised"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg text-ink">{service.name}</span>
                  <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-24 bg-paper-raised border-y border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
            Industries
          </p>
          <h2 className="font-display text-ink mb-10">Who we work with.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-border">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group block bg-paper-raised p-6 transition-colors hover:bg-paper"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg text-ink">{industry.name}</span>
                  <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Towns */}
      <section className="py-20 md:py-24 bg-paper border-t border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
            Towns
          </p>
          <h2 className="font-display text-ink mb-10">Where we cover.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-border">
            {towns.map((town) => (
              <Link
                key={town.slug}
                href={`/towns/${town.slug}`}
                className="group block bg-paper p-6 transition-colors hover:bg-paper-raised"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg text-ink">{town.name}</span>
                  <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
