-- seed-local-content-maidstone.sql
-- Local content for Maidstone across all 11 services
-- Run with: psql $DATABASE_URL -f scripts/seed-local-content-maidstone.sql
-- Safe to re-run: uses ON CONFLICT ... DO UPDATE

-- =============================================================================
-- 1. WEB DESIGN — Maidstone (layout: lead-gen)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'web-design',
  'maidstone',
  'As Kent''s county town and administrative centre, Maidstone demands a calibre of web presence that matches its status. Businesses operating around County Hall, The Mall Maidstone, and the professional offices lining King Street are competing not just with each other but with firms across the entire M20 corridor who target the same 110,000-strong population. Yet walk into most Maidstone businesses and ask about their website, and you will hear the same story: it was built years ago, it looks dated on mobile, and it generates almost no enquiries. We build conversion-focused websites for Maidstone businesses that load fast, rank well for county-town searches, and turn the significant volume of local internet traffic into genuine phone calls and form submissions. Whether you serve the professional community near Sessions House or homeowners across Bearsted, Loose, and Barming, your website should be your hardest-working employee.',
  'Maidstone occupies a strategic position at the junction of the M20 and A229, functioning as mid-Kent''s primary commercial hub. The town centre stretches from the River Medway and Lockmeadow Entertainment Centre up through Week Street and Gabriel''s Hill to The Mall Maidstone and Royal Star Arcade. Eclipse Business Park and 20/20 Business Park host a growing cluster of professional and technology firms. Two railway stations — Maidstone East and Maidstone Barracks — connect commuters to London, generating evening search traffic from returning professionals. The surrounding areas of Penenden Heath, Bearsted, Loose, Barming, and Tovil extend the residential catchment significantly, while nearby Leeds Castle draws tourists who also search for local services.',
  'Maidstone''s web design market is split between London agencies pitching remotely at premium rates and local freelancers undercutting on price. The result is a town full of websites that are either overpriced and generic or cheap and ineffective. Many established professional firms along King Street and around County Hall have not updated their sites in five or more years, creating a visible quality gap. The real competitive advantage lies in conversion engineering — most Maidstone sites look acceptable but fail to generate measurable business outcomes.',
  'Our process begins with a detailed audit of how your specific Maidstone customers search, compare, and decide. A solicitor near Sessions House faces entirely different digital expectations to a landscaper covering Tovil and Barming. We map competitor performance at postcode level, build sites that exceed Core Web Vitals benchmarks, and implement conversion tracking from day one so every Maidstone enquiry can be attributed to a specific page or search term.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "The Mall Maidstone", "Eclipse Business Park", "20/20 Business Park", "Bearsted", "Loose", "Barming", "Penenden Heath"]}',
  '[
    {"title": "Ageing websites failing Kent''s county-town audience", "description": "Professional firms near County Hall and retail businesses around The Mall invested in websites years ago that now underperform on every metric. Slow load times, poor mobile layouts, and dated design erode credibility before a potential customer even reads your content. In a market of 4,500 competing businesses, first impressions happen in milliseconds."},
    {"title": "Generic templates that erase your competitive edge", "description": "Maidstone''s business community includes solicitors, accountants, tradespeople, and retailers all using remarkably similar website templates. When a prospect searches from Maidstone East station and finds three businesses that look identical, they default to whichever appears most established. Template sites strip away exactly the differentiation you need."},
    {"title": "No measurable return from your existing web presence", "description": "Many Maidstone businesses cannot answer a basic question: how many enquiries did your website generate last month? Without conversion tracking, call attribution, or form analytics, your website is a cost centre with no accountability. Competitors on Eclipse Business Park who track every click are pulling ahead."}
  ]',
  '[
    {"title": "Conversion-first design for the Maidstone market", "description": "Every website we build starts with a single question: what does a Maidstone customer need to see before they pick up the phone? We design around that answer — prominent calls to action, trust indicators relevant to the county-town market, and frictionless contact paths that work on mobile during the evening commute from London."},
    {"title": "Performance engineering for competitive advantage", "description": "We deliver sub-two-second load times across all devices, exceeding Core Web Vitals on every metric. For Maidstone businesses competing against dozens of rivals, site speed is not a technical nicety — it is a ranking factor that directly determines whether Google shows your business or a competitor''s."},
    {"title": "Bespoke design reflecting Maidstone professionalism", "description": "We create visual identities that position your business as a credible, established presence in Kent''s county town. Custom photography briefs, considered typography, and layouts that communicate authority rather than desperation. Your website should feel like the digital equivalent of a well-appointed office on King Street."}
  ]',
  '[
    {"question": "How long does a website build take for a Maidstone business?", "answer": "Most projects complete within four to six weeks. We start with a strategy workshop focused on your position in the Maidstone market, then progress through design, development, and testing. Sites launch with local SEO foundations already configured so you begin ranking for county-town searches immediately."},
    {"question": "Can you redesign my site without losing existing Google rankings?", "answer": "Yes. We conduct a thorough technical audit before any redesign, mapping every indexed URL and implementing proper redirects. For Maidstone businesses with established domain authority, preserving that equity is non-negotiable and built into our standard process."},
    {"question": "Do you build websites for businesses outside the town centre?", "answer": "Absolutely. Many of our Maidstone clients serve the wider borough including Bearsted, Loose, Barming, Tovil, and Penenden Heath. We structure your site to target these specific areas so you capture searches from across the full catchment rather than just the town centre."},
    {"question": "What platform do you build Maidstone websites on?", "answer": "We recommend platforms based on your specific needs rather than forcing a one-size-fits-all solution. Most Maidstone service businesses benefit from a headless CMS approach that maximises speed and flexibility, while e-commerce clients may need Shopify or WooCommerce. We always prioritise performance and ease of management."}
  ]',
  'lead-gen'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;

