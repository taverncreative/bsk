import HomepageHero from '@/components/sections/HomepageHero';
import WhatYouGet from '@/components/sections/WhatYouGet';
import Concerns from '@/components/sections/Concerns';
import HomepageProof from '@/components/sections/HomepageProof';
import CaseStudySection from '@/components/sections/CaseStudySection';
import CTA from '@/components/sections/CTA';

import { getAllCaseStudies } from '@/lib/queries/caseStudies';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Design, SEO & Automations | Business Sorted Kent',
  description:
    'Websites, SEO and automations for Kent businesses. Mobile-first builds with rigorous checks for speed, security and SEO, by SEO experts and graphic designers.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk',
  },
};

export default async function Home() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <HomepageHero />
      <WhatYouGet />
      <Concerns />
      <HomepageProof caseStudies={caseStudies} />
      <CaseStudySection caseStudies={caseStudies} variant="spotlight" />
      <CTA />
    </>
  );
}
