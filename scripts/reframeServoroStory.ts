/* eslint-disable no-console */
/**
 * Reframes Servoro's case study challenge — they're a new company launching,
 * not a business rescued from invisibility.
 *
 * Run: npx tsx scripts/reframeServoroStory.ts
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing env');
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const servoroResults = {
  businessName: 'Servoro',
  industry: 'Facilities Management',
  town: 'Kent',
  website: 'https://www.servoro.co.uk',
  services_used: 'Website Build, Brand Foundations',
  challenge:
    'Servoro launched as a new facilities management firm and wanted the website at the heart of that launch. They needed something clean, properly structured and professional from day one, with an enquiry flow that captured the right details up front and read like an established business from the moment it went live.',
  solution:
    'We built the site end to end before launch. Clear service explanations, a structure tuned to how facilities management buyers actually search and decide, fast loads, mobile-first design, and an enquiry flow that captures the right details to qualify each lead. The site went live alongside the business, not bolted on afterwards.',
  resultsSummary:
    'A new facilities management firm launching with a real, professional online presence from day one. Built to win the kind of enquiries the business actually wants.',
  metrics: [
    'Built from scratch, ready for launch day',
    'Mobile-first, fast-loading',
    'Structured enquiry capture for FM buyers',
  ],
};

async function main() {
  const { error } = await sb
    .from('case_studies')
    .update({
      summary:
        'A new facilities management firm launching with a properly built website at the heart of the go-to-market.',
      results: JSON.stringify(servoroResults),
    })
    .eq('slug', 'servoro');
  if (error) {
    console.error('servoro:', error.message);
    process.exit(1);
  }
  console.log('servoro reframed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
