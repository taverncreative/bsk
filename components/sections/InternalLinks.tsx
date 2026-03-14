import Link from 'next/link';

interface BaseEntity {
  name?: string;
  title?: string;
  slug: string;
}

interface InternalLinksProps {
  service: BaseEntity;
  town?: BaseEntity;
  relatedServices?: BaseEntity[];
  nearbyTowns?: BaseEntity[];
  industries?: BaseEntity[];
  guides?: BaseEntity[];
}

export default function InternalLinks({
  service,
  town,
  relatedServices,
  nearbyTowns,
  industries,
  guides,
}: InternalLinksProps) {
  // If nothing is passed, null out strictly to secure the layout flow
  if (!relatedServices?.length && !nearbyTowns?.length && !industries?.length && !guides?.length) {
    return null;
  }

  return (
    <section className="py-28 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-16">
          
          {/* 1. Related Services */}
          {relatedServices && relatedServices.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Related Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${related.slug}${town ? `-${town.slug}` : ''}`}
                    className="p-5 bg-white border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-300 group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-brand transition-colors block">
                      {related.name || related.title} {town ? town.name : ''}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 2. Nearby Areas */}
          {nearbyTowns && nearbyTowns.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Nearby Areas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {nearbyTowns.map((nearby) => (
                  <Link
                    key={nearby.slug}
                    href={`/${service.slug}-${nearby.slug}`}
                    className="p-5 bg-white border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-300 group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-brand transition-colors block">
                      {service.name || service.title} {nearby.name || nearby.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 3. Industries We Work With */}
          {industries && industries.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Industries We Work With
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}/${service.slug}`}
                    className="p-5 bg-white border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-300 group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-brand transition-colors block">
                      {service.name || service.title} for {industry.name || industry.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 4. Learn More (Guides) */}
          {guides && guides.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Learn More
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="p-5 bg-white border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-300 group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-brand transition-colors block line-clamp-2">
                      {guide.title || guide.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
