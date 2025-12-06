"use client";
import React, { useState } from "react";
import ApproachCard from "../components/ApproachCard";
import GPMetaphorSection from "../components/GPMetaphorSection";
import Hero from "../components/Hero";
import ServicePillar from "../components/ServicePillars";
import { HeroSection } from "./components/HeroSection";
import MiniClientJourney from "../components/MiniClientJourney";
import FiveStagesSection from "../components/FiveStagesSection";
import ORRReportSection from "../components/ORRReportSection";
import FAQSection from "../components/FAQSection";
import ORRRoleSection from "../components/ORRRoleSection";
import { AuthService } from "../../lib/auth";
import LoginModal from "../../components/LoginModal";
import ContentEditorPanel from "../../components/ContentEditorPanel";
import AuthStatus from "../../components/AuthStatus";
import { useHomepageContent } from "../../hooks/useHomepageContent";

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { content, loading, error, updateHomepage, updateApproachSection, updateBusinessSystemSection, updateORRRoleSection, updateMessageStrip, updateProcessSection, updateORRReportSection, updateFAQ } = useHomepageContent();

  const auth = AuthService.getInstance();

  // Check authentication status on component mount
  React.useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
  }, [auth]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>

      <div id="hero-section">
        <HeroSection />
        <Hero content={content?.homepage} onContentUpdate={updateHomepage} />
      </div>
      <div id="approach-section">
        <ApproachCard content={content?.approachSection} onContentUpdate={updateApproachSection} />
      </div>
      <div id="services-section">
        <ServicePillar content={content?.homepage} onContentUpdate={updateHomepage} />
      </div>
      <div id="business-system-section">
        <GPMetaphorSection content={content?.businessSystemSection} onContentUpdate={updateBusinessSystemSection} />
      </div>
      <div id="orr-role-section">
        <ORRRoleSection content={content?.orrRoleSection} onContentUpdate={updateORRRoleSection} />
      </div>
      <div id="message-section">
        <MiniClientJourney content={content?.messageStrip} onContentUpdate={updateMessageStrip} />
      </div>
      <div id="process-section">
        <FiveStagesSection content={content?.processSection} onContentUpdate={updateProcessSection} />
      </div>
      <div id="report-section">
        <ORRReportSection content={content?.orrReportSection} onContentUpdate={updateORRReportSection} />
      </div>
      <div id="faq-section">
        <FAQSection content={content?.faqs} onContentUpdate={updateFAQ} />
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      
      <ContentEditorPanel />
    </div>
  );
}