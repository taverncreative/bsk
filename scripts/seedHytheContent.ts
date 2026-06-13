/* eslint-disable no-console */
/**
 * Add Hythe to the grid.
 *
 * Run with: npx tsx scripts/seedHytheContent.ts
 *
 * Does three things, all idempotent:
 *   1. Upserts the Hythe town row (towns table).
 *   2. Upserts 3 core local_content rows (web-design, seo, lead-capture).
 *      Business-automation is intentionally NOT seeded yet — /business-automation-hythe
 *      will generate (200) but stay noindex,follow via the thin-content guardrail
 *      until/unless it gets its own genuinely-local content.
 *   3. Surgically de-emphasises Hythe targeting in the Folkestone seo + web-design
 *      local_content rows so the new /{service}-hythe pages own Hythe terms.
 *      Each edit is an exact-string replacement that no-ops if already applied and
 *      WARNS loudly if its target string is missing (content drift), never silently skips.
 *
 * Content is hand-authored for Hythe (Cinque Port, Royal Military Canal, shingle
 * seafront, independent High Street, RH&D Railway, biennial Venetian Fete, Romney
 * Marsh edge, affluent/retiree/second-home base, no mainline station). Shared
 * local_context + competition_landscape are written once and reused across the 3.
 *
 * Run this against prod BEFORE pushing the next.config.ts redirect removal, so the
 * Vercel rebuild's generateStaticParams sees Hythe and renders the pages with content.
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceKey) {
  console.error('Missing env (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)');
  process.exit(1);
}
const sb = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const TOWN_SLUG = 'hythe';

// ── 1. Town row ────────────────────────────────────────────────────────────
const TOWN_ROW = {
  name: 'Hythe',
  slug: 'hythe',
  county: 'Kent',
  population: '14,604',
  latitude: 51.0729,
  longitude: 1.0791,
  intro:
    "Hythe is a historic Cinque Port town on the Kent coast, where the Royal Military Canal runs behind a long shingle seafront and an independent High Street of antiques shops, delis and family-run businesses. Quieter and more affluent than neighbouring Folkestone, it draws steady trade from residents, second-home owners and visitors arriving on the Romney, Hythe & Dymchurch Railway or for the biennial Venetian Fete. We help Hythe businesses turn that local loyalty and seasonal footfall into online enquiries — websites, SEO and automations built properly for a small coastal market.",
};

// ── 2. Shared per-town fields (written once, reused by all 3 services) ───────
const SHARED_LOCAL_CONTEXT =
  "Hythe is one of the original Cinque Ports: a small, well-off town on the Kent coast where the Royal Military Canal runs behind a long shingle seafront and the High Street is still genuinely independent — antiques shops, delis, a butcher, galleries and family-run cafes rather than chains. At roughly fourteen and a half thousand people it is a fraction of the size of Folkestone four miles east, and it trades on a different character: older and more affluent, with a large contingent of retirees and second-home owners, plus a steady seasonal pull from tourism. The Romney, Hythe & Dymchurch Railway has its eastern terminus here, the biennial Venetian Fete lights up the canal, and the town sits on the eastern edge of Romney Marsh with Saltwood, Sandgate, Seabrook, Lympne and West Hythe in its immediate orbit. One detail shapes everything: Hythe has no mainline station of its own — Sandling and Folkestone West are the nearest — so unlike Folkestone or Gravesend it was never a London commuter town. It is a self-contained market of residents, visitors, and the trades that look after a high-value, older property stock.";

const SHARED_COMPETITION_LANDSCAPE =
  "The defining quirk of the Hythe market is that much of the visibility for 'Hythe' searches is held by businesses based in Folkestone, who treat Hythe as catchment rather than home turf. That is the opportunity: a genuinely Hythe-based business whose website and Google Business Profile say Hythe — not 'Folkestone and surrounding areas' — can own its own town's searches relatively easily, because few local rivals are competing for them properly. Beyond that the picture is familiar: directory aggregators like Checkatrade and Bark sit above everyone on trade searches and take a cut of each lead, while template Wix and Squarespace builds crowd the budget end. What is different here is the audience. Hythe's customers skew older and more affluent, so trust outweighs flash — genuine reviews, a real Hythe address, clear pricing where you have it, and a site that loads cleanly on the phone in someone's hand matter more than animation.";

// ── 3. The 3 core local_content rows ────────────────────────────────────────
const ROWS = [
  {
    service_slug: 'web-design',
    layout_variant: 'lead-gen',
    intro_paragraph:
      "Hythe is a town that buys on trust, not gimmicks. Its customers are older, comfortable and do their homework — they will look you up, read your reviews and judge your business by your website before they call. Add the second-home owners furnishing coastal property, the holiday lets around the canal and seafront, and the independent High Street traders competing with online retail, and you have a market that genuinely rewards a clear, credible website. We build sites for Hythe businesses that load fast on a phone, say plainly what you do and who you serve, and look like they belong to a real local business rather than a template. £280 for a classic small business site, £18 a month to host it. The same checks for speed, security and SEO a £3,000 build would get, without the £3,000.",
    success_approach:
      "We design Hythe sites for how this town actually decides. The retiree comparing tradespeople wants clarity and reassurance, not clever animation. The visitor researching where to eat or stay before they arrive wants your hours, location and a way to book in two taps. The High Street independent needs a site that captures the character a chain never could. So we build mobile-first, keep loads under two seconds, put pricing in the open where you have it, and set up your Google Business Profile alongside the site. We write for the real catchment — Saltwood, Sandgate, Seabrook and West Hythe — rather than leaving Google to guess where you work.",
    pain_points: [
      {
        title: "Your site doesn't reflect a town that buys on trust",
        description:
          "Hythe's older, more affluent customers research carefully before they commit. A dated or template site quietly tells them you might be dated too, and they move on to the business that looks like it takes itself seriously.",
      },
      {
        title: 'Seasonal and visitor trade is slipping past you',
        description:
          "Tourists walking the canal, riding the miniature railway or staying nearby check businesses on their phones in the moment. If your site is slow or unclear on mobile, that footfall converts for someone else.",
      },
      {
        title: 'Folkestone businesses are taking your Hythe searches',
        description:
          "A lot of the firms appearing for 'Hythe' work are based in Folkestone and treat you as catchment. A website that clearly belongs in Hythe is the simplest way to win those searches back.",
      },
    ],
    solutions: [
      {
        title: 'Built for an audience that reads before it buys',
        description:
          "Clear structure, real photography, reviews surfaced, pricing shown where you can. The signals an older, careful Hythe customer looks for before picking up the phone.",
      },
      {
        title: 'Fast and clean on a phone by the seafront',
        description:
          "Sub-two-second loads and a layout that works one-handed, so visitors browsing the High Street or the canal can find your hours, your menu or your booking link without pinching and zooming.",
      },
      {
        title: 'Indexed as a Hythe business from day one',
        description:
          "Sitemap submitted, local-business structured data, Google Business Profile aligned to Hythe and the surrounding villages. Google, and the AI search tools coming up fast, can place you in the right town immediately.",
      },
    ],
    faqs: [
      {
        question: "Do you build for Hythe's tourism and seasonal businesses?",
        answer:
          "Yes. Holiday lets, cafes and visitor-facing businesses around the canal, the seafront and the Romney, Hythe & Dymchurch Railway need a site that captures enquiries and bookings in the moment, on mobile, including out of season. We build for that seasonal rhythm rather than a generic always-on shop.",
      },
      {
        question: "I'm a trade covering Hythe, Saltwood and Sandgate — can the site target all of them?",
        answer:
          "That is exactly how we build. Rather than a single 'Hythe' page, we create content and local signals for the villages you actually serve — Saltwood, Sandgate, Seabrook, West Hythe — so you show up across your real working area, not just the town centre.",
      },
      {
        question: 'How does the £280 work?',
        answer:
          "£280 covers a classic small business site — homepage, services, about, contact and a couple of supporting pages — designed, built, launched and indexed by Google. Hosting is £18 a month for SSL, backups and security. E-commerce or anything custom is priced on application.",
      },
    ],
    local_stats: {
      population: 14604,
      key_areas: ['High Street', 'Royal Military Canal', 'Seafront', 'Saltwood', 'Sandgate', 'Seabrook', 'West Hythe'],
      nearest_stations: 'Sandling and Folkestone West (no station in Hythe itself)',
    },
  },
  {
    service_slug: 'seo',
    layout_variant: 'authority',
    intro_paragraph:
      "SEO in Hythe comes with a quirk you can use. Much of the visibility for 'Hythe' terms is held by businesses based in Folkestone who list Hythe as one of many catchment areas — which means a genuinely Hythe-based business can rank for its own town more easily than the competition suggests. Add a tourism layer (people searching for the railway, the canal, places to eat and stay) and an affluent resident base searching for trades and professional services, and there is real, winnable demand. We do proper SEO for Hythe businesses at £45 an hour, no rolling contract — you see exactly what got done and what moved. Most Hythe clients start with an hour or two a month and scale once they see what is achievable in a market this size.",
    success_approach:
      "Our Hythe SEO approach starts by claiming the town properly: a Google Business Profile and on-site content that say Hythe, not 'Folkestone and surrounding areas', so you stop ceding your own searches to firms four miles away. From there we build the long tail of nearby places — Saltwood, Sandgate, Seabrook, Lympne, West Hythe — where competition is thin and rankings come quickly. For visitor-facing businesses we layer in seasonal, intent-led content tied to what people search before a trip: the Romney, Hythe & Dymchurch Railway, the Royal Military Canal, the Venetian Fete in its years. It is a smaller market than Folkestone or Canterbury, which is exactly why focused work pays off fast.",
    pain_points: [
      {
        title: 'Folkestone firms are ranking for your town',
        description:
          "Search a service plus 'Hythe' and many of the results are Folkestone-based businesses listing Hythe as catchment. They are winning searches a properly optimised Hythe business should own.",
      },
      {
        title: "Nobody's targeting the surrounding villages",
        description:
          'Saltwood, Sandgate, Seabrook, Lympne and West Hythe are low-competition searches with real money behind them, and almost no local business has built content to capture them.',
      },
      {
        title: 'Seasonal visitor demand goes uncaptured',
        description:
          "People research Hythe before they visit — the railway, the canal, where to eat and stay — but few local businesses publish anything that surfaces for those searches, so the traffic lands on TripAdvisor and aggregators instead.",
      },
    ],
    solutions: [
      {
        title: "Own 'Hythe' before Folkestone does",
        description:
          'We align your Google Business Profile and on-page content to Hythe specifically, with the categories, service descriptions and local signals that let you outrank catchment-only listings from neighbouring towns.',
      },
      {
        title: 'Win the village long tail',
        description:
          'Genuine, dedicated content for Saltwood, Sandgate, Seabrook, Lympne and West Hythe — the smaller phrases where a Hythe business can reach page one in weeks, not months.',
      },
      {
        title: 'Capture the seasonal and visitor searches',
        description:
          'For tourism-facing businesses we build content timed to Hythe’s calendar — the railway season, summer on the canal, Venetian Fete years — so you are already ranking when the searches spike.',
      },
    ],
    faqs: [
      {
        question: 'Why am I being outranked by Folkestone businesses for Hythe searches?',
        answer:
          "Because they have listed Hythe as a catchment area and you may not have claimed it clearly yourself. The good news is they are not really competing for Hythe — they are competing for everywhere at once. A focused Hythe profile and Hythe-specific content typically reclaims those searches faster than people expect.",
      },
      {
        question: 'Is Hythe too small for SEO to be worth it?',
        answer:
          'No, and small actually helps. Competition for genuinely Hythe-specific terms is low, so your investment goes further and rankings come quicker than in Canterbury or Maidstone. Add the seasonal tourist demand and the affluent local base, and the effective market is bigger than the population suggests.',
      },
      {
        question: 'Should I target the surrounding villages too?',
        answer:
          'Yes — that is often where the quickest wins are. Saltwood, Sandgate, Seabrook, Lympne and West Hythe have real demand and almost no one optimising for them. We build a little genuine content for each area you serve rather than relying on one Hythe page to do everything.',
      },
    ],
    local_stats: {
      population: 14604,
      key_search_areas: ['Hythe', 'Saltwood', 'Sandgate', 'Seabrook', 'Lympne', 'West Hythe', 'Palmarsh'],
      seasonal_drivers: ['Romney, Hythe & Dymchurch Railway', 'Royal Military Canal', 'Venetian Fete'],
    },
  },
  {
    service_slug: 'lead-capture',
    layout_variant: 'lead-gen',
    intro_paragraph:
      "Hythe businesses lose enquiries in the gaps — the call that goes to voicemail while you are on a job in Saltwood, the holiday-let booking question that arrives at 9pm out of season, the form buried in an inbox. In a small, word-of-mouth town that matters twice over: an affluent customer who does not get a quick, personal reply just rings the next name, and a missed visitor enquiry in season is a booking gone for good. We build lead capture systems that close those gaps — forms that get filled, instant replies, missed-call text-back, gentle follow-ups. Priced on the brief once we know how enquiries reach you now.",
    success_approach:
      "Lead capture in Hythe is really about response speed and a personal tone, because the customer base expects both. We make sure no enquiry waits more than a few minutes for a useful first response, even when you are on a job along the coast — missed-call text-back for trades, instant booking acknowledgements for lets and hospitality, and short follow-up sequences in your own voice rather than corporate boilerplate an older, discerning Hythe customer would see straight through. For seasonal businesses we tune it so out-of-season enquiries are captured and nurtured, not lost in the quiet months.",
    pain_points: [
      {
        title: 'Voicemail loses you the job',
        description:
          'Hythe trades are often single-handed and out on coastal property when the phone rings. An affluent customer who hits voicemail rarely leaves one — they just call the next firm on the list.',
      },
      {
        title: 'Out-of-season enquiries vanish',
        description:
          'Holiday lets and visitor businesses get questions year-round, but quiet-month enquiries are easy to miss when you have mentally switched off. Each one is a booking you have effectively given away.',
      },
      {
        title: 'Quotes go quiet with no follow-up',
        description:
          'You send a quote to a homeowner in Saltwood or Seabrook and hear nothing. Most quotes need one polite nudge to convert, and almost no small Hythe business is sending them.',
      },
    ],
    solutions: [
      {
        title: 'Missed-call text-back',
        description:
          'Miss a call on a job and an automatic text fires within seconds with a friendly message and a callback time or booking link. The customer stays yours instead of dialling the next number.',
      },
      {
        title: 'Instant booking and enquiry replies',
        description:
          'Every form or booking question gets an immediate, personal-sounding acknowledgement — what happens next and when to expect you — so visitors and residents feel looked after from the first second.',
      },
      {
        title: 'Two-step quote follow-up',
        description:
          'A polite check-in a couple of days after a quote and a final friendly nudge a week later, in your voice. Quietly recovers a meaningful share of the quotes that would otherwise go cold.',
      },
    ],
    faqs: [
      {
        question: "I'm a one-person trade covering Hythe and the villages — will this actually help?",
        answer:
          'It helps solo trades most. When you are on a roof in Sandgate you cannot answer the phone, and that is exactly when missed-call text-back keeps the enquiry warm. The whole system runs in the background so you capture work without stopping the work you are already doing.',
      },
      {
        question: 'Can it handle holiday-let and seasonal booking enquiries?',
        answer:
          'Yes. We set up instant acknowledgements for booking questions and follow-ups that keep enquiries warm through the quiet months, so out-of-season interest converts instead of being forgotten until it is too late.',
      },
      {
        question: 'How much does it cost?',
        answer:
          'Priced on the brief once we see how enquiries currently reach you. A simple setup for a small Hythe business is usually in the low hundreds; adding calendar booking, CRM integration or AI-assisted routing scales up from there.',
      },
    ],
    local_stats: {
      population: 14604,
      key_areas: ['Hythe', 'Saltwood', 'Sandgate', 'Seabrook', 'West Hythe'],
      audience: 'Affluent and older residents, second-home owners, seasonal visitors',
    },
  },
];

// ── Folkestone de-emphasis: exact-string replacements (preserve "Folkestone &
//    Hythe District" proper nouns; leave key_areas; only seo + web-design rows) ──
type Pair = [string, string];
const FOLKESTONE_EDITS: Record<string, Partial<Record<string, Pair[]>>> = {
  seo: {
    intro_paragraph: [
      [
        'the residential areas around Cheriton, or the neighbouring town of Hythe, SEO is no longer optional',
        'the residential areas around Cheriton, or the affluent micro-market of Sandgate, SEO is no longer optional',
      ],
    ],
    success_approach: [
      [
        'optimise Google Business Profiles for the specific Folkestone and Hythe categories that matter',
        'optimise Google Business Profiles for the specific Folkestone categories that matter',
      ],
    ],
    local_context: [
      [
        'Sandgate functions as an affluent micro-market with its own search patterns, while Hythe serves as both a competitor and a complementary catchment.',
        'Sandgate functions as an affluent micro-market with its own search patterns.',
      ],
    ],
    pain_points: [
      ['No strategy targeting the expanding Folkestone and Hythe catchment', 'No strategy targeting the expanding Folkestone catchment'],
      ['Cheriton, Sandgate, Hythe, and potentially further along the coast', 'Cheriton, Sandgate, and potentially further along the coast'],
    ],
    solutions: [
      ['year-round residential searches across Cheriton, Sandgate, and Hythe.', 'year-round residential searches across Cheriton and Sandgate.'],
      ['Dedicated content for Sandgate, Hythe, and Cheriton ensures', 'Dedicated content for Sandgate and Cheriton ensures'],
    ],
    faqs: [
      ['Should I target Hythe and Sandgate searches as well?', 'Should I target Sandgate and Cheriton searches as well?'],
      ['Many Folkestone businesses draw customers from Sandgate, Hythe, and beyond.', 'Many Folkestone businesses draw customers from Sandgate, Cheriton, and beyond.'],
    ],
  },
  'web-design': {
    intro_paragraph: [
      ['the local tradesperson serving Sandgate and Hythe', 'the local tradesperson serving Sandgate and Cheriton'],
    ],
    local_context: [
      [
        'Sandgate Road connects the town centre to the affluent coastal village of Sandgate, while Hythe sits just along the coast as a complementary market.',
        'Sandgate Road connects the town centre to the affluent coastal village of Sandgate.',
      ],
    ],
    faqs: [
      ['local SEO configured for Folkestone, Sandgate, Hythe, and surrounding area searches', 'local SEO configured for Folkestone, Sandgate, and surrounding area searches'],
      ['Do you work with businesses in Sandgate and Hythe as well?', 'Do you work with businesses in Sandgate and Cheriton as well?'],
      ['serve the broader coastal strip from Sandgate through to Hythe and beyond', 'serve the broader coastal strip from Sandgate through to Cheriton and beyond'],
    ],
  },
};

const ARRAY_FIELDS = new Set(['pain_points', 'solutions', 'faqs']);

async function upsertTown() {
  const { data: existing } = await sb.from('towns').select('id').eq('slug', TOWN_SLUG).maybeSingle();
  if (existing?.id) {
    const { error } = await sb.from('towns').update(TOWN_ROW).eq('id', existing.id);
    console.log(error ? `town hythe: ERROR ${error.message}` : 'town hythe: updated');
  } else {
    const { error } = await sb.from('towns').insert(TOWN_ROW);
    console.log(error ? `town hythe: ERROR ${error.message}` : 'town hythe: inserted');
  }
}

async function upsertLocalContent() {
  for (const row of ROWS) {
    const payload = { town_slug: TOWN_SLUG, local_context: SHARED_LOCAL_CONTEXT, competition_landscape: SHARED_COMPETITION_LANDSCAPE, ...row };
    const { data: existing } = await sb
      .from('local_content')
      .select('id')
      .eq('town_slug', TOWN_SLUG)
      .eq('service_slug', row.service_slug)
      .maybeSingle();
    if (existing?.id) {
      const { error } = await sb.from('local_content').update(payload).eq('id', existing.id);
      console.log(error ? `hythe/${row.service_slug}: ERROR ${error.message}` : `hythe/${row.service_slug}: updated`);
    } else {
      const { error } = await sb.from('local_content').insert(payload);
      console.log(error ? `hythe/${row.service_slug}: ERROR ${error.message}` : `hythe/${row.service_slug}: inserted`);
    }
  }
}

async function applyFolkestoneEdits() {
  for (const [svc, fields] of Object.entries(FOLKESTONE_EDITS)) {
    const { data, error: fetchErr } = await sb
      .from('local_content')
      .select('*')
      .eq('town_slug', 'folkestone')
      .eq('service_slug', svc)
      .single();
    if (fetchErr || !data) {
      console.log(`folkestone/${svc}: ERROR fetching (${fetchErr?.message})`);
      continue;
    }
    const update: Record<string, unknown> = {};
    let applied = 0;
    for (const [field, pairs] of Object.entries(fields)) {
      const isArray = ARRAY_FIELDS.has(field);
      let cur = isArray ? JSON.stringify(data[field]) : (data[field] as string);
      for (const [from, to] of pairs!) {
        if (!cur.includes(from)) {
          console.warn(`  WARN folkestone/${svc}.${field}: target not found (drift?): "${from.slice(0, 50)}..."`);
          continue;
        }
        cur = cur.split(from).join(to);
        applied++;
        console.log(`  ✓ ${svc}.${field}`);
        console.log(`      - ${from}`);
        console.log(`      + ${to}`);
      }
      update[field] = isArray ? JSON.parse(cur) : cur;
    }
    const { error } = await sb.from('local_content').update(update).eq('id', data.id);
    console.log(error ? `folkestone/${svc}: ERROR ${error.message}` : `folkestone/${svc}: de-emphasis applied (${applied} replacements)`);
  }
}

async function main() {
  console.log('— Hythe town row —');
  await upsertTown();
  console.log('\n— Hythe local_content (3 core) —');
  await upsertLocalContent();
  console.log('\n— Folkestone de-emphasis —');
  await applyFolkestoneEdits();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
