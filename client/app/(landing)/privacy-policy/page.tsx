'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from "@/app/components/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicy() {
  const { t, interpolate } = useLanguage();
  const pricingParams = {
    currency: t.dashboard.pricing.currency,
    meetingPrice: t.dashboard.pricing.meetingPrice,
    reportPrice: t.dashboard.pricing.reportPrice,
    proData: t.dashboard.pricing.proData,
  };
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef(null);
  const cardRef = useRef(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const bgImageRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 1023px)",
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        // 1. Startup Timeline (Immediate Load)
        const startupTl = gsap.timeline();

        // Scroll Progress Animation
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1,
          },
        });

        // Title Animation (Character typewriter)
        const title = titleRef.current;
        if (title) {
          const text = title.textContent;
          title.innerHTML = text!
            .split("")
            .map(
              (char) =>
                `<span style="display:inline-block;opacity:0">${
                  char === " " ? "&nbsp;" : char
                }</span>`,
            )
            .join("");

          startupTl.to(title.children, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: "power2.out",
          });
        }

        // Description Animation
        startupTl.fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        );

        // Card Animation (Immediate)
        if (cardRef.current) {
          startupTl.fromTo(
            cardRef.current,
            { opacity: 0, scale: 0.95, rotateX: 15, transformPerspective: 1000 },
            {
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: 1,
              ease: "power4.out",
            },
            "-=0.6",
          );

          // Parallax background image
          gsap.to(bgImageRef.current, {
            yPercent: 15,
            rotate: 25,
            ease: "none",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // Section Items Animation
        itemsRef.current.forEach((item, index) => {
          if (item) {
            const number = item.querySelector(".policy-number");
            const content = item.querySelector(".policy-content");

            if (index < 2) {
              // First two items animate with startup timeline
              startupTl.fromTo(
                [number, content],
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power3.out",
                },
                "-=0.5",
              );
            } else {
              // Subsequent items use ScrollTrigger with lenient threshold
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: item,
                  start: "top 98%",
                  toggleActions: "play none none reverse",
                },
              });

              tl.fromTo(
                number,
                { opacity: 0, scale: 0, rotate: -180 },
                {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  duration: 0.6,
                  ease: "back.out(1.7)",
                },
              ).fromTo(
                content,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power3.out",
                },
                "-=0.4",
              );
            }
          }
        });
      },
    );

    // Multiple refreshes for layout stability
    const timers = [
      setTimeout(() => ScrollTrigger.refresh(), 200),
      setTimeout(() => ScrollTrigger.refresh(), 1000),
    ];

    return () => {
      mm.revert();
      timers.forEach(clearTimeout);
    };
  }, []);

  const p = t.privacyPolicy;

  return (
    <div ref={containerRef} className="min-h-screen text-foreground star selection:bg-primary/30">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary via-blue-500 to-primary origin-left scale-x-0"
        />
      </div>

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">
            {p.title}
          </h1>
          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {p.intro}
          </p>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            ref={cardRef}
            className="bg-card/50 backdrop-blur-xl border border-white/10 p-4 relative overflow-hidden rounded-3xl shadow-2xl"
          >
            <Image
              ref={bgImageRef}
              src="/bgSvg.svg"
              alt="background"
              width={1500}
              height={1500}
              className="absolute top-1/2 left-1/2 scale-[3] -translate-x-1/2 -translate-y-1/2 rotate-20 opacity-40"
            />

            <div className="bg-card/80 rounded-[2rem] p-8 md:p-12 relative border border-white/5">
              {/* Section 1: Introduction */}
              <div ref={(el) => { itemsRef.current[0] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">01</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s1Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-3">{p.s1p1}</p>
                  <p className="text-gray-300 leading-relaxed font-semibold">{p.s1p2}</p>
                </div>
              </div>

              {/* Section 2: Who We Are */}
              <div ref={(el) => { itemsRef.current[1] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">02</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s2Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-3">{p.s2p1}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
                    <li>{p.s2li1}</li>
                    <li>{p.s2li2}</li>
                    <li>{p.s2li3}</li>
                    <li>{p.s2li4}</li>
                    <li>{p.s2li5}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-3">{p.s2p2}</p>
                  <p className="text-gray-300 leading-relaxed">
                    {p.s2p3} <span className="text-primary">{p.s15email}</span>
                  </p>
                </div>
              </div>

              {/* Section 3: Data We Collect */}
              <div ref={(el) => { itemsRef.current[2] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">03</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s3Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">{p.s3p1}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s31Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>{p.s31li1}</li>
                    <li>{p.s31li2}</li>
                    <li>{p.s31li3}</li>
                    <li>{p.s31li4}</li>
                    <li>{p.s31li5}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">{p.s31note}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s32Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>{p.s32li1}</li>
                    <li>{p.s32li2}</li>
                    <li>{p.s32li3}</li>
                    <li>{p.s32li4}</li>
                    <li>{p.s32li5}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">{p.s32note}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s33Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>{p.s33li1}</li>
                    <li>{p.s33li2}</li>
                    <li>{p.s33li3}</li>
                    <li>{p.s33li4}</li>
                    <li>{p.s33li5}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">{p.s33note}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s34Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>{p.s34li1}</li>
                    <li>{p.s34li2}</li>
                    <li>{p.s34li3}</li>
                    <li>{p.s34li4}</li>
                    <li>{p.s34li5}</li>
                    <li>{p.s34li6}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">{p.s34note}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s35Title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">{p.s35p1}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>{p.s35li1}</li>
                    <li>{p.s35li2}</li>
                    <li>{p.s35li3}</li>
                    <li>{p.s35li4}</li>
                    <li>{p.s35li5}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-3 italic">{p.s35note}</p>
                  <p className="text-gray-300 leading-relaxed mb-6 font-semibold">{p.s35warning}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s36Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>{p.s36li1}</li>
                    <li>{p.s36li2}</li>
                    <li>{p.s36li3}</li>
                    <li>{p.s36li4}</li>
                    <li>{p.s36li5}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed italic">{p.s36note}</p>
                </div>
              </div>

              {/* Section 4: How We Collect Data */}
              <div ref={(el) => { itemsRef.current[3] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">04</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s4Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-3">{p.s4p1}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
                    <li>{p.s4li1}</li>
                    <li>{p.s4li2}</li>
                    <li>{p.s4li3}</li>
                    <li>{p.s4li4}</li>
                    <li>{p.s4li5}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed font-semibold">{p.s4footer}</p>
                </div>
              </div>

              {/* Section 5: Why We Process Data */}
              <div ref={(el) => { itemsRef.current[4] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">05</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s5Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">{p.s5p1}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s51Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>{p.s51li1}</li>
                    <li>{p.s51li2}</li>
                    <li>{p.s51li3}</li>
                    <li>{p.s51li4}</li>
                    <li>{p.s51li5}</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s52Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>{p.s52li1}</li>
                    <li>{p.s52li2}</li>
                    <li>{p.s52li3}</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s53Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>{p.s53li1}</li>
                    <li>{p.s53li2}</li>
                    <li>{p.s53li3}</li>
                    <li>{p.s53li4}</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s54Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>{p.s54li1}</li>
                    <li>{p.s54li2}</li>
                    <li>{p.s54li3}</li>
                    <li>{p.s54li4}</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s55Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>{p.s55li1}</li>
                    <li>{p.s55li2}</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s56Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
                    <li>{p.s56li1}</li>
                    <li>{p.s56li2}</li>
                    <li>{p.s56li3}</li>
                  </ul>
                </div>
              </div>

              {/* Section 6: Legal Basis */}
              <div ref={(el) => { itemsRef.current[5] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">06</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s6Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">{p.s6p1}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s61Title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">{interpolate(p.s61p1, pricingParams)}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s62Title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">{interpolate(p.s62p1, pricingParams)}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>{p.s62li1}</li>
                    <li>{p.s62li2}</li>
                    <li>{p.s62li3}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">{p.s62note}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s63Title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">{p.s63p1}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>{p.s63li1}</li>
                    <li>{p.s63li2}</li>
                    <li>{p.s63li3}</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s64Title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">{p.s64p1}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
                    <li>{p.s64li1}</li>
                    <li>{p.s64li2}</li>
                    <li>{p.s64li3}</li>
                  </ul>
                </div>
              </div>

              {/* Section 7: Data Retention */}
              <div ref={(el) => { itemsRef.current[6] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">07</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s7Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">{p.s7p1}</p>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse border border-gray-600">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 px-4 py-2 text-left text-white">{p.tableColCategory}</th>
                          <th className="border border-gray-600 px-4 py-2 text-left text-white">{p.tableColRetention}</th>
                          <th className="border border-gray-600 px-4 py-2 text-left text-white">{p.tableColNotes}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {p.tableRows.map((row: any, idx: number) => (
                          <tr key={idx}>
                            <td className="border border-gray-600 px-4 py-2 text-gray-300">{row.category}</td>
                            <td className="border border-gray-600 px-4 py-2 text-gray-300">{row.retention}</td>
                            <td className="border border-gray-600 px-4 py-2 text-gray-300">{row.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-gray-300 leading-relaxed font-semibold">{p.s7footer}</p>
                </div>
              </div>

              {/* Section 8: Data Sharing */}
              <div ref={(el) => { itemsRef.current[7] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">08</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s8Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">{p.s8p1}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s81Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>{p.s81li1}</li>
                    <li>{p.s81li2}</li>
                    <li>{p.s81li3}</li>
                    <li>{p.s81li4}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">{p.s81note}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s82Title}</h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>{p.s82li1}</li>
                    <li>{p.s82li2}</li>
                    <li>{p.s82li3}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">{p.s82note}</p>

                  <h3 className="text-xl font-semibold text-white mb-3">{p.s83Title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">{p.s83p1}</p>

                  <p className="text-gray-300 leading-relaxed font-semibold">
                    {p.s8footer1}
                    <br />
                    {p.s8footer2}
                  </p>
                </div>
              </div>

              {/* Section 9: Security Measures */}
              <div ref={(el) => { itemsRef.current[8] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">09</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s9Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-3">{p.s9p1}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
                    <li>{p.s9li1}</li>
                    <li>{p.s9li2}</li>
                    <li>{p.s9li3}</li>
                    <li>{p.s9li4}</li>
                    <li>{p.s9li5}</li>
                    <li>{p.s9li6}</li>
                    <li>{p.s9li7}</li>
                  </ul>
                </div>
              </div>

              {/* Section 10: Your Rights */}
              <div ref={(el) => { itemsRef.current[9] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">10</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s10Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-3">{p.s10p1}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
                    <li>{p.s10li1}</li>
                    <li>{p.s10li2}</li>
                    <li>{p.s10li3}</li>
                    <li>{p.s10li4}</li>
                    <li>{p.s10li5}</li>
                    <li>{p.s10li6}</li>
                    <li>{p.s10li7}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    {p.s10footer.split(': ')[0]}: <span className="text-primary">{p.s15email}</span>
                  </p>
                </div>
              </div>

              {/* Section 11: Cookies */}
              <div ref={(el) => { itemsRef.current[10] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">11</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s11Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-3">{p.s11p1}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
                    <li>{p.s11li1}</li>
                    <li>{p.s11li2}</li>
                    <li>{p.s11li3}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-3 font-semibold">{p.s11warning}</p>
                  <p className="text-gray-300 leading-relaxed">{p.s11footer}</p>
                </div>
              </div>

              {/* Section 12: Automated Decision-Making */}
              <div ref={(el) => { itemsRef.current[11] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">12</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s12Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-3">{p.s12p1}</p>
                  <p className="text-gray-300 leading-relaxed">{p.s12p2}</p>
                </div>
              </div>

              {/* Section 13: International Data Transfers */}
              <div ref={(el) => { itemsRef.current[12] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">13</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s13Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-3">{p.s13p1}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
                    <li>{p.s13li1}</li>
                    <li>{p.s13li2}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">{p.s13footer}</p>
                </div>
              </div>

              {/* Section 14: Updates */}
              <div ref={(el) => { itemsRef.current[13] = el; }} className="flex gap-6 mb-12">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">14</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s14Title}</h2>
                  <p className="text-gray-300 leading-relaxed mb-3">{p.s14p1}</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
                    <li>{p.s14li1}</li>
                    <li>{p.s14li2}</li>
                    <li>{p.s14li3}</li>
                    <li>{p.s14li4}</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">{p.s14footer}</p>
                </div>
              </div>

              {/* Section 15: Contact */}
              <div ref={(el) => { itemsRef.current[14] = el; }} className="flex gap-6 pb-8">
                <div className="policy-number text-6xl font-bold text-primary shrink-0">15</div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-white mb-4">{p.s15Title}</h2>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">{p.s15name}</strong>
                    <br />
                    <strong className="text-white">Website:</strong>{" "}
                    {p.s15website}
                    <br />
                    <strong className="text-white">Email:</strong>{" "}
                    {p.s15email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
