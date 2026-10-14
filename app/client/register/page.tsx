"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, ArrowRight, ShieldCheck, ArrowLeft } from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function ClientRegisterPage() {
  const router = useRouter();
  const { addClient, loginAsClient } = useFiduciary();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [pan, setPan] = useState("");
  const [grossCtc, setGrossCtc] = useState("₹50,00,000 / annum");
  const [tier, setTier] = useState<"Emerging HNI" | "Core HNI" | "UHNI">("Core HNI");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please provide legal name and email address.");
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
      advisorNotes: "Self-registered investor via Aurum direct portal. Awaiting RIA practice acceptance.",
      status: "pending_approval",
      password: clientPan,
      authProvider: "self_register",
      appliedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    });

    loginAsClient(newClient.id, newClient.email);
    router.push("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center mb-6">
        <Link
          href="/login"
          className="inline-flex items-center space-x-1 text-xs text-[#718EBF] hover:text-[#343C6A] mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portals</span>
        </Link>
        <div className="w-12 h-12 rounded-full bg-[#1814F3] text-white flex items-center justify-center font-bold mx-auto mb-3 shadow-md">
          <UserPlus className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold font-space text-[#343C6A]">
          Direct Investor Onboarding
        </h1>
        <p className="mt-1 text-xs text-[#718EBF]">
          Open your fiduciary direct portfolio under SEBI RIA INA000015845
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#DFEAF2] rounded-[25px] sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anand K. Verma"
                className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anand@company.in"
                  className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 12345"
                  className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                  PAN Number (Tax ID)
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  placeholder="ABCDE1234F"
                  className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm font-mono text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                  City of Residence
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mumbai, Pune, Bengaluru..."
                  className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                  Gross Annual Income
                </label>
                <input
                  type="text"
                  value={grossCtc}
                  onChange={(e) => setGrossCtc(e.target.value)}
                  placeholder="₹60,00,000 / annum"
                  className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#343C6A] uppercase tracking-wider mb-1.5">
                  Advisory Tier
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                >
                  <option value="Emerging HNI">Emerging HNI (₹50L - ₹2 Cr)</option>
                  <option value="Core HNI">Core HNI (₹2 Cr - ₹10 Cr)</option>
                  <option value="UHNI">UHNI (&gt; ₹10 Cr)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition shadow-sm flex items-center justify-center space-x-2 mt-4"
            >
              <span>Create Account & Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-5 text-center">
            <Link
              href="/client/login"
              className="text-xs text-[#718EBF] hover:text-[#343C6A]"
            >
              Already have an account? Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
