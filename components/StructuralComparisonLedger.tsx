import React from "react";
import { Scale, CheckCircle2, XCircle, ShieldCheck, Landmark, FileText, AlertTriangle } from "lucide-react";

interface ComparisonRow {
  dimension: string;
  sebiReference: string;
  commercialDistributor: string;
  commercialRisk: string;
  fiduciaryRIA: string;
  fiduciaryProtection: string;
}

const comparisonMatrix: ComparisonRow[] = [
  {
    dimension: "Statutory Standard of Care",
    sebiReference: "Regulation 15(1)",
    commercialDistributor: "Commercial Caveat Emptor (Buyer Beware). No legal duty to prioritize client wealth longevity.",
    commercialRisk: "Distributor legally represents product manufacturers, not the investor.",
    fiduciaryRIA: "Strict Fiduciary Duty. Legally bound by SEBI statutory oath to act solely in the client's best financial interest.",
    fiduciaryProtection: "Legally enforceable standard of undivided loyalty under SEBI tribunal jurisdiction.",
  },
  {
    dimension: "Revenue & Remuneration Source",
    sebiReference: "Regulation 15(2)",
    commercialDistributor: "Covert trailing commissions siphoned daily from fund NAVs (0.75%–1.75% p.a.) without client invoices.",
    commercialRisk: "Incentivized to recommend high-commission products regardless of tax efficiency.",
    fiduciaryRIA: "100% Client-Invoiced Fee Only. Zero kickbacks, zero brokerage sharing, zero AMC trailer revenues.",
    fiduciaryProtection: "Complete economic alignment. Advisor earns nothing from product transactions.",
  },
  {
    dimension: "Product Architecture & Direct Plans",
    sebiReference: "SEBI Circular 2012/21",
    commercialDistributor: "High-expense Regular Plans, distributor-sponsored PMS, and upfront-commission structured notes.",
    commercialRisk: "1.25% annual fee drag compounds into massive portfolio capital erosion over time.",
    fiduciaryRIA: "Exclusively Direct Mutual Funds, Sovereign Gold Bonds, Primary G-Secs, and Direct Equities.",
    fiduciaryProtection: "Identical underlying securities at the lowest legal statutory expense ratios.",
  },
  {
    dimension: "Demat Custody & Control",
    sebiReference: "Regulation 19(2)",
    commercialDistributor: "Frequently demand discretionary Power of Attorney (POA) or lock clients into proprietary broker apps.",
    commercialRisk: "Custodial lock-in; high friction when transferring portfolios away.",
    fiduciaryRIA: "100% account custody maintained directly by client in their own demat. Zero POA demanded or accepted.",
    fiduciaryProtection: "Client holds the keys. Every trade requires client biometric or OTP authorization.",
  },
  {
    dimension: "Fee Collection Safeguards",
    sebiReference: "CeFCoM Circular 2024/78",
    commercialDistributor: "Deducted invisibly from daily portfolio net asset value without transparent billing.",
    commercialRisk: "Investors cannot audit the exact rupee quantum extracted in trailing fees.",
    fiduciaryRIA: "Processed exclusively via BSE / MFU Centralized Escrow (CeFCoM) under BASL supervision.",
    fiduciaryProtection: "Statutory escrow protects client from unauthorized debits with audited receipts.",
  },
  {
    dimension: "Supervisory Redressal Mechanism",
    sebiReference: "SEBI IA Regulations",
    commercialDistributor: "Disputes treated as sales grievances with internal commercial arbitration desks.",
    commercialRisk: "Bank legal teams prioritize protecting corporate commission flows.",
    fiduciaryRIA: "Direct statutory supervisory oversight under SEBI SCORES 2.0 and SMART Online Dispute Resolution.",
    fiduciaryProtection: "Government regulatory ombudsman with statutory penalty enforcement powers.",
  },
];

export default function StructuralComparisonLedger() {
  return (
    <div className="architectural-panel p-6 sm:p-10 shadow-2xl relative overflow-hidden text-slate-100">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D8BD80]">
          <Scale className="h-4 w-4 text-[#BE9A48]" />
          <span>Statutory Comparative Forensics // SEBI Circular 2012/21</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl text-slate-50 font-normal">
          The Structural Divide in Indian Wealth Management
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Examine the legal, economic, and custodial differences between commercial distributor desks and an independent SEBI Registered Investment Adviser.
        </p>
      </div>

      {/* Comparison Deed / Table */}
      <div className="rounded-sm border border-slate-800 bg-[#040915] overflow-hidden shadow-inner">
        {/* Table Column Headers */}
        <div className="grid grid-cols-12 bg-[#081022] border-b border-slate-800 p-4 text-xs font-mono uppercase tracking-wider text-slate-400">
          <div className="col-span-12 md:col-span-3 text-slate-300 font-bold">
            Regulatory Dimension
          </div>
          <div className="col-span-12 md:col-span-4 text-rose-400 flex items-center mt-2 md:mt-0 font-semibold">
            <XCircle className="h-4 w-4 mr-1.5 shrink-0" />
            <span>Bank Wealth Desks / Distributors</span>
          </div>
          <div className="col-span-12 md:col-span-5 text-[#D8BD80] flex items-center mt-2 md:mt-0 font-semibold">
            <CheckCircle2 className="h-4 w-4 mr-1.5 shrink-0 text-[#BE9A48]" />
            <span>Aurum Fiduciary (Registered RIA)</span>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-800/80 text-xs font-sans">
          {comparisonMatrix.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 p-4 sm:p-5 gap-3 sm:gap-4 hover:bg-[#060c1c] transition-colors items-start"
            >
              {/* Dimension column */}
              <div className="col-span-12 md:col-span-3 space-y-1">
                <span className="font-serif text-sm text-slate-100 font-medium block">
                  {row.dimension}
                </span>
                <span className="text-[10px] font-mono text-[#D8BD80] block">
                  {row.sebiReference}
                </span>
              </div>

              {/* Commercial Distributor column */}
              <div className="col-span-12 md:col-span-4 p-3.5 rounded-sm bg-[#18090f] border border-rose-900/30 text-slate-300 leading-relaxed space-y-1.5">
                <div className="flex items-center space-x-1.5 text-rose-400 font-mono text-[10px] uppercase font-bold">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Commercial Distribution</span>
                </div>
                <p className="text-xs text-slate-300">{row.commercialDistributor}</p>
                <div className="text-[10px] text-rose-300/80 font-mono pt-1 border-t border-rose-950">
                  Risk: {row.commercialRisk}
                </div>
              </div>

              {/* Fiduciary RIA column */}
              <div className="col-span-12 md:col-span-5 p-3.5 rounded-sm bg-[#0a1730] border border-[#BE9A48]/35 text-slate-200 leading-relaxed space-y-1.5">
                <div className="flex items-center space-x-1.5 text-[#D8BD80] font-mono text-[10px] uppercase font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Pure Fiduciary Mandate</span>
                </div>
                <p className="text-xs text-slate-100 font-medium">{row.fiduciaryRIA}</p>
                <div className="text-[10px] text-emerald-300 font-mono pt-1 border-t border-[#BE9A48]/20">
                  Protection: {row.fiduciaryProtection}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
