const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const generateCaseStudyContent = (title, businessType, location, outcome) => {
  const p1 = `When a ${businessType.toLowerCase()} operates in a competitive local environment like ${location}, standing out requires significantly more than just a basic online presence. This case study details exactly how we achieved ${outcome.toLowerCase()}, transforming their digital infrastructure from a static brochure into a high-performance customer acquisition engine. The digital landscape across Kent places immense pressure on local service providers to validate their expertise immediately when a homeowner or business searches for their services. By addressing core technical deficiencies and implementing targeted growth frameworks, we completely repositioned their brand in the local market.`;
  
  const p2 = `Before our intervention, the operational momentum was severely restricted by their underlying technology. The primary challenge wasn't a lack of skill or poor service quality—it was simply that potential clients in the local radius could not easily find them, and if they did, the digital experience failed to communicate trust effectively. This created an over-reliance on inconsistent word-of-mouth referrals and expensive external lead generation platforms that degraded profit margins. A comprehensive technical audit immediately highlighted severe speed issues, unstructured content indexing, and a complete absence of localized search signaling.`;
  
  const p3 = `The strategic solution required a full architectural rebuild rather than incremental patches. We deployed a highly optimized, lightning-fast web infrastructure engineered explicitly for conversion velocity. Every element of the user interface was mapped to guide visitors seamlessly toward an immediate enquiry. Simultaneously, we launched an aggressive local SEO campaign targeting high-intent commercial keywords across their exact service radius, ensuring their business surfaced precisely when clients required immediate assistance. The entire system was then reinforced with backend automation to capture and process these incoming leads 24/7 without manual intervention.`;
  
  const p4 = `The metrics following the deployment clearly demonstrate the critical necessity of modernizing local business infrastructure. Within a remarkably short timeframe, organic visibility scaled drastically, leading to a profound surge in direct, high-quality inbound enquiries. They no longer compete exclusively on price because their digital presence unequivocally establishes them as the premium, most reliable authority in their sector. This predictability in lead flow has allowed their management team to focus entirely on operational scaling and hiring, rather than agonizing over where the next contract will originate.`;
  
  const expansion = `To fully understand the magnitude of this transformation, we must examine the intersection of web design, local SEO, and conversion psychology. A standard website acts passively; it merely exists on a server hoping a user might stumble across it. In contrast, the system we constructed operates actively. It intercepts user search intent locally, presents compelling value propositions instantly, and removes every psychological barrier preventing the user from submitting their contact details. This active capture mechanism is what separates stagnant local enterprises from those that dominate their region. By treating their online presence as a primary operational asset, this business has secured a definitive advantage over local competitors who continue to rely on obsolete marketing methodologies. As consumer behavior continues its rapid shift toward exclusive online research, establishing this type of unshakeable digital foundation is not merely advantageous—it is the baseline requirement for survival and exponential growth in the Kent commercial ecosystem.`;

  return `
    <h2>The Full Transformation</h2>
    <p>${p1}</p>
    <p>${p2}</p>
    <h2>Strategic Overhaul</h2>
    <p>${p3}</p>
    <h2>Long-Term Impact</h2>
    <p>${p4}</p>
    <h2>Detailed Analysis of Growth</h2>
    <p>${expansion}</p>
    <p>This implementation proves that upgrading your business technology directly correlates with escalated revenue. If you are operating within a similar sector and experiencing stagnant growth due to poor online visibility, this exact growth model can be replicated and deployed for your enterprise.</p>
  `;
};

