'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getRichTextContent } from "../../lib/rich-text-utils";
import SafeHTMLRenderer from "../../components/SafeHTMLRenderer";
import { useHomepageContent } from "../../hooks/useHomepageContent";

gsap.registerPlugin(ScrollTrigger);

interface ORRRoleSectionProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function ORRRoleSection({ content, onContentUpdate }: ORRRoleSectionProps) {
  const { content: homepageContent } = useHomepageContent();
  const orrRoleSection = homepageContent?.orrRoleSection;
  
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const title = getRichTextContent(orrRoleSection?.title) || "ORR's Role";
  const description = getRichTextContent(orrRoleSection?.description) || "We act like specialist doctors for your business physiology - but we start from your symptoms and your priorities. We check the health of your system, diagnosis issues, and co-design solutions that your people can actually use, keeping everything working together over time.";

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
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mt-40 mb-12 text-center">
          <SafeHTMLRenderer data={orrRoleSection?.title} fallback="ORR's Role" />
        </h2>
        <p ref={textRef} className="text-gray-300 text-center text-2xl mb-16 max-w-4xl mx-auto">
          <SafeHTMLRenderer data={orrRoleSection?.description} fallback="We act like specialist doctors for your business physiology - but we start from your symptoms and your priorities. We check the health of your system, diagnosis issues, and co-design solutions that your people can actually use, keeping everything working together over time." />
        </p>
      </div>
    </section>
  );
}
