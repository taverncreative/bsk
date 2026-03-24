import { getAllTowns, getAllServices } from '@/lib/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.businesssortedkent.co.uk';
  const [towns, services] = await Promise.all([getAllTowns(), getAllServices()]);

  const townRoutes = towns.map((town) => ({
    url: `${baseUrl}/towns/${town.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const serviceTownRoutes: any[] = [];
  services.forEach((service) => {
    towns.forEach((town) => {
      serviceTownRoutes.push({
        url: `${baseUrl}/${service.slug}-${town.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  const allRoutes = [...townRoutes, ...serviceTownRoutes];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes.map((route) => `
    <url>
      <loc>${route.url}</loc>
      <lastmod>${route.lastModified}</lastmod>
      <changefreq>${route.changeFrequency}</changefreq>
      <priority>${route.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
