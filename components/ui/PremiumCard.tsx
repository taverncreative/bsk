import Link from 'next/link';
import { ReactNode } from 'react';
import IconWrapper from '@/components/ui/IconWrapper';

interface PremiumCardProps {
  title?: string;
  description?: string;
  href?: string;
  icon?: React.ElementType;
  ctaText?: string;
  className?: string;
  children?: ReactNode;
}

export default function PremiumCard({
  title,
  description,
  href,
  icon: Icon,
  ctaText,
  className = '',
  children,
}: PremiumCardProps) {
  const content = (
    <div className="flex flex-col h-full">
      {Icon && <IconWrapper icon={Icon} className="mb-6" />}

      {title && (
        <h3 className="font-display text-2xl text-ink mb-3 leading-tight">{title}</h3>
      )}

      {description && (
        <p className="text-ink-muted leading-relaxed flex-grow">{description}</p>
      )}

      {children}

      {href && ctaText && (
        <div className="mt-6 flex items-center text-sm text-ink-muted group-hover:text-brand-gold transition-colors">
          {ctaText}
          <svg
            className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      )}
    </div>
  );

  const containerClasses = `group flex flex-col h-full bg-paper border border-paper-border p-8 transition-colors hover:bg-paper-raised ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {content}
      </Link>
    );
  }

  return <div className={containerClasses}>{content}</div>;
}
