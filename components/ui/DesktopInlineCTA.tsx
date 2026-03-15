import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

interface DesktopInlineCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function DesktopInlineCTA({
  title = "Ready To Improve Your Digital Presence?",
  description = "Stop losing enquiries to competitors. Let's discuss how a structured approach can turn your website into a reliable lead machine.",
  buttonText = "Website Review",
  buttonLink = "/contact"
}: DesktopInlineCTAProps) {
  return (
    <div className="hidden md:block py-16 w-full bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal>
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/10 to-transparent mix-blend-screen pointer-events-none" />
            <div className="flex-1 text-left relative z-10">
              <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4">
                {title}
              </h3>
              <p className="text-lg text-neutral-400 max-w-xl">
                {description}
              </p>
            </div>
            <div className="flex-shrink-0 relative z-10 flex gap-4">
              <Link 
                href={buttonLink}
                className="px-8 py-4 bg-brand-gold text-black font-extrabold rounded-xl shadow-[0_0_20px_rgba(214,173,103,0.3)] hover:scale-105 active:scale-95 transition-all outline-none"
              >
                {buttonText}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
