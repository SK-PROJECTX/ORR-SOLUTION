import React from "react";

export default function ServicePillar() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/path-to-your-stars-bg.png')" }}>
      {/* Title */}
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-8 sm:mb-10 lg:mb-14 font-poppins font-bold">
        Quick Service Snapshot <br className="hidden sm:block" />
        <span className="text-[#3DFF7C] text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          3 Pillars
        </span>
      </h2>

      <div className="relative w-full max-w-7xl mx-auto">
        {/* Glow Image - Hidden on mobile */}
        <img
          src="/images/curl_up.svg"
          alt="glow"
          className="hidden lg:block absolute -top-32 xl:-top-45 -left-8 xl:-left-12 w-[35rem] xl:w-[45rem] opacity-90 pointer-events-none select-none z-[-5]"
        />

        {/* CARD */}
        <div className="relative w-full bg-card backdrop-blur-md border border-white/20 lg:border-t-[0.5rem] lg:border-l-[0.5rem] lg:border-b-[0.5rem] lg:border-r-0 rounded-2xl lg:rounded-tl-[32px] lg:rounded-bl-[32px] lg:rounded-tr-none lg:rounded-br-none p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-lg">
          {/* CONTENT LAYOUT: RESPONSIVE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-[60px_1fr] gap-6 md:gap-8">

            {/* LEFT COLUMN — BULLETS + VERTICAL LINE (Hidden on mobile) */}
            <div className="hidden md:flex relative flex-col items-center">
              {/* Vertical line connecting bullet 1 → bullet 3 */}
              <div className="absolute top-[52px] bottom-[52px] w-[4px] bg-[#3DFF7C]/40"></div>

              {/* Bullet 1 */}
              <div className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#0B2E4E] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mb-10 lg:mb-12">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#3DFF7C] rounded-full"></div>
              </div>

              {/* Bullet 2 */}
              <div className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#0B2E4E] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mb-10 lg:mb-12">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#3DFF7C] rounded-full"></div>
              </div>

              {/* Bullet 3 */}
              <div className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#0B2E4E] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C]">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#3DFF7C] rounded-full"></div>
              </div>
            </div>

            {/* RIGHT COLUMN — TEXT CONTENT */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-14">
              {/* Item 1 */}
              <div className="relative">
                {/* Mobile bullet */}
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins">
                  Admin & Operations
                </h3>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins">
                  Smooth daily operations, outsourced admin, efficient documentation.
                </p>
              </div>

              {/* Item 2 */}
              <div className="relative">
                {/* Mobile bullet */}
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins">
                  Analytics & Insight
                </h3>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins">
                  Capture, analyse, and act on the data you already have.
                </p>
              </div>

              {/* Item 3 */}
              <div className="relative">
                {/* Mobile bullet */}
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins">
                  Industry Consulting
                </h3>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins">
                  Deep insights in agriculture, immigration, property, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
