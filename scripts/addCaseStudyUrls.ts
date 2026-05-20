/* eslint-disable no-console */
/**
 * Bulk URL updates for case studies + corrections:
 *  - taverncreative.com
 *  - drymilesrecovery instagram (original site not renewed, built 2022)
 *  - sjluxurycreations.co.uk
 *  - eis-uk.com (Excel Inspection Solutions)
 *  - kentiphonerepair.co.uk
 *  - Servoro: town → London
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing env');
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

async function patch(slug: string, mutator: (results: any) => any) {
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
  await patch('taverncreative', (r) => ({ ...r, website: 'https://taverncreative.com/' }));

  await patch('dry-miles', (r) => ({
    ...r,
    website: 'https://www.instagram.com/drymilesrecovery/',
    websiteNote:
      'Original Dry Miles site built in 2022. The custom domain was not renewed afterwards — the brand now lives on Instagram, where this case study links to.',
  }));

  await patch('sj-luxury-creations', (r) => ({ ...r, website: 'https://www.sjluxurycreations.co.uk/' }));

  await patch('excel-inspection-solutions', (r) => ({ ...r, website: 'https://www.eis-uk.com/' }));

  await patch('kent-iphone-repair', (r) => ({ ...r, website: 'https://www.kentiphonerepair.co.uk/' }));

  // Servoro: town is London, not Kent
  await patch('servoro', (r) => ({ ...r, town: 'London' }));

  console.log('done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