-- =============================================================================
-- 2. SEO — Maidstone (layout: authority)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'seo',
  'maidstone',
  'Maidstone generates more high-intent local searches than almost any other town in Kent. With 110,000 residents, a dense professional services sector clustered around County Hall and King Street, and thousands of daily commuters passing through Maidstone East and Maidstone Barracks, the search volume for local services is substantial. Yet most businesses in the county town are nowhere to be found when it matters. National directories dominate the first page, established firms with decades of domain authority hold the top organic spots, and the Google Map Pack rewards businesses that have invested in their local presence. If your Maidstone business is not actively competing for these searches, you are handing revenue to competitors who are. Our SEO campaigns are engineered specifically for the Maidstone market — combining technical rigour with genuine local knowledge to move your business into the positions that generate real enquiries.',
  'Maidstone''s commercial geography creates distinct search patterns that generic SEO strategies miss entirely. The town centre — spanning from Lockmeadow and the River Medway through Week Street and Gabriel''s Hill to The Mall — generates high-density retail and service searches. The professional corridor around County Hall, Sessions House, and King Street drives B2B and professional service queries. Eclipse Business Park and 20/20 Business Park are emerging commercial zones with their own search demand. Surrounding villages like Bearsted, Barming, Loose, and Penenden Heath add residential service searches that default to Maidstone as the nearest hub. The M20 corridor means Maidstone also captures searches from people passing through mid-Kent.',
  'SEO competition in Maidstone is the fiercest in Kent, driven by the county-town''s high search volume and commercial density. National aggregators and directory sites target Maidstone keywords aggressively, occupying positions that local businesses struggle to displace. Established solicitors, accountants, and financial advisors with long-standing websites hold organic positions through accumulated authority. For newer businesses or those that have neglected their online presence, breaking into the first page requires a structured, sustained campaign rather than quick fixes.',
  'We approach Maidstone SEO as a postcode-level discipline. Rather than targeting broad terms and hoping for the best, we map the specific search patterns across different parts of the borough. Professional services near County Hall compete for different keywords than tradespeople covering Bearsted and Headcorn. We build hyper-local content, optimise Google Business Profiles with Maidstone-specific signals, and earn citations from Kent-relevant directories that reinforce your geographic authority.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "County Hall corridor", "Eclipse Business Park", "20/20 Business Park", "Bearsted", "Barming", "Loose", "Penenden Heath"]}',
  '[
    {"title": "Invisible in the Maidstone Map Pack despite years of trading", "description": "Your Google Business Profile is incomplete, your review count is low, and competitors near Fremlin Walk and The Mall appear above you in every map search. The Map Pack generates the majority of phone calls for local services in Maidstone, and being absent from it means losing business daily to firms that have prioritised their local presence."},
    {"title": "National directories outranking genuine Maidstone businesses", "description": "Sites like Bark, Checkatrade, and Yell pour resources into ranking for Maidstone service keywords, pushing local businesses onto page two where almost nobody clicks. Without a deliberate strategy to compete with these aggregators, your business remains invisible to the very customers walking past your door."},
    {"title": "No content targeting the specific areas you serve", "description": "A single homepage trying to rank for every service in every part of Maidstone will rank for none of them effectively. Without dedicated pages addressing specific services in Bearsted, Loose, Barming, and the town centre, you are competing for broad terms against businesses with far greater authority."}
  ]',
  '[
    {"title": "Map Pack domination for Maidstone searches", "description": "We fully optimise your Google Business Profile with precise Maidstone service-area targeting, structured review generation campaigns, and category optimisation. Our clients consistently move into the top three map results for their primary service keywords, capturing the phone calls that previously went to competitors."},
    {"title": "Hyper-local content strategy across the Maidstone borough", "description": "We create dedicated, indexable content targeting specific areas within the borough. Service pages for Bearsted, Loose, Barming, Penenden Heath, and the town centre each capture distinct search demand. This granular approach surfaces your business for long-tail queries that broad competitors overlook entirely."},
    {"title": "Technical SEO that closes the authority gap", "description": "For Maidstone businesses competing against established firms with years of accumulated authority, technical excellence is the fastest equaliser. We audit and optimise site architecture, schema markup, internal linking, and page speed to ensure Google can crawl, understand, and rank your content efficiently."}
  ]',
  '[
    {"question": "How long before SEO delivers results for Maidstone keywords?", "answer": "Most Maidstone clients see measurable ranking improvements within eight to twelve weeks for targeted local terms. Highly competitive categories like solicitors or accountants typically require four to six months of sustained work to reach page one. We provide monthly reporting so you can track progress against specific Maidstone keywords throughout."},
    {"question": "Can you help me rank across the whole Maidstone borough?", "answer": "Yes. Our campaigns are structured to capture searches across the entire borough, including Bearsted, Loose, Barming, Tovil, Penenden Heath, and Headcorn. We build location-specific content and local signals for each target area, ensuring your visibility extends well beyond the town centre."},
    {"question": "Why do national directories outrank my Maidstone business?", "answer": "National directories invest heavily in SEO and have massive domain authority. Beating them requires a combination of stronger local signals, better Google Business Profile optimisation, and content that Google recognises as more relevant to the specific Maidstone searcher. We focus on precisely these areas to displace aggregators for your target keywords."},
    {"question": "Is SEO a one-off project or an ongoing commitment?", "answer": "SEO is an ongoing discipline. Your Maidstone competitors are actively working to outrank you, Google updates its algorithm regularly, and the search landscape shifts constantly. We provide continuous optimisation with transparent monthly reporting that shows exactly which keywords moved, what traffic increased, and how many enquiries resulted."}
  ]',
  'authority'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;

-- =============================================================================
-- 3. LEAD CAPTURE — Maidstone (layout: lead-gen)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'lead-capture',
  'maidstone',
  'Every day, hundreds of people visit Maidstone business websites, browse services, compare options, and leave without making contact. In a county town with over 4,500 businesses competing for attention, the firms that grow consistently are not necessarily the best at their craft — they are the best at capturing interest before it evaporates. Your website attracts visitors from searches along the M20 corridor, from commuters browsing on the train from Maidstone East, and from residents across Bearsted, Loose, and Barming looking for local services. Without a systematic approach to capturing those visitors'' details, you are investing in traffic that generates no return. We design and implement lead capture systems tailored to the Maidstone market that turn anonymous browsers into contactable prospects, then nurture them through automated sequences until they are ready to buy.',
  'Maidstone''s position as Kent''s administrative capital creates a uniquely diverse lead generation landscape. The professional services cluster around County Hall and Sessions House generates high-value B2B enquiries during business hours. The residential suburbs of Bearsted, Barming, Loose, and Penenden Heath drive evening and weekend searches for home services and trades. Commuters returning through Maidstone East and Maidstone Barracks research local services on mobile devices during their journey. The retail and hospitality zones around Lockmeadow, The Mall, and Week Street attract footfall-driven searches. Each segment requires a different capture approach, and generic contact forms serve none of them well.',
  'The majority of Maidstone businesses rely on a single contact form and a phone number as their entire lead capture strategy. A handful of more sophisticated firms — particularly on Eclipse Business Park — use instant quote tools, consultation booking systems, and lead magnets to capture visitor information proactively. The gap between businesses that systematically capture leads and those that passively wait for phone calls grows wider every quarter, especially as more Maidstone consumers expect immediate digital responses.',
  'We build lead capture systems matched to how different Maidstone customer segments actually behave. Tradespeople serving the surrounding villages get instant callback request tools that convert mobile browsers in under thirty seconds. Professional firms near County Hall get downloadable guides and consultation booking systems that appeal to a research-driven audience. Every system includes automated follow-up sequences that engage new leads within minutes, ensuring no enquiry goes cold while you are out on a job or in a meeting.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "County Hall area", "Eclipse Business Park", "Bearsted", "Barming", "Loose", "Maidstone East corridor"]}',
  '[
    {"title": "Website traffic from across mid-Kent converting at near zero", "description": "Your site receives visitors from searches covering the entire Maidstone borough and beyond, but with only a basic contact page, fewer than three percent ever make an enquiry. Those visitors are actively searching for services you provide — they arrived with intent — yet your site gives them no compelling reason to identify themselves before leaving."},
    {"title": "Warm leads going cold during your busiest working hours", "description": "A homeowner in Bearsted submits a contact form at 9am while you are already on a job. By lunchtime they have received quotes from two competitors. Without automated acknowledgement and follow-up sequences, the best leads arrive precisely when you are least able to respond, and they do not wait."},
    {"title": "A single contact form trying to serve every customer type", "description": "The professional seeking a consultation near Sessions House has entirely different needs from a homeowner in Tovil wanting a quick price estimate. One generic form fails both audiences, resulting in low completion rates and unqualified enquiries that waste your time."}
  ]',
  '[
    {"title": "Segmented lead capture for Maidstone''s diverse market", "description": "We build distinct capture mechanisms for each of your customer segments. Residential customers across the Maidstone suburbs get instant quote calculators and callback request tools. B2B prospects from the business parks get consultation booking and needs-assessment forms. Each path is designed to match how that specific audience prefers to engage."},
    {"title": "Automated follow-up that converts while you are on site", "description": "Every captured lead triggers an immediate, personalised email sequence. Your Maidstone prospects receive acknowledgement within seconds, followed by value-driven messages that build trust and demonstrate expertise. The sequence runs automatically whether you are on a job in Loose or in a meeting at County Hall."},
    {"title": "Exit-intent capture recovering departing visitors", "description": "Before a visitor leaves your site, strategically timed offers present genuine value: a free assessment, a pricing guide, or a consultation slot. These capture contact details from Maidstone prospects who would otherwise vanish, feeding them into your nurture pipeline for follow-up over the coming days and weeks."}
  ]',
  '[
    {"question": "What type of lead capture works best for Maidstone service businesses?", "answer": "It depends on your customer profile. Trades covering the Maidstone borough typically convert best through instant callback requests and quick quote tools. Professional services near County Hall see stronger results from downloadable guides and consultation booking systems. We design the approach around your specific market rather than applying a generic template."},
    {"question": "Will adding pop-ups and forms annoy my website visitors?", "answer": "Poorly implemented lead capture irritates visitors. Well-designed systems enhance the experience by offering something genuinely useful at exactly the right moment. We use behavioural triggers — scroll depth, time on page, exit intent — to ensure offers appear when a visitor is engaged, not the moment they arrive."},
    {"question": "How fast should I respond to a captured lead?", "answer": "Within five minutes is the benchmark. Our automated systems send instant acknowledgements, but the Maidstone businesses that convert at the highest rates are those that make personal contact within the hour. We build notification systems that alert you immediately via email, SMS, or app notification so no warm lead waits."},
    {"question": "Can lead capture connect to my existing systems?", "answer": "Yes. We integrate with all major CRMs, accounting platforms like Xero and QuickBooks, calendar booking tools, and email marketing systems. For Maidstone businesses already using tools like ServiceM8 or HubSpot, leads flow directly into your existing workflow with zero manual data entry."}
  ]',
  'lead-gen'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;

