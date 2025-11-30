import AnimatedBackground from "@/components/AnimatedBackground";
import HeroSection from "@/components/living_systems/HeroSection";
import WhatWeOfferSection from "@/components/living_systems/WhatWeOfferSection";
import HowWeWorkSection from "@/components/living_systems/HowWeWorkSection";
import NetworkAdvantageSection from "@/components/living_systems/NetworkAdvantageSection";
import DigitalSolutionsSection from "@/components/living_systems/DigitalSolutionsSection";
import CaseExampleSection from "@/components/living_systems/CaseExampleSection";
import FinalCTASection from "@/components/living_systems/FinalCTASection";

export default function LivingSystemsPage() {
  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      <AnimatedBackground />
      <HeroSection />
      <WhatWeOfferSection />
      <HowWeWorkSection />
      <NetworkAdvantageSection />
      <DigitalSolutionsSection />
      <CaseExampleSection />
      <FinalCTASection />
    </div>
  )
}