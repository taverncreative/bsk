import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

interface NearbyAreasProps {
  townName: string;
  nearbyTowns: { name: string; slug: string }[];
}

export default function NearbyAreas({ townName, nearbyTowns }: NearbyAreasProps) {
  if (!nearbyTowns || nearbyTowns.length === 0) return null;

  return (
    <section className="py-24 bg-neutral-950 border-y border-neutral-900">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-white mb-6">Areas Near {townName} We Also Support</h2>
          <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            While our digital growth hub focuses heavily on {townName}, we actively support companies operating within the surrounding towns and villages across the region.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {nearbyTowns.map(t => (
              <Link 
                key={t.slug} 
                href={`/towns/${t.slug}`} 
                className="px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-300 hover:text-brand-gold hover:border-brand-gold/50 transition-all font-medium"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
