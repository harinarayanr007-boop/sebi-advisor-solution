"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  ArrowRight,
  ArrowLeft,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function AdvisorOnboardPage() {
  const router = useRouter();
  const { addClient, advisor } = useFiduciary();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 98");
  const [city, setCity] = useState("Mumbai");
  const [tier, setTier] = useState<"Emerging HNI" | "Core HNI" | "UHNI">("Core HNI");
  const [pan, setPan] = useState("");
  const [netWorth, setNetWorth] = useState("50000000");
  const [liquidSurplus, setLiquidSurplus] = useState("40000000");
  const [monthlySurplus, setMonthlySurplus] = useState("250000");
  const [employer, setEmployer] = useState("");
  const [designation, setDesignation] = useState("");
  const [grossCtc, setGrossCtc] = useState("₹70,00,000 / annum");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please provide client name and email.");
      return;
    }

    const netWorthVal = Number(netWorth) || 50000000;
    const dragNum = Math.round(netWorthVal * 0.0095);

    const newClient = addClient({
      name,
      email,
      phone,
      city,
      tier,
      netWorth: `₹${(netWorthVal / 10000000).toFixed(2)} Cr`,
      liquidSurplus: `₹${((Number(liquidSurplus) || 0) / 10000000).toFixed(2)} Cr`,
      monthlySurplus: `₹${(Number(monthlySurplus) || 0).toLocaleString("en-IN")}`,
      dragSaved: `₹${dragNum.toLocaleString("en-IN")} / yr`,
      riskTolerance: "Balanced Strategic Growth",
      targetCAGR: "11.5% CAGR",
      onboardingStage: "Stage 2 In-Progress // Form B Dispatched",
      statusBadge: {
        label: "Fiduciary Onboarding",
        bg: "bg-blue-100",
        text: "text-blue-700",
      },
      pan: (pan || "ABCDE1234F").toUpperCase(),
      aadhaarMasked: "XXXX-XXXX-8821",
      ckycId: `IN-CKYC-2026-${Math.floor(1000000 + Math.random() * 9000000)}`,
      cefcomUrn: `URN-BASL-15845-${Math.floor(1000 + Math.random() * 9000)}`,
      employer: employer || "Private Corporation",
      designation: designation || "Director",
      grossCtc,
      equityAlloc: 65,
      debtAlloc: 25,
      goldAlloc: 10,
      advisorNotes: notes || "Client onboarded into SEBI RIA practice. Initial CAS audit scheduled.",
    });

    router.push(`/advisor/clients/${newClient.id}`);
  };

  return (
    <div className="space-y-7 max-w-3xl">
      <div>
        <Link
          href="/advisor/clients"
          className="inline-flex items-center space-x-1 text-xs text-[#718EBF] hover:text-[#343C6A] mb-2"
        >
          <ArrowLeft size={14} weight="bold" />
          <span>Back to Client Roster</span>
        </Link>
        <h2 className="text-2xl font-bold font-space text-[#343C6A]">
          Onboard New Client Family
        </h2>
        <p className="text-xs text-[#718EBF]">
          Initiate statutory fiduciary onboarding under SEBI RIA INA000015845 guidelines.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[25px] p-8 border border-[#DFEAF2] shadow-sm space-y-6">
        {/* Section 1: Legal Identity */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1814F3] mb-4">
            1. Client Legal Identity & Contact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Siddharth Mehta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">Primary Email Address</label>
              <input
                type="email"
                required
                placeholder="siddharth@mehtafamily.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">Mobile Contact</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">City of Residence</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">PAN Number</label>
              <input
                type="text"
                maxLength={10}
                placeholder="ABCDE1234F"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm font-mono uppercase"
              />
            </div>
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">Advisory Tier Classification</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              >
                <option value="Emerging HNI">Emerging HNI (₹50L - ₹2 Cr)</option>
                <option value="Core HNI">Core HNI (₹2 Cr - ₹10 Cr)</option>
                <option value="UHNI">UHNI (&gt; ₹10 Cr)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Financial Standing */}
        <div className="pt-4 border-t border-[#F0F4F8]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1814F3] mb-4">
            2. Initial Financial Baseline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">Estimated Net Worth (₹)</label>
              <input
                type="number"
                value={netWorth}
                onChange={(e) => setNetWorth(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">Liquid Surplus (₹)</label>
              <input
                type="number"
                value={liquidSurplus}
                onChange={(e) => setLiquidSurplus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">Monthly Surplus (₹)</label>
              <input
                type="number"
                value={monthlySurplus}
                onChange={(e) => setMonthlySurplus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Professional Profile */}
        <div className="pt-4 border-t border-[#F0F4F8]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1814F3] mb-4">
            3. Employment & Notes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">Employer / Company</label>
              <input
                type="text"
                placeholder="e.g. Goldman Sachs India"
                value={employer}
                onChange={(e) => setEmployer(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">Designation</label>
              <input
                type="text"
                placeholder="e.g. Managing Director"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-[#343C6A] mb-1">Gross Annual CTC</label>
              <input
                type="text"
                value={grossCtc}
                onChange={(e) => setGrossCtc(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="mt-4 text-xs">
            <label className="block font-bold text-[#343C6A] mb-1">Advisor Initial Assessment Notes</label>
            <textarea
              rows={3}
              placeholder="Record initial mandate terms, family trust details, or distributor regular plan transition roadmap..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#DFEAF2] flex justify-end space-x-3">
          <Link
            href="/advisor/clients"
            className="px-5 py-2.5 border border-[#DFEAF2] rounded-xl text-xs font-bold text-[#718EBF] hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
          >
            <span>Register Client & Dispatch Form B</span>
            <ArrowRight size={16} weight="bold" />
          </button>
        </div>
      </form>
    </div>
  );
}
