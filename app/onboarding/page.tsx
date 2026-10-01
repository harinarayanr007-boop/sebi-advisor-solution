"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, Lock, RefreshCw, UserCheck } from "lucide-react";
import Stepper from "@/components/onboarding/Stepper";
import KycStep from "@/components/onboarding/KycStep";
import AgreementStep from "@/components/onboarding/AgreementStep";
import PaymentStep from "@/components/onboarding/PaymentStep";
import CompletionStep from "@/components/onboarding/CompletionStep";
import { useOnboarding } from "@/context/OnboardingContext";

export default function OnboardingPage() {
  const { rpq, setRPQ, currentStep, setCurrentStep } = useOnboarding();

  // If user arrives directly in a prototype test session, pre-populate default qualified demo data
  useEffect(() => {
    if (!rpq) {
      setRPQ({
        fullName: "Vikramaditya Singhania",
        email: "v.singhania@singhania-holdings.in",
        phone: "9820012841",
        age: "36-50",
        horizon: "7_plus_years",
        netWorth: "2cr_to_10cr",
        income: "75l_to_2cr",
        experience: "direct_equity_mf",
        drawdownReaction: "remain_invested",
        objective: "wealth_preservation_growth",
        liquidityNeed: "moderate",
        riskScore: 70,
        riskTier: "Balanced Strategic Growth",
        riskProfile: "Balanced Strategic Growth",
        isQualified: true,
      });
    }
  }, [rpq, setRPQ]);

  return (
    <div className="min-h-screen bg-[#020611] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-architectural-grid">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#BE9A48]/20">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-[#BE9A48] hover:text-[#D8BD80] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-2" />
            <span>Return to Fiduciary Overview</span>
          </Link>

          <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center text-[#BE9A48]">
              <Lock className="h-3 w-3 mr-1" />
              UIDAI & CeFCoM Verified Gateway
            </span>
            <span>|</span>
            <span>Reg: INA000019842</span>
            <span>|</span>
            <span>BASL-1892</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D8BD80]">
            Private Wealth Mandate Execution // Reg. 19 Fiduciary Indenture
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-slate-50 font-normal">
            Institutional Client Onboarding Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
            Statutory end-to-end digital onboarding incorporating Aadhaar e-KYC, SEBI Advisory Agreement execution, and BSE/MFU CeFCoM fee escrow clearing.
          </p>
        </div>

        {/* Stepper (Only show on steps 1, 2, 3) */}
        {currentStep <= 3 && <Stepper currentStep={currentStep} />}

        {/* Step Views */}
        {currentStep === 1 && (
          <KycStep onNext={() => setCurrentStep(2)} />
        )}

        {currentStep === 2 && (
          <AgreementStep
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <PaymentStep
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && <CompletionStep />}

        {/* Regulatory footer note */}
        <div className="text-center text-[10px] text-slate-500 pt-6 font-mono">
          <span>Security Architecture: 256-Bit TLS 1.3 • Adhering to SEBI Cybersecurity Framework for Intermediaries</span>
        </div>
      </div>
    </div>
  );
}
