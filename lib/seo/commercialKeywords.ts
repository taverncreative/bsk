export interface CommercialKeyword {
  slug: string;
  title: string;
  intent: 'pricing' | 'comparison' | 'service';
}

const commercialKeywords: CommercialKeyword[] = [
  {
    slug: 'seo-cost',
    title: 'SEO Cost',
    intent: 'pricing',
  },
  {
    slug: 'web-design-cost',
    title: 'Website Design Cost',
    intent: 'pricing',
  },
  {
    slug: 'best-seo-agency',
    title: 'Best SEO Agency',
    intent: 'comparison',
  },
  {
    slug: 'web-design-pricing',
    title: 'Website Design Pricing',
    intent: 'pricing',
  },
];

export function getCommercialKeywords(): CommercialKeyword[] {
  return commercialKeywords;
}
