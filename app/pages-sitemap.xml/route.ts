import { getAllCaseStudies } from '@/lib/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.businesssortedkent.co.uk';
  const caseStudies = await getAllCaseStudies();

  const coreRoutes = [
    '',
    '/services',
    '/towns',
    '/industries',
    '/case-studies',
    '/guides',
    '/contact',
    '/free-website-review',
    '/kent-business-growth',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.created_at ? new Date(study.created_at).toISOString() : new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const allRoutes = [...coreRoutes, ...caseStudyRoutes];

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
