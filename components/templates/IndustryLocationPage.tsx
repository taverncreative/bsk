import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import CTA from '@/components/sections/CTA';

interface IndustryLocationPageProps {
  industry: { name: string; slug: string; prefix?: string };
  service: { name: string; slug: string };
  town: { name: string; slug: string; latitude?: number | null; longitude?: number | null };
  nearbyTowns?: { name: string; slug: string }[];
}

const SERVICE_DESCRIPTORS: Record<string, string> = {
  'web-design': 'A small business website that loads fast, ranks well, and works on every phone. £280, one-off.',
  seo: 'Real ranking work, billed by the hour. From one hour a month, no rolling contract. £45/hour.',
  'lead-capture': 'Forms, replies and missed-call recovery so a busy day does not cost you the lead. Priced on the brief.',
  'business-automation':
    'CRM setup, job tracking, follow-ups, repeat invoicing. The repeat work, handled. Priced on the brief.',
  branding:
    'A logo and brand identity that fits. A proper mark, a usable palette, typography that pairs. Priced on the brief.',
  'social-media-setup':
    'Profiles set up the right way, branded consistently, pointed at the work you want to win. Priced on the brief.',
  'workwear-print':
    'Branded workwear, business cards, signage and vehicle graphics. Sorted alongside your website so it all matches.',
  'ai-chatbots':
    'A chatbot trained on your business that handles repeat enquiries and books appointments. Priced on the brief.',
  'ai-content':
    'AI-assisted blog posts and service pages, edited by hand. Doesn’t read like AI content. Priced on the brief.',
  'ai-automation':
    'Email triage, follow-ups, document drafting, data sorting. The mundane bits handled. Priced on the brief.',
};

export default function IndustryLocationPage({
  industry,
  service,
  town,
  nearbyTowns,
}: IndustryLocationPageProps) {
  const serviceDescriptor =
    SERVICE_DESCRIPTORS[service.slug] ||
    `Built specifically for ${industry.name.toLowerCase()} working in ${town.name}.`;

  return (
    <>
      <LocalServiceHero
        title={`${service.name} for ${industry.name.toLowerCase()} in ${town.name}.`}
        subtitle={serviceDescriptor}
        primaryCTA={{ text: 'See what yours could look like', href: '/free-preview' }}
        secondaryCTA={{ text: 'Get in touch', href: '/contact' }}
      />

      {/* Why pages like this exist */}
      <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Why we have a page for this
            </p>
            <h2 className="font-display text-ink">Different trades, different work.</h2>
          </div>
          <div className="text-lg text-ink-muted leading-relaxed space-y-5 max-w-3xl">
            <p>
              {industry.name} working in {town.name} have a slightly different brief to{' '}
              {industry.name.toLowerCase()} working elsewhere. The searches are local. The
              competition is local. The customers are local. We adjust accordingly.
            </p>
            <p>
              Same {service.name.toLowerCase()} approach as we’d apply to anyone else, but tuned
              for how {town.name} customers actually find and pick a {industry.name.toLowerCase().replace(/s$/, '')}.
            </p>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-20 md:py-24 bg-paper-raised border-y border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
            Related
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-paper-border">
            <Link
              href={`/${service.slug}`}
              className="group block bg-paper-raised p-6 transition-colors hover:bg-paper"
            >
              <p className="font-mono text-xs text-ink-faint mb-2">Service</p>
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-lg text-ink">{service.name}</span>
                <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-brand-gold transition-colors" />
              </div>
            </Link>
            <Link
              href={`/towns/${town.slug}`}
              className="group block bg-paper-raised p-6 transition-colors hover:bg-paper"
            >
              <p className="font-mono text-xs text-ink-faint mb-2">Town</p>
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-lg text-ink">{town.name}</span>
                <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-brand-gold transition-colors" />
              </div>
            </Link>
            <Link
              href={`/industries/${industry.slug}`}
              className="group block bg-paper-raised p-6 transition-colors hover:bg-paper"
            >
              <p className="font-mono text-xs text-ink-faint mb-2">Industry</p>
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-lg text-ink">{industry.name}</span>
                <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-brand-gold transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby */}
      {nearbyTowns && nearbyTowns.length > 0 && (
        <section className="py-20 md:py-24 bg-paper border-t border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Also covering
            </p>
            <h2 className="font-display text-ink mb-8">Nearby towns.</h2>
            <div className="flex flex-wrap gap-3">
              {nearbyTowns.map((t) => (
                <Link
                  key={t.slug}
                  href={`/towns/${t.slug}`}
                  className="inline-flex items-center text-sm text-ink-muted hover:text-brand-gold transition-colors border border-paper-border rounded-full px-4 py-2 hover:border-brand-gold"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA
        titleOverride={`Got a project in ${town.name}?`}
        paragraphOverride="Tell us what you do and what you need. We will come back with a plain answer, usually within a day."
        buttonOverride="Send a message"
      />
    </>
  );
}
