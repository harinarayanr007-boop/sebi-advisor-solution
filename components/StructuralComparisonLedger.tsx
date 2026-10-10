import React from "react";
import { Scale, CheckCircle2, XCircle, ShieldCheck, AlertTriangle } from "lucide-react";

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
    fiduciaryProtection: "Enforceable standard of undivided loyalty under SEBI tribunal jurisdiction.",
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
    fiduciaryProtection: "Identical underlying securities at the lowest statutory expense ratios.",
  },
  {
    dimension: "Demat Custody & Control",
    sebiReference: "Regulation 19(2)",
    commercialDistributor: "Frequently demand discretionary Power of Attorney (POA) or lock clients into proprietary broker apps.",
    commercialRisk: "Custodial lock-in; high friction when transferring portfolios away.",
    fiduciaryRIA: "100% account custody maintained directly by client in their own Demat. Zero POA demanded or accepted.",
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
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.06)] relative overflow-hidden text-slate-800">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <Scale className="h-3.5 w-3.5 text-slate-900" />
          <span>Statutory Comparative Forensics • SEBI Circular 2012/21</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
          The Structural Divide in Indian Wealth Management
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Examine the legal, economic, and custodial differences between commercial distributor desks and an independent SEBI Registered Investment Adviser.
        </p>
      </div>

      {/* Comparison Deed / Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        {/* Table Column Headers */}
        <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
          <div className="col-span-12 md:col-span-3 text-slate-900">
            Regulatory Dimension
          </div>
          <div className="col-span-12 md:col-span-4 text-rose-700 flex items-center mt-2 md:mt-0">
            <XCircle className="h-4 w-4 mr-1.5 shrink-0 text-rose-500" />
            <span>Bank Wealth Desks / Distributors</span>
          </div>
          <div className="col-span-12 md:col-span-5 text-emerald-800 flex items-center mt-2 md:mt-0">
            <CheckCircle2 className="h-4 w-4 mr-1.5 shrink-0 text-emerald-600" />
            <span>Aurum Fiduciary (Registered RIA)</span>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 text-xs">
          {comparisonMatrix.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 p-4 sm:p-5 gap-3 sm:gap-4 hover:bg-slate-50/50 transition-colors items-start"
            >
              {/* Dimension column */}
              <div className="col-span-12 md:col-span-3 space-y-1">
                <span className="text-sm text-slate-900 font-bold block">
                  {row.dimension}
                </span>
                <span className="text-[11px] font-mono text-slate-500 block">
                  {row.sebiReference}
                </span>
              </div>

              {/* Commercial Distributor column */}
              <div className="col-span-12 md:col-span-4 p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 text-slate-700 leading-relaxed space-y-1.5">
                <div className="flex items-center space-x-1.5 text-rose-700 text-[11px] uppercase font-bold">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Commercial Distribution</span>
                </div>
                <p className="text-xs text-slate-600">{row.commercialDistributor}</p>
                <div className="text-[11px] text-rose-600 font-medium pt-1 border-t border-rose-100">
                  Risk: {row.commercialRisk}
                </div>
              </div>

              {/* Fiduciary RIA column */}
              <div className="col-span-12 md:col-span-5 p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-100 text-slate-800 leading-relaxed space-y-1.5">
                <div className="flex items-center space-x-1.5 text-emerald-800 text-[11px] uppercase font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Pure Fiduciary Mandate</span>
                </div>
                <p className="text-xs text-slate-800 font-medium">{row.fiduciaryRIA}</p>
                <div className="text-[11px] text-emerald-700 font-semibold pt-1 border-t border-emerald-100">
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
