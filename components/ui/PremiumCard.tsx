import { ReactNode } from 'react';
import IconWrapper from '@/components/ui/IconWrapper';
import MotionCardWrapper from '@/components/ui/MotionCardWrapper';

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
  className = "",
  children
}: PremiumCardProps) {
  const CardContent = (
    <>
      {/* Subtle gold highlight overlay micro-interaction */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none z-0"
        style={{ 
          background: 'radial-gradient(circle at top right, rgba(214,173,103,0.15), transparent 60%)' 
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        {Icon && (
          <IconWrapper icon={Icon} className="mb-6" />
        )}

        <div className="space-y-4 flex flex-col flex-grow">
          {title && (
            <h3 className="text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-neutral-400 leading-relaxed flex-grow">
              {description}
            </p>
          )}

          {children}
          
          {href && ctaText && (
            <div className="mt-auto flex items-center text-sm font-semibold text-white group-hover:text-brand-gold transition-colors pt-4">
              {ctaText}
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
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
      </div>
    </>
  );

  const containerClasses = `group relative overflow-hidden flex flex-col h-full bg-[#111111] rounded-xl p-10 hover:border-brand-gold transition-all duration-300 ${className}`.trim();

  return (
    <MotionCardWrapper 
       href={href} 
       className={containerClasses}
       style={{
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 10px 40px rgba(0,0,0,0.6)'
       }}
    >
      {CardContent}
    </MotionCardWrapper>
  );
}
