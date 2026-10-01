"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, AlertCircle, ArrowRight, Check, Landmark, Lock, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HurdleTier {
  id: string;
  label: string;
  shortLabel: string;
  corpusNum: number;
  corpusDisplay: string;
  isEligible: boolean;
  commissionDrain: string;
  fiduciarySavings: string;
  fiduciaryRetainer: string;
  leadPartner: string;
  custodyNote: string;
}

const TIERS: HurdleTier[] = [
  {
    id: "sub_50l",
    label: "Under ₹50 Lakhs",
    shortLabel: "< ₹50L",
    corpusNum: 3500000,
    corpusDisplay: "₹35 Lakhs",
    isEligible: false,
    commissionDrain: "₹43,750 / yr",
    fiduciarySavings: "Ineligible for RIA",
    fiduciaryRetainer: "N/A",
    leadPartner: "Direct Index Re-route",
    custodyNote: "Fee-to-corpus ratio creates negative economic drag under SEBI norms",
  },
  {
    id: "50l_to_2cr",
    label: "₹50L – ₹2 Crores",
    shortLabel: "₹1 Crore",
    corpusNum: 10000000,
    corpusDisplay: "₹1.00 Crore",
    isEligible: true,
    commissionDrain: "₹1,25,000 / yr",
    fiduciarySavings: "+₹24.8 Lakhs over 10 yrs",
    fiduciaryRetainer: "₹1,25,000 / yr flat",
    leadPartner: "Senior Associate Fiduciary",
    custodyNote: "100% Client Demat (Zero POA demanded)",
  },
  {
    id: "2cr_to_10cr",
    label: "₹2 Cr – ₹10 Crores",
    shortLabel: "₹5 Crores",
    corpusNum: 50000000,
    corpusDisplay: "₹5.00 Crores",
    isEligible: true,
    commissionDrain: "₹6,25,000 / yr",
    fiduciarySavings: "+₹1.24 Crores over 10 yrs",
    fiduciaryRetainer: "0.75% / yr CeFCoM escrow",
    leadPartner: "Rajesh V. Mehta (Principal Officer)",
    custodyNote: "Direct institutional clearing via BSE StAR MF",
  },
  {
    id: "10cr_plus",
    label: "₹10 Crores + (Family Office)",
    shortLabel: "₹15 Crores",
    corpusNum: 150000000,
    corpusDisplay: "₹15.00 Crores",
    isEligible: true,
    commissionDrain: "₹18,75,000 / yr",
    fiduciarySavings: "+₹3.72 Crores over 10 yrs",
    fiduciaryRetainer: "Dedicated Investment Committee",
    leadPartner: "Investment Committee & Tax Counsel",
    custodyNote: "Multi-entity private trust & HUF segregation",
  },
];

