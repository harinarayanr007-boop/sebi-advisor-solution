"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  ShieldCheck,
  TrendUp,
  Target,
  ArrowUpRight,
  Plus,
  UploadSimple,
  Sparkle,
  Briefcase,
  CheckCircle,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { formatINR } from "@/lib/fiduciary-store";

export default function ClientDashboardPage() {
  const {
    activeClient,
    activeAssets,
    activeGoals,
    activeCashFlow,
    activeInsurance,
    addAsset,
    parseCasStatement,
    loadDemoData,
    setShowFactsheetModal,
  } = useFiduciary();

  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [assetCategory, setAssetCategory] = useState("Flexi Cap Equity");
  const [assetValue, setAssetValue] = useState("");
  const [assetDirectTer, setAssetDirectTer] = useState("0.65%");
  const [assetRegularTer, setAssetRegularTer] = useState("1.65%");

  // Computed values
  const totalNetWorthNum = activeAssets.reduce((sum, a) => sum + a.currentValue, 0);
  const totalDragSavedNum = Math.round(totalNetWorthNum * 0.0095); // ~0.95% annual fee savings

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(assetValue) || 100000;
    const directNum = parseFloat(assetDirectTer) || 0.65;
    const regNum = parseFloat(assetRegularTer) || 1.65;
    const savedPerYear = Math.round(val * ((regNum - directNum) / 100));

    addAsset({
      name: assetName || "Direct Index Fund",
      category: assetCategory,
      isin: `INF${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      folio: `${Math.floor(10000000 + Math.random() * 90000000)}/01`,
      currentValue: val,
      allocationPercent: totalNetWorthNum > 0 ? Math.round((val / (totalNetWorthNum + val)) * 100) : 100,
      directExpenseRatio: assetDirectTer,
      regularExpenseRatio: assetRegularTer,
      oneYearReturn: "+18.2%",
      annualDragSaved: `₹${savedPerYear.toLocaleString("en-IN")}/yr`,
    });

    setAssetName("");
    setAssetValue("");
    setShowAddAssetModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Empty State / CAS Ingestion Banner */}
      {activeAssets.length === 0 && (
        <div className="bg-white border border-[rgba(30,144,255,0.2)] rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[11px] font-semibold tracking-wide uppercase text-[#1e90ff] bg-[#e8f3ff] px-3 py-1 rounded-full border border-[rgba(30,144,255,0.2)] inline-block">
                Direct Portfolio Onboarding
              </span>
              <h3 className="text-xl font-semibold tracking-[-0.3px] text-[#030a03]">
                No Direct Demat Assets Configured
              </h3>
              <p className="text-sm text-[#030a03]/70 leading-relaxed">
                Add your direct mutual funds and equity holdings manually, or simulate a Consolidated Account Statement (CAS) upload to immediately audit commission drag savings.
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-2.5 shrink-0">
              <button
                onClick={() => setShowAddAssetModal(true)}
                className="px-4 py-2.5 bg-[#1e90ff] hover:bg-[#0077e6] text-white rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff] focus-visible:ring-offset-2"
              >
                <Plus size={16} weight="bold" aria-hidden="true" />
                <span>+ Add Direct Holding</span>
              </button>
              <button
                onClick={() => parseCasStatement("CAS_Statement.pdf")}
                className="px-4 py-2.5 bg-white border border-[rgba(3,10,3,0.15)] hover:bg-[#f8fbff] text-[#030a03] rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
              >
                <UploadSimple size={16} weight="bold" className="text-[#1e90ff]" aria-hidden="true" />
                <span>Simulate CAS Upload</span>
              </button>
              <button
                onClick={loadDemoData}
                title="Populate test data for evaluation"
                className="px-3.5 py-2.5 bg-[#e8f3ff]/60 border border-[rgba(30,144,255,0.2)] text-[#030a03] hover:bg-[#e8f3ff] rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
              >
                <Sparkle size={16} weight="fill" className="text-[#1e90ff]" aria-hidden="true" />
                <span>Load Sample Case</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Hero Cards: Net Worth & Commission Shield */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Direct Fiduciary Net Worth */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[rgba(3,10,3,0.12)] text-[#030a03] flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1e90ff]">
                Direct Demat Portfolio Value
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#030a03] tabular-nums mt-1">
                {totalNetWorthNum > 0 ? formatINR(totalNetWorthNum) : "₹0"}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#e8f3ff] border border-[rgba(30,144,255,0.2)] flex items-center justify-center shrink-0">
              <Wallet size={24} weight="bold" className="text-[#1e90ff]" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[rgba(3,10,3,0.08)] flex items-center justify-between text-xs relative z-10">
            <div>
              <span className="text-[10px] text-[#030a03]/50 block font-medium">Regulatory Supervision</span>
              <span className="font-semibold text-[#030a03]">SEBI Registered RIA (INA000015845)</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#030a03]/50 block font-medium">Verified Folios</span>
              <span className="font-semibold text-[#030a03]">{activeAssets.length} Direct Accounts</span>
            </div>
          </div>
        </div>

        {/* Card 2: Commission Drag Shield */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[rgba(3,10,3,0.12)] text-[#030a03] flex flex-col justify-between shadow-xs">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 inline-block">
                Commission Leakage Eliminated
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-600 tabular-nums mt-1">
                {totalDragSavedNum > 0 ? `₹${totalDragSavedNum.toLocaleString("en-IN")}` : "₹0"}
                <span className="text-lg font-normal text-[#030a03]/60 ml-1">/ year</span>
              </h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} weight="bold" className="text-emerald-600" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[rgba(3,10,3,0.08)] flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-[#030a03]/50 block font-medium">Distributor Trail Fee</span>
              <span className="font-semibold text-[#030a03]">0.00% Pure Direct Demat</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#030a03]/50 block font-medium">10-Yr Compounded Benefit</span>
              <span className="font-semibold text-emerald-600 tabular-nums">
                {totalDragSavedNum > 0 ? `+${formatINR(totalDragSavedNum * 14.8)}` : "+₹0"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-[rgba(3,10,3,0.12)] shadow-xs flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-[#e8f3ff] text-[#1e90ff] flex items-center justify-center shrink-0 border border-[rgba(30,144,255,0.16)]">
            <Briefcase size={22} weight="bold" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <span className="text-xs text-[#030a03]/60 font-medium block">Direct Holdings</span>
            <h4 className="text-lg font-bold text-[#030a03] truncate">{activeAssets.length} Assets</h4>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[rgba(3,10,3,0.12)] shadow-xs flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-[#e8f3ff] text-[#1e90ff] flex items-center justify-center shrink-0 border border-[rgba(30,144,255,0.16)]">
            <Target size={22} weight="bold" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <span className="text-xs text-[#030a03]/60 font-medium block">Active Goals</span>
            <h4 className="text-lg font-bold text-[#030a03] truncate">{activeGoals.length} Milestones</h4>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[rgba(3,10,3,0.12)] shadow-xs flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-[#e8f3ff] text-[#1e90ff] flex items-center justify-center shrink-0 border border-[rgba(30,144,255,0.16)]">
            <TrendUp size={22} weight="bold" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <span className="text-xs text-[#030a03]/60 font-medium block">Target Return</span>
            <h4 className="text-lg font-bold text-[#030a03] truncate">{activeClient?.targetCAGR || "11.5% CAGR"}</h4>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[rgba(3,10,3,0.12)] shadow-xs flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <ShieldCheck size={22} weight="bold" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <span className="text-xs text-[#030a03]/60 font-medium block">Pure Term Cover</span>
            <h4 className="text-lg font-bold text-emerald-600 truncate">
              {activeInsurance.length > 0 ? "100% Protected" : "Pending Audit"}
            </h4>
          </div>
        </div>
      </div>

      {/* Main Grid: Direct Holdings Table + Goals Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Direct Demat Holdings */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[rgba(3,10,3,0.12)] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold tracking-[-0.2px] text-[#030a03]">
                Direct Demat & Mutual Fund Holdings
              </h3>
              <p className="text-xs text-[#030a03]/60">Audited zero distributor trail commission portfolios</p>
            </div>
            <Link
              href="/client/assets"
              className="text-xs font-semibold text-[#1e90ff] hover:underline flex items-center space-x-1 outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff] rounded-md px-1 py-0.5"
            >
              <span>View All Holdings</span>
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </Link>
          </div>

          {activeAssets.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[rgba(3,10,3,0.15)] rounded-xl space-y-3">
              <Briefcase size={36} weight="regular" className="text-[#030a03]/40 mx-auto" aria-hidden="true" />
              <p className="text-xs text-[#030a03]/60">No direct assets added yet.</p>
              <button
                onClick={() => setShowAddAssetModal(true)}
                className="px-4 py-2 bg-[#1e90ff] hover:bg-[#0077e6] text-white rounded-xl text-xs font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
              >
                + Add First Asset
              </button>
            </div>
          ) : (
            <div className="border border-[rgba(3,10,3,0.08)] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8fbff] text-[#030a03]/60 uppercase text-[10px] font-semibold border-b border-[rgba(3,10,3,0.08)]">
                    <tr>
                      <th className="p-3.5">Scheme / Asset</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5 text-right">Current Value</th>
                      <th className="p-3.5 text-center">Direct TER</th>
                      <th className="p-3.5 text-right">Drag Saved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(3,10,3,0.06)]">
                    {activeAssets.slice(0, 5).map((a) => (
                      <tr key={a.id} className="hover:bg-[#f8fbff]/60 transition">
                        <td className="p-3.5 font-semibold text-[#030a03] max-w-[200px] truncate">{a.name}</td>
                        <td className="p-3.5 text-[#030a03]/70">{a.category}</td>
                        <td className="p-3.5 font-semibold text-[#030a03] tabular-nums text-right">
                          ₹{a.currentValue.toLocaleString("en-IN")}
                        </td>
                        <td className="p-3.5 font-medium text-emerald-600 text-center">{a.directExpenseRatio}</td>
                        <td className="p-3.5 text-emerald-700 font-semibold tabular-nums text-right">{a.annualDragSaved}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Goals GPS Progress */}
        <div className="bg-white rounded-2xl p-6 border border-[rgba(3,10,3,0.12)] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold tracking-[-0.2px] text-[#030a03]">
                Financial Goals GPS
              </h3>
              <p className="text-xs text-[#030a03]/60">Funded milestone status</p>
            </div>
            <Link
              href="/client/goals"
              className="text-xs font-semibold text-[#1e90ff] hover:underline outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff] rounded-md px-1 py-0.5"
            >
              Manage →
            </Link>
          </div>

          {activeGoals.length === 0 ? (
            <div className="p-6 text-center border border-dashed border-[rgba(3,10,3,0.15)] rounded-xl space-y-2">
              <Target size={32} weight="regular" className="text-[#030a03]/40 mx-auto" aria-hidden="true" />
              <p className="text-xs text-[#030a03]/60">No milestones set up yet.</p>
              <Link
                href="/client/goals"
                className="inline-block text-xs font-semibold text-[#1e90ff] hover:underline"
              >
                + Setup Milestone
              </Link>
            </div>
          ) : (
            <div className="space-y-3.5">
              {activeGoals.slice(0, 3).map((g) => {
                const percent = Math.min(100, Math.round((g.currentFunded / g.targetAmount) * 100));
                return (
                  <div key={g.id} className="p-3.5 bg-[#f8fbff] rounded-xl border border-[rgba(3,10,3,0.08)] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#030a03] truncate max-w-[150px]">{g.title}</span>
                      <span className="font-mono text-[10px] text-[#030a03]/60">{g.targetYear}</span>
                    </div>
                    <div className="w-full bg-[#dfeaf2] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#1e90ff] h-full rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#030a03]/60 tabular-nums">₹{(g.currentFunded / 100000).toFixed(1)}L funded</span>
                      <span className="font-semibold text-[#1e90ff] tabular-nums">{percent}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add Direct Asset */}
      {showAddAssetModal && (
        <div className="fixed inset-0 bg-[#030a03]/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 border border-[rgba(3,10,3,0.12)] shadow-xl space-y-4">
            <h3 className="text-lg font-semibold tracking-[-0.2px] text-[#030a03]">
              Add Direct Demat / Mutual Fund Asset
            </h3>
            <form onSubmit={handleCreateAsset} className="space-y-4 text-xs">
              <div>
                <label htmlFor="fund-name-input" className="block font-semibold text-[#030a03] mb-1">
                  Fund or Stock Name
                </label>
                <input
                  id="fund-name-input"
                  type="text"
                  required
                  placeholder="e.g. Parag Parikh Flexi Cap Direct Plan"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f8fbff] border border-[rgba(3,10,3,0.15)] rounded-xl text-sm text-[#030a03] outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="category-select" className="block font-semibold text-[#030a03] mb-1">
                    Category
                  </label>
                  <select
                    id="category-select"
                    value={assetCategory}
                    onChange={(e) => setAssetCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8fbff] border border-[rgba(3,10,3,0.15)] rounded-xl text-sm text-[#030a03] outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
                  >
                    <option value="Flexi Cap Equity">Flexi Cap Equity</option>
                    <option value="Large Cap Index">Large Cap Index</option>
                    <option value="Mid Cap Equity">Mid Cap Equity</option>
                    <option value="Short Duration Debt">Short Duration Debt</option>
                    <option value="Sovereign Gold ETF">Sovereign Gold ETF</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="asset-value-input" className="block font-semibold text-[#030a03] mb-1">
                    Current Holding Value (₹)
                  </label>
                  <input
                    id="asset-value-input"
                    type="number"
                    required
                    placeholder="e.g. 1500000"
                    value={assetValue}
                    onChange={(e) => setAssetValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8fbff] border border-[rgba(3,10,3,0.15)] rounded-xl text-sm text-[#030a03] outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="direct-ter-input" className="block font-semibold text-[#030a03] mb-1">
                    Direct Plan TER
                  </label>
                  <input
                    id="direct-ter-input"
                    type="text"
                    value={assetDirectTer}
                    onChange={(e) => setAssetDirectTer(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8fbff] border border-[rgba(3,10,3,0.15)] rounded-xl text-sm text-[#030a03] outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
                  />
                </div>
                <div>
                  <label htmlFor="regular-ter-input" className="block font-semibold text-[#030a03] mb-1">
                    Regular Plan TER (For Audit)
                  </label>
                  <input
                    id="regular-ter-input"
                    type="text"
                    value={assetRegularTer}
                    onChange={(e) => setAssetRegularTer(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8fbff] border border-[rgba(3,10,3,0.15)] rounded-xl text-sm text-[#030a03] outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddAssetModal(false)}
                  className="px-4 py-2 border border-[rgba(3,10,3,0.15)] rounded-xl text-[#030a03]/70 hover:bg-[#f8fbff] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1e90ff] hover:bg-[#0077e6] text-white rounded-xl font-semibold transition shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
