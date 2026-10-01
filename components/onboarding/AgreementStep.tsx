"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  FileSignature,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Scale,
  ArrowRight,
  ArrowLeft,
  FileText,
  Lock,
  Award,
  ShieldCheck,
  RotateCcw,
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

    ctx.strokeStyle = "#BE9A48";
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
    <div className="architectural-panel p-6 sm:p-9 space-y-8 text-slate-100 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#BE9A48]/20">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-[#D8BD80] uppercase tracking-[0.2em] font-mono">
            <FileSignature className="h-3.5 w-3.5 text-[#BE9A48]" />
            <span>Statutory Clearance // Step 02</span>
          </div>
          <h2 className="font-serif text-2xl text-slate-100 font-normal mt-1">
            SEBI Mandated Fiduciary Advisory Indenture
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-sm border border-emerald-500/30">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Reg. 19(1) Form B Statutory Format</span>
        </div>
      </div>

      {signedSuccess ? (
        /* Executed Deed Confirmation */
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
                  SEBI Advisory Indenture Digitally Executed & Sealed
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Cryptographically stamped with SHA-256 digital certificate
                </p>
              </div>
            </div>

            {/* Cryptographic Execution Certificate */}
            <div className="p-4 bg-[#040915] border border-slate-800 rounded-sm space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[10px] uppercase">CRYPTOGRAPHIC SHA-256 SEAL</span>
                <span className="text-emerald-400 font-bold text-[10px]">VERIFIED OK</span>
              </div>
              <div className="p-2.5 bg-[#020611] rounded border border-slate-800 text-[11px] text-[#D8BD80] break-all">
                {agreement.agreementHash ||
                  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}
              </div>
              <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>CLIENT MANDATE: {agreement.clientId || "AURUM-HNI-2024-8891"}</span>
                <span>EXECUTED AT: {agreement.signedAt || new Date().toUTCString()}</span>
              </div>
            </div>

            {/* Download Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <a
                href={agreement.downloadUrl || "/api/agreement/download"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 rounded-sm border border-[#BE9A48]/50 bg-[#081022] text-[#D8BD80] text-xs font-mono uppercase tracking-wider hover:bg-[#142445] transition-colors"
              >
                <Download className="h-4 w-4 mr-2 text-[#BE9A48]" />
                <span>Download Executed Statutory Agreement (.PDF)</span>
              </a>

              <button
                type="button"
                onClick={onNext}
                className="btn-gold-foil px-8 py-3.5 rounded-sm text-xs uppercase tracking-widest font-bold flex items-center space-x-2"
              >
                <span>Proceed to Step 3: CeFCoM Escrow</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Active Indenture Form & Vellum Document Viewer */
        <div className="space-y-8">
          {/* THE VELLUM PARCHMENT LEGAL DOCUMENT */}
          <div className="vellum-sheet p-6 sm:p-10 rounded-sm space-y-6 max-h-[460px] overflow-y-auto text-xs font-serif leading-relaxed shadow-2xl relative">
            {/* Deed Watermark & Crest */}
            <div className="flex items-center justify-between pb-6 border-b border-[#BE9A48]/40">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full border border-[#BE9A48] overflow-hidden shrink-0 shadow">
                  <Image
                    src="/images/fiduciary-seal.jpg"
                    alt="Embossed Seal"
                    width={48}
                    height={48}
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-serif text-base uppercase font-bold tracking-wider text-[#171A21] block">
                    Aurum Fiduciary Advisory LLP
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#7E6325] block">
                    SEBI Registration No. INA000019842 • BASL Membership: BASL-1892
                  </span>
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase font-bold px-2 py-1 bg-[#FAF7EF] border border-[#BE9A48] text-[#7E6325]">
                DEED NO. AF-2024-HNI
              </span>
            </div>

            <div className="text-center py-2">
              <h3 className="font-serif text-lg font-bold text-[#171A21] uppercase tracking-wide">
                Indenture of Investment Advisory Agreement
              </h3>
              <p className="font-mono text-[10px] text-[#7E6325] mt-0.5">
                Pursuant to Regulation 19(1) of SEBI (Investment Advisers) Regulations, 2013
              </p>
            </div>

            <p className="text-justify font-sans text-xs text-[#2B303A] leading-relaxed">
              <strong>THIS INVESTMENT ADVISORY AGREEMENT</strong> is entered into on this{" "}
              {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}, by and between{" "}
              <strong>AURUM FIDUCIARY ADVISORY LLP</strong>, a registered corporate investment adviser
              having its principal office at Level 14, Maker Chambers VI, Nariman Point, Mumbai 400021
              (hereinafter referred to as the <em>&quot;Fiduciary&quot;</em>) and{" "}
              <strong>{rpq?.fullName || "The Client"}</strong>, having declared investable surplus
              qualifying under SEBI suitability norms (hereinafter referred to as the{" "}
              <em>&quot;Client&quot;</em>).
            </p>

            <div className="space-y-4 font-sans text-xs text-[#2B303A]">
              <div className="p-3 bg-[#FAF7EF] border border-[#D6BD82] space-y-1">
                <strong className="text-[#171A21] font-mono text-[11px] uppercase block">
                  Clause 1: Sole Fiduciary Standard of Care (Regulation 15)
                </strong>
                <p className="leading-relaxed">
                  The Fiduciary covenants under statutory oath to act exclusively in the best financial
                  interest of the Client. The Fiduciary shall strictly refrain from accepting, receiving,
                  or claiming any distribution commissions, trailing fees, or broker referral kickbacks
                  from any Asset Management Company, PMS manager, or alternate investment fund.
                </p>
              </div>

              <div className="p-3 bg-[#FAF7EF] border border-[#D6BD82] space-y-1">
                <strong className="text-[#171A21] font-mono text-[11px] uppercase block">
                  Clause 2: Direct Demat Custody & Zero Power of Attorney (Regulation 19)
                </strong>
                <p className="leading-relaxed">
                  The Client shall at all times retain 100% legal and operational custody of all securities,
                  funds, and accounts in their own name. The Fiduciary shall never seek, demand, or exercise
                  any Power of Attorney (POA) or discretionary trade execution authority. All orders shall be
                  approved and transacted directly by the Client.
                </p>
              </div>

              <div className="p-3 bg-[#FAF7EF] border border-[#D6BD82] space-y-1">
                <strong className="text-[#171A21] font-mono text-[11px] uppercase block">
                  Clause 3: Centralized Fee Collection Mechanism (CeFCoM Mandatory Escrow)
                </strong>
                <p className="leading-relaxed">
                  In compliance with SEBI Circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/78, all advisory fees
                  shall be billed and processed exclusively via the BSE / MFU Centralized Fee Collection
                  Mechanism (CeFCoM) escrow infrastructure under BASL oversight.
                </p>
              </div>
            </div>
          </div>

          {/* SIGNATURE DESK STATION */}
          <div className="p-6 rounded-sm bg-[#040915] border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#D8BD80]">
                  Executive Digital Signature Desk
                </span>
                <p className="text-xs text-slate-400">
                  Execute using touch, mouse, or typed cryptographic representation
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setSignatureMode("draw")}
                  className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-all ${
                    signatureMode === "draw"
                      ? "bg-[#142445] text-[#D8BD80] border border-[#BE9A48]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Fountain Pen Pad
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMode("type")}
                  className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-all ${
                    signatureMode === "type"
                      ? "bg-[#142445] text-[#D8BD80] border border-[#BE9A48]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Typed Digital Seal
                </button>
              </div>
            </div>

            {/* Signature Input Canvas or Typed Box */}
            {signatureMode === "draw" ? (
              <div className="space-y-2">
                <div className="relative border-2 border-dashed border-[#BE9A48]/50 rounded-sm bg-[#020611] overflow-hidden">
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
                    className="w-full h-40 cursor-crosshair touch-none"
                  />
                  {!hasSignature && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-mono text-slate-600 uppercase tracking-widest">
                      Sign Here Using Cursor or Touch Screen
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-[10px] text-slate-500">
                    Ink: Archival Fiduciary Gold // 2.5px
                  </span>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="text-[11px] font-mono text-slate-400 hover:text-rose-400 flex items-center space-x-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Clear Signature</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase text-slate-400 block">
                  Full Legal Name for Electronic Cryptographic Seal
                </label>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  className="w-full rounded-sm border border-[#BE9A48] bg-[#020611] px-4 py-3 font-serif text-lg text-[#F3ECDB] focus:outline-none"
                />
              </div>
            )}

            {/* Terms Acceptance */}
            <div className="pt-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-sm border-slate-700 text-[#BE9A48] focus:ring-[#BE9A48]"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I confirm that I have reviewed the full terms of this SEBI Advisory Indenture. I agree to
                  retain Aurum Fiduciary Advisory LLP as an independent fee-only RIA under SEBI Regulations,
                  and authorize routing of advisory retainers through the BSE/MFU CeFCoM clearing escrow.
                </span>
              </label>
            </div>

            {error && (
              <div className="p-3 rounded-sm bg-rose-950/30 border border-rose-500/50 flex items-center space-x-2 text-rose-300 text-xs font-mono">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Execution Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2.5 text-xs font-mono uppercase text-slate-400 hover:text-slate-200 flex items-center space-x-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to e-KYC</span>
              </button>

              <button
                type="button"
                onClick={handleSignAgreement}
                disabled={loading}
                className="btn-gold-foil px-8 py-3.5 rounded-sm text-xs uppercase tracking-widest font-bold flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Cryptographically Sealing Indenture...</span>
                  </>
                ) : (
                  <>
                    <span>Execute & Digitally Seal Indenture</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
