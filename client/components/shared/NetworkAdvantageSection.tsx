"use client";
import { useEffect, useRef } from "react";
import NetworkCard from "../strategy_advisory/NetworkCard";
import { getRichTextHTML } from "@/lib/rich-text-utils";
import { useLanguage } from "../../app/components/LanguageProvider";


interface NetworkCard {
  title: string;
  description: string;
  icon: string;
}

interface NetworkAdvantageItem {
  text: string;
  type: string;
}

interface NetworkAdvantageSectionProps {
  title?: string;
  description: string;
  networkCards?: NetworkCard[] | NetworkAdvantageItem[];
  layout?: 'grid' | 'flex';
}

export default function NetworkAdvantageSection({
  title,
  description,
  networkCards
}: NetworkAdvantageSectionProps) {
  const { language, interpolate, t } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const getHTML = (data: string) => {
    const htmlObj = getRichTextHTML(data, language);
    return { __html: interpolate(htmlObj.__html) };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  // Hardcoded premium roles matching user layout requirements
  const coreRoles = [
    {
      title: interpolate(t.services.legalRegistry || "Legal & Regulatory Experts"),
      description: interpolate(t.services.legalDesc || "specialized attorneys and compliance professionals across multiple jurisdictions"),
      icon: "M12 3c-1.1 0-2 .9-2 2v2H7c-1.1 0-2 .9-2 2v2h14v-2c0-1.1-.9-2-2-2h-3V5c0-1.1-.9-2-2-2zm0 2h-1v2h2V5h-1zm9 6H3v2h18v-2zm-9 3c-2.8 0-5 2.2-5 5v3h10v-3c0-2.8-2.2-5-5-5z",
      ctaText: interpolate(t.services.applyLegal || "Apply as Legal Expert")
    },
    {
      title: interpolate(t.services.scientificAdvisors || "Scientific Advisors"),
      description: interpolate(t.services.scientificDesc || "PhDs and researchers in biotechnology, environmental and computer science, and related fields"),
      icon: "M10 2v2h4V2h-4z M12 5c-3.9 0-7 3.1-7 7v7H3v2h18v-2h-2v-7c0-3.9-3.1-7-7-7z M12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
      ctaText: interpolate(t.services.applyScientific || "Join as Scientific Advisor")
    },
    {
      title: interpolate(t.services.industrySpecialists || "Industry Specialists"),
      description: interpolate(t.services.industryDesc || "sector-specific consultants with deep regulatory knowledge"),
      icon: "M22 10v12H2V10l7-5 4 3 6-5 3 3zM12 17v5h4v-5h-4z M4 12v2h2v-2H4z M4 16v2h2v-2H4z",
      ctaText: interpolate(t.services.applyIndustry || "Become an Industry Specialist")
    }
  ];

  const supportingRolesLocal = [
    {
      title: interpolate(t.services.techAuditors || "Technical Auditors"),
      description: interpolate(t.services.techAuditorsDesc || "certification professionals for ISO, GMP, and other standards"),
      icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm8 8h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V7h6v2z",
      ctaText: interpolate(t.services.applyAuditor || "Collaborate as an Auditor")
    },
    {
      title: interpolate(t.services.esgConsultants || "ESG Consultants"),
      description: interpolate(t.services.esgDesc || "sustainability experts and carbon accounting specialists"),
      icon: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z",
      ctaText: interpolate(t.services.applyEsg || "Partner as ESG Consultant")
    }
  ];

  // Logic to determine which cards to display
  const displayCards = networkCards && networkCards.length > 0 ? networkCards : [...coreRoles, ...supportingRolesLocal];
  const coreDisplay = displayCards.slice(0, 3);
  const supportingDisplay = displayCards.slice(3);

  return (
    <section className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-20 pb-32">
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.8s ease-out forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .slide-animate {
          opacity: 0;
        }
      `}</style>
      
      <div ref={headerRef} className="text-center mb-16 slide-animate">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          <span dangerouslySetInnerHTML={getHTML(title || t.shared.networkAdvantage)} />
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold text-[#00D683] mb-6">
          {interpolate(t.shared.networkSubtitle)}
        </h3>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
          <span dangerouslySetInnerHTML={getHTML(description)} />
        </p>
      </div>

      <div ref={cardsRef} className="max-w-7xl mx-auto slide-animate">
        {/* Core Network */}
        <div className="mb-12">
          {coreDisplay.length > 0 && (
            <>
              <h4 className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-8 text-center">{interpolate(t.shared.coreNetwork)}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {coreDisplay.map((card, index) => (
                  <NetworkCard 
                    key={index} 
                    {...(card as any)} 
                    className="transform hover:scale-[1.02] shadow-xl"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Supporting Specialists */}
        {supportingDisplay.length > 0 && (
          <div className="pt-8 border-t border-white/10">
            <h4 className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-8 text-center">{interpolate(t.shared.supportingSpecialists)}</h4>
            <div className={`grid grid-cols-1 md:grid-cols-${supportingDisplay.length > 1 ? 2 : 1} gap-6 lg:gap-10 max-w-4xl mx-auto`}>
              {supportingDisplay.map((card, index) => (
                <NetworkCard 
                  key={index} 
                  {...(card as any)} 
                  className="transform scale-95 hover:scale-100 shadow-lg opacity-90 hover:opacity-100" 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}