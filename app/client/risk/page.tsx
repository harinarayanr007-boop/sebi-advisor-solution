"use client";

import React, { useState } from "react";
import {
  Scale,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  PieChart,
} from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function ClientRiskPage() {
  const { activeClient, updateRiskProfile } = useFiduciary();

  const [q1, setQ1] = useState(2); // Investment Horizon
  const [q2, setQ2] = useState(2); // Volatility Tolerance
  const [q3, setQ3] = useState(3); // Financial Objective
  const [q4, setQ4] = useState(2); // Drawdown Reaction
  const [savedSuccess, setSavedSuccess] = useState(false);

  const calculateProfile = () => {
    const score = q1 + q2 + q3 + q4;
    if (score <= 5) {
      return {
        tolerance: "Conservative Capital Preservation",
        cagr: "8.5% CAGR",
        equity: 30,
        debt: 60,
        gold: 10,
      };
    } else if (score <= 8) {
      return {
        tolerance: "Balanced Strategic Growth",
        cagr: "11.5% CAGR",
        equity: 65,
        debt: 25,
        gold: 10,
      };
    } else {
      return {
        tolerance: "Aggressive Equity Compounding",
        cagr: "13.5% CAGR",
        equity: 80,
        debt: 10,
        gold: 10,
      };
    }
  };

  const currentProfile = calculateProfile();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateRiskProfile(
      currentProfile.tolerance,
      currentProfile.cagr,
      currentProfile.equity,
      currentProfile.debt,
      currentProfile.gold
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-7 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold font-space text-[#343C6A]">
          SEBI Regulation 17 Risk Suitability Diagnostic
        </h2>
        <p className="text-xs text-[#718EBF]">
          Mandatory investor risk profiling under SEBI (Investment Advisers) Regulations, 2013.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Risk profile & asset allocation successfully recalibrated and saved to your fiduciary mandate!</span>
        </div>
      )}

      {/* Recommended Allocation Card */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1814F3] bg-[#E7EDFF] px-2.5 py-1 rounded-full">
            Dynamic Suitability Result
          </span>
          <h3 className="text-xl font-bold font-space text-[#343C6A] mt-2">
            {currentProfile.tolerance}
          </h3>
          <p className="text-xs text-[#718EBF] mt-0.5">
            Target Hurdle Rate: <strong className="text-[#343C6A]">{currentProfile.cagr}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center p-3 bg-blue-50 rounded-2xl border border-blue-100 min-w-[70px]">
            <span className="text-[10px] font-bold text-blue-800 uppercase block">Equity</span>
            <span className="text-lg font-bold font-space text-blue-700">{currentProfile.equity}%</span>
          </div>
          <div className="text-center p-3 bg-indigo-50 rounded-2xl border border-indigo-100 min-w-[70px]">
            <span className="text-[10px] font-bold text-indigo-800 uppercase block">Debt</span>
            <span className="text-lg font-bold font-space text-indigo-700">{currentProfile.debt}%</span>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-2xl border border-amber-100 min-w-[70px]">
            <span className="text-[10px] font-bold text-amber-800 uppercase block">Gold</span>
            <span className="text-lg font-bold font-space text-amber-700">{currentProfile.gold}%</span>
          </div>
        </div>
      </div>

      {/* Questionnaire Form */}
      <form onSubmit={handleSave} className="bg-white rounded-[25px] p-7 border border-[#DFEAF2] shadow-sm space-y-6">
        {/* Q1 */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider">
            1. What is your primary capital investment horizon?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { val: 1, label: "Short Term (< 3 Years)" },
              { val: 2, label: "Medium Term (3 - 7 Years)" },
              { val: 3, label: "Long Term (> 7 Years / Generational)" },
            ].map((opt) => (
              <button
                type="button"
                key={opt.val}
                onClick={() => setQ1(opt.val)}
                className={`p-3.5 rounded-xl border text-left font-semibold transition ${
                  q1 === opt.val
                    ? "border-[#1814F3] bg-[#E7EDFF] text-[#1814F3]"
                    : "border-[#DFEAF2] bg-[#F5F7FA] text-[#718EBF] hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider">
            2. If markets drop 20% in a severe quarter, how do you respond?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { val: 1, label: "Panic and liquidate into cash/FDs immediately" },
              { val: 2, label: "Hold steady and trust the asset allocation" },
              { val: 3, label: "Aggressively deploy dry powder / rebalance" },
            ].map((opt) => (
              <button
                type="button"
                key={opt.val}
                onClick={() => setQ2(opt.val)}
                className={`p-3.5 rounded-xl border text-left font-semibold transition ${
                  q2 === opt.val
                    ? "border-[#1814F3] bg-[#E7EDFF] text-[#1814F3]"
                    : "border-[#DFEAF2] bg-[#F5F7FA] text-[#718EBF] hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider">
            3. What is your primary portfolio objective?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { val: 1, label: "Pure Capital Preservation (Beat inflation by 1%)" },
              { val: 2, label: "Balanced Compounding (Beat inflation by 4-5%)" },
              { val: 3, label: "Maximum Equity Wealth Accretion (12-14% CAGR)" },
            ].map((opt) => (
              <button
                type="button"
                key={opt.val}
                onClick={() => setQ3(opt.val)}
                className={`p-3.5 rounded-xl border text-left font-semibold transition ${
                  q3 === opt.val
                    ? "border-[#1814F3] bg-[#E7EDFF] text-[#1814F3]"
                    : "border-[#DFEAF2] bg-[#F5F7FA] text-[#718EBF] hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Q4 */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider">
            4. What percentage of your total wealth is held in liquid direct assets?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { val: 1, label: "Under 25% (Heavy illiquid real estate)" },
              { val: 2, label: "25% to 60% liquid financial assets" },
              { val: 3, label: "Over 60% liquid financial assets" },
            ].map((opt) => (
              <button
                type="button"
                key={opt.val}
                onClick={() => setQ4(opt.val)}
                className={`p-3.5 rounded-xl border text-left font-semibold transition ${
                  q4 === opt.val
                    ? "border-[#1814F3] bg-[#E7EDFF] text-[#1814F3]"
                    : "border-[#DFEAF2] bg-[#F5F7FA] text-[#718EBF] hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#DFEAF2] flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#1814F3] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
          >
            <span>Update Official Risk Suitability</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
