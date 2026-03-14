import { supabase } from '@/lib/supabase';
import type { Guide } from '@/types';

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching guide by slug: ${slug}`, error);
    }
    return null;
  }
  return data as Guide;
}

export async function getAllGuides(): Promise<Guide[]> {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('status', 'published')
    .order('published_date', { ascending: false });

  if (error) {
    console.error('Error fetching all guides', error);
    return [];
  }
  return data as Guide[];
}
