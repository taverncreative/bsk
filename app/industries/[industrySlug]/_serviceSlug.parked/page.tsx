import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getIndustryBySlug, getServiceBySlug, getAllIndustries, getAllServices } from '@/lib/queries';
import Hero from '@/components/sections/Hero';
import Button from '@/components/ui/Button';

type Props = {
  params: Promise<{
    industrySlug: string;
    serviceSlug: string;
  }>;
};

// 1. Static Paths for Next.js build optimization
export async function generateStaticParams() {
  const [industries, services] = await Promise.all([
    getAllIndustries(),
    getAllServices(),
  ]);

  const paths: { industrySlug: string; serviceSlug: string }[] = [];
  
  industries.forEach((industry) => {
    services.forEach((service) => {
      paths.push({
        industrySlug: industry.slug,
        serviceSlug: service.slug,
      });
    });
  });

  return paths;
}

// 2. SEO Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industrySlug, serviceSlug } = await params;
  
  const [industry, service] = await Promise.all([
    getIndustryBySlug(industrySlug),
    getServiceBySlug(serviceSlug),
  ]);

  if (!industry || !service) {
    return { title: 'Not Found | Business Sorted' };
  }

  return {
    title: `${service.name} for ${industry.name} | Business Sorted`,
    description: `Professional ${service.name.toLowerCase()} services tailored specifically for ${industry.name.toLowerCase()} businesses looking to generate more enquiries and scale.`,
  };
}

// 3. Page Render
export default async function IndustryServicePage({ params }: Props) {
  const { industrySlug, serviceSlug } = await params;

  // Run database lookups concurrently to minimize block time
  const [industry, service] = await Promise.all([
    getIndustryBySlug(industrySlug),
    getServiceBySlug(serviceSlug),
  ]);

  if (!industry || !service) {
    notFound();
  }

  return (
    <>
      {/* SECTION 1: HERO */}
      <Hero
        title={`${service.name} for ${industry.name}`}
        subtitle={`Helping ${industry.name.toLowerCase()} businesses generate more enquiries using professional ${service.name.toLowerCase()}.`}
        primaryCTA={{
          text: 'Get a Free Quote',
          href: '/contact',
        }}
        secondaryCTA={{
          text: 'View All Services',
          href: `/industries/${industry.slug}`,
        }}
      />

      {/* SECTION 2: WHY THEY NEED IT */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why {industry.name} Businesses Need {service.name}
            </h2>
          </div>
          <div className="prose prose-lg text-slate-700 mx-auto text-center md:text-left">
            <p className="mb-6 leading-relaxed">
              In the competitive {industry.name.toLowerCase()} sector, relying entirely on word-of-mouth or outdated directory listings is no longer enough to maintain consistent growth. Your customers are actively searching online for reliable {industry.name.toLowerCase()} providers, and if your digital presence is weak, those high-value leads are going directly to your competitors.
            </p>
            <p className="leading-relaxed">
              {industry.pain_point || `Whether you're struggling with inconsistent lead volume or dealing with low-quality tyre-kickers, a professional ${service.name.toLowerCase()} strategy bridges the gap between your operational excellence and your target audience, allowing you to dominate your market share.`}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT HELPS (BULLETS) */}
      <section className="py-24 section-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Our {service.name} Helps {industry.name}
            </h2>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-8 md:p-12 shadow-sm">
            <ul className="space-y-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Generate more enquiries</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    We engineer {service.name.toLowerCase()} solutions that act as proactive digital sales engines, aggressively capturing high-intent {industry.name.toLowerCase()} leads specifically when they need your services most.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Build trust online</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    First impressions matter. We utilize powerful {service.name.toLowerCase()} frameworks to instantly establish your {industry.name.toLowerCase()} firm as the premier, trusted authority in your sector.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Rank higher on Google</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Visibility is everything. Our technical execution ensures your business surfaces at the exact moment localized commercial intent occurs in the search engines.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="section-dark py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
            Ready to Grow Your {industry.name} Business?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            Stop losing local leads to your competitors. Let's get started today.
          </p>
          <div className="flex justify-center">
            <Button href="/contact" className="text-lg px-10 py-4 shadow-lg">
              Get a Free Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
