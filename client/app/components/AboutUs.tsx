"use client";

export default function AboutUs() {
  return (
    <section className="relative w-full px-4 md:px-10 lg:px-20 py-16 text-white">
      {/* Title */}
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-12">
        About <span className="text-white">Us</span>
      </h2>

      {/* Card Wrapper */}
          {/* Card */}
      <div className="relative">

        {/* Glow Image Under */}
        <img
          src="/images/curl.svg"
          alt="glow"
          className="absolute -bottom-120 -right-30 w-[40rem] opacity-90 pointer-events-none select-none z-[-5]"
        />
      
      <div className=" w-full max-w-7xl ml-0 bg border-t-[0.5rem] border-r-[0.5rem] border-b-[0.5rem] border-l-0 border-white/20 backdrop-blur-md bg-card z-1 rounded-tr-[32px] rounded-br-[32px] p-10 md:p-14 shadow-lg space-y-7 ">

        {/* Side nodes */}
        <div className="absolute right-[-28px] top-[20%] w-14 h-14 bg-[#0B2E4E] rounded-full flex items-center justify-center shadow-[0_0_25px_#3DFF7C]">
          <div className="w-9 h-9 bg-[#3DFF7C] rounded-full" />
        </div>
        <div className="absolute right-[-28px] bottom-[20%] w-14 h-14 bg-[#0B2E4E] rounded-full flex items-center justify-center shadow-[0_0_25px_#3DFF7C]">
          <div className="w-9 h-9 bg-[#3DFF7C] rounded-full" />
        </div>

        {/* Text Content */}
        <p className="text-white/90 leading-relaxed text-[25px] font-poppins mb-10">
          Just like a skilled general practitioner, we take time to understand your whole
          business before prescribing solutions.
        </p>

        <div className="w-full h-[2px] bg-[#3DFF7C] mb-10" />

        <p className="text-white/90 leading-relaxed text-[25px] font-poppins">
          We fix what's slowing you down, strengthen your systems, and when you need specialised
          expertise, we tap into our global network of partners to get you the right results — fast.
        </p>
      </div>
      </div>
    </section>
  );
}



