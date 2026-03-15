import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTownBySlug, getGuideBySlug, getAllGuides } from '@/lib/queries';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: Promise<{
    serviceTown: string;
    guideSlug: string;
  }>;
};

// Next.js static paths. For now we will return an empty array to generate these on-demand
// because 35 towns * 56 guides = ~2000 pages which slows down build times significantly
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceTown, guideSlug } = await params;
  const town = await getTownBySlug(serviceTown);
  const guide = await getGuideBySlug(guideSlug);

  if (!town || !guide) {
    return { title: 'Not Found | Business Sorted' };
  }

  return {
    title: `${guide.title} for businesses in ${town.name} | Business Sorted`,
    description: `Local expansion of our guide about ${guide.title.toLowerCase()} contextualized specifically for the businesses operating in and around ${town.name}.`,
    alternates: {
      canonical: `https://businesssortedkent.co.uk/${town.slug}/${guide.slug}`,
    },
  };
}

export default async function TownGuidePage({ params }: Props) {
  const { serviceTown, guideSlug } = await params;

  const [town, guide, allGuides] = await Promise.all([
    getTownBySlug(serviceTown),
    getGuideBySlug(guideSlug),
    getAllGuides()
  ]);

  if (!town || !guide) {
    notFound();
  }

  // Find related guides based on shared tags
  const relatedGuides = allGuides
    .filter((g) => g.id !== guide.id)
    .filter((g) => {
      if (!g.tags || !guide.tags) return false;
      return g.tags.some((tag) => guide.tags!.includes(tag));
    })
    .slice(0, 3);

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
            {guide.title} <span className="text-brand-gold whitespace-nowrap">in {town.name}</span>
          </h1>
          <div className="prose prose-lg text-neutral-400">
            <p className="text-xl">
              This guide provides specific, actionable context on <strong>{guide.title.toLowerCase()}</strong> for businesses operating in and serving the <strong>{town.name}</strong> area. Ranking locally is heavily dependent on the surrounding geography and regional competition within Kent.
            </p>
            <p>
              <em>This is a local contextual expansion. For the full, comprehensive explanation, please see our primary guide: <Link href={`/guides/${guide.slug}`} className="text-brand-gold hover:underline">{guide.title}</Link>.</em>
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
              <h2 className="text-3xl font-bold text-white mb-6">Want to apply this to your {town.name} business?</h2>
              <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
                Stop guessing and start growing locally. We help trades and services effectively dominate the immediate {town.name} market share so you don't travel further than you need to.
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
