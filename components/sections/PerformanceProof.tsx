import ScrollFadeIn from '@/components/ui/ScrollFadeIn';

interface Stat {
  stat: string;
  unit?: string;
  label: string;
  body: string;
}

const stats: Stat[] = [
  {
    stat: '<2',
    unit: 'second loads',
    label: 'Page speed',
    body:
      'Every site we ship hits sub-2-second loads on a mid-range phone over 4G. Images compressed, fonts loaded properly, code-split where it matters.',
  },
  {
    stat: '95+',
    unit: 'Lighthouse score',
    label: 'Core Web Vitals',
    body:
      'Lighthouse 95+ across performance, accessibility, best practices and SEO. The same scorecard Google uses when deciding who to rank.',
  },
  {
    stat: '100%',
    unit: 'indexable from launch',
    label: 'SEO structure',
    body:
      'Sitemap submitted, robots.txt configured, structured data set up, canonical tags in place. Google can find every page from day one.',
  },
  {
    stat: 'GEO',
    unit: 'optimised',
    label: 'LLM / AI search',
    body:
      'Built for the search engines reshaping the rules: ChatGPT, Perplexity, Google AI Overviews. Clear answers, authority signals, structured data.',
  },
];

export default function PerformanceProof() {
  return (
    <section className="py-24 md:py-32 bg-ink text-paper border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50 mb-4">
            Built to perform
          </p>
          <h2 className="font-display text-paper mb-4">
            The boring foundations, done properly.
          </h2>
          <p className="text-paper/70 leading-relaxed">
            Headline outcomes are nice. They’re the result of the technical work nobody sees. Every
            site and SEO project we ship hits the same standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {stats.map((s, i) => (
            <ScrollFadeIn key={s.label} delay={i * 80}>
              <div className="bg-ink p-8 md:p-10 h-full flex flex-col">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 mb-6">
                  {s.label}
                </p>
                <p
                  className="font-mono text-brand-gold leading-none mb-2"
                  style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
                >
                  {s.stat}
                </p>
                {s.unit && (
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-paper/50 mb-6">
                    {s.unit}
                  </p>
                )}
                <p className="text-sm text-paper/70 leading-relaxed">{s.body}</p>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
