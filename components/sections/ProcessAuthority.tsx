import Reveal from '@/components/ui/Reveal';

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

const defaultSteps: ProcessStep[] = [
  {
    num: '01',
    title: 'A proper chat',
    description: 'We sit down and find out what you actually do, who you do it for, and what you’re sick of.',
  },
  {
    num: '02',
    title: 'A plan you can read',
    description: 'No 30-page deck. A short, plain summary of what we’ll build and what it’ll do for you.',
  },
  {
    num: '03',
    title: 'We build it',
    description: 'Your website, your Google presence, your forms and your follow-ups. Live in 2–4 weeks.',
  },
  {
    num: '04',
    title: 'We keep it sharp',
    description: 'Once it’s live, we keep it running, watch what works, and fix what doesn’t.',
  },
];

export default function ProcessAuthority({
  headlineOverride,
  descriptionOverride,
  stepsOverride,
}: ProcessAuthorityProps = {}) {
  const steps = stepsOverride && stepsOverride.length > 0 ? stepsOverride : defaultSteps;

  return (
    <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <Reveal>
          <div className="mb-14 md:mb-20 max-w-2xl">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-ink-muted mb-4">
              How we work
            </p>
            <h2 className="font-display text-ink mb-4">
              {headlineOverride || 'Four steps. No drama.'}
            </h2>
            {descriptionOverride && (
              <p className="text-ink-muted leading-relaxed">{descriptionOverride}</p>
            )}
          </div>
        </Reveal>

        <ol className="divide-y divide-paper-border border-y border-paper-border">
          {steps.map((step, index) => (
            <Reveal key={step.num} delay={index * 0.05}>
              <li className="grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-8 md:py-10">
                <div className="font-display text-3xl md:text-5xl text-ink-faint leading-none">
                  {step.num}
                </div>
                <div className="max-w-2xl">
                  <h3 className="font-display text-2xl md:text-3xl text-ink mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-ink-muted leading-relaxed">{step.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
