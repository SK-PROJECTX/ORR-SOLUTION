import Link from "next/link";
import { useLanguage } from "../../app/components/LanguageProvider";
import { getRichTextHTML } from "../../lib/rich-text-utils";

interface NetworkCardProps {
  title: string;
  description: string;
  icon: string | React.ReactNode;
  ctaText?: string;
  className?: string; // allow overrides for specific grid sizing
}

export default function NetworkCard({ title, description, icon, ctaText, className = "" }: NetworkCardProps) {
  const { language, interpolate, t } = useLanguage();
  const displayCtaText = interpolate(ctaText || t.hero.joinNow || "Join Now");

  const getHTML = (data: string) => {
    const htmlObj = getRichTextHTML(data, language);
    return { __html: interpolate(htmlObj.__html) };
  };
  return (
    <div className={`group bg-primary flex flex-col items-start justify-between rounded-lg px-8 pt-8 pb-12 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(0,214,131,0.15)] hover:border hover:border-[#00D683]/30 border border-transparent ${className}`}>
      <div className="w-16 h-16 mb-6 bg-white/10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110 group-hover:bg-[#00D683]/20">
        {typeof icon === 'string' ? (
          <svg className="w-8 h-8 text-white group-hover:text-[#00D683] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d={icon} />
          </svg>
        ) : (
          <div className="text-white group-hover:text-[#00D683] transition-colors duration-300 w-8 h-8 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white mb-4">
          <span dangerouslySetInnerHTML={getHTML(title)} />
        </h3>
        <p className="text-white/80 text-sm mb-8 leading-relaxed">
          <span dangerouslySetInnerHTML={getHTML(description)} />
        </p>
      </div>
      <Link href='/register' className="bg-white text-black px-6 py-2.5 rounded-full font-semibold transition-all duration-300 group-hover:bg-[#00D683] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(0,214,131,0.4)] text-sm">
        {displayCtaText}
      </Link>
    </div>
  );
}