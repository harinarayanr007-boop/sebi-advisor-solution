"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  ShieldCheck,
  Briefcase,
  Target,
  CreditCard,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  Plus,
} from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { formatINR } from "@/lib/fiduciary-store";

export default function AdvisorClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    clients,
    assets,
    goals,
    cashFlow,
    insurance,
    updateClient,
    setShowFactsheetModal,
    setSelectedReportClient,
  } = useFiduciary();

  const client = clients.find((c) => c.id === id);

  const [notes, setNotes] = useState(client?.advisorNotes || "");
  const [savedNotes, setSavedNotes] = useState(false);

  if (!client) {
    return (
      <div className="space-y-6 text-center py-16">
        <h2 className="text-2xl font-bold font-space text-[#343C6A]">Client Record Not Found</h2>
        <p className="text-xs text-[#718EBF]">The client with ID &quot;{id}&quot; was not found in your active practice roster.</p>
        <Link
          href="/advisor/clients"
          className="inline-block px-5 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
        >
          ← Return to Client Roster
        </Link>
      </div>
    );
  }

  const clientAssets = assets.filter((a) => a.clientId === client.id);
  const clientGoals = goals.filter((g) => g.clientId === client.id);
  const clientCashFlow = cashFlow.filter((cf) => cf.clientId === client.id);
  const clientInsurance = insurance.filter((ins) => ins.clientId === client.id);

  const handleSaveNotes = () => {
    updateClient(client.id, { advisorNotes: notes });
    setSavedNotes(true);
    setTimeout(() => setSavedNotes(false), 2500);
  };

  const handlePrint = () => {
    setSelectedReportClient(client);
    setShowFactsheetModal(true);
  };

  return (
    <div className="space-y-7">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/advisor/clients"
            className="inline-flex items-center space-x-1 text-xs text-[#718EBF] hover:text-[#343C6A] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Clients</span>
          </Link>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold font-space text-[#343C6A]">
              {client.name}
            </h2>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                client.statusBadge?.bg || "bg-emerald-100"
              } ${client.statusBadge?.text || "text-emerald-700"}`}
            >
              {client.tier}
            </span>
          </div>
          <p className="text-xs text-[#718EBF] mt-1 font-mono">
            Client ID: {client.id} • PAN: {client.pan} • CKYC: {client.ckycId}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print Fiduciary Dossier</span>
        </button>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            Direct Net Worth
          </span>
          <h3 className="text-xl font-bold font-space text-[#343C6A] mt-1">{client.netWorth}</h3>
          <span className="text-[11px] text-blue-600 block mt-0.5">{clientAssets.length} Direct Folios</span>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
            Annual Commission Drag Saved
          </span>
          <h3 className="text-xl font-bold font-space text-emerald-600 mt-1">{client.dragSaved}</h3>
          <span className="text-[11px] text-[#718EBF] block mt-0.5">0% Distributor Trail</span>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            Risk Classification
          </span>
          <h3 className="text-xl font-bold font-space text-[#343C6A] mt-1">{client.riskTolerance}</h3>
          <span className="text-[11px] text-[#718EBF] block mt-0.5">Hurdle: {client.targetCAGR}</span>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            CeFCoM Compliance Escrow
          </span>
          <h3 className="text-xl font-bold font-space text-emerald-600 mt-1">100% Settled</h3>
          <span className="text-[10px] text-[#718EBF] block mt-0.5 font-mono">{client.cefcomUrn}</span>
        </div>
      </div>

      {/* Direct Demat Assets Inventory */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold font-space text-[#343C6A]">
            Direct Demat & Mutual Fund Holdings ({clientAssets.length})
          </h3>
        </div>

        {clientAssets.length === 0 ? (
          <p className="text-xs text-[#718EBF] italic p-4 bg-[#F5F7FA] rounded-xl">
            No direct holdings linked yet for this client account.
          </p>
        ) : (
          <div className="border border-[#DFEAF2] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FA] text-[#718EBF] uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Scheme / Asset</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Folio Number</th>
                  <th className="p-3.5">Current Value</th>
                  <th className="p-3.5">Direct TER</th>
                  <th className="p-3.5">Regular TER</th>
                  <th className="p-3.5">Annual Drag Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F8]">
                {clientAssets.map((a) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Goals & Cash Flow Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
          <h3 className="text-base font-bold font-space text-[#343C6A]">
            Financial Goals GPS ({clientGoals.length})
          </h3>
          {clientGoals.length === 0 ? (
            <p className="text-xs text-[#718EBF] italic">No goals registered.</p>
          ) : (
            <div className="space-y-3">
              {clientGoals.map((g) => (
                <div key={g.id} className="p-3.5 bg-[#F5F7FA] rounded-xl border border-[#DFEAF2] flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#343C6A] block">{g.title}</span>
                    <span className="text-[10px] text-[#718EBF]">{g.category} • Target: {g.targetYear}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-space text-[#343C6A] block">{formatINR(g.targetAmount)}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">{g.probabilityPercent}% Monte Carlo</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
          <h3 className="text-base font-bold font-space text-[#343C6A]">
            Insurance Protection Audit ({clientInsurance.length})
          </h3>
          {clientInsurance.length === 0 ? (
            <p className="text-xs text-[#718EBF] italic">No insurance policies audited.</p>
          ) : (
            <div className="space-y-3">
              {clientInsurance.map((ins) => (
                <div key={ins.id} className="p-3.5 bg-[#F5F7FA] rounded-xl border border-[#DFEAF2] flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#343C6A] block">{ins.title}</span>
                    <span className="text-[10px] text-[#718EBF]">{ins.provider}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 block">{ins.status}</span>
                    <span className="text-[10px] text-[#718EBF]">Cover: {ins.sumAssured}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Advisor Fiduciary Notes Editor */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold font-space text-[#343C6A]">
              Advisor Fiduciary Observations & Action Mandate
            </h3>
            <p className="text-xs text-[#718EBF]">
              Confidential compliance notes recorded under SEBI Regulation 17 audit requirements.
            </p>
          </div>
          {savedNotes && (
            <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Notes Saved!</span>
            </span>
          )}
        </div>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Record suitability notes, regular mutual fund transition steps, or tax-loss harvesting observations..."
          className="w-full p-4 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-xs text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSaveNotes}
            className="px-5 py-2.5 bg-[#343C6A] text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
          >
            Save Compliance Notes
          </button>
        </div>
      </div>
    </div>
  );
}
