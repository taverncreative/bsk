import { supabase } from '@/lib/supabase';
import type { Industry } from '@/types';

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching industry by slug: ${slug}`, error);
    }
    return null;
  }
  return data as Industry;
}

export async function getAllIndustries(): Promise<Industry[]> {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching all industries', error);
    return [];
  }
  return data as Industry[];
}

// Fetches all services theoretically available/applicable to a given industry.
// Until a formal `industry_services` join table is established in Supabase, 
// this returns a globally mapped payload of all core services for flexibility.
export async function getIndustryServices(industryId: string) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('name');

  if (error) {
    console.error(`Error fetching services for industry ID: ${industryId}`, error);
    return [];
  }
  return data;
}
