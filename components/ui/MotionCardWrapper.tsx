'use client';

import { m, LazyMotion, domAnimation, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface MotionCardWrapperProps {
  children: ReactNode;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
}

export default function MotionCardWrapper({ children, className = '', href, style }: MotionCardWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionElement = (
    <m.div
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={className}
      style={style}
    >
      {children}
    </m.div>
  );

  return (
    <LazyMotion features={domAnimation}>
      {href ? (
        <Link href={href} className="block h-full outline-none">
          {motionElement}
        </Link>
      ) : (
        motionElement
      )}
    </LazyMotion>
  );
}
