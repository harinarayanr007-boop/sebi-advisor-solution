"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChartBar,
  Users,
  UserPlus,
  ShieldCheck,
  FileText,
  Gear,
  Printer,
  SignOut,
  SealCheck,
  X,
  LockKey,
  Warning,
  ArrowRight,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function AdvisorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    session,
    advisor,
    clients,
    logout,
    showFactsheetModal,
    setShowFactsheetModal,
    selectedReportClient,
    setSelectedReportClient,
    isSessionLocked,
    lockSession,
    unlockSession,
    loginAsAdvisor,
  } = useFiduciary();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { label: "Practice Dashboard", icon: ChartBar, href: "/advisor/dashboard" },
    { label: "Client Roster", icon: Users, href: "/advisor/clients" },
    { label: "Onboard New Client", icon: UserPlus, href: "/advisor/onboard" },
    { label: "SEBI Compliance & Form B", icon: ShieldCheck, href: "/advisor/compliance" },
    { label: "Fiduciary Reports", icon: FileText, href: "/advisor/reports" },
    { label: "Practice Settings", icon: Gear, href: "/advisor/settings" },
  ];

  // Role Security Guard: Must be logged in
  if (!session) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-[25px] border border-[#DFEAF2] p-8 max-w-md w-full text-center shadow-lg space-y-5">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-[#343C6A] flex items-center justify-center mx-auto shadow-sm">
            <LockKey size={28} weight="bold" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-space text-[#343C6A]">
              RIA Principal Access Restricted
            </h2>
            <p className="text-xs text-[#718EBF] mt-1.5 leading-relaxed">
              SEBI Regulation 19 mandates authorized credential verification before granting access to RIA practice registries and client mandates.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                loginAsAdvisor();
                router.push("/advisor/dashboard");
              }}
              className="w-full py-3 bg-[#343C6A] text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition flex items-center justify-center space-x-2"
            >
              <span>Authenticate As RIA Principal</span>
              <ArrowRight size={16} weight="bold" />
            </button>
            <Link
              href="/admin"
              className="w-full py-3 bg-slate-50 border border-[#DFEAF2] text-[#343C6A] rounded-xl text-xs font-bold hover:bg-slate-100 transition block text-center"
            >
              Go to RIA Admin Login (/admin) →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Cross-Role Isolation: Client cannot snoop into Advisor Practice
  if (session.role !== "advisor") {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-[25px] border border-amber-300 p-8 max-w-md w-full text-center shadow-lg space-y-5">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
            <Warning size={32} weight="bold" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-space text-[#343C6A]">
              Access Denied: 403 Forbidden
            </h2>
            <p className="text-xs text-[#718EBF] mt-1.5 leading-relaxed">
              You are currently authenticated as Client: <strong className="text-[#343C6A]">{session.name}</strong>. Access to RIA Practice Management, client master registries, and compliance audit desks is restricted to licensed SEBI RIA personnel (INA000015845).
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <Link
              href="/client/dashboard"
              className="w-full py-3 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition block text-center"
            >
              Return to Your Client Wealth Portal →
            </Link>
            <button
              onClick={() => {
                loginAsAdvisor();
                router.push("/advisor/dashboard");
              }}
              className="w-full py-3 bg-slate-100 text-[#343C6A] rounded-xl text-xs font-bold hover:bg-slate-200 transition"
            >
              Switch to RIA Principal Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col antialiased font-sans text-[#343C6A] relative">
      {/* Session Lock Privacy Overlay */}
      {isSessionLocked && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-6 font-sans">
          <div className="bg-white rounded-[25px] p-8 max-w-sm w-full text-center shadow-2xl space-y-5 border border-slate-200">
            <div className="w-14 h-14 rounded-full bg-[#343C6A]/10 text-[#343C6A] flex items-center justify-center mx-auto">
              <LockKey size={30} weight="fill" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-space text-[#343C6A]">
                RIA Practice Desk Locked
              </h3>
              <p className="text-xs text-[#718EBF] mt-1">
                Client PII and compliance ledgers are locked to prevent unauthorized viewing.
              </p>
            </div>
            <button
              onClick={() => unlockSession()}
              className="w-full py-3 bg-[#343C6A] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition shadow-sm"
            >
              Unlock RIA Desk
            </button>
          </div>
        </div>
      )}

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
                <Icon
                  size={20}
                  weight={isActive ? "fill" : "regular"}
                  className={`mr-3.5 ${isActive ? "text-[#1814F3]" : "text-[#718EBF]"}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Security Sentinel Status */}
        <div className="px-4 py-2 mx-4 mb-2 bg-emerald-50/80 border border-emerald-200 rounded-xl text-[10px] text-emerald-800 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">SEBI Reg 19 Audit Active</span>
        </div>

        {/* License Verification Card */}
        <div className="p-4 mx-4 mb-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-2xl text-left">
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <SealCheck size={16} weight="fill" />
            <span>Fiduciary License Active</span>
          </div>
          <p className="text-xs font-bold text-[#343C6A] truncate">{advisor.firmName}</p>
          <p className="text-[10px] text-[#718EBF] font-mono">{advisor.baslMembership}</p>
        </div>

        {/* Advisor Sign Out & Screen Lock */}
        <div className="p-4 border-t border-[#E6EFF5] flex items-center justify-between">
          <div className="text-[10px] text-[#718EBF]">
            <span className="block font-semibold">RIA Principal</span>
            <span className="truncate max-w-[110px] block font-bold text-[#343C6A]">{advisor.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={lockSession}
              title="Lock Screen Privacy"
              className="p-2 text-[#718EBF] hover:text-[#343C6A] hover:bg-slate-100 rounded-xl transition"
            >
              <LockKey size={17} weight="bold" />
            </button>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-[#718EBF] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              <SignOut size={17} weight="bold" />
            </button>
          </div>
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

          <div className="flex items-center space-x-3">
            {/* Lock Session Screen */}
            <button
              onClick={lockSession}
              title="Lock Privacy Screen"
              className="flex items-center space-x-1.5 px-3 py-2 bg-white border border-[#DFEAF2] hover:bg-[#F5F7FA] text-[#718EBF] hover:text-[#343C6A] rounded-xl text-xs font-semibold transition"
            >
              <LockKey size={15} weight="bold" />
              <span>Lock</span>
            </button>

            <Link
              href="/advisor/onboard"
              className="flex items-center space-x-2 px-4 py-2.5 bg-[#1814F3] text-white rounded-2xl text-xs font-bold hover:bg-blue-700 transition shadow-sm"
            >
              <UserPlus size={16} weight="bold" />
              <span>+ Onboard Client</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-2xl border border-rose-200 transition"
            >
              <SignOut size={16} weight="bold" />
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
              <X size={20} weight="bold" />
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
                  <Printer size={16} weight="bold" />
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
