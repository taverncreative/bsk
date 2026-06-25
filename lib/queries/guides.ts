import type { Guide } from '@/types';
import guidesData from '@/lib/data/guides.json';

const guides = guidesData as unknown as (Guide & { status?: string; published_date?: string })[];

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  return (guides.find((g) => g.slug === slug) as Guide) ?? null;
}

export async function getAllGuides(): Promise<Guide[]> {
  return guides
    .filter((g) => g.status === 'published')
    .sort(
      (a, b) => new Date(b.published_date || 0).getTime() - new Date(a.published_date || 0).getTime()
    ) as Guide[];
}
