// components/Hero.tsx
import React from "react";

export default function Hero() {
  return (
    <header className=" mx-auto px-25 py-[15rem]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl space-y-9">
          <h1 className="text-white font-extrabold text-4xl lg:text-7xl leading-tight">
            <span className="text-[#47ff4c]">ORR Solutions</span> – Listen. <br />
            <span className="text-white">Solve. Optimise.</span>
          </h1>

          <p className="mt-6 text-slate-200 text-xl max-w-xl">
            Your business GP - streamlining operations, solving admin challenges and unlocking data-driven growth"
          </p>

          <div className="mt-6">
            <button className="inline-block bg-gradient-primary text-[#0C294D] font-semibold px-7 py-4 rounded-lg shadow-md hover:brightness-105 transition text-lg">
              Book your free initial consultation
            </button>
          </div>
        </div>

        {/* right-side placeholder (kept minimal to match screenshot spacing) */}
        <div className="hidden md:block" aria-hidden>
          {/* leave empty or put small illustration later */}
        </div>
      </div>
    </header>
  );
}
