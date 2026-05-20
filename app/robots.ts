import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin-dashboard', '/client-dashboard', '/login'],
    },
    sitemap: 'https://businesssortedkent.co.uk/sitemap.xml',
  };
}
