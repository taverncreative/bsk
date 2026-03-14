import Link from 'next/link';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import Button from '@/components/ui/Button';

interface BaseEntity {
  name: string;
  slug: string;
}

interface CaseStudyPageProps {
  title: string;
  industry: string;
  service: BaseEntity;
  town: BaseEntity;
  summary: string;
  solution?: string;
  outcome?: string;
  results: string[];
}

export default function CaseStudyPage({
  title,
  industry,
  service,
  town,
  summary,
  solution,
  outcome,
  results,
}: CaseStudyPageProps) {
  return (
    <>
      {/* SECTION 1: HERO */}
      <LocalServiceHero
        title={title}
        subtitle={`How we helped a ${industry} business in ${town.name} generate more enquiries using ${service.name}.`}
        primaryCTA={{
          text: 'Get a Free Quote',
          href: '#quote', // Preparing anchor routing intuitively based on previous templates
        }}
      />

      {/* SECTION 2: THE CHALLENGE & SOLUTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* The Challenge */}
            <div>
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                The Challenge
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  {summary || `This ${industry} business operating in ${town.name} was struggling to stand out against local competitors. Despite having years of operational experience, their lack of a structured ${service.name.toLowerCase()} framework meant they were consistently losing high-value enquiries to lesser competitors who were simply easier to discover online.`}
                </p>
              </div>
            </div>

            {/* Our Solution */}
            <div>
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Our Solution
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  {solution || `We engineered a highly targeted, conversion-focused ${service.name.toLowerCase()} strategy. By combining high-performance design architecture with localized visibility signals directly mapped for ${town.name}, we fundamentally restructured how this ${industry} business interacted with ready-to-buy prospects online.`}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: RESULTS & IMPACT */}
      <section className="py-24 section-light border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Results
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {outcome || `Tangible, long-term growth driven completely by the newly integrated ${service.name.toLowerCase()} architecture.`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {results && results.length > 0 ? (
              results.map((result, index) => {
                const parts = result.split(' ');
                const isMetric = parts[0].includes('%') || parts[0].toLowerCase() === 'top' || /\d/.test(parts[0]);
                const titleText = isMetric ? (parts[0] === 'Top' ? 'Top 3' : parts[0]) : result.split(' ').slice(0, 2).join(' ');
                const bodyText = isMetric ? (parts[0] === 'Top' ? parts.slice(2).join(' ') : parts.slice(1).join(' ')) : result.split(' ').slice(2).join(' ');
                
                return (
                  <div key={index} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center flex flex-col justify-center min-h-[160px]">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-brand mb-2">
                      {titleText}
                    </h3>
                    <p className="text-slate-700 font-medium text-lg leading-snug">
                      {bodyText}
                    </p>
                  </div>
                );
              })
            ) : (
              <>
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center flex flex-col justify-center min-h-[160px]">
                  <h3 className="text-3xl font-extrabold text-brand mb-2">150%</h3>
                  <p className="text-slate-700 font-medium text-lg leading-snug">increase in enquiries</p>
                </div>
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center flex flex-col justify-center min-h-[160px]">
                  <h3 className="text-3xl font-extrabold text-brand mb-2">Top 3</h3>
                  <p className="text-slate-700 font-medium text-lg leading-snug">Google rankings</p>
                </div>
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center flex flex-col justify-center min-h-[160px]">
                  <h3 className="text-3xl font-extrabold text-brand mb-2">More</h3>
                  <p className="text-slate-700 font-medium text-lg leading-snug">qualified leads</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERNAL LINKS */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Learn More About Our Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href={`/${service.slug}`}
              className="group p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12A9 9 0 0112 21a9 9 0 01-9-9 9 9 0 019-9a9 9 0 019 9zm-9 4V8m0 0l-3 3m3-3l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand transition-colors">
                {service.name} Services
              </h3>
              <p className="text-slate-600 font-medium text-sm">View all generalized {service.name.toLowerCase()} solutions.</p>
            </Link>
            
            <Link
              href={`/${service.slug}-${town.slug}`}
              className="group p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand transition-colors">
                {service.name} in {town.name}
              </h3>
              <p className="text-slate-600 font-medium text-sm">Read localized strategies specifically for {town.name}.</p>
            </Link>

            <Link
              href={`/industries/${industry.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${service.slug}`}
              className="group p-8 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand transition-colors">
                {service.name} for {industry}
              </h3>
              <p className="text-slate-600 font-medium text-sm">See tailored packages explicitly designed for {industry}s.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="section-dark py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            Stop losing local leads to your competitors. Let&apos;s get started today.
          </p>
          <div className="flex justify-center">
            <Button href="/contact" className="text-lg px-10 py-4 shadow-lg">
              Get a Free Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
