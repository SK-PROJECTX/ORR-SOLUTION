import HeroSection from "@/components/operational_systems/HeroSection";
import WhatWeOfferSection from "@/components/operational_systems/WhatWeOfferSection";
import HowWeWorkSection from "@/components/operational_systems/HowWeWorkSection";
import NetworkAdvantageSection from "@/components/shared/NetworkAdvantageSection";
import DigitalSolutionsSection from "@/components/shared/DigitalSolutionsSection";
import CaseExampleSection from "@/components/shared/CaseExampleSection";
import FinalCTASection from "@/components/operational_systems/FinalCTASection";

export default function OperationalSystemsPage() {
  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      <HeroSection />
      <WhatWeOfferSection />
      <HowWeWorkSection />
      <NetworkAdvantageSection 
        description="When your needs extend beyond pure operations consulting, we activate our global network of trusted specialists:"
        networkCards={[
          {
            title: "Builders & Contractors",
            description: "For physical office setup and renovations",
            icon: "M12 2L2 7L12 12L22 7L12 2M2 17L12 22L22 17M2 12L12 17L22 12"
          },
          {
            title: "IT & Tech Specialists",
            description: "For advanced infrastructure, cybersecurity, and systems integration",
            icon: "M12 3L1 9L12 15L21 12.35V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
          },
          {
            title: "Furniture & Workspace Designers",
            description: "For ergonomic, functional office environments",
            icon: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"
          },
          {
            title: "Legal & Compliance Experts",
            description: "To ensure all systems meet regulatory requirements",
            icon: "M2 12C2 6.48 6.48 2 12 2S22 6.48 22 12 17.52 22 12 22 2 17.52 2 12M15.31 8L11.75 11.56L8.69 8.5L7.28 9.91L11.75 14.38L16.72 9.41L15.31 8Z"
          }
        ]}
        layout="grid"
      />
      <DigitalSolutionsSection 
        title="Digital Solutions"
        subtitle="We implement"
        description="We don't just recommend off-the-shelf tools — we build and integrate customized software solutions tailored to your unique workflows:"
        imageAlt="Operational systems dashboard showing process flows and metrics"
        whoIsThisFor={[
          "Self-employed professionals and freelancers ready to scale their operations with hiring full-time staff",
          "Solo practitioners who want to digitalize and systematize their business processes",
          "Independent consultants seeking to professionalize their operations through outsourced expertise",
          "Service providers who prefer to focus on their core work while delegating operational setup to specialists",
          "Entrepreneurs growing beyond one-person operations who need structured systems before scaling further"
        ]}
        features={[
          "Bespoke CRM systems with custom admin and client panels",
          "Tailored document management and knowledge base platforms",
          "Custom communication dashboards and notification systems",
          "Client portals with role-based access and branded interfaces",
          "Integrated automation workflows connecting multiple systems",
          "AI-powered solutions for process automation, data analysis, and intelligent decision support",
          "Custom reporting and analytics dashboards"
        ]}
      />
      <CaseExampleSection 
        caseExample={{
          challenge: "A mid-sized manufacturing company was experiencing significant operational inefficiencies, with production delays, quality issues, and rising costs. Manual processes dominated their workflow, leading to errors and inconsistent output. The management team recognized the need for systematic improvement but lacked the expertise to identify root causes and implement effective solutions across their complex operations.",
          solution: "ORR conducted a comprehensive operational assessment, mapping all processes and identifying critical bottlenecks. We delivered a detailed optimization report that outlined workflow redesign, quality control improvements, and automation opportunities. The report included specific recommendations for process standardization, performance metrics implementation, and a phased approach to digital transformation that would maximize ROI while minimizing operational disruption.",
          result: "Following ORR's recommendations, the company implemented standardized processes and automated key workflows, resulting in a 35% reduction in production time and 50% fewer quality defects. The new performance monitoring system provided real-time visibility into operations, enabling proactive issue resolution. Overall operational costs decreased by 25% while customer satisfaction improved significantly due to consistent delivery times and product quality."
        }}
        imageAlt="Manufacturing floor with optimized processes and digital monitoring"
      />
      <FinalCTASection />
    </div>
  )
}