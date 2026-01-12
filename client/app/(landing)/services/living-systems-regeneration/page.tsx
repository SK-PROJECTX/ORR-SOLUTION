"use client";
import { useEffect, useRef } from "react";
import { useLivingSystemsContent } from "@/hooks/useServicePillarContent";
import HeroSection from "@/components/living_systems/HeroSection";
import WhatWeOfferSection from "@/components/shared/WhatWeOfferSection";
import HowWeWorkSection from "@/components/shared/HowWeWorkSection";
import NetworkAdvantageSection from "@/components/shared/NetworkAdvantageSection";
import DigitalSolutionsSection from "@/components/shared/DigitalSolutionsSection";
import CaseExampleSection from "@/components/shared/CaseExampleSection";
import FinalCTASection from "@/components/living_systems/FinalCTASection";

export default function LivingSystemsPage() {
  const { content, loading, error } = useLivingSystemsContent();
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Add logging to see what content is received
  useEffect(() => {
    console.log('📊 Living Systems Page - Content State:', { content, loading, error });
    if (content) {
      console.log('📊 Living Systems Page - Hero Title:', content.hero_title);
      console.log('📊 Living Systems Page - Hero Subtitle:', content.hero_subtitle);
      console.log('📊 Living Systems Page - Services Title:', content.services_title);
    }
  }, [content, loading, error]);

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

  useEffect(() => {
    if (content) {
      document.title = content.meta_title || content.hero_title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && content.meta_description) {
        metaDescription.setAttribute('content', content.meta_description);
      }
    }
  }, [content]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 relative overflow-hidden z-20">
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
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div ref={el => { sectionsRef.current[0] = el; }} className="section-animate">
        <HeroSection
          title={content?.hero_title || ""}
          subtitle={content?.hero_subtitle || ""}
          description={content?.hero_description || ""}
          image={content?.hero_image}
        />
      </div>
      <div ref={el => { sectionsRef.current[1] = el; }} className="section-animate">
        <WhatWeOfferSection
          title={content?.services_title}
          offers={[
            {
              title: content?.service_1_title || "",
              description: content?.service_1_description || "",
              icon: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z"
            },
            {
              title: content?.service_2_title || "",
              description: content?.service_2_description || "",
              icon: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
            },
            {
              title: content?.service_3_title || "",
              description: content?.service_3_description || "",
              icon: "M6.05 8.05C6.05 6.05 7.86 4.05 10.92 4.05S15.8 6.05 15.95 8.05C16.05 8.05 16.05 8.05 16.05 8.05C18.05 8.05 19.95 9.76 19.95 12.05S18.05 16.05 16.05 16.05H6.05C3.76 16.05 2.05 14.05 2.05 12.05S3.76 8.05 6.05 8.05M14.95 11.05L11.95 8.05L8.95 11.05H11.05V14.05H12.95V11.05H14.95Z"
            }
          ]}
        />
      </div>
      <div ref={el => { sectionsRef.current[2] = el; }} className="section-animate">
        <HowWeWorkSection
          title={content?.process_title || ""}
          subtitle="Observe . Design . Regenerate"
          description={content?.process_description || "At the heart of our work, we take a systems approach to understanding and regenerating living systems. We observe the current state, design regenerative solutions, and implement systems that restore ecological health while creating economic value."}
          sections={[
            {
              title: "Listen & Report (Site & System Discovery)",
              content: [
                "We begin with comprehensive site assessment and system analysis to understand current ecological conditions, resource flows, and regenerative potential.",
                "Our team conducts detailed ecological surveys, soil health assessments, biodiversity inventories, and water system evaluations.",
                "We analyze existing land use patterns, identify degraded areas, and assess opportunities for restoration and regeneration.",
                "Following assessment, we develop a detailed regeneration report mapping current conditions and restoration opportunities.",
                "We engage specialists from our network - ecologists, soil scientists, hydrologists - to validate findings and recommendations.",
                "A review meeting presents findings, addresses questions, and refines recommendations based on your feedback and priorities.",
                "The final report provides actionable insights and proposes a clear regeneration roadmap with immediate and long-term strategies."
              ]
            },
            {
              title: "Decide: Document or Partnership",
              content: [
                "Once you receive the regeneration report, you choose your path forward:",
                "• Use the report independently to guide internal regeneration efforts",
                "• Engage ORR for ongoing implementation support through tailored partnership"
              ]
            },
            {
              title: "Steward & Evolve (For Clients Who Continue)",
              content: [
                "For ongoing partnerships, we move into implementation and stewardship phases.",
                "We execute regenerative solutions, build ecological infrastructure, and establish monitoring systems.",
                "Continuous monitoring ensures regenerative systems create lasting positive impact and adapt to changing conditions.",
                "We provide ongoing support for system evolution, helping you scale successful interventions and refine approaches based on results."
              ]
            }
          ]}
          layout="grid"
        />
      </div>
      <div ref={el => { sectionsRef.current[3] = el; }} className="section-animate">
        <NetworkAdvantageSection
          description="Complex ecological challenges require diverse expertise. We activate our global network of specialists to deliver comprehensive regenerative solutions that restore ecosystems and create lasting positive impact."
          networkCards={[
            {
              title: "Ecological Scientists",
              description: "Ecosystem ecologists and biodiversity conservation specialists working to restore natural systems.",
              icon: "M6.05 8.05C6.05 6.05 7.86 4.05 10.92 4.05S15.8 6.05 15.95 8.05C16.05 8.05 16.05 8.05 16.05 8.05C18.05 8.05 19.95 9.76 19.95 12.05S18.05 16.05 16.05 16.05H6.05C3.76 16.05 2.05 14.05 2.05 12.05S3.76 8.05 6.05 8.05M14.95 11.05L11.95 8.05L8.95 11.05H11.05V14.05H12.95V11.05H14.95Z"
            },
            {
              title: "Regenerative Agriculture Experts",
              description: "Soil scientists and sustainable farming practitioners implementing regenerative practices.",
              icon: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z"
            },
            {
              title: "Circular Economy Designers",
              description: "Systems thinkers and waste-to-resource specialists creating circular solutions.",
              icon: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
            },
            {
              title: "Conservation Biologists",
              description: "Wildlife conservation and habitat restoration experts protecting biodiversity.",
              icon: "M9.5 3A6.5 6.5 0 0 1 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H16L21 19L19 21L14 16V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3M9.5 5C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"
            },
            {
              title: "Blue Economy Specialists",
              description: "Marine and coastal ecosystem experts developing sustainable ocean-based solutions.",
              icon: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L13.5 2.5L16.17 5.23L10.23 11.17C9.64 11.76 9 12 8 12S7.36 11.76 6.77 11.17L2 6.4L0.6 7.8L5.37 12.57C6.36 13.56 7.64 14 9 14S11.64 13.56 12.63 12.57L18.77 6.43L21.5 9.17L23 7.67L21 9Z"
            }
          ]}
        />
      </div>
      <div ref={el => { sectionsRef.current[4] = el; }} className="section-animate">
        <DigitalSolutionsSection
          title="Tools & Structures We"
          subtitle="Help Put In Place"
          description="We work with living systems — landscapes, forests, oceans, and ecosystems — to design regenerative solutions that bring life back to degraded environments."
          imageAlt="Tools and structures for regenerative systems"
          whoIsThisFor={[
            "Agricultural businesses transitioning to regenerative and sustainable farming practices",
            "Companies seeking to implement circular economy principles and eliminate waste",
            "Organizations committed to biodiversity conservation and ecosystem restoration",
            "Businesses looking to achieve carbon neutrality through natural climate solutions",
            "Companies wanting to build resilient supply chains based on regenerative practices",
            "Organizations seeking to create positive environmental impact while building economic value"
          ]}
          features={[
            "Ecosystem monitoring platforms with biodiversity tracking and health indicators",
            "Carbon sequestration measurement and verification systems with MRV protocols",
            "Regenerative agriculture management platforms with soil health monitoring",
            "Circular economy tracking systems with material flow analysis",
            "Biodiversity impact assessment tools with species monitoring",
            "Sustainable supply chain traceability platforms",
            "Natural capital accounting and valuation systems",
            "Regenerative impact reporting and certification workflows"
          ]}
        />
      </div>
      <div ref={el => { sectionsRef.current[5] = el; }} className="section-animate">
        <CaseExampleSection
          caseExample={{
            challenge: content?.case_challenge || "A large agricultural cooperative was facing declining soil health, reduced biodiversity, and increasing input costs from conventional farming practices. Climate change was creating additional stress on their operations, with unpredictable weather patterns affecting yields.",
            solution: content?.case_solution || "ORR conducted a comprehensive ecological assessment of the cooperative's land and operations. We delivered a detailed regeneration report that outlined soil restoration strategies, biodiversity enhancement plans, and carbon sequestration opportunities.",
            result: content?.case_result || "Following ORR's regenerative agriculture plan, the cooperative implemented soil-building practices that increased organic matter by 40% within two years. Input costs decreased by 30% as soil health improved and natural pest management systems developed."
          }}
          imageAlt={content?.case_image_alt || "Regenerative farm with diverse crops and healthy soil"}
        />
      </div>
      <div ref={el => { sectionsRef.current[6] = el; }} className="section-animate">
        <FinalCTASection
          title={content?.cta_title || ""}
          description={content?.cta_description || ""}
          buttonText={content?.cta_button_text || ""}
        />
      </div>
    </div>
  )
}