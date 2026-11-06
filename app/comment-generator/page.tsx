"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  UploadCloud,
  Copy,
  Check,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  SlidersHorizontal,
  ArrowRight,
  Shield,
  Target,
  Compass,
  CheckCircle2,
  Layers,
} from "lucide-react";
import {
  HuxButton,
  HuxCard,
  HuxBadge,
  HuxTextarea,
} from "@/components/hux";

interface AwarenessComment {
  level: string;
  stage: string;
  text: string;
  strategy: string;
}

export default function CommentStudioDashboard() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [customNotes, setCustomNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");
  const [comments, setComments] = useState<AwarenessComment[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global Ctrl + V paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileSelect(file);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleFileSelect = (file: File) => {
    setErrorMsg("");
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        handleFileSelect(file);
      } else {
        setErrorMsg("Please upload a PNG, JPG, or WebP screenshot.");
      }
    }
  };

  const handleClear = () => {
    setImageFile(null);
    setImagePreview(null);
    setComments([]);
    setSummary("");
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!imagePreview) {
      setErrorMsg("Upload or paste a screenshot first.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setComments([]);
    setSummary("");

    try {
      const res = await fetch("/api/generate-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: imageFile?.type || "image/png",
          customNotes: customNotes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Extraction failed");
      }

      setSummary(data.summary || "Screenshot processed.");
      setComments(data.comments || []);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to process screenshot.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCommentChange = (index: number, newText: string) => {
    setComments((prev) =>
      prev.map((c, i) => (i === index ? { ...c, text: newText } : c))
    );
  };

  const getStageBadge = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "problem":
        return <HuxBadge variant="destructive">Level 1 · Problem</HuxBadge>;
      case "solution":
        return <HuxBadge variant="primary">Level 2 · Solution</HuxBadge>;
      case "mechanism":
        return <HuxBadge variant="neo">Level 3 · Mechanism</HuxBadge>;
      case "conviction":
        return <HuxBadge variant="default">Level 4 · Conviction</HuxBadge>;
      default:
        return <HuxBadge variant="outline">{stage}</HuxBadge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#1E1E1E] font-['Inter',sans-serif]">
      {/* Top Utility Command Bar */}
      <nav className="w-full bg-white border-b border-[rgba(0,0,0,0.1)] px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-[#001B66] text-white flex items-center justify-center font-black text-xs tracking-wider">
              AS
            </div>
            <div className="flex items-baseline gap-2 text-left">
              <span className="text-sm font-extrabold tracking-tight text-[#1E1E1E]">
                Comment Command Desk
              </span>
              <span className="text-xs text-[#6B7280] hidden sm:inline">
                / Awareness Matrix
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#EEF4FF] border border-[rgba(0,56,200,0.15)] text-[11px] font-semibold text-[#0038C8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0038C8] animate-pulse"></span>
              Localhost 3000
            </div>
            <span className="text-xs text-[#9CA3AF] hidden md:inline">|</span>
            <span className="text-[11px] font-medium text-[#6B7280] hidden md:inline">
              Zero Em Dashes · 4 Awareness Stages
            </span>
          </div>
        </div>
      </nav>

      {/* Main Workspace Dashboard */}
      <main className="max-w-[1360px] mx-auto p-4 sm:p-8 flex flex-col gap-6">
        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Input Terminal (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <HuxCard variant="default" className="p-5 flex flex-col gap-4 text-left border-[rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0038C8]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]">
                    Screenshot Intake
                  </span>
                </div>
                <span className="text-[11px] text-[#6B7280]">Ctrl + V supported</span>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                accept="image/*"
                className="hidden"
              />

              {!imagePreview ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-[#FAFAFA] border-2 border-dashed border-[rgba(0,0,0,0.15)] hover:border-[#0038C8] rounded-[10px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:bg-white group min-h-[220px]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#EEF4FF] text-[#0038C8] flex items-center justify-center transition-transform group-hover:scale-105">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-center gap-0.5 text-center">
                    <p className="text-sm font-bold text-[#1E1E1E]">
                      Drop screenshot here or click to browse
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      Or press <kbd className="bg-white border border-gray-300 rounded px-1 text-[11px] font-mono text-black font-semibold">Ctrl + V</kbd> to paste
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 truncate">
                      <ImageIcon className="w-4 h-4 text-[#0038C8] shrink-0" />
                      <span className="text-xs font-semibold text-[#1E1E1E] truncate max-w-[200px]">
                        {imageFile?.name || "Pasted Image"}
                      </span>
                    </div>
                    <button
                      onClick={handleClear}
                      className="inline-flex items-center gap-1 text-xs text-[#DC2626] hover:text-[#B91C1C] font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear
                    </button>
                  </div>

                  <div className="relative rounded-[8px] overflow-hidden border border-[rgba(0,0,0,0.1)] bg-[#111827] max-h-[260px] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Screenshot"
                      className="w-full h-auto max-h-[260px] object-contain"
                    />
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-2.5 bg-[#FEF2F2] border border-[#FCA5A5] rounded-[8px] text-xs font-medium text-[#DC2626]">
                  {errorMsg}
                </div>
              )}

              {/* Optional Steering */}
              <div className="flex flex-col gap-1.5 pt-1">
                <label className="text-xs font-bold text-[#1E1E1E] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#0038C8]" />
                  Custom Directive (Optional)
                </label>
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g. Focus on SEBI RIA digital intake, mention debt syndication, keep under 20 words..."
                  rows={2}
                  className="w-full bg-[#FAFAFA] text-[#1E1E1E] text-xs rounded-[8px] border border-[rgba(0,0,0,0.12)] p-2.5 outline-none focus:bg-white focus:border-[#0038C8] transition-all resize-none"
                />
              </div>

              <HuxButton
                variant="primary"
                size="md"
                onClick={handleGenerate}
                disabled={isLoading || !imagePreview}
                iconRight={
                  isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )
                }
                className="w-full justify-center font-bold tracking-tight"
              >
                {isLoading ? "Analyzing Premise..." : "Generate 4 Awareness Takes"}
              </HuxButton>
            </HuxCard>
          </div>

          {/* Right Column: Output Matrix (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {comments.length === 0 ? (
              /* Empty State: The Awareness Framework Guide */
              <HuxCard variant="default" className="p-6 text-left flex flex-col gap-5 border-[rgba(0,0,0,0.1)]">
                <div className="flex flex-col gap-1 border-b border-[rgba(0,0,0,0.06)] pb-3">
                  <h3 className="text-sm font-extrabold text-[#1E1E1E] uppercase tracking-wide">
                    Awareness Matrix Structure
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Every screenshot produces 4 targeted comments tailored to where your prospect sits in the market.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-[10px] bg-white border border-[rgba(0,0,0,0.08)] flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold text-[#DC2626] uppercase tracking-wider">
                      Level 1 · Problem Aware
                    </span>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Exposes the invisible leak, awkward manual friction, or positioning trap the author ignores.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[10px] bg-white border border-[rgba(0,0,0,0.08)] flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold text-[#0038C8] uppercase tracking-wider">
                      Level 2 · Solution Aware
                    </span>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Introduces the operational shift from manual chasing to automated qualification.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[10px] bg-white border border-[rgba(0,0,0,0.08)] flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold text-[#1E1E1E] uppercase tracking-wider">
                      Level 3 · Mechanism
                    </span>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Explains how a sovereign pre-qualification desk filters noise and commands fees.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[10px] bg-white border border-[rgba(0,0,0,0.08)] flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider">
                      Level 4 · Conviction
                    </span>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      A short, hard-hitting closing take that forces agreement and drives profile clicks.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#EEF4FF] rounded-[8px] border border-[rgba(0,56,200,0.15)] flex items-center gap-2 text-xs text-[#0038C8]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Strict rules enforced: Zero em dashes, 1 to 2 sentences max, zero AI fluff.</span>
                </div>
              </HuxCard>
            ) : (
              /* Active Comments Feed */
              <div className="flex flex-col gap-4 text-left">
                {/* Summary Strip */}
                <div className="flex items-center justify-between p-3.5 bg-white rounded-[10px] border border-[rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                    <span className="text-xs font-semibold text-[#1E1E1E] truncate">
                      {summary}
                    </span>
                  </div>
                  <button
                    onClick={handleGenerate}
                    className="text-xs text-[#0038C8] hover:underline font-bold flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Regenerate
                  </button>
                </div>

                {/* 4 Awareness Cards */}
                <div className="flex flex-col gap-3.5">
                  {comments.map((comment, index) => {
                    const wordCount = comment.text.split(/\s+/).filter(Boolean).length;
                    return (
                      <HuxCard
                        key={index}
                        variant="default"
                        className="p-4 sm:p-5 flex flex-col gap-3 border-[rgba(0,0,0,0.1)] hover:border-[#0038C8] transition-all bg-white"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2 border-b border-[rgba(0,0,0,0.05)] pb-2.5">
                          <div className="flex items-center gap-2">
                            {getStageBadge(comment.stage)}
                            <span className="text-[11px] text-[#6B7280] hidden sm:inline">
                              · {comment.strategy}
                            </span>
                          </div>

                          <span className="text-[11px] font-mono text-[#9CA3AF]">
                            {wordCount} words
                          </span>
                        </div>

                        {/* Editable Textarea */}
                        <textarea
                          value={comment.text}
                          onChange={(e) => handleCommentChange(index, e.target.value)}
                          rows={2}
                          className="w-full bg-[#FAFAFA] text-[#1E1E1E] text-sm font-medium rounded-[8px] border border-[rgba(0,0,0,0.1)] p-3 outline-none focus:bg-white focus:border-[#0038C8] focus:ring-1 focus:ring-[#0038C8] transition-all resize-y leading-relaxed"
                        />

                        {/* Footer with One-Click Copy */}
                        <div className="flex items-center justify-between pt-1 text-xs">
                          <span className="text-[11px] text-[#9CA3AF]">
                            Clean formatting · Zero em dashes
                          </span>

                          <HuxButton
                            variant={copiedIndex === index ? "secondary" : "primary"}
                            size="sm"
                            onClick={() => copyToClipboard(comment.text, index)}
                            iconLeft={
                              copiedIndex === index ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )
                            }
                          >
                            {copiedIndex === index ? "Copied" : "Copy"}
                          </HuxButton>
                        </div>
                      </HuxCard>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
