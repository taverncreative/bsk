interface LocalRelevanceSectionProps {
  town?: string;
}

export default function LocalRelevanceSection({ town = 'Kent' }: LocalRelevanceSectionProps) {
  // Format the town name: capitalize first letter, handle hyphens if necessary
  const formattedTown = town.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <section className="py-28 bg-white border-t border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-8">
            Helping businesses in <span className="text-brand-gold">{formattedTown}</span> grow online.
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed mb-8">
            Whether you are a local tradesperson, a professional service, or a growing agency in {formattedTown}, our targeted digital strategies are designed to capture your exact local market. We understand the local competition and how to make your business stand out.
          </p>
          <div className="prose prose-lg text-slate-700 text-left mx-auto">
            <p>
              Many businesses struggle to break through the noise of local search results because their websites aren't optimized for explicit geographic intent. When a customer in {formattedTown} searches for your services, Google looks for distinct trust signals: lightning-fast load times, clear service hierarchies, and authoritative local citations.
            </p>
            <p>
              Our process is engineered to address these exact ranking factors. We don't just build brochure websites; we build technical assets designed to intercept commercial search volume. By structuring your entire digital footprint around high-intent keywords, we ensure your business surfaces securely at the exact moment potential clients are ready to buy.
            </p>
            <p>
              Once that traffic lands on your site, our architecture leverages proven conversion rate optimization (CRO) principles—clear calls to action, automated CRM routing, and frictionless contact forms—ensuring that those leads convert into actual revenue rather than bouncing to your {formattedTown} competitors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
