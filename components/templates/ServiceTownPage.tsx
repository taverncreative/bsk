import LocalServiceHero from '@/components/sections/LocalServiceHero';
import ParentLinks from '@/components/seo/ParentLinks';
import LocalContextSection from '@/components/sections/LocalContextSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import CaseStudySection from '@/components/sections/CaseStudySection';
import IndustryRelevanceSection from '@/components/sections/IndustryRelevanceSection';
import CredibilityMetrics from '@/components/sections/CredibilityMetrics';
import InternalLinks from '@/components/seo/InternalLinks';
import EducationalGuides from '@/components/sections/EducationalGuides';
import CTA from '@/components/sections/CTA';
import ProcessAuthority from '@/components/sections/ProcessAuthority';
import Authority from '@/components/sections/Authority';
import LocalAuthorityMap from '@/components/sections/LocalAuthorityMap';
import FAQ from '@/components/sections/FAQ';
import GrowthSystem from '@/components/sections/GrowthSystem';
import Services from '@/components/sections/Services';
import { getLocalServiceMessaging } from '@/lib/content/messaging';
import { Search, Zap, Palette, LinkIcon, FileText, Laptop } from 'lucide-react';

// External Types
import type { Industry, Guide, IndustryPainPoint } from '@/types';
import type { CaseStudy } from '@/lib/queries/caseStudies';

interface BaseEntity {
  name: string;
  slug: string;
}

interface TownEntity extends BaseEntity {
  latitude?: number | null;
  longitude?: number | null;
  intro?: string | null;
}

interface ServiceEntity extends BaseEntity {
  description?: string | null;
}

interface ServiceTownPageProps {
  service: ServiceEntity;
  town: TownEntity;
  localIntro?: string;
  otherServices: BaseEntity[];
  nearbyTowns: BaseEntity[];
  industries: Industry[];
  caseStudies: CaseStudy[];
  painPoints: IndustryPainPoint[];
  guides: Guide[];
}

