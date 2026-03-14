import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTowns, getAllIndustries, getAllServices, getAllCaseStudies } from '@/lib/queries';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Digital Growth Strategies for Kent Businesses | Business Sorted',
  description: 'A comprehensive guide to digital growth, local SEO competition, and business opportunities across Kent.',
};

export default async function KentBusinessGrowthPage() {
  const [towns, industries, services, caseStudies] = await Promise.all([
    getAllTowns(),
    getAllIndustries(),
    getAllServices(),
    getAllCaseStudies()
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Digital Growth Strategies for Kent Businesses",
            "description": "Comprehensive resource mapping the digital landscape of Kent.",
            "author": {
              "@type": "Organization",
              "name": "Business Sorted Kent"
            }
          })
        }}
      />

      <section className="bg-black pt-48 pb-24 border-b border-neutral-800 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Digital Growth Strategies for Kent Businesses
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-3xl mx-auto">
            Discover how local SMEs across the county are leveraging high-performance websites, technical SEO, and automation to dominate their competitors.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 bg-neutral-50 px-4 border-b border-neutral-200">
        <div className="container mx-auto max-w-5xl">

          {/* Kent Business Landscape */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-6 tracking-tight">
              The Kent Business Landscape
            </h2>
            <div className="prose prose-lg text-neutral-700 max-w-none">
              <p>
                Kent represents one of the most vibrant and competitive local economies in the South East. From traditional trades like construction and plumbing to high-end professional services, the push to capture online market share has never been more intense. 
              </p>
              <p>
                Historically, many local businesses relied exclusively on word-of-mouth and localized print advertising. However, the modern consumer immediately turns to Google Search and Google Maps when looking for trusted local providers. Businesses with optimized digital visibility are seeing unprecedented growth, while those with slow, outdated websites are losing valuable enquiries every single day.
              </p>
            </div>
          </div>

          {/* Digital Opportunities */}
          <div className="mb-20 px-8 py-10 bg-white border border-neutral-200 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-extrabold text-black mb-6 tracking-tight">
              Digital Opportunities for SMEs
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Based on our analysis of the Kent market, the largest opportunities for fast growth lie in addressing foundational technical gaps that most local competitors ignore:
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <strong className="block text-black text-xl mb-2">Local SEO Dominance</strong>
                <p className="text-neutral-600">Structuring websites securely so Google natively ranks your business in localized Map Packs.</p>
              </div>
              <div>
                <strong className="block text-black text-xl mb-2">Speed & Conversions</strong>
                <p className="text-neutral-600">Re-engineering generic WordPress themes into blazing fast funnels that immediately capture visitor data.</p>
              </div>
              <div>
                <strong className="block text-black text-xl mb-2">Lead Automation</strong>
                <p className="text-neutral-600">Hooking web forms into CRM triggers so clients instantly receive a reply, shutting out competitors.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Navigational Knowledge Graph Elements */}
      <section className="py-24 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Industries Node */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 border-b border-neutral-800 pb-4">
                Industries in Kent
              </h2>
              <ul className="grid grid-cols-2 gap-4">
                {industries.map(industry => (
                  <li key={industry.slug}>
                    <Link 
                      href={`/industries/${industry.slug}`}
                      className="text-neutral-400 hover:text-brand-gold transition-colors font-medium flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-brand-gold mr-3 transition-colors"></span>
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Towns Node */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 border-b border-neutral-800 pb-4">
                Local Coverage
              </h2>
              <ul className="grid grid-cols-2 gap-4">
                {towns.map(town => (
                  <li key={town.slug}>
                    <Link 
                      href={`/towns/${town.slug}`}
                      className="text-neutral-400 hover:text-brand-gold transition-colors font-medium flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-brand-gold mr-3 transition-colors"></span>
                      {town.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Services mapping */}
          <div className="mt-16 pt-16 border-t border-neutral-800">
             <h2 className="text-3xl font-bold text-white mb-8 border-b border-neutral-800 pb-4">
                Accelerating Services
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                 {services.map(service => (
                   <Link
                      key={service.slug}
                      href={`/${service.slug}`}
                      className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl hover:border-brand-gold hover:shadow-[0_0_40px_rgba(214,173,103,0.15)] transition-all group"
                   >
                     <h3 className="text-xl font-bold text-white group-hover:text-brand-gold mb-2">{service.name}</h3>
                     <span className="text-sm font-semibold text-brand-gold flex items-center">
                        Explore Strategy
                        <svg className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                     </span>
                   </Link>
                 ))}
              </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
