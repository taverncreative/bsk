import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getIndustryBySlug, getServiceBySlug, getGuideBySlug, getAllIndustries, getAllServices, getAllGuides } from '@/lib/queries';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: Promise<{
    industrySlug: string;
    slug: string;
  }>;
};

// 1. Static Paths for Next.js build optimization
export async function generateStaticParams() {
  const [industries, services, guides] = await Promise.all([
    getAllIndustries(),
    getAllServices(),
    getAllGuides()
  ]);

  const paths: { industrySlug: string; slug: string }[] = [];
  
  industries.forEach((industry) => {
    services.forEach((service) => {
      paths.push({
        industrySlug: industry.slug,
        slug: service.slug,
      });
    });
    
    // Statically generate for guides (if we want to limit, we could, but let's do all for now)
    // Actually generating all might be ~56*15 = 840. We can just generate them dynamically.
    // For now, let's just generate services statically, guides fall back to dynamic.
  });

  return paths;
}

// 2. SEO Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industrySlug, slug } = await params;
  const industry = await getIndustryBySlug(industrySlug);
  
  if (!industry) {
    return { title: 'Not Found | Business Sorted' };
  }

  const service = await getServiceBySlug(slug);
  if (service) {
    return {
      title: `${service.name} for ${industry.name} | Business Sorted`,
      description: `Professional ${service.name.toLowerCase()} services tailored specifically for ${industry.name.toLowerCase()} businesses looking to generate more enquiries and scale.`,
      alternates: {
        canonical: `https://businesssortedkent.co.uk/industries/${industry.slug}/${service.slug}`,
      },
    };
  }

  const guide = await getGuideBySlug(slug);
  if (guide) {
    return {
      title: `${guide.title} for ${industry.name} | Business Sorted`,
      description: `Read our comprehensive guide on ${guide.title.toLowerCase()} tailored specifically for the ${industry.name.toLowerCase()} industry.`,
      alternates: {
        canonical: `https://businesssortedkent.co.uk/industries/${industry.slug}/${guide.slug}`,
      },
    };
  }

  return { title: 'Not Found | Business Sorted' };
}

