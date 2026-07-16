interface BreadcrumbItem {
  name: string;
  url: string;
}

interface PageSchemaProps {
  breadcrumbs?: BreadcrumbItem[];
  extra?: object[];
}

const SITE_ROOT = 'https://businesssortedkent.co.uk';

/**
 * Renders one or more JSON-LD blocks for a page. Pass a breadcrumb trail and
 * any extra schema objects (Service, LocalBusiness, AboutPage, ContactPage, etc.).
 *
 * Pass URLs relative to root (e.g. "/towns/ashford"). Absolute URLs are honoured as-is.
 */
export default function PageSchema({ breadcrumbs, extra }: PageSchemaProps) {
  const items: object[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    items.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.url.startsWith('http') ? b.url : `${SITE_ROOT}${b.url}`,
      })),
    });
  }

  if (extra) {
    for (const e of extra) {
      items.push({ '@context': 'https://schema.org', ...e });
    }
  }

  if (items.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(items.length === 1 ? items[0] : items) }}
    />
  );
}

/** Offer schema for the four core services. No public prices: every offer is
 *  priced to the project, so no price/priceSpecification is emitted. */
export function serviceOfferSchema(serviceSlug: string): object | undefined {
  switch (serviceSlug) {
    case 'web-design':
      return {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        category: 'Website Design',
      };
    case 'seo':
      return {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        category: 'Search Engine Optimisation',
      };
    default:
      return undefined; // priced to the project — no fixed price
  }
}
