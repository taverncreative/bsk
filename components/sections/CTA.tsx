import MagneticButton from '@/components/ui/MagneticButton';
import Reveal from '@/components/ui/Reveal';

interface CTAProps {
  titleOverride?: string;
  paragraphOverride?: string;
  buttonOverride?: string;
}

export default function CTA({ titleOverride, paragraphOverride, buttonOverride }: CTAProps) {
  return (
    <section className="py-28 bg-black flex items-center justify-center border-t border-neutral-900 mt-0">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <Reveal>
          <h2 className="text-5xl font-bold tracking-tight mb-8 text-white">
            {titleOverride || "Ready to Get Your Business Sorted?"}
          </h2>
          
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            {paragraphOverride || "Speak to our team about building a website, ranking on Google, and generating more enquiries."}
          </p>
          
          <div className="flex justify-center">
            <MagneticButton href="/contact" className="text-lg px-8 md:px-10 py-4">
              {buttonOverride || "Get A Free Quote"}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
