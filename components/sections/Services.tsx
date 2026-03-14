import ServiceCard from '@/components/cards/ServiceCard';
import Reveal from '@/components/ui/Reveal';
import { Laptop, Search, MousePointerClick, Zap, Briefcase, TrendingUp, Printer } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  href: string;
  icon: any;
}

interface ServicesProps {
  headlineOverride?: string;
  descriptionOverride?: string;
  servicesOverride?: ServiceItem[];
}

const coreServices: ServiceItem[] = [
  {
    title: 'Website Design',
    description: 'Professional, modern websites that build trust and showcase your services.',
    href: '/web-design',
    icon: Laptop,
  },
  {
    title: 'SEO & Google Rankings',
    description: 'Dominate local search results and capture high-intent commercial traffic.',
    href: '/seo',
    icon: Search,
  },
  {
    title: 'Lead Capture Systems',
    description: 'Funnels and integrated systems engineered specifically to generate daily enquiries.',
    href: '/lead-capture',
    icon: MousePointerClick,
  },
  {
    title: 'Business Automation',
    description: 'Streamline operations, automate follow-ups, and manage leads without the manual work.',
    href: '/business-automation',
    icon: Zap,
  },
];

const supportingServices: ServiceItem[] = [
  {
    title: 'Logo & Branding',
    description: 'Professional brand identities that make your business stand out and build trust.',
    href: '/logo-branding',
    icon: Briefcase,
  },
  {
    title: 'Social Media Setup',
    description: 'Optimised social media profiles structured to attract and convert local clients.',
    href: '/social-media-setup',
    icon: TrendingUp,
  },
  {
    title: 'Workwear & Print',
    description: 'High-quality physical marketing materials matched to your brand identity.',
    href: '/workwear-print',
    icon: Printer,
  },
];

export default function Services({ headlineOverride, descriptionOverride, servicesOverride }: ServicesProps = {}) {
  const isOverride = servicesOverride && servicesOverride.length > 0;

  return (
    <section className="py-28 bg-neutral-50">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-black tracking-tight mb-4">
              {headlineOverride || 'Everything Your Business Needs To Grow Online'}
            </h2>
            <p className="text-lg text-neutral-500">
              {descriptionOverride || 'Professional solutions designed to help your business scale, dominate local search results, and streamline your entire process.'}
            </p>
          </div>
        </Reveal>

        {isOverride ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesOverride.map((service, index) => (
              <Reveal key={index} className="flex" delay={index * 0.08}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  icon={service.icon}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            <div>
              <Reveal>
                <h3 className="text-2xl font-bold text-black tracking-tight mb-8">Core Growth Services</h3>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreServices.map((service, index) => (
                  <Reveal key={index} className="flex" delay={index * 0.08}>
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      href={service.href}
                      icon={service.icon}
                    />
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal>
                <h3 className="text-xl font-bold text-neutral-500 uppercase tracking-wider mb-8">Supporting Services</h3>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportingServices.map((service, index) => (
                  <Reveal key={index} className="flex" delay={index * 0.08}>
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      href={service.href}
                      icon={service.icon}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
