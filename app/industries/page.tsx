import type { Metadata } from 'next';
import Link from 'next/link';
import IndustryCoverage from '@/components/sections/IndustryCoverage';
import CTA from '@/components/sections/CTA';
import KentCoverage from '@/components/sections/KentCoverage';

export const metadata: Metadata = {
  title: 'Industries We Serve | Business Sorted Kent',
  description: 'Tailored digital growth strategies, web design, and SEO tailored specifically for trades, service businesses, and professionals across Kent.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/industries',
  },
};

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-black pt-32 lg:pt-40 text-neutral-300">
      
      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-4 text-center max-w-4xl py-12 lg:py-20">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8">
          Specialist Digital Growth for Kent Businesses
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-3xl mx-auto">
          Business Sorted Kent supports tradespeople, service providers, and small to medium-sized enterprises across the county. We build robust digital infrastructure explicitly designed to secure your local market share.
        </p>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="container mx-auto px-4 max-w-5xl py-16 border-t border-neutral-900">
        <div className="prose prose-invert prose-lg md:prose-xl mx-auto text-neutral-300">
          <p>
            Operating a service-based business in Kent requires far more than simply relying on traditional word-of-mouth referalls. Whether you are an established electrical contractor in Sevenoaks, a growing landscaping firm in Maidstone, or a newly launched cleaning company in Ashford, the reality of the modern commercial landscape is clear: your customers are actively searching for your services online. If your digital presence fails to instantly communicate trust, authority, and reliability, those potential clients will inevitably choose your competitors.
          </p>
          <p>
            At Business Sorted Kent, we do not believe in generic, one-size-fits-all web design. A template built for an eCommerce store fundamentally fails when applied to a local plumbing business. Service providers require entirely different psychological triggers, specialized local SEO architectures, and rapid, frictionless enquiry systems designed specifically to intercept local consumers at the precise moment they require emergency assistance or highly structural quotes.
          </p>
          <p>
            Our industry-specific campaigns are meticulously mapped out. We analyze exactly what homeowners in Kent type into Google when their boiler breaks, or what a local project manager searches for when they require commercial carpentry. By embedding this precise localization and demographic research directly into our coding, we ensure that the businesses we partner with actively dominate their surrounding service radiuses. We build digital assets that do not just look visually stunning, but operate as mathematical engines—converting high-intent local traffic into secure, high-value, predictable revenue streams.
          </p>
        </div>
      </section>

      {/* 3. INDUSTRY DIRECTORY COMPONENT */}
      <IndustryCoverage />

      {/* 4. WHY SERVICE BUSINESSES NEED STRONG WEBSITES */}
      <section className="bg-neutral-950 py-24 border-y border-neutral-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">
            Why Service Businesses Need Strong Websites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg leading-relaxed text-neutral-400">
              <p>
                The days of homeowners flipping through physical directories or blindly trusting a flyer pinned to a local noticeboard have vanished. In today’s hyper-connected environment, the immediate reaction to any problem—whether it is a leaking roof, a garden requiring major landscaping, or the need for a total property renovation—is to pull out a smartphone and type "experts near me" into Google. 
              </p>
              <p>
                When property owners make that search, they are not just looking for contact information; they are looking for validation. They are actively judging the competence of your business based entirely on the structural quality of your website. If your site takes too long to load, fails to display correctly on a mobile device, or looks as though it was built a decade ago, you lose that customer instantly. 
              </p>
              <p>
                A strong website operates as your most reliable, 24-hour employee. For <Link href="/industries/electricians" className="text-brand-gold hover:underline">Electricians</Link>, <Link href="/industries/plumbers" className="text-brand-gold hover:underline">Plumbers</Link>, and <Link href="/industries/builders" className="text-brand-gold hover:underline">Builders</Link>, passing this initial digital visual test is the gateway to securing high-budget projects. A professionally engineered site bypasses the immediate skepticism of new clients, answering their standard questions automatically and funneling them smoothly toward a high-conversion quote form.
              </p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">The Trust Deficit</h3>
              <p className="text-neutral-400 mb-6">
                Consumers inherently fear hiring unreliable trades. The primary function of your website is not just to display a phone number, but to categorically prove your legitimacy before they even speak to you. We achieve this by structuring the psychology of your pages properly: placing verified reviews, accreditations, and high-quality galleries of previous work above the fold.
              </p>
              <h3 className="text-xl font-bold text-white mb-4">The Penalty of Invisibility</h3>
              <p className="text-neutral-400">
                You might be the most skilled <Link href="/industries/carpenters" className="text-brand-gold hover:underline">Carpenter</Link> or <Link href="/industries/painters-and-decorators" className="text-brand-gold hover:underline">Decorator</Link> in Kent, but skill is irrelevant if nobody knows you exist. A site built correctly on Next.js with localized schema markup signals to search engines exactly who you are and where you serve, permanently solving the visibility gap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMMON MARKETING CHALLENGES FOR TRADES */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            Common Marketing Challenges for Trades
          </h2>
          
          <div className="space-y-16">
            <div className="border-l-4 border-brand-gold pl-6 md:pl-10">
              <h3 className="text-2xl font-bold text-white mb-4">1. The "Directory Trap"</h3>
              <p className="text-lg text-neutral-400 leading-relaxed mb-4">
                Countless <Link href="/industries/roofers" className="text-brand-gold hover:underline">Roofers</Link>, <Link href="/industries/driveway-installers" className="text-brand-gold hover:underline">Driveway Installers</Link> and <Link href="/industries/cleaning-companies" className="text-brand-gold hover:underline">Cleaning Companies</Link> fall into the directory trap. They pay exorbitant recurring fees to external lead generation portals such as Checkatrade, Bark or MyBuilder. The fatal flaw with these systems is that the platform inherently commoditizes your service. 
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
                When a customer requests a quote through these portals, their details are immediately sold to you alongside five other local competitors. It instantly triggers a race to the bottom based purely on pricing. You are no longer competing on the quality of your finish or your excellent customer service; you are forced to slash your margins just to win the bid. Owning your own highly-ranked website completely nullifies this trap. When a lead comes directly through your business domain, it is entirely exclusive to you.
              </p>
            </div>

            <div className="border-l-4 border-brand-gold pl-6 md:pl-10">
              <h3 className="text-2xl font-bold text-white mb-4">2. The "Feast and Famine" Cycle</h3>
              <p className="text-lg text-neutral-400 leading-relaxed mb-4">
                Service businesses inherently suffer from operational bottlenecks. When you are busy completing physical installations for <Link href="/industries/garden-services" className="text-brand-gold hover:underline">Garden Services</Link> or executing massive moves for <Link href="/industries/removal-companies" className="text-brand-gold hover:underline">Removal Companies</Link>, you physically do not have the time to market your business. When the current slate of jobs finishes, you suddenly have an empty diary and must scramble to find immediate work.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
                This rapid fluctuation causes immense financial stress. A well-optimized digital ecosystem runs perpetually in the background. Good Local SEO does not stop working because you are on a site. It passively gathers data, collects enquiries, and routes them to your CRM safely so that you consistently have a healthy pipeline of future work.
              </p>
            </div>

            <div className="border-l-4 border-brand-gold pl-6 md:pl-10">
              <h3 className="text-2xl font-bold text-white mb-4">3. Administrative Overload</h3>
              <p className="text-lg text-neutral-400 leading-relaxed mb-4">
                Many local businesses, such as <Link href="/industries/letting-agents" className="text-brand-gold hover:underline">Letting Agents</Link>, <Link href="/industries/holiday-lets" className="text-brand-gold hover:underline">Holiday Lets</Link> managers, and <Link href="/industries/property-maintenance" className="text-brand-gold hover:underline">Property Maintenance</Link> teams lose high-quality leads simply because they cannot answer their phone immediately or reply to an email within five minutes. If an emergency plumbing job goes unanswered, the customer instantly dials the next company down on Google Maps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW WE HELP */}
      <section className="bg-neutral-900 border-t border-neutral-800 py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">
            How Business Sorted Kent Helps Service Businesses
          </h2>
          <div className="prose prose-invert prose-lg md:prose-xl mx-auto text-neutral-300">
            <p>
              We completely eliminate the digital guessing game for local businesses. Rather than launching abstract marketing campaigns with vague promises, we install highly structured, engineering-led digital assets tailored specifically to the trades and service sectors. 
            </p>
            <p>
              Our process always begins with an intricate diagnosis of your current local visibility. We analyze exactly where you sit in the Kent search rankings compared to your immediate geographical competitors. Once we identify the precise gaps in the market, we architect custom, lightning-fast Next.js infrastructures that push your brand to the top of Google searches for high-intent queries like "emergency electrician in Maidstone" or "commercial cleaners near me."
            </p>
            <p>
              Once the traffic begins flowing, our advanced lead capture systems take over. We build friction-free, specialized quote forms that extract the necessary details from the customer—allowing you to pre-qualify leads easily before you even pick up the telephone. We connect these endpoints to intelligent automation workflows that instantly message the client thanking them for their enquiry, ensuring that you never miss an opportunity again simply due to being busy on a site.
            </p>
            <p>
              By treating local visibility as an exacting science, Business Sorted Kent transforms standard local trades into dominant regional authorities. We are not just an agency building simple websites; we are your dedicated technology partners, engineering the software backbone required to scale your business predictably and safely.
            </p>
          </div>
        </div>
      </section>

      <KentCoverage pageType="industries" />
      <CTA />
    </main>
  );
}
