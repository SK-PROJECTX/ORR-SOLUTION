import AnimatedBackground from "@/components/AnimatedBackground";
import HeroSection from "@/components/strategy_advisory/HeroSection";
import WhatWeOfferSection from "@/components/strategy_advisory/WhatWeOfferSection";
import HowWeWorkSection from "@/components/strategy_advisory/HowWeWorkSection";
import NetworkAdvantageSection from "@/components/strategy_advisory/NetworkAdvantageSection";
import DigitalSolutionsSection from "@/components/strategy_advisory/DigitalSolutionsSection";
import CaseExampleSection from "@/components/strategy_advisory/CaseExampleSection";
import FinalCTASection from "@/components/strategy_advisory/FinalCTASection";

export default function StrategyAdvisoryPage() {
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
