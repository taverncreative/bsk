import type { Metadata } from 'next';
import Link from 'next/link';
import PageSchema from '@/components/seo/PageSchema';

export const metadata: Metadata = {
  title: 'About | Business Sorted Kent',
  description:
    'Founder-led digital agency for everyday Kent businesses. Websites, SEO and automations, built properly with rigorous checks for speed, security and SEO.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper">
      <PageSchema
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
        extra={[
          {
            '@type': 'AboutPage',
            name: 'About Business Sorted Kent',
            url: 'https://businesssortedkent.co.uk/about',
            mainEntity: { '@id': 'https://businesssortedkent.co.uk/#organization' },
          },
        ]}
      />
      {/* Hero */}
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            About
          </p>
          <h1 className="font-display text-ink mb-8 max-w-4xl">
            We build websites and digital admin for everyday Kent businesses.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
            Founder-led. Plain English. £280 for a classic small business website. £45/hour for SEO.
            Automations and systems priced on the brief. AI tooling made the work faster, so we
            charge less for it.
          </p>
        </div>
      </section>

      {/* Who hires us */}
      <section className="py-24 md:py-32 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Who hires us
            </p>
            <h2 className="font-display text-ink mb-4">Everyday businesses.</h2>
          </div>
          <div className="text-lg text-ink-muted leading-relaxed space-y-5 max-w-3xl">
            <p>
              Salons, pest control firms, iPhone repair shops, lift inspectors, electricians,
              plumbers, roofers, cleaners, landscapers, accountants, holiday-let owners. People who
              run real businesses and would rather be doing the work than wrestling with their
              website.
            </p>
            <p>
              Most of our clients hire us so they can focus on the work they’re actually good at.
              If you already know SEO and could build your own site in Webflow, we’re probably not
              for you.
            </p>
          </div>
        </div>
      </section>

      {/* Why it costs what it costs */}
      <section className="py-24 md:py-32 bg-paper-raised border-y border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Why our prices are what they are
            </p>
            <h2 className="font-display text-ink mb-4">
              AI changed the maths. We adjusted the prices.
            </h2>
          </div>
          <div className="text-lg text-ink-muted leading-relaxed space-y-5 max-w-3xl">
            <p>
              A small business website used to cost £3,000 because building one took two designers,
              two developers and three weeks. AI tools changed that. The hours came down.
            </p>
            <p>
              The work itself didn’t change. Same checks for speed, security and SEO. Same
              attention to design, copy and structure. Same hand-checking of every page before it
              goes live. What changed is how long it takes to do that work, and we passed that
              saving on rather than absorbing it as margin.
            </p>
            <p>
              SEO is billed by the hour because that’s the honest unit. One hour of real work is
              one hour. No abstract monthly retainers, no “SEO package” with vague deliverables.
              You see what got done and what it ranked for.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-24 md:py-32 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              How we work
            </p>
            <h2 className="font-display text-ink">A few things we do differently.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border max-w-4xl">
            <div className="bg-paper p-8">
              <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                Free preview before you pay
              </h3>
              <p className="text-ink-muted leading-relaxed">
                For websites, we’ll build a working preview at a temporary URL before you commit to
                anything. If you like it, £280 finishes and launches it. If not, no charge.
              </p>
            </div>
            <div className="bg-paper p-8">
              <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                No rolling contracts
              </h3>
              <p className="text-ink-muted leading-relaxed">
                Hosting is month-to-month. SEO is hour-to-hour. Walk away whenever it stops being
                useful. We’d rather earn the next month than lock you into one.
              </p>
            </div>
            <div className="bg-paper p-8">
              <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                You talk to the person doing the work
              </h3>
              <p className="text-ink-muted leading-relaxed">
                Founder-led. No account managers, no juniors, no outsourcing to a different
                timezone. If you email, the person who replies is the person building your thing.
              </p>
            </div>
            <div className="bg-paper p-8">
              <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                Honest about AI
              </h3>
              <p className="text-ink-muted leading-relaxed">
                AI is the reason this work is cheaper now. We say so. The design decisions, the
                editing and the final checks are still done by people who know what good looks
                like.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 md:py-32 bg-paper-raised border-y border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-12 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              Founder
            </p>
            <h2 className="font-display text-ink mb-4">Run by John Lally.</h2>
          </div>
          <div className="text-lg text-ink-muted leading-relaxed space-y-5 max-w-3xl">
            <p>
              Business Sorted Kent is founder-led. That means when you ring, message, or email,
              you’re talking to the person actually building your site or doing your SEO. Not a
              sales rep, not a project manager, not someone reading a script.
            </p>
            <p>
              Background in graphic design first, then websites, then SEO, then automations.
              That’s why the sites we build look like they were designed instead of generated, why
              the SEO work is hands-on, and why the automations are built rather than bolted on.
            </p>
            <p>
              When a job needs niche expertise we bring in a trusted specialist. Most of the time
              it doesn’t.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
            Get in touch
          </p>
          <h2 className="font-display text-ink mb-6">Got something in mind?</h2>
          <p className="text-lg text-ink-muted leading-relaxed mb-10 max-w-xl">
            Tell us what you do and what you need. We’ll come back with a plain answer, usually
            within a day.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-brand-gold hover:text-ink transition-colors"
            >
              Send a message
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
