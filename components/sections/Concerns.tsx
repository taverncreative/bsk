interface Concern {
  question: string;
  answer: string;
}

const concerns: Concern[] = [
  {
    question: 'Won’t it look like every other AI-built site?',
    answer:
      'Generic AI sites all look the same because no one made design decisions. The prompt ran and whatever came out was the site. We use AI as the tool. The design decisions still come from years of graphic design background. The case studies are the proof: each site looks like that business, not like a template.',
  },
  {
    question: 'Is the code any good under the hood?',
    answer:
      'Yes. The code is hand-checked Next.js with real React components, properly structured. AI accelerates the writing, it doesn’t get the final word. Lighthouse 95+, sub-2-second loads, indexed cleanly. The same standards any professionally built site would ship with.',
  },
  {
    question: 'What if I need e-commerce, or something custom?',
    answer:
      'A classic small-business website covers: homepage, services, about, contact, a couple of supporting pages. E-commerce with a product catalogue, booking systems, member areas or anything custom is priced to your project. Tell us what you need and we’ll quote it properly.',
  },
];

export default function Concerns() {
  return (
    <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
            Things worth knowing
          </p>
          <h2 className="font-display text-ink">FAQs</h2>
        </div>

        <div className="divide-y divide-paper-border border-y border-paper-border">
          {concerns.map((concern, index) => (
            <div
              key={concern.question}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-8 md:py-10"
            >
              <div className="font-mono text-xs text-ink-faint pt-2">
                0{index + 1}
              </div>
              <div className="max-w-3xl">
                <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                  {concern.question}
                </h3>
                <p className="text-ink-muted leading-relaxed">{concern.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
