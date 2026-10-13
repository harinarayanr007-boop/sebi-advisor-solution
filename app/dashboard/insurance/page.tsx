"use client";

import React, { useState } from "react";
import { Plus, Trash2, ShieldCheck, Activity, AlertCircle, X, CheckCircle2 } from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { motion, AnimatePresence } from "motion/react";

export default function InsurancePage() {
  const { insurance, activeClient, addInsurance, deleteInsurance } = useFiduciary();
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");
  const [type, setType] = useState<"term_life" | "health_floater" | "critical_illness" | "ulip_audit">("term_life");
  const [sumAssured, setSumAssured] = useState("");
  const [annualPremium, setAnnualPremium] = useState("");
  const [notes, setNotes] = useState("");

  const handleCreatePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide the policy title");
      return;
    }

    addInsurance({
      title,
      provider: provider || "National Insurer",
      type,
      sumAssured: sumAssured || "₹1.00 Cr",
      annualPremium: annualPremium || "₹25,000 / yr",
      status: type === "term_life" ? "100% Adequate" : "Super Top-Up Active",
      notes: notes || "Audited under fiduciary life and health framework.",
    });

    setShowAddModal(false);
    setTitle("");
    setProvider("");
    setSumAssured("");
    setAnnualPremium("");
    setNotes("");
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-jakarta text-[#343C6A]">
            Insurance & Protection Audit
          </h2>
          <p className="text-xs text-[#718EBF] mt-0.5">
            Mortality protection and health risk coverage for {activeClient.name}.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#1814F3] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto hover:bg-[#120ec0] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Insurance Policy</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insurance.map((policy) => {
          const isTerm = policy.type === "term_life";
          const isHealth = policy.type === "health_floater";
          const isUlip = policy.type === "ulip_audit";

          return (
            <div
              key={policy.id}
              className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center ${
                      isTerm
                        ? "bg-blue-100 text-[#1814F3]"
                        : isHealth
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {isTerm ? (
                      <ShieldCheck className="w-6 h-6" />
                    ) : isHealth ? (
                      <Activity className="w-6 h-6" />
                    ) : (
                      <AlertCircle className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isUlip
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-[#1814F3]"
                    }`}
                  >
                    {policy.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#343C6A]">{policy.title}</h3>
                <p className="text-xs text-[#718EBF] mt-0.5">{policy.provider}</p>

                <div className="mt-4 space-y-1">
                  <p className="text-2xl font-bold font-space text-[#343C6A]">
                    {policy.sumAssured}
                  </p>
                  <p className="text-xs font-space text-[#718EBF]">
                    Premium: {policy.annualPremium}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#718EBF] border-t border-[#F5F7FA] pt-3 leading-relaxed">
                  {policy.notes}
                </p>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => deleteInsurance(policy.id)}
                    className="text-slate-400 hover:text-rose-600 text-[11px] font-bold"
                  >
                    Delete Policy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD INSURANCE MODAL */}
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
                Add Insurance Policy
              </h3>
              <p className="text-xs text-[#718EBF] mb-5">
                Audit and log life, health, or critical illness coverage for {activeClient.name}.
              </p>

              <form onSubmit={handleCreatePolicy} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-[#343C6A] mb-1 font-bold">Policy Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ICICI Pru iProtect Smart Term Cover"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Insurance Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-3 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                    >
                      <option value="term_life">Pure Term Life</option>
                      <option value="health_floater">Family Health Floater</option>
                      <option value="critical_illness">Critical Illness Cover</option>
                      <option value="ulip_audit">Traditional / ULIP Audit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Insurance Provider</label>
                    <input
                      type="text"
                      placeholder="e.g. HDFC Life / Care Health"
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Sum Assured</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹5.00 Cr"
                      value={sumAssured}
                      onChange={(e) => setSumAssured(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm font-space text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Annual Premium</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹42,000 / yr"
                      value={annualPremium}
                      onChange={(e) => setAnnualPremium(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm font-space text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#343C6A] mb-1 font-bold">Fiduciary Audit Notes</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Pure mortality term protection. Zero opaque endowment mixing."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#F5F7FA] rounded-[15px] p-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                  />
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
                    Save Policy
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
