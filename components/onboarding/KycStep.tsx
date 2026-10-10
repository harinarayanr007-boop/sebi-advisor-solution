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
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-9 space-y-8 text-slate-800 shadow-sm relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-xs text-red-600 uppercase tracking-wider font-bold">
            <Fingerprint className="h-4 w-4 text-red-600" />
            <span>Statutory Clearance • Step 01</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            UIDAI & CKYC Central Registry Clearance
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Lock className="h-3.5 w-3.5 text-emerald-600" />
          <span>256-Bit TLS Bank-Grade Channel</span>
        </div>
      </div>

      {/* Qualified Client Dossier Strip */}
      {rpq && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
              CLIENT DOSSIER
            </span>
            <span className="text-slate-900 font-bold text-sm">{rpq.fullName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
              AUDITED LIQUID NET WORTH
            </span>
            <span className="text-slate-900 font-bold">
              {rpq.netWorth === "above_10cr"
                ? "₹10+ CRORES (FAMILY OFFICE)"
                : rpq.netWorth === "2cr_to_10cr"
                ? "₹2 CR – ₹10 CR (CORE HNI)"
                : "₹50L – ₹2 CR (EMERGING HNI)"}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
              ASSIGNED MANDATE PROFILE
            </span>
            <span className="text-emerald-700 font-bold">{rpq.riskProfile}</span>
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
          <div className="p-6 sm:p-7 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-6 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-200">
              <div className="flex items-center space-x-3 text-emerald-800">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Aadhaar e-KYC & CKYC Verification Successfully Executed
                  </h3>
                  <p className="text-xs text-slate-600">
                    Identity verified against UIDAI and Central KYC Registry (CKYCR)
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                VERIFIED // SEBI COMPLIANT
              </span>
            </div>

            {/* Dossier Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">CKYC IDENTIFIER</span>
                <span className="text-slate-900 font-bold text-sm block mt-0.5">
                  {kyc.cKycNumber || "IN-CKYC-2024-8849201"}
                </span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">VERIFIED PAN</span>
                <span className="text-slate-900 font-bold text-sm block mt-0.5">
                  {kyc.maskedPan || "ABCDE1234F"}
                </span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">AADHAAR SECURE REF</span>
                <span className="text-slate-900 font-bold text-sm block mt-0.5">
                  XXXX-XXXX-1284
                </span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">REGISTRY CLEARANCE</span>
                <span className="text-emerald-700 font-bold text-sm block mt-0.5">
                  UIDAI AUTH 2.1 OK
                </span>
              </div>
            </div>

            {/* Registered Address */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold block">
                Statutory KYC Registered Domicile
              </span>
              <p className="text-slate-700">
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
              className="btn-primary-pill px-8 py-3.5 text-xs font-semibold flex items-center space-x-2 shadow-md group"
            >
              <span>Proceed to Step 2: Advisory Agreement</span>
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      ) : (
        /* Form View: Aadhaar & OTP Entry */
        <div className="space-y-6">
          {/* UIDAI Sandbox Guidance Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs">
            <KeyRound className="h-5 w-5 text-slate-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-slate-900 uppercase tracking-wider block font-bold">
                UIDAI e-KYC Sandbox Simulation
              </strong>
              <p className="text-slate-600 leading-relaxed">
                To test successful statutory identity clearance, enter any 6-digit passcode (e.g.{" "}
                <span className="font-bold text-slate-900">123456</span>). To simulate UIDAI authentication failure, enter{" "}
                <span className="font-bold text-rose-600">000000</span>.
              </p>
            </div>
          </div>

          {/* 3 Segmented 4-Digit Aadhaar Inputs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-semibold text-slate-700 block">
                Enter 12-Digit Aadhaar Identification Number *
              </label>
              <span className="text-xs text-slate-500 font-mono">UIDAI / KRA Compliant</span>
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
                className="text-center font-mono text-lg font-bold tracking-widest rounded-2xl border border-slate-200 bg-slate-50 py-3 text-slate-900 focus:bg-white focus:border-red-500 focus:outline-none"
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
                className="text-center font-mono text-lg font-bold tracking-widest rounded-2xl border border-slate-200 bg-slate-50 py-3 text-slate-900 focus:bg-white focus:border-red-500 focus:outline-none"
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
                className="text-center font-mono text-lg font-bold tracking-widest rounded-2xl border border-slate-200 bg-slate-50 py-3 text-slate-900 focus:bg-white focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* OTP Generation Trigger */}
          {!otpSent ? (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSendOtp}
                className="btn-primary-pill px-8 py-3.5 text-xs font-semibold flex items-center space-x-2 shadow-md group"
              >
                <span>Generate UIDAI Authentication OTP</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ) : (
            /* OTP Form */
            <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-semibold text-slate-700 block">
                    Enter 6-Digit One-Time Password (OTP) *
                  </label>
                  <span className="text-xs text-emerald-700 font-semibold">
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
                    className="w-48 text-center font-mono text-xl font-bold tracking-[0.3em] rounded-2xl border border-slate-300 bg-white py-3 text-slate-900 focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="btn-primary-pill px-8 py-3.5 text-xs font-semibold disabled:opacity-50 flex items-center space-x-2 shadow-md"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Clear CKYC</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Cryptographic Handshake Status */}
              {loading && verificationStage && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium flex items-center space-x-2">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-red-600" />
                  <span>{verificationStage}</span>
                </div>
              )}
            </form>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center space-x-2 text-rose-700 text-xs font-medium">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
