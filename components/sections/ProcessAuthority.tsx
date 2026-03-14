import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

interface ProcessAuthorityProps {
  headlineOverride?: string;
  descriptionOverride?: string;
  stepsOverride?: ProcessStep[];
}

const defaultSteps = [
  {
    num: '01',
    title: 'Discovery',
    description: 'We learn about your business, services and goals.',
  },
  {
    num: '02',
    title: 'Strategy',
    description: 'We plan the best structure for visibility, enquiries and growth.',
  },
  {
    num: '03',
    title: 'Build',
    description: 'Your website and systems are designed and developed.',
  },
  {
    num: '04',
    title: 'Launch',
    description: 'Your site goes live with strong technical and SEO foundations.',
  },
  {
    num: '05',
    title: 'Growth',
    description: 'We refine and optimise to improve performance over time.',
  },
];

export default function ProcessAuthority({ headlineOverride, descriptionOverride, stepsOverride }: ProcessAuthorityProps = {}) {
  const steps = stepsOverride && stepsOverride.length > 0 ? stepsOverride : defaultSteps;

  return (
    <section className="py-28 bg-black border-t border-neutral-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              {headlineOverride || 'How We Help Your Business Grow'}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {descriptionOverride || 'Our structured process turns websites into lead generation systems that attract, convert and scale enquiries.'}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-16 relative">
          
          {/* Subtle connecting line behind cards (Desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-[2px] bg-neutral-800 -z-10 mx-10" />

          {steps.map((step, index) => (
            <Reveal key={step.num} delay={index * 0.1}>
              <div 
                 className="bg-[#111111] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(201,162,89,0.5)] rounded-[18px] p-8 transition-all duration-400 ease-out hover:-translate-y-1 relative group h-full flex flex-col z-10 before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-[18px] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-400 before:shadow-[0_0_30px_rgba(201,162,89,0.3)]"
                 style={{
                   boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
                 }}
              >
                <div className="mb-6">
                  <span className="text-brand-gold font-extrabold text-4xl opacity-80 group-hover:opacity-100 transition-opacity">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="text-center bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-xl font-bold text-white mb-6">
              Ready to grow your business online?
            </p>
            <Button href="/contact">
              Book a Strategy Call
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
