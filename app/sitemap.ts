import { MetadataRoute } from 'next';
import {
  getAllServices,
  getAllTowns,
  getAllIndustries,
  getAllGuides,
  getAllCaseStudies
} from '@/lib/queries';
import { getAllLocalContent } from '@/lib/queries/local-content';
import { getPublishedPosts } from '@/lib/blog/client';

/**
 * Pick the most recent of N possibly-undefined date strings, returning a Date
 * or undefined if none are valid. Used so lastmod reflects the most recent
 * change across multiple data sources (e.g. industry × service uses the max
 * of industry.updated_at and service.updated_at).
 */
function latest(...candidates: (string | null | undefined)[]): Date | undefined {
  const valid = candidates
    .filter((c): c is string => !!c)
    .map((c) => new Date(c))
    .filter((d) => !isNaN(d.getTime()));
  if (valid.length === 0) return undefined;
  return valid.reduce((a, b) => (a > b ? a : b));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://businesssortedkent.co.uk';

  // Fetch all programmatic data concurrently. Pull updated_at from local_content
  // so we can populate lastmod accurately on service×town URLs.
  const [services, towns, industries, guides, caseStudies, localContentRows, newsPosts] = await Promise.all([
    getAllServices(),
    getAllTowns(),
    getAllIndustries(),
    getAllGuides(),
    getAllCaseStudies(),
    getAllLocalContent(),
    getPublishedPosts()
  ]);

  // Map service-town slug pairs to their local_content updated_at timestamp.
  const localContentUpdatedAt = new Map<string, string>();
  localContentRows.forEach((r: any) => {
    const key = `${r.service_slug}-${r.town_slug}`;
    if (r.updated_at) localContentUpdatedAt.set(key, r.updated_at);
  });

  // Static / Manually added pages.
  // Per Google's guidance, lastmod should only be set when it reflects a real
  // content-change signal. Static pages have no per-page change signal, so we
  // omit lastmod entirely and let crawlers fall back to discovery heuristics.
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/kent-business-growth',
    '/free-website-review',
    '/towns',
    '/industries',
    '/case-studies',
    '/guides',
    '/news',
  ];

  const map: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const CORE_SERVICES = ['web-design', 'seo', 'lead-capture', 'business-automation', 'branding', 'social-media-setup', 'digital-marketing', 'workwear-print', 'ai-chatbots', 'ai-content', 'ai-automation'];

  // 1. Service Hubs (e.g. /web-design)
  services.forEach((service: any) => {
    if (service.slug) {
      map.push({
        url: `${baseUrl}/${service.slug}`,
        ...(service.updated_at && { lastModified: new Date(service.updated_at) }),
        changeFrequency: 'weekly',
        priority: 0.9,
      });

      // 2. Programmatic Location Pages (Service x Town) — only include pages with local content.
      // lastmod uses the local_content.updated_at, which actually reflects when the localised
      // copy was last edited.
      if (CORE_SERVICES.includes(service.slug)) {
        towns.forEach((town: any) => {
          const comboKey = `${service.slug}-${town.slug}`;
          if (town.slug && localContentUpdatedAt.has(comboKey)) {
            const lc = localContentUpdatedAt.get(comboKey);
            map.push({
              url: `${baseUrl}/${service.slug}-${town.slug}`,
              ...(lc && { lastModified: new Date(lc) }),
              changeFrequency: 'weekly',
              priority: 0.7,
            });
          }
        });
      }
    }
  });

  // 3. Industries (hub pages + industry × service combinations).
  // Industry × service URLs use the max of industry.updated_at and service.updated_at,
  // since either side can change the rendered page.
  industries.forEach((industry: any) => {
    if (industry.slug) {
      map.push({
        url: `${baseUrl}/industries/${industry.slug}`,
        ...(industry.updated_at && { lastModified: new Date(industry.updated_at) }),
        changeFrequency: 'monthly',
        priority: 0.7,
      });

      services.forEach((service: any) => {
        if (service.slug) {
          const lm = latest(industry.updated_at, service.updated_at);
          map.push({
            url: `${baseUrl}/industries/${industry.slug}/${service.slug}`,
            ...(lm && { lastModified: lm }),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      });
    }
  });

  // 4. Towns (Standalone town hubs)
  towns.forEach((town: any) => {
    if (town.slug) {
      map.push({
        url: `${baseUrl}/towns/${town.slug}`,
        ...(town.updated_at && { lastModified: new Date(town.updated_at) }),
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
        ...(guide.updated_at && { lastModified: new Date(guide.updated_at) }),
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
        ...(cs.updated_at && { lastModified: new Date(cs.updated_at) }),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  });

  // 7. News (blog posts fetched from Spotlight). getPublishedPosts returns []
  // on any failure, so a Spotlight outage just omits these URLs rather than
  // failing the sitemap. lastmod uses published_at (the only date the API
  // exposes).
  newsPosts.forEach((post) => {
    if (post.slug) {
      map.push({
        url: `${baseUrl}/news/${post.slug}`,
        ...(post.published_at && { lastModified: new Date(post.published_at) }),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  });

  return map;
}
