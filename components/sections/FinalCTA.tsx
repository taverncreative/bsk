import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
          Get in touch
        </p>
        <h2 className="font-display text-ink mb-6">Got a project in mind?</h2>
        <p className="text-lg text-ink-muted leading-relaxed mb-10 max-w-xl">
          Tell us what you do and what you need. We’ll come back with a plain answer, usually within a day.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-brand-gold hover:text-ink transition-colors"
        >
          Send a message
        </Link>
      </div>
    </section>
  );
}
