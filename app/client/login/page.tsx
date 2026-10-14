"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  ArrowRight,
  Sparkle,
  LockKey,
  ArrowLeft,
  Key,
  X,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function ClientLoginPage() {
  const router = useRouter();
  const { loginAsClient, loginWithGoogle } = useFiduciary();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Google Modal
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

  const handleInstant = () => {
    loginAsClient();
    router.push("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link
          href="/login"
          className="inline-flex items-center space-x-1 text-xs text-[#718EBF] hover:text-[#343C6A] mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch Portals</span>
        </Link>
        <div className="w-12 h-12 rounded-full bg-[#1814F3] text-white flex items-center justify-center font-bold mx-auto mb-3 shadow-md">
          <User className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold font-space text-[#343C6A]">
          Client Wealth Portal Login
        </h1>
        <p className="mt-1 text-xs text-[#718EBF]">
          Aurum Fiduciary Advisory • SEBI Reg. INA000015845
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#DFEAF2] rounded-[25px] sm:px-10">
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
            <span className="bg-white px-3 text-[10px] uppercase font-bold text-[#718EBF] tracking-wider absolute">
              or with email & passkey
            </span>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                Registered Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domain.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password or your 10-digit PAN"
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
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#F0F4F8] flex items-center justify-between">
            <button
              type="button"
              onClick={handleInstant}
              className="text-xs font-bold text-[#1814F3] hover:underline flex items-center space-x-1"
            >
              <Sparkle className="w-3.5 h-3.5" />
              <span>⚡ Instant Demo Access</span>
            </button>
            <Link
              href="/client/register"
              className="text-xs text-[#718EBF] hover:text-[#343C6A]"
            >
              Register →
            </Link>
          </div>
        </div>
      </div>

      {/* Google OAuth Modal */}
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
              <h3 className="text-base font-bold font-space text-[#343C6A]">
                Sign in with Google
              </h3>
              <p className="text-[11px] text-[#718EBF]">
                Select an account to continue
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
