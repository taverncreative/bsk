import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getGuideBySlug, getAllGuides } from '@/lib/queries';

type Props = {
  params: Promise<{
    guideSlug: string;
  }>;
};

// 1. Static Params Generation
export async function generateStaticParams() {
  const guides = await getAllGuides();
  return guides.map((g) => ({ guideSlug: g.slug }));
}

// 2. Metadata Generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guideSlug } = await params;
  const guide = await getGuideBySlug(guideSlug);

  if (!guide) {
    return { title: 'Not Found | Business Sorted Kent' };
  }

  return {
    title: `${guide.title} | Business Sorted Kent`,
    description: guide.excerpt || `Read our comprehensive guide on ${guide.title}.`,
    alternates: {
      canonical: `https://businesssortedkent.co.uk/guides/${guide.slug}`,
    },
  };
}

// 3. Simple TOC Extractor (assumes Markdown ## Headings)
function extractTableOfContents(content: string) {
  const matches = [...content.matchAll(/(?:^|\n)##\s+(.+)/g)];
  return matches.map((m, i) => ({
    id: `heading-${i}`,
    title: m[1].trim(),
  }));
}

// 4. Simple FAQ Extractor (assumes Markdown ### Questions followed by text)
// Adjust this regex based on how FAQs are specifically authored in your CMS.
function extractFAQs(content: string) {
  const faqs: { question: string; answer: string }[] = [];
  const matches = [...content.matchAll(/(?:^|\n)###\s+([^?]+\?)\n([^#]+)/g)];
  
  if (matches.length > 0) {
    matches.forEach((m) => {
      faqs.push({
        question: m[1].trim(),
        answer: m[2].trim(), // strips trailing whitespace but retains paragraphs
      });
    });
  }
  return faqs;
}

// 5. Page Component
export default async function GuidePage({ params }: Props) {
  const { guideSlug } = await params;
  
  const [guide, allGuides] = await Promise.all([
    getGuideBySlug(guideSlug),
    getAllGuides()
  ]);

  if (!guide) {
    notFound();
  }

  const toc = extractTableOfContents(guide.content);
  const faqs = extractFAQs(guide.content);
  
  // Find related guides based on shared tags
  const relatedGuides = allGuides
    .filter((g) => g.id !== guide.id)
    .filter((g) => {
      if (!g.tags || !guide.tags) return false;
      return g.tags.some((tag) => guide.tags!.includes(tag));
    })
    .slice(0, 3); // limit to 3

  return (
    <div className="bg-black pt-48 pb-24">
      {/* FAQ JSON-LD Schema (if FAQs are detected) */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": guide.title,
            "description": guide.excerpt || guide.title,
            "author": {
              "@type": "Organization",
              "name": guide.author || "Business Sorted"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Business Sorted Kent",
              "logo": {
                "@type": "ImageObject",
                "url": "https://businesssortedkent.co.uk/logo.png"
              }
            },
            "datePublished": guide.published_date || new Date().toISOString()
          })
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Hero */}
        <header className="max-w-4xl mx-auto text-center mb-16 border-b border-neutral-800 pb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8">
            {guide.title}
          </h1>
          <div className="flex items-center justify-center text-neutral-400 font-medium space-x-6">
          {guide.published_date && (
            <span className="mr-4">
              {new Date(guide.published_date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          )}
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-3"></span>
              By {guide.author || 'Business Sorted'}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Content Body */}
          <div className="lg:col-span-8">

            {/* Table of Contents */}
            {toc.length > 0 && (
              <nav className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-12 shadow-sm">
                <h2 className="text-xl font-bold text-white mb-6">Table of Contents</h2>
                <ul className="space-y-4">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-neutral-300 hover:text-brand-gold font-medium transition-colors flex items-center"
                      >
                        <svg className="w-4 h-4 mr-3 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Main Article Content */}
            <article className="prose prose-lg prose-invert max-w-none 
              prose-headings:font-bold prose-headings:text-white 
              prose-a:text-brand-gold hover:prose-a:text-yellow-400 prose-a:font-semibold
              prose-p:text-neutral-300 prose-p:leading-relaxed
              prose-li:text-neutral-300
              prose-strong:text-brand-gold
              mb-16"
            >
              {/* We use dangerouslySetInnerHTML here if the content is ready-to-render HTML. Assumes markdown/html is stored in the DB. */}
              <div dangerouslySetInnerHTML={{ __html: guide.content }} />
            </article>
          </div>

          {/* Sticky Sidebar Right */}
          <aside className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-8">
              
              {/* Related Services Sidebar Block */}
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

              {/* Related Guides Sidebar Block */}
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

      {/* Footer Area Reading Catch */}
      {relatedGuides.length > 0 && (
        <section className="border-t border-neutral-800 bg-black pt-24 pb-12 mt-12 w-full">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-extrabold text-white mb-8">Further Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGuides.map((rg) => (
                <Link
                  key={rg.id}
                  href={`/guides/${rg.slug}`}
                  className="group flex flex-col justify-between p-8 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-gold hover:shadow-[0_0_40px_rgba(214,173,103,0.15)] transition-all"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-gold mb-4 leading-snug transition-colors">
                      {rg.title}
                    </h3>
                    {rg.excerpt && (
                      <p className="text-neutral-400 line-clamp-3 text-sm leading-relaxed">
                        {rg.excerpt}
                      </p>
                    )}
                  </div>
                  <span className="mt-8 font-semibold text-white flex items-center group-hover:text-brand-gold text-sm transition-colors">
                    Read Guide
                    <svg className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
