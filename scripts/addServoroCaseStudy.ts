/* eslint-disable no-console */
/**
 * Adds (or upserts) the Servoro case study.
 *
 * Run with:  npx tsx scripts/addServoroCaseStudy.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}
const sb = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const slug = 'servoro';
const title = 'Servoro';

const results = {
  businessName: 'Servoro',
  industry: 'Bespoke Manufacturing',
  town: 'Kent',
  website: 'https://www.servoro.co.uk',
  services_used: 'Automations, Custom Design Tool, Order System Integration',
  challenge:
    'Servoro takes custom orders that previously needed back-and-forth conversations to nail the spec — exactly the kind of work that scales badly. Every order required a member of the team to spec the job manually, write up the quote, send it back, and track the conversation. The bottleneck was the people, not the demand.',
  solution:
    'We built Servoro a custom on-site design tool that lets customers configure exactly what they want. The tool feeds straight into an automated order workflow: spec captured, quote generated, customer notified, internal job ticket created, all without anyone touching it. New customers can go from "I want one" to "it’s in production" without a human bottleneck in the middle.',
  resultsSummary:
    'Order intake is now almost fully autonomous. The team handles exceptions and production, not paperwork. Servoro can take more orders without taking on more admin headcount.',
  metrics: [
    'Customer-facing design tool that captures full order spec',
    'Automated quote generation and order routing',
    'Almost zero manual admin per new customer order',
  ],
};

async function main() {
  // Upsert by slug
  const { data: existing } = await sb
    .from('case_studies')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  const payload = {
    title,
    slug,
    summary:
      'Customer-facing design tool + automated order system that turned a manual quote-and-spec process into an almost fully autonomous workflow.',
    results: JSON.stringify(results),
    status: 'published',
  };

  if (existing?.id) {
    const { error } = await sb.from('case_studies').update(payload).eq('id', existing.id);
    if (error) {
      console.error('update failed:', error.message);
      process.exit(1);
    }
    console.log(`updated servoro case study (id ${existing.id})`);
  } else {
    const { data, error } = await sb.from('case_studies').insert(payload).select('id').single();
    if (error) {
      console.error('insert failed:', error.message);
      process.exit(1);
    }
    console.log(`inserted servoro case study (id ${data?.id})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
