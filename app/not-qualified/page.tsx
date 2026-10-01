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
  Lock,
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
    <div className="min-h-screen bg-[#020611] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 bg-architectural-grid">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Link */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-[#BE9A48] hover:text-[#D8BD80] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-2" />
          <span>Return to Homepage</span>
        </Link>

        {/* Fiduciary Notice Card */}
        <div className="architectural-panel p-8 sm:p-10 shadow-2xl relative overflow-hidden text-slate-100">
          <div className="flex items-center space-x-3 text-amber-400 mb-6 pb-6 border-b border-slate-800">
            <div className="h-10 w-10 rounded-sm bg-amber-950/40 border border-amber-500/40 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D8BD80] block font-semibold">
                SEBI Suitability Notice // Reg. 17 Economic Hurdle Gate
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-slate-100 font-normal">
                Minimum Portfolio Hurdle Unmet
              </h1>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 font-light">
            <p>
              Dear {rpq?.fullName ? <strong className="text-slate-100 font-medium font-serif">{rpq.fullName}</strong> : "Investor"},
            </p>
            <p>
              Thank you for completing the statutory Risk Profiling Questionnaire. Based on your declared liquid investable net worth (<span className="text-amber-300 font-mono font-medium">Below ₹50 Lakhs</span>), our fiduciary compliance protocol is unable to onboard you for personalized wealth advisory at this juncture.
            </p>

            <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 space-y-2 text-xs font-sans">
              <div className="text-[#D8BD80] font-medium uppercase tracking-wider text-[11px] flex items-center font-mono">
                <Scale className="h-3.5 w-3.5 mr-1.5 text-[#BE9A48]" />
                Why this high-friction boundary exists under SEBI fiduciary principles:
              </div>
              <p className="text-slate-400 text-justify leading-relaxed">
                Under Regulation 17 of SEBI (Investment Advisers) Regulations, 2013, an adviser has a legal duty to recommend only what is economically sound for the client. Aurum Fiduciary operates strictly on a statutory fee-only structure (fixed retainers of ₹1,25,000 + GST/annum). On a portfolio below ₹50 Lakhs, such fees would consume over 2.5% of your capital annually, creating an unfavorable expense burden.
              </p>
            </div>

            <p className="text-slate-400 text-xs font-mono">
              In upholding our duty of care, we decline engagements where advisory overhead would impair your wealth compounding.
            </p>
          </div>

          {/* Educational Resources & Waitlist */}
          <div className="mt-8 pt-8 border-t border-slate-800 space-y-6">
            <h3 className="font-serif text-lg text-slate-100 font-normal">
              Recommended Unbiased Alternatives
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-slate-100 font-medium text-xs font-mono">
                  <BookOpen className="h-4 w-4 text-[#BE9A48]" />
                  <span>Direct Index & Low-Cost Investing</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  For portfolios accumulating towards ₹50 Lakhs, low-cost Direct Mutual Funds (Nifty 50 and Nifty Midcap 150 index funds) offer commission-free compounding without advisory fees.
                </p>
                <a
                  href="https://investor.sebi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-[10px] text-[#D8BD80] hover:underline pt-1 font-mono"
                >
                  <span>SEBI Official Investor Education</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>

              <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-slate-100 font-medium text-xs font-mono">
                  <Mail className="h-4 w-4 text-[#BE9A48]" />
                  <span>Future HNI Waitlist</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  Join our research distribution list to receive institutional whitepapers and priority re-evaluation once your liquid surplus scales to ₹50 Lakhs.
                </p>

                {waitlistSubmitted ? (
                  <div className="flex items-center space-x-2 text-[11px] text-emerald-400 pt-1 font-mono">
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
                      className="flex-1 rounded-sm border border-slate-800 bg-[#020611] px-3 py-1.5 text-xs text-slate-100 focus:border-[#BE9A48] focus:outline-none font-mono"
                    />
                    <button
                      type="submit"
                      className="btn-gold-foil px-4 py-1.5 rounded-sm text-xs uppercase tracking-wider font-bold"
                    >
                      Join
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 text-xs text-slate-500 font-mono">
              <span>Entered incorrect figures?</span>
              <button
                type="button"
                onClick={() => {
                  resetOnboarding();
                  window.location.href = "/rpq";
                }}
                className="inline-flex items-center text-[#D8BD80] hover:underline"
              >
                <RefreshCw className="h-3 w-3 mr-1 text-[#BE9A48]" />
                <span>Recalibrate Questionnaire</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
