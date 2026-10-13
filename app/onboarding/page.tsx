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
    <div className="min-h-screen bg-[#fcfdfe] text-slate-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-jakarta selection:bg-sky-500 selection:text-white">
      {/* Ambient Lighting Auras */}
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[960px] h-[520px] bg-[radial-gradient(ellipse,rgba(2,132,199,0.22)_0%,rgba(59,130,246,0.12)_40%,transparent_70%)] blur-[80px]" />
      <div className="pointer-events-none absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,rgba(239,68,68,0.06)_45%,transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 -left-40 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.12)_0%,rgba(6,182,212,0.08)_45%,transparent_70%)] blur-[80px]" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Floating Top Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:px-6 bg-white/80 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-mono font-bold text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1 text-slate-400 group-hover:text-slate-900" />
            <span>RETURN TO PRACTICE OVERVIEW</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80">
              <Lock className="h-3 w-3 mr-1.5 text-emerald-600" />
              UIDAI & CeFCoM VERIFIED
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600 font-semibold border border-slate-200">
              SEBI RIA: INA000019842
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600 font-semibold border border-slate-200">
              BASL-1892
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
          <div className="flex items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-sky-800 bg-sky-50 border border-sky-200/90 uppercase shadow-xs">
              🛡️ REG. 19 FIDUCIARY INDENTURE
            </span>
            <span className="inline-block px-2.5 py-0.5 border border-dashed border-red-400 text-red-600 font-mono text-[11px] font-bold tracking-wider rounded -rotate-1 bg-red-50/50">
              MANDATORY SPEC
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-slate-950 leading-[1.08]">
            Institutional Client<br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"> Onboarding Portal</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Statutory end-to-end digital indenture incorporating Aadhaar e-KYC, cryptographic SEBI agreement execution, and BSE/MFU CeFCoM escrow fee clearing.
          </p>

          <div className="pt-1 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-slate-700 bg-white border border-slate-200 shadow-xs">
              🌐 HARINARAYAN.ME // FINTECH CONVERSION ARCHITECTURE
            </span>
          </div>
        </div>

        {/* Stepper (Only show on steps 1, 2, 3) */}
        {currentStep <= 3 && <Stepper currentStep={currentStep} />}

        {/* Step Views */}
        <div className="relative">
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
        </div>

        {/* Security Disclaimers */}
        <div className="text-center text-xs font-mono text-slate-500 space-y-1.5 pt-8 border-t border-slate-200/80">
          <p className="max-w-2xl mx-auto">
            STATUTORY COMPLIANCE NOTICE: Full Aadhaar numbers are never stored in plaintext under UIDAI guidelines. Cryptographic hash signatures and CKYCR registries are logged for SEBI statutory audit.
          </p>
          <p className="text-[11px] text-slate-400">
            AURUM FIDUCIARY ADVISORY • 256-BIT TLS ENCRYPTION • BSE StAR MF ESCROW CLEARED
          </p>
        </div>
      </div>
    </div>
  );
}
