'use client';

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicePillar() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRef = useRef(null);
  const bulletsRef = useRef<(HTMLDivElement | null)[]>([]);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 80%" }
        }
      );

      gsap.fromTo(cardRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 75%" }
        }
      );

      bulletsRef.current.forEach((bullet, i) => {
        if (bullet) {
          gsap.fromTo(bullet,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, delay: 0.5 + i * 0.15, ease: "back.out(1.7)",
              scrollTrigger: { trigger: cardRef.current, start: "top 70%" }
            }
          );
        }
      });

      itemsRef.current.forEach((item, i) => {
        if (item) {
          gsap.fromTo(item,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.6 + i * 0.2, ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 85%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full flex flex-col items-end py-12 sm:py-16 lg:py-20 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/path-to-your-stars-bg.png')" }}>
      <h2 ref={titleRef} className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-extrabold text-center mb-4 sm:mb-10 lg:mb-14 font-poppins font-bold w-full">
        Quick Service Snapshot - 
        <span className="text-[#3DFF7C] font-poppins font-extrAbold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          3 Pillars
        </span>
      </h2>

      <p ref={subtitleRef} className="text-center text-white font-poppins font-light mb-12 sm:mb-16 lg:mb-20 w-full">All three pillars are shaped around your context - no generic playbooks</p>

      <div className="relative w-full max-w-7xl mr-0">
        <div ref={cardRef} className="relative w-full bg-card backdrop-blur-md border border-[#40B25B] lg:border-t-[0.5rem] lg:border-l-[0.5rem] lg:border-b-[0.5rem] lg:border-r-0 rounded-2xl lg:rounded-tl-[91.25px] lg:rounded-bl-[91.25px] lg:rounded-tr-none lg:rounded-br-none ml-0 p-10 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-[60px_1fr] gap-6 md:gap-8">
            <div className="hidden md:flex relative flex-col items-center">
              <div className="absolute top-[32px] bottom-[52px] w-[4px] mb-20 bg-[#05CC79]"></div>

              <div ref={el => bulletsRef.current[0] = el} className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#1F6F75] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mb-10 lg:mb-12">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#05CC79] rounded-full"></div>
              </div>

              <div ref={el => bulletsRef.current[1] = el} className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#1F6F75] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mt-42 lg:mb-12">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#05CC79] rounded-full"></div>
              </div>

              <div ref={el => bulletsRef.current[2] = el} className="relative z-10 w-8 lg:w-10 h-8 lg:h-10 bg-[#1F6F75] rounded-full flex items-center justify-center shadow-[0_0_20px_#3DFF7C] mt-36">
                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#05CC79] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-8 sm:space-y-10 lg:space-y-14">
              <div ref={el => itemsRef.current[0] = el} className="relative">
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <Link href="/services/strategy-advisory-compliant" className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins hover:text-[#3DFF7C] transition-colors">
                  Strategic Advisory & Compliance
                </Link>                
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins">
                 Regulatory clarity, ESG and sustainability frameworks, biotechnology and environmental questions - distilled into simple, usable direction for your organisation.
                </p>
                <Link href="/services/strategy-advisory-compliant">
                  <button className="mt-10 bg-gradient-to-r from-[#28B026] to-[#03F6CA] text-[#0C294D] p-4 font-poppins font-semibold  rounded-lg cursor-pointer">Explore Strategic Advisory & Compliance</button>
                </Link>
              </div>

              <div ref={el => itemsRef.current[1] = el} className="relative">
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins">
                 Digital Systems, Automation & AI
                </h3>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins">
                 SOPs, workflows, portals, dashboards, and AI-assisted tools designed 
                around your team's habits, constraints and growth plans
                </p>
                <Link href="/services/operational-systems-infrastructure">
                  <button className="mt-10 bg-gradient-to-r from-[#28B026] to-[#03F6CA] text-[#0C294D] p-4 font-poppins font-semibold rounded-lg cursor-pointer">Explore Digital Systems, Automation & AI</button>
                </Link>
              </div>

              <div ref={el => itemsRef.current[2] = el} className="relative">
                <div className="md:hidden w-6 h-6 bg-[#3DFF7C] rounded-full mb-3"></div>
                <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-2 sm:mb-3 font-poppins">
                 Living Systems & Regeneration
                </h3>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed font-poppins">
                 Support for land, water, species, and ecosystems - tailored to your sites 
                your risks, and your opportunities
                </p>
                <Link href="/services/living-systems-regeneration">
                  <button className="mt-10 bg-gradient-to-r from-[#28B026] to-[#03F6CA] text-[#0C294D] p-4 font-poppins font-semibold rounded-lg cursor-pointer">Explore Living Systems & Regeneration</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
