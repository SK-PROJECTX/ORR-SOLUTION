'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getRichTextContent } from "../../lib/rich-text-utils";
import SafeHTMLRenderer from "../../components/SafeHTMLRenderer";
import { useTheme } from "../components/ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

interface ORRReportSectionProps {
  content?: any;
  onUpdate?: (data: any) => Promise<void>;
}

export default function ORRReportSection({ content, onUpdate }: ORRReportSectionProps) {
  const orrReportSection = content;
  const { theme } = useTheme();

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const title = getRichTextContent(orrReportSection?.title) || "What you Get: The ORR Report";
  const subtitle = getRichTextContent(orrReportSection?.subtitle) || "After your first meeting, you receive a decision-ready ORR report designed to be immediately useful inside your organisation.";
  const reportOutcomes = ["Decision-ready", "Usable internally", "Clear next steps"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 80%" }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.8, delay: 0.3 + i * 0.1, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins bg-[#0a192f]">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column: Text-Led Content */}
          <div className="space-y-10">
            <div>
              <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                <SafeHTMLRenderer data={orrReportSection?.title} fallback="What You Get: The ORR Report" />
              </h2>
              <div ref={subtitleRef} className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                <SafeHTMLRenderer data={orrReportSection?.subtitle} fallback="After your first meeting, you receive a decision-ready ORR report designed to be immediately useful inside your organisation." />
              </div>
            </div>

            <div className="space-y-8">
              {/* "It:" Section */}
              <div ref={el => { cardsRef.current[0] = el; }} className="space-y-4">
                <h3 className="text-[#33FF99] font-bold text-lg tracking-wide">It:</h3>
                <ul className="space-y-4">
                  {[
                    "explains your situation in your language,",
                    "highlights key issues and risks that affect your customers and teams,",
                    "proposes quick fixes and longer-term improvements that respect your constraints,",
                    "shows where advisory, digital systems/AI, or living-systems work will have most impact."
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-200 text-base md:text-lg">
                      <span className="text-[#33FF99] mt-1.5 flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* "You can:" Section */}
              <div ref={el => { cardsRef.current[1] = el; }} className="space-y-4">
                <h3 className="text-[#33FF99] font-bold text-lg tracking-wide">You can:</h3>
                <ul className="space-y-4">
                  {[
                    "use it internally with your own teams,",
                    "share it with other partners, or",
                    "continue with ORR to implement the recommendations at the pace that suits you."
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-200 text-base md:text-lg">
                      <span className="text-[#33FF99] mt-1.5 flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Outcome Summary Card */}
          <div className="lg:sticky lg:top-32 flex justify-center lg:justify-end">
            <div
              ref={el => { cardsRef.current[2] = el; }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 md:p-14 rounded-[40px] shadow-2xl max-w-md w-full relative group hover:border-[#33FF99]/30 transition-colors duration-500"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#33FF99]/10 rounded-full blur-2xl group-hover:bg-[#33FF99]/20 transition-all duration-500"></div>

              <h4 className="text-white font-bold text-2xl mb-10 tracking-tight">Report Outcome</h4>

              <div className="space-y-6">
                {reportOutcomes.map((label, idx) => (
                  <div key={idx} className="flex items-center gap-5 group/item">
                    <div className="w-12 h-12 bg-[#33FF99]/10 rounded-2xl flex items-center justify-center group-hover/item:bg-[#33FF99]/20 transition-colors duration-300">
                      <div className="w-2.5 h-2.5 bg-[#33FF99] rounded-full shadow-[0_0_10px_#33FF99]"></div>
                    </div>
                    <span className="text-gray-100 font-medium text-lg md:text-xl">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-white/10 group-hover:border-[#33FF99]/20 transition-colors duration-500">
                <p className="text-gray-400 text-sm leading-relaxed">
                  A structured deliverable that stabilized the conversation and clarifies the path forward.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}