import Link from 'next/link';

export default function WebsiteReviewCTA() {
  return (
    <section className="bg-neutral-900 border-y border-neutral-800 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-black border border-neutral-800 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          {/* Subtle gold glow behind content */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="lg:w-2/3 text-center lg:text-left z-10 mb-8 lg:mb-0 lg:pr-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Is Your Website Losing Leads?
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
              Most local websites suffer from hidden performance issues and poor SEO that actively push customers to competitors. Get a <span className="text-white font-bold">Free Technical Website Review</span> to find out exactly what's holding your business back.
            </p>
          </div>
          
          <div className="lg:w-1/3 flex justify-center lg:justify-end z-10 w-full">
             <Link 
               href="/free-website-review"
               className="inline-flex w-full sm:w-auto items-center justify-center py-4 px-8 bg-brand-gold text-black font-extrabold text-lg rounded-xl hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(214,173,103,0.4)] transition-all duration-300 shadow-[0_0_15px_rgba(214,173,103,0.2)]"
             >
               Get Free Review
               <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
