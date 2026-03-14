import type { MetadataRoute } from 'next';
import { 
  getAllServices, 
  getAllTowns, 
  getAllIndustries, 
  getAllCaseStudies,
  getAllGuides 
} from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://businesssortedkent.co.uk';

  // 1. Fetch all core dimension data concurrently
  const [services, towns, industries, caseStudies, guides] = await Promise.all([
    getAllServices(),
    getAllTowns(),
    getAllIndustries(),
    getAllCaseStudies(),
    getAllGuides(),
  ]);

  // 2. Base Routes
  const routes = [
    '',
    '/services',
    '/towns',
    '/industries',
    '/case-studies',
    '/guides',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 3. Service Pages (e.g., /web-design)
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 4. Service x Town Pages (e.g., /web-design-ashford)
  const serviceTownPages: MetadataRoute.Sitemap = [];
  services.forEach((service) => {
    towns.forEach((town) => {
      serviceTownPages.push({
        url: `${baseUrl}/${service.slug}-${town.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    });
  });

  // 5. Town Pages (e.g., /towns/ashford)
  const townPages = towns.map((town) => ({
    url: `${baseUrl}/towns/${town.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 6. Industry Pages (e.g., /industries/accountants)
  const industryPages = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 7. Industry x Service Pages (e.g., /industries/accountants/web-design)
  const industryServicePages: MetadataRoute.Sitemap = [];
  industries.forEach((industry) => {
    services.forEach((service) => {
      industryServicePages.push({
        url: `${baseUrl}/industries/${industry.slug}/${service.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    });
  });

  // 8. Case Studies (e.g., /case-studies/accountant-maidstone-automation)
  const caseStudyPages = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.created_at ? new Date(study.created_at).toISOString() : new Date().toISOString(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  // 9. Guides (e.g., /guides/local-seo-for-small-businesses)
  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.updated_at ? new Date(guide.updated_at).toISOString() : new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 10. Consolidate and return the full array
  return [
    ...routes,
    ...servicePages,
    ...serviceTownPages,
    ...townPages,
    ...industryPages,
    ...industryServicePages,
    ...caseStudyPages,
    ...guidePages,
  ];
}
