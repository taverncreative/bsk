import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getServiceBySlug,
  getTownBySlug,
  getAllServices,
  getAllTowns,
  getLocalIntro,
  getNearbyTowns,
  getReviewsByTown,
  getAllCaseStudies,
  getAllGuides,
} from '@/lib/queries';
import { getLocalContent } from '@/lib/queries/local-content';
import type { Service, Town, Guide } from '@/types';
import ServicePage from '@/components/templates/ServicePage';
import ServiceTownPage from '@/components/templates/ServiceTownPage';
import MicroLocationPage from '@/components/templates/MicroLocationPage';

type Props = {
  params: Promise<{
    serviceTown: string;
  }>;
};

// 1. Static Params Generation for BOTH Flat SEO endpoints
export async function generateStaticParams() {
  const [services, towns] = await Promise.all([
    getAllServices(),
    getAllTowns(),
  ]);

  const uniquePaths = new Set<string>();

  // Generate Service Hubs (/web-design)
  services.forEach((service) => {
    if (service.slug) {
      uniquePaths.add(service.slug);
    }
  });

  const CORE_SERVICES = ['web-design', 'seo', 'lead-capture', 'business-automation', 'branding', 'social-media-setup', 'digital-marketing', 'workwear-print', 'ai-chatbots', 'ai-content', 'ai-automation'];

  // Generate Service x Town Pages (/web-design-ashford) — "near" pages removed (thin content risk)
  services.forEach((service) => {
    if (service.slug && CORE_SERVICES.includes(service.slug)) {
      towns.forEach((town) => {
        if (town.slug) {
          uniquePaths.add(`${service.slug}-${town.slug}`);
        }
      });
    }
  });

  return Array.from(uniquePaths).map((slug) => ({
    serviceTown: slug,
  }));
}

// Helper to determine route type and entity data safely
async function parseServiceOrTown(slug: string) {
  // If no dashes exist, we know immediately it must be a root Service
  if (!slug.includes('-')) {
    const service = await getServiceBySlug(slug);
    if (service) {
      return { type: 'serviceHub', service };
    }
  }

  // Check if the entire string perfectly matches a single Service.
  // This securely supports multi-word services like 'business-automation'
  const potentialServiceHub = await getServiceBySlug(slug);
  if (potentialServiceHub) {
    return { type: 'serviceHub', service: potentialServiceHub };
  }

  // If it's not a root service, it must be Service x Town
  const towns = await getAllTowns();
  
  // Find town that matches the end of the slug
  let matchedTown = null;
  let matchedService = null;
  let isMicroLocation = false;
  
  for (const t of towns) {
    if (t.slug && slug.endsWith(`-${t.slug}`)) {
      if (slug.includes(`-near-${t.slug}`)) {
         const possibleServiceSlug = slug.replace(`-near-${t.slug}`, '');
         const s = await getServiceBySlug(possibleServiceSlug);
         if (s) {
           matchedTown = t;
           matchedService = s;
           isMicroLocation = true;
           break;
         }
      } else {
         const possibleServiceSlug = slug.replace(`-${t.slug}`, '');
         const s = await getServiceBySlug(possibleServiceSlug);
         if (s) {
           matchedTown = t;
           matchedService = s;
           break;
         }
      }
    }
  }

  const CORE_SERVICES = ['web-design', 'seo', 'lead-capture', 'business-automation', 'branding', 'social-media-setup', 'digital-marketing', 'workwear-print', 'ai-chatbots', 'ai-content', 'ai-automation'];

  if (matchedService && matchedTown) {
    if (!CORE_SERVICES.includes(matchedService.slug)) {
      return null; // Block non-core programmatic execution
    }
    return { type: isMicroLocation ? 'microLocation' : 'serviceTown', service: matchedService, town: matchedTown };
  }

  return null;
}

