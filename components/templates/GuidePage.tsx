import Link from 'next/link';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import Button from '@/components/ui/Button';
import LeadMagnet from '@/components/sections/LeadMagnet';
import KentCoverage from '@/components/sections/KentCoverage';
import { leadMagnets } from '@/lib/content/leadMagnets';
import { injectContextualLinks } from '@/lib/contextual-linker';

interface BaseEntity {
  name: string;
  slug: string;
}

interface GuidePageProps {
  title: string;
  content: string;
  relatedServices?: BaseEntity[];
}

// Minimal regex helper to parse headings & append anchors for pure HTML payloads
function processContentAndExtractTOC(html: string) {
  const headings: { level: number; text: string; id: string }[] = [];
  
  const modifiedHtml = html.replace(
    /<h([2-3])(?:[^>]*)>(.*?)<\/h\1>/gi,
    (match: string, levelStr: string, textContent: string) => {
      // Strip any nested tags if they exist within the heading
      const cleanText = textContent.replace(/<[^>]+>/g, '').trim();
      const id = cleanText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
        
      headings.push({
        level: parseInt(levelStr, 10),
        text: cleanText,
        id,
      });
      
      // Re-inject the heading with the new ID attribute
      return `<h${levelStr} id="${id}" class="scroll-mt-24">${textContent}</h${levelStr}>`;
    }
  );

  return { modifiedHtml, headings };
}

export default function GuidePage({ title, content }: GuidePageProps) {
  const { modifiedHtml, headings } = processContentAndExtractTOC(content);

  // Middle-of-article interception logic
  let part1 = modifiedHtml;
  let part2 = '';
  
  // Find the exact split point (e.g., right before the 3rd primary section header)
  const splitHeading = headings.length >= 3 ? headings[2] : (headings.length >= 2 ? headings[1] : null);
  if (splitHeading) {
    const splitMarker = `<h${splitHeading.level} id="${splitHeading.id}"`;
    const splitIndex = modifiedHtml.indexOf(splitMarker);
    if (splitIndex !== -1) {
      part1 = modifiedHtml.substring(0, splitIndex);
      part2 = modifiedHtml.substring(splitIndex);
    }
  }

  // Inject deep linked contextual links (3-6 max limit per article)
  part1 = injectContextualLinks(part1);
  if (part2) {
    part2 = injectContextualLinks(part2);
  }

  const websiteCostGuide = leadMagnets.find(lm => lm.title === 'Website Cost Guide') || leadMagnets[1];

  return (
    <>
      {/* SECTION 1: HERO */}
      <LocalServiceHero
        title={title}
        subtitle="Practical advice for growing your business online."
        primaryCTA={{
          text: 'Get A Free Quote',
          href: '/contact',
        }}
        secondaryCTA={{
          text: 'View Services',
          href: '/services',
        }}
      />

      {/* SECTION 2: ARTICLE BODY & TOC */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Main Content Column */}
            <article className="flex-1 order-2 md:order-1">
              {headings.length > 0 && (
                <div className="md:hidden bg-slate-50 border border-slate-200 rounded-xl p-6 mb-12">
                  <h3 className="font-bold text-slate-900 mb-4 text-lg">Table of Contents</h3>
                  <ul className="space-y-3">
                    {headings.map((heading, i) => (
                      <li key={i} className={`${heading.level === 3 ? 'ml-4' : ''}`}>
                        <a 
                          href={`#${heading.id}`}
                          className="text-brand hover:text-slate-900 transition-colors duration-200"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div 
                className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-a:text-brand hover:prose-a:text-black transition-colors prose-img:rounded-xl prose-img:shadow-sm"
                dangerouslySetInnerHTML={{ __html: part1 }}
              />

              {part2 && (
                <>
                  <div className="my-16 not-prose">
                    <LeadMagnet
                      title={websiteCostGuide.title}
                      description={websiteCostGuide.description}
                      downloadFile={websiteCostGuide.download}
                    />
                  </div>
                  <div 
                    className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-a:text-brand hover:prose-a:text-black transition-colors prose-img:rounded-xl prose-img:shadow-sm"
                    dangerouslySetInnerHTML={{ __html: part2 }}
                  />
                </>
              )}
            </article>

            {/* Desktop Sticky TOC Sidebar */}
            {headings.length > 0 && (
              <aside className="hidden md:block w-72 flex-shrink-0 order-1 md:order-2">
                <div className="sticky top-32 bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4 text-lg">On this page</h3>
                  <ul className="space-y-3 text-sm">
                    {headings.map((heading, i) => (
                      <li key={i} className={`${heading.level === 3 ? 'ml-4 text-slate-500' : 'text-slate-700 font-medium'}`}>
                        <a 
                          href={`#${heading.id}`}
                          className="hover:text-brand transition-colors duration-200"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: RELATED SERVICES */}
      <section className="py-24 section-light border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Related Services
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Implement these strategies natively inside your business with our tailored operational packages.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Web Design', slug: 'web-design' },
              { name: 'SEO', slug: 'seo' },
              { name: 'Business Automation', slug: 'business-automation' },
            ].map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="group flex flex-col p-8 bg-white border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand transition-colors">{service.name}</h3>
                <div className="mt-auto flex items-center font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  View Service
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: KENT COVERAGE */}
      <KentCoverage pageType={title} />

      {/* SECTION 5: FINAL CTA */}
      <section className="section-dark py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
            Ready to Grow Your Business Online?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            Speak to our team about putting this advice into practice. Let's get started today.
          </p>
          <div className="flex justify-center">
            <Button href="/contact" className="text-lg px-10 py-4 shadow-lg">
              Get A Free Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