export default function HeroIntakeTerminal() {
  const [selectedTierId, setSelectedTierId] = useState<string>("2cr_to_10cr");
  const router = useRouter();

  const currentTier = TIERS.find((t) => t.id === selectedTierId) || TIERS[2];

  const handleProceed = () => {
    if (!currentTier.isEligible) {
      router.push("/not-qualified");
    } else {
      router.push(`/rpq?tier=${currentTier.id}`);
    }
  };

  return (
    <div className="architectural-panel p-6 sm:p-7 relative overflow-hidden text-slate-100">
      {/* Top Terminal Status Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#BE9A48]/20">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D8BD80] font-semibold">
            SEBI Reg. 16 Intake Hurdle Console
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-400 tracking-wider">
          BASL-1892 // CeFCoM Live
        </span>
      </div>

      {/* Interactive Capital Tier Matrix */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            Select Liquid Investable Net Worth
          </label>
          <span className="text-[10px] text-[#BE9A48] font-mono">Simulated Case: {currentTier.corpusDisplay}</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 p-1 rounded-sm bg-[#040915] border border-slate-800">
          {TIERS.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className={`py-2 px-1 text-center rounded-sm font-mono text-[11px] transition-all relative ${
                  isSelected
                    ? "bg-[#142445] text-[#F3ECDB] font-semibold border border-[#BE9A48]/50 shadow-inner"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#081022]"
                }`}
              >
                {tier.shortLabel}
                {isSelected && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 border border-[#BE9A48] rounded-sm pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Terminal Data Ledger */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTier.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="mt-5 space-y-3.5"
        >
          {/* Clearance Status Banner */}
          <div
            className={`p-3.5 border flex items-center justify-between rounded-sm ${
              currentTier.isEligible
                ? "bg-[#061426] border-emerald-500/30 text-emerald-300"
                : "bg-[#1f0f14] border-rose-500/30 text-rose-300"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {currentTier.isEligible ? (
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
              )}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider block font-semibold">
                  {currentTier.isEligible
                    ? "Statutory Hurdle Passed: Fiduciary Clearance Active"
                    : "Sub-Hurdle: Filtered By Spam Wall"}
                </span>
                <span className="text-[11px] opacity-80 block">
                  {currentTier.isEligible
                    ? "Qualified for SEBI Fee-Only Direct RIA Mandate"
                    : "Net worth below ₹50 Lakh minimum threshold"}
                </span>
              </div>
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border border-current">
              {currentTier.isEligible ? "ELIGIBLE" : "RESTRICTED"}
            </span>
          </div>

          {/* Forensics Ledger Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Distributor Fee Drain */}
            <div className="p-3 bg-[#040915] border border-slate-800/90 rounded-sm space-y-1">
              <span className="text-[9px] font-mono uppercase tracking-wider text-rose-400/90 block">
                Distributor Trail Leak
              </span>
              <span className="font-mono text-base font-semibold text-rose-300 tabular-nums block">
                {currentTier.commissionDrain}
              </span>
              <span className="text-[10px] text-slate-500 block leading-tight">
                Siphoned via AMC Regular Plan NAV
              </span>
            </div>

            {/* Fiduciary Preservation */}
            <div className="p-3 bg-[#040915] border border-[#BE9A48]/30 rounded-sm space-y-1">
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#D8BD80] block">
                Wealth Preserved (Direct)
              </span>
              <span className="font-mono text-base font-semibold text-emerald-400 tabular-nums block">
                {currentTier.fiduciarySavings}
              </span>
              <span className="text-[10px] text-slate-400 block leading-tight">
                Kept in compounding corpus
              </span>
            </div>
          </div>

          {/* Institutional Specifications */}
          <div className="p-3 bg-[#040915] border border-slate-800/80 rounded-sm space-y-2 text-xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Statutory Fee Model:</span>
              <span className="font-mono text-slate-200 font-medium">{currentTier.fiduciaryRetainer}</span>
            </div>
            <div className="hairline-rule" />
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Assigned Oversight:</span>
              <span className="text-[#D8BD80] font-medium">{currentTier.leadPartner}</span>
            </div>
            <div className="hairline-rule" />
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Custody Protocol:</span>
              <span className="text-slate-300 text-right max-w-[200px] truncate">{currentTier.custodyNote}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Button */}
      <div className="mt-5 pt-4 border-t border-slate-800/80">
        <button
          type="button"
          onClick={handleProceed}
          className={`w-full py-3.5 px-4 rounded-sm text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 transition-all duration-200 ${
            currentTier.isEligible
              ? "btn-gold-foil shadow-lg"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
          }`}
        >
          <span>
            {currentTier.isEligible
              ? "Enter Statutory Suitability Dossier"
              : "View Direct Indexing Guidelines"}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span className="flex items-center space-x-1">
            <Lock className="h-3 w-3 text-[#BE9A48]" />
            <span>256-Bit Encrypted</span>
          </span>
          <span>Zero Spam Policy • Zero Cold Calling</span>
        </div>
      </div>
    </div>
  );
}
