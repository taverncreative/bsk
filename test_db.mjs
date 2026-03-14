import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  console.log("Checking DB...");
  const { data: services, error: err1 } = await supabase.from('services').select('*');
  const { data: towns, error: err2 } = await supabase.from('towns').select('*');
  
  console.log('Services:', services ? services.length : null, 'Error:', err1);
  console.log('Towns:', towns ? towns.length : null, 'Error:', err2);
}

check();
