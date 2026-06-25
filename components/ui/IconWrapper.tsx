import React from 'react';

interface IconWrapperProps {
  icon: React.ElementType;
  className?: string;
}

export default function IconWrapper({ icon: Icon, className = '' }: IconWrapperProps) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <Icon className="w-6 h-6 text-brand-gold" />
    </span>
  );
}
