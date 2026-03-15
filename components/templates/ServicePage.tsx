import ServiceHero from '@/components/sections/ServiceHero';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import CaseStudySection from '@/components/sections/CaseStudySection';
import ProcessAuthority from '@/components/sections/ProcessAuthority';
import LocalRelevanceSection from '@/components/sections/LocalRelevanceSection';
import InternalLinks from '@/components/seo/InternalLinks';
import FinalCTA from '@/components/sections/FinalCTA';
import CTA from '@/components/sections/CTA';
import { getServiceHubMessaging } from '@/lib/content/messaging';

import { getAllCaseStudies } from '@/lib/queries/caseStudies';
import FAQ from '@/components/sections/FAQ';
import { getServiceFAQs } from '@/components/content/ServiceFAQs';
import GrowthSystem from '@/components/sections/GrowthSystem';

import LocalAuthorityMap from '@/components/sections/LocalAuthorityMap';
import KentCoverage from '@/components/sections/KentCoverage';
import EducationalGuides from '@/components/sections/EducationalGuides';
import Services from '@/components/sections/Services';
import CredibilityMetrics from '@/components/sections/CredibilityMetrics';
import WebsiteReviewCTA from '@/components/sections/WebsiteReviewCTA';
import Reveal from '@/components/ui/Reveal';
import { Search, Laptop, FileText, Link as LinkIcon, MapPin, TrendingUp, Palette, Zap, Share2, MousePointerClick } from 'lucide-react';

interface TownRef {
  name: string;
  slug: string;
}

interface CaseStudyRef {
  title: string;
  slug: string;
  industry: string;
  town: string;
}

interface ServicePageProps {
  serviceName: string;
  serviceSlug: string;
  description: string;
  towns: TownRef[];
  caseStudies?: CaseStudyRef[];
  guides?: any[];
}

