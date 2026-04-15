import { getRichTextHTML } from "@/lib/rich-text-utils";
import { useLanguage } from "@/app/components/LanguageProvider";

interface LivingSystemsHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export default function LivingSystemsHeroSection({ title, subtitle, description, image }: LivingSystemsHeroSectionProps) {
  const { language, interpolate, t } = useLanguage();

  const getHTML = (data: string) => {
    return getRichTextHTML(interpolate(data), language);
  };

  return (
    <header className="relative z-30 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
          <span dangerouslySetInnerHTML={getRichTextHTML(interpolate(title || t.services.livingHeroTitle), language)} />
        </h1>

        <div className="space-y-4 max-w-5xl mx-auto">
          {subtitle && (
            <p className="text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed">
              <span dangerouslySetInnerHTML={getHTML(subtitle)} />
            </p>
          )}

          {description && (
            <p className="text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed">
              <span dangerouslySetInnerHTML={getHTML(description)} />
            </p>
          )}
        </div>
      </div>
    </header>
  )
}