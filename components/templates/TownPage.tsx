import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import CTA from '@/components/sections/CTA';
import EducationalGuides from '@/components/sections/EducationalGuides';
import PageSchema from '@/components/seo/PageSchema';

interface BaseEntity {
  name: string;
  slug: string;
}

interface TownContentRecord {
  service_slug: string;
  intro_paragraph: string;
  local_context: string;
  competition_landscape: string | null;
  success_approach: string | null;
  pain_points: Array<{ title: string; description: string }>;
  solutions: Array<{ title: string; description: string }>;
}

interface TownPageProps {
  town: BaseEntity;
  services: BaseEntity[];
  guides?: any[];
  townContent?: TownContentRecord[];
}

const NEARBY_FALLBACK = ['Ashford', 'Maidstone', 'Folkestone', 'Canterbury', 'Tunbridge Wells'];

const SERVICE_PRICES: Record<string, string> = {
  'web-design': '£280',
  seo: '£45/hr',
  'lead-capture': 'POA',
  'business-automation': 'POA',
  branding: 'POA',
  'social-media-setup': 'POA',
  'digital-marketing': 'POA',
  'workwear-print': 'POA',
  'ai-chatbots': 'POA',
  'ai-content': 'POA',
  'ai-automation': 'POA',
};

export default function TownPage({ town, services, guides, townContent = [] }: TownPageProps) {
  const hasContent = townContent.length > 0;

  const webDesignContent = townContent.find((c) => c.service_slug === 'web-design');
  const seoContent = townContent.find((c) => c.service_slug === 'seo');

  const heroSubtitle =
    hasContent && seoContent
      ? seoContent.intro_paragraph
      : `Web design, SEO and automations for businesses in ${town.name}. £280 websites, £45/hour SEO, automations on the brief.`;

  const localContext =
    hasContent && webDesignContent
      ? webDesignContent.local_context
      : null;

  const approachContext =
    hasContent && webDesignContent
      ? webDesignContent.success_approach || webDesignContent.intro_paragraph
      : null;

  // Prefer the four core service pillars and dedupe by slug
  const CORE = ['web-design', 'seo', 'lead-capture', 'business-automation'];
  const seen = new Set<string>();
  const orderedServices: BaseEntity[] = [];
  for (const slug of CORE) {
    const match = services.find((s) => s.slug === slug);
    if (match && !seen.has(match.slug)) {
      orderedServices.push(match);
      seen.add(match.slug);
    }
  }
  for (const s of services) {
    if (!seen.has(s.slug)) {
      orderedServices.push(s);
      seen.add(s.slug);
    }
  }

  return (
    <>
      <PageSchema
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Areas we cover', url: '/towns' },
          { name: town.name, url: `/towns/${town.slug}` },
        ]}
        extra={[
          {
            '@type': 'Service',
            name: `Web design, SEO and automations in ${town.name}`,
            description: `Websites, SEO and automations for businesses based in ${town.name}, Kent.`,
            provider: {
              '@type': 'Organization',
              '@id': 'https://businesssortedkent.co.uk/#organization',
              name: 'Business Sorted Kent',
            },
            areaServed: { '@type': 'City', name: town.name },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `Services in ${town.name}`,
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Website Design' },
                  price: '280',
                  priceCurrency: 'GBP',
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Local SEO' },
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: '45',
                    priceCurrency: 'GBP',
                    unitText: 'HOUR',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Lead Capture' },
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Business Automation' },
                },
              ],
            },
          },
        ]}
      />
      <LocalServiceHero
        title={`Web, SEO and automations for ${town.name} businesses.`}
        subtitle={heroSubtitle}
        primaryCTA={{ text: 'See what yours could look like', href: '/free-preview' }}
        secondaryCTA={{ text: 'Get in touch', href: '/contact' }}
      />

      {/* Services available in this town */}
      <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              What we do in {town.name}
            </p>
            <h2 className="font-display text-ink">Four core services, plus add-ons.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
            {orderedServices.slice(0, 4).map((service) => {
              const match = townContent.find((c) => c.service_slug === service.slug);
              const snippet =
                match?.intro_paragraph?.slice(0, 140).replace(/\s+\S*$/, '') || null;
              const price = SERVICE_PRICES[service.slug] || 'POA';
              return (
                <Link
                  key={service.slug}
                  href={`/${service.slug}-${town.slug}`}
                  className="group block bg-paper p-8 md:p-10 h-full transition-colors hover:bg-paper-raised"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                      {service.name}
                    </h3>
                    <span className="font-mono text-lg md:text-xl text-brand-gold tracking-tight whitespace-nowrap">
                      {price}
                    </span>
                  </div>
                  {snippet && (
                    <p className="text-ink-muted leading-relaxed mb-8">{snippet}…</p>
                  )}
                  <span className="inline-flex items-center text-sm text-ink-muted group-hover:text-brand-gold transition-colors">
                    {service.name} in {town.name}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Local context — only render if we have real DB content */}
      {(localContext || approachContext) && (
        <section className="py-24 md:py-32 bg-paper-raised border-y border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="mb-12 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                About {town.name}
              </p>
              <h2 className="font-display text-ink">What we know about the area.</h2>
            </div>
            <div className="text-lg text-ink-muted leading-relaxed space-y-5 max-w-3xl">
              {localContext && <p>{localContext}</p>}
              {approachContext && approachContext !== localContext && <p>{approachContext}</p>}
            </div>
          </div>
        </section>
      )}

      {guides && guides.length > 0 && (
        <EducationalGuides
          guides={guides}
          headlineOverride={`Guides for ${town.name} businesses`}
          contextKey={`town-${town.slug}`}
        />
      )}

      {/* Nearby */}
      <section className="py-20 md:py-24 bg-paper border-t border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
            Nearby towns
          </p>
          <h2 className="font-display text-ink mb-8">Also covering.</h2>
          <div className="flex flex-wrap gap-3">
            {NEARBY_FALLBACK.filter((t) => t !== town.name).map((t) => (
              <Link
                key={t}
                href={`/towns/${t.toLowerCase().replace(' ', '-')}`}
                className="inline-flex items-center text-sm text-ink-muted hover:text-brand-gold transition-colors border border-paper-border rounded-full px-4 py-2 hover:border-brand-gold"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA
        titleOverride={`Got a project in ${town.name}?`}
        paragraphOverride="Tell us what you do and what you need. We will come back with a plain answer, usually within a day."
        buttonOverride="Send a message"
      />
    </>
  );
}
