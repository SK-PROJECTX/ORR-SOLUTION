"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CoreVisionSection() {
  const titleRef = useRef(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: titleRef.current, start: "top 80%" } }
    );

    paragraphsRef.current.forEach((p, index) => {
      if (p) {
        gsap.fromTo(p,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, delay: index * 0.1, scrollTrigger: { trigger: p, start: "top 85%" } }
        );
      }
    });

    listItemsRef.current.forEach((li, index) => {
      if (li) {
        gsap.fromTo(li,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.5, delay: index * 0.1, scrollTrigger: { trigger: li, start: "top 85%" } }
        );
      }
    });
  }, []);

  return (
    <section className="w-full  text-white px-6 md:px-12 lg:px-24 py-20 relative overflow-hidden font-poppins">
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-2xl">
        <h2 ref={titleRef} className="text-center text-3xl md:text-4xl font-semibold mb-10">
          Core Vision <span className="text-[#33FF99]">& Philosophy</span>
        </h2>

        <p ref={(el) => { paragraphsRef.current[0] = el; }} className="text-[#D4D8E3] leading-relaxed mb-6">
          At ORR, we approach professionals and businesses as living systems —
          each with its own structure, energy, and unique challenges.
        </p>

        <p ref={(el) => { paragraphsRef.current[1] = el; }} className="text-[#D4D8E3] leading-relaxed mb-6">
          We listen first, to understand the underlying causes of operational
          and administrative 'ailments', and then act with precision to restore
          clarity, structure, and efficiency.
        </p>

        <p ref={(el) => { paragraphsRef.current[2] = el; }} className="text-[#D4D8E3] leading-relaxed mb-10">
          Whether you're a self-employed professional, a freelancer, or an
          established company, ORR helps you:
        </p>


        <p ref={(el) => { paragraphsRef.current[3] = el; }} className="text-[#D4D8E3] leading-relaxed mb-10">
         We see your organisation as a connected whole:
        </p>

        <ul className="space-y-4 mb-10">
          {[
            "Identify and resolve administrative bottlenecks",
            "Outsource and automate routine work",
            "Implement structured operational systems (SOPs, workflows, dashboards)",
            "Optimise data and client information to generate new value streams",
          ].map((item, index) => (
            <li
              key={index}
              ref={(el) => { listItemsRef.current[index] = el; }}
              className="flex items-start gap-4 text-[#D4D8E3] leading-relaxed item-center "
            >
              <div className=" w-7 h-7 bg-[#1F6F75] rounded-full flex items-center justify-center ">
                <div className="w-4 h-4 bg-[#3DFF7C] rounded-full" />
              </div>
              {item}
            </li>
          ))}
        </ul>

        <p ref={(el) => { paragraphsRef.current[4] = el; }} className="text-[#D4D8E3] leading-relaxed mb-6">
         We believe every client relationship generates data — and within that data lies opportunity. By capturing and analysing these patterns, ORR transforms information into insight, helping businesses evolve intelligently.
        </p>

        <p ref={(el) => { paragraphsRef.current[5] = el; }} className="text-[#D4D8E3] leading-relaxed">
          Our team and network of trusted subcontractors provide tailored
          solutions spanning multiple industries, with specialised focus in:
        </p>

        <p ref={(el) => { paragraphsRef.current[6] = el; }} className="text-[#D4D8E3] leading-relaxed">
          In essence — 'You can manage everything yourself. ORR can make it work better        
          </p>
      </div>
    </section>
  );
}