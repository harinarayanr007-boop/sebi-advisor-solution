"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Target,
  PieChart,
  CreditCard,
  ShieldCheck,
  Scale,
  FileText,
  Printer,
  Download,
  Upload,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Lock,
  ChevronRight,
  Eye,
  FileCheck,
  Calendar,
  X,
  Search,
  Bell,
  LogOut,
  Wallet,
  Activity,
  ArrowRight,
  Percent,
} from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    session,
    logout,
    activeClient,
    advisor,
    activeAssets,
    activeGoals,
    showFactsheetModal,
    setShowFactsheetModal,
  } = useFiduciary();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/client/dashboard" },
    { label: "Direct Demat Assets", icon: Briefcase, href: "/client/assets" },
    { label: "Financial Goals", icon: Target, href: "/client/goals" },
    { label: "Cash Flow Waterfall", icon: CreditCard, href: "/client/cashflow" },
    { label: "Insurance Adequacy", icon: ShieldCheck, href: "/client/insurance" },
    { label: "SEBI Risk Profiler", icon: Scale, href: "/client/risk" },
    { label: "Statutory Vault", icon: FileText, href: "/client/vault" },
    { label: "Client Profile", icon: User, href: "/client/profile" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col antialiased font-sans text-[#343C6A]">
      {/* 250px Fixed Left Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-[250px] bg-white border-r border-[#E6EFF5] flex flex-col z-30 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
        {/* Brand Header */}
        <div className="h-[84px] flex items-center px-6 border-b border-[#E6EFF5] space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#1814F3] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            AF
          </div>
          <div>
            <h1 className="text-base font-bold font-space text-[#343C6A] tracking-tight leading-none">
              Client Portal
            </h1>
            <span className="text-[10px] text-[#718EBF] font-mono tracking-wider block mt-1">
              AURUM FIDUCIARY
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3.5 rounded-2xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? "text-[#1814F3] bg-[#F5F7FA] font-bold"
                    : "text-[#718EBF] hover:text-[#343C6A] hover:bg-slate-50"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#1814F3] rounded-r-full" />
                )}
                <Icon className={`w-5 h-5 mr-3.5 ${isActive ? "text-[#1814F3]" : "text-[#718EBF]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Assigned Advisor Info Card */}
        <div className="p-4 m-4 bg-[#F5F7FA] border border-[#DFEAF2] rounded-2xl text-left">
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-[#1814F3] mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Assigned SEBI RIA</span>
          </div>
          <p className="text-xs font-bold text-[#343C6A] truncate">{advisor.name}</p>
          <p className="text-[10px] text-[#718EBF] font-mono">{advisor.sebiRegNumber}</p>
          <p className="text-[10px] text-[#718EBF] truncate mt-0.5">{advisor.email}</p>
        </div>

        {/* Fiduciary Notice & Sign Out */}
        <div className="p-4 border-t border-[#E6EFF5] flex items-center justify-between">
          <div className="text-[10px] text-[#718EBF]">
            <span className="block font-semibold">Client Session</span>
            <span className="truncate max-w-[130px] block">{activeClient?.name || session?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 text-[#718EBF] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-[250px] flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-[84px] bg-white border-b border-[#E6EFF5] flex items-center justify-between px-8 sticky top-0 z-20 shadow-xs">
          <div>
            <h2 className="text-2xl font-bold font-space text-[#343C6A] leading-tight">
              {activeClient?.name || "Family Wealth Overview"}
            </h2>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-[11px] text-[#718EBF] font-mono">
                PAN: {activeClient?.pan || "PENDING"} • CKYC: {activeClient?.ckycId || "IN-CKYC-VERIFIED"}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">
                100% Direct Demat
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* 1-Click Printable Dossier Button */}
            <button
              onClick={() => setShowFactsheetModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-[#DFEAF2] hover:bg-[#F5F7FA] text-[#343C6A] rounded-2xl text-xs font-bold transition shadow-xs"
            >
              <Printer className="w-4 h-4 text-[#1814F3]" />
              <span>Print Fiduciary Dossier</span>
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-2xl border border-rose-200 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Content body */}
        <main className="p-8 flex-1 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Fiduciary Factsheet Modal */}
      {showFactsheetModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[25px] max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto border border-[#DFEAF2] shadow-2xl relative">
            <button
              onClick={() => setShowFactsheetModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-[#718EBF]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#DFEAF2] pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1814F3] bg-[#E7EDFF] px-3 py-1 rounded-full">
                    Statutory Compliance • SEBI (Investment Advisers) Regulations, 2013
                  </span>
                  <h3 className="text-2xl font-bold font-space text-[#343C6A] mt-2">
                    SEBI Fiduciary Portfolio Dossier
                  </h3>
                  <p className="text-xs text-[#718EBF]">
                    Prepared for: {activeClient?.name} • Reg RIA: {advisor.sebiRegNumber}
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#1814F3] text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

            <div className="space-y-6 text-xs text-[#343C6A]">
              <div className="grid grid-cols-3 gap-4 bg-[#F5F7FA] p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] text-[#718EBF] uppercase block font-semibold">Total Direct Net Worth</span>
                  <span className="text-base font-bold font-space text-[#343C6A]">{activeClient?.netWorth || "₹0"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#718EBF] uppercase block font-semibold">Annual Drag Eliminated</span>
                  <span className="text-base font-bold font-space text-emerald-600">{activeClient?.dragSaved || "₹0 / yr"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#718EBF] uppercase block font-semibold">Risk Classification</span>
                  <span className="text-base font-bold font-space text-[#1814F3]">{activeClient?.riskTolerance || "Balanced Growth"}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#718EBF] mb-2">Direct Demat Folios ({activeAssets.length})</h4>
                {activeAssets.length === 0 ? (
                  <p className="text-slate-400 italic">No direct assets recorded yet.</p>
                ) : (
                  <div className="border border-[#DFEAF2] rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-[#F5F7FA] text-[10px] text-[#718EBF] uppercase">
                        <tr>
                          <th className="p-3">Scheme / Asset</th>
                          <th className="p-3">Folio</th>
                          <th className="p-3">Current Value</th>
                          <th className="p-3">Direct TER</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F0F4F8]">
                        {activeAssets.map((a) => (
                          <tr key={a.id}>
                            <td className="p-3 font-semibold">{a.name}</td>
                            <td className="p-3 font-mono text-[11px] text-[#718EBF]">{a.folio}</td>
                            <td className="p-3 font-bold">₹{a.currentValue.toLocaleString("en-IN")}</td>
                            <td className="p-3 text-emerald-600 font-bold">{a.directExpenseRatio}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-900 leading-relaxed">
                <strong>Fiduciary Certification:</strong> Aurum Fiduciary Wealth Advisors (SEBI RIA {advisor.sebiRegNumber}) certifies that 100% of holdings are in zero-commission Direct Plans. Zero distribution kickbacks are accepted.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
