import React from "react";

export default function ServicePillar() {
  return (
    <section
      className="relative w-full flex flex-col items-end px-4 py-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/path-to-your-stars-bg.png')" }}
    >
      {/* Title */}
      <h2 className="text-white text-3xl md:text-5xl font-semibold text-center mb-14 font-poppins font-bold w-full">
        Quick Service Snapshot <br />
        <span className="text-[#3DFF7C] text-3xl md:text-4xl">
          3 Pillars
        </span>
      </h2>

      <div className="relative w-full max-w-6xl flex justify-end">

        {/* Glow Image */}
        <img
          src="/images/curl_up.svg"
          alt="glow"
          className="absolute -top-45 -left-30 w-[45rem] opacity-90 pointer-events-none select-none z-[-5]"
        />

        {/* CARD */}
        <div
          className="
            relative w-full
            bg-card backdrop-blur-md
            border-t-[0.5rem] border-l-[0.5rem] border-b-[0.5rem] border-r-0
            border-white/20
            rounded-tl-[32px] rounded-bl-[32px]
            p-12 md:p-16 shadow-lg
          "
        >
          {/* CONTENT LAYOUT: BULLET COLUMN + TEXT COLUMN */}
          <div className="grid grid-cols-[60px_1fr] gap-6">

            {/* LEFT COLUMN — BULLETS + VERTICAL LINE */}
            <div className="relative flex flex-col items-center">

              {/* Vertical line connecting bullet 1 → bullet 3 */}
              <div className="absolute top-[52px] bottom-[52px] w-[4px] bg-[#3DFF7C]/40"></div>

              {/* Bullet 1 */}
              <div className="relative z-10 w-10 h-10 bg-[#0B2E4E] rounded-full 
                flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mb-12">
                <div className="w-6 h-6 bg-[#3DFF7C] rounded-full"></div>
              </div>

              {/* Bullet 2 */}
              <div className="relative z-10 w-10 h-10 bg-[#0B2E4E] rounded-full 
                flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mb-12">
                <div className="w-6 h-6 bg-[#3DFF7C] rounded-full"></div>
              </div>

              {/* Bullet 3 */}
              <div className="relative z-10 w-10 h-10 bg-[#0B2E4E] rounded-full 
                flex items-center justify-center shadow-[0_0_20px_#3DFF7C]">
                <div className="w-6 h-6 bg-[#3DFF7C] rounded-full"></div>
              </div>

            </div>

            {/* RIGHT COLUMN — TEXT CONTENT */}
            <div className="space-y-14">

              {/* Item 1 */}
              <div>
                <h3 className="text-white font-semibold text-[26px] mb-3 font-poppins">
                  Admin & Operations
                </h3>
                <p className="text-white/80 text-[18px] leading-relaxed font-poppins">
                  Smooth daily operations, outsourced admin, efficient documentation.
                </p>
              </div>

              {/* Item 2 */}
              <div>
                <h3 className="text-white font-semibold text-[26px] mb-3 font-poppins">
                  Analytics & Insight
                </h3>
                <p className="text-white/80 text-[18px] leading-relaxed font-poppins">
                  Capture, analyse, and act on the data you already have.
                </p>
              </div>

              {/* Item 3 */}
              <div>
                <h3 className="text-white font-semibold text-[26px] mb-3 font-poppins">
                  Industry Consulting
                </h3>
                <p className="text-white/80 text-[18px] leading-relaxed font-poppins">
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
