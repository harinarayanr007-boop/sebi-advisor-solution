"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  ArrowRight,
  Sparkle,
  Key,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  ArrowLeft,
  X,
  HourglassSimple,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";
import FiduciaryProcessHero from "@/components/FiduciaryProcessHero";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsClient, loginWithGoogle, loginWithDemoClient } = useFiduciary();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Magic Link auto-login from URL (e.g. /login?magic=CLIENT-ID)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const magicId = params.get("magic") || params.get("client") || params.get("auth");
      if (magicId) {
        const res = loginAsClient(magicId);
        if (res.success) {
          router.replace("/client/dashboard");
        }
      }
    }
  }, [loginAsClient, router]);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    const res = loginAsClient(undefined, email, password);
    if (!res.success) {
      setError(res.error || "Authentication failed. Check your credentials.");
      return;
    }
    router.push("/client/dashboard");
  };

  const handleGoogleAuth = (selectedEmail: string, name?: string) => {
    loginWithGoogle(selectedEmail, name);
    setShowGoogleModal(false);
    router.push("/client/dashboard");
  };

  const handleInstantDemo = () => {
    loginWithDemoClient();
    router.push("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#343C6A] antialiased">
      {/* 2-Column Split Grid matching Relume Figma 10428:8571 & 10428:8572 */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left Column: Client Authentication Form */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-16 max-w-[620px] w-full mx-auto lg:max-w-none">
          {/* Navbar / Logo */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <Link
              href="/"
              className="inline-flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1814F3] text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                AF
              </div>
              <div className="text-left">
                <span className="text-sm font-bold font-space text-[#343C6A] block tracking-tight">
                  AURUM FIDUCIARY
                </span>
                <span className="text-[10px] text-[#718EBF] font-mono tracking-wider block">
                  SEBI REG: INA000015845
                </span>
              </div>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#718EBF] hover:text-[#1814F3] transition-colors"
            >
              <ArrowLeft size={14} weight="bold" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Form Content Area */}
          <div className="w-full max-w-[440px] mx-auto my-auto py-4">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8 text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-space text-[#343C6A] tracking-tight">
                Log In
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#718EBF] leading-relaxed">
                Welcome back. Access your direct demat holdings, family goals, and fee audit.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2.5 animate-fadeIn">
                <span className="text-sm flex-shrink-0">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Google 1-Click Sign-In */}
            <button
              type="button"
              onClick={() => setShowGoogleModal(true)}
              className="w-full py-3 px-4 bg-white border border-[#DFEAF2] hover:bg-slate-50 hover:border-slate-300 text-[#343C6A] rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-3 shadow-2xs mb-5"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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

            {/* Separator */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full border-t border-[#DFEAF2]" />
              <span className="absolute bg-white px-3 text-[11px] font-medium text-[#718EBF] uppercase tracking-wider">
                or sign in with email
              </span>
            </div>

            {/* Email + Password / PAN Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                  Registered Email Address
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
                    placeholder="name@domain.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DFEAF2] rounded-xl text-xs sm:text-sm text-[#343C6A] placeholder-[#718EBF]/60 focus:outline-hidden focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider">
                    Password / PAN Passkey
                  </label>
                  <span className="text-[10px] font-semibold text-[#1814F3] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    10-Digit PAN Accepted
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
                    placeholder="Enter password or your 10-digit PAN"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#DFEAF2] rounded-xl text-xs sm:text-sm text-[#343C6A] placeholder-[#718EBF]/60 focus:outline-hidden focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] font-mono transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#718EBF] hover:text-[#343C6A] transition-colors"
                  >
                    {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="mt-1.5 text-[11px] text-[#718EBF] leading-normal">
                  💡 <strong className="text-[#343C6A]">Default Credential:</strong> If onboarded by your advisor, your passkey is your 10-digit PAN in uppercase.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1814F3] border-[#DFEAF2] focus:ring-[#1814F3]"
                  />
                  <span className="text-xs text-[#718EBF]">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setError("Your default initial passkey is your 10-digit PAN in uppercase. If you forgot your custom password, contact your RIA to reset credentials.")}
                  className="text-xs text-[#1814F3] hover:underline font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#1814F3] rounded"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1814F3] hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Sign In To Client Portal</span>
                <ArrowRight size={16} weight="bold" />
              </button>
            </form>

            {/* Quick Demo Access & Register Links */}
            <div className="mt-6 pt-5 border-t border-[#DFEAF2] space-y-3">
              <button
                type="button"
                onClick={handleInstantDemo}
                className="w-full py-2.5 px-3 bg-[#F0F5FF] hover:bg-blue-100/70 border border-[#D0E0FF] text-[#1814F3] rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-2xs"
              >
                <Sparkle size={14} weight="fill" />
                <span>⚡ 1-Click Instant Client Demo</span>
              </button>

              <div className="text-center text-xs text-[#718EBF]">
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-[#1814F3] hover:underline"
                >
                  Sign Up Here →
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-[#718EBF]">
              Protected under SEBI (Investment Advisers) Regulations, 2013 • Strictly Fiduciary Practice
            </p>
          </div>
        </div>

        {/* Right Column: 3 Processes Hero (matching Relume Figma) */}
        <div className="hidden lg:block w-full h-full min-h-screen">
          <FiduciaryProcessHero />
        </div>
      </div>

      {/* Google Sign-In Selector Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
              <X size={20} />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
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
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Sign in with Google
                </h3>
                <p className="text-xs text-slate-500">
                  to continue to Aurum Fiduciary Wealth Portal
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <button
                type="button"
                onClick={() =>
                  handleGoogleAuth("rajesh.kulkarni@techindia.org", "Rajesh V. Kulkarni")
                }
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  RK
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900">
                    Rajesh V. Kulkarni
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    rajesh.kulkarni@techindia.org
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleGoogleAuth("anand.investor@gmail.com", "Anand Verma (New Applicant)")
                }
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  AV
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                    <span>Anand Verma</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-medium">
                      New Applicant
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    anand.investor@gmail.com
                  </div>
                </div>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Or enter any Google Email:
              </label>
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600"
                />
                <button
                  type="button"
                  disabled={!customGoogleEmail.includes("@")}
                  onClick={() => handleGoogleAuth(customGoogleEmail)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition"
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
