import {
  getNearbyTowns,
  getAllServices,
  getAllIndustries,
  getAllGuides,
  getServiceBySlug,
  getTownBySlug
} from '@/lib/queries';

// Helper to vary link titles naturally
function getRandomTitle(patterns: string[], serviceName: string, townName: string = '', industryName: string = '') {
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  return pattern
    .replace('{service}', serviceName)
    .replace('{town}', townName)
    .replace('{industry}', industryName);
}

export async function generateNearbyTownLinks(
  serviceSlug: string,
  townSlug: string,
  latitude: number,
  longitude: number
) {
  const [towns, service] = await Promise.all([
    getNearbyTowns(latitude, longitude, 3),
    getServiceBySlug(serviceSlug)
  ]);
  const serviceName = service?.name || 'Digital Services';

  const patterns = [
    '{service} {town}',
    '{service} in {town}',
    '{town} {service} Services'
  ];

  return towns.map(town => ({
    title: getRandomTitle(patterns, serviceName, town.name),
    description: `Leading ${serviceName.toLowerCase()} solutions to help ${town.name} businesses grow online.`,
    href: `/${serviceSlug}-${town.slug}`
  }));
}

export async function generateServiceLinks(serviceSlug: string, townSlug: string) {
  const [allServices, town] = await Promise.all([
    getAllServices(),
    getTownBySlug(townSlug)
  ]);
  const townName = town?.name || 'Kent';

  // Filter out the current service and limit to 3
  const relatedServices = allServices.filter(s => s.slug !== serviceSlug).slice(0, 3);

  const patterns = [
    '{service} {town}',
    '{service} Options in {town}',
    'Local {service} for {town} Businesses'
  ];

  return relatedServices.map(service => ({
    title: getRandomTitle(patterns, service.name, townName),
    description: `Professional ${service.name.toLowerCase()} services tailored for local companies.`,
    href: `/${service.slug}-${townSlug}`
  }));
}

export async function generateIndustryLinks(serviceSlug: string, townSlug: string) {
  const [industries, service] = await Promise.all([
    getAllIndustries(),
    getServiceBySlug(serviceSlug)
  ]);
  const serviceName = service?.name || 'Digital Services';

  const patterns = [
    '{service} for {industry}',
    '{industry} {service} Strategies',
    'Scaling {industry} with {service}'
  ];

  return industries.slice(0, 3).map(industry => ({
    title: getRandomTitle(patterns, serviceName, '', industry.name),
    description: `Specialized ${serviceName.toLowerCase()} strategies crafted specifically for the ${industry.name.toLowerCase()} sector.`,
    href: `/industries/${industry.slug}/${serviceSlug}`
  }));
}

export async function generateGuideLinks(serviceSlug: string) {
  const guides = await getAllGuides();
  return guides.slice(0, 3).map(guide => ({
    title: guide.title,
    description: guide.excerpt || 'Expert strategies and advice to scale your business online.',
    href: `/guides/${guide.slug}`
  }));
}
