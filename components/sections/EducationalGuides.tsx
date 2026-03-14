import Reveal from '@/components/ui/Reveal';
import type { Guide } from '@/types';
import ServiceCard from '@/components/cards/ServiceCard';
import { BookOpen } from 'lucide-react';

interface EducationalGuidesProps {
  townName?: string;
  guides: Guide[];
  headlineOverride?: string;
}

export default function EducationalGuides({ townName, guides, headlineOverride }: EducationalGuidesProps) {
  if (!guides || guides.length === 0) return null;

  const displayGuides = guides.slice(0, 3);
  
  const headline = headlineOverride || (townName ? `Insights & Advice for ${townName} Companies.` : `Insights & Advice to Help You Grow.`);

  return (
    <section className="py-28 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-4">
              {headline}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Learn the exact strategies and tactical advantages we use to scale local operations through modern digital infrastructure.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayGuides.map((guide, idx) => (
            <Reveal key={guide.id} delay={idx * 0.1}>
              <ServiceCard
                title={guide.title}
                description={guide.excerpt || 'Read this in-depth strategic breakdown.'}
                href={`/guides/${guide.slug}`}
                icon={BookOpen}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
