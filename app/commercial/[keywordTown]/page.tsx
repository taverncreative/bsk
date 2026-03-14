import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCommercialKeywords } from '@/lib/seo/commercialKeywords';
import { getTownBySlug, getAllTowns } from '@/lib/queries';
import CommercialPage from '@/components/templates/CommercialPage';

// Regenerate pages statically every hour if new towns are added
export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    keywordTown: string;
  }>;
}

/**
 * Intelligent Slug Parser
 * Parses 'seo-cost-ashford' into { keywordSlug: 'seo-cost', townSlug: 'ashford' }
 * Sorts keywords natively by length to prevent 'seo' matching 'seo-cost' improperly.
 */
function parseSlug(combinedSlug: string) {
  if (!combinedSlug) return { keyword: null, townSlug: '' };
  
  const keywords = getCommercialKeywords().sort((a, b) => b.slug.length - a.slug.length);
  
  let matchedKeyword = null;
  let townSlug = '';

  for (const keyword of keywords) {
    const prefix = `${keyword.slug}-`;
    if (combinedSlug.startsWith(prefix)) {
      matchedKeyword = keyword;
      townSlug = combinedSlug.slice(prefix.length);
      break; 
    }
  }

  return { keyword: matchedKeyword, townSlug };
}


// 1. Generate Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { keyword, townSlug } = parseSlug(resolvedParams.keywordTown);

  if (!keyword || !townSlug) {
    return { title: 'Not Found | Business Sorted Kent' };
  }

  const town = await getTownBySlug(townSlug);
  if (!town) {
    return { title: 'Not Found | Business Sorted Kent' };
  }

  const isPricing = keyword.intent === 'pricing';

  return {
    title: `${keyword.title} in ${town.name} | Business Sorted Kent`,
    description: isPricing 
      ? `Discover the typical ${keyword.title.toLowerCase()} for businesses in ${town.name}. Get transparent rates and expert strategies.`
      : `Looking for the ${keyword.title.toLowerCase()} in ${town.name}? Learn what to expect and how to secure the best partner.`,
    alternates: {
      canonical: `https://businesssortedkent.co.uk/commercial/${keyword.slug}-${town.slug}`,
    },
  };
}


// 2. Static Generation Map (SSG)
export async function generateStaticParams() {
  const towns = await getAllTowns();
  const keywords = getCommercialKeywords();

  const paths: { keywordTown: string }[] = [];

  for (const keyword of keywords) {
    for (const town of towns) {
      paths.push({
        keywordTown: `${keyword.slug}-${town.slug}`,
      });
    }
  }

  return paths;
}


// 3. Page Component Rendering
export default async function CommercialRoute({ params }: PageProps) {
  const resolvedParams = await params;
  const { keyword, townSlug } = parseSlug(resolvedParams.keywordTown);

  // If the keyword doesn't exist in our array, or the format is invalid
  if (!keyword || !townSlug) {
    notFound();
  }

  // Hook into Postgres
  const town = await getTownBySlug(townSlug);

  // If we don't serve this town yet
  if (!town) {
    notFound();
  }

  // Guess the contextual root Service map so the template internal links behave cleanly
  const baseServiceName = keyword.slug.includes('seo') ? 'SEO' : 'Web Design';
  const baseServiceSlug = keyword.slug.includes('seo') ? 'seo' : 'web-design';

  return (
    <CommercialPage
      keyword={keyword}
      town={{ 
        name: town.name, 
        slug: town.slug 
      }}
      service={{ 
        name: baseServiceName, 
        slug: baseServiceSlug 
      }}
      // Leaving nearbyTowns undefined triggers the dynamic mapping fallback directly inside the Template
    />
  );
}