const caseStudies = [
  {
    title: 'Trades Business Website Redesign',
    slug: 'trades-business-website-redesign',
    summary: 'A complete custom website rebuild for a local builder, focusing on showcasing core services, increasing site speed, and driving immediate quote requests.',
    industry: 'Construction & Builders',
    town: 'Ashford',
    services_used: ['Web Design', 'Local SEO'],
    challenge: 'The business had an outdated, slow-loading website that failed to display their recent high-end projects accurately. They were losing local search visibility to newer competitors and relying too heavily on low-margin word-of-mouth jobs.',
    solution: 'We engineered a bespoke, high-performance website emphasizing high-resolution project galleries and clear conversion pathways. We overhauled their Local SEO across Ashford, ensuring they dominate search results for highly profitable building terms.',
    resultsSummary: 'A 300% increase in monthly site traffic, resulting in a consistent pipeline of high-value extension and renovation enquiries locally.',
    metrics: ['300% Increase in Traffic', 'Top 3 Ranking for Core Terms', 'Conversion Rate Doubled'],
    outcome: 'Doubled conversion rates',
  },
  {
    title: 'Local Service SEO Improvement',
    slug: 'local-service-seo-improvement',
    summary: 'An aggressive local SEO campaign for a regional plumbing firm, designed to capture emergency search intent and dominate the Google Map Pack.',
    industry: 'Plumbing & Heating',
    town: 'Canterbury',
    services_used: ['Local SEO', 'Business Automation'],
    challenge: 'Despite excellent service, the firm was completely invisible for emergency plumbing searches in Canterbury. They were paying premium rates for third-party lead services that yielded poor quality clients.',
    solution: 'We restructured their entire search presence, optimizing their Google Business Profile and building out specific granular service-location pages to intercept high-intent emergency searches. We integrated automation to instantly reply to urgent quote requests.',
    resultsSummary: 'Captured the #1 spot in the local map pack, completely eliminating the need for expensive third-party lead generation tools.',
    metrics: ['#1 Local Map Pack Status', 'Zero ad spend required', '40+ organic leads monthly'],
    outcome: 'Captured #1 local ranking',
  },
  {
    title: 'Lead Capture Optimisation',
    slug: 'lead-capture-optimisation',
    summary: 'Redesigning the conversion funnels for a professional service firm, turning passive traffic into active, qualified sales calls.',
    industry: 'Accountants & Financial',
    town: 'Maidstone',
    services_used: ['Lead Capture Systems', 'Web Design'],
    challenge: 'The firm was generating adequate traffic, but visitors simply weren\'t contacting them. The existing website was text-heavy, complicated, and provided no clear call-to-action for prospective clients.',
    solution: 'We stripped away the complexity, deploying targeted landing pages with frictionless lead capture forms. We introduced lead magnets (tax guides) to capture early-stage prospects and implemented automated email nurturing sequences.',
    resultsSummary: 'The firm experienced a massive surge in qualified consultations, with the new automated systems doing the heavy lifting of qualifying clients before they even pick up the phone.',
    metrics: ['5x Increase in Consultations', 'Fully automated nurturing', 'Reduced bounce rate by 50%'],
    outcome: 'Massive surge in qualified leads',
  },
  {
    title: 'Business Automation Setup',
    slug: 'business-automation-setup',
    summary: 'Implementing comprehensive backend automation for a high-volume removal company to handle the influx of quoting requests seamlessly.',
    industry: 'Removal & Storage',
    town: 'Dartford',
    services_used: ['Business Automation', 'Lead Capture Systems'],
    challenge: 'The administrative team was drowning in repetitive data entry. Calculating quotes manually meant slow response times, resulting in lost business to competitors who replied faster.',
    solution: 'We built a fully automated quoting and follow-up sequence. Leads fill out a dynamic online form, and our system calculates distance/volume to instantly issue a provisional estimate and schedule follow-ups via email and SMS.',
    resultsSummary: 'Response times dropped from 24 hours to 0 seconds. The business secured more bookings while simultaneously reducing their administrative overhead costs drastically.',
    metrics: ['Instant quote deployment', '15 admin hours saved per week', '35% higher booking rate'],
    outcome: 'Zero delay response times',
  },
  {
    title: 'Branding and Website Launch',
    slug: 'branding-and-website-launch',
    summary: 'A complete foundational digital launch for a newly established electrical contractor aiming to rapidly secure commercial maintenance contracts.',
    industry: 'Electrical Contractors',
    town: 'Sevenoaks',
    services_used: ['Web Design', 'Local SEO'],
    challenge: 'A brand new business with zero market presence, needing to immediately compete with deeply established local electrical firms for high-value commercial and domestic work.',
    solution: 'We designed a premium brand identity that instills immediate trust, paired with an ultra-fast website heavily optimized for Sevenoaks searches. We established strong local directory citations to rapidly accelerate indexing.',
    resultsSummary: 'The business bypassed years of slow organic growth, instantly appearing as a highly professional, authoritative operator and securing their first major commercial contract within 60 days.',
    metrics: ['Premium Brand Established', 'Page 1 Rankings in 3 months', 'Major commercial contract secured'],
    outcome: 'Instant market authority',
  }
];

async function seed() {
  console.log('Starting case studies seeder...');
  
  for (const cs of caseStudies) {
    const longContent = generateCaseStudyContent(cs.title, cs.industry, cs.town, cs.outcome);
    
    // Create the huge JSON block for the results field
    const resultsPayload = {
      industry: cs.industry,
      town: cs.town,
      services_used: cs.services_used.join(', '),
      challenge: cs.challenge,
      solution: cs.solution,
      resultsSummary: cs.resultsSummary,
      metrics: cs.metrics,
      content: longContent,
      servicesArray: cs.services_used.map(s => {
        if (s === 'Web Design') return 'web-design';
        if (s === 'Local SEO') return 'seo';
        if (s === 'Lead Capture Systems') return 'lead-capture';
        if (s === 'Business Automation') return 'business-automation';
        return 'web-design';
      }),
      industrySlug: cs.industry.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      townSlug: cs.town.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
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
        updated_at: new Date().toISOString()
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
        updated_at: new Date().toISOString()
      });
    }
  }
  
  console.log('Case studies seeder complete.');
}

seed().catch(err => {
  console.error(err);
});
