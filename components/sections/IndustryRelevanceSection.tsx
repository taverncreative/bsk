import Reveal from '@/components/ui/Reveal';
import type { Industry } from '@/types';
import ServiceCard from '@/components/cards/ServiceCard';
import { Building2 } from 'lucide-react';

interface IndustryRelevanceSectionProps {
  serviceName: string;
  serviceSlug: string;
  townName: string;
  townSlug: string;
  industries: Industry[];
}

export default function IndustryRelevanceSection({
  serviceName,
  serviceSlug,
  townName,
  townSlug,
  industries
}: IndustryRelevanceSectionProps) {
  if (!industries || industries.length === 0) return null;

  // Let's take the first 3 or 4 industries to showcase dynamically.
  const displayIndustries = industries.slice(0, 3);

  return (
    <section className="py-28 bg-neutral-50 border-t border-neutral-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-4">
              {serviceName} Across Sectors in {townName}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Our {serviceName.toLowerCase()} solutions are purposefully designed for companies operating in {townName} and the wider Kent region, adapting strategically to specific industry demands.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayIndustries.map((ind, idx) => (
            <Reveal key={ind.id} delay={idx * 0.1}>
              <ServiceCard
                title={`${serviceName} for ${ind.name}`}
                description={ind.description || `Specialized ${serviceName.toLowerCase()} strategies driving authoritative growth for ${ind.name.toLowerCase()} operating locally in ${townName}.`}
                href={`/industries/${ind.slug}/${serviceSlug}`}
                icon={Building2}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
