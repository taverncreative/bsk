import type { Metadata } from 'next';
import GuideCard from '@/components/cards/GuideCard';
import CTA from '@/components/sections/CTA';
import { getAllGuides } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Digital Growth Guides for Kent Businesses | Business Sorted',
  description: 'Practical advice, actionable strategies, and in-depth guides for growing your business online in Kent.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/guides',
  },
};

export default async function GuidesIndexPage() {
  const guides = await getAllGuides();

  return (
    <>
      {/* SECTION 1: HEADER */}
      <section className="bg-black border-b border-neutral-800 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Digital Growth Guides for Kent Businesses
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed">
            Actionable guides on websites, SEO and automation for businesses across Kent.
          </p>
        </div>
      </section>

      {/* SECTION 2: GUIDES GRID */}
      <section className="py-24 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <GuideCard key={guide.id || guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CTA */}
      <CTA />
    </>
  );
}
