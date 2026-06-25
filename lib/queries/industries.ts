import type { Industry } from '@/types';
import industriesData from '@/lib/data/industries.json';
import { getAllServices } from './services';

const industries = industriesData as unknown as Industry[];

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  return industries.find((i) => i.slug === slug) ?? null;
}

export async function getAllIndustries(): Promise<Industry[]> {
  return [...industries].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

// Returns all services applicable to a given industry. There is no formal
// industry_services mapping, so this returns the full (alphabetised) service
// catalogue — preserving the previous behaviour.
export async function getIndustryServices(_industryId: string) {
  return getAllServices();
}