// 2. Metadata Generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceTown } = await params;
  const route = await parseServiceOrTown(serviceTown);

  if (!route) {
    return { title: 'Not Found | Business Sorted Kent' };
  }

  if (route.type === 'serviceHub') {
    const title = `${route.service?.name} Services in Kent | Business Sorted Kent`;
    const description = `Professional ${route.service?.name?.toLowerCase()} services for businesses across Kent.`;
    const url = `https://businesssortedkent.co.uk/${route.service?.slug}`;
    const imageUrl = `https://businesssortedkent.co.uk/api/og?service=${route.service?.slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
    };
  }

  if (route.type === 'serviceTown') {
    const title = `${route.service?.name} ${route.town?.name} | Business Sorted Kent`;
    const description = `Professional ${route.service?.name?.toLowerCase()} services for businesses in ${route.town?.name}, Kent.`;
    const url = `https://businesssortedkent.co.uk/${route.service?.slug}-${route.town?.slug}`;
    const imageUrl = `https://businesssortedkent.co.uk/api/og?service=${route.service?.slug}&town=${route.town?.slug}`;

    // THIN CONTENT GUARDRAIL: Check for unique localized content
    const [localContent, reviews, allCaseStudies] = await Promise.all([
      route.service?.slug && route.town?.slug ? getLocalContent(route.service.slug, route.town.slug) : Promise.resolve(null),
      route.town?.id ? getReviewsByTown(route.town.id) : Promise.resolve([]),
      getAllCaseStudies()
    ]);

    const localCaseStudies = allCaseStudies.filter(c => c.town === route.town?.name);

    // If we have literally 0 unique content for this exact map, instruct crawlers not to index it natively
    const hasUniqueContent = !!(
      localContent?.intro_paragraph ||
      reviews.length > 0 ||
      localCaseStudies.length > 0
    );

    const baseMetadata: Metadata = {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
    };

    if (!hasUniqueContent) {
      baseMetadata.robots = {
        index: false,
        follow: true, // Allow crawlers to still discover standard internal links
      };
    }

    return baseMetadata;
  }

  // "Near" pages removed — return noindex metadata as safety net
  if (route.type === 'microLocation') {
    return {
      title: 'Not Found | Business Sorted Kent',
      robots: { index: false, follow: false },
    };
  }

  return { title: 'Business Sorted Kent' };
}

