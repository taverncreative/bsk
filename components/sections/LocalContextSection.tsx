import Reveal from '@/components/ui/Reveal';

interface LocalContextSectionProps {
  townName: string;
  townIntro?: string | null;
}

export default function LocalContextSection({ townName, townIntro }: LocalContextSectionProps) {
  if (!townIntro) return null;

  return (
    <section className="py-28 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-black tracking-tight mb-6">
              Doing Business in {townName}
            </h2>
            <div className="text-lg text-neutral-600 leading-relaxed prose prose-lg prose-neutral max-w-none">
              <p>{townIntro}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
