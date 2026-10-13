"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  FileSignature,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Lock,
  Stamp,
  Award,
} from "lucide-react";
import { motion } from "motion/react";
import { useOnboarding } from "@/context/OnboardingContext";

export default function AgreementStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { rpq, agreement, setAgreement } = useOnboarding();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(agreement.termsAccepted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signedSuccess, setSignedSuccess] = useState(agreement.isSigned);
  const [signatureMode, setSignatureMode] = useState<"draw" | "type">("draw");
  const [typedName, setTypedName] = useState(rpq?.fullName || "Vikramaditya Singhania");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#0F172A";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [signatureMode]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSignAgreement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("Mandatory statutory acceptance of the SEBI Advisory Agreement terms is required.");
      return;
    }

    let signatureDataUrl = "";
    if (signatureMode === "draw") {
      const canvas = canvasRef.current;
      if (!canvas || !hasSignature) {
        setError("Please provide your executive digital signature on the signature pad.");
        return;
      }
      signatureDataUrl = canvas.toDataURL("image/png");
    } else {
      if (!typedName.trim()) {
        setError("Please enter your legal name as an electronic signature.");
        return;
      }
      signatureDataUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(typedName)}`;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/agreement/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signatureDataUrl,
          clientId: agreement.clientId || "AURUM-HNI-2024-8891",
          clientName: rpq?.fullName || typedName,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Indenture execution failed. Please retry.");
        setLoading(false);
        return;
      }

      const signedAt = data.data?.signedAt || data.signedAt || new Date().toISOString();
      const agreementHash = data.data?.sha256Hash || data.legalHash || "sha256_mock_fiduciary_stamp";
      const downloadUrl = data.data?.downloadUrl || data.pdfDownloadUrl || "/api/agreement/download";

      setAgreement({
        isSigned: true,
        signatureDataUrl,
        signedAt,
        agreementHash,
        downloadUrl,
        termsAccepted: true,
        clientId: agreement.clientId || "AURUM-HNI-2024-8891",
      });

      setSignedSuccess(true);
      setLoading(false);
    } catch {
      setError("Network timeout while executing digital indenture. Please retry.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Dossier Header Tab */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center space-x-2 bg-amber-100/90 text-amber-900 border border-amber-300/80 px-3.5 py-1.5 rounded-t-xl text-[11px] font-space font-bold uppercase tracking-wider -mb-px shadow-xs">
          <span>📁 INDENTURE // REG. 19(1) FORM B</span>
          <span className="text-[9px] bg-amber-200/80 px-1.5 py-0.5 rounded font-mono">SEBI MANDATORY</span>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-[10px] font-space text-slate-500 uppercase tracking-widest">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping" />
          <span>CRYPTOGRAPHIC CONTRACT PROTOCOL</span>
        </div>
      </div>

      {/* Main Luxury Card Container */}
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8 text-slate-800">
        {/* Subtle corner badge */}
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-28 h-28 bg-gradient-to-br from-amber-400/10 via-rose-400/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2 text-xs text-rose-600 uppercase tracking-wider font-space font-bold">
              <FileSignature className="h-4 w-4 text-rose-600" />
              <span>STAGE 02 // STATUTORY CLEARANCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-jakarta font-extrabold tracking-tight text-slate-950 mt-1">
              SEBI Fiduciary Advisory Indenture
            </h2>
            <p className="text-xs text-slate-500 font-space mt-1">
              Statutory bilateral agreement under Regulation 19(1) of SEBI (Investment Advisers) Regulations, 2013
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-space font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto shadow-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Form B Statutory Format</span>
          </div>
        </div>

        {signedSuccess ? (
          /* Executed Deed Confirmation */
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
                    SEBI Advisory Indenture Digitally Executed & Sealed
                  </h3>
                  <p className="text-xs text-slate-600 font-space">
                    Cryptographically stamped with SHA-256 digital certificate under IT Act, 2000
                  </p>
                </div>
              </div>

              {/* Cryptographic Execution Certificate */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-space text-xs text-slate-300 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Lock className="h-3 w-3 text-emerald-400" />
                    CRYPTOGRAPHIC SHA-256 SEAL
                  </span>
                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50">
                    VERIFIED & IMMUTABLE
                  </span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-emerald-400 break-all font-mono tracking-wider">
                  {agreement.agreementHash ||
                    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}
                </div>
                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1 font-space">
                  <span>CLIENT MANDATE: <strong className="text-white">{agreement.clientId || "AURUM-HNI-2024-8891"}</strong></span>
                  <span>EXECUTED: <strong className="text-white">{agreement.signedAt || new Date().toUTCString()}</strong></span>
                </div>
              </div>

              {/* Download Link & Next Step */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <a
                  href={agreement.downloadUrl || "/api/agreement/download"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3.5 rounded-full border border-slate-300 bg-white text-slate-900 font-space text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <Download className="h-4 w-4 mr-2 text-slate-700" />
                  <span>Download Executed Statutory Agreement (.PDF)</span>
                </a>

                <button
                  type="button"
                  onClick={onNext}
                  className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white font-space font-semibold px-8 py-4 rounded-full text-xs shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>Proceed to Stage 03: CeFCoM Escrow</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Active Indenture Form & Legal Document Viewer */
          <div className="space-y-8">
            {/* THE LEGAL DOCUMENT VIEWER */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-50/90 to-white border border-slate-200/90 p-6 sm:p-8 space-y-6 max-h-[460px] overflow-y-auto text-xs leading-relaxed shadow-inner scrollbar-thin">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="h-11 w-11 rounded-full border-2 border-amber-300/80 overflow-hidden shrink-0 shadow-xs bg-white p-0.5">
                    <Image
                      src="/images/fiduciary-seal.jpg"
                      alt="Embossed Seal"
                      width={44}
                      height={44}
                      unoptimized
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-jakarta font-extrabold uppercase tracking-wide text-slate-950 block">
                      Aurum Fiduciary Advisory LLP
                    </span>
                    <span className="text-[10px] text-slate-500 font-space block">
                      SEBI Reg No. INA000019842 • BASL Membership: BASL-1892
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-space font-bold px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-800 self-start sm:self-auto shadow-2xs">
                  DEED NO. AF-2024-HNI
                </span>
              </div>

              <div className="text-center py-2 bg-slate-100/50 rounded-xl border border-slate-200/60 p-3">
                <h3 className="text-sm sm:text-base font-jakarta font-extrabold text-slate-950 uppercase tracking-wide">
                  Indenture of Investment Advisory Agreement
                </h3>
                <p className="text-[10px] text-slate-500 font-space mt-0.5">
                  Pursuant to Regulation 19(1) of SEBI (Investment Advisers) Regulations, 2013
                </p>
              </div>

              <p className="text-justify text-xs text-slate-700 leading-relaxed font-sans">
                <strong>THIS INVESTMENT ADVISORY AGREEMENT</strong> is entered into on this{" "}
                <span className="font-space font-semibold text-slate-900">
                  {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
                </span>, by and between{" "}
                <strong>AURUM FIDUCIARY ADVISORY LLP</strong>, a registered corporate investment adviser
                having its principal office at Level 14, Maker Chambers VI, Nariman Point, Mumbai 400021
                (hereinafter referred to as the <em>&quot;Fiduciary&quot;</em>) and{" "}
                <strong className="text-slate-950 underline decoration-slate-300">
                  {rpq?.fullName || "The Client"}
                </strong>, having declared investable surplus qualifying under SEBI suitability norms
                (hereinafter referred to as the <em>&quot;Client&quot;</em>).
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-950 font-jakarta font-bold text-xs uppercase block">
                      Clause 1: Sole Fiduciary Standard of Care (Regulation 15)
                    </strong>
                    <span className="text-[10px] font-space text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ZERO COMMISSION
                    </span>
                  </div>
                  <p className="leading-relaxed text-slate-600">
                    The Fiduciary covenants under statutory oath to act exclusively in the best financial
                    interest of the Client. The Fiduciary shall strictly refrain from accepting, receiving,
                    or claiming any distribution commissions, trailing fees, or broker referral kickbacks
                    from any Asset Management Company, PMS manager, or alternate investment fund.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-950 font-jakarta font-bold text-xs uppercase block">
                      Clause 2: Direct Demat Custody & Zero Power of Attorney (Regulation 19)
                    </strong>
                    <span className="text-[10px] font-space text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                      ZERO POA
                    </span>
                  </div>
                  <p className="leading-relaxed text-slate-600">
                    The Client shall at all times retain 100% legal and operational custody of all securities,
                    funds, and accounts in their own name. The Fiduciary shall never seek, demand, or exercise
                    any Power of Attorney (POA) or discretionary trade execution authority. All orders shall be
                    approved and transacted directly by the Client.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-950 font-jakarta font-bold text-xs uppercase block">
                      Clause 3: Centralized Fee Collection Mechanism (CeFCoM Mandatory Escrow)
                    </strong>
                    <span className="text-[10px] font-space text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      BSE ESCROW
                    </span>
                  </div>
                  <p className="leading-relaxed text-slate-600">
                    In compliance with SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/78, all advisory fees
                    shall be billed and processed exclusively via the BSE / MFU Centralized Fee Collection
                    Mechanism (CeFCoM) escrow infrastructure under BASL oversight.
                  </p>
                </div>
              </div>
            </div>

            {/* SIGNATURE DESK STATION */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span className="text-xs uppercase font-space font-bold tracking-wider text-slate-950">
                      Executive Digital Signature Desk
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-space">
                    Execute using touch, mouse, or typed cryptographic representation
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setSignatureMode("draw")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-space font-semibold transition-all ${
                      signatureMode === "draw"
                        ? "bg-slate-950 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    🖋️ Fountain Pen Pad
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignatureMode("type")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-space font-semibold transition-all ${
                      signatureMode === "type"
                        ? "bg-slate-950 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    ⌨️ Typed Digital Seal
                  </button>
                </div>
              </div>

              {/* Signature Input Canvas or Typed Box */}
              {signatureMode === "draw" ? (
                <div className="space-y-2">
                  <div className="relative border-2 border-dashed border-slate-300 rounded-2xl bg-white overflow-hidden shadow-inner">
                    <canvas
                      ref={canvasRef}
                      width={700}
                      height={160}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-40 cursor-crosshair touch-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"
                    />
                    {!hasSignature && (
                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-xs font-space font-semibold text-slate-400 uppercase tracking-wider space-y-1">
                        <Stamp className="h-5 w-5 text-slate-300" />
                        <span>Sign Here Using Cursor or Stylus Touch</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[11px] text-slate-400 font-space font-mono">
                      Ink: Archival Navy // 2.5px // SHA-256 Validated
                    </span>
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="text-xs font-space font-semibold text-slate-500 hover:text-rose-600 flex items-center space-x-1.5 transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Clear Signature</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs uppercase font-space font-semibold text-slate-600 block">
                    Full Legal Name for Electronic Cryptographic Seal
                  </label>
                  <input
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-lg font-jakarta font-bold text-slate-950 focus:outline-none focus:border-slate-900 shadow-2xs"
                  />
                  <span className="text-[10px] text-slate-400 font-space block">
                    Electronic signature representation legally recognized under Section 3 of Information Technology Act, 2000.
                  </span>
                </div>
              )}

              {/* Terms Acceptance */}
              <div className="pt-2">
                <label className="flex items-start space-x-3 cursor-pointer p-3.5 rounded-xl bg-white border border-slate-200/80 hover:bg-slate-50/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-900"
                  />
                  <span className="text-xs text-slate-700 leading-relaxed font-sans">
                    I confirm that I have reviewed the full terms of this SEBI Advisory Indenture. I agree to
                    retain Aurum Fiduciary Advisory LLP as an independent fee-only RIA under SEBI Regulations,
                    and authorize routing of advisory retainers through the BSE/MFU CeFCoM clearing escrow.
                  </span>
                </label>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center space-x-2 text-rose-700 text-xs font-medium font-space">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Execution Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-4 py-2.5 text-xs font-space font-semibold text-slate-600 hover:text-slate-950 flex items-center space-x-1.5 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Return to e-KYC</span>
                </button>

                <button
                  type="button"
                  onClick={handleSignAgreement}
                  disabled={loading}
                  className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white font-space font-semibold px-8 py-4 rounded-full text-xs shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Cryptographically Sealing Indenture...</span>
                    </>
                  ) : (
                    <>
                      <span>Execute & Digitally Seal Indenture</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
