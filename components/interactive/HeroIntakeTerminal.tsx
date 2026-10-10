"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, AlertCircle, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
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
    custodyNote: "Negative fee-to-corpus drag under SEBI advisory rules",
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
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08)] relative overflow-hidden text-slate-800">
      {/* Top Terminal Status Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-700">
            SEBI Suitability Intake Hurdle
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          BASL-1892 // CeFCoM Live
        </span>
      </div>

      {/* Interactive Capital Tier Matrix */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">
            Investable Liquid Portfolio
          </label>
          <span className="text-xs text-red-600 font-medium">Sample: {currentTier.corpusDisplay}</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-50 border border-slate-200">
          {TIERS.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all relative ${
                  isSelected
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                {tier.shortLabel}
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
            className={`p-3.5 border flex items-center justify-between rounded-2xl transition-all ${
              currentTier.isEligible
                ? "bg-emerald-50/70 border-emerald-200/80 text-emerald-900"
                : "bg-rose-50/70 border-rose-200/80 text-rose-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {currentTier.isEligible ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
              )}
              <div>
                <span className="text-xs uppercase tracking-wide block font-bold">
                  {currentTier.isEligible
                    ? "Hurdle Passed: Qualified for RIA Mandate"
                    : "Spam Wall Active: Minimum ₹50L Required"}
                </span>
                <span className="text-[11px] opacity-80 block text-slate-600">
                  {currentTier.isEligible
                    ? "Fee-Only Fiduciary Portfolio Management available"
                    : "Net worth falls below SEBI fee-only economic viability"}
                </span>
              </div>
            </div>
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                currentTier.isEligible
                  ? "bg-emerald-100/60 text-emerald-800 border-emerald-300"
                  : "bg-rose-100/60 text-rose-800 border-rose-300"
              }`}
            >
              {currentTier.isEligible ? "ELIGIBLE" : "RESTRICTED"}
            </span>
          </div>

          {/* Forensics Ledger Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Distributor Fee Drain */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-rose-600 font-semibold block">
                Bank Distributor Leak
              </span>
              <span className="text-base font-bold text-slate-900 tabular-nums block">
                {currentTier.commissionDrain}
              </span>
              <span className="text-[10px] text-slate-500 block leading-tight">
                Embedded commissions siphoned annually
              </span>
            </div>

            {/* Fiduciary Preservation */}
            <div className="p-3.5 bg-emerald-50/40 border border-emerald-200/60 rounded-2xl space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold block">
                Direct Alpha Preserved
              </span>
              <span className="text-base font-bold text-emerald-700 tabular-nums block">
                {currentTier.fiduciarySavings}
              </span>
              <span className="text-[10px] text-slate-500 block leading-tight">
                Compounded inside client account
              </span>
            </div>
          </div>

          {/* Institutional Specifications */}
          <div className="p-3.5 bg-slate-50/80 border border-slate-200/70 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Statutory Fee Model:</span>
              <span className="font-semibold text-slate-800">{currentTier.fiduciaryRetainer}</span>
            </div>
            <div className="h-px bg-slate-200/60" />
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Assigned Partner:</span>
              <span className="font-semibold text-slate-900">{currentTier.leadPartner}</span>
            </div>
            <div className="h-px bg-slate-200/60" />
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Custody Protocol:</span>
              <span className="text-slate-700 text-right max-w-[210px] truncate">{currentTier.custodyNote}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Button */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={handleProceed}
          className={`w-full py-3.5 px-5 rounded-full text-xs font-semibold tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 shadow-sm ${
            currentTier.isEligible
              ? "btn-primary-pill shadow-md hover:shadow-lg"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
          }`}
        >
          <span>
            {currentTier.isEligible
              ? "Start Suitability Assessment"
              : "Review Alternative Options"}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center space-x-1.5">
            <Lock className="h-3 w-3 text-slate-400" />
            <span>256-Bit Encrypted Confidentiality</span>
          </span>
          <span>Zero Commission Guarantee</span>
        </div>
      </div>
    </div>
  );
}
