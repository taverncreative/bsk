import Link from 'next/link';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import Button from '@/components/ui/Button';
import Contact from '@/components/sections/Contact';
import EducationalGuides from '@/components/sections/EducationalGuides';
import KentCoverage from '@/components/sections/KentCoverage';

interface BaseEntity {
  name: string;
  slug: string;
}

interface TownPageProps {
  town: BaseEntity;
  services: BaseEntity[];
  guides?: any[];
}

export default function TownPage({ town, services, guides }: TownPageProps) {
  const seed = town.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const subtitles = [
    `Helping businesses across ${town.name} generate leads with web design, SEO and automation.`,
    `Delivering professional digital systems to help companies in ${town.name} scale securely.`,
    `Local SEO and lead capture infrastructure engineered for the ${town.name} market.`,
    `Comprehensive digital growth strategies designed exclusively for businesses operating in ${town.name}.`
  ];

  const p1Variations = [
    `${town.name} has a thriving local economy with intense competition across key sectors like trades, professional services, and retail. As more consumers shift to searching online, ${town.name} businesses that lack a fast, optimized digital presence are actively losing market share to competitors who rank higher on Google.`,
    `The business community in ${town.name} is evolving rapidly. Traditional marketing methods are proving less effective as local consumers rely almost entirely on search engines to find services. Adapting to this shift is essential for survival.`,
    `Operating a business in ${town.name} means facing strict local competition. Companies that invest in high-performance digital infrastructure consistently outmanoeuvre those relying on outdated platforms or simple word-of-mouth.`,
    `As ${town.name} expands, so does the commercial landscape. Establishing a dominant online footprint is no longer optional; it's a fundamental requirement to capture the steady stream of local search traffic.`,
  ];

  const p2Variations = [
    `We analyze local search trends specifically in ${town.name} to ensure our clients don't just get a website—they get an active lead generation asset that captures localized search volume securely.`,
    `Our approach bypasses generic design. We engineer systematic lead capture frameworks directly tailored directly to the specific demographics and search behaviors of ${town.name} residents.`,
    `By tracking precisely how people in ${town.name} look for services, we build digital assets that intersect those high-intent searches automatically and convert them to secure enquiries.`,
    `We treat web presence as a mathematical engine. Our focus is ensuring your ${town.name} business ranks precisely when potential customers need you the most.`
  ];

  const ctaVariations = [
    "Get A Free Quote",
    "Request A Website Review",
    "Book An Automation Consultation",
    "Start Enhancing Your Growth"
  ];

  return (
    <>
      {/* SECTION 1: HERO */}
      <LocalServiceHero
        title={`Digital Growth Services for ${town.name} Businesses`}
        subtitle={subtitles[seed % subtitles.length]}
        primaryCTA={{
          text: 'Get A Free Quote',
          href: '/contact',
        }}
      />

      {/* SECTION 2: HOW WE HELP */}
      <section className="py-24 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Services Available in {town.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}-${town.slug}`}
                className="group flex flex-col p-8 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-gold hover:shadow-[0_0_40px_rgba(214,173,103,0.15)] transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">
                  {service.name} in {town.name}
                </h3>
                <div className="mt-auto pt-4 flex items-center text-neutral-400 font-medium group-hover:text-brand-gold transition-colors">
                  Learn more
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2.5: BUSINESS LANDSCAPE KNOWLEDGE GRAPH */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-black mb-6">
                The Business Landscape in {town.name}
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                {p1Variations[(seed + 1) % p1Variations.length]}
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                {p2Variations[(seed + 2) % p2Variations.length]}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-black mb-6">
                Digital Opportunities for {town.name} SMEs
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                The majority of local businesses in the area suffer from slow website speeds, non-existent technical SEO, and manual lead handling. This creates a massive opportunity for forward-thinking {town.name} companies.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 rounded-full bg-brand-gold mr-3 shrink-0"></span>
                  <p className="text-neutral-700"><strong className="text-black">Local Map Pack Dominance:</strong> Optimizing your Google Business Profile to capture immediate "near me" searches.</p>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 rounded-full bg-brand-gold mr-3 shrink-0"></span>
                  <p className="text-neutral-700"><strong className="text-black">Automated Follow-ups:</strong> Installing CRM bridges that automatically respond to {town.name} leads while your competitors take days to reply.</p>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 rounded-full bg-brand-gold mr-3 shrink-0"></span>
                  <p className="text-neutral-700"><strong className="text-black">High-Conversion Architecture:</strong> Replacing templated brochure sites with fast, structured funnels.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INDUSTRIES */}
      <section className="py-24 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Businesses We Work With
            </h2>
            <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
              We proudly partner with a diverse range of local companies across {town.name}, building bespoke digital systems that drive tangible results and automate daily operations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Trades', 'Professional Services', 'Retail', 'Hospitality'].map((industry) => (
              <div 
                key={industry}
                className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl text-center shadow-sm"
              >
                <span className="font-bold text-white">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3.5: CONTACT FORM */}
      <Contact />

      <KentCoverage pageType={town.slug} />

      {guides && guides.length > 0 && (
         <EducationalGuides guides={guides} headlineOverride={`Growth Guides for ${town.name} Businesses`} />
      )}

      {/* SECTION 4: FINAL CTA */}
      <section className="section-dark py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
            Ready to Grow Your Business in {town.name}?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            Stop losing local leads to your competitors. Let's get started today.
          </p>
          <div className="flex justify-center">
            <Button href="#quote" className="text-lg px-10 py-4 shadow-lg">
              {ctaVariations[(seed + 3) % ctaVariations.length]}
            </Button>
          </div>
        </div>
      </section>
      
      {/* SECTION 3.6: NEARBY AREAS */}
      <section className="py-20 bg-neutral-950 border-t border-neutral-900">
         <div className="container mx-auto px-4 max-w-4xl text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Also Serving Businesses Near {town.name}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Ashford', 'Maidstone', 'Folkestone', 'Canterbury', 'Tunbridge Wells'].filter(t => t !== town.name).map(t => (
                 <Link key={t} href={`/towns/${t.toLowerCase().replace(' ', '-')}`} className="text-neutral-400 hover:text-brand-gold transition-colors">
                   {t}
                 </Link>
              ))}
            </div>
            <div className="mt-8">
               <Link href="/case-studies" className="text-brand-gold font-bold hover:underline">View our Kent Case Studies</Link>
               <span className="mx-4 text-neutral-600">|</span>
               <Link href="/guides" className="text-brand-gold font-bold hover:underline">Read our Digital Growth Guides</Link>
            </div>
         </div>
      </section>
    </>
  );
}
