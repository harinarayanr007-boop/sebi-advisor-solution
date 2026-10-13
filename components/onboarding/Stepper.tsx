"use client";

import React from "react";
import { Check, ShieldCheck, FileSignature, Landmark } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

export default function Stepper({ currentStep }: StepperProps) {
  const steps = [
    {
      id: 1,
      title: "Statutory e-KYC",
      subtitle: "UIDAI / CKYC Registry Clearance",
      code: "STAGE 01 // IDENTITY",
      icon: ShieldCheck,
    },
    {
      id: 2,
      title: "Advisory Indenture",
      subtitle: "SEBI Mandate & Cryptographic E-Sign",
      code: "STAGE 02 // AGREEMENT",
      icon: FileSignature,
    },
    {
      id: 3,
      title: "CeFCoM Settlement",
      subtitle: "BSE / MFU Escrow Fee Clearing",
      code: "STAGE 03 // ESCROW",
      icon: Landmark,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mb-10 font-jakarta">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`relative p-5 sm:p-5.5 transition-all duration-300 rounded-3xl border ${
                isActive
                  ? "bg-white border-sky-500/90 shadow-[0_16px_36px_-10px_rgba(2,132,199,0.22)] ring-4 ring-sky-500/10 scale-[1.01]"
                  : isCompleted
                  ? "bg-emerald-50/50 border-emerald-300/80 shadow-[0_4px_16px_-4px_rgba(16,185,129,0.12)]"
                  : "bg-white/70 backdrop-blur-xs border-slate-200/80 text-slate-400 opacity-75"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`h-11 w-11 rounded-2xl flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                    isCompleted
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)]"
                      : isActive
                      ? "bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-[0_6px_18px_rgba(2,132,199,0.35)]"
                      : "bg-slate-100 text-slate-400 border border-slate-200/60"
                  }`}
                >
                  {isCompleted ? <Check className="h-5 w-5 stroke-[2.5]" /> : <Icon className="h-5 w-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400">
                      {step.code}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-full uppercase border border-emerald-200">
                        VERIFIED ✓
                      </span>
                    )}
                    {isActive && (
                      <span className="text-[10px] font-mono text-sky-700 font-bold bg-sky-50 px-2.5 py-0.5 rounded-full uppercase border border-sky-200 animate-pulse">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <h4
                    className={`text-[15px] font-extrabold tracking-tight truncate mt-1 ${
                      isActive ? "text-slate-900" : isCompleted ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">{step.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
