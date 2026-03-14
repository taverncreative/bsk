import type { Metadata } from 'next';
import LocalAuthorityMap from '@/components/sections/LocalAuthorityMap';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Areas We Cover in Kent | Business Sorted',
  description: 'Explore the specific Kent towns and regions where we actively help businesses rank on Google, generate leads, and automate client acquisition.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/towns',
  },
};

export default function TownsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-40">
      <div className="container mx-auto px-4 text-center max-w-4xl py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
          Kent Business Coverage Map
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed">
          From Ashford to Tunbridge Wells, we specialise in helping Kent businesses dominate their specific local search radius.
        </p>
      </div>
      <LocalAuthorityMap />
      <CTA />
    </main>
  );
}
