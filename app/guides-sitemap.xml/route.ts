import { getAllGuides } from '@/lib/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  const guides = await getAllGuides();
  const baseUrl = 'https://businesssortedkent.co.uk';

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${guides.map((guide) => `
    <url>
      <loc>${baseUrl}/guides/${guide.slug}</loc>
      <lastmod>${guide.updated_at ? new Date(guide.updated_at).toISOString() : new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
  `).join('')}
</urlset>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
