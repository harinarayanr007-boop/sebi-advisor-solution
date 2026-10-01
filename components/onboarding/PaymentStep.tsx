"use client";

import React, { useState } from "react";
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
} from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paidSuccess, setPaidSuccess] = useState(payment.isPaid);

  const amount = feeModel === "Fixed" ? 147500 : 88500; // 1,25,000 + GST or 75,000 + GST

  const handlePayCeFCoM = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/payment/cefcom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          feeModel,
          clientId: agreement.clientId || "AURUM-HNI-DEFAULT",
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
        amount,
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
    <div className="rounded-xl border border-slate-800 bg-[#090F1E] shadow-2xl overflow-hidden animate-fadeIn relative">
      {/* Loading Overlay simulating BSE/MFU CeFCoM Network */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-[#050B17]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-5">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-slate-800 border-t-[#C5A059] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Landmark className="h-6 w-6 text-[#C5A059]" />
            </div>
          </div>
          <div className="space-y-2 max-w-md">
            <h3 className="font-serif text-lg text-slate-100">
              Routing through BSE/MFU CeFCoM network...
            </h3>
            <p className="text-xs text-[#DFC68E] font-mono">
              Validating SEBI RIA Registration (INA000019842) with BASL Clearing Core
            </p>
            <p className="text-[11px] text-slate-400">
              Securing settlement transaction into Centralized Escrow Account. Please do not close or refresh this window.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-800/80 bg-[#050B17] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2 text-[11px] text-[#C5A059] uppercase tracking-widest font-mono">
              <Landmark className="h-3.5 w-3.5" />
              <span>Step 3: Centralized Fee Collection Mechanism</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-slate-100 font-normal mt-1">
              BSE / MFU CeFCoM Clearing & Fee Escrow
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>SEBI Mandated Escrow Active</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {paidSuccess ? (
          /* Payment Settlement Confirmation Receipt */
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle2 className="h-7 w-7 shrink-0" />
                <div>
                  <h3 className="font-serif text-lg text-slate-100 font-medium">
                    CeFCoM Settlement Verified & Escrowed
                  </h3>
                  <p className="text-xs text-emerald-400/90 font-mono">
                    Receipt Generated • BSE Administration & Supervision Ltd (BASL)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-emerald-900/40 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Transaction ID:</span>
                  <span className="font-mono text-[#DFC68E] font-medium">
                    {payment.transactionId || "CEFCOM-BSE-202610-88192731"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Unique Reference Number (URN):</span>
                  <span className="font-mono text-slate-200">
                    {payment.cefcomUrn || "URN-BASL-49182-9912"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Settlement Escrow Account:</span>
                  <span className="text-slate-300">BSE CeFCoM Escrow # 992817264819 (HDFC Bank)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Total Statutory Fee Cleared:</span>
                  <span className="font-serif text-base text-slate-100 font-medium">
                    ₹{amount.toLocaleString("en-IN")} <span className="text-[10px] font-sans text-slate-400">(incl. 18% GST)</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center px-8 py-3.5 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-bold uppercase tracking-wider hover:bg-[#DFC68E] transition-all shadow-lg shadow-[#C5A059]/20"
              >
                <span>View Fiduciary Onboarding Dossier & Booking</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        ) : (
          /* Payment Interface */
          <form onSubmit={handlePayCeFCoM} className="space-y-6">
            {/* Statutory CeFCoM Notice */}
            <div className="p-4 rounded-lg bg-[#050B17] border border-[#C5A059]/30 text-xs space-y-2">
              <div className="text-[#C5A059] font-medium flex items-center space-x-2 uppercase tracking-wider text-[11px] font-mono">
                <Building2 className="h-3.5 w-3.5" />
                <span>Regulatory Mechanism: Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/78</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-justify">
                To guarantee maximum investor protection, SEBI mandates that advisory fees must NEVER be transferred directly to an adviser&apos;s commercial bank account. All fees are routed through the recognized BSE/MFU CeFCoM clearing escrow, ensuring transparent audit trails and non-negotiable compliance.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-start space-x-3">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Fee Model Choice */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-200 block">
                Select Approved Statutory Fee Structure
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    feeModel === "Fixed"
                      ? "border-[#C5A059] bg-[#0A1226]"
                      : "border-slate-800 bg-[#050B17] hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#C5A059] font-mono block">
                        Annual Retainer
                      </span>
                      <div className="font-serif text-xl text-slate-100 mt-1">
                        ₹1,25,000 <span className="text-xs text-slate-400 font-sans">+ 18% GST</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-mono">
                        Total: ₹1,47,500
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="feeModel"
                      checked={feeModel === "Fixed"}
                      onChange={() => setFeeModel("Fixed")}
                      className="mt-1"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Comprehensive annual fiduciary balance-sheet strategy and rebalancing.
                  </p>
                </label>

                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    feeModel === "AUA"
                      ? "border-[#C5A059] bg-[#0A1226]"
                      : "border-slate-800 bg-[#050B17] hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#DFC68E] font-mono block">
                        AUA Model Tranche
                      </span>
                      <div className="font-serif text-xl text-slate-100 mt-1">
                        ₹75,000 <span className="text-xs text-slate-400 font-sans">+ 18% GST</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-mono">
                        Total: ₹88,500
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="feeModel"
                      checked={feeModel === "AUA"}
                      onChange={() => setFeeModel("AUA")}
                      className="mt-1"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Initial advisory onboarding tranche for active multi-asset family office portfolios.
                  </p>
                </label>
              </div>
            </div>

            {/* Institutional Banking Gateway Selector */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-200 block">
                Select CeFCoM Connected Banking Facility
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { id: "hdfc", name: "HDFC Private Banking" },
                  { id: "icici", name: "ICICI Wealth NetBanking" },
                  { id: "sbi", name: "SBI Corporate Internet" },
                  { id: "axis", name: "Axis Burgundy Banking" },
                ].map((bank) => (
                  <button
                    key={bank.id}
                    type="button"
                    onClick={() => setSelectedBank(bank.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedBank === bank.id
                        ? "border-[#C5A059] bg-[#0E1B38] text-slate-100 shadow-sm"
                        : "border-slate-800 bg-[#050B17] text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <Landmark className="h-4 w-4 mb-2 text-[#C5A059]" />
                    <span className="block font-medium text-[11px]">{bank.name}</span>
                    <span className="block text-[10px] text-emerald-400 font-mono mt-1">
                      CeFCoM Verified
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clearing Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
                <span>BSE Administration & Supervision Ltd (BASL)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-[#C5A059]" />
                <span>Mutual Fund Utilities (MFU) CeFCoM</span>
              </div>
              <div className="flex items-center space-x-2 font-mono text-[#DFC68E]">
                <Lock className="h-3 w-3" />
                <span>Direct Escrow Deposit Only</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to Agreement</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-8 py-3.5 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-bold uppercase tracking-wider hover:bg-[#DFC68E] transition-all shadow-lg shadow-[#C5A059]/20"
              >
                <span>Authorize ₹{amount.toLocaleString("en-IN")} via CeFCoM</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
