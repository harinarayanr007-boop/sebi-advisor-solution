"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Plus,
  Trash,
  CheckCircle,
  Heartbeat,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function ClientInsurancePage() {
  const { activeInsurance, addInsurance, deleteInsurance } = useFiduciary();

  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");
  const [type, setType] = useState<"term_life" | "health_floater" | "critical_illness" | "ulip_audit">("term_life");
  const [sumAssured, setSumAssured] = useState("₹10.00 Cr");
  const [annualPremium, setAnnualPremium] = useState("₹65,000 / yr");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInsurance({
      title: title || "Pure Term Insurance Policy",
      provider: provider || "HDFC Life / Max Life",
      type,
      sumAssured,
      annualPremium,
      status: type === "ulip_audit" ? "Passed - No Drag" : "100% Adequate",
      notes: notes || "Pure risk protection verified without investment mixing.",
    });

    setTitle("");
    setProvider("");
    setNotes("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-space text-[#343C6A]">
            Pure Risk Protection & Insurance Adequacy Audit
          </h2>
          <p className="text-xs text-[#718EBF]">
            Fiduciary audit of Human Life Value (HLV) pure term coverage and elimination of toxic high-cost ULIPs.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
        >
          <Plus size={16} weight="bold" />
          <span>+ Add Insurance Policy</span>
        </button>
      </div>

      {/* Audit Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-[25px] p-6 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <CheckCircle size={20} weight="fill" className="text-emerald-600" />
            <h3 className="text-sm font-bold font-space">
              Fiduciary Principle: Never Mix Insurance with Investments
            </h3>
          </div>
          <p className="text-xs text-emerald-800 max-w-2xl leading-relaxed">
            SEBI RIAs do not sell insurance or take distributor commissions. We audit your existing traditional policies (Endowment, ULIP, Money-Back) to ensure pure mortality protection at lowest cost.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] text-emerald-700 block uppercase font-bold">Advisory Standard</span>
          <span className="text-sm font-bold font-space text-emerald-900">0% Commission Leakage</span>
        </div>
      </div>

      {/* Policy Cards */}
      {activeInsurance.length === 0 ? (
        <div className="bg-white rounded-[25px] p-12 border border-[#DFEAF2] text-center space-y-3 shadow-sm">
          <ShieldCheck size={36} weight="duotone" className="text-[#718EBF] mx-auto opacity-40" />
          <h3 className="text-base font-bold font-space text-[#343C6A]">No Insurance Policies Registered</h3>
          <p className="text-xs text-[#718EBF] max-w-sm mx-auto">
            Add your pure term cover or health floater policies to audit your family protection adequacy.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
          >
            + Add First Policy
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeInsurance.map((ins) => (
            <div
              key={ins.id}
              className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#1814F3] transition"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    {ins.status}
                  </span>
                  <button
                    onClick={() => deleteInsurance(ins.id)}
                    className="text-[#718EBF] hover:text-rose-600 transition p-1"
                  >
                    <Trash size={16} weight="bold" />
                  </button>
                </div>

                <h3 className="text-base font-bold font-space text-[#343C6A] mt-3">
                  {ins.title}
                </h3>
                <p className="text-xs text-[#718EBF] mt-0.5">{ins.provider}</p>

                <div className="mt-4 p-3 bg-[#F5F7FA] rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#718EBF]">Sum Assured:</span>
                    <span className="font-bold text-[#343C6A]">{ins.sumAssured}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718EBF]">Annual Premium:</span>
                    <span className="font-bold text-[#343C6A]">{ins.annualPremium}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#718EBF] mt-3 leading-relaxed">
                  {ins.notes}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0F4F8] text-[10px] text-emerald-600 font-bold flex items-center space-x-1">
                <CheckCircle size={16} weight="fill" />
                <span>Zero Commission Certified</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[25px] max-w-lg w-full p-6 border border-[#DFEAF2] shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-space text-[#343C6A]">
              + Add Insurance Policy for Fiduciary Audit
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Policy Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Term Life Mortality Shield"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Insurer / Provider</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HDFC Life / Care Health"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Protection Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  >
                    <option value="term_life">Pure Term Life Cover</option>
                    <option value="health_floater">Family Health Floater</option>
                    <option value="critical_illness">Critical Illness Rider</option>
                    <option value="ulip_audit">ULIP / Endowment Drag Audit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Sum Assured</label>
                  <input
                    type="text"
                    value={sumAssured}
                    onChange={(e) => setSumAssured(e.target.value)}
                    placeholder="₹10.00 Cr"
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Annual Premium</label>
                  <input
                    type="text"
                    value={annualPremium}
                    onChange={(e) => setAnnualPremium(e.target.value)}
                    placeholder="₹65,000 / yr"
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Audit Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Income replacement benchmark met"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                />
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
                  Save Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
