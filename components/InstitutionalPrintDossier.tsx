"use client";

import React from "react";
import {
  Printer,
  X,
  Buildings,
  ShieldCheck,
} from "@phosphor-icons/react";
import {
  ClientProfile,
  AdvisorProfile,
  HoldingAsset,
  FiduciaryGoal,
  CashFlowItem,
  InsurancePolicy,
  formatINR,
} from "@/lib/fiduciary-store";

interface DossierProps {
  client: ClientProfile;
  advisor: AdvisorProfile;
  assets: HoldingAsset[];
  goals: FiduciaryGoal[];
  cashFlow: CashFlowItem[];
  insurance: InsurancePolicy[];
  onClose: () => void;
}

export default function InstitutionalPrintDossier({
  client,
  advisor,
  assets,
  goals,
  cashFlow,
  insurance,
  onClose,
}: DossierProps) {
  // Calculations
  const totalAssetsVal = assets.reduce((sum, a) => sum + (Number(a.currentValue) || 0), 0);
  const netWorthDisplay = totalAssetsVal > 0 ? formatINR(totalAssetsVal) : (client.netWorth || "₹0");

  const equityHoldings = assets.filter(
    (a) => a.category.toLowerCase().includes("equity") || a.category.toLowerCase().includes("cap")
  );
  const equityVal = equityHoldings.reduce((sum, a) => sum + a.currentValue, 0);

  const debtHoldings = assets.filter(
    (a) => a.category.toLowerCase().includes("debt") || a.category.toLowerCase().includes("bond")
  );
  const debtVal = debtHoldings.reduce((sum, a) => sum + a.currentValue, 0);

  const otherHoldings = assets.filter(
    (a) => !equityHoldings.includes(a) && !debtHoldings.includes(a)
  );
  const otherVal = otherHoldings.reduce((sum, a) => sum + a.currentValue, 0);

  const totalInflows = cashFlow
    .filter((c) => c.type === "inflow")
    .reduce((sum, c) => sum + c.monthlyAmount, 0);
  const totalOutflows = cashFlow
    .filter((c) => c.type.startsWith("outflow"))
    .reduce((sum, c) => sum + c.monthlyAmount, 0);
  const netSurplus = totalInflows - totalOutflows;

  const totalGoalsCorpus = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalGoalsFunded = goals.reduce((sum, g) => sum + g.currentFunded, 0);

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";
  const reportRef = `REF-RIA15845-${client.pan || "PAN"}-${Date.now().toString().slice(-6)}`;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-6 overflow-y-auto font-sans">
      <div className="bg-white rounded-xl max-w-4xl w-full p-4 sm:p-8 max-h-[95vh] overflow-y-auto border border-slate-300 shadow-2xl relative my-auto">
        {/* On-screen Action Toolbar (Hidden during print) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 print:hidden">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Institutional Fiduciary Client Dossier
            </h2>
            <p className="text-xs text-slate-500">
              Raw statutory reporting format compliant with SEBI (Investment Advisers) Regulations, 2013.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 hover:bg-slate-800 transition shadow-sm"
            >
              <Printer size={16} weight="bold" />
              <span>Print Raw Document (Ctrl+P)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <X size={20} weight="bold" />
            </button>
          </div>
        </div>

        {/* ================= Printable Document Root ================= */}
        <div className="printable-dossier text-slate-900 text-xs leading-relaxed space-y-6">
          {/* Header Block */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-lg font-bold uppercase tracking-tight text-slate-950 font-serif">
                  {advisor.firmName}
                </h1>
                <p className="text-[11px] text-slate-700 font-mono mt-0.5">
                  SEBI Registered Investment Adviser: {advisor.sebiRegNumber} • BASL Membership: {advisor.baslMembership}
                </p>
                <p className="text-[10px] text-slate-500">
                  {advisor.officeAddress} • Phone: {advisor.phone} • Email: {advisor.email}
                </p>
              </div>
              <div className="text-right text-[10px] text-slate-600 font-mono">
                <div>REPORT REF: {reportRef}</div>
                <div>DATE: {timestamp}</div>
                <div>CLASSIFICATION: STRICTLY CONFIDENTIAL</div>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-200 text-center">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Statutory Fiduciary Audit & Comprehensive Portfolio Dossier
              </h2>
              <p className="text-[11px] text-slate-600">
                Prepared under Regulation 15, 17 & 19 of SEBI (Investment Advisers) Regulations, 2013
              </p>
            </div>
          </div>

          {/* Section 1: Investor Legal Identity & Registration */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              1. Investor Master Registration & KYC Identity
            </h3>
            <table className="w-full border-collapse border border-slate-300 text-[11px]">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 bg-slate-50 font-semibold w-1/4 border-r border-slate-300">Full Legal Name:</td>
                  <td className="p-2 font-bold w-1/4 border-r border-slate-300">{client.name}</td>
                  <td className="p-2 bg-slate-50 font-semibold w-1/4 border-r border-slate-300">Permanent Account Number (PAN):</td>
                  <td className="p-2 font-mono font-bold w-1/4">{client.pan}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Registered Email:</td>
                  <td className="p-2 font-mono border-r border-slate-300">{client.email}</td>
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Mobile Contact:</td>
                  <td className="p-2 font-mono">{client.phone}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Central KYC ID (CKYC):</td>
                  <td className="p-2 font-mono border-r border-slate-300">{client.ckycId}</td>
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Masked Aadhaar:</td>
                  <td className="p-2 font-mono">{client.aadhaarMasked}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Residential City / State:</td>
                  <td className="p-2 border-r border-slate-300">{client.city}</td>
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Advisory Tier:</td>
                  <td className="p-2 font-semibold">{client.tier}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Employer / Occupation:</td>
                  <td className="p-2 border-r border-slate-300">{client.employer} ({client.designation})</td>
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Gross Annual Inflow:</td>
                  <td className="p-2">{client.grossCtc}</td>
                </tr>
                <tr>
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Mandate Status:</td>
                  <td className="p-2 font-semibold border-r border-slate-300">{client.status || "Active Fiduciary Mandate"}</td>
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Onboarding Record Date:</td>
                  <td className="p-2 font-mono">{client.createdAt}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: Balance Sheet & Net Worth Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              2. Balance Sheet & Asset Allocation Summary
            </h3>
            <table className="w-full border-collapse border border-slate-300 text-[11px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-left">
                  <th className="p-2 border-r border-slate-300">Asset Class / Category</th>
                  <th className="p-2 border-r border-slate-300 text-right">Current Valuation (INR)</th>
                  <th className="p-2 border-r border-slate-300 text-right">Actual Allocation (%)</th>
                  <th className="p-2 border-r border-slate-300 text-right">Target Allocation (%)</th>
                  <th className="p-2 text-right">Variance (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold border-r border-slate-300">Equity & Balanced Funds</td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">₹{equityVal.toLocaleString("en-IN")}</td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">
                    {totalAssetsVal > 0 ? ((equityVal / totalAssetsVal) * 100).toFixed(1) : client.equityAlloc}%
                  </td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">{client.equityAlloc}%</td>
                  <td className="p-2 font-mono text-right">
                    {totalAssetsVal > 0 ? (((equityVal / totalAssetsVal) * 100) - client.equityAlloc).toFixed(1) : "0.0"}%
                  </td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold border-r border-slate-300">Fixed Income & Debt Securities</td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">₹{debtVal.toLocaleString("en-IN")}</td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">
                    {totalAssetsVal > 0 ? ((debtVal / totalAssetsVal) * 100).toFixed(1) : client.debtAlloc}%
                  </td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">{client.debtAlloc}%</td>
                  <td className="p-2 font-mono text-right">
                    {totalAssetsVal > 0 ? (((debtVal / totalAssetsVal) * 100) - client.debtAlloc).toFixed(1) : "0.0"}%
                  </td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-semibold border-r border-slate-300">Gold & Sovereign Bullion</td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">₹{otherVal.toLocaleString("en-IN")}</td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">
                    {totalAssetsVal > 0 ? ((otherVal / totalAssetsVal) * 100).toFixed(1) : client.goldAlloc}%
                  </td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">{client.goldAlloc}%</td>
                  <td className="p-2 font-mono text-right">
                    {totalAssetsVal > 0 ? (((otherVal / totalAssetsVal) * 100) - client.goldAlloc).toFixed(1) : "0.0"}%
                  </td>
                </tr>
                <tr className="bg-slate-50 font-bold border-t-2 border-slate-400">
                  <td className="p-2 border-r border-slate-300 uppercase">Total Portfolio Net Worth</td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">{netWorthDisplay}</td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">100.0%</td>
                  <td className="p-2 font-mono text-right border-r border-slate-300">100.0%</td>
                  <td className="p-2 font-mono text-right">0.0%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3: Itemized Asset Holdings Register */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              3. Itemized Instrument Register & Direct Expense Audit
            </h3>
            {assets.length === 0 ? (
              <p className="text-slate-500 italic py-2">
                No active portfolio assets currently registered under this client master account.
              </p>
            ) : (
              <table className="w-full border-collapse border border-slate-300 text-[10px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-left">
                    <th className="p-1.5 border-r border-slate-300">Folio Number</th>
                    <th className="p-1.5 border-r border-slate-300">Scheme / Instrument Description</th>
                    <th className="p-1.5 border-r border-slate-300">Category</th>
                    <th className="p-1.5 border-r border-slate-300 font-mono">ISIN</th>
                    <th className="p-1.5 border-r border-slate-300 text-right">Direct TER</th>
                    <th className="p-1.5 border-r border-slate-300 text-right">Current Value (INR)</th>
                    <th className="p-1.5 text-right">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((a, idx) => (
                    <tr key={a.id || idx} className="border-b border-slate-200">
                      <td className="p-1.5 font-mono border-r border-slate-300">{a.folio}</td>
                      <td className="p-1.5 font-semibold border-r border-slate-300">{a.name}</td>
                      <td className="p-1.5 border-r border-slate-300">{a.category}</td>
                      <td className="p-1.5 font-mono border-r border-slate-300">{a.isin}</td>
                      <td className="p-1.5 font-mono text-right border-r border-slate-300">{a.directExpenseRatio}</td>
                      <td className="p-1.5 font-mono font-bold text-right border-r border-slate-300">
                        ₹{a.currentValue.toLocaleString("en-IN")}
                      </td>
                      <td className="p-1.5 font-mono text-right">
                        {totalAssetsVal > 0 ? ((a.currentValue / totalAssetsVal) * 100).toFixed(1) : a.allocationPercent}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-400">
                    <td colSpan={5} className="p-1.5 border-r border-slate-300 uppercase text-right">
                      Total Direct Assets Value:
                    </td>
                    <td className="p-1.5 font-mono text-right border-r border-slate-300">
                      ₹{totalAssetsVal.toLocaleString("en-IN")}
                    </td>
                    <td className="p-1.5 font-mono text-right">100.0%</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* Section 4: Financial Goals & Actuarial Funding Schedule */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              4. Financial Goals & Funding Liability Schedule
            </h3>
            {goals.length === 0 ? (
              <p className="text-slate-500 italic py-2">
                No financial goals currently catalogued for this client account.
              </p>
            ) : (
              <table className="w-full border-collapse border border-slate-300 text-[10px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-left">
                    <th className="p-1.5 border-r border-slate-300">Goal Description</th>
                    <th className="p-1.5 border-r border-slate-300">Category</th>
                    <th className="p-1.5 border-r border-slate-300 text-center">Target Year</th>
                    <th className="p-1.5 border-r border-slate-300 text-right">Target Amount</th>
                    <th className="p-1.5 border-r border-slate-300 text-right">Funded Amount</th>
                    <th className="p-1.5 border-r border-slate-300 text-right">Funding Gap</th>
                    <th className="p-1.5 border-r border-slate-300 text-right">Monthly SIP</th>
                    <th className="p-1.5 text-right">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {goals.map((g, idx) => {
                    const gap = Math.max(0, g.targetAmount - g.currentFunded);
                    return (
                      <tr key={g.id || idx} className="border-b border-slate-200">
                        <td className="p-1.5 font-semibold border-r border-slate-300">{g.title}</td>
                        <td className="p-1.5 border-r border-slate-300">{g.category}</td>
                        <td className="p-1.5 font-mono text-center border-r border-slate-300">{g.targetYear}</td>
                        <td className="p-1.5 font-mono text-right border-r border-slate-300">
                          ₹{g.targetAmount.toLocaleString("en-IN")}
                        </td>
                        <td className="p-1.5 font-mono text-right border-r border-slate-300">
                          ₹{g.currentFunded.toLocaleString("en-IN")}
                        </td>
                        <td className="p-1.5 font-mono text-right border-r border-slate-300">
                          ₹{gap.toLocaleString("en-IN")}
                        </td>
                        <td className="p-1.5 font-mono text-right border-r border-slate-300">
                          ₹{g.monthlySip.toLocaleString("en-IN")}
                        </td>
                        <td className="p-1.5 font-mono font-bold text-right">{g.probabilityPercent}%</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-400">
                    <td colSpan={3} className="p-1.5 border-r border-slate-300 uppercase text-right">
                      Total Goals Corpus:
                    </td>
                    <td className="p-1.5 font-mono text-right border-r border-slate-300">
                      ₹{totalGoalsCorpus.toLocaleString("en-IN")}
                    </td>
                    <td className="p-1.5 font-mono text-right border-r border-slate-300">
                      ₹{totalGoalsFunded.toLocaleString("en-IN")}
                    </td>
                    <td className="p-1.5 font-mono text-right border-r border-slate-300">
                      ₹{Math.max(0, totalGoalsCorpus - totalGoalsFunded).toLocaleString("en-IN")}
                    </td>
                    <td colSpan={2} className="p-1.5 text-right font-mono text-slate-500">
                      Actuarially Modeled
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* Section 5: Risk Suitability Assessment (SEBI Regulation 17) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              5. SEBI Regulation 17 Risk Suitability Assessment
            </h3>
            <table className="w-full border-collapse border border-slate-300 text-[11px] mb-2">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 bg-slate-50 font-semibold w-1/4 border-r border-slate-300">Risk Tolerance Category:</td>
                  <td className="p-2 font-bold w-1/4 border-r border-slate-300">{client.riskTolerance || "Balanced Strategic Growth"}</td>
                  <td className="p-2 bg-slate-50 font-semibold w-1/4 border-r border-slate-300">Target Portfolio Hurdle Rate:</td>
                  <td className="p-2 font-bold w-1/4">{client.targetCAGR || "11.5% CAGR"}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Maximum Drawdown Capacity:</td>
                  <td className="p-2 font-mono border-r border-slate-300">-18.5% peak-to-trough</td>
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Investment Time Horizon:</td>
                  <td className="p-2 font-mono">7+ Years (Long Term)</td>
                </tr>
              </tbody>
            </table>
            <div className="p-2.5 border border-slate-300 bg-slate-50 text-[11px] text-slate-800 leading-relaxed">
              <strong>Fiduciary Assessment:</strong> {client.advisorNotes || "Client evaluated under SEBI Regulation 17 suitability criteria. Allocation strictly matches investor risk profile and capacity."}
            </div>
          </div>

          {/* Section 6: Insurance & Protection Register */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              6. Protection & Risk Mitigation Register
            </h3>
            {insurance.length === 0 ? (
              <p className="text-slate-500 italic py-2">
                No insurance policies currently on record. Complete insurance audit recommended.
              </p>
            ) : (
              <table className="w-full border-collapse border border-slate-300 text-[10px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-left">
                    <th className="p-1.5 border-r border-slate-300">Policy Description</th>
                    <th className="p-1.5 border-r border-slate-300">Insurance Provider</th>
                    <th className="p-1.5 border-r border-slate-300">Policy Classification</th>
                    <th className="p-1.5 border-r border-slate-300 text-right">Sum Assured</th>
                    <th className="p-1.5 border-r border-slate-300 text-right">Annual Premium Outflow</th>
                    <th className="p-1.5 text-right">Audit Status</th>
                  </tr>
                </thead>
                <tbody>
                  {insurance.map((p, idx) => (
                    <tr key={p.id || idx} className="border-b border-slate-200">
                      <td className="p-1.5 font-semibold border-r border-slate-300">{p.title}</td>
                      <td className="p-1.5 border-r border-slate-300">{p.provider}</td>
                      <td className="p-1.5 border-r border-slate-300 font-mono uppercase">{p.type}</td>
                      <td className="p-1.5 font-mono text-right border-r border-slate-300">{p.sumAssured}</td>
                      <td className="p-1.5 font-mono text-right border-r border-slate-300">{p.annualPremium}</td>
                      <td className="p-1.5 text-right font-medium">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Section 7: Monthly Cashflow & Liquidity Runway */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              7. Monthly Cashflow & Emergency Liquidity Runway
            </h3>
            <table className="w-full border-collapse border border-slate-300 text-[11px]">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 bg-slate-50 font-semibold w-1/4 border-r border-slate-300">Total Monthly Inflows:</td>
                  <td className="p-2 font-mono font-bold w-1/4 border-r border-slate-300">
                    ₹{totalInflows > 0 ? totalInflows.toLocaleString("en-IN") : "To be verified"}
                  </td>
                  <td className="p-2 bg-slate-50 font-semibold w-1/4 border-r border-slate-300">Total Monthly Outflows:</td>
                  <td className="p-2 font-mono font-bold w-1/4">
                    ₹{totalOutflows > 0 ? totalOutflows.toLocaleString("en-IN") : "To be verified"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Net Investible Surplus:</td>
                  <td className="p-2 font-mono font-bold border-r border-slate-300">
                    {totalInflows > 0 ? `₹${netSurplus.toLocaleString("en-IN")}` : client.monthlySurplus}
                  </td>
                  <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Liquid Emergency Fund:</td>
                  <td className="p-2 font-mono font-bold">{client.liquidSurplus}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 8: Statutory Regulatory Declarations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1 mb-2 font-mono">
              8. Statutory Regulatory Terms & Dispute Redressal
            </h3>
            <div className="border border-slate-300 p-3 text-[10px] text-slate-700 space-y-1.5 leading-relaxed bg-slate-50">
              <p>
                <strong>Statutory Mandate:</strong> This dossier constitutes a formal fiduciary assessment under Regulation 15 and 17 of the Securities and Exchange Board of India (Investment Advisers) Regulations, 2013. Aurum Fiduciary Wealth Advisors operates strictly in a fiduciary capacity.
              </p>
              <p>
                <strong>Remuneration Disclosure:</strong> No commissions, trail distributions, referral fees, or third-party benefits are received from asset management companies, brokers, or insurers. Remuneration is derived solely from client-remitted advisory retainers.
              </p>
              <p>
                <strong>Grievance Mechanism:</strong> In case of unresolved queries, the investor may lodge grievances on the SEBI Complaints Redress System (SCORES) at https://scores.sebi.gov.in or through the SMART ODR Portal at https://smartodr.in.
              </p>
            </div>
          </div>

          {/* Section 9: Formal Signatures & Attestation */}
          <div className="pt-6 border-t-2 border-slate-900 mt-6">
            <div className="grid grid-cols-2 gap-8 text-[11px]">
              <div className="space-y-4">
                <div className="h-10 border-b border-slate-400 flex items-end font-serif italic text-slate-700">
                  Devendra Vora, CFP
                </div>
                <div>
                  <div className="font-bold uppercase text-slate-900">For {advisor.firmName}</div>
                  <div className="text-slate-600">Principal Officer & Licensed RIA</div>
                  <div className="text-[10px] text-slate-500 font-mono">SEBI Registration No: {advisor.sebiRegNumber}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Date: {new Date().toLocaleDateString("en-IN")}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-10 border-b border-slate-400 flex items-end font-serif italic text-slate-700">
                  {client.name}
                </div>
                <div>
                  <div className="font-bold uppercase text-slate-900">Client / Investor Acknowledgment</div>
                  <div className="text-slate-600">PAN: {client.pan}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Status: Acknowledged & Received</div>
                  <div className="text-[10px] text-slate-500 font-mono">Date: {new Date().toLocaleDateString("en-IN")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
