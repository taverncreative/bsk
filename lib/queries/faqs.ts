import { supabase } from '@/lib/supabase';
import type { FAQ } from '@/types';

export async function getFAQs(serviceId?: string, townId?: string, industryId?: string): Promise<FAQ[]> {
  let query = supabase.from('faqs').select('*');
  
  if (serviceId) {
    query = query.eq('service_id', serviceId);
  }
  if (townId) {
    query = query.eq('town_id', townId);
  }
  if (industryId) {
    query = query.eq('industry_id', industryId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching FAQs', error);
    return [];
  }
  return data as FAQ[];
}
