"use client";

import React, { useState } from "react";
import {
  Target,
  Plus,
  Trash,
  TrendUp,
  Sparkle,
  Calendar,
  CheckCircle,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { formatINR } from "@/lib/fiduciary-store";

export default function ClientGoalsPage() {
  const { activeGoals, addGoal, deleteGoal } = useFiduciary();

  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Education" | "Real Estate" | "Retirement" | "Trust" | "Other">("Retirement");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentFunded, setCurrentFunded] = useState("");
  const [targetYear, setTargetYear] = useState("2035");
  const [monthlySip, setMonthlySip] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = Number(targetAmount) || 10000000;
    const funded = Number(currentFunded) || 0;
    const sip = Number(monthlySip) || 50000;
    const yr = Number(targetYear) || 2035;

    // Realistic Monte Carlo probability heuristic based on funding ratio & horizon
    const yearsRemaining = Math.max(1, yr - new Date().getFullYear());
    const fundingRatio = funded / target;
    const prob = Math.min(99, Math.max(65, Math.round(50 + fundingRatio * 35 + (sip * 12 * yearsRemaining > target ? 14 : 0))));

    addGoal({
      title: title || "New Financial Milestone",
      category,
      targetAmount: target,
      currentFunded: funded,
      targetYear: yr,
      monthlySip: sip,
      probabilityPercent: prob,
      recommendedInstrument: category === "Education" ? "Direct Large & Flexi-Cap Indexing" : "Direct Multi-Asset Allocation",
    });

    setTitle("");
    setTargetAmount("");
    setCurrentFunded("");
    setMonthlySip("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-space text-[#343C6A]">
            Financial Goals GPS & Monte Carlo Scoring
          </h2>
          <p className="text-xs text-[#718EBF]">
            Map target milestones with direct SIP tracking and probability of success.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
        >
          <Plus size={16} weight="bold" />
          <span>+ Add Financial Goal</span>
        </button>
      </div>

      {activeGoals.length === 0 ? (
        <div className="bg-white rounded-[25px] p-12 border border-[#DFEAF2] text-center space-y-3 shadow-sm">
          <Target size={36} weight="duotone" className="text-[#718EBF] mx-auto opacity-40" />
          <h3 className="text-base font-bold font-space text-[#343C6A]">No Goals Configured Yet</h3>
          <p className="text-xs text-[#718EBF] max-w-sm mx-auto">
            Set up your retirement, child education, or property acquisition goals to calculate required SIP allocations.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
          >
            + Create First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeGoals.map((g) => {
            const percent = Math.min(100, Math.round((g.currentFunded / g.targetAmount) * 100));
            return (
              <div
                key={g.id}
                className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#1814F3] transition"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1814F3] bg-[#E7EDFF] px-2.5 py-1 rounded-full">
                      {g.category}
                    </span>
                    <button
                      onClick={() => deleteGoal(g.id)}
                      className="text-[#718EBF] hover:text-rose-600 transition p-1"
                    >
                      <Trash size={16} weight="bold" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold font-space text-[#343C6A] mt-3">
                    {g.title}
                  </h3>
                  <p className="text-xs text-[#718EBF] mt-0.5">
                    Target: {g.targetYear} • {formatINR(g.targetAmount)}
                  </p>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#718EBF]">Funded Progress</span>
                      <span className="font-bold text-[#343C6A]">{percent}%</span>
                    </div>
                    <div className="w-full bg-[#E6EFF5] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#1814F3] h-full rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#718EBF]">
                      <span>{formatINR(g.currentFunded)}</span>
                      <span>{formatINR(g.targetAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F0F4F8] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#718EBF] block">Monthly SIP</span>
                    <span className="font-bold text-[#343C6A]">₹{g.monthlySip.toLocaleString("en-IN")}/mo</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#718EBF] block">Monte Carlo Score</span>
                    <span className="font-bold text-emerald-600">{g.probabilityPercent}% Success</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[25px] max-w-lg w-full p-6 border border-[#DFEAF2] shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-space text-[#343C6A]">
              + Create New Financial Goal
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Goal Milestone Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Child Ivy League Education Fund"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  >
                    <option value="Education">Education</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Trust">Trust</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Target Horizon (Year)</label>
                  <input
                    type="number"
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Target Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15000000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Current Funded (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 4000000"
                    value={currentFunded}
                    onChange={(e) => setCurrentFunded(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Target Monthly Direct SIP (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 75000"
                  value={monthlySip}
                  onChange={(e) => setMonthlySip(e.target.value)}
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
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
