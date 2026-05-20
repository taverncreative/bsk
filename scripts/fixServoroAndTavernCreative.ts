/* eslint-disable no-console */
/**
 * Corrects two case study rows that had the wrong story attached:
 * - Servoro = facilities management website built from scratch
 * - TavernCreative = self-hosted custom automated design tool that replaced Shopify
 *
 * Run: npx tsx scripts/fixServoroAndTavernCreative.ts
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
  services_used: 'Website Build, Branding Foundations',
  challenge:
    'Servoro had no online presence at all. As a facilities management firm, they needed a clean, properly structured website that could explain what they do, build trust with prospective clients, and capture enquiries reliably from the moment it went live.',
  solution:
    'We built the site from scratch, end to end. Clear service explanations, a structure tuned to how facilities management buyers actually search and decide, fast loads, mobile-first design, and an enquiry flow that captures the right details up front to qualify each lead.',
  resultsSummary:
    'A facilities management firm with a real, professional online presence from day one — built to win the enquiries that matter.',
  metrics: [
    'Built from scratch, end to end',
    'Mobile-first, fast-loading',
    'Structured enquiry capture for FM buyers',
  ],
};

const tavernCreativeResults = {
  businessName: 'TavernCreative',
  industry: 'Custom Design Tool · Ecommerce',
  town: 'Kent',
  website: '',
  services_used: 'Custom Build, Automated Design Tool, Order Automation',
  challenge:
    'TavernCreative needed to move off Shopify. They wanted a customer-facing design tool that handled bespoke product configuration end to end, plus an order system that could run almost autonomously. Shopify could not give them the depth of customisation the product range needed.',
  solution:
    'We built a self-hosted custom design tool from the ground up. Customers configure their own orders through it — every option, every variant, real-time pricing. The tool feeds directly into an automated order workflow that captures the spec, generates the quote, notifies the team and routes the job, without anyone having to touch it.',
  resultsSummary:
    'A custom self-hosted platform that replaced Shopify entirely. Bespoke orders now flow through almost autonomously, with the team handling exceptions and production rather than admin.',
  metrics: [
    'Self-hosted, replaced Shopify',
    'Custom design tool for bespoke product configuration',
    'Almost fully autonomous order intake',
  ],
};

async function update(slug: string, title: string, summary: string, results: object) {
  const { error } = await sb
    .from('case_studies')
    .update({ title, summary, results: JSON.stringify(results) })
    .eq('slug', slug);
  if (error) console.error(`${slug}:`, error.message);
  else console.log(`updated ${slug}`);
}

async function main() {
  await update(
    'servoro',
    'Servoro',
    'A facilities management website built from scratch — fast, mobile-first, and structured to win the enquiries that matter.',
    servoroResults,
  );
  await update(
    'taverncreative',
    'TavernCreative',
    'A self-hosted custom design tool that replaced Shopify. Bespoke product configuration plus an almost-autonomous order workflow.',
    tavernCreativeResults,
  );
  console.log('done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
