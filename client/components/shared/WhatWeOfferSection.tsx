"use client";
import { useEffect, useRef } from "react";
import { getRichTextHTML } from "@/lib/rich-text-utils";
import { useLanguage } from "../../app/components/LanguageProvider";

interface OfferCard {
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

function OfferCard({ title, description, icon }: OfferCard) {
  const { language, interpolate } = useLanguage();
  
  const getHTML = (data: string) => {
    const htmlObj = getRichTextHTML(data, language);
    return { __html: interpolate(htmlObj.__html) };
  };

  return (
    <div className="relative group w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-sm card-animate hover:-translate-y-2 transition-transform duration-300">
      <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full bg-card border border-[var(--color-border)] p-8 rounded-2xl hover:border-secondary/50 transition-colors duration-300 flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-6 rounded-full bg-[var(--color-surface)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[var(--color-border)] group-hover:border-secondary/50">
          <svg className="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="currentColor">
            <path d={icon} />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-secondary transition-colors duration-300 animate-text-pop">
          <span dangerouslySetInnerHTML={getHTML(title)} />
        </h3>
        <p className="text-slate-300 leading-relaxed text-sm animate-text-fade">
          <span dangerouslySetInnerHTML={getHTML(description)} />
        </p>
      </div>
    </div>
  );
}

interface WhatWeOfferSectionProps {
  offers: OfferCard[];
  layout?: 'grid' | 'flex';
  title?: string;
}

export default function WhatWeOfferSection({ offers, layout = 'flex', title }: WhatWeOfferSectionProps) {
  const { language, interpolate, t } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const getHTML = (data: string) => {
    const htmlObj = getRichTextHTML(data, language);
    return { __html: interpolate(htmlObj.__html) };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-title-in');
          }
        });
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <style jsx>{`
        .animate-title-in {
          animation: titleIn 0.8s ease-out forwards;
        }
        
        .animate-card-in {
          animation: cardIn 0.6s ease-out forwards;
        }
        
        @keyframes titleIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .card-animate {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        
        h2 {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-text-slide {
          animation: textSlide 0.8s ease-out 0.3s forwards;
          opacity: 1;
          transform: translateX(0);
        }
        
        .animate-text-fade {
          animation: textFade 1s ease-out 0.5s forwards;
          opacity: 1;
        }
        
        .animate-text-pop {
          animation: textPop 0.6s ease-out forwards;
          opacity: 1;
          transform: scale(1);
        }
        
        @keyframes textSlide {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes textFade {
          to {
            opacity: 1;
          }
        }
        
        @keyframes textPop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <h2
        ref={titleRef}
        className="text-4xl font-bold text-white text-center mb-16"
      >
        <span dangerouslySetInnerHTML={getHTML(title || t.shared.whatWeOffer)} />
      </h2>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-32 mb-24">
          {offers.map((offer, index) => (
            <OfferCard key={index} {...offer} />
          ))}
        </div>
      </div>
    </section>
  )
}