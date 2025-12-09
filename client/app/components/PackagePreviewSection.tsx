'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PackagePreviewSection() {
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
        }
      );

      gsap.fromTo(containerRef.current,
        { opacity: 0, rotateZ: -5 },
        { opacity: 1, rotateZ: -2, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.3 + i * 0.2, ease: "back.out(1.7)",
              scrollTrigger: { trigger: card, start: "top 85%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-24 px-6 relative overflow-hidden" >
      <div className="absolute inset-0 star opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div ref={containerRef} className="bg-[#33FF99]/50 backdrop-blur-xl rounded-[60px] pt-2 pr-0 pb-1 pl-0 transform -rotate-2 -translate-x-8 -translate-y-4">
          <div className="bg-[#2c4a63] rounded-[55px] px-12 py-16 transform rotate-2 translate-x-8  translate-y-4 scale-95">
            <h2 ref={titleRef} className="text-5xl font-bold text-center mb-16 text-white">
              Package <span className="text-[#33FF99]">Preview</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">             
              <div ref={el => cardsRef.current[0] = el} className="bg-white rounded-3xl p-8 relative border-4 border-[#0ec277]">
                <div className="bg-[#d4f8e8] text-[#00a86b] px-4 py-2 rounded-xl text-sm font-medium inline-block mb-6">
                  Meetings
                </div>
                <div className="flex items-center justify-end mb-6 absolute top-4 right-4">
                  <Image src="/flower.svg" alt="Flower diagram" width={48} height={48}  className="w-64 h-64"/>
                </div>
                <div className="text-6xl font-bold mt-18 mb-8 text-black">
                  <span className="text-gray-400 text-3xl">€</span>45<span className="text-3xl font-normal">/hrs</span>
                </div>
                <p className="text-black text-sm my-12 font-medium">pro-rata (short, focused and value-densed)</p>
                <button className="w-full bg-[#0EC277] cursor-pointer text-white py-4 rounded-full font-semibold text-lg hover:bg-[#2ee889] transition-colors flex items-center justify-center gap-2" style={{ boxShadow: '0 8px 20px rgba(51, 255, 153, 0.4)' }}>
                  <span>🔥</span> Book Now
                </button>
              </div>

              <div ref={el => cardsRef.current[1] = el} className="bg-white rounded-3xl p-8 relative border-4 border-[#0ec277]">
                <Image src="/best value.png" alt="Best value" width={120} height={40} className="absolute -top-8 left-[75%] -translate-x-1/2 w-48" />
                <div className="bg-[#d4f8e8] text-[#00a86b] px-4 py-2 rounded-xl text-sm font-medium inline-block mb-6">
                  Report Fee
                </div>
                <div className="flex items-center justify-end mb-6 absolute top-4 right-4">
                  <Image src="/flower.svg" alt="Flower diagram" width={48} height={48}  className="w-64 h-64"/>
                </div>
                <div className="text-6xl font-bold mt-18 mb-8 text-black">
                  <span className="text-gray-400 text-3xl">€</span>220
                </div>
                <p className="text-black text-sm my-12 font-medium">fee depends on complexity</p>
                <button className="w-full bg-[#0EC277] cursor-pointer text-white py-4 rounded-full font-semibold text-lg hover:bg-[#2ee889] transition-colors flex items-center justify-center gap-2" style={{ boxShadow: '0 8px 20px rgba(51, 255, 153, 0.4)' }}>
                  <span>🔥</span> Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
