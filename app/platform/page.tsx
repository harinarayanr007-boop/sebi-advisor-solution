"use client";

import React, { useState } from "react";
import WhitepaceNavbar from "@/components/whitepace/WhitepaceNavbar";
import WhitepaceHero from "@/components/whitepace/WhitepaceHero";
import WhitepaceIntakeSuite from "@/components/whitepace/WhitepaceIntakeSuite";
import WhitepaceEmbedCode from "@/components/whitepace/WhitepaceEmbedCode";
import WhitepaceCustomise from "@/components/whitepace/WhitepaceCustomise";
import WhitepacePricing from "@/components/whitepace/WhitepacePricing";
import WhitepaceCrossPlatform from "@/components/whitepace/WhitepaceCrossPlatform";
import WhitepaceSecurity from "@/components/whitepace/WhitepaceSecurity";
import WhitepaceEcosystem from "@/components/whitepace/WhitepaceEcosystem";
import WhitepaceIntegrations from "@/components/whitepace/WhitepaceIntegrations";
import WhitepaceTestimonials from "@/components/whitepace/WhitepaceTestimonials";
import WhitepaceCtaBanner from "@/components/whitepace/WhitepaceCtaBanner";
import WhitepaceFooter from "@/components/whitepace/WhitepaceFooter";
import WhitepaceBookDemoModal from "@/components/whitepace/WhitepaceBookDemoModal";

export default function PlatformPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-[#212529] font-sans selection:bg-[#FFE492] selection:text-[#043873]">
      
      {/* 1. Header (Navbar) */}
      <WhitepaceNavbar onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* 2. Hero Section with Interactive Simulator */}
      <WhitepaceHero onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* 3. Work Management (Intake Management & Collaborative Hub) */}
      <WhitepaceIntakeSuite onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* 4. Use as Extension / 1-Line Embed Code */}
      <WhitepaceEmbedCode onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* 5. Customise It to Your Needs (Brand & Rubric Customizer) */}
      <WhitepaceCustomise onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* 6. Transparent Pricing Plans */}
      <WhitepacePricing onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* 7. Your Work, Everywhere You Are (Cross-Platform) */}
      <WhitepaceCrossPlatform onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* 8. 100% Your Data (Cybersecurity & Indian Data Residency) */}
      <WhitepaceSecurity onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* 9. Our Sponsors / Indian Wealth Stack Integrations */}
      <WhitepaceEcosystem />

      {/* 10. Native Apps & CRM Integrations */}
      <WhitepaceIntegrations onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* 11. Top Fiduciary RIA Testimonials */}
      <WhitepaceTestimonials />

      {/* 12. Free Trial / 72-Hour Deployment Banner */}
      <WhitepaceCtaBanner onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* 13. Institutional Footer */}
      <WhitepaceFooter />

      {/* Interactive Booking Walkthrough Modal */}
      <WhitepaceBookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

    </div>
  );
}
