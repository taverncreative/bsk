import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: existing, error } = await supabase.from('industries').select('*');
  
  const toAdd = [
    { name: 'Electricians', slug: 'electricians', pain_point: 'Struggling to get local enquiries', description: 'Professional electrical contractors and sparkies.' },
    { name: 'Plumbers', slug: 'plumbers', pain_point: 'Losing emergency callouts to competitors on Google Maps.', description: 'Reliable plumbing services operating across Kent.' },
    { name: 'Builders', slug: 'builders', pain_point: 'Tired of quoting for low-budget jobs; need to attract high-value extensions.', description: 'Construction companies, extensions, and renovations.' },
    { name: 'Roofers', slug: 'roofers', pain_point: 'Struggling to find high quality local roof repair leads.', description: 'Local roofing companies and repair specialists.' },
    { name: 'Landscapers', slug: 'landscapers', pain_point: 'Wanting bigger garden installation projects over maintenance work.', description: 'Hard and soft landscaping specialists.' },
    { name: 'Carpenters', slug: 'carpenters', pain_point: 'Finding it hard to showcase bespoke woodwork online.', description: 'Bespoke joinery, carpentry and installations.' },
    { name: 'Painters and Decorators', slug: 'painters-and-decorators', pain_point: 'Competing with handymen for larger residential properties.', description: 'Professional painting and decorating contractors.' },
    { name: 'Cleaning Companies', slug: 'cleaning-companies', pain_point: 'Needing more commercial contracts over one-off domestic cleans.', description: 'Commercial and domestic cleaning services.' },
    { name: 'Removal Companies', slug: 'removal-companies', pain_point: 'Struggling to appear when locals search for house moves.', description: 'Local man and van, and large house removal firms.' },
    { name: 'Driveway Installers', slug: 'driveway-installers', pain_point: 'Losing high value paving jobs to competitors with better reviews.', description: 'Paving, resin, and driveway installation experts.' },
    { name: 'Garden Services', slug: 'garden-services', pain_point: 'Needing predictable recurring maintenance rounds.', description: 'Garden maintenance, clearances and care.' },
    { name: 'Property Maintenance', slug: 'property-maintenance', pain_point: 'Struggling to secure long-term landlord contracts.', description: 'All-round property repair and maintenance.' },
    { name: 'Letting Agents', slug: 'letting-agents', pain_point: 'Struggling for local landlord instructions against online agents.', description: 'Local letting and property management agents.' },
    { name: 'Holiday Lets', slug: 'holiday-lets', pain_point: 'Relying too heavily on OTA platforms losing margin on fees.', description: 'Independent holiday cottages and short term rentals.' },
  ];

  const existingSlugs = new Set((existing || []).map(r => r.slug));
  const newInds = toAdd.filter(i => !existingSlugs.has(i.slug));
  
  if (newInds.length > 0) {
     const { error: insErr } = await supabase.from('industries').insert(newInds);
     console.log('Inserted:', newInds.length, 'Error:', insErr);
  } else {
    console.log('No new industries to add');
  }
}

main();
