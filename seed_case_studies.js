const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const caseStudies = [
  {
    title: 'SafeLee Inspection & Consultancy',
    slug: 'safelee-inspection-consultancy',
    summary: 'A professional website build and local SEO strategy for a statutory equipment inspection firm, establishing credibility and driving organic enquiries across the North West.',
    industry: 'Health & Safety Compliance',
    town: 'Manchester',
    businessName: 'SafeLee Inspection & Consultancy Ltd',
    websiteUrl: 'https://www.safeleeinspectionconsultancy.com',
    services_used: ['Web Design', 'Local SEO'],
    challenge: 'SafeLee had no professional web presence despite offering critical compliance services — LOLER, PSSR, PUWER, and COSHH LEV inspections. Without a website, they relied entirely on word-of-mouth referrals and were invisible to businesses actively searching for inspection services online. Larger competitors dominated search results, making it nearly impossible for this specialist independent firm to compete for new contracts.',
    solution: 'We designed and built a clean, authoritative website that clearly communicates SafeLee\'s credentials, service scope, and accreditations. Each inspection service — from lifting equipment to pressure systems — was given its own dedicated page, structured for both user clarity and search engine indexing. We implemented a targeted local SEO strategy covering Manchester, the North West, and UK-wide commercial terms, combined with schema markup to strengthen their presence in local search results.',
    resultsSummary: 'SafeLee went from zero online visibility to appearing on page one for key inspection terms across the North West, generating a steady stream of qualified compliance enquiries without any paid advertising.',
    metrics: ['Page 1 for Core Inspection Terms', 'Zero to Consistent Organic Leads', 'Professional Online Authority Established'],
    outcome: 'Built professional authority from scratch',
    content: `
      <h2>Building Credibility From the Ground Up</h2>
      <p>SafeLee Inspection & Consultancy Ltd provides statutory thorough examinations under LOLER, PSSR, PUWER, and COSHH LEV regulations — services that businesses are legally required to undertake. Despite the critical nature of this work, SafeLee had no website and no digital footprint. Their Managing Director, Lee Charnock, had built a solid reputation through direct relationships, but growth was capped by the limits of personal networking alone.</p>
      <p>The challenge was twofold: first, establish an online presence that reflects the professionalism and regulatory seriousness of the services offered; second, ensure that businesses searching for inspection services in Manchester and across the North West would find SafeLee before their larger, more established competitors.</p>

      <h2>A Website That Works as Hard as the Team</h2>
      <p>We built a purpose-driven website around SafeLee's core service areas. Rather than bundling everything into a single page, each inspection discipline — lifting equipment, pressure systems, work equipment, LEV testing, and work-at-height assessments — received its own dedicated landing page with in-depth explanations of what each examination involves, why it matters legally, and how SafeLee delivers it.</p>
      <p>This structure serves two purposes. For potential clients, it immediately demonstrates specialist knowledge and makes it easy to find exactly the service they need. For search engines, it creates a network of highly relevant, keyword-targeted pages that signal topical authority across the inspection compliance niche.</p>

      <h2>Local SEO That Reaches Beyond Manchester</h2>
      <p>While SafeLee is based in Irlam, their work takes them across Greater Manchester, Liverpool, Preston, Wigan, and beyond. We built the SEO strategy to reflect this geographic reach, targeting commercial search terms like "LOLER inspection Manchester", "pressure systems examination North West", and "thorough examination services UK". Directory citations, Google Business Profile optimisation, and technical on-page work all contributed to rapid indexing and ranking improvements.</p>

      <h2>The Outcome</h2>
      <p>Within months, SafeLee was appearing on the first page of Google for their primary service terms in Manchester and surrounding areas. The website now serves as their primary lead generation channel, with enquiries coming directly from businesses needing compliance inspections — exactly the type of work SafeLee specialises in. The firm has been able to expand its client base significantly without relying on paid advertising or third-party platforms.</p>
    `,
  },
  {
    title: 'Therapy Hair Body & Nails',
    slug: 'therapy-hair-body-nails',
    summary: 'A complete website design and SEO package for an established hair and beauty salon, transforming their booking pipeline and local search visibility.',
    industry: 'Hair & Beauty',
    town: 'Kent',
    businessName: 'Therapy Hair Body & Nails',
    websiteUrl: 'https://www.therapyhairbodynails.co.uk',
    services_used: ['Web Design', 'Local SEO'],
    challenge: 'Therapy Hair Body & Nails had an outdated Wix website that wasn\'t mobile-optimised and failed to showcase their full range of treatments. The salon was losing potential bookings to competitors with more polished online presences, and their Google visibility for local beauty-related searches was minimal. Walk-in traffic alone wasn\'t enough to fill appointment books consistently.',
    solution: 'We designed a sleek, modern website that puts their services front and centre — from hair treatments and nail services to body therapies. The site was built mobile-first, reflecting how most salon clients browse and book. We integrated clear calls-to-action on every page, making it effortless to enquire or book directly. A comprehensive local SEO campaign targeted high-intent searches like "hair salon near me", "nail technician [area]", and treatment-specific terms across their service radius.',
    resultsSummary: 'The salon saw a significant increase in online bookings and enquiries, with Google visibility improving across all core treatment categories. New clients specifically cited finding them through Google search.',
    metrics: ['Mobile-First Design Deployed', 'Local Search Rankings Achieved', 'Consistent Online Booking Enquiries'],
    outcome: 'Transformed online booking pipeline',
    content: `
      <h2>From Outdated Template to Booking Machine</h2>
      <p>Therapy Hair Body & Nails is an established salon offering a comprehensive range of treatments — hair styling and colouring, nail services, body treatments, and beauty therapies. Despite a loyal existing client base, their online presence was letting them down. The previous website, built on a basic Wix template, loaded slowly on mobile devices, buried key service information, and gave no clear path for potential clients to book or enquire.</p>
      <p>In the hair and beauty industry, first impressions are everything. A salon's website is often the very first point of contact for a new client, and if it doesn't immediately communicate quality, professionalism, and warmth, that potential booking goes straight to a competitor.</p>

      <h2>Designing for the Way Clients Actually Book</h2>
      <p>We rebuilt the site from scratch with a mobile-first approach. Over 80% of salon searches happen on smartphones — someone looking for "hair salon near me" while on the go. The new design loads in under two seconds, showcases treatment categories with clean imagery, and places booking enquiry buttons within thumb-reach on every page.</p>
      <p>Each treatment category was given its own structured page with descriptions, what to expect, and clear pricing guidance. This not only helps potential clients make decisions faster but creates dedicated landing pages that rank individually for specific treatment searches.</p>

      <h2>Getting Found Where It Matters</h2>
      <p>The local SEO strategy focused on the treatments and areas where the salon operates. We optimised their Google Business Profile with accurate categories, service listings, and regular updates. On-site, we built content around the specific searches their ideal clients make — from general terms like "beauty salon near me" to specific queries like "balayage [local area]" or "gel nails [town]".</p>
      <p>We also addressed their citation consistency across directories and review platforms, ensuring the salon's name, address, and phone number were uniform everywhere Google looks.</p>

      <h2>Bookings That Come to Them</h2>
      <p>The impact was clear within weeks of launch. The salon began receiving direct enquiries through the website from clients who had found them via Google — many of whom had never heard of the salon before. The combination of a professional design that builds instant trust and search visibility that puts them in front of new audiences has created a reliable pipeline of new bookings that supplements their existing client base.</p>
    `,
  },
  {
    title: 'How To Automate My Business',
    slug: 'how-to-automate-my-business',
    summary: 'Building the digital home for an AI consultancy and automation platform, designed to educate UK SMEs and convert them into consulting clients.',
    industry: 'AI & Automation',
    town: 'Kent',
    businessName: 'How To Automate My Business',
    websiteUrl: 'https://www.howtoautomatemybusiness.co.uk',
    services_used: ['Web Design', 'Local SEO'],
    challenge: 'How To Automate My Business needed a professional web platform to establish authority in the emerging AI consultancy space for UK SMEs. The market is flooded with vague AI promises and jargon — the challenge was building a site that cuts through the noise, clearly explains practical automation benefits, and positions the brand as the approachable, no-nonsense authority for businesses that know they need AI but don\'t know where to start.',
    solution: 'We designed and developed a content-rich website that educates and converts. The site maps clearly to the core service offering — AI consultancy, custom software development, process mapping, and SOP automation — with dedicated pages for each industry vertical served (retail, hospitality, construction, healthcare, professional services, manufacturing). The messaging deliberately avoids tech jargon, focusing instead on tangible business outcomes and ROI. SEO was structured around commercial intent terms across Kent, London, Essex, and East Sussex.',
    resultsSummary: 'The platform launched as a fully positioned authority in the UK SME automation space, with structured content driving organic visibility and qualified consulting enquiries from day one.',
    metrics: ['Authority Platform Established', 'Multi-Industry SEO Coverage', 'Qualified Consulting Leads from Launch'],
    outcome: 'Authority platform for AI consultancy',
    content: `
      <h2>Creating the Voice of Practical AI Adoption</h2>
      <p>How To Automate My Business exists to bridge the gap between AI potential and practical implementation for UK small and medium enterprises. The stats tell the story: 82% of UK SMEs say AI is important to their future, yet only 15% have actually implemented any form of automation. This massive gap represents both the opportunity and the challenge — businesses know they need to act, but they don't know how, who to trust, or where to start.</p>
      <p>The brief was clear: build a digital platform that positions HTAMB as the trusted, jargon-free guide for business owners ready to take that first step. Every element of the site needed to educate, reassure, and ultimately convert visitors into consulting clients.</p>

      <h2>Structured for Every Industry</h2>
      <p>Rather than presenting automation as a one-size-fits-all concept, we built dedicated industry pages covering the six sectors HTAMB serves — retail, hospitality, professional services, construction, healthcare, and manufacturing. Each page speaks directly to the pain points, workflows, and opportunities specific to that sector. A construction firm doesn't face the same automation challenges as a healthcare practice, and the content reflects this.</p>
      <p>This structure serves dual purposes. For visitors, it immediately signals relevant expertise. For search engines, it creates a deep network of topically focused pages that compete for industry-specific automation queries across the South East.</p>

      <h2>Messaging That Converts</h2>
      <p>The biggest barrier to AI adoption isn't technology — it's trust and understanding. The entire site was written to demystify the process. Service pages explain exactly what happens during an AI consultancy engagement, what custom software development looks like in practice, and how process mapping translates into real operational savings. No buzzwords, no inflated promises — just clear, honest communication about what automation can and can't do for a specific business.</p>

      <h2>Positioned to Grow</h2>
      <p>From launch, the site has been generating organic visibility for AI consultancy and business automation terms across Kent, London, Essex, and East Sussex. The content foundation is designed to scale — as new case studies, guides, and tools are added, the site's authority compounds. For a brand in an emerging market, establishing this kind of structured digital presence early is a significant competitive advantage.</p>
    `,
  },
];

