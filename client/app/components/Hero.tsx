'use client';

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.6, ease: "back.out(1.7)" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl space-y-6 sm:space-y-8">
          <h1 ref={titleRef} className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight">
            <span className="text-[#47ff4c]">ORR Solutions</span> – Listen. <br className="hidden sm:block" />
            <span className="text-white">Solve. Optimise.</span>
          </h1>

          <p ref={subtitleRef} className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
            Your business GP for complex systems — digital and living.
          </p>

          <p ref={descRef} className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
            We diagnose your bottlenecks, treat your administrative and compliance headaches, and unlock hidden value in your data, your operations, and your projects.
          </p>

          <div ref={buttonRef} className="pt-2">
            <button className="inline-block bg-gradient-primary text-[#0C294D] font-semibold px-4 sm:px-6 md:px-7 py-3 sm:py-4 rounded-lg shadow-md hover:brightness-105 transition text-sm sm:text-base md:text-lg">
              Book your free initial consultation
            </button>
          </div>
        </div>

        <div className="hidden lg:block" aria-hidden>
        </div>
      </div>
    </header>
  );
}
