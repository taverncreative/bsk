import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const cookieStore = await cookies();
  const role = cookieStore.get('userRole')?.value;

  if (role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
  }

  // Use the admin key (or anon key if service role missing, but assuming service role or we rely on the API layer security) to fetch logs
  // Note: if RLS is strictly enforced and we only have ANON key, this might still return empty if not disabled. 
  // However, since we provided setup_elle_logs.sql, if it is run by the owner, they can configure the RLS.
  // For safety, let's just make the query.
  const { data, error } = await supabaseAdmin
    .from('elle_chat_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
