'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

/**
 * Subtle scroll-triggered fade-up. Reliable, no framer-motion race.
 * Pass a delay (ms) to stagger sibling elements.
 */
export default function ScrollFadeIn({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: ScrollFadeInProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[700ms] ease-out will-change-transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
