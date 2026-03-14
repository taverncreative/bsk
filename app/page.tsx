import HomepageHero from '@/components/sections/HomepageHero';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import Services from '@/components/sections/Services';
import CaseStudySection from '@/components/sections/CaseStudySection';
import ProcessAuthority from '@/components/sections/ProcessAuthority';
import Authority from '@/components/sections/Authority';
import LocalAuthorityMap from '@/components/sections/LocalAuthorityMap';
import EducationalGuides from '@/components/sections/EducationalGuides';
import CTA from '@/components/sections/CTA';
import HeroReveal from '@/components/ui/HeroReveal';
import { Laptop, Search, MousePointerClick, Zap } from 'lucide-react';

import { getAllCaseStudies } from '@/lib/queries/caseStudies';
import { getAllGuides } from '@/lib/queries';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Marketing & SEO Agency in Kent | Business Sorted Kent',
  description: 'We design high performance websites, rank them on Google, and automate enquiries so your business keeps growing. Professional digital growth system for Kent businesses.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk',
  },
};

export default async function Home() {
  const [caseStudies, guides] = await Promise.all([
    getAllCaseStudies(),
    getAllGuides()
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Business Sorted Kent",
              "url": "https://businesssortedkent.co.uk",
              "logo": "https://businesssortedkent.co.uk/logo.png"
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Business Sorted Kent",
              "url": "https://businesssortedkent.co.uk",
              "areaServed": "Kent",
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Design"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Local SEO"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Business Automation"
                  }
                }
              ]
            }
          ])
        }}
      />
      <HomepageHero
        title={
          <>
            <HeroReveal delay={0.1}>Websites, SEO</HeroReveal>
            <HeroReveal delay={0.2}>and Automation</HeroReveal>
            <HeroReveal delay={0.3}>That Turn Kent Businesses</HeroReveal>
            <HeroReveal delay={0.4}>
              Into <span className="text-brand-gold">Lead Machines</span>.
            </HeroReveal>
          </>
        }
        subtitle="We help trades and small businesses across Kent look professional online, get found on Google, and turn website visitors into real enquiries."
        primaryCTA={{
          text: 'Get a Free Quote',
          href: '/contact',
        }}
        secondaryCTA={{
          text: 'View Our Work',
          href: '/case-studies',
        }}
      />
      
      {/* 1. Problem Section */}
      <ProblemSection 
        headlineOverride="Why Many Kent Businesses Struggle Online" 
        descriptionOverride="You might have a digital presence, but if it's suffering from poor visibility, an outdated structure, or disconnected systems, you're bleeding operational enquiries to your competitors. It's time to build a predictable lead generation engine."
      />

      {/* 2. Solution Section */}
      <SolutionSection 
        headlineOverride="We Build Complete Online Growth Systems"
        paragraphOverride="A successful online presence is more than just a website. It requires visibility, conversion strategy and systems that support your business as it grows."
        solutions={[
          { title: "Website Design", description: "Professional, modern websites that build trust and showcase your services.", icon: Laptop },
          { title: "SEO & Google Visibility", description: "Optimised pages and local SEO that help your business appear in relevant searches.", icon: Search },
          { title: "Lead Capture", description: "Clear calls to action and structured pages designed to convert visitors into enquiries.", icon: MousePointerClick },
          { title: "Business Automation", description: "Systems that organise enquiries, follow-ups and processes automatically.", icon: Zap },
        ]}
      />

      {/* 3. Services Section */}
      <Services />

      {/* 4. Results Section */}
      <CaseStudySection caseStudies={caseStudies} />

      {/* 5. Process Section */}
      <ProcessAuthority />

      {/* 6. Authority Section */}
      <Authority />

      {/* 7. Kent Coverage Section */}
      <LocalAuthorityMap />

      {/* 8. Guides Section */}
      <EducationalGuides guides={guides} headlineOverride="Guides To Help Your Business Grow" />

      {/* 9. Final Conversion Section */}
      <CTA titleOverride="Ready To Grow Your Business Online?" paragraphOverride="Whether you need a new website, stronger Google visibility, or systems that save you time, we can help." />
    </>
  );
}
