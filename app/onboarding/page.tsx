"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
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
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Return to Fiduciary Overview</span>
          </Link>

          <div className="flex items-center space-x-3 text-xs text-slate-600">
            <span className="flex items-center text-emerald-700 font-semibold">
              <Lock className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              UIDAI & CeFCoM Verified Gateway
            </span>
            <span className="text-slate-300">|</span>
            <span>Reg: INA000019842</span>
            <span className="text-slate-300">|</span>
            <span>BASL-1892</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-red-600 block">
            Private Wealth Mandate Execution • Reg. 19 Fiduciary Indenture
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Institutional Client Onboarding Portal
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
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

        {/* Security Disclaimers */}
        <div className="text-center text-xs text-slate-400 space-y-1 pt-6 border-t border-slate-200">
          <p>
            Regulatory Compliance Notice: In strict compliance with UIDAI regulations, full Aadhaar numbers are never stored in plaintext. Cryptographic hash signatures and CKYCR registries are logged for SEBI statutory audit.
          </p>
        </div>
      </div>
    </div>
  );
}
