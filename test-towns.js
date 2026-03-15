require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
async function main() {
  const { data, error } = await supabase.from('towns').select('name, latitude, longitude').limit(5);
  console.log("Towns data:", data);
}
main();
