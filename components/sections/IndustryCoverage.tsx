import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';
import { getAllIndustries } from '@/lib/queries';

export default async function IndustryCoverage() {
  const industries = await getAllIndustries();

  if (!industries || industries.length === 0) return null;

  return (
    <section className="py-28 bg-black border-t border-neutral-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Helping Kent Businesses Across Key Industries
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              We work with businesses across multiple sectors in Kent, building websites, SEO strategies, and automation systems that generate consistent enquiries.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <Reveal key={industry.id} delay={index * 0.05}>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 transition-all duration-300 hover:border-brand-gold hover:shadow-[0_0_40px_rgba(214,173,103,0.15)] flex flex-col h-full group">
                <h3 className="text-xl font-bold text-white mb-3">
                  {industry.name}
                </h3>
                <p className="text-sm text-neutral-400 mb-6 flex-1">
                  Websites, SEO, and automation designed for {industry.name.toLowerCase()} businesses across Kent.
                </p>
                <div className="pt-4 border-t border-neutral-800 mt-auto">
                  <Link 
                    href={`/industries/${industry.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-white group-hover:text-brand-gold transition-colors"
                  >
                    SEO for {industry.name}
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
