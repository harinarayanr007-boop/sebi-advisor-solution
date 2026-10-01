"use client";

import React from "react";
import { Check, ShieldCheck, FileSignature, Landmark, Lock } from "lucide-react";
import { motion } from "motion/react";

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
    <div className="w-full max-w-5xl mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`relative p-4 sm:p-5 transition-all duration-300 rounded-sm border ${
                isActive
                  ? "bg-gradient-to-b from-[#142445] to-[#081022] border-[#BE9A48] shadow-xl shadow-black/60"
                  : isCompleted
                  ? "bg-[#061426] border-emerald-500/40 text-slate-300"
                  : "bg-[#040915] border-slate-800/80 text-slate-500 opacity-60"
              }`}
            >
              {/* Corner tick marks on active */}
              {isActive && (
                <>
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#BE9A48]" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#BE9A48]" />
                </>
              )}

              <div className="flex items-start space-x-3.5">
                <div
                  className={`h-9 w-9 rounded-sm flex items-center justify-center font-mono text-xs font-bold transition-all shrink-0 ${
                    isCompleted
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                      : isActive
                      ? "bg-[#BE9A48] text-[#040915] shadow-md shadow-[#BE9A48]/30 font-bold"
                      : "bg-[#081022] text-slate-500 border border-slate-800"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#D8BD80]">
                      {step.code}
                    </span>
                    {isCompleted && (
                      <span className="font-mono text-[9px] text-emerald-400 font-bold tracking-wider uppercase">
                        PASSED
                      </span>
                    )}
                    {isActive && (
                      <span className="font-mono text-[9px] text-[#F3ECDB] bg-[#BE9A48]/20 px-1.5 py-0.5 rounded border border-[#BE9A48]/40 tracking-wider uppercase">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h4
                    className={`font-serif text-sm truncate mt-0.5 ${
                      isActive ? "text-slate-100 font-medium" : isCompleted ? "text-slate-200" : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{step.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
