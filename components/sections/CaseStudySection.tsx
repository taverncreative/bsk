import Reveal from '@/components/ui/Reveal';
import type { CaseStudy } from '@/lib/queries/caseStudies';
import CaseStudyHighlight from '@/components/cards/CaseStudyHighlight';

interface CaseStudySectionProps {
  townName?: string;
  serviceName?: string;
  caseStudies: CaseStudy[];
}

export default function CaseStudySection({ townName, serviceName, caseStudies }: CaseStudySectionProps) {
  if (!caseStudies || caseStudies.length === 0) return null;

  const displayStudies = caseStudies.slice(0, 3);
  const headline = townName 
    ? `Proven Results Near ${townName}` 
    : serviceName 
      ? `Proven Results with ${serviceName}`
      : `Real Results for Kent Businesses`;

  return (
    <section className="py-28 bg-black border-t border-neutral-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              {headline}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              We design campaigns based on data and transparency. Explore our recent success stories.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayStudies.map((study, idx) => (
            <Reveal key={study.id || study.slug} delay={idx * 0.1}>
              <CaseStudyHighlight caseStudy={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
