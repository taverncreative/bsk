import { supabase } from '@/lib/supabase';

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

/**
 * Fetch all Case Studies
 * Automatically ordered by newest first.
 */
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all case studies:', error);
    return [];
  }
  
  return data as CaseStudy[];
}

/**
 * Fetch a specific Case Study natively mapped by its URL slug.
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    // Suppress warning if technically valid Postgres 116 "0 rows returned"
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching case study by slug: ${slug}`, error);
    }
    return null;
  }
  
  return data as CaseStudy;
}
