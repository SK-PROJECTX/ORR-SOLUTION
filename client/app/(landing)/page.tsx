"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ApproachCard from "../components/ApproachCard";
import GPMetaphorSection from "../components/GPMetaphorSection";
import Hero from "../components/Hero";
import ServicePillar from "../components/ServicePillars";
import { HeroSection } from "./components/HeroSection";
import MiniClientJourney from "../components/MiniClientJourney";
import FiveStagesSection from "../components/FiveStagesSection";
import ORRReportSection from "../components/ORRReportSection";
import PackagePreviewSection from "../components/PackagePreviewSection";
import FAQSection from "../components/FAQSection";
import ORRRoleSection from "../components/ORRRoleSection";
import MidClientJourneySection from "../components/MidClientJourneySection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <Hero />
      <ApproachCard />
      <ServicePillar />
      <GPMetaphorSection />
      <ORRRoleSection />
      <MiniClientJourney />
      <FiveStagesSection />
      <ORRReportSection />
      <PackagePreviewSection />
      <FAQSection />
      <MidClientJourneySection />
    </div>
  );
}

