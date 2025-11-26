import React from "react";

export default function ServicePillar() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/path-to-your-stars-bg.png')" }}>
      {/* Title */}
      <div className='text-center mb-12 sm:mb-16 lg:mb-20'>

    
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-extrabold text-center mb-4 sm:mb-10 lg:mb-14 font-poppins font-bold">
        Quick Service Snapshot - 
        <span className="text-[#3DFF7C] font-poppins font-extrAbold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          3 Pillars
        </span>
      </h2>

    <p className="text-center text-white font-poppins font-light ">All three pillars are shaped around your context - no generic playbooks</p>  
    </div>


   
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Glow Image - Hidden on mobile */}
        <img
          src="/images/glowww.png"
          alt="glow"
          className="hidden lg:block absolute -top-32 xl:-top-45 -left-8 xl:-left-12 w-[35rem] xl:w-[45rem] opacity-90 pointer-events-none select-none z-[-5]"
        />

        {/* CARD */}
        <div className="relative w-full bg-card backdrop-blur-md border border-[#40B25B] lg:border-t-[0.5rem] lg:border-l-[0.5rem] lg:border-b-[0.5rem] lg:border-r-0 rounded-2xl lg:rounded-tl-[91.25px] lg:rounded-bl-[91.25px] lg:rounded-tr-none lg:rounded-br-none ml-20 p-10 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-lg">
          {/* CONTENT LAYOUT: RESPONSIVE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-[60px_1fr] gap-6 md:gap-8">

            {/* LEFT COLUMN — BULLETS + VERTICAL LINE (Hidden on mobile) */}
            <div className="hidden md:flex relative flex-col items-center">
              {/* Vertical line connecting bullet 1 → bullet 3 */}
              <div className="absolute top-[32px] bottom-[52px] w-[4px] mb-20 bg-[#05CC79]"></div>

              {/* Bullet 1 */}
              <div className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#1F6F75] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mb-10 lg:mb-12">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#05CC79] rounded-full"></div>
              </div>

              {/* Bullet 2 */}
              <div className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#1F6F75] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mt-42 lg:mb-12">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#05CC79] rounded-full"></div>
              </div>

              {/* Bullet 3 */}
              <div className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#1F6F75] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mt-36">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#05CC79] rounded-full"></div>
              </div>
            </div>

            {/* RIGHT COLUMN — TEXT CONTENT */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-14">
              {/* Item 1 */}
              <div className="relative">
                {/* Mobile bullet */}
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins">
                  Strategic Advisory & Compliance
                </h3>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins">
                 Regulatory clarity, ESG and sustainability frameworks, biotechnology and environmental questions - distilled into simple, usable direction for your organisation.
                </p>
                <button className="mt-10 bg-gradient-to-r from-[#28B026] to-[#03F6CA] text-[#0C294D] p-4 font-poppins font-semibold  rounded-lg cursor-pointer">Explore Strategic Advisory & Compliance</button>
              </div>

              {/* Item 2 */}
              <div className="relative">
                {/* Mobile bullet */}
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins">
                 Digital Systems, Automation & AI
                </h3>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins">
                 SOPs, workflows, portals, dashboards, and AI-assisted tools designed 
                around your team’s habits, constraints and growth plans
                </p>
                <button className="mt-10 bg-gradient-to-r from-[#28B026] to-[#03F6CA] text-[#0C294D] p-4 font-poppins font-semibold rounded-lg cursor-pointer">Explore Digital Systems, Automation & AI</button>
              </div>

              {/* Item 3 */}
              <div className="relative">
                {/* Mobile bullet */}
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins">
                 Living Systems & Regeneration
                </h3>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins">
                 Support for land, water, species, and ecosystems - tailored to your sites 
                your risks, and your opportunities
                </p>
                <button className="mt-10 bg-gradient-to-r from-[#28B026] to-[#03F6CA] text-[#0C294D] p-4 font-poppins font-semibold rounded-lg cursor-pointer">Explore Living Systems & Regeneration</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
