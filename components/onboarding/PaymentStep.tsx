"use client";

import React, { useState } from "react";
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Copy,
  CreditCard,
  Building2,
  QrCode,
  Lock,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useOnboarding } from "@/context/OnboardingContext";

export default function PaymentStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { agreement, payment, setPayment } = useOnboarding();

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
    <div className="space-y-3">
      {/* Dossier Header Tab */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center space-x-2 bg-amber-100/90 text-amber-900 border border-amber-300/80 px-3.5 py-1.5 rounded-t-xl text-[11px] font-space font-bold uppercase tracking-wider -mb-px shadow-xs">
          <span>📁 ESCROW SETTLEMENT // BSE CeFCoM CLEARING</span>
          <span className="text-[9px] bg-amber-200/80 px-1.5 py-0.5 rounded font-mono">SEBI MANDATORY</span>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-[10px] font-space text-slate-500 uppercase tracking-widest">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>BASL CLEARING PROTOCOL 2024/78</span>
        </div>
      </div>

      {/* Main Luxury Card Container */}
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8 text-slate-800">
        {/* Subtle corner aura */}
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-32 h-32 bg-gradient-to-br from-emerald-400/10 via-cyan-400/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Loading Overlay simulating BSE/MFU CeFCoM Network */}
        {loading && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-slate-700 border-t-cyan-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Landmark className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <div className="space-y-3 max-w-md">
              <h3 className="text-xl font-jakarta font-extrabold text-white">
                Routing through BSE/MFU CeFCoM Network...
              </h3>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-space text-slate-300 space-y-2 text-left">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Validating SEBI RIA Registration: INA000019842</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Querying BASL Clearing Core for PAN matching...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Generating Statutory BSE Settlement URN...</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-space">
                Securing settlement transaction into BSE Centralized Escrow. Please do not close or refresh.
              </p>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2 text-xs text-cyan-600 uppercase tracking-wider font-space font-bold">
              <Landmark className="h-4 w-4 text-cyan-600" />
              <span>STAGE 03 // STATUTORY CLEARANCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-jakarta font-extrabold tracking-tight text-slate-950 mt-1">
              BSE / MFU Centralized Escrow Settlement
            </h2>
            <p className="text-xs text-slate-500 font-space mt-1">
              Statutory clearing under Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/78
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-space font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto shadow-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>100% Regulated Escrow</span>
          </div>
        </div>

        {paidSuccess ? (
          /* Settlement Confirmation Receipt */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 sm:p-9 rounded-[24px] border-2 border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50/80 via-emerald-50/40 to-white space-y-6 shadow-sm">
              <div className="flex items-start sm:items-center space-x-3 text-emerald-800 pb-4 border-b border-emerald-200/80">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200 shadow-xs">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-jakarta font-extrabold text-slate-950">
                    Advisory Retainer Settled via BSE CeFCoM Escrow
                  </h3>
                  <p className="text-xs text-slate-600 font-space">
                    Official statutory clearing confirmed under BASL Supervision
                  </p>
                </div>
              </div>

              {/* Official Settlement Dossier Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-space">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">BSE SETTLEMENT URN</span>
                  <span className="text-slate-950 font-bold text-sm block mt-1 font-mono">
                    {payment.cefcomUrn || "BSE-URN-2024-8849201"}
                  </span>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">TOTAL CLEARANCE</span>
                  <span className="text-slate-950 font-bold text-sm block mt-1 font-mono">
                    ₹{payment.amount?.toLocaleString("en-IN") || "1,47,500"}
                  </span>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">TRANSACTION REF</span>
                  <span className="text-slate-700 font-bold text-sm block mt-1 truncate font-mono">
                    {payment.transactionId || "TXN-CEFCOM-99124"}
                  </span>
                </div>
                <div className="p-4 bg-white border border-emerald-200 rounded-2xl shadow-2xs bg-emerald-50/30">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">BASL STATUS</span>
                  <span className="text-emerald-700 font-bold text-sm block mt-1">
                    SETTLED IN ESCROW ✓
                  </span>
                </div>
              </div>

              {/* Action Forward */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={onNext}
                  className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white font-space font-semibold px-8 py-4 rounded-full text-xs shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center space-x-2 group"
                >
                  <span>Finalize Onboarding & Receive Mandate Dossier</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Active Payment Interface */
          <div className="space-y-8">
            {/* BSE/MFU CeFCoM Clearing Architecture Schematic */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs font-space">
                <span className="uppercase text-slate-300 font-bold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  Statutory CeFCoM Escrow Routing Architecture
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-700/60">
                  100% REGULATED ESCROW
                </span>
              </div>

              {/* Routing Flow Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-space">
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1.5">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">01 // ORIGIN</span>
                  <span className="text-white font-bold block text-sm">Client Verified Bank A/C</span>
                  <span className="text-[11px] text-slate-400 block truncate">
                    HDFC / ICICI / Kotak / SBI Demat Linked
                  </span>
                </div>

                <div className="p-4 bg-slate-900/90 border-2 border-cyan-500 rounded-xl space-y-1.5 relative shadow-lg shadow-cyan-500/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-cyan-400 uppercase font-bold block">02 // CLEARING ESCROW</span>
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <span className="text-white font-bold block text-sm">BSE StAR MF Escrow Hub</span>
                  <span className="text-[11px] text-slate-400 block">
                    Governed under BASL Circular 2024/78
                  </span>
                </div>

                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1.5">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">03 // BENEFICIARY</span>
                  <span className="text-white font-bold block text-sm">Aurum Fiduciary Trust A/C</span>
                  <span className="text-[11px] text-slate-400 block">
                    SEBI RIA Reg: INA000019842 • BASL-1892
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
                  <label className="text-xs uppercase font-space font-semibold text-slate-700 block">
                    Select Statutory Fee Model *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFeeModel("Fixed")}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all ${
                        feeModel === "Fixed"
                          ? "bg-slate-950 border-slate-950 text-white shadow-xl ring-2 ring-cyan-500/30"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-[10px] uppercase font-space font-bold block opacity-75">
                        Statutory Fixed Retainer
                      </span>
                      <span className="text-xl font-jakarta font-extrabold block mt-1">
                        ₹1,25,000 / yr
                      </span>
                      <span className="text-[11px] font-space opacity-80 block mt-1.5 leading-snug">
                        Capped at SEBI statutory ceiling for individual HNIs
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFeeModel("AUA")}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all ${
                        feeModel === "AUA"
                          ? "bg-slate-950 border-slate-950 text-white shadow-xl ring-2 ring-cyan-500/30"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-[10px] uppercase font-space font-bold block opacity-75">
                        Asset-Under-Advice (AUA)
                      </span>
                      <span className="text-xl font-jakarta font-extrabold block mt-1">
                        0.75% / yr
                      </span>
                      <span className="text-[11px] font-space opacity-80 block mt-1.5 leading-snug">
                        Semi-annual initial retainer deposit: ₹75,000
                      </span>
                    </button>
                  </div>
                </div>

                {/* Payment Rail Options */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-space font-semibold text-slate-700 block">
                    Select Institutional Payment Gateway Rail *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "netbanking", label: "Private NetBanking", icon: Building2 },
                      { id: "rtgs", label: "Institutional RTGS", icon: CreditCard },
                      { id: "upi", label: "NPCI Mandate / UPI", icon: QrCode },
                    ].map((rail) => {
                      const Icon = rail.icon;
                      return (
                        <button
                          key={rail.id}
                          type="button"
                          onClick={() => setActiveRail(rail.id as any)}
                          className={`p-3 text-center rounded-xl border text-xs font-space font-semibold transition-all flex flex-col items-center justify-center gap-1.5 ${
                            activeRail === rail.id
                              ? "bg-slate-950 border-slate-950 text-white shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{rail.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Rail Details */}
                {activeRail === "netbanking" && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-xs uppercase font-space text-slate-600 font-bold block">
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
                          className={`p-3 text-center rounded-xl border text-xs font-space font-semibold transition-all ${
                            selectedBank === bank.id
                              ? "bg-slate-950 border-slate-950 text-white shadow-xs"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {bank.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeRail === "rtgs" && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs font-space">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase font-bold text-[10px]">VIRTUAL ESCROW ACCOUNT:</span>
                      <button
                        type="button"
                        onClick={handleCopyEscrow}
                        className="text-cyan-700 font-bold hover:underline flex items-center space-x-1"
                      >
                        <Copy className="h-3 w-3" />
                        <span>{copiedEscrow ? "COPIED" : "COPY DETAILS"}</span>
                      </button>
                    </div>
                    <div className="text-slate-950 font-bold text-base font-mono">BSE-CEFCOM-992817264819</div>
                    <div className="h-px bg-slate-200" />
                    <div className="flex justify-between text-slate-600">
                      <span>IFSC CODE:</span>
                      <span className="text-slate-950 font-bold font-mono">BSEB0000001</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>ESCROW BANK:</span>
                      <span className="text-slate-950 font-semibold">ICICI Bank Ltd (BSE Clearing Desk)</span>
                    </div>
                  </div>
                )}

                {activeRail === "upi" && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs font-space">
                    <span className="text-slate-700 font-bold block uppercase">
                      NPCI CeFCoM e-Mandate Settlement
                    </span>
                    <input
                      type="text"
                      placeholder="name@okhdfcbank"
                      defaultValue="singhania@okhdfcbank"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-space text-slate-950 focus:border-slate-900 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500 block">
                      A recurring SEBI-compliant authorization request will be sent to your UPI client.
                    </span>
                  </div>
                )}
              </div>

              {/* Right: Statutory Tax Invoice Ledger */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs uppercase tracking-wider text-slate-950 font-space font-bold">
                      Statutory Tax Invoice
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">GSTIN: 27AAYFA4912E1Z5</span>
                  </div>

                  <div className="space-y-3 text-xs font-space">
                    <div className="flex justify-between text-slate-700">
                      <span>Base Fiduciary Retainer:</span>
                      <span className="font-semibold text-slate-950 font-mono">₹{baseAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Central GST (CGST 9%):</span>
                      <span className="font-mono">₹{(gstAmount / 2).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>State GST (SGST 9%):</span>
                      <span className="font-mono">₹{(gstAmount / 2).toLocaleString("en-IN")}</span>
                    </div>

                    <div className="h-px bg-slate-200 pt-1" />

                    <div className="flex justify-between items-baseline text-slate-950 pt-1">
                      <span className="font-bold text-xs uppercase">Total Authorized Settlement:</span>
                      <span className="text-slate-950 font-jakarta font-extrabold text-xl font-mono">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handlePayCeFCoM}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white font-space font-semibold py-4 px-6 rounded-full text-xs shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 group"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Authorize CeFCoM Settlement</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-space text-slate-400 px-1">
                  <span>BASL Registration: BASL-1892</span>
                  <span>Zero Cash Policy Enforced</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center space-x-2 text-rose-700 text-xs font-medium font-space">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Back Navigation */}
            <div className="pt-4 border-t border-slate-200 flex justify-start">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2.5 text-xs font-space font-semibold text-slate-600 hover:text-slate-950 flex items-center space-x-1.5 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Advisory Indenture</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
