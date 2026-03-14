import { supabase } from '@/lib/supabase';
import type { Review } from '@/types';

export async function getReviewsByTown(townId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('town_id', townId)
    .order('rating', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching reviews for town ${townId}`, error);
    return [];
  }
  return data as Review[];
}
