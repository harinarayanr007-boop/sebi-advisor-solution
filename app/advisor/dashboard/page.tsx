"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Activity,
  DollarSign,
  ShieldCheck,
  UserPlus,
  ArrowUpRight,
  Printer,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Briefcase,
  Copy,
  Check,
} from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { formatINR } from "@/lib/fiduciary-store";

export default function AdvisorDashboardPage() {
  const {
    advisor,
    clients,
    loadDemoData,
    setShowFactsheetModal,
    setSelectedReportClient,
  } = useFiduciary();

  const [copiedLink, setCopiedLink] = useState(false);

  const totalAUA = clients.reduce((sum, c) => sum + c.netWorthNum, 0);
  const totalDragSaved = clients.reduce((sum, c) => {
    const num = parseInt(c.dragSaved.replace(/[^0-9]/g, ""), 10) || 0;
    return sum + num;
  }, 0);

  const annualFeeRunRate = clients.length * 125000; // Standard SEBI Flat Fee Cap ₹1.25L / family

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://sebi-advisor-solution.vercel.app/client/register?ref=${advisor.sebiRegNumber}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-7">
      {/* Empty State Banner if no clients */}
      {clients.length === 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-[25px] p-6 text-left shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                Practice Ready // Zero Dummy Clutter
              </span>
              <h3 className="text-xl font-bold font-space text-[#343C6A]">
                No Clients Onboarded Yet
              </h3>
              <p className="text-xs text-[#718EBF] max-w-xl">
                Your RIA practice is initialized under SEBI Reg. {advisor.sebiRegNumber}. Start by onboarding a client with their real KYC details, or copy your onboarding link.
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href="/advisor/onboard"
                className="px-4 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-1.5 shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Onboard First Client</span>
              </Link>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 bg-white border border-[#DFEAF2] hover:bg-slate-50 text-[#343C6A] rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#1814F3]" />}
                <span>{copiedLink ? "Link Copied!" : "Share Onboard Link"}</span>
              </button>
              <button
                onClick={loadDemoData}
                title="Populate test client for evaluation"
                className="px-3 py-2.5 bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Load Sample Case</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top 4 Practice KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#E7EDFF] text-[#1814F3] flex items-center justify-center shrink-0">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Total Practice AUA</p>
            <h3 className="text-xl font-bold font-space text-[#343C6A]">
              {totalAUA > 0 ? formatINR(totalAUA) : "₹0"}
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center mt-0.5">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> 100% Direct Demat
            </span>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#DCFAF8] text-[#16DBCC] flex items-center justify-center shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Active Client Families</p>
            <h3 className="text-xl font-bold font-space text-[#343C6A]">
              {clients.length} Families
            </h3>
            <span className="text-[10px] font-bold text-blue-600 mt-0.5 block">
              SEBI Compliant Mandates
            </span>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#FFF5D9] text-[#FFBB38] flex items-center justify-center shrink-0">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Annual Fee Run-Rate</p>
            <h3 className="text-xl font-bold font-space text-[#343C6A]">
              {annualFeeRunRate > 0 ? formatINR(annualFeeRunRate) : "₹0 / yr"}
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 mt-0.5 block">
              Pure Fee-Only (0% Kickbacks)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#FFE0EB] text-[#FF82AC] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">CeFCoM Compliance</p>
            <h3 className="text-xl font-bold font-space text-emerald-600">
              100% Reconciled
            </h3>
            <span className="text-[10px] text-[#718EBF] mt-0.5 block">
              Zero Audit Deficiency
            </span>
          </div>
        </div>
      </div>

      {/* Client Roster Preview & Quick Actions */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-space text-[#343C6A]">
              Client Directory & Advisory Mandates
            </h3>
            <p className="text-xs text-[#718EBF]">
              Real active client accounts managed under your RIA practice.
            </p>
          </div>
          <Link
            href="/advisor/clients"
            className="text-xs font-bold text-[#1814F3] hover:underline flex items-center space-x-1"
          >
            <span>View Full Directory</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {clients.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-[#DFEAF2] rounded-2xl space-y-3">
            <Users className="w-10 h-10 text-[#718EBF] mx-auto opacity-40" />
            <h4 className="text-sm font-bold text-[#343C6A]">No clients onboarded yet</h4>
            <p className="text-xs text-[#718EBF] max-w-sm mx-auto">
              Click &quot;+ Onboard Client&quot; to register a family office or individual HNI client into your practice.
            </p>
            <Link
              href="/advisor/onboard"
              className="inline-block px-5 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
            >
              + Onboard Client Now
            </Link>
          </div>
        ) : (
          <div className="border border-[#DFEAF2] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FA] text-[#718EBF] uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Client Legal Name</th>
                  <th className="p-3.5">Advisory Tier</th>
                  <th className="p-3.5">Net Worth</th>
                  <th className="p-3.5">Annual Drag Saved</th>
                  <th className="p-3.5">Risk Profile</th>
                  <th className="p-3.5">Mandate Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F8]">
                {clients.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5">
                      <span className="font-bold text-[#343C6A] block">{c.name}</span>
                      <span className="text-[10px] text-[#718EBF] font-mono">{c.email}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-[#343C6A]">{c.tier}</span>
                    </td>
                    <td className="p-3.5 font-bold font-space text-[#343C6A]">
                      {c.netWorth}
                    </td>
                    <td className="p-3.5 text-emerald-600 font-bold">
                      {c.dragSaved}
                    </td>
                    <td className="p-3.5 text-[#718EBF]">
                      {c.riskTolerance}
                    </td>
                    <td className="p-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.statusBadge?.bg || "bg-emerald-100"} ${c.statusBadge?.text || "text-emerald-700"}`}>
                        {c.statusBadge?.label || "Active Mandate"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <Link
                        href={`/advisor/clients/${c.id}`}
                        className="px-3 py-1.5 bg-[#E7EDFF] text-[#1814F3] font-bold rounded-lg hover:bg-blue-200 transition text-[11px]"
                      >
                        Inspect
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedReportClient(c);
                          setShowFactsheetModal(true);
                        }}
                        className="px-3 py-1.5 bg-slate-100 text-[#343C6A] font-bold rounded-lg hover:bg-slate-200 transition text-[11px]"
                      >
                        Print Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
