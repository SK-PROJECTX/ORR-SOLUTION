'use client';
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';
import { getRichTextContent } from "../../lib/rich-text-utils";
import SafeHTMLRenderer from "../../components/SafeHTMLRenderer";

interface RichTextData {
  content: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
}

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function Hero({ content, onContentUpdate }: HeroProps) {
  const [allContent, setAllContent] = useState<any>(null);
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        const response = await fetch('https://orr-backend.orr.solutions/admin-portal/v1/cms/all-content/');
        if (!response.ok) throw new Error('Failed to fetch content');
        const result = await response.json();
        const data = result.data || result;

        const convertToString = (obj: any) => {
          if (!obj) return {};
          const converted: any = {};
          Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (value === null || value === undefined) {
              converted[key] = '';
            } else if (typeof value === 'string') {
              converted[key] = value;
            } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
              if (value.content && typeof value.content === 'string') {
                converted[key] = value.content;
              } else {
                converted[key] = '';
              }
            } else {
              converted[key] = String(value);
            }
          });
          return converted;
        };

        setAllContent({
          homepage: convertToString(data.homepage)
        });
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchAllContent();
  }, []);

  useEffect(() => {
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, x: -50, rotateY: -20 },
      { opacity: 1, x: 0, rotateY: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    gsap.fromTo(descRef.current,
      { opacity: 0, x: 50, rotateY: 20 },
      { opacity: 1, x: 0, rotateY: 0, duration: 1, delay: 0.7, ease: "power3.out" }
    );

    gsap.fromTo(buttonRef.current,
      { opacity: 0, scale: 0, rotate: -180 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.8, delay: 1, ease: "elastic.out(1, 0.5)" }
    );

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, [allContent]);

  return (
    <header ref={containerRef} className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
        <div className="max-w-5xl space-y-6 sm:space-y-8">
          <h1 ref={titleRef} className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-7xl leading-tight">
            <span dangerouslySetInnerHTML={{ __html: allContent?.homepage?.hero_title || "ORR Solutions – Listen. Solve. Optimise." }} />
          </h1>

          <p ref={subtitleRef} className="text-slate-200 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            <span dangerouslySetInnerHTML={{
              __html: allContent?.homepage?.hero_subtitles || "Your business GP for complex systems — digital and living."
            }} />
          </p>

          <p ref={descRef} className="text-slate-200 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: allContent?.homepage?.hero_subtitle || "We listen to the whole organisation, solve with structure and insight, and optimise so you can grow with confidence." }} />
          </p>

          <div ref={buttonRef} className="pt-2 flex justify-center">
            <a href="/contact" className="inline-block bg-gradient-primary text-[#0C294D] font-semibold px-4 sm:px-6 md:px-7 py-3 sm:py-4 rounded-lg shadow-md hover:brightness-105 transition text-sm sm:text-base md:text-lg">
              <span dangerouslySetInnerHTML={{ __html: allContent?.homepage?.hero_cta_text || "Contact Us" }} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}