import FAQAccordion from './FAQAccordion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
}

export default function FAQ({ faqs, title = "Frequently Asked Questions" }: FAQProps) {
  // Generate Google-friendly JSON-LD Schema dynamically on the server
  const faqSchema = {
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
  };

  return (
    <section className="py-28 bg-white">
      {/* Inject JSON-LD Schema directly into the component stream on the server side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>

        {/* Client-side Accordion Engine */}
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}
