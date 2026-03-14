import { getRichTextHTML } from "@/lib/rich-text-utils";

interface LivingSystemsHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export default function LivingSystemsHeroSection({ title, subtitle, description, image }: LivingSystemsHeroSectionProps) {
  return (
    <header className="relative z-30 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
          <span className="text-[#47ff4c]">Living Systems</span><br />
          <span className="text-white">& Regeneration</span>
        </h1>

        <div className="space-y-4 max-w-5xl mx-auto">
          <p className="text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed">
            <span dangerouslySetInnerHTML={getRichTextHTML(subtitle || "We work with living systems — landscapes, forests, oceans, and ecosystems — to design regenerative solutions that bring life back to degraded environments.")} />
          </p>

          <p className="text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed">
            <span dangerouslySetInnerHTML={getRichTextHTML(description || "From farms and urban plots to coastlines, regenerative agriculture and circular economy design, we help organizations create systems that restore biodiversity, sequester carbon, and build resilience.")} />
          </p>
        </div>
      </div>
    </header>
  )
}