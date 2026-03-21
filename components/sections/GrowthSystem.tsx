import Reveal from '@/components/ui/Reveal';
import { ArrowRight, Laptop, Search, MousePointerClick, Zap } from 'lucide-react';
import Link from 'next/link';

interface GrowthSystemProps {
  currentService: string;
}

export default function GrowthSystem({ currentService }: GrowthSystemProps) {
  let description = "Our core growth system combines intelligent web design, local SEO, lead capture, and automation to turn your online presence into a predictable lead machine.";
  
  if (currentService === 'web-design') {
    description = "A high performing website forms the foundation of your online presence. Once built, SEO improves visibility, lead capture systems convert visitors into enquiries, and automation streamlines the process.";
  } else if (currentService === 'seo') {
    description = "SEO drives high-intent traffic to your business. This traffic lands on your high-performing website, where lead capture systems convert visitors into direct enquiries, which are then managed cleanly via automation.";
  } else if (currentService === 'lead-capture') {
    description = "Lead capture systems turn your website traffic into real enquiries. These funnels are fed by ongoing SEO search visibility, and the resulting leads are smoothly managed through backend business automation.";
  } else if (currentService === 'business-automation') {
    description = "Automation streamlines your backend operations so you can scale efficiently. It acts as the final step in our pipeline, managing the enquiries generated from your high-performance website, SEO, and lead capture systems.";
  } else if (currentService === 'branding' || currentService === 'logo-branding') {
    description = "Strong branding sits at the core of your growth. A professional identity enhances trust across your web design, improves the conversion rate of your SEO traffic, and solidifies your lead capture funnel.";
  } else if (currentService === 'social-media-setup' || currentService === 'digital-marketing') {
    description = "Optimised social media funnels traffic back to your core growth system. It complements your SEO visibility, directs users to your high-converting website, and feeds your lead capture and automation pipelines.";
  } else if (currentService === 'workwear-print') {
    description = "Physical branding bridges your real-world presence with your digital growth system. Professional print and workwear reinforce the trust built by your website, SEO, and automated follow-ups.";
  } else if (currentService === 'ai-chatbots') {
    description = "AI chatbots sit at the front of your growth system, engaging visitors the moment they land on your website. They feed qualified leads directly into your automation pipeline and capture opportunities that would otherwise be lost outside office hours.";
  } else if (currentService === 'ai-content') {
    description = "AI content fuels every other part of your growth system. Blog posts drive SEO traffic, social content builds brand awareness, and email campaigns nurture leads — all produced consistently at a pace that would be impossible manually.";
  } else if (currentService === 'ai-automation') {
    description = "AI automation is the nervous system connecting every part of your digital growth engine. It ensures leads captured by your website, chatbot, and SEO efforts are instantly responded to, qualified, and followed up — without any manual intervention.";
  }

  const coreServices = [
    { title: 'Web Design', href: '/web-design', icon: Laptop },
    { title: 'SEO', href: '/seo', icon: Search },
    { title: 'Lead Capture', href: '/lead-capture', icon: MousePointerClick },
    { title: 'Automation', href: '/business-automation', icon: Zap },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-neutral-900 border-b relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/5 to-transparent mix-blend-screen pointer-events-none" />
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
              Part Of The <span className="text-brand-gold">Business Sorted Kent</span> Growth System
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          </div>
        </Reveal>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-12">
          {coreServices.map((service, index) => {
            const isActive = service.href.includes(currentService);
            return (
              <Reveal key={index} delay={index * 0.1}>
                <Link href={service.href} className="flex items-center gap-2 group">
                  <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? 'bg-brand-gold/10 border-brand-gold text-brand-gold shadow-[0_0_15px_rgba(214,173,103,0.15)]' 
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-brand-gold/50 hover:text-white'
                  }`}>
                    <service.icon className="w-5 h-5 shrink-0" />
                    <span className="font-bold text-sm md:text-base">{service.title}</span>
                  </div>
                  {index < coreServices.length - 1 && (
                    <ArrowRight className="hidden md:block w-5 h-5 text-neutral-700 ml-4 group-hover:text-brand-gold/50 transition-colors" />
                  )}
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
