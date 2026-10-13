"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Activity,
  Award,
  Send,
  Users,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function DashboardOverviewPage() {
  const {
    activeClient,
    clients,
    viewMode,
    setViewMode,
    setActiveClientId,
    setShowFactsheetModal,
    setShowInviteModal,
  } = useFiduciary();

  const totalAUM = clients.reduce((sum, c) => sum + c.netWorthNum, 0);

  // --------------------------------------------------------------------------
  // ADVISOR PRACTICE OVERVIEW
  // --------------------------------------------------------------------------
  if (viewMode === "advisor") {
    return (
      <div className="space-y-7">
        {/* Top 4 Practice KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-[#E7EDFF] text-[#1814F3] flex items-center justify-center shrink-0">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs text-[#718EBF] font-semibold">Total Practice AUM</p>
              <h3 className="text-xl font-bold font-space text-[#343C6A]">
                ₹{(totalAUM / 10000000).toFixed(1)} Cr
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
              <p className="text-xs text-[#718EBF] font-semibold">Active HNI Families</p>
              <h3 className="text-xl font-bold font-space text-[#343C6A]">
                {clients.length} Families
              </h3>
              <span className="text-[10px] font-bold text-blue-600 mt-0.5 block">
                3 Onboarding In-Progress
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
                ₹1.42 Cr / yr
              </h3>
              <span className="text-[10px] font-bold text-emerald-600 mt-0.5 block">
                0% Commission Kickbacks
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

        {/* Practice Quick Links & Roster Preview */}
        <div className="bg-white rounded-[25px] p-6 sm:p-8 border border-[#DFEAF2] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5F7FA]">
            <div>
              <h2 className="text-lg font-bold font-jakarta text-[#343C6A]">
                Active Client Intake & Practice Pipeline
              </h2>
              <p className="text-xs text-[#718EBF] mt-0.5">
                Manage all {clients.length} HNI family portfolios under SEBI RIA mandate.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowInviteModal(true)}
                className="bg-[#1814F3] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#120ec0] transition-colors"
              >
                + Onboard New Client
              </button>
              <Link
                href="/dashboard/clients"
                className="px-4 py-2 rounded-full bg-[#F5F7FA] border border-[#DFEAF2] text-xs font-bold text-[#343C6A] hover:text-[#1814F3] transition-colors"
              >
                View Full Roster Table →
              </Link>
            </div>
          </div>

          {/* Quick Roster Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.slice(0, 6).map((client) => (
              <div
                key={client.id}
                className="p-5 rounded-[20px] bg-[#F5F7FA] border border-[#DFEAF2] flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-space font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#1814F3]">
                      {client.tier}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${client.statusBadge.bg} ${client.statusBadge.text}`}
                    >
                      {client.statusBadge.label}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#343C6A] text-base">{client.name}</h3>
                  <p className="text-xs text-[#718EBF]">
                    {client.employer} • {client.city}
                  </p>
                </div>

                <div className="border-t border-[#DFEAF2] pt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#718EBF] text-[10px] block">Net Worth</span>
                    <span className="font-bold font-space text-[#343C6A]">{client.netWorth}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setActiveClientId(client.id);
                        setViewMode("client");
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#1814F3] text-white text-xs font-bold hover:bg-[#120ec0]"
                    >
                      Inspect Portal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // CLIENT WEALTH OVERVIEW
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-7">
      {/* TOP ROW: WEALTH MANDATE & COMMISSION DRAG SHIELD (ZERO CREDIT CARD LARP) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold font-jakarta text-[#343C6A]">
              Portfolio Mandate & Wealth Shield
            </h2>
            <Link
              href="/dashboard/assets"
              className="text-xs sm:text-sm font-bold text-[#1814F3] hover:underline"
            >
              View Direct Holdings →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* MANDATE CARD 1: Deep Blue BankDash Gradient Card */}
            <div className="bg-gradient-to-tr from-[#2D60FF] to-[#0A06F4] text-white rounded-[25px] p-6 flex flex-col justify-between shadow-lg shadow-blue-500/15 relative overflow-hidden min-h-[220px]">
              <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-wider font-space">
                    Direct Portfolio Net Worth
                  </p>
                  <h3 className="text-2xl font-bold font-space tracking-tight mt-1">
                    {activeClient.netWorth}
                  </h3>
                </div>
                <div className="h-9 w-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-300" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-white/60 font-space">
                    Liquid Advisory Surplus
                  </p>
                  <p className="text-sm font-semibold font-space tracking-tight">
                    {activeClient.liquidSurplus}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-white/60 font-space">
                    Target CAGR Mandate
                  </p>
                  <p className="text-sm font-semibold text-emerald-300 font-space">
                    {activeClient.targetCAGR}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/15 flex items-center justify-between text-xs">
                <span className="font-space font-semibold text-white/90">
                  {activeClient.cefcomUrn}
                </span>
                <span className="font-bold text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full">
                  100% Direct Demat
                </span>
              </div>
            </div>

            {/* MANDATE CARD 2: BankDash Clean White Drag Shield Card */}
            <div className="bg-white border border-[#DFEAF2] text-[#343C6A] rounded-[25px] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[220px]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#718EBF] uppercase tracking-wider font-space">
                    Annual Commission Drag Saved
                  </p>
                  <h3 className="text-2xl font-bold font-space tracking-tight text-emerald-600 mt-1">
                    {activeClient.dragSaved}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-[#718EBF] font-space">
                    Distributor Trail Paid
                  </p>
                  <p className="text-sm font-semibold text-[#343C6A] font-space">
                    ₹0.00 (0.00%)
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-[#718EBF] font-space">
                    Monthly Cash Surplus
                  </p>
                  <p className="text-sm font-semibold text-[#343C6A] font-space">
                    {activeClient.monthlySurplus}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#DFEAF2] flex items-center justify-between text-xs">
                <span className="font-space font-semibold text-[#718EBF]">
                  SEBI RIA INA000019842
                </span>
                <span className="font-bold text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Form B Sealed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Statutory Milestones */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold font-jakarta text-[#343C6A]">
              Recent Statutory Actions
            </h2>
          </div>

          <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex-1 flex flex-col justify-around space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-full bg-[#FFF5D9] text-[#FFBB38] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#343C6A]">
                    UIDAI e-KYC Verified
                  </h4>
                  <p className="text-xs text-[#718EBF]">
                    28 Jan 2026, 12:40 PM
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold font-space text-emerald-600">
                Verified
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-full bg-[#E7EDFF] text-[#396AFF] flex items-center justify-center shrink-0">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#343C6A]">
                    Form B Indenture
                  </h4>
                  <p className="text-xs text-[#718EBF]">
                    29 Jan 2026, 04:15 PM
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold font-space text-[#343C6A]">
                Digitally Signed
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-full bg-[#DCFAF8] text-[#16DBCC] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#343C6A]">
                    CeFCoM Escrow Deposit
                  </h4>
                  <p className="text-xs text-[#718EBF]">
                    30 Jan 2026, 10:20 AM
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold font-space text-emerald-600">
                Settled
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE ROW: WEEKLY ACTIVITY & ASSET ALLOCATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold font-jakarta text-[#343C6A]">
              Weekly Capital Inflow & Direct Deployment
            </h2>
            <div className="flex items-center space-x-6 text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#1814F3]" />
                <span className="text-[#718EBF]">Surplus Inflow</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#16DBCC]" />
                <span className="text-[#718EBF]">Direct SIP Deployed</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-52 pt-4 px-2">
              {[
                { day: "Sat", in: 60, dep: 40 },
                { day: "Sun", in: 45, dep: 30 },
                { day: "Mon", in: 80, dep: 55 },
                { day: "Tue", in: 95, dep: 85 },
                { day: "Wed", in: 50, dep: 65 },
                { day: "Thu", in: 75, dep: 60 },
                { day: "Fri", in: 90, dep: 70 },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1.5 sm:gap-2 h-40">
                    <div
                      style={{ height: `${item.in}%` }}
                      className="w-2.5 sm:w-3.5 bg-[#1814F3] rounded-full transition-all hover:opacity-80"
                    />
                    <div
                      style={{ height: `${item.dep}%` }}
                      className="w-2.5 sm:w-3.5 bg-[#16DBCC] rounded-full transition-all hover:opacity-80"
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#718EBF]">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Strategic Asset Allocation */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold font-jakarta text-[#343C6A]">
              Strategic Asset Allocation
            </h2>
          </div>

          <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex-1 flex flex-col items-center justify-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#2D60FF"
                  strokeWidth="20"
                  strokeDasharray="155 238"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#FFBB38"
                  strokeWidth="20"
                  strokeDasharray="60 238"
                  strokeDashoffset="-155"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#FC7900"
                  strokeWidth="20"
                  strokeDasharray="23 238"
                  strokeDashoffset="-215"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-space text-[#343C6A]">
                  {activeClient.equityAlloc}%
                </span>
                <span className="text-[10px] font-semibold text-[#718EBF] uppercase">
                  Equities
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mt-6 text-center">
              <div className="p-2 rounded-xl bg-blue-50/50">
                <p className="text-[10px] text-[#718EBF] font-semibold">Direct Equity</p>
                <p className="text-xs font-bold text-[#2D60FF] font-space">
                  {activeClient.equityAlloc}%
                </p>
              </div>
              <div className="p-2 rounded-xl bg-amber-50/50">
                <p className="text-[10px] text-[#718EBF] font-semibold">Liquid Debt</p>
                <p className="text-xs font-bold text-[#FFBB38] font-space">
                  {activeClient.debtAlloc}%
                </p>
              </div>
              <div className="p-2 rounded-xl bg-orange-50/50">
                <p className="text-[10px] text-[#718EBF] font-semibold">Gold/Arb</p>
                <p className="text-xs font-bold text-[#FC7900] font-space">
                  {activeClient.goldAlloc}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: ADVISORY CONCIERGE & TRAJECTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold font-jakarta text-[#343C6A]">
              Advisory Concierge
            </h2>
          </div>

          <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex-1 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-around">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  RM
                </div>
                <h4 className="text-xs font-bold text-[#343C6A] mt-2">Rajesh Mehta</h4>
                <p className="text-[10px] text-[#718EBF]">Principal Officer</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  AK
                </div>
                <h4 className="text-xs font-bold text-[#343C6A] mt-2">Ananya K.</h4>
                <p className="text-[10px] text-[#718EBF]">Compliance Lead</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  SP
                </div>
                <h4 className="text-xs font-bold text-[#343C6A] mt-2">Siddharth P.</h4>
                <p className="text-[10px] text-[#718EBF]">Chartered Tax</p>
              </div>
            </div>

            <div className="flex items-center bg-[#F5F7FA] rounded-full p-1.5 pl-5 border border-[#DFEAF2]">
              <span className="text-xs text-[#718EBF] font-medium flex-1">
                Schedule 90-Min Fiduciary Review
              </span>
              <button
                onClick={() =>
                  alert(
                    `Consultation booked with Principal Officer Rajesh V. Mehta for ${activeClient.name}. Calendar invite sent to ${activeClient.email}.`
                  )
                }
                className="bg-[#1814F3] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-2 hover:bg-[#120ec0] transition-colors"
              >
                <span>Book</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold font-jakarta text-[#343C6A]">
              Portfolio Growth Trajectory
            </h2>
          </div>

          <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex-1 flex flex-col justify-between">
            <div className="w-full h-44 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1814F3" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1814F3" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,130 C 70,120 120,80 180,95 C 240,110 300,50 360,40 C 420,30 460,15 500,10 L 500,150 L 0,150 Z"
                  fill="url(#blueGradient)"
                />
                <path
                  d="M 0,130 C 70,120 120,80 180,95 C 240,110 300,50 360,40 C 420,30 460,15 500,10"
                  fill="transparent"
                  stroke="#1814F3"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="180" cy="95" r="4" fill="#1814F3" />
                <circle cx="360" cy="40" r="4" fill="#1814F3" />
                <circle
                  cx="500"
                  cy="10"
                  r="5"
                  fill="#1814F3"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-[#718EBF] font-semibold pt-2 border-t border-[#F5F7FA]">
              <span>Q1 2025</span>
              <span>Q2 2025</span>
              <span>Q3 2025</span>
              <span>Q4 2025</span>
              <span className="text-[#1814F3] font-bold">
                Current ({activeClient.netWorth})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
