import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '', 
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const guides = [
  {
    slug: 'local-seo-kent-businesses',
    content: `
      <h2>The Reality of Local Search in Kent</h2>
      <p>For decades, establishing a successful trades or service business across Kent relied almost exclusively on two mechanisms: local print advertising and word-of-mouth recommendations. If you were a reliable plumber in Ashford or an electrician with a good reputation in Maidstone, providing a high-quality service was often enough to fill your diary. However, the commercial landscape has fundamentally shifted. Today, the immediate reaction of any consumer facing a problem—whether it is a leaking roof requiring emergency repair, or a massive commercial extension project—is to pull out their smartphone and type a specific service into Google.</p>
      
      <p>Local SEO (Search Engine Optimization) is no longer an optional marketing luxury; it is the absolute baseline requirement for operating a predictable, scalable business. When a homeowner in Sevenoaks searches for "emergency plumbers near me," Google does not rank businesses based on who has the most vans or the best tools. It ranks businesses based on their digital authority. If your business fails to appear in the top three map listings (the 'Local Pack'), that high-value enquiry instantly goes to a competitor who has properly optimized their online footprint.</p>

      <h2>Breaking the Dependency on External Directories</h2>
      <p>Many tradespeople across Kent—particularly builders, roofers, and driveway installers—fall into what we term the "Directory Trap." They pay exorbitant monthly subscriptions to third-party lead generation platforms like Checkatrade, MyBuilder, or Bark. While these platforms do generate leads, they inherently commoditize your service. When a homeowner submits a request, their information is blasted out to five different local companies simultaneously.</p>
      <p>This creates a race to the bottom. You are immediately forced to compete entirely on price because the customer has no visual or psychological understanding of your brand's superior quality. Building your own Local SEO authority allows you to break this dependency. When your primary website ranks organically on page one for queries like "bespoke carpenters in Canterbury," the traffic that lands on your page is entirely exclusive to you. You maintain your profit margins, you dictate the terms of the engagement, and you interact with clients who are pre-qualified by your own high-end branding.</p>

      <h2>The Mechanics of Google's Map Pack</h2>
      <p>Appearing in Google's Local Map Pack is the holy grail of local service marketing. Most local enquiries happen precisely from these three featured slots. To dominate this space in highly competitive Kent regions, your business must establish three core pillars of trust with Google's algorithm: Relevance, Distance, and Prominence.</p>

      <h3>1. Hyper-Localized Relevance</h3>
      <p>Your website must explicitly tell Google what you do and exactly where you do it. Generic pages simply titled "Services" are insufficient. If you want to capture commercial landscaping contracts in Tunbridge Wells, you require dedicated, structured layout hierarchies. This means deploying independent pages for each core service crossed with specific location targeting. Using advanced technical schema markup embedded within your site's code provides search engine crawlers with a machine-readable map of your operations, explicitly defining your service radiuses across Kent.</p>

      <h3>2. Prominence Through Reviews and Citations</h3>
      <p>Google heavily weighs your external footprint. It looks for consistent Name, Address, and Phone Number (NAP) data across the entire internet. If your business is listed at an old address on Yell, but a new address on your website, Google loses trust in your entity and immediately downgrades your ranking. Furthermore, review velocity is critical. A continuous, steady stream of verified Google Reviews from clients across Folkestone, Dartford, and Gravesend signals to the algorithm that your business is highly active, reputable, and inherently safe to recommend to its users.</p>

      <h2>Why Fast, Structured Web Design Matters for SEO</h2>
      <p>Local SEO does not exist in a vacuum; it is deeply intertwined with your website's fundamental architecture. Google measures how users interact with your digital presence. If an emergency lead clicks on your organically ranked page but the website takes six seconds to load on their mobile device, they will immediately abandon the page (this is known as a 'bounce').</p>
      <p>High bounce rates historically signal to Google that your page did not satisfy the user's intent. Over time, regardless of how many keywords you have utilized, your rankings will plummet. This is why we absolutely refuse to use bloated builders or outdated platforms. Moving to advanced frameworks ensures that your pages load instantaneously. We combine this technical speed with highly legible, scannable content layers. We immediately hit the user with value propositions, trust signals (such as "Fully Insured" or "Checkatrade Approved"), and frictionless contact forms native to the page.</p>

      <h2>The Long-Term Growth Pipeline</h2>
      <p>Implementing a rigorous Local SEO campaign is entirely different from running Google Ads. When you stop paying for a Google Ad, your visibility vanishes instantly. However, true organic dominance is an appreciating asset. By mathematically structuring your content, acquiring localized backlinks, and ensuring your site operates technically flawlessly, you are building a permanent digital moat around your business.</p>
      <p>For local businesses in Kent looking to scale, this predictable volume of inbound enquiries is what allows you to hire additional staff, expand your fleet, and ultimately choose the high-margin projects you genuinely want to work on, rather than frantically scrambling for whatever jobs are available.</p>
    `
  },
  {
    slug: 'how-local-businesses-compete-on-google',
    content: `
      <h2>The Shift in Local Consumer Behavior</h2>
      <p>The rules of engagement for regional businesses have drastically evolved over the last five years. Whether you are a long-standing property maintenance firm in Sevenoaks or a newly established driveway installation company based in Ashford, the reality of customer acquisition is completely digitized. Historically, local visibility was achieved through physical proximity—having a well-branded van or a high-street location. Today, Google is the ultimate arbiter of localized commercial success.</p>
      <p>When a customer in Kent experiences a problem, their immediate and instinctive reaction is a highly specific Google search. They do not search generically; they type "emergency roofers near me" or "best commercial cleaners in Maidstone." Local businesses that fail to intercept this high-intent, transactional traffic are effectively invisible to the modern consumer, leaving thousands of pounds of revenue on the table every month.</p>

      <h2>The Flawed Strategy of Rented Space</h2>
      <p>Before examining how to compete effectively, it is critical to understand how most local businesses fail online. There is a pervasive dependency within the trades and service sectors on "rented space." This includes relying completely on social media pages or paying exorbitant premiums to third-party lead generation directory platforms.</p>
      <p>These directories trap local businesses into a perpetual cycle of price-slashing. Because the platform aggregates multiple providers for a single customer quote, you are stripped of your unique branding and authority. You are reduced to a price tag. Real digital competition requires ownership. True business scale in a county as competitive as Kent demands that a company owns its own proprietary digital real estate—a high-performance, conversion-engineered website ranking independently on page one.</p>

      <h2>Deconstructing Google's Local Intent Engine</h2>
      <p>Google has transitioned from a simple search engine into a highly intelligent local intent engine. It understands that when someone searches for a "plumber," they do not want a Wikipedia article about plumbing; they want a phone number for a reliable professional who can reach their house in Tunbridge Wells within twenty minutes.</p>
      <p>To compete effectively on Google, your entire digital infrastructure must be rigorously aligned with this intent. This requires a multipronged approach:</p>
      
      <h3>Establishing Unshakeable Entity Trust</h3>
      <p>Google crawls the entire web to verify that your business is legitimate. This process is highly dependent on consistency. Your Business Name, Address, and Phone Number (NAP) must remain immaculately consistent across your website, your Google Business Profile, local council directories, and industry-specific portals. If there are discrepancies, Google views your business as a potential risk to its users and drops your rankings.</p>

      <h3>Architecting Localized Service Silos</h3>
      <p>One of the most profound mistakes local businesses make is attempting to rank a single webpage for a dozen different services across multiple towns. Google's algorithm rewards extreme relevancy. To dominate the market, a smart digital strategy involves building dedicated "service silos."</p>
      <p>If you offer commercial cleaning, domestic cleaning, and massive end-of-tenancy cleans, each of these services must have its own dedicated, detailed page. Furthermore, these pages must intersect with specific location structures. By programmatically addressing individual towns—such as creating highly specific pathways for Ashford, Canterbury, and Folkestone—you signal extreme geographic relevancy to the crawl bots. You are directly answering the specific needs of specific users in specific regions.</p>

      <h2>The Critical Role of Page Speed and UX</h2>
      <p>Ranking on page one is effectively useless if your website acts as a deterrent once clicked. Google aggressively monitors user experience (UX). If a user clicks your link and rapidly hits the "back" button because your site takes five seconds to load an image, this "bounce" severely damages your ranking trajectory.</p>
      <p>Local businesses strictly need blazing fast, mobile-first architectures. The modern user is highly impatient. They want to instantly see your logo, verify your accreditations, identify your primary service, and see a clear, frictionless "Call Now" button. High-performance frameworks completely remove the sluggishness associated with older platforms, guaranteeing that you capture the user's attention in the critical first two seconds.</p>

      <h2>Automating Trust and Review Velocity</h2>
      <p>In highly contested local markets, reviews are the ultimate differentiator. Two competing electricians in Maidstone might have equally optimized websites, but the one boasting 150 five-star reviews will inherently capture 80% of the market share. Competing on Google requires a systematic approach to review generation.</p>
      <p>Rather than relying on customers to randomly leave reviews, successful businesses deploy backend business automation. As soon as a job file is closed in your CRM or an invoice is settled, the software should automatically trigger a polite, direct SMS and Email containing a direct link to your Google Business Profile. This automated velocity of fresh, positive local feedback continuously signals deep community trust directly into Google’s ranking algorithm.</p>
      
      <h2>Moving Beyond the Competition</h2>
      <p>By shifting the mindset from passive "having a website" to active "engineering a lead generation machine," trades and services businesses fundamentally alter their growth trajectory. Competing successfully on Google means abandoning cheap workarounds, investing in high-end structural digital assets, and executing a ruthless, data-driven local expansion completely isolated from external lead aggregators.</p>
    `
  },
  {
    slug: 'complete-guide-google-business-profiles',
    content: `
      <h2>The Frontline of Local Digital Marketing</h2>
      <p>For any local business operating in Kent—from vast commercial builders to highly specialized regional letting agents—your Google Business Profile (GBP) is arguably the single most important digital asset you possess. Before a customer ever reaches your primary website or interacts with your bespoke lead capture forms, they will almost certainly interact with your GMP. It is the frontline of your digital brand presence.</p>
      <p>Despite its critical importance, the overwhelming majority of local enterprises treat their profile as a 'set-and-forget' directory listing. They upload a logo, confirm their opening hours, and never touch it again. This is a staggering missed opportunity. A fiercely optimized, constantly managed Google Business Profile acts as an aggressive local lead magnet, frequently hijacking search traffic directly away from competitors who rank higher in traditional organic web results.</p>

      <h2>Why the Google Map Pack Dominates Conversion</h2>
      <p>When a consumer searches for a physical service, Google immediately triggers the "Local Pack"—a highly visual map displaying three local businesses. This local pack bypasses traditional SEO listings, appearing right at the absolute top of the screen on both mobile and desktop views.</p>
      <p>Crucially, the user intent associated with local pack clicks is profoundly transactional. If someone searches "emergency plumbers Maidstone" while water is leaking through their kitchen ceiling, they are not looking to read a long blog post. They want to see a business name, check the review rating for trust, and hit the 'Call' button within five seconds. If your profile is absent from this map pack, you are effectively invisible precisely when the buyer is most desperate for your service.</p>

      <h2>The Three Pillars of Profile Optimization</h2>
      <p>Google’s localized algorithm decides which three businesses to highlight based on a triad of core factors: Relevance, Distance, and Prominence. While you cannot manipulate the physical distance between your address and the person searching, you possess total control over your relevance and prominence.</p>

      <h3>1. Granular Categorization and Relevance</h3>
      <p>Correctly categorizing your business is paramount. Many local trades make the error of selecting massive, generic primary categories. If you specialize strictly in bespoke joinery and high-end wooden installations across Sevenoaks, selecting a generic 'Handyman' or generalized 'Builder' category severely dilutes your algorithmic relevance when users search for expensive carpentry projects.</p>
      <p>Your business description should be meticulously crafted. It must weave in high-value geographical markers and specific service terminology. Rather than stating "We do gardening," say "We are a trusted landscaping and commercial grounds maintenance company serving Ashford, Canterbury, and the wider Kent region." This provides semantic mapping for Google's internal crawlers.</p>

      <h3>2. The Science of Review Velocity</h3>
      <p>Prominence is heavily dictated by your review profile. However, it is not merely about having a large volume of reviews; it is about 'Review Velocity'. Google actively analyzes the frequency and recency of your feedback. If a competitor has 100 reviews but hasn't received a new one in eight months, a highly active business consistently generating two new reviews every single week will often outrank them algorithmically.</p>
      <p>This is where smart business automation becomes invaluable. Asking for reviews manually is unreliable. By automating your CRM to trigger a personalized review request via SMS the exact moment an invoice is paid, you guarantee a continuous, organic drip-feed of five-star signals flooding your profile, perpetually maintaining your high-ranking status.</p>

      <h3>3. Engaging the Profile as an Active Hub</h3>
      <p>Your Google profile allows for robust content distribution. Posting updates, offers, and detailed FAQ sections directly to the profile demonstrates active management. Utilizing the 'Q&A' feature to pre-emptively answer common queries (e.g., "Do you offer emergency callouts in Dartford?" -> "Yes, our team operates a 24/7 rapid response unit across the Dartford region") directly injects highly relevant local semantic terms into your profile's internal database.</p>

      <h2>Image Geotagging and Visual Trust</h2>
      <p>Visual verification is crucial. Homeowners and commercial site managers want to verify your legitimacy before allowing you onto their property. Regularly uploading high-definition imagery of completed projects drastically increases engagement metrics on your profile. Furthermore, capturing images directly on-site with smartphone location services enabled embeds invisible EXIF metadata (Geotags) into the photo file. When you upload this photo to Google, you silently hand the search engine mathematical proof that your company is actively operating exactly where you claim to operate.</p>
      
      <h2>Integrating GBP with Your Wider Ecosystem</h2>
      <p>A pristine Google Business Profile does not replace the need for a high-performance website; rather, they form a symbiotic ecosystem. The profile acts as the initial net, capturing high-intent immediate traffic, while your fast, highly technical site acts as the deeper conversion funnel that houses your detailed case studies, localized service pages, and advanced lead quoting mechanics. When these two assets are synchronized, your business solidifies an inescapable local dominance across Kent.</p>
    `
  }
];

async function main() {
  for (const guide of guides) {
    const { error } = await supabase.from('guides').update({ content: guide.content }).eq('slug', guide.slug);
    if (error) {
      console.log(`Error updating ${guide.slug}:`, error.message);
    } else {
      console.log(`Successfully updated ${guide.slug}`);
    }
  }
}

main();
