/* eslint-disable no-console */
/**
 * Seed Gravesend local_content rows for the 4 core services.
 * Run with: npx tsx scripts/seedGravesendContent.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceKey) {
  console.error('Missing env');
  process.exit(1);
}
const sb = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const TOWN_SLUG = 'gravesend';

const SHARED_LOCAL_CONTEXT =
  "Gravesend sits on the south bank of the Thames, a working town of around 73,000 people that's been quietly transforming since Ebbsfleet International opened up the high-speed line to London. The High Street, Stone Street and New Road still anchor the centre, but the wider catchment now stretches to Northfleet, Istead Rise, Higham and Meopham — and the audience has shifted with it. You now serve a real mix: long-standing local trades and families who've been here for generations, a growing London commuter contingent at Ebbsfleet, and a thriving Sikh community centred around Guru Nanak Darbar with serious local spending power. The town centre regeneration plus the Ebbsfleet Garden City expansion mean demand is genuinely growing, but the businesses that win the new arrivals are the ones with a digital presence that matches the standard of what those commuters left behind in London.";

const SHARED_COMPETITION_LANDSCAPE =
  "The Gravesend market is more competitive than its size suggests. London-facing agencies pitch here at London rates because Ebbsfleet makes it commutable, while a long tail of local freelancers compete at the budget end with cookie-cutter Wix and Squarespace builds. The middle ground — properly built, properly ranked, properly priced — is where most local businesses get squeezed. Search results for Gravesend services are increasingly dominated by aggregator sites like Checkatrade and Bark eating margin off every lead. The businesses doing well online are the ones who own their own domain authority, rank for their core service phrases in their own right, and don't pay £40+ per qualified lead to a directory.";

const ROWS = [
  {
    service_slug: 'web-design',
    intro_paragraph:
      "Gravesend businesses are operating in a town that has changed shape in the last decade. Ebbsfleet International put us 18 minutes from St Pancras and reshaped the customer base. The High Street regeneration, the new garden city expansion at Ebbsfleet, and the established Sikh community around Khalsa Avenue all mean your customers are increasingly digitally fluent and judging your business by your website before they ever ring. We build websites for Gravesend businesses that work for that audience: fast on a phone during the morning commute, clear about what you do, and built on real Next.js code rather than template assembly. £280 for a classic small business site, hosted for £18 a month. Same checks for speed, security and SEO that a £3,000 build would get, without the £3,000.",
    local_context: SHARED_LOCAL_CONTEXT,
    competition_landscape: SHARED_COMPETITION_LANDSCAPE,
    success_approach:
      "We design every Gravesend site around three audiences at once: the local resident searching for a trade, the Ebbsfleet commuter checking you out on the train home, and the long-standing customer looking you up to share your details with a friend. That means mobile-first builds, sub-2-second load times, clear pricing where you have it, and structured data so Google and the new AI search engines can both surface you properly. We also bake in proper Google Business Profile setup and tie the website to the map listing so the two work together rather than living separately.",
    layout_variant: 'lead-gen',
    pain_points: [
      {
        title: 'Your site was built when Gravesend looked different',
        description:
          "A lot of Gravesend business websites are still pre-Ebbsfleet — built for a smaller, less digitally savvy audience. Today the commuter visiting from London on the train won't wait three seconds for your site to load on 4G.",
      },
      {
        title: "You're losing the Ebbsfleet commuter audience",
        description:
          'The 18-minute high-speed link brought a whole new customer base into your area with London expectations and London disposable income. If your site looks like it was made in 2014 you are not converting them.',
      },
      {
        title: 'Aggregator sites are eating your margins',
        description:
          "Checkatrade, Bark and MyBuilder are sitting in your search results for ", // continued below
      },
    ],
    solutions: [
      {
        title: 'Built for the commute',
        description:
          'We design mobile-first because most of your high-value visitors find you on a phone during the train ride between Ebbsfleet and St Pancras. Sub-2-second loads, clear calls to action, no faff.',
      },
      {
        title: 'Indexed cleanly from day one',
        description:
          "Sitemap submitted, structured data for local business, Google Business Profile aligned with the site. Google can find every page from launch, and so can the LLM-based search engines that are coming up fast.",
      },
      {
        title: 'Honest pricing in the open',
        description:
          'Where you can show prices, we show prices. The Gravesend audience has been burned by quote-only websites that turn into long sales conversations. Transparency wins trust.',
      },
    ],
    faqs: [
      {
        question: 'Do you cover Gravesend specifically or just Kent generally?',
        answer:
          'Gravesend specifically. We understand the catchment includes Northfleet, Istead Rise, Higham and Meopham, and that a chunk of your audience is commuting from Ebbsfleet. The site we build reflects that.',
      },
      {
        question: 'How does £280 actually work?',
        answer:
          "£280 covers a classic small business site — homepage, services, about, contact, plus a couple of supporting pages. Designed, built, launched, indexed by Google. Hosting is £18 a month and covers SSL, backups and security. E-commerce or custom builds are priced on application.",
      },
      {
        question: 'Do you build for the new Ebbsfleet Garden City development?',
        answer:
          'Yes. New businesses opening in the Garden City expansion are exactly the kind of work we are set up for — fast turnaround, indexed quickly so you start getting found before opening day, and a presence that matches the standard the new residents expect.',
      },
    ],
    local_stats: {
      population: 73000,
      key_areas: ['High Street', 'Stone Street', 'New Road', 'Khalsa Avenue', 'Northfleet', 'Ebbsfleet'],
      commute_to_london: '18 minutes from Ebbsfleet International',
      business_count: '4,000+',
    },
  },
  {
    service_slug: 'seo',
    intro_paragraph:
      "SEO for Gravesend businesses is more competitive than it looks. You're not just competing with other Gravesend firms — you're competing with directory aggregators eating the top of every result, London agencies pitching down the high-speed line, and AI search engines like ChatGPT and Perplexity reshaping what 'showing up on Google' even means. We do real SEO work for Gravesend businesses, billed by the hour at £45, with no rolling contract. You see exactly what got done and what moved. Most of our Gravesend clients start with one or two hours a month and scale up once they see what is realistically achievable in their patch.",
    local_context: SHARED_LOCAL_CONTEXT,
    competition_landscape: SHARED_COMPETITION_LANDSCAPE,
    success_approach:
      "Our Gravesend SEO approach starts with local keyword research that distinguishes between residents searching at home and commuters searching on the train. Both groups buy locally but they search differently. Then we structure the site to win the long-tail combinations — 'plumber Northfleet', 'electrician Istead Rise', 'accountant near Ebbsfleet' — that have less competition than 'plumber Gravesend' on its own. Google Business Profile work is essential here because the map pack drives a disproportionate share of clicks for Gravesend service searches.",
    layout_variant: 'authority',
    pain_points: [
      {
        title: 'Aggregator sites are taking your top 3 slots',
        description:
          'Search "[your service] Gravesend" and the top of the results is dominated by Checkatrade, Bark, Yell and MyBuilder. You can win SEO against them, but only with a proper plan.',
      },
      {
        title: "You're not showing up for the Ebbsfleet catchment",
        description:
          "Most Gravesend businesses haven't done the long-tail work to capture Northfleet, Istead Rise, Higham and Meopham searches. That's where the higher-value commuter audience lives.",
      },
      {
        title: 'Your Google Business Profile is half-set-up',
        description:
          "Categories wrong, hours not updated, photos from 2019, no posts, no service descriptions. The map pack drives a huge slice of Gravesend service searches and most local businesses are leaving it on the table.",
      },
    ],
    solutions: [
      {
        title: 'Win the long tail of nearby villages',
        description:
          "We build out service-plus-area pages for Northfleet, Istead Rise, Higham, Meopham, Cobham — the smaller, less competitive search phrases where you can rank inside weeks rather than months.",
      },
      {
        title: 'Sort the Google Business Profile properly',
        description:
          'Categories, services, hours, photos, posts, attributes, FAQs, review requests. The map pack is where a lot of Gravesend business searches actually land and it deserves proper attention.',
      },
      {
        title: 'Build for AI search too',
        description:
          'ChatGPT, Perplexity and Google AI Overviews are pulling answers from structured data and clear authority signals. We optimise for both classical Google rankings and the LLM-based engines that are reshaping search.',
      },
    ],
    faqs: [
      {
        question: 'How long does Gravesend SEO take to show results?',
        answer:
          'Local SEO wins (Google Business Profile, technical fixes, long-tail content) often show movement within 4 to 8 weeks. Competitive head-term rankings (like ranking #1 for "[your service] Gravesend") take longer — typically 3 to 6 months of consistent work.',
      },
      {
        question: 'How do you compete with Checkatrade and Bark?',
        answer:
          "You don't fight them on their own term. You build long-tail authority that ranks in your own right, plus a strong Google Business Profile, plus the trust signals that mean customers click your site rather than the aggregator listing above it.",
      },
      {
        question: 'Is one hour a month enough?',
        answer:
          'For a small Gravesend business it can be enough to see steady progress, especially in the first 3-6 months while we work through the obvious technical and Google Business wins. Most clients scale up once they see results.',
      },
    ],
    local_stats: {
      population: 73000,
      key_search_areas: ['Gravesend', 'Northfleet', 'Istead Rise', 'Higham', 'Meopham', 'Cobham'],
    },
  },
  {
    service_slug: 'lead-capture',
    intro_paragraph:
      "Gravesend businesses lose enquiries the same way every small business does — phone goes to voicemail, form submission gets buried in an inbox, missed call from a number you don't recognise. The difference is the cost: a missed lead in Gravesend right now is increasingly an Ebbsfleet commuter who will just book the next firm on the list while still on the train. We build lead capture systems that close that gap. Forms that work, instant autoresponders, missed-call SMS recovery, follow-up sequences. Priced on the brief once we know what you're currently handling.",
    local_context: SHARED_LOCAL_CONTEXT,
    competition_landscape: SHARED_COMPETITION_LANDSCAPE,
    success_approach:
      "The lead capture build for Gravesend businesses centres on speed. The commuter audience expects an instant acknowledgement. The local audience is comparing you against the firm that already replied. The 24-hour reply window your competitors operated on five years ago is gone — most of the work is now about making sure no enquiry waits more than five minutes for a useful first response, even when you're on a job.",
    layout_variant: 'lead-gen',
    pain_points: [
      {
        title: "Voicemail is killing your conversion",
        description:
          "When a Gravesend customer's first attempt to reach you ends in voicemail, they ring the next firm. A missed-call text-back service often pays for itself in the first week.",
      },
      {
        title: 'Your contact form is too long',
        description:
          "If it asks for the customer's full address and project details upfront, most won't bother. Short forms get filled. We design forms that gather the minimum needed to get the conversation started.",
      },
      {
        title: 'Quotes are going quiet',
        description:
          "You send a quote, you don't hear back. Most quote conversions need at least one polite follow-up to land. Almost no Gravesend businesses are sending them.",
      },
    ],
    solutions: [
      {
        title: 'Missed-call SMS recovery',
        description:
          "Phone rings, you can't pick up. An automatic text fires within seconds with a booking link or apology and callback time. Customers stay yours instead of ringing the next firm.",
      },
      {
        title: 'Two-stage quote follow-up',
        description:
          "Quote sent, polite check-in after two days, final friendly nudge after a week. Quietly recovers a meaningful percentage of quotes that would otherwise have died.",
      },
      {
        title: 'Routing that fits a small business',
        description:
          'New enquiries land in the right inbox with context attached. Tagged in your CRM. Easy to action between jobs without losing track.',
      },
    ],
    faqs: [
      {
        question: 'How much does this cost?',
        answer:
          'Priced on the brief once we know what you currently handle. A simple setup for a small Gravesend trade is usually in the low hundreds; more complex builds with calendar booking, CRM integration and AI-assisted routing scale up from there.',
      },
      {
        question: 'Will it work with my existing email and CRM?',
        answer:
          'Almost certainly. We integrate with whatever you already use — Gmail, Outlook, HubSpot, Pipedrive, Notion, Airtable. We do not insist you migrate to anything.',
      },
    ],
    local_stats: { population: 73000 },
  },
  {
    service_slug: 'business-automation',
    intro_paragraph:
      "The repeat admin that eats your Sundays — that's what business automation handles. For Gravesend businesses scaling up to capture the Ebbsfleet commuter audience, the bottleneck is rarely demand. It's the time you spend re-typing quotes, chasing invoices, sending appointment reminders, asking for reviews after a job. We set up the systems that do all of that in the background. Priced on the brief once we know what you actually run.",
    local_context: SHARED_LOCAL_CONTEXT,
    competition_landscape: SHARED_COMPETITION_LANDSCAPE,
    success_approach:
      "Our Gravesend automation builds usually start with a 30-minute audit of where your time actually goes. The honest answer is rarely the work itself — it's the bits between the work. CRM setup so you have one place for customers and jobs. Quote templates that pre-fill from a brief. Invoice automation that fires on job completion. Review requests sent automatically the morning after. Each of these things saves an hour or two a week, and an hour a week is a working day a year.",
    layout_variant: 'authority',
    pain_points: [
      {
        title: "You're doing the same admin every week",
        description:
          'Writing quotes from scratch. Sending appointment reminders by hand. Chasing invoices yourself. None of this needs to be manual anymore.',
      },
      {
        title: 'Customer information is everywhere',
        description:
          'Email, WhatsApp, your phone notes, a spreadsheet, your head. When a customer rings back six months later you struggle to find what you quoted them.',
      },
      {
        title: 'Reviews never get asked for',
        description:
          "Most happy customers never leave a review because nobody asked. An automated review request the morning after a completed job is the single biggest improvement most Gravesend businesses can make to their Google presence.",
      },
    ],
    solutions: [
      {
        title: 'CRM properly set up',
        description:
          "One place for customers, jobs, quotes, invoices, history. Picked right for your size — could be HubSpot, Pipedrive, Notion, Airtable. Migrated from your existing spreadsheets without losing anything.",
      },
      {
        title: 'AI-assisted quote drafting',
        description:
          "You send a one-line brief by voice note or text, AI drafts the quote in your tone using your pricing, you edit and send. The quoting work that used to take an hour takes minutes.",
      },
      {
        title: 'Automated review requests',
        description:
          'Job marked complete in the CRM, polite review request fires the next morning, link straight to your Google Business Profile. Single biggest lever for local Gravesend SEO most businesses ignore.',
      },
    ],
    faqs: [
      {
        question: 'Will I have to learn new software?',
        answer:
          "Some, but we keep it minimal. The whole point is to reduce work, not give you a second job learning CRM systems. We pick tools you can use on your phone and we train you on what you actually need.",
      },
      {
        question: "What if I'm a one-person operation?",
        answer:
          "Automation matters more for solo operators. You don't have a team to absorb admin so every minute saved goes straight back into billable work or your evening. Most of our smallest clients see the biggest proportional impact.",
      },
    ],
    local_stats: { population: 73000 },
  },
];

async function main() {
  let inserted = 0;
  let updated = 0;
  for (const row of ROWS) {
    const payload = {
      town_slug: TOWN_SLUG,
      ...row,
    };
    const { data: existing } = await sb
      .from('local_content')
      .select('id')
      .eq('town_slug', TOWN_SLUG)
      .eq('service_slug', row.service_slug)
      .maybeSingle();

    if (existing?.id) {
      const { error } = await sb.from('local_content').update(payload).eq('id', existing.id);
      if (error) console.error(`gravesend/${row.service_slug}:`, error.message);
      else updated++;
    } else {
      const { error } = await sb.from('local_content').insert(payload);
      if (error) console.error(`gravesend/${row.service_slug}:`, error.message);
      else inserted++;
    }
  }
  console.log(`gravesend: inserted ${inserted}, updated ${updated}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
