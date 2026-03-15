import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const slugsToDelete = [
    'trades-business-website',
    'local-seo-for-plumber',
    'lead-capture-system-builder',
    'automated-enquiry-followups',
    'branding-and-website-launch'
  ];

  for (const slug of slugsToDelete) {
    const { error } = await supabase.from('case_studies').delete().eq('slug', slug);
    console.log(`Deleted ${slug}:`, error ? error.message : 'Success');
  }
}

main();
