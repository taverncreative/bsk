/* eslint-disable no-console */
/**
 * - Adds https://www.gemservices.uk/ as the website for GEM Services
 * - Rewrites the jargon-y "Structured enquiry capture for FM buyers" line on Servoro
 *
 * Run: npx tsx scripts/addGemWebsiteAndFixServoroMetric.ts
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing env');
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

async function update(slug: string, mutator: (results: any) => any) {
  const { data, error } = await sb
    .from('case_studies')
    .select('results')
    .eq('slug', slug)
    .maybeSingle();
  if (error || !data) {
    console.error(`${slug}: read failed`, error?.message);
    return;
  }
  let parsed: any = {};
  try {
    parsed = typeof data.results === 'string' ? JSON.parse(data.results) : data.results || {};
  } catch {
    parsed = {};
  }
  const next = mutator(parsed);
  const { error: upErr } = await sb
    .from('case_studies')
    .update({ results: JSON.stringify(next) })
    .eq('slug', slug);
  if (upErr) console.error(`${slug}: update failed`, upErr.message);
  else console.log(`${slug} updated`);
}

async function main() {
  // GEM Services — add website
  await update('gem-services', (r) => ({
    ...r,
    website: 'https://www.gemservices.uk/',
  }));

  // Servoro — drop "FM buyers" jargon
  await update('servoro', (r) => ({
    ...r,
    metrics: [
      'Built from scratch, ready for launch day',
      'Mobile-first, fast-loading',
      'An enquiry form that asks the right questions up front',
    ],
  }));

  console.log('done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
