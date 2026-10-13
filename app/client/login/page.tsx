"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, ArrowRight, Sparkles, Lock, ArrowLeft } from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function ClientLoginPage() {
  const router = useRouter();
  const { loginAsClient } = useFiduciary();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsClient(undefined, email || undefined);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                Registered Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domain.com"
                className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
              />
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
              <Sparkles className="w-3.5 h-3.5" />
              <span>⚡ Instant Client Demo Sign In</span>
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
    </div>
  );
}
