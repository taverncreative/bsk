"use client";

import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";
import { Laptop, TrendingUp, Users, Zap } from "lucide-react";
import IconWrapper from "@/components/ui/IconWrapper";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function GrowthEngine() {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  const isHomepage = pathname === "/";

  const steps = [
    {
      id: "website",
      icon: Laptop,
      title: "Website",
      desc: "Fast conversion build",
      href: "/services/web-design",
      pathMatches: ["/web-design", "/services/web-design"],
    },
    {
      id: "google",
      icon: TrendingUp,
      title: "Google Rankings",
      desc: "Dominate local search",
      href: "/services/google-rankings",
      pathMatches: ["/seo", "/services/google-rankings"],
    },
    {
      id: "leads",
      icon: Users,
      title: "Lead Capture",
      desc: "Convert targeted traffic",
      href: "/services/lead-capture",
      pathMatches: [
        "/digital-marketing",
        "/lead-capture",
        "/services/lead-capture",
      ],
    },
    {
      id: "automation",
      icon: Zap,
      title: "Automation",
      desc: "Instant CRM delivery",
      href: "/services/automation",
      pathMatches: [
        "/business-automation",
        "/automation",
        "/services/automation",
      ],
    },
  ];

  let activeIndex = -1;
  if (!isHomepage) {
    activeIndex = steps.findIndex((step) =>
      step.pathMatches.some((match) => pathname.includes(match)),
    );
  }

  const containerVars = shouldReduceMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: {},
        show: {
          transition: { staggerChildren: 0.15 },
        },
      };

  const itemVars = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" as const },
        },
      };

  return (
    <LazyMotion features={domAnimation}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes iconPulse0 {
          0%, 6% { filter: brightness(1.4) drop-shadow(0 0 14px rgba(212,175,55,0.9)); transform: scale(1.03); }
          8%, 100% { filter: brightness(1) drop-shadow(0 0 0px rgba(212,175,55,0)); transform: scale(1); }
        }
        @keyframes pipelineFlow0 {
          0%, 5.9% { left: 0%; opacity: 0; }
          6% { left: 0%; opacity: 1; }
          22% { left: 100%; opacity: 1; }
          22.1%, 100% { left: 100%; opacity: 0; }
        }

        @keyframes iconPulse1 {
          0%, 21.9% { filter: brightness(1) drop-shadow(0 0 0px rgba(212,175,55,0)); transform: scale(1); }
          22%, 28% { filter: brightness(1.4) drop-shadow(0 0 14px rgba(212,175,55,0.9)); transform: scale(1.03); }
          30%, 100% { filter: brightness(1) drop-shadow(0 0 0px rgba(212,175,55,0)); transform: scale(1); }
        }
        @keyframes pipelineFlow1 {
          0%, 27.9% { left: 0%; opacity: 0; }
          28% { left: 0%; opacity: 1; }
          44% { left: 100%; opacity: 1; }
          44.1%, 100% { left: 100%; opacity: 0; }
        }

        @keyframes iconPulse2 {
          0%, 43.9% { filter: brightness(1) drop-shadow(0 0 0px rgba(212,175,55,0)); transform: scale(1); }
          44%, 50% { filter: brightness(1.4) drop-shadow(0 0 14px rgba(212,175,55,0.9)); transform: scale(1.03); }
          52%, 100% { filter: brightness(1) drop-shadow(0 0 0px rgba(212,175,55,0)); transform: scale(1); }
        }
        @keyframes pipelineFlow2 {
          0%, 49.9% { left: 0%; opacity: 0; }
          50% { left: 0%; opacity: 1; }
          66% { left: 100%; opacity: 1; }
          66.1%, 100% { left: 100%; opacity: 0; }
        }

        @keyframes iconPulse3 {
          0%, 65.9% { filter: brightness(1) drop-shadow(0 0 0px rgba(212,175,55,0)); transform: scale(1); }
          66%, 72% { filter: brightness(1.4) drop-shadow(0 0 14px rgba(212,175,55,0.9)); transform: scale(1.03); }
          74%, 100% { filter: brightness(1) drop-shadow(0 0 0px rgba(212,175,55,0)); transform: scale(1); }
        }

        @keyframes pipelineFlowVert0 {
          0%, 5.9% { top: 0%; opacity: 0; }
          6% { top: 0%; opacity: 1; }
          22% { top: 100%; opacity: 1; }
          22.1%, 100% { top: 100%; opacity: 0; }
        }
        @keyframes pipelineFlowVert1 {
          0%, 27.9% { top: 0%; opacity: 0; }
          28% { top: 0%; opacity: 1; }
          44% { top: 100%; opacity: 1; }
          44.1%, 100% { top: 100%; opacity: 0; }
        }
        @keyframes pipelineFlowVert2 {
          0%, 49.9% { top: 0%; opacity: 0; }
          50% { top: 0%; opacity: 1; }
          66% { top: 100%; opacity: 1; }
          66.1%, 100% { top: 100%; opacity: 0; }
        }
      `,
        }}
      />

      <m.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="relative w-full z-10 py-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full relative z-10">
          {steps.map((step, index) => {
            const isActive = activeIndex === index;
            // The pipeline segment originating from this node should be GOLD
            // if it leads to an active card or is part of the path to the active card.
            const isPipelineGold = index < activeIndex;

            return (
              <div
                key={step.id}
                className="w-full relative flex justify-center"
              >
                {/* Connector Segment */}
                {index < steps.length - 1 && (
                  <>
                    {/* Desktop/Tablet Horizontal Connector */}
                    <div
                      className={`absolute top-[56px] left-[50%] w-[calc(100%+24px)] h-[1px] -translate-y-1/2 hidden md:block z-0 pointer-events-none transition-colors duration-500 ${isPipelineGold ? "bg-[#D6AD67] shadow-[0_0_8px_rgba(212,175,55,0.4)]" : "bg-[rgba(212,175,55,0.35)]"}`}
                    >
                      {!shouldReduceMotion && (
                        <div
                          className="absolute top-1/2 w-[40px] h-[1px] bg-[rgba(212,175,55,0.8)] -translate-y-[0.5px] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                          style={{
                            animation: `pipelineFlow${index} 5s infinite linear`,
                          }}
                        />
                      )}
                    </div>
                    {/* Mobile Vertical Connector */}
                    <div
                      className={`absolute top-[56px] left-1/2 h-[calc(100%+24px)] w-[1px] -translate-x-[0.5px] block md:hidden z-0 pointer-events-none transition-colors duration-500 ${isPipelineGold ? "bg-[#D6AD67] shadow-[0_0_8px_rgba(212,175,55,0.4)]" : "bg-[rgba(212,175,55,0.35)]"}`}
                    >
                      {!shouldReduceMotion && (
                        <div
                          className="absolute left-1/2 h-[40px] w-[1px] bg-[rgba(212,175,55,0.8)] -translate-x-[0.5px] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                          style={{
                            animation: `pipelineFlowVert${index} 5s infinite linear`,
                          }}
                        />
                      )}
                    </div>
                  </>
                )}

                <m.div
                  variants={itemVars}
                  className="w-full h-full relative z-10"
                >
                  <Link
                    href={step.href}
                    className={`group block relative w-full h-full min-h-[200px] flex flex-col items-center justify-start pt-8 pb-6 px-[clamp(16px,2vw,24px)] rounded-[18px] bg-[#111111] transition-all duration-400 ease-out hover:-translate-y-1 before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[18px] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 cursor-pointer
                      ${
                        isActive
                          ? "border border-brand-gold shadow-[0_10px_40px_rgba(212,175,55,0.25)] before:shadow-[0_0_30px_rgba(212,175,55,0.4)] before:opacity-100 scale-[1.03] bg-[#151412]"
                          : "border-[rgba(255,255,255,0.06)] border hover:border-[rgba(201,162,89,0.5)] before:shadow-[0_0_30px_rgba(201,162,89,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                      }
                    `}
                  >
                    <div
                      className="flex items-center justify-center mb-5 origin-center shrink-0"
                      style={
                        !shouldReduceMotion
                          ? {
                              animation: `iconPulse${index} 5s infinite linear`,
                            }
                          : {}
                      }
                    >
                      <IconWrapper
                        icon={step.icon}
                        className={`scale-75 xl:scale-90 transition-transform duration-400 group-hover:-translate-y-[2px] 
                          ${isActive ? "bg-brand-gold/10 border-brand-gold/50 shadow-[0_0_20px_rgba(214,173,103,0.3)] text-brand-gold" : "bg-neutral-950 shadow-none text-white"}
                        `}
                      />
                    </div>

                    <div className="w-full flex-1 flex flex-col items-center justify-start mt-1">
                      <h3
                        className={`font-bold text-[clamp(15px,1.5vw,18px)] mb-3 text-center leading-tight transition-colors duration-300 ${isActive ? "text-brand-gold" : "text-white group-hover:text-neutral-200"}`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-[clamp(12px,1vw,14px)] leading-[1.4] text-center line-clamp-3 transition-colors duration-300 ${isActive ? "text-brand-gold/80" : "text-neutral-500 group-hover:text-neutral-400"}`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </Link>
                </m.div>
              </div>
            );
          })}
        </div>
      </m.div>
    </LazyMotion>
  );
}
