import { supabase } from '@/lib/supabase';
import type { IndustryPainPoint } from '@/types';

export async function getPainPointsByService(serviceId: string): Promise<IndustryPainPoint[]> {
  const { data, error } = await supabase
    .from('industry_pain_points')
    .select('*')
    .eq('service_id', serviceId)
    .limit(3);

  if (error) {
    console.error('Error fetching pain points by service', error);
    return [];
  }
  return data as IndustryPainPoint[];
}

export async function getPainPointsByIndustry(industryId: string): Promise<IndustryPainPoint[]> {
  const { data, error } = await supabase
    .from('industry_pain_points')
    .select('*')
    .eq('industry_id', industryId)
    .limit(3);

  if (error) {
    console.error('Error fetching pain points by industry', error);
    return [];
  }
  return data as IndustryPainPoint[];
}
