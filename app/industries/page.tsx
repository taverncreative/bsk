import type { Metadata } from 'next';
import IndustryCoverage from '@/components/sections/IndustryCoverage';
import CTA from '@/components/sections/CTA';
import { getAllIndustries } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Industries We Serve | Business Sorted Kent',
  description: 'Tailored digital growth strategies, web design, and SEO tailored specifically for trades, service businesses, and professionals across Kent.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/industries',
  },
};

export default async function IndustriesPage() {
  const industries = await getAllIndustries();

  return (
    <main className="min-h-screen bg-black pt-40">
      <div className="container mx-auto px-4 text-center max-w-4xl py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
          Specialist Industry Campaigns
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed">
          We execute highly targeted SEO, web architecture, and automation strategies mapped directly to the buying cycles of your specific industry.
        </p>
      </div>
      <IndustryCoverage />
      <CTA />
    </main>
  );
}
