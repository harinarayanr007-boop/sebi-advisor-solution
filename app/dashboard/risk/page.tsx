"use client";

import React, { useState } from "react";
import { Scale, CheckCircle2, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function RiskMandatePage() {
  const { activeClient, updateRiskProfile } = useFiduciary();

  // Questionnaire responses state
  const [q1, setQ1] = useState(2); // Objective
  const [q2, setQ2] = useState(3); // Horizon
  const [q3, setQ3] = useState(2); // Volatility
  const [q4, setQ4] = useState(3); // Emergency
  const [q5, setQ5] = useState(3); // Experience
  const [savedSuccess, setSavedSuccess] = useState(false);

  const calculateAndApply = () => {
    const totalScore = q1 * 5 + q2 * 5 + q3 * 6 + q4 * 4 + q5 * 5; // max 100
    let tolerance = "Balanced Strategic Growth";
    let cagr = "11.5% CAGR";
    let eq = 65;
    let debt = 25;
    let gold = 10;

    if (totalScore >= 80) {
      tolerance = "Aggressive Equity Compounding";
      cagr = "13.2% CAGR";
      eq = 75;
      debt = 15;
      gold = 10;
    } else if (totalScore <= 55) {
      tolerance = "Capital Preservation & Income";
      cagr = "9.5% CAGR";
      eq = 40;
      debt = 50;
      gold = 10;
    }

    updateRiskProfile(tolerance, cagr, eq, debt, gold);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-7">
      <div className="bg-white rounded-[25px] p-6 sm:p-8 border border-[#DFEAF2] shadow-sm space-y-6">
        <div className="border-b border-[#F5F7FA] pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-jakarta text-[#343C6A]">
                SEBI Regulation 17 Mandated Risk Suitability Profiler
              </h2>
              <p className="text-xs text-[#718EBF] mt-1">
                Mandatory suitability profiling under SEBI (Investment Advisers) Regulations, 2013 for {activeClient.name}.
              </p>
            </div>
            <span className="text-xs font-bold font-space px-3 py-1 rounded-full bg-blue-100 text-[#1814F3] self-start sm:self-auto">
              Current: {activeClient.riskTolerance}
            </span>
          </div>
        </div>

        {/* Current Allocation Scorecard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-[20px] bg-[#F5F7FA] border border-[#DFEAF2]">
            <span className="text-xs text-[#718EBF] font-semibold">Assigned Mandate</span>
            <h3 className="text-lg font-bold text-[#343C6A] mt-1">
              {activeClient.riskTolerance}
            </h3>
            <p className="text-xs text-[#718EBF] mt-2">
              Statutory risk tier based on net worth ({activeClient.netWorth}) and surplus ({activeClient.monthlySurplus}).
            </p>
          </div>

          <div className="p-5 rounded-[20px] bg-[#F5F7FA] border border-[#DFEAF2]">
            <span className="text-xs text-[#718EBF] font-semibold">Target Real CAGR</span>
            <h3 className="text-lg font-bold text-emerald-600 mt-1">
              {activeClient.targetCAGR}
            </h3>
            <p className="text-xs text-[#718EBF] mt-2">
              CPI inflation hedge + equity risk premium across direct demat holdings.
            </p>
          </div>

          <div className="p-5 rounded-[20px] bg-[#F5F7FA] border border-[#DFEAF2]">
            <span className="text-xs text-[#718EBF] font-semibold">Asset Allocation Guardrail</span>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs font-bold text-[#2D60FF] bg-blue-100 px-2.5 py-1 rounded-lg">
                {activeClient.equityAlloc}% Equity
              </span>
              <span className="text-xs font-bold text-[#FFBB38] bg-amber-100 px-2.5 py-1 rounded-lg">
                {activeClient.debtAlloc}% Debt
              </span>
              <span className="text-xs font-bold text-[#FC7900] bg-orange-100 px-2.5 py-1 rounded-lg">
                {activeClient.goldAlloc}% Gold
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Suitability Questionnaire */}
        <div className="space-y-6 pt-4 border-t border-[#F5F7FA]">
          <h3 className="text-base font-bold font-jakarta text-[#343C6A]">
            Interactive Statutory Assessment Questionnaire
          </h3>

          <div className="space-y-5 text-xs">
            {/* Q1 */}
            <div className="p-4 rounded-[18px] bg-[#F5F7FA] border border-[#DFEAF2] space-y-2">
              <p className="font-bold text-[#343C6A]">
                1. What is your primary capital accumulation objective?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { val: 1, label: "Strict Capital Preservation (Zero Nominal Loss)" },
                  { val: 2, label: "Balanced Long-Term Wealth Compound (CPI+5%)" },
                  { val: 3, label: "Aggressive Equity Growth (Maximize CAGR)" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setQ1(opt.val)}
                    className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                      q1 === opt.val
                        ? "bg-white border-[#1814F3] text-[#1814F3] shadow-sm"
                        : "bg-white/60 border-slate-200 text-[#718EBF] hover:bg-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="p-4 rounded-[18px] bg-[#F5F7FA] border border-[#DFEAF2] space-y-2">
              <p className="font-bold text-[#343C6A]">
                2. What is your expected investment horizon before drawing major capital?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { val: 1, label: "Short Term (< 3 Years)" },
                  { val: 2, label: "Medium Term (3 – 7 Years)" },
                  { val: 3, label: "Multi-Decade Horizon (7 – 15+ Years)" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setQ2(opt.val)}
                    className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                      q2 === opt.val
                        ? "bg-white border-[#1814F3] text-[#1814F3] shadow-sm"
                        : "bg-white/60 border-slate-200 text-[#718EBF] hover:bg-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3 */}
            <div className="p-4 rounded-[18px] bg-[#F5F7FA] border border-[#DFEAF2] space-y-2">
              <p className="font-bold text-[#343C6A]">
                3. How would you react if equity markets crashed -20% in a single quarter?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { val: 1, label: "Panic and demand immediate liquid conversion" },
                  { val: 2, label: "Hold steady with disciplined rebalancing" },
                  { val: 3, label: "Deploy additional cash surplus aggressively at discounts" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setQ3(opt.val)}
                    className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                      q3 === opt.val
                        ? "bg-white border-[#1814F3] text-[#1814F3] shadow-sm"
                        : "bg-white/60 border-slate-200 text-[#718EBF] hover:bg-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q4 */}
            <div className="p-4 rounded-[18px] bg-[#F5F7FA] border border-[#DFEAF2] space-y-2">
              <p className="font-bold text-[#343C6A]">
                4. What is the status of your liquid emergency reserves?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { val: 1, label: "Under 3 months living expenses" },
                  { val: 2, label: "6 to 12 months in arbitrage/liquid funds" },
                  { val: 3, label: "Over 24 months emergency surplus fully isolated" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setQ4(opt.val)}
                    className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                      q4 === opt.val
                        ? "bg-white border-[#1814F3] text-[#1814F3] shadow-sm"
                        : "bg-white/60 border-slate-200 text-[#718EBF] hover:bg-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                Mandate score recalculated & sealed to client profile!
              </span>
            ) : (
              <span className="text-xs text-[#718EBF]">
                Clicking recalculate will update the asset allocation across the dashboard.
              </span>
            )}
            <button
              onClick={calculateAndApply}
              className="bg-[#1814F3] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#120ec0] transition-colors"
            >
              Recalculate & Seal Mandate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
