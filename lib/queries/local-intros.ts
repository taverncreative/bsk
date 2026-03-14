import { supabase } from '@/lib/supabase';
import type { LocalIntro } from '@/types';

export async function getLocalIntro(serviceId: string, townId: string): Promise<LocalIntro | null> {
  const { data, error } = await supabase
    .from('local_intros')
    .select('*')
    .eq('service_id', serviceId)
    .eq('town_id', townId)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching local intro for service ${serviceId} and town ${townId}`, error);
    }
    return null;
  }
  return data as LocalIntro;
}
