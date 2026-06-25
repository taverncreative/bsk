import type { Service } from '@/types';
import servicesData from '@/lib/data/services.json';

const services = servicesData as unknown as Service[];

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getAllServices(): Promise<Service[]> {
  return [...services].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}
