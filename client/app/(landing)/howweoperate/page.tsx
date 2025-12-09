"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ProcessSection } from "../../components/about/ProcessSection";
import { CoreVisionSection } from "../../components/about/CoreVisionSection";
import { useScrollSplit } from "@/hooks/useScrollSplit";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeOperate() {

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
  }, []);
  
  return (
    <section className="relative w-full  py-30 pt-[10rem] text-white">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 space-y-20">
        <h2 className="text-center text-emerald-400 text-6xl md:text-5xl font-bold mb-12">
          How We<span className="text-white"> Operate</span> </h2> 
        </div>

      {/* <CoreVisionSection /> */}
      <ProcessSection />
    </section>
  )
}

