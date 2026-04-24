'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getRichTextContent } from "../../lib/rich-text-utils";
import SafeHTMLRenderer from "@/components/SafeHTMLRenderer";
import { useLanguage } from "./LanguageProvider";
gsap.registerPlugin(ScrollTrigger);

interface FiveStagesSectionProps {
  content?: any;
  onUpdate?: (data: any) => Promise<void>;
}

export default function FiveStagesSection({ content, onUpdate }: FiveStagesSectionProps) {
  const processSection = content;
  const { t, language, interpolate } = useLanguage();
  
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const stagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const stages = [
    { prefix: t.fiveStages.stages[0].prefix, titleData: processSection?.stage_1_title, fallbackTitle: interpolate(t.fiveStages.stages[0].title), description: processSection?.stage_1_description, fallbackDesc: interpolate(t.fiveStages.stages[0].description) },
    { prefix: t.fiveStages.stages[1].prefix, titleData: processSection?.stage_2_title, fallbackTitle: interpolate(t.fiveStages.stages[1].title), description: processSection?.stage_2_description, fallbackDesc: interpolate(t.fiveStages.stages[1].description) },
    { prefix: t.fiveStages.stages[2].prefix, titleData: processSection?.stage_3_title, fallbackTitle: interpolate(t.fiveStages.stages[2].title), description: processSection?.stage_3_description, fallbackDesc: interpolate(t.fiveStages.stages[2].description) },
    { prefix: t.fiveStages.stages[3].prefix, titleData: processSection?.stage_4_title, fallbackTitle: interpolate(t.fiveStages.stages[3].title), description: processSection?.stage_4_description, fallbackDesc: interpolate(t.fiveStages.stages[3].description) },
    { prefix: t.fiveStages.stages[4].prefix, titleData: processSection?.stage_5_title, fallbackTitle: interpolate(t.fiveStages.stages[4].title), description: processSection?.stage_5_description, fallbackDesc: interpolate(t.fiveStages.stages[4].description) }
  ].map(stage => ({
    ...stage,
    titleContent: language === 'it' ? stage.fallbackTitle : (getRichTextContent(stage.titleData, language) || stage.fallbackTitle),
    descContent: language === 'it' ? stage.fallbackDesc : (getRichTextContent(stage.description, language) || stage.fallbackDesc)
  }));

  const cleanTitle = (data: any, prefix: string) => {
    if (!data) return data;
    if (typeof data === 'string') {
      const regex = new RegExp(`^(<p>)?\\s*${prefix}\\s*[-:]\\s*`, 'i');
      return data.replace(regex, '$1');
    }
    return data;
  };

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

      stagesRef.current.forEach((stage, i) => {
        if (stage) {
          gsap.fromTo(stage,
            { opacity: 0, x: -50 },
            {
              opacity: 1, x: 0, duration: 0.8, delay: i * 0.15, ease: "power3.out",
              scrollTrigger: { trigger: stage, start: "top 85%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden font-poppins bg-background text-foreground transition-colors duration-300">


      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
          <SafeHTMLRenderer data={language === 'it' ? t.fiveStages.title : (processSection?.title || t.fiveStages.title)} fallback={t.fiveStages.title} />
        </h2>

        <p ref={subtitleRef} className="opacity-70 text-center mb-12 sm:mb-16">
          <SafeHTMLRenderer data={language === 'it' ? t.fiveStages.subtitle : (processSection?.subtitle || t.fiveStages.subtitle)} fallback={t.fiveStages.subtitle} />
        </p>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-primary opacity-30"></div>

          {stages.map((stage: any, index: number) => {
            return (
              <div ref={el => { stagesRef.current[index] = el; }} key={index} className="relative flex items-start mb-8 sm:mb-12 last:mb-0 group">
                <div className="relative z-10 w-8 sm:w-12 h-8 sm:h-12 bg-primary rounded-full flex items-center justify-center mr-6 sm:mr-8 flex-shrink-0 shadow-[0_0_15px_rgba(14,194,119,0.3)] group-hover:shadow-[0_0_20px_rgba(14,194,119,0.5)] transition-shadow duration-300">
                   <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
                </div>

                <div className="flex-1 pt-1">
                  <h3 className="flex flex-col mb-2 sm:mb-3">
                    <span className="text-primary text-xl sm:text-2xl font-semibold">
                      <SafeHTMLRenderer data={cleanTitle(stage.titleContent, stage.prefix)} fallback={stage.fallbackTitle} />
                    </span>
                  </h3>
                  <p className="opacity-70 text-sm sm:text-base leading-relaxed max-w-2xl">
                    <SafeHTMLRenderer
                      data={stage.descContent}
                      fallback={stage.fallbackDesc}
                    />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
