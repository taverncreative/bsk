import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import LocalServiceHero from '@/components/sections/LocalServiceHero';
import CTA from '@/components/sections/CTA';
import ScrollFadeIn from '@/components/ui/ScrollFadeIn';

interface BaseEntity {
  name: string;
  slug: string;
}

interface CaseStudyPageProps {
  title: string;
  industry: string;
  service: BaseEntity;
  town: BaseEntity;
  summary: string;
  solution?: string;
  outcome?: string;
  results: string[];
  content?: string;
  businessName?: string;
  websiteUrl?: string;
  websiteNote?: string;
}

function stripUrl(url: string) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

function describeUrl(url: string): { label: string; short: string } {
  const lower = url.toLowerCase();
  if (lower.includes('instagram.com')) {
    return { label: 'View on Instagram', short: 'Instagram' };
  }
  if (lower.includes('facebook.com')) {
    return { label: 'View on Facebook', short: 'Facebook' };
  }
  if (lower.includes('linkedin.com')) {
    return { label: 'View on LinkedIn', short: 'LinkedIn' };
  }
  if (lower.includes('wixsite.com') || lower.includes('myshopify.com')) {
    return { label: 'View the original build', short: 'Original build' };
  }
  const stripped = stripUrl(url);
  return { label: `Visit ${stripped}`, short: stripped };
}

export default function CaseStudyPage({
  title,
  industry,
  service,
  town,
  summary,
  solution,
  outcome,
  results,
  content,
  businessName,
  websiteUrl,
  websiteNote,
}: CaseStudyPageProps) {
  const safeTown = town.name || 'Kent';
  const safeIndustry = industry || 'Local business';
  const safeService = service.name || 'Digital services';
  const displayName = businessName || title;

  return (
    <>
      <LocalServiceHero
        title={displayName}
        subtitle={
          businessName
            ? `${safeIndustry} · ${safeTown}.  How we helped ${businessName} with ${safeService.toLowerCase()}.`
            : `${safeIndustry} · ${safeTown}.  How we helped a local business with ${safeService.toLowerCase()}.`
        }
        primaryCTA={{ text: 'Get in touch', href: '/contact' }}
        secondaryCTA={
          websiteUrl
            ? { text: describeUrl(websiteUrl).label, href: websiteUrl }
            : { text: 'See more work', href: '/case-studies' }
        }
      />

      {/* Facts band — dark navy strip for visual rhythm */}
      <section className="bg-ink text-paper border-t border-white/10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 mb-2">
                Industry
              </p>
              <p className="font-display text-base md:text-lg lg:text-xl text-paper leading-snug break-words">
                {safeIndustry}
              </p>
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 mb-2">
                Location
              </p>
              <p className="font-display text-base md:text-lg lg:text-xl text-paper leading-snug break-words">
                {safeTown}
              </p>
            </div>
            <div className="col-span-2 md:col-span-1 min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 mb-2">
                Services
              </p>
              <p className="font-display text-base md:text-lg lg:text-xl text-paper leading-snug break-words">
                {safeService}
              </p>
            </div>
            <div className="col-span-2 md:col-span-1 min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 mb-2">
                Website
              </p>
              {websiteUrl ? (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-base md:text-lg lg:text-xl text-paper hover:text-brand-gold leading-snug inline-flex items-center gap-2 group transition-colors min-w-0 max-w-full"
                >
                  <span className="truncate">{describeUrl(websiteUrl).short}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <p className="font-display text-base md:text-lg lg:text-xl text-paper/40 leading-snug italic">
                  Private build
                </p>
              )}
              {websiteNote && (
                <p className="text-xs text-paper/50 mt-2 leading-relaxed max-w-xs">
                  {websiteNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT — either rich DB content, or the structured challenge/solution/outcome */}
      {content ? (
        <section className="py-20 md:py-28 bg-paper border-t border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <article
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:font-semibold prose-headings:text-ink prose-headings:tracking-tight
                prose-a:text-ink prose-a:font-medium prose-a:no-underline prose-a:border-b-2 prose-a:border-brand-gold/40 hover:prose-a:border-brand-gold hover:prose-a:text-brand-gold prose-a:transition-colors
                prose-p:text-ink prose-p:leading-relaxed
                prose-li:text-ink prose-li:marker:text-ink-faint
                prose-strong:text-ink prose-strong:font-semibold
                prose-blockquote:text-ink-muted prose-blockquote:border-brand-gold"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>
      ) : (
        <>
          {/* Challenge — paper */}
          {summary && (
            <section className="py-20 md:py-28 bg-paper border-t border-paper-border">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <ScrollFadeIn>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                    The brief
                  </p>
                  <h2 className="font-display text-ink mb-8">What they needed.</h2>
                  <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
                    {summary}
                  </p>
                </ScrollFadeIn>
              </div>
            </section>
          )}

          {/* Solution — paper-raised */}
          {solution && (
            <section className="py-20 md:py-28 bg-paper-raised border-t border-paper-border">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <ScrollFadeIn>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                    What we did
                  </p>
                  <h2 className="font-display text-ink mb-8">The build, in plain English.</h2>
                  <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
                    {solution}
                  </p>
                </ScrollFadeIn>
              </div>
            </section>
          )}
        </>
      )}

      {/* Results — dark navy panel with big stats */}
      {(outcome || (results && results.length > 0)) && (
        <section className="py-20 md:py-28 bg-ink border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <ScrollFadeIn>
              <div className="mb-12 md:mb-16 max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50 mb-4">
                  The outcome
                </p>
                <h2 className="font-display text-paper mb-6">What changed.</h2>
                {outcome && (
                  <p className="text-lg md:text-xl text-paper/70 leading-relaxed">{outcome}</p>
                )}
              </div>
            </ScrollFadeIn>

            {results && results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
                {results.slice(0, 3).map((result, i) => (
                  <ScrollFadeIn key={i} delay={i * 80}>
                    <div className="bg-ink p-8 md:p-10 h-full">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/40 mb-6">
                        0{i + 1}
                      </p>
                      <p className="font-display text-paper text-xl md:text-2xl leading-tight">
                        {result}
                      </p>
                    </div>
                  </ScrollFadeIn>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA — paper with proper contrast (no light-text-on-dark issue) */}
      <CTA
        titleOverride="Want a result like that?"
        paragraphOverride={`Tell us what you do and what you need. We will come back with a plain answer, usually within a day.`}
        buttonOverride="Send a message"
      />
    </>
  );
}
