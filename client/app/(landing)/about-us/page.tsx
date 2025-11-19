import Image from "next/image";
import Stepper from "../../components/Stepper";

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
          <div className="rounded-[4rem] p-3 bg-white/20 backdrop-blur-xl">
            <div className=" w-full max-w-7xl bg  border-white/10 backdrop-blur-md bg-card z-1 rounded-[4rem]   shadow-lg space-y-7 ">
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
                        <div className=" w-7 h-7 bg-[#1F6F75] rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-[#05CC79] rounded-full" />
                        </div>
                        <p className="text-gray-300">Lorem ipsembhf</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leadership Profile */}
              <h3 className="text-center text-5xl font-bold mb-6 p-10 md:p-15">
                Leadership <span className="text-[#00FF66]">Profile</span>
              </h3>

              <p className="text-center text-base md:text-xl lg:text-2xl text-left  font-light text-gray-300 leading-relaxed mx-auto pb-16 px-10 md:px-17">
                Lorem ipsm practitioner, we take time to understand your whole
                business before prescribing solutions. We fix what's slowing you
                down, strengthen your systems, and when you need specialised
                expertise, we tap into our global network of partners to get you
                the right results — fast."
              </p>
            </div>
          </div>
        </div>
      </div>
      <PictureSection />
      <CoreVisionSection />
      <SpecialisedFocus />
    </section>
  );
}

const PictureSection = () => {
  return (
    <>
      <div className="relative flex justify-center items-center py-[9rem]">
        {/* Glow Image Under */}
        <img
          src="/images/n_curl.svg"
          alt="glow"
          className="absolute opacity-90 pointer-events-none select-none z-[-5]"
        />
        <img src="/images/handshake.png" alt="" className="w-5xl " />
      </div>
    </>
  );
};

function CoreVisionSection() {
  return (
    <section className="w-full text-white px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 lg:py-20 relative overflow-hidden font-poppins">
      {/* Background subtle stars */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-sm sm:text-base lg:text-xl">
        {/* Header */}
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 lg:mb-10">
          Core Vision <span className="text-[#33FF99]">& Philosophy</span>
        </h2>

        {/* Body Paragraph */}
        <p className="text-[#D4D8E3] leading-relaxed mb-6">
          At ORR, we approach professionals and businesses as living systems —
          each with its own structure, energy, and unique challenges.
        </p>

        <p className="text-[#D4D8E3] leading-relaxed mb-6">
          We listen first, to understand the underlying causes of operational
          and administrative ‘ailments’, and then act with precision to restore
          clarity, structure, and efficiency.
        </p>

        <p className="text-[#D4D8E3] leading-relaxed mb-10">
          Whether you're a self-employed professional, a freelancer, or an
          established company, ORR helps you:
        </p>

        {/* Stepper */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <Stepper 
            steps={[
              "Identify and resolve administrative bottlenecks",
              "Outsource and automate routine work",
              "Implement structured operational systems (SOPs, workflows, dashboards)",
              "Optimise data and client information to generate new value streams",
            ]}
          />
        </div>

        {/* Closing Paragraphs */}
        <p className="text-[#D4D8E3] leading-relaxed mb-6">
          We believe every client relationship generates data — and within that
          data lies opportunity. By capturing and analysing these patterns, ORR
          transforms information into insight, helping businesses evolve
          intelligently.
        </p>

        <p className="text-[#D4D8E3] leading-relaxed">
          Our team and network of trusted subcontractors provide tailored
          solutions spanning multiple industries, with specialised focus in:
        </p>
      </div>
    </section>
  );
}

const SpecialisedFocus = () => {
  return (
    <section className="w-full bg-white/10 text-white px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-20 lg:py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-y-16 sm:gap-y-20 lg:gap-y-32 gap-x-8 sm:gap-x-12 lg:gap-x-24 place-items-center">
        
        {/* ---------- COLUMN 1 ---------- */}
        <div className="relative flex flex-col justify-start text-center gap-8 sm:gap-12 lg:gap-15 items-center">
          
          {/* LINE (ABSOLUTE) */}
          <div className="hidden md:block absolute left-[4rem] bg-[#16FF99] w-[7px] h-[200px] top-[12px]" />

          {/* TOP ITEM */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 relative z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/sprout.svg" className="w-12 h-12 sm:w-14 sm:h-14 lg:w-17 lg:h-17 pointer-events-none" />
            </div>
            <p className="text-[#33FF99] text-lg sm:text-xl font-medium">Agriculture</p>
          </div>

          {/* BOTTOM ITEM */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 relative z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/management.svg" className="w-12 h-12 sm:w-14 sm:h-14 lg:w-17 lg:h-17 pointer-events-none" />
            </div>
            <p className="text-[#33FF99] text-lg sm:text-xl font-medium">Management</p>
          </div>

        </div>

        {/* ---------- COLUMN 2 ---------- */}
        <div className="relative flex flex-col items-center text-center gap-8 sm:gap-12 lg:gap-15">

          {/* LINE (ABSOLUTE) */}
        {/* LINE (ABSOLUTE) */}
          <div className="hidden md:block absolute left-[4rem] bg-[#16FF99] w-[7px] h-[200px] top-[12px]" />

          {/* TOP ITEM */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 relative z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/passport.svg" className="w-12 h-12 sm:w-14 sm:h-14 lg:w-17 lg:h-17 pointer-events-none" />
            </div>
            <p className="text-[#33FF99] text-lg sm:text-xl font-medium">Immigration</p>
          </div>

          {/* BOTTOM ITEM */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 relative z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/house.svg" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14" />
            </div>
            <p className="text-[#33FF99] text-lg sm:text-xl font-medium">Property</p>
          </div>

        </div>

      </div>
    </section>
  );
};


