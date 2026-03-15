import { Search, TrendingUp, CheckSquare } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export default function ConsultationReassurance() {
  const steps = [
    {
      title: 'We Review Your Website',
      description: 'Before the call we quickly review your website structure, speed, and search visibility so the conversation is focused on real opportunities.',
      icon: <Search className="w-6 h-6 text-brand-gold" />
    },
    {
      title: 'We Identify Growth Opportunities',
      description: 'We explain what may be limiting your website\'s visibility or enquiries and highlight practical improvements.',
      icon: <TrendingUp className="w-6 h-6 text-brand-gold" />
    },
    {
      title: 'We Walk Through Recommendations',
      description: 'You\'ll leave the consultation with clear next steps and an understanding of how to improve your online presence.',
      icon: <CheckSquare className="w-6 h-6 text-brand-gold" />
    }
  ];

  return (
    <section className="py-20 bg-neutral-900 border-b border-neutral-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              What Happens After You Book
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Our consultations are designed to be practical and helpful. You'll leave the call with a clearer understanding of how your website and online presence could perform better.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="bg-black border border-neutral-800 rounded-2xl p-8 h-full flex flex-col hover:border-brand-gold/30 transition-colors group">
                <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 group-hover:bg-brand-gold/10 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm lg:text-base">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
