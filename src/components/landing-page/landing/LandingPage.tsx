"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import BenefitsSection from "./BenefitsSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function LandingPage() {
  const [currentSection, setCurrentSection] = useState("inicio");
  const router = useRouter();

  const handleNavClick = (section: string) => {
    setCurrentSection(section);
    if (section === "profesionales") router.push("/professionals-marketplace");
  };

  const MainContent = () => (
    <>
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
      <Navbar currentSection={currentSection} onNavClick={handleNavClick} />
        {renderContent()}
      <Footer onNavClick={handleNavClick} />
    </div>
  );
}