-- =============================================================================
-- 4. BUSINESS AUTOMATION — Maidstone (layout: operational)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'business-automation',
  'maidstone',
  'Maidstone''s business community spans solicitors drafting contracts near Sessions House, tradespeople quoting jobs across Bearsted and Barming, and retailers managing stock in The Mall. What they share is an overwhelming volume of repetitive administrative tasks that consume hours every week. Manual quoting, disconnected invoicing, email-based scheduling, and spreadsheet client records are the hidden tax on growth in Kent''s county town. While your competitors on Eclipse Business Park are beginning to automate their operations and respond to enquiries within minutes, most Maidstone businesses still run on systems held together by memory and goodwill. We build bespoke automation workflows that connect your enquiry capture, quoting, invoicing, scheduling, and client communications into a single streamlined process — freeing you to focus on the work that actually generates revenue.',
  'Maidstone''s status as Kent''s administrative centre means businesses here handle above-average volumes of documentation, correspondence, and regulatory compliance. The professional services firms clustered around County Hall and King Street manage complex client workflows involving multiple parties. Tradespeople cover a wide geographic area from Tovil to Headcorn, spending significant time on the road and needing systems that work from a phone. The retail sector around Week Street and The Mall manages inventory, supplier relationships, and customer communications simultaneously. The business parks at Eclipse Park and 20/20 host growing firms that have outgrown manual processes but not yet invested in proper automation infrastructure.',
  'Automation adoption in Maidstone remains low outside of accounting practices using dedicated software. Most trades, retailers, and smaller professional firms operate with disconnected tools — one platform for quotes, another for invoices, emails for scheduling, and a spreadsheet for customer records. This fragmentation is not just inefficient; it causes dropped leads, delayed invoices, and missed appointments. The businesses that have automated report significant competitive advantages in response time and customer experience.',
  'We begin every Maidstone automation project with a detailed workflow audit. We shadow your actual daily processes to identify where time is wasted and where leads fall through gaps. A plumber covering Loose and Headcorn needs automated job confirmations and mobile invoicing on completion. A financial adviser near County Hall needs automated client onboarding and document collection. We build custom automation stacks using proven platforms, connected by API integrations tailored to how your specific Maidstone business operates.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "King Street", "Eclipse Business Park", "20/20 Business Park", "Bearsted", "Loose", "Tovil"]}',
  '[
    {"title": "Evenings consumed by quoting and invoicing instead of rest", "description": "Maidstone tradespeople covering the borough spend their evenings writing quotes on the kitchen table and chasing unpaid invoices by email. Professional firms near King Street assign junior staff to data entry that adds no value. This manual overhead is the single biggest drag on growth for businesses across the county town."},
    {"title": "Enquiries falling through the cracks during peak periods", "description": "When work picks up, the first casualty is follow-up. A potential customer who filled in your website form on Tuesday has heard nothing by Thursday and has already committed to a competitor on Eclipse Park. Manual processes cannot scale, and every missed follow-up is lost revenue."},
    {"title": "Disconnected tools creating duplicated work and errors", "description": "Quotes in one system, invoices in another, appointments in a calendar app, and customer details in a spreadsheet. Maidstone businesses waste hours re-entering the same data across multiple platforms, introducing errors and losing oversight of where each job or client actually stands."}
  ]',
  '[
    {"title": "Seamless enquiry-to-invoice workflows", "description": "We connect your entire business pipeline into a single automated flow. A new enquiry from your Maidstone website triggers lead capture, generates a quote template, sends follow-up sequences, converts accepted quotes to invoices, and syncs with your accounting software. The whole chain runs without manual intervention."},
    {"title": "Automated client communications at every stage", "description": "Every touchpoint — enquiry acknowledgement, quote delivery, appointment confirmation, job completion, invoice dispatch, and payment reminder — is automated with personalised, professional messaging. Your Maidstone customers experience responsive, consistent communication while you focus on delivering your service."},
    {"title": "Custom-built workflows matching Maidstone business operations", "description": "We never apply off-the-shelf templates. A tradesperson in Tovil gets mobile-first job management with GPS-triggered status updates. An accountant near Sessions House gets automated client onboarding with secure document collection. Every automation reflects the specific way your business operates in the Maidstone market."}
  ]',
  '[
    {"question": "What platforms do you use to build automations?", "answer": "We work with Zapier, Make, and direct API integrations depending on your existing systems. For Maidstone trades, we frequently connect ServiceM8, Jobber, or Tradify with Xero or QuickBooks. Professional services often require integrations with practice management tools, Calendly, and document management systems."},
    {"question": "How long does it take to automate my key processes?", "answer": "A core automation stack covering enquiry capture, follow-up, quoting, and invoicing typically takes two to four weeks. We prioritise the highest-impact automations first — usually lead response and invoicing — so you see returns immediately while we build out the full system."},
    {"question": "Will my Maidstone customers notice the automation?", "answer": "They will notice that you respond faster, follow up more consistently, and communicate more professionally. The automation itself is invisible. Emails come from your address, messages reference the customer by name, and the tone matches your brand. Most clients report that customers comment on their improved responsiveness."},
    {"question": "Can you automate processes I currently manage on paper?", "answer": "Yes. Many Maidstone trades and smaller businesses still use paper job sheets, handwritten quotes, and manual diaries. We digitise these processes first, then connect them into automated workflows. The transition typically saves ten to fifteen hours per week and eliminates the errors that come with manual record-keeping."}
  ]',
  'operational'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;

