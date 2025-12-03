import React from "react";

export default function ApproachSection() {
  return (
    <section className="relative w-full flex flex-col items-start pr-4 py-20   bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-stars-bg.png')" }}>
      {/* Title */}
      <h2 className="text-white text-3xl md:text-5xl font-semibold text-center mb-10 font-poppins w-full flex justify-center py-7">
      Supporting <span className="text-[#3DFF7C] pl-5">Copy</span>
      </h2>

      {/* Card */}
      <div className="relative">

        {/* Glow Image Under */}
        <img
          src="/images/curl.svg"
          alt="glow"
          className="absolute -bottom-50 sm:-bottom-120 -right-30 w-[40rem] opacity-90 pointer-events-none select-none z-[-5]"
        />
      
      <div className=" w-full max-w-7xl ml-0 bg border-t-[0.5rem] border-r-[0.5rem] border-b-[0.5rem] border-l-0 border-white/20 backdrop-blur-md bg-card z-1 rounded-tr-[91.25px] rounded-br-[91.25px] p-10 md:p-14 shadow-lg space-y-7 ">

        {/* Side nodes */}
        <div className="absolute right-[-28px] top-[20%] w-14 h-14 bg-[#0B2E4E] rounded-full flex items-center justify-center shadow-[0_0_25px_#3DFF7C]">
          <div className="w-9 h-9 bg-[#3DFF7C] rounded-full" />
        </div>
        <div className="absolute right-[-28px] bottom-[20%] w-14 h-14 bg-[#0B2E4E] rounded-full flex items-center justify-center shadow-[0_0_25px_#3DFF7C]">
          <div className="w-9 h-9 bg-[#3DFF7C] rounded-full" />
        </div>

        {/* Text Content */}
        <p className="text-white/90 leading-relaxed text-[25px] font-poppins mb-10">
          Just like a skilled general practitioner, we start from your story not our framework. 
          We take time to understand how your business really works before prescribing anything.
        </p>

        <div className="w-full h-[2px] bg-[#3DFF7C] mb-10" />

               <p className="text-white/90 leading-relaxed text-[25px] font-poppins mb-10">
          We’re not a lone consultant — we’re a central coordination layer with a distributed network behind it. When needed, we draw on specialists across continents, 
          but you always deal with one point of contact: ORR, focused on what’s best for you.
        </p>

        <div className="w-full h-[2px] bg-[#3DFF7C] mb-10" />

        <p className="text-white/90 leading-relaxed text-[25px] font-poppins">
          We fix what’s slowing you down, strengthen systems around how your people actually work,
          and when deeper input is needed, we bring it in at the right moment — always in service of your goals.
        </p>
      </div>
      </div>
    </section>
  );
}
