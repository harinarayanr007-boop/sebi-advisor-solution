"use client";

import React, { useState, useRef } from "react";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Fingerprint,
  Building,
  KeyRound,
  FileCheck,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
    <div className="architectural-panel p-6 sm:p-9 space-y-8 text-slate-100 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#BE9A48]/20">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-[#D8BD80] uppercase tracking-[0.2em] font-mono">
            <Fingerprint className="h-3.5 w-3.5 text-[#BE9A48]" />
            <span>Statutory Clearance // Step 01</span>
          </div>
          <h2 className="font-serif text-2xl text-slate-100 font-normal mt-1">
            UIDAI & CKYC Central Registry Clearance
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-sm border border-emerald-500/30">
          <Lock className="h-3.5 w-3.5 text-emerald-400" />
          <span>256-Bit TLS Bank-Grade Channel</span>
        </div>
      </div>

      {/* Qualified Client Dossier Strip */}
      {rpq && (
        <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[9px] uppercase tracking-wider">
              CLIENT DOSSIER
            </span>
            <span className="text-slate-200 font-semibold text-sm font-sans">{rpq.fullName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[9px] uppercase tracking-wider">
              AUDITED LIQUID NET WORTH
            </span>
            <span className="text-[#D8BD80] font-semibold">
              {rpq.netWorth === "above_10cr"
                ? "₹10+ CRORES (FAMILY OFFICE)"
                : rpq.netWorth === "2cr_to_10cr"
                ? "₹2 CR – ₹10 CR (CORE HNI)"
                : "₹50L – ₹2 CR (EMERGING HNI)"}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[9px] uppercase tracking-wider">
              ASSIGNED MANDATE PROFILE
            </span>
            <span className="text-emerald-400 font-semibold">{rpq.riskProfile}</span>
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
          {/* Holographic Digital Identity Card */}
          <div className="p-6 sm:p-7 rounded-sm border border-[#BE9A48]/50 bg-gradient-to-br from-[#0c1833] via-[#050B17] to-[#040915] space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#BE9A48]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle2 className="h-6 w-6 shrink-0" />
                <div>
                  <h3 className="font-serif text-lg text-slate-100 font-medium">
                    Aadhaar e-KYC & CKYC Verification Successfully Executed
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Identity verified against UIDAI and Central KYC Registry (CKYCR)
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                VERIFIED // SEBI COMPLIANT
              </span>
            </div>

            {/* Dossier Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 bg-[#040915] border border-slate-800/80 rounded-sm">
                <span className="text-slate-500 text-[10px] block">CKYC IDENTIFIER</span>
                <span className="text-[#D8BD80] font-bold text-sm block mt-0.5">
                  {kyc.cKycNumber || "IN-CKYC-2024-8849201"}
                </span>
              </div>
              <div className="p-3 bg-[#040915] border border-slate-800/80 rounded-sm">
                <span className="text-slate-500 text-[10px] block">VERIFIED PAN</span>
                <span className="text-slate-200 font-bold text-sm block mt-0.5">
                  {kyc.maskedPan || "ABCDE1234F"}
                </span>
              </div>
              <div className="p-3 bg-[#040915] border border-slate-800/80 rounded-sm">
                <span className="text-slate-500 text-[10px] block">AADHAAR SECURE REF</span>
                <span className="text-slate-200 font-bold text-sm block mt-0.5">
                  XXXX-XXXX-1284
                </span>
              </div>
              <div className="p-3 bg-[#040915] border border-slate-800/80 rounded-sm">
                <span className="text-slate-500 text-[10px] block">REGISTRY CLEARANCE</span>
                <span className="text-emerald-400 font-bold text-sm block mt-0.5">
                  UIDAI AUTH 2.1 OK
                </span>
              </div>
            </div>

            {/* Registered Address */}
            <div className="p-3.5 bg-[#040915] border border-slate-800/80 rounded-sm text-xs space-y-1">
              <span className="font-mono text-[10px] uppercase text-slate-500 block">
                Statutory KYC Registered Domicile
              </span>
              <p className="text-slate-300">
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
              className="btn-gold-foil px-8 py-3.5 rounded-sm text-xs uppercase tracking-widest font-bold flex items-center space-x-2"
            >
              <span>Proceed to Step 2: Advisory Agreement</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        /* Form View: Aadhaar & OTP Entry */
        <div className="space-y-6">
          {/* UIDAI Sandbox Guidance Banner */}
          <div className="p-4 rounded-sm bg-[#061426] border border-[#BE9A48]/30 flex items-start space-x-3 text-xs">
            <KeyRound className="h-5 w-5 text-[#BE9A48] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-[#F3ECDB] font-mono uppercase tracking-wider block">
                UIDAI e-KYC Sandbox Simulation
              </strong>
              <p className="text-slate-300 leading-relaxed">
                To test successful statutory identity clearance, enter any 6-digit passcode (e.g.{" "}
                <span className="font-mono font-bold text-[#D8BD80]">123456</span>). To simulate UIDAI authentication failure, enter{" "}
                <span className="font-mono font-bold text-rose-400">000000</span>.
              </p>
            </div>
          </div>

          {/* 3 Segmented 4-Digit Aadhaar Inputs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] uppercase tracking-wider text-slate-300 block">
                Enter 12-Digit Aadhaar Identification Number *
              </label>
              <span className="font-mono text-[10px] text-slate-500">UIDAI / KRA Compliant</span>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md">
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
                className="text-center font-mono text-lg tracking-widest rounded-sm border border-slate-800 bg-[#040915] py-3 text-slate-100 focus:border-[#BE9A48] focus:outline-none"
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
                className="text-center font-mono text-lg tracking-widest rounded-sm border border-slate-800 bg-[#040915] py-3 text-slate-100 focus:border-[#BE9A48] focus:outline-none"
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
                className="text-center font-mono text-lg tracking-widest rounded-sm border border-slate-800 bg-[#040915] py-3 text-slate-100 focus:border-[#BE9A48] focus:outline-none"
              />
            </div>
          </div>

          {/* OTP Generation Trigger */}
          {!otpSent ? (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSendOtp}
                className="btn-gold-foil px-8 py-3.5 rounded-sm text-xs uppercase tracking-widest font-bold flex items-center space-x-2"
              >
                <span>Generate UIDAI Authentication OTP</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            /* OTP Form */
            <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#D8BD80] block">
                    Enter 6-Digit One-Time Password (OTP) *
                  </label>
                  <span className="font-mono text-[10px] text-emerald-400">
                    Dispatched to Aadhaar Mobile
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="w-48 text-center font-mono text-xl tracking-[0.3em] rounded-sm border border-[#BE9A48] bg-[#040915] py-3 text-slate-100 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="btn-gold-foil px-8 py-3 rounded-sm text-xs uppercase tracking-widest font-bold disabled:opacity-50 flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Clear CKYC</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Cryptographic Handshake Status */}
              {loading && verificationStage && (
                <div className="p-3 bg-[#040915] border border-slate-800 rounded-sm font-mono text-xs text-[#D8BD80] flex items-center space-x-2">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>{verificationStage}</span>
                </div>
              )}
            </form>
          )}

          {error && (
            <div className="p-4 rounded-sm bg-rose-950/30 border border-rose-500/50 flex items-center space-x-2 text-rose-300 text-xs font-mono">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
