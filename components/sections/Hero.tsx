import Link from 'next/link';
import Button from '@/components/ui/Button';

interface CTA {
  text: string;
  href: string;
}

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCTA: CTA;
  secondaryCTA?: CTA;
}

export default function Hero({ title, subtitle, primaryCTA, secondaryCTA }: HeroProps) {
  return (
    <section className="py-[100px] bg-section-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Copy & Calls to Action */}
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mt-6 leading-relaxed">
              {subtitle}
            </p>
            
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={primaryCTA.href}>
                {primaryCTA.text}
              </Button>
              
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="inline-flex items-center justify-center border-2 border-slate-900 text-slate-900 font-semibold rounded-lg px-6 py-3 hover:bg-slate-900 hover:text-white transition-colors"
                >
                  {secondaryCTA.text}
                </Link>
              )}
            </div>
          </div>

          {/* Right Side: Image Placeholder */}
          <div className="w-full aspect-video lg:aspect-square max-h-[500px] bg-slate-200 rounded-2xl border border-slate-300 shadow-inner flex items-center justify-center">
            {/* Replace this div with a Next Image when you have local assets */}
            <span className="text-slate-400 font-medium">Image Placeholder</span>
          </div>

        </div>
      </div>
    </section>
  );
}
