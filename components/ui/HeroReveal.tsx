'use client';

import { m, LazyMotion, domAnimation, useReducedMotion } from 'framer-motion';

interface HeroRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export default function HeroReveal({ children, delay = 0 }: HeroRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion ? {} : {
    hidden: { 
      opacity: 0, 
      y: 24 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay 
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={variants as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
