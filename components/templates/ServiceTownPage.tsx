import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import CaseStudySection from '@/components/sections/CaseStudySection';
import EducationalGuides from '@/components/sections/EducationalGuides';
import CTA from '@/components/sections/CTA';
import FAQ from '@/components/sections/FAQ';
import { getLocalServiceMessaging } from '@/lib/content/messaging';
import type { LocalContent } from '@/lib/queries/local-content';
import type { Industry, Guide, IndustryPainPoint } from '@/types';
import type { CaseStudy } from '@/lib/queries/caseStudies';

interface BaseEntity {
  name: string;
  slug: string;
}

interface TownEntity extends BaseEntity {
  latitude?: number | null;
  longitude?: number | null;
  intro?: string | null;
}

interface ServiceEntity extends BaseEntity {
  description?: string | null;
}

interface ServiceTownPageProps {
  service: ServiceEntity;
  town: TownEntity;
  localIntro?: string;
  localContent?: LocalContent | null;
  otherServices: BaseEntity[];
  nearbyTowns: BaseEntity[];
  industries: Industry[];
  caseStudies: CaseStudy[];
  painPoints: IndustryPainPoint[];
  guides: Guide[];
}

const SERVICE_DEFAULT_INCLUDED: Record<string, { title: string; body: string }[]> = {
  'web-design': [
    { title: 'Mobile first', body: 'Designed for phones first. That is where most of your visitors arrive.' },
    { title: 'Fast loads', body: 'Sub-2-second loads. Lighthouse 95+. Images compressed and lazy-loaded.' },
    { title: 'Indexed cleanly', body: 'Sitemap submitted, structured data set up. Google can find every page.' },
    { title: 'Google Business profile', body: 'Set up or refreshed alongside the launch so map results work too.' },
  ],
  seo: [
    { title: 'Local keyword research', body: 'What customers in your area actually type. Not what they should type.' },
    { title: 'Google Business profile', body: 'Set up, optimised, posts scheduled, photos checked, reviews surfaced.' },
    { title: 'Technical fixes', body: 'Speed, indexing, structured data, broken links, the things Google quietly punishes.' },
    { title: 'Monthly report', body: 'What ranked, what moved, what we did, what we suggest next.' },
  ],
  'lead-capture': [
    { title: 'Contact forms that convert', body: 'Short, friendly, on the right page, asking the right questions.' },
    { title: 'Missed-call SMS recovery', body: 'Missed the call? An instant text goes out with a booking link.' },
    { title: 'Instant autoresponders', body: 'Anyone who submits a form gets a useful reply within seconds.' },
    { title: 'Follow-up sequences', body: 'Gentle, scheduled nudges that bring quiet enquiries back.' },
  ],
  'business-automation': [
    { title: 'CRM setup', body: 'One place for customers, jobs, quotes and history.' },
    { title: 'Follow-up sequences', body: 'Quotes that stayed unanswered get a polite nudge.' },
    { title: 'Invoicing & reminders', body: 'Invoices go out automatically, overdues chase themselves.' },
    { title: 'Review requests', body: 'After every job, a polite Google review ask goes out.' },
  ],
};

