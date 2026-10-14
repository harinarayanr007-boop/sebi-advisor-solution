"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  User,
  ArrowRight,
  Sparkle,
  Buildings,
  CheckCircle,
  Key,
  EnvelopeSimple,
  X,
  HourglassSimple,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsAdvisor, loginAsClient, loginWithGoogle } = useFiduciary();
  const [activeTab, setActiveTab] = useState<"client" | "advisor">("client");

  // Client form
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");

  // Advisor form
  const [advisorEmail, setAdvisorEmail] = useState("advice@aurumfiduciary.in");
  const [advisorPassword, setAdvisorPassword] = useState("");

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);
    if (!clientEmail.trim()) {
      setClientError("Please enter your registered email address.");
      return;
    }

    const res = loginAsClient(undefined, clientEmail, clientPassword);
    if (!res.success) {
      setClientError(res.error || "Authentication failed. Check your credentials.");
      return;
    }
    router.push("/client/dashboard");
  };

  const handleGoogleAuth = (email: string, name?: string) => {
    const res = loginWithGoogle(email, name);
    setShowGoogleModal(false);
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
              onClick={() => {
                setActiveTab("client");
                setClientError(null);
              }}
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
              onClick={() => {
                setActiveTab("advisor");
                setClientError(null);
              }}
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

              {/* Google 1-Click Sign-In Button */}
              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                className="w-full py-3 px-4 bg-white border border-[#DFEAF2] hover:bg-slate-50 text-[#343C6A] rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2.5 shadow-2xs mb-5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-[#DFEAF2] w-full" />
                <span className="bg-white px-3 text-[11px] uppercase font-bold text-[#718EBF] tracking-wider absolute">
                  or sign in with email & passkey
                </span>
              </div>

              {clientError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  {clientError}
                </div>
              )}

              <form onSubmit={handleClientSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. rajesh@clientmail.com"
                    className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider">
                      Password / PAN Passkey
                    </label>
                    <span className="text-[11px] text-[#718EBF]">10-Digit PAN Accepted</span>
                  </div>
                  <input
                    type="password"
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    placeholder="Enter password or your 10-digit PAN (e.g. ABCDE1234F)"
                    className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                  />
                  <p className="text-[11px] text-[#718EBF] mt-1.5 leading-relaxed">
                    💡 <strong>Default Credential:</strong> If you were onboarded manually by your RIA advisor, your initial passkey is your <strong>10-digit PAN in uppercase</strong>.
                  </p>
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
                  <span>⚡ 1-Click Instant Client Demo</span>
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
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    SEBI RIA Practice Desk
                  </span>
                  <Link
                    href="/admin"
                    className="text-xs font-bold text-[#1814F3] hover:underline flex items-center space-x-1"
                  >
                    <span>Direct Admin URL (/admin) →</span>
                  </Link>
                </div>
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
          <span>Protected under SEBI (Investment Advisers) Regulations, 2013 • Strictly Fiduciary Practice</span>
        </div>
      </div>

      {/* Google OAuth Account Picker Dialog Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[25px] max-w-sm w-full p-6 border border-[#DFEAF2] shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="text-center space-y-1">
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <h3 className="text-base font-bold font-space text-[#343C6A]">
                Sign in with Google
              </h3>
              <p className="text-[11px] text-[#718EBF]">
                to continue to Aurum Fiduciary Wealth Portal
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handleGoogleAuth("rajesh.kulkarni@techindia.org", "Rajesh V. Kulkarni")}
                className="w-full p-3 rounded-xl border border-[#DFEAF2] hover:bg-[#F5F7FA] text-left transition flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#1814F3] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  RK
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-[#343C6A]">Rajesh V. Kulkarni</div>
                  <div className="text-[10px] text-[#718EBF] truncate">rajesh.kulkarni@techindia.org</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleGoogleAuth("anand.investor@gmail.com", "Anand Verma")}
                className="w-full p-3 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-left transition flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  AV
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-[#343C6A]">Anand Verma (New Applicant)</div>
                  <div className="text-[10px] text-[#718EBF] truncate">anand.investor@gmail.com</div>
                </div>
              </button>
            </div>

            <div className="pt-2 border-t border-[#F0F4F8]">
              <label className="block text-[10px] font-bold text-[#718EBF] uppercase mb-1">
                Or enter any Google Email:
              </label>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#DFEAF2] rounded-lg text-xs"
                />
                <button
                  type="button"
                  disabled={!customGoogleEmail.includes("@")}
                  onClick={() => handleGoogleAuth(customGoogleEmail)}
                  className="px-3 py-2 bg-[#1814F3] disabled:opacity-50 text-white rounded-lg text-xs font-bold shrink-0"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
