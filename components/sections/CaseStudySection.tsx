import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/queries/caseStudies';
import CaseStudyHighlight from '@/components/cards/CaseStudyHighlight';

interface CaseStudySectionProps {
  townName?: string;
  serviceName?: string;
  caseStudies: CaseStudy[];
  variant?: 'grid' | 'spotlight';
}

function parseStudy(study: CaseStudy) {
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
    services: payload.services_used || '',
    headline: payload.resultsSummary || study.summary,
    slug: study.slug,
  };
}

export default function CaseStudySection({
  townName,
  serviceName,
  caseStudies,
  variant = 'grid',
}: CaseStudySectionProps) {
  if (!caseStudies || caseStudies.length === 0) return null;

  if (variant === 'spotlight') {
    const featured = parseStudy(caseStudies[0]);

    return (
      <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-14 md:mb-20 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              A recent build
            </p>
            <h2 className="font-display text-ink">A closer look.</h2>
          </div>

          <article className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16 items-start border-l-4 border-brand-gold pl-6 md:pl-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-4">
                {[featured.industry, featured.town].filter(Boolean).join(' · ') || 'Case study'}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-ink mb-4 leading-tight">
                {featured.name}
              </h3>
              {featured.services && (
                <p className="text-sm text-ink-muted">{featured.services}</p>
              )}
            </div>

            <div className="max-w-xl">
              <p className="font-display text-xl md:text-2xl text-ink leading-relaxed mb-8">
                {featured.headline}
              </p>
              <Link
                href={`/case-studies/${featured.slug}`}
                className="inline-flex items-center text-sm text-ink-muted hover:text-brand-gold transition-colors group"
              >
                Read the full story
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    );
  }

  const displayStudies = caseStudies.slice(0, 3);
  const headline = townName
    ? `Recent work near ${townName}`
    : serviceName
      ? `Recent work · ${serviceName}`
      : 'Recent work for Kent businesses';

  return (
    <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-14 md:mb-20 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
            Case studies
          </p>
          <h2 className="font-display text-ink">{headline}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayStudies.map((study) => (
            <CaseStudyHighlight key={study.id || study.slug} caseStudy={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
