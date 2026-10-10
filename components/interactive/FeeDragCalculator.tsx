"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Scale, ArrowRight, ShieldCheck } from "lucide-react";
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
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.06)] relative overflow-hidden text-slate-800">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Scale className="h-3.5 w-3.5 text-slate-900" />
            <span>Quantitative Portfolio Forensics • SEBI Size 10 Verified</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            The Mathematical Toll of Distributor Commissions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Mutual fund distributors and bank wealth desks charge an invisible 1.0% to 1.5% trailer fee deducted daily from fund NAVs. Test any capital allocation below to see how direct fiduciary execution compounds over time.
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Presets:</span>
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
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                portfolioCrores === preset.val
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Slider Area */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-500 block">
              Investable Liquid Surplus
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              ₹{portfolioCrores.toFixed(1)} Crores{" "}
              <span className="text-sm font-semibold text-slate-500 font-normal">
                (₹{Math.round(portfolioCrores * 100)} Lakhs)
              </span>
            </span>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300 text-emerald-800 text-xs font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <span>100% Commission-Free Direct Plans</span>
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-2">
          <Slider
            value={[portfolioCrores]}
            onValueChange={(vals) => setPortfolioCrores(vals[0])}
            min={0.5}
            max={25.0}
            step={0.5}
            className="w-full py-2"
          />
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>₹50 Lakhs (Min. Fiduciary Hurdle)</span>
            <span>₹10 Crores (Established HNI)</span>
            <span>₹25 Crores (Family Office Mandate)</span>
          </div>
        </div>
      </div>

      {/* DUAL-CURVE COMPOUNDING CHART */}
      <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-red-600 inline-block shadow-sm" />
              <span className="text-slate-900 font-semibold">Aurum Direct Fiduciary</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-slate-400 inline-block" />
              <span className="text-slate-500">Distributor Regular Plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-4 rounded bg-emerald-100 border border-emerald-300 inline-block" />
              <span className="text-emerald-700 font-semibold">Cumulative Wealth Preserved</span>
            </div>
          </div>
          <div className="text-slate-500 text-xs">
            Selected Horizon: <strong className="text-slate-900 font-bold">Year {hoveredYear}</strong>
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
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.01" />
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
                  stroke="#E2E8F0"
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
              stroke="#94A3B8"
              strokeWidth="2.5"
              strokeDasharray="5 5"
            />

            {/* Direct Plan Curve (Red Highlight) */}
            <path
              d={directPath}
              fill="none"
              stroke="#DC2626"
              strokeWidth="3.5"
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
                    fill={isSelected ? "#DC2626" : "#EF4444"}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="transition-all"
                  />
                  <text
                    x={getX(d.year)}
                    y={svgHeight - 6}
                    textAnchor="middle"
                    fill={isSelected ? "#0F172A" : "#64748B"}
                    fontSize="11"
                    fontWeight={isSelected ? "bold" : "normal"}
                  >
                    Yr {d.year}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Metric Readout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">
              At Year {currentHoverPoint.year}: Direct Fiduciary
            </span>
            <span className="text-xl sm:text-2xl text-slate-900 font-extrabold">
              {formatCrores(currentHoverPoint.direct)}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">
              At Year {currentHoverPoint.year}: Distributor Plan
            </span>
            <span className="text-xl sm:text-2xl text-slate-500 font-bold">
              {formatCrores(currentHoverPoint.regular)}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-emerald-700 uppercase tracking-wider block font-bold">
              Net Wealth Retained
            </span>
            <span className="text-xl sm:text-2xl text-emerald-600 font-extrabold">
              +{formatCrores(currentHoverPoint.saved)}
            </span>
          </div>
        </div>

        {/* Tabular Forensics Breakdown */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Audited Fee Breakdown Comparison Table</span>
            <span>Tabular Economics (12% Gross CAGR)</span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-600 text-xs font-semibold">
                <tr>
                  <th className="py-3 px-4">Compounding Period</th>
                  <th className="py-3 px-4">Distributor Regular Plan</th>
                  <th className="py-3 px-4 text-slate-900">Aurum Direct Fiduciary</th>
                  <th className="py-3 px-4 text-emerald-700 text-right">Capital Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {[5, 10, 15, 20].map((yr) => {
                  const pt = chartData.find((d) => d.year === yr) || chartData[0];
                  return (
                    <tr
                      key={yr}
                      onClick={() => setHoveredYear(yr)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        hoveredYear === yr ? "bg-red-50/40" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-slate-900">Year {yr}</td>
                      <td className="py-3 px-4 text-slate-500">{formatCrores(pt.regular)}</td>
                      <td className="py-3 px-4 text-slate-900 font-medium">{formatCrores(pt.direct)}</td>
                      <td className="py-3 px-4 text-right text-emerald-600 font-bold">
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
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100 text-xs">
        <p className="text-[11px] text-slate-500 max-w-xl">
          Statutory Disclosure: Direct Mutual Fund schemes feature identical underlying portfolios to Regular schemes but carry zero distribution expense ratio pursuant to SEBI circular CIR/IMD/DF/21/2012.
        </p>

        <Link
          href="/book"
          className="btn-primary-pill inline-flex items-center justify-center px-6 py-3 text-xs font-semibold shrink-0 shadow-md group"
        >
          <span>Book a Portfolio Review</span>
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
