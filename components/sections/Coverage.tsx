import Link from 'next/link';

export default function Coverage() {
  const towns = [
    { name: 'Ashford', slug: 'ashford' },
    { name: 'Canterbury', slug: 'canterbury' },
    { name: 'Maidstone', slug: 'maidstone' },
    { name: 'Folkestone', slug: 'folkestone' },
    { name: 'Tunbridge Wells', slug: 'tunbridge-wells' },
  ];

  return (
    <section className="py-24 section-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Helping Businesses Across Kent
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We provide targeted digital growth services to trades and professionals in key strategic locations across the county.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {towns.map((town) => (
            <Link
              key={town.slug}
              href={`/towns/${town.slug}`}
              className="flex items-center justify-center p-6 bg-white border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-lg font-bold text-slate-800 group-hover:text-brand transition-colors">
                {town.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
