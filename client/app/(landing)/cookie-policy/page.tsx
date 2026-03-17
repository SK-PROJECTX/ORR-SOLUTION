"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CookiePolicy() {
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
            Cookie Policy
          </h1>
          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            This Cookie Policy explains how ORR Network uses cookies and similar
            technologies on the ORR Client Portal, Admin Portal, and all
            associated digital services.
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    INTRODUCTION
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    This Cookie Policy explains how ORR Network
                    (&quot;ORR&quot;, &quot;we&quot;, &quot;us&quot;) uses
                    cookies and similar technologies on the ORR Client Portal,
                    Admin Portal, and all associated digital services
                    (&quot;Platform&quot;).
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    This document should be read together with the ORR Privacy
                    Policy.
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    WHAT ARE COOKIES?
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    Cookies are small text files placed on your device when you
                    access our Platform.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    Cookies may:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
                    <li>enable platform functionality,</li>
                    <li>remember preferences,</li>
                    <li>support security and authentication,</li>
                    <li>measure system performance.</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-3">
                    We do not use cookies for advertising, profiling, or
                    cross-site tracking.
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    TYPES OF COOKIES USED BY ORR
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    ORR uses only the categories of cookies necessary to operate
                    a secure, personalised consultation and workspace platform.
                    We do not use any third-party marketing cookies.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">
                    3.1 Essential (Strictly Necessary) Cookies
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    These cookies are required for the Platform to function and
                    cannot be disabled.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    They enable:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
                    <li>login and authentication</li>
                    <li>session integrity and security</li>
                    <li>navigation between secure areas</li>
                    <li>form submissions</li>
                    <li>payment and subscription processes</li>
                    <li>access to workspace and DS modules</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed italic">
                    Without these cookies, the Platform cannot operate.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">
                    3.2 Preference Cookies
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    These cookies store user-selected settings, including:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
                    <li>interface language</li>
                    <li>communication preferences</li>
                    <li>dashboard personalisation settings</li>
                    <li>workspace display choices</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    They improve usability but are optional. If disabled, some
                    preferences will reset each session.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-6">
                    3.3 Internal Analytics Cookies (Non-Third-Party)
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    ORR uses internal analytics only to understand:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
                    <li>which modules are used</li>
                    <li>performance and stability</li>
                    <li>tool adoption</li>
                    <li>Platform improvements</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    Characteristics:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
                    <li>no third-party tracking</li>
                    <li>no advertising networks</li>
                    <li>no cross-site identifiers</li>
                    <li>no sharing of analytics data outside ORR</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    These cookies support ORR&apos;s Behaviour Engine but do not
                    track users outside the Platform.
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    COOKIES WE DO NOT USE
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    To avoid ambiguity, ORR confirms that we do not use:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
                    <li>advertising cookies</li>
                    <li>behavioural targeting cookies</li>
                    <li>social media tracking pixels</li>
                    <li>cross-site tracking identifiers</li>
                    <li>
                      Google Ads, Meta, TikTok or LinkedIn marketing cookies
                    </li>
                    <li>retargeting cookies</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed font-semibold">
                    No user data is monetised or shared with third-party
                    advertisers.
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    WHY WE USE COOKIES
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We use cookies for the following legitimate purposes:
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    5.1 Platform Functionality
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Ensuring that secured areas such as the Workspace, Document
                    Vault, Consultations, and Billing modules function
                    correctly.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    5.2 Personalisation
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Providing content relevance, improving the interface, and
                    remembering user preferences.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    5.3 Security
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Preventing session hijacking, verifying login integrity, and
                    detecting abuse.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    5.4 Performance & Analytics
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Understanding how features are used to maintain system
                    reliability and improve the user experience.
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    CONSENT MANAGEMENT
                  </h2>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    6.1 Consent on First Visit
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    Upon first access, users are presented with a cookie banner
                    that:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
                    <li>explains categories of cookies</li>
                    <li>
                      allows acceptance or rejection of non-essential cookies
                    </li>
                    <li>always enables essential cookies</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    6.2 Modifying Consent
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Users may change their cookie settings at any time through
                    the Portal&apos;s &quot;Cookie Preferences&quot; page.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    6.3 Withdrawal of Consent
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    If consent is withdrawn, the Platform will deactivate all
                    non-essential cookies.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Essential cookies remain because they are required for core
                    Platform operation.
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    COOKIE RETENTION DURATIONS
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    To comply with GDPR storage limitation principles, ORR
                    applies:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 mb-4">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 px-4 py-2 text-left text-white">
                            Cookie Type
                          </th>
                          <th className="border border-gray-600 px-4 py-2 text-left text-white">
                            Retention Period
                          </th>
                          <th className="border border-gray-600 px-4 py-2 text-left text-white">
                            Notes
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Essential Cookies
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Session-only
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Deleted automatically when user logs out or closes
                            browser.
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Preference Cookies
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Up to 12 months
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Extended only if user reconsents.
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Internal Analytics Cookies
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Up to 12 months
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Never shared with external parties.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    These durations reflect strict minimisation practices.
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    THIRD-PARTY COOKIES
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    ORR does not permit:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
                    <li>third-party trackers</li>
                    <li>advertisements</li>
                    <li>embedded social-media cookies</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed">
                    If a user accesses an external service (e.g., payment
                    provider), that service&apos;s cookie policy applies
                    independently.
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    HOW TO CONTROL COOKIES
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    Users may:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
                    <li>adjust cookie preferences within the Platform</li>
                    <li>block cookies through browser settings</li>
                    <li>delete cookies at any time</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    However, blocking essential cookies will prevent:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
                    <li>login</li>
                    <li>access to Workspace</li>
                    <li>use of DS modules</li>
                    <li>saving preferences</li>
                    <li>operating consultations</li>
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    UPDATES TO THIS POLICY
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    We may update this Cookie Policy to reflect technological
                    changes, legal updates, or service expansions.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Substantial changes will be notified within the Platform.
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    CONTACT US
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    For any questions about cookies or data privacy:
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">Email:</strong>{" "}
                    privacy@orr.solutions
                    <br />
                    <strong className="text-white">Website:</strong>{" "}
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