// 3. Page Component
export default async function ProgrammaticPage({ params }: Props) {
  const { serviceTown } = await params;
  const route = await parseServiceOrTown(serviceTown);

  if (!route) {
    notFound();
  }

  // ==========================================
  // TEMPLATE: SERVICE HUB
  // ==========================================
  if (route.type === 'serviceHub' && route.service) {
    const service = route.service;
    const [allTowns, allGuides] = await Promise.all([
      getAllTowns(),
      getAllGuides()
    ]);

    return (
      <>
        {/* JSON-LD Schema (Rendered outside the template to avoid layout breaking) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify([
               {
                 "@context": "https://schema.org",
                 "@type": "BreadcrumbList",
                 "itemListElement": [
                   {
                     "@type": "ListItem",
                     "position": 1,
                     "name": "Home",
                     "item": "https://businesssortedkent.co.uk"
                   },
                   {
                     "@type": "ListItem",
                     "position": 2,
                     "name": service.name,
                     "item": `https://businesssortedkent.co.uk/${service.slug}`
                   }
                 ]
               },
               {
                 "@context": "https://schema.org",
                 "@type": "Service",
                 "name": service.name,
                 "description": service.description || `${service.name} for businesses across Kent and beyond.`,
                 "provider": {
                   "@type": "Organization",
                   "@id": "https://businesssortedkent.co.uk/#organization",
                   "name": "Business Sorted Kent"
                 },
                 "areaServed": [
                   { "@type": "AdministrativeArea", "name": "Kent" },
                   { "@type": "AdministrativeArea", "name": "Greater London" },
                   { "@type": "Country", "name": "United Kingdom" }
                 ],
                 ...(service.slug === 'web-design' && {
                   "offers": {
                     "@type": "Offer",
                     "availability": "https://schema.org/InStock",
                     "category": "Website Design"
                   }
                 }),
                 ...(service.slug === 'seo' && {
                   "offers": {
                     "@type": "Offer",
                     "availability": "https://schema.org/InStock",
                     "category": "Search Engine Optimisation"
                   }
                 })
               }
             ])
          }}
        />

        {/* Modular ServiceTemplate Rendering */}
        <ServicePage 
          serviceName={service.name}
          serviceSlug={service.slug}
          description={service.description || `Professional ${service.name} solutions designed to help your business scale.`}
          towns={allTowns.map((t: Town) => ({ name: t.name, slug: t.slug }))}
          guides={allGuides}
        />
      </>
    );
  }

  // ==========================================
  // TEMPLATE: SERVICE X TOWN
  // ==========================================
  if (route.type === 'serviceTown' && route.service && route.town) {
    const { service, town } = route;
    
    // Concurrently aggressively fetch massive data mappings specifically for this localized render
    const [
      localIntro,
      localContent,
      allServices,
      industries,
      allCaseStudies,
      guides,
      painPoints
    ] = await Promise.all([
      getLocalIntro(service.id, town.id),
      getLocalContent(service.slug, town.slug),
      getAllServices(),
      import('@/lib/queries').then(m => m.getAllIndustries()),
      import('@/lib/queries').then(m => m.getAllCaseStudies()),
      import('@/lib/queries').then(m => m.getAllGuides()),
      import('@/lib/queries').then(m => m.getPainPointsByService(service.id)),
    ]);
    
    const otherServices = allServices.filter((s) => s.id !== service.id);
    
    let nearbyTowns: Town[] = [];
    if (town.latitude !== null && town.longitude !== null) {
      nearbyTowns = await getNearbyTowns(town.latitude, town.longitude, 3);
    }

    // Town-specific Service description: prefer the localised intro (truncated
    // at a sentence boundary, around 200 chars), then the service description,
    // then a generic fallback. Keeps the Service node description matched to
    // the page's actual localised content.
    const truncateAtSentence = (text: string, max = 200): string => {
      if (text.length <= max) return text;
      const slice = text.slice(0, max);
      const lastStop = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '));
      if (lastStop > 80) return slice.slice(0, lastStop + 1).trim();
      const lastSpace = slice.lastIndexOf(' ');
      return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).replace(/[,;:]+$/, '') + '...';
    };
    const serviceDescription =
      (localContent?.intro_paragraph && truncateAtSentence(localContent.intro_paragraph)) ||
      service.description ||
      `${service.name} for businesses in ${town.name}, Kent.`;

    return (
      <>
        {/* JSON-LD Schema (Rendered outside to avoid template layout shifting) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://businesssortedkent.co.uk"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": service.name,
                    "item": `https://businesssortedkent.co.uk/${service.slug}`
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": `${service.name} ${town.name}`,
                    "item": `https://businesssortedkent.co.uk/${service.slug}-${town.slug}`
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": `${service.name} in ${town.name}`,
                "serviceType": service.name,
                "description": serviceDescription,
                "provider": {
                  "@type": "Organization",
                  "@id": "https://businesssortedkent.co.uk/#organization",
                  "name": "Business Sorted Kent"
                },
                "areaServed": {
                  "@type": "Place",
                  "name": town.name
                },
                "url": `https://businesssortedkent.co.uk/${service.slug}-${town.slug}`,
                ...(service.slug === 'web-design' && {
                  "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "category": "Website Design"
                  }
                }),
                ...(service.slug === 'seo' && {
                  "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "category": "Search Engine Optimisation"
                  }
                })
              }
            ])
          }}
        />
        


        {/* Modular ServiceTown Template Rendering */}
        <ServiceTownPage
          service={service}
          town={town}
          localIntro={localIntro?.content}
          localContent={localContent}
          otherServices={otherServices.map(s => ({ name: s.name, slug: s.slug }))}
          nearbyTowns={nearbyTowns.map(t => ({ name: t.name, slug: t.slug }))}
          industries={industries}
          caseStudies={allCaseStudies}
          painPoints={painPoints}
          guides={guides}
        />
      </>
    );
  }

  // "Near" micro-location pages removed — thin content / spam risk
  if (route.type === 'microLocation') {
    notFound();
  }

  // Fallback guardrail
  return null;
}
