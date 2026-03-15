import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('guides').select('*');
  if (data) {
    for (const guide of data) {
      console.log(`------------- ${guide.slug} (${guide.title}) -------------`);
      if (guide.content) {
        console.log(`Content length: ${guide.content.length}`);
      } else {
        console.log(`Content: null`);
      }
    }
  }
}

main();
