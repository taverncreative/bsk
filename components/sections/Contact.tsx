import QuoteForm from '@/components/forms/QuoteForm';

export default function Contact() {
  return (
    <section id="quote" className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="text-left">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
              Get in touch
            </p>
            <h2 className="font-display text-ink mb-6">Got a project in mind?</h2>
            <p className="text-lg text-ink-muted leading-relaxed mb-10 max-w-lg">
              Tell us what you do and what you need. We’ll come back with a plain answer, usually within a day.
            </p>

            <div className="hidden lg:block border-t border-paper-border pt-8 max-w-md">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mb-3">
                Email
              </p>
              <a
                href="mailto:hello@businesssortedkent.co.uk"
                className="text-ink font-medium hover:text-brand-gold transition-colors"
              >
                hello@businesssortedkent.co.uk
              </a>
            </div>
          </div>

          <div className="w-full">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
