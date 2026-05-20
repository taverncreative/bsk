import type { Metadata } from 'next';
import SecondaryContactForm from '@/components/ui/SecondaryContactForm';
import { Star } from 'lucide-react';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: 'Contact | Business Sorted Kent',
  description:
    'Get in touch about web design, SEO and automations in Kent. We aim to reply within a day.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-paper">
      <PageSchema
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
        extra={[
          {
            '@type': 'ContactPage',
            name: 'Contact Business Sorted Kent',
            url: 'https://businesssortedkent.co.uk/contact',
            mainEntity: { '@id': 'https://businesssortedkent.co.uk/#organization' },
          },
        ]}
      />
      <section className="pt-36 md:pt-44 pb-16 md:pb-20 bg-paper border-b border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            Contact
          </p>
          <h1 className="font-display text-ink mb-8 max-w-3xl">
            Tell us what you need.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl">
            A new website, better Google rankings, an inbox that doesn’t drown you on a busy day. Whatever it is, send a quick note and we’ll reply with a plain answer. Usually within a day.
          </p>
        </div>
      </section>

      <section id="message" className="py-20 md:py-24 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                Send a message
              </p>
              <h2 className="font-display text-ink mb-6">A few quick questions.</h2>
              <p className="text-ink-muted mb-8 max-w-md">
                The more you can tell us up front, the more useful our reply.
              </p>
              <SecondaryContactForm />
            </div>

            <div className="flex flex-col gap-10">
              <div className="border-l-4 border-brand-gold pl-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="font-display text-xl text-ink mb-2 leading-snug">
                  Rated 5 stars by Kent businesses.
                </p>
                <p className="text-ink-muted text-sm">
                  Based on verified Google reviews.
                </p>
                <blockquote className="font-display text-lg text-ink italic mt-6 leading-snug">
                  “Business Sorted turned an outdated site into something that actually generates enquiries.”
                </blockquote>
              </div>

              <div className="border-t border-paper-border pt-8">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mb-3">
                  Email
                </p>
                <a
                  href="mailto:hello@businesssortedkent.co.uk"
                  className="text-ink font-medium hover:text-brand-gold transition-colors"
                >
                  hello@businesssortedkent.co.uk
                </a>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mb-3 mt-8">
                  Location
                </p>
                <p className="text-ink">Based in Kent. Working with businesses across Kent, London and anywhere else useful.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
