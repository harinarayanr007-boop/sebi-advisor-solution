import React, { Suspense } from "react";
import Link from "next/link";
import RPQForm from "@/components/RPQForm";
import { ArrowLeft, ShieldCheck, Scale, Lock, Landmark } from "lucide-react";

export default function RPQPage() {
  return (
    <div className="min-h-screen bg-[#020611] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 bg-architectural-grid">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation & Compliance Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#BE9A48]/20">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-[#BE9A48] hover:text-[#D8BD80] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-2" />
            <span>Return to Private Wealth Portal</span>
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center text-[#BE9A48]">
              <ShieldCheck className="h-3.5 w-3.5 mr-1" />
              SEBI IA Reg: INA000019842
            </span>
            <span className="text-slate-700">|</span>
            <span>BASL-1892</span>
            <span className="text-slate-700">|</span>
            <span className="text-emerald-400 flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block mr-1.5 animate-pulse" />
              CeFCoM Gateway Live
            </span>
          </div>
        </div>

        {/* Page Title & Statutory Scope */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.25em] text-[#D8BD80]">
            <Scale className="h-3.5 w-3.5" />
            <span>Mandatory Fiduciary Lead Qualification & Suitability Filter</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-slate-50 font-normal">
            Statutory Risk Profiling Dossier
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            In compliance with Regulation 16 and 17 of SEBI (Investment Advisers) Regulations, 2013, an investment adviser shall ensure suitability of advice based on thorough assessment of client financial capacity and risk resilience before rendering recommendations.
          </p>
        </div>

        {/* RPQ Multi-Step Form wrapped in Suspense */}
        <Suspense
          fallback={
            <div className="architectural-panel p-12 text-center text-slate-400 font-mono text-xs">
              Initializing Statutory Dossier Environment...
            </div>
          }
        >
          <RPQForm />
        </Suspense>

        {/* Footnote on Fiduciary Hurdle */}
        <div className="text-center text-[10px] text-slate-500 max-w-2xl mx-auto pt-6 border-t border-slate-900 space-y-1 font-mono">
          <p>
            Notice: In accordance with our fiduciary intake charter, Aurum Fiduciary Advisory maintains a strict minimum portfolio requirement of ₹50 Lakhs liquid investable surplus to ensure client fee economics remain accretive under SEBI guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
