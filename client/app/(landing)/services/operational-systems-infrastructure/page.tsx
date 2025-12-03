import HeroSection from "@/components/operational_systems/HeroSection";
import WhatWeOfferSection from "@/components/operational_systems/WhatWeOfferSection";
import HowWeWorkSection from "@/components/operational_systems/HowWeWorkSection";
import NetworkAdvantageSection from "@/components/operational_systems/NetworkAdvantageSection";
import DigitalSolutionsSection from "@/components/operational_systems/DigitalSolutionsSection";
import CaseExampleSection from "@/components/operational_systems/CaseExampleSection";
import FinalCTASection from "@/components/operational_systems/FinalCTASection";

export default function OperationalSystemsPage() {
  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
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