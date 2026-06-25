import type { Town } from '@/types';
import townsData from '@/lib/data/towns.json';

// Content is snapshotted from Supabase into lib/data/*.json (see
// scripts/export-content.ts). These queries now read that local snapshot —
// there is no database at runtime or build time.
const towns = townsData as unknown as Town[];

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function getTownBySlug(slug: string): Promise<Town | null> {
  return towns.find((t) => t.slug === slug) ?? null;
}

export async function getAllTowns(): Promise<Town[]> {
  return [...towns].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

export async function getNearbyTowns(lat: number, lng: number, limit: number = 3): Promise<Town[]> {
  const allTowns = await getAllTowns();

  const townsWithDistance = allTowns
    .filter(t => t.latitude !== null && t.longitude !== null && (t.latitude !== lat || t.longitude !== lng))
    .map(town => ({
      ...town,
      distance: getDistanceFromLatLonInKm(lat, lng, town.latitude!, town.longitude!)
    }))
    .sort((a, b) => a.distance - b.distance);

  return townsWithDistance.slice(0, limit) as Town[];
}
