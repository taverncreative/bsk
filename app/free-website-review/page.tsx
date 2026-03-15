import type { Metadata } from 'next';
import WebsiteReviewTool from '@/components/forms/WebsiteReviewTool';

export const metadata: Metadata = {
  title: 'Free Website Performance & SEO Review | Business Sorted Kent',
  description: 'Request a free, no-obligation technical review of your existing website. We analyze performance, local SEO visibility, and conversion barriers for businesses in Kent.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/free-website-review',
  },
};

export default function FreeWebsiteReviewPage() {
  return (
    <main className="min-h-screen bg-black pt-32 lg:pt-48 pb-24 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="text-left mt-4 lg:mt-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Is Your Website Losing You Money?
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 mb-8 leading-relaxed">
              Find out exactly why your website isn't generating local enquiries. Request a free, rapid technical diagnostic of your digital presence today.
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold mt-1 mr-4 font-bold shadow-md">
                  1
                </div>
                <p className="text-lg text-neutral-300 leading-relaxed font-medium pt-1">Identify critical slow-loading pages costing you Google rankings.</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold mt-1 mr-4 font-bold shadow-md">
                  2
                </div>
                <p className="text-lg text-neutral-300 leading-relaxed font-medium pt-1">Discover severe gaps in your localized SEO structure.</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold mt-1 mr-4 font-bold shadow-md">
                  3
                </div>
                <p className="text-lg text-neutral-300 leading-relaxed font-medium pt-1">Uncover major conversion barriers stopping users from getting in touch.</p>
              </li>
            </ul>

            <div className="mt-12 p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
              <p className="text-white font-bold mb-2">100% Free & Secure</p>
              <p className="text-neutral-400 text-sm">
                No credit card required. Our team safely scans your public website data to generate your personalized report.
              </p>
            </div>
          </div>

          <div className="w-full">
             <WebsiteReviewTool />
          </div>

        </div>
      </div>
    </main>
  );
}
