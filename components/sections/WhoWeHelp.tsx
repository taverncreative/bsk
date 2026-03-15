import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import CTA from '@/components/sections/CTA';

export default function WhoWeHelp() {
  const industries = [
    {
      name: 'Electricians',
      slug: 'electricians',
      description: 'Helping electricians generate more enquiries through professional websites and stronger visibility on Google.'
    },
    {
      name: 'Plumbers',
      slug: 'plumbers',
      description: 'Supporting plumbing businesses with websites and systems designed to attract local customers.'
    },
    {
      name: 'Builders',
      slug: 'builders',
      description: 'Helping builders present their work professionally and compete effectively online.'
    },
    {
      name: 'Roofers',
      slug: 'roofers',
      description: 'Improving visibility and enquiry generation for roofing companies across Kent.'
    },
    {
      name: 'Landscapers',
      slug: 'landscapers',
      description: 'Helping landscaping businesses showcase projects and attract local enquiries.'
    },
    {
      name: 'Carpenters',
      slug: 'carpenters',
      description: 'Supporting carpentry businesses with clear websites and better search visibility.'
    },
    {
      name: 'Cleaning Companies',
      slug: 'cleaning-companies',
      description: 'Helping cleaning businesses generate consistent enquiries and manage bookings.'
    },
    {
      name: 'Removal Companies',
      slug: 'removal-companies',
      description: 'Helping removal companies improve their online presence and attract local customers.'
    }
  ];

  return (
    <>
      <section className="bg-black border-y border-neutral-900 py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              Helping Local Businesses Across Kent Grow Online
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-medium">
              Business Sorted Kent works with tradespeople, service providers and small businesses across Kent to improve their online presence, attract more enquiries and streamline operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {industries.map((ind) => (
              <Link 
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-brand-gold/50 hover:bg-neutral-900/90 transition-all duration-300 relative h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors leading-tight">
                    {ind.name}
                  </h3>
                  <div className="p-2 bg-black rounded-lg text-neutral-500 group-hover:text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                
                <p className="text-neutral-400 font-medium leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {ind.description}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <CTA 
        titleOverride="Not Sure If We Work With Your Industry?"
        paragraphOverride="We support a wide range of service businesses across Kent."
        buttonOverride="Get A Free Quote"
      />
    </>
  );
}
