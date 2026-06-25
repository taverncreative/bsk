import type { Metadata } from 'next';
import FreePreview from '@/components/sections/FreePreview';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: 'Free website preview · Business Sorted Kent',
  description:
    'Tell us about your business. We’ll build a working preview of your new website at a temporary URL within 2–3 working days. No card details, no obligation.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/free-preview',
  },
};

export default function FreePreviewPage() {
  return (
    <main className="min-h-screen bg-paper">
      <PageSchema
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Free preview', url: '/free-preview' },
        ]}
        extra={[
          {
            '@type': 'Offer',
            name: 'Free website preview',
            description:
              'A working preview of your new website at a temporary URL within 2–3 working days. No card details, no obligation.',
            price: '0',
            priceCurrency: 'GBP',
            seller: { '@id': 'https://businesssortedkent.co.uk/#organization' },
            url: 'https://businesssortedkent.co.uk/free-preview',
          },
        ]}
      />
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Free preview
          </p>
          <h1 className="font-display text-ink max-w-3xl">
            See your new website before you pay anything.
          </h1>
        </div>
      </section>

      <FreePreview variant="page" />
    </main>
  );
}
