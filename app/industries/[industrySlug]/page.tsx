import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getIndustryBySlug, getAllServices, getAllIndustries } from '@/lib/queries';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import ServiceCard from '@/components/cards/ServiceCard';
import ProblemSection from '@/components/sections/ProblemSection';
import CaseStudySection from '@/components/sections/CaseStudySection';
import InternalLinks from '@/components/seo/InternalLinks';
import CTA from '@/components/sections/CTA';

// Need additional queries for the hub page extensions
import { getPainPointsByIndustry, getAllCaseStudies, getAllGuides } from '@/lib/queries';
import EducationalGuides from '@/components/sections/EducationalGuides';
import KentCoverage from '@/components/sections/KentCoverage';

type Props = {
  params: Promise<{
    industrySlug: string;
  }>;
};

export async function generateStaticParams() {
  const industries = await getAllIndustries();
  return industries.map((i) => ({
    industrySlug: i.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industrySlug } = await params;
  const industry = await getIndustryBySlug(industrySlug);

  if (!industry) {
    return { title: 'Not Found | Business Sorted' };
  }

  return {
    title: `Digital Growth Services for ${industry.name} | Business Sorted`,
    description: `Professional web design, SEO, and automation services tailored specifically to help ${industry.name.toLowerCase()} businesses generate more leads online.`,
    alternates: {
      canonical: `https://businesssortedkent.co.uk/industries/${industry.slug}`,
    },
  };
}

export default async function IndustryHubPage({ params }: Props) {
  const { industrySlug } = await params;
  const industry = await getIndustryBySlug(industrySlug);

  if (!industry) {
    notFound();
  }

  const [allServices, painPoints, allCaseStudies, allGuides] = await Promise.all([
     getAllServices(),
     industry.id ? getPainPointsByIndustry(industry.id) : Promise.resolve([]),
     getAllCaseStudies(),
     getAllGuides()
  ]);

  const industryCaseStudies = allCaseStudies.filter(c => 
     c.industry && c.industry.toLowerCase() === industry.name.toLowerCase()
  );

  return (
    <>
      {/* SECTION 1: HERO */}
      <LocalServiceHero
        title={`Digital Growth Services for ${industry.name}`}
        subtitle={`Helping ${industry.name.toLowerCase()} businesses generate more leads online.`}
        primaryCTA={{
          text: 'Get A Free Quote',
          href: '/contact',
        }}
      />

      {/* SECTION 1.5: INDUSTRY KNOWLEDGE GRAPH / OVERVIEW */}
      <section className="py-24 bg-neutral-900 border-t border-neutral-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              The {industry.name} Digital Landscape
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              A complete breakdown of the online competition and digital opportunities available for {industry.name.toLowerCase()} operating across Kent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Industry Overview & Competition</h3>
              <p className="text-neutral-400 leading-relaxed mb-6">
                {(industry as any).overview_text || `The ${industry?.name?.toLowerCase() || 'service'} sector in Kent is evolving rapidly. Businesses that invest in their digital presence are consistently outperforming those relying on traditional methods alone.`}
              </p>
              <h3 className="text-2xl font-bold text-white mb-4">Website Strategy</h3>
              <p className="text-neutral-400 leading-relaxed">
                {(industry as any).strategy_text || `A high-performance, conversion-focused website designed specifically for ${industry?.name?.toLowerCase() || 'your industry'} can transform how you attract and convert new customers online.`}
              </p>
            </div>

            <div className="bg-black border border-neutral-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-neutral-800 pb-4">Digital Opportunities</h3>
              <ul className="space-y-6">
                <li>
                  <strong className="block text-brand-gold text-lg mb-1">SEO Dominance</strong>
                  <p className="text-neutral-400 text-sm leading-relaxed">{(industry as any).opportunity_seo || `Strategic SEO positioning can put your ${industry?.name?.toLowerCase() || 'business'} in front of customers actively searching for your services across Kent.`}</p>
                </li>
                <li>
                  <strong className="block text-brand-gold text-lg mb-1">Automation Systems</strong>
                  <p className="text-neutral-400 text-sm leading-relaxed">{(industry as any).opportunity_automation || `Intelligent automation can streamline your operations, from lead follow-up to scheduling, freeing you to focus on delivering great service.`}</p>
                </li>
              </ul>
              {(industry as any).industry_stats && Object.keys((industry as any).industry_stats).length > 0 && (
                <div className="mt-8 pt-6 border-t border-neutral-800">
                  <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Industry Insights</h4>
                  <ul className="space-y-3">
                    {Object.values((industry as any).industry_stats).map((stat: any, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1 shrink-0">•</span>
                        <span className="text-sm text-neutral-400">{stat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INDUSTRY SERVICES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Services for {industry?.name || 'Your Industry'}
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Our core operational packages, customized natively for the {industry?.name?.toLowerCase() || 'service'} sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service) => (
              <ServiceCard
                key={service.slug}
                title={`${service.name} for ${industry.name}`}
                description={`Tailored ${service.name.toLowerCase()} solutions to help your ${industry.name.toLowerCase()} business scale and dominate the local market.`}
                href={`/industries/${industry.slug}/${service.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: INDUSTRY PROBLEMS */}
      <ProblemSection industryName={industry.name} painPoints={painPoints} />

      {/* SECTION 4: CASE STUDIES */}
      <CaseStudySection serviceName={industry.name} caseStudies={industryCaseStudies} />

      {/* SECTION 5: INTERNAL LINKS (Fallback linking structure) */}
      <div className="bg-slate-50 py-12">
        <InternalLinks
           serviceSlug="web-design" 
           townSlug="" 
        />
      </div>

      <KentCoverage pageType={industry.slug} />

      {allGuides && allGuides.length > 0 && (
         <EducationalGuides guides={allGuides} headlineOverride={`Growth Guides for ${industry.name}`} />
      )}

      {/* SECTION 3: CTA */}
      <CTA />
    </>
  );
}
