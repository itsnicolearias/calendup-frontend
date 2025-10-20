"use client";

import { useState } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import BenefitsSection from "./BenefitsSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import Footer from "./Footer";
import FloatingCalculatorButton from "../benefits/FloatingCalculatorButton";

export default function LandingPage() {
  const [currentSection, setCurrentSection] = useState("inicio");

  const handleNavClick = (section: string) => {
    setCurrentSection(section);

  };

  const MainContent = () => (
    <>
      <FloatingCalculatorButton />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
    </>

  )

  const renderContent = () => {
    switch (currentSection) {
      case "faq":
        return <FAQSection />
      default:
        return <MainContent />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {renderContent()}
      <Footer onNavClick={handleNavClick} />
    </div>
  );
}
