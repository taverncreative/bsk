import caseStudiesData from '@/lib/data/case_studies.json';

export interface CaseStudy {
  id?: string;
  title: string;
  slug: string;
  industry: string;
  town: string;
  services_used?: string;
  challenge?: string;
  solution?: string;
  summary: string;
  results: any; // Can be simple string, JSON array of metrics, or HTML content
  metrics?: string;
  created_at?: string;
}

const caseStudies = caseStudiesData as unknown as CaseStudy[];

/**
 * Fetch all Case Studies, ordered newest first.
 */
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return [...caseStudies].sort(
    (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  );
}

/**
 * Fetch a specific Case Study by its URL slug.
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return caseStudies.find((c) => c.slug === slug) ?? null;
}
