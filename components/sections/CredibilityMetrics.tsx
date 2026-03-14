'use client';

import { useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, useInView, animate, useReducedMotion } from 'framer-motion';

interface MetricProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  subtext?: string;
}

function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0 }: Omit<MetricProps, 'label'>) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "0px 0px -50px 0px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView && nodeRef.current) {
      if (shouldReduceMotion) {
        const formatParts = value.toFixed(decimals).split('.');
        formatParts[0] = formatParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        nodeRef.current.textContent = prefix + formatParts.join('.') + suffix;
        return;
      }

      const controls = animate(0, value, {
        duration: 0.8,
        ease: "easeOut",
        onUpdate(latest) {
          if (nodeRef.current) {
            const formatParts = latest.toFixed(decimals).split('.');
            formatParts[0] = formatParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            nodeRef.current.textContent = prefix + formatParts.join('.') + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [value, decimals, inView, prefix, suffix, shouldReduceMotion]);

  // Initial render value formatting
  const initialValue = 0;
  const initialFormat = initialValue.toFixed(decimals).split('.');
  initialFormat[0] = initialFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const fallbackParts = value.toFixed(decimals).split('.');
  fallbackParts[0] = fallbackParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <span ref={nodeRef}>
      {prefix}{shouldReduceMotion ? fallbackParts.join('.') : initialFormat.join('.')}{suffix}
    </span>
  );
}

export default function CredibilityMetrics() {
  const metrics: MetricProps[] = [
    { value: 100, suffix: '+', label: 'Websites Launched' },
    { value: 50, suffix: '+', label: 'SEO Ranking Factors Optimised' },
    { value: 4.3, suffix: 'x', decimals: 1, label: 'Average Lead Increase' },
    { value: 90, suffix: ' Days', label: 'Typical Ranking Window' },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div 
        className="w-full grid gap-6" 
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
      >
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex flex-col gap-2 bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-[18px] p-6 lg:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)] items-start md:items-center text-left md:text-center w-full transition-all duration-400 hover:-translate-y-1 hover:border-[rgba(201,162,89,0.3)] group relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            <span 
              className="font-black text-brand-gold leading-none tracking-tight z-10"
              style={{ fontSize: 'clamp(40px, 4.5vw, 56px)', whiteSpace: 'nowrap' }}
            >
              <AnimatedCounter 
                value={metric.value} 
                decimals={metric.decimals} 
                prefix={metric.prefix} 
                suffix={metric.suffix} 
              />
            </span>
            <span className="text-[15px] xl:text-base font-medium text-neutral-400 leading-snug z-10">
              {metric.label}
            </span>
            {metric.subtext && (
              <span className="text-xs text-brand-gold/70 font-semibold uppercase tracking-wider mt-1 z-10">
                {metric.subtext}
              </span>
            )}
          </div>
        ))}
      </div>
    </LazyMotion>
  );
}
