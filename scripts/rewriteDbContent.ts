/* eslint-disable no-console */
/**
 * Rewrite DB content to match new homepage tone.
 *
 * - services: full description rewrite
 * - industries: pain_point + description rewrite
 * - local_content: targeted phrase substitution
 * - faqs: targeted phrase substitution
 *
 * Run with:  npx tsx scripts/rewriteDbContent.ts
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY. Idempotent except for the substitution
 * passes — running twice is fine but won't undo replacements.
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

// ---------- services ----------
const serviceUpdates: Record<string, { name?: string; description: string }> = {
  'web-design': {
    name: 'Websites',
    description:
      '£280 for a classic small business website. E-commerce and anything custom priced on application. Built right, indexed cleanly, yours in 1 to 2 weeks.',
  },
  seo: {
    name: 'SEO',
    description:
      '£45 an hour of real SEO work, from one hour a month, no rolling contract. You see what got done and what it ranked for.',
  },
  'lead-capture': {
    name: 'Lead capture',
    description:
      'Forms, instant replies and missed-call recovery so a busy day does not cost you the lead. Priced on the brief.',
  },
  'business-automation': {
    name: 'Automations',
    description:
      'CRM setup, follow-ups, job tracking, repeat invoicing. The repeat work that eats your Sundays, handled. Priced on the brief.',
  },
  branding: {
    description:
      'A logo, palette, typography system and one-page brand reference. For businesses who want something that looks designed, not generated. Priced on the brief.',
  },
  'social-media-setup': {
    description: 'Social media profiles set up properly the first time, branded consistently, pointed at the work you want to win. Priced on the brief.',
  },
  'digital-marketing': {
    description: 'Social media profiles set up properly the first time, branded consistently, pointed at the work you want to win. Priced on the brief.',
  },
  'workwear-print': {
    description:
      'Workwear, business cards, signage and vehicle graphics. Sorted alongside your website so it all matches. Priced on the brief.',
  },
  'ai-chatbots': {
    description:
      'A chatbot trained on your business that handles repeat enquiries, books appointments and hands off when it matters. Priced on the brief.',
  },
  'ai-content': {
    description:
      'AI-assisted blog posts, service pages and landing copy, edited by hand. Does not read like AI content. Priced on the brief.',
  },
  'ai-automation': {
    description:
      'Email triage, follow-ups, document drafting, data sorting. The mundane bits handled. Priced on the brief.',
  },
};

// ---------- industries ----------
const industryUpdates: Record<
  string,
  { description?: string; pain_point?: string }
> = {
  accountants: {
    description: 'Bookkeeping, tax and SME financial services.',
    pain_point: 'Standing out among the other firms when clients search online.',
  },
  builders: {
    description: 'Construction firms, extensions, renovations and new builds.',
    pain_point: 'Winning higher-value extension and renovation projects, not just small jobs.',
  },
  carpenters: {
    description: 'Bespoke joinery, fitted furniture, installations and restoration.',
    pain_point: 'Showing the quality of bespoke work online so it reaches the right customers.',
  },
  'cleaning-companies': {
    description: 'Domestic, commercial and end-of-tenancy cleaning.',
    pain_point: 'Booking regular contracts rather than one-off jobs.',
  },
  'driveway-installers': {
    description: 'Block paving, resin, tarmac and driveway repairs.',
    pain_point: 'Reaching homeowners doing major outdoor projects, not just small repairs.',
  },
  electricians: {
    description: 'Domestic and commercial electrical work, EICRs and EV chargers.',
    pain_point: 'Being the name local homeowners think of for non-emergency rewires and upgrades.',
  },
  'garden-services': {
    description: 'Maintenance, hedge cutting, lawn care and seasonal tidy-ups.',
    pain_point: 'Securing year-round contracts rather than only summer one-offs.',
  },
  'holiday-lets': {
    description: 'Short-term rentals, holiday cottages and serviced accommodation.',
    pain_point: 'Direct bookings instead of giving away margin to OTA platforms.',
  },
  landscapers: {
    description: 'Garden design, hard landscaping, lawns and outdoor builds.',
    pain_point: 'Reaching homeowners doing larger garden projects rather than small jobs.',
  },
  'letting-agents': {
    description: 'Residential lettings, property management and tenant finding.',
    pain_point: 'Standing out in a saturated market and winning landlord instructions.',
  },
  'painters-and-decorators': {
    description: 'Interior and exterior painting, wallpapering and decorating.',
    pain_point: 'Securing full-house projects rather than single rooms.',
  },
  plumbers: {
    description: 'Domestic plumbing, boilers, bathrooms and heating systems.',
    pain_point: 'Being the firm chosen for bathroom and heating projects, not just emergencies.',
  },
  'property-maintenance': {
    description: 'Multi-skilled property repairs and maintenance for landlords and homeowners.',
    pain_point: 'Building ongoing relationships with landlords and managing agents.',
  },
  'removal-companies': {
    description: 'House moves, business relocation and packing services.',
    pain_point: 'Being seen as the trusted option rather than the cheapest.',
  },
  roofers: {
    description: 'Roof repairs, replacements, flat roofs and gutter work.',
    pain_point: 'Booking planned-replacement projects rather than only urgent repairs.',
  },
  solicitors: {
    description: 'Conveyancing, family, employment, wills and probate.',
    pain_point: 'Being chosen for higher-value work in a market crowded with firms.',
  },
};

// ---------- targeted phrase replacements for long-form content ----------
const REPLACEMENTS: { pattern: RegExp; replacement: string }[] = [
  // Alarmist framing
  { pattern: /\byou(?:'|’)?re invisible\b/gi, replacement: 'you’re not showing up' },
  { pattern: /\binvisible (online|on Google)\b/gi, replacement: 'not showing up $1' },
  { pattern: /\byou(?:'|’)?re losing (leads|customers|enquiries|jobs)\b/gi, replacement: 'you’re missing $1' },
  { pattern: /\blost to (your )?competitors\b/gi, replacement: 'going to other firms' },
  { pattern: /\bcompetitors (are|will) (steal|take)/gi, replacement: 'other firms can pick up' },
  // Marketing-speak
  { pattern: /\bdominate (local|the) (Google )?(search results|rankings|search radius)\b/gi, replacement: 'show up in $1 Google search' },
  { pattern: /\bdominate (local|your) (search|market)\b/gi, replacement: 'show up properly in $1 $2' },
  { pattern: /\btop-tier\b/gi, replacement: 'considered' },
  { pattern: /\bimmediately impactful\b/gi, replacement: 'useful' },
  { pattern: /\bdeploy our\b/gi, replacement: 'do our' },
  { pattern: /\bdeployed\b/gi, replacement: 'used' },
  { pattern: /\bdeploy (a |the )?/gi, replacement: 'use $1' },
  { pattern: /\bengineered\b/gi, replacement: 'built' },
  { pattern: /\bengineering-led\b/gi, replacement: 'considered' },
  { pattern: /\bhigh-end\b/gi, replacement: 'considered' },
  { pattern: /\bpremium\b/g, replacement: 'considered' },
  { pattern: /\bcompounds? (year on year|reliably)/gi, replacement: 'adds up over time' },
  { pattern: /\bsystematic(ally)?\b/gi, replacement: 'consistently' },
  { pattern: /\baggressive(ly)?\b/gi, replacement: 'consistently' },
  { pattern: /\bauthority (engine|platform|brand)\b/gi, replacement: '$1' },
  { pattern: /\bmathematical engine\b/gi, replacement: 'system' },
  { pattern: /\bbleeding (enquiries|leads|customers|revenue)\b/gi, replacement: 'losing $1' },
  { pattern: /\bextraordinarily\b/gi, replacement: 'genuinely' },
  { pattern: /\bsurrender (margin|revenue)\b/gi, replacement: 'lose $1' },
  // Generic FAQ filler
  { pattern: /\bdeep understanding\b/gi, replacement: 'understanding' },
  { pattern: /\bhighly relevant\b/gi, replacement: 'relevant' },
  { pattern: /\btruly considered\b/gi, replacement: 'considered' },
  // Common em dashes — replace with full stop + space for clean sentences
  { pattern: / — /g, replacement: ', ' },
  { pattern: /—/g, replacement: ',' },
];

function rewrite(text: string | null | undefined): string | null {
  if (!text) return text ?? null;
  let out = text;
  for (const { pattern, replacement } of REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

function rewriteJsonField(value: any): any {
  if (value == null) return value;
  if (typeof value === 'string') return rewrite(value);
  if (Array.isArray(value)) return value.map(rewriteJsonField);
  if (typeof value === 'object') {
    const out: any = {};
    for (const k of Object.keys(value)) out[k] = rewriteJsonField(value[k]);
    return out;
  }
  return value;
}

async function updateServices() {
  console.log('--- services ---');
  for (const slug of Object.keys(serviceUpdates)) {
    const patch = serviceUpdates[slug];
    const { error } = await sb.from('services').update(patch).eq('slug', slug);
    if (error) console.error(`services/${slug}:`, error.message);
    else console.log(`services/${slug} updated`);
  }
}

async function updateIndustries() {
  console.log('--- industries ---');
  for (const slug of Object.keys(industryUpdates)) {
    const patch = industryUpdates[slug];
    const { error } = await sb.from('industries').update(patch).eq('slug', slug);
    if (error) console.error(`industries/${slug}:`, error.message);
    else console.log(`industries/${slug} updated`);
  }
}

async function sweepIndustriesLongform() {
  console.log('--- industries (long-form sweep) ---');
  const { data, error } = await sb
    .from('industries')
    .select('id, overview_text, strategy_text, opportunity_seo, opportunity_automation');
  if (error) { console.error(error.message); return; }
  for (const row of data || []) {
    const patch = {
      overview_text: rewrite(row.overview_text),
      strategy_text: rewrite(row.strategy_text),
      opportunity_seo: rewrite(row.opportunity_seo),
      opportunity_automation: rewrite(row.opportunity_automation),
    };
    const { error: upErr } = await sb.from('industries').update(patch).eq('id', row.id);
    if (upErr) console.error(`industries/${row.id}:`, upErr.message);
  }
  console.log(`swept ${data?.length || 0} industries rows`);
}

async function sweepLocalContent() {
  console.log('--- local_content sweep ---');
  const { data, error } = await sb
    .from('local_content')
    .select('id, intro_paragraph, local_context, competition_landscape, success_approach, pain_points, solutions, faqs');
  if (error) { console.error(error.message); return; }
  let updated = 0;
  for (const row of data || []) {
    const patch = {
      intro_paragraph: rewrite(row.intro_paragraph),
      local_context: rewrite(row.local_context),
      competition_landscape: rewrite(row.competition_landscape),
      success_approach: rewrite(row.success_approach),
      pain_points: rewriteJsonField(row.pain_points),
      solutions: rewriteJsonField(row.solutions),
      faqs: rewriteJsonField(row.faqs),
    };
    const { error: upErr } = await sb.from('local_content').update(patch).eq('id', row.id);
    if (upErr) console.error(`local_content/${row.id}:`, upErr.message);
    else updated++;
  }
  console.log(`swept ${updated} local_content rows`);
}

async function sweepFaqs() {
  console.log('--- faqs sweep ---');
  const { data, error } = await sb.from('faqs').select('id, question, answer');
  if (error) { console.error(error.message); return; }
  let updated = 0;
  for (const row of data || []) {
    const patch = {
      question: rewrite(row.question),
      answer: rewrite(row.answer),
    };
    const { error: upErr } = await sb.from('faqs').update(patch).eq('id', row.id);
    if (upErr) console.error(`faqs/${row.id}:`, upErr.message);
    else updated++;
  }
  console.log(`swept ${updated} faqs rows`);
}

async function main() {
  await updateServices();
  await updateIndustries();
  await sweepIndustriesLongform();
  await sweepLocalContent();
  await sweepFaqs();
  console.log('done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
