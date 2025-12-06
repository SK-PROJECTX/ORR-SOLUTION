import Image from "next/image";
import { PictureSection } from "../../components/about/PictureSection";
import { ProcessSection } from "../../components/about/ProcessSection";
import { CoreVisionSection } from "../../components/about/CoreVisionSection";

export default function AboutUs() {
  return (
    <section className="relative w-full  py-30 pt-[10rem] text-white">
      <div className="relative ">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-12">
          About <span className="text-white">Us</span>
        </h2>

        <div className="relative flex justify-center items-center">
          <img
            src="/images/full_curl.svg"
            alt="glow"
            className="absolute  w-[100vw] opacity-90 pointer-events-none select-none z-[-5]"
          />
          <div className="rounded-[4rem] p-3 bg-white/20 backdrop-blur-xl">
            <div className=" w-full max-w-7xl bg  border-white/10 backdrop-blur-md bg-card z-1 rounded-[4rem]   shadow-lg space-y-7 ">
              <h3 className="text-center text-5xl font-bold mb-6 p-10 md:p-15">
                Company <span className="text-[#00FF66]">Background</span>
              </h3>

              <p className="text-center text-base md:text-xl lg:text-2xl text-left  font-light text-gray-300 leading-relaxed mx-auto mb-16 px-10 md:px-17">
                Lorem ipsm practitioner, we take time to understand your whole
                business before prescribing solutions. We fix what's slowing you
                down, strengthen your systems, and when you need specialised
                expertise, we tap into our global network of
              </p>

              <div className="rounded-[3rem] p-2 bg-gradient-to-r from-[#379898] to-[#40B25B]">
                <div className="bg-card px-4 py-15 md:px-10 rounded-[3rem]">
                  <h3 className="text-center text-3xl font-bold mb-10">
                    Credentials
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 place-items-center">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className=" w-7 h-7 bg-[#1F6F75] rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-[#05CC79] rounded-full" />
                        </div>
                        <p className="text-gray-300">Lorem ipsembhf</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

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
      <ProcessSection />
      <CoreVisionSection />
    </section>
  );
}