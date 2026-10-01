"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Building2,
  Lock,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  FileCheck,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useOnboarding } from "@/context/OnboardingContext";

export default function PaymentStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { rpq, agreement, payment, setPayment } = useOnboarding();

  const [feeModel, setFeeModel] = useState<"Fixed" | "AUA">(payment.feeModel || "Fixed");
  const [selectedBank, setSelectedBank] = useState("hdfc");
  const [activeRail, setActiveRail] = useState<"netbanking" | "rtgs" | "upi">("netbanking");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paidSuccess, setPaidSuccess] = useState(payment.isPaid);
  const [copiedEscrow, setCopiedEscrow] = useState(false);

  const baseAmount = feeModel === "Fixed" ? 125000 : 75000;
  const gstAmount = baseAmount * 0.18;
  const totalAmount = baseAmount + gstAmount;

  const handleCopyEscrow = () => {
    navigator.clipboard.writeText("BSE-CEFCOM-992817264819");
    setCopiedEscrow(true);
    setTimeout(() => setCopiedEscrow(false), 2000);
  };

  const handlePayCeFCoM = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/payment/cefcom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          feeModel,
          clientId: agreement.clientId || "AURUM-HNI-2024-8891",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "CeFCoM payment settlement failed.");
        setLoading(false);
        return;
      }

      setPayment({
        feeModel,
        amount: totalAmount,
        transactionId: data.transactionId,
        isPaid: true,
        paidAt: data.timestamp,
        cefcomUrn: data.urn,
      });

      setPaidSuccess(true);
      setLoading(false);
    } catch {
      setError("Network timeout while routing through BSE/MFU CeFCoM network. Please retry.");
      setLoading(false);
    }
  };

  return (
    <div className="architectural-panel p-6 sm:p-9 space-y-8 text-slate-100 relative overflow-hidden">
      {/* Loading Overlay simulating BSE/MFU CeFCoM Network */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-[#020611]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-4 border-slate-800 border-t-[#BE9A48] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Landmark className="h-8 w-8 text-[#BE9A48]" />
            </div>
          </div>
          <div className="space-y-3 max-w-md">
            <h3 className="font-serif text-xl text-slate-100 font-normal">
              Routing through BSE/MFU CeFCoM network...
            </h3>
            <div className="p-3.5 rounded-sm bg-[#040915] border border-slate-800 text-xs font-mono text-[#D8BD80] space-y-1.5 text-left">
              <div className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Validating SEBI RIA Registration: INA000019842</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Querying BASL Clearing Core for PAN matching...</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Generating Statutory BSE Settlement URN...</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Securing settlement transaction into BSE Centralized Escrow. Please do not close or refresh.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#BE9A48]/20">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-[#D8BD80] uppercase tracking-[0.2em] font-mono">
            <Landmark className="h-3.5 w-3.5 text-[#BE9A48]" />
            <span>Statutory Clearance // Step 03</span>
          </div>
          <h2 className="font-serif text-2xl text-slate-100 font-normal mt-1">
            BSE / MFU Centralized Escrow Clearing (CeFCoM)
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-sm border border-emerald-500/30">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Circular SEBI/HO/MIRSD-PoD-1/P/CIR/2024/78</span>
        </div>
      </div>

      {paidSuccess ? (
        /* Settlement Confirmation Receipt */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 sm:p-8 rounded-sm border border-[#BE9A48]/40 bg-gradient-to-b from-[#09152e] to-[#040915] space-y-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-emerald-400 pb-4 border-b border-slate-800">
              <CheckCircle2 className="h-6 w-6 shrink-0" />
              <div>
                <h3 className="font-serif text-xl text-slate-100 font-medium">
                  Advisory Fee Settled via BSE CeFCoM Escrow
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Official statutory clearing confirmed under BASL Supervision
                </p>
              </div>
            </div>

            {/* Official Settlement Dossier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 bg-[#040915] border border-slate-800 rounded-sm">
                <span className="text-slate-500 text-[10px] block">BSE SETTLEMENT URN</span>
                <span className="text-[#D8BD80] font-bold text-sm block mt-0.5">
                  {payment.cefcomUrn || "BSE-URN-2024-8849201"}
                </span>
              </div>
              <div className="p-3 bg-[#040915] border border-slate-800 rounded-sm">
                <span className="text-slate-500 text-[10px] block">TOTAL CLEARANCE</span>
                <span className="text-slate-100 font-bold text-sm block mt-0.5">
                  ₹{payment.amount?.toLocaleString("en-IN") || "1,47,500"}
                </span>
              </div>
              <div className="p-3 bg-[#040915] border border-slate-800 rounded-sm">
                <span className="text-slate-500 text-[10px] block">TRANSACTION REF</span>
                <span className="text-slate-300 font-bold text-sm block mt-0.5 truncate">
                  {payment.transactionId || "TXN-CEFCOM-99124"}
                </span>
              </div>
              <div className="p-3 bg-[#040915] border border-slate-800 rounded-sm">
                <span className="text-slate-500 text-[10px] block">BASL STATUS</span>
                <span className="text-emerald-400 font-bold text-sm block mt-0.5">
                  SETTLED IN ESCROW
                </span>
              </div>
            </div>

            {/* Action Forward */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onNext}
                className="btn-gold-foil px-8 py-3.5 rounded-sm text-xs uppercase tracking-widest font-bold flex items-center space-x-2"
              >
                <span>Finalize Onboarding & Receive Dossier</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Active Payment Interface */
        <div className="space-y-8">
          {/* BSE/MFU CeFCoM Clearing Architecture Schematic */}
          <div className="p-5 rounded-sm bg-[#040915] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="uppercase text-[#D8BD80] font-semibold">
                Official SEBI CeFCoM Escrow Routing Architecture
              </span>
              <span className="text-emerald-400 font-bold">100% REGULATED ESCROW</span>
            </div>

            {/* Routing Flow Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#081022] border border-slate-800 rounded-sm space-y-1">
                <span className="text-[10px] text-slate-500 block uppercase">ORIGIN</span>
                <span className="text-slate-200 font-bold block">Client Verified Bank A/C</span>
                <span className="text-[10px] text-slate-400 block truncate">
                  HDFC / ICICI / Kotak / SBI
                </span>
              </div>

              <div className="p-3 bg-[#10203d] border border-[#BE9A48]/50 rounded-sm space-y-1 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#D8BD80] uppercase block">CLEARING ESCROW</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-[#F3ECDB] font-bold block">BSE StAR MF Escrow Hub</span>
                <span className="text-[10px] text-slate-400 block">
                  Governed under BASL Circular 2024/78
                </span>
              </div>

              <div className="p-3 bg-[#081022] border border-slate-800 rounded-sm space-y-1">
                <span className="text-[10px] text-slate-500 block uppercase">BENEFICIARY</span>
                <span className="text-slate-200 font-bold block">Aurum Fiduciary Trust A/C</span>
                <span className="text-[10px] text-slate-400 block">
                  SEBI RIA Reg: INA000019842
                </span>
              </div>
            </div>
          </div>

          {/* Model Selector & Tax Invoice Ledger */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Retainer Model Selector & Rails */}
            <div className="lg:col-span-7 space-y-6">
              {/* Fee Model Selector */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate-300 block">
                  Select Statutory Fee Model *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFeeModel("Fixed")}
                    className={`p-4 rounded-sm border text-left transition-all ${
                      feeModel === "Fixed"
                        ? "bg-[#142445] border-[#BE9A48] text-[#F3ECDB]"
                        : "bg-[#040915] border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="font-mono text-[10px] uppercase text-[#D8BD80] block font-semibold">
                      Statutory Fixed Retainer
                    </span>
                    <span className="font-serif text-lg text-slate-100 font-medium block mt-0.5">
                      ₹1,25,000 / annum
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Capped at SEBI statutory ceiling for individual HNIs
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFeeModel("AUA")}
                    className={`p-4 rounded-sm border text-left transition-all ${
                      feeModel === "AUA"
                        ? "bg-[#142445] border-[#BE9A48] text-[#F3ECDB]"
                        : "bg-[#040915] border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="font-mono text-[10px] uppercase text-[#D8BD80] block font-semibold">
                      Asset-Under-Advice (AUA)
                    </span>
                    <span className="font-serif text-lg text-slate-100 font-medium block mt-0.5">
                      0.75% / annum
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Semi-annual initial retainer deposit: ₹75,000
                    </span>
                  </button>
                </div>
              </div>

              {/* Payment Rail Options */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate-300 block">
                  Select Institutional Payment Gateway Rail *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "netbanking", label: "Private NetBanking" },
                    { id: "rtgs", label: "Institutional RTGS" },
                    { id: "upi", label: "NPCI Mandate / UPI" },
                  ].map((rail) => (
                    <button
                      key={rail.id}
                      type="button"
                      onClick={() => setActiveRail(rail.id as any)}
                      className={`p-2.5 text-center rounded-sm border text-xs font-mono transition-all ${
                        activeRail === rail.id
                          ? "bg-[#142445] border-[#BE9A48] text-[#D8BD80] font-semibold"
                          : "bg-[#040915] border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {rail.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Rail Details */}
              {activeRail === "netbanking" && (
                <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 space-y-3">
                  <span className="font-mono text-[10px] uppercase text-slate-400 block">
                    Supported Private Wealth NetBanking Portals
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "hdfc", name: "HDFC Private" },
                      { id: "icici", name: "ICICI Wealth" },
                      { id: "kotak", name: "Kotak Privy" },
                      { id: "sbi", name: "SBI Wealth" },
                    ].map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank.id)}
                        className={`p-2 text-center rounded-sm border text-xs font-mono transition-all ${
                          selectedBank === bank.id
                            ? "bg-[#142445] border-[#BE9A48] text-[#F3ECDB]"
                            : "bg-[#020611] border-slate-800 text-slate-400"
                        }`}
                      >
                        {bank.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeRail === "rtgs" && (
                <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">VIRTUAL ESCROW ACCOUNT:</span>
                    <button
                      type="button"
                      onClick={handleCopyEscrow}
                      className="text-[#D8BD80] hover:underline flex items-center space-x-1"
                    >
                      <Copy className="h-3 w-3" />
                      <span>{copiedEscrow ? "COPIED" : "COPY"}</span>
                    </button>
                  </div>
                  <div className="text-slate-200 font-bold">BSE-CEFCOM-992817264819</div>
                  <div className="hairline-rule" />
                  <div className="flex justify-between text-slate-400">
                    <span>IFSC CODE:</span>
                    <span className="text-slate-200 font-bold">BSEB0000001</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>ESCROW BANK:</span>
                    <span className="text-slate-200">ICICI Bank Ltd (BSE Clearing Desk)</span>
                  </div>
                </div>
              )}

              {activeRail === "upi" && (
                <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 space-y-2 text-xs font-mono">
                  <span className="text-slate-400 block uppercase">
                    NPCI CeFCoM e-Mandate Settlement
                  </span>
                  <input
                    type="text"
                    placeholder="name@okhdfcbank"
                    defaultValue="singhania@okhdfcbank"
                    className="w-full rounded-sm border border-slate-800 bg-[#020611] px-4 py-2.5 text-sm text-slate-100 focus:border-[#BE9A48] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Right: Statutory Tax Invoice Ledger */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-sm bg-[#040915] border border-[#BE9A48]/30 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#D8BD80] font-semibold">
                    Statutory Tax Invoice
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">GSTIN: 27AAYFA4912E1Z5</span>
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Fiduciary Retainer:</span>
                    <span>₹{baseAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Central GST (CGST 9%):</span>
                    <span>₹{(gstAmount / 2).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>State GST (SGST 9%):</span>
                    <span>₹{(gstAmount / 2).toLocaleString("en-IN")}</span>
                  </div>

                  <div className="hairline-rule pt-1" />

                  <div className="flex justify-between text-slate-100 font-bold text-sm pt-1">
                    <span>Total Authorized Settlement:</span>
                    <span className="text-[#D8BD80]">₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handlePayCeFCoM}
                    disabled={loading}
                    className="w-full btn-gold-foil py-4 px-4 rounded-sm text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2"
                  >
                    <span>Authorize CeFCoM Settlement</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
                <span>BASL Membership: BASL-1892</span>
                <span>Zero Cash Policy Enforced</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-sm bg-rose-950/30 border border-rose-500/50 flex items-center space-x-2 text-rose-300 text-xs font-mono">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Back Navigation */}
          <div className="pt-4 border-t border-slate-800 flex justify-start">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2.5 text-xs font-mono uppercase text-slate-400 hover:text-slate-200 flex items-center space-x-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Advisory Indenture</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
