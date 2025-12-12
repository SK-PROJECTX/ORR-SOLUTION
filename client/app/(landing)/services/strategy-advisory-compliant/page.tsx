"use client";
import { useEffect, useRef } from "react";
import HeroSection from "@/components/strategy_advisory/HeroSection";
import WhatWeOfferSection from "@/components/shared/WhatWeOfferSection";
import HowWeWorkSection from "@/components/shared/HowWeWorkSection";
import NetworkAdvantageSection from "@/components/shared/NetworkAdvantageSection";
import DigitalSolutionsSection from "@/components/shared/DigitalSolutionsSection";
import CaseExampleSection from "@/components/shared/CaseExampleSection";
import FinalCTASection from "@/components/strategy_advisory/FinalCTASection";

export default function StrategyAdvisoryPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .section-animate {
          opacity: 0;
          transform: translateY(20px);
        }
      `}</style>
      <div ref={el => sectionsRef.current[0] = el} className="section-animate">
        <HeroSection />
      </div>
      <div ref={el => sectionsRef.current[1] = el} className="section-animate">
        <WhatWeOfferSection 
        offers={[
          {
            title: "Regulatory Compliance & Advisory",
            description: "Navigate complex regulatory landscapes with confidence. We provide strategic guidance on compliance requirements, regulatory changes, and implementation strategies.",
            icon: "M12 3L1 9L12 15L21 12.35V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
          },
          {
            title: "ESG & Sustainability Strategy",
            description: "Develop comprehensive ESG frameworks that meet stakeholder expectations while driving business value. From carbon accounting to sustainability reporting.",
            icon: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z"
          },
          {
            title: "Biotechnology & Life Sciences Consulting",
            description: "Leverage our network of scientific experts to navigate the technical and regulatory complexities of biotechnology and life sciences.",
            icon: "M9.5 3A6.5 6.5 0 0 1 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H16L21 19L19 21L14 16V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3M9.5 5C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"
          },
          {
            title: "Quality Management Systems",
            description: "Implement and maintain quality management systems that meet international standards like ISO, GMP, and industry-specific requirements.",
            icon: "M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M15.5 16L11 11.5L12.5 10L15.5 13L20.5 8L22 9.5L15.5 16Z"
          },
          {
            title: "Risk Assessment & Management",
            description: "Identify, assess, and mitigate risks across your operations. We help you build robust risk management frameworks that protect your business.",
            icon: "M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5M19.43 12.98C19.47 12.66 19.5 12.33 19.5 12S19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12S4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z"
          }
        ]}
        />
      </div>
      <div ref={el => sectionsRef.current[2] = el} className="section-animate">
        <HowWeWorkSection 
        subtitle="Listen . Solve . Optimize"
        description="Like your Business GP, we diagnose compliance challenges and prescribe strategic solutions tailored to your organization's unique context."
        sections={[
          {
            title: "Listen & Report",
            subtitle: "(Initial Discovery)",
            content: [
              "We start with a focused initial meeting to understand your compliance challenges, regulatory environment, and strategic objectives. During this session, we gather key information through targeted questions and documentation review.",
              "Following the meeting, we build a preliminary report that maps out the issues identified. We then engage relevant specialists from our network — legal experts, scientific advisors, or industry consultants — to deepen our analysis. The report is refined to include expert insights and may pose clarifying questions for you to consider.",
              "A follow-up meeting allows us to listen again, address questions, and update the report with your feedback. The final report provides deep insights into your compliance landscape and proposes a clear modus operandi: acute solutions for immediate issues and strategies to optimize your digital systems for long-term compliance management.",
              "Investment: You pay only for meeting time (€45/hour, pro-rata — our meetings are brief and focused) plus the report itself (value depends on scope and complexity, capped at €220)"
            ]
          },
          {
            title: "Decide: Document or Partnership",
            content: [
              "Decide: Document or Partnership. Once you receive the report, you choose your path forward:",
              "- Use the report independently to guide your internal compliance efforts, or",
              "- Engage ORR for ongoing implementation support through a tailored retainer arrangement"
            ]
          },
          {
            title: "Optimize (For Clients Who Continue)",
            content: [
              "For clients who choose ongoing partnership, we move into implementation and optimization. We execute the solutions outlined in the report, build necessary digital infrastructure, and provide continuous monitoring to keep your compliance systems current as regulations evolve."
            ]
          }
        ]}
        layout="single"
        />
      </div>
      <div ref={el => sectionsRef.current[3] = el} className="section-animate">
        <NetworkAdvantageSection 
        description="Complex compliance challenges require diverse expertise. We activate our global network of specialists to deliver comprehensive solutions."
        networkCards={[
          {
            title: "Legal & Regulatory Experts",
            description: "Specialized attorneys and compliance professionals across multiple jurisdictions",
            icon: "M12 3L1 9L12 15L21 12.35V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
          },
          {
            title: "Scientific Advisors",
            description: "PhDs and researchers in biotechnology, environmental and computer science, and related fields",
            icon: "M9.5 3A6.5 6.5 0 0 1 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H16L21 19L19 21L14 16V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3M9.5 5C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"
          },
          {
            title: "Industry Specialists",
            description: "Sector-specific consultants with deep regulatory knowledge",
            icon: "M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5M19.43 12.98C19.47 12.66 19.5 12.33 19.5 12S19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12S4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z"
          },
          {
            title: "Technical Auditors",
            description: "Certification professionals for ISO, GMP, and other standards",
            icon: "M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M15.5 16L11 11.5L12.5 10L15.5 13L20.5 8L22 9.5L15.5 16Z"
          },
          {
            title: "ESG Consultants",
            description: "Sustainability experts and carbon accounting specialists",
            icon: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z"
          }
        ]}
        />
      </div>
      <div ref={el => sectionsRef.current[4] = el} className="section-animate">
        <DigitalSolutionsSection 
        title="Digital Solutions for"
        subtitle="Compliance Management"
        description="We don't just advise — we build digital infrastructure to operationalize compliance:"
        imageAlt="Network visualization showing connected nodes and data flows"
        whoIsThisFor={[
          "Self-employed professionals and consultants who need expert compliance guidance without hiring full-time staff",
          "Growing businesses entering regulated industries or expanding into new markets",
          "Startups in life sciences and biotech navigating complex regulatory pathways",
          "Professional service firms managing client compliance obligations",
          "Companies facing regulatory changes that impact their operations",
          "Businesses implementing ESG strategies to meet investor and stakeholder expectations"
        ]}
        features={[
          "Custom compliance management platforms with automated tracking",
          "Regulatory document repositories with version control and access management",
          "ESG data collection and reporting dashboards",
          "Audit trail systems with timestamped documentation",
          "Training management systems with certification tracking",
          "AI-powered regulatory monitoring and change detection",
          "Integrated risk assessment and mitigation tracking tools",
          "Automated compliance reporting and submission workflows"
        ]}
        />
      </div>
      <div ref={el => sectionsRef.current[5] = el} className="section-animate">
        <CaseExampleSection 
        caseExample={{
          challenge: "A cooperative operating in a niche market faced decreased profits and pressure from stakeholders to reverse the trend. The board understood the severity of the issue and recognized that scientific studies were essential to inform their strategic decisions. However, lacking scientific expertise internally, the cooperative was spending hundreds of thousands of euros on external scientific study reports with limited guidance on how to action the findings.",
          solution: "ORR was brought in to assess the situation and provide strategic direction. Within days, we delivered a detailed report outlining the ideal modus operandi. The report covered market pricing for scientific analysis, relevant regulatory frameworks to guide compliance, and how to strategically increase the value of their niche market through product specialization — including a roadmap for PDO (Protected Designation of Origin) or IGP (Protected Geographical Indication) applications.",
          result: "Armed with ORR's strategic report, the cooperative immediately redirected their approach, significantly reducing unnecessary scientific study expenses while focusing resources on high-impact initiatives. The specialization strategy aimed them toward premium market segments, and the cooperative is now pursuing PDO certification to differentiate their product and command higher prices. Stakeholder confidence has been restored as profits begin to recover."
        }}
        imageAlt="Business documents and reports on a desk"
        />
      </div>
      <div ref={el => sectionsRef.current[6] = el} className="section-animate">
        <FinalCTASection />
      </div>
    </div>
  )
}
