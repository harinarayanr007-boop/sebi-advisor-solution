"use client";

import React, { useRef, useState, useEffect } from "react";
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
} from "lucide-react";
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

  // Setup canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#C5A059";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [signatureMode]);

  // Touch & Mouse Drawing Handlers
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
      setError("You must accept the terms of the SEBI Advisory Agreement.");
      return;
    }

    let signatureDataUrl = "";
    if (signatureMode === "draw") {
      const canvas = canvasRef.current;
      if (!canvas || !hasSignature) {
        setError("Please provide your legal digital signature on the pad.");
        return;
      }
      signatureDataUrl = canvas.toDataURL("image/png");
    } else {
      if (!typedName.trim()) {
        setError("Please type your full legal name as your electronic signature.");
        return;
      }
      // Create a text representation or canvas snapshot
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
          clientId: agreement.clientId,
          clientName: rpq?.fullName || typedName,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Execution failed. Please retry.");
        setLoading(false);
        return;
      }

      setAgreement({
        isSigned: true,
        signedAt: data.signedAt,
        signatureDataUrl,
        agreementPdfUrl: data.pdfDownloadUrl,
        termsAccepted: true,
      });

      setSignedSuccess(true);
      setLoading(false);
    } catch {
      setError("Network error while sealing the agreement. Please retry.");
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#090F1E] shadow-2xl overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800/80 bg-[#050B17] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2 text-[11px] text-[#C5A059] uppercase tracking-widest font-mono">
              <FileSignature className="h-3.5 w-3.5" />
              <span>Step 2: Statutory Advisory Agreement Execution</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-slate-100 font-normal mt-1">
              SEBI Mandated Fiduciary Advisory Agreement
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Reg. 19(1)(d) • Agreement Ref: <span className="text-[#DFC68E]">{agreement.clientId}</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Signed Success View */}
        {signedSuccess ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle2 className="h-6 w-6 shrink-0" />
                <div>
                  <h3 className="font-serif text-lg text-slate-100 font-medium">
                    Agreement Executed & Digitally Sealed
                  </h3>
                  <p className="text-xs text-emerald-400/90 font-mono">
                    SHA-256 Hash Generated • Valid under Indian Information Technology Act, 2000
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                The bipartite SEBI Registered Investment Advisory Agreement between Aurum Fiduciary Advisory LLP and{" "}
                <strong className="text-slate-100">{rpq?.fullName || "Client"}</strong> has been signed with legal timestamping.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href={agreement.agreementPdfUrl || "/api/agreement/download?agreementId=AURUM-001"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded border border-[#C5A059] bg-[#0A1226] text-[#DFC68E] text-xs font-medium hover:bg-[#050B17] transition-colors"
                >
                  <Download className="h-3.5 w-3.5 mr-2" />
                  <span>Inspect Executed Agreement (HTML/PDF)</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to KYC</span>
              </button>
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center px-8 py-3.5 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-bold uppercase tracking-wider hover:bg-[#DFC68E] transition-all shadow-lg shadow-[#C5A059]/20"
              >
                <span>Proceed to CeFCoM Centralized Fee Payment</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        ) : (
          /* Agreement Terms & E-Sign Pad */
          <form onSubmit={handleSignAgreement} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-start space-x-3">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Scrollable Terms Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Contract Clauses (Scroll to review)</span>
                <span className="font-mono text-[10px]">SEBI (IA) Regulations, 2013</span>
              </div>

              <div className="h-64 overflow-y-auto rounded-lg border border-slate-800 bg-[#050B17] p-5 text-xs text-slate-300 space-y-4 font-serif leading-relaxed select-none">
                <div>
                  <h4 className="font-sans font-bold text-slate-100 uppercase text-[11px] tracking-wider mb-1">
                    1. Scope of Non-Discretionary Fiduciary Advisory
                  </h4>
                  <p className="text-slate-400 font-sans text-xs">
                    The Investment Adviser agrees to provide fee-only investment advice tailored to the Client&apos;s verified Risk Profile. All investment execution decisions remain strictly at the discretion and authorization of the Client. The Adviser shall not hold custody of funds or securities.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans font-bold text-slate-100 uppercase text-[11px] tracking-wider mb-1">
                    2. Absolute Prohibition on Commissions & Kickbacks
                  </h4>
                  <p className="text-slate-400 font-sans text-xs">
                    In strict accordance with Regulation 15(1), the Investment Adviser shall not receive any commission, brokerage, or referral fee from any product manufacturer, mutual fund, or brokerage house. Recommendations shall exclusively utilize direct plans and institutional-grade securities.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans font-bold text-slate-100 uppercase text-[11px] tracking-wider mb-1">
                    3. Mandatory Fee Caps & CeFCoM Settlement
                  </h4>
                  <p className="text-slate-400 font-sans text-xs">
                    Advisory fees are governed by SEBI circular SEBI/HO/IMD/DF1/CIR/P/2020/182 and must not exceed ₹1,25,000 p.a. under the fixed fee model. All fees shall be collected through the Centralized Fee Collection Mechanism (CeFCoM) managed by BSE/MFU.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans font-bold text-slate-100 uppercase text-[11px] tracking-wider mb-1">
                    4. Standard Risk Acknowledgment
                  </h4>
                  <p className="text-slate-400 font-sans text-xs">
                    Investments in securities markets are subject to market risks. Past performance of strategies or the adviser does not indicate future results. The Client acknowledges full awareness of mark-to-market volatility.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans font-bold text-slate-100 uppercase text-[11px] tracking-wider mb-1">
                    5. Termination & Dispute Escalation
                  </h4>
                  <p className="text-slate-400 font-sans text-xs">
                    Either party may terminate this agreement with 30 days written notice. Disputes shall be resolved through SEBI SCORES 2.0 (scores.sebi.gov.in) and the SMART Online Dispute Resolution platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Method Toggle */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-200">
                  Electronic Signature Pad (Draw or Type)
                </label>
                <div className="flex items-center space-x-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSignatureMode("draw")}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      signatureMode === "draw"
                        ? "bg-[#C5A059] text-[#050B17] font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Draw Signature
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignatureMode("type")}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      signatureMode === "type"
                        ? "bg-[#C5A059] text-[#050B17] font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Type Legal Name
                  </button>
                </div>
              </div>

              {signatureMode === "draw" ? (
                <div className="space-y-2">
                  <div className="relative rounded-lg border border-slate-700 bg-[#050B17] overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      width={600}
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
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-slate-500 font-mono">
                        Sign here using mouse or touch screen
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      Clear Signature Pad
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    placeholder="Type full legal name as electronic signature"
                    className="w-full rounded-lg border border-slate-700 bg-[#050B17] px-4 py-3 text-lg font-serif italic text-[#DFC68E] focus:border-[#C5A059] focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500">
                    Your typed name constitutes a legally enforceable electronic signature under Section 4 of the Information Technology Act, 2000.
                  </p>
                </div>
              )}
            </div>

            {/* Checkbox Acknowledgment */}
            <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-700 text-[#C5A059] focus:ring-[#C5A059]"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I confirm that I have reviewed the entirety of the SEBI Registered Investment Advisory Agreement, consent to all terms, and authorize my digital signature as legally binding.
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to KYC</span>
              </button>
              <button
                type="submit"
                disabled={loading || !termsAccepted || (signatureMode === "draw" && !hasSignature)}
                className="inline-flex items-center px-8 py-3.5 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-bold uppercase tracking-wider hover:bg-[#DFC68E] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#C5A059]/10"
              >
                {loading ? (
                  <span className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Executing Agreement & Legal Hash...
                  </span>
                ) : (
                  <span>Digitally Execute Agreement</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
