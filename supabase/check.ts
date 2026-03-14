import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data: s } = await supabase.from('services').select('slug');
  const { data: t } = await supabase.from('towns').select('slug');
  console.log('Services:', s);
  console.log('Towns:', t);
}

run();
