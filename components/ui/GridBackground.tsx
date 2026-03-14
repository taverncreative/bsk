'use client';

import { m, LazyMotion, domAnimation, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function GridBackground() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  
  // Parallax translation mapping
  // Moves 80px downward over the first 1000px of scrolling for depth
  const yParallax = useTransform(scrollY, [0, 1000], [0, 80]);
  const y = shouldReduceMotion ? 0 : yParallax;

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        style={{ y }} 
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
      >
        {/* Central gold glow */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 20%, rgba(214,173,103,0.12), transparent 60%)'
          }}
        />

        {/* Animated grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            animation: 'gridMotion 20s linear infinite'
          }}
        />

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes gridMotion {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
        `}} />
      </m.div>
    </LazyMotion>
  );
}
