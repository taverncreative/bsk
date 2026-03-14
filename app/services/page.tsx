import type { Metadata } from 'next';
import Services from '@/components/sections/Services';
import CTA from '@/components/sections/CTA';
import Reveal from '@/components/ui/Reveal';
import { Laptop, Search, MousePointerClick, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Digital Growth Services | Business Sorted Kent',
  description: 'Specialist web design, local SEO, lead capture systems, and business automation services designed specifically to help local Kent businesses scale.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/services',
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-40">
      <div className="container mx-auto px-4 text-center max-w-4xl py-12">
        <Reveal>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            The Complete Digital Growth System For Kent Businesses
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed mb-8">
            We don&apos;t just build websites. We build connected digital ecosystems designed to dominate local search, capture high-intent traffic, and automate your entire lead generation pipeline.
          </p>
        </Reveal>
      </div>

      <section className="py-16 bg-neutral-900 border-y border-neutral-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Why A Standalone Website Is No Longer Enough</h2>
              <p className="text-lg text-neutral-400 mb-6 text-left md:text-center">
                Many businesses invest heavily in a visually appealing website, only to find it generates zero calls or emails. A beautiful website that nobody can find is useless. Even worse is a website that ranks well on Google but fails to convert visitors into paying clients.
              </p>
              <p className="text-lg text-neutral-400 text-left md:text-center">
                True digital growth requires a connected system. At Business Sorted Kent, our methodology follows a strict, proven four-part pipeline: <strong>Foundation, Visibility, Conversion, and Efficiency</strong>. When these four pillars work perfectly together, your business stops relying on word-of-mouth and starts generating predictable, high-quality local enquiries every single week.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16 relative">
            <div className="hidden md:block absolute top-[45px] left-[10%] w-[80%] h-[2px] bg-neutral-800 z-0"></div>
            
            {[
              { step: '01', title: 'Website Design', desc: 'The high-converting foundation', icon: Laptop },
              { step: '02', title: 'SEO Rankings', desc: 'Driving local search traffic', icon: Search },
              { step: '03', title: 'Lead Capture', desc: 'Turning traffic into leads', icon: MousePointerClick },
              { step: '04', title: 'Automation', desc: 'Organising leads and follow-ups', icon: Zap }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1} className="relative z-10">
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 text-center h-full flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="text-brand-gold font-bold mb-2 text-sm tracking-wider">STEP {item.step}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-400">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold text-white mb-4">Our Core Services In Detail</h2>
              <p className="text-xl text-neutral-400 max-w-3xl">These four primary services form the core of the Business Sorted Kent growth system. Each element is designed to connect seamlessly with the next.</p>
            </div>
          </Reveal>

          <div className="space-y-24">
            {/* Web Design */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm font-bold tracking-wider mb-6">
                    <Laptop className="w-4 h-4" /> THE FOUNDATION
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Website Design That Turns Visitors Into Customers</h3>
                  <p className="text-lg text-neutral-400 mb-6">Your website is the foundation of your entire online presence. It represents your business to potential customers in Kent 24/7. However, an outdated, slow, or difficult-to-navigate website will instantly destroy trust and send your local customers straight to a competitor.</p>
                  <p className="text-lg text-neutral-400 mb-8">We engineer modern, incredibly fast, and mobile-friendly websites specifically for small businesses. Our sites are not just digital brochures; they are structured logically to guide users exactly where they need to go, pre-loaded with technical SEO foundations, and designed to present your business as the premium, established choice in your industry.</p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Lightning-fast page speeds for higher retention',
                      'Flawless mobile-responsive viewing experiences',
                      'Clear, professional architecture and messaging',
                      'Built to rank on Google from day one'
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-300">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/web-design" className="inline-flex items-center gap-2 text-brand-gold font-bold hover:text-white transition-colors">
                    Explore Website Design Services <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 aspect-square lg:aspect-auto lg:h-full flex items-center justify-center">
                  <div className="w-full max-w-sm space-y-4">
                    <div className="h-6 w-32 bg-neutral-800 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-neutral-800 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-neutral-800 rounded animate-pulse"></div>
                    <div className="h-32 w-full bg-neutral-800 rounded-lg mt-6"></div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="h-24 bg-neutral-800 rounded-lg"></div>
                      <div className="h-24 bg-neutral-800 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* SEO */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal className="order-2 lg:order-1">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 aspect-square lg:aspect-auto lg:h-full flex items-center justify-center">
                  <div className="w-full max-w-sm space-y-4">
                    <div className="flex justify-between items-end border-b border-neutral-800 pb-2 mb-4">
                      <div className="h-4 w-24 bg-brand-gold/50 rounded"></div>
                      <div className="flex gap-2">
                        <div className="w-4 h-12 bg-neutral-800 rounded-t"></div>
                        <div className="w-4 h-16 bg-brand-gold/50 rounded-t"></div>
                        <div className="w-4 h-24 bg-brand-gold rounded-t"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-10 w-full bg-neutral-800 rounded-lg"></div>
                      <div className="h-10 w-full bg-neutral-800 rounded-lg border-l-2 border-brand-gold"></div>
                      <div className="h-10 w-full bg-neutral-800 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="order-1 lg:order-2">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm font-bold tracking-wider mb-6">
                    <Search className="w-4 h-4" /> VISIBILITY
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Local SEO Services That Get Your Business Found</h3>
                  <p className="text-lg text-neutral-400 mb-6">Having a website is irrelevant if potential customers cannot find it when searching for your services in Kent. Local SEO is the engine that drives high-intent traffic directly to your site. Without it, your competitors will consistently win jobs that should have been yours.</p>
                  <p className="text-lg text-neutral-400 mb-8">Our SEO strategy involves rigorous keyword research, deep technical optimisation, and high-quality location-specific content generation. We optimise your Google Business Profile to capture immediate map-pack traffic and structure your website's architecture to build long-term, compounding authority in search results.</p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Extensive competitor and search volume analysis',
                      'Targeted content for maximum local relevance',
                      'Google Business Profile optimisation',
                      'Safe, highly-structured internal linking networks'
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-300">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/seo" className="inline-flex items-center gap-2 text-brand-gold font-bold hover:text-white transition-colors">
                    Explore Local SEO Services <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Lead Capture */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm font-bold tracking-wider mb-6">
                    <MousePointerClick className="w-4 h-4" /> CONVERSION
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Lead Capture Systems That Turn Visitors Into Real Enquiries</h3>
                  <p className="text-lg text-neutral-400 mb-6">High traffic volume means nothing if users leave your website without ever contacting you. This is the difference between a simple digital brochure and an active lead capture system. If your bounce rates are high and enquiry volumes are low, your site has a fundamental conversion problem.</p>
                  <p className="text-lg text-neutral-400 mb-8">We engineer lead generation funnels specifically designed to guide users toward an action. By strategically placing clear calls-to-action (CTAs), simplifying complex contact forms, integrating "click-to-call" systems for mobile users, and building targeted landing pages, we drastically lower the friction between a potential customer and your business inbox.</p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Strategic placements of high-converting CTAs',
                      'Simplified, frictionless enquiry forms',
                      'Trackable conversion metrics and analytics',
                      'Dedicated landing pages for specific campaigns'
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-300">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/lead-capture" className="inline-flex items-center gap-2 text-brand-gold font-bold hover:text-white transition-colors">
                    Explore Lead Capture Systems <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 aspect-square lg:aspect-auto lg:h-full flex items-center justify-center">
                  <div className="w-full max-w-sm">
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 shadow-2xl">
                      <div className="h-4 w-32 bg-neutral-800 rounded mb-6"></div>
                      <div className="space-y-4">
                        <div className="h-10 w-full bg-neutral-900 border border-neutral-800 rounded"></div>
                        <div className="h-10 w-full bg-neutral-900 border border-neutral-800 rounded"></div>
                        <div className="h-24 w-full bg-neutral-900 border border-neutral-800 rounded"></div>
                        <div className="h-12 w-full bg-brand-gold rounded font-bold text-neutral-950 flex items-center justify-center">GET A QUOTE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Business Automation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal className="order-2 lg:order-1">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 aspect-square lg:aspect-auto lg:h-full flex items-center justify-center relative">
                  <div className="w-full max-w-sm space-y-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">@</div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/2 bg-neutral-800 rounded"></div>
                        <div className="h-2 w-1/4 bg-neutral-700 rounded"></div>
                      </div>
                    </div>
                    <div className="ml-6 border-l-2 border-brand-gold pl-6 py-2 space-y-4">
                       <div className="h-10 w-full bg-neutral-800 rounded-lg flex items-center px-4"><span className="text-xs text-brand-gold">✓ Logged in CRM</span></div>
                       <div className="h-10 w-full bg-neutral-800 rounded-lg flex items-center px-4"><span className="text-xs text-brand-gold">✓ Auto-reply Sent</span></div>
                       <div className="h-10 w-full bg-neutral-800 rounded-lg flex items-center px-4"><span className="text-xs text-neutral-500">Wait 3 Days -&gt; Follow Up</span></div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="order-1 lg:order-2">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm font-bold tracking-wider mb-6">
                    <Zap className="w-4 h-4" /> EFFICIENCY
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Business Automation That Saves Time & Organises Enquiries</h3>
                  <p className="text-lg text-neutral-400 mb-6">As your online presence grows, managing the influx of new enquiries manually becomes unsustainable. Lost leads directly equal lost revenue. If you are spending hours answering emails instead of delivering your service, you need systems.</p>
                  <p className="text-lg text-neutral-400 mb-8">Business automation removes the administrative chokepoints from your workflow. We bridge your website securely to the operational software you already use. When a lead comes in, our systems instantly route the enquiry, send a professional auto-response, log the customer details cleanly, and trigger timed follow-ups—ensuring no potential customer ever slips through the cracks.</p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Instant enquiry routing and clean CRM data logging',
                      'Automated email templates for immediate responses',
                      'Scheduled follow-up sequences for cold leads',
                      'Post-job review requests to boost local reputation'
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-300">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/business-automation" className="inline-flex items-center gap-2 text-brand-gold font-bold hover:text-white transition-colors">
                    Explore Automation Services <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-900 border-y border-neutral-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <Reveal>
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Supporting Your Digital Growth</h2>
              <p className="text-lg text-neutral-400">Beyond our core pipeline, we offer dedicated specialist services tailored to bolster your brand authority and visual professionalism across every customer touchpoint.</p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-4">Logo & Branding</h3>
                <p className="text-neutral-400 mb-6">Professional branding represents the visual standard of your business. We engineer comprehensive identities, including logos, typography, colour palettes, and strict brand guidelines that establish instant trust with your audience.</p>
                <Link href="/branding" className="text-brand-gold font-bold hover:text-white transition-colors flex items-center gap-2">Read More <ArrowRight className="w-4 h-4"/></Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-4">Social Media Setup</h3>
                <p className="text-neutral-400 mb-6">Your social profiles are an extension of your website. We structurally build and optimise your professional Facebook, Instagram, or LinkedIn pages to perfectly mirror your brand identity and funnel networking traffic back to your lead capture system.</p>
                <Link href="/digital-marketing" className="text-brand-gold font-bold hover:text-white transition-colors flex items-center gap-2">Read More <ArrowRight className="w-4 h-4"/></Link>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-4">Workwear & Print</h3>
                <p className="text-neutral-400 mb-6">Physical marketing bridges the gap between digital discovery and real-world trust. We supply extremely high-quality, branded workwear, business cards, site boards, and flyers designed to cohesively match your established online presence perfectly.</p>
                <Link href="/workwear-print" className="text-brand-gold font-bold hover:text-white transition-colors flex items-center gap-2">Read More <ArrowRight className="w-4 h-4"/></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA 
        titleOverride="Ready To Start Systemising Your Growth?"
        paragraphOverride="Whether you need a high-converting website, better Google rankings, or automated workflows to reclaim your time, we build the systems that help Kent businesses scale."
        buttonOverride="Start Your Project Today"
      />
    </main>
  );
}
