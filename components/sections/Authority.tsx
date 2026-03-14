import { MessageSquare, LayoutDashboard, Layers, MapPin, Repeat } from 'lucide-react';
import IconWrapper from '@/components/ui/IconWrapper';
import Reveal from '@/components/ui/Reveal';

export default function Authority() {
  const credentials = [
    {
      title: 'Straightforward Advice',
      description: 'We keep everything simple and easy to understand.',
      icon: MessageSquare,
    },
    {
      title: 'Built For Results',
      description: 'Websites and systems designed to generate enquiries.',
      icon: LayoutDashboard,
    },
    {
      title: 'Complete Support',
      description: 'Branding, websites, SEO and automation in one place.',
      icon: Layers,
    },
    {
      title: 'Local Team',
      description: 'Based in Ashford and supporting businesses across Kent.',
      icon: MapPin,
    },
    {
      title: 'Flexible Projects',
      description: 'No complicated contracts or rigid retainers.',
      icon: Repeat,
    },
  ];

  return (
    <section className="py-28 bg-neutral-950">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Why Businesses Choose Business Sorted Kent
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Measurable, transparent digital growth without the agency fluff.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {credentials.map((cred, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div 
                className="group flex items-start gap-4 p-8 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-brand-gold hover:shadow-brand-glow transition-all duration-300 h-full"
              >
                <IconWrapper icon={cred.icon} glow />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{cred.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{cred.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
