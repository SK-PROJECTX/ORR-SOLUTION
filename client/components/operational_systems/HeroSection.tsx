import HeroSection from "../shared/HeroSection";

interface OperationalHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export default function OperationalHeroSection({ title, subtitle, description, image }: OperationalHeroSectionProps) {
  return (
    <HeroSection
      highlightedTitle="Operational System"
      title="& Infrastructure"
      description1={subtitle || "We transform operational chaos into structured systems that work. From day-one workflows to long-term scalability, ORR designs, implements, and refines the infrastructure that keeps your business running smoothly."}
      description2={description || "Whether you're setting up a new office, standardizing processes across teams, or upgrading outdated systems, we combine strategic planning with hands-on execution — backed by our global network of trusted specialists."}
    />
  )
}