-- =============================================================================
-- 5. BRANDING — Maidstone (layout: trust)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'branding',
  'maidstone',
  'Maidstone is a town where reputation precedes everything. As Kent''s county seat, it hosts a concentration of professional firms, government offices, and established businesses that expect credibility to be visible at a glance. Your brand — the logo on your van, the style of your website, the consistency of your social media, the quality of your business cards — shapes every first impression before you ever speak a word. Yet the majority of Maidstone businesses have cobbled together their visual identity over years of ad hoc decisions: a logo from Fiverr, colours chosen on a whim, inconsistent fonts across different materials. In a market of 4,500 competing businesses, this patchwork approach actively costs you opportunities. We create cohesive brand identities for Maidstone businesses that project authority, build instant trust, and create the professional consistency that the county-town market demands.',
  'Maidstone''s brand landscape reflects the town''s dual identity as both an administrative centre and a vibrant commercial hub. The professional services corridor around County Hall and Sessions House demands conservative, trust-building visual identities. The retail and leisure zones around The Mall, Lockmeadow, and Gabriel''s Hill require brands that compete for attention and footfall. Tradespeople operating across Bearsted, Barming, Loose, and Tovil need vehicle livery and workwear that stands out in residential driveways. The growing commercial developments at Eclipse Business Park house modern firms that want contemporary, tech-forward branding. Each context demands a different brand tone while maintaining authentic connection to the Maidstone market.',
  'Branding in Maidstone falls into two camps: professional firms that invested in identity years ago and have not updated since, and newer businesses that skipped the process entirely, relying on DIY logos and inconsistent materials. Very few Maidstone businesses have a genuinely cohesive brand presence across all touchpoints. This creates a significant opportunity for firms willing to invest in professional identity work — the contrast between a business with considered branding and one without is immediately obvious to the Maidstone audience.',
  'Our branding process for Maidstone clients starts with understanding where your business sits in the local market hierarchy. We research your competitors'' visual presence, identify the gaps in how your sector presents itself, and develop a brand identity that fills that gap with authority. Every brand package includes guidelines that ensure consistency across every application — from your website and social media through to vehicle signage and printed materials used across the borough.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "County Hall area", "The Mall Maidstone", "Lockmeadow", "Gabriel''s Hill", "Bearsted", "Barming"]}',
  '[
    {"title": "Inconsistent visual identity undermining professional credibility", "description": "Your website uses one set of colours, your business cards another, and your van livery something different again. In Maidstone''s professional market — where solicitors, accountants, and consultants cluster around County Hall — this inconsistency signals a lack of attention to detail that makes potential clients hesitate before making contact."},
    {"title": "DIY branding that fails to differentiate in a crowded market", "description": "A logo created quickly on Canva or sourced from a budget marketplace does not communicate the expertise and reliability your Maidstone business has spent years building. When prospects compare your online presence against competitors on The Mall or Eclipse Business Park, generic branding immediately positions you as the less established option."},
    {"title": "No brand guidelines leading to diluted marketing efforts", "description": "Without documented brand standards, every piece of marketing material your Maidstone business produces looks slightly different. Staff create social media posts with wrong colours, printers guess at fonts, and sign-makers approximate your logo. The cumulative effect is a brand that looks amateur despite the quality of your work."}
  ]',
  '[
    {"title": "Complete brand identity built for the Maidstone market", "description": "We develop your logo, colour palette, typography, and visual language based on how Maidstone customers perceive trust and authority in your specific sector. Every element is tested against your competitive set — not just against other brands we think look good — ensuring your identity fills a genuine gap in the local market."},
    {"title": "Comprehensive brand guidelines ensuring consistency everywhere", "description": "We deliver a complete brand guide covering every application your Maidstone business will encounter: website design specifications, social media templates, email signatures, vehicle livery layouts, print specifications, and signage standards. Your brand looks consistent whether it appears on Gabriel''s Hill or in a Google search result."},
    {"title": "Brand rollout across all physical and digital touchpoints", "description": "We do not just hand over files and wish you luck. We manage the rollout of your new brand across your website, social profiles, Google Business Profile, printed materials, vehicle wraps, and workwear. For Maidstone businesses with vans covering the borough, we coordinate with sign-writers and printers to ensure pixel-perfect execution."}
  ]',
  '[
    {"question": "How long does a full rebrand take for a Maidstone business?", "answer": "A complete brand identity project typically takes four to six weeks from initial strategy workshop to final deliverables. This includes competitor analysis within the Maidstone market, concept development, refinement rounds, and production of all brand assets and guidelines."},
    {"question": "Can you update my existing brand rather than starting from scratch?", "answer": "Absolutely. Many Maidstone businesses have a brand foundation that works but needs modernising or systematising. We can refresh your existing identity, tighten up inconsistencies, and create the guidelines needed to maintain coherence across all touchpoints without losing the recognition you have already built."},
    {"question": "Do you design vehicle livery and workwear for Maidstone trades?", "answer": "Yes. For trades operating across Bearsted, Barming, Loose, and the wider borough, vehicle livery is often the single most visible brand touchpoint. We design van wraps, workwear embroidery, and signage that create a consistent, professional impression throughout the Maidstone area."},
    {"question": "What is included in a typical Maidstone branding package?", "answer": "Our standard package includes logo design with variations for different applications, colour palette, typography selection, brand guidelines document, social media profile assets, business card and letterhead design, email signature template, and a brand rollout plan. Vehicle livery, workwear, and signage design are available as additions."}
  ]',
  'trust'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;

-- =============================================================================
-- 6. SOCIAL MEDIA SETUP — Maidstone (layout: trust)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'social-media-setup',
  'maidstone',
  'Social media is where Maidstone residents discover, evaluate, and recommend local businesses before they ever visit a website or pick up the phone. From the community Facebook groups covering Bearsted and Loose to the Instagram accounts showcasing Lockmeadow and the River Medway, the county town''s social landscape is active and influential. Yet most Maidstone businesses approach social media as an afterthought — setting up profiles with inconsistent branding, posting sporadically, and failing to connect their social presence to any measurable business outcome. The opportunity is significant: a properly structured social media presence positions your business in front of Maidstone''s 110,000 residents at every stage of their buying journey, builds trust through consistent visibility, and creates a referral channel that compounds over time. We set up and optimise social media profiles for Maidstone businesses so they function as genuine business development tools from day one.',
  'Maidstone''s social media landscape is shaped by the town''s role as a regional hub. Active community groups on Facebook cover the town centre, Bearsted, Barming, Penenden Heath, and Loose — these groups drive significant local recommendation activity. Instagram engagement centres around lifestyle content featuring Mote Park, Lockmeadow, the River Medway, and the town''s growing food and drink scene around Earl Street. LinkedIn is heavily used by the professional services community clustered around County Hall and the business parks. The Maidstone Borough Council social channels and local news pages set the tone for community engagement. Understanding which platforms matter for which Maidstone audience segment is critical to effective social media setup.',
  'Social media quality among Maidstone businesses varies enormously. Some professional firms maintain polished LinkedIn presences while ignoring platforms where their residential customers actually spend time. Trades and retailers often have Facebook pages that were set up years ago with outdated information and abandoned posting schedules. A handful of progressive businesses — particularly around the food and leisure sectors at Lockmeadow — are using social media effectively, but they remain the exception. The bar for standing out is lower than most business owners assume.',
  'We set up each Maidstone client''s social presence based on where their specific audience actually spends time, not on assumptions about which platforms are popular generally. A tradesperson serving Bearsted and Barming needs an optimised Facebook presence connected to community groups. A professional firm near County Hall needs LinkedIn authority. A retail business on The Mall needs Instagram visual storytelling. We create platform-specific strategies, design branded profile assets, and establish content frameworks that make consistent posting sustainable.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "Lockmeadow", "Mote Park", "Bearsted", "Barming", "Loose", "Penenden Heath"]}',
  '[
    {"title": "Abandoned or inconsistent social profiles damaging your reputation", "description": "A Facebook page last updated eight months ago or an Instagram profile with mismatched branding tells Maidstone customers that your business is not paying attention. In a market where residents actively check social profiles before making contact, abandoned accounts are worse than having no accounts at all."},
    {"title": "No connection between social media activity and business results", "description": "Posting regularly feels productive but generates no measurable enquiries. Without proper profile optimisation, clear calls to action, and integration with your website and lead capture systems, social media becomes a time sink that drains resources without delivering returns for your Maidstone business."},
    {"title": "Present on the wrong platforms for your Maidstone audience", "description": "A plumber posting on LinkedIn while ignoring the Bearsted and Barming Facebook community groups is investing time in entirely the wrong place. Conversely, a B2B consultancy near Eclipse Park neglecting LinkedIn in favour of Instagram is missing its entire decision-maker audience. Platform selection matters more than posting frequency."}
  ]',
  '[
    {"title": "Platform-specific setup matched to your Maidstone market", "description": "We identify which platforms your specific customers in Maidstone actually use, then set up and fully optimise your profiles on those platforms only. Every profile is configured with consistent branding, complete business information, Maidstone-specific keywords, and clear pathways back to your website and contact channels."},
    {"title": "Branded visual assets designed for each platform", "description": "We create profile images, cover photos, highlight covers, and post templates that maintain your brand consistency across every platform. Your Maidstone business looks professional and established whether a customer finds you on Facebook, Instagram, LinkedIn, or Google Business Profile."},
    {"title": "Content frameworks that make consistent posting achievable", "description": "We deliver a content calendar framework with post templates, topic categories, and scheduling guidance tailored to your Maidstone business. Rather than leaving you to figure out what to post, we create a sustainable system that your team can maintain without requiring constant creative inspiration."}
  ]',
  '[
    {"question": "Which social media platforms should my Maidstone business be on?", "answer": "It depends entirely on your customers. Trades serving residential areas like Bearsted and Loose typically get the most value from Facebook and its community groups. Professional services near County Hall should prioritise LinkedIn. Retail and hospitality businesses benefit most from Instagram. We audit your market before recommending platforms so you invest time where it actually generates returns."},
    {"question": "How long does social media setup take?", "answer": "A complete social media setup covering two to three platforms typically takes one to two weeks. This includes profile creation or optimisation, branded visual assets, bio and keyword optimisation, integration with your website, and delivery of a content framework to guide ongoing posting."},
    {"question": "Can you manage my social media ongoing after setup?", "answer": "Our primary service is setup and strategy — getting your Maidstone profiles structured correctly and giving you the tools to maintain them effectively. We do offer ongoing management packages for businesses that prefer to outsource entirely, but we find most clients prefer to manage posting themselves once the foundations are properly in place."},
    {"question": "Will social media actually bring in customers for a Maidstone service business?", "answer": "When set up correctly, yes. Social media builds visibility and trust in the Maidstone market, making potential customers more likely to choose you when they need your service. The key is integration — your social profiles should drive traffic to your website and lead capture systems rather than existing in isolation. That connected approach is exactly what our setup delivers."}
  ]',
  'trust'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;

