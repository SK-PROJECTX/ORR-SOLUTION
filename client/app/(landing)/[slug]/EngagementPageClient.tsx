"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import SanityImage from "@/components/SanityImage";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { useScrollSplit } from "@/hooks/useScrollSplit";

interface Section {
  _type: string;
  heading?: string;
  title?: string;
  subheading?: string;
  text?: any;
  buttonText?: string;
  link?: string;
  image?: any;
  reversed?: boolean;
}

interface PageData {
  title: string;
  slug: string;
  sections: Section[];
}

export default function EngagementPageClient({ page }: { page: PageData }) {
  useScrollSplit();

  return (
    <div className="min-h-screen text-white bg-[#0A1016]">
      {page.sections?.map((section, index) => {
        switch (section._type) {
          case 'hero':
            return <HeroSection key={index} section={section} />;
          case 'imageText':
            return <ImageTextSection key={index} section={section} />;
          case 'cta':
            return <CTASection key={index} section={section} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function HeroSection({ section }: { section: Section }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative pt-40 pb-24 px-6 md:px-16 min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 ref={titleRef} className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white">
          {section.heading}
        </h1>
        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          {section.subheading}
        </p>
        {section.buttonText && (
          <Link href="/register" className="inline-flex items-center justify-center bg-white text-black px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform">
            {section.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}

function ImageTextSection({ section }: { section: Section }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className={`py-24 px-6 md:px-16 ${section.reversed ? 'bg-white/5' : ''}`}>
      <div className={`max-w-7xl mx-auto flex flex-col ${section.reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
        <div className="w-full md:w-1/2">
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <SanityImage asset={section.image} alt={section.heading || 'Section image'} className="object-cover" />
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight italic">
            {section.heading}
          </h2>
          <div className="text-gray-300">
            <PortableTextRenderer value={section.text} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ section }: { section: Section }) {
  return (
    <section className="py-32 px-6 text-center">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-400/20 to-blue-500/10 backdrop-blur-2xl p-16 rounded-[3rem] border border-white/10">
        <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter italic text-white uppercase">
          {section.title}
        </h2>
        <Link href={section.link || '/register'} className="inline-flex items-center justify-center bg-white text-black px-12 py-6 rounded-full font-black uppercase text-sm tracking-widest hover:scale-110 transition-transform">
          {section.buttonText}
        </Link>
      </div>
    </section>
  );
}
