"use client";

import React, { useState } from "react";
import {
  FileUp,
  Plus,
  Trash2,
  CheckCircle2,
  PieChart,
  ShieldCheck,
  TrendingUp,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { motion, AnimatePresence } from "motion/react";

export default function DirectAssetsPage() {
  const { assets, activeClient, addAsset, deleteAsset, parseCasStatement } = useFiduciary();

  const [showAddModal, setShowAddModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedMsg, setUploadedMsg] = useState<string | null>(null);

  // Add Asset Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Flexi Cap Equity");
  const [isin, setIsin] = useState("");
  const [folio, setFolio] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [directRatio, setDirectRatio] = useState("0.45%");
  const [regularRatio, setRegularRatio] = useState("1.45%");
  const [returns, setReturns] = useState("+18.5%");

  const totalAssetsValue = assets.reduce((sum, a) => sum + a.currentValue, 0);

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please provide the instrument name");
      return;
    }
    const val = parseFloat(currentValue.replace(/[^0-9.]/g, "")) || 500000;
    const allocPercent = totalAssetsValue > 0 ? (val / (totalAssetsValue + val)) * 100 : 10;
    const dragVal = Math.round(val * 0.01); // 1% regular trail saved

    addAsset({
      name,
      category,
      isin: isin || `INF${Math.floor(100000000 + Math.random() * 900000000)}`,
      folio: folio || `${Math.floor(10000000 + Math.random() * 90000000)}/99`,
      currentValue: val,
      allocationPercent: parseFloat(allocPercent.toFixed(1)),
      directExpenseRatio: directRatio,
      regularExpenseRatio: regularRatio,
      oneYearReturn: returns,
      annualDragSaved: `₹${dragVal.toLocaleString("en-IN")}/yr`,
    });

    setShowAddModal(false);
    setName("");
    setIsin("");
    setFolio("");
    setCurrentValue("");
  };

  const handleCasUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      setTimeout(() => {
        parseCasStatement(file.name);
        setUploading(false);
        setUploadedMsg(`Extracted folios from ${file.name}. Added 2 Direct Funds to portfolio.`);
        setTimeout(() => setUploadedMsg(null), 5000);
      }, 1200);
    }
  };

  return (
    <div className="space-y-7">
      {/* 1-Click CAS Extractor Dropzone */}
      <div className="bg-white rounded-[25px] p-6 sm:p-8 border border-[#DFEAF2] shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#F5F7FA]">
          <div>
            <h2 className="text-lg font-bold font-jakarta text-[#343C6A]">
              1-Click CAS Statement Ingestion & Direct Alpha Extractor
            </h2>
            <p className="text-xs text-[#718EBF] mt-1">
              Upload your Consolidated Account Statement (CAMS / KFintech .PDF). The system auto-extracts your ISINs, folio balances, and highlights hidden regular-plan commissions.
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => {
                setUploading(true);
                setTimeout(() => {
                  parseCasStatement("Simulated_CAMS_CAS_Jan2026.pdf");
                  setUploading(false);
                  setUploadedMsg("Successfully parsed CAMS CAS. 2 Direct mutual funds appended.");
                  setTimeout(() => setUploadedMsg(null), 5000);
                }, 900);
              }}
              className="bg-[#F5F7FA] border border-[#DFEAF2] text-[#343C6A] hover:text-[#1814F3] px-4 py-2.5 rounded-full text-xs font-bold transition-colors"
            >
              Simulate Sample CAS
            </button>
            <label className="bg-[#1814F3] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-2 cursor-pointer hover:bg-[#120ec0] transition-colors">
              <FileUp className="w-4 h-4" />
              <span>{uploading ? "Extracting Funds..." : "Upload CAS (.pdf)"}</span>
              <input
                type="file"
                accept=".pdf,.xlsx,.csv"
                onChange={handleCasUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {uploadedMsg && (
          <div className="mt-4 p-4 rounded-[18px] bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-emerald-900">{uploadedMsg}</p>
                <p className="text-[11px] text-emerald-700">
                  Transformed all regular distributor commissions to 100% Direct Demat.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold font-space text-emerald-800">
              Drag Saved: {activeClient.dragSaved}
            </span>
          </div>
        )}
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1814F3] flex items-center justify-center">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Total Direct Holdings</p>
            <h3 className="text-xl font-bold font-space text-[#343C6A]">
              ₹{(totalAssetsValue / 10000000).toFixed(2)} Cr
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Annual Commission Shield</p>
            <h3 className="text-xl font-bold font-space text-emerald-600">
              {activeClient.dragSaved}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Total Instruments</p>
            <h3 className="text-xl font-bold font-space text-[#343C6A]">
              {assets.length} Direct Funds
            </h3>
          </div>
        </div>
      </div>

      {/* Holdings Table with + Add Asset Action */}
      <div className="bg-white rounded-[25px] p-6 sm:p-8 border border-[#DFEAF2] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold font-jakarta text-[#343C6A]">
              Consolidated Direct Demat Holdings ({assets.length} Active Instruments)
            </h3>
            <p className="text-xs text-[#718EBF] mt-0.5">
              Held in client&apos;s own Demat / Folio. 0% distributor kickback.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#1814F3] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto hover:bg-[#120ec0] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Direct Asset</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#DFEAF2] text-xs font-bold text-[#718EBF]">
                <th className="pb-3 font-semibold">Instrument Name</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Current Value</th>
                <th className="pb-3 font-semibold">Direct TER</th>
                <th className="pb-3 font-semibold">Regular TER</th>
                <th className="pb-3 font-semibold">1Y Return</th>
                <th className="pb-3 font-semibold">Drag Saved</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F7FA] text-xs font-semibold text-[#343C6A]">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-[#F5F7FA]/70 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-[#1814F3] flex items-center justify-center font-bold text-xs">
                        {asset.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold">{asset.name}</p>
                        <p className="text-[10px] text-[#718EBF] font-space">
                          {asset.isin} • Folio: {asset.folio}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-[#718EBF]">{asset.category}</td>
                  <td className="py-4 font-space font-bold">
                    ₹{asset.currentValue.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 font-space text-emerald-600 font-bold">
                    {asset.directExpenseRatio}
                  </td>
                  <td className="py-4 font-space text-rose-600">
                    {asset.regularExpenseRatio}
                  </td>
                  <td className="py-4 font-space text-emerald-600 font-bold">
                    {asset.oneYearReturn}
                  </td>
                  <td className="py-4 font-space text-emerald-600 font-bold">
                    {asset.annualDragSaved}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => deleteAsset(asset.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete asset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD ASSET MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[25px] w-full max-w-lg p-7 shadow-2xl border border-[#DFEAF2] text-[#343C6A] relative"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F5F7FA] text-[#718EBF] hover:text-[#343C6A] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold font-jakarta text-[#343C6A] mb-1">
                Add Direct Demat Asset
              </h3>
              <p className="text-xs text-[#718EBF] mb-5">
                Register a new instrument under {activeClient.name}&apos;s direct demat portfolio.
              </p>

              <form onSubmit={handleCreateAsset} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-[#343C6A] mb-1 font-bold">
                    Instrument / Scheme Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nippon India Small Cap Fund (Direct-Growth)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-3 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                    >
                      <option>Flexi Cap Equity</option>
                      <option>Large Cap Index</option>
                      <option>Mid Cap Equity</option>
                      <option>Small Cap Equity</option>
                      <option>Dynamic Debt</option>
                      <option>Sovereign Gold</option>
                      <option>Arbitrage Liquid</option>
                      <option>Direct Equity Stock</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Current Value (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1500000"
                      value={currentValue}
                      onChange={(e) => setCurrentValue(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">ISIN Code</label>
                    <input
                      type="text"
                      placeholder="e.g. INF204K01018"
                      value={isin}
                      onChange={(e) => setIsin(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm font-space text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Folio / Demat ID</label>
                    <input
                      type="text"
                      placeholder="e.g. 10984210/12"
                      value={folio}
                      onChange={(e) => setFolio(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm font-space text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Direct TER</label>
                    <input
                      type="text"
                      value={directRatio}
                      onChange={(e) => setDirectRatio(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-3 py-3 text-sm font-space text-emerald-600 border border-[#DFEAF2]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Regular TER</label>
                    <input
                      type="text"
                      value={regularRatio}
                      onChange={(e) => setRegularRatio(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-3 py-3 text-sm font-space text-rose-600 border border-[#DFEAF2]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">1Y Return</label>
                    <input
                      type="text"
                      value={returns}
                      onChange={(e) => setReturns(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-3 py-3 text-sm font-space text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DFEAF2] flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-full border border-[#DFEAF2] text-xs font-bold text-[#718EBF] hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1814F3] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#120ec0]"
                  >
                    Save Asset
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
