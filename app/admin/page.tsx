"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Lock, User, Sparkle } from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAsAdvisor } = useFiduciary();
  const [username, setUsername] = useState("advice@aurumfiduciary.in");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter your admin username or email.");
      return;
    }
    setError(null);
    loginAsAdvisor(username);
    router.push("/advisor/dashboard");
  };

  const handleInstantDemo = () => {
    loginAsAdvisor();
    router.push("/advisor/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-[#343C6A]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Simple Brand Emblem */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1814F3] text-white flex items-center justify-center font-bold shadow-md">
            <ShieldCheck size={28} weight="fill" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-extrabold font-space text-[#343C6A] tracking-tight">
          RIA Practice Admin
        </h1>
        <p className="mt-1.5 text-center text-xs text-[#718EBF]">
          Enter your username and password to access the practice desk.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#DFEAF2] rounded-[24px] sm:px-10">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center space-x-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718EBF]">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="advice@aurumfiduciary.in"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DFEAF2] rounded-xl text-xs sm:text-sm text-[#343C6A] focus:outline-hidden focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718EBF]">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DFEAF2] rounded-xl text-xs sm:text-sm text-[#343C6A] focus:outline-hidden focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1814F3] hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 shadow-sm pt-2.5 mt-2"
            >
              <span>Sign In</span>
              <ArrowRight size={14} weight="bold" />
            </button>
          </form>

          {/* Clean 1-Click Demo Access */}
          <div className="mt-5 pt-4 border-t border-[#DFEAF2]">
            <button
              type="button"
              onClick={handleInstantDemo}
              className="w-full py-2 px-3 bg-[#F0F5FF] hover:bg-blue-100/70 border border-[#D0E0FF] text-[#1814F3] rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
            >
              <Sparkle size={14} weight="fill" />
              <span>⚡ 1-Click Admin Demo Access</span>
            </button>
          </div>
        </div>

        {/* Minimal Footer */}
        <p className="mt-6 text-center text-[11px] text-[#718EBF] font-mono">
          Aurum Fiduciary Wealth Advisors • SEBI INA000015845
        </p>
      </div>
    </div>
  );
}
