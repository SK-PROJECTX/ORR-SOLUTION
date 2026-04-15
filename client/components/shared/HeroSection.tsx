import { getRichTextHTML } from "@/lib/rich-text-utils";
import { useLanguage } from "@/app/components/LanguageProvider";

interface HeroSectionProps {
  title: string;
  highlightedTitle: string;
  description1: string;
  description2: string;
}

export default function HeroSection({ title, highlightedTitle, description1, description2 }: HeroSectionProps) {
  const { language, interpolate } = useLanguage();
  
  const getHTML = (data: string) => {
      const htmlObj = getRichTextHTML(data, language);
      return { __html: interpolate(htmlObj.__html) };
  };

  return (
    <header className="relative z-30 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
        <div className="max-w-7xl space-y-6 sm:space-y-8">
          <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight">
            <span className="text-[#47ff4c]"><span dangerouslySetInnerHTML={getHTML(highlightedTitle)} /></span> <br className="hidden sm:block" />
            <span className="text-white"><span dangerouslySetInnerHTML={getHTML(title)} /></span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            <span dangerouslySetInnerHTML={getHTML(description1)} />
          </p>

          <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            <span dangerouslySetInnerHTML={getHTML(description2)} />
          </p>
        </div>
      </div>
    </header>
  )
}