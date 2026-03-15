import Link from 'next/link';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import Button from '@/components/ui/Button';
import { CommercialKeyword } from '@/lib/seo/commercialKeywords';

interface BaseEntity {
  name: string;
  slug: string;
}

interface CommercialPageProps {
  keyword: CommercialKeyword;
  town: BaseEntity;
  service?: BaseEntity;
  nearbyTowns?: BaseEntity[];
}

export default function CommercialPage({
  keyword,
  town,
  service,
  nearbyTowns = [],
}: CommercialPageProps) {
  // Determine if it's a pricing intent to adjust text accordingly
  const isPricing = keyword.intent === 'pricing';

  // Fallback for nearby towns if none are provided
  const displayTowns = nearbyTowns.length > 0 ? nearbyTowns : [
    { name: 'Ashford', slug: 'ashford' },
    { name: 'Canterbury', slug: 'canterbury' },
    { name: 'Maidstone', slug: 'maidstone' },
  ];

  return (
    <>
      {/* SECTION 1: HERO */}
      <LocalServiceHero
        title={`${keyword.title} in ${town.name}`}
        subtitle={`Everything you need to know about ${keyword.title.toLowerCase()} for businesses in ${town.name}.`}
        primaryCTA={{
          text: 'Get A Free Quote',
          href: '#quote',
        }}
      />

      {/* SECTION 2: TYPICAL COSTS / EXPECTATIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {isPricing ? 'Typical Costs & Pricing Ranges' : `What to Expect from a Top ${service?.name || 'Local'} Agency`}
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              {isPricing 
                ? `Understanding exactly how much you should invest to get meaningful results in ${town.name}.`
                : `How to evaluate and choose the right partner for your business&apos;s online growth.`}
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="prose prose-lg text-slate-700 max-w-none">
              <p>
                When researching <strong>{keyword.title.toLowerCase()} in {town.name}</strong>, one of the most common questions business owners have is what they can expect practically. 
                {isPricing 
                  ? ' While cheap templated options exist from a few hundred pounds, a professional solution that actively generates qualified leads and dominates competitive local search terms typically requires a sustained and realistic investment.'
                  : ' The difference between a generic provider and a specialist agency ultimately comes down to their ability to generate a tangible return on investment.'}
              </p>
              <p className="mt-4">
                We believe in complete transparency. Our solutions are engineered not just to look good or tick a box, but to fundamentally drive high-value commercial outcomes for your business across Kent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT AFFECTS PRICING / SCOPE */}
      <section className="py-24 section-light border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Affects {isPricing ? 'Pricing' : 'the Scope of Work'}?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-50 border border-brand-light rounded-full flex items-center justify-center mb-6">
                <span className="text-brand font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Project Complexity</h3>
              <p className="text-slate-600 leading-relaxed">
                Custom functionalities, advanced integrations, and the technical depth required directly influence the resource allocation needed to generate success.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-50 border border-brand-light rounded-full flex items-center justify-center mb-6">
                <span className="text-brand font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Business Competition</h3>
              <p className="text-slate-600 leading-relaxed">
                Operating in a highly saturated market requires significantly more aggressive strategic campaigning compared to niche local sectors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-50 border border-brand-light rounded-full flex items-center justify-center mb-6">
                <span className="text-brand font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Scope of Work</h3>
              <p className="text-slate-600 leading-relaxed">
                The total volume of pages, required content architecture, and the speed at which you want to scale output all dictate the final investment level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY BUSINESSES CHOOSE US */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Businesses Choose Us
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-brand mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-bold text-slate-900">Local Expertise</h3>
              </div>
              <p className="text-slate-600 text-sm">Deep understanding of the {town.name} market dynamics.</p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-brand mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4L19 7" />
                </svg>
                <h3 className="text-lg font-bold text-slate-900">Transparent Pricing</h3>
              </div>
              <p className="text-slate-600 text-sm">Clear, upfront structures with absolutely no hidden agency fees.</p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-brand mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <h3 className="text-lg font-bold text-slate-900">Proven Results</h3>
              </div>
              <p className="text-slate-600 text-sm">A documented track record of generating qualified leads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: AREAS WE COVER */}
      <section className="py-24 section-light border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Areas We Cover
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Find related {keyword.title.toLowerCase()} information across other local markets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayTowns.map((nearbyTown) => (
              <Link
                key={nearbyTown.slug}
                href={`/${keyword.slug}-${nearbyTown.slug}`}
                className="group flex flex-col p-6 bg-white border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-300 text-center"
              >
                <span className="text-slate-900 font-bold group-hover:text-brand transition-colors">
                  {keyword.title} in {nearbyTown.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <section id="quote" className="section-dark py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            Stop losing local leads to your competitors. We can help you start generating real enquiries today.
          </p>
          <div className="flex justify-center">
            <Button href="/contact" className="text-lg px-10 py-4 shadow-lg">
              Get A Free Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
