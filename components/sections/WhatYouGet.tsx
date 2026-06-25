interface Specialism {
  num: string;
  title: string;
  body: string;
}

const specialisms: Specialism[] = [
  {
    num: '01',
    title: 'SEO from the start',
    body: 'Real ranking work. Local search, Google Business, technical fixes, schema, the lot.',
  },
  {
    num: '02',
    title: 'Built by a designer',
    body: 'Years of graphic design background. The site looks right because someone has actually looked at it.',
  },
  {
    num: '03',
    title: 'Mobile first',
    body: 'Built for phones first, not desktop shrunk. That is where most of your visitors arrive.',
  },
  {
    num: '04',
    title: 'Speed is the conversion',
    body: 'Sub-2-second loads. Lighthouse 95+. Indexed cleanly. Fast sites turn into enquiries.',
  },
];

export default function WhatYouGet() {
  return (
    <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
            Behind the £280
          </p>
          <h2 className="font-display text-ink mb-4">Not just a web designer.</h2>
          <p className="text-ink-muted leading-relaxed">
            Most ‘web design’ is one job. This is four.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
          {specialisms.map((item) => (
            <div key={item.num} className="bg-paper p-8 md:p-10">
              <p className="font-mono text-xs text-ink-faint mb-6">{item.num}</p>
              <h3 className="font-display text-2xl md:text-3xl text-ink mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-ink-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