// 3. Page Render
export default async function IndustrySlugPage({ params }: Props) {
  const { industrySlug, slug } = await params;
  const industry = await getIndustryBySlug(industrySlug);

  if (!industry) {
    notFound();
  }

  const [service, guide, allGuides] = await Promise.all([
    getServiceBySlug(slug),
    getGuideBySlug(slug),
    getAllGuides()
  ]);

  if (!service && !guide) {
    notFound();
  }

  // Find related guides based on shared tags
  const relatedGuides = guide ? allGuides
    .filter((g) => g.id !== guide.id)
    .filter((g) => {
      if (!g.tags || !guide.tags) return false;
      return g.tags.some((tag) => guide.tags!.includes(tag));
    })
    .slice(0, 3) : [];

  if (guide) {
    return (
      <main className="bg-black pt-40 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link href={`/guides/${guide.slug}`} className="inline-flex items-center text-neutral-400 hover:text-brand-gold transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to original guide
            </Link>
          </div>
          <header className="mb-16 border-b border-neutral-800 pb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8">
              {guide.title} <span className="text-brand-gold whitespace-nowrap">for {industry.name}</span>
            </h1>
            <div className="prose prose-lg text-neutral-400">
              <p className="text-xl">
                This guide provides specific context on <strong>{guide.title.toLowerCase()}</strong> for businesses operating within the {industry.name.toLowerCase()} sector. Different industries face unique digital challenges, and understanding how this applies specifically to your trade is crucial for local growth. 
              </p>
              <p>
                <em>This guide is a contextual expansion. For the full, general explanation, please see our primary guide: <Link href={`/guides/${guide.slug}`} className="text-brand-gold hover:underline">{guide.title}</Link>.</em>
              </p>
            </div>
          </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8">
            <article className="prose prose-lg prose-invert max-w-none 
                prose-headings:font-bold prose-headings:text-white 
                prose-a:text-brand-gold hover:prose-a:text-yellow-400 prose-a:font-semibold
                prose-p:text-neutral-300 prose-p:leading-relaxed
                prose-li:text-neutral-300
                prose-strong:text-brand-gold
                mb-16">
                <div dangerouslySetInnerHTML={{ __html: guide.content }} />
            </article>
            
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-12 text-center mt-12">
              <h2 className="text-3xl font-bold text-white mb-6">Want to apply this to your {industry.name.toLowerCase()} business?</h2>
              <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
                Stop guessing and start growing. Our team specializes in helping {industry.name.toLowerCase()} businesses generate more local enquiries and scale predictably.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/contact" className="w-full sm:w-auto px-8 py-4 text-lg">
                  Book A Call
                </Button>
                <Link href="/free-website-review" className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white border border-neutral-700 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors">
                  Request Website Review
                </Link>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-8">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Our Services</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/web-design" className="text-neutral-400 hover:text-brand-gold transition-colors font-medium flex justify-between items-center group">
                      Web Design Waitlist
                      <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/seo" className="text-neutral-400 hover:text-brand-gold transition-colors font-medium flex justify-between items-center group">
                      Local SEO Rankings
                      <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/business-automation" className="text-neutral-400 hover:text-brand-gold transition-colors font-medium flex justify-between items-center group">
                      Full Business Automation
                      <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>

              {relatedGuides.length > 0 && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Related Guides</h3>
                  <div className="space-y-6">
                    {relatedGuides.slice(0, 2).map((rg) => (
                      <Link key={rg.id} href={`/guides/${rg.slug}`} className="group block">
                        <h4 className="text-white font-medium group-hover:text-brand-gold transition-colors leading-tight mb-2">
                          {rg.title}
                        </h4>
                        <span className="text-xs text-neutral-500 underline font-semibold group-hover:text-brand-gold">
                          Read Now
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
        </div>
      </main>
    );
  }

  // IT IS A SERVICE
  return (
    <>
      <LocalServiceHero
        title={`${service!.name} for ${industry.name}`}
        subtitle={`Helping ${industry.name.toLowerCase()} businesses generate more enquiries using professional ${service!.name.toLowerCase()}.`}
        primaryCTA={{
          text: 'Get A Free Quote',
          href: '/contact',
        }}
        secondaryCTA={{
          text: 'View All Services',
          href: `/industries/${industry.slug}`,
        }}
      />

      <section className="py-24 bg-neutral-950 border-t border-neutral-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Why {industry.name} Businesses Need {service!.name}
            </h2>
          </div>
          <div className="prose prose-lg text-neutral-400 mx-auto text-center md:text-left">
            <p className="mb-6 leading-relaxed">
              In the competitive {industry.name.toLowerCase()} sector, relying entirely on word-of-mouth or outdated directory listings is no longer enough to maintain consistent growth. Your customers are actively searching online for reliable {industry.name.toLowerCase()} providers, and if your digital presence is weak, those high-value leads are going directly to your competitors.
            </p>
            <p className="leading-relaxed">
              {industry.pain_point || `Whether you're struggling with inconsistent lead volume or dealing with low-quality tyre-kickers, a professional ${service!.name.toLowerCase()} strategy bridges the gap between your operational excellence and your target audience, allowing you to dominate your market share.`}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black border-t border-neutral-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              How Our {service!.name} Helps {industry.name}
            </h2>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-8 md:p-12 shadow-sm">
            <ul className="space-y-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Generate more enquiries</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    We engineer {service!.name.toLowerCase()} solutions that act as proactive digital sales engines, aggressively capturing high-intent {industry.name.toLowerCase()} leads specifically when they need your services most.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Build trust online</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    First impressions matter. We utilize powerful {service!.name.toLowerCase()} frameworks to instantly establish your {industry.name.toLowerCase()} firm as the premier, trusted authority in your sector.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Rank higher on Google</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Visibility is everything. Our technical execution ensures your business surfaces at the exact moment localized commercial intent occurs in the search engines.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-950 border-t border-neutral-900">
         <div className="container mx-auto px-4 max-w-4xl">
           <h2 className="text-3xl font-bold text-white mb-6">Our {service!.name} Process for {industry.name}</h2>
           <div className="prose prose-lg text-neutral-400">
             <p>
               Generic marketing campaigns fail because they don't understand the buying cycle of a {industry.name.toLowerCase()} customer. Someone looking for your services isn't casually browsing—they have a specific commercial intent. Our <Link href={`/${service!.slug}`} className="text-brand-gold font-bold hover:text-white transition-colors">{service!.name} solutions</Link> are built specifically to capture that intent.
             </p>
             <p>
               Every campaign begins with a structural audit. We mapped out how the top-performing {industry.name.toLowerCase()} businesses secure their leads, and we reverse engineer that architecture for your company. This frequently involves executing hyper-local campaigns targeted across key commercial hubs, such as <Link href="/towns/maidstone" className="text-brand-gold font-bold hover:text-white transition-colors">Maidstone</Link>, <Link href="/towns/ashford" className="text-brand-gold font-bold hover:text-white transition-colors">Ashford</Link>, and <Link href="/towns/canterbury" className="text-brand-gold font-bold hover:text-white transition-colors">Canterbury</Link>.
             </p>
             <p>
               Once the localized traffic begins converting into your platform, we deploy <Link href={`/industries/${industry.slug}/business-automation`} className="text-brand-gold font-bold hover:text-white transition-colors">Automated CRM pipelines</Link> engineered to immediately qualify and respond to those specific {industry.name.toLowerCase()} leads. You don't have to spend hours managing an inbox; you just need to close the deals. Read our <Link href="/guides" className="text-brand-gold font-bold hover:text-white transition-colors">Digital Growth Guides</Link> to learn exactly how these systems scale.
             </p>
           </div>
         </div>
      </section>

      <section className="bg-black border-t border-neutral-900 py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-white">
            Ready to Grow Your {industry.name} Business?
          </h2>
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 leading-relaxed">
            Stop losing local leads to your competitors. Let's get started today.
          </p>
          <div className="flex justify-center">
            <Button href="/contact" className="text-lg px-10 py-4 shadow-lg shadow-brand-gold/20">
              Get A Free Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
