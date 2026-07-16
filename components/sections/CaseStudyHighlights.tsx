import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrollFadeIn from '@/components/ui/ScrollFadeIn';

interface Highlight {
  client: string;
  industry: string;
  bigStat?: string;
  bigStatNote?: string;
  bigStatTone?: 'gold' | 'ink';
  headline: string;
  body?: string;
  href: string;
  span: 'lg' | 'sm';
  tone: 'paper' | 'raised' | 'ink';
}

const highlights: Highlight[] = [
  {
    client: 'Kent iPhone Repair',
    industry: 'Mobile repair · Kent',
    bigStat: '597k',
    bigStatNote: 'impressions in 6 months',
    bigStatTone: 'gold',
    headline: 'Average position 7, and 5,300+ clicks in six months.',
    body:
      'New website, local SEO and Google Business Profile work. Google Search Console over six months: an average position of 7, around 597k impressions and more than 5,300 clicks from across Kent.',
    href: '/case-studies/kent-iphone-repair',
    span: 'lg',
    tone: 'paper',
  },
  {
    client: 'Excel Inspection Solutions',
    industry: 'Statutory inspections · London & SE',
    bigStat: '88k+',
    bigStatNote: 'impressions in 6 months',
    bigStatTone: 'ink',
    headline: 'A specialist niche, found in search.',
    body:
      'Technical SEO foundations, structured content and Google Business Profile optimisation took a specialist inspection firm from a standing start to more than 88k search impressions in six months, with strong and sustained growth.',
    href: '/case-studies/excel-inspection-solutions',
    span: 'sm',
    tone: 'ink',
  },
  {
    client: 'GEM Services',
    industry: 'Pest control · Kent',
    headline: 'One place to run the whole job.',
    body:
      'A custom CRM built for GEM’s pest-control work: bookings and scheduling, recurring contract visits, agreements signed on-site, and service records with photos and signatures, with PDF reports emailed straight to customers. Works offline in the field and syncs when back in signal.',
    href: '/case-studies/gem-services',
    span: 'sm',
    tone: 'raised',
  },
  {
    client: 'Servoro',
    industry: 'Facilities management · London',
    headline: 'A facilities management site, built from scratch.',
    body:
      'A clear, properly-structured website for a facilities management firm with no previous web presence. Built from the ground up to handle the enquiries the business actually wants to win.',
    href: '/case-studies/servoro',
    span: 'lg',
    tone: 'paper',
  },
  {
    client: 'Therapy Hair Body & Nails',
    industry: 'Salon · Kent',
    headline: 'Replaced a 2006 build with a mobile-first booking site.',
    body:
      'A site that hadn’t been touched since 2006 replaced with a clean, fast, booking-focused build. Mobile visitors no longer bounce before the homepage loads.',
    href: '/case-studies/therapy-hair-body-nails',
    span: 'sm',
    tone: 'raised',
  },
  {
    client: 'TavernCreative',
    industry: 'Custom design tool · Kent',
    headline: 'A self-hosted design tool that replaced Shopify.',
    body:
      'A custom-built automated design tool, self-hosted and built end-to-end to replace Shopify. Customers configure their own orders. The order workflow runs almost autonomously after that.',
    href: '/case-studies/taverncreative',
    span: 'sm',
    tone: 'paper',
  },
];

function HighlightCard({ h, index }: { h: Highlight; index: number }) {
  const toneClasses =
    h.tone === 'ink'
      ? 'bg-ink text-paper hover:bg-[#152740]'
      : h.tone === 'raised'
        ? 'bg-paper-raised text-ink hover:bg-paper'
        : 'bg-paper text-ink hover:bg-paper-raised';

  const eyebrowClasses =
    h.tone === 'ink' ? 'text-paper/50' : 'text-ink-faint';

  const headlineClasses = h.tone === 'ink' ? 'text-paper' : 'text-ink';
  const bodyClasses = h.tone === 'ink' ? 'text-paper/70' : 'text-ink-muted';
  const arrowClasses =
    h.tone === 'ink'
      ? 'text-paper/60 group-hover:text-brand-gold'
      : 'text-ink-faint group-hover:text-brand-gold';
  const statColor =
    h.bigStatTone === 'ink'
      ? h.tone === 'ink'
        ? 'text-paper'
        : 'text-ink'
      : 'text-brand-gold';

  return (
    <ScrollFadeIn
      delay={index * 90}
      className={h.span === 'lg' ? 'md:col-span-7' : 'md:col-span-5'}
    >
      <Link
        href={h.href}
        className={`group block ${toneClasses} h-full p-8 md:p-10 lg:p-12 transition-colors`}
      >
        <div className="flex items-start justify-between gap-4 mb-8">
          <p className={`font-mono text-xs uppercase tracking-[0.18em] ${eyebrowClasses}`}>
            {h.industry}
          </p>
          <ArrowUpRight
            className={`w-5 h-5 transition-all ${arrowClasses} group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
          />
        </div>

        {h.bigStat && (
          <p className={`font-mono ${statColor} mb-2 leading-none`} style={{ fontSize: 'clamp(56px, 8vw, 112px)' }}>
            {h.bigStat}
          </p>
        )}
        {h.bigStatNote && (
          <p className={`font-mono text-xs uppercase tracking-[0.18em] ${eyebrowClasses} mb-8`}>
            {h.bigStatNote}
          </p>
        )}

        <h3
          className={`font-display ${headlineClasses} leading-tight mb-4`}
          style={{ fontSize: h.bigStat ? 'clamp(22px, 2.4vw, 30px)' : 'clamp(28px, 3.2vw, 42px)' }}
        >
          {h.headline}
        </h3>

        {h.body && (
          <p className={`${bodyClasses} leading-relaxed max-w-xl`}>{h.body}</p>
        )}

        <p className={`font-display ${h.tone === 'ink' ? 'text-paper' : 'text-ink'} font-medium mt-8 text-sm`}>
          {h.client}
        </p>
      </Link>
    </ScrollFadeIn>
  );
}

export default function CaseStudyHighlights() {
  return (
    <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
            Recent highlights
          </p>
          <h2 className="font-display text-ink">A few of the headline outcomes.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-paper-border">
          {highlights.map((h, i) => (
            <HighlightCard key={h.href} h={h} index={i} />
          ))}
        </div>

        <ScrollFadeIn delay={500}>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mt-12 text-center">
            ↓  Read the full stories below
          </p>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
