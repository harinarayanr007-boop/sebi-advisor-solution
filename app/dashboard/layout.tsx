"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Clock,
  ArrowRight,
  TrendingUp,
  Building,
  AlertCircle,
  Sparkles,
  Lock,
  ChevronRight,
  Eye,
  FileCheck,
  Calendar,
  X,
  Copy,
  Zap,
  Search,
  Bell,
  Settings,
  HelpCircle,
  DollarSign,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  FileUp,
  FileSpreadsheet,
  Layers,
  Send,
  Users,
  UserCheck,
  UserPlus,
  Filter,
  Check,
  ChevronDown,
  BarChart3,
  Award,
  Wallet,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FiduciaryProvider, useFiduciary } from "@/context/FiduciaryContext";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    activeClient,
    clients,
    setActiveClientId,
    viewMode,
    setViewMode,
    showFactsheetModal,
    setShowFactsheetModal,
    showInviteModal,
    setShowInviteModal,
    addClient,
  } = useFiduciary();

  const [copiedLink, setCopiedLink] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePhone, setInvitePhone] = useState("");
  const [inviteTier, setInviteTier] = useState<"Emerging HNI" | "Core HNI" | "UHNI">("Core HNI");

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(
      `https://aurumfiduciary.in/onboard?token=AUTH-${Math.random().toString(36).substring(2, 9).toUpperCase()}&ref=RIA-1892`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCreateNewClient = () => {
    if (!inviteName.trim()) {
      alert("Please provide the client legal name.");
      return;
    }
    addClient({
      name: inviteName,
      email: inviteEmail || `${inviteName.toLowerCase().replace(/\s+/g, ".")}@clientcorp.in`,
      phone: invitePhone || "+91 98200 44109",
      city: "Mumbai",
      tier: inviteTier,
      netWorth: inviteTier === "UHNI" ? "₹20,00,000,000" : inviteTier === "Core HNI" ? "₹6,50,00,000" : "₹3,20,00,000",
      liquidSurplus: inviteTier === "UHNI" ? "₹16,00,00,000" : "₹5,00,00,000",
      monthlySurplus: inviteTier === "UHNI" ? "₹9,50,000" : "₹3,40,00,000",
      dragSaved: inviteTier === "UHNI" ? "₹16,00,000 / yr" : "₹5,20,000 / yr",
      riskTolerance: "Balanced Strategic Growth",
      targetCAGR: "11.8% CAGR",
      onboardingStage: "Stage 1 Cleared // e-KYC Ingestion",
      statusBadge: {
        label: "Ready for Execution",
        bg: "bg-emerald-100",
        text: "text-emerald-700",
      },
      pan: "AAACB" + Math.floor(1000 + Math.random() * 9000) + "K",
      aadhaarMasked: "XXXX-XXXX-" + Math.floor(1000 + Math.random() * 9000),
      ckycId: "IN-CKYC-2026-" + Math.floor(1000000 + Math.random() * 9000000),
      cefcomUrn: "URN-BASL-15845-" + Math.floor(1000 + Math.random() * 9000),
      employer: "Private Enterprise",
      designation: "Executive Director",
      grossCtc: "₹85,00,000 / annum",
      equityAlloc: 65,
      debtAlloc: 25,
      goldAlloc: 10,
      advisorNotes: "New client intake generated via Advisor Command Center.",
    });
    alert(`Client ${inviteName} successfully created and added to the roster!`);
    setShowInviteModal(false);
    setInviteName("");
    setInviteEmail("");
    setInvitePhone("");
  };

  // Nav Links for Client View
  const clientNav = [
    { href: "/dashboard", label: "My Wealth Overview", icon: LayoutDashboard },
    { href: "/dashboard/assets", label: "Direct Demat Holdings", icon: PieChart },
    { href: "/dashboard/goals", label: "Goals & Milestones", icon: Target },
    { href: "/dashboard/cashflow", label: "Cash Flow & Liabilities", icon: Wallet },
    { href: "/dashboard/insurance", label: "Insurance & Protection", icon: ShieldCheck },
    { href: "/dashboard/risk", label: "SEBI Risk Mandate", icon: Scale },
    { href: "/dashboard/profile", label: "Profile & Identity", icon: User },
    { href: "/dashboard/vault", label: "Statutory Vault", icon: FileText },
  ];

  // Nav Links for Advisor RIA View
  const advisorNav = [
    { href: "/dashboard", label: "Practice Command", icon: LayoutDashboard },
    { href: "/dashboard/clients", label: "Client Management Roster", icon: Users },
    { href: "/dashboard/assets", label: "Direct Demat Audit", icon: PieChart },
    { href: "/dashboard/cashflow", label: "Fee Cash Flow & Escrow", icon: Wallet },
    { href: "/dashboard/risk", label: "Risk Suitability Audit", icon: Scale },
    { href: "/dashboard/vault", label: "SEBI Regulatory Vault", icon: FileText },
  ];

  const currentNav = viewMode === "client" ? clientNav : advisorNav;

  // Header Title Resolver
  const getHeaderTitle = () => {
    if (viewMode === "advisor") {
      if (pathname === "/dashboard") return "Advisor Practice Command Center";
      if (pathname === "/dashboard/clients") return "Client Management Roster (48 Families)";
      if (pathname === "/dashboard/assets") return "Direct Demat Practice Holdings Audit";
      if (pathname === "/dashboard/cashflow") return "Practice Fee Cash Flow & CeFCoM Escrow";
      if (pathname === "/dashboard/risk") return "SEBI Regulation 17 Suitability Audits";
      if (pathname === "/dashboard/vault") return "SEBI Regulatory Vault & Records";
    }
    if (pathname === "/dashboard") return "My Wealth Overview";
    if (pathname === "/dashboard/clients") return "Client Directory";
    if (pathname === "/dashboard/assets") return "Direct Demat Holdings";
    if (pathname === "/dashboard/goals") return "Goals & Milestones";
    if (pathname === "/dashboard/cashflow") return "Cash Flow & Liabilities";
    if (pathname === "/dashboard/insurance") return "Insurance & Protection Audit";
    if (pathname === "/dashboard/risk") return "SEBI Mandated Risk Assessment";
    if (pathname === "/dashboard/profile") return "Profile & Identity";
    if (pathname === "/dashboard/vault") return "Statutory Document Vault";
    return "Fiduciary Portal";
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#343C6A] font-sans flex flex-col md:flex-row antialiased">
      {/* ------------------------------------------------------------- */}
      {/* LEFT FIXED SIDEBAR (BankDash Style, 250px)                    */}
      {/* ------------------------------------------------------------- */}
      <aside className="w-full md:w-[250px] md:min-h-screen bg-white border-r border-[#E6EFF5] flex flex-col justify-between shrink-0 z-30">
        <div>
          {/* Brand Header */}
          <div className="h-20 flex items-center px-6 border-b border-[#F5F7FA]">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="h-9 w-9 rounded-full border border-amber-300 overflow-hidden shrink-0 bg-white p-0.5 shadow-sm group-hover:scale-105 transition-transform">
                <Image
                  src="/images/fiduciary-seal.jpg"
                  alt="Aurum Seal"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-jakarta font-extrabold text-[17px] tracking-tight text-[#343C6A] group-hover:text-[#1814F3] transition-colors">
                  BankDash<span className="text-[#1814F3]">.</span>
                </span>
                <span className="text-[10px] font-space font-semibold text-[#718EBF] uppercase tracking-wider">
                  Aurum Fiduciary RIA
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="py-6 space-y-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center px-6 py-3 text-sm font-semibold transition-all relative ${
                    isActive
                      ? "text-[#1814F3]"
                      : "text-[#B1B1B1] hover:text-[#343C6A] hover:bg-[#F5F7FA]/70"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSidePillLayout"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#1814F3] rounded-r-full"
                    />
                  )}
                  <Icon
                    className={`w-5 h-5 mr-3.5 transition-colors ${
                      isActive ? "text-[#1814F3]" : "text-[#B1B1B1]"
                    }`}
                  />
                  <span className="tracking-tight text-xs sm:text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Practice Role & RIA Mandate Badge */}
        <div className="p-5 border-t border-[#F5F7FA] bg-[#FBFDFF]">
          <div className="bg-[#F5F7FA] rounded-[18px] p-4 border border-[#DFEAF2]/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-space font-bold uppercase tracking-wider text-[#718EBF]">
                Regulatory Seal
              </span>
              <span className="text-[10px] font-space font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                Active RIA
              </span>
            </div>
            <p className="text-xs font-bold text-[#343C6A]">SEBI INA000019842</p>
            <p className="text-[11px] text-[#718EBF] mt-0.5">
              BASL-1892 • 100% Direct Demat
            </p>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN LAYOUT CONTENT                                           */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP NAVBAR (BankDash Style, 80px) */}
        <header className="h-20 bg-white border-b border-[#E6EFF5] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-jakarta text-[#343C6A]">
              {getHeaderTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Pill */}
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 text-[#718EBF] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={
                  viewMode === "advisor"
                    ? "Search 48 clients, PAN, tier..."
                    : "Search assets, folios, ISIN..."
                }
                className="bg-[#F5F7FA] rounded-full pl-11 pr-5 py-2.5 text-xs sm:text-sm text-[#343C6A] placeholder-[#8BA3CB] focus:outline-none focus:ring-2 focus:ring-[#1814F3]/20 w-56 xl:w-64 transition-all"
              />
            </div>

            {/* SEPARATE VIEW SWITCHER (Client Portal vs Advisor Command Center) */}
            <div className="flex items-center bg-[#F5F7FA] p-1 rounded-full border border-[#DFEAF2]">
              <button
                onClick={() => setViewMode("client")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === "client"
                    ? "bg-white text-[#1814F3] shadow-sm"
                    : "text-[#718EBF] hover:text-[#343C6A]"
                }`}
              >
                Client Portal
              </button>
              <button
                onClick={() => setViewMode("advisor")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === "advisor"
                    ? "bg-[#1814F3] text-white shadow-sm"
                    : "text-[#718EBF] hover:text-[#343C6A]"
                }`}
              >
                Advisor RIA View
              </button>
            </div>

            {/* Print Unified Dossier (PDF) Action */}
            <button
              onClick={() => setShowFactsheetModal(true)}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-[#1814F3] to-[#2D60FF] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-sm hover:shadow hover:scale-[1.02] transition-all"
              title="Print Unified 1-Page Fiduciary Dossier"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier (PDF)</span>
            </button>

            {/* Advisor: + Onboard Client Action Button */}
            {viewMode === "advisor" && (
              <button
                onClick={() => setShowInviteModal(true)}
                className="hidden sm:flex items-center space-x-1.5 bg-emerald-600 text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-emerald-700 transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Onboard Client</span>
              </button>
            )}

            {/* Avatar Pill */}
            <div className="flex items-center space-x-2 pl-1">
              <div
                className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center shadow-sm text-white ${
                  viewMode === "advisor"
                    ? "bg-gradient-to-tr from-amber-500 to-indigo-700"
                    : "bg-gradient-to-tr from-[#2D60FF] to-[#1814F3]"
                }`}
              >
                {viewMode === "advisor"
                  ? "RM"
                  : activeClient.name.split(" ").map((n) => n[0]).join("")}
              </div>
            </div>
          </div>
        </header>

        {/* Global Client Context Banner (if viewing as client or inspecting) */}
        {viewMode === "client" && (
          <div className="bg-white border-b border-[#E6EFF5] px-6 sm:px-8 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-[#718EBF] uppercase tracking-wider text-[10px]">
                Active Client Profile:
              </span>
              <span className="font-bold text-sm text-[#343C6A]">
                {activeClient.name}
              </span>
              <span className="text-[10px] font-space font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#1814F3]">
                {activeClient.tier}
              </span>
              <span className="text-[#718EBF] hidden sm:inline">
                • {activeClient.city} • CKYC: {activeClient.ckycId}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("advisor")}
                className="text-[#1814F3] hover:underline font-bold text-xs"
              >
                Switch to Advisor Roster (48 Clients) →
              </button>
            </div>
          </div>
        )}

        {/* Body View Container */}
        <main className="flex-1 p-5 sm:p-8 space-y-7 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* GLOBAL MODAL 1: 1-CLICK PRINTABLE UNIFIED DOSSIER             */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {showFactsheetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[25px] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-[#DFEAF2] text-[#343C6A] relative"
            >
              <button
                onClick={() => setShowFactsheetModal(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F5F7FA] text-[#718EBF] hover:text-[#343C6A] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b-2 border-[#1814F3] pb-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full border border-amber-300 p-0.5 bg-white">
                      <Image
                        src="/images/fiduciary-seal.jpg"
                        alt="Aurum Seal"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold font-jakarta text-[#343C6A]">
                        AURUM FIDUCIARY ADVISORY
                      </h2>
                      <p className="text-xs font-space text-[#718EBF]">
                        SEBI RIA: INA000019842 • BASL Membership: 1892
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-[#1814F3]">
                      CONFIDENTIAL INVESTMENT DOSSIER
                    </span>
                    <p className="text-[10px] text-[#718EBF] font-space mt-1">
                      Generated: 30 Jan 2026 • CeFCoM Verified
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Summary Box */}
              <div className="bg-[#F5F7FA] rounded-[20px] p-5 border border-[#DFEAF2] mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                <div>
                  <span className="text-[#718EBF] block text-[10px] uppercase">Client Name</span>
                  <span className="text-[#343C6A] font-bold text-sm">{activeClient.name}</span>
                </div>
                <div>
                  <span className="text-[#718EBF] block text-[10px] uppercase">Client Tier</span>
                  <span className="text-[#343C6A] font-bold text-sm">{activeClient.tier}</span>
                </div>
                <div>
                  <span className="text-[#718EBF] block text-[10px] uppercase">Direct Net Worth</span>
                  <span className="text-[#1814F3] font-bold font-space text-sm">
                    {activeClient.netWorth}
                  </span>
                </div>
                <div>
                  <span className="text-[#718EBF] block text-[10px] uppercase">Annual Drag Saved</span>
                  <span className="text-emerald-600 font-bold font-space text-sm">
                    {activeClient.dragSaved}
                  </span>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-6 text-xs">
                <div>
                  <h4 className="font-bold text-[#343C6A] uppercase tracking-wider text-xs border-b border-[#DFEAF2] pb-1.5 mb-3">
                    1. Regulatory & Identity Verification
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[#718EBF] block text-[10px]">Income Tax PAN:</span>
                      <span className="font-space font-bold">{activeClient.pan}</span>
                    </div>
                    <div>
                      <span className="text-[#718EBF] block text-[10px]">Aadhaar Masked:</span>
                      <span className="font-space font-bold">{activeClient.aadhaarMasked}</span>
                    </div>
                    <div>
                      <span className="text-[#718EBF] block text-[10px]">Central CKYC ID:</span>
                      <span className="font-space font-bold">{activeClient.ckycId}</span>
                    </div>
                    <div>
                      <span className="text-[#718EBF] block text-[10px]">CeFCoM URN:</span>
                      <span className="font-space font-bold text-emerald-600">
                        {activeClient.cefcomUrn}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#343C6A] uppercase tracking-wider text-xs border-b border-[#DFEAF2] pb-1.5 mb-3">
                    2. Recommended Strategic Asset Allocation
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-blue-50/50">
                      <span className="font-bold text-[#2D60FF]">
                        {activeClient.equityAlloc}% Direct Equities
                      </span>
                      <p className="text-[10px] text-[#718EBF] mt-0.5">
                        Core Flexi-Cap & Nifty 50 Direct Indexing
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50/50">
                      <span className="font-bold text-[#FFBB38]">
                        {activeClient.debtAlloc}% Liquid Debt
                      </span>
                      <p className="text-[10px] text-[#718EBF] mt-0.5">
                        High-Grade Banking & Dynamic Debt
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-orange-50/50">
                      <span className="font-bold text-[#FC7900]">
                        {activeClient.goldAlloc}% Gold / Arbitrage
                      </span>
                      <p className="text-[10px] text-[#718EBF] mt-0.5">
                        Sovereign Gold Bonds & Arbitrage Funds
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#343C6A] uppercase tracking-wider text-xs border-b border-[#DFEAF2] pb-1.5 mb-3">
                    3. Risk Suitability Mandate & Compliance Attestation
                  </h4>
                  <p className="text-[#718EBF] leading-relaxed">
                    Under SEBI (Investment Advisers) Regulations, 2013 and circular SEBI/HO/IMD/DF1/CIR/P/2020/182, the Principal Officer certifies that the investment advice rendered to {activeClient.name} is strictly in direct demat instruments without any commission, referral fee, or distributor trail payment.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DFEAF2] flex items-center justify-between">
                <span className="text-xs text-[#718EBF]">
                  Digital Seal: 0x94F...B82A (Verified by CeFCoM Registry)
                </span>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowFactsheetModal(false)}
                    className="px-4 py-2 rounded-full border border-[#DFEAF2] text-xs font-bold text-[#718EBF] hover:bg-slate-100"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-[#1814F3] text-white px-5 py-2 rounded-full text-xs font-bold flex items-center space-x-2 hover:bg-[#120ec0]"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Dossier to PDF</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* GLOBAL MODAL 2: ADVISOR + ONBOARD CLIENT INVITATION DISPATCH  */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[25px] w-full max-w-lg p-7 shadow-2xl border border-[#DFEAF2] text-[#343C6A] relative"
            >
              <button
                onClick={() => setShowInviteModal(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F5F7FA] text-[#718EBF] hover:text-[#343C6A] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <UserPlus className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-jakarta text-[#343C6A]">
                  Onboard New Fiduciary Client
                </h3>
                <p className="text-xs text-[#718EBF] mt-1">
                  Adds the client to your active practice roster and generates an encrypted 72-Hour Onboarding invite link.
                </p>
              </div>

              <div className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-[#343C6A] mb-1.5 font-bold">
                    Client Full Legal Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Anand Mahindra"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2] focus:outline-none focus:ring-2 focus:ring-[#1814F3]/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#343C6A] mb-1.5 font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="client@corp.in"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2] focus:outline-none focus:ring-2 focus:ring-[#1814F3]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[#343C6A] mb-1.5 font-bold">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98..."
                      value={invitePhone}
                      onChange={(e) => setInvitePhone(e.target.value)}
                      className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2] focus:outline-none focus:ring-2 focus:ring-[#1814F3]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#343C6A] mb-1.5 font-bold">
                    Mandate Tier
                  </label>
                  <select
                    value={inviteTier}
                    onChange={(e) => setInviteTier(e.target.value as any)}
                    className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] border border-[#DFEAF2] focus:outline-none focus:ring-2 focus:ring-[#1814F3]/20"
                  >
                    <option value="Core HNI">Core HNI (₹5 Cr – ₹10 Cr)</option>
                    <option value="UHNI">UHNI (₹10 Cr – ₹50 Cr+)</option>
                    <option value="Emerging HNI">Emerging HNI (₹2 Cr – ₹5 Cr)</option>
                  </select>
                </div>

                <div className="p-3.5 rounded-[15px] bg-blue-50/60 border border-blue-200/80 space-y-2">
                  <span className="text-[11px] font-bold text-[#1814F3] block">
                    1-Click Client Onboarding Link:
                  </span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      value="https://aurumfiduciary.in/onboard?ref=RIA-1892&client=NEW"
                      className="bg-white rounded-lg px-3 py-1.5 text-[11px] font-space text-[#718EBF] flex-1 border border-blue-200"
                    />
                    <button
                      onClick={handleCopyInviteLink}
                      className="bg-[#1814F3] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DFEAF2] flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-full border border-[#DFEAF2] text-xs font-bold text-[#718EBF] hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNewClient}
                  className="bg-emerald-600 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Save & Onboard Client
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <FiduciaryProvider>
      <DashboardShell>{children}</DashboardShell>
    </FiduciaryProvider>
  );
}
