import { Star, ArrowUpRight, CheckCircle, Briefcase, MapPin } from 'lucide-react';

export default function ProofBand() {
  const featuredReviews = [
    {
      name: 'Sam Stewart',
      text: "This is the best business decision I have made in years. It completely transformed my business within two months."
    },
    {
      name: 'Ella Pearson',
      text: "They took my idea and turned it into a professional website that perfectly matched my vision."
    }
  ];

  return (
    <section className="bg-neutral-950 border-b border-neutral-900 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-stretch">
          
          {/* ELEMENT 1: Google Rating Summary */}
          <div className="flex flex-col justify-center border border-neutral-800 bg-neutral-900 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-brand-gold text-brand-gold drop-shadow-[0_0_8px_rgba(214,173,103,0.5)]" />
              ))}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Rated 5 Stars by Local Businesses
            </h3>
            
            <p className="text-neutral-400 font-medium leading-relaxed mb-6">
              Based on verified Google reviews from clients across Kent.
            </p>
            
            <div className="mt-auto flex items-center gap-2 px-4 py-2 bg-black/50 rounded-full w-fit border border-neutral-800">
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-semibold text-neutral-200">Google Rating</span>
            </div>
          </div>

          {/* ELEMENT 2: Featured Review Quotes */}
          <div className="flex flex-col gap-4 justify-between h-full">
            {featuredReviews.map((review, idx) => (
              <div 
                key={idx} 
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col hover:border-brand-gold/30 transition-colors relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-neutral-300 font-medium italic text-base leading-relaxed mb-6">
                  "{review.text}"
                </blockquote>
                <div className="mt-auto border-t border-neutral-800 pt-4 flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{review.name}</span>
                  <CheckCircle className="w-4 h-4 text-green-500 opacity-80" />
                </div>
              </div>
            ))}
          </div>

          {/* ELEMENT 3: Credibility Statistics */}
          <div className="grid grid-rows-3 gap-4 h-full">
             <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-center justify-between hover:border-brand-gold/30 transition-colors">
               <div>
                 <p className="text-3xl font-extrabold tracking-tight text-white mb-1"><span className="text-brand-gold">50+</span></p>
                 <p className="text-sm font-semibold text-neutral-400">Local Businesses Supported</p>
               </div>
               <Briefcase className="w-8 h-8 text-neutral-700" />
             </div>
             
             <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-center justify-between hover:border-brand-gold/30 transition-colors">
               <div>
                 <p className="text-3xl font-extrabold tracking-tight text-white mb-1"><span className="text-brand-gold">5★ Rated</span></p>
                 <p className="text-sm font-semibold text-neutral-400">On Google Reviews</p>
               </div>
               <Star className="w-8 h-8 text-neutral-700" />
             </div>
             
             <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-center justify-between hover:border-brand-gold/30 transition-colors">
               <div>
                 <p className="text-3xl font-extrabold tracking-tight text-white mb-1"><span className="text-brand-gold">Kent Based</span></p>
                 <p className="text-sm font-semibold text-neutral-400">Serving Businesses Across The County</p>
               </div>
               <MapPin className="w-8 h-8 text-neutral-700" />
             </div>
          </div>

        </div>

        {/* Subtle CTA at the bottom */}
        <div className="mt-12 text-center">
           <p className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">
             See why businesses across Kent trust Business Sorted Kent
           </p>
        </div>
      </div>
    </section>
  );
}
