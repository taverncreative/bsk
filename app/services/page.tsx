import type { Metadata } from 'next';
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
      {/* 1. Page Hero */}
      <div className="container mx-auto px-4 text-center max-w-4xl pt-12 pb-24">
        <Reveal>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Digital Services Engineered for Local Growth
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-3xl mx-auto">
            We build connected digital ecosystems designed to dominate local search, capture high-intent traffic, and automate your lead generation.
          </p>
        </Reveal>
      </div>

      {/* 2. Problem Framing Section */}
      <section className="py-24 bg-neutral-900 border-y border-neutral-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Why A Standalone Website Is No Longer Enough</h2>
              <p className="text-lg text-neutral-400 mb-6 text-left md:text-center">
                Many businesses invest heavily in a visually appealing website, only to find it generates zero calls or emails. A beautiful website that nobody can find is useless. Even worse is a website that ranks well on Google but fails to convert visitors into paying clients.
              </p>
              <p className="text-lg text-neutral-400 text-left md:text-center">
                True digital growth requires a connected system. At Business Sorted Kent, our methodology follows a strict, proven four-part pipeline: <strong>Foundation, Visibility, Conversion, and Efficiency</strong>. When these four pillars work perfectly together, your business stops relying on word-of-mouth and starts generating predictable, high-quality local enquiries every single week.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Growth System Overview */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                The Complete Digital Growth System For Kent Businesses
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
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

      {/* 4. Core Services Section */}
      <section className="py-24 bg-neutral-900 border-y border-neutral-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <Reveal>
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-extrabold text-white mb-4">Our Core Services In Detail</h2>
              <p className="text-xl text-neutral-400">These four primary services form the core of the Business Sorted Kent growth system. Each element is designed to connect seamlessly with the next.</p>
            </div>
          </Reveal>

          <div className="flex flex-col divide-y divide-neutral-800/50">
            {/* Service 1: Text left / visual right */}
            <div className="py-[120px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal className="order-2 lg:order-1 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold bg-transparent text-brand-gold text-xs font-bold tracking-wider uppercase mb-6">
                     FOUNDATION
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Website Design That Turns Visitors Into Customers</h3>
                  <p className="text-lg text-neutral-400 mb-6">Your website is the foundation of your entire online presence. It represents your business to potential customers in Kent 24/7. However, an outdated, slow, or difficult-to-navigate website will instantly destroy trust and send your local customers straight to a competitor.</p>
                  <p className="text-lg text-neutral-400 mb-8">We engineer modern, incredibly fast, and mobile-friendly websites specifically for small businesses. Our sites are not just digital brochures; they are structured logically to guide users exactly where they need to go, pre-loaded with technical SEO foundations, and designed to present your business as the premium, established choice in your industry.</p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Lightning-fast page speeds for higher retention',
                      'Flawless mobile-responsive viewing experiences',
                      'Clear, professional architecture and messaging',
                      'Built to rank on Google from day one'
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-300">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/web-design" className="inline-flex items-center gap-2 text-brand-gold font-bold hover:text-white transition-colors">
                    Explore Website Design Services <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="order-1 lg:order-2">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 md:p-8 aspect-square lg:aspect-auto lg:h-full flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                  <div className="w-full max-w-sm mx-auto bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl relative z-10">
                    <div className="h-8 bg-neutral-900 border-b border-neutral-800 flex items-center px-4 gap-2">
                       <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                       <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                       <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-8">
                        <div className="h-4 w-20 bg-neutral-800 rounded"></div>
                        <div className="flex gap-2">
                          <div className="h-2 w-8 bg-neutral-800 rounded"></div>
                          <div className="h-2 w-8 bg-neutral-800 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="h-8 w-3/4 bg-neutral-800 rounded"></div>
                        <div className="h-8 w-1/2 bg-neutral-800 rounded"></div>
                      </div>
                      <div className="space-y-2 mb-8">
                        <div className="h-3 w-full bg-neutral-900 rounded"></div>
                        <div className="h-3 w-4/5 bg-neutral-900 rounded"></div>
                      </div>
                      <div className="h-10 w-32 bg-brand-gold text-neutral-950 font-bold text-xs flex items-center justify-center rounded">GET STARTED</div>
                      <div className="mt-8 grid grid-cols-2 gap-4">
                         <div className="h-20 bg-neutral-900 rounded-lg border border-neutral-800"></div>
                         <div className="h-20 bg-neutral-900 rounded-lg border border-neutral-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Service 2: Text right / visual left */}
            <div className="py-[120px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal className="order-1 lg:order-1">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 md:p-8 aspect-square lg:aspect-auto lg:h-full flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
                  <div className="w-full max-w-sm mx-auto space-y-4 relative z-10">
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center"><Search className="w-4 h-4 text-neutral-500" /></div>
                        <div className="h-4 w-48 bg-neutral-800 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-950 border border-brand-gold/30 rounded-xl p-5 shadow-[0_0_30px_rgba(214,173,103,0.1)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-brand-gold text-neutral-950 text-[10px] font-bold px-2 py-1 rounded-bl-lg">RANK #1</div>
                      <div className="flex items-start gap-4">
                         <div className="w-12 h-12 bg-neutral-800 rounded-lg shrink-0"></div>
                         <div className="flex-1">
                           <div className="h-4 w-3/4 bg-brand-gold rounded mb-2"></div>
                           <div className="flex gap-1 mb-2 items-center">
                             <div className="flex text-brand-gold text-xs leading-none">★★★★★</div>
                             <span className="text-xs text-neutral-400 ml-1">5.0 (124)</span>
                           </div>
                           <div className="h-2 w-5/6 bg-neutral-800 rounded mb-1.5"></div>
                           <div className="h-2 w-2/3 bg-neutral-800 rounded"></div>
                         </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-neutral-800/50 flex gap-2">
                        <div className="h-8 flex-1 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded flex items-center justify-center">WEBSITE</div>
                        <div className="h-8 flex-1 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded flex items-center justify-center">CALL</div>
                      </div>
                    </div>

                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 opacity-50">
                      <div className="flex items-start gap-4">
                         <div className="w-12 h-12 bg-neutral-900 rounded-lg shrink-0"></div>
                         <div className="flex-1 space-y-2 py-1">
                           <div className="h-4 w-2/3 bg-neutral-800 rounded"></div>
                           <div className="h-2 w-full bg-neutral-900 rounded"></div>
                           <div className="h-2 w-4/5 bg-neutral-900 rounded"></div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="order-2 lg:order-2 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold bg-transparent text-brand-gold text-xs font-bold tracking-wider uppercase mb-6">
                    VISIBILITY
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Local SEO Services That Get Your Business Found</h3>
                  <p className="text-lg text-neutral-400 mb-6">Having a website is irrelevant if potential customers cannot find it when searching for your services in Kent. Local SEO is the engine that drives high-intent traffic directly to your site. Without it, your competitors will consistently win jobs that should have been yours.</p>
                  <p className="text-lg text-neutral-400 mb-8">Our SEO strategy involves rigorous keyword research, deep technical optimisation, and high-quality location-specific content generation. We optimise your Google Business Profile to capture immediate map-pack traffic and structure your website's architecture to build long-term, compounding authority in search results.</p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Extensive competitor and search volume analysis',
                      'Targeted content for maximum local relevance',
                      'Google Business Profile optimisation',
                      'Safe, highly-structured internal linking networks'
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-300">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
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

            {/* Service 3: Text left / visual right */}
            <div className="py-[120px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal className="order-2 lg:order-1 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold bg-transparent text-brand-gold text-xs font-bold tracking-wider uppercase mb-6">
                    CONVERSION
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Lead Capture Systems That Turn Visitors Into Real Enquiries</h3>
                  <p className="text-lg text-neutral-400 mb-6">High traffic volume means nothing if users leave your website without ever contacting you. This is the difference between a simple digital brochure and an active lead capture system. If your bounce rates are high and enquiry volumes are low, your site has a fundamental conversion problem.</p>
                  <p className="text-lg text-neutral-400 mb-8">We engineer lead generation funnels specifically designed to guide users toward an action. By strategically placing clear calls-to-action (CTAs), simplifying complex contact forms, integrating "click-to-call" systems for mobile users, and building targeted landing pages, we drastically lower the friction between a potential customer and your business inbox.</p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Strategic placements of high-converting CTAs',
                      'Simplified, frictionless enquiry forms',
                      'Trackable conversion metrics and analytics',
                      'Dedicated landing pages for specific campaigns'
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-300">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/lead-capture" className="inline-flex items-center gap-2 text-brand-gold font-bold hover:text-white transition-colors">
                    Explore Lead Capture Systems <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="order-1 lg:order-2">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 md:p-8 aspect-square lg:aspect-auto lg:h-full flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-full max-w-sm mx-auto relative z-10">
                    
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 shadow-2xl relative z-20">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                          <MousePointerClick className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="h-4 w-32 bg-white rounded mb-1.5"></div>
                          <div className="h-2 w-24 bg-neutral-600 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="h-2 w-16 bg-neutral-700 rounded"></div>
                          <div className="h-10 w-full bg-neutral-900 border border-neutral-800 rounded-lg flex items-center px-3">
                            <div className="w-3 h-3 rounded-sm bg-neutral-700"></div>
                            <div className="h-2 w-24 bg-neutral-700 rounded ml-2"></div>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 w-20 bg-neutral-700 rounded"></div>
                          <div className="h-10 w-full bg-neutral-900 border border-neutral-800 rounded-lg flex items-center px-3">
                            <div className="w-3 h-3 rounded-sm bg-neutral-700"></div>
                            <div className="h-2 w-32 bg-neutral-700 rounded ml-2"></div>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <div className="h-12 w-full bg-brand-gold rounded-lg font-bold text-neutral-950 flex items-center justify-center shadow-[0_0_15px_rgba(214,173,103,0.2)]">
                            SEND ENQUIRY
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Success Notification */}
                    <div className="absolute -bottom-4 -right-4 bg-neutral-950 border border-green-500/30 shadow-2xl rounded-lg p-4 flex items-center gap-3 z-30 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-bold mb-1">New Lead Captured!</div>
                        <div className="text-neutral-400 text-[10px]">Just now • via Website</div>
                      </div>
                    </div>

                  </div>
                </div>
              </Reveal>
            </div>

            {/* Service 4: Text right / visual left */}
            <div className="py-[120px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal className="order-1 lg:order-1">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 md:p-8 aspect-square lg:aspect-auto lg:h-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent"></div>
                  <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-brand-gold/20 to-transparent"></div>
                  
                  <div className="w-full max-w-sm relative z-10 flex flex-col items-center">
                    <div className="flex flex-col items-center gap-4 w-full">
                      {/* Trigger */}
                      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex items-center gap-3 w-64 shadow-lg relative">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0"><MousePointerClick className="w-4 h-4"/></div>
                        <div>
                          <div className="text-white text-[11px] font-bold">New Form Submission</div>
                          <div className="text-neutral-500 text-[9px]">Website Contact Form</div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 w-px h-4 bg-brand-gold/50"></div>
                      </div>
                      
                      {/* Action 1 */}
                      <div className="bg-neutral-950 border border-brand-gold/40 rounded-xl p-3 flex items-center gap-3 w-64 shadow-[0_0_20px_rgba(214,173,103,0.1)] relative ml-12">
                        <div className="absolute -left-6 top-1/2 w-6 h-px bg-brand-gold/50"></div>
                        <div className="absolute -top-[17px] -left-[24px] border-l border-b border-brand-gold/50 w-6 h-[18px] rounded-bl-lg"></div>
                        <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4"/></div>
                        <div>
                          <div className="text-white text-[11px] font-bold">Log in CRM</div>
                          <div className="text-neutral-500 text-[9px]">Customer Database updated</div>
                        </div>
                        <div className="absolute -bottom-4 left-[22px] w-px h-4 bg-brand-gold/50"></div>
                      </div>

                      {/* Action 2 */}
                      <div className="bg-neutral-950 border border-brand-gold/40 rounded-xl p-3 flex items-center gap-3 w-64 shadow-[0_0_20px_rgba(214,173,103,0.1)] relative ml-12">
                        <div className="w-8 h-8 rounded-lg bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0"><Zap className="w-4 h-4"/></div>
                        <div>
                          <div className="text-white text-[11px] font-bold">Send Auto-Reply</div>
                          <div className="text-neutral-500 text-[9px]">Immediate confirmation sent</div>
                        </div>
                        <div className="absolute -bottom-4 left-[22px] w-px h-4 bg-neutral-800"></div>
                      </div>

                      {/* Action 3 */}
                      <div className="bg-neutral-950 border border-neutral-800 opacity-70 rounded-xl p-3 flex items-center gap-3 w-64 shadow-lg relative ml-12">
                        <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0"><div className="w-2.5 h-2.5 rounded-full border-2 border-neutral-400"></div></div>
                        <div>
                          <div className="text-white text-[11px] font-bold">Wait 3 Days</div>
                          <div className="text-neutral-500 text-[9px]">Then send follow-up</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="order-2 lg:order-2 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold bg-transparent text-brand-gold text-xs font-bold tracking-wider uppercase mb-6">
                    EFFICIENCY
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Business Automation That Saves Time & Organises Enquiries</h3>
                  <p className="text-lg text-neutral-400 mb-6">As your online presence grows, managing the influx of new enquiries manually becomes unsustainable. Lost leads directly equal lost revenue. If you are spending hours answering emails instead of delivering your service, you need systems.</p>
                  <p className="text-lg text-neutral-400 mb-8">Business automation removes the administrative chokepoints from your workflow. We bridge your website securely to the operational software you already use. When a lead comes in, our systems instantly route the enquiry, send a professional auto-response, log the customer details cleanly, and trigger timed follow-ups—ensuring no potential customer ever slips through the cracks.</p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Instant enquiry routing and clean CRM data logging',
                      'Automated email templates for immediate responses',
                      'Scheduled follow-up sequences for cold leads',
                      'Post-job review requests to boost local reputation'
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-300">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
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

      {/* 5. Supporting Services Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <Reveal>
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Supporting Your Digital Growth</h2>
              <p className="text-lg text-neutral-400">Beyond our core pipeline, we offer dedicated specialist services tailored to bolster your brand authority and visual professionalism across every customer touchpoint.</p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <Link href="/branding" className="block h-full group">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 h-full transition-colors group-hover:border-brand-gold/30">
                  <h3 className="text-2xl font-bold text-white mb-4">Logo & Branding</h3>
                  <p className="text-neutral-400 mb-6">Professional branding represents the visual standard of your business. We engineer comprehensive identities, including logos, typography, colour palettes, and strict brand guidelines that establish instant trust with your audience.</p>
                  <span className="text-brand-gold font-bold flex items-center gap-2">Explore Logo & Branding <ArrowRight className="w-4 h-4"/></span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/digital-marketing" className="block h-full group">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 h-full transition-colors group-hover:border-brand-gold/30">
                  <h3 className="text-2xl font-bold text-white mb-4">Social Media Setup</h3>
                  <p className="text-neutral-400 mb-6">Your social profiles are an extension of your website. We structurally build and optimise your professional Facebook, Instagram, or LinkedIn pages to perfectly mirror your brand identity and funnel networking traffic back to your lead capture system.</p>
                  <span className="text-brand-gold font-bold flex items-center gap-2">Explore Social Media Setup <ArrowRight className="w-4 h-4"/></span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={0.3}>
              <Link href="/workwear-print" className="block h-full group">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 h-full transition-colors group-hover:border-brand-gold/30">
                  <h3 className="text-2xl font-bold text-white mb-4">Workwear & Print</h3>
                  <p className="text-neutral-400 mb-6">Physical marketing bridges the gap between digital discovery and real-world trust. We supply extremely high-quality, branded workwear, business cards, site boards, and flyers designed to cohesively match your established online presence perfectly.</p>
                  <span className="text-brand-gold font-bold flex items-center gap-2">Explore Workwear & Print <ArrowRight className="w-4 h-4"/></span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Conversion CTA Section */}
      <CTA 
        titleOverride="Start Building Your Digital Growth System"
        paragraphOverride="A connected website, SEO strategy, lead capture system and automation pipeline can transform how your business generates enquiries."
        buttonOverride="Get A Free Quote"
      />
    </main>
  );
}
