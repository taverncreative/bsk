import type { Metadata } from 'next';
import { getAllCaseStudies } from '@/lib/queries';
import CaseStudyHighlight from '@/components/cards/CaseStudyHighlight';
import CaseStudyHighlights from '@/components/sections/CaseStudyHighlights';
import PerformanceProof from '@/components/sections/PerformanceProof';
import CTA from '@/components/sections/CTA';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: 'Recent work | Business Sorted Kent',
  description:
    'A few of the Kent businesses we’ve built websites and ranked on Google for. Real projects, real outcomes.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/case-studies',
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <main className="min-h-screen bg-paper">
      <PageSchema
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Case studies', url: '/case-studies' },
        ]}
        extra={[
          {
            '@type': 'CollectionPage',
            name: 'Case studies',
            url: 'https://businesssortedkent.co.uk/case-studies',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: caseStudies.map((cs, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `https://businesssortedkent.co.uk/case-studies/${cs.slug}`,
                name: cs.title,
              })),
            },
          },
        ]}
      />

      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Recent work
          </p>
          <h1 className="font-display text-ink mb-8 max-w-4xl">
            A few of the Kent businesses we’ve built things for.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
            The short version first: a handful of headline outcomes. Scroll past for the full
            write-ups.
          </p>
        </div>
      </section>

      {/* Highlight strips */}
      <CaseStudyHighlights />

      {/* Boring foundations / performance proof */}
      <PerformanceProof />

      {/* Full case study grid for deeper reading */}
      {caseStudies.length > 0 && (
        <section className="py-24 md:py-32 bg-paper-raised border-t border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-16 md:mb-20 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                The full write-ups
              </p>
              <h2 className="font-display text-ink">For when you want the detail.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <CaseStudyHighlight key={study.id || study.slug} caseStudy={study} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA
        titleOverride="Want yours on this page next?"
        paragraphOverride="Tell us what you do and what you need. We will come back with a plain answer, usually within a day."
        buttonOverride="Send a message"
      />
    </main>
  );
}
