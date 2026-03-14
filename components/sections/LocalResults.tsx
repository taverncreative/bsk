import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CaseStudyHighlight from '@/components/cards/CaseStudyHighlight';
import { getAllCaseStudies } from '@/lib/queries/caseStudies';

export default async function LocalResults() {
  const allStudies = await getAllCaseStudies();
  
  if (!allStudies || allStudies.length === 0) return null;

  // Shuffle and pick 3, or just take first 3 for simplicity (since we order by newest)
  // In a robust implementation, you might want to randomly sample them 
  // Let's just slice first 3 if it's the simplest approach, or randomly sort:
  const displayStudies = [...allStudies].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <section className="py-28 bg-black border-t border-neutral-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Real Results for Kent Businesses
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed">
                Discover how we've helped local companies generate more enquiries and scale operations online.
              </p>
            </div>
            
            <div className="shrink-0">
              <Button href="/case-studies" variant="secondary">
                View All Case Studies
              </Button>
            </div>
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