export default async function ServicePage({
  serviceName,
  serviceSlug,
  description,
  towns,
  caseStudies,
  guides,
}: ServicePageProps) {
  const messaging = getServiceHubMessaging(serviceSlug);

  const allCaseStudies = await getAllCaseStudies();
  const serviceCaseStudies = allCaseStudies.filter(c => 
     c.services_used?.toLowerCase().includes(serviceName.toLowerCase())
  );
  const displayStudies = serviceCaseStudies.length > 0 ? serviceCaseStudies : allCaseStudies.slice(0, 3);
  const isSEO = serviceSlug === 'seo';
  const isWebDesign = serviceSlug === 'web-design';
  const isBranding = serviceSlug === 'branding';
  const isLeadCapture = serviceSlug === 'lead-capture';
  const isBusinessAutomation = serviceSlug === 'business-automation';
  const isSocialMedia = serviceSlug === 'social-media-setup' || serviceSlug === 'digital-marketing';
  const isWorkwearPrint = serviceSlug === 'workwear-print';

  if (isSEO) {
    return (
      <>
        <ServiceHero
          title={<>SEO Services That Help Your Business<br />Get Found On Google</>}
          subtitle="If your business is not appearing in local search results, potential customers are finding your competitors instead. Our SEO services help businesses across Kent improve visibility, attract the right traffic, and turn searches into enquiries."
          primaryCTA={{ text: 'Get A Free Quote', href: '/contact' }}
        />
        
        <ProblemSection 
          headlineOverride="Why Many Businesses Struggle To Rank On Google"
          painPoints={[
            { title: "Low search visibility", pain_point: "Even when customers search for your services locally." },
            { title: "Competitor rankings", pain_point: "Businesses investing in SEO appear ahead of you." },
            { title: "Poor website optimisation", pain_point: "Many sites lack the technical structure Google expects." },
            { title: "Weak Google Business profile", pain_point: "Local SEO opportunities are often missed." },
            { title: "Missing local relevance", pain_point: "Your site doesn't clearly show Google that you operate reliably across your area." }
          ]}
        />
        
        <SolutionSection 
          headlineOverride="What Local SEO Actually Involves"
          paragraphOverride="Effective SEO requires a structured, multi-layered approach to signal trust and relevance to Google. It is highly strategic work."
          solutions={[
            { title: "Keyword Research", description: "Identifying the exact terms your customers are searching for locally.", icon: Search },
            { title: "Technical Optimisation", description: "Ensuring your website is fast, secure, and easily crawled by Google.", icon: Laptop },
            { title: "Structured Content", description: "Creating valuable, relevant pages that answer user intent comprehensively.", icon: FileText },
            { title: "Internal Linking", description: "Building a logical site architecture that distributes page authority safely.", icon: LinkIcon },
            { title: "Google Business Profile", description: "Optimising your local map listings to capture immediate commercial intent.", icon: MapPin },
            { title: "Ongoing Improvements", description: "Continuously refining strategies based on real performance data and trends.", icon: TrendingUp }
          ]}
        />
        
        <ProcessAuthority 
          headlineOverride="Our Local SEO System"
          descriptionOverride="Our structured methodology is engineered specifically to capture high-intent local searches and turn them into safe, measurable commercial enquiries."
          stepsOverride={[
            { num: '01', title: 'Search Opportunity Analysis', description: 'Identify the terms your customers actually search.' },
            { num: '02', title: 'Website Optimisation', description: 'Ensure your website structure supports search visibility.' },
            { num: '03', title: 'Content Development', description: 'Create pages targeting services, locations and industries.' },
            { num: '04', title: 'Google Business Profile Optimisation', description: 'Improve visibility in map results.' },
            { num: '05', title: 'Continuous Improvement', description: 'Monitor performance and refine over time.' },
          ]}
        />
        
        <section className="py-28 bg-neutral-950 border-t border-neutral-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center md:text-left mb-16 max-w-2xl">
                <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">What Results Can You Expect From SEO?</h2>
                <p className="text-lg text-neutral-400">SEO typically improves search visibility, website traffic, and enquiry volume. We focus on sustainable strategies, where results compound reliably over several months rather than offering fleeting, risky overnight spikes.</p>
              </div>
            </Reveal>
            <CredibilityMetrics />
          </div>
        </section>

        <LocalAuthorityMap headlineOverride="SEO Support For Businesses Across Kent" />
        
        <WebsiteReviewCTA />

        <Services 
          headlineOverride="Supporting Services That Improve SEO Results"
          descriptionOverride="Our fully connected digital growth ecosystem integrates seamlessly to improve your search visibility and overall conversion rates."
          servicesOverride={[
            { title: 'Website Design', description: 'Professional, modern websites that build trust and showcase your services.', href: '/web-design', icon: Laptop },
            { title: 'Lead Capture Systems', description: 'Funnels and integrated systems engineered specifically to generate daily enquiries.', href: '/lead-capture', icon: MousePointerClick },
            { title: 'Business Automation', description: 'Systems that organise enquiries, follow-ups and processes automatically.', href: '/business-automation', icon: Zap }
          ]}
        />
        
        <CaseStudySection serviceName={serviceName} caseStudies={displayStudies} />
        <KentCoverage pageType={serviceSlug} />
        <GrowthSystem currentService={serviceSlug} />
        <FAQ faqs={getServiceFAQs(serviceSlug)} title={`Frequently Asked Questions about SEO in Kent`} />
        
        <CTA 
          titleOverride="Start Improving Your Google Visibility" 
          paragraphOverride="If your business is not appearing in search results, the right SEO strategy can change that. We help businesses across Kent improve visibility and generate more enquiries." 
          buttonOverride="Get A Free Quote"
        />
      </>
    );
  }

  if (isWebDesign) {
    return (
      <>
        <ServiceHero
          title={<>Website Design That Turns<br />Visitors Into Customers</>}
          subtitle="Your website should be more than an online brochure. It should showcase your business professionally, appear in search results, and convert visitors into real enquiries. We design modern, high-performing websites for businesses across Kent."
          primaryCTA={{ text: 'Get A Free Website Review', href: '/contact' }}
        />
        
        <ProblemSection 
          headlineOverride="Why Many Business Websites Fail"
          painPoints={[
            { title: "Outdated websites", pain_point: "First impressions matter and an old website can reduce trust." },
            { title: "Slow loading pages", pain_point: "Your website takes too long to load, costing you valuable enquiries." },
            { title: "Poor mobile experience", pain_point: "Most visitors now browse on phones." },
            { title: "Confusing navigation", pain_point: "Visitors cannot easily find what they are looking for." },
            { title: "Weak enquiry pathways", pain_point: "Visitors cannot easily find how to contact you or explore services." }
          ]}
        />
        
        <SolutionSection 
          headlineOverride="What Makes a High Performing Business Website"
          paragraphOverride="Many websites look impressive on the surface but are poorly built underneath. We construct our websites with high-performance code and technical SEO embedded from day one—meaning your site is engineered to rank, perform, and convert just as beautifully as it looks."
          solutions={[
            { title: "Clear Messaging", description: "Instantly communicate what you do and who you serve.", icon: FileText },
            { title: "Fast Loading Speeds", description: "Keep visitors engaged with pages that load instantly.", icon: Zap },
            { title: "Mobile Friendly Design", description: "Flawless experience across all devices and screen sizes.", icon: Laptop },
            { title: "Strong Calls to Action", description: "Guide visitors clearly toward making an enquiry.", icon: MapPin },
            { title: "Search Engine Friendly", description: "Structured from the ground up to be found on Google.", icon: Search },
            { title: "Easy Navigation", description: "Logical layouts that help users find information effortlessly.", icon: LinkIcon }
          ]}
        />
        
        <ProcessAuthority 
          headlineOverride="Our Web Design Process"
          descriptionOverride="Our structured methodology ensures your website is engineered for speed and search visibility, not just visual appeal."
          stepsOverride={[
            { num: '01', title: 'Understanding Your Business', description: 'Learn about services, customers and goals.' },
            { num: '02', title: 'Planning the Structure', description: 'Design pages that guide visitors toward enquiry.' },
            { num: '03', title: 'Design & Build', description: 'Create a modern website aligned with your brand.' },
            { num: '04', title: 'SEO Foundations', description: 'Ensure the site is structured to support search visibility.' },
            { num: '05', title: 'Launch', description: 'Your website goes live ready to attract customers.' },
          ]}
        />

        <section className="py-28 bg-neutral-950 border-t border-neutral-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center md:text-left mb-16 max-w-2xl">
                <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Websites Built For Small Businesses</h2>
                <p className="text-lg text-neutral-400">We build websites tailored to the specific needs of local businesses and service providers.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Websites for Trades</h3>
                 <p className="text-neutral-400">Showcase services and generate local enquiries.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Websites for Startups</h3>
                 <p className="text-neutral-400">Professional online presence from day one.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Service Business Websites</h3>
                 <p className="text-neutral-400">Clear structure that turns visitors into leads.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Ecommerce Websites</h3>
                 <p className="text-neutral-400">Online stores designed for smooth purchasing.</p>
               </div>
            </div>
          </div>
        </section>

        <LocalAuthorityMap headlineOverride="Website Design For Businesses Across Kent" />
        
        <WebsiteReviewCTA />

        <Services 
          headlineOverride="More Than Just Website Design"
          descriptionOverride="Successful websites also benefit from our fully connected digital growth ecosystem."
          servicesOverride={[
            { title: 'Local SEO', description: 'Optimised pages and local SEO that help your business appear in relevant searches.', href: '/seo', icon: Search },
            { title: 'Lead Capture Systems', description: 'Funnels and integrated systems engineered specifically to generate daily enquiries.', href: '/lead-capture', icon: MousePointerClick },
            { title: 'Business Automation', description: 'Systems that organise enquiries, follow-ups and processes automatically.', href: '/business-automation', icon: Zap }
          ]}
        />
        
        <CaseStudySection serviceName={serviceName} caseStudies={displayStudies} />
        <KentCoverage pageType={serviceSlug} />
        <GrowthSystem currentService={serviceSlug} />
        <FAQ faqs={getServiceFAQs(serviceSlug)} title={`Frequently Asked Questions about Web Design`} />
        
        <CTA 
          titleOverride="Ready For A Website That Works For Your Business?" 
          paragraphOverride="If your current website feels outdated or is not generating enquiries, a professionally designed site can transform how customers see your business." 
          buttonOverride="Get A Free Website Review"
        />
      </>
    );
  }

  if (isBranding) {
    return (
      <>
        <ServiceHero
          title={<>Professional Logo & Branding<br />That Makes Your Business Look Established</>}
          subtitle="Your brand is often the first impression customers have of your business. A clear, professional identity helps you build trust, stand out from competitors and look established from the very first interaction. We create logos and branding systems for businesses across Kent that work consistently across websites, vehicles, workwear and marketing materials."
          primaryCTA={{ text: 'Get A Free Quote', href: '/contact' }}
        />
        
        <ProblemSection 
          headlineOverride="Why Many Small Business Brands Struggle"
          painPoints={[
            { title: "Your branding looks inconsistent", pain_point: "Different colours, fonts and styles appear across your website, vehicles and social media." },
            { title: "Your logo looks outdated", pain_point: "An old or poorly designed logo can make your business appear less professional." },
            { title: "Your business blends in with competitors", pain_point: "Without clear branding it becomes harder for customers to remember you." },
            { title: "Your marketing materials lack cohesion", pain_point: "Flyers, workwear and signage may not match visually." },
            { title: "You struggle to present a professional image", pain_point: "Strong branding helps customers trust your business before they even contact you." }
          ]}
        />
        
        <SolutionSection 
          headlineOverride="What Strong Branding Actually Includes"
          paragraphOverride="Professional branding is more than just a logo. It is a complete visual system."
          solutions={[
            { title: "Logo Design", description: "A distinct, professional mark that represents your business.", icon: Palette },
            { title: "Colour Palette", description: "Carefully selected colours that evoke trust and recognition.", icon: Zap },
            { title: "Typography", description: "Consistent fonts that make your messaging clear and professional.", icon: FileText },
            { title: "Brand Guidelines", description: "A rulebook ensuring your brand always looks correct.", icon: LinkIcon },
            { title: "Visual Identity", description: "A cohesive look across all customer touchpoints.", icon: MapPin },
            { title: "Real World Application", description: "Prepared for print, digital, vehicles, and workwear.", icon: Search }
          ]}
        />
        
        <ProcessAuthority 
          headlineOverride="Our Branding Process"
          descriptionOverride="Our structured methodology builds brands that look established."
          stepsOverride={[
            { num: '01', title: 'Understanding Your Business', description: 'We learn about your services, audience and the image you want to present.' },
            { num: '02', title: 'Concept Development', description: 'Initial logo concepts and visual directions are created.' },
            { num: '03', title: 'Refinement', description: 'Designs are refined based on feedback until the final direction is agreed.' },
            { num: '04', title: 'Brand Kit Creation', description: 'Your colours, fonts and logo variations are organised into a clear brand system.' },
            { num: '05', title: 'Real World Application', description: 'Your branding is prepared for websites, workwear, signage and marketing materials.' },
          ]}
        />

        <section className="py-28 bg-neutral-950 border-t border-neutral-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center md:text-left mb-16 max-w-2xl">
                <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Branding That Works Across Every Platform</h2>
                <p className="text-lg text-neutral-400">We design identities built to perform seamlessly everywhere your customers see you.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Website Branding</h3>
                 <p className="text-neutral-400">A consistent identity across your website improves professionalism.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Vehicle Graphics</h3>
                 <p className="text-neutral-400">Clear branding helps your vehicles act as moving advertisements.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Workwear Branding</h3>
                 <p className="text-neutral-400">Uniform branding builds trust with customers on-site.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Print Materials</h3>
                 <p className="text-neutral-400">Flyers, business cards and signage all align visually.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Social Media Branding</h3>
                 <p className="text-neutral-400">Profiles and graphics follow the same visual identity.</p>
               </div>
            </div>
          </div>
        </section>

        <LocalAuthorityMap headlineOverride="Branding Support For Businesses Across Kent" />
        
        <Services 
          headlineOverride="Supporting Services That Strengthen Your Brand"
          descriptionOverride="Consistent branding improves the effectiveness of these connected services."
          servicesOverride={[
            { title: 'Website Design', description: 'Professional, modern websites that build trust and showcase your services.', href: '/web-design', icon: Laptop },
            { title: 'Local SEO', description: 'Optimised pages and local SEO that help your business appear in relevant searches.', href: '/seo', icon: Search },
            { title: 'Business Automation', description: 'Systems that organise enquiries, follow-ups and processes automatically.', href: '/business-automation', icon: Zap },
            { title: 'Social Media Setup', description: 'Optimised social media profiles structured to attract and convert local clients.', href: '/digital-marketing', icon: Share2 }
          ]}
        />
        
        <CaseStudySection serviceName={serviceName} caseStudies={displayStudies} />
        <KentCoverage pageType={serviceSlug} />
        <GrowthSystem currentService={serviceSlug} />
        <FAQ faqs={getServiceFAQs(serviceSlug)} title={`Frequently Asked Questions about Branding`} />
        
        <CTA 
          titleOverride="Ready To Give Your Business A Professional Identity?" 
          paragraphOverride="Whether you need a completely new logo or a full branding system, we can help your business present a clear and professional image." 
        />
      </>
    );
  }

  if (isLeadCapture) {
    return (
      <>
        <ServiceHero
          title={<>Lead Capture Systems That Turn<br />Visitors Into Enquiries</>}
          subtitle="Many websites receive visitors but fail to convert them into enquiries. We build lead capture systems that guide visitors toward action, making it easier for potential customers to contact your business."
          primaryCTA={{ text: 'Get A Free Website Review', href: '/contact' }}
        />
        
        <ProblemSection 
          headlineOverride="Why Many Websites Fail To Generate Enquiries"
          painPoints={[
            { title: "Unclear calls to action", pain_point: "Visitors are unsure what step to take next." },
            { title: "Visitors leaving without enquiry", pain_point: "Your website may not clearly guide people toward enquiry." },
            { title: "Confusing contact forms", pain_point: "Complex or confusing forms discourage enquiries." },
            { title: "Weak conversion pathways", pain_point: "Visitors struggle to understand your services quickly." },
            { title: "Lack of enquiry tracking", pain_point: "You have no data showing what actually generates leads." }
          ]}
        />
        
        <SolutionSection 
          headlineOverride="What Is A Lead Capture System?"
          paragraphOverride="A lead capture system combines clear calls to action, structured page layouts, enquiry forms, contact pathways, and automated follow ups to guide your visitors directly toward making an enquiry."
          solutions={[
            { title: "Strategic Call To Action Buttons", description: "Placed exactly where visitors make decisions.", icon: LinkIcon },
            { title: "Enquiry Forms", description: "Structured carefully to reduce friction for the user.", icon: FileText },
            { title: "Landing Pages", description: "Pages built specifically for high conversion rates.", icon: Laptop },
            { title: "Quote Request Forms", description: "Clear pathways for pricing or custom job queries.", icon: FileText },
            { title: "Click To Call Features", description: "Allowing mobile visitors to phone you easily.", icon: Search },
            { title: "Live Chat Options", description: "For immediate, real-time customer conversations.", icon: Zap }
          ]}
        />
        
        <ProcessAuthority 
          headlineOverride="How We Improve Lead Generation"
          descriptionOverride="Our methodical approach ensures every page on your site works hard to generate enquiries."
          stepsOverride={[
            { num: '01', title: 'Visitor Journey Planning', description: 'Design pages that guide visitors toward enquiry.' },
            { num: '02', title: 'Clear Calls To Action', description: 'Place enquiry prompts in the right locations.' },
            { num: '03', title: 'Optimised Contact Forms', description: 'Simple forms that encourage visitors to get in touch.' },
            { num: '04', title: 'Conversion Focused Page Layouts', description: 'Ensure key information appears where visitors expect it.' },
            { num: '05', title: 'Automation Integration', description: 'Connect enquiries to automated systems and workflows.' },
          ]}
        />

        <section className="py-28 bg-neutral-950 border-t border-neutral-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center md:text-left mb-16 max-w-2xl">
                <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">The Impact Of Good Lead Capture</h2>
                <p className="text-lg text-neutral-400">By optimising user flow, we dramatically increase the number of visitors who choose to interact with your business.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Higher Conversion Rates</h3>
                 <p className="text-neutral-400">Turn existing traffic into paying clients immediately.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Better Quality Leads</h3>
                 <p className="text-neutral-400">Filter out low-intent users through smart form design.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Faster Response Times</h3>
                 <p className="text-neutral-400">Integration with your CRM means you follow up first.</p>
               </div>
            </div>
          </div>
        </section>

        <LocalAuthorityMap headlineOverride="Lead Capture Systems For Businesses Across Kent" />
        
        <Services 
          headlineOverride="Connected Growth Services"
          descriptionOverride="Lead Capture performs best when supported by the rest of our digital growth framework."
          servicesOverride={[
            { title: 'Website Design', description: 'Professional, modern websites that build trust and showcase your services.', href: '/web-design', icon: Laptop },
            { title: 'Local SEO', description: 'Optimised pages and local SEO that help your business appear in relevant searches.', href: '/seo', icon: Search },
            { title: 'Business Automation', description: 'Systems that organise enquiries, follow-ups and processes automatically.', href: '/business-automation', icon: Zap }
          ]}
        />
        
        <CaseStudySection serviceName={serviceName} caseStudies={displayStudies} />
        <KentCoverage pageType={serviceSlug} />
        <GrowthSystem currentService={serviceSlug} />
        <FAQ faqs={getServiceFAQs(serviceSlug)} title={`Frequently Asked Questions`} />
        
        <CTA 
          titleOverride="Turn Website Visitors Into Real Enquiries" 
          paragraphOverride="If your website receives traffic but generates few enquiries, improving lead capture can dramatically increase results." 
          buttonOverride="Get A Free Website Review"
        />
      </>
    );
  }

  if (isBusinessAutomation) {
    return (
      <>
        <ServiceHero
          title={<>Business Automation Systems That Save<br />Time And Organise Enquiries</>}
          subtitle="As your business grows, managing enquiries, follow ups and processes manually becomes difficult. We build automation systems that organise incoming enquiries, trigger follow ups and streamline day to day operations."
          primaryCTA={{ text: 'Book An Automation Consultation', href: '/contact' }}
        />
        
        <ProblemSection 
          headlineOverride="Why Many Businesses Struggle To Manage Enquiries"
          painPoints={[
            { title: "Missed enquiries", pain_point: "Manual processes can cause slow responses." },
            { title: "Manual follow ups", pain_point: "Potential customers are often forgotten without an automated structure." },
            { title: "Disorganised customer data", pain_point: "Important details are spread across different systems." },
            { title: "Time consuming admin tasks", pain_point: "Business owners spend hours managing emails and messages." },
            { title: "Growth becomes harder to manage", pain_point: "Without systems in place, scaling becomes difficult." }
          ]}
        />
        
        <SolutionSection 
          headlineOverride="What Is Business Automation?"
          paragraphOverride="Business automation systems connect your website with your operational software (like CRMs or booking platforms) to handle repetitive administrative work securely in the background."
          solutions={[
            { title: "Organising Enquiries", description: "Directing leads to the right team member instantly.", icon: Zap },
            { title: "Sending automated follow ups", description: "Ensuring potential customers receive immediate responses.", icon: FileText },
            { title: "Tracking customer information", description: "Logging details securely without manual data entry.", icon: Search },
            { title: "Connecting website forms to workflows", description: "Triggering operational tasks from a simple form fill.", icon: LinkIcon },
            { title: "Improving response times", description: "Allowing your business to reply faster than competitors.", icon: Laptop }
          ]}
        />
        
        <ProcessAuthority 
          headlineOverride="How We Build Automation Systems"
          descriptionOverride="Our structured integration process builds reliable scaling capabilities into your business."
          stepsOverride={[
            { num: '01', title: 'Process Discovery', description: 'Understand how your enquiries and workflows currently operate.' },
            { num: '02', title: 'System Planning', description: 'Identify opportunities to automate repetitive tasks.' },
            { num: '03', title: 'Automation Setup', description: 'Build workflows that handle enquiries, notifications and follow ups.' },
            { num: '04', title: 'System Integration', description: 'Connect your website, CRM and communication tools.' },
            { num: '05', title: 'Testing And Optimisation', description: 'Ensure the automation works reliably as your business grows.' },
          ]}
        />

        <section className="py-28 bg-neutral-950 border-t border-neutral-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center md:text-left mb-16 max-w-2xl">
                <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Examples Of Business Automation</h2>
                <p className="text-lg text-neutral-400">By handing off manual admin work to secure systems, you and your team can focus fully on doing the actual work.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Enquiry Routing</h3>
                 <p className="text-neutral-400">Automatically organise incoming enquiries.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Automated Email Responses</h3>
                 <p className="text-neutral-400">Send instant confirmation messages.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Lead Tracking</h3>
                 <p className="text-neutral-400">Track enquiries from first contact to completion.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Follow Up Sequences</h3>
                 <p className="text-neutral-400">Automatically remind customers about quotes or appointments.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Review Requests</h3>
                 <p className="text-neutral-400">Automatically ask customers for feedback after a job.</p>
               </div>
            </div>
          </div>
        </section>

        <LocalAuthorityMap headlineOverride="Automation Systems For Businesses Across Kent" />
        
        <Services 
          headlineOverride="Connected Growth Services"
          descriptionOverride="Automation works best when receiving consistent enquiries from a high-performing digital ecosystem."
          servicesOverride={[
            { title: 'Website Design', description: 'Professional, modern websites that build trust and showcase your services.', href: '/web-design', icon: Laptop },
            { title: 'Local SEO', description: 'Optimised pages and local SEO that help your business appear in relevant searches.', href: '/seo', icon: Search },
            { title: 'Lead Capture Systems', description: 'Funnels and integrated systems engineered specifically to generate daily enquiries.', href: '/lead-capture', icon: MousePointerClick }
          ]}
        />
        
        <CaseStudySection serviceName={serviceName} caseStudies={displayStudies} />
        <KentCoverage pageType={serviceSlug} />
        <GrowthSystem currentService={serviceSlug} />
        <FAQ faqs={getServiceFAQs(serviceSlug)} title={`Frequently Asked Questions`} />
        
        <CTA 
          titleOverride="Streamline Your Business With Automation" 
          paragraphOverride="Automation systems can help your business respond faster, organise enquiries and reduce repetitive admin work." 
          buttonOverride="Book An Automation Consultation"
        />
      </>
    );
  }

  if (isSocialMedia) {
    return (
      <>
        <ServiceHero
          title={<>Professional Social Media Setup<br />Build A Consistent Online Presence</>}
          subtitle="A well structured social media profile helps potential customers understand your business quickly and builds trust before they contact you. We set up and optimise social media profiles so they align with your branding and support your wider online presence."
          primaryCTA={{ text: 'Get A Free Quote', href: '/contact' }}
        />
        
        <ProblemSection 
          headlineOverride="Why Many Business Social Profiles Fail"
          painPoints={[
            { title: "Incomplete profiles", pain_point: "Important information is missing or outdated." },
            { title: "Inconsistent branding", pain_point: "Colours, logos and descriptions vary across platforms." },
            { title: "Poor first impressions", pain_point: "Profiles may appear unprofessional or inactive." },
            { title: "Unclear service information", pain_point: "Visitors struggle to understand what your business offers." },
            { title: "Disconnected online presence", pain_point: "Profiles do not align with the business website." }
          ]}
        />
        
        <SolutionSection 
          headlineOverride="What A Professional Social Media Profile Includes"
          paragraphOverride="A strong social profile clearly communicates your services, builds trust, and makes it easy for visitors to connect directly with your website."
          solutions={[
            { title: "Consistent branding", description: "Logos and imagery matching your official identity.", icon: Palette },
            { title: "Clear business description", description: "Telling visitors exactly what you do simply.", icon: FileText },
            { title: "Service highlights", description: "Putting your key offerings front and center.", icon: Zap },
            { title: "Correct contact information", description: "Making it obvious how to get in touch.", icon: LinkIcon },
            { title: "Link to the website", description: "Driving interested users straight to your domain.", icon: Laptop },
            { title: "Profile and cover imagery", description: "Sized and cropped perfectly for every platform.", icon: Search }
          ]}
        />
        
        <ProcessAuthority 
          headlineOverride="Our Social Media Setup Process"
          descriptionOverride="Our structured methodology ensures your profiles mirror your high-end brand identity exactly."
          stepsOverride={[
            { num: '01', title: 'Platform Review', description: 'Assess your current social profiles.' },
            { num: '02', title: 'Brand Alignment', description: 'Ensure colours, logos and messaging match your brand.' },
            { num: '03', title: 'Profile Optimisation', description: 'Update descriptions, services and contact details.' },
            { num: '04', title: 'Visual Setup', description: 'Create cover images and profile graphics.' },
            { num: '05', title: 'Website Integration', description: 'Connect profiles clearly to your website.' },
          ]}
        />

        <section className="py-28 bg-neutral-950 border-t border-neutral-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center md:text-left mb-16 max-w-2xl">
                <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Platforms We Can Help Set Up</h2>
                <p className="text-lg text-neutral-400">We establish your brand wherever your local customers are spending their time.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Facebook Business Pages</h3>
                 <p className="text-neutral-400">For community connection and local reach.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Instagram Business Profiles</h3>
                 <p className="text-neutral-400">For visual portfolios and direct messaging.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">LinkedIn Company Pages</h3>
                 <p className="text-neutral-400">For B2B networking and professional authority.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Google Business Integration</h3>
                 <p className="text-neutral-400">Linking your platforms to local map results.</p>
               </div>
            </div>
          </div>
        </section>

        <LocalAuthorityMap headlineOverride="Social Media Setup For Businesses Across Kent" />
        
        <Services 
          headlineOverride="Part Of Your Wider Online Presence"
          descriptionOverride="Social Media profiles support this ecosystem by reinforcing brand visibility."
          servicesOverride={[
            { title: 'Website Design', description: 'Creates the foundation of your online presence.', href: '/web-design', icon: Laptop },
            { title: 'Local SEO', description: 'Helps customers discover your business.', href: '/seo', icon: Search },
            { title: 'Lead Capture Systems', description: 'Turn visitors into enquiries.', href: '/lead-capture', icon: LinkIcon },
            { title: 'Business Automation', description: 'Organises incoming leads.', href: '/business-automation', icon: Zap }
          ]}
        />
        
        <CaseStudySection serviceName={serviceName} caseStudies={displayStudies} />
        <KentCoverage pageType={serviceSlug} />
        <GrowthSystem currentService={serviceSlug} />
        <FAQ faqs={getServiceFAQs(serviceSlug)} title={`Frequently Asked Questions`} />
        
        <CTA 
          titleOverride="Create A Professional Social Media Presence" 
          paragraphOverride="A well structured profile helps customers understand your business and builds trust before they contact you." 
          buttonOverride="Get A Free Quote"
        />
      </>
    );
  }

  if (isWorkwearPrint) {
    return (
      <>
        <ServiceHero
          title={<>Workwear & Print<br />Professional Branding In The Real World</>}
          subtitle="Consistent branding across workwear, vehicles and printed materials helps customers recognise and trust your business. We provide high quality branded workwear and printed materials designed to match your business identity."
          primaryCTA={{ text: 'Get A Free Quote', href: '/contact' }}
        />
        
        <ProblemSection 
          headlineOverride="Why Physical Branding Matters"
          painPoints={[
            { title: "Unbranded workwear", pain_point: "Staff may appear less professional on site." },
            { title: "Inconsistent printed materials", pain_point: "Flyers and signage may not match your brand identity." },
            { title: "Missed visibility opportunities", pain_point: "Vehicles and clothing can promote your business daily." },
            { title: "Low brand recognition", pain_point: "Consistent visuals help customers remember your business." }
          ]}
        />
        
        <SolutionSection 
          headlineOverride="What Branded Materials Can Include"
          paragraphOverride="We ensure your physical assets represent your business to the same high standard as your online presence."
          solutions={[
            { title: "Branded Workwear", description: "High quality embroidered and printed clothing.", icon: Palette },
            { title: "Business Cards", description: "Premium networking materials that leave an impression.", icon: FileText },
            { title: "Flyers & Leaflets", description: "Targeted localized marketing assets.", icon: Zap },
            { title: "Signage", description: "Clear, durable displays for your premises.", icon: LinkIcon },
            { title: "Vehicle Graphics", description: "Turn your transport into a moving billboard.", icon: Laptop },
            { title: "Promotional Materials", description: "Branded products tailored to your audience.", icon: Search }
          ]}
        />
        
        <ProcessAuthority 
          headlineOverride="Our Workwear & Print Process"
          descriptionOverride="Our end-to-end production process ensures perfect brand alignment and high-quality finishes."
          stepsOverride={[
            { num: '01', title: 'Brand Review', description: 'Ensure materials align with your branding.' },
            { num: '02', title: 'Product Selection', description: 'Choose clothing or materials suited to your business.' },
            { num: '03', title: 'Design Preparation', description: 'Prepare logos and branding for production.' },
            { num: '04', title: 'Production', description: 'High quality printing or embroidery.' },
            { num: '05', title: 'Delivery', description: 'Materials delivered ready to use.' },
          ]}
        />

        <section className="py-28 bg-neutral-950 border-t border-neutral-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <div className="text-center md:text-left mb-16 max-w-2xl">
                <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Products We Provide</h2>
                <p className="text-lg text-neutral-400">Everything needed to present a cohesive and professional front to your customers.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Branded Workwear</h3>
                 <p className="text-neutral-400">Polo shirts, hoodies, jackets, and safety gear.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Business Cards</h3>
                 <p className="text-neutral-400">Premium thickness and specialized finishes.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Flyers & Leaflets</h3>
                 <p className="text-neutral-400">High-resolution print for campaign distributions.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Signage</h3>
                 <p className="text-neutral-400">Durable outdoor and indoor physical branding.</p>
               </div>
               <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                 <h3 className="text-xl font-bold text-white mb-2">Vehicle Graphics</h3>
                 <p className="text-neutral-400">Professional vinyl wrap and detailing application design.</p>
               </div>
            </div>
          </div>
        </section>

        <LocalAuthorityMap headlineOverride="Workwear & Print For Businesses Across Kent" />
        
        <Services 
          headlineOverride="Connected To Your Brand Identity"
          descriptionOverride="Our workwear services bring the digital identity we create locally into the real world."
          servicesOverride={[
            { title: 'Logo & Branding', description: 'Defines your core visual identity.', href: '/branding', icon: Palette },
            { title: 'Workwear & Print', description: 'Applies that identity to real world materials.', href: '/workwear-print', icon: Zap }
          ]}
        />
        
        <FAQ faqs={getServiceFAQs(serviceSlug)} title={`Frequently Asked Questions`} />
        
        <CTA 
          titleOverride="Promote Your Business With Professional Branding" 
          paragraphOverride="Branded workwear and printed materials help your business look professional and increase visibility in everyday situations." 
          buttonOverride="Get A Free Quote"
        />
      </>
    );
  }

  return (
    <>
      <ServiceHero
        title={messaging.title}
        subtitle={messaging.subtitle}
        primaryCTA={{
          text: 'Get A Free Quote',
          href: '/contact',
        }}
      />
      
      <ProblemSection />
      <SolutionSection />
      <ProcessAuthority />
      <CaseStudySection serviceName={serviceName} caseStudies={displayStudies} />
      <LocalRelevanceSection town="Kent" />
      <InternalLinks 
        serviceSlug={serviceSlug} 
      />
      <KentCoverage pageType={serviceSlug} />
        <GrowthSystem currentService={serviceSlug} />
      <FAQ faqs={getServiceFAQs(serviceSlug)} title={`Frequently Asked Questions about ${serviceName}`} />
      
      {guides && guides.length > 0 && (
        <EducationalGuides guides={guides} headlineOverride={`Guides About ${serviceName}`} />
      )}

      <FinalCTA />
    </>
  );
}
