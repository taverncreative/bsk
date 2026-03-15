import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About | Business Sorted Kent',
  description: 'Business Sorted Kent is a founder-led agency helping tradespeople and service businesses across Kent improve their online presence through websites, SEO, and automation.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-32 lg:pt-40 text-neutral-300">
      
      {/* 1. HERO INTRO */}
      <section className="container mx-auto px-4 text-center max-w-4xl py-12 lg:py-20">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8">
          About Business Sorted Kent
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-3xl mx-auto">
          We help tradespeople, sole traders, and service businesses across Kent fundamentally improve their online presence. By providing high-quality websites, targeted local SEO, lead capture systems, and business automation, we build the digital foundations required for sustainable local growth.
        </p>
      </section>

      {/* 2. WHY BUSINESS SORTED KENT WAS CREATED */}
      <section className="bg-neutral-950 py-24 border-y border-neutral-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">
            Why Business Sorted Kent Was Created
          </h2>
          <div className="prose prose-invert prose-lg md:prose-xl mx-auto text-neutral-400 leading-relaxed">
            <p>
              The digital marketing industry is often unnecessarily complicated. For years, small business owners have expressed the exact same frustrations when dealing with traditional web design agencies: the costs are exorbitant, the marketing jargon is inherently confusing, and the final products frequently fail to generate any real-world enquiries. Business Sorted Kent was founded specifically to solve this disconnect and provide a straightforward, transparent alternative.
            </p>
            <p>
              Far too often, tradespeople invest heavily in "brochure" websites. These sites might look visually appealing to the business owner, but they lack the underlying architecture required to rank on Google or persuade a visitor to pick up the phone. A website that sits entirely dormant, failing to attract new customers, is a liability rather than an asset. Business owners are then told they need to pay exorbitant monthly retainers for abstract SEO packages that offer zero measurable return on investment. 
            </p>
            <p>
              We established Business Sorted Kent to cut through this noise. Our primary motivation is to provide practical, reliable, and highly effective digital support that genuinely helps businesses grow their revenue. We believe that digital marketing should not be a confusing expense; it should be a highly predictable mathematical engine. We focus entirely on what works: fast websites, localized visibility, removing friction for the customer, and automating the administrative burden. By stripping away the bloated agency costs and removing the impenetrable tech jargon, we deliver robust solutions that give our clients total clarity and control over their online presence.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHO WE WORK WITH */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            Who We Work With
          </h2>
          <div className="prose prose-invert prose-lg md:prose-xl mx-auto text-neutral-400 leading-relaxed mb-12">
            <p>
              Business Sorted Kent specializes in supporting the companies that form the backbone of the local economy. Our clients are typically tradespeople, service businesses, local companies, and small growing businesses that need to solidify their position in their local region. We work extensively with electricians, plumbers, builders, roofers, landscapers, cleaners, and other hands-on professionals who operate within specific geographical service areas.
            </p>
            <p>
              These businesses universally face a very specific set of online challenges. The absolute most common issue is the "visibility gap." A highly skilled carpenter or an incredibly reliable property maintenance firm may have a fantastic real-world reputation, but if they cannot be found when a local homeowner searches Google for their services, they lose the job to a competitor with a better digital presence. 
            </p>
            <p>
              Another significant hurdle for these businesses is extreme administrative pressure. When you are physically working on a job site—installing a new boiler, managing a major commercial build, or driving between customer appointments—you simply do not have the time to answer every phone call immediately or reply to every email the second it arrives. In the modern consumer landscape, if a customer cannot reach you quickly, they instantly move to the next business on the list.
            </p>
            <p>
              We solve these critical challenges dynamically. We build digital ecosystems that push our clients to the top of local search results so they are undeniably visible exactly when their services are required. Simultaneously, we implement integrated lead capture forms and automated response systems that instantly acknowledge customer enquiries, preserving the lead and buying the business owner time to follow up properly without losing the potential job.
            </p>
          </div>
        </div>
      </section>

      {/* 4. OUR APPROACH */}
      <section className="bg-neutral-900 border-y border-neutral-800 py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">
            Our Approach
          </h2>
          <div className="prose prose-invert prose-lg md:prose-xl mx-auto text-neutral-400 leading-relaxed">
            <p>
              The way we collaborate with our clients differs fundamentally from the traditional agency model. We prioritize absolute clarity over complicated rhetoric. Our approach is deeply rooted in clear communication and practical, structural solutions. When we conduct a consultation, we do not attempt to sell unnecessary features or confusing marketing retainers; instead, we analyze the precise gaps in a client's current local visibility and propose the most direct, cost-effective route to generating more high-quality enquiries.
            </p>
            <p>
              We firmly believe that a business should not rely on one-off fixes. Haphazardly updating a single webpage or buying a month of Google Ads might produce a temporary spike, but it does not create long-term stability. Our methodology is focused entirely on engineering permanent systems that consistently generate inbound leads. We build the core foundation—a highly optimized, rapidly loading website—and then we strategically layer local SEO frameworks and CRM automation on top of it. 
            </p>
            <p>
              By avoiding technical jargon and keeping all our explanations completely accessible, we ensure that our clients actually understand how their digital assets function. We act as long-term digital partners, carefully monitoring performance, adapting strategies to shifts in the Google algorithm, and actively advising on new growth opportunities. Our process is transparent, data-driven, and designed explicitly around the commercial reality of operating a small business in a competitive local market.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOUNDER LED SUPPORT */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">
            Founder Led Support
          </h2>
          <div className="prose prose-invert prose-lg md:prose-xl mx-auto text-neutral-400 leading-relaxed">
            <p>
              Business Sorted Kent is proudly structured as a founder-led agency, directed by John Lally and supported by a tightly integrated, small network of trusted technical specialists. We are not a massive corporate entity where clients are passed off to Junior Account Managers, nor do we outsource our core engineering work to unverified international contractors. 
            </p>
            <p>
              This streamlined, founder-led structure provides distinct advantages for our clients. Primarily, it guarantees immense personal involvement in every single project. When a business partners with us, they benefit from direct communication with the core team actively building their systems. There are no layers of administrative bloat; if a client has a question, requires an urgent update, or wants to discuss a new expansion strategy, they speak directly to the people architecting their digital presence.
            </p>
            <p>
              Furthermore, this structure allows for incredible operational flexibility. Large agencies are notoriously slow to pivot when market conditions change or a client needs rapid implementation. Because we maintain a lean, highly specialized network, we can deploy new features, implement algorithmic updates, and adjust SEO targeting with extraordinary speed. We bring in our trusted specialist partners exclusively when a project requires specific niche expertise, meaning our clients receive top-tier, enterprise-level digital engineering without the massive overhead costs traditionally associated with large marketing firms.
            </p>
          </div>
        </div>
      </section>

      {/* 6. SERVICES PROVIDED */}
      <section className="bg-neutral-950 border-y border-neutral-900 py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">
            How We Help Businesses Grow
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Website Design */}
            <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
              <h3 className="text-2xl font-bold text-white mb-4">Website Design</h3>
              <p className="text-lg text-neutral-400 leading-relaxed">
                We design and engineer high-performance websites that go far beyond basic aesthetics. A website must act as your best digital salesperson, operating 24 hours a day to convert visitors into paying customers. We build incredibly fast, mobile-optimized sites that feature clear psychological calls-to-action, ensuring that whenever a potential client lands on your page, they immediately trust your brand and understand precisely how to contact you.
              </p>
            </div>

            {/* Local SEO */}
            <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
              <h3 className="text-2xl font-bold text-white mb-4">Local SEO</h3>
              <p className="text-lg text-neutral-400 leading-relaxed">
                Search Engine Optimization is the process of ensuring your business dominates local Google rankings. When someone in your operating area searches for your particular trade, you must appear at the top of the map pack and organic listings. We implement aggressive, highly targeted local SEO strategies that signal your geographical relevance to search engines, pulling high-intent, ready-to-buy traffic directly away from your competitors and into your pipeline.
              </p>
            </div>

            {/* Lead Capture Systems */}
            <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
              <h3 className="text-2xl font-bold text-white mb-4">Lead Capture Systems</h3>
              <p className="text-lg text-neutral-400 leading-relaxed">
                Getting traffic to your website is only half the battle; capturing their details before they leave is critical. We integrate advanced, frictionless lead capture forms and quoting mechanisms that make it extraordinarily easy for a customer to request your services. By strategically placing these capture points throughout your digital presence, we significantly increase your overall conversion rate and ensure you never miss a potential job.
              </p>
            </div>

            {/* Business Automation */}
            <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
              <h3 className="text-2xl font-bold text-white mb-4">Business Automation</h3>
              <p className="text-lg text-neutral-400 leading-relaxed">
                We implement smart backend automation systems that drastically reduce your daily administrative workload. From instant email and SMS auto-responders that acknowledge fresh enquiries the second they are submitted, to automated customer review requests following a completed job, our tools handle the repetitive data entry. This allows you to focus entirely on on-site operations and scaling your company while the software manages your customer communication dynamically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SUPPORTING BUSINESSES ACROSS KENT */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
            Supporting Businesses Across Kent
          </h2>
          <div className="prose prose-invert prose-lg md:prose-xl mx-auto text-neutral-400 leading-relaxed mb-12">
            <p>
              As a dedicated local agency, our absolute focus is on the geographical region we know best. We actively partner with and support service businesses throughout the entirety of the county, ensuring that wherever you are based, you have access to enterprise-grade digital infrastructure tailored completely to your immediate commercial environment.
            </p>
            <p>
              We successfully deploy targeted growth campaigns and build stronger online visibility for companies operating in major hubs and surrounding districts, including areas such as:
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Ashford', 'Canterbury', 'Maidstone', 'Folkestone', 'Sevenoaks', 'Tunbridge Wells', 'Tonbridge', 'Dartford', 'Gravesend'].map((town) => (
              <span key={town} className="px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-full text-white font-medium text-lg">
                {town}
              </span>
            ))}
          </div>
          
          <div className="prose prose-invert prose-lg md:prose-xl mx-auto text-neutral-400 leading-relaxed">
            <p>
              By thoroughly understanding the distinct local search behaviors and competitive landscapes across these towns, we can engineer specific, highly localized strategies. Whether you are a sole trader looking to dominate the immediate postcode around Ashford, or a larger contractor aiming to secure major tenders across Maidstone and Canterbury, we reinforce your brand authority across the exact Kent territories you wish to target.
            </p>
          </div>
        </div>
      </section>

      {/* 8. WORKING TOGETHER */}
      <section className="bg-neutral-900 border-t border-neutral-800 py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">
            Working Together
          </h2>
          <div className="prose prose-invert prose-lg md:prose-xl mx-auto text-neutral-400 leading-relaxed">
            <p>
              When clients choose to partner with Business Sorted Kent, they are guaranteed an experience characterized by absolute transparency and ongoing mutual respect. We do not view our clients as mere accounts; we view them as long-term collaborators. From the initial strategic consultation through to the final launch of your new digital assets and beyond, you can expect an environment of clear communication and pragmatic decision-making. 
            </p>
            <p>
              We firmly reject the industry standard of hiding behind confusing analytical reports or purposely vague technical terminology. Instead, we provide transparent, honest advice. If a specific marketing avenue will not work for your particular trade or geographical location, we will tell you directly, rather than wasting your budget on ineffective campaigns. Every strategy we recommend is scrutinized against one simple metric: will this action generate a tangible return on investment for your business?
            </p>
            <p>
              Ultimately, what you can expect from Business Sorted Kent is a suite of solutions that are intensely practical and highly effective. We take the overwhelming burden of digital marketing completely off your shoulders, implementing secure, automated systems that run flawlessly in the background. We ensure that while you are focusing your energy on delivering excellent physical service to your customers, your digital infrastructure is working aggressively to secure your next profitable contract.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="section-dark py-28 flex items-center justify-center border-t-4 border-brand-gold">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-white">
            Ready to Improve Your Online Presence?
          </h2>
          <p className="text-xl md:text-2xl text-neutral-300 mb-12 leading-relaxed">
            Stop losing local leads to competitors. Contact Business Sorted Kent today to discuss how we can build a predictable, high-conversion growth system for your specific trade.
          </p>
          <div className="flex justify-center">
            <Button href="/contact" className="text-lg px-12 py-5 shadow-[0_0_30px_rgba(214,173,103,0.3)] bg-brand-gold border-none hover:bg-white hover:text-black transition-all duration-300 rounded-xl font-bold text-black" variant="primary">
              Get A Free Quote
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
