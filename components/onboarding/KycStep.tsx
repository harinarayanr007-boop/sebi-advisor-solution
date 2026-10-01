"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Fingerprint,
  Building,
} from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

export default function KycStep({ onNext }: { onNext: () => void }) {
  const { rpq, kyc, setKYC } = useOnboarding();

  const [aadhaar, setAadhaar] = useState(kyc.aadhaarNumber || "8821 4490 1284");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedSuccess, setVerifiedSuccess] = useState(kyc.isVerified);

  // Format Aadhaar with spaces
  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 12);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setAadhaar(formatted);
  };

  const handleSendOtp = () => {
    const raw = aadhaar.replace(/\D/g, "");
    if (raw.length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    setError(null);
    setOtpSent(true);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/kyc/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaarNumber: aadhaar,
          otp,
          fullName: rpq?.fullName,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Aadhaar e-KYC verification failed. Please try again.");
        setLoading(false);
        return;
      }

      setKYC({
        aadhaarNumber: aadhaar,
        otp,
        isVerified: true,
        verifiedAt: new Date().toISOString(),
        cKycNumber: data.data.cKycIdentifier,
        maskedPan: data.data.maskedPan,
        registeredAddress: data.data.registeredAddress,
      });

      setVerifiedSuccess(true);
      setLoading(false);
    } catch {
      setError("Network error while connecting to UIDAI CKYC Gateway. Please retry.");
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#090F1E] shadow-2xl overflow-hidden animate-fadeIn">
      {/* Step Header */}
      <div className="border-b border-slate-800/80 bg-[#050B17] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2 text-[11px] text-[#C5A059] uppercase tracking-widest font-mono">
              <Fingerprint className="h-3.5 w-3.5" />
              <span>Step 1: Statutory e-KYC & Identity Verification</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-slate-100 font-normal mt-1">
              UIDAI / CKYC Central Registry Verification
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Lock className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>256-Bit Encrypted Channel</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Qualified Lead Summary Strip */}
        {rpq && (
          <div className="p-4 rounded-lg bg-[#0A1226] border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Fiduciary Client</span>
              <span className="text-slate-100 font-medium text-sm">{rpq.fullName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Assessed Net Worth</span>
              <span className="text-[#DFC68E] font-medium uppercase font-mono">
                {rpq.netWorth.replace(/_/g, " ").toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Assigned Fiduciary Mandate</span>
              <span className="text-emerald-400 font-medium">{rpq.riskTier}</span>
            </div>
          </div>
        )}

        {/* Verification Success View */}
        {verifiedSuccess ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle2 className="h-6 w-6 shrink-0" />
                <div>
                  <h3 className="font-serif text-lg text-slate-100 font-medium">
                    Aadhaar e-KYC & CKYC Verification Complete
                  </h3>
                  <p className="text-xs text-emerald-400/90 font-mono">
                    UIDAI Authenticated • SEBI KRA Record Synchronized
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-emerald-900/40 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">CKYC Registry Number:</span>
                  <span className="font-mono text-slate-200">{kyc.cKycNumber || "IN-CKYC-2026-9812481"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Masked PAN Identifier:</span>
                  <span className="font-mono text-slate-200">{kyc.maskedPan || "AAACB8841K"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Masked Aadhaar:</span>
                  <span className="font-mono text-slate-200">XXXX-XXXX-{aadhaar.slice(-4) || "1284"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Registered Legal Domicile:</span>
                  <span className="text-slate-200">{kyc.registeredAddress || "Worli Sea Face, Mumbai 400018"}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center px-8 py-3.5 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-bold uppercase tracking-wider hover:bg-[#DFC68E] transition-all shadow-lg shadow-[#C5A059]/20"
              >
                <span>Proceed to SEBI Advisory Agreement</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        ) : (
          /* Verification Form */
          <div className="space-y-6">
            {/* Simulation Guidance Callout */}
            <div className="p-4 rounded-lg bg-[#050B17] border border-[#C5A059]/30 text-xs space-y-1.5">
              <div className="text-[#C5A059] font-medium flex items-center space-x-1.5 uppercase tracking-wider text-[10px] font-mono">
                <Building className="h-3 w-3" />
                <span>Fintech Integration Simulator (UIDAI Sandbox)</span>
              </div>
              <p className="text-slate-400">
                To test successful KYC, enter any 6-digit passcode (e.g. <strong className="text-slate-200">123456</strong>). To test UIDAI authentication failure, enter <strong className="text-rose-400 font-mono">000000</strong>.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-start space-x-3">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <div>
                  <strong className="block text-rose-200 font-medium">Authentication Error:</strong>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <div className="space-y-5 max-w-lg">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Enter 12-Digit Aadhaar Number</span>
                  <span className="text-[10px] text-slate-500 font-mono">UIDAI Formatted</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={aadhaar}
                    onChange={handleAadhaarChange}
                    placeholder="8821 4490 1284"
                    disabled={otpSent}
                    className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-3 text-sm font-mono tracking-widest text-slate-100 placeholder-slate-600 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] disabled:opacity-60"
                  />
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="absolute right-2 top-2 px-3 py-1.5 rounded bg-[#C5A059] text-[#050B17] text-xs font-semibold uppercase hover:bg-[#DFC68E] transition-colors"
                    >
                      Generate OTP
                    </button>
                  )}
                </div>
              </div>

              {otpSent && (
                <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fadeIn">
                  <div className="p-3 rounded bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-400 flex items-center justify-between">
                    <span>OTP sent to Aadhaar linked mobile (••••••{rpq?.phone?.slice(-4) || "1234"})</span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[11px] underline text-slate-400 hover:text-white"
                    >
                      Change Number
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">
                      Enter 6-Digit UIDAI Security Passcode (OTP)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="e.g. 123456"
                      autoFocus
                      className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-3 text-lg font-mono tracking-widest text-center text-[#DFC68E] placeholder-slate-600 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-bold uppercase tracking-wider hover:bg-[#DFC68E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#C5A059]/10"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Validating with UIDAI CKYC Gateway (2s)...
                      </span>
                    ) : (
                      <span>Verify & Authenticate e-KYC</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
