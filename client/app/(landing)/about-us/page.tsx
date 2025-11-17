"use client";

export default function AboutUs() {
  return (
    <section className="relative w-full  py-30 pt-[10rem] text-white">
      <div className="relative ">
        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-12">
          About <span className="text-white">Us</span>
        </h2>

        {/* Card Wrapper */}
        {/* Card */}
        <div className="relative flex justify-center items-center">
          {/* Glow Image Under */}
          <img
            src="/images/full_curl.svg"
            alt="glow"
            className="absolute  w-[100vw] opacity-90 pointer-events-none select-none z-[-5]"
          />
          <div className=" w-full max-w-7xl bg border-[0.5rem] border-white/10 backdrop-blur-md bg-card z-1 rounded-[4rem]   shadow-lg space-y-7 ">
            {/* Company Background */}
            <h3 className="text-center text-5xl font-bold mb-6 p-10 md:p-15">
              Company <span className="text-[#00FF66]">Background</span>
            </h3>

            <p className="text-center text-base md:text-xl lg:text-2xl text-left  font-light text-gray-300 leading-relaxed mx-auto mb-16 px-10 md:px-17">
              Lorem ipsm practitioner, we take time to understand your whole
              business before prescribing solutions. We fix what's slowing you
              down, strengthen your systems, and when you need specialised
              expertise, we tap into our global network of
            </p>

            {/* Credentials Section */}
            <div className="rounded-[3rem] p-2 bg-gradient-to-r from-[#379898] to-[#40B25B]">
              <div className="bg-card px-4 py-15 md:px-10 rounded-[3rem]">
                <h3 className="text-center text-3xl font-bold mb-10">
                  Credentials
                </h3>

                {/* Credentials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 place-items-center">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {/* Glow dot */}
                      <div className="w-6 h-6 rounded-full bg-[#00FF66] shadow-[0_0_15px_#00FF66]" />
                      <p className="text-gray-300">Lorem ipsembhf</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Leadership Profile */}
            <h3 className="text-center text-3xl font-bold mb-6">
              Leadership <span className="text-[#00FF66]">Profile</span>
            </h3>

            <p className="text-center text-base md:text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Lorem ipsum practitioner, we take time to understand your whole
              business before prescribing solutions. We fix what's slowing you
              down, strengthen your systems, and when you need specialised
              expertise, we tap into our global network of partners to get you
              the right results — fast.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
