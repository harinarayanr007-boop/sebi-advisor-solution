import React from "react";
import Image from "next/image";
import { ShieldCheck, CheckCircle, ChartLineUp } from "@phosphor-icons/react";

export default function FiduciaryProcessHero() {
  const steps = [
    {
      number: "01",
      title: "First, we talk",
      tag: "Goal & Liability Mapping",
      description:
        "We sit down and listen. Your goals, your fears, your numbers. We audit your existing portfolios to eliminate distributor commission drag.",
      image: "/figma/process-step-1.png",
    },
    {
      number: "02",
      title: "Then, we plan",
      tag: "Direct Allocation Blueprint",
      description:
        "You receive a clear, written advisory dossier detailing exact Direct Plan allocations, target percentages, and sovereign fixed income instruments.",
      image: "/figma/process-step-2.png",
    },
    {
      number: "03",
      title: "Finally, we act",
      tag: "Quarterly Fiduciary Oversight",
      description:
        "We monitor portfolio health, track asset drift, execute tax harvesting, and maintain periodic review calls to keep your plan on course.",
      image: "/figma/process-step-3.png",
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#0A1128] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1814F3]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1e90ff]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold tracking-wider text-blue-200 uppercase mb-4">
          <ShieldCheck size={14} weight="fill" className="text-emerald-400" />
          <span>The Fiduciary Process • How It Works</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-space tracking-tight text-white leading-tight">
          A Disciplined 3-Step Journey to Real Wealth Protection
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
          Zero distributor commissions, zero product sales quotas. Direct demat portfolios built strictly around your family&apos;s financial liabilities.
        </p>
      </div>

      {/* 3 Process Cards */}
      <div className="relative z-10 my-6 sm:my-8 space-y-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex items-center space-x-4 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] transition group"
          >
            {/* Step Visual / Thumbnail */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center p-1.5 overflow-hidden">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-[#1814F3] text-white flex items-center justify-center text-[10px] font-bold font-mono">
                  {step.number}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                  {step.tag}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {step.title}
              </h3>
              <p className="mt-0.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Trust & Compliance Bar */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SEBI INA000015845</span>
          <span>•</span>
          <span>BASL 1892</span>
        </div>
        <div className="text-slate-300 font-sans font-medium">
          Direct Demat • Pure Fiduciary Mandate
        </div>
      </div>
    </div>
  );
}