const SERVICE_PRICE: Record<string, string> = {
  'web-design': '£280',
  seo: '£45/hour',
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

export default function ServiceTownPage({
  service,
  town,
  localContent,
  otherServices,
  nearbyTowns,
  caseStudies,
  guides,
}: ServiceTownPageProps) {
  const localCaseStudies = caseStudies.filter(
    (c) => c.town === town.name || c.town === town.slug
  );
  const displayCaseStudies = localCaseStudies.length > 0 ? localCaseStudies : caseStudies;

  const messaging = getLocalServiceMessaging(service.slug, town.name);
  const localIntro = localContent?.intro_paragraph;
  const localApproach = localContent?.success_approach;
  const localPainPoints = localContent?.pain_points?.slice(0, 3) || [];
  const localSolutions = localContent?.solutions?.slice(0, 4) || [];
  const localFaqs = localContent?.faqs;
  const price = SERVICE_PRICE[service.slug] || 'POA';

  const includedItems =
    localSolutions.length >= 3
      ? localSolutions.map((s) => ({ title: s.title, body: s.description }))
      : SERVICE_DEFAULT_INCLUDED[service.slug] || [];

  return (
    <>
      <LocalServiceHero
        title={messaging.title}
        subtitle={messaging.subtitle}
        primaryCTA={{
          text: service.slug === 'web-design' ? 'See what yours could look like' : 'Get in touch',
          href: service.slug === 'web-design' ? '/free-preview' : '/contact',
        }}
        secondaryCTA={{
          text: 'Get in touch',
          href: '/contact',
        }}
      />

      {/* What's included for this service */}
      {includedItems.length > 0 && (
        <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-16 md:mb-20 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                What {price !== 'POA' ? price : 'it'} covers
              </p>
              <h2 className="font-display text-ink">
                {service.name} for {town.name}, properly done.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
              {includedItems.map((item) => (
                <div key={item.title} className="bg-paper p-8 md:p-10">
                  <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-ink-muted leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local context if we have it */}
      {(localIntro || localApproach) && (
        <section className="py-24 md:py-32 bg-paper-raised border-y border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="mb-12 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                {town.name} context
              </p>
              <h2 className="font-display text-ink">What we know about the area.</h2>
            </div>
            <div className="text-lg text-ink-muted leading-relaxed space-y-5 max-w-3xl">
              {localIntro && <p>{localIntro}</p>}
              {localApproach && localApproach !== localIntro && <p>{localApproach}</p>}
            </div>
          </div>
        </section>
      )}

      {/* Pain points if we have them — reframed as "what businesses tell us" */}
      {localPainPoints.length > 0 && (
        <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-16 md:mb-20 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                What {town.name} businesses tell us
              </p>
              <h2 className="font-display text-ink">The recurring themes.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-border">
              {localPainPoints.map((point, i) => (
                <div key={i} className="bg-paper p-8">
                  <h3 className="font-display text-lg md:text-xl text-ink mb-3 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-ink-muted leading-relaxed text-sm">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {displayCaseStudies && displayCaseStudies.length > 0 && (
        <CaseStudySection serviceName={service.name} caseStudies={displayCaseStudies} townName={town.name} />
      )}

      {/* Other services link */}
      {otherServices.length > 0 && (
        <section className="py-20 md:py-24 bg-paper-raised border-y border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
              Other things we do in {town.name}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-border">
              {otherServices.slice(0, 3).map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}-${town.slug}`}
                  className="group block bg-paper-raised p-6 transition-colors hover:bg-paper"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-lg text-ink">{s.name}</span>
                    <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs from DB if present */}
      {localFaqs && localFaqs.length > 0 && (
        <FAQ
          faqs={localFaqs.map((f) => ({ question: f.question, answer: f.answer }))}
          title={`Questions about ${service.name.toLowerCase()} in ${town.name}`}
        />
      )}

      {/* Nearby */}
      {nearbyTowns.length > 0 && (
        <section className="py-20 md:py-24 bg-paper border-t border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Nearby
            </p>
            <h2 className="font-display text-ink mb-8">{service.name} in nearby towns.</h2>
            <div className="flex flex-wrap gap-3">
              {nearbyTowns.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/${service.slug}-${nearby.slug}`}
                  className="inline-flex items-center text-sm text-ink-muted hover:text-brand-gold transition-colors border border-paper-border rounded-full px-4 py-2 hover:border-brand-gold"
                >
                  {nearby.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {guides && guides.length > 0 && (
        <EducationalGuides
          guides={guides}
          headlineOverride={`Guides for ${town.name} businesses`}
          contextKey={`${service.slug}-${town.slug}`}
        />
      )}

      <CTA
        titleOverride={`Got a ${service.name.toLowerCase()} project in ${town.name}?`}
        paragraphOverride="Tell us what you need and we will come back with a plain answer, usually within a day."
        buttonOverride="Send a message"
      />
    </>
  );
}
