"use client";

import React, { useEffect } from "react";
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
import {
  formatINR,
  sampleDemoClient,
  sampleDemoAssets,
  sampleDemoGoals,
  sampleDemoCashFlow,
  sampleDemoInsurance,
} from "@/lib/fiduciary-store";
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
    loginWithDemoClient,
  } = useFiduciary();

  // Passthrough for client login or registration sub-routes
  if (pathname === "/client/login" || pathname === "/client/register") {
    return <>{children}</>;
  }

  // Direct Access Auto-Hydration: If visitor opens /client/dashboard directly, auto-login as demo client or from ?magic= param
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const magicId = params.get("magic") || params.get("client") || params.get("auth");
      if (magicId) {
        loginAsClient(magicId);
        return;
      }
    }
    if (!session) {
      loginWithDemoClient();
    }
  }, [session, loginAsClient, loginWithDemoClient]);

  const displayClient = activeClient || sampleDemoClient;
  const displaySession = session || {
    role: "client" as const,
    userId: displayClient.id,
    name: displayClient.name,
    email: displayClient.email,
    clientId: displayClient.id,
    status: "active" as const,
  };

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

  // Pending Mandate Review Screen: Awaiting RIA Advisor Approval (Only when user explicitly registers and is pending)
  const isPendingApproval =
    session?.role === "client" &&
    (session?.status === "pending_approval" || activeClient?.status === "pending_approval");
  if (isPendingApproval) {
    return (
      <div className="min-h-screen bg-[#f8fbff] flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-2xl border border-[rgba(3,10,3,0.12)] p-8 max-w-lg w-full text-center shadow-xs space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#e8f3ff] text-[#1e90ff] flex items-center justify-center mx-auto border border-[rgba(30,144,255,0.2)]">
            <ShieldCheck size={32} weight="bold" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f3ff] border border-[rgba(30,144,255,0.2)] text-[#1e90ff] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#1e90ff] animate-pulse" aria-hidden="true" />
              <span>Awaiting RIA Advisor Mandate Acceptance</span>
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.4px] text-[#030a03]">
              Registration Under Fiduciary Review
            </h2>
            <p className="text-sm text-[#030a03]/70 leading-relaxed">
              Under SEBI (Investment Advisers) Regulations, 2013, our practice principal must review your investor classification and execute a statutory fiduciary mandate before enabling your portfolio dashboard.
            </p>
          </div>

          <div className="bg-[#f8fbff] rounded-xl p-4 border border-[rgba(3,10,3,0.08)] text-left text-xs space-y-2.5">
            <div className="flex justify-between border-b border-[rgba(3,10,3,0.06)] pb-2">
              <span className="text-[#030a03]/60">Registered Investor:</span>
              <span className="font-semibold text-[#030a03]">{session.name}</span>
            </div>
            <div className="flex justify-between border-b border-[rgba(3,10,3,0.06)] pb-2">
              <span className="text-[#030a03]/60">Registered Email:</span>
              <span className="font-mono text-[#030a03]">{session.email}</span>
            </div>
            <div className="flex justify-between border-b border-[rgba(3,10,3,0.06)] pb-2">
              <span className="text-[#030a03]/60">Advisory Practice:</span>
              <span className="font-semibold text-[#030a03]">{advisor.firmName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#030a03]/60">SEBI License:</span>
              <span className="font-mono font-medium text-[#1e90ff]">{advisor.sebiRegNumber}</span>
            </div>
          </div>

          <div className="p-3 bg-[#e8f3ff]/60 border border-[rgba(30,144,255,0.16)] rounded-xl text-xs text-[#030a03]/80 text-left leading-relaxed">
            <strong>Advisor Notice:</strong> {advisor.name} has received your application. Once verified on the RIA Onboarding desk, your dashboard will unlock immediately.
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
              className="w-full py-3 bg-[#1e90ff] hover:bg-[#0077e6] text-white rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-2 shadow-xs focus-visible:ring-2 focus-visible:ring-[#1e90ff] focus-visible:ring-offset-2 outline-none"
            >
              <span>Check / Refresh Mandate Status</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2.5 text-xs text-[#030a03]/60 hover:text-[#030a03] transition font-medium focus-visible:ring-2 focus-visible:ring-[#1e90ff] outline-none rounded-lg"
            >
              Sign Out / Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col antialiased font-sans text-[#030a03] relative">
      {/* Session Lock Privacy Overlay */}
      {isSessionLocked && (
        <div className="fixed inset-0 bg-[#030a03]/60 backdrop-blur-xs z-50 flex items-center justify-center p-6 font-sans">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-lg space-y-5 border border-[rgba(3,10,3,0.12)]">
            <div className="w-12 h-12 rounded-xl bg-[#e8f3ff] text-[#1e90ff] flex items-center justify-center mx-auto border border-[rgba(30,144,255,0.2)]">
              <LockKey size={26} weight="bold" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold tracking-[-0.2px] text-[#030a03]">
                Session Privacy Shield Active
              </h3>
              <p className="text-xs text-[#030a03]/70 leading-relaxed">
                Confidential portfolio metrics and folios are shielded to protect investor privacy.
              </p>
            </div>
            <button
              onClick={() => unlockSession()}
              className="w-full py-2.5 bg-[#1e90ff] hover:bg-[#0077e6] text-white rounded-xl text-xs font-semibold tracking-wide transition shadow-xs focus-visible:ring-2 focus-visible:ring-[#1e90ff] focus-visible:ring-offset-2 outline-none"
            >
              Unlock Fiduciary Screen
            </button>
          </div>
        </div>
      )}

      {/* 240px Fixed Left Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-[240px] bg-white border-r border-[rgba(3,10,3,0.12)] flex flex-col z-30 shadow-xs">
        {/* Brand Header */}
        <div className="h-[76px] flex items-center px-5 border-b border-[rgba(3,10,3,0.08)] space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#1e90ff] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            AF
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-semibold tracking-[-0.2px] text-[#030a03] leading-none truncate">
              Client Portal
            </h1>
            <span className="text-[10px] text-[#030a03]/50 font-medium tracking-wider block mt-1 uppercase">
              Aurum Fiduciary
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto" aria-label="Client navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs transition-all relative outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff] ${
                  isActive
                    ? "text-[#1e90ff] bg-[#e8f3ff] font-semibold border border-[rgba(30,144,255,0.16)]"
                    : "text-[#030a03]/70 hover:text-[#030a03] hover:bg-[#f8fbff]"
                }`}
              >
                <Icon
                  size={18}
                  weight={isActive ? "bold" : "regular"}
                  className={`mr-3 shrink-0 ${isActive ? "text-[#1e90ff]" : "text-[#030a03]/60"}`}
                  aria-hidden="true"
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Security Sentinel Status */}
        <div className="px-3.5 py-2 mx-3 mb-2 bg-[#f8fbff] border border-[rgba(3,10,3,0.08)] rounded-xl text-[10px] text-[#030a03]/70 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="font-mono font-medium">TLS 1.3 • AES-256 GCM</span>
        </div>

        {/* Assigned Advisor Info Card */}
        <div className="p-3.5 mx-3 mb-3 bg-[#e8f3ff]/50 border border-[rgba(30,144,255,0.16)] rounded-xl text-left">
          <div className="flex items-center space-x-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#1e90ff] mb-1">
            <ShieldCheck size={14} weight="bold" aria-hidden="true" />
            <span>Assigned SEBI RIA</span>
          </div>
          <p className="text-xs font-semibold text-[#030a03] truncate">{advisor.name}</p>
          <p className="text-[10px] text-[#030a03]/60 font-mono">{advisor.sebiRegNumber}</p>
          <p className="text-[10px] text-[#030a03]/60 truncate mt-0.5">{advisor.email}</p>
        </div>

        {/* Client Session & Action Controls */}
        <div className="p-3.5 border-t border-[rgba(3,10,3,0.08)] flex items-center justify-between">
          <div className="text-[10px] text-[#030a03]/60 min-w-0 pr-2">
            <span className="block font-medium text-[#030a03]/50">Investor Session</span>
            <span className="truncate max-w-[100px] block font-semibold text-[#030a03]">
              {displayClient.name}
            </span>
          </div>
          <div className="flex items-center space-x-1 shrink-0">
            <button
              onClick={lockSession}
              aria-label="Lock screen privacy"
              title="Lock Screen Privacy"
              className="p-1.5 text-[#030a03]/60 hover:text-[#1e90ff] hover:bg-[#e8f3ff] rounded-lg transition outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
            >
              <LockKey size={16} weight="bold" aria-hidden="true" />
            </button>
            <button
              onClick={handleLogout}
              aria-label="Sign out"
              title="Sign Out"
              className="p-1.5 text-[#030a03]/60 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
            >
              <SignOut size={16} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-[240px] flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-[76px] bg-white border-b border-[rgba(3,10,3,0.12)] flex items-center justify-between px-6 sm:px-8 sticky top-0 z-20">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-[-0.3px] text-[#030a03] leading-tight truncate">
              {displayClient.name}
            </h2>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-[11px] text-[#030a03]/60 font-mono">
                PAN: {displayClient.pan || "PENDING"} • CKYC: {displayClient.ckycId || "IN-CKYC-VERIFIED"}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#e8f3ff] text-[#1e90ff] border border-[rgba(30,144,255,0.16)]">
                Direct Demat Portfolio
              </span>
              {session?.role === "advisor" && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-800 border border-amber-200">
                  RIA Audit View
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Lock Session Screen */}
            <button
              onClick={lockSession}
              aria-label="Lock screen privacy"
              title="Lock Privacy Screen"
              className="flex items-center space-x-1 px-3 py-2 bg-white border border-[rgba(3,10,3,0.15)] hover:bg-[#f8fbff] text-[#030a03]/70 hover:text-[#030a03] rounded-xl text-xs font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
            >
              <LockKey size={14} weight="bold" aria-hidden="true" />
              <span>Lock</span>
            </button>

            {/* 1-Click Printable Dossier Button */}
            <button
              onClick={() => setShowFactsheetModal(true)}
              className="flex items-center space-x-2 px-3.5 py-2 bg-white border border-[rgba(3,10,3,0.15)] hover:bg-[#f8fbff] text-[#030a03] rounded-xl text-xs font-semibold transition shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#1e90ff]"
            >
              <Printer size={15} weight="bold" className="text-[#1e90ff]" aria-hidden="true" />
              <span>Print Fiduciary Dossier</span>
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 transition outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <SignOut size={15} weight="bold" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Content body */}
        <main className="p-6 sm:p-8 flex-1 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Institutional Fiduciary Print Dossier */}
      {showFactsheetModal && (
        <InstitutionalPrintDossier
          client={displayClient}
          advisor={advisor}
          assets={activeAssets.length > 0 ? activeAssets : sampleDemoAssets}
          goals={activeGoals.length > 0 ? activeGoals : sampleDemoGoals}
          cashFlow={activeCashFlow.length > 0 ? activeCashFlow : sampleDemoCashFlow}
          insurance={activeInsurance.length > 0 ? activeInsurance : sampleDemoInsurance}
          onClose={() => setShowFactsheetModal(false)}
        />
      )}
    </div>
  );
}
