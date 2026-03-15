import { MetadataRoute } from 'next';
import { 
  getAllServices, 
  getAllTowns, 
  getAllIndustries, 
  getAllGuides, 
  getAllCaseStudies 
} from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://businesssortedkent.co.uk';

  // Fetch all programmatic data concurrently
  const [services, towns, industries, guides, caseStudies] = await Promise.all([
    getAllServices(),
    getAllTowns(),
    getAllIndustries(),
    getAllGuides(),
    getAllCaseStudies()
  ]);

  // Static / Manually added pages
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/kent-business-growth',
    '/commercial',
    '/free-website-review',
  ];

  const map: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const CORE_SERVICES = ['web-design', 'seo', 'lead-capture', 'business-automation', 'branding', 'social-media-setup', 'digital-marketing', 'workwear-print'];

  // 1. Service Hubs (e.g. /web-design)
  services.forEach((service: any) => {
    if (service.slug) {
      map.push({
        url: `${baseUrl}/${service.slug}`,
        lastModified: service.updated_at ? new Date(service.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
      
      // 2. Programmatic Location Pages (Service x Town)
      if (CORE_SERVICES.includes(service.slug)) {
        towns.forEach((town: any) => {
          if (town.slug) {
            map.push({
              url: `${baseUrl}/${service.slug}-${town.slug}`,
              lastModified: new Date(), // Combined content, default to now or rebuild time
              changeFrequency: 'weekly',
              priority: 0.7,
            });
            map.push({
              url: `${baseUrl}/${service.slug}-near-${town.slug}`,
              lastModified: new Date(),
              changeFrequency: 'weekly',
              priority: 0.6,
            });
          }
        });
      }
    }
  });

  // 3. Industries
  industries.forEach((industry: any) => {
    if (industry.slug) {
      map.push({
        url: `${baseUrl}/industries/${industry.slug}`,
        lastModified: industry.updated_at ? new Date(industry.updated_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  });

  // 4. Towns (Standalone town hubs)
  towns.forEach((town: any) => {
    if (town.slug) {
      map.push({
        url: `${baseUrl}/towns/${town.slug}`,
        lastModified: town.updated_at ? new Date(town.updated_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  });

  // 5. Educational Guides
  guides.forEach((guide: any) => {
    if (guide.slug) {
      map.push({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: guide.updated_at ? new Date(guide.updated_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  });

  // 6. Case Studies
  caseStudies.forEach((cs: any) => {
    if (cs.slug) {
      map.push({
        url: `${baseUrl}/case-studies/${cs.slug}`,
        lastModified: cs.updated_at ? new Date(cs.updated_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  });

  return map;
}
