import { getAllServices } from '@/lib/queries';
import type { Service } from '@/types';

/**
 * SEO Helper: getRelatedServices
 * 
 * Fetches all active services and filters out the currently rendered service 
 * to generate a pristine array of internal link targets for cross-pollination.
 * Restricted to a maximum of 4 items to maintain layout integrity.
 */
export async function getRelatedServices(currentServiceSlug: string): Promise<Service[]> {
  try {
    const allServices = await getAllServices();
    
    // Filter out the current service and slice mathematically
    const related = allServices
      .filter((service) => service.slug !== currentServiceSlug)
      .slice(0, 4);
      
    return related;
  } catch (error) {
    console.error(`[SEO Layer] Error fetching related services for ${currentServiceSlug}:`, error);
    return [];
  }
}
