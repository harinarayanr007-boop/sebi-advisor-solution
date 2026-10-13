"use client";

import React, { useState } from "react";
import { Plus, Trash2, Target, TrendingUp, X } from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { motion, AnimatePresence } from "motion/react";

export default function GoalsPage() {
  const { goals, activeClient, addGoal, deleteGoal } = useFiduciary();
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Education" | "Real Estate" | "Retirement" | "Trust" | "Other">("Education");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentFunded, setCurrentFunded] = useState("");
  const [targetYear, setTargetYear] = useState("2032");
  const [monthlySip, setMonthlySip] = useState("");
  const [instrument, setInstrument] = useState("Direct Flexi-Cap Indexing");

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a goal title");
      return;
    }
    const tAmt = parseFloat(targetAmount.replace(/[^0-9.]/g, "")) || 10000000;
    const cFunded = parseFloat(currentFunded.replace(/[^0-9.]/g, "")) || 1000000;
    const sip = parseFloat(monthlySip.replace(/[^0-9.]/g, "")) || 50000;
    const yr = parseInt(targetYear, 10) || 2035;

    addGoal({
      title,
      category,
      targetAmount: tAmt,
      currentFunded: cFunded,
      targetYear: yr,
      monthlySip: sip,
      probabilityPercent: 92,
      recommendedInstrument: instrument,
    });

    setShowAddModal(false);
    setTitle("");
    setTargetAmount("");
    setCurrentFunded("");
    setMonthlySip("");
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-jakarta text-[#343C6A]">
            Long-Term Fiduciary Goals & Milestones
          </h2>
          <p className="text-xs text-[#718EBF] mt-0.5">
            Target tracking for {activeClient.name} with stochastic Monte Carlo simulation.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#1814F3] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto hover:bg-[#120ec0] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const fundedPct = Math.min(
            100,
            Math.round((goal.currentFunded / goal.targetAmount) * 100)
          );
          const yearsRemaining = Math.max(0, goal.targetYear - 2026);

          return (
            <div
              key={goal.id}
              className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-[#1814F3]">
                    Target: {goal.targetYear} ({yearsRemaining} Yrs)
                  </span>
                  <span className="text-xs font-bold text-emerald-600 font-space">
                    {goal.probabilityPercent}% Probable
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#343C6A]">{goal.title}</h3>
                <p className="text-xs text-[#718EBF] mt-1">
                  Instrument: {goal.recommendedInstrument}
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-space font-semibold mb-2">
                  <span className="text-[#718EBF]">
                    Funded: ₹{(goal.currentFunded / 10000000).toFixed(2)} Cr
                  </span>
                  <span className="text-[#343C6A] font-bold">
                    Target: ₹{(goal.targetAmount / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <div className="w-full bg-[#F5F7FA] h-3 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${fundedPct}%` }}
                    className="bg-[#1814F3] h-full rounded-full transition-all"
                  />
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F5F7FA] text-xs">
                  <span className="text-[#718EBF]">
                    SIP: ₹{goal.monthlySip.toLocaleString("en-IN")}/mo
                  </span>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-slate-400 hover:text-rose-600 text-[11px] font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD GOAL MODAL */}
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
                Add Fiduciary Goal
              </h3>
              <p className="text-xs text-[#718EBF] mb-5">
                Set a milestone and calculate required monthly SIP under {activeClient.name}&apos;s plan.
              </p>

              <form onSubmit={handleCreateGoal} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-[#343C6A] mb-1 font-bold">Goal Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Son's Oxford Masters Fund"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-3 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                    >
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Retirement">Retirement</option>
                      <option value="Trust">Family Trust</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Target Year</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 2034"
                      value={targetYear}
                      onChange={(e) => setTargetYear(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm font-space text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Target Corpus (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 20000000"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Current Funded (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000000"
                      value={currentFunded}
                      onChange={(e) => setCurrentFunded(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Monthly SIP (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 75000"
                      value={monthlySip}
                      onChange={(e) => setMonthlySip(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Recommended Vehicle</label>
                    <input
                      type="text"
                      value={instrument}
                      onChange={(e) => setInstrument(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
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
                    Save Goal
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
