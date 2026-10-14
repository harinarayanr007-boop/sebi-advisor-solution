"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  User,
  LockKey,
  ArrowRight,
  Scales,
  Sparkle,
  Buildings,
  IdentificationBadge,
  CheckCircle,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsAdvisor, loginAsClient } = useFiduciary();
  const [activeTab, setActiveTab] = useState<"client" | "advisor">("client");

  // Client form
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");

  // Advisor form
  const [advisorEmail, setAdvisorEmail] = useState("advice@aurumfiduciary.in");
  const [advisorPassword, setAdvisorPassword] = useState("");

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsClient(undefined, clientEmail || undefined);
    router.push("/client/dashboard");
  };

  const handleAdvisorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdvisor(advisorEmail);
    router.push("/advisor/dashboard");
  };

  const handleInstantClient = () => {
    loginAsClient();
    router.push("/client/dashboard");
  };

  const handleInstantAdvisor = () => {
    loginAsAdvisor();
    router.push("/advisor/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center mb-8">
        <div className="inline-flex items-center space-x-3 bg-white px-5 py-2.5 rounded-full border border-[#DFEAF2] shadow-sm mb-4">
          <div className="w-8 h-8 rounded-full bg-[#1814F3] text-white flex items-center justify-center font-bold text-sm">
            AF
          </div>
          <div className="text-left">
            <span className="text-sm font-bold font-space text-[#343C6A] block">
              AURUM FIDUCIARY ADVISORS
            </span>
            <span className="text-[10px] text-[#718EBF] font-mono tracking-wider">
              SEBI REG: INA000015845 // BASL 1892
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold font-space text-[#343C6A] tracking-tight">
          Institutional Wealth & RIA Portals
        </h1>
        <p className="mt-2 text-sm text-[#718EBF] max-w-lg mx-auto">
          Separate secure portals for private wealth clients and registered fiduciary advisory desks.
        </p>

        {/* Tab Selector */}
        <div className="mt-6 flex justify-center">
          <div className="bg-white p-1 rounded-2xl border border-[#DFEAF2] inline-flex space-x-1 shadow-sm">
            <button
              onClick={() => setActiveTab("client")}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "client"
                  ? "bg-[#1814F3] text-white shadow-md"
                  : "text-[#718EBF] hover:text-[#343C6A]"
              }`}
            >
              <User size={18} weight="bold" />
              <span>Client / Investor Portal</span>
            </button>
            <button
              onClick={() => setActiveTab("advisor")}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "advisor"
                  ? "bg-[#1814F3] text-white shadow-md"
                  : "text-[#718EBF] hover:text-[#343C6A]"
              }`}
            >
              <ShieldCheck size={18} weight="bold" />
              <span>RIA Advisor Practice Desk</span>
            </button>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#DFEAF2] sm:rounded-[25px] sm:px-10">
          {activeTab === "client" ? (
            <div>
              <div className="mb-6 border-b border-[#F0F4F8] pb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1814F3] bg-[#E7EDFF] px-2.5 py-1 rounded-full">
                  Investor Login
                </span>
                <h2 className="text-xl font-bold font-space text-[#343C6A] mt-2">
                  Access Your Family Wealth Dashboard
                </h2>
                <p className="text-xs text-[#718EBF] mt-1">
                  Track direct mutual funds, goal probability, expense drag savings, and statutory compliance.
                </p>
              </div>

              <form onSubmit={handleClientSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. rajesh@clientmail.com"
                    className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                    Password / Master Passkey
                  </label>
                  <input
                    type="password"
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition shadow-sm flex items-center justify-center space-x-2"
                >
                  <span>Sign In To Client Portal</span>
                  <ArrowRight size={16} weight="bold" />
                </button>
              </form>

              <div className="mt-5 pt-5 border-t border-[#F0F4F8] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleInstantClient}
                  className="text-xs font-bold text-[#1814F3] hover:underline flex items-center space-x-1"
                >
                  <Sparkle size={16} weight="fill" className="text-amber-500" />
                  <span>⚡ 1-Click Instant Client Access</span>
                </button>
                <Link
                  href="/client/register"
                  className="text-xs text-[#718EBF] hover:text-[#343C6A]"
                >
                  Self-Onboard New Account →
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6 border-b border-[#F0F4F8] pb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  SEBI RIA Practice Desk
                </span>
                <h2 className="text-xl font-bold font-space text-[#343C6A] mt-2">
                  RIA Practice Command & Compliance
                </h2>
                <p className="text-xs text-[#718EBF] mt-1">
                  Manage client roster, execute Form B fiduciary indentures, and generate compliance dossiers.
                </p>
              </div>

              <form onSubmit={handleAdvisorSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                    Advisor SEBI Registration
                  </label>
                  <input
                    type="text"
                    disabled
                    value="INA000015845 (BASL-1892)"
                    className="w-full px-4 py-3 bg-[#EEF2F6] border border-[#DFEAF2] rounded-xl text-sm font-mono text-[#343C6A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                    Advisor Email ID
                  </label>
                  <input
                    type="email"
                    value={advisorEmail}
                    onChange={(e) => setAdvisorEmail(e.target.value)}
                    placeholder="advice@aurumfiduciary.in"
                    className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                    RIA Master Credentials
                  </label>
                  <input
                    type="password"
                    value={advisorPassword}
                    onChange={(e) => setAdvisorPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#343C6A] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition shadow-sm flex items-center justify-center space-x-2"
                >
                  <span>Sign In As RIA Practice Lead</span>
                  <ArrowRight size={16} weight="bold" />
                </button>
              </form>

              <div className="mt-5 pt-5 border-t border-[#F0F4F8] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleInstantAdvisor}
                  className="text-xs font-bold text-[#1814F3] hover:underline flex items-center space-x-1"
                >
                  <Sparkle size={16} weight="fill" className="text-amber-500" />
                  <span>⚡ 1-Click Instant RIA Access</span>
                </button>
                <span className="text-[11px] text-[#718EBF]">
                  Authorized RIA Licensee Only
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-[#718EBF]">
          <span>Protected under SEBI (Investment Advisers) Regulations, 2013 • Pure Fee-Only Fiduciary</span>
        </div>
      </div>
    </div>
  );
}
