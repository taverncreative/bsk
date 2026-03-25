-- seed-local-content-folkestone.sql
-- Local content for Folkestone across all 11 services
-- Run with: psql $DATABASE_URL -f scripts/seed-local-content-folkestone.sql
-- Safe to re-run: uses ON CONFLICT ... DO UPDATE

-- =============================================================================
-- 1. WEB DESIGN — Folkestone (layout: lead-gen)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'web-design',
  'folkestone',
  'Folkestone is a town in transformation. The Creative Quarter on Tontine Street, the regenerated Harbour Arm, and the international recognition brought by the Folkestone Triennial have attracted a new wave of entrepreneurs, artists, and professionals to a coastal town that now blends established seaside businesses with a rapidly growing creative economy. This duality demands websites that can speak to both audiences — the tourist searching for a restaurant on the Harbour Arm and the creative professional looking for studio space, the local tradesperson serving Sandgate and Hythe, and the London commuter who chose Folkestone for its HS1 connection and fifty-five-minute journey to St Pancras. We build websites for Folkestone businesses that capture the town''s distinctive energy, perform flawlessly on mobile, and convert the increasingly diverse visitor base into paying customers. No templates. No generic coastal town clichés. Design that reflects where Folkestone actually is right now.',
  'Folkestone''s geography creates distinct commercial zones with different digital needs. The Creative Quarter centred on Tontine Street and The Old High Street is home to galleries, studios, and independent retailers drawn by the Roger De Haan-led regeneration through the Creative Foundation. The Harbour Arm has become a destination dining and events venue with its own search demand. Sandgate Road connects the town centre to the affluent coastal village of Sandgate, while Hythe sits just along the coast as a complementary market. Folkestone Central station provides HS1 services to London in approximately fifty-five minutes, making the town increasingly attractive to commuters. The Channel Tunnel terminal at Cheriton is a ten-minute drive, connecting Folkestone to continental Europe. The Leas clifftop promenade and Leas Cliff Hall anchor the leisure and events sector.',
  'Folkestone''s web design market reflects the town''s split personality. Established seaside businesses often have dated websites built during the pre-regeneration era, while newer Creative Quarter businesses tend to have visually striking but commercially underperforming sites built by designer friends. London-based digital professionals who have relocated to Folkestone sometimes freelance locally, offering high-end design without the commercial strategy. The gap is in websites that combine Folkestone''s creative aesthetic with genuine conversion performance — sites that look as good as the street art on Tontine Street but actually generate measurable business results.',
  'Our Folkestone web projects start with the question every local business must answer: who are your customers now, and who will they be as the town continues to evolve? We design for the current reality — tourists on the Harbour Arm, locals in Cheriton, commuters from the HS1 corridor — while building flexibility for the demographic shift that regeneration is accelerating. Every site is mobile-first because Folkestone''s visitor traffic is overwhelmingly on phones, and conversion paths are designed around the specific way each customer segment discovers and evaluates local businesses.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "Tontine Street", "The Old High Street", "Sandgate", "Hythe", "The Leas", "Cheriton"]}',
  '[
    {"title": "Pre-regeneration websites failing to attract the new Folkestone audience", "description": "Established businesses that have traded in Folkestone for decades often have websites built before the Creative Quarter existed. These dated sites fail to connect with the new demographic — the London commuters, creative professionals, and young families drawn by the town''s reinvention. Your digital presence is stuck in old Folkestone while your market has moved on."},
    {"title": "Visually creative sites with zero commercial performance", "description": "Newer businesses in the Creative Quarter often have websites designed by artists or designer friends that look beautiful but generate no enquiries. Stunning imagery and experimental layouts mean nothing if visitors cannot find your opening hours, book a table, or request a quote. Folkestone deserves design that is both creative and commercially effective."},
    {"title": "No mobile optimisation despite a tourism-heavy visitor base", "description": "Tourists walking the Harbour Arm, visitors exploring the Triennial installations, and commuters browsing on the HS1 from St Pancras are all on their phones. A Folkestone business website that does not perform flawlessly on mobile is invisible to the majority of people actively searching for local services at any given moment."}
  ]',
  '[
    {"title": "Design that captures Folkestone''s creative energy and converts", "description": "We build websites that feel authentically Folkestone — reflecting the town''s creative identity without sacrificing the commercial fundamentals that generate enquiries. Clean layouts, distinctive visual language, and conversion paths that work for tourists, locals, and commuters alike. Your site should feel like walking down Tontine Street: stimulating and purposeful."},
    {"title": "Mobile-first builds for a town that browses on the move", "description": "With a tourism economy, an HS1 commuter base, and a population that lives outdoors along The Leas and the Harbour Arm, Folkestone website traffic is disproportionately mobile. We build mobile-first as default — fast load times, thumb-friendly navigation, and conversion actions that work on a phone screen without compromise."},
    {"title": "Future-proofed sites for a town in active transformation", "description": "Folkestone is changing faster than most UK coastal towns. We build websites with the flexibility to evolve as your business and the town''s demographic shifts. Modular content structures, scalable architecture, and CMS setups that let you adapt your messaging without a complete rebuild as the market continues to develop."}
  ]',
  '[
    {"question": "How long does a Folkestone website project take?", "answer": "Most projects launch within four to six weeks. We begin with a strategy session that maps your specific position in Folkestone''s evolving market, then move through design, development, and testing. Sites go live with local SEO configured for Folkestone, Sandgate, Hythe, and surrounding area searches from day one."},
    {"question": "Can you redesign my existing site without losing Google rankings?", "answer": "Yes. We audit all existing URLs, implement proper redirects, and preserve any domain authority you have built. For established Folkestone businesses with years of online history, protecting existing visibility during a redesign is a core part of our process."},
    {"question": "Do you work with businesses in Sandgate and Hythe as well?", "answer": "Absolutely. Many Folkestone businesses serve the broader coastal strip from Sandgate through to Hythe and beyond. We build websites that target these areas specifically, ensuring your visibility extends across the full catchment rather than just the Folkestone town centre."},
    {"question": "Will my website reflect Folkestone''s creative identity?", "answer": "If that is what your business calls for, yes. We do not apply a one-size-fits-all aesthetic. A gallery on The Old High Street needs a very different design approach to a building contractor in Cheriton. We design around your brand and your audience, informed by the context of the Folkestone market."}
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
-- 2. SEO — Folkestone (layout: authority)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'seo',
  'folkestone',
  'Folkestone''s search landscape has changed dramatically in the past decade. What was once a straightforward seaside town with predictable local search patterns has become a complex, multi-layered market driven by tourism, creative industry growth, HS1 commuter influx, and the ongoing regeneration that has put Folkestone on the national map. Search volume has increased across almost every local service category, but competition for those searches has intensified even faster as new businesses arrive and established firms finally recognise the importance of digital visibility. For Folkestone businesses that want to capture this growing demand — whether you serve the Creative Quarter, the Harbour Arm dining scene, the residential areas around Cheriton, or the neighbouring town of Hythe — SEO is no longer optional. It is the difference between riding the wave of Folkestone''s revival and being washed out by competitors who got there first.',
  'Folkestone''s search geography is unusually complex for a town of fifty-three thousand people. The Creative Quarter generates searches related to art, galleries, independent retail, and studio spaces. The Harbour Arm drives restaurant, bar, and event searches with strong seasonal variation. The Leas and Leas Cliff Hall create leisure and entertainment search demand. The HS1 corridor generates commuter-related service searches from London professionals who now call Folkestone home. The Channel Tunnel terminal at Cheriton adds travel-related search volume. Sandgate functions as an affluent micro-market with its own search patterns, while Hythe serves as both a competitor and a complementary catchment. Folkestone & Hythe District Council''s ongoing investment in regeneration continues to increase the town''s overall search profile.',
  'SEO competition in Folkestone is less established than in larger Kent towns, but it is growing rapidly. National directories and aggregators target Folkestone keywords with increasing frequency as the town''s profile rises. Local businesses that established their web presence during quieter years hold domain authority advantages but often have technically outdated sites. Newer arrivals — particularly in the Creative Quarter — tend to have modern sites with no SEO strategy. The hospitality sector faces fierce local competition for restaurant and venue searches. Overall, Folkestone SEO is at an inflection point where investment now yields disproportionate returns before the market matures.',
  'Our Folkestone SEO strategy accounts for the town''s layered search demand. We segment campaigns by audience — tourist searches are seasonal and intent-specific, commuter searches are time-of-day sensitive, and residential searches follow traditional local patterns. We build content that captures each segment, optimise Google Business Profiles for the specific Folkestone and Hythe categories that matter, and earn citations from tourism, arts, and Kent business directories that reinforce your local authority across the coastal strip.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "The Leas", "Sandgate", "Hythe", "Cheriton", "The Old High Street"]}',
  '[
    {"title": "Rising search volume but stagnant visibility for local businesses", "description": "Folkestone''s regeneration has increased Google search volume across almost every service category, yet many established businesses have not updated their SEO to capture this growth. New searches are being won by national directories, new competitors, and the handful of local businesses that have invested in their online presence. The opportunity window is closing."},
    {"title": "Seasonal tourism traffic obscuring year-round search potential", "description": "Many Folkestone businesses focus their attention on the summer tourism peak around the Harbour Arm and the Triennial, overlooking the substantial year-round search demand from the resident population and HS1 commuter community. A seasonal-only SEO approach misses twelve months of residential service searches that competitors are capturing quietly."},
    {"title": "No strategy targeting the expanding Folkestone and Hythe catchment", "description": "Your business draws customers from Folkestone town centre, Cheriton, Sandgate, Hythe, and potentially further along the coast. Without content and signals targeting each of these areas explicitly, Google defaults to showing your business only for core Folkestone searches — missing a significant portion of the market you actually serve."}
  ]',
  '[
    {"title": "Multi-segment SEO capturing Folkestone''s diverse search demand", "description": "We build SEO strategies that target all of Folkestone''s distinct audience segments: tourist searches with seasonal content and Google Business Profile optimisation, commuter-focused terms targeting the HS1 corridor, and year-round residential searches across Cheriton, Sandgate, and Hythe. Each segment receives dedicated attention rather than being lumped into a single campaign."},
    {"title": "Local authority building across the Folkestone coastal strip", "description": "We develop your search presence to cover the full geographic area your business serves. Dedicated content for Sandgate, Hythe, and Cheriton ensures you capture searches from across the Folkestone & Hythe district. Citations in tourism directories, arts platforms, and Kent business listings build the local signals Google needs to rank you above generic aggregators."},
    {"title": "Technical SEO advantage in a maturing market", "description": "While Folkestone''s SEO market is still developing, the technical standards required to rank are not. We audit and optimise site architecture, schema markup, page speed, and crawlability to ensure your business is technically superior to both established local competitors with outdated sites and newer businesses that prioritised aesthetics over search performance."}
  ]',
  '[
    {"question": "Is Folkestone too small for SEO to be worthwhile?", "answer": "No. Folkestone''s effective search market is substantially larger than its fifty-three thousand population suggests. Tourism drives significant seasonal search volume, the HS1 commuter community adds affluent local demand, and the Folkestone & Hythe district catchment extends your addressable market considerably. Businesses investing in SEO here now are positioning themselves ahead of a rapidly growing market."},
    {"question": "How do I compete with national directories for Folkestone searches?", "answer": "National directories lack the local specificity that Google increasingly rewards. Our strategy focuses on creating content with genuine Folkestone expertise, building citations in local and regional directories, and optimising your Google Business Profile to outperform aggregators in the Map Pack — where the majority of high-intent local clicks happen."},
    {"question": "Should I target Hythe and Sandgate searches as well?", "answer": "If your business serves those areas, absolutely. Many Folkestone businesses draw customers from Sandgate, Hythe, and beyond. We create area-specific content and local signals for each location you serve, expanding your visibility across the full coastal catchment rather than limiting you to the Folkestone town centre."},
    {"question": "How long before I see ranking improvements in Folkestone?", "answer": "Most clients see measurable improvements within six to ten weeks for targeted local terms. Folkestone''s less saturated market means results often come faster than in larger Kent towns. We provide monthly reporting tracking your specific keyword positions, organic traffic from Folkestone searches, and enquiries generated through organic visibility."}
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
-- 3. LEAD CAPTURE — Folkestone (layout: lead-gen)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'lead-capture',
  'folkestone',
  'Folkestone''s growing reputation draws visitors to business websites from multiple channels — tourists planning trips to the Harbour Arm, London professionals researching the HS1 commuter lifestyle, creative entrepreneurs exploring the quarter, and local residents comparing services across the Folkestone and Hythe district. Each visitor represents a potential customer, yet the vast majority leave without making contact. They browse your menu, check your opening hours, read about your services, and disappear. For a town experiencing real economic momentum, this leakage of potential business is both the biggest problem and the biggest opportunity. We build lead capture systems for Folkestone businesses that work with the grain of how this town''s diverse audience actually behaves — offering genuine value in exchange for contact details and nurturing those contacts through automated sequences that turn interest into revenue.',
  'Folkestone''s visitor traffic is unusually diverse for a town its size. The Harbour Arm and Creative Quarter attract day-trippers and cultural tourists who browse local business websites on mobile while walking the seafront. The HS1 connection brings London professionals who research Folkestone services during their commute. The residential population across Cheriton, Sandgate, and into Hythe generates traditional local service searches. Seasonal events — the Triennial, Harbour Arm festivals, and Leas Cliff Hall programming — create spikes in website traffic that are entirely wasted without lead capture mechanisms. The Folkestone & Hythe District Council regeneration programme continues to bring new residents and businesses, each representing fresh demand.',
  'Lead capture sophistication in Folkestone is minimal. Most businesses have a contact form and a phone number. The Creative Quarter businesses often rely heavily on Instagram DMs, losing the ability to systematically follow up and track conversions. Hospitality businesses on the Harbour Arm depend on walk-in trade and booking platforms without capturing direct customer relationships. The few businesses using email lists tend to send sporadic newsletters without automated sequences. In Folkestone''s evolving market, even basic lead capture implementation creates a significant competitive advantage.',
  'We design lead capture for Folkestone around the specific behaviours of each audience segment. Tourist visitors get event-triggered offers and local guides that capture email addresses before they leave the area. HS1 commuters researching during their journey get consultation booking tools optimised for mobile conversion. Local residents get instant response mechanisms that work evenings and weekends when most Folkestone businesses are closed. Every captured lead enters an automated nurture sequence tailored to their entry point and interest level.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "Tontine Street", "Sandgate", "Hythe", "Cheriton", "The Leas"]}',
  '[
    {"title": "Tourist and visitor traffic generating zero repeat business", "description": "The Harbour Arm alone draws thousands of visitors weekly during peak season. Many browse local business websites while there, but without a mechanism to capture their details, every visitor who leaves Folkestone is a one-time opportunity lost. No email, no follow-up, no way to bring them back for a return visit or convert their interest into a booking."},
    {"title": "HS1 commuters researching on mobile but hitting static contact forms", "description": "London professionals commuting from Folkestone Central research local services during their fifty-five-minute journey. They have time to browse but not to call, and a static contact form feels like shouting into a void. These high-value prospects need immediate engagement mechanisms that work in a mobile, time-limited browsing window."},
    {"title": "Reliance on Instagram DMs and booking platforms instead of owned data", "description": "Creative Quarter businesses that have built Instagram followings are conducting business through DMs — a channel they do not own and cannot automate. Hospitality businesses on the Harbour Arm depend on third-party booking platforms that take commissions and own the customer relationship. Without capturing contact details directly, you are building your business on rented ground."}
  ]',
  '[
    {"title": "Audience-specific capture mechanisms for Folkestone''s diverse market", "description": "We build different lead capture pathways for different Folkestone audiences. Tourist visitors receive downloadable local guides and event alerts in exchange for email addresses. Commuters get mobile-optimised consultation booking and callback request tools. Local residents get instant quote calculators and service comparison resources. Each path matches how that segment naturally engages."},
    {"title": "Automated nurture sequences that convert interest over time", "description": "Folkestone visitors who share their email today may not need your service for weeks or months. Our automated sequences keep your business visible throughout that consideration period — sending relevant, valuable content that builds familiarity and trust until the prospect is ready to commit. No manual follow-up required."},
    {"title": "Direct customer relationships replacing platform dependency", "description": "We help Folkestone businesses capture customer data directly rather than relying on Instagram, booking platforms, or walk-in trade alone. Every email address you own is a marketing channel you control — no algorithm changes, no commission fees, no platform risk. We build the infrastructure to grow and leverage this owned audience systematically."}
  ]',
  '[
    {"question": "What lead capture approach works for Folkestone hospitality businesses?", "answer": "Hospitality businesses on the Harbour Arm and in the Creative Quarter typically see the best results from email capture tied to genuine value — priority booking notifications, seasonal menu previews, or event invitations. We integrate these captures with your booking system so you build a direct customer database alongside your platform-dependent bookings."},
    {"question": "Can I capture leads from tourists who are only visiting temporarily?", "answer": "Yes, and you should. A tourist who visits Folkestone once and has a positive experience is a strong candidate for return visits and recommendations. We build capture mechanisms that work in the moment — mobile-optimised, quick to complete, and offering immediate value like local guides or exclusive offers that make sharing an email address feel worthwhile."},
    {"question": "How does lead capture work for a service business in the Folkestone area?", "answer": "For service businesses covering Folkestone, Sandgate, Hythe, and surrounding areas, lead capture typically involves instant callback request tools, free assessment offers, or downloadable guides addressing common customer questions. Every captured lead triggers automated follow-up so you engage prospects quickly without manual effort."},
    {"question": "Will lead capture integrate with my existing booking or CRM system?", "answer": "Yes. We integrate with all major booking platforms, CRM systems, and email marketing tools. For Folkestone businesses already using systems like OpenTable, Resy, HubSpot, or Mailchimp, captured leads flow directly into your existing workflow without creating additional administrative burden."}
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
-- 4. BUSINESS AUTOMATION — Folkestone (layout: operational)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'business-automation',
  'folkestone',
  'Folkestone''s business community is growing rapidly, but the administrative infrastructure behind most local operations has not kept pace. The creative entrepreneur running a gallery on Tontine Street is managing bookings through Instagram DMs and invoicing from a spreadsheet. The restaurant on the Harbour Arm is juggling reservations, supplier orders, and staff scheduling across five different platforms. The tradesperson covering Folkestone, Sandgate, and Hythe is spending every evening writing quotes by hand and chasing payments by phone. This manual overhead is the invisible barrier preventing Folkestone businesses from scaling with the town''s momentum. We build automation systems that connect your disparate tools into streamlined workflows — handling the repetitive admin that steals your time and letting you focus on the creative, customer-facing work that drew you to this town in the first place.',
  'Folkestone''s business mix creates diverse automation needs. The Creative Quarter hosts galleries, studios, and independent retailers that need inventory management, booking systems, and customer communication automation. The Harbour Arm''s hospitality cluster requires reservation management, supplier ordering, and event coordination. Trades and services covering the Folkestone & Hythe district need mobile-friendly job management, automated quoting, and invoice chasing. The growing population of HS1 commuter-entrepreneurs running businesses remotely from Folkestone need systems that operate autonomously during their London working hours. The Folkestone & Hythe District Council''s business support programmes recognise the need for digital infrastructure, but individual businesses still lag in implementation.',
  'Automation adoption across Folkestone businesses is very low. The creative sector tends to resist systematisation, viewing it as corporate and contrary to the artisan ethos. Hospitality businesses rely on a patchwork of booking platforms, social media, and manual processes. Traditional trades use the same methods they have used for decades. The few businesses that have automated — typically newer arrivals with London corporate experience — report dramatic improvements in response time, customer satisfaction, and personal work-life balance. The contrast creates a clear competitive divide.',
  'Our Folkestone automation approach respects the character of each business while eliminating the admin that holds it back. We do not impose corporate systems on creative enterprises. Instead, we identify the specific workflows that are costing you time and connect them through lightweight, appropriate tools. A gallery on The Old High Street gets automated exhibition enquiry handling and artist payment processing. A Harbour Arm restaurant gets linked reservation, stock, and communication systems. A tradesperson gets mobile quoting, job tracking, and automated invoicing. Every solution is built around how Folkestone businesses actually want to work.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "Tontine Street", "Sandgate", "Hythe", "Cheriton", "The Old High Street"]}',
  '[
    {"title": "Creative businesses drowning in admin they never anticipated", "description": "You moved to Folkestone to create, not to spend evenings reconciling invoices and answering booking emails. The Creative Quarter is full of talented people who started businesses around their craft and are now spending more time on administration than on the work that matters. Manual processes are suffocating the creative energy that makes Folkestone special."},
    {"title": "Hospitality operations held together by multiple disconnected platforms", "description": "A typical Harbour Arm restaurant manages reservations on one platform, suppliers on another, staff scheduling on a third, and customer communications through a combination of email, Instagram, and WhatsApp. Nothing connects. Data is duplicated, orders slip through cracks, and the owner spends the first hour of every day trying to synchronise systems that should talk to each other automatically."},
    {"title": "Sole traders losing evenings to quote writing and invoice chasing", "description": "Folkestone tradespeople covering the coastal strip from Sandgate to Hythe spend their evenings on paperwork instead of recovering from physical work. Writing quotes, sending invoices, following up on payments, and confirming appointments manually consumes ten to fifteen hours per week that could be eliminated entirely with the right automation."}
  ]',
  '[
    {"title": "Lightweight automation that respects Folkestone''s creative ethos", "description": "We build automation systems that feel natural rather than corporate. Your gallery''s enquiry flow, your studio''s booking process, your shop''s inventory management — all connected and automated but presented to your customers in a way that feels personal and considered. The admin disappears; the human touch remains."},
    {"title": "Connected hospitality operations from reservation to review", "description": "We link your booking system, table management, supplier ordering, and customer follow-up into a single automated workflow. Reservations trigger prep lists, completed meals trigger review requests, and seasonal menus automatically update across all platforms. Your Harbour Arm operation runs smoothly whether you are front-of-house or off-site."},
    {"title": "Mobile-first automation for Folkestone trades and services", "description": "We build workflows that operate from your phone because that is where Folkestone tradespeople live. Accept an enquiry, generate a quote, send it to the customer, convert it to a job, trigger completion alerts, and dispatch an invoice — all from your phone while moving between jobs across the Folkestone and Hythe area."}
  ]',
  '[
    {"question": "Will automation make my Folkestone business feel less personal?", "answer": "The opposite. Automation handles the repetitive tasks that currently prevent you from being personal. When a customer emails your gallery and receives an immediate, warm acknowledgement instead of waiting three days for a manual reply, that is better customer experience. Automation frees your time for genuine personal interaction where it matters most."},
    {"question": "I am not technical — can I manage automated systems?", "answer": "Absolutely. We build systems that are intuitive to operate and require no technical knowledge. If you can use a smartphone, you can manage the automations we create. We provide training specific to your Folkestone business and ongoing support to ensure you are confident managing everything independently."},
    {"question": "How long does it take to automate my Folkestone business?", "answer": "Core automations covering enquiry handling, quoting, and invoicing typically take two to three weeks to implement. More complex workflows involving multiple platforms take four to six weeks. We always start with the automation that saves you the most time immediately, then build out additional workflows progressively."},
    {"question": "What if my business processes change as Folkestone grows?", "answer": "The automations we build are modular and adaptable. As your Folkestone business evolves — adding services, expanding to new areas, taking on staff — we adjust your workflows accordingly. The systems grow with you rather than constraining you to processes that no longer fit."}
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
-- 5. BRANDING — Folkestone (layout: trust)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'branding',
  'folkestone',
  'Folkestone sets a higher bar for visual identity than almost any town its size. When your neighbours are street artists whose work adorns Tontine Street, when the Folkestone Triennial brings internationally curated art to your doorstep, and when the Creative Quarter has made design a defining characteristic of the town itself, generic branding is not just underwhelming — it is actively out of place. Whether you run a restaurant on the Harbour Arm, a professional practice near the Civic Centre, or a trade business covering Sandgate and Hythe, your brand needs to hold its own in a town where aesthetic standards are visibly high. We create brand identities for Folkestone businesses that are distinctive, considered, and genuinely reflective of both your business and the town''s creative character — without falling into the trap of trying too hard to be artsy when that is not who you are.',
  'Folkestone''s visual landscape has been transformed by the regeneration programme led by Roger De Haan and the Creative Foundation. Tontine Street and The Old High Street are lined with galleries, studios, and independent businesses whose visual identities contribute to the area''s overall aesthetic. The Harbour Arm has developed its own recognisable brand as a destination venue. The Leas and Leas Cliff Hall represent the town''s more traditional face. Sandgate has an affluent, understated coastal identity. Hythe retains a distinct market-town character. For businesses operating across these zones, brand identity must navigate multiple visual contexts while maintaining coherent recognition.',
  'Branding quality in Folkestone varies wildly. The Creative Quarter hosts some genuinely well-branded businesses whose owners have design backgrounds or access to creative networks. At the other end, established businesses in Cheriton and along Sandgate Road have not updated their visual identity in years. The middle ground — businesses that want professional branding but do not move in creative circles — is underserved. These firms know their brand needs work but do not know where to start in a town where the visual standard is set by professional creatives.',
  'Our Folkestone branding process starts by understanding where your business sits in the town''s visual ecosystem. A restaurant on the Harbour Arm needs a brand that feels natural alongside its neighbours. A solicitor near the Civic Centre needs identity that communicates reliability without appearing stale. A tradesperson needs vehicle livery that stands out in driveways across Sandgate and Hythe. We develop brand identities that are appropriate to your sector and your Folkestone audience, backed by guidelines that ensure consistency across every touchpoint from Tontine Street signage to Google search results.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "Tontine Street", "The Old High Street", "Sandgate", "Hythe", "The Leas"]}',
  '[
    {"title": "Your brand looks out of place in a town defined by creative excellence", "description": "Folkestone''s Creative Quarter has raised the visual bar for the entire town. A generic logo and inconsistent branding that might pass unnoticed in another town stands out here for all the wrong reasons. When your neighbours invest in distinctive visual identities and you do not, the contrast damages your credibility before a customer even engages with your service."},
    {"title": "No cohesive identity across physical and digital presence", "description": "Your Harbour Arm signage uses one style, your Instagram another, and your website something different again. In a town where visitors move seamlessly between physical spaces and digital discovery, this fragmentation confuses potential customers and undermines the recognition that builds trust over time."},
    {"title": "Uncertain how to brand professionally without looking corporate in a creative town", "description": "Many Folkestone business owners know they need professional branding but fear looking sterile or corporate in a town that celebrates creativity. This tension leads to paralysis — sticking with a DIY identity rather than investing in something that might feel at odds with Folkestone''s character. The result is no brand strategy at all."}
  ]',
  '[
    {"title": "Brand identity that belongs in Folkestone without forcing creativity", "description": "We develop visual identities that feel natural in Folkestone''s landscape — considered, distinctive, and appropriate to your business. If you are a creative enterprise, your brand reflects that with authenticity. If you are a professional service, your brand communicates expertise with the understated confidence that earns trust. We never impose a style that does not fit who you are."},
    {"title": "Unified brand presence across Folkestone''s physical and digital spaces", "description": "We design brand systems that work seamlessly from your Tontine Street shopfront to your Instagram grid to your Google listing. Every touchpoint uses the same visual language, creating the recognition and consistency that makes a Folkestone business feel established and trustworthy regardless of where a customer first encounters you."},
    {"title": "Brand guidelines built for independent Folkestone businesses", "description": "We deliver comprehensive but practical brand guidelines that your team can actually use. Templates for social media posts, specifications for signage, colour references for printers, and digital asset libraries — everything a Folkestone independent business needs to maintain brand consistency without hiring a designer for every piece of content."}
  ]',
  '[
    {"question": "How long does a brand identity project take in Folkestone?", "answer": "Most projects run four to six weeks from initial strategy to final deliverables. We invest significant time upfront understanding your position in the Folkestone market and how your brand will appear across the town''s various contexts — from the Creative Quarter to the Harbour Arm to digital search results."},
    {"question": "Can you refresh my existing brand without a complete overhaul?", "answer": "Yes. If your existing identity has equity worth preserving, we can modernise and systematise it rather than starting over. Many Folkestone businesses need tightening and consistency rather than wholesale reinvention. We assess what works, refine what does not, and build the guidelines to maintain coherence going forward."},
    {"question": "Do you design signage and shopfront branding for Folkestone premises?", "answer": "Yes. Shopfront and signage design is particularly important in the Creative Quarter and along the Harbour Arm, where physical brand presence is part of the overall visitor experience. We design signage that works within Folkestone''s distinctive streetscape and coordinate with local fabricators for production."},
    {"question": "My business serves Hythe and Sandgate too — can the brand work across areas?", "answer": "Absolutely. We design brands that maintain their identity across different contexts. Whether your livery is parked in Sandgate, your business card is handed over in Hythe, or your website is browsed from London, the brand communicates the same values and quality consistently."}
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
-- 6. SOCIAL MEDIA SETUP — Folkestone (layout: trust)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'social-media-setup',
  'folkestone',
  'Social media and Folkestone are deeply intertwined. The town''s creative identity, photogenic Harbour Arm, street art on Tontine Street, and dramatic clifftop Leas make it one of the most instagrammable towns in Kent. Local businesses benefit from this organic visual appeal, but capitalising on it requires more than posting the occasional sunset photo. The Creative Quarter businesses that thrive on social media have structured presences with consistent branding, strategic content, and clear pathways from social engagement to commercial transaction. The rest are posting randomly into a void — no profile optimisation, no content strategy, no connection between social activity and business outcomes. We set up and structure social media profiles for Folkestone businesses so they function as genuine discovery and conversion channels, not just digital notice boards that drain your time without generating returns.',
  'Folkestone''s social media ecosystem is visually driven and community-oriented. Instagram is the dominant platform for the Creative Quarter, Harbour Arm hospitality, and the tourism sector — the town''s aesthetic appeal generates natural engagement. Facebook community groups are active across the residential areas of Cheriton, Sandgate, and Hythe, functioning as primary recommendation channels for local services. The HS1 commuter community maintains a Facebook group culture of its own, sharing local tips and service recommendations. Local event promotion — Triennial exhibitions, Harbour Arm festivals, Quarterhouse programming — drives significant social engagement that businesses can tap into. TikTok is emerging among younger creative businesses in the quarter, showcasing the town''s energy to a national audience.',
  'Social media quality among Folkestone businesses splits along predictable lines. Creative Quarter businesses — run by people with design backgrounds — often have visually impressive Instagram profiles but no commercial strategy behind them. Established businesses along Sandgate Road and in Cheriton have basic Facebook pages with sporadic posting and outdated profile information. Harbour Arm restaurants and bars invest in social content during peak season but go silent in winter. Very few Folkestone businesses have profiles that are both visually appealing and strategically structured to generate measurable business results.',
  'We set up Folkestone social profiles based on where your specific audience actually engages and how they make buying decisions. A Creative Quarter gallery needs Instagram with shoppable features and exhibition announcement workflows. A tradesperson covering the Folkestone and Hythe area needs Facebook community group strategy and a review-focused Google presence. A Harbour Arm venue needs multi-platform seasonal content frameworks. We establish the profiles, create branded assets, and deliver content systems that make sustained posting achievable without consuming your creative or working time.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "Tontine Street", "Cheriton", "Sandgate", "Hythe", "The Leas"]}',
  '[
    {"title": "Beautiful content with no commercial strategy behind it", "description": "Your Instagram grid looks great — Folkestone is photogenic and your business is aesthetically appealing. But stunning posts generate likes, not customers, unless there is a strategic framework converting engagement into enquiries. Many Creative Quarter businesses have built audiences they cannot monetise because their profiles lack commercial infrastructure."},
    {"title": "Inconsistent posting that peaks in summer and vanishes in winter", "description": "Folkestone''s seasonal rhythm drives a social media pattern where businesses post actively during the busy Harbour Arm summer months and go quiet through winter. This inconsistency damages algorithmic reach and sends a signal to year-round residents that your business is not consistently operational."},
    {"title": "Active on platforms where your actual customers are not present", "description": "A builder in Cheriton investing time in Instagram while ignoring the Folkestone and Hythe Facebook groups where homeowners actually seek recommendations is wasting effort. Conversely, a Creative Quarter gallery absent from Instagram but maintaining a LinkedIn page is missing its entire audience. Platform alignment is the foundation that most Folkestone businesses get wrong."}
  ]',
  '[
    {"title": "Platform selection based on Folkestone audience behaviour", "description": "We audit where your specific customers in the Folkestone area actually spend time and make recommendations, then set up and optimise your profiles on those platforms only. Creative businesses get Instagram and potentially TikTok. Service businesses get Facebook community integration. Professional firms get LinkedIn. Every profile is configured with the right content to reach the right Folkestone audience."},
    {"title": "Branded profile assets reflecting Folkestone''s visual standards", "description": "In a town where visual identity matters more than most, your social media profiles need to meet the standard set by the Creative Quarter. We design profile images, cover photos, story highlights, and post templates that maintain your brand''s visual quality across every platform — ensuring you look as considered online as the best businesses on Tontine Street."},
    {"title": "Year-round content frameworks eliminating seasonal silence", "description": "We create content calendars that maintain consistent posting through Folkestone''s seasonal cycles. Summer brings tourism content, autumn transitions to community engagement, winter focuses on local loyalty, and spring builds anticipation for the coming season. Your audience sees a business that is present and active regardless of the time of year."}
  ]',
  '[
    {"question": "Which social platform is most important for Folkestone businesses?", "answer": "It depends on your business. Instagram dominates for the Creative Quarter, hospitality, and tourism-facing businesses. Facebook community groups are more powerful for trades and services targeting Folkestone, Sandgate, and Hythe residents. We assess your specific customer base before recommending platforms so you invest time where it generates actual business."},
    {"question": "How long does social media setup take?", "answer": "Full setup across two to three platforms typically takes one to two weeks. This includes profile creation or overhaul, branded visual assets, keyword and category optimisation, integration with your website, and delivery of a content framework with templates and scheduling guidance."},
    {"question": "I already have social media profiles — do I need setup?", "answer": "If your profiles have inconsistent branding, incomplete business information, no call-to-action links, or content that is not driving measurable results, then yes. We audit your existing presence, identify the gaps, and restructure your profiles so they function as business tools rather than casual content channels."},
    {"question": "Can you help with social media for seasonal Folkestone events?", "answer": "Yes. We build event-specific content frameworks for Folkestone businesses that benefit from seasonal peaks — the Triennial, Harbour Arm festivals, school holidays, and bank holiday weekends. These sit alongside your year-round content calendar, giving you ready-made strategies for maximising high-traffic periods."}
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
-- 7. DIGITAL MARKETING — Folkestone (layout: lead-gen)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'digital-marketing',
  'folkestone',
  'Folkestone''s economic resurgence has created a marketing landscape unlike anywhere else on the Kent coast. Tourism traffic is growing year on year, the HS1 commuter population brings London-level spending power, the Creative Quarter attracts national media attention, and the resident base is diversifying rapidly as regeneration draws new demographics to the town. For local businesses, this translates into a digital marketing opportunity that did not exist a decade ago — but capturing it requires more than posting on Instagram and hoping for the best. Effective digital marketing in Folkestone means reaching tourists before they arrive, engaging commuters during their journey, building loyalty with residents across Cheriton and Sandgate, and converting the town''s growing reputation into measurable revenue. We build integrated digital marketing strategies for Folkestone businesses that coordinate every channel toward a single goal: predictable, attributable customer acquisition.',
  'Folkestone''s digital marketing environment is shaped by multiple overlapping audiences with distinct behaviours. Tourists researching the Harbour Arm and Creative Quarter generate search and social traffic that peaks in spring and summer but maintains a baseline year-round thanks to the town''s growing reputation. HS1 commuters are active on LinkedIn and browse local services during specific time windows. The residential community across Cheriton, Sandgate, and Hythe engages through Facebook groups and local search. International visitors connected to the Channel Tunnel terminal represent a niche but valuable audience for hospitality and retail. The Folkestone Triennial and regular Harbour Arm events create predictable marketing moments that savvy businesses exploit through coordinated campaigns.',
  'Digital marketing maturity in Folkestone is low relative to the opportunity. Most businesses rely on one or two channels — typically Instagram and word of mouth — without coordinating activity across search, social, email, and paid advertising. Hospitality businesses on the Harbour Arm often depend entirely on booking platform visibility rather than building their own marketing engines. Creative businesses tend to have strong organic social presence but no paid advertising or email strategy. Traditional businesses in Cheriton and Hythe are largely absent from digital marketing altogether. The businesses growing fastest are those combining multiple channels — and they remain a small minority.',
  'Our Folkestone digital marketing approach treats the town''s multiple audiences as distinct segments requiring coordinated but different strategies. We build tourism-facing campaigns that capture planning-stage searches and social discovery weeks before visitors arrive. We target HS1 commuters with LinkedIn content and mobile-optimised paid campaigns during commute windows. We engage the local community through Facebook, Google Ads for local service searches, and email campaigns that build loyalty. Every channel is tracked through unified analytics so you can see exactly which Folkestone audience segment generates the most revenue.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "Tontine Street", "Sandgate", "Hythe", "Cheriton", "The Leas"]}',
  '[
    {"title": "Relying on a single channel in a multi-audience market", "description": "Folkestone businesses that depend solely on Instagram reach the creative audience but miss the commuters searching on Google and the homeowners asking for recommendations in Facebook groups. A single-channel approach in a town with this many distinct audience segments guarantees that you are invisible to the majority of your potential customers."},
    {"title": "Seasonal marketing that wastes the year-round opportunity", "description": "Many Folkestone businesses market aggressively in summer when the Harbour Arm is busy and go quiet through winter. But the HS1 commuter community, the resident population, and the growing remote-worker demographic are potential customers twelve months a year. Seasonal-only marketing surrenders eight months of revenue to competitors who maintain visibility year-round."},
    {"title": "No way to measure which marketing efforts generate actual customers", "description": "Your Instagram gets engagement, your Google listing gets views, and your email gets opens — but you cannot connect any of it to the customers who actually walk through your door or pick up the phone. Without unified tracking across channels, you are investing in marketing activity with no way to evaluate what works in the Folkestone market."}
  ]',
  '[
    {"title": "Multi-audience strategy built for Folkestone''s diverse market", "description": "We build separate but coordinated campaigns for each of Folkestone''s key audiences: tourists, commuters, local residents, and creative community. Each campaign uses the channels and messaging that resonate with that specific segment, while unified tracking shows how each audience contributes to your overall revenue."},
    {"title": "Year-round marketing with seasonal acceleration", "description": "We maintain consistent baseline marketing that engages Folkestone''s year-round audiences, then layer seasonal campaigns on top during peak periods — summer tourism, Triennial years, Harbour Arm events, and bank holidays. This approach ensures your business captures both the steady local demand and the high-volume tourism spikes."},
    {"title": "Revenue-attributed analytics across every channel", "description": "Every campaign we run is connected to conversion tracking that follows a prospect from first interaction to paying customer. Monthly reports show exactly how many enquiries and sales each marketing channel generated in the Folkestone market. You invest more in what works and eliminate what does not, based on data rather than gut feeling."}
  ]',
  '[
    {"question": "How much should a Folkestone business spend on digital marketing?", "answer": "Most Folkestone businesses generating between one hundred thousand and five hundred thousand in revenue should invest between five hundred and two thousand per month across all digital channels. Tourism-facing businesses may invest more during peak season. We start with an audit to identify where your budget will have the greatest immediate impact in the Folkestone market."},
    {"question": "Is digital marketing worthwhile for a small Folkestone business?", "answer": "Particularly so. Folkestone''s market is less saturated than larger towns, meaning your marketing budget goes further. The competition for paid search keywords, social media attention, and email engagement is less intense, creating an opportunity for well-executed campaigns to achieve disproportionate visibility."},
    {"question": "Should I market to tourists or focus on local Folkestone residents?", "answer": "Ideally both, but which you prioritise depends on your business model. We assess your customer mix and build a strategy that reflects where your revenue actually comes from. Many Folkestone businesses discover their local customer base is more valuable than seasonal tourism when they start tracking properly."},
    {"question": "Can you help with marketing around the Folkestone Triennial?", "answer": "Yes. Triennial years bring significant additional footfall and national media attention to Folkestone. We build dedicated marketing campaigns that capitalise on this increased visibility — capturing new audiences during the event and converting them into ongoing customers through lead capture and nurture strategies."}
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
-- 8. WORKWEAR & PRINT — Folkestone (layout: operational)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'workwear-print',
  'folkestone',
  'Physical brand presence matters differently in Folkestone than in most towns. The Creative Quarter has conditioned visitors and residents alike to notice visual quality — the signage on Tontine Street, the menus on the Harbour Arm, the fit and style of staff uniforms in independent restaurants and boutiques. In this context, generic workwear and cheap printed materials do not just fail to impress; they actively signal that your business has not risen to the standard the town now sets. Whether you need branded uniforms for a Harbour Arm kitchen team, vehicle livery visible across Sandgate and Hythe, premium business cards for networking at Quarterhouse events, or exhibition materials for the Triennial, every physical touchpoint should reflect the care and quality your Folkestone customers expect. We provide workwear, print, and physical branding that meets this standard — designed with intention and produced with precision.',
  'Folkestone''s physical branding needs span its varied business landscape. The Harbour Arm hospitality cluster requires staff uniforms, menus, and point-of-sale materials that match the venue''s destination-quality reputation. Creative Quarter galleries and shops need packaging, business cards, and exhibition materials that reflect their artistic credibility. Trades covering Folkestone, Sandgate, and Hythe need durable workwear and vehicle graphics visible in residential areas along the coast. Professional services near the Civic Centre require corporate stationery and presentation materials. Event-related printing for Harbour Arm festivals, the Triennial, and Leas Cliff Hall productions creates periodic demand for high-quality promotional materials.',
  'The workwear and print market serving Folkestone businesses is largely served by online bulk suppliers and generic local printers. The Creative Quarter''s designer community sometimes sources premium materials through London contacts, but this option is neither affordable nor accessible for most Folkestone businesses. The gap between what the town''s visual culture demands and what is readily available locally is significant. Businesses that invest in quality physical branding stand out immediately — and those that do not are noticed for the wrong reasons.',
  'We treat every physical brand item as an extension of your visual identity and your position in the Folkestone market. For hospitality businesses, we design uniforms that complement the Harbour Arm aesthetic and produce menus that match your interior design. For trades, we create vehicle livery that is memorable and legible across the coastal strip. For creative businesses, we produce print materials that meet the artistic standards of the Creative Quarter. Every item is specified, proofed, and produced to exact brand standards because in Folkestone, the details matter.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "Tontine Street", "Sandgate", "Hythe", "Cheriton", "The Leas"]}',
  '[
    {"title": "Staff appearance not matching the quality of your Folkestone venue", "description": "Your Harbour Arm restaurant has curated interiors, a thoughtful menu, and carefully selected music — but your team is wearing plain black t-shirts with no branding. In a town where dining is increasingly a destination experience, the gap between your venue quality and your staff presentation is noticed by every customer."},
    {"title": "Vehicle livery invisible against the Folkestone coastal backdrop", "description": "Your van drives through Sandgate, parks in Hythe driveways, and sits on Folkestone streets — that is hours of potential advertising daily. But if the livery is faded, poorly designed, or lacks a clear phone number and website, it generates zero enquiries. In a coastal environment where sun and salt accelerate wear, quality materials and clear design are essential."},
    {"title": "Printed materials that undermine your Creative Quarter credibility", "description": "Handing over a business card at a Quarterhouse event or displaying promotional material alongside Tontine Street galleries demands print quality that matches the creative context. Thin card stock, misaligned printing, or inconsistent branding immediately positions your business as less professional than the environment it operates in."}
  ]',
  '[
    {"title": "Workwear designed for Folkestone''s hospitality and creative sectors", "description": "We source and brand uniforms that complement the aesthetic standards of the Harbour Arm, Creative Quarter, and independent Folkestone venues. From embroidered chef jackets and custom aprons to gallery staff polos, every item is selected for quality, comfort, and visual alignment with your brand identity."},
    {"title": "Coastal-grade vehicle livery built to last", "description": "Folkestone''s coastal environment demands vehicle graphics that withstand salt air, UV exposure, and the general wear of coastal driving. We specify marine-grade vinyl and UV-resistant inks, designing livery that remains crisp and impactful for years across the Folkestone, Sandgate, and Hythe area."},
    {"title": "Premium print production for a design-conscious town", "description": "Business cards, menus, brochures, exhibition catalogues, and promotional materials — all produced to standards that hold their own in Folkestone''s visually sophisticated environment. We manage design and production end-to-end, using premium stocks, finishing techniques, and printing methods appropriate to the context in which they will be presented."}
  ]',
  '[
    {"question": "Can you produce branded uniforms for a Harbour Arm restaurant team?", "answer": "Yes. We design and produce hospitality workwear including branded chef jackets, aprons, t-shirts, and outerwear. All items are selected for kitchen durability and dining-room presentation, with your branding applied through embroidery or print methods appropriate to the garment type and your brand standards."},
    {"question": "How do you ensure vehicle graphics last in the coastal environment?", "answer": "We specify marine-grade vinyl wraps and UV-resistant inks as standard for Folkestone vehicle graphics. These materials are engineered to withstand salt air, direct sunlight, and coastal weather conditions. We work with experienced fitters who understand the environmental demands of coastal vehicle livery."},
    {"question": "Can you print exhibition materials for the Folkestone Triennial?", "answer": "Yes. We produce gallery-quality printed materials including exhibition catalogues, artist statements, promotional postcards, and signage. For Triennial participants and associated events, we ensure print quality meets the standard expected by the international arts community that the event attracts."},
    {"question": "What is your turnaround time for workwear and print orders?", "answer": "Embroidered workwear typically takes seven to ten working days from artwork approval. Printed materials vary from three to seven days depending on complexity and finishing. Vehicle graphics require three to five days for production plus installation scheduling. We offer expedited options for urgent Folkestone orders."}
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
-- 9. AI CHATBOTS — Folkestone (layout: authority)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'ai-chatbots',
  'folkestone',
  'Folkestone''s business rhythm does not follow a nine-to-five pattern. Tourists browse restaurant websites at midnight planning tomorrow''s Harbour Arm visit. HS1 commuters research local services during their early morning and evening journeys from Folkestone Central. Weekend visitors explore the Creative Quarter on their phones while walking Tontine Street. Residents in Cheriton and Sandgate search for tradespeople in the evenings when they are home from work. For most Folkestone businesses, the majority of website traffic arrives during hours when no one is available to respond. An AI-powered chatbot changes this completely — engaging every visitor in real-time conversation, answering questions about your services, checking availability, qualifying leads, and booking appointments directly into your calendar. We build intelligent conversational assistants for Folkestone businesses that deliver the instant responsiveness this always-on town demands, without requiring you or your team to be online around the clock.',
  'Folkestone''s enquiry patterns are driven by the town''s unusual mix of tourism, commuter, and residential activity. The Harbour Arm and Creative Quarter generate significant out-of-hours browsing from tourists and day-trippers researching ahead of visits. The HS1 commuter community creates concentrated browsing windows during the fifty-five-minute journey to and from London. The residential population across Cheriton, Sandgate, and Hythe follows traditional evening and weekend search patterns for local services. Seasonal events at Leas Cliff Hall, Quarterhouse, and the Harbour Arm drive spikes in enquiry volume that existing team capacity cannot absorb. For restaurants, the peak booking enquiry period often coincides with the busiest service hours — precisely when staff are least available to answer phones or respond to website messages.',
  'AI chatbot adoption in Folkestone is essentially zero. The town''s independent, creative business culture has not yet embraced conversational AI, largely because the technology has been associated with corporate customer service rather than independent business. The handful of businesses using any form of automated website engagement typically deploy basic rule-based widgets that frustrate users with limited scripted responses. This represents a clear first-mover advantage for Folkestone businesses willing to implement genuinely intelligent AI assistants that enhance rather than diminish the customer experience.',
  'We build Folkestone AI chatbots that reflect the character of each business. A Harbour Arm restaurant gets a chatbot that can describe the menu, check table availability, and take reservation requests — with the warm tone of a knowledgeable front-of-house team member. A Creative Quarter gallery gets an assistant that can discuss current exhibitions, opening times, and commission processes. A tradesperson covering the coast gets a bot that qualifies job enquiries, checks service area coverage, and schedules callbacks. Every chatbot is trained on your specific business knowledge and speaks with your brand voice.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "Tontine Street", "Sandgate", "Hythe", "Cheriton", "Folkestone Central station"]}',
  '[
    {"title": "Tourist enquiries arriving at midnight with no one to respond", "description": "A visitor planning tomorrow''s trip to the Harbour Arm visits your restaurant website at 11pm to check the menu and book a table. Your contact form offers no immediate response. By morning, they have found a competitor that confirmed their booking instantly. The tourism audience that drives Folkestone''s economy researches and books outside your operating hours."},
    {"title": "Commuter browsing window missed entirely by static websites", "description": "The fifty-five-minute HS1 journey from London is prime research time for Folkestone commuters looking for local services. They have time to browse but not to call, and a static contact form feels like shouting into the dark. Without real-time engagement during this high-intent window, these affluent local prospects move on to the next search result."},
    {"title": "Peak enquiry periods colliding with peak operational demands", "description": "Your busiest service hours are exactly when potential customers are trying to reach you. A Harbour Arm kitchen cannot answer phone calls during Saturday dinner service. A tradesperson cannot check emails while on a job in Sandgate. The enquiries that matter most arrive precisely when you are least able to handle them."}
  ]',
  '[
    {"title": "AI assistants trained on your specific Folkestone business", "description": "We train your chatbot on everything a customer might need to know: your menu and specials, your services and pricing, your coverage area across Folkestone and Hythe, your availability and booking process. The AI answers questions with the same accuracy as your best team member, available twenty-four hours a day to every visitor who lands on your site."},
    {"title": "Integrated booking and lead qualification in natural conversation", "description": "Your Folkestone chatbot does not just answer questions — it takes action. Restaurant visitors can check availability and request tables. Service business prospects can describe their needs and schedule callbacks. Gallery visitors can register interest in artworks. Every interaction is captured and routed into your existing systems automatically."},
    {"title": "Brand-matched personality that feels authentically Folkestone", "description": "We calibrate your chatbot''s tone of voice to match your brand and the Folkestone context. A Creative Quarter gallery gets an assistant that is knowledgeable and culturally literate. A Harbour Arm restaurant gets warmth and menu expertise. A trade business gets straightforward professionalism. The AI feels like a natural extension of your team, not a generic corporate widget."}
  ]',
  '[
    {"question": "Can an AI chatbot work for a Folkestone restaurant?", "answer": "Exceptionally well. Restaurant chatbots handle the enquiries that overwhelm phone lines during service — table availability, menu questions, dietary requirements, group booking requests, and event information. Visitors get instant answers at any hour, and your front-of-house team is freed from phone duties during the busiest Harbour Arm service periods."},
    {"question": "Will the chatbot feel impersonal to Folkestone''s independent business customers?", "answer": "Not if it is built properly. We calibrate personality, vocabulary, and conversational style to match your brand. In Folkestone''s independent business culture, the key is warmth and knowledge — which a well-trained AI delivers more consistently than a hurried phone response during your busiest hour. Most customers appreciate the immediate, helpful interaction."},
    {"question": "How long does it take to get a chatbot running?", "answer": "Initial deployment takes two to three weeks, including business knowledge training, conversation flow design, booking system integration, and testing against the specific types of enquiries your Folkestone business receives. We refine the AI continuously after launch as real conversations reveal new questions and optimisation opportunities."},
    {"question": "What happens when the chatbot encounters a question it cannot answer?", "answer": "It escalates gracefully. The AI collects the visitor''s contact details, explains that a team member will follow up, and flags the conversation for your attention. No visitor is left stranded. We also use unanswered questions to expand the chatbot''s training, ensuring it handles similar queries in future."}
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
-- 10. AI CONTENT — Folkestone (layout: authority)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'ai-content',
  'folkestone',
  'Folkestone''s growing national profile has created a content opportunity that most local businesses are completely failing to capitalise on. Searches related to the town are increasing across tourism, relocation, creative economy, dining, and local services — driven by media coverage of the Creative Quarter, the Folkestone Triennial, the Harbour Arm, and the HS1 commuter lifestyle. Yet when someone searches for information about Folkestone businesses, they find thin service pages, generic descriptions, and blog sections that were last updated years ago. Google rewards websites that demonstrate genuine expertise and authentic local knowledge. For Folkestone businesses willing to invest in quality content, the returns are disproportionate because the competition is so minimal. We use AI-assisted content production to create the high-quality, locally specific articles, guides, and web pages that position your Folkestone business as the authoritative voice in your field — at a pace and cost that manual content production cannot match.',
  'Folkestone''s content landscape is rich with untapped opportunities. The Creative Quarter and Triennial generate search interest in art, culture, and the creative economy that local businesses can capture with relevant content. The Harbour Arm''s dining scene creates food and lifestyle search demand. The HS1 commuter corridor drives searches about living in Folkestone, local services, and the town''s evolving character. The tourism sector generates informational searches about attractions, events, and practical visitor information. The Folkestone & Hythe district''s ongoing regeneration produces news and feature search demand. For service businesses in Cheriton, Sandgate, and Hythe, local content addressing area-specific concerns captures the long-tail searches that generic competitors ignore.',
  'Content marketing adoption among Folkestone businesses is remarkably low. The Creative Quarter tends to communicate through visual social media rather than written content. Hospitality businesses rarely produce content beyond basic menus and event listings. Professional services have minimal web content. Traditional trades across the Folkestone and Hythe area typically have nothing beyond basic service pages. The few businesses publishing regular, quality content enjoy outsized visibility because they face almost no competition for Folkestone-specific search terms.',
  'Our AI-assisted content strategy for Folkestone combines the town''s rich local context with search demand data and your specific business expertise. We identify the questions your potential customers are actually asking — about the Creative Quarter, about living near the HS1, about services in Sandgate and Hythe — and create content that answers them with genuine authority. AI handles the research and drafting at scale, while our editorial team ensures every piece contains authentic Folkestone knowledge, accurate details, and the quality that builds Google''s trust in your site.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "Tontine Street", "The Old High Street", "Sandgate", "Hythe", "Cheriton"]}',
  '[
    {"title": "Growing Folkestone search demand with no content to capture it", "description": "Searches about Folkestone businesses, services, and lifestyle are increasing every year as the town''s profile rises. But your website has the same three service pages it launched with. This growing search demand is being captured by national directories, travel sites, and the handful of local businesses that have invested in content — not by you."},
    {"title": "Social media presence substituting for the content Google needs", "description": "Your Folkestone business may have a vibrant Instagram following, but Instagram content does not rank on Google. The tourists, commuters, and residents who search for services in Folkestone will never find your Instagram posts in their Google results. Without indexable website content, your strongest marketing channel is invisible to search engines."},
    {"title": "No time to write content when you are running a busy Folkestone business", "description": "Between serving customers on the Harbour Arm, managing projects across Sandgate and Hythe, or running a Creative Quarter studio, there is no time left for writing blog posts and guides. The intention is there but the execution stalls — and months pass without any new content while competitors gradually build the organic visibility you are missing."}
  ]',
  '[
    {"title": "AI-powered content production with authentic Folkestone knowledge", "description": "We produce articles, guides, and service pages that combine genuine local knowledge of Folkestone with the search optimisation that drives organic visibility. AI accelerates the production process, but every piece is reviewed by editors who know the difference between the Harbour Arm and the Harbour — ensuring your content rings true to locals and visitors alike."},
    {"title": "Content strategy aligned to Folkestone''s unique search landscape", "description": "We map the specific searches happening around Folkestone — tourism queries, commuter lifestyle questions, Creative Quarter interest, local service comparisons — and build a content calendar that systematically addresses these opportunities. Each piece targets a genuine content gap, capturing search traffic your competitors are not even aware of."},
    {"title": "Compounding organic authority in a low-competition market", "description": "Because so few Folkestone businesses invest in content, each quality article you publish has an outsized impact on your organic visibility. Over six to twelve months, a consistent publishing strategy builds the topical authority that makes Google prefer your site for every related search — creating a compounding advantage that is increasingly difficult for competitors to overcome."}
  ]',
  '[
    {"question": "Will AI content feel authentic to Folkestone readers?", "answer": "It will, because we ensure it is. Every piece goes through editorial review by people who know Folkestone — checking local references, verifying details, and ensuring the content reads as genuinely knowledgeable rather than generically assembled. The AI accelerates production; the human editorial process guarantees authenticity."},
    {"question": "How much content should a Folkestone business publish?", "answer": "For most Folkestone businesses, two to four quality articles per month builds meaningful organic visibility within six months. In Folkestone''s relatively uncrowded content landscape, consistent quality matters more than volume. We focus on publishing content that fills genuine gaps rather than churning articles for the sake of frequency."},
    {"question": "Can you create content about the Creative Quarter and Folkestone culture?", "answer": "Yes, and this is often some of the most valuable content a Folkestone business can publish. Articles connecting your expertise to the town''s cultural identity — whether that is the Triennial, the Harbour Arm dining scene, or the creative economy — capture search interest from audiences specifically interested in what makes Folkestone distinctive."},
    {"question": "Does Google penalise AI-generated content?", "answer": "Google penalises low-quality content regardless of how it was produced. Our process uses AI as a production tool while maintaining the editorial standards Google rewards: genuine expertise, accurate information, and real value for the reader. Every piece is reviewed, fact-checked, and enriched with authentic Folkestone knowledge before publication."}
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
-- 11. AI AUTOMATION — Folkestone (layout: authority)
-- =============================================================================
INSERT INTO local_content (
  service_slug, town_slug, intro_paragraph, local_context, competition_landscape,
  success_approach, local_stats, pain_points, solutions, faqs, layout_variant
) VALUES (
  'ai-automation',
  'folkestone',
  'Folkestone''s independent business community prides itself on personal service and creative authenticity — qualities that feel incompatible with artificial intelligence until you see what AI automation actually does in practice. It does not replace the personal touch that makes a Harbour Arm restaurant memorable or a Creative Quarter gallery distinctive. It eliminates the invisible administrative burden that prevents you from delivering that personal touch consistently. AI-powered systems can read and sort your emails, extract booking details from messages, generate personalised responses to routine enquiries, process invoices, and handle the repetitive decision-making that currently eats into your creative or service time. For Folkestone businesses operating with small teams and big ambitions, AI automation is the operational infrastructure that lets you scale without sacrificing the character that your customers value.',
  'Folkestone''s business community faces AI automation opportunities that reflect the town''s unique economic structure. The Creative Quarter''s galleries, studios, and independent retailers handle enquiry management, commission tracking, and exhibition coordination that AI can streamline. Harbour Arm hospitality businesses manage reservations, supplier communications, stock monitoring, and customer follow-up across multiple platforms. Trades and services covering the Folkestone & Hythe coastal strip juggle mobile job management, quoting, and invoicing. HS1 commuter-entrepreneurs running businesses remotely need systems that function autonomously during their London working hours. The seasonal variation in business volume — peaking with Harbour Arm summer trade and Triennial years — creates demand spikes that static team capacity cannot absorb without automation.',
  'AI automation awareness in Folkestone is growing through the town''s tech-curious creative community, but practical implementation remains extremely rare. Most businesses have heard of ChatGPT and similar tools but have no idea how to apply AI to their actual operations. The Creative Quarter''s independent ethos has created some resistance to automation perceived as corporate or impersonal. This combination of awareness without implementation represents a clear opportunity: Folkestone businesses that adopt AI automation now gain a significant operational advantage while the rest of the market hesitates.',
  'Our approach to AI automation in Folkestone respects the independent character that defines the town''s business culture. We do not implement heavy enterprise systems. We identify the specific repetitive tasks consuming your time — reading and sorting emails, generating routine responses, processing bookings, extracting data from documents — and build lightweight AI workflows that handle them quietly in the background. A gallery owner on The Old High Street gets automated enquiry handling and artist payment processing. A restaurant on the Harbour Arm gets AI-managed reservation confirmations and review response drafting. A tradesperson gets intelligent quote generation and job scheduling. Every automation is designed to be invisible to your customers while saving you hours every week.',
  '{"population": 53000, "business_count": "2200+", "key_areas": ["Creative Quarter", "Harbour Arm", "Tontine Street", "The Old High Street", "Sandgate", "Hythe", "Cheriton"]}',
  '[
    {"title": "Small teams overwhelmed by administrative volume they never planned for", "description": "You started your Folkestone business to create, cook, design, or build — not to spend half your week processing emails, chasing invoices, and updating spreadsheets. As the town''s economy grows, enquiry and administrative volumes increase, but your team does not. The admin that was manageable two years ago now consumes entire days."},
    {"title": "Seasonal demand spikes exposing operational fragility", "description": "Summer on the Harbour Arm, a Triennial year, or a viral social media moment can triple your enquiry volume overnight. Without automated systems, your small Folkestone team cannot absorb the spike — response times increase, bookings are missed, and the reputation you have built suffers precisely when the most people are watching."},
    {"title": "Resistance to automation based on outdated perceptions of AI", "description": "Many Folkestone business owners associate automation with corporate call centres and impersonal chatbots. This misconception prevents them from adopting AI tools that would handle their most tedious tasks — the email sorting, data entry, and routine responses that have nothing to do with the personal service their customers value."}
  ]',
  '[
    {"title": "Invisible AI workflows that handle admin without losing authenticity", "description": "We build automations that operate behind the scenes: sorting and prioritising your inbox, drafting responses to routine enquiries in your brand voice, extracting booking details from messages and populating your systems, and processing invoices automatically. Your Folkestone customers see faster, more consistent service. They never see the AI."},
    {"title": "Scalable operations for seasonal demand variation", "description": "AI systems handle increased volume without additional cost or team expansion. When your Harbour Arm business hits summer peak or a Triennial-driven surge, the same automations that handle your winter baseline absorb the extra demand seamlessly. No temporary staff, no dropped enquiries, no deterioration in response quality."},
    {"title": "Gradual implementation that builds confidence progressively", "description": "We start with a single high-impact automation — typically email handling or enquiry response — so you can see the results and build confidence before expanding. For Folkestone businesses cautious about AI, this gradual approach demonstrates real value without requiring a leap of faith into full automation."}
  ]',
  '[
    {"question": "Will AI automation make my Folkestone business feel less personal?", "answer": "The opposite. By handling repetitive admin, AI frees you to be more personal with every customer interaction that matters. The restaurant owner who no longer spends mornings processing emails has more time to greet guests. The gallery owner who no longer chases invoices manually has more time to discuss art. AI removes the admin barrier between you and your customers."},
    {"question": "Is AI automation affordable for a small Folkestone independent business?", "answer": "Yes. The AI tools powering modern automation are dramatically more affordable than enterprise software. Most Folkestone small businesses can implement meaningful automation for between fifty and two hundred pounds per month — a fraction of the cost of additional staff hours and significantly less than the revenue lost to slow response times and dropped enquiries."},
    {"question": "What tasks should a Folkestone business automate first?", "answer": "We recommend starting with the task that wastes the most time or loses the most revenue. For most Folkestone businesses, that is enquiry response — ensuring every website visitor, email, and message receives an immediate, intelligent reply. This single automation typically saves three to five hours per week and prevents the lead leakage that costs the most in missed business."},
    {"question": "Can AI automation work alongside my existing tools and platforms?", "answer": "Yes. We integrate AI workflows with the tools your Folkestone business already uses — whether that is Gmail, Instagram, booking platforms, accounting software, or project management tools. The automation connects your existing systems rather than replacing them, adding intelligence to the tools you already know."}
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