export default function ServiceTownPage({
  service,
  town,
  localIntro,
  otherServices,
  nearbyTowns,
  industries,
  caseStudies,
  painPoints,
  guides
}: ServiceTownPageProps) {

  // For Case Studies, we'll try to get ones matching the town exactly, otherwise fallback to the most recent generally.
  const localCaseStudies = caseStudies.filter(c => c.town === town.name || c.town === town.slug);
  const displayCaseStudies = localCaseStudies.length > 0 ? localCaseStudies : caseStudies;

  const messaging = getLocalServiceMessaging(service.slug, town.name);
  const isSEO = service.slug === 'seo';

  // Seeded deterministic pain points based on town name length for SEO to prevent duplication
  const seoPainPointsBank = [
    { title: "Low search visibility", pain_point: `Customers in ${town.name} are actively searching for your services, but Google is hiding your business.` },
    { title: "Competitor rankings", pain_point: `Other local businesses are capturing your leads simply because they appear higher in map results.` },
    { title: "Poor website optimisation", pain_point: `Your website looks great but lacks the technical foundation Google requires to rank it locally.` },
    { title: "Weak Google Business profile", pain_point: `Your map listing isn't configured to capture 'near me' or commercial intent searches.` },
    { title: "Missing local relevance", pain_point: `Your site doesn't clearly show Google that you operate reliably across ${town.name}.` },
    { title: "Invisible to new customers", pain_point: `You get traffic, but your website pages are not engineered to turn those local visitors into direct enquiries.` },
  ];

  // Rotate pain points deterministically
  const seed = town.name.length;
  const rotatedSeoPainPoints = [
    seoPainPointsBank[(seed) % seoPainPointsBank.length],
    seoPainPointsBank[(seed + 1) % seoPainPointsBank.length],
    seoPainPointsBank[(seed + 2) % seoPainPointsBank.length],
    seoPainPointsBank[(seed + 3) % seoPainPointsBank.length],
  ];

  const seoFaqs = [
    { question: `How long does SEO take to work for businesses in ${town.name}?`, answer: `SEO is a long-term strategy. Typically, businesses notice significant improvements in map rankings and organic traffic within 90 days, though competitive niches may take longer to establish authority.` },
    { question: `Do you only work with businesses in ${town.name}?`, answer: `While we provide dedicated local SEO targeting for ${town.name}, our systems are designed to help you capture search traffic from across the entirety of Kent and your surrounding service areas.` },
    { question: `Can SEO help my small business compete against larger companies?`, answer: `Absolutely. Local SEO is specifically designed to level the playing field. Google prioritises relevant local businesses for commercial searches, meaning with the right structure, you can outrank national competitors in your area.` },
    { question: `Do I need a new website for SEO to work?`, answer: `Not necessarily. We often optimise existing platforms if the underlying technology is sound. However, if your current site is severely outdated, extremely slow, or lacks structural integrity, we may recommend a rebuild to guarantee your ROI.` },
    { question: `How do you choose which keywords to target?`, answer: `We don't guess. We perform deep search engine opportunity analysis to identify the exact transactional terms your potential customers are using, ensuring we target intent-driven searches rather than just empty traffic.` },
  ];

  const isWebDesign = service.slug === 'web-design';

  // Seeded deterministic pain points based on town name length for Web Design to prevent duplication
  const webDesignPainPointsBank = [
    { title: "Outdated websites", pain_point: `A slow, heavy website is causing visitors to bounce, destroying trust.` },
    { title: "Slow loading pages", pain_point: `Your website takes too long to load, costing you valuable enquiries.` },
    { title: "Poor mobile experience", pain_point: `Most visitors in ${town.name} browse on phones, but your site is difficult to use on mobile.` },
    { title: "Confusing navigation", pain_point: `Potential customers cannot easily find what they are looking for and leave.` },
    { title: "Weak enquiry pathways", pain_point: `Visitors arrive but cannot easily find how to contact you or request a quote.` },
    { title: "Difficult content management", pain_point: `Outdated systems make simple changes frustrating and time-consuming.` },
  ];

  const rotatedWebDesignPainPoints = [
    webDesignPainPointsBank[(seed) % webDesignPainPointsBank.length],
    webDesignPainPointsBank[(seed + 1) % webDesignPainPointsBank.length],
    webDesignPainPointsBank[(seed + 2) % webDesignPainPointsBank.length],
    webDesignPainPointsBank[(seed + 3) % webDesignPainPointsBank.length],
  ];

  const webDesignFaqs = [
    { question: `How long does it take to build a website for a business in ${town.name}?`, answer: `A typical website takes between 4 to 8 weeks to design, build, and launch, depending on the complexity and size of the project.` },
    { question: `Can you redesign my existing website?`, answer: `Yes. We frequently redesign outdated websites to improve their performance, mobile experience, and ability to generate local enquiries.` },
    { question: `Do you build mobile friendly websites?`, answer: `Absolutely. Every website we build is fully responsive, ensuring it looks and performs perfectly across all devices, including smartphones and tablets.` },
    { question: `Will my new website appear on Google?`, answer: `Yes. All our websites are built with strong technical SEO foundations to ensure they can be easily crawled and indexed by Google to help you rank in ${town.name} and beyond.` },
    { question: `Can I update the website myself once it is live?`, answer: `Yes. We build our websites on user-friendly content management systems, allowing you to easily update text, images, and services without needing technical knowledge.` },
  ];

  const isBranding = service.slug === 'branding' || service.slug === 'logo-branding';

  // Seeded deterministic pain points based on town name length for Branding to prevent duplication
  const brandingPainPointsBank = [
    { title: "Inconsistent branding", pain_point: `Different colours, fonts and styles appear across your website, vehicles and social media in ${town.name}.` },
    { title: "Outdated logos", pain_point: `An old or poorly designed logo can make your business appear less professional.` },
    { title: "Generic brand identities", pain_point: `Without clear branding it becomes harder for customers to remember you compared to other local providers.` },
    { title: "Poor visual recognition", pain_point: `Flyers, workwear and signage do not match, causing a fragmented customer experience.` },
    { title: "Lack of brand guidelines", pain_point: `You have no strict rules on how your logo or colours should be applied, leading to constant messy marketing.` },
    { title: "Unprofessional presentation", pain_point: `Strong branding helps customers trust your business before they even contact you, which many current local brands lack.` },
  ];

  const rotatedBrandingPainPoints = [
    brandingPainPointsBank[(seed) % brandingPainPointsBank.length],
    brandingPainPointsBank[(seed + 1) % brandingPainPointsBank.length],
    brandingPainPointsBank[(seed + 2) % brandingPainPointsBank.length],
    brandingPainPointsBank[(seed + 3) % brandingPainPointsBank.length],
  ];

  const brandingFaqs = [
    { question: `How long does logo design take for businesses safely located in ${town.name}?`, answer: `A typical logo design process takes 2 to 4 weeks depending on how quickly we establish the correct direction through the concept phases.` },
    { question: `Will I receive all logo file formats?`, answer: `Yes. We provide full brand kits including vector files for large print work, transparent PNGs, and all variations required for digital and physical use.` },
    { question: `Can you update an existing logo?`, answer: `Yes. We frequently perform "brand refreshes" where we take an established mark and modernise it mathematically while retaining its core recognition.` },
    { question: `Do you provide brand guidelines?`, answer: `Absolutely. Every branding package includes a guidelines PDF outlining exactly how to use your colors, typography, and logo variations safely.` },
    { question: `Can you apply branding to workwear and vehicles?`, answer: `Yes. Our design systems are explicitly engineered to ensure your logo reproduces perfectly on physical printed merchandise, signage and van livery.` },
  ];

  const isLeadCapture = service.slug === 'lead-capture';

  // Seeded deterministic pain points based on town name length for Lead Capture to prevent duplication
  const leadCapturePainPointsBank = [
    { title: "Unclear calls to action", pain_point: `Visitors from ${town.name} browse your site but see no clear next step.` },
    { title: "Visitors leaving without enquiry", pain_point: `A high bounce rate means you are paying for traffic that never converts.` },
    { title: "Confusing contact forms", pain_point: `Your primary phone numbers or forms are difficult to access quickly.` },
    { title: "Weak conversion pathways", pain_point: `Key services are buried, so potential customers in ${town.name} leave rather than search.` },
    { title: "Slow response to enquiries", pain_point: `By the time you reply, the customer has already contacted a competitor.` },
    { title: "Lack of enquiry tracking", pain_point: `You have no data showing which pages or campaigns actually generate leads in ${town.name}.` },
  ];

  const rotatedLeadCapturePainPoints = [
    leadCapturePainPointsBank[(seed) % leadCapturePainPointsBank.length],
    leadCapturePainPointsBank[(seed + 1) % leadCapturePainPointsBank.length],
    leadCapturePainPointsBank[(seed + 2) % leadCapturePainPointsBank.length],
    leadCapturePainPointsBank[(seed + 3) % leadCapturePainPointsBank.length],
  ];

  const leadCaptureFaqs = [
    { question: `How do I get more enquiries from my website in ${town.name}?`, answer: `Improving your website structure, adding clear calls to action, and streamlining your contact forms are some of the most effective ways to convert the traffic you already have into direct enquiries.` },
    { question: `Do I need a new website to improve lead capture?`, answer: `Not necessarily. If your current website is built well structurally, we can often optimise the existing pages, improve the user journey, and add strategic conversion elements to increase the number of enquiries you receive.` },
    { question: `Can you improve enquiry forms on my current site?`, answer: `Yes. Complex or confusing forms discourage people from getting in touch. We redesign and optimise contact pathways so they are simple, clear, and easy for the user to complete, whether on mobile or desktop.` },
    { question: `How quickly should businesses respond to enquiries?`, answer: `Immediately. Follow-up speed is crucial. We often combine lead capture systems with business automation to ensure every enquiry receives an instant, professional response while you are still working or on a job in ${town.name}.` },
    { question: `Do lead capture systems work for local trades businesses?`, answer: `Absolutely. In fact, trades businesses often see the biggest improvements because their customers are usually looking for a fast, reliable quote. Clear 'Click to Call' buttons and simple quote request forms dramatically boost conversion.` },
  ];

  const isBusinessAutomation = service.slug === 'business-automation';

  // Seeded deterministic pain points based on town name length for Business Automation to prevent duplication
  const businessAutomationPainPointsBank = [
    { title: "Missed enquiries", pain_point: `Manual processes cause slow responses, letting leads in ${town.name} slip away.` },
    { title: "Manual follow ups", pain_point: `Potential customers are often forgotten because your team lacks an automated follow-up structure.` },
    { title: "Disorganised customer data", pain_point: `Important details from new ${town.name} enquiries are spread across different systems.` },
    { title: "Time consuming admin tasks", pain_point: `You spend hours managing emails and messages instead of actually doing the work.` },
    { title: "Growth becomes harder to manage", pain_point: `Without secure systems handling repetitive communication, scaling your capacity becomes impossible.` },
    { title: "Slow response times cost money", pain_point: `In competitive local markets like ${town.name}, the business that replies first usually wins the job.` },
  ];

  const rotatedBusinessAutomationPainPoints = [
    businessAutomationPainPointsBank[(seed) % businessAutomationPainPointsBank.length],
    businessAutomationPainPointsBank[(seed + 1) % businessAutomationPainPointsBank.length],
    businessAutomationPainPointsBank[(seed + 2) % businessAutomationPainPointsBank.length],
    businessAutomationPainPointsBank[(seed + 3) % businessAutomationPainPointsBank.length],
  ];

  const businessAutomationFaqs = [
    { question: `What types of processes can be automated for my business in ${town.name}?`, answer: `We focus on automating administrative chokepoints. This includes routing incoming enquiries instantly, sending automated follow-up emails, logging leads straight into a CRM, requesting reviews after a job is complete, and syncing contact forms with booking calendars.` },
    { question: `Do I need special software for automation?`, answer: `Not necessarily. We specialize in API integrations, which means we often securely connect the tools you already use (like Mailchimp, existing email clients, or basic CRMs) to communicate with each other seamlessly.` },
    { question: `Can automation work with my existing systems?`, answer: `Yes. Modern automation rarely requires ripping out your entire tech stack. We build secure bridges between your website, your lead capture forms, and the operational software your team already understands.` },
    { question: `Will automation replace manual work completely?`, answer: `No, automation doesn't replace the human touch—it protects it. By allowing systems to handle repetitive admin (like quote confirmations and data entry), you win back time to focus on actually delivering your service and speaking directly with qualified leads across ${town.name}.` },
    { question: `Is automation suitable for small local businesses?`, answer: `Absolutely. Small businesses often see the highest ROI because automation acts as a 'virtual administrator'. It handles the background workflow scaling instantly during busy periods, so you don't have to hire additional staff just to manage emails.` },
  ];

  const isSocialMedia = service.slug === 'social-media-setup' || service.slug === 'digital-marketing';

  // Seeded deterministic pain points based on town name length for Social Media to prevent duplication
  const socialMediaPainPointsBank = [
    { title: "Incomplete profiles", pain_point: `Important business information for your ${town.name} location is missing or completely outdated.` },
    { title: "Inconsistent branding", pain_point: `Colours, logos, and descriptions vary across platforms, confusing local customers.` },
    { title: "Poor first impressions", pain_point: `Your profiles may appear unprofessional or inactive when someone in ${town.name} searches for you.` },
    { title: "Unclear service information", pain_point: `Visitors arriving on your page struggle to understand what specific services your business offers.` },
    { title: "Disconnected online presence", pain_point: `Your social media profiles exist in a vacuum and do not align with or link back to your main business website.` },
    { title: "Lost referral traffic", pain_point: `When word-of-mouth recommendations happen in ${town.name}, an unprofessional profile breaks the trust before they call.` },
  ];

  const rotatedSocialMediaPainPoints = [
    socialMediaPainPointsBank[(seed) % socialMediaPainPointsBank.length],
    socialMediaPainPointsBank[(seed + 1) % socialMediaPainPointsBank.length],
    socialMediaPainPointsBank[(seed + 2) % socialMediaPainPointsBank.length],
    socialMediaPainPointsBank[(seed + 3) % socialMediaPainPointsBank.length],
  ];

  const socialMediaFaqs = [
    { question: `Which social platforms should my business in ${town.name} use?`, answer: `It depends entirely on your industry and audience. We generally recommend Google Business and Facebook for local trades, while B2B services benefit heavily from polished LinkedIn company pages.` },
    { question: `Can you improve my existing social media profiles?`, answer: `Yes. We specialise in profile rehabilitation—taking existing outdated accounts and structurally updating their imagery, messaging, and integrations to align with your current business standards.` },
    { question: `Do I need social media for my business?`, answer: `While you don't need to post every day, you do need professional 'holding' profiles. Many local customers in ${town.name} will check your Facebook or Instagram to verify you are a real, active business before requesting a quote.` },
    { question: `Will social media help my website?`, answer: `Absolutely. Structurally linking your social media profiles back to your website creates legitimate authority signals that help establish your digital footprint.` },
    { question: `Do you manage the daily posting on these accounts?`, answer: `Our core service focuses on the professional *setup and structural alignment* of these profiles. We handle the heavy lifting of branding, integration, and architecture to ensure you have a high-end foundation to work from.` },
  ];

  const isWorkwearPrint = service.slug === 'workwear-print';

  // Seeded deterministic pain points based on town name length for Workwear
  const workwearPainPointsBank = [
    { title: "Unbranded workwear", pain_point: `When working in ${town.name}, staff may appear less professional or untrustworthy to local residents if they arrive without branded uniforms.` },
    { title: "Inconsistent printed materials", pain_point: `Flyers and signage used locally around ${town.name} often don't match the modern digital brand identity.` },
    { title: "Missed visibility opportunities", pain_point: `Unbranded vehicles travelling between jobs in ${town.name} are wasting free daily local advertising.` },
    { title: "Low brand recognition", pain_point: `Without consistent physical visuals, customers in the ${town.name} area struggle to remember your business for future work.` },
    { title: "Amateur first impressions", pain_point: `Handing out cheap or flimsy business cards at local ${town.name} networking events damages your credibility instantly.` },
    { title: "Confusing site presence", pain_point: `Without clear branded signage on active sites across ${town.name}, neighbours won't know who to call for their own projects.` },
  ];

  const rotatedWorkwearPainPoints = [
    workwearPainPointsBank[(seed) % workwearPainPointsBank.length],
    workwearPainPointsBank[(seed + 1) % workwearPainPointsBank.length],
    workwearPainPointsBank[(seed + 2) % workwearPainPointsBank.length],
    workwearPainPointsBank[(seed + 3) % workwearPainPointsBank.length],
  ];

  const workwearFaqs = [
    { question: `What types of workwear can you brand for my team in ${town.name}?`, answer: `We supply and brand a full range of high-quality workwear, including hoodies, polo shirts, t-shirts, jackets, and high-visibility clothing. Everything is structurally designed to withstand tough working environments.` },
    { question: `Can you print business cards and flyers?`, answer: `Yes. We design and produce premium business cards, leaflets, brochures, and promotional materials that perfectly match your online identity and help you leave a lasting impression at local ${town.name} events.` },
    { question: `Do you supply clothing or just the branding?`, answer: `We supply the entire package end-to-end. We source high-quality garments from trusted UK suppliers and then manage the professional embroidery or printing process, delivering the finished product directly to you in ${town.name}.` },
    { question: `Can you match materials to my existing logo?`, answer: `Absolutely. Our design team ensures complete consistency, carefully matching your specific brand colours (Pantone/CMYK) and logo architecture so every physical item flawlessly represents your business identity.` },
    { question: `Do you manage vehicle graphic application?`, answer: `We specialize in the high-end *design* of vehicle graphics, ensuring the layout is bold, legible, and structurally aligned with your brand before handing the precise schematics over to trusted local ${town.name} applicators.` },
  ];

  if (isSEO) {
    return (
      <>
        <LocalServiceHero
          title={<>SEO Services in {town.name}</>}
          subtitle={`If your business is not appearing in local search results, potential customers are finding your competitors instead. We help ${town.name} businesses improve visibility and turn searches into direct enquiries.`}
          primaryCTA={{ text: 'Get a Free SEO Review', href: '/contact' }}
        />
        
        <ParentLinks service={service} town={town} />

        {/* Introduction */}
        <LocalContextSection townName={town.name} townIntro={town.intro} />

        {/* SEO Challenges for Businesses in {Location} */}
        <ProblemSection 
          headlineOverride={`SEO Challenges for Businesses in ${town.name}`}
          painPoints={rotatedSeoPainPoints} 
        />
        
        {/* How Local SEO Helps Businesses Grow */}
        <SolutionSection 
          headlineOverride="How Local SEO Helps Businesses Grow"
          townName={town.name} 
        />

        {/* Our SEO Process */}
        <ProcessAuthority 
          headlineOverride="Our SEO Process"
          descriptionOverride="Our structured local SEO methodology builds sustainable search visibility safely."
        />

        {/* Why Choose Business Sorted Kent */}
        <Authority />

        {/* Areas We Support Across Kent */}
        <LocalAuthorityMap headlineOverride="Areas We Support Across Kent" />

        <CaseStudySection townName={town.name} caseStudies={displayCaseStudies} />

        <GrowthSystem currentService={service.slug} />

        {/* Frequently Asked Questions */}
        <FAQ faqs={seoFaqs} title={`Frequently Asked Questions`} />

        <InternalLinks 
          serviceSlug={service.slug} 
          townSlug={town.slug} 
          latitude={town.latitude} 
          longitude={town.longitude} 
        />

        {/* Call to Action */}
        <CTA 
          titleOverride="Start Improving Your Google Visibility" 
          paragraphOverride={`If your business is not appearing in search results, the right SEO strategy can change that. We help ${town.name} businesses improve visibility and generate more enquiries.`} 
        />
      </>
    );
  }

  if (isWebDesign) {
    return (
      <>
        <LocalServiceHero
          title={<>Web Design in {town.name}</>}
          subtitle={`If your current website feels outdated or is not generating enquiries, a professionally designed site can transform how customers see your business in ${town.name}.`}
          primaryCTA={{ text: 'Get a Free Website Quote', href: '/contact' }}
        />
        
        <ParentLinks service={service} town={town} />

        {/* Introduction */}
        <LocalContextSection townName={town.name} townIntro={town.intro} />

        {/* Website Challenges for Businesses in {Location} */}
        <ProblemSection 
          headlineOverride={`Website Challenges for Businesses in ${town.name}`}
          painPoints={rotatedWebDesignPainPoints} 
        />
        
        {/* What a Professional Website Should Do */}
        <SolutionSection 
          headlineOverride="What a Professional Website Should Do"
          paragraphOverride={`Many websites look impressive on the surface but are poorly built underneath. We construct our websites with high-performance code and technical SEO embedded from day one—meaning your site is engineered to rank in ${town.name}, perform flawlessly, and convert just as beautifully as it looks.`}
          townName={town.name} 
        />

        {/* Our Web Design Process */}
        <ProcessAuthority 
          headlineOverride="Our Web Design Process"
          descriptionOverride="Our structured methodology ensures your website is engineered for speed and search visibility, not just visual appeal."
        />

        {/* Why Choose Business Sorted Kent */}
        <Authority />

        {/* Areas We Support Across Kent */}
        <LocalAuthorityMap headlineOverride="Areas We Support Across Kent" />

        <CaseStudySection townName={town.name} caseStudies={displayCaseStudies} />

        <GrowthSystem currentService={service.slug} />

        {/* Frequently Asked Questions */}
        <FAQ faqs={webDesignFaqs} title={`Frequently Asked Questions`} />

        <InternalLinks 
          serviceSlug={service.slug} 
          townSlug={town.slug} 
          latitude={town.latitude} 
          longitude={town.longitude} 
        />

        {/* Call to Action */}
        <CTA 
          titleOverride="Ready For A Website That Works For Your Business?" 
          paragraphOverride={`If your current website feels outdated or is not generating enquiries, a professionally designed site can transform how customers see your business in ${town.name}.`} 
        />
      </>
    );
  }

  if (isBranding) {
    return (
      <>
        <LocalServiceHero
          title={<>Logo & Branding Services in {town.name}</>}
          subtitle={`Whether you need a completely new logo or a full branding system, we can help your business present a clear and professional image across ${town.name}.`}
          primaryCTA={{ text: 'Get a Branding Quote', href: '/contact' }}
        />
        
        <ParentLinks service={service} town={town} />

        {/* Introduction */}
        <LocalContextSection townName={town.name} townIntro={town.intro} />

        {/* Branding Challenges for Businesses in {Location} */}
        <ProblemSection 
          headlineOverride={`Branding Challenges for Businesses in ${town.name}`}
          painPoints={rotatedBrandingPainPoints} 
        />
        
        {/* Why Professional Branding Matters */}
        <SolutionSection 
          headlineOverride="Why Professional Branding Matters"
          paragraphOverride={`Professional branding is more than just a logo. We create complete visual systems that ensure your business looks established, trustworthy, and heavily professional across digital and physical touchpoints everywhere in ${town.name}.`}
          townName={town.name} 
        />

        {/* Our Branding Process */}
        <ProcessAuthority 
          headlineOverride="Our Branding Process"
          descriptionOverride="Our structured methodology builds brands that look established."
        />

        {/* Why Choose Business Sorted Kent */}
        <Authority />

        {/* Areas We Support Across Kent */}
        <LocalAuthorityMap headlineOverride="Areas We Support Across Kent" />

        <CaseStudySection townName={town.name} caseStudies={displayCaseStudies} />

        <GrowthSystem currentService={service.slug} />

        {/* Frequently Asked Questions */}
        <FAQ faqs={brandingFaqs} title={`Frequently Asked Questions`} />

        <InternalLinks 
          serviceSlug={service.slug} 
          townSlug={town.slug} 
          latitude={town.latitude} 
          longitude={town.longitude} 
        />

        {/* Call to Action */}
        <CTA 
          titleOverride="Ready To Give Your Business A Professional Identity?" 
          paragraphOverride={`Whether you need a completely new logo or a full branding system, we can help your business present a clear and professional image.`} 
        />
      </>
    );
  }

  if (isLeadCapture) {
    return (
      <>
        <LocalServiceHero
          title={<>Lead Capture Systems in {town.name}</>}
          subtitle={`If your website receives traffic but generates few enquiries, improving lead capture can dramatically increase results for your business in ${town.name}.`}
          primaryCTA={{ text: 'Get a Free Website Review', href: '/contact' }}
        />
        
        <ParentLinks service={service} town={town} />

        {/* Introduction */}
        <LocalContextSection townName={town.name} townIntro={town.intro} />

        {/* Lead Capture Challenges for Businesses in {Location} */}
        <ProblemSection 
          headlineOverride={`Why Websites in ${town.name} Fail to Convert`}
          painPoints={rotatedLeadCapturePainPoints} 
        />
        
        {/* Why Lead Capture Matters */}
        <SolutionSection 
          headlineOverride="How Lead Capture Improves Enquiries"
          paragraphOverride={`A lead capture system combines clear calls to action, structured page layouts, and smart contact pathways to turn your local traffic in ${town.name} directly into enquiries.`}
          townName={town.name} 
        />

        {/* Our Lead Capture Process */}
        <ProcessAuthority 
          headlineOverride="Our Lead Capture Process"
          descriptionOverride="Our structured methodology builds systems that convert visitors logically and safely."
        />

        {/* Why Choose Business Sorted Kent */}
        <Authority />

        {/* Areas We Support Across Kent */}
        <LocalAuthorityMap headlineOverride="Areas We Support Across Kent" />

        <CaseStudySection townName={town.name} caseStudies={displayCaseStudies} />

        <GrowthSystem currentService={service.slug} />

        {/* Frequently Asked Questions */}
        <FAQ faqs={leadCaptureFaqs} title={`Frequently Asked Questions`} />

        <InternalLinks 
          serviceSlug={service.slug} 
          townSlug={town.slug} 
          latitude={town.latitude} 
          longitude={town.longitude} 
        />

        {/* Call to Action */}
        <CTA 
          titleOverride="Turn Website Visitors Into Real Enquiries" 
          paragraphOverride={`If your website receives traffic but generates few enquiries, improving lead capture can dramatically increase results.`} 
          buttonOverride="Get a Free Website Review"
        />
      </>
    );
  }

  if (isBusinessAutomation) {
    return (
      <>
        <LocalServiceHero
          title={<>Business Automation in {town.name}</>}
          subtitle={`If you spend hours on repetitive admin, we build automation systems for businesses in ${town.name} that arrange enquiries, trigger follow ups, and organize operations automatically.`}
          primaryCTA={{ text: 'Book An Automation Consultation', href: '/contact' }}
        />
        
        <ParentLinks service={service} town={town} />

        {/* Introduction */}
        <LocalContextSection townName={town.name} townIntro={town.intro} />

        {/* Automation Challenges for Businesses in {Location} */}
        <ProblemSection 
          headlineOverride={`Why Businesses in ${town.name} Struggle With Manual Processes`}
          painPoints={rotatedBusinessAutomationPainPoints} 
        />
        
        {/* Why Automation Matters */}
        <SolutionSection 
          headlineOverride="How Automation Improves Efficiency"
          paragraphOverride={`Automation systems securely connect your website with operational software to handle repetitive administrative work securely in the background.`}
          townName={town.name} 
        />

        {/* Our Automation Process */}
        <ProcessAuthority 
          headlineOverride="Our Automation Process"
          descriptionOverride="Our structured integration process builds reliable scaling capabilities into your business."
        />

        {/* Why Choose Business Sorted Kent */}
        <Authority />

        {/* Areas We Support Across Kent */}
        <LocalAuthorityMap headlineOverride="Areas We Support Across Kent" />

        <CaseStudySection townName={town.name} caseStudies={displayCaseStudies} />

        <GrowthSystem currentService={service.slug} />

        {/* Frequently Asked Questions */}
        <FAQ faqs={businessAutomationFaqs} title={`Frequently Asked Questions`} />

        <InternalLinks 
          serviceSlug={service.slug} 
          townSlug={town.slug} 
          latitude={town.latitude} 
          longitude={town.longitude} 
        />

        {/* Call to Action */}
        <CTA 
          titleOverride="Streamline Your Business With Automation" 
          paragraphOverride={`Automation systems can help your business respond faster, organise enquiries and reduce repetitive admin work.`} 
          buttonOverride="Book An Automation Consultation"
        />
      </>
    );
  }

  if (isSocialMedia) {
    return (
      <>
        <LocalServiceHero
          title={<>Social Media Setup in {town.name}</>}
          subtitle={`A well structured social media profile helps potential customers in ${town.name} understand your business quickly and builds trust before they contact you.`}
          primaryCTA={{ text: 'Get Social Media Setup', href: '/contact' }}
        />
        
        <ParentLinks service={service} town={town} />

        {/* Introduction */}
        <LocalContextSection townName={town.name} townIntro={town.intro} />

        {/* Social Media Challenges for Businesses in {Location} */}
        <ProblemSection 
          headlineOverride={`Common Social Media Profile Problems`}
          painPoints={rotatedSocialMediaPainPoints} 
        />
        
        {/* Why a Professional Profile Matters */}
        <SolutionSection 
          headlineOverride="What A Professional Profile Should Include"
          paragraphOverride={`A professional profile clearly communicates your services, uses consistent branding, and directs visitors smoothly from social platforms back to your structured website.`}
          townName={town.name} 
        />

        {/* Our Social Setup Process */}
        <ProcessAuthority 
          headlineOverride="Our Setup Process"
          descriptionOverride="Our structured methodology ensures your profiles mirror your high-end brand identity exactly."
        />

        {/* Why Choose Business Sorted Kent */}
        <Authority />

        {/* Areas We Support Across Kent */}
        <LocalAuthorityMap headlineOverride="Areas We Support Across Kent" />

        <CaseStudySection townName={town.name} caseStudies={displayCaseStudies} />

        <GrowthSystem currentService={service.slug} />

        {/* Frequently Asked Questions */}
        <FAQ faqs={socialMediaFaqs} title={`Frequently Asked Questions`} />

        <InternalLinks 
          serviceSlug={service.slug} 
          townSlug={town.slug} 
          latitude={town.latitude} 
          longitude={town.longitude} 
        />

        {/* Call to Action */}
        <CTA 
          titleOverride="Create A Professional Social Media Presence" 
          paragraphOverride={`A well structured profile helps customers understand your business and builds trust before they contact you.`} 
          buttonOverride="Get Social Media Setup"
        />
      </>
    );
  }

  if (isWorkwearPrint) {
    return (
      <>
        <LocalServiceHero
          title={<>Workwear & Print in {town.name}</>}
          subtitle={`Consistent branding across workwear, vehicles and printed materials helps customers in ${town.name} recognise and trust your business instantly.`}
          primaryCTA={{ text: 'Get A Quote', href: '/contact' }}
        />
        
        <ParentLinks service={service} town={town} />

        {/* Introduction */}
        <LocalContextSection townName={town.name} townIntro={town.intro} />

        {/* Visibility Problems */}
        <ProblemSection 
          headlineOverride={`Why Branded Materials Matter`}
          painPoints={rotatedWorkwearPainPoints} 
        />
        
        {/* Solution Grid */}
        <SolutionSection 
          headlineOverride="Types Of Printed Materials We Provide"
          paragraphOverride={`We ensure your physical assets represent your business to the same high standard as your online presence across ${town.name}.`}
          townName={town.name} 
        />

        {/* Process */}
        <ProcessAuthority 
          headlineOverride="Our Process"
          descriptionOverride="Our end-to-end production process ensures perfect brand alignment and high-quality finishes."
        />

        {/* Why Choose Business Sorted Kent */}
        <Authority />

        {/* Areas We Support Across Kent */}
        <LocalAuthorityMap headlineOverride="Areas We Support Across Kent" />

        <CaseStudySection townName={town.name} caseStudies={displayCaseStudies} />

        <Services 
          headlineOverride="Connected To Your Brand Identity"
          descriptionOverride="Our workwear services bring the digital identity we create locally into the real world."
          servicesOverride={[
            { title: 'Logo & Branding', description: 'Defines your core visual identity.', href: '/branding', icon: Search },
            { title: 'Workwear & Print', description: 'Applies that identity to real world materials.', href: '/workwear-print', icon: Zap }
          ]}
        />

        {/* Frequently Asked Questions */}
        <FAQ faqs={workwearFaqs} title={`Frequently Asked Questions`} />

        <InternalLinks 
          serviceSlug={service.slug} 
          townSlug={town.slug} 
          latitude={town.latitude} 
          longitude={town.longitude} 
        />

        {/* Call to Action */}
        <CTA 
          titleOverride="Promote Your Business With Professional Branding" 
          paragraphOverride={`Branded workwear and printed materials help your ${town.name} business look professional and increase visibility in everyday situations.`} 
          buttonOverride="Get A Quote"
        />
      </>
    );
  }

  return (
    <>
      {/* 1. Hero Section (Includes CredibilityMetrics inside it natively via prior upgrades, we'll let Hero manage it, or let's pass it. Wait, Hero natively includes CredibilityMetrics now.) */}
      <LocalServiceHero
        title={messaging.title}
        subtitle={localIntro || messaging.subtitle}
        primaryCTA={{
          text: 'Get a Free Quote',
          href: '/contact',
        }}
      />
      
      <ParentLinks service={service} town={town} />

      {/* 2. Local Context Section */}
      <LocalContextSection townName={town.name} townIntro={town.intro} />

      {/* 3. Problem Section */}
      <ProblemSection townName={town.name} painPoints={painPoints} />
      
      {/* 4. Solution Section */}
      <SolutionSection serviceName={service.name} serviceDescription={service.description} townName={town.name} />

      {/* 5. Case Study Section */}
      <CaseStudySection townName={town.name} caseStudies={displayCaseStudies} />

      {/* 6. Industry Relevance Section */}
      <IndustryRelevanceSection 
        serviceName={service.name}
        serviceSlug={service.slug}
        townName={town.name}
        townSlug={town.slug}
        industries={industries} 
      />

      {/* 8. Internal Linking System */}
      <InternalLinks 
        serviceSlug={service.slug} 
        townSlug={town.slug} 
        latitude={town.latitude} 
        longitude={town.longitude} 
      />

      <GrowthSystem currentService={service.slug} />

      {/* 9. Educational Content */}
      <EducationalGuides townName={town.name} guides={guides} />

      {/* 10. Conversion CTA */}
      <CTA />
    </>
  );
}
