"use client";
import { useEffect, useRef } from "react";
import { useOperationalSystemsContent } from "@/hooks/useServicePillarContent";
import HeroSection from "@/components/operational_systems/HeroSection";
import WhatWeOfferSection from "@/components/shared/WhatWeOfferSection";
import HowWeWorkSection from "@/components/shared/HowWeWorkSection";
import NetworkAdvantageSection from "@/components/shared/NetworkAdvantageSection";
import DigitalSolutionsSection from "@/components/shared/DigitalSolutionsSection";
import CaseExampleSection from "@/components/shared/CaseExampleSection";
import FinalCTASection from "@/components/operational_systems/FinalCTASection";

export default function OperationalSystemsPage() {
  const { content, loading, error } = useOperationalSystemsContent();
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Add logging to see what content is received
  useEffect(() => {
    console.log('📊 Operational Systems Page - Content State:', { content, loading, error });
    if (content) {
      console.log('📊 Operational Systems Page - Hero Title:', content.hero_title);
      console.log('📊 Operational Systems Page - Hero Subtitle:', content.hero_subtitle);
      console.log('📊 Operational Systems Page - Services Title:', content.services_title);
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

  // Set page title and meta description from CMS
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
          image={content?.hero_image || ""}
        />
      </div>
      <div ref={el => { sectionsRef.current[1] = el; }} className="section-animate">
        <WhatWeOfferSection
          title={content?.services_title || ""}
          offers={[
            {
              title: content?.service_1_title || "",
              description: content?.service_1_description || "",
              icon: "M12 2L2 7L12 12L22 7L12 2M2 17L12 22L22 17M2 12L12 17L22 12"
            },
            {
              title: content?.service_2_title || "",
              description: content?.service_2_description || "",
              icon: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C15 7.1 14.1 8 13 8H11C9.9 8 9 7.1 9 6V4L3 7V9H21ZM3 10V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10H3Z"
            },
            {
              title: content?.service_3_title || "",
              description: content?.service_3_description || "",
              icon: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"
            }
          ]}
        />
      </div>
      <div ref={el => { sectionsRef.current[2] = el; }} className="section-animate">
        <HowWeWorkSection
          title={content?.process_title || ""}
          subtitle="Listen . Solve . Optimize"
          description={content?.process_description || "Just like your Business GP, we follow a systematic diagnostic and treatment approach to restore operational health."}
          sections={[
            {
              title: "Listen (Assess)",
              content: [
                content?.process_step_1 || ""
              ]
            },
            {
              title: "Solve (Design & Implement)",
              content: [
                content?.process_step_2 || ""
              ]
            },
            {
              title: "Optimize (Refine & Evolve)",
              content: [
                content?.process_step_3 || ""
              ]
            }
          ]}
        />
      </div>
      <div ref={el => { sectionsRef.current[3] = el; }} className="section-animate">
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
            }
          ]}
          layout="grid"
        />
      </div>
      <div ref={el => { sectionsRef.current[4] = el; }} className="section-animate">
        <DigitalSolutionsSection
          title="Digital Solutions"
          subtitle="We implement"
          description="We don't just recommend off-the-shelf tools — we build and integrate customized software solutions tailored to your unique workflows:"
          imageAlt="Operational systems dashboard showing process flows and metrics"
          whoIsThisFor={[
            "Self-employed professionals and freelancers ready to scale their operations",
            "Solo practitioners who want to digitalize and systematize their business processes",
            "Independent consultants seeking to professionalize their operations",
            "Service providers who prefer to focus on their core work",
            "Entrepreneurs growing beyond one-person operations"
          ]}
          features={[
            "Bespoke CRM systems with custom admin and client panels",
            "Tailored document management and knowledge base platforms",
            "Custom communication dashboards and notification systems",
            "Client portals with role-based access and branded interfaces",
            "Integrated automation workflows connecting multiple systems",
            "AI-powered solutions for process automation and data analysis",
            "Custom reporting and analytics dashboards"
          ]}
        />
      </div>
      <div ref={el => { sectionsRef.current[5] = el; }} className="section-animate">
        <CaseExampleSection
          caseExample={{
            challenge: content?.case_challenge || "A mid-sized manufacturing company was experiencing significant operational inefficiencies, with production delays, quality issues, and rising costs. Manual processes dominated their workflow, leading to errors and inconsistent output.",
            solution: content?.case_solution || "ORR conducted a comprehensive operational assessment, mapping all processes and identifying critical bottlenecks. We delivered a detailed optimization report with workflow redesign, quality control improvements, and automation opportunities.",
            result: content?.case_result || "Following ORR's recommendations, the company implemented standardized processes and automated key workflows, resulting in a 35% reduction in production time and 50% fewer quality defects. Overall operational costs decreased by 25% while customer satisfaction improved significantly."
          }}
          imageAlt={content?.case_image_alt || "Manufacturing floor with optimized processes and digital monitoring"}
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