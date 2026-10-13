"use client";

import React from "react";
import {
  ShieldCheck,
  FileCheck,
  Scale,
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
} from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function AdvisorCompliancePage() {
  const { advisor, clients } = useFiduciary();

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
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Audited & Stamped</span>
              </span>
              <span className="text-[11px] text-[#718EBF]">
                {clients.length} Active Records Checked
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
