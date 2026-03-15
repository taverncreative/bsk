import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { Laptop, Search, MousePointerClick } from 'lucide-react';
import IconWrapper from '@/components/ui/IconWrapper';

export default function HomepageAuthoritySection() {
  return (
    <section className="py-28 bg-neutral-950 border-t border-neutral-900 border-b relative">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <Reveal>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              How Businesses In Kent Get Found Online
            </h2>
            <p className="text-lg text-neutral-400">
              A reliable digital presence requires more than just a template. It takes a structured approach designed specifically to attract traffic, engage visitors, and generate consistent enquiries.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <Reveal delay={0.1}>
            <div className="flex flex-col group h-full">
              <IconWrapper icon={Laptop} className="mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">
                Website Foundations
              </h3>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                A strong website is the core of your digital strategy. It must load quickly, work seamlessly on mobile devices, and most importantly, it has to be structured so that search engines can easily understand what you do and where you do it.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/web-design" className="text-brand-gold font-bold text-sm hover:underline">
                  Explore Website Design &rarr;
                </Link>
                <Link href="/business-automation" className="text-neutral-500 font-bold text-sm hover:text-brand-gold transition-colors">
                  Explore Business Automation &rarr;
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col group h-full relative">
              <div className="hidden md:block absolute -left-8 top-10 bottom-10 w-px bg-neutral-800" />
              <IconWrapper icon={Search} className="mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">
                Search Visibility
              </h3>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                Having a website is useless if no one can find it. By injecting a strong SEO structure internally, we ensure your business appears at the exact moment local customers search for your services, capturing commercial intent right when it matters.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/seo" className="text-brand-gold font-bold text-sm hover:underline">
                  Explore SEO Strategies &rarr;
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col group h-full relative">
              <div className="hidden md:block absolute -left-8 top-10 bottom-10 w-px bg-neutral-800" />
              <IconWrapper icon={MousePointerClick} className="mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">
                Lead Capture Systems
              </h3>
              <p className="text-neutral-400 leading-relaxed flex-grow">
                Once visitors arrive, the site must instantly build trust and convert them into solid enquiries. We achieve this through clear contact paths, strategically placed action prompts, and automated workflows that handle the heavy lifting.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/lead-capture" className="text-brand-gold font-bold text-sm hover:underline">
                  Explore Lead Capture &rarr;
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
