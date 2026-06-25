import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CTA from '@/components/sections/CTA';
import { getAllTowns } from '@/lib/queries';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: 'Areas we cover | Business Sorted Kent',
  description:
    'Web design, SEO and automations for businesses in every Kent town. Built locally, priced honestly.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/towns',
  },
};

export default async function TownsPage() {
  const allTowns = await getAllTowns();
  const districts = allTowns
    .filter((t) => t.county === 'Kent District')
    .sort((a, b) => a.name.localeCompare(b.name));
  const primaryTowns = allTowns
    .filter((t) => t.county !== 'Kent District')
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen bg-paper">
      <PageSchema
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Areas we cover', url: '/towns' },
        ]}
        extra={[
          {
            '@type': 'CollectionPage',
            name: 'Areas we cover in Kent',
            url: 'https://businesssortedkent.co.uk/towns',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: primaryTowns.map((t, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `https://businesssortedkent.co.uk/towns/${t.slug}`,
                name: t.name,
              })),
            },
          },
        ]}
      />
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Areas we cover
          </p>
          <h1 className="font-display text-ink mb-8 max-w-4xl">
            Wherever you’re based in Kent.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
            We work with businesses across the county. Pick your town for local content and
            examples, or just{' '}
            <Link
              href="/contact"
              className="text-ink underline decoration-paper-border underline-offset-4 hover:text-brand-gold hover:decoration-brand-gold transition-colors"
            >
              send a message
            </Link>{' '}
            if your area isn’t listed.
          </p>
        </div>
      </section>

      {/* Towns grid */}
      <section className="py-24 md:py-32 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Towns
            </p>
            <h2 className="font-display text-ink">The main ones.</h2>
          </div>

          {primaryTowns.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-border">
              {primaryTowns.map((town) => (
                <Link
                  key={town.id || town.slug}
                  href={`/towns/${town.slug}`}
                  className="group block bg-paper p-6 md:p-7 transition-colors hover:bg-paper-raised"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl text-ink leading-snug">{town.name}</h3>
                    <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-ink-muted">Town list loading.</p>
          )}
        </div>
      </section>

      {/* Districts */}
      {districts.length > 0 && (
        <section className="py-24 md:py-32 bg-paper-raised border-y border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-12 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                Districts & boroughs
              </p>
              <h2 className="font-display text-ink mb-4">For wider coverage.</h2>
              <p className="text-ink-muted leading-relaxed">
                Working across a borough rather than a single town. Useful for trades who cover a
                bigger radius.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-border">
              {districts.map((district) => (
                <Link
                  key={district.id || district.slug}
                  href={`/towns/${district.slug}`}
                  className="group block bg-paper-raised p-6 md:p-7 transition-colors hover:bg-paper"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl text-ink leading-snug">{district.name}</h3>
                    <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA
        titleOverride="Town not listed?"
        paragraphOverride="We work with businesses across Kent, not just the ones above. Send a message and tell us where you’re based."
        buttonOverride="Send a message"
      />
    </main>
  );
}