-- =============================================================================
-- 7. DIGITAL MARKETING — Maidstone (layout: lead-gen)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'digital-marketing',
  'maidstone',
  'Digital marketing in Maidstone is not a single channel — it is the coordinated use of search, social, email, and paid advertising to reach the county town''s 110,000 residents and the wider mid-Kent catchment at every stage of their buying journey. Most Maidstone businesses dabble: they run a Google Ads campaign here, post on Facebook there, send an occasional email blast. But without a unified strategy, these disconnected efforts waste budget and generate inconsistent results. The businesses that are growing in Maidstone''s competitive market are the ones treating digital marketing as an integrated system, where each channel reinforces the others and every pound spent can be traced to a measurable outcome. We build and manage digital marketing strategies for Maidstone businesses that connect all channels into a single revenue-generating machine.',
  'Maidstone''s digital marketing landscape is shaped by the town''s role as Kent''s primary administrative and commercial centre. Search demand is high across professional services, trades, retail, and hospitality. The commuter population using Maidstone East and Maidstone Barracks drives mobile-heavy browsing patterns during morning and evening journeys. Social media engagement clusters around community Facebook groups for Bearsted, Loose, and Penenden Heath, while the professional community around County Hall is active on LinkedIn. Google Ads competition for Maidstone keywords is intensifying as more businesses recognise the value of appearing at the top of paid results. Email marketing remains underutilised despite being the highest-ROI channel available.',
  'Digital marketing sophistication among Maidstone businesses is rising but uneven. Professional services firms on King Street tend to have some Google Ads presence, while trades and retailers rely almost entirely on organic visibility and word of mouth. Several London-based agencies target Maidstone businesses but apply generic strategies that miss local nuances. The businesses gaining ground fastest are those combining multiple channels strategically — and they remain a minority, creating opportunity for firms willing to invest in a coordinated approach.',
  'We build Maidstone digital marketing strategies around measurable revenue outcomes, not vanity metrics. Every campaign begins with customer research specific to the county-town market: which keywords drive enquiries, which social platforms generate engagement, which email approaches resonate with the local audience. We then construct integrated campaigns where Google Ads capture high-intent searches, social media builds awareness and trust, and email nurtures leads through to conversion — all tracked through a unified reporting dashboard.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "County Hall corridor", "Eclipse Business Park", "Bearsted", "Barming", "Loose", "M20 corridor"]}',
  '[
    {"title": "Disconnected marketing channels burning budget with no coordination", "description": "Your Google Ads run independently of your social media, which has no connection to your email list, which is not linked to your website analytics. Every channel operates in isolation, making it impossible to understand which efforts are generating revenue and which are wasting your Maidstone marketing budget."},
    {"title": "Paying London agency rates for generic strategies that ignore local dynamics", "description": "London agencies targeting Maidstone businesses charge premium fees but apply the same playbook they use for clients across the South East. They do not understand that Bearsted Facebook groups drive more trade referrals than Instagram, or that commuters from Maidstone East research on mobile during very specific time windows."},
    {"title": "No ability to track which marketing generates actual Maidstone customers", "description": "When a new customer contacts your business, can you identify whether they came from Google Ads, a social media post, an email campaign, or organic search? Without unified tracking, you cannot allocate budget effectively, and you end up investing more in channels that feel busy rather than channels that deliver revenue."}
  ]',
  '[
    {"title": "Integrated multi-channel strategy for the Maidstone market", "description": "We build a coordinated marketing system where Google Ads, social media, email, and content marketing work together rather than in isolation. Each channel is assigned a specific role in the customer journey — awareness, consideration, or conversion — and all activity is tracked through a single dashboard showing exactly how Maidstone enquiries are generated."},
    {"title": "Local audience targeting that reaches the right Maidstone residents", "description": "We use postcode-level targeting for paid campaigns, community-specific content for social media, and segmented lists for email marketing. Your budget reaches the specific Maidstone audiences that matter to your business — whether that is professionals near County Hall, homeowners in Bearsted, or businesses on Eclipse Park."},
    {"title": "Revenue-attributed reporting showing real business impact", "description": "Every campaign we manage is connected to conversion tracking that follows a prospect from first click to paying customer. Monthly reports show not just impressions and clicks, but actual enquiries, quote requests, and revenue generated from each Maidstone marketing channel. You make budget decisions based on profit, not guesswork."}
  ]',
  '[
    {"question": "How much should a Maidstone business spend on digital marketing?", "answer": "There is no universal answer, but most Maidstone service businesses generating between two hundred thousand and one million in revenue should invest between one and three thousand per month across all digital channels. We always start with an audit of your current performance to identify where budget will have the greatest immediate impact."},
    {"question": "Which digital marketing channel works best for Maidstone businesses?", "answer": "It depends on your service and customer profile. Professional services near County Hall typically see the best returns from Google Ads and LinkedIn. Trades covering the borough benefit most from Google Ads combined with Facebook community engagement. Retail and hospitality thrive on Instagram and email marketing. We recommend channels based on data, not assumptions."},
    {"question": "How soon will I see results from a digital marketing campaign?", "answer": "Paid advertising generates enquiries from day one. SEO and content marketing build over three to six months. Email marketing produces results as soon as your list reaches critical mass. We structure campaigns to deliver quick wins through paid channels while building long-term organic assets that reduce your reliance on ad spend over time."},
    {"question": "Can you manage my digital marketing alongside my existing efforts?", "answer": "Yes. Many Maidstone clients come to us already running Google Ads or posting on social media. We audit what is working, eliminate what is not, and integrate your existing efforts into a coordinated strategy. There is no need to start from scratch if elements of your current approach are performing."}
  ]',
  'lead-gen'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;

