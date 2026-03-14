import { supabase } from '@/lib/supabase';
import type { Service } from '@/types';

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching service by slug: ${slug}`, error);
    }
    return null;
  }
  return data as Service;
}

export async function getAllServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching all services', error);
    return [];
  }
  return data as Service[];
}
