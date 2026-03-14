import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const townsToInsert = [
  { name: 'Ashford', slug: 'ashford', county: 'Kent', latitude: 51.1465, longitude: 0.8750 },
  { name: 'Canterbury', slug: 'canterbury', county: 'Kent', latitude: 51.2802, longitude: 1.0789 },
  { name: 'Maidstone', slug: 'maidstone', county: 'Kent', latitude: 51.2704, longitude: 0.5227 },
  { name: 'Folkestone', slug: 'folkestone', county: 'Kent', latitude: 51.0813, longitude: 1.1695 },
  { name: 'Dover', slug: 'dover', county: 'Kent', latitude: 51.1295, longitude: 1.3089 },
  { name: 'Margate', slug: 'margate', county: 'Kent', latitude: 51.3850, longitude: 1.3838 },
  { name: 'Ramsgate', slug: 'ramsgate', county: 'Kent', latitude: 51.3340, longitude: 1.4160 },
  { name: 'Broadstairs', slug: 'broadstairs', county: 'Kent', latitude: 51.3582, longitude: 1.4326 },
  { name: 'Deal', slug: 'deal', county: 'Kent', latitude: 51.2226, longitude: 1.4006 },
  { name: 'Herne Bay', slug: 'herne-bay', county: 'Kent', latitude: 51.3694, longitude: 1.1274 },
  { name: 'Whitstable', slug: 'whitstable', county: 'Kent', latitude: 51.3589, longitude: 1.0255 },
  { name: 'Sittingbourne', slug: 'sittingbourne', county: 'Kent', latitude: 51.3396, longitude: 0.7354 },
  { name: 'Faversham', slug: 'faversham', county: 'Kent', latitude: 51.3148, longitude: 0.8927 },
  { name: 'Sevenoaks', slug: 'sevenoaks', county: 'Kent', latitude: 51.2721, longitude: 0.1914 },
  { name: 'Tonbridge', slug: 'tonbridge', county: 'Kent', latitude: 51.1965, longitude: 0.2748 },
  { name: 'Tunbridge Wells', slug: 'tunbridge-wells', county: 'Kent', latitude: 51.1324, longitude: 0.2637 },
  { name: 'Gravesend', slug: 'gravesend', county: 'Kent', latitude: 51.4418, longitude: 0.3687 },
  { name: 'Dartford', slug: 'dartford', county: 'Kent', latitude: 51.4425, longitude: 0.2136 },
  { name: 'Chatham', slug: 'chatham', county: 'Kent', latitude: 51.3789, longitude: 0.5279 },
  { name: 'Rochester', slug: 'rochester', county: 'Kent', latitude: 51.3894, longitude: 0.5042 },
  { name: 'Gillingham', slug: 'gillingham', county: 'Kent', latitude: 51.3888, longitude: 0.5488 },
  { name: 'Tenterden', slug: 'tenterden', county: 'Kent', latitude: 51.0683, longitude: 0.6865 },
  
  // Districts
  { name: 'Thanet', slug: 'thanet', county: 'Kent District', latitude: 51.3667, longitude: 1.3833 },
  { name: 'Medway', slug: 'medway', county: 'Kent District', latitude: 51.3917, longitude: 0.5417 },
  { name: 'Swale', slug: 'swale', county: 'Kent District', latitude: 51.3333, longitude: 0.8167 },
  { name: 'Canterbury District', slug: 'canterbury-district', county: 'Kent District', latitude: 51.2800, longitude: 1.0800 },
  { name: 'Ashford Borough', slug: 'ashford-borough', county: 'Kent District', latitude: 51.1500, longitude: 0.8667 },
  { name: 'Dover District', slug: 'dover-district', county: 'Kent District', latitude: 51.1333, longitude: 1.3000 },
  { name: 'Sevenoaks District', slug: 'sevenoaks-district', county: 'Kent District', latitude: 51.2833, longitude: 0.1833 },
  { name: 'Tonbridge & Malling', slug: 'tonbridge-and-malling', county: 'Kent District', latitude: 51.2833, longitude: 0.3667 },
  { name: 'Maidstone Borough', slug: 'maidstone-borough', county: 'Kent District', latitude: 51.2667, longitude: 0.5333 },
  { name: 'Tunbridge Wells Borough', slug: 'tunbridge-wells-borough', county: 'Kent District', latitude: 51.1333, longitude: 0.2667 },
  { name: 'Dartford Borough', slug: 'dartford-borough', county: 'Kent District', latitude: 51.4333, longitude: 0.2333 },
  { name: 'Gravesham', slug: 'gravesham', county: 'Kent District', latitude: 51.4167, longitude: 0.3667 },
];

async function addTowns() {
  console.log("Adding missing towns to Supabase...");
  
  for (const t of townsToInsert) {
    const { data: existing } = await supabase
      .from('towns')
      .select('id')
      .eq('slug', t.slug)
      .maybeSingle();
      
    if (!existing) {
      console.log(`Inserting ${t.name}...`);
      const { error } = await supabase.from('towns').insert({
        name: t.name,
        slug: t.slug,
        county: t.county,
        latitude: t.latitude,
        longitude: t.longitude,
        intro: `As a primary business centre in ${t.county}, ${t.name} is full of opportunities for local growth. We help businesses here secure dominant digital performance.`
      });
      if (error) console.error("Error inserting:", t.name, error.message);
    } else {
      console.log(`${t.name} already exists.`);
    }
  }
}

addTowns().catch(console.error);
