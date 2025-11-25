"use client";
import ApproachCard from "../components/ApproachCard";
import GPMetaphorSection from "../components/GPMetaphorSection";
import Hero from "../components/Hero";
import ServicePillar from "../components/ServicePillars";
import { HeroSection } from "./components/HeroSection";
import MiniClientJourney from "../components/MiniClientJourney";
import FiveStagesSection from "../components/FiveStagesSection";
import ORRReportSection from "../components/ORRReportSection";
import PackagePreviewSection from "../components/PackagePreviewSection";
import FAQSection from "../components/FAQSection"

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <Hero />
      <ApproachCard />
      <ServicePillar />
      <GPMetaphorSection />
      <MiniClientJourney />
      <FiveStagesSection />
      <ORRReportSection />
      <PackagePreviewSection />
      <FAQSection />
    </div>
  );
}

