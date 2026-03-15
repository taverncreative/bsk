import Link from 'next/link';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import NearbyAreas from '@/components/sections/NearbyAreas';
import SolutionSection from '@/components/sections/SolutionSection';
import CTA from '@/components/sections/CTA';
import Authority from '@/components/sections/Authority';
import ProcessAuthority from '@/components/sections/ProcessAuthority';
import ProblemSection from '@/components/sections/ProblemSection';
import ParentLinks from '@/components/seo/ParentLinks';
import InternalLinks from '@/components/seo/InternalLinks';
import GoogleReviews from '@/components/sections/GoogleReviews';

interface IndustryLocationPageProps {
  industry: { name: string; slug: string; prefix: string };
  service: { name: string; slug: string };
  town: { name: string; slug: string; latitude?: number | null; longitude?: number | null };
  nearbyTowns?: { name: string; slug: string }[];
}

export default function IndustryLocationPage({ industry, service, town, nearbyTowns }: IndustryLocationPageProps) {
  const seed = town.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + industry.name.length;

  const introPatterns = [
    `For ${industry.name.toLowerCase()} in ${town.name}, maintaining a powerful online presence is no longer optional. With more local customers turning to Google to find reliable services, businesses without a modern digital footprint are actively losing out to competitors.`,
    `When customers in ${town.name} need ${industry.name.toLowerCase()}, they begin their search online. A professional digital presence ensures your business is the one they see, trust, and ultimately contact.`,
    `The competition among ${industry.name.toLowerCase()} in ${town.name} is fierce. To stand out and consistently capture high-value local jobs, your business needs an optimized online presence that actively drives enquiries.`,
    `A strong digital footprint is the lifeblood of modern ${industry.name.toLowerCase()} in ${town.name}. Being visible online when local homeowners and businesses search for your services is the difference between stagnation and scalable growth.`,
    `Growth for ${industry.name.toLowerCase()} operating in ${town.name} depends heavily on lead flow consistency. Partnering with a specialized agency helps construct an automated framework that consistently attracts the highest intent local traffic.`
  ];
  const selectedIntro = introPatterns[seed % 5];

  const subtitles = [
    `We build highly profitable digital ecosystems for ${industry.name.toLowerCase()} across ${town.name}, helping you generate consistent, high-quality local leads.`,
    `Delivering robust ${service.name.toLowerCase()} architecture customized directly for the ${industry.name.toLowerCase()} sector in ${town.name}.`,
    `Partner with specialists who understand the demands of ${industry.name.toLowerCase()} and the local ${town.name} market perfectly.`
  ];
  const selectedSubtitle = subtitles[(seed + 1) % subtitles.length];

  const ctaVariations = [
    "Get A Free Quote",
    "Request A Website Review",
    "Book An Automation Consultation",
    "Start Enhancing Your Growth"
  ];
  const selectedCta = ctaVariations[(seed + 2) % ctaVariations.length];

  const painPointThemes = [
    { title: "Lost to Local Competitors", pain_point: `Customers in ${town.name} are choosing competitors simply because they rank higher on Google Maps and search results.` },
    { title: "Price Shopper Comparisons", pain_point: `Without a high-end website, potential clients compare your quotes based purely on price rather than perceived quality and reliability.` },
    { title: "Inconsistent Enquiries", pain_point: `Relying solely on word-of-mouth creates unpredictable revenue and makes it difficult to plan for growth.` },
    { title: "Wasted Advertising Spend", pain_point: `Paying for directory listings that generate low-quality leads rather than owning your proprietary lead generation asset.` },
    { title: "Time Consuming Admin", pain_point: `Missing calls or taking too long to reply to emails means lost jobs in the fast-paced ${town.name} market.` }
  ];
  // Select 3 pain points by rotating
  const selectedPainPoints = [
    painPointThemes[seed % 5],
    painPointThemes[(seed + 1) % 5],
    painPointThemes[(seed + 2) % 5]
  ];

  const genericServiceNames: Record<string, string> = {
    'web-design': 'professional web design',
    'seo': 'targeted local SEO',
    'lead-capture': 'automated lead capture systems',
    'business-automation': 'business automation workflows'
  };
  const serviceTerm = genericServiceNames[service.slug] || service.name;

  return (
    <>
      {/* 1. HERO SECTION */}
      <LocalServiceHero
        title={<>{service.name} for {industry.name} in {town.name}</>}
        subtitle={selectedSubtitle}
        primaryCTA={{
          text: 'Get A Free Quote',
          href: '/contact',
        }}
      />
      
      <ParentLinks service={{name: industry.name, slug: `industries/${industry.slug}`}} town={town} />

      {/* 2. INTRODUCTION */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-900">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
            Digital Growth for {industry.name}
          </h2>
          <div className="prose prose-invert prose-lg mx-auto text-neutral-400">
            <p className="leading-relaxed">
              {selectedIntro}
            </p>
          </div>
        </div>
      </section>

      {/* 3. CHALLENGES FOR {INDUSTRY} */}
      <ProblemSection 
        headlineOverride={`Challenges for ${industry.name} in ${town.name}`}
        painPoints={selectedPainPoints} 
      />

      {/* 4. HOW SERVICE HELPS */}
      <SolutionSection 
        headlineOverride={`How ${service.name} Helps ${industry.name}`}
        paragraphOverride={`Implementing ${serviceTerm} dramatically improves your visibility across ${town.name}. We construct systems that intercept local search intent, present your business as the premium choice, and seamlessly convert that traffic into qualified enquiries.`}
        townName={town.name} 
      />

      {/* 5. OUR PROCESS */}
      <ProcessAuthority 
        headlineOverride="Our Process"
        descriptionOverride={`We deploy specialized strategies engineered specifically for ${industry.name.toLowerCase()} to capture market share securely.`}
      />

      {/* 6. WHY CHOOSE BUSINESS SORTED KENT */}
      <section className="py-24 bg-black border-y border-neutral-900">
        <div className="container mx-auto px-4 max-w-4xl text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
            Kent's Trusted Digital Agency
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
            We have extensive experience supporting service businesses and trades across {town.name}. Rather than delivering generic websites, we act as your local technology partner—building the digital infrastructure required to accelerate revenue and streamline your operations securely.
          </p>
        </div>
        <Authority />
      </section>

      {/* 7. NEARBY AREAS */}
      {nearbyTowns && <NearbyAreas townName={town.name} nearbyTowns={nearbyTowns} />}

      {/* 8. INTERNAL LINKS MANUALLY TO FULFILL REQUIREMENT */}
      <section className="py-16 bg-neutral-950 text-center border-t border-neutral-900">
        <div className="container mx-auto px-4">
           <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
             <Link href={`/${service.slug}`} className="text-neutral-500 hover:text-brand-gold">{service.name} Services</Link>
             <Link href={`/${town.slug}`} className="text-neutral-500 hover:text-brand-gold">{town.name} Digital Marketing</Link>
             <Link href={`/industries/${industry.slug}`} className="text-neutral-500 hover:text-brand-gold">Digital Marketing for {industry.name}</Link>
           </div>
        </div>
      </section>

      {/* 9. CTA */}
      <GoogleReviews compact={true} />
      <CTA 
        titleOverride={`Grow Your ${industry.name} Business in ${town.name}`}
        paragraphOverride={`Stop losing critical local visibility to competitors. Let us build a scalable digital asset that drives daily enquiries for your business.`}
        buttonOverride={selectedCta}
      />
    </>
  );
}
