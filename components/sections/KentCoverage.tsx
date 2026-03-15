import Link from 'next/link';

interface KentCoverageProps {
  pageType: string;
}

const townsList = [
  { name: 'Ashford', slug: 'ashford' },
  { name: 'Canterbury', slug: 'canterbury' },
  { name: 'Maidstone', slug: 'maidstone' },
  { name: 'Folkestone', slug: 'folkestone' },
  { name: 'Dover', slug: 'dover' },
  { name: 'Margate', slug: 'margate' },
  { name: 'Ramsgate', slug: 'ramsgate' },
  { name: 'Broadstairs', slug: 'broadstairs' },
  { name: 'Sevenoaks', slug: 'sevenoaks' },
  { name: 'Tunbridge Wells', slug: 'tunbridge-wells' },
  { name: 'Tonbridge', slug: 'tonbridge' },
  { name: 'Dartford', slug: 'dartford' },
  { name: 'Gravesend', slug: 'gravesend' },
  { name: 'Sittingbourne', slug: 'sittingbourne' },
  { name: 'Faversham', slug: 'faversham' }
];

export default function KentCoverage({ pageType }: KentCoverageProps) {
  // Deterministic seed based on pageType
  const seed = pageType.length + pageType.charCodeAt(0) + pageType.charCodeAt(pageType.length - 1);
  
  // pick 6-8 towns deterministically
  const startIndex = seed % townsList.length;
  const numTowns = 6 + (seed % 3); // 6 to 8
  
  const selectedTowns = [];
  for (let i = 0; i < numTowns; i++) {
    selectedTowns.push(townsList[(startIndex + i) % townsList.length]);
  }
  
  // Decide which 2-3 to link (e.g. first 2)
  const linksCount = 2 + (seed % 2); // 2 or 3
  
  // Intros
  const intros = [
    "Businesses across Kent rely on strong websites and online visibility to attract customers.",
    "A professional online presence is essential for service businesses operating throughout Kent.",
    "From local trades to growing companies, businesses across Kent need robust digital systems.",
    "Standing out in local search results is a priority for companies and service providers across Kent.",
    "A reliable online strategy helps Kent businesses generate consistent enquiries and manage growth."
  ];
  
  const outros = [
    "helping them build professional websites and improve their visibility on Google.",
    "ensuring they can attract local customers and streamline their daily operations.",
    "providing the digital infrastructure needed to stand out in competitive local markets.",
    "delivering websites and systems designed to turn online searches into real enquiries.",
    "supporting their growth with modern web design and effective local search strategies."
  ];

  const intro = intros[seed % intros.length];
  const outro = outros[(seed + 1) % outros.length];

  return (
    <section className="py-12 bg-black border-t border-neutral-900">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed tracking-wide font-medium">
          {intro} We support businesses in towns such as{' '}
          {selectedTowns.map((town, idx) => {
            const isLast = idx === selectedTowns.length - 1;
            const isPenultimate = idx === selectedTowns.length - 2;
            const shouldLink = idx < linksCount;
            
            let separator = ", ";
            if (isLast) separator = "";
            if (isPenultimate) separator = " and ";
            
            const content = shouldLink ? (
              <Link href={`/towns/${town.slug}`} className="text-brand-gold hover:text-brand-gold/80 transition-colors underline underline-offset-4 decoration-brand-gold/30">
                {town.name}
              </Link>
            ) : town.name;

            return (
              <span key={town.slug}>
                {content}{separator}
              </span>
            );
          })}, {outro}
        </p>
      </div>
    </section>
  );
}
