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


  // Core Services Constants (Rotated Programmatically)
  const seed = town.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const intros = [
    `Businesses in ${town.name} rely heavily on their online presence to attract new customers. A professionally designed website helps local businesses present their services clearly and generate enquiries.`,
    `When customers search for services in ${town.name}, the businesses that appear first often receive the most enquiries. A well structured online presence helps ensure your business is visible when it matters most.`,
    `As businesses in ${town.name} grow, having the right online systems becomes increasingly important. A strong website, clear messaging and efficient enquiry systems help businesses manage growth effectively.`,
    `Many businesses in ${town.name} compete for the same customers online. Businesses with stronger websites and better online visibility often stand out and attract more enquiries.`,
    `Most customers now research businesses online before making contact. A well structured online presence helps businesses in ${town.name} build trust and encourage enquiries.`,
    `A strong digital footprint is essential for companies operating in ${town.name}. By investing in professional digital infrastructure, you can capture attention and convert local traffic into loyal clients.`,
    `Standing out in the ${town.name} business community requires more than word of mouth. It requires a strategic digital approach that systematically turns online searches into steady revenue.`,
  ];
  const selectedIntro = intros[seed % intros.length];

  const locationContexts = [
    `Businesses in ${town.name} operate in a competitive local market where visibility and strong presentation can make a significant difference.`,
    `Many businesses in ${town.name} rely on local customers finding them online when searching for services.`,
    `As ${town.name} continues to grow, businesses increasingly rely on professional online systems to attract new customers.`,
    `The local economy in ${town.name} rewards businesses that establish authority and trust through a cohesive digital brand.`,
    `For trades and services located around ${town.name}, consistent digital lead generation is the key to escaping the feast-and-famine cycle.`
  ];
  const selectedLocationContext = locationContexts[(seed * 2) % locationContexts.length];
  const combinedIntro = `${selectedIntro} ${selectedLocationContext}`;

  const ctas = ["Get A Free Quote", "Request A Website Review", "Book An Automation Consultation", "Start Enhancing Your Growth"];
  const selectedCTA = ctas[(seed * 3) % ctas.length];

  const webDesignTerms = ["website design", "business websites", "professional website development", "mobile friendly website", "modern website architecture"];
  const seoTerms = ["local search visibility", "Google rankings", "local search optimisation", "search rankings", "Google Business profile"];
  const leadCaptureTerms = ["lead generation", "customer enquiries", "conversion optimisation", "quote request forms", "contact forms"];
  const automationTerms = ["workflow automation", "business systems", "customer management", "automated follow ups", "process automation"];

  // Web Design Data
  const isWebDesign = service.slug === 'web-design';
  const webDesignPainPointsBank = [
    { title: "Outdated websites", pain_point: `Businesses may still rely on old websites that no longer reflect their services.` },
    { title: "Poor mobile experience", pain_point: `Websites that are difficult to use on phones can drive visitors away in ${town.name}.` },
    { title: "Confusing navigation", pain_point: `Visitors struggle to find important information.` },
    { title: "Slow loading pages", pain_point: `Performance issues reduce engagement.` },
    { title: "Weak enquiry pathways", pain_point: `Visitors cannot easily contact the business.` }
  ];
  const rotatedWebDesignPainPoints = [webDesignPainPointsBank[seed % 5], webDesignPainPointsBank[(seed + 1) % 5], webDesignPainPointsBank[(seed + 2) % 5]];
  const webDesignFaqsBank = [
    { question: `How long does it take to build a website?`, answer: `A typical website takes between 4 to 8 weeks depending on the complexity of the project.` },
    { question: `Can you improve my existing website?`, answer: `Yes, we often redesign outdated sites to improve their performance and ability to generate local enquiries.` },
    { question: `Do you work with businesses in ${town.name}?`, answer: `Absolutely. We provide dedicated web design services for businesses throughout ${town.name} and the surrounding areas.` },
    { question: `Can I update my website myself?`, answer: `Yes, we build our sites on user-friendly platforms so you can easily update content.` }
  ];
  const webDesignFaqs = [webDesignFaqsBank[seed % 4], webDesignFaqsBank[(seed + 1) % 4], webDesignFaqsBank[(seed + 2) % 4]];
  const usedWebDesignTerms = [webDesignTerms[seed % 5], webDesignTerms[(seed + 1) % 5], webDesignTerms[(seed + 2) % 5]];

  // SEO Data
  const seoPainPointsBank = [
    { title: "Low search visibility", pain_point: `Businesses fail to appear for relevant searches in ${town.name}.` },
    { title: "Competitor dominance", pain_point: `Other companies occupy the top search results.` },
    { title: "Weak website optimisation", pain_point: `Sites lack the structure needed for search engines.` },
    { title: "Limited local optimisation", pain_point: `Google Business profiles and location signals are missing.` },
    { title: "Poor content coverage", pain_point: `Important services or locations are not represented by pages.` }
  ];
  const rotatedSeoPainPoints = [seoPainPointsBank[seed % 5], seoPainPointsBank[(seed + 1) % 5], seoPainPointsBank[(seed + 2) % 5]];
  const seoFaqsBank = [
    { question: `How long does SEO take to work?`, answer: `SEO is a long-term strategy. Typically, noticeable improvements in map rankings occur within 90 days.` },
    { question: `How do you choose keywords?`, answer: `We perform deep search engine opportunity analysis to target the exact transactional terms your local customers use.` },
    { question: `Do I need SEO for a small business?`, answer: `Yes. Local SEO specifically helps small businesses compete against larger companies by dominating the map results.` },
    { question: `Can you help my Google Business profile?`, answer: `Yes, we fully optimise your Google Business profile to capture local 'near me' search traffic.` }
  ];
  const seoFaqs = [seoFaqsBank[seed % 4], seoFaqsBank[(seed + 1) % 4], seoFaqsBank[(seed + 2) % 4]];
  const usedSeoTerms = [seoTerms[seed % 5], seoTerms[(seed + 1) % 5], seoTerms[(seed + 2) % 5]];

  // Lead Capture Data
  const isLeadCapture = service.slug === 'lead-capture';
  const leadCapturePainPointsBank = [
    { title: "Unclear calls to action", pain_point: `Visitors are unsure what to do next when arriving on your site.` },
    { title: "Complicated enquiry forms", pain_point: `Visitors abandon forms before submitting them.` },
    { title: "Visitors leave without contacting", pain_point: `Pages do not guide visitors toward enquiry.` },
    { title: "Important information buried", pain_point: `Customers in ${town.name} cannot quickly understand services.` },
    { title: "Lack of contact pathways", pain_point: `Phone, form and messaging options are unclear.` }
  ];
  const rotatedLeadCapturePainPoints = [leadCapturePainPointsBank[seed % 5], leadCapturePainPointsBank[(seed + 1) % 5], leadCapturePainPointsBank[(seed + 2) % 5]];
  const leadCaptureFaqsBank = [
    { question: `How can I get more enquiries from my website?`, answer: `By improving site structure, adding clear calls to action, and streamlining contact forms.` },
    { question: `Do I need a new website for lead capture?`, answer: `Not necessarily. We can often optimise existing pages to improve the user journey and conversion rates.` },
    { question: `Can you improve my contact forms?`, answer: `Yes, we redesign forms so they are simple, clear, and easy to complete on any device.` },
    { question: `What makes a website convert visitors?`, answer: `Clear messaging, strong calls to action, fast loading speeds, and frictionless contact pathways.` }
  ];
  const leadCaptureFaqs = [leadCaptureFaqsBank[seed % 4], leadCaptureFaqsBank[(seed + 1) % 4], leadCaptureFaqsBank[(seed + 2) % 4]];
  const usedLeadCaptureTerms = [leadCaptureTerms[seed % 5], leadCaptureTerms[(seed + 1) % 5], leadCaptureTerms[(seed + 2) % 5]];

  // Automation Data
  const isBusinessAutomation = service.slug === 'business-automation';
  const businessAutomationPainPointsBank = [
    { title: "Missed enquiries", pain_point: `Manual processes delay responses in ${town.name}.` },
    { title: "Manual follow ups", pain_point: `Business owners forget to follow up leads.` },
    { title: "Customer data scattered", pain_point: `Information stored in different systems.` },
    { title: "Admin workload", pain_point: `Businesses spend hours on repetitive tasks.` },
    { title: "Scaling challenges", pain_point: `Growth becomes harder without systems.` }
  ];
  const rotatedBusinessAutomationPainPoints = [businessAutomationPainPointsBank[seed % 5], businessAutomationPainPointsBank[(seed + 1) % 5], businessAutomationPainPointsBank[(seed + 2) % 5]];
  const businessAutomationFaqsBank = [
    { question: `What business tasks can be automated?`, answer: `We automate enquiry routing, follow-up emails, CRM data logging, and review requests.` },
    { question: `Do I need special software for automation?`, answer: `We specialise in integrations, connecting the tools you already use like your email, website, and basic CRM.` },
    { question: `Can automation work with my current systems?`, answer: `Yes, we build secure bridges between your website forms and existing operational software.` },
    { question: `Is automation suitable for small businesses?`, answer: `Absolutely. It acts as a virtual administrator, handling background work so you can focus on your service.` }
  ];
  const businessAutomationFaqs = [businessAutomationFaqsBank[seed % 4], businessAutomationFaqsBank[(seed + 1) % 4], businessAutomationFaqsBank[(seed + 2) % 4]];
  const usedAutomationTerms = [automationTerms[seed % 5], automationTerms[(seed + 1) % 5], automationTerms[(seed + 2) % 5]];

  // Branding Data
  const isBranding = service.slug === 'branding';
  const brandingPainPointsBank = [
    { title: "Inconsistent branding", pain_point: `Different colours, fonts and styles appear across your website, vehicles and social media in ${town.name}.` },
    { title: "Outdated logos", pain_point: `An old or poorly designed logo can make your business appear less professional.` },
    { title: "Generic brand identities", pain_point: `Without clear branding it becomes harder for customers to remember you compared to other local providers.` },
    { title: "Poor visual recognition", pain_point: `Flyers, workwear and signage do not match, causing a fragmented customer experience.` }
  ];
  const rotatedBrandingPainPoints = [brandingPainPointsBank[seed % 4], brandingPainPointsBank[(seed + 1) % 4], brandingPainPointsBank[(seed + 2) % 4], brandingPainPointsBank[(seed + 3) % 4]];
  const brandingFaqs = [
    { question: `How long does logo design take for businesses safely located in ${town.name}?`, answer: `A typical logo design process takes 2 to 4 weeks depending on how quickly we establish the correct direction through the concept phases.` },
    { question: `Will I receive all logo file formats?`, answer: `Yes. We provide full brand kits including vector files for large print work, transparent PNGs, and all variations required for digital and physical use.` },
    { question: `Do you provide brand guidelines?`, answer: `Absolutely. Every branding package includes a guidelines PDF outlining exactly how to use your colors, typography, and logo variations safely.` },
    { question: `Can you apply branding to workwear and vehicles?`, answer: `Yes. Our design systems are explicitly engineered to ensure your logo reproduces perfectly on physical printed merchandise, signage and van livery.` }
  ];

  // Social Media Data
  const isSocialMedia = service.slug === 'social-media-setup' || service.slug === 'digital-marketing';
  const socialMediaPainPointsBank = [
    { title: "Incomplete profiles", pain_point: `Important business information for your ${town.name} location is missing or completely outdated.` },
    { title: "Inconsistent branding", pain_point: `Colours, logos, and descriptions vary across platforms, confusing local customers.` },
    { title: "Poor first impressions", pain_point: `Your profiles may appear unprofessional or inactive when someone in ${town.name} searches for you.` },
    { title: "Disconnected online presence", pain_point: `Your social media profiles exist in a vacuum and do not align with or link back to your main business website.` }
  ];
  const rotatedSocialMediaPainPoints = [socialMediaPainPointsBank[seed % 4], socialMediaPainPointsBank[(seed + 1) % 4], socialMediaPainPointsBank[(seed + 2) % 4], socialMediaPainPointsBank[(seed + 3) % 4]];
  const socialMediaFaqs = [
    { question: `Which social platforms should my business in ${town.name} use?`, answer: `It depends entirely on your industry and audience. We generally recommend Google Business and Facebook for local trades, while B2B services benefit heavily from polished LinkedIn company pages.` },
    { question: `Can you improve my existing social media profiles?`, answer: `Yes. We specialise in profile rehabilitation—taking existing outdated accounts and structurally updating their imagery, messaging, and integrations to align with your current business standards.` },
    { question: `Do you manage the daily posting on these accounts?`, answer: `Our core service focuses on the professional *setup and structural alignment* of these profiles. We handle the heavy lifting of branding, integration, and architecture to ensure you have a high-end foundation to work from.` }
  ];

  // Workwear Data
  const isWorkwearPrint = service.slug === 'workwear-print';
  const workwearPainPointsBank = [
    { title: "Unbranded workwear", pain_point: `When working in ${town.name}, staff may appear less professional or untrustworthy to local residents if they arrive without branded uniforms.` },
    { title: "Inconsistent printed materials", pain_point: `Flyers and signage used locally around ${town.name} often don't match the modern digital brand identity.` },
    { title: "Missed visibility opportunities", pain_point: `Unbranded vehicles travelling between jobs in ${town.name} are wasting free daily local advertising.` },
    { title: "Low brand recognition", pain_point: `Without consistent physical visuals, customers in the ${town.name} area struggle to remember your business for future work.` }
  ];
  const rotatedWorkwearPainPoints = [workwearPainPointsBank[seed % 4], workwearPainPointsBank[(seed + 1) % 4], workwearPainPointsBank[(seed + 2) % 4], workwearPainPointsBank[(seed + 3) % 4]];
  const workwearFaqs = [
    { question: `What types of workwear can you brand for my team in ${town.name}?`, answer: `We supply and brand a full range of high-quality workwear, including hoodies, polo shirts, t-shirts, jackets, and high-visibility clothing. Everything is structurally designed to withstand tough working environments.` },
    { question: `Can you print business cards and flyers?`, answer: `Yes. We design and produce premium business cards, leaflets, brochures, and promotional materials that perfectly match your online identity and help you leave a lasting impression at local ${town.name} events.` },
    { question: `Do you supply clothing or just the branding?`, answer: `We supply the entire package end-to-end. We source high-quality garments from trusted UK suppliers and then manage the professional embroidery or printing process, delivering the finished product directly to you in ${town.name}.` },
    { question: `Can you match materials to my existing logo?`, answer: `Absolutely. Our design team ensures complete consistency, carefully matching your specific brand colours (Pantone/CMYK) and logo architecture so every physical item flawlessly represents your business identity.` }
  ];

  if (isSEO) {
    return (
      <>
        <LocalServiceHero
          title={<>SEO Services in {town.name}</>}
          subtitle={`If your business is not appearing in local search results, potential customers are finding your competitors instead. We help ${town.name} businesses improve visibility and turn searches into direct enquiries.`}
          primaryCTA={{ text: 'Get A Free Quote', href: '/contact' }}
        />
        
        <ParentLinks service={service} town={town} />

        {/* Introduction */}
        <LocalContextSection townName={town.name} townIntro={combinedIntro} />

        {/* SEO Challenges for Businesses in {Location} */}
        <ProblemSection 
          headlineOverride={`SEO Challenges for Businesses in ${town.name}`}
          painPoints={rotatedSeoPainPoints} 
        />
        
        {/* How Local SEO Helps Businesses Grow */}
        <SolutionSection 
          headlineOverride="How Local SEO Helps Businesses Grow"
          paragraphOverride={`By focusing on ${usedSeoTerms[0]} and improving your ${usedSeoTerms[1]}, we help construct a digital presence that dominates ${usedSeoTerms[2]} natively across ${town.name}.`}
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
          buttonOverride={selectedCTA}
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
          primaryCTA={{ text: 'Get A Free Website Review', href: '/contact' }}
        />
        
        <ParentLinks service={service} town={town} />

        {/* Introduction */}
        <LocalContextSection townName={town.name} townIntro={combinedIntro} />

        {/* Website Challenges for Businesses in {Location} */}
        <ProblemSection 
          headlineOverride={`Website Challenges for Businesses in ${town.name}`}
          painPoints={rotatedWebDesignPainPoints} 
        />
        
        {/* What a Professional Website Should Do */}
        <SolutionSection 
          headlineOverride="What a Professional Website Should Do"
          paragraphOverride={`A true ${usedWebDesignTerms[0]} does more than look nice. By prioritising a ${usedWebDesignTerms[1]}, we deliver ${usedWebDesignTerms[2]} that directly converts traffic in ${town.name}.`}
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
          buttonOverride={selectedCTA}
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
          primaryCTA={{ text: 'Get A Free Quote', href: '/contact' }}
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
          primaryCTA={{ text: 'Get A Free Website Review', href: '/contact' }}
        />
        
        <ParentLinks service={service} town={town} />

        {/* Introduction */}
        <LocalContextSection townName={town.name} townIntro={combinedIntro} />

        {/* Lead Capture Challenges for Businesses in {Location} */}
        <ProblemSection 
          headlineOverride={`Why Websites in ${town.name} Fail to Convert`}
          painPoints={rotatedLeadCapturePainPoints} 
        />
        
        {/* Why Lead Capture Matters */}
        <SolutionSection 
          headlineOverride="How Lead Capture Improves Enquiries"
          paragraphOverride={`A robust lead capture system combines ${usedLeadCaptureTerms[0]}, intelligent ${usedLeadCaptureTerms[1]}, and clean ${usedLeadCaptureTerms[2]} to turn your local traffic in ${town.name} directly into enquiries.`}
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
          buttonOverride={selectedCTA}
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
          paragraphOverride={`With proper ${usedAutomationTerms[0]}, businesses can rely on ${usedAutomationTerms[1]} and secure ${usedAutomationTerms[2]} to handle repetitive administrative work securely in the background across ${town.name}.`}
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
          primaryCTA={{ text: 'Get A Free Quote', href: '/contact' }}
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
          buttonOverride="Get A Free Quote"
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
          primaryCTA={{ text: 'Get A Free Quote', href: '/contact' }}
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
          buttonOverride="Get A Free Quote"
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
          text: 'Get A Free Quote',
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
