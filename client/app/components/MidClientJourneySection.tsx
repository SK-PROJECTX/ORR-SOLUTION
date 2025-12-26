'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MidClientJourneySection() {
  const titleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 60, rotateY: -15 },
            { opacity: 1, y: 0, rotateY: 0, duration: 0.8, delay: i * 0.15, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 star opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-16 text-white">
          Mid Client <span className="text-primary">Journey</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div ref={el => { cardsRef.current[0] = el; }} className="bg-[#0EC277] rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">Step 1:</h3>
            <h4 className="text-lg font-semibold text-white mb-3">First Meeting</h4>
            <p className="text-white text-sm mb-4">You share your challenges; we listen, ask focused questions, and map your context and priorities.</p>
            <p className="text-white text-xs">Billed at €40/hour pro-rata</p>
          </div>
          
          <div ref={el => { cardsRef.current[1] = el; }} className="bg-[#0EC277] rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">Step 2:</h3>
            <h4 className="text-lg font-semibold text-white mb-3">Report Delivery</h4>
            <p className="text-white text-sm mb-4">You receive your decision-ready ORR report with root causes, quick fixes, and longer-term recommendations tailored to your organisation.</p>
            <p className="text-white text-xs">Report fee based on complexity, capped at €220</p>
          </div>
          
          <div ref={el => { cardsRef.current[2] = el; }} className="bg-[#0EC277] rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">Step 3:</h3>
            <h4 className="text-lg font-semibold text-white mb-3">Decision Point</h4>
            <p className="text-white text-sm">You decide how to use it:</p>
            <ul className="text-white text-sm mt-2 space-y-1">
              <li>- drive change internally,</li>
              <li>- brief other partners, or</li>
              <li>- continue with ORR to co-implement the solutions.</li>
            </ul>
          </div>
          
          <div ref={el => { cardsRef.current[3] = el; }} className="bg-[#0EC277] rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">Step 4:</h3>
            <h4 className="text-lg font-semibold text-white mb-3">Ongoing Partnership</h4>
            <p className="text-white text-sm">If you continue, we deploy solutions, monitor progress, and optimise as you grow — through a tailored retainer package aligned with your budget, pace, and customer needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
