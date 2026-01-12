'use client';
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';
import EditableText from "../../components/EditableText";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function Hero({ content, onContentUpdate }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const heroTitle = content?.hero_title || "ORR Solutions – Listen. Solve. Optimise.";
  const heroSubtitle = content?.hero_subtitle || "Your business GP for complex systems — digital and living.";
  const heroDescription = content?.hero_description || "We diagnose your bottlenecks, treat your administrative and compliance headaches, and unlock hidden value in your data, your operations, and your projects.";
  const ctaText = content?.hero_cta_text || "Book your free initial consultation";
  const ctaLink = content?.hero_cta_link || "/contact";

  const handleTitleSave = async (newTitle: string) => {
    await onContentUpdate?.({ hero_title: newTitle });
  };

  const handleSubtitleSave = async (newSubtitle: string) => {
    await onContentUpdate?.({ hero_subtitle: newSubtitle });
  };

  const handleDescriptionSave = async (newDescription: string) => {
    await onContentUpdate?.({ hero_description: newDescription });
  };

  const handleCTASave = async (newCTA: string) => {
    await onContentUpdate?.({ hero_cta_text: newCTA });
  };

  useEffect(() => {
    const title = titleRef.current;
    if (title) {
      const text = title.textContent;
      title.innerHTML = text!.split('').map((char, i) => 
        `<span style="display:inline-block;opacity:0">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      gsap.to(title.children, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.02,
        ease: "power2.out"
      });
    }

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
  }, []);

  return (
    <header ref={containerRef} className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl space-y-6 sm:space-y-8">
          <EditableText
            content={heroTitle}
            onSave={handleTitleSave}
            tag="h1"
            className="text-white font-extrabold mr-50 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight"
            placeholder="Enter hero title..."
          />

          <EditableText
            content={heroSubtitle}
            onSave={handleSubtitleSave}
            tag="p"
            className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed"
            placeholder="Enter hero subtitle..."
            multiline
          />

          <EditableText
            content={heroDescription}
            onSave={handleDescriptionSave}
            tag="p"
            className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed"
            placeholder="Enter hero description..."
            multiline
          />

          <div ref={buttonRef} className="pt-2">
            <a href={ctaLink} className="inline-block bg-gradient-primary text-[#0C294D] font-semibold px-4 sm:px-6 md:px-7 py-3 sm:py-4 rounded-lg shadow-md hover:brightness-105 transition text-sm sm:text-base md:text-lg">
              <EditableText
                content={ctaText}
                onSave={handleCTASave}
                tag="span"
                className=""
                placeholder="Enter CTA text..."
              />
            </a>
          </div>
        </div>

        <div className="hidden lg:block" aria-hidden>
        </div>
      </div>
    </header>
  );
}
