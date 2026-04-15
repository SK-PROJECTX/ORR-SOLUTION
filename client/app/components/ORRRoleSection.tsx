'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getRichTextContent } from "../../lib/rich-text-utils";
import SafeHTMLRenderer from "@/components/SafeHTMLRenderer";
import { useHomepageContent } from "../../hooks/useHomepageContent";
import { useLanguage } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

interface ORRRoleSectionProps {
  content?: any;
  onUpdate?: (data: any) => Promise<void>;
}

export default function ORRRoleSection({ content, onUpdate }: ORRRoleSectionProps) {
  const orrRoleSection = content;
  const { t, language, interpolate } = useLanguage();
  
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const title = getRichTextContent(orrRoleSection?.title, language) || interpolate(t.orrRole.title);
  const description = getRichTextContent(orrRoleSection?.description, language) || interpolate(t.orrRole.description);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
        }
      );

      gsap.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%" }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full h-[60vh] flex justify-center items-center text-white px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden font-poppins">
      

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mt-40 mb-12 text-center">
          <SafeHTMLRenderer data={orrRoleSection?.title} fallback={t.orrRole.title} />
        </h2>
        <p ref={textRef} className="text-gray-300 text-center text-2xl mb-16 max-w-4xl mx-auto">
          <SafeHTMLRenderer data={orrRoleSection?.description} fallback={t.orrRole.description} />
        </p>
      </div>
    </section>
  );
}