async function seed() {
  console.log('Starting case studies seeder...');

  // First, remove old dummy case studies
  const dummySlugs = [
    'trades-business-website-redesign',
    'local-service-seo-improvement',
    'lead-capture-optimisation',
    'business-automation-setup',
    'branding-and-website-launch',
  ];

  for (const slug of dummySlugs) {
    const { error } = await supabase.from('case_studies').delete().eq('slug', slug);
    if (!error) console.log(`Removed dummy: ${slug}`);
  }

  for (const cs of caseStudies) {
    const resultsPayload = {
      industry: cs.industry,
      town: cs.town,
      businessName: cs.businessName,
      websiteUrl: cs.websiteUrl,
      services_used: cs.services_used.join(', '),
      challenge: cs.challenge,
      solution: cs.solution,
      resultsSummary: cs.resultsSummary,
      metrics: cs.metrics,
      content: cs.content,
      servicesArray: cs.services_used.map(s => {
        if (s === 'Web Design') return 'web-design';
        if (s === 'Local SEO') return 'seo';
        if (s === 'Lead Capture Systems') return 'lead-capture';
        if (s === 'Business Automation') return 'business-automation';
        return 'web-design';
      }),
      industrySlug: cs.industry.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      townSlug: cs.town.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    };

    const { data: existing } = await supabase.from('case_studies').select('id').eq('slug', cs.slug).single();

    if (existing) {
      console.log(`Updating ${cs.slug}`);
      await supabase.from('case_studies').update({
        title: cs.title,
        slug: cs.slug,
        summary: cs.summary,
        results: JSON.stringify(resultsPayload),
        status: 'published',
        updated_at: new Date().toISOString(),
      }).eq('id', existing.id);
    } else {
      console.log(`Inserting ${cs.slug}`);
      await supabase.from('case_studies').insert({
        title: cs.title,
        slug: cs.slug,
        summary: cs.summary,
        results: JSON.stringify(resultsPayload),
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  }

  console.log('Case studies seeder complete.');
}

seed().catch(err => {
  console.error(err);
});
