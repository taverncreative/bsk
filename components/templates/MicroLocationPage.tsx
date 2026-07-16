import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Town, Service } from '@/types';
import CTA from '@/components/sections/CTA';

interface MicroLocationPageProps {
  service: Service;
  town: Town;
  nearbyTowns: { name: string; slug: string }[];
}

const SERVICE_DESCRIPTORS: Record<string, string> = {
  'web-design':
    'A classic small business website, priced to your project. Built right, indexed cleanly, yours in 1 to 2 weeks.',
  seo: 'Real ranking work, priced to your project. From one hour a month, no rolling contract.',
  'lead-capture':
    'Forms, replies and missed-call recovery so a busy day does not cost you the lead. Priced to your project.',
  'business-automation':
    'CRM setup, follow-ups, job tracking, repeat invoicing. Priced to your project.',
};

export default function MicroLocationPage({ service, town, nearbyTowns }: MicroLocationPageProps) {
  const subtitle =
    SERVICE_DESCRIPTORS[service.slug] ||
    `${service.name} for businesses operating near ${town.name}. Priced to your project.`;

  return (
    <main className="min-h-screen bg-paper">
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Near {town.name}
          </p>
          <h1 className="font-display text-ink mb-8 max-w-4xl">
            {service.name} for businesses near {town.name}.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl mb-10">
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-brand-gold hover:text-ink transition-colors"
            >
              Get in touch
            </Link>
            <Link
              href={`/${service.slug}`}
              className="inline-flex items-center bg-transparent border border-ink/30 text-ink font-medium px-6 py-3 rounded-md hover:border-ink hover:bg-ink hover:text-paper transition-colors"
            >
              More on {service.name.toLowerCase()}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Why this page exists
            </p>
            <h2 className="font-display text-ink">Local searches matter.</h2>
          </div>
          <div className="text-lg text-ink-muted leading-relaxed space-y-5 max-w-3xl">
            <p>
              People searching for {service.name.toLowerCase()} near {town.name} are usually
              looking for someone who actually covers the area. We do. Same service, same standards,
              same checks, regardless of which Kent postcode you’re in.
            </p>
            <p>
              If you’re right in the centre of town,{' '}
              <Link
                href={`/towns/${town.slug}`}
                className="text-ink underline decoration-paper-border underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition-colors"
              >
                {town.name}’s main page
              </Link>{' '}
              has more on what we do there.
            </p>
          </div>
        </div>
      </section>

      {nearbyTowns.length > 0 && (
        <section className="py-20 md:py-24 bg-paper-raised border-y border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Other nearby
            </p>
            <h2 className="font-display text-ink mb-8">{service.name} in nearby towns.</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${service.slug}-${town.slug}`}
                className="inline-flex items-center text-sm font-medium text-brand-gold border border-brand-gold rounded-full px-4 py-2 hover:bg-brand-gold hover:text-ink transition-colors"
              >
                {town.name} (main)
              </Link>
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

      <CTA
        titleOverride={`Got a project near ${town.name}?`}
        paragraphOverride="Tell us what you do and what you need. We will come back with a plain answer, usually within a day."
        buttonOverride="Send a message"
      />
    </main>
  );
}
