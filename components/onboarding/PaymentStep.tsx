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
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-9 space-y-8 text-slate-800 shadow-sm relative overflow-hidden">
      {/* Loading Overlay simulating BSE/MFU CeFCoM Network */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-6">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-red-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Landmark className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="space-y-3 max-w-md">
            <h3 className="text-xl font-bold text-slate-900">
              Routing through BSE/MFU CeFCoM network...
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-2 text-left">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Validating SEBI RIA Registration: INA000019842</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Querying BASL Clearing Core for PAN matching...</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Generating Statutory BSE Settlement URN...</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Securing settlement transaction into BSE Centralized Escrow. Please do not close or refresh.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-xs text-red-600 uppercase tracking-wider font-bold">
            <Landmark className="h-4 w-4 text-red-600" />
            <span>Statutory Clearance • Step 03</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            BSE / MFU Centralized Escrow Clearing (CeFCoM)
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
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
          <div className="p-6 sm:p-8 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-6 shadow-xs">
            <div className="flex items-center space-x-3 text-emerald-800 pb-4 border-b border-emerald-200">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Advisory Fee Settled via BSE CeFCoM Escrow
                </h3>
                <p className="text-xs text-slate-600">
                  Official statutory clearing confirmed under BASL Supervision
                </p>
              </div>
            </div>

            {/* Official Settlement Dossier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">BSE SETTLEMENT URN</span>
                <span className="text-slate-900 font-bold text-sm block mt-0.5">
                  {payment.cefcomUrn || "BSE-URN-2024-8849201"}
                </span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">TOTAL CLEARANCE</span>
                <span className="text-slate-900 font-bold text-sm block mt-0.5">
                  ₹{payment.amount?.toLocaleString("en-IN") || "1,47,500"}
                </span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">TRANSACTION REF</span>
                <span className="text-slate-700 font-bold text-sm block mt-0.5 truncate">
                  {payment.transactionId || "TXN-CEFCOM-99124"}
                </span>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">BASL STATUS</span>
                <span className="text-emerald-700 font-bold text-sm block mt-0.5">
                  SETTLED IN ESCROW
                </span>
              </div>
            </div>

            {/* Action Forward */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onNext}
                className="btn-primary-pill px-8 py-3.5 text-xs font-semibold flex items-center space-x-2 shadow-md group"
              >
                <span>Finalize Onboarding & Receive Dossier</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Active Payment Interface */
        <div className="space-y-8">
          {/* BSE/MFU CeFCoM Clearing Architecture Schematic */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase text-slate-800 font-bold">
                Official SEBI CeFCoM Escrow Routing Architecture
              </span>
              <span className="text-emerald-700 font-bold">100% REGULATED ESCROW</span>
            </div>

            {/* Routing Flow Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">ORIGIN</span>
                <span className="text-slate-900 font-bold block">Client Verified Bank A/C</span>
                <span className="text-[11px] text-slate-500 block truncate">
                  HDFC / ICICI / Kotak / SBI
                </span>
              </div>

              <div className="p-3.5 bg-white border-2 border-red-500 rounded-xl space-y-1 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-red-600 uppercase font-bold block">CLEARING ESCROW</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="text-slate-900 font-bold block">BSE StAR MF Escrow Hub</span>
                <span className="text-[11px] text-slate-500 block">
                  Governed under BASL Circular 2024/78
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">BENEFICIARY</span>
                <span className="text-slate-900 font-bold block">Aurum Fiduciary Trust A/C</span>
                <span className="text-[11px] text-slate-500 block">
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
                <label className="text-xs uppercase font-semibold text-slate-700 block">
                  Select Statutory Fee Model *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFeeModel("Fixed")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      feeModel === "Fixed"
                        ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold block">
                      Statutory Fixed Retainer
                    </span>
                    <span className="text-lg font-bold block mt-0.5">
                      ₹1,25,000 / annum
                    </span>
                    <span className="text-[11px] opacity-80 block mt-1">
                      Capped at SEBI statutory ceiling for individual HNIs
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFeeModel("AUA")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      feeModel === "AUA"
                        ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold block">
                      Asset-Under-Advice (AUA)
                    </span>
                    <span className="text-lg font-bold block mt-0.5">
                      0.75% / annum
                    </span>
                    <span className="text-[11px] opacity-80 block mt-1">
                      Semi-annual initial retainer deposit: ₹75,000
                    </span>
                  </button>
                </div>
              </div>

              {/* Payment Rail Options */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-semibold text-slate-700 block">
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
                      className={`p-3 text-center rounded-xl border text-xs font-semibold transition-all ${
                        activeRail === rail.id
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {rail.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Rail Details */}
              {activeRail === "netbanking" && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs uppercase text-slate-600 font-bold block">
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
                        className={`p-2.5 text-center rounded-xl border text-xs font-semibold transition-all ${
                          selectedBank === bank.id
                            ? "bg-slate-900 border-slate-900 text-white"
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
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-sans">VIRTUAL ESCROW ACCOUNT:</span>
                    <button
                      type="button"
                      onClick={handleCopyEscrow}
                      className="text-red-600 font-sans font-bold hover:underline flex items-center space-x-1"
                    >
                      <Copy className="h-3 w-3" />
                      <span>{copiedEscrow ? "COPIED" : "COPY"}</span>
                    </button>
                  </div>
                  <div className="text-slate-900 font-bold text-sm">BSE-CEFCOM-992817264819</div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex justify-between text-slate-600">
                    <span className="font-sans">IFSC CODE:</span>
                    <span className="text-slate-900 font-bold">BSEB0000001</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="font-sans">ESCROW BANK:</span>
                    <span className="text-slate-900 font-sans">ICICI Bank Ltd (BSE Clearing Desk)</span>
                  </div>
                </div>
              )}

              {activeRail === "upi" && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <span className="text-slate-600 font-bold block uppercase">
                    NPCI CeFCoM e-Mandate Settlement
                  </span>
                  <input
                    type="text"
                    placeholder="name@okhdfcbank"
                    defaultValue="singhania@okhdfcbank"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-red-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Right: Statutory Tax Invoice Ledger */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs uppercase tracking-wider text-slate-900 font-bold">
                    Statutory Tax Invoice
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">GSTIN: 27AAYFA4912E1Z5</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-700">
                    <span>Base Fiduciary Retainer:</span>
                    <span className="font-semibold text-slate-900">₹{baseAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Central GST (CGST 9%):</span>
                    <span>₹{(gstAmount / 2).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>State GST (SGST 9%):</span>
                    <span>₹{(gstAmount / 2).toLocaleString("en-IN")}</span>
                  </div>

                  <div className="h-px bg-slate-200 pt-1" />

                  <div className="flex justify-between text-slate-900 font-bold text-sm pt-1">
                    <span>Total Authorized Settlement:</span>
                    <span className="text-red-600 font-extrabold">₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handlePayCeFCoM}
                    disabled={loading}
                    className="w-full btn-primary-pill py-3.5 px-4 text-xs font-semibold flex items-center justify-center space-x-2 shadow-md group"
                  >
                    <span>Authorize CeFCoM Settlement</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>BASL Membership: BASL-1892</span>
                <span>Zero Cash Policy Enforced</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center space-x-2 text-rose-700 text-xs font-medium">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Back Navigation */}
          <div className="pt-4 border-t border-slate-200 flex justify-start">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1.5"
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
