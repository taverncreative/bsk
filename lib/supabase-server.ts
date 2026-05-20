import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server-only Supabase client using the service role key.
 *
 * Use this in server components, route handlers and server actions for
 * public-data reads (towns, industries, services, guides, case studies).
 *
 * The anon RLS policies on these tables currently block public reads;
 * since this client only runs server-side and the key never reaches the
 * browser, it is safe to use for read-only catalog data.
 *
 * Do NOT import this from client components.
 */
export const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
