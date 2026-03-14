import type { Metadata } from 'next';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'About Business Sorted | Kent Digital Agency',
  description: 'Learn about Business Sorted, a specialist digital growth agency in Kent focusing on high-performance websites, local SEO, and business automation.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-40">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
            About Business Sorted
          </h1>
          <div className="prose prose-invert prose-lg max-w-none text-neutral-300">
            <p className="lead text-xl text-brand-gold mb-10">
              We are a specialist digital growth agency based in Kent. We believe that a website shouldn't just be an online brochure—it should be a structural asset that generates predictable enquiries for your business.
            </p>
            
            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Our Methodology</h2>
            <p className="mb-4">
              Most local businesses struggle because their digital presence is fragmented. They have a website that doesn't convert, SEO campaigns that aren't hyper-targeted, and manual backend processes that leak hard-earned leads.
            </p>
            <p className="mb-6">
              We solve this operational drag by engineering entirely connected ecosystems:
            </p>
            
            <ul className="list-disc pl-6 mb-12 space-y-3 marker:text-brand-gold">
              <li><strong className="text-white relative top-[2px]">High-performance custom web design</strong> that acts as a 24/7 sales representative.</li>
              <li><strong className="text-white relative top-[2px]">Targeted local SEO strategies</strong> mapped directly to high-intent buyer keywords.</li>
              <li><strong className="text-white relative top-[2px]">Automated CRM and lead capture pipelines</strong> running flawlessly in the background.</li>
            </ul>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Deep Local Expertise</h2>
            <p className="mb-8">
              Because we operate specifically with service and trade businesses across the Kent ecosystem, we understand the specific nuances of commercial search intent across the region. We don't chase vanity metrics or irrelevant national traffic—we rank you for the local searches that actually ring the phone and generate real-world ROI.
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </main>
  );
}
