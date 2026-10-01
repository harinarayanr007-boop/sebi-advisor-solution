"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowLeft,
  BookOpen,
  Mail,
  CheckCircle2,
  ExternalLink,
  Scale,
  RefreshCw,
} from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

export default function NotQualifiedPage() {
  const { rpq, resetOnboarding } = useOnboarding();
  const [waitlistEmail, setWaitlistEmail] = useState(rpq?.email || "");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      setWaitlistSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B17] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation Link */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:text-[#DFC68E] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-2" />
          <span>Return to Homepage</span>
        </Link>

        {/* Fiduciary Notice Card */}
        <div className="rounded-xl border border-slate-800 bg-[#090F1E] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex items-center space-x-3 text-amber-400 mb-6">
            <div className="h-10 w-10 rounded-full bg-amber-950/40 border border-amber-500/40 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block">
                SEBI Suitability Notice
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-slate-100 font-normal">
                Minimum Portfolio Hurdle Unmet
              </h1>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-6">
            <p>
              Dear {rpq?.fullName ? <strong className="text-slate-100">{rpq.fullName}</strong> : "Investor"},
            </p>
            <p>
              Thank you for completing the statutory Risk Profiling Questionnaire. Based on your declared liquid investable net worth (<span className="text-amber-300 font-mono">Below ₹50 Lakhs</span>), our fiduciary compliance protocol is unable to onboard you for personalized wealth advisory at this juncture.
            </p>

            <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-2 text-xs">
              <div className="text-[#C5A059] font-medium uppercase tracking-wider text-[11px] flex items-center">
                <Scale className="h-3.5 w-3.5 mr-1.5" />
                Why this high-friction boundary exists under SEBI fiduciary principles:
              </div>
              <p className="text-slate-400 text-justify">
                Under Regulation 17 of SEBI (Investment Advisers) Regulations, 2013, an adviser has a legal duty to recommend only what is economically sound for the client. Aurum Fiduciary operates strictly on a statutory fee-only structure (fixed retainers of ₹1,25,000 + GST/annum). On a portfolio below ₹50 Lakhs, such fees would consume over 2.5% of your capital annually, creating an unfavorable expense burden.
              </p>
            </div>

            <p className="text-slate-400 text-xs">
              In upholding our duty of care, we decline engagements where advisory overhead would impair your wealth compounding.
            </p>
          </div>

          {/* Educational Resources & Waitlist */}
          <div className="mt-8 pt-8 border-t border-slate-800 space-y-6">
            <h3 className="font-serif text-lg text-slate-100">Recommended Unbiased Alternatives</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-slate-100 font-medium text-xs">
                  <BookOpen className="h-4 w-4 text-[#C5A059]" />
                  <span>Direct Index & Low-Cost Investing</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  For portfolios accumulating towards ₹50 Lakhs, low-cost Direct Mutual Funds (Nifty 50 and Nifty Midcap 150 index funds) offer commission-free compounding without advisory fees.
                </p>
                <a
                  href="https://investor.sebi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-[10px] text-[#DFC68E] hover:underline pt-1"
                >
                  <span>SEBI Official Investor Education</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>

              <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-slate-100 font-medium text-xs">
                  <Mail className="h-4 w-4 text-[#C5A059]" />
                  <span>Future HNI Waitlist</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Join our research distribution list to receive institutional whitepapers and priority re-evaluation once your liquid surplus scales to ₹50 Lakhs.
                </p>

                {waitlistSubmitted ? (
                  <div className="flex items-center space-x-2 text-[11px] text-emerald-400 pt-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Enrolled in Institutional Insights Waitlist</span>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="flex gap-2 pt-1">
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="flex-1 rounded border border-slate-700 bg-[#0A1226] px-2.5 py-1 text-xs text-slate-100 focus:border-[#C5A059] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 rounded bg-[#C5A059] text-[#050B17] text-xs font-semibold hover:bg-[#DFC68E]"
                    >
                      Join
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 text-xs text-slate-500">
              <span>Entered incorrect figures?</span>
              <button
                type="button"
                onClick={() => {
                  resetOnboarding();
                  window.location.href = "/rpq";
                }}
                className="inline-flex items-center text-[#C5A059] hover:underline"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                <span>Recalibrate Questionnaire</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
