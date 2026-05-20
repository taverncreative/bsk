import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// The guide definition expected for the layout
interface GuideData {
  title: string;
  slug: string;
  excerpt?: string | null;
  description?: string | null;
}

interface GuideCardProps {
  guide: GuideData;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="bg-paper-raised border border-paper-border rounded-xl p-6 transition-all duration-300 hover:border-brand-gold hover:shadow-[0_0_40px_rgba(214,173,103,0.15)] flex flex-col h-full group">

      <h3 className="text-xl font-bold text-ink mb-4">
        {guide.title}
      </h3>

      <p className="text-ink-muted mb-6 flex-1 text-sm md:text-base leading-relaxed">
        {guide.excerpt || guide.description}
      </p>

      {/* Call to Action */}
      <div className="pt-6 border-t border-paper-border mt-auto">
        <Link
          href={`/guides/${guide.slug}`}
          className="inline-flex items-center text-sm font-semibold text-ink group-hover:text-brand-gold transition-colors"
        >
          Read guide
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
