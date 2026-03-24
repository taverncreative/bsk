import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.businesssortedkent.co.uk';

  const sitemaps = [
    'pages-sitemap.xml',
    'guides-sitemap.xml',
    'locations-sitemap.xml',
    'services-sitemap.xml',
    'industries-sitemap.xml',
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map((sitemap) => `
    <sitemap>
      <loc>${baseUrl}/${sitemap}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
  `).join('')}
</sitemapindex>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
