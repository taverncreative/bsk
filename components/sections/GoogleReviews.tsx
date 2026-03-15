import Link from 'next/link';
import { Star } from 'lucide-react';
import CTA from '@/components/sections/CTA';

interface GoogleReviewsProps {
  compact?: boolean;
}

const reviews = [
  {
    name: 'Sam Stewart',
    text: "This is the best business decision I have made in years. Has completely transformed my business within 2 months. My only regret is that I didn’t use John much earlier. I would recommend absolutely any business to contact John as I can assure you he will make improvements across the board to your online presence.",
  },
  {
    name: 'Ella Pearson',
    text: "These guys are the best of the best. I came to them with an idea and a vision and they managed to get exactly what I had in my head onto my website and make it look so professional and amazing. The attention to detail when designing was spot on.",
  },
  {
    name: 'Sandra Barrett',
    text: "Business Sorted Kent created a clean and professional website for my villa rental, which guests have often commented on. The whole process was easy, clear and efficient and very good value for money.",
  },
  {
    name: 'Joe Ward',
    text: "John and the team are nothing but consummate professionals. From the moment we discussed our needs right through to the final product, everything felt easy and professional. The designs received many compliments.",
  },
  {
    name: 'Tom Lawrie',
    text: "They took the time to understand my brand vision and the final logo exceeded my expectations. The communication was excellent and the process was seamless.",
  },
  {
    name: 'Nathan Green',
    text: "Great knowledgeable people with a genuine desire to support local small businesses. They have been absolutely vital to my business growth.",
  }
];

export default function GoogleReviews({ compact = false }: GoogleReviewsProps) {
  // If compact, only show 3 reviews to keep it shorter vertically
  const displayReviews = compact ? reviews.slice(0, 3) : reviews;

  return (
    <section className={`bg-neutral-950 border-y border-neutral-900 ${compact ? 'py-16' : 'py-24'}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Rating Summary */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-brand-gold text-brand-gold drop-shadow-[0_0_8px_rgba(214,173,103,0.5)]" />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-white tracking-tight">5.0</span>
            <span className="text-xl text-neutral-400 font-medium">average rating</span>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full border border-neutral-800">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-semibold text-neutral-300">Based on Google Reviews</span>
            </div>
            <a 
              href="https://www.google.com/search?q=business+sorted+kent&rlz=1C5CHFA_enGB995GB995&oq=b&gs_lcrp=EgZjaHJvbWUqCAgBEEUYJxg7MgYIABBFGDwyCAgBEEUYJxg7MhMIAhAuGIMBGMcBGLEDGNEDGIAEMgYIAxBFGDkyDAgEECMYJxiABBiKBTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDEyMzhqMGo0qAIDsAIB8QUoqVi3FBIepPEFKKlYtxQSHqQ&sourceid=chrome&ie=UTF-8#mpd=~4435002658084551851/customers/reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-bold text-brand-gold hover:text-yellow-400 hover:underline transition-colors"
            >
              Read More Reviews on Google &rarr;
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayReviews.map((review, idx) => (
            <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col h-full hover:border-brand-gold/30 hover:bg-neutral-900/90 transition-colors shadow-lg shadow-black/20">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <blockquote className="flex-1 text-neutral-300 leading-relaxed font-medium italic mb-8">
                "{review.text}"
              </blockquote>
              <div className="mt-auto border-t border-neutral-800 pt-6 flex items-center justify-between">
                <span className="font-bold text-white text-lg tracking-tight">{review.name}</span>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 grayscale opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {!compact && (
        <CTA 
          titleOverride="See How We Can Help Your Business" 
          paragraphOverride="Join the growing number of local businesses dominating their market." 
          buttonOverride="Get A Free Quote" 
        />
      )}
    </section>
  );
}
