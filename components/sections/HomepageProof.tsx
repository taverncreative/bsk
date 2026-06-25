import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/queries/caseStudies';

interface HomepageProofProps {
  caseStudies: CaseStudy[];
}

const quotes = [
  {
    name: 'Sam Stewart',
    business: 'GEM Services · Kent',
    text: 'Best business decision I’ve made in years. Completely transformed my business within two months.',
  },
  {
    name: 'Ella Pearson',
    business: 'Local Business · Kent',
    text: 'They took my idea and turned it into a professional website that perfectly matched what I had in my head.',
  },
];

function parseCaseStudy(study: CaseStudy) {
  let payload: any = {};
  try {
    payload = typeof study.results === 'string' ? JSON.parse(study.results) : study.results || {};
  } catch {
    payload = {};
  }
  return {
    name: payload.businessName || study.title,
    industry: payload.industry || '',
    town: payload.town || '',
    headline: payload.resultsSummary || study.summary,
    slug: study.slug,
  };
}

export default function HomepageProof({ caseStudies }: HomepageProofProps) {
  const featured = (caseStudies || []).slice(0, 2).map(parseCaseStudy);

  return (
    <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
            Reviews
          </p>
          <h2 className="font-display text-ink">What people say.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-paper-border mb-px">
          <div className="bg-paper p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <p className="font-display text-2xl md:text-3xl text-ink leading-tight mb-3">
                5 stars, every review.
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">
                50+ Kent businesses, verified Google reviews.
              </p>
            </div>
          </div>

          {quotes.map((quote, i) => (
            <div key={i} className="bg-paper p-8 md:p-10 flex flex-col justify-between">
              <blockquote className="font-display text-xl md:text-2xl text-ink leading-snug mb-6">
                “{quote.text}”
              </blockquote>
              <div className="text-sm">
                <p className="text-ink font-medium">{quote.name}</p>
                <p className="text-ink-faint font-mono text-xs uppercase tracking-[0.15em] mt-1">{quote.business}</p>
              </div>
            </div>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
            {featured.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group block bg-paper p-8 md:p-10 h-full transition-colors hover:bg-paper-raised"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-4">
                  {[study.industry, study.town].filter(Boolean).join(' · ') || 'Case study'}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-3 leading-tight">
                  {study.name}
                </h3>
                <p className="text-ink-muted leading-relaxed mb-8">{study.headline}</p>
                <span className="inline-flex items-center text-sm text-ink-muted group-hover:text-brand-gold transition-colors">
                  Read the story
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
