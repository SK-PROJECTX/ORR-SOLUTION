"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const PictureSection = () => {
  const glowRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(glowRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 0.9, scale: 1, duration: 1.5, scrollTrigger: { trigger: glowRef.current, start: "top 80%" } }
    );

    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.3, scrollTrigger: { trigger: imageRef.current, start: "top 80%" } }
    );
  }, []);

  return (
    <div className="relative flex justify-center items-center py-[9rem]">
      <img
        ref={glowRef}
        src="/images/n_curl.svg"
        alt="glow"
        className="absolute opacity-90 pointer-events-none select-none z-[-5]"
      />
      <img ref={imageRef} src="/images/handshake.png" alt="" className="w-5xl " />
    </div>
  );
};