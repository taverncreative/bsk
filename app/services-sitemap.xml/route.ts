import { getAllServices } from '@/lib/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.businesssortedkent.co.uk';
  const services = await getAllServices();

  const routes = services.map((service) => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map((route) => `
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
