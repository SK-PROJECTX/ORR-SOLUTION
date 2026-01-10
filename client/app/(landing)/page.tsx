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
import { useScrollSplit } from "@/hooks/useScrollSplit";

export default function LandingPage() {
  useScrollSplit();
  
  return (
    <div className="star fixed-background">
      <HeroSection />
      <div className="scroll-section"><Hero /></div>
      <div className="scroll-section"><ApproachCard /></div>
      <div className="scroll-section"><ServicePillar /></div>
      <div className="scroll-section"><GPMetaphorSection /></div>
      <div className="scroll-section"><ORRRoleSection /></div>
      <div className="scroll-section"><MiniClientJourney /></div>
      <div className="scroll-section"><FiveStagesSection /></div>
      <div className="scroll-section"><ORRReportSection /></div>
      <div className="scroll-section"><PackagePreviewSection /></div>
      <div className="scroll-section"><FAQSection /></div>
      <div className="scroll-section"><MidClientJourneySection /></div>
    </div>
  );
}

