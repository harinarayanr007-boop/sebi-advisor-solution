"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function AdvisorCompliancePage() {
  const { advisor, clients, auditLogs } = useFiduciary();

  const auditItems = [
    {
      title: "SEBI Form B Fiduciary Indenture Execution",
      regulation: "Regulation 19(1)(d) - SEBI (Investment Advisers) Regulations, 2013",
      status: "100% Compliant",
      description: "Statutory client agreements signed with mandatory clauses on conflict of interest, zero distribution commissions, and fee capping.",
      badge: "bg-emerald-100 text-emerald-800",
    },
    {
      title: "Risk Profiling & Suitability Diagnostic Logs",
      regulation: "Regulation 17 - Suitability Standards",
      status: "Active & Recorded",
      description: "Mandatory 4-pillar risk tolerance profiling completed prior to issuing investment advice or rebalancing recommendations.",
      badge: "bg-emerald-100 text-emerald-800",
    },
    {
      title: "CeFCoM Fee Collection Mechanism Reconciliations",
      regulation: "SEBI Mandated Escrow Mechanism",
      status: "Reconciled Daily",
      description: "All client advisory fees collected strictly through validated banking channels under URN escrow with 0% cash or third-party handling.",
      badge: "bg-emerald-100 text-emerald-800",
    },
    {
      title: "Zero Commission & Conflict of Interest Certification",
      regulation: "Regulation 15(1) - Prohibition of Distribution Fees",
      status: "100% Verified",
      description: "Certified zero distributor commission, trail fees, or brokerage kickbacks accepted from any Asset Management Company or broker.",
      badge: "bg-emerald-100 text-emerald-800",
    },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-bold font-space text-[#343C6A]">
          SEBI Statutory Compliance & Audit Trail
        </h2>
        <p className="text-xs text-[#718EBF]">
          Regulatory oversight dashboard under SEBI (Investment Advisers) Regulations, 2013.
        </p>
      </div>

      {/* License Banner */}
      <div className="bg-[#343C6A] text-white rounded-[25px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            Registered Investment Adviser License
          </span>
          <h3 className="text-xl font-bold font-space">
            {advisor.firmName} ({advisor.sebiRegNumber})
          </h3>
          <p className="text-xs text-slate-300">
            BASL Member: {advisor.baslMembership} • Registered Office: {advisor.officeAddress}
          </p>
        </div>
        <div className="shrink-0 bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-center">
          <span className="text-[10px] text-slate-300 block uppercase font-bold">Audit Status</span>
          <span className="text-sm font-bold font-space text-emerald-400">Zero Deficiency</span>
        </div>
      </div>

      {/* Compliance Log Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auditItems.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${item.badge}`}>
                  {item.status}
                </span>
                <span className="text-[10px] text-[#718EBF] font-mono">SEBI 2013</span>
              </div>

              <h3 className="text-base font-bold font-space text-[#343C6A] mt-3">
                {item.title}
              </h3>
              <p className="text-[11px] font-mono text-[#1814F3] mt-0.5">{item.regulation}</p>

              <p className="text-xs text-[#718EBF] mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#F0F4F8] flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-bold flex items-center space-x-1 text-[11px]">
                <CheckCircle size={16} weight="fill" />
                <span>Audited & Stamped</span>
              </span>
              <span className="text-[11px] text-[#718EBF]">
                {clients.length} Active Records Checked
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Live SEBI Regulation 19 Audit Register */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#F0F4F8] pb-4">
          <div>
            <h3 className="text-base font-bold font-space text-[#343C6A]">
              Statutory SEBI Audit Register (Regulation 19)
            </h3>
            <p className="text-xs text-[#718EBF]">
              Immutable event log of client onboarding, suitability diagnostics, and portfolio changes.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-blue-50 text-[#1814F3] border border-blue-200 px-3 py-1 rounded-full">
            {auditLogs.length} Cryptographic Events Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F0F4F8] text-[#718EBF] uppercase font-bold text-[10px] tracking-wider">
                <th className="py-3 px-3">Timestamp (IST)</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Actor / Entity</th>
                <th className="py-3 px-3">Action Performed</th>
                <th className="py-3 px-3">Details & Parameters</th>
                <th className="py-3 px-3 text-right">Integrity Seal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4F8]">
              {auditLogs.map((log) => {
                const categoryColors: Record<string, string> = {
                  SECURITY: "bg-purple-100 text-purple-800",
                  SUITABILITY: "bg-amber-100 text-amber-800",
                  KYC: "bg-blue-100 text-blue-800",
                  PORTFOLIO: "bg-emerald-100 text-emerald-800",
                  CEFCOM: "bg-teal-100 text-teal-800",
                  AGREEMENT: "bg-indigo-100 text-indigo-800",
                };
                return (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-mono text-[11px] text-[#718EBF] whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${categoryColors[log.category] || "bg-slate-100 text-slate-700"}`}>
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-[#343C6A]">{log.actorName}</div>
                      <div className="text-[10px] text-[#718EBF] font-mono">{log.actorRole}</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-[#343C6A]">
                      {log.action}
                    </td>
                    <td className="py-3 px-3 text-[#718EBF] text-[11px] max-w-xs truncate" title={log.details}>
                      {log.details}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center space-x-1 text-emerald-600 font-mono text-[10px] font-bold">
                        <CheckCircle size={14} weight="fill" />
                        <span>SHA-256</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
