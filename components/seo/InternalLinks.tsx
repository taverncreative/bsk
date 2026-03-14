import {
  generateNearbyTownLinks,
  generateServiceLinks,
  generateIndustryLinks,
  generateGuideLinks,
} from '@/lib/internal-links';
import PremiumCard from '@/components/ui/PremiumCard';

interface InternalLinksProps {
  serviceSlug: string;
  townSlug?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export default async function InternalLinks({
  serviceSlug,
  townSlug,
  latitude,
  longitude,
}: InternalLinksProps) {
  const [nearbyLinks, serviceLinks, industryLinks, guideLinks] = await Promise.all([
    townSlug && latitude && longitude ? generateNearbyTownLinks(serviceSlug, townSlug, latitude, longitude) : Promise.resolve([]),
    townSlug ? generateServiceLinks(serviceSlug, townSlug) : Promise.resolve([]),
    townSlug ? generateIndustryLinks(serviceSlug, townSlug) : Promise.resolve([]),
    generateGuideLinks(serviceSlug),
  ]);

  if (!nearbyLinks.length && !serviceLinks.length && !industryLinks.length && !guideLinks.length) {
    return null;
  }

  return (
    <section className="py-24 bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-black tracking-tight mb-4">
            Explore More Resources
          </h2>
          <p className="text-lg text-neutral-600">
            Continue reading about our services, local coverage, and industry expertise.
          </p>
        </div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {nearbyLinks.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">Nearby Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {nearbyLinks.map((link, idx) => (
                  <PremiumCard
                    key={idx}
                    title={link.title}
                    description={link.description}
                    href={link.href}
                    ctaText="View Area"
                  />
                ))}
              </div>
            </div>
          )}

          {serviceLinks.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">Other Services in the Area</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceLinks.map((link, idx) => (
                  <PremiumCard
                    key={idx}
                    title={link.title}
                    description={link.description}
                    href={link.href}
                    ctaText="Learn More"
                  />
                ))}
              </div>
            </div>
          )}

          {industryLinks.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">Industries We Work With</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {industryLinks.map((link, idx) => (
                  <PremiumCard
                    key={idx}
                    title={link.title}
                    description={link.description}
                    href={link.href}
                    ctaText="View Industry"
                  />
                ))}
              </div>
            </div>
          )}

          {guideLinks.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">Related Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guideLinks.map((link, idx) => (
                  <PremiumCard
                    key={idx}
                    title={link.title}
                    description={link.description}
                    href={link.href}
                    ctaText="Read Guide"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
