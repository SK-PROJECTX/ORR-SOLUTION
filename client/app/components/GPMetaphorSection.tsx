"use client";

import Image from "next/image";
// import { } from "framer-motion";

// Responsive card class: full width on small screens, fixed on md+
const CARD_CLASS = "w-full md:w-[540px]";

export default function GPMetaphorSection() {
  return (
    <section className="relative w-full  py-20 overflow-hidden">
      {/* Background pattern (optional) */}
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover opacity-8 pointer-events-none" />

      {/* Heading */}
      <div
        className="relative z-10 text-center mb-12"
      >
        <h2 className="text-white text-3xl md:text-4xl font-semibold leading-snug">
          Businesses as a Living System –
        </h2>
        <p className="text-[#27DD62] text-xl md:text-2xl font-semibold mt-2">
          The GP Metaphor Visual
        </p>
      </div>

      {/* Top row: two fixed-width cards aligned to container edges on desktop; stack on mobile */}
      <div className="relative z-10 w-full mx-auto flex justify-between items-start mb-20 gap-25">
        {/* Card 1 */}
        <div
          className={`${CARD_CLASS} bg-card rounded-tr-[4rem] rounded-br-[4rem] overflow-hidden shadow-lg flex-1 `}
        >
          <div className="relative w-full h-[360px]">
            <Image src="/images/doctor.png" alt="Living system" fill className="object-cover" />

            {/* Number */}
            <div className="absolute top-9 left-9 text-[#8effd0] text-4xl font-semibold">01</div>

            {/* + Icon centered inside its circle */}
            <div className="absolute top-12 right-12 w-10 h-10 rounded-full bg-[#22E374] flex items-center justify-center">
              <span className="text-black text-2xl font-bold leading-none">+</span>
            </div>
          </div>

          <div className="p-6 py-10 text-white text-lg tracking-wide">Your Business as a Living System</div>
        </div>

        {/* Card 2 */}
        <div
          className={`${CARD_CLASS} bg-card  rounded-tl-[4rem] rounded-bl-[4rem] overflow-hidden shadow-lg flex-1 `}
        >
          <div className="relative w-full h-[360px]">
            <Image src="/images/organism.png" alt="Systems working together" fill className="object-cover" />

            {/* Number */}
            <div className="absolute top-12 left-12 text-[#8effd0] text-4xl font-semibold">02</div>

            {/* + Icon centered inside its circle */}
            <div className="absolute top-12 right-12  w-10 h-10 rounded-full bg-[#22E374] flex items-center justify-center">
              <span className="text-black text-2xl font-bold leading-none">+</span>
            </div>
          </div>

          <div className="p-6 py-10 text-white text-lg tracking-wide">
            Businesses thrive like living organisms when all their systems work together
          </div>
        </div>
      </div>

      {/* Bottom card - centered */}
      <div className="relative z-10 w-full flex justify-center">
        <div
          className={` w-5xl max-w-[] bg-card rounded-[4rem] overflow-hidden shadow-lg`}
        >
          <div className="relative w-full h-[380px]">
            <Image src="/images/planting.png" alt="ORR Solutions" fill className="object-cover" />

            {/* Number */}
            <div className="absolute top-12 left-12 text-[#8effd0] text-4xl font-semibold">03</div>

            {/* + Icon centered inside its circle */}
            <div className="absolute top-12 right-12  w-10 h-10 rounded-full bg-[#22E374] flex items-center justify-center">
              <span className="text-black text-2xl font-bold leading-none">+</span>
            </div>
          </div>

          <div className="p-6 py-10 text-white text-lg tracking-wide leading-relaxed">
            ORR Solutions keeps your ‘business physiology’ in peak condition — ensuring your operations, communication, cash flow, compliance, and data all work in harmony.
          </div>
        </div>
      </div>

      {/* Responsive: ensure cards stack nicely on small screens - handled by tailwind classes */}
    </section>
  );
}
