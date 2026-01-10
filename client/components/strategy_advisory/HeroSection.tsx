import HeroSection from "../shared/HeroSection";

interface StrategyHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export default function StrategyHeroSection({ title, subtitle, description, image }: StrategyHeroSectionProps) {
  return (
    <HeroSection
      highlightedTitle="Strategic Advisory"
      title="& Compliance"
      description1={subtitle || "We deliver clarity in complexity. From regulatory frameworks to sustainability strategies, biotechnology consulting to compliance management, ORR guides organizations through evolving standards with precision and strategic foresight."}
      description2={description || "Our approach combines deep technical expertise with practical implementation — ensuring every initiative is compliant, sustainable, and positioned for long-term growth."}
    />
  )
}