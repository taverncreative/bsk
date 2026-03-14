import { supabase } from '@/lib/supabase';
import type { Town } from '@/types';

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
  const { data, error } = await supabase
    .from('towns')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') { // Ignore zero rows error
      console.error(`Error fetching town by slug: ${slug}`, error);
    }
    return null;
  }
  return data as Town;
}

export async function getAllTowns(): Promise<Town[]> {
  const { data, error } = await supabase
    .from('towns')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching all towns', error);
    return [];
  }
  return data as Town[];
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
