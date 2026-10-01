import React from "react";
import Link from "next/link";
import RPQForm from "@/components/RPQForm";
import { ArrowLeft, ShieldCheck, Scale, Award } from "lucide-react";

export default function RPQPage() {
  return (
    <div className="min-h-screen bg-[#050B17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:text-[#DFC68E] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-2" />
            <span>Return to Overview</span>
          </Link>

          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span className="flex items-center text-[#C5A059]">
              <ShieldCheck className="h-3.5 w-3.5 mr-1" />
              SEBI IA Reg: INA000019842
            </span>
            <span>•</span>
            <span>BASL-1892</span>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-mono">
            Mandatory Lead Qualification & Suitability Filter
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-slate-50 font-normal">
            Statutory Risk Profiling Questionnaire
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            In compliance with Regulation 16 and 17 of SEBI (Investment Advisers) Regulations, 2013, investment advice cannot be rendered without thorough assessment of investor risk tolerance and financial capacity.
          </p>
        </div>

        {/* RPQ Multi-Step Form */}
        <RPQForm />

        {/* Footnote on high friction */}
        <div className="text-center text-[11px] text-slate-500 max-w-xl mx-auto pt-4 space-y-1">
          <p>
            Notice: In accordance with our fiduciary intake charter, we maintain a strict minimum portfolio requirement of ₹50 Lakhs investable surplus to ensure client fee economics remain accretive.
          </p>
        </div>
      </div>
    </div>
  );
}
