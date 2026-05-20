/* eslint-disable no-console */
/**
 * Adds Casa Heather website URL and reframes copy to acknowledge
 * the client's deliberate choice not to renew their custom domain.
 *
 * Run: npx tsx scripts/updateCasaHeather.ts
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing env');
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const casaHeatherResults = {
  businessName: 'Casa Heather',
  industry: 'Luxury Holiday Villa',
  town: 'Spain',
  website: 'https://jl1795.wixsite.com/websitewww',
  websiteNote:
    'Casa Heather chose not to renew their custom domain after the launch period — the villa is no longer actively marketed to new customers, so the original build now lives at its Wix preview URL.',
  services_used: 'Visually led Website, SEO Foundations',
  challenge:
    'Casa Heather wanted a website that reflected the quality of the property and supported direct enquiries rather than relying solely on third-party booking platforms.',
  solution:
    'A visually led website designed with a clean layout and strong imagery to showcase the villa’s features. Copy written to feel considered and approachable, guiding visitors smoothly through the property details and the enquiry flow. SEO foundations to support international villa rental searches.',
  resultsSummary:
    'Casa Heather launched with a polished, professional website that supported direct booking enquiries. The owner later chose not to renew the custom domain as the property is no longer being actively marketed, so the build now lives at its original Wix preview URL.',
  metrics: [
    'Visually led design built around the property’s strengths',
    'A direct enquiry flow that did not depend on booking platforms',
    'SEO foundations for international villa rental searches',
  ],
};

async function main() {
  const { error } = await sb
    .from('case_studies')
    .update({
      summary:
        'A visually led website for a luxury villa, designed to support direct booking enquiries and present the property confidently to an international audience.',
      results: JSON.stringify(casaHeatherResults),
    })
    .eq('slug', 'casa-heather');
  if (error) {
    console.error('casa-heather:', error.message);
    process.exit(1);
  }
  console.log('casa-heather updated');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
