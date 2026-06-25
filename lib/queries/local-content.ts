import localContentData from '@/lib/data/local_content.json';
import industryContentData from '@/lib/data/industry_content.json';

export interface LocalContent {
  id: string;
  service_slug: string;
  town_slug: string;
  intro_paragraph: string;
  local_context: string;
  competition_landscape: string | null;
  success_approach: string | null;
  local_stats: Record<string, any>;
  pain_points: Array<{ title: string; description: string }>;
  solutions: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  layout_variant: string;
}

export interface IndustryContent {
  id: string;
  industry_slug: string;
  service_slug: string;
  intro_paragraph: string;
  why_needed: string;
  approach_difference: string | null;
  pain_points: Array<{ title: string; description: string }>;
  solutions: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

const localContent = localContentData as unknown as (LocalContent & { updated_at?: string })[];
const industryContent = industryContentData as unknown as IndustryContent[];

export async function getLocalContent(serviceSlug: string, townSlug: string): Promise<LocalContent | null> {
  return localContent.find((c) => c.service_slug === serviceSlug && c.town_slug === townSlug) ?? null;
}

export async function getIndustryContent(industrySlug: string, serviceSlug: string): Promise<IndustryContent | null> {
  return (
    industryContent.find((c) => c.industry_slug === industrySlug && c.service_slug === serviceSlug) ?? null
  );
}

// All local_content rows for one town — used by the town hub page to build a
// rich service overview.
export async function getLocalContentByTown(townSlug: string): Promise<LocalContent[]> {
  return localContent.filter((c) => c.town_slug === townSlug);
}

// All local_content rows — used by the sitemap to read per-page updated_at.
export async function getAllLocalContent(): Promise<(LocalContent & { updated_at?: string })[]> {
  return localContent;
}
