"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Scale, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function FeeDragCalculator() {
  // Portfolio size in Crores (0.5 to 25.0)
  const [portfolioCrores, setPortfolioCrores] = useState<number>(5.0);
  const [hoveredYear, setHoveredYear] = useState<number>(20);

  const initialCapital = portfolioCrores * 10000000;
  const grossReturnRate = 0.12; // 12% nominal gross return
  const regularPlanExpenseDrag = 0.0125; // 1.25% AMC trailer commission
  const netRegularRate = grossReturnRate - regularPlanExpenseDrag; // 10.75%
  const annualFlatFee = 147500; // ₹1,25,000 + 18% GST

  // Generate data points for Years 0 to 20
  const years = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  const chartData = years.map((yr) => {
    if (yr === 0) {
      return { year: 0, regular: initialCapital, direct: initialCapital, saved: 0 };
    }
    const reg = initialCapital * Math.pow(1 + netRegularRate, yr);
    let dir = initialCapital;
    for (let i = 0; i < yr; i++) {
      dir = dir * (1 + grossReturnRate) - annualFlatFee;
    }
    const saved = Math.max(0, dir - reg);
    return { year: yr, regular: reg, direct: dir, saved };
  });

  const maxVal = chartData[chartData.length - 1].direct * 1.05;

  // SVG dimensions
  const svgWidth = 720;
  const svgHeight = 240;
  const paddingX = 40;
  const paddingY = 25;
  const plotWidth = svgWidth - paddingX * 2;
  const plotHeight = svgHeight - paddingY * 2;

  const getX = (year: number) => paddingX + (year / 20) * plotWidth;
  const getY = (val: number) => paddingY + plotHeight - (val / maxVal) * plotHeight;

  // Build SVG path strings
  const directPoints = chartData.map((d) => `${getX(d.year)},${getY(d.direct)}`).join(" L ");
  const directPath = `M ${directPoints}`;

  const regularPoints = chartData.map((d) => `${getX(d.year)},${getY(d.regular)}`).join(" L ");
  const regularPath = `M ${regularPoints}`;

  // Area between direct and regular
  const areaPoints = [
    ...chartData.map((d) => `${getX(d.year)},${getY(d.direct)}`),
    ...chartData.slice().reverse().map((d) => `${getX(d.year)},${getY(d.regular)}`),
  ].join(" L ");
  const areaPath = `M ${areaPoints} Z`;

  const formatCrores = (val: number) => {
    const cr = val / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  };

  const currentHoverPoint =
    chartData.find((d) => d.year === hoveredYear) || chartData[chartData.length - 1];

  return (
    <div className="architectural-panel p-6 sm:p-10 shadow-2xl relative overflow-hidden text-slate-100">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 h-96 w-96 bg-[#BE9A48]/5 rounded-bl-full pointer-events-none blur-3xl" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D8BD80]">
            <Scale className="h-4 w-4 text-[#BE9A48]" />
            <span>Quantitative Portfolio Forensics // SEBI Size 10 Verified</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-slate-100 font-normal">
            The Mathematical Toll of Distributor Commissions
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Mutual fund distributors and bank wealth desks charge an invisible 1.0% to 1.5% trailer fee deducted daily from fund NAVs. Test any capital allocation below to see how direct fiduciary execution compounds over time.
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">Presets:</span>
          {[
            { label: "₹1 Cr", val: 1.0 },
            { label: "₹5 Cr", val: 5.0 },
            { label: "₹15 Cr", val: 15.0 },
            { label: "₹25 Cr", val: 25.0 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setPortfolioCrores(preset.val)}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-all ${
                portfolioCrores === preset.val
                  ? "bg-[#BE9A48] text-[#040915] font-bold shadow-md"
                  : "bg-[#081022] text-slate-300 border border-slate-800 hover:border-slate-600"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Slider Area */}
      <div className="p-6 rounded-sm bg-[#040915] border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
              Investable Liquid Surplus
            </span>
            <span className="font-serif text-3xl sm:text-4xl text-[#F3ECDB] font-medium">
              ₹{portfolioCrores.toFixed(1)} Crores{" "}
              <span className="text-xs font-mono text-slate-400 font-normal">
                (₹{Math.round(portfolioCrores * 100)} Lakhs)
              </span>
            </span>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-sm bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>100% Commission-Free Direct Plans</span>
            </span>
          </div>
        </div>

        {/* Radix Slider */}
        <div className="space-y-2">
          <Slider
            value={[portfolioCrores]}
            onValueChange={(vals) => setPortfolioCrores(vals[0])}
            min={0.5}
            max={25.0}
            step={0.5}
            className="w-full py-2"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>₹50 Lakhs (Min. Fiduciary Hurdle)</span>
            <span>₹10 Crores (Established HNI)</span>
            <span>₹25 Crores (Family Office Mandate)</span>
          </div>
        </div>
      </div>

      {/* DUAL-CURVE COMPOUNDING CHART */}
      <div className="mt-8 p-6 rounded-sm bg-[#040915] border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-[#BE9A48] inline-block shadow-sm shadow-[#BE9A48]" />
              <span className="text-[#F3ECDB] font-medium">Aurum Direct Fiduciary</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-slate-500 inline-block" />
              <span className="text-slate-400">Distributor Regular Plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-4 rounded-sm bg-emerald-500/30 border border-emerald-500/50 inline-block" />
              <span className="text-emerald-400">Cumulative Wealth Preserved</span>
            </div>
          </div>
          <div className="text-slate-400 text-[11px]">
            Selected Horizon: <strong className="text-[#D8BD80]">Year {hoveredYear}</strong>
          </div>
        </div>

        {/* SVG Visualization */}
        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-56 sm:h-64 select-none"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#BE9A48" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#BE9A48" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
              const y = paddingY + plotHeight * (1 - frac);
              return (
                <line
                  key={idx}
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="#142445"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              );
            })}

            {/* Area between curves */}
            <path d={areaPath} fill="url(#areaGradient)" />

            {/* Regular Plan Curve (Muted) */}
            <path
              d={regularPath}
              fill="none"
              stroke="#64748B"
              strokeWidth="2.5"
              strokeDasharray="5 5"
            />

            {/* Direct Plan Curve (Gold Highlight) */}
            <path
              d={directPath}
              fill="none"
              stroke="#BE9A48"
              strokeWidth="3.5"
              filter="drop-shadow(0px 2px 8px rgba(190, 154, 72, 0.4))"
            />

            {/* Data point pins */}
            {chartData.map((d) => {
              const isSelected = d.year === hoveredYear;
              return (
                <g
                  key={d.year}
                  onClick={() => setHoveredYear(d.year)}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={getX(d.year)}
                    cy={getY(d.direct)}
                    r={isSelected ? 6 : 3.5}
                    fill={isSelected ? "#FFF9EB" : "#BE9A48"}
                    stroke="#040915"
                    strokeWidth="2"
                    className="transition-all"
                  />
                  <text
                    x={getX(d.year)}
                    y={svgHeight - 6}
                    textAnchor="middle"
                    fill={isSelected ? "#D8BD80" : "#64748B"}
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    Yr {d.year}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Metric Readout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-sm bg-[#081022] border border-slate-800 text-center font-mono">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              At Year {currentHoverPoint.year}: Direct Fiduciary Corpus
            </span>
            <span className="font-serif text-xl sm:text-2xl text-[#F3ECDB] font-semibold">
              {formatCrores(currentHoverPoint.direct)}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              At Year {currentHoverPoint.year}: Distributor Corpus
            </span>
            <span className="font-serif text-xl sm:text-2xl text-slate-400 font-semibold">
              {formatCrores(currentHoverPoint.regular)}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">
              Net Wealth Retained by Client
            </span>
            <span className="font-serif text-xl sm:text-2xl text-emerald-400 font-semibold">
              +{formatCrores(currentHoverPoint.saved)}
            </span>
          </div>
        </div>

        {/* Tabular Forensics Breakdown */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-400">
            <span>Audited Fee Breakdown Comparison Table</span>
            <span>Tabular Economics (12% Gross CAGR)</span>
          </div>

          <div className="border border-slate-800 rounded-sm overflow-hidden text-xs font-mono">
            <table className="w-full text-left divide-y divide-slate-800">
              <thead className="bg-[#081022] text-slate-400 text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">Compounding Period</th>
                  <th className="py-2.5 px-4">Distributor Regular Plan</th>
                  <th className="py-2.5 px-4 text-[#D8BD80]">Aurum Direct Fiduciary</th>
                  <th className="py-2.5 px-4 text-emerald-400 text-right">Capital Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-[#040915] text-slate-300">
                {[5, 10, 15, 20].map((yr) => {
                  const pt = chartData.find((d) => d.year === yr) || chartData[0];
                  return (
                    <tr
                      key={yr}
                      onClick={() => setHoveredYear(yr)}
                      className={`hover:bg-[#0c1833] cursor-pointer transition-colors ${
                        hoveredYear === yr ? "bg-[#0d1e3f]" : ""
                      }`}
                    >
                      <td className="py-2.5 px-4 font-semibold text-slate-200">Year {yr}</td>
                      <td className="py-2.5 px-4 text-slate-400">{formatCrores(pt.regular)}</td>
                      <td className="py-2.5 px-4 text-[#F3ECDB] font-medium">{formatCrores(pt.direct)}</td>
                      <td className="py-2.5 px-4 text-right text-emerald-400 font-bold">
                        +{formatCrores(pt.saved)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Disclaimers & Action */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800 text-xs">
        <p className="text-[10px] text-slate-500 font-mono max-w-xl">
          Statutory Disclosure: Direct Mutual Fund schemes feature identical underlying portfolios to Regular schemes but carry zero distribution expense ratio pursuant to SEBI circular CIR/IMD/DF/21/2012.
        </p>

        <Link
          href="/rpq"
          className="btn-gold-foil inline-flex items-center justify-center px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-bold shrink-0"
        >
          <span>Initiate Suitability Assessment</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
