import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/queries/caseStudies';

interface CaseStudyHighlightProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyHighlight({ caseStudy }: CaseStudyHighlightProps) {
  const { title, summary, slug, results } = caseStudy;
  
  let parsedPayload: any = {};
  try {
    if (typeof results === 'string') {
      parsedPayload = JSON.parse(results);
    } else if (results && typeof results === 'object') {
      parsedPayload = results;
    }
  } catch (e) {
    // fallback
  }

  const town = parsedPayload.town || '';
  const industry = parsedPayload.industry || '';
  const services_used = parsedPayload.services_used || summary;
  const metrics = parsedPayload.resultsSummary || summary;

  // Format the heading (e.g., "Ashford Plumbing Business" or fallback to title)
  const heading = town && industry ? `${town} ${industry} Business` : title;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 transition-all duration-300 hover:border-brand-gold hover:shadow-[0_0_40px_rgba(214,173,103,0.15)] flex flex-col h-full group">
      
      {/* Meta Info */}
      <h3 className="text-xl font-bold text-white mb-2">
        {heading}
      </h3>
      
      {services_used && (
        <p className="text-sm text-neutral-400 mb-6 font-medium">
          {services_used}
        </p>
      )}

      {/* Main Metric or Result */}
      <div className="flex-1">
        <p className="text-brand-gold font-bold text-lg md:text-xl leading-tight mb-4">
          {metrics}
        </p>
      </div>

      {/* Call to Action */}
      <div className="pt-6 border-t border-neutral-800 mt-auto">
        <Link 
          href={`/case-studies/${slug}`}
          className="inline-flex items-center text-sm font-semibold text-white group-hover:text-brand-gold transition-colors"
        >
          View Case Study
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
