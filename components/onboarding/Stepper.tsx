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
    <div className="w-full max-w-5xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`relative p-5 transition-all duration-300 rounded-3xl border ${
                isActive
                  ? "bg-white border-slate-900 shadow-md ring-2 ring-slate-900/10"
                  : isCompleted
                  ? "bg-emerald-50/60 border-emerald-200 text-slate-700"
                  : "bg-white/80 border-slate-200 text-slate-400"
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div
                  className={`h-10 w-10 rounded-2xl flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      {step.code}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] text-emerald-700 font-bold uppercase">
                        PASSED
                      </span>
                    )}
                    {isActive && (
                      <span className="text-[10px] text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full uppercase">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h4
                    className={`text-sm font-bold truncate mt-1 ${
                      isActive ? "text-slate-900" : isCompleted ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{step.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
