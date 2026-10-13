"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ShieldCheck,
  FileText,
  Settings,
  Printer,
  Download,
  Search,
  Bell,
  LogOut,
  X,
  Award,
  DollarSign,
  Activity,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function AdvisorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    advisor,
    clients,
    logout,
    showFactsheetModal,
    setShowFactsheetModal,
    selectedReportClient,
    setSelectedReportClient,
  } = useFiduciary();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { label: "Practice Dashboard", icon: LayoutDashboard, href: "/advisor/dashboard" },
    { label: "Client Roster", icon: Users, href: "/advisor/clients" },
    { label: "Onboard New Client", icon: UserPlus, href: "/advisor/onboard" },
    { label: "SEBI Compliance & Form B", icon: ShieldCheck, href: "/advisor/compliance" },
    { label: "Fiduciary Reports", icon: FileText, href: "/advisor/reports" },
    { label: "Practice Settings", icon: Settings, href: "/advisor/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col antialiased font-sans text-[#343C6A]">
      {/* 250px Fixed Left Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-[250px] bg-white border-r border-[#E6EFF5] flex flex-col z-30 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
        {/* Brand Header */}
        <div className="h-[84px] flex items-center px-6 border-b border-[#E6EFF5] space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#343C6A] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            AF
          </div>
          <div>
            <h1 className="text-base font-bold font-space text-[#343C6A] tracking-tight leading-none">
              RIA Practice Desk
            </h1>
            <span className="text-[10px] text-emerald-700 font-mono tracking-wider block mt-1">
              SEBI INA000015845
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/advisor/dashboard" && pathname.startsWith(item.href));
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

        {/* License Verification Card */}
        <div className="p-4 m-4 bg-[#F5F7FA] border border-[#DFEAF2] rounded-2xl text-left">
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Fiduciary License Active</span>
          </div>
          <p className="text-xs font-bold text-[#343C6A] truncate">{advisor.firmName}</p>
          <p className="text-[10px] text-[#718EBF] font-mono">{advisor.baslMembership}</p>
        </div>

        {/* Advisor Sign Out */}
        <div className="p-4 border-t border-[#E6EFF5] flex items-center justify-between">
          <div className="text-[10px] text-[#718EBF]">
            <span className="block font-semibold">RIA Principal</span>
            <span className="truncate max-w-[130px] block font-bold text-[#343C6A]">{advisor.name}</span>
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
              Fiduciary Practice Command
            </h2>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-[11px] text-[#718EBF] font-mono">
                {advisor.firmName} • BASL Member {advisor.baslMembership}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                100% Fee-Only (0% Commissions)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/advisor/onboard"
              className="flex items-center space-x-2 px-4 py-2.5 bg-[#1814F3] text-white rounded-2xl text-xs font-bold hover:bg-blue-700 transition shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Onboard Client</span>
            </Link>

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
      {showFactsheetModal && selectedReportClient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[25px] max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto border border-[#DFEAF2] shadow-2xl relative">
            <button
              onClick={() => {
                setShowFactsheetModal(false);
                setSelectedReportClient(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-[#718EBF]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#DFEAF2] pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1814F3] bg-[#E7EDFF] px-3 py-1 rounded-full">
                    Official SEBI Fiduciary Practice Review
                  </span>
                  <h3 className="text-2xl font-bold font-space text-[#343C6A] mt-2">
                    Client Suitability & Portfolio Dossier
                  </h3>
                  <p className="text-xs text-[#718EBF]">
                    Client: {selectedReportClient.name} • PAN: {selectedReportClient.pan} • Prepared by: {advisor.name}
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
                  <span className="text-[10px] text-[#718EBF] uppercase block font-semibold">Net Worth</span>
                  <span className="text-base font-bold font-space text-[#343C6A]">{selectedReportClient.netWorth}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#718EBF] uppercase block font-semibold">Annual Drag Saved</span>
                  <span className="text-base font-bold font-space text-emerald-600">{selectedReportClient.dragSaved}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#718EBF] uppercase block font-semibold">Risk Classification</span>
                  <span className="text-base font-bold font-space text-[#1814F3]">{selectedReportClient.riskTolerance}</span>
                </div>
              </div>

              <div className="p-4 border border-[#DFEAF2] rounded-2xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#718EBF]">Advisor Fiduciary Observations</h4>
                <p className="text-xs text-[#343C6A] leading-relaxed">
                  {selectedReportClient.advisorNotes || "Client evaluated under SEBI Regulation 17 suitability criteria. 100% direct portfolio transition recommended."}
                </p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-900 leading-relaxed">
                <strong>SEBI RIA Certification:</strong> Certified under Regulation 15 of SEBI (Investment Advisers) Regulations, 2013. The advisory firm accepts zero third-party commissions and acts strictly in a fiduciary capacity.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
