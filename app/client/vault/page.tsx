"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  ShieldCheck,
  CheckCircle,
  Eye,
  UploadSimple,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function ClientVaultPage() {
  const { activeClient, advisor, setShowFactsheetModal } = useFiduciary();
  const [uploadedMsg, setUploadedMsg] = useState(false);

  const documents = [
    {
      title: "SEBI Form B Fiduciary Investment Advisory Indenture",
      docType: "Statutory Agreement",
      status: "Digitally Sealed // Active",
      date: "2026-02-18",
      ref: `AGR-SEBI-${activeClient?.id?.substring(0, 10) || "AURUM"}`,
    },
    {
      title: "Central KYC (CKYC) Verification Certificate",
      docType: "Identity Compliance",
      status: "100% Verified",
      date: "2026-01-10",
      ref: activeClient?.ckycId || "IN-CKYC-2026-VERIFIED",
    },
    {
      title: "Consolidated Account Statement (CAS) Demat Summary",
      docType: "Portfolio Audit",
      status: "Extracted & Verified",
      date: "2026-03-01",
      ref: "NSDL-CDSL-COMBINED-01",
    },
    {
      title: "Client Master Report (CMR) - Direct Demat Proof",
      docType: "Depository Record",
      status: "Verified Direct Demat",
      date: "2026-01-15",
      ref: "CMR-DP-IN300128",
    },
  ];

  const handleSimulateUpload = () => {
    setUploadedMsg(true);
    setTimeout(() => setUploadedMsg(false), 3000);
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-space text-[#343C6A]">
            Cryptographic Statutory Document Vault
          </h2>
          <p className="text-xs text-[#718EBF]">
            Encrypted repository of SEBI compliance documents, Form B indenture, and CKYC verification.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSimulateUpload}
            className="px-4 py-2.5 bg-white border border-[#DFEAF2] hover:bg-slate-50 text-[#343C6A] rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-xs"
          >
            <UploadSimple size={16} weight="bold" className="text-[#1814F3]" />
            <span>Upload Document</span>
          </button>
          <button
            onClick={() => setShowFactsheetModal(true)}
            className="px-4 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
          >
            <Printer size={16} weight="bold" />
            <span>Print Fiduciary Dossier</span>
          </button>
        </div>
      </div>

      {uploadedMsg && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-800 flex items-center space-x-2">
          <CheckCircle size={20} weight="fill" className="text-emerald-600" />
          <span>Document received and queued for RIA compliance hash verification!</span>
        </div>
      )}

      {/* Grid of Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc, i) => (
          <div
            key={i}
            className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#1814F3] transition"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  {doc.status}
                </span>
                <span className="text-[10px] text-[#718EBF] font-mono">{doc.date}</span>
              </div>

              <h3 className="text-base font-bold font-space text-[#343C6A] mt-3">
                {doc.title}
              </h3>
              <p className="text-xs text-[#718EBF] mt-0.5">{doc.docType}</p>

              <div className="mt-3 p-3 bg-[#F5F7FA] rounded-xl text-xs font-mono text-[#718EBF]">
                Reference ID: {doc.ref}
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0F4F8] flex items-center justify-between">
              <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1">
                <ShieldCheck size={16} weight="fill" />
                <span>SHA-256 Verified</span>
              </span>
              <button
                onClick={() => setShowFactsheetModal(true)}
                className="text-xs font-bold text-[#1814F3] hover:underline flex items-center space-x-1"
              >
                <Eye size={16} weight="bold" />
                <span>Inspect Record</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
