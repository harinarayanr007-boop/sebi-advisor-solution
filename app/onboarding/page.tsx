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
        isQualified: true,
      });
    }
  }, [rpq, setRPQ]);

  return (
    <div className="min-h-screen bg-[#050B17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:text-[#DFC68E] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-2" />
            <span>Return to Homepage</span>
          </Link>

          <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center text-[#C5A059]">
              <Lock className="h-3 w-3 mr-1" />
              UIDAI & CeFCoM Verified Gateway
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Reg: INA000019842</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-mono">
            Private Wealth Mandate Execution
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-slate-50 font-normal">
            Institutional Client Onboarding
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
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
        <div className="text-center text-[10px] text-slate-500 pt-6">
          <span>Security Architecture: 256-Bit TLS 1.3 • Adhering to SEBI Cybersecurity Framework for Intermediaries</span>
        </div>
      </div>
    </div>
  );
}
