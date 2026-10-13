"use client";

import React from "react";
import { FileText, Printer, Download, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function VaultPage() {
  const { activeClient, setShowFactsheetModal } = useFiduciary();

  const documents = [
    {
      name: "SEBI Form B Fiduciary Indenture Agreement",
      date: "29 Jan 2026",
      hash: "SHA256: 9e8a7c...1049b",
      size: "1.4 MB",
      type: "Bilateral Legal Contract",
    },
    {
      name: "BSE CeFCoM Central Escrow Deposit Receipt",
      date: "30 Jan 2026",
      hash: activeClient.cefcomUrn,
      size: "420 KB",
      type: "Regulatory Escrow Settlement",
    },
    {
      name: "Central KYC Verification Registry Record",
      date: "28 Jan 2026",
      hash: activeClient.ckycId,
      size: "680 KB",
      type: "UIDAI e-KYC Attestation",
    },
    {
      name: "SEBI Mandated Risk Suitability Scorecard",
      date: "29 Jan 2026",
      hash: `Scorecard: ${activeClient.riskTolerance}`,
      size: "890 KB",
      type: "Regulation 17 Audit Record",
    },
  ];

  return (
    <div className="space-y-7">
      <div className="bg-white rounded-[25px] p-8 border border-[#DFEAF2] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F5F7FA] pb-4">
          <div>
            <h2 className="text-xl font-bold font-jakarta text-[#343C6A]">
              Statutory Document Vault & Cryptographic Seals
            </h2>
            <p className="text-xs text-[#718EBF] mt-1">
              All compliance records retained under SEBI circular SEBI/HO/IMD/DF1/CIR/P/2020/182 for 5 years for {activeClient.name}.
            </p>
          </div>

          <button
            onClick={() => setShowFactsheetModal(true)}
            className="bg-[#1814F3] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-2 self-start sm:self-auto hover:bg-[#120ec0] transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print 1-Click Unified Dossier</span>
          </button>
        </div>

        <div className="space-y-3">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-[18px] bg-[#F5F7FA] border border-[#DFEAF2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-white text-[#1814F3] border border-[#DFEAF2] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#343C6A]">{doc.name}</h4>
                  <p className="text-[11px] text-[#718EBF] font-space">
                    {doc.type} • {doc.date} • {doc.hash}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-auto">
                <span className="text-xs text-[#718EBF] font-space mr-2">{doc.size}</span>
                <button
                  onClick={() => alert(`Downloading verified copy of ${doc.name}`)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#DFEAF2] text-xs font-bold text-[#343C6A] hover:text-[#1814F3] transition-colors"
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
