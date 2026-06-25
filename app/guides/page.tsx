import type { Metadata } from 'next';
import GuideCard from '@/components/cards/GuideCard';
import CTA from '@/components/sections/CTA';
import { getAllGuides } from '@/lib/queries';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: 'Guides | Business Sorted Kent',
  description:
    'Plain-English guides on websites, SEO and automations for everyday Kent businesses. Written by the people doing the work.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/guides',
  },
};

export default async function GuidesIndexPage() {
  const guides = await getAllGuides();

  return (
    <main className="min-h-screen bg-paper">
      <PageSchema
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Guides', url: '/guides' },
        ]}
        extra={[
          {
            '@type': 'CollectionPage',
            name: 'Guides',
            url: 'https://businesssortedkent.co.uk/guides',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: guides.map((g, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `https://businesssortedkent.co.uk/guides/${g.slug}`,
                name: g.title,
              })),
            },
          },
        ]}
      />
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Guides
          </p>
          <h1 className="font-display text-ink mb-8 max-w-4xl">
            Plain-English notes on websites, SEO and digital admin.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
            Written for everyday Kent businesses by the people doing the work. Nothing here will
            tell you to leverage anything.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {guides.length === 0 ? (
            <p className="text-ink-muted">More guides on the way.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide) => (
                <GuideCard key={guide.id || guide.slug} guide={guide} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA
        titleOverride="Got a topic we haven’t covered?"
        paragraphOverride="If there’s something you’ve been Googling and getting nowhere, tell us. We will write it up properly."
        buttonOverride="Send a message"
      />
    </main>
  );
}
