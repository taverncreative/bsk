import IconWrapper from '@/components/ui/IconWrapper';
import { Laptop, Search, Zap } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

interface SolutionSectionProps {
  headlineOverride?: string;
  paragraphOverride?: string;
  serviceName?: string;
  serviceDescription?: string | null;
  townName?: string;
  solutions?: { title: string; description: string; icon: any }[];
}

export default function SolutionSection({ headlineOverride, paragraphOverride, serviceName, serviceDescription, townName, solutions }: SolutionSectionProps) {
  const defaultSolutions = [
    {
      title: 'Built to Convert',
      description: 'High-speed, premium designs structured specifically to turn visitors into paying customers.',
      icon: Laptop,
    },
    {
      title: 'Local SEO Dominance',
      description: `Rank at the top of Google Maps and local search results for keywords affecting ${townName || 'Kent'}.`,
      icon: Search,
    },
    {
      title: 'Automated Capture',
      description: 'Streamline your sales process with automated CRM integrations and instant enquiry responses.',
      icon: Zap,
    },
  ];

  const items = solutions && solutions.length > 0 ? solutions : defaultSolutions;

  const headline = headlineOverride || (serviceName
    ? `${serviceName} solutions designed for growth in ${townName || 'Kent'}.`
    : `Digital solutions designed for growth.`);

  const paragraph = paragraphOverride || serviceDescription || `We don't just build websites; we build complete digital ecosystems that attract, engage, and convert your ideal customers. A dedicated, structured digital strategy acts as a 24/7 sales representative for your business, capturing local commercial intent and automatically filtering it into qualified enquiries. Stop wasting money on generic directory listings and build your own highly-converting asset.`;

  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-black tracking-tight mb-6">
              {headline}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {paragraph}
            </p>
          </div>
        </Reveal>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-12 lg:gap-8`}>
          {items.map((solution, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="flex flex-col items-start group">
                <IconWrapper icon={solution.icon} className="mb-6" />
                <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-brand-gold transition-colors">
                  {solution.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {solution.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
