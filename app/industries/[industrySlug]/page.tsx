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
import { getPainPointsByIndustry, getAllCaseStudies } from '@/lib/queries';

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

  const [allServices, painPoints, allCaseStudies] = await Promise.all([
     getAllServices(),
     industry.id ? getPainPointsByIndustry(industry.id) : Promise.resolve([]),
     getAllCaseStudies()
  ]);

  const industryCaseStudies = allCaseStudies.filter(c => 
     c.industry.toLowerCase() === industry.name.toLowerCase()
  );

  return (
    <>
      {/* SECTION 1: HERO */}
      <LocalServiceHero
        title={`Digital Growth Services for ${industry.name}`}
        subtitle={`Helping ${industry.name.toLowerCase()} businesses generate more leads online.`}
        primaryCTA={{
          text: 'Get a Free Quote',
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
                The {industry.name.toLowerCase()} sector in Kent is highly competitive. Many established {industry.name.toLowerCase()} rely heavily on legacy word-of-mouth or expensive aggregators. However, consumer behavior has fundamentally shifted. When a customer needs a {industry.name.substring(0, industry.name.length - 1).toLowerCase()}, they turn immediately to Google.
              </p>
              <h3 className="text-2xl font-bold text-white mb-4">Website Strategy</h3>
              <p className="text-neutral-400 leading-relaxed">
                Most {industry.name.toLowerCase()} websites act as static digital business cards. They load slowly and fail to convert traffic into phone calls or form fills. By deploying a high-performance, conversion-focused website, you instantly differentiate your brand from the local competition.
              </p>
            </div>
            
            <div className="bg-black border border-neutral-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-neutral-800 pb-4">Digital Opportunities</h3>
              <ul className="space-y-6">
                <li>
                  <strong className="block text-brand-gold text-lg mb-1">SEO Dominance</strong>
                  <p className="text-neutral-400 text-sm leading-relaxed">Most local {industry.name.toLowerCase()} have zero technical SEO. Securing the top 3 spots in the Google Local Desktop pack guarantees consistent daily enquiries.</p>
                </li>
                <li>
                  <strong className="block text-brand-gold text-lg mb-1">Automation Systems</strong>
                  <p className="text-neutral-400 text-sm leading-relaxed">Using automated CRM pipelines to instantly follow up with internet leads while your competitors are still on site or unresponsive.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INDUSTRY SERVICES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Services for {industry.name}
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Our core operational packages, customized natively for the {industry.name.toLowerCase()} sector.
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

      {/* SECTION 3: CTA */}
      <CTA />
    </>
  );
}
