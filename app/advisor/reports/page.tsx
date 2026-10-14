"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function AdvisorReportsPage() {
  const { clients, advisor, setShowFactsheetModal, setSelectedReportClient } = useFiduciary();

  const handlePrint = (c: any) => {
    setSelectedReportClient(c);
    setShowFactsheetModal(true);
  };

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-bold font-space text-[#343C6A]">
          Fiduciary Factsheet & Compliance Report Generator
        </h2>
        <p className="text-xs text-[#718EBF]">
          Produce official investor reports, direct cost transition audits, and SEBI suitability declarations.
        </p>
      </div>

      {clients.length === 0 ? (
        <div className="bg-white rounded-[25px] p-12 border border-[#DFEAF2] text-center space-y-3 shadow-sm">
          <FileText size={36} weight="duotone" className="text-[#718EBF] mx-auto opacity-40" />
          <h3 className="text-base font-bold font-space text-[#343C6A]">No Client Records Available</h3>
          <p className="text-xs text-[#718EBF] max-w-sm mx-auto">
            Onboard client families into your practice to generate fiduciary dossiers and suitability reports.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#1814F3] transition"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1814F3] bg-[#E7EDFF] px-2.5 py-1 rounded-full">
                  {c.tier}
                </span>

                <h3 className="text-base font-bold font-space text-[#343C6A] mt-3">
                  {c.name}
                </h3>
                <p className="text-xs text-[#718EBF] font-mono mt-0.5">PAN: {c.pan}</p>

                <div className="mt-4 p-3 bg-[#F5F7FA] rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#718EBF]">Direct Net Worth:</span>
                    <span className="font-bold text-[#343C6A]">{c.netWorth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718EBF]">Annual Drag Eliminated:</span>
                    <span className="font-bold text-emerald-600">{c.dragSaved}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0F4F8] flex items-center justify-between">
                <button
                  onClick={() => handlePrint(c)}
                  className="w-full py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <Printer size={16} weight="bold" />
                  <span>Generate & Print Dossier</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
