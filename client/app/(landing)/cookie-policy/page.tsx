'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/app/components/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function CookiePolicy() {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef(null);
  const cardRef = useRef(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const bgImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
              `<span style="display:inline-block;opacity:0">${char === " " ? "&nbsp;" : char}</span>`,
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
            // Subsequent items use ScrollTrigger with lenient bottom threshold
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
    });

    // Multiple refreshes for layout stability
    const timers = [
      setTimeout(() => ScrollTrigger.refresh(), 200),
      setTimeout(() => ScrollTrigger.refresh(), 1000),
    ];

    return () => {
      ctx.revert();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground transition-colors duration-300 star selection:bg-primary/30">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary via-blue-500 to-primary origin-left scale-x-0"
        />
      </div>

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-8 text-foreground tracking-tight">
            {t.cookiePolicy.title}
          </h1>
          <p
            ref={descRef}
            className="text-lg md:text-xl opacity-70 max-w-3xl mx-auto leading-relaxed"
          >
            {t.cookiePolicy.intro}
          </p>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            ref={cardRef}
            className="bg-card p-4 relative overflow-hidden rounded-3xl shadow-2xl"
          >
            <Image
              ref={bgImageRef}
              src="/bgSvg.svg"
              alt="background"
              width={1500}
              height={1500}
              className="absolute top-1/2 left-1/2 scale-[3] -translate-x-1/2 -translate-y-1/2 rotate-20 opacity-40"
            />

            <div className="bg-card rounded-[2rem] p-8 md:p-12 relative border border-white/5">
              {/* Section 1: Introduction */}
              <div
                ref={(el) => {
                  itemsRef.current[0] = el;
                }}
                className="flex gap-6 mb-12"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  01
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s1Title}
                  </h2>
                  <p className="opacity-80 leading-relaxed mb-3">
                    {t.cookiePolicy.s1p1}
                  </p>
                  <p className="opacity-80 leading-relaxed">
                    {t.cookiePolicy.s1p2}
                  </p>
                </div>
              </div>

              {/* Section 2: What Are Cookies */}
              <div
                ref={(el) => {
                  itemsRef.current[1] = el;
                }}
                className="flex gap-6 mb-12"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  02
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s2Title}
                  </h2>
                  <p className="opacity-80 leading-relaxed mb-3">
                    {t.cookiePolicy.s2p1}
                  </p>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s2p2}
                  </p>
                  <ul className="list-disc ml-6 opacity-80 leading-relaxed space-y-1">
                    <li>{t.cookiePolicy.s2li1}</li>
                    <li>{t.cookiePolicy.s2li2}</li>
                    <li>{t.cookiePolicy.s2li3}</li>
                    <li>{t.cookiePolicy.s2li4}</li>
                  </ul>
                  <p className="opacity-80 leading-relaxed mt-3">
                    {t.cookiePolicy.s2p3}
                  </p>
                </div>
              </div>

              {/* Section 3: Types of Cookies */}
              <div
                ref={(el) => {
                  itemsRef.current[2] = el;
                }}
                className="flex gap-6 mb-12"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  03
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s3Title}
                  </h2>
                  <p className="opacity-80 leading-relaxed mb-4">
                    {t.cookiePolicy.s3p1}
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                    {t.cookiePolicy.s31Title}
                  </h3>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s31p1}
                  </p>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s31p2}
                  </p>
                  <ul className="list-disc ml-6 opacity-80 leading-relaxed space-y-1 mb-3">
                    <li>{t.cookiePolicy.s31li1}</li>
                    <li>{t.cookiePolicy.s31li2}</li>
                    <li>{t.cookiePolicy.s31li3}</li>
                    <li>{t.cookiePolicy.s31li4}</li>
                    <li>{t.cookiePolicy.s31li5}</li>
                    <li>{t.cookiePolicy.s31li6}</li>
                  </ul>
                  <p className="opacity-80 leading-relaxed italic">
                    {t.cookiePolicy.s31italic}
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                    {t.cookiePolicy.s32Title}
                  </h3>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s32p1}
                  </p>
                  <ul className="list-disc ml-6 opacity-80 leading-relaxed space-y-1 mb-3">
                    <li>{t.cookiePolicy.s32li1}</li>
                    <li>{t.cookiePolicy.s32li2}</li>
                    <li>{t.cookiePolicy.s32li3}</li>
                    <li>{t.cookiePolicy.s32li4}</li>
                  </ul>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s32p2}
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                    {t.cookiePolicy.s33Title}
                  </h3>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s33p1}
                  </p>
                  <ul className="list-disc ml-6 opacity-80 leading-relaxed space-y-1 mb-3">
                    <li>{t.cookiePolicy.s33li1}</li>
                    <li>{t.cookiePolicy.s33li2}</li>
                    <li>{t.cookiePolicy.s33li3}</li>
                    <li>{t.cookiePolicy.s33li4}</li>
                  </ul>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s33p2}
                  </p>
                  <ul className="list-disc ml-6 opacity-80 leading-relaxed space-y-1 mb-3">
                    <li>{t.cookiePolicy.s33li5}</li>
                    <li>{t.cookiePolicy.s33li6}</li>
                    <li>{t.cookiePolicy.s33li7}</li>
                    <li>{t.cookiePolicy.s33li8}</li>
                  </ul>
                  <p className="opacity-80 leading-relaxed">
                    {t.cookiePolicy.s33p3}
                  </p>
                </div>
              </div>

              {/* Section 4: Cookies We Do Not Use */}
              <div
                ref={(el) => {
                  itemsRef.current[3] = el;
                }}
                className="flex gap-6 mb-12"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  04
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s4Title}
                  </h2>
                  <p className="opacity-80 leading-relaxed mb-3">
                    {t.cookiePolicy.s4p1}
                  </p>
                  <ul className="list-disc ml-6 opacity-80 leading-relaxed space-y-1 mb-3">
                    <li>{t.cookiePolicy.s4li1}</li>
                    <li>{t.cookiePolicy.s4li2}</li>
                    <li>{t.cookiePolicy.s4li3}</li>
                    <li>{t.cookiePolicy.s4li4}</li>
                    <li>{t.cookiePolicy.s4li5}</li>
                    <li>{t.cookiePolicy.s4li6}</li>
                  </ul>
                  <p className="opacity-80 leading-relaxed font-semibold">
                    {t.cookiePolicy.s4bold}
                  </p>
                </div>
              </div>

              {/* Section 5: Why We Use Cookies */}
              <div
                ref={(el) => {
                  itemsRef.current[4] = el;
                }}
                className="flex gap-6 mb-12"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  05
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s5Title}
                  </h2>
                  <p className="opacity-80 leading-relaxed mb-4">
                    {t.cookiePolicy.s5p1}
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t.cookiePolicy.s51Title}
                  </h3>
                  <p className="opacity-80 leading-relaxed mb-4">
                    {t.cookiePolicy.s51p}
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t.cookiePolicy.s52Title}
                  </h3>
                  <p className="opacity-80 leading-relaxed mb-4">
                    {t.cookiePolicy.s52p}
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t.cookiePolicy.s53Title}
                  </h3>
                  <p className="opacity-80 leading-relaxed mb-4">
                    {t.cookiePolicy.s53p}
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t.cookiePolicy.s54Title}
                  </h3>
                  <p className="opacity-80 leading-relaxed">
                    {t.cookiePolicy.s54p}
                  </p>
                </div>
              </div>

              {/* Section 6: Consent Management */}
              <div
                ref={(el) => {
                  itemsRef.current[5] = el;
                }}
                className="flex gap-6 mb-12"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  06
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s6Title}
                  </h2>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t.cookiePolicy.s61Title}
                  </h3>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s61p}
                  </p>
                  <ul className="list-disc ml-6 opacity-80 leading-relaxed space-y-1 mb-4">
                    <li>{t.cookiePolicy.s61li1}</li>
                    <li>
                      {t.cookiePolicy.s61li2}
                    </li>
                    <li>{t.cookiePolicy.s61li3}</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t.cookiePolicy.s62Title}
                  </h3>
                  <p className="opacity-80 leading-relaxed mb-4">
                    {t.cookiePolicy.s62p}
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t.cookiePolicy.s63Title}
                  </h3>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s63p1}
                  </p>
                  <p className="opacity-80 leading-relaxed">
                    {t.cookiePolicy.s63p2}
                  </p>
                </div>
              </div>

              {/* Section 7: Cookie Retention */}
              <div
                ref={(el) => {
                  itemsRef.current[6] = el;
                }}
                className="flex gap-6 mb-12"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  07
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s7Title}
                  </h2>
                  <p className="opacity-80 leading-relaxed mb-4">
                    {t.cookiePolicy.s7p1}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 mb-4">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 px-4 py-2 text-left text-foreground">
                            {t.cookiePolicy.tableColType}
                          </th>
                          <th className="border border-gray-600 px-4 py-2 text-left text-foreground">
                            {t.cookiePolicy.tableColRetention}
                          </th>
                          <th className="border border-gray-600 px-4 py-2 text-left text-foreground">
                            {t.cookiePolicy.tableColNotes}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 opacity-80">
                            {t.cookiePolicy.tableRow1Type}
                          </td>
                          <td className="border border-gray-600 px-4 py-2 opacity-80">
                            {t.cookiePolicy.tableRow1Retention}
                          </td>
                          <td className="border border-gray-600 px-4 py-2 opacity-80">
                            {t.cookiePolicy.tableRow1Notes}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 opacity-80">
                            {t.cookiePolicy.tableRow2Type}
                          </td>
                          <td className="border border-gray-600 px-4 py-2 opacity-80">
                            {t.cookiePolicy.tableRow2Retention}
                          </td>
                          <td className="border border-gray-600 px-4 py-2 opacity-80">
                            {t.cookiePolicy.tableRow2Notes}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 opacity-80">
                            {t.cookiePolicy.tableRow3Type}
                          </td>
                          <td className="border border-gray-600 px-4 py-2 opacity-80">
                            {t.cookiePolicy.tableRow3Retention}
                          </td>
                          <td className="border border-gray-600 px-4 py-2 opacity-80">
                            {t.cookiePolicy.tableRow3Notes}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="opacity-80 leading-relaxed">
                    {t.cookiePolicy.s7p2}
                  </p>
                </div>
              </div>

              {/* Section 8: Third-Party Cookies */}
              <div
                ref={(el) => {
                  itemsRef.current[7] = el;
                }}
                className="flex gap-6 mb-12"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  08
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s8Title}
                  </h2>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s8p1}
                  </p>
                  <ul className="list-disc ml-6 opacity-80 leading-relaxed space-y-1 mb-4">
                    <li>{t.cookiePolicy.s8li1}</li>
                    <li>{t.cookiePolicy.s8li2}</li>
                    <li>{t.cookiePolicy.s8li3}</li>
                  </ul>
                  <p className="opacity-80 leading-relaxed">
                    {t.cookiePolicy.s8p2}
                  </p>
                </div>
              </div>

              {/* Section 9: How to Control Cookies */}
              <div
                ref={(el) => {
                  itemsRef.current[8] = el;
                }}
                className="flex gap-6 mb-12"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  09
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s9Title}
                  </h2>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s9p1}
                  </p>
                  <ul className="list-disc ml-6 opacity-80 leading-relaxed space-y-1 mb-4">
                    <li>{t.cookiePolicy.s9li1}</li>
                    <li>{t.cookiePolicy.s9li2}</li>
                    <li>{t.cookiePolicy.s9li3}</li>
                  </ul>
                  <p className="opacity-80 leading-relaxed mb-2">
                    {t.cookiePolicy.s9p2}
                  </p>
                  <ul className="list-disc ml-6 opacity-80 leading-relaxed space-y-1">
                    <li>{t.cookiePolicy.s9li4}</li>
                    <li>{t.cookiePolicy.s9li5}</li>
                    <li>{t.cookiePolicy.s9li6}</li>
                    <li>{t.cookiePolicy.s9li7}</li>
                    <li>{t.cookiePolicy.s9li8}</li>
                  </ul>
                </div>
              </div>

              {/* Section 10: Updates to This Policy */}
              <div
                ref={(el) => {
                  itemsRef.current[9] = el;
                }}
                className="flex gap-6 mb-12"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  10
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s10Title}
                  </h2>
                  <p className="opacity-80 leading-relaxed mb-3">
                    {t.cookiePolicy.s10p1}
                  </p>
                  <p className="opacity-80 leading-relaxed">
                    {t.cookiePolicy.s10p2}
                  </p>
                </div>
              </div>

              {/* Section 11: Contact Us */}
              <div
                ref={(el) => {
                  itemsRef.current[10] = el;
                }}
                className="flex gap-6 pb-8"
              >
                <div className="policy-number text-6xl font-bold text-primary shrink-0">
                  11
                </div>
                <div className="flex-1 min-w-0 policy-content">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t.cookiePolicy.s11Title}
                  </h2>
                  <p className="opacity-80 leading-relaxed mb-4">
                    {t.cookiePolicy.s11p1}
                  </p>
                  <p className="opacity-80 leading-relaxed">
                    <strong className="text-foreground">{t.cookiePolicy.s11email}</strong>{" "}
                    privacy@orr.solutions
                    <br />
                    <strong className="text-foreground">{t.cookiePolicy.s11website}</strong>{" "}
                    www.orr.solutions
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
