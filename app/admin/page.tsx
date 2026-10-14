"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  ArrowRight,
  Sparkle,
  LockKey,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  SealCheck,
  Buildings,
  ArrowLeft,
  Key,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { session, loginAsAdvisor, advisor, logout } = useFiduciary();
  const [email, setEmail] = useState("advice@aurumfiduciary.in");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered RIA principal email.");
      return;
    }
    setError(null);
    loginAsAdvisor(email);
    router.push("/advisor/dashboard");
  };

  const handleInstantDemo = () => {
    loginAsAdvisor();
    router.push("/advisor/dashboard");
  };

  const isAlreadyAdvisor = session?.role === "advisor";

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased selection:bg-[#1814F3] selection:text-white">
      {/* Top Header / Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="inline-flex items-center space-x-2 text-xs text-[#718EBF] hover:text-[#343C6A] mb-4 transition-colors">
          <Link href="/login" className="inline-flex items-center space-x-1.5 font-medium">
            <ArrowLeft size={14} weight="bold" />
            <span>Switch to Investor / Client Portal</span>
          </Link>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#343C6A] text-white flex items-center justify-center font-bold mx-auto mb-3 shadow-md border border-slate-700">
          <ShieldCheck size={32} weight="duotone" className="text-emerald-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold mb-2">
          <SealCheck size={14} weight="fill" className="text-emerald-600" />
          <span>SEBI Registered Investment Adviser Desk</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-space text-[#343C6A] tracking-tight">
          RIA Practice Admin Console
        </h1>
        <p className="mt-1.5 text-xs text-[#718EBF] font-mono">
          SEBI REG: {advisor.sebiRegNumber} • BASL: {advisor.baslMembership}
        </p>
      </div>

      {/* Main Form Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#DFEAF2] rounded-[25px] sm:px-10">
          {/* Active Session Notice */}
          {isAlreadyAdvisor && (
            <div className="mb-6 p-4 rounded-2xl bg-[#F0F5FF] border border-[#D0E0FF] text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1814F3]">
                  Active Session Detected
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs text-[#343C6A] font-medium">
                Authenticated as: <strong className="font-bold">{session?.name}</strong>
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => router.push("/advisor/dashboard")}
                  className="flex-1 py-2 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <span>Open Admin Console</span>
                  <ArrowRight size={14} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="px-3 py-2 bg-white border border-[#DFEAF2] text-[#718EBF] hover:text-rose-600 hover:border-rose-300 rounded-xl text-xs font-semibold transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          <div className="border-b border-[#F0F4F8] pb-4 mb-6">
            <h2 className="text-base font-bold font-space text-[#343C6A]">
              Fiduciary Administrator Authentication
            </h2>
            <p className="text-xs text-[#718EBF] mt-0.5">
              Restricted to authorized RIA Principals, Compliance Officers, and Partners.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                RIA Registered Email ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718EBF]">
                  <EnvelopeSimple size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="advice@aurumfiduciary.in"
                  className="w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] placeholder-[#A0B4D0] focus:outline-none focus:border-[#1814F3] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider">
                  Master Security Key
                </label>
                <span className="text-[11px] text-[#718EBF] hover:text-[#1814F3] cursor-pointer">
                  Hardware Token Active
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718EBF]">
                  <Key size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] placeholder-[#A0B4D0] focus:outline-none focus:border-[#1814F3] focus:bg-white transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#718EBF] hover:text-[#343C6A]"
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberTerminal}
                  onChange={(e) => setRememberTerminal(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1814F3] border-[#DFEAF2] focus:ring-0"
                />
                <span className="text-xs text-[#718EBF]">Remember this workstation</span>
              </label>
              <span className="text-[11px] text-[#718EBF] font-mono">256-bit TLS</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#343C6A] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 active:scale-[0.99] transition shadow-sm flex items-center justify-center space-x-2 mt-2"
            >
              <span>Sign In As RIA Practice Lead</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          </form>

          {/* Quick 1-Click Demo Shortcut */}
          <div className="mt-6 pt-5 border-t border-[#F0F4F8] flex flex-col gap-3">
            <button
              type="button"
              onClick={handleInstantDemo}
              className="w-full py-2.5 px-3 bg-[#EEF2F6] hover:bg-[#E3E8EE] text-[#343C6A] rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
            >
              <Sparkle size={16} weight="fill" className="text-amber-500" />
              <span>⚡ 1-Click Instant RIA Admin Access (Demo)</span>
            </button>
            <div className="flex items-center justify-between text-[11px] text-[#718EBF] px-1">
              <span>SEBI Regulation 19 Audit-Enabled</span>
              <span className="font-mono">Terminal #01-A</span>
            </div>
          </div>
        </div>

        {/* Security / Compliance Notice Footer */}
        <div className="mt-6 p-4 rounded-2xl bg-white/60 border border-[#DFEAF2] text-center space-y-1.5">
          <div className="flex items-center justify-center space-x-1.5 text-xs font-semibold text-[#343C6A]">
            <Buildings size={16} className="text-[#718EBF]" />
            <span>Aurum Fiduciary Advisors LLP</span>
          </div>
          <p className="text-[11px] text-[#718EBF] leading-relaxed">
            Registered with SEBI under INA000015845. Strictly fee-only. Zero commissions, zero third-party revenue sharing. All admin actions logged per statutory requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
