import HomepageHero from '@/components/sections/HomepageHero';
import FreePreview from '@/components/sections/FreePreview';
import WhatYouGet from '@/components/sections/WhatYouGet';
import Services from '@/components/sections/Services';
import Concerns from '@/components/sections/Concerns';
import HomepageProof from '@/components/sections/HomepageProof';
import CaseStudySection from '@/components/sections/CaseStudySection';
import CTA from '@/components/sections/CTA';

import { getAllCaseStudies } from '@/lib/queries/caseStudies';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Design, SEO & Automations | Business Sorted Kent',
  description:
    '£280 websites, £45/hour SEO, £15/month hosting. AI made it faster, we passed the saving on. SEO experts, graphic designers, mobile-first builds.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk',
  },
};

export default async function Home() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <HomepageHero />
      <FreePreview />
      <WhatYouGet />
      <Services />
      <Concerns />
      <HomepageProof caseStudies={caseStudies} />
      <CaseStudySection caseStudies={caseStudies} variant="spotlight" />
      <CTA />
    </>
  );
}
