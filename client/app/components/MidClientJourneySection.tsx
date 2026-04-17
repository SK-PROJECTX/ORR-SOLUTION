'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function MidClientJourneySection() {
  const { t, interpolate } = useLanguage();
  const pricingParams = {
    currency: t.dashboard.pricing.currency,
    meetingPrice: t.dashboard.pricing.meetingPrice,
    reportPrice: t.dashboard.pricing.reportPrice,
    hrs: t.dashboard.pricing.hrs,
    proData: t.dashboard.pricing.proData
  };
  
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
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-16 text-white text-wrap">
          {interpolate(t.midClientJourney.title, { journey: <span className="text-primary">{t.midClientJourney.journey}</span> })}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div ref={el => { cardsRef.current[0] = el; }} className="bg-[#0EC277] rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">{t.midClientJourney.steps.s1.label}</h3>
            <h4 className="text-lg font-semibold text-white mb-3">{t.midClientJourney.steps.s1.title}</h4>
            <p className="text-white text-sm mb-4">{t.midClientJourney.steps.s1.desc}</p>
            <p className="text-white text-xs">{interpolate(t.midClientJourney.steps.s1.sub, pricingParams)}</p>
          </div>
          
          <div ref={el => { cardsRef.current[1] = el; }} className="bg-[#0EC277] rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">{t.midClientJourney.steps.s2.label}</h3>
            <h4 className="text-lg font-semibold text-white mb-3">{t.midClientJourney.steps.s2.title}</h4>
            <p className="text-white text-sm mb-4">{t.midClientJourney.steps.s2.desc}</p>
            <p className="text-white text-xs">{interpolate(t.midClientJourney.steps.s2.sub, pricingParams)}</p>
          </div>
          
          <div ref={el => { cardsRef.current[2] = el; }} className="bg-[#0EC277] rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">{t.midClientJourney.steps.s3.label}</h3>
            <h4 className="text-lg font-semibold text-white mb-3">{t.midClientJourney.steps.s3.title}</h4>
            <p className="text-white text-sm">{t.midClientJourney.steps.s3.desc}</p>
            <ul className="text-white text-sm mt-2 space-y-1">
              {t.midClientJourney.steps.s3.options.map((opt: string, i: number) => (
                <li key={i}>- {opt}</li>
              ))}
            </ul>
          </div>
          
          <div ref={el => { cardsRef.current[3] = el; }} className="bg-[#0EC277] rounded-3xl p-6 h-auto">
            <h3 className="text-xl font-bold text-white mb-4">{t.midClientJourney.steps.s4.label}</h3>
            <h4 className="text-lg font-semibold text-white mb-3">{t.midClientJourney.steps.s4.title}</h4>
            <p className="text-white text-sm">{t.midClientJourney.steps.s4.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
