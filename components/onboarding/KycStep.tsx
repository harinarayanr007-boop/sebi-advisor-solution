"use client";

import React, { useState, useRef } from "react";
import {
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Fingerprint,
  KeyRound,
} from "lucide-react";
import { motion } from "motion/react";
import { useOnboarding } from "@/context/OnboardingContext";

export default function KycStep({ onNext }: { onNext: () => void }) {
  const { rpq, kyc, setKYC } = useOnboarding();

  // 3 segments of 4 digits for Aadhaar
  const [part1, setPart1] = useState("8821");
  const [part2, setPart2] = useState("4490");
  const [part3, setPart3] = useState("1284");

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationStage, setVerificationStage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [verifiedSuccess, setVerifiedSuccess] = useState(kyc.isVerified);

  const fullAadhaar = `${part1}${part2}${part3}`;
  const formattedAadhaar = `${part1} ${part2} ${part3}`;

  const handleSendOtp = () => {
    if (fullAadhaar.length !== 12) {
      setError("Please complete all 12 digits of your Aadhaar number.");
      return;
    }
    setError(null);
    setOtpSent(true);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP received via SMS.");
      return;
    }

    setLoading(true);
    setError(null);

    // Staged animation log for authentic institutional feel
    setVerificationStage("Connecting to UIDAI Auth 2.1 protocol...");
    setTimeout(() => {
      setVerificationStage("Querying CKYCR (Central KYC Records Registry)...");
    }, 700);
    setTimeout(() => {
      setVerificationStage("Validating PAN-Aadhaar cryptographic link...");
    }, 1400);

    try {
      const res = await fetch("/api/kyc/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaarNumber: formattedAadhaar,
          otp,
          fullName: rpq?.fullName,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Aadhaar e-KYC verification failed. Check OTP and retry.");
        setLoading(false);
        setVerificationStage("");
        return;
      }

      setKYC({
        aadhaarNumber: formattedAadhaar,
        otp,
        isVerified: true,
        verifiedAt: new Date().toISOString(),
        cKycNumber: data.data.cKycIdentifier,
        maskedPan: data.data.maskedPan,
        registeredAddress: data.data.registeredAddress,
      });

      setVerifiedSuccess(true);
      setLoading(false);
      setVerificationStage("");
    } catch {
      setError("Network timeout while querying UIDAI CKYC Gateway. Please retry.");
      setLoading(false);
      setVerificationStage("");
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-7 sm:p-11 space-y-9 text-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] relative overflow-hidden font-jakarta">
      {/* Dossier Folder Tab */}
      <div className="absolute top-0 left-8 px-4 py-1.5 rounded-b-xl bg-slate-100/90 border-x border-b border-slate-200 text-[11px] font-mono font-bold tracking-wider text-slate-600 flex items-center gap-1.5 shadow-2xs">
        <span>📁 DOSSIER // UIDAI STATUTORY IDENTITY</span>
      </div>

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 pt-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-sky-800 bg-sky-50 border border-sky-200/90 uppercase">
              <Fingerprint className="h-3.5 w-3.5 text-sky-600" />
              <span>STATUTORY CLEARANCE • STEP 01</span>
            </span>
            <span className="inline-block px-2.5 py-0.5 border border-dashed border-emerald-500 text-emerald-700 font-mono text-[10px] font-bold tracking-wider rounded rotate-1 bg-emerald-50/60">
              SEBI COMPLIANT SPEC
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mt-2">
            UIDAI & CKYC Central Registry Clearance
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time biometric token verification against the Central KYC Records Registry (CKYCR)
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50/80 px-4 py-2 rounded-full border border-emerald-200/90 shrink-0 shadow-2xs">
          <Lock className="h-3.5 w-3.5 text-emerald-600" />
          <span>256-BIT TLS ENCRYPTED</span>
        </div>
      </div>

      {/* Qualified Client Dossier Strip */}
      {rpq && (
        <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono shadow-2xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
              CLIENT DOSSIER
            </span>
            <span className="text-slate-950 font-extrabold text-sm font-jakarta block mt-0.5">
              {rpq.fullName}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
              AUDITED LIQUID NET WORTH
            </span>
            <span className="text-sky-700 font-extrabold text-sm block mt-0.5">
              {rpq.netWorth === "above_10cr"
                ? "₹10+ CRORES (FAMILY OFFICE)"
                : rpq.netWorth === "2cr_to_10cr"
                ? "₹2 CR – ₹10 CR (CORE HNI)"
                : "₹50L – ₹2 CR (EMERGING HNI)"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
              ASSIGNED MANDATE PROFILE
            </span>
            <span className="text-emerald-700 font-extrabold text-sm block mt-0.5">
              {rpq.riskProfile}
            </span>
          </div>
        </div>
      )}

      {/* Verification Success View */}
      {verifiedSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Digital Identity Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 space-y-6 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-emerald-200/80">
              <div className="flex items-center space-x-3.5 text-emerald-800">
                <div className="h-10 w-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    Aadhaar e-KYC & CKYC Verification Successfully Executed
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Statutory identity confirmed against UIDAI Auth 2.1 and Central KYC Registry (CKYCR)
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                VERIFIED // SEBI COMPLIANT ✓
              </span>
            </div>

            {/* Dossier Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 bg-white/90 border border-slate-200/90 rounded-2xl shadow-2xs">
                <span className="text-slate-400 text-[10px] uppercase font-bold block tracking-wider">CKYC IDENTIFIER</span>
                <span className="text-slate-950 font-extrabold text-sm block mt-1">
                  {kyc.cKycNumber || "IN-CKYC-2024-8849201"}
                </span>
              </div>
              <div className="p-4 bg-white/90 border border-slate-200/90 rounded-2xl shadow-2xs">
                <span className="text-slate-400 text-[10px] uppercase font-bold block tracking-wider">VERIFIED PAN</span>
                <span className="text-slate-950 font-extrabold text-sm block mt-1">
                  {kyc.maskedPan || "ABCDE1234F"}
                </span>
              </div>
              <div className="p-4 bg-white/90 border border-slate-200/90 rounded-2xl shadow-2xs">
                <span className="text-slate-400 text-[10px] uppercase font-bold block tracking-wider">AADHAAR SECURE REF</span>
                <span className="text-slate-950 font-extrabold text-sm block mt-1">
                  XXXX-XXXX-1284
                </span>
              </div>
              <div className="p-4 bg-white/90 border border-slate-200/90 rounded-2xl shadow-2xs">
                <span className="text-slate-400 text-[10px] uppercase font-bold block tracking-wider">REGISTRY CLEARANCE</span>
                <span className="text-emerald-700 font-extrabold text-sm block mt-1">
                  UIDAI AUTH 2.1 OK
                </span>
              </div>
            </div>

            {/* Registered Address */}
            <div className="p-4 bg-white/90 border border-slate-200/90 rounded-2xl text-xs space-y-1 shadow-2xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block tracking-wider">
                STATUTORY KYC REGISTERED DOMICILE
              </span>
              <p className="text-slate-800 font-medium leading-relaxed font-jakarta">
                {kyc.registeredAddress ||
                  "Penthouse 42-B, Samudra Mahal, Dr. Annie Besant Road, Worli, Mumbai 400018, Maharashtra, India."}
              </p>
            </div>
          </div>

          {/* Forward Action */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onNext}
              className="px-8 py-4 rounded-full bg-slate-950 text-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-sky-600 transition-all shadow-[0_10px_25px_-5px_rgba(15,23,42,0.25)] flex items-center gap-2 group cursor-pointer"
            >
              <span>PROCEED TO STEP 2: ADVISORY AGREEMENT</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      ) : (
        /* Form View: Aadhaar & OTP Entry */
        <div className="space-y-7">
          {/* UIDAI Sandbox Guidance Banner */}
          <div className="p-4.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex items-start space-x-3.5 text-xs">
            <KeyRound className="h-5 w-5 text-sky-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-slate-900 font-mono text-xs uppercase tracking-wider block font-bold">
                ⚡ UIDAI e-KYC SANDBOX SIMULATION
              </strong>
              <p className="text-slate-600 leading-relaxed font-jakarta">
                To test successful statutory identity clearance, enter any 6-digit passcode (e.g.{" "}
                <span className="font-mono font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">123456</span>). To simulate UIDAI authentication failure, enter{" "}
                <span className="font-mono font-bold text-rose-600 bg-white px-1.5 py-0.5 rounded border border-rose-200">000000</span>.
              </p>
            </div>
          </div>

          {/* 3 Segmented 4-Digit Aadhaar Inputs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase font-bold tracking-wider text-slate-700 block">
                ENTER 12-DIGIT AADHAAR IDENTIFICATION NUMBER *
              </label>
              <span className="text-xs text-slate-400 font-mono">UIDAI / KRA Compliant</span>
            </div>

            <div className="grid grid-cols-3 gap-3.5 max-w-lg">
              <input
                ref={inputRef1}
                type="text"
                maxLength={4}
                value={part1}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setPart1(val);
                  if (val.length === 4) inputRef2.current?.focus();
                }}
                placeholder="8821"
                className="text-center font-mono text-xl sm:text-2xl font-extrabold tracking-widest rounded-2xl border-2 border-slate-200 bg-white py-3.5 text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all shadow-xs"
              />
              <input
                ref={inputRef2}
                type="text"
                maxLength={4}
                value={part2}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setPart2(val);
                  if (val.length === 4) inputRef3.current?.focus();
                }}
                placeholder="4490"
                className="text-center font-mono text-xl sm:text-2xl font-extrabold tracking-widest rounded-2xl border-2 border-slate-200 bg-white py-3.5 text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all shadow-xs"
              />
              <input
                ref={inputRef3}
                type="text"
                maxLength={4}
                value={part3}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setPart3(val);
                }}
                placeholder="1284"
                className="text-center font-mono text-xl sm:text-2xl font-extrabold tracking-widest rounded-2xl border-2 border-slate-200 bg-white py-3.5 text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none transition-all shadow-xs"
              />
            </div>
          </div>

          {/* OTP Generation Trigger */}
          {!otpSent ? (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSendOtp}
                className="px-8 py-4 rounded-full bg-slate-950 text-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-sky-600 transition-all shadow-[0_10px_25px_-5px_rgba(15,23,42,0.25)] flex items-center gap-2 group cursor-pointer"
              >
                <span>GENERATE UIDAI AUTHENTICATION OTP</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            /* OTP Form */
            <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase font-bold tracking-wider text-slate-700 block">
                    ENTER 6-DIGIT ONE-TIME PASSCODE (OTP) *
                  </label>
                  <span className="text-xs text-emerald-700 font-mono font-bold">
                    Dispatched to Registered Mobile
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="w-full sm:w-56 text-center font-mono text-2xl font-extrabold tracking-[0.3em] rounded-2xl border-2 border-slate-300 bg-white py-3.5 text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:outline-none shadow-xs"
                  />
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="px-8 py-4 rounded-full bg-slate-950 text-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-sky-600 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-sky-400" />
                        <span>AUTHENTICATING UIDAI...</span>
                      </>
                    ) : (
                      <>
                        <span>VERIFY & CLEAR CKYC</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Cryptographic Handshake Status */}
              {loading && verificationStage && (
                <div className="p-3.5 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs border border-slate-800 flex items-center space-x-2.5">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-sky-400 shrink-0" />
                  <span>{verificationStage}</span>
                </div>
              )}
            </form>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center space-x-2 text-rose-700 text-xs font-mono font-medium">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
