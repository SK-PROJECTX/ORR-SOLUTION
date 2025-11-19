"use client";

import Image from "next/image";

export default function GPMetaphorSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background pattern (optional) */}
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover opacity-8 pointer-events-none" />

      {/* Heading */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug">
          Businesses as a Living System –
        </h2>
        <p className="text-[#27DD62] text-lg sm:text-xl md:text-2xl font-semibold mt-2">
          The GP Metaphor Visual
        </p>
      </div>

      {/* Top row: responsive layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start mb-12 sm:mb-16 lg:mb-20 gap-6 lg:gap-8">
        {/* Card 1 */}
        <div className="w-full max-w-md lg:max-w-lg bg-card rounded-2xl lg:rounded-tr-[4rem] lg:rounded-br-[4rem] lg:rounded-tl-2xl lg:rounded-bl-2xl overflow-hidden shadow-lg">
          <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[360px]">
            <Image src="/images/doctor.png" alt="Living system" fill className="object-cover" />

            {/* Number */}
            <div className="absolute top-4 sm:top-6 lg:top-9 left-4 sm:left-6 lg:left-9 text-[#8effd0] text-2xl sm:text-3xl lg:text-4xl font-semibold">01</div>

            {/* + Icon centered inside its circle */}
            <div className="absolute top-4 sm:top-6 lg:top-12 right-4 sm:right-6 lg:right-12 w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 rounded-full bg-[#22E374] flex items-center justify-center">
              <span className="text-black text-lg sm:text-xl lg:text-2xl font-bold leading-none">+</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:py-10 text-white text-sm sm:text-base lg:text-lg tracking-wide">Your Business as a Living System</div>
        </div>

        {/* Card 2 */}
        <div className="w-full max-w-md lg:max-w-lg bg-card rounded-2xl lg:rounded-tl-[4rem] lg:rounded-bl-[4rem] lg:rounded-tr-2xl lg:rounded-br-2xl overflow-hidden shadow-lg">
          <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[360px]">
            <Image src="/images/organism.png" alt="Systems working together" fill className="object-cover" />

            {/* Number */}
            <div className="absolute top-4 sm:top-6 lg:top-12 left-4 sm:left-6 lg:left-12 text-[#8effd0] text-2xl sm:text-3xl lg:text-4xl font-semibold">02</div>

            {/* + Icon centered inside its circle */}
            <div className="absolute top-4 sm:top-6 lg:top-12 right-4 sm:right-6 lg:right-12 w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 rounded-full bg-[#22E374] flex items-center justify-center">
              <span className="text-black text-lg sm:text-xl lg:text-2xl font-bold leading-none">+</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:py-10 text-white text-sm sm:text-base lg:text-lg tracking-wide">
            Businesses thrive like living organisms when all their systems work together
          </div>
        </div>
      </div>

      {/* Bottom card - centered */}
      <div className="relative z-10 w-full flex justify-center">
        <div className="w-full max-w-2xl lg:max-w-4xl bg-card rounded-2xl lg:rounded-[4rem] overflow-hidden shadow-lg">
          <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[380px]">
            <Image src="/images/planting.png" alt="ORR Solutions" fill className="object-cover" />

            {/* Number */}
            <div className="absolute top-4 sm:top-6 lg:top-12 left-4 sm:left-6 lg:left-12 text-[#8effd0] text-2xl sm:text-3xl lg:text-4xl font-semibold">03</div>

            {/* + Icon centered inside its circle */}
            <div className="absolute top-4 sm:top-6 lg:top-12 right-4 sm:right-6 lg:right-12 w-8 sm:w-9 lg:w-10 h-8 sm:h-9 lg:h-10 rounded-full bg-[#22E374] flex items-center justify-center">
              <span className="text-black text-lg sm:text-xl lg:text-2xl font-bold leading-none">+</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:py-10 text-white text-sm sm:text-base lg:text-lg tracking-wide leading-relaxed">
            ORR Solutions keeps your 'business physiology' in peak condition — ensuring your operations, communication, cash flow, compliance, and data all work in harmony.
          </div>
        </div>
      </div>
    </section>
  );
}