import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CTA from '@/components/sections/CTA';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: 'Industries we serve | Business Sorted Kent',
  description:
    'Websites, SEO and automations for trades, service businesses and small firms across Kent. Plain prices, no rolling contracts.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/industries',
  },
};

const groupedIndustries = [
  {
    group: 'Trades',
    items: [
      { name: 'Electricians', slug: 'electricians' },
      { name: 'Plumbers', slug: 'plumbers' },
      { name: 'Roofers', slug: 'roofers' },
      { name: 'Builders', slug: 'builders' },
      { name: 'Carpenters', slug: 'carpenters' },
      { name: 'Painters & decorators', slug: 'painters-and-decorators' },
      { name: 'Driveway installers', slug: 'driveway-installers' },
    ],
  },
  {
    group: 'Outdoor & maintenance',
    items: [
      { name: 'Landscapers', slug: 'landscapers' },
      { name: 'Garden services', slug: 'garden-services' },
      { name: 'Property maintenance', slug: 'property-maintenance' },
      { name: 'Cleaning companies', slug: 'cleaning-companies' },
      { name: 'Removal companies', slug: 'removal-companies' },
    ],
  },
  {
    group: 'Property & professional',
    items: [
      { name: 'Letting agents', slug: 'letting-agents' },
      { name: 'Holiday lets', slug: 'holiday-lets' },
      { name: 'Accountants', slug: 'accountants' },
      { name: 'Solicitors', slug: 'solicitors' },
    ],
  },
];

export default function IndustriesPage() {
  const allIndustries = groupedIndustries.flatMap((g) => g.items);
  return (
    <main className="min-h-screen bg-paper">
      <PageSchema
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Industries', url: '/industries' },
        ]}
        extra={[
          {
            '@type': 'CollectionPage',
            name: 'Industries we serve',
            url: 'https://businesssortedkent.co.uk/industries',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: allIndustries.map((i, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                url: `https://businesssortedkent.co.uk/industries/${i.slug}`,
                name: i.name,
              })),
            },
          },
        ]}
      />
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Industries we serve
          </p>
          <h1 className="font-display text-ink mb-8 max-w-4xl">
            Built for the businesses that keep Kent running.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
            Trades, outdoor and maintenance businesses, lettings and professional firms. The kind
            of operators who would rather be doing the work than wrestling with their website.
          </p>
        </div>
      </section>

      {/* Industry grid */}
      <section className="py-24 md:py-32 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="space-y-16 md:space-y-20">
            {groupedIndustries.map((group) => (
              <div key={group.group}>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
                  {group.group}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-border">
                  {group.items.map((industry) => (
                    <Link
                      key={industry.slug}
                      href={`/industries/${industry.slug}`}
                      className="group block bg-paper p-6 md:p-7 transition-colors hover:bg-paper-raised"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display text-xl text-ink leading-snug">
                          {industry.name}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-24 md:py-32 bg-paper-raised border-y border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Why these businesses hire us
            </p>
            <h2 className="font-display text-ink mb-4">Three things they all want.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-border">
            <div className="bg-paper-raised p-8">
              <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                A website that wins work
              </h3>
              <p className="text-ink-muted leading-relaxed">
                Their existing site looks like it was built in 2014 and the form has not worked
                since 2019. They want one that does the job, without the agency price tag.
              </p>
            </div>
            <div className="bg-paper p-8">
              <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                To show up on Google
              </h3>
              <p className="text-ink-muted leading-relaxed">
                When someone in their town types in what they do, they want to be one of the names
                that shows up. Not buried on page three.
              </p>
            </div>
            <div className="bg-paper-raised p-8">
              <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                Less Sunday admin
              </h3>
              <p className="text-ink-muted leading-relaxed">
                Quotes, follow-ups, missed calls, invoices, review requests. The repeat work that
                eats their weekends. They want it off their plate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA
        titleOverride="Don’t see your trade?"
        paragraphOverride="We work with most service businesses regardless of whether we have a dedicated page for the industry. Tell us what you do and we will tell you if we can help."
        buttonOverride="Send a message"
      />
    </main>
  );
}
