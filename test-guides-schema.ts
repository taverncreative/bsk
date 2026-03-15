import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

async function main() {
  const { data, error } = await supabase.from('guides').select('*').limit(1);
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}
main();
