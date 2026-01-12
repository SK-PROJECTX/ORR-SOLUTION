"use client";
import { useEffect, useRef } from "react";
import { useStrategicAdvisoryContent } from "@/hooks/useServicePillarContent";
import HeroSection from "@/components/strategy_advisory/HeroSection";
import WhatWeOfferSection from "@/components/shared/WhatWeOfferSection";
import HowWeWorkSection from "@/components/shared/HowWeWorkSection";
import NetworkAdvantageSection from "@/components/shared/NetworkAdvantageSection";
import DigitalSolutionsSection from "@/components/shared/DigitalSolutionsSection";
import CaseExampleSection from "@/components/shared/CaseExampleSection";
import FinalCTASection from "@/components/strategy_advisory/FinalCTASection";

export default function StrategyAdvisoryPage() {
  const { content, loading, error } = useStrategicAdvisoryContent();
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Add logging to see what content is received
  useEffect(() => {
    console.log('📊 Strategic Advisory Page - Content State:', { content, loading, error });
    if (content) {
      console.log('📊 Strategic Advisory Page - Hero Title:', content.hero_title);
      console.log('📊 Strategic Advisory Page - Hero Subtitle:', content.hero_subtitle);
      console.log('📊 Strategic Advisory Page - Services Title:', content.services_title);
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
              icon: "M12 3L1 9L12 15L21 12.35V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
            },
            {
              title: content?.service_2_title || "",
              description: content?.service_2_description || "",
              icon: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z"
            },
            {
              title: content?.service_3_title || "",
              description: content?.service_3_description || "",
              icon: "M9.5 3A6.5 6.5 0 0 1 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H16L21 19L19 21L14 16V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3M9.5 5C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"
            }
          ]}
        />
      </div>
      <div ref={el => { sectionsRef.current[2] = el; }} className="section-animate">
        <HowWeWorkSection
          title={content?.process_title || ""}
          subtitle={content?.process_subtitle || ""}
          description={content?.process_description || ""}
          sections={[
            {
              title: content?.process_step_1_title || "",
              subtitle: content?.process_step_1_subtitle || "",
              content: [
                content?.process_step_1 || ""
              ]
            },
            {
              title: content?.process_step_2_title || "",
              content: [
                content?.process_step_2 || ""
              ]
            },
            {
              title: content?.process_step_3_title || "",
              content: [
                content?.process_step_3 || ""
              ]
            }
          ]}
          layout="single"
        />
      </div>
      <div ref={el => { sectionsRef.current[3] = el; }} className="section-animate">
        <NetworkAdvantageSection
          title={content?.network_title || ""}
          description={content?.network_description || ""}
          networkCards={content?.network_cards || []}
        />
      </div>
      <div ref={el => { sectionsRef.current[4] = el; }} className="section-animate">
        <DigitalSolutionsSection
          title={content?.digital_title || ""}
          subtitle={content?.digital_subtitle || ""}
          description={content?.digital_description || ""}
          imageAlt={content?.digital_image_alt || ""}
          whoIsThisFor={content?.digital_who_is_this_for || []}
          features={content?.digital_features || []}
        />
      </div>
      <div ref={el => { sectionsRef.current[5] = el; }} className="section-animate">
        <CaseExampleSection
          caseExample={{
            challenge: content?.case_challenge || "",
            solution: content?.case_solution || "",
            result: content?.case_result || ""
          }}
          imageAlt={content?.case_image_alt || ""}
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
