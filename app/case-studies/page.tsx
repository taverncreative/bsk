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
        {caseStudies.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Case Studies Updating</h3>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              We are currently compiling comprehensive documentation of our latest client success stories. Detailed examples of our web design, SEO, and automation implementations will be published here as soon as we finish collating the performance data.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <CaseStudyHighlight key={study.id || study.slug} caseStudy={study} />
            ))}
          </div>
        )}
      </div>
      <CTA />
    </main>
  );
}
