import React from 'react';

interface IconWrapperProps {
  icon: React.ElementType;
  glow?: boolean;
  className?: string;
}

export default function IconWrapper({ icon: Icon, glow = false, className = '' }: IconWrapperProps) {
  return (
    <div 
      className={`icon-container shrink-0 w-12 h-12 min-w-12 min-h-12 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1f1f1f] ${className}`}
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px',
        boxShadow: glow ? '0 6px 18px rgba(0,0,0,0.5), 0 0 25px rgba(214,173,103,0.25)' : '0 6px 18px rgba(0,0,0,0.5)'
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .group:hover .icon-container {
          border-color: rgba(201,162,89,0.3) !important;
        }
      `}} />
      <Icon className="w-5 h-5 text-brand-gold transform transition-transform duration-[250ms] group-hover:rotate-6" />
    </div>
  );
}
