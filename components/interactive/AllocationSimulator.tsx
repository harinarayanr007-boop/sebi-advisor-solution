"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShieldCheck, PieChart, Activity, Lock, ArrowRight, Layers } from "lucide-react";
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
        color: "#C5A059",
        description: "Direct Reserve Bank of India G-Secs with zero default risk.",
      },
      {
        label: "High-Quality Corporate Debt",
        pct: 20,
        color: "#886526",
        description: "AAA PSU & Banking debt yielding predictable accrual cashflow.",
      },
      {
        label: "Direct Large-Cap Equities",
        pct: 10,
        color: "#10B981",
        description: "Nifty 50 Direct Index allocation to beat headline inflation.",
      },
      {
        label: "Sovereign Gold Bonds (SGB)",
        pct: 10,
        color: "#DFC68E",
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
        color: "#10B981",
        description: "Unbiased direct equities in resilient industry leaders.",
      },
      {
        label: "Sovereign Debt (Target Maturity)",
        pct: 35,
        color: "#C5A059",
        description: "Locking yield curve spreads without duration speculation.",
      },
      {
        label: "Sovereign Gold Bonds",
        pct: 10,
        color: "#DFC68E",
        description: "Currency depreciation hedge and geopolitical shock absorber.",
      },
      {
        label: "Global Hard-Currency Assets",
        pct: 10,
        color: "#60A5FA",
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
        color: "#10B981",
        description: "Direct multi-cap allocation across high-ROCE compounding engines.",
      },
      {
        label: "Sovereign Debt Cushion",
        pct: 15,
        color: "#C5A059",
        description: "Liquidity reserve to deploy opportunistically during market dislocations.",
      },
      {
        label: "Global Growth & Technology",
        pct: 10,
        color: "#60A5FA",
        description: "Hard-currency innovation leaders and global monopolies.",
      },
      {
        label: "Precious Metals & Gold",
        pct: 10,
        color: "#DFC68E",
        description: "Sovereign Gold Bonds ensuring systemic monetary hedge.",
      },
    ],
  },
};

export default function AllocationSimulator() {
  const [selectedKey, setSelectedKey] = useState("balanced");
  const profile = mandates[selectedKey];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#090F1E] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="space-y-3 mb-8">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C5A059]">
          <Layers className="h-4 w-4" />
          <span>Fiduciary Portfolio Engineering</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-slate-100 font-normal">
          Bespoke Asset Allocation Architecture
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          We do not chase hot sectors or market timing. Every client portfolio is structured according to mathematical risk capacity, multi-asset diversification, and strict rebalancing triggers.
        </p>
      </div>

      <Tabs value={selectedKey} onValueChange={setSelectedKey} className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full h-auto p-1.5 gap-1">
          <TabsTrigger value="conservative">Conservative</TabsTrigger>
          <TabsTrigger value="balanced">Balanced Growth</TabsTrigger>
          <TabsTrigger value="aggressive">Capital Accretion</TabsTrigger>
        </TabsList>

        <div className="mt-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059] block">
                Selected Mandate Architecture
              </span>
              <h4 className="font-serif text-xl text-slate-100 font-medium mt-1">
                {profile.name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">{profile.tagline}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#050B17] border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Target Horizon</span>
                <span className="text-slate-200">{profile.targetHorizon}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#050B17] border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Max Stress Drawdown</span>
                <span className="text-rose-400">{profile.maxSimulatedDrawdown}</span>
              </div>
            </div>
          </div>

          {/* Allocation Stack Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-300 font-medium">
              <span>Target Weight Distribution</span>
              <span className="font-mono text-[#DFC68E]">100% Direct Allocation</span>
            </div>
            <div className="h-6 w-full rounded-lg overflow-hidden flex bg-slate-900 border border-slate-800">
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
                className="p-4 rounded-xl bg-[#050B17] border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-serif text-sm text-slate-200 truncate">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-[#DFC68E] font-bold">
                    {item.pct}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <Activity className="h-4 w-4 text-[#C5A059] shrink-0" />
              <span>
                <strong>Systematic Rebalancing Rule:</strong> {profile.rebalanceFrequency}. Prevents emotional selling during drawdowns and enforces buying at fair value.
              </span>
            </div>
            <Link
              href="/rpq"
              className="shrink-0 text-xs font-mono uppercase text-[#C5A059] hover:text-[#DFC68E] flex items-center"
            >
              <span>Map Your Profile</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
