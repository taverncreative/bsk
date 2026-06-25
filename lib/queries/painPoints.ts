import type { IndustryPainPoint } from '@/types';
import painPointsData from '@/lib/data/industry_pain_points.json';

const painPoints = painPointsData as unknown as (IndustryPainPoint & {
  service_id?: string;
  industry_id?: string;
})[];

export async function getPainPointsByService(serviceId: string): Promise<IndustryPainPoint[]> {
  return painPoints.filter((p) => p.service_id === serviceId).slice(0, 3) as IndustryPainPoint[];
}

export async function getPainPointsByIndustry(industryId: string): Promise<IndustryPainPoint[]> {
  return painPoints.filter((p) => p.industry_id === industryId).slice(0, 3) as IndustryPainPoint[];
}