-- =============================================================================
-- 8. WORKWEAR & PRINT — Maidstone (layout: operational)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'workwear-print',
  'maidstone',
  'In Maidstone, your physical presence is marketing. The van parked in a driveway on Bearsted Green, the uniform worn by your team servicing a property near Mote Park, the business cards handed over at a networking event at Lockmeadow — these tangible brand touchpoints shape how the county town perceives your business long before anyone visits your website. Yet most Maidstone businesses treat workwear and print as afterthoughts, ordering cheap polo shirts with poorly reproduced logos and printing business cards on the office printer. The result is a physical brand presence that actively undermines the quality of the work you deliver. We provide branded workwear, vehicle graphics, business cards, signage, and printed materials for Maidstone businesses that match the professionalism your customers expect from firms operating in Kent''s county town.',
  'Maidstone''s diverse business community creates varied demands for physical branding. Tradespeople need durable workwear and prominent vehicle livery visible across residential areas from Loose to Penenden Heath. Professional firms around County Hall and King Street require premium business cards, headed paper, and corporate stationery that reflect their standing. Retail businesses in The Mall and along Gabriel''s Hill need point-of-sale signage, packaging, and promotional materials. Construction firms operating from the industrial areas around Tovil and along the A229 require high-visibility branded clothing and site signage. The county town''s networking scene — centred around business parks and professional associations — makes physical brand materials a daily requirement.',
  'The workwear and print market serving Maidstone businesses is dominated by online bulk suppliers offering generic options and local print shops providing adequate but uninspired results. Very few providers connect physical branding back to a cohesive visual identity strategy. The result is Maidstone businesses with professionally designed websites wearing badly embroidered polos and handing out business cards that use different colours and fonts. The disconnect between digital and physical brand presence is the norm rather than the exception.',
  'We approach workwear and print as an extension of your brand strategy, not a standalone commodity purchase. Every item we produce for Maidstone clients uses exact brand colours, correct logo specifications, and materials appropriate to the application. A tradesperson''s embroidered workwear is designed to be legible at a distance. A solicitor''s business card is printed on stock that communicates authority. Vehicle graphics are designed for maximum impact while maintaining brand coherence across your entire fleet.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "Bearsted", "Loose", "Barming", "Penenden Heath", "Tovil", "Eclipse Business Park"]}',
  '[
    {"title": "Cheap workwear undoing the professional image you work hard to maintain", "description": "Your team is skilled, your work is excellent, but the faded polo shirts with cracked logo prints tell a different story. When your Maidstone customers compare the appearance of your team against a competitor who turns up in crisp, branded workwear, perception shifts before you have said a word."},
    {"title": "Vehicle livery that fails to generate the enquiries it should", "description": "Your van is parked in driveways across Bearsted, Barming, and Loose for hours every day — that is free advertising space generating zero return if the livery is poorly designed, hard to read, or missing a clear call to action. Most Maidstone trade vehicles are mobile billboards that nobody can remember."},
    {"title": "Inconsistent printed materials creating a fragmented brand impression", "description": "Your business cards use one logo version, your letterhead another, and your flyers something different again. Every inconsistency tells Maidstone customers that your business lacks attention to detail. In a county town where professional standards matter, fragmented print materials cost you credibility."}
  ]',
  '[
    {"title": "Premium branded workwear built for Maidstone professionals", "description": "We source and brand workwear that balances durability with professional appearance. Embroidery, screen printing, and heat transfer are matched to the garment type and intended use. Every item uses your exact brand specifications so your team looks consistent and professional across every Maidstone job site and client meeting."},
    {"title": "Vehicle graphics designed for maximum local impact", "description": "We design vehicle livery that makes your brand memorable across the Maidstone borough. Clear branding, legible contact details, and compelling calls to action ensure that every hour your van spends parked in a Bearsted driveway or stuck in M20 traffic generates genuine enquiries from local customers."},
    {"title": "Printed materials that extend your digital brand into the real world", "description": "Business cards, letterheads, flyers, brochures, and signage — all produced to exact brand specifications with premium materials appropriate to the Maidstone market. We manage the entire production process from design through to delivery, ensuring consistency across every physical touchpoint."}
  ]',
  '[
    {"question": "What workwear brands do you supply for Maidstone businesses?", "answer": "We work with established workwear brands including Regatta, Dickies, Portwest, and Russell, among others. The specific brand depends on your requirements — durability for construction, appearance for client-facing roles, or hi-vis compliance for site work. We advise based on your specific Maidstone business needs rather than pushing a single supplier."},
    {"question": "How quickly can you deliver branded workwear?", "answer": "Standard embroidered workwear orders typically take seven to ten working days from artwork approval to delivery. Screen-printed items can be faster for larger quantities. For urgent Maidstone orders, we offer expedited services. We recommend ordering early if you need uniforms for a specific event or project start date."},
    {"question": "Can you match my existing brand colours exactly?", "answer": "Yes. We work from your brand guidelines or existing materials to ensure exact colour matching across all workwear and print. Pantone references are used throughout the production process. If you do not have formal brand guidelines, we can establish your colour specifications as part of the order process."},
    {"question": "Do you handle vehicle graphics for fleets?", "answer": "Yes. We design and coordinate vehicle graphics for individual vans through to multi-vehicle fleets. For Maidstone businesses with several vehicles, we ensure consistent application across every vehicle and manage the installation process with experienced fitters in the Kent area."}
  ]',
  'operational'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;

