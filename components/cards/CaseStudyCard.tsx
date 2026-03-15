import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/queries';

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  let resultsObj: any = {};
  
  if (typeof caseStudy.results === 'string') {
    try {
      resultsObj = JSON.parse(caseStudy.results);
    } catch(e) {
      // Ignored
    }
  } else if (caseStudy.results && typeof caseStudy.results === 'object') {
    resultsObj = caseStudy.results;
  }

  const industry = resultsObj.industry || 'Local Business';
  const town = resultsObj.town || 'Kent';
  const servicesUsed = resultsObj.services_used || 'Digital Marketing';
  const headlineResult = resultsObj.resultsSummary || caseStudy.summary.substring(0, 100) + '...';

  return (
    <Link 
      href={`/case-studies/${caseStudy.slug}`}
      className="group flex flex-col h-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-brand-gold/50 hover:bg-neutral-900/90 transition-all duration-300 relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[100px] group-hover:bg-brand-gold/10 transition-colors"></div>
      
      <div className="p-8 flex flex-col h-full z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-black rounded-full text-xs font-semibold text-brand-gold border border-brand-gold/20">
              {industry}
            </span>
            <span className="px-3 py-1 bg-black rounded-full text-xs font-medium text-neutral-400 border border-neutral-800">
              {town}
            </span>
          </div>
          <div className="p-2 bg-black rounded-lg text-neutral-500 group-hover:text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors leading-tight">
          {caseStudy.title}
        </h3>
        
        <div className="mb-6">
          <p className="text-sm text-neutral-500 font-bold mb-1 uppercase tracking-wider">The Result</p>
          <p className="text-neutral-300 leading-relaxed font-medium">
            "{headlineResult}"
          </p>
        </div>
        
        <div className="mt-auto pt-6 border-t border-neutral-800">
          <p className="text-sm text-neutral-500 font-bold mb-1">Services Deployed</p>
          <p className="text-neutral-400 text-sm">
            {servicesUsed}
          </p>
        </div>
      </div>
    </Link>
  );
}
