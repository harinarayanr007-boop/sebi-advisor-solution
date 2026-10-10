"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

interface MandateProfile {
  name: string;
  tagline: string;
  targetHorizon: string;
  maxSimulatedDrawdown: string;
  rebalanceFrequency: string;
  allocations: {
    label: string;
    pct: number;
    color: string;
    description: string;
  }[];
}

const mandates: Record<string, MandateProfile> = {
  conservative: {
    name: "Capital Preservation Architecture",
    tagline: "Prioritizes principal protection, high liquidity, and sovereign credit safety.",
    targetHorizon: "1 to 3 Years",
    maxSimulatedDrawdown: "-4.2% (2020 Stress Event)",
    rebalanceFrequency: "Semi-Annual / 5% Deviation Threshold",
    allocations: [
      {
        label: "Sovereign Debt & T-Bills",
        pct: 60,
        color: "#2563EB",
        description: "Direct Reserve Bank of India G-Secs with zero default risk.",
      },
      {
        label: "High-Quality Corporate Debt",
        pct: 20,
        color: "#475569",
        description: "AAA PSU & Banking debt yielding predictable accrual cashflow.",
      },
      {
        label: "Direct Large-Cap Equities",
        pct: 10,
        color: "#16A34A",
        description: "Nifty 50 Direct Index allocation to beat headline inflation.",
      },
      {
        label: "Sovereign Gold Bonds (SGB)",
        pct: 10,
        color: "#D97706",
        description: "2.5% annual sovereign coupon + gold price hedge.",
      },
    ],
  },
  balanced: {
    name: "Balanced Strategic Growth Architecture",
    tagline: "Calibrated multi-asset compounding balancing growth and volatility dampeners.",
    targetHorizon: "3 to 7 Years",
    maxSimulatedDrawdown: "-11.8% (2020 Stress Event)",
    rebalanceFrequency: "Quarterly / 7% Deviation Threshold",
    allocations: [
      {
        label: "Direct Large & Mid-Cap Equity",
        pct: 45,
        color: "#16A34A",
        description: "Unbiased direct equities in resilient industry leaders.",
      },
      {
        label: "Sovereign Debt (Target Maturity)",
        pct: 35,
        color: "#2563EB",
        description: "Locking yield curve spreads without duration speculation.",
      },
      {
        label: "Sovereign Gold Bonds",
        pct: 10,
        color: "#D97706",
        description: "Currency depreciation hedge and geopolitical shock absorber.",
      },
      {
        label: "Global Hard-Currency Assets",
        pct: 10,
        color: "#7C3AED",
        description: "Geographic diversification through US index funds.",
      },
    ],
  },
  aggressive: {
    name: "Capital Accretion & Family Office Legacy",
    tagline: "Long-duration equity bias engineered for multi-decadal purchasing power expansion.",
    targetHorizon: "7+ Years / Intergenerational",
    maxSimulatedDrawdown: "-19.4% (2020 Stress Event)",
    rebalanceFrequency: "Annual / 10% Deviation Threshold",
    allocations: [
      {
        label: "Direct Diversified Equities",
        pct: 65,
        color: "#16A34A",
        description: "Direct multi-cap allocation across high-ROCE compounding engines.",
      },
      {
        label: "Sovereign Debt Cushion",
        pct: 15,
        color: "#2563EB",
        description: "Liquidity reserve to deploy opportunistically during market dislocations.",
      },
      {
        label: "Global Growth & Technology",
        pct: 10,
        color: "#7C3AED",
        description: "Hard-currency innovation leaders and global monopolies.",
      },
      {
        label: "Precious Metals & Gold",
        pct: 10,
        color: "#D97706",
        description: "Sovereign Gold Bonds ensuring systemic monetary hedge.",
      },
    ],
  },
};

export default function AllocationSimulator() {
  const [selectedKey, setSelectedKey] = useState("balanced");
  const profile = mandates[selectedKey];

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.06)] relative overflow-hidden text-slate-800">
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <Layers className="h-3.5 w-3.5 text-slate-900" />
          <span>Fiduciary Portfolio Engineering • Modern Portfolio Theory</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Bespoke Asset Allocation Architecture
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          We do not chase hot sectors or market timing. Every client portfolio is structured according to mathematical risk capacity, multi-asset diversification, and strict rebalancing triggers.
        </p>
      </div>

      <Tabs value={selectedKey} onValueChange={setSelectedKey} className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full h-auto p-1.5 gap-1.5 bg-slate-100 border border-slate-200 rounded-2xl">
          <TabsTrigger
            value="conservative"
            className="py-2.5 rounded-xl font-semibold text-xs data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all"
          >
            Capital Preservation
          </TabsTrigger>
          <TabsTrigger
            value="balanced"
            className="py-2.5 rounded-xl font-semibold text-xs data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all"
          >
            Balanced Growth
          </TabsTrigger>
          <TabsTrigger
            value="aggressive"
            className="py-2.5 rounded-xl font-semibold text-xs data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all"
          >
            Capital Accretion
          </TabsTrigger>
        </TabsList>

        <div className="mt-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block">
                Selected Mandate Architecture
              </span>
              <h4 className="text-xl text-slate-900 font-bold mt-1">
                {profile.name}
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">{profile.tagline}</p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Target Horizon</span>
                <span className="text-slate-900 font-bold">{profile.targetHorizon}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Max Stress Drawdown</span>
                <span className="text-rose-600 font-bold">{profile.maxSimulatedDrawdown}</span>
              </div>
            </div>
          </div>

          {/* Allocation Stack Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-700 font-medium">
              <span>Target Weight Distribution</span>
              <span className="text-slate-900 font-bold">100% Direct Allocation</span>
            </div>
            <div className="h-6 w-full rounded-xl overflow-hidden flex bg-slate-100 border border-slate-200">
              {profile.allocations.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  className="h-full relative group transition-all duration-300"
                  title={`${item.label}: ${item.pct}%`}
                />
              ))}
            </div>
          </div>

          {/* Detailed Itemized Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {profile.allocations.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-slate-900 font-bold truncate">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs text-slate-900 font-extrabold">
                    {item.pct}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-2.5 text-slate-700">
              <Activity className="h-4 w-4 text-slate-900 shrink-0" />
              <span>
                <strong>Systematic Rebalancing Rule:</strong> {profile.rebalanceFrequency}. Enforces objective buying and selling discipline.
              </span>
            </div>
            <Link
              href="/book"
              className="shrink-0 text-xs font-semibold text-[#1e90ff] hover:text-[#0077e6] flex items-center"
            >
              <span>Book Strategy Session</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