-- =============================================================================
-- 9. AI CHATBOTS — Maidstone (layout: authority)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'ai-chatbots',
  'maidstone',
  'Maidstone businesses receive enquiries around the clock. A homeowner in Bearsted searching for a plumber at 10pm, a business owner on Eclipse Park comparing accountants during their lunch break, a commuter browsing on the train from Maidstone East at 7am — these are all potential customers with questions that need answering now, not when your office opens tomorrow morning. Traditional websites force these visitors to fill in a contact form and wait, by which time they have already found a competitor who responded faster. AI-powered chatbots change this equation entirely. We build intelligent conversational assistants for Maidstone businesses that engage visitors instantly, answer questions about your services with accuracy, qualify leads in real time, and book appointments directly into your calendar — all without requiring a single member of your team to be online.',
  'Maidstone''s enquiry patterns reflect the town''s character as a working county seat with a large commuter population. Peak website traffic occurs during lunch hours around the County Hall and King Street professional zone, and again during the evening commute window when Maidstone East passengers browse on mobile. Weekend search activity is driven by residential customers across Bearsted, Loose, Barming, and Penenden Heath looking for trades and home services. The business parks at Eclipse Park and 20/20 generate B2B enquiries primarily during business hours. For most Maidstone businesses, at least forty percent of website traffic arrives outside normal operating hours, representing a massive volume of unserved demand.',
  'AI chatbot adoption among Maidstone businesses is virtually nonexistent outside of a few larger firms. Most rely on contact forms, phone lines with voicemail, and WhatsApp for enquiry handling. The few businesses that have attempted chatbots have typically deployed basic rule-based widgets that frustrate users with limited scripts and inability to answer genuine questions. This creates a significant first-mover advantage for Maidstone businesses willing to implement properly trained AI assistants that actually solve customer problems.',
  'We build AI chatbots trained on your specific Maidstone business — your services, your pricing structures, your service areas, your availability. The chatbot does not guess or give generic responses; it answers questions as accurately as your best team member would. We integrate appointment booking, quote requests, and lead qualification directly into the conversation flow, ensuring that visitors from across the county town are served instantly regardless of when they arrive at your site.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "Eclipse Business Park", "20/20 Business Park", "Bearsted", "Barming", "Loose", "Maidstone East corridor"]}',
  '[
    {"title": "Out-of-hours enquiries going unanswered from across the borough", "description": "When your office closes, your website becomes a static brochure. The homeowner in Penenden Heath searching at 9pm, the business owner on 20/20 Park researching at 7am — they all hit a contact form and move on to a competitor who offers an immediate response. You are losing customers every night that your website cannot hold a conversation."},
    {"title": "Phone lines overwhelmed during peak Maidstone business hours", "description": "Between answering calls, managing jobs, and serving existing clients, your team cannot respond to every website enquiry promptly. Maidstone customers expect speed — a response within minutes, not hours. When your team is stretched, qualified leads sit in your inbox while competitors capture them first."},
    {"title": "Basic chatbot widgets that frustrate rather than convert", "description": "If you have tried a chatbot before, it was probably a scripted decision tree that could not answer any question outside its narrow programming. Maidstone customers quickly recognise these limited bots and abandon them, leaving with a worse impression than if you had offered no chatbot at all."}
  ]',
  '[
    {"title": "AI assistants trained specifically on your Maidstone business", "description": "We train your chatbot on your actual services, pricing, service areas, FAQs, and processes. When a visitor from Bearsted asks whether you cover their area, the bot answers accurately. When a business on Eclipse Park asks about your B2B terms, it responds with the right information. No generic scripts — genuine, specific knowledge about your Maidstone operation."},
    {"title": "Integrated appointment booking and lead qualification", "description": "Your AI chatbot does not just answer questions — it books appointments into your calendar, collects qualified lead information, and routes urgent enquiries to your phone. A visitor at 11pm in Loose can check your availability and book a consultation slot without waiting until morning, securing business that would otherwise go to a competitor."},
    {"title": "Continuous learning that improves with every Maidstone conversation", "description": "Every interaction teaches the chatbot something new about how your Maidstone customers ask questions and what they need to know. We monitor conversations, identify gaps in the bot''s knowledge, and refine its training regularly. Your AI assistant becomes more capable every month, handling an increasing volume of enquiries without any additional team resource."}
  ]',
  '[
    {"question": "Will an AI chatbot feel impersonal to my Maidstone customers?", "answer": "Modern AI chatbots are conversational, natural, and can be branded with your business''s tone of voice. Most visitors cannot distinguish a well-built AI assistant from a live chat agent. We calibrate the personality to match how your Maidstone business communicates — professional for B2B firms, friendly for consumer services, technically accurate for specialist trades."},
    {"question": "What happens when the chatbot cannot answer a question?", "answer": "When the AI encounters a question outside its training, it gracefully hands over to a human by collecting the visitor''s contact details and flagging the query as requiring personal attention. For Maidstone businesses, this means no customer is left frustrated — they either get an instant answer or a commitment that someone will be in touch within a specified timeframe."},
    {"question": "How long does it take to set up an AI chatbot?", "answer": "Initial deployment takes two to three weeks, including training the AI on your specific business information, designing the conversation flows, integrating with your booking and CRM systems, and testing across different enquiry scenarios relevant to the Maidstone market."},
    {"question": "Can the chatbot handle enquiries from different Maidstone service areas?", "answer": "Yes. We configure the chatbot to understand your geographic coverage across the Maidstone borough. It can confirm whether you serve specific areas like Bearsted, Loose, Tovil, or Barming, provide location-specific information, and route enquiries based on where the customer is located."}
  ]',
  'authority'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;

-- =============================================================================
-- 10. AI CONTENT — Maidstone (layout: authority)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'ai-content',
  'maidstone',
  'Content marketing is the engine behind organic visibility for Maidstone businesses, yet most firms in the county town either produce no content at all or publish generic blog posts that read like they could have been written for any town in England. Google rewards depth, relevance, and local authority — and it penalises thin, duplicated content that adds no genuine value. For Maidstone businesses competing against 4,500 rivals and national directories that dominate search results, the only viable path to sustained organic growth is a content strategy that demonstrates genuine expertise in your field and authentic knowledge of the local market. We use AI-assisted content production to create high-quality, locally relevant articles, guides, and web pages for Maidstone businesses at a pace and cost that traditional content agencies cannot match — without sacrificing the specificity and accuracy that Google demands.',
  'Maidstone''s content landscape reflects the county town''s diverse economy. Professional services firms near County Hall and Sessions House need authoritative content addressing legal, financial, and regulatory topics relevant to Kent residents and businesses. Trades covering Bearsted, Barming, Loose, and Tovil need practical, helpful content that captures the informational searches homeowners make before hiring. Retailers around The Mall and Gabriel''s Hill need product and lifestyle content that drives footfall and online sales. The tourism draw of nearby Leeds Castle and the recreational appeal of Mote Park create additional content opportunities around visitor-related searches. Each sector requires a fundamentally different content approach.',
  'Content marketing among Maidstone businesses is severely underdeveloped. Most professional firms have a blog section with three posts from two years ago. Trades rarely produce any content beyond basic service pages. The few businesses investing in regular content typically outsource to generic content mills that produce geographically interchangeable articles. This creates an enormous opportunity: businesses willing to publish genuinely useful, Maidstone-specific content can capture search traffic that competitors are not even competing for.',
  'Our AI-assisted content process combines machine efficiency with human editorial oversight and genuine local knowledge. We research the specific questions Maidstone residents and businesses ask, identify content gaps that competitors have not addressed, and produce articles that demonstrate real authority in both your subject matter and the local market. Every piece is fact-checked, edited for quality, optimised for search, and published with a strategy that builds topical authority over time rather than chasing individual keywords.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "County Hall area", "The Mall", "Eclipse Business Park", "Bearsted", "Loose", "Mote Park area"]}',
  '[
    {"title": "Zero content strategy leaving organic growth on the table", "description": "Your Maidstone competitors who publish regular, relevant content are capturing search traffic you never see. Without articles addressing the questions your potential customers type into Google, your business is invisible for the hundreds of informational queries that precede every buying decision in the county town."},
    {"title": "Generic outsourced content that Google can see through", "description": "Articles that mention Maidstone in the title but contain nothing genuinely local are worse than useless — Google''s algorithms increasingly detect and demote content that lacks authentic expertise or geographic relevance. Content mill articles that swap town names add no value and risk penalising your site."},
    {"title": "No time or resource to produce content consistently", "description": "Running a Maidstone business leaves no spare hours for writing blog posts, guides, and landing pages. The result is a content plan that starts with good intentions and stalls within weeks. Inconsistent publishing tells Google your site is not actively maintained, reducing its willingness to rank you for competitive terms."}
  ]',
  '[
    {"title": "AI-assisted content production at scale with local precision", "description": "We produce high-quality articles, guides, and service pages for your Maidstone business at a fraction of traditional agency timelines and costs. AI handles the heavy lifting of research and drafting, while our editorial team ensures every piece contains genuine local knowledge, accurate information, and the specificity that distinguishes expert content from filler."},
    {"title": "Content strategy built around Maidstone search demand", "description": "We map the actual questions your potential customers in the county town are asking, identify topics where competition is low but demand is real, and build a publishing calendar that systematically fills these gaps. Each piece targets a specific search intent relevant to your Maidstone market rather than chasing vanity keywords."},
    {"title": "Topical authority development that compounds over time", "description": "Individual articles generate individual visits. A structured content strategy builds topical authority that makes your entire site rank better for everything related to your expertise in Maidstone. We create content clusters that demonstrate comprehensive knowledge, sending strong signals to Google that your business is the authoritative source in your field."}
  ]',
  '[
    {"question": "Will AI-generated content hurt my Google rankings?", "answer": "Google does not penalise AI-assisted content — it penalises low-quality content regardless of how it was produced. Our process uses AI as a production tool while ensuring every article meets Google''s quality standards: genuine expertise, accurate information, and real value for the Maidstone reader. Human editorial oversight is applied to every piece before publication."},
    {"question": "How much content do I need to publish for a Maidstone business?", "answer": "Consistency matters more than volume. For most Maidstone businesses, two to four high-quality articles per month is sufficient to build meaningful organic visibility over six to twelve months. We prioritise quality and relevance over quantity, ensuring each piece targets a genuine content gap in your market."},
    {"question": "Can you write content for specialist or technical Maidstone businesses?", "answer": "Yes. We work with clients in your industry to ensure technical accuracy, then combine that expertise with our knowledge of the Maidstone market and SEO best practices. For highly specialist sectors, we conduct interviews with your team to capture the nuanced knowledge that distinguishes expert content from surface-level articles."},
    {"question": "How do you ensure content is genuinely relevant to Maidstone?", "answer": "Every piece we produce references specific local context — actual Maidstone locations, genuine market conditions, real competitive dynamics, and the specific concerns of your county-town audience. We do not swap town names into generic templates. Our editorial process verifies that local claims are accurate and references are genuine."}
  ]',
  'authority'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;

