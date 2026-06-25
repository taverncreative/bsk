import Reveal from '@/components/ui/Reveal';
import type { Guide } from '@/types';
import ServiceCard from '@/components/cards/ServiceCard';
import { BookOpen } from 'lucide-react';

interface EducationalGuidesProps {
  townName?: string;
  guides: Guide[];
  headlineOverride?: string;
  /**
   * Stable identifier for the page rendering this section (e.g. 'homepage',
   * 'town-ashford', 'seo-ashford'). Used to deterministically pick a different
   * window of 3 guides per page so internal links don't all point to the same
   * three articles. Same key always returns the same guides (build-stable).
   */
  contextKey?: string;
}

/**
 * Deterministic 32-bit string hash. Same input → same output across SSR/client
 * and across builds, so guide selection is stable and won't cause hydration
 * mismatches.
 */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (Math.imul(hash, 31) + input.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

function pickGuides(guides: Guide[], contextKey: string | undefined, count = 3): Guide[] {
  if (guides.length <= count) return guides;
  const start = contextKey ? hashString(contextKey) % guides.length : 0;
  const result: Guide[] = [];
  for (let i = 0; i < count; i++) {
    result.push(guides[(start + i) % guides.length]);
  }
  return result;
}

export default function EducationalGuides({ townName, guides, headlineOverride, contextKey }: EducationalGuidesProps) {
  if (!guides || guides.length === 0) return null;

  const displayGuides = pickGuides(guides, contextKey, 3);
  
  const headline = headlineOverride || (townName ? `Insights & Advice for ${townName} Companies.` : `Insights & Advice to Help You Grow.`);

  return (
    <section className="py-28 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-4">
              {headline}
            </h2>
            <p className="text-lg text-ink-faint max-w-2xl">
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
