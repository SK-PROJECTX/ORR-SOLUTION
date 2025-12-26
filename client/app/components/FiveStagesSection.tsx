'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FiveStagesSection() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const stagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const stages = [
    {
      title: "Discover - We listen",
      description: "You tell us what's happening. We map your context, pressures, and goals – and what 'good' looks like for you."
    },
    {
      title: "Diagnose - We find root causes",
      description: "SOPs, workflows, portals, dashboards, and AI-assisted tools designed around your team's habits, constraints and growth plans."
    },
    {
      title: "Design - We shape solution with you",
      description: "We propose clear, actionable structures that fit your reality: advisory, roadmaps, systems, AI helpers, and, where relevant, living systems projects."
    },
    {
      title: "Deploy - We put them to work together",
      description: "We implement with minimal disruption, adapting to how your people work today while preparing them for tomorrow."
    },
    {
      title: "Grow - We optimise over time",
      description: "We monitor, refine, and help you scale intelligently, keeping a feedback loop open with you and your stakeholders."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 80%" }
        }
      );

      stagesRef.current.forEach((stage, i) => {
        if (stage) {
          gsap.fromTo(stage,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.8, delay: i * 0.15, ease: "power3.out",
              scrollTrigger: { trigger: stage, start: "top 85%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
          How we work: <span className="text-[#33FF99]">Five Stages</span>
        </h2>
        
        <p ref={subtitleRef} className="text-gray-300 text-center mb-12 sm:mb-16">
          Every stage is built around you – your pace, your risk appetite, your resources
        </p>
        
        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-[#33FF99]"></div>
          
          {stages.map((stage, index) => (
            <div ref={el => { stagesRef.current[index] = el; }} key={index} className="relative flex items-start mb-8 sm:mb-12 last:mb-0">
              <div className="relative z-10 w-8 sm:w-12 h-8 sm:h-12 bg-[#33FF99] rounded-full flex items-center justify-center mr-6 sm:mr-8 flex-shrink-0">
                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
              </div>
              
              <div className="flex-1 pt-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {stage.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