-- =============================================================================
-- 11. AI AUTOMATION — Maidstone (layout: authority)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'ai-automation',
  'maidstone',
  'Artificial intelligence is no longer a technology reserved for corporate enterprises in London. For Maidstone businesses — from professional firms near County Hall to trades operating across the borough — AI-powered automation offers a practical, affordable way to handle the repetitive tasks that consume your team''s time and limit your capacity to grow. We are not talking about science fiction or replacing your staff. We are talking about intelligent systems that read and categorise your emails, extract data from documents, generate personalised responses to routine enquiries, summarise lengthy reports, and make accurate decisions on repetitive processes that currently require human attention. For businesses in Kent''s county town competing against thousands of rivals, AI automation is the operational advantage that lets a small team deliver the responsiveness and consistency of a much larger organisation.',
  'Maidstone''s business community is ripe for AI automation. The professional services sector around County Hall and King Street handles enormous volumes of documentation — contracts, compliance forms, client correspondence — that AI can process faster and more accurately than manual methods. Trades and service businesses covering Bearsted, Barming, and Loose deal with repetitive enquiry handling, quote generation, and scheduling that AI can streamline. The growing commercial zone at Eclipse Business Park and 20/20 Business Park hosts firms scaling quickly and hitting capacity constraints that automation can resolve. The town''s administrative function means government-adjacent businesses particularly benefit from document processing and compliance automation.',
  'AI automation awareness in Maidstone is growing but adoption remains extremely low. Most businesses are aware that AI tools exist but do not know how to apply them to their specific operations. A handful of tech-forward firms on the business parks have experimented with individual AI tools, but very few have implemented systematic automation workflows. This early-adopter window represents a significant competitive advantage for Maidstone businesses willing to invest in properly implemented AI systems.',
  'Our AI automation approach starts with identifying the specific repetitive tasks that consume the most time in your Maidstone operation. We then build AI-powered workflows that handle these tasks with minimal human oversight — reading incoming emails and routing them correctly, extracting key data from documents and populating your systems, generating draft responses to common enquiries, and processing routine decisions according to your business rules. Every automation is designed to be transparent, auditable, and easy for your team to oversee.',
  '{"population": 110000, "business_count": "4500+", "key_areas": ["Town Centre", "County Hall corridor", "King Street", "Eclipse Business Park", "20/20 Business Park", "Bearsted", "Barming"]}',
  '[
    {"title": "Staff drowning in repetitive administrative tasks", "description": "Your Maidstone team spends hours daily on tasks that follow the same pattern every time: reading and sorting emails, entering data from forms into spreadsheets, writing similar responses to similar enquiries. This repetitive work consumes capacity that should be directed toward revenue-generating activity and client service."},
    {"title": "Scaling the business means hiring more admin staff you cannot afford", "description": "Growth in the Maidstone market means more enquiries, more documentation, more scheduling, and more follow-up. The traditional solution is hiring additional staff, but for small to mid-sized businesses in the county town, the cost of another salary often makes scaling prohibitive. AI automation removes this constraint."},
    {"title": "Inconsistent quality when humans handle high-volume repetitive work", "description": "When your team processes dozens of similar tasks daily, mistakes and inconsistencies are inevitable. Emails get missed, data is entered incorrectly, follow-ups slip through gaps. AI systems do not get tired, distracted, or overwhelmed — they process every item with identical accuracy regardless of volume."}
  ]',
  '[
    {"title": "Intelligent email and enquiry processing", "description": "We build AI systems that read incoming emails and website enquiries, categorise them by type and urgency, extract key information, and either respond automatically or route to the appropriate team member with a suggested response. Your Maidstone business handles three times the enquiry volume with the same team."},
    {"title": "Document processing and data extraction", "description": "For professional firms and administrative businesses in Maidstone, we implement AI that reads contracts, forms, invoices, and compliance documents — extracting key data and populating your systems automatically. What currently takes your team hours of manual data entry is completed in minutes with greater accuracy."},
    {"title": "AI decision-making for routine business processes", "description": "Many decisions your Maidstone business makes daily follow consistent rules: approving standard quotes, categorising expenses, prioritising jobs, or assessing enquiry quality. We build AI systems that make these routine decisions according to your defined criteria, escalating only the exceptions that require genuine human judgement."}
  ]',
  '[
    {"question": "Will AI automation replace my Maidstone team members?", "answer": "No. AI automation handles repetitive, low-value tasks so your team can focus on the work that requires human skills — building client relationships, making complex decisions, and delivering your core service. Most Maidstone businesses that implement AI automation do not reduce staff; they increase output and improve service quality with the same team."},
    {"question": "Is AI automation affordable for a small Maidstone business?", "answer": "Yes. The AI tools available today are dramatically more affordable than even two years ago. Most Maidstone small businesses can implement meaningful automation for a fraction of the cost of an additional staff member, with typical monthly running costs between fifty and three hundred pounds depending on volume and complexity."},
    {"question": "How do I know which tasks to automate first?", "answer": "We start every project with a workflow audit, identifying the tasks in your Maidstone operation that are highest volume, most repetitive, and most prone to error. These typically include email handling, data entry, quote generation, and routine client communications. We prioritise by impact, implementing the automation that saves the most time first."},
    {"question": "What happens when the AI makes a mistake?", "answer": "We build every AI automation with appropriate human oversight. For high-stakes decisions, the AI makes a recommendation that a team member approves. For routine tasks, the AI acts autonomously but logs every action for review. Error rates for well-implemented AI systems are typically lower than manual processes, and we monitor performance continuously."}
  ]',
  'authority'
)
ON CONFLICT (service_slug, town_slug) DO UPDATE SET
  intro_paragraph = EXCLUDED.intro_paragraph,
  local_context = EXCLUDED.local_context,
  competition_landscape = EXCLUDED.competition_landscape,
  success_approach = EXCLUDED.success_approach,
  local_stats = EXCLUDED.local_stats,
  pain_points = EXCLUDED.pain_points,
  solutions = EXCLUDED.solutions,
  faqs = EXCLUDED.faqs,
  layout_variant = EXCLUDED.layout_variant;
