import type { FAQ } from '@/types';
import faqsData from '@/lib/data/faqs.json';

const faqs = faqsData as unknown as (FAQ & {
  service_id?: string;
  town_id?: string;
  industry_id?: string;
})[];

export async function getFAQs(serviceId?: string, townId?: string, industryId?: string): Promise<FAQ[]> {
  return faqs.filter((f) => {
    if (serviceId && f.service_id !== serviceId) return false;
    if (townId && f.town_id !== townId) return false;
    if (industryId && f.industry_id !== industryId) return false;
    return true;
  }) as FAQ[];
}
