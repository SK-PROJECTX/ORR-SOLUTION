"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { PictureSection } from "../../components/about/PictureSection";
import { ProcessSection } from "../../components/about/ProcessSection";
import { CoreVisionSection } from "../../components/about/CoreVisionSection";
import { useScrollSplit } from "@/hooks/useScrollSplit";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  useScrollSplit();
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const companyTitleRef = useRef(null);
  const companyTextRef = useRef(null);
  const credentialsRef = useRef(null);
  const leadershipTitleRef = useRef(null);
  const leadershipTextRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo(companyTitleRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: companyTitleRef.current, start: "top 80%" } }
    );

    gsap.fromTo(companyTextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: companyTextRef.current, start: "top 80%" } }
    );

    gsap.fromTo(credentialsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: credentialsRef.current, start: "top 80%" } }
    );

    gsap.fromTo(leadershipTitleRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: leadershipTitleRef.current, start: "top 80%" } }
    );

    gsap.fromTo(leadershipTextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: leadershipTextRef.current, start: "top 80%" } }
    );
  }, []);
  
  return (
    <section className="relative w-full  py-30 pt-[10rem] text-white">
      <div className="relative ">
        <h2 ref={titleRef} className="text-center text-4xl md:text-5xl font-bold mb-12">
          About <span className="text-white">Us</span>
        </h2>

        <div ref={cardRef} className="relative flex justify-center items-center">
          <img
            src="/images/full_curl.svg"
            alt="glow"
            className="absolute  w-[100vw] opacity-90 pointer-events-none select-none z-[-5]"
          />
          <div className="rounded-[4rem] p-3 bg-white/20 backdrop-blur-xl">
            <div className=" w-full max-w-7xl bg  border-white/10 backdrop-blur-md bg-card z-1 rounded-[4rem]   shadow-lg space-y-7 ">
              <h3 ref={companyTitleRef} className="text-center text-5xl font-bold mb-6 p-10 md:p-15">
                Company <span className="text-[#00FF66]">Background</span>
              </h3>

              <p ref={companyTextRef} className="text-center text-base md:text-xl lg:text-2xl text-left  font-light text-gray-300 leading-relaxed mx-auto mb-16 px-10 md:px-17">
                Lorem ipsm practitioner, we take time to understand your whole
                business before prescribing solutions. We fix what's slowing you
                down, strengthen your systems, and when you need specialised
                expertise, we tap into our global network of
              </p>

              <div ref={credentialsRef} className="rounded-[3rem] p-2 bg-gradient-to-r from-[#379898] to-[#40B25B]">
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

              <h3 ref={leadershipTitleRef} className="text-center text-5xl font-bold mb-6 p-10 md:p-15">
                Leadership <span className="text-[#00FF66]">Profile</span>
              </h3>

              <p ref={leadershipTextRef} className="text-center text-base md:text-xl lg:text-2xl text-left  font-light text-gray-300 leading-relaxed mx-auto pb-16 px-10 md:px-17">
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
      <div className="scroll-section"><PictureSection /></div>
      <div className="scroll-section"><ProcessSection /></div>
      <div className="scroll-section"><CoreVisionSection /></div>
      {/* <SpecialisedFocus /> */}
    </section>
  );
}

const SpecialisedFocus = () => {
  return (
    <section className="w-full bg-white/10 text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 gap-y-32 gap-x-24 place-items-center">
        
        <div className="relative flex flex-col justify-start text-center gap-15 items-center ">
          
          <div className="hidden md:block absolute left-[4rem] bg-[#16FF99] w-[7px] h-[200px] top-[12px]" />

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-28 h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/sprout.svg" className="w-17 h-17 pointer-events-none" />
            </div>
            <p className="text-[#33FF99] text-xl font-medium">Agriculture</p>
          </div>

          <div className="flex items-center gap-4 mt-4 relative z-10">
            <div className="w-28 h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/management.svg" className="w-17 h-17 pointer-events-none" />
            </div>
            <p className="text-[#33FF99] text-xl font-medium">Management</p>
          </div>

        </div>

        <div className="relative flex flex-col items-center text-center gap-15">

          <div className="hidden md:block absolute left-[4rem] bg-[#16FF99] w-[7px] h-[200px] top-[12px]" />

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-28 h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/passport.svg" className="w-17 h-17 pointer-events-none" />
            </div>
            <p className="text-[#33FF99] text-xl font-medium">Immigration</p>
          </div>

          <div className="flex items-center gap-4 mt-4 relative z-10">
            <div className="w-28 h-28 bg-card rounded-full flex items-center justify-center shadow-[0_0_40px_#16FF99]">
              <img src="/images/house.svg" className="w-14 h-14" />
            </div>
            <p className="text-[#33FF99] text-xl font-medium">Property</p>
          </div>

        </div>

      </div>
    </section>
  );
};