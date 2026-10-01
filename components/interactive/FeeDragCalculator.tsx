"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Scale, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeeDragCalculator() {
  // Portfolio size in Crores (0.5 to 25.0)
  const [portfolioCrores, setPortfolioCrores] = useState<number>(5.0);

  const initialCapital = portfolioCrores * 10000000;
  const grossReturnRate = 0.12; // 12% nominal gross return
  const regularPlanExpenseDrag = 0.0125; // 1.25% trailer commission
  const netRegularRate = grossReturnRate - regularPlanExpenseDrag; // 10.75%
  const annualFlatFee = 147500; // ₹1,25,000 + 18% GST

  // Compute 10-year compounding
  // Regular Plan: P * (1 + r_net)^10
  const regular10Yr = initialCapital * Math.pow(1 + netRegularRate, 10);
  // Direct Fiduciary Plan: compound at grossReturnRate then deduct fee each year
  let direct10Yr = initialCapital;
  for (let i = 0; i < 10; i++) {
    direct10Yr = direct10Yr * (1 + grossReturnRate) - annualFlatFee;
  }
  const saved10Yr = Math.max(0, direct10Yr - regular10Yr);

  // Compute 20-year compounding
  const regular20Yr = initialCapital * Math.pow(1 + netRegularRate, 20);
  let direct20Yr = initialCapital;
  for (let i = 0; i < 20; i++) {
    direct20Yr = direct20Yr * (1 + grossReturnRate) - annualFlatFee;
  }
  const saved20Yr = Math.max(0, direct20Yr - regular20Yr);

  const formatCrores = (val: number) => {
    const cr = val / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#090F1E] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-[#C5A059]/5 rounded-bl-full pointer-events-none" />

      <div className="space-y-3 mb-8">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C5A059]">
          <Scale className="h-4 w-4" />
          <span>Empirical Portfolio Arithmetic</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-slate-100 font-normal">
          The Hidden Cost of Distributor Regular Plans
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Mutual fund distributors and bank wealth desks earn ongoing 1.0% to 1.5% trailer commissions deducted silently every day from your portfolio NAV. Adjust the slider to quantify the wealth lost to distribution intermediaries versus pure fee-only advisory.
        </p>
      </div>

      {/* Slider Control */}
      <div className="p-6 rounded-xl bg-[#050B17] border border-slate-800/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block">
              Test Investable Portfolio Size
            </span>
            <span className="font-serif text-3xl text-[#DFC68E] font-medium">
              ₹{portfolioCrores.toFixed(1)} Crores{" "}
              <span className="text-xs font-sans text-slate-400">
                (₹{(portfolioCrores * 100).toFixed(0)} Lakhs)
              </span>
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-[#0A1226] px-3 py-1.5 rounded border border-slate-800 self-start sm:self-auto">
            HNI Benchmark Model (12% CAGR)
          </span>
        </div>

        <div className="pt-2">
          <Slider
            value={[portfolioCrores]}
            min={0.5}
            max={25.0}
            step={0.5}
            onValueChange={(vals) => setPortfolioCrores(vals[0])}
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
            <span>₹50 Lakhs (Min. Fiduciary Hurdle)</span>
            <span>₹10 Crores (HNI)</span>
            <span>₹25 Crores (Family Office)</span>
          </div>
        </div>
      </div>

      {/* Numerical Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* 10-Year Horizon */}
        <div className="rounded-xl border border-slate-800 bg-[#050B17] p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
              10-Year Horizon
            </span>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              Direct Plan Advantage
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] text-slate-400 block">Distributor Regular Plan Corpus:</span>
              <span className="font-serif text-xl text-slate-300">
                {formatCrores(regular10Yr)}
              </span>
              <span className="text-[10px] text-rose-400 block font-mono">
                Includes 1.25% ongoing distributor drag
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block">Aurum Direct Fiduciary Corpus:</span>
              <span className="font-serif text-xl text-[#DFC68E] font-medium">
                {formatCrores(direct10Yr)}
              </span>
              <span className="text-[10px] text-emerald-400 block font-mono">
                100% Direct Plans minus fixed statutory fee
              </span>
            </div>

            <div className="pt-3 border-t border-slate-800/80 bg-emerald-950/20 p-3 rounded-lg border border-emerald-900/40">
              <span className="text-[11px] uppercase tracking-wider text-slate-300 block font-medium">
                Net Wealth Preserved For Your Family:
              </span>
              <span className="font-serif text-2xl text-emerald-400 font-bold">
                +{formatCrores(saved10Yr)}
              </span>
            </div>
          </div>
        </div>

        {/* 20-Year Horizon */}
        <div className="rounded-xl border border-[#C5A059]/40 bg-gradient-to-b from-[#0E1B38] to-[#0A1226] p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/20">
            <span className="text-xs font-mono uppercase tracking-wider text-[#DFC68E]">
              20-Year Multi-Generational Horizon
            </span>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              Compounding Power
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] text-slate-300 block">Distributor Regular Plan Corpus:</span>
              <span className="font-serif text-xl text-slate-300">
                {formatCrores(regular20Yr)}
              </span>
              <span className="text-[10px] text-rose-300 block font-mono">
                Cumulative trailer commission drained to broker
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-300 block">Aurum Direct Fiduciary Corpus:</span>
              <span className="font-serif text-xl text-slate-50 font-medium">
                {formatCrores(direct20Yr)}
              </span>
              <span className="text-[10px] text-emerald-400 block font-mono">
                100% Direct Plans compound unhindered
              </span>
            </div>

            <div className="pt-3 border-t border-[#C5A059]/30 bg-[#050B17] p-3 rounded-lg border border-[#C5A059]/40">
              <span className="text-[11px] uppercase tracking-wider text-slate-200 block font-medium">
                Net Wealth Preserved For Your Family:
              </span>
              <span className="font-serif text-2xl text-[#DFC68E] font-bold">
                +{formatCrores(saved20Yr)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Explanatory Footnote & CTA */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[11px] text-slate-400 max-w-xl">
          * Note: Assumes 12.0% gross market return with annual rebalancing. Direct plan savings computed against 1.25% average regular plan distribution commission drag pursuant to AMFI expense ratio disclosures.
        </div>
        <Link
          href="/rpq"
          className="shrink-0 inline-flex items-center px-6 py-3 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-bold uppercase tracking-wider hover:bg-[#DFC68E] transition-all"
        >
          <span>Eliminate Commission Drag</span>
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Link>
      </div>
    </div>
  );
}
