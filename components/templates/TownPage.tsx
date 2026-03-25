import Link from 'next/link';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import Button from '@/components/ui/Button';
import Contact from '@/components/sections/Contact';
import EducationalGuides from '@/components/sections/EducationalGuides';
import KentCoverage from '@/components/sections/KentCoverage';
import Reveal from '@/components/ui/Reveal';

interface BaseEntity {
  name: string;
  slug: string;
}

interface TownContentRecord {
  service_slug: string;
  intro_paragraph: string;
  local_context: string;
  competition_landscape: string | null;
  success_approach: string | null;
  pain_points: Array<{ title: string; description: string }>;
  solutions: Array<{ title: string; description: string }>;
}

interface TownPageProps {
  town: BaseEntity;
  services: BaseEntity[];
  guides?: any[];
  townContent?: TownContentRecord[];
}

export default function TownPage({ town, services, guides, townContent = [] }: TownPageProps) {
  const hasContent = townContent.length > 0;

  // Pick different service records for different sections to maximize uniqueness
  const webDesignContent = townContent.find(c => c.service_slug === 'web-design');
  const seoContent = townContent.find(c => c.service_slug === 'seo');
  const automationContent = townContent.find(c => c.service_slug === 'business-automation');
  const leadCaptureContent = townContent.find(c => c.service_slug === 'lead-capture');
  const aiContent = townContent.find(c => c.service_slug === 'ai-chatbots');

  // Use real local context from the database, pulling from different service records
  const heroSubtitle = hasContent && seoContent
    ? seoContent.intro_paragraph
    : `Professional web design, SEO and automation services for businesses in ${town.name}, Kent.`;

  const landscapeParagraph = hasContent && webDesignContent
    ? webDesignContent.local_context
    : `${town.name} has a growing business community with strong demand for professional digital services.`;

  const approachParagraph = hasContent && webDesignContent
    ? webDesignContent.success_approach || webDesignContent.intro_paragraph
    : `We tailor our approach to the specific needs and search patterns of ${town.name} businesses.`;

  const competitionParagraph = hasContent && seoContent
    ? seoContent.competition_landscape || seoContent.intro_paragraph
    : `Understanding the local competitive landscape helps us position your business effectively in ${town.name}.`;

  // Collect unique pain points and solutions from different services
  const featuredChallenges = hasContent
    ? [
        ...(seoContent?.pain_points?.slice(0, 1) || []),
        ...(leadCaptureContent?.pain_points?.slice(0, 1) || []),
        ...(automationContent?.pain_points?.slice(0, 1) || []),
      ].slice(0, 3)
    : [];

  const featuredSolutions = hasContent
    ? [
        ...(webDesignContent?.solutions?.slice(0, 1) || []),
        ...(seoContent?.solutions?.slice(0, 1) || []),
        ...(aiContent?.solutions?.slice(0, 1) || []),
      ].slice(0, 3)
    : [];

  return (
    <>
      {/* HERO */}
      <LocalServiceHero
        title={`Digital Growth Services for ${town.name} Businesses`}
        subtitle={heroSubtitle}
        primaryCTA={{
          text: 'Get A Free Quote',
          href: '/contact',
        }}
      />

      {/* SERVICES GRID */}
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
                {/* Pull a unique snippet from the matching local_content record */}
                {hasContent && (() => {
                  const match = townContent.find(c => c.service_slug === service.slug);
                  if (match) {
                    return (
                      <p className="text-sm text-neutral-400 mt-2 line-clamp-2">
                        {match.intro_paragraph.slice(0, 120)}...
                      </p>
                    );
                  }
                  return null;
                })()}
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

      {/* BUSINESS LANDSCAPE — unique per town from database */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <h2 className="text-3xl font-extrabold text-black mb-6">
                  The Business Landscape in {town.name}
                </h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  {landscapeParagraph}
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {approachParagraph}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <h2 className="text-3xl font-extrabold text-black mb-6">
                  {hasContent ? `What ${town.name} Businesses Are Up Against` : `Digital Opportunities for ${town.name} SMEs`}
                </h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                  {competitionParagraph}
                </p>
                {featuredChallenges.length > 0 ? (
                  <ul className="space-y-4">
                    {featuredChallenges.map((challenge, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-2 h-2 mt-2 rounded-full bg-brand-gold mr-3 shrink-0"></span>
                        <p className="text-neutral-700"><strong className="text-black">{challenge.title}:</strong> {challenge.description}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 rounded-full bg-brand-gold mr-3 shrink-0"></span>
                      <p className="text-neutral-700"><strong className="text-black">Local Search Visibility:</strong> Ensuring your business appears when {town.name} residents search for your services.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 rounded-full bg-brand-gold mr-3 shrink-0"></span>
                      <p className="text-neutral-700"><strong className="text-black">Lead Response Speed:</strong> Responding to enquiries faster than competitors in {town.name}.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 mt-2 rounded-full bg-brand-gold mr-3 shrink-0"></span>
                      <p className="text-neutral-700"><strong className="text-black">Professional Online Presence:</strong> Representing your business with a website that converts visitors into customers.</p>
                    </li>
                  </ul>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SOLUTIONS — unique per town from database */}
      {featuredSolutions.length > 0 && (
        <section className="py-24 bg-white border-t border-neutral-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <Reveal>
              <h2 className="text-3xl font-extrabold text-black mb-12 text-center">
                How We Help {town.name} Businesses Grow
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredSolutions.map((sol, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl">
                    <h3 className="text-lg font-bold text-black mb-3">{sol.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{sol.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INDUSTRIES */}
      <section className="py-24 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Businesses We Work With in {town.name}
            </h2>
            <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
              We partner with local companies across {town.name}, building bespoke digital systems that drive tangible results.
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

      {/* CONTACT FORM */}
      <Contact />

      <KentCoverage pageType={town.slug} />

      {guides && guides.length > 0 && (
        <EducationalGuides guides={guides} headlineOverride={`Growth Guides for ${town.name} Businesses`} />
      )}

      {/* FINAL CTA */}
      <section className="section-dark py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
            Ready to Grow Your Business in {town.name}?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            Stop losing local leads to your competitors. Let&apos;s get started today.
          </p>
          <div className="flex justify-center">
            <Button href="/contact" className="text-lg px-10 py-4 shadow-lg">
              Get A Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* NEARBY AREAS */}
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
