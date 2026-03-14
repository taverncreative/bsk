import type { Metadata } from 'next';
import Services from '@/components/sections/Services';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Our Digital Growth Services | Business Sorted Kent',
  description: 'Specialist web design, local SEO, lead capture systems, and business automation services designed specifically to help local Kent businesses scale.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/services',
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-40">
      <div className="container mx-auto px-4 text-center max-w-4xl py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
          Digital Services Engineered for Local Growth
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed">
          We build connected digital ecosystems designed to dominate local search, capture high-intent traffic, and automate your lead generation.
        </p>
      </div>
      <Services />
      <CTA />
    </main>
  );
}
