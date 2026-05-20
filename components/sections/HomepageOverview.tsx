import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

/**
 * Long-form prose overview for the homepage. Provides Google with substantial
 * paragraph copy describing what BSK does, who it serves, and where it operates
 * — addressing the audit finding that the homepage was overly UI-component
 * heavy with limited body text for topical-authority signals.
 */
export default function HomepageOverview() {
  return (
    <section className="bg-paper border-t border-paper-border py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-10 text-center">
            A Digital Marketing Agency Built for Kent Businesses
          </h2>
          <div className="prose prose-invert prose-lg max-w-none text-ink-muted leading-relaxed space-y-6">
            <p>
              Business Sorted Kent is a founder-led digital marketing agency built specifically to help tradespeople, sole traders, and service businesses across Kent grow their revenue online. We design and engineer high-performance{' '}
              <Link href="/web-design" className="text-brand-gold hover:underline">websites</Link>, dominate local Google search results through targeted{' '}
              <Link href="/seo" className="text-brand-gold hover:underline">SEO</Link>, and install{' '}
              <Link href="/lead-capture" className="text-brand-gold hover:underline">lead capture</Link> and{' '}
              <Link href="/business-automation" className="text-brand-gold hover:underline">business automation</Link>{' '}
              systems that turn visitors into actual customers. Our work is rooted in one principle: digital marketing should be a predictable engine for growth, not a confusing monthly expense.
            </p>
            <p>
              We work most closely with electricians, plumbers, builders, roofers, landscapers, cleaners, and other hands-on professionals operating across specific Kent service areas. The challenges these businesses face are consistent and solvable. The first is visibility — a skilled trades professional losing jobs to a less-qualified competitor simply because the competitor's website ranks higher on Google. The second is administrative pressure — missed enquiries piling up while you're on a job site, costing real money every week. We design systems that solve both: you appear at the top of local searches when customers are ready to buy, and every enquiry is captured, acknowledged, and routed to you instantly.
            </p>
            <p>
              Because we are founder-led and structured deliberately small, our clients work directly with the team building their systems — there are no junior account managers, no outsourced engineering, and no agency bloat. That structure lets us move fast, communicate without jargon, and hold every recommendation against a single test: will this generate measurable return for your business?
            </p>
            <p>
              We support businesses across Kent's major commercial hubs and surrounding districts — including{' '}
              <Link href="/towns/ashford" className="text-brand-gold hover:underline">Ashford</Link>,{' '}
              <Link href="/towns/maidstone" className="text-brand-gold hover:underline">Maidstone</Link>,{' '}
              <Link href="/towns/canterbury" className="text-brand-gold hover:underline">Canterbury</Link>,{' '}
              <Link href="/towns/tunbridge-wells" className="text-brand-gold hover:underline">Tunbridge Wells</Link>,{' '}
              <Link href="/towns/sevenoaks" className="text-brand-gold hover:underline">Sevenoaks</Link>, Folkestone, Tonbridge,{' '}
              <Link href="/towns/dartford" className="text-brand-gold hover:underline">Dartford</Link>, and Gravesend — engineering localised growth strategies tuned to the specific search behaviours and competitive landscapes of each town.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
