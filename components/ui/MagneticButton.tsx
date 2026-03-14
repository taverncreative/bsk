'use client';

import { useRef, useState } from 'react';
import { m, LazyMotion, domAnimation, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, href, className = '', onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center of the button
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Map proportional movement with a max offset of 6px
    const x = (middleX / (width / 2)) * 6;
    const y = (middleY / (height / 2)) * 6;
    
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Element = href ? Link : 'button';
  const elementProps = href ? { href } : { onClick };

  const buttonClasses = `inline-flex items-center justify-center bg-brand-gold text-black rounded-lg px-8 py-3 font-semibold shadow-[0_8px_40px_rgba(214,173,103,0.35)] transition-all duration-300 hover:brightness-110 ${className}`.trim();

  return (
    <LazyMotion features={domAnimation}>
      <div 
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="inline-block relative touch-manipulation"
      >
        <m.div
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.02 }}
        >
          <Element 
            {...elementProps as any} 
            className={buttonClasses}
          >
            {children}
          </Element>
        </m.div>
      </div>
    </LazyMotion>
  );
}
