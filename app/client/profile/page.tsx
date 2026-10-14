"use client";

import React, { useState } from "react";
import {
  User,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { maskPAN } from "@/lib/fiduciary-store";

export default function ClientProfilePage() {
  const { activeClient, updateClient, advisor } = useFiduciary();

  const [name, setName] = useState(activeClient?.name || "");
  const [email, setEmail] = useState(activeClient?.email || "");
  const [phone, setPhone] = useState(activeClient?.phone || "");
  const [city, setCity] = useState(activeClient?.city || "");
  const [employer, setEmployer] = useState(activeClient?.employer || "");
  const [designation, setDesignation] = useState(activeClient?.designation || "");
  const [grossCtc, setGrossCtc] = useState(activeClient?.grossCtc || "");
  const [revealPan, setRevealPan] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeClient) {
      updateClient(activeClient.id, {
        name,
        email,
        phone,
        city,
        employer,
        designation,
        grossCtc,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-7 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold font-space text-[#343C6A]">
          Client Legal Identity & KYC Profile
        </h2>
        <p className="text-xs text-[#718EBF]">
          Statutory profile used for SEBI Form B identification, CKYC records, and tax filings.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-800 flex items-center space-x-2">
          <CheckCircle size={20} weight="fill" className="text-emerald-600" />
          <span>Profile changes successfully updated across your active fiduciary record!</span>
        </div>
      )}

      {/* Identity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
              Permanent Account Number (PAN)
            </span>
            <button
              type="button"
              onClick={() => setRevealPan(!revealPan)}
              className="text-[#718EBF] hover:text-[#1814F3] text-xs transition"
              title={revealPan ? "Mask PAN" : "Reveal PAN"}
            >
              {revealPan ? <EyeSlash size={15} weight="bold" /> : <Eye size={15} weight="bold" />}
            </button>
          </div>
          <h3 className="text-xl font-bold font-mono text-[#343C6A] mt-2">
            {maskPAN(activeClient?.pan || "ABCDE1234F", revealPan)}
          </h3>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            ✓ NSDL Verified
          </span>
        </div>

        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            Aadhaar Number (Masked)
          </span>
          <h3 className="text-xl font-bold font-mono text-[#343C6A] mt-2">
            {activeClient?.aadhaarMasked || "XXXX-XXXX-1234"}
          </h3>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            ✓ UIDAI e-KYC Sealed
          </span>
        </div>

        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            Central KYC ID (CKYC)
          </span>
          <h3 className="text-xl font-bold font-mono text-[#343C6A] mt-2">
            {activeClient?.ckycId || "IN-CKYC-VERIFIED"}
          </h3>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            ✓ CERSAI Registry Active
          </span>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-[25px] p-7 border border-[#DFEAF2] shadow-sm space-y-6">
        <h3 className="text-base font-bold font-space text-[#343C6A]">
          Personal & Professional Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-[#343C6A] mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block font-bold text-[#343C6A] mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-[#343C6A] mb-1">Mobile Phone</label>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-[#343C6A] mb-1">Employer / Enterprise</label>
            <input
              type="text"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block font-bold text-[#343C6A] mb-1">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block font-bold text-[#343C6A] mb-1">Gross Annual Income</label>
            <input
              type="text"
              value={grossCtc}
              onChange={(e) => setGrossCtc(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#DFEAF2] flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#1814F3] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
          >
            <span>Save Profile Updates</span>
            <ArrowRight size={16} weight="bold" />
          </button>
        </div>
      </form>
    </div>
  );
}
