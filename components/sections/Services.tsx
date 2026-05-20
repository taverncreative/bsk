import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface ServiceItem {
  title: string;
  price: string;
  priceNote?: string;
  description: string;
  href: string;
}

interface ServicesProps {
  headlineOverride?: string;
  descriptionOverride?: string;
  servicesOverride?: ServiceItem[];
}

const pillars: ServiceItem[] = [
  {
    title: 'Websites',
    price: '£280',
    priceNote: 'classic site · e-com/custom: POA',
    description:
      'A small business website that loads fast, ranks well and works on every phone. Yours in 1–2 weeks. Hosting, SSL, backups and security patches: £15 a month.',
    href: '/web-design',
  },
  {
    title: 'SEO',
    price: '£45',
    priceNote: 'per hour · from 1 hr/mo',
    description:
      'Real work on your Google rankings, billed by the hour. From one hour a month, no minimum term. You see what got done and what it ranked for.',
    href: '/seo',
  },
  {
    title: 'Lead capture',
    price: 'POA',
    priceNote: 'priced on the brief',
    description:
      'Forms, replies and missed-call recovery so a busy day doesn’t cost you the lead. Quoted once we know what you handle now.',
    href: '/lead-capture',
  },
  {
    title: 'Automations',
    price: 'POA',
    priceNote: 'priced on the brief',
    description:
      'CRM setup, job tracking, follow-ups, repeat invoicing. Anything you’d rather not do twice. Quoted once we know what you actually run.',
    href: '/business-automation',
  },
];

export default function Services({ headlineOverride, descriptionOverride, servicesOverride }: ServicesProps = {}) {
  const items = servicesOverride && servicesOverride.length > 0 ? servicesOverride : pillars;

  return (
    <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
            What things cost
          </p>
          <h2 className="font-display text-ink mb-4">
            {headlineOverride || 'Plain prices.'}
          </h2>
          <p className="text-ink-muted leading-relaxed">
            {descriptionOverride ||
              'AI made the work faster, not less rigorous. Performance, security and SEO get the same checks as a £3,000 site.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
          {items.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group block bg-paper p-8 md:p-10 h-full transition-colors hover:bg-paper-raised"
            >
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <h3 className="font-display text-3xl md:text-4xl text-ink leading-none">
                  {service.title}
                </h3>
                <div className="text-right">
                  <span className="font-mono text-2xl md:text-3xl text-brand-gold tracking-tight">
                    {service.price}
                  </span>
                  {service.priceNote && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint mt-1">
                      {service.priceNote}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-ink-muted leading-relaxed mb-8">
                {service.description}
              </p>
              <span className="inline-flex items-center text-sm text-ink-muted group-hover:text-brand-gold transition-colors">
                More on this
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-sm text-ink-muted">
          Logos, social media setup and workwear print can be added to any project.{' '}
          <Link href="/services" className="text-ink underline decoration-paper-border underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition-colors">
            See the full list
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
