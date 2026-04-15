import { useLanguage } from "@/app/components/LanguageProvider";
import HeroSection from "../shared/HeroSection";

interface StrategyHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export default function StrategyHeroSection({ title: propTitle, subtitle, description, image }: StrategyHeroSectionProps) {
  const { t, interpolate } = useLanguage();

  return (
    <HeroSection
      highlightedTitle={interpolate(propTitle || t.services.strategicHeroTitle)}
      title=""
      description1={interpolate(subtitle || "")}
      description2={interpolate(description || "")}
    />
  )
}