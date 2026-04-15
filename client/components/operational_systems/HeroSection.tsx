import { useLanguage } from "@/app/components/LanguageProvider";
import HeroSection from "../shared/HeroSection";

interface OperationalHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export default function OperationalHeroSection({ title: propTitle, subtitle, description, image }: OperationalHeroSectionProps) {
  const { t, interpolate } = useLanguage();

  return (
    <HeroSection
      highlightedTitle={interpolate(propTitle || t.services.operationalHeroTitle)}
      title=""
      description1={interpolate(subtitle || t.services.opDescription)}
      description2={interpolate(description || "")}
    />
  )
}