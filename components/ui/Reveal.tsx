'use client';

import { m, LazyMotion, domAnimation, useReducedMotion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // We can add a custom delay to the variant if needed, 
  // but for simplicity we'll just merge it or use transition property directly.
  const variants = shouldReduceMotion ? {} : {
    hidden: fadeInUp.hidden,
    visible: {
      ...fadeInUp.visible,
      transition: {
        ...fadeInUp.visible.transition,
        delay: delay
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={variants as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
