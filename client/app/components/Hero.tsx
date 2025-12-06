'use client';
import React from "react";
import EditableText from "../../components/EditableText";

interface HeroProps {
  content?: any;
  onContentUpdate?: (data: any) => Promise<void>;
}

export default function Hero({ content, onContentUpdate }: HeroProps) {
  const heroTitle = content?.hero_title || "ORR Solutions – Listen. Solve. Optimise.";
  const heroSubtitle = content?.hero_subtitle || "Your business GP for complex systems — digital and living.";
  const ctaText = content?.hero_cta_text || "Book your free initial consultation";
  const ctaLink = content?.hero_cta_link || "/contact";

  const handleTitleSave = async (newTitle: string) => {
    await onContentUpdate?.({ hero_title: newTitle });
  };

  const handleSubtitleSave = async (newSubtitle: string) => {
    await onContentUpdate?.({ hero_subtitle: newSubtitle });
  };

  const handleCTASave = async (newCTA: string) => {
    await onContentUpdate?.({ hero_cta_text: newCTA });
  };

  return (
    <header className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl space-y-6 sm:space-y-8">
          <EditableText
            content={heroTitle}
            onSave={handleTitleSave}
            tag="h1"
            className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight"
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

          <div className="pt-2">
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
