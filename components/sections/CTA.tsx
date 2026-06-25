import Link from 'next/link';

interface CTAProps {
  titleOverride?: string;
  paragraphOverride?: string;
  buttonOverride?: string;
  /**
   * Override the default /contact destination. Use to deep-link with query
   * params so the contact form knows what context the visitor arrived from
   * (e.g. '/contact?service=seo&intent=audit' from the SEO audit CTA).
   */
  hrefOverride?: string;
}

export default function CTA({ titleOverride, paragraphOverride, buttonOverride, hrefOverride }: CTAProps) {
  return (
    <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
          Get in touch
        </p>
        <h2 className="font-display text-ink mb-6">
          {titleOverride || 'Got a project in mind?'}
        </h2>
        <p className="text-lg text-ink-muted leading-relaxed mb-10 max-w-xl">
          {paragraphOverride ||
            'Tell us what you do and what you need. We’ll come back with a plain answer, usually within a day.'}
        </p>
        <Link
          href={hrefOverride || '/contact'}
          className="inline-flex items-center bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-brand-gold hover:text-ink transition-colors"
        >
          {buttonOverride || 'Send a message'}
        </Link>
      </div>
    </section>
  );
}
