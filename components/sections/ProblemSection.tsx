import PremiumCard from '@/components/ui/PremiumCard';
import Reveal from '@/components/ui/Reveal';
import { AlertCircle, Clock, TrendingDown } from 'lucide-react';

interface PainPoint {
  id?: string;
  pain_point: string;
  title?: string;
}

interface ProblemSectionProps {
  headlineOverride?: string;
  descriptionOverride?: string;
  townName?: string;
  industryName?: string;
  painPoints?: PainPoint[];
}

export default function ProblemSection({ headlineOverride, descriptionOverride, townName, industryName, painPoints }: ProblemSectionProps) {
  const defaults = [
    { icon: AlertCircle, title: 'Invisible on Google', desc: 'Potential customers are searching for your services, but incompetent SEO means they are finding your competitors instead.' },
    { icon: Clock, title: 'Manual Enquiry Handling', desc: 'Wasting hours manually replying to emails and managing leads when a simple automated system could do it instantly.' },
    { icon: TrendingDown, title: 'Poor Conversions', desc: 'A slow, outdated website that frustrates users and causes them to bounce before they even contact you.' }
  ];

  const items = (painPoints && painPoints.length > 0) 
    ? painPoints.slice(0, 4).map((p, i) => ({ 
        icon: [AlertCircle, Clock, TrendingDown, AlertCircle][i % 4], 
        title: p.title || `Challenge ${i + 1}`, 
        desc: p.pain_point 
      }))
    : defaults;

  const headline = headlineOverride || (industryName 
    ? `Many ${industryName.toLowerCase()} businesses struggle to get consistent leads online.`
    : townName 
      ? `Businesses in ${townName} often struggle to get consistent leads online.`
      : `Most businesses in Kent struggle to get consistent leads online.`);

  const paragraph = descriptionOverride || "Your digital presence might look good, but if it fails to generate operational enquiries, it's not doing its job. Stop relying on unpredictable word-of-mouth and start building a predictable local lead generation engine. Without a high-performance digital strategy, your ideal customers are actively searching for your services and landing on your competitors' sites instead.";

  return (
    <section className="py-28 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold text-black tracking-tight mb-6">
                {headline}
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {paragraph}
              </p>
            </div>
          </Reveal>
          
          <div className="space-y-6">
            {items.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <PremiumCard icon={item.icon} title={item.title}>
                  {item.desc}
                </PremiumCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
