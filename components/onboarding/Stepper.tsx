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
      subtitle: "UIDAI / CKYC Verification",
      icon: ShieldCheck,
    },
    {
      id: 2,
      title: "Advisory Agreement",
      subtitle: "SEBI Mandate & E-Sign",
      icon: FileSignature,
    },
    {
      id: 3,
      title: "CeFCoM Clearing",
      subtitle: "BSE / MFU Escrow Fee",
      icon: Landmark,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`rounded-xl p-4 border transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? "bg-[#0E1B38] border-[#C5A059] shadow-lg shadow-[#C5A059]/10"
                  : isCompleted
                  ? "bg-[#0A1226] border-emerald-500/40 opacity-90"
                  : "bg-[#060D1D] border-slate-800 opacity-60"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C5A059] via-[#DFC68E] to-[#C5A059]" />
              )}

              <div className="flex items-center space-x-3.5">
                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                    isCompleted
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                      : isActive
                      ? "bg-[#C5A059] text-[#050B17] shadow-sm"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                      Step 0{step.id}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] text-emerald-400 font-mono">Verified</span>
                    )}
                    {isActive && (
                      <span className="text-[10px] text-[#DFC68E] font-mono">In Progress</span>
                    )}
                  </div>
                  <h4
                    className={`font-serif text-sm truncate ${
                      isActive ? "text-slate-100 font-medium" : "text-slate-300"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">{step.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
