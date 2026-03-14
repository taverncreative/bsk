import type { Metadata } from 'next';
import { getAllCaseStudies } from '@/lib/queries';
import CaseStudyHighlight from '@/components/cards/CaseStudyHighlight';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'SEO & Web Design Case Studies | Business Sorted Kent',
  description: 'Read our latest case studies to see how we help businesses in Kent generate more leads, rank higher on Google, and automate their growth.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/case-studies',
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <main className="min-h-screen bg-black pt-40 text-white">
      <div className="container mx-auto px-4 text-center max-w-4xl py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
          Proven Results for Kent Businesses
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed mb-16">
          We design campaigns based on transparency, data, and commercial ROI. Explore our recent success stories showing how our systems increase structural lead generation.
        </p>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <CaseStudyHighlight key={study.id || study.slug} caseStudy={study} />
          ))}
        </div>
      </div>
      <CTA />
    </main>
  );
}
