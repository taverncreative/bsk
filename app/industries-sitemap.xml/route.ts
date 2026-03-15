import { getAllIndustries, getAllServices } from '@/lib/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.businesssortedkent.co.uk';
  const [industries, services] = await Promise.all([getAllIndustries(), getAllServices()]);

  const industryRoutes = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const industryServiceRoutes: any[] = [];
  industries.forEach((industry) => {
    services.forEach((service) => {
      industryServiceRoutes.push({
        url: `${baseUrl}/industries/${industry.slug}/${service.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  const allRoutes = [...industryRoutes, ...industryServiceRoutes];

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
