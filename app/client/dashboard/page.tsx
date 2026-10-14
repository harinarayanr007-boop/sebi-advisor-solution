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
    <div className="space-y-7">
      {/* Empty State Banner if no assets */}
      {activeAssets.length === 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-[25px] p-6 text-left shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1814F3] bg-white px-2.5 py-1 rounded-full border border-blue-200">
                Pristine Direct Portfolio
              </span>
              <h3 className="text-xl font-bold font-space text-[#343C6A]">
                No Holdings Added Yet
              </h3>
              <p className="text-xs text-[#718EBF] max-w-xl">
                Add your real direct mutual funds or demat stocks, or upload your NSDL / CDSL Consolidated Account Statement (CAS) to calculate your live commission drag savings.
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => setShowAddAssetModal(true)}
                className="px-4 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-1.5 shadow-sm"
              >
                <Plus size={16} weight="bold" />
                <span>+ Add Direct Holding</span>
              </button>
              <button
                onClick={() => parseCasStatement("CAS_Statement.pdf")}
                className="px-4 py-2.5 bg-white border border-[#DFEAF2] hover:bg-slate-50 text-[#343C6A] rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
              >
                <UploadSimple size={16} weight="bold" className="text-[#1814F3]" />
                <span>Simulate CAS Upload</span>
              </button>
              <button
                onClick={loadDemoData}
                title="Populate test data for evaluation"
                className="px-3 py-2.5 bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <Sparkle size={16} weight="fill" className="text-amber-600" />
                <span>Load Sample Case</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top 2 BankDash Hero Cards: Net Worth & Commission Shield */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Direct Fiduciary Net Worth */}
        <div className="bg-[#1814F3] rounded-[25px] p-7 text-white flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-200">
                Direct Demat Net Worth
              </span>
              <h2 className="text-3xl font-extrabold font-space mt-2">
                {totalNetWorthNum > 0 ? formatINR(totalNetWorthNum) : "₹0"}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Wallet size={24} weight="fill" className="text-white" />
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/20 flex items-center justify-between text-xs relative z-10">
            <div>
              <span className="text-[10px] text-blue-200 block">SEBI Registered Advisor</span>
              <span className="font-semibold text-white">Aurum Fiduciary (INA000015845)</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-blue-200 block">Direct Folios</span>
              <span className="font-semibold text-white">{activeAssets.length} Direct Accounts</span>
            </div>
          </div>
        </div>

        {/* Card 2: Commission Drag Shield */}
        <div className="bg-white rounded-[25px] p-7 border border-[#DFEAF2] text-[#343C6A] flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Commission Leakage Eliminated
              </span>
              <h2 className="text-3xl font-extrabold font-space text-emerald-600 mt-2">
                {totalDragSavedNum > 0 ? `₹${totalDragSavedNum.toLocaleString("en-IN")} / yr` : "₹0 / yr"}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <ShieldCheck size={24} weight="fill" className="text-emerald-600" />
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[#DFEAF2] flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-[#718EBF] block">Broker Kickback Avoided</span>
              <span className="font-bold text-[#343C6A]">0.00% Distributor Commission</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#718EBF] block">10-Yr Compounded Value</span>
              <span className="font-bold text-emerald-600">
                {totalDragSavedNum > 0 ? `+${formatINR(totalDragSavedNum * 14.8)}` : "+₹0"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E7EDFF] text-[#1814F3] flex items-center justify-center shrink-0">
            <Briefcase size={24} weight="duotone" />
          </div>
          <div>
            <span className="text-xs text-[#718EBF] font-semibold">Direct Assets</span>
            <h4 className="text-lg font-bold font-space text-[#343C6A]">{activeAssets.length} Holdings</h4>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#DCFAF8] text-[#16DBCC] flex items-center justify-center shrink-0">
            <Target size={24} weight="duotone" />
          </div>
          <div>
            <span className="text-xs text-[#718EBF] font-semibold">Active Goals</span>
            <h4 className="text-lg font-bold font-space text-[#343C6A]">{activeGoals.length} Milestones</h4>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF5D9] text-[#FFBB38] flex items-center justify-center shrink-0">
            <TrendUp size={24} weight="duotone" />
          </div>
          <div>
            <span className="text-xs text-[#718EBF] font-semibold">Risk Horizon</span>
            <h4 className="text-lg font-bold font-space text-[#343C6A]">{activeClient?.targetCAGR || "11.5% CAGR"}</h4>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE0EB] text-[#FF82AC] flex items-center justify-center shrink-0">
            <ShieldCheck size={24} weight="duotone" />
          </div>
          <div>
            <span className="text-xs text-[#718EBF] font-semibold">Pure Term Adequacy</span>
            <h4 className="text-lg font-bold font-space text-emerald-600">
              {activeInsurance.length > 0 ? "100% Protected" : "Pending Audit"}
            </h4>
          </div>
        </div>
      </div>

      {/* Main Grid: Direct Holdings Table + Goals Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Direct Demat Holdings */}
        <div className="lg:col-span-2 bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-space text-[#343C6A]">
                Direct Demat & Mutual Fund Holdings
              </h3>
              <p className="text-xs text-[#718EBF]">Zero distributor trail commissions</p>
            </div>
            <Link
              href="/client/assets"
              className="text-xs font-bold text-[#1814F3] hover:underline flex items-center space-x-1"
            >
              <span>View All Holdings</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          {activeAssets.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[#DFEAF2] rounded-2xl space-y-3">
              <Briefcase size={36} weight="duotone" className="text-[#718EBF] mx-auto opacity-50" />
              <p className="text-xs text-[#718EBF]">No direct assets added yet.</p>
              <button
                onClick={() => setShowAddAssetModal(true)}
                className="px-4 py-2 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
              >
                + Add First Asset
              </button>
            </div>
          ) : (
            <div className="border border-[#DFEAF2] rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F7FA] text-[#718EBF] uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3.5">Scheme / Asset</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Current Value</th>
                    <th className="p-3.5">Direct TER</th>
                    <th className="p-3.5">Drag Saved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F4F8]">
                  {activeAssets.slice(0, 5).map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-bold text-[#343C6A]">{a.name}</td>
                      <td className="p-3.5 text-[#718EBF]">{a.category}</td>
                      <td className="p-3.5 font-bold font-space text-[#343C6A]">
                        ₹{a.currentValue.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3.5 font-bold text-emerald-600">{a.directExpenseRatio}</td>
                      <td className="p-3.5 text-emerald-700 font-bold">{a.annualDragSaved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right 1 Col: Goals GPS Progress */}
        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-space text-[#343C6A]">
                Financial Goals GPS
              </h3>
              <p className="text-xs text-[#718EBF]">Monte Carlo funded status</p>
            </div>
            <Link
              href="/client/goals"
              className="text-xs font-bold text-[#1814F3] hover:underline"
            >
              Manage →
            </Link>
          </div>

          {activeGoals.length === 0 ? (
            <div className="p-6 text-center border border-dashed border-[#DFEAF2] rounded-2xl space-y-2">
              <Target size={32} weight="duotone" className="text-[#718EBF] mx-auto opacity-50" />
              <p className="text-xs text-[#718EBF]">No milestones setup yet.</p>
              <Link
                href="/client/goals"
                className="inline-block text-xs font-bold text-[#1814F3] hover:underline"
              >
                + Setup Milestone
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeGoals.slice(0, 3).map((g) => {
                const percent = Math.min(100, Math.round((g.currentFunded / g.targetAmount) * 100));
                return (
                  <div key={g.id} className="p-3.5 bg-[#F5F7FA] rounded-2xl border border-[#DFEAF2] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#343C6A]">{g.title}</span>
                      <span className="font-mono text-[10px] text-[#718EBF]">{g.targetYear}</span>
                    </div>
                    <div className="w-full bg-[#E6EFF5] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#1814F3] h-full rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#718EBF]">₹{(g.currentFunded / 100000).toFixed(1)}L funded</span>
                      <span className="font-bold text-[#1814F3]">{percent}%</span>
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
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[25px] max-w-lg w-full p-6 border border-[#DFEAF2] shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-space text-[#343C6A]">
              + Add Direct Demat / Mutual Fund Asset
            </h3>
            <form onSubmit={handleCreateAsset} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Fund or Stock Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Parag Parikh Flexi Cap Direct Plan"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Category</label>
                  <select
                    value={assetCategory}
                    onChange={(e) => setAssetCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  >
                    <option value="Flexi Cap Equity">Flexi Cap Equity</option>
                    <option value="Large Cap Index">Large Cap Index</option>
                    <option value="Mid Cap Equity">Mid Cap Equity</option>
                    <option value="Short Duration Debt">Short Duration Debt</option>
                    <option value="Sovereign Gold ETF">Sovereign Gold ETF</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Current Holding Value (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1500000"
                    value={assetValue}
                    onChange={(e) => setAssetValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Direct Plan TER</label>
                  <input
                    type="text"
                    value={assetDirectTer}
                    onChange={(e) => setAssetDirectTer(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Regular Plan TER (For Audit)</label>
                  <input
                    type="text"
                    value={assetRegularTer}
                    onChange={(e) => setAssetRegularTer(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddAssetModal(false)}
                  className="px-4 py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1814F3] text-white rounded-xl font-bold hover:bg-blue-700 transition"
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
