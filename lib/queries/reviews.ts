import type { Review } from '@/types';
import reviewsData from '@/lib/data/reviews.json';

const reviews = reviewsData as unknown as (Review & {
  town_id?: string;
  rating?: number;
  created_at?: string;
})[];

export async function getReviewsByTown(townId: string): Promise<Review[]> {
  return reviews
    .filter((r) => r.town_id === townId)
    .sort((a, b) => {
      const byRating = (b.rating || 0) - (a.rating || 0);
      if (byRating !== 0) return byRating;
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    }) as Review[];
}
