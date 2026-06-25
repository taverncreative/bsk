import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Services from '@/components/sections/Services';
import CTA from '@/components/sections/CTA';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: 'Services & prices | Business Sorted Kent',
  description:
    '£280 websites, £45/hour SEO, automations on the brief. The full list of what we do, plain prices, no monthly retainers.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/services',
  },
};

const supportingServices = [
  {
    title: 'Logo & branding',
    body: 'A proper logo, palette, typography system and a one-page brand reference. Priced on the brief.',
    href: '/branding',
  },
  {
    title: 'Social media setup',
    body: 'Facebook, Instagram, LinkedIn and Google Business profiles set up the right way, branded consistently. Priced on the brief.',
    href: '/social-media-setup',
  },
  {
    title: 'Workwear & print',
    body: 'Polos, t-shirts, hi-vis, business cards, signage, vehicle graphics. Sorted alongside your website so it all matches.',
    href: '/workwear-print',
  },
  {
    title: 'AI chatbots',
    body: 'A chatbot trained on your business that answers the repeat questions and books appointments. Priced on the brief.',
    href: '/ai-chatbots',
  },
  {
    title: 'AI content',
    body: 'Blog posts, service pages and landing copy written with AI, edited by hand. Priced on the brief.',
    href: '/ai-content',
  },
  {
    title: 'AI automation',
    body: 'Email triage, follow-ups, document drafting, data sorting. The mundane repeat work, handled. Priced on the brief.',
    href: '/ai-automation',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-paper">
      <PageSchema
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
        extra={[
          {
            '@type': 'OfferCatalog',
            name: 'Services & prices',
            url: 'https://businesssortedkent.co.uk/services',
            provider: { '@id': 'https://businesssortedkent.co.uk/#organization' },
            itemListElement: [
              {
                '@type': 'Offer',
                price: '280',
                priceCurrency: 'GBP',
                itemOffered: { '@type': 'Service', name: 'Website Design', url: 'https://businesssortedkent.co.uk/web-design' },
              },
              {
                '@type': 'Offer',
                priceSpecification: { '@type': 'UnitPriceSpecification', price: '45', priceCurrency: 'GBP', unitText: 'HOUR' },
                itemOffered: { '@type': 'Service', name: 'Local SEO', url: 'https://businesssortedkent.co.uk/seo' },
              },
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Lead Capture', url: 'https://businesssortedkent.co.uk/lead-capture' },
              },
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Business Automation', url: 'https://businesssortedkent.co.uk/business-automation' },
              },
            ],
          },
        ]}
      />
      {/* Hero */}
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Services & prices
          </p>
          <h1 className="font-display text-ink mb-8 max-w-4xl">
            Everything we do, with the prices.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
            Four core services, six add-ons. No monthly retainers, no rolling contracts, no
            packages with vague deliverables. You pay for what we do.
          </p>
        </div>
      </section>

      {/* Core 4 with prices — reuse homepage Services */}
      <Services
        headlineOverride="The four core services."
        descriptionOverride="The main things businesses hire us to do. Prices include everything described in the body of each."
      />

      {/* Supporting services */}
      <section className="py-24 md:py-32 bg-paper-raised border-t border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Add-ons
            </p>
            <h2 className="font-display text-ink mb-4">Things we can sort at the same time.</h2>
            <p className="text-ink-muted leading-relaxed">
              Easier to do alongside the main work than as a separate engagement. Priced on the
              brief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
            {supportingServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block bg-paper-raised p-8 md:p-10 h-full transition-colors hover:bg-paper"
              >
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-ink-muted leading-relaxed mb-8">{service.body}</p>
                <span className="inline-flex items-center text-sm text-ink-muted group-hover:text-brand-gold transition-colors">
                  More on this
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA
        titleOverride="Want a quote on something specific?"
        paragraphOverride="Tell us what you need and we will come back with a plain price. Usually within a day."
        buttonOverride="Send a message"
      />
    </main>
  );
}
