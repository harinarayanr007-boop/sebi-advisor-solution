"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Plus,
  FileUp,
  Trash2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Percent,
  Wallet,
} from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { formatINR } from "@/lib/fiduciary-store";

export default function ClientAssetsPage() {
  const { activeAssets, addAsset, deleteAsset, parseCasStatement, activeClient } = useFiduciary();

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Flexi Cap Equity");
  const [currentValue, setCurrentValue] = useState("");
  const [directTer, setDirectTer] = useState("0.60%");
  const [regularTer, setRegularTer] = useState("1.55%");

  const totalHoldingValue = activeAssets.reduce((sum, a) => sum + a.currentValue, 0);
  const totalAnnualSavings = activeAssets.reduce((sum, a) => {
    const rawVal = parseInt(a.annualDragSaved.replace(/[^0-9]/g, ""), 10) || 0;
    return sum + rawVal;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(currentValue) || 100000;
    const directNum = parseFloat(directTer) || 0.6;
    const regNum = parseFloat(regularTer) || 1.55;
    const diff = Math.max(0, regNum - directNum);
    const saved = Math.round((val * diff) / 100);

    addAsset({
      name: name || "Direct Mutual Fund Scheme",
      category,
      isin: `INF${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      folio: `${Math.floor(10000000 + Math.random() * 90000000)}/00`,
      currentValue: val,
      allocationPercent: totalHoldingValue > 0 ? Math.round((val / (totalHoldingValue + val)) * 100) : 100,
      directExpenseRatio: directTer,
      regularExpenseRatio: regularTer,
      oneYearReturn: "+19.8%",
      annualDragSaved: `₹${saved.toLocaleString("en-IN")}/yr`,
    });

    setName("");
    setCurrentValue("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-7">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-space text-[#343C6A]">
            Direct Demat & Mutual Fund Inventory
          </h2>
          <p className="text-xs text-[#718EBF]">
            100% direct plan folios registered under SEBI RIA INA000015845. Zero distributor commissions.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => parseCasStatement("NSDL_CAS_Statement.pdf")}
            className="px-4 py-2.5 bg-white border border-[#DFEAF2] hover:bg-slate-50 text-[#343C6A] rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-xs"
          >
            <FileUp className="w-4 h-4 text-[#1814F3]" />
            <span>Upload CAS Statement</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Direct Holding</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            Total Direct Portfolio Value
          </span>
          <h3 className="text-2xl font-bold font-space text-[#343C6A] mt-2">
            {formatINR(totalHoldingValue)}
          </h3>
          <span className="text-[11px] text-blue-600 font-semibold block mt-1">
            {activeAssets.length} verified direct folios
          </span>
        </div>

        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
            Annual Commission Leak Eliminated
          </span>
          <h3 className="text-2xl font-bold font-space text-emerald-600 mt-2">
            ₹{totalAnnualSavings.toLocaleString("en-IN")} / yr
          </h3>
          <span className="text-[11px] text-[#718EBF] block mt-1">
            0% regular distributor trail fee
          </span>
        </div>

        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            Average Direct TER
          </span>
          <h3 className="text-2xl font-bold font-space text-[#343C6A] mt-2">
            {activeAssets.length > 0 ? "0.52% p.a." : "0.00%"}
          </h3>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            ~1.05% cheaper than regular plans
          </span>
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
        <h3 className="text-base font-bold font-space text-[#343C6A]">
          Direct Holding Inventory
        </h3>

        {activeAssets.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-[#DFEAF2] rounded-2xl space-y-3">
            <Briefcase className="w-10 h-10 text-[#718EBF] mx-auto opacity-40" />
            <h4 className="text-sm font-bold text-[#343C6A]">No direct assets registered yet</h4>
            <p className="text-xs text-[#718EBF] max-w-sm mx-auto">
              Add your mutual funds and stocks manually or simulate uploading a CAS statement to see your expense audit.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
            >
              + Add First Asset
            </button>
          </div>
        ) : (
          <div className="border border-[#DFEAF2] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FA] text-[#718EBF] uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Scheme / Security</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Folio / Demat ID</th>
                  <th className="p-3.5">Holding Value</th>
                  <th className="p-3.5">Direct TER</th>
                  <th className="p-3.5">Regular TER</th>
                  <th className="p-3.5">Drag Saved</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F8]">
                {activeAssets.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-[#343C6A]">{a.name}</td>
                    <td className="p-3.5 text-[#718EBF]">{a.category}</td>
                    <td className="p-3.5 font-mono text-[11px] text-[#718EBF]">{a.folio}</td>
                    <td className="p-3.5 font-bold font-space text-[#343C6A]">
                      ₹{a.currentValue.toLocaleString("en-IN")}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-600">{a.directExpenseRatio}</td>
                    <td className="p-3.5 text-rose-500 line-through">{a.regularExpenseRatio}</td>
                    <td className="p-3.5 text-emerald-700 font-bold">{a.annualDragSaved}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => deleteAsset(a.id)}
                        title="Remove holding"
                        className="p-1.5 text-[#718EBF] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[25px] max-w-lg w-full p-6 border border-[#DFEAF2] shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-space text-[#343C6A]">
              + Add Direct Demat / Mutual Fund Asset
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Fund or Stock Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nippon India Growth Fund - Direct Plan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                  <label className="block font-bold text-[#343C6A] mb-1">Current Value (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2000000"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Direct Plan TER</label>
                  <input
                    type="text"
                    value={directTer}
                    onChange={(e) => setDirectTer(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Regular Plan TER</label>
                  <input
                    type="text"
                    value={regularTer}
                    onChange={(e) => setRegularTer(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#DFEAF2] rounded-xl text-[#718EBF] hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1814F3] text-white rounded-xl font-bold hover:bg-blue-700 transition"
                >
                  Record Direct Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
