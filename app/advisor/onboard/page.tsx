"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  X,
  Copy,
  Sparkle,
  HourglassSimple,
  Buildings,
  Key,
  IdentificationBadge,
  User,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { ClientProfile } from "@/lib/fiduciary-store";

export default function AdvisorOnboardPage() {
  const router = useRouter();
  const { clients, addClient, approveClient, rejectClient, loginAsClient, advisor } = useFiduciary();

  const [activeTab, setActiveTab] = useState<"pending" | "manual">("manual");

  // Manual Form State
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

  // Post-Onboarding Success Modal State
  const [createdClient, setCreatedClient] = useState<ClientProfile | null>(null);
  const [copied, setCopied] = useState(false);

  // Filter pending approval clients
  const pendingClients = clients.filter((c) => c.status === "pending_approval");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please provide client name and email.");
      return;
    }

    const netWorthVal = Number(netWorth) || 50000000;
    const dragNum = Math.round(netWorthVal * 0.0095);
    const clientPan = (pan.trim() || "ABCDE1234F").toUpperCase();

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
      onboardingStage: "Mandate Dispatched // Form B Active",
      statusBadge: {
        label: "Active Fiduciary Mandate",
        bg: "bg-emerald-100",
        text: "text-emerald-700",
      },
      pan: clientPan,
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
      status: "active",
      password: clientPan,
      authProvider: "advisor_manual",
      appliedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    });

    setCreatedClient(newClient);
  };

  const copyCredentials = (c: ClientProfile) => {
    const credText = `Aurum Fiduciary Wealth Portal Access:\nURL: ${window.location.origin}/login\nEmail: ${c.email}\nInitial Passkey: ${c.pan}\n(Note: Default passkey is your 10-digit PAN)`;
    navigator.clipboard.writeText(credText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-7 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/advisor/clients"
            className="inline-flex items-center space-x-1 text-xs text-[#718EBF] hover:text-[#343C6A] mb-2 transition"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Back to Client Roster</span>
          </Link>
          <h2 className="text-2xl font-bold font-space text-[#343C6A]">
            Client Onboarding & Mandate Authorizations
          </h2>
          <p className="text-xs text-[#718EBF]">
            Approve investor self-registrations or manually onboard private family accounts under SEBI RIA INA000015845.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="bg-white p-1 rounded-2xl border border-[#DFEAF2] inline-flex space-x-1 shadow-xs self-start">
          <button
            onClick={() => setActiveTab("manual")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "manual"
                ? "bg-[#1814F3] text-white shadow-xs"
                : "text-[#718EBF] hover:text-[#343C6A]"
            }`}
          >
            <UserPlus size={16} weight="bold" />
            <span>Manual Onboarding</span>
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === "pending"
                ? "bg-[#343C6A] text-white shadow-xs"
                : "text-[#718EBF] hover:text-[#343C6A]"
            }`}
          >
            <HourglassSimple size={16} weight="bold" />
            <span>Pending Approvals</span>
            {pendingClients.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
                {pendingClients.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab 1: Pending Client Approvals */}
      {activeTab === "pending" && (
        <div className="space-y-4">
          <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
            <div className="flex items-center justify-between border-b border-[#F0F4F8] pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold font-space text-[#343C6A]">
                  Investor Registrations Awaiting RIA Approval
                </h3>
                <p className="text-xs text-[#718EBF]">
                  SEBI Regulation 17 mandates investor suitability evaluation prior to executing portfolio advisory mandates.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-mono">
                {pendingClients.length} Pending Application{pendingClients.length === 1 ? "" : "s"}
              </span>
            </div>

            {pendingClients.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle size={28} weight="duotone" />
                </div>
                <h4 className="text-sm font-bold text-[#343C6A]">All Client Registrations Reconciled</h4>
                <p className="text-xs text-[#718EBF] max-w-sm mx-auto">
                  There are no pending investor self-registrations or Google OAuth applications. New applicants will appear here for your review and approval.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingClients.map((client) => (
                  <div
                    key={client.id}
                    className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#343C6A]">{client.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#1814F3]">
                          {client.authProvider === "google" ? "Google OAuth" : "Direct Self-Registration"}
                        </span>
                        <span className="text-[10px] text-[#718EBF] font-mono">
                          Applied: {client.appliedAt || client.createdAt}
                        </span>
                      </div>
                      <div className="text-xs text-[#718EBF] space-x-3 font-mono">
                        <span>Email: <strong className="text-[#343C6A] font-semibold">{client.email}</strong></span>
                        <span>•</span>
                        <span>City: <strong className="text-[#343C6A] font-semibold">{client.city}</strong></span>
                        <span>•</span>
                        <span>Tier: <strong className="text-[#343C6A] font-semibold">{client.tier}</strong></span>
                      </div>
                      <p className="text-[11px] text-[#718EBF] italic">
                        &quot;{client.advisorNotes}&quot;
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => approveClient(client.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
                      >
                        <CheckCircle size={16} weight="bold" />
                        <span>Approve & Accept Mandate</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Decline registration for ${client.name}?`)) {
                            rejectClient(client.id);
                          }
                        }}
                        className="px-3 py-2 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-semibold transition"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Manual Physical Onboarding Form */}
      {activeTab === "manual" && (
        <form onSubmit={handleSubmit} className="bg-white rounded-[25px] p-8 border border-[#DFEAF2] shadow-sm space-y-6">
          {/* Section 1: Legal Identity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1814F3]">
                1. Client Legal Identity & Contact
              </h3>
              <span className="text-[11px] text-[#718EBF]">SEBI KYC Mandated</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
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
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Mobile Contact</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">City of Residence</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">
                  PAN Number (10 Digits)
                </label>
                <input
                  type="text"
                  maxLength={10}
                  required
                  placeholder="ABCDE1234F"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm font-mono uppercase text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
                <p className="text-[11px] text-[#1814F3] mt-1 font-medium flex items-center space-x-1">
                  <Key size={13} weight="bold" />
                  <span>The client&apos;s PAN will automatically serve as their initial login passkey at /login.</span>
                </p>
              </div>
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Advisory Tier Classification</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
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
              2. Initial Financial Baseline & Surplus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Estimated Net Worth (₹)</label>
                <input
                  type="number"
                  value={netWorth}
                  onChange={(e) => setNetWorth(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Liquid Surplus (₹)</label>
                <input
                  type="number"
                  value={liquidSurplus}
                  onChange={(e) => setLiquidSurplus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Monthly Surplus (₹)</label>
                <input
                  type="number"
                  value={monthlySurplus}
                  onChange={(e) => setMonthlySurplus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Professional Profile */}
          <div className="pt-4 border-t border-[#F0F4F8]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1814F3] mb-4">
              3. Occupation & Advisor Notes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Employer / Enterprise</label>
                <input
                  type="text"
                  placeholder="e.g. Goldman Sachs India"
                  value={employer}
                  onChange={(e) => setEmployer(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Managing Director"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#343C6A] mb-1">Gross Annual Inflow</label>
                <input
                  type="text"
                  value={grossCtc}
                  onChange={(e) => setGrossCtc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
                />
              </div>
            </div>

            <div className="mt-4 text-xs">
              <label className="block font-bold text-[#343C6A] mb-1">Advisor Initial Assessment Notes</label>
              <textarea
                rows={3}
                placeholder="Record initial mandate terms, family trust details, or direct asset transition schedule..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-xs text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
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
              <span>Onboard Client & Generate Mandate</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </form>
      )}

      {/* Onboarding Success Dialog Modal */}
      {createdClient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-[25px] max-w-lg w-full p-8 border border-[#DFEAF2] shadow-2xl relative space-y-5">
            <button
              onClick={() => setCreatedClient(null)}
              className="absolute top-6 right-6 p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X size={20} weight="bold" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle size={32} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold font-space text-[#343C6A]">
                Client Successfully Registered
              </h3>
              <p className="text-xs text-[#718EBF]">
                {createdClient.name} has been enrolled in the SEBI RIA practice registry.
              </p>
            </div>

            {/* Generated Login Credentials Card */}
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#DFEAF2] space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6EFF5]">
                <span className="font-bold uppercase tracking-wider text-[#1814F3] text-[10px]">
                  Investor Login Credentials
                </span>
                <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Status: Active
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#718EBF]">Portal Sign-In URL:</span>
                <span className="font-mono text-[#343C6A] font-semibold">/login</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#718EBF]">Registered Email:</span>
                <span className="font-mono text-[#343C6A] font-bold">{createdClient.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#718EBF]">Default Passkey (PAN):</span>
                <span className="font-mono text-[#1814F3] font-extrabold">{createdClient.pan}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#718EBF] leading-relaxed">
              💡 <strong>Next Step:</strong> Share these credentials with the client family. They can immediately log in to track their portfolios and execute their advisory agreement.
            </p>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => copyCredentials(createdClient)}
                className="w-full py-3 bg-[#343C6A] text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition flex items-center justify-center space-x-2 shadow-xs"
              >
                <Copy size={16} weight="bold" />
                <span>{copied ? "✓ Credentials Copied to Clipboard!" : "Copy Client Login Credentials"}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    loginAsClient(createdClient.id, createdClient.email);
                    router.push("/client/dashboard");
                  }}
                  className="py-2.5 bg-[#EEF2F6] hover:bg-[#E3E8EE] text-[#1814F3] rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1"
                >
                  <Sparkle size={14} weight="fill" />
                  <span>Simulate Client View</span>
                </button>

                <button
                  type="button"
                  onClick={() => router.push(`/advisor/clients/${createdClient.id}`)}
                  className="py-2.5 bg-white border border-[#DFEAF2] hover:bg-slate-50 text-[#343C6A] rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1"
                >
                  <User size={14} weight="bold" />
                  <span>View Master Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
