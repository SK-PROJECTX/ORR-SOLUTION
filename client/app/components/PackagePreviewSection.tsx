'use client';

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function PackagePreviewSection() {
  const { t, interpolate } = useLanguage();
  const pricingParams = {
    currency: t.dashboard.pricing.currency,
    meetingPrice: t.dashboard.pricing.meetingPrice,
    reportPrice: t.dashboard.pricing.reportPrice,
    proData: t.dashboard.pricing.proData,
  };
  const router = useRouter();
  const titleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.8, delay: 0.2 + i * 0.1, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-24 px-6 relative overflow-hidden bg-background text-foreground transition-colors duration-300" >
      

      <div className="relative z-10 max-w-5xl mx-auto">
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t.packagePreview.title}
          </h2>
          <p className="opacity-70 text-lg md:text-xl font-light">
            {t.packagePreview.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* Meetings Block */}
          <div
            ref={el => { cardsRef.current[0] = el; }}
            className="glass-panel border border-gray-200 dark:border-white/10 p-10 md:p-12 rounded-[40px] flex flex-col justify-between hover:border-primary/30 transition-colors duration-500 shadow-sm dark:shadow-none"
          >
            <div className="space-y-6">
              <h3 className="text-primary font-bold text-xs uppercase tracking-[0.3em]">{t.packagePreview.meetings.title}</h3>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">
                  {interpolate(t.packagePreview.meetings.price, pricingParams)}<span className="text-lg font-normal opacity-50 ml-2">{interpolate(t.packagePreview.meetings.unit, pricingParams)}</span>
                </div>
                <p className="opacity-80 text-lg font-medium leading-relaxed pt-2">
                  {t.packagePreview.meetings.description}
                </p>
              </div>
            </div>
          </div>

          {/* Report Block */}
          <div
            ref={el => { cardsRef.current[1] = el; }}
            className="glass-panel border border-gray-200 dark:border-white/10 p-10 md:p-12 rounded-[40px] flex flex-col justify-between hover:border-primary/30 transition-colors duration-500 shadow-sm dark:shadow-none"
          >
            <div className="space-y-6">
              <h3 className="text-primary font-bold text-xs uppercase tracking-[0.3em]">{t.packagePreview.report.title}</h3>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold leading-tight">
                  {interpolate(t.packagePreview.report.description, pricingParams)}
                </div>
                <p className="opacity-60 text-sm leading-relaxed pt-4 italic font-light">
                  {t.packagePreview.report.notes}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center space-y-12">
          <p className="opacity-70 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            {t.packagePreview.footerDescription}
          </p>

          <button
            onClick={() => router.push('/login')}
            className="inline-flex items-center cursor-pointer justify-center bg-primary text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-lemon hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(14,194,119,0.2)]"
          >
            {t.packagePreview.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
