'use client';

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PackagePreviewSection() {
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
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-5 dark:opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Straightforward Pricing
          </h2>
          <p className="opacity-70 text-lg md:text-xl font-light">
            A simple, transparent way to begin — with no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* Meetings Block */}
          <div
            ref={el => { cardsRef.current[0] = el; }}
            className="glass-panel border border-gray-200 dark:border-white/10 p-10 md:p-12 rounded-[40px] flex flex-col justify-between hover:border-primary/30 transition-colors duration-500 shadow-sm dark:shadow-none"
          >
            <div className="space-y-6">
              <h3 className="text-primary font-bold text-xs uppercase tracking-[0.3em]">Meetings</h3>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">
                  €45<span className="text-lg font-normal opacity-50 ml-2">/hour pro-rata</span>
                </div>
                <p className="opacity-80 text-lg font-medium leading-relaxed pt-2">
                  Short, focused, and value-dense.
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
              <h3 className="text-primary font-bold text-xs uppercase tracking-[0.3em]">The ORR Report</h3>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold leading-tight">
                  Fee depends on complexity, capped at €220.
                </div>
                <p className="opacity-60 text-sm leading-relaxed pt-4 italic font-light">
                  You’ll know the cost before we finalise it — no surprises.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center space-y-12">
          <p className="opacity-70 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            You can use the report internally, share it with partners, or continue with ORR for implementation support at the pace that suits you.
          </p>

          <button
            onClick={() => router.push('/login')}
            className="inline-flex items-center cursor-pointer justify-center bg-primary text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-lemon hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(14,194,119,0.2)]"
          >
            Book a First Meeting
          </button>
        </div>
      </div>
    </section>
  );
}
