'use client';

import Image from 'next/image';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ORRReportSectionProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function ORRReportSection({ content, onContentUpdate }: ORRReportSectionProps) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 80%" }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          const direction = i % 2 === 0 ? -60 : 60;
          gsap.fromTo(card,
            { opacity: 0, x: direction, scale: 0.95 },
            {
              opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4 text-center">
          What you Get: <span className="text-[#33FF99]">The ORR Report</span>
        </h2>
        <p ref={subtitleRef} className="text-gray-300 text-center mb-16 max-w-4xl mx-auto">
          After your first meeting, you receive a decision-ready ORR report designed to be immediately useful inside your organisation.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div ref={el => { cardsRef.current[0] = el; }} className="bg-gradient-to-br from-[#1a3a52] to-[#0f2a3f] rounded-3xl relative overflow-hidden h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 z-10"></div>
            <Image
              src="https://res.cloudinary.com/depeqzb6z/image/upload/v1766108970/network-visualization_wxqzds.jpg"
              alt="Network Visualization"
              fill
              className="object-cover"
            />
          </div>

          <div ref={el => { cardsRef.current[1] = el; }} className="bg-gradient-to-br from-[#1a3a52] to-[#0f2a3f] p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">explain your situation in your language,</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">highlights key issues and risks that affect your customers and teams</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">proposes quick fixes and longer-term improvements that respect your constraints</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">shows where advisory, digital systems/AI, or living-systems work will have most impact</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div ref={el => { cardsRef.current[2] = el; }} className="bg-gradient-to-br from-[#1a3a52] to-[#0f2a3f] p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">explain your situation in your language,</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">highlights key issues and risks that affect your customers and teams</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">proposes quick fixes and longer-term improvements that respect your constraints</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#33FF99] rounded-full mt-1 flex-shrink-0"></div>
                <span className="text-gray-200">shows where advisory, digital systems/AI, or living-systems work will have most impact</span>
              </div>
            </div>
          </div>

          <div ref={el => { cardsRef.current[3] = el; }} className="bg-gradient-to-br from-[#1a3a52] to-[#0f2a3f] rounded-3xl relative overflow-hidden h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 z-10"></div>
            <Image
              src="https://res.cloudinary.com/depeqzb6z/image/upload/v1766109007/team-collaboration_x6q3ia.jpg"
              alt="Team Collaboration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
