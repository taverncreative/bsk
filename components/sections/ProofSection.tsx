export default function ProofSection() {
  return (
    <section className="py-28 bg-paper border-y border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-ink tracking-tight mb-4">
            Proven results. No agency fluff.
          </h2>
          <p className="text-lg text-ink-muted">
            We let our numbers do the talking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-8 rounded-xl bg-paper-raised border border-paper-border shadow-lg">
            <span className="block text-6xl font-extrabold text-brand-gold mb-4">500+</span>
            <span className="text-ink-muted font-medium uppercase tracking-widest text-sm">Businesses Ranked</span>
          </div>
          <div className="text-center p-8 rounded-xl bg-paper-raised border border-paper-border shadow-lg">
            <span className="block text-6xl font-extrabold text-brand-gold mb-4">10k+</span>
            <span className="text-ink-muted font-medium uppercase tracking-widest text-sm">Leads Generated</span>
          </div>
          <div className="text-center p-8 rounded-xl bg-paper-raised border border-paper-border shadow-lg">
            <span className="block text-6xl font-extrabold text-brand-gold mb-4">15+</span>
            <span className="text-ink-muted font-medium uppercase tracking-widest text-sm">Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
