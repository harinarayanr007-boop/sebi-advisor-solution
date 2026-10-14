"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  EnvelopeSimple,
  User,
  Phone,
  IdentificationCard,
  MapPin,
  Sparkle,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";
import FiduciaryProcessHero from "@/components/FiduciaryProcessHero";

export default function SignupPage() {
  const router = useRouter();
  const { addClient, loginAsClient } = useFiduciary();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [pan, setPan] = useState("");
  const [tier, setTier] = useState<"Emerging HNI" | "Core HNI" | "UHNI">("Core HNI");
  const [grossCtc, setGrossCtc] = useState("₹50,00,000 / annum");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please provide your full legal name and email address.");
      return;
    }

    const clientPan = (pan.trim() || "ABCDE1234F").toUpperCase();
    const newClient = addClient({
      name,
      email,
      phone: phone || "+91 98000 00000",
      city,
      tier,
      netWorth: "₹0",
      liquidSurplus: "₹0",
      monthlySurplus: "₹0",
      dragSaved: "₹0 / yr",
      riskTolerance: "Moderate Balanced",
      targetCAGR: "11.0% CAGR",
      onboardingStage: "Pending RIA Advisor Review & Acceptance",
      statusBadge: {
        label: "Pending Approval",
        bg: "bg-amber-100",
        text: "text-amber-800",
      },
      pan: clientPan,
      aadhaarMasked: "XXXX-XXXX-1234",
      ckycId: `IN-CKYC-2026-${Math.floor(1000000 + Math.random() * 9000000)}`,
      cefcomUrn: `URN-BASL-15845-${Math.floor(1000 + Math.random() * 9000)}`,
      employer: "Private Enterprise",
      designation: "Executive",
      grossCtc,
      equityAlloc: 60,
      debtAlloc: 30,
      goldAlloc: 10,
      advisorNotes: "Self-registered investor via Aurum direct signup portal. Awaiting RIA practice acceptance.",
      status: "pending_approval",
      password: clientPan,
      authProvider: "self_register",
      appliedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    });

    loginAsClient(newClient.id, newClient.email);
    router.push("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#343C6A] antialiased">
      {/* 2-Column Split Grid matching Relume Figma 10428:8571 & 10428:8572 */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left Column: Client Registration Form */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-[620px] w-full mx-auto lg:max-w-none overflow-y-auto">
          {/* Navbar / Logo */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
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
              href="/login"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#718EBF] hover:text-[#1814F3] transition-colors"
            >
              <ArrowLeft size={14} weight="bold" />
              <span>Sign In Instead</span>
            </Link>
          </div>

          {/* Form Content Area */}
          <div className="w-full max-w-[460px] mx-auto my-auto py-2">
            <div className="mb-6 text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-space text-[#343C6A] tracking-tight">
                Create Account
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-[#718EBF] leading-relaxed">
                Open your fiduciary wealth account under SEBI RIA INA000015845.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                <span>⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1">
                  Full Legal Name (as per PAN)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718EBF]">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rao"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DFEAF2] rounded-xl text-xs sm:text-sm text-[#343C6A] placeholder-[#718EBF]/60 focus:outline-hidden focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718EBF]">
                      <EnvelopeSimple size={16} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#DFEAF2] rounded-xl text-xs sm:text-sm text-[#343C6A] placeholder-[#718EBF]/60 focus:outline-hidden focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1">
                    Mobile Contact
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718EBF]">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98000 00000"
                      className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#DFEAF2] rounded-xl text-xs sm:text-sm text-[#343C6A] placeholder-[#718EBF]/60 focus:outline-hidden focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1">
                    City of Residence
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718EBF]">
                      <MapPin size={16} />
                    </div>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#DFEAF2] rounded-xl text-xs sm:text-sm text-[#343C6A] placeholder-[#718EBF]/60 focus:outline-hidden focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1">
                    Permanent Account Number (PAN)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718EBF]">
                      <IdentificationCard size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={pan}
                      onChange={(e) => setPan(e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#DFEAF2] rounded-xl text-xs sm:text-sm text-[#343C6A] placeholder-[#718EBF]/60 focus:outline-hidden focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] font-mono uppercase transition"
                    />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#718EBF] leading-normal bg-blue-50/70 p-2.5 rounded-lg border border-blue-100">
                💡 <strong className="text-[#343C6A]">Login Security:</strong> Your 10-digit PAN in uppercase will automatically serve as your initial login passkey at /login.
              </p>

              <div>
                <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1">
                  Advisory Classification Tier
                </label>
                <select
                  value={tier}
                  onChange={(e) =>
                    setTier(e.target.value as "Emerging HNI" | "Core HNI" | "UHNI")
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DFEAF2] rounded-xl text-xs sm:text-sm text-[#343C6A] focus:outline-hidden focus:border-[#1814F3] focus:ring-1 focus:ring-[#1814F3] transition"
                >
                  <option value="Emerging HNI">Emerging HNI (₹50L - ₹2 Cr Investable)</option>
                  <option value="Core HNI">Core HNI (₹2 Cr - ₹10 Cr Investable)</option>
                  <option value="UHNI">UHNI (&gt; ₹10 Cr Investable)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1814F3] hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 shadow-sm mt-2"
              >
                <span>Submit Registration For RIA Review</span>
                <ArrowRight size={16} weight="bold" />
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-[#DFEAF2] text-center text-xs text-[#718EBF]">
              Already registered with our advisory?{" "}
              <Link href="/login" className="font-bold text-[#1814F3] hover:underline">
                Log In to Portfolio →
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-3 border-t border-slate-100 text-center">
            <p className="text-[11px] text-[#718EBF]">
              Mandate executed under SEBI (Investment Advisers) Regulations, 2013 • INA000015845
            </p>
          </div>
        </div>

        {/* Right Column: 3 Processes Hero (matching Relume Figma) */}
        <div className="hidden lg:block w-full h-full min-h-screen">
          <FiduciaryProcessHero />
        </div>
      </div>
    </div>
  );
}
