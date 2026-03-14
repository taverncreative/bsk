import PremiumCard from '@/components/ui/PremiumCard';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ElementType;
}

export default function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
  return (
    <PremiumCard
      title={title}
      description={description}
      href={href}
      icon={icon}
      ctaText="Read More"
    />
  );
}
