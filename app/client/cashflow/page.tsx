"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Trash,
  TrendDown,
  TrendUp,
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { formatINR } from "@/lib/fiduciary-store";

export default function ClientCashFlowPage() {
  const { activeCashFlow, addCashFlow, deleteCashFlow } = useFiduciary();

  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"inflow" | "outflow_emi" | "outflow_living" | "outflow_tax">("inflow");
  const [monthlyAmount, setMonthlyAmount] = useState("");

  const totalInflows = activeCashFlow
    .filter((c) => c.type === "inflow")
    .reduce((sum, c) => sum + c.monthlyAmount, 0);

  const totalOutflows = activeCashFlow
    .filter((c) => c.type !== "inflow")
    .reduce((sum, c) => sum + c.monthlyAmount, 0);

  const netSurplus = Math.max(0, totalInflows - totalOutflows);
  const savingsRate = totalInflows > 0 ? Math.round((netSurplus / totalInflows) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCashFlow({
      title: title || "Monthly Cash Flow Item",
      type,
      monthlyAmount: Number(monthlyAmount) || 50000,
    });
    setTitle("");
    setMonthlyAmount("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-space text-[#343C6A]">
            Monthly Cash Flow & Liability Waterfall
          </h2>
          <p className="text-xs text-[#718EBF]">
            Map inflows against mortgage EMIs and household expenditures to establish direct investable surplus.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
        >
          <Plus size={16} weight="bold" />
          <span>+ Add Income / Liability</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
            Total Monthly Inflow
          </span>
          <h3 className="text-2xl font-bold font-space text-emerald-600 mt-2">
            ₹{totalInflows.toLocaleString("en-IN")} / mo
          </h3>
          <span className="text-[11px] text-[#718EBF] block mt-1">Salary & Business Revenue</span>
        </div>

        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
            Total Fixed Commitments & EMIs
          </span>
          <h3 className="text-2xl font-bold font-space text-rose-600 mt-2">
            ₹{totalOutflows.toLocaleString("en-IN")} / mo
          </h3>
          <span className="text-[11px] text-[#718EBF] block mt-1">Mortgages, Schooling & Living</span>
        </div>

        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1814F3] block">
            Net Investable Direct Surplus
          </span>
          <h3 className="text-2xl font-bold font-space text-[#1814F3] mt-2">
            ₹{netSurplus.toLocaleString("en-IN")} / mo
          </h3>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            {savingsRate}% Fiduciary Savings Rate
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
        <h3 className="text-base font-bold font-space text-[#343C6A]">
          Cash Flow Line Items
        </h3>

        {activeCashFlow.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-[#DFEAF2] rounded-2xl space-y-3">
            <CreditCard size={36} weight="duotone" className="text-[#718EBF] mx-auto opacity-40" />
            <h4 className="text-sm font-bold text-[#343C6A]">No cash flow items recorded yet</h4>
            <p className="text-xs text-[#718EBF] max-w-sm mx-auto">
              Record your monthly income and recurring loan EMIs to calculate your net investable capacity.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
            >
              + Add First Cash Flow Item
            </button>
          </div>
        ) : (
          <div className="border border-[#DFEAF2] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FA] text-[#718EBF] uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Source / Commitment</th>
                  <th className="p-3.5">Flow Type</th>
                  <th className="p-3.5">Monthly Amount</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F8]">
                {activeCashFlow.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-[#343C6A]">{c.title}</td>
                    <td className="p-3.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          c.type === "inflow"
                            ? "bg-emerald-100 text-emerald-800"
                            : c.type === "outflow_emi"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {c.type === "inflow" ? "Inflow (+)" : c.type === "outflow_emi" ? "Loan EMI (-)" : "Expense (-)"}
                      </span>
                    </td>
                    <td
                      className={`p-3.5 font-bold font-space ${
                        c.type === "inflow" ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {c.type === "inflow" ? "+" : "-"}₹{c.monthlyAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => deleteCashFlow(c.id)}
                        className="p-1.5 text-[#718EBF] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash size={16} weight="bold" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[25px] max-w-lg w-full p-6 border border-[#DFEAF2] shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-space text-[#343C6A]">
              + Add Monthly Cash Flow Item
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Consulting Retainer / Primary Residence EMI"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Flow Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
                  >
                    <option value="inflow">Monthly Inflow / Income</option>
                    <option value="outflow_emi">Loan / Mortgage EMI</option>
                    <option value="outflow_living">Household Living Expense</option>
                    <option value="outflow_tax">Advance Tax Outflow</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#343C6A] mb-1">Monthly Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 120000"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(e.target.value)}
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
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
