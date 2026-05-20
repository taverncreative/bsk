import FAQAccordion from './FAQAccordion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
}

export default function FAQ({ faqs, title = 'Frequently asked questions' }: FAQProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
            FAQ
          </p>
          <h2 className="font-display text-ink">{title}</h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}
