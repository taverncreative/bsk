import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getIndustryBySlug, getAllServices, getAllIndustries } from '@/lib/queries';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import CaseStudySection from '@/components/sections/CaseStudySection';
import CTA from '@/components/sections/CTA';
import { getAllCaseStudies, getAllGuides } from '@/lib/queries';
import EducationalGuides from '@/components/sections/EducationalGuides';
import PageSchema from '@/components/seo/PageSchema';
import { indefiniteArticle, singular, displayCase } from '@/lib/grammar';

type Props = {
  params: Promise<{
    industrySlug: string;
  }>;
};

export async function generateStaticParams() {
  const industries = await getAllIndustries();
  return industries.map((i) => ({ industrySlug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industrySlug } = await params;
  const industry = await getIndustryBySlug(industrySlug);

  if (!industry) {
    return { title: 'Not Found | Business Sorted Kent' };
  }

  return {
    title: `${industry.name} in Kent | Business Sorted Kent`,
    description: `£280 websites, £45/hour SEO and AI-assisted automations for ${industry.name.toLowerCase()} working in Kent. Plain prices, no rolling contracts.`,
    alternates: {
      canonical: `https://businesssortedkent.co.uk/industries/${industry.slug}`,
    },
  };
}

// All 11 services. The hub links every service x industry combo (not just the
// 4 core services), so none of the combo pages are left without an inbound
// internal link. Names/prices/lines are display copy for the tile; the slug
// must match the service slug so /industries/<industry>/<slug> resolves.
const SERVICE_TILES = [
  {
    name: 'Websites',
    slug: 'web-design',
    price: '£280',
    line: 'A small business website that loads fast, ranks well and books work.',
  },
  {
    name: 'SEO',
    slug: 'seo',
    price: '£45/hr',
    line: 'Real ranking work, billed by the hour. From one hour a month.',
  },
  {
    name: 'Lead capture',
    slug: 'lead-capture',
    price: 'POA',
    line: 'Forms, instant replies, missed-call recovery.',
  },
  {
    name: 'Automations',
    slug: 'business-automation',
    price: 'POA',
    line: 'CRM, follow-ups, invoicing, the repeat admin.',
  },
  {
    name: 'Branding',
    slug: 'branding',
    price: 'POA',
    line: 'A logo, palette and brand kit you can actually use.',
  },
  {
    name: 'Social media',
    slug: 'social-media-setup',
    price: 'POA',
    line: 'Profiles set up properly and branded consistently.',
  },
  {
    name: 'Digital marketing',
    slug: 'digital-marketing',
    price: 'POA',
    line: 'Getting the right people to your business, consistently.',
  },
  {
    name: 'Workwear & print',
    slug: 'workwear-print',
    price: 'POA',
    line: 'Workwear, cards, signage and vehicle graphics, on brand.',
  },
  {
    name: 'AI chatbots',
    slug: 'ai-chatbots',
    price: 'POA',
    line: 'A chatbot that answers the same questions on repeat.',
  },
  {
    name: 'AI content',
    slug: 'ai-content',
    price: 'POA',
    line: 'AI-assisted content that does not read like AI content.',
  },
  {
    name: 'AI automation',
    slug: 'ai-automation',
    price: 'POA',
    line: 'AI for the repeating bits of your business.',
  },
];

export default async function IndustryHubPage({ params }: Props) {
  const { industrySlug } = await params;
  const industry = await getIndustryBySlug(industrySlug);

  if (!industry) {
    notFound();
  }

  const [allCaseStudies, allGuides] = await Promise.all([
    getAllCaseStudies(),
    getAllGuides(),
  ]);

  const industryCaseStudies = allCaseStudies.filter(
    (c) => c.industry && c.industry.toLowerCase() === industry.name.toLowerCase()
  );

  const lowerName = industry.name.toLowerCase();
  const industrySingular = singular(lowerName);
  const industryDisplay = displayCase(industrySingular);
  const overviewText = (industry as any).overview_text as string | null;
  const strategyText = (industry as any).strategy_text as string | null;
  const opportunitySEO = (industry as any).opportunity_seo as string | null;
  const opportunityAutomation = (industry as any).opportunity_automation as string | null;
  const industryStats = (industry as any).industry_stats as Record<string, string> | null;

  return (
    <>
      <PageSchema
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Industries', url: '/industries' },
          { name: industry.name, url: `/industries/${industry.slug}` },
        ]}
        extra={[
          {
            '@type': 'Service',
            name: `Web design, SEO and automations for ${lowerName}`,
            description:
              industry.description ||
              `Websites, SEO and automations built for ${lowerName} working in Kent and the wider UK.`,
            provider: {
              '@type': 'Organization',
              '@id': 'https://businesssortedkent.co.uk/#organization',
              name: 'Business Sorted Kent',
            },
            audience: {
              '@type': 'BusinessAudience',
              name: industry.name,
            },
            areaServed: [
              { '@type': 'AdministrativeArea', name: 'Kent' },
              { '@type': 'AdministrativeArea', name: 'Greater London' },
            ],
          },
        ]}
      />

      <LocalServiceHero
        title={`Websites and SEO for ${lowerName}.`}
        subtitle={`Get found by the right people. Win the work you actually want. Spend less time on admin and more time on the job. That’s what we do for ${lowerName} across Kent and beyond.`}
        primaryCTA={{ text: 'See what yours could look like', href: '/free-preview' }}
        secondaryCTA={{ text: 'Get in touch', href: '/contact' }}
      />

      {/* Industry overview (rich content from DB) */}
      {overviewText && (
        <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="mb-12 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                The lay of the land
              </p>
              <h2 className="font-display text-ink">
                What we see in the {lowerName} market.
              </h2>
            </div>
            <div className="text-lg text-ink-muted leading-relaxed space-y-5 max-w-3xl">
              <p>{overviewText}</p>
            </div>
            {industryStats && Object.keys(industryStats).length > 0 && (
              <div className="mt-12 pt-12 border-t border-paper-border">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
                  Worth knowing
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-border">
                  {Object.values(industryStats).map((stat, i) => (
                    <div key={i} className="bg-paper p-6">
                      <p className="text-ink-muted leading-relaxed text-sm">{stat}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Strategy — what a good site for this industry actually does */}
      {strategyText && (
        <section className="py-24 md:py-32 bg-paper-raised border-y border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="mb-12 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                What a good site for {lowerName} actually does
              </p>
              <h2 className="font-display text-ink">The strategy, in plain English.</h2>
            </div>
            <div className="text-lg text-ink-muted leading-relaxed space-y-5 max-w-3xl">
              <p>{strategyText}</p>
            </div>
          </div>
        </section>
      )}

      {/* SEO + Automation opportunities */}
      {(opportunitySEO || opportunityAutomation) && (
        <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-16 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                Where the wins are
              </p>
              <h2 className="font-display text-ink">SEO and automation, for {lowerName}.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
              {opportunitySEO && (
                <div className="bg-paper p-8 md:p-10">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mb-4">
                    Getting found
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl text-ink mb-4 leading-tight">
                    Local SEO that matches how your customers actually search.
                  </h3>
                  <p className="text-ink-muted leading-relaxed">{opportunitySEO}</p>
                </div>
              )}
              {opportunityAutomation && (
                <div className="bg-paper p-8 md:p-10">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mb-4">
                    Less admin
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl text-ink mb-4 leading-tight">
                    Automating the bits that eat your Sundays.
                  </h3>
                  <p className="text-ink-muted leading-relaxed">{opportunityAutomation}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Service tiles tailored for the industry */}
      <section className="py-24 md:py-32 bg-paper-raised border-y border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              What we offer
            </p>
            <h2 className="font-display text-ink mb-4">
              Plain prices for {lowerName}.
            </h2>
            <p className="text-ink-muted leading-relaxed">
              Same prices, same checks, regardless of industry. The work just gets tuned to what
              your customers actually search for and how they decide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICE_TILES.map((s) => (
              <Link
                key={s.slug}
                href={`/industries/${industry.slug}/${s.slug}`}
                className="group flex flex-col bg-paper border border-paper-border rounded-xl p-8 md:p-10 h-full transition-colors hover:border-brand-gold"
              >
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                    {s.name} for {lowerName}
                  </h3>
                  <span className="font-mono text-lg md:text-xl text-brand-gold tracking-tight whitespace-nowrap">
                    {s.price}
                  </span>
                </div>
                <p className="text-ink-muted leading-relaxed mb-8">{s.line}</p>
                <span className="mt-auto inline-flex items-center text-sm text-ink-muted group-hover:text-brand-gold transition-colors">
                  More on this
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies if any */}
      {industryCaseStudies.length > 0 && (
        <CaseStudySection serviceName={industry.name} caseStudies={industryCaseStudies} />
      )}

      {/* Guides */}
      {allGuides && allGuides.length > 0 && (
        <EducationalGuides
          guides={allGuides}
          headlineOverride={`Guides for ${lowerName}`}
        />
      )}

      <CTA
        titleOverride={`Got ${indefiniteArticle(industrySingular)} ${industryDisplay} project in mind?`}
        paragraphOverride="Tell us what you do and what you need. We will come back with a plain answer, usually within a day."
        buttonOverride="Send a message"
      />
    </>
  );
}
