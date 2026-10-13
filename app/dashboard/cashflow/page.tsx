"use client";

import React, { useState } from "react";
import { Plus, Trash2, Wallet, CreditCard, ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { motion, AnimatePresence } from "motion/react";

export default function CashFlowPage() {
  const { cashFlow, activeClient, addCashFlow, deleteCashFlow } = useFiduciary();
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<"inflow" | "outflow_emi" | "outflow_living" | "outflow_tax">("outflow_emi");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("8.40% p.a.");
  const [tenure, setTenure] = useState("10");

  const totalInflow = cashFlow
    .filter((cf) => cf.type === "inflow")
    .reduce((sum, cf) => sum + cf.monthlyAmount, 0);

  const totalOutflow = cashFlow
    .filter((cf) => cf.type.startsWith("outflow"))
    .reduce((sum, cf) => sum + cf.monthlyAmount, 0);

  const netSurplus = totalInflow - totalOutflow;

  const handleCreateCashFlow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a title");
      return;
    }
    const amt = parseFloat(monthlyAmount.replace(/[^0-9.]/g, "")) || 50000;
    const princ = principal ? parseFloat(principal.replace(/[^0-9.]/g, "")) : undefined;
    const ten = tenure ? parseInt(tenure, 10) : undefined;

    addCashFlow({
      title,
      type,
      monthlyAmount: amt,
      principalRemaining: princ,
      interestRate: type === "outflow_emi" ? rate : undefined,
      tenureYears: ten,
    });

    setShowAddModal(false);
    setTitle("");
    setMonthlyAmount("");
    setPrincipal("");
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-jakarta text-[#343C6A]">
            Monthly Cash Flow & Liabilities Architecture
          </h2>
          <p className="text-xs text-[#718EBF] mt-0.5">
            Cash waterfall and debt leverage monitoring for {activeClient.name}.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#1814F3] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto hover:bg-[#120ec0] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Inflow / Liability</span>
        </button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1814F3] flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Monthly Total Inflow</p>
            <h3 className="text-xl font-bold font-space text-[#343C6A]">
              ₹{totalInflow.toLocaleString("en-IN")} / mo
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
            <ArrowDownRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Monthly Total Outflow</p>
            <h3 className="text-xl font-bold font-space text-rose-600">
              ₹{totalOutflow.toLocaleString("en-IN")} / mo
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Net Investable Surplus</p>
            <h3 className="text-xl font-bold font-space text-emerald-600">
              ₹{netSurplus.toLocaleString("en-IN")} / mo
            </h3>
          </div>
        </div>
      </div>

      {/* Cash Waterfall & Loan Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
          <h3 className="text-base font-bold font-jakarta text-[#343C6A]">
            Monthly Cash Flow Items
          </h3>
          <div className="space-y-3">
            {cashFlow.map((cf) => {
              const isInflow = cf.type === "inflow";
              return (
                <div
                  key={cf.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between ${
                    isInflow
                      ? "bg-blue-50/40 border-blue-100"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#343C6A]">{cf.title}</h4>
                    <span className="text-[10px] text-[#718EBF] uppercase">
                      {cf.type.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`font-space font-bold text-xs ${
                        isInflow ? "text-[#1814F3]" : "text-rose-600"
                      }`}
                    >
                      {isInflow ? "+" : "-"}₹{cf.monthlyAmount.toLocaleString("en-IN")} / mo
                    </span>
                    <button
                      onClick={() => deleteCashFlow(cf.id)}
                      className="text-slate-400 hover:text-rose-600"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Liabilities Card */}
        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
          <h3 className="text-base font-bold font-jakarta text-[#343C6A]">
            Active Liability & Loan Architecture
          </h3>
          {cashFlow
            .filter((cf) => cf.principalRemaining)
            .map((cf) => (
              <div
                key={cf.id}
                className="p-4 rounded-[18px] border border-[#DFEAF2] space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-[#343C6A]">{cf.title}</h4>
                    <p className="text-[11px] text-[#718EBF]">
                      Floating Rate • {cf.interestRate}
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    Low Leverage
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div>
                    <span className="text-[#718EBF] block text-[11px]">Outstanding Principal</span>
                    <span className="font-space font-bold text-[#343C6A]">
                      ₹{(cf.principalRemaining! / 10000000).toFixed(2)} Cr
                    </span>
                  </div>
                  <div>
                    <span className="text-[#718EBF] block text-[11px]">Tenure</span>
                    <span className="font-space font-bold text-[#343C6A]">
                      {cf.tenureYears} Years remaining
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ADD CASHFLOW MODAL */}
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
                Add Cash Flow Item or Liability
              </h3>
              <p className="text-xs text-[#718EBF] mb-5">
                Record an income stream, household living expense, or mortgage liability.
              </p>

              <form onSubmit={handleCreateCashFlow} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-[#343C6A] mb-1 font-bold">Item Description *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Commercial Office Rental Inflow or Car Loan"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-3 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                    >
                      <option value="inflow">Inflow (Salary / Rent / Dividend)</option>
                      <option value="outflow_emi">Loan / Mortgage EMI</option>
                      <option value="outflow_living">Living / Schooling Expense</option>
                      <option value="outflow_tax">Tax / Advance Tax</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#343C6A] mb-1 font-bold">
                      Monthly Amount (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 100000"
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                    />
                  </div>
                </div>

                {type === "outflow_emi" && (
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#343C6A] mb-1 font-bold">
                        Outstanding Principal (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 5000000"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        className="w-full bg-[#F5F7FA] rounded-[15px] px-3 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#343C6A] mb-1 font-bold">Interest Rate</label>
                      <input
                        type="text"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full bg-[#F5F7FA] rounded-[15px] px-3 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#343C6A] mb-1 font-bold">Tenure (Years)</label>
                      <input
                        type="number"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        className="w-full bg-[#F5F7FA] rounded-[15px] px-3 py-3 text-sm text-[#343C6A] border border-[#DFEAF2]"
                      />
                    </div>
                  </div>
                )}

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
                    Save Cash Flow Item
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
