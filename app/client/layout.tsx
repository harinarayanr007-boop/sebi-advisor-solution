"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChartPieSlice,
  Briefcase,
  Target,
  CreditCard,
  ShieldCheck,
  Scales,
  FileText,
  User,
  Printer,
  SignOut,
  X,
  CheckCircle,
  Eye,
  LockKey,
  ShieldSlash,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { formatINR } from "@/lib/fiduciary-store";
import InstitutionalPrintDossier from "@/components/InstitutionalPrintDossier";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    session,
    logout,
    activeClient,
    advisor,
    clients,
    activeAssets,
    activeGoals,
    activeCashFlow,
    activeInsurance,
    showFactsheetModal,
    setShowFactsheetModal,
    isSessionLocked,
    lockSession,
    unlockSession,
    loginAsClient,
  } = useFiduciary();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { label: "Overview", icon: ChartPieSlice, href: "/client/dashboard" },
    { label: "Direct Demat Assets", icon: Briefcase, href: "/client/assets" },
    { label: "Financial Goals", icon: Target, href: "/client/goals" },
    { label: "Cash Flow Waterfall", icon: CreditCard, href: "/client/cashflow" },
    { label: "Insurance Adequacy", icon: ShieldCheck, href: "/client/insurance" },
    { label: "SEBI Risk Profiler", icon: Scales, href: "/client/risk" },
    { label: "Statutory Vault", icon: FileText, href: "/client/vault" },
    { label: "Client Profile", icon: User, href: "/client/profile" },
  ];

  if (!session) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-[25px] border border-[#DFEAF2] p-8 max-w-md w-full text-center shadow-lg space-y-5">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
            <LockKey size={28} weight="bold" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-space text-[#343C6A]">
              Fiduciary Authentication Required
            </h2>
            <p className="text-xs text-[#718EBF] mt-1.5 leading-relaxed">
              Access to client wealth dossiers and direct demat folios is restricted under SEBI (Investment Advisers) Regulations, 2013. Please sign in to authenticate.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                loginAsClient();
                router.push("/client/dashboard");
              }}
              className="w-full py-3 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <span>Authenticate As Client (Demo)</span>
              <ArrowRight size={16} weight="bold" />
            </button>
            <Link
              href="/login"
              className="w-full py-3 bg-slate-50 border border-[#DFEAF2] text-[#343C6A] rounded-xl text-xs font-bold hover:bg-slate-100 transition block text-center"
            >
              Go to Portal Gateway →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Pending Mandate Review Screen: Awaiting RIA Advisor Approval
  const isPendingApproval = session?.status === "pending_approval" || activeClient?.status === "pending_approval";
  if (isPendingApproval) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-[25px] border border-amber-200 p-8 max-w-lg w-full text-center shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-sm border border-amber-200">
            <ShieldCheck size={36} weight="duotone" className="text-amber-500" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Awaiting RIA Advisor Mandate Acceptance</span>
            </div>
            <h2 className="text-2xl font-bold font-space text-[#343C6A]">
              Registration Under Fiduciary Review
            </h2>
            <p className="text-xs text-[#718EBF] mt-2 leading-relaxed">
              Under SEBI (Investment Advisers) Regulations, 2013, our practice principal must review your investor classification and execute a statutory fiduciary mandate before enabling your portfolio dashboard.
            </p>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#DFEAF2] text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-[#F0F4F8] pb-1.5">
              <span className="text-[#718EBF]">Registered Investor:</span>
              <span className="font-bold text-[#343C6A]">{session.name}</span>
            </div>
            <div className="flex justify-between border-b border-[#F0F4F8] pb-1.5">
              <span className="text-[#718EBF]">Registered Email:</span>
              <span className="font-mono text-[#343C6A]">{session.email}</span>
            </div>
            <div className="flex justify-between border-b border-[#F0F4F8] pb-1.5">
              <span className="text-[#718EBF]">Advisory Practice:</span>
              <span className="font-bold text-[#343C6A]">{advisor.firmName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#718EBF]">SEBI License:</span>
              <span className="font-mono text-[#1814F3]">{advisor.sebiRegNumber}</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-[#343C6A] text-left leading-relaxed">
            💡 <strong>Advisor Action Required:</strong> Devendra Vora, CFP has received your application. Once approved on the RIA Practice Onboarding desk, your dashboard will unlock automatically.
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                const fresh = clients.find(
                  (c) => c.email.toLowerCase() === session.email.toLowerCase() || c.id === session.clientId
                );
                if (fresh && fresh.status === "active") {
                  loginAsClient(fresh.id, fresh.email);
                } else {
                  alert("Application is still pending review by the RIA Practice Lead. Please check back shortly.");
                }
              }}
              className="w-full py-3 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Check / Refresh Mandate Status</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2.5 text-xs text-[#718EBF] hover:text-[#343C6A] transition font-semibold"
            >
              Sign Out / Return to Login
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
            <div className="w-14 h-14 rounded-full bg-[#1814F3]/10 text-[#1814F3] flex items-center justify-center mx-auto">
              <LockKey size={30} weight="fill" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-space text-[#343C6A]">
                Session Privacy Shield Active
              </h3>
              <p className="text-xs text-[#718EBF] mt-1">
                Confidential financial figures and folios are locked to prevent shoulder-surfing.
              </p>
            </div>
            <button
              onClick={() => unlockSession()}
              className="w-full py-3 bg-[#1814F3] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition shadow-sm"
            >
              Unlock Fiduciary Screen
            </button>
          </div>
        </div>
      )}

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
          <span className="font-semibold">TLS 1.3 • AES-256 GCM</span>
        </div>

        {/* Assigned Advisor Info Card */}
        <div className="p-4 mx-4 mb-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-2xl text-left">
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-[#1814F3] mb-1">
            <ShieldCheck size={16} weight="fill" />
            <span>Assigned SEBI RIA</span>
          </div>
          <p className="text-xs font-bold text-[#343C6A] truncate">{advisor.name}</p>
          <p className="text-[10px] text-[#718EBF] font-mono">{advisor.sebiRegNumber}</p>
          <p className="text-[10px] text-[#718EBF] truncate mt-0.5">{advisor.email}</p>
        </div>

        {/* Fiduciary Notice, Screen Lock & Sign Out */}
        <div className="p-4 border-t border-[#E6EFF5] flex items-center justify-between">
          <div className="text-[10px] text-[#718EBF]">
            <span className="block font-semibold">Client Session</span>
            <span className="truncate max-w-[110px] block font-medium">{activeClient?.name || session?.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={lockSession}
              title="Lock Screen Privacy"
              className="p-2 text-[#718EBF] hover:text-[#1814F3] hover:bg-blue-50 rounded-xl transition"
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
              {activeClient?.name || "Family Wealth Overview"}
            </h2>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-[11px] text-[#718EBF] font-mono">
                PAN: {activeClient?.pan || "PENDING"} • CKYC: {activeClient?.ckycId || "IN-CKYC-VERIFIED"}
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-[#E7EDFF] text-[#1814F3] border border-[#DFEAF2]">
                Direct Demat Portfolio
              </span>
              {session?.role === "advisor" && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  RIA Supervisory Audit Mode
                </span>
              )}
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

            {/* 1-Click Printable Dossier Button */}
            <button
              onClick={() => setShowFactsheetModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-[#DFEAF2] hover:bg-[#F5F7FA] text-[#343C6A] rounded-2xl text-xs font-bold transition shadow-xs"
            >
              <Printer size={16} weight="bold" className="text-[#1814F3]" />
              <span>Print Fiduciary Dossier</span>
            </button>

            {/* Logout button */}
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

      {/* Institutional Fiduciary Print Dossier */}
      {showFactsheetModal && activeClient && (
        <InstitutionalPrintDossier
          client={activeClient}
          advisor={advisor}
          assets={activeAssets}
          goals={activeGoals}
          cashFlow={activeCashFlow}
          insurance={activeInsurance}
          onClose={() => setShowFactsheetModal(false)}
        />
      )}
    </div>
  );
}
