// components/Hero.tsx
import React from "react";

export default function Hero() {
  return (
    <header className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl space-y-6 sm:space-y-8">
          <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight">
            <span className="text-[#47ff4c]">ORR Solutions</span> – Listen. <br className="hidden sm:block" />
            <span className="text-white">Solve. Optimise.</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
            Your business GP for complex systems — digital and living.
          </p>

            <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
            We diagnose your bottlenecks, treat your administrative and compliance headaches, and unlock hidden value in your data, your operations, and your projects.
          </p>

          <div className="pt-2">
            <button className="inline-block bg-gradient-primary text-[#0C294D] font-semibold px-4 sm:px-6 md:px-7 py-3 sm:py-4 rounded-lg shadow-md hover:brightness-105 transition text-sm sm:text-base md:text-lg">
              Book your free initial consultation
            </button>
          </div>
        </div>

        {/* right-side placeholder (kept minimal to match screenshot spacing) */}
        <div className="hidden lg:block" aria-hidden>
          {/* leave empty or put small illustration later */}
        </div>
      </div>
    </header>
  );
}
