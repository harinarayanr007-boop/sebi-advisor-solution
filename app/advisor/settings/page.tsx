"use client";

import React, { useState } from "react";
import {
  Gear,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function AdvisorSettingsPage() {
  const { advisor, updateAdvisorSettings } = useFiduciary();
  const [feeSchedule, setFeeSchedule] = useState(advisor.feeSchedule);
  const [phone, setPhone] = useState(advisor.phone);
  const [officeAddress, setOfficeAddress] = useState(advisor.officeAddress);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdvisorSettings({
      feeSchedule,
      phone,
      officeAddress,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-7 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold font-space text-[#343C6A]">
          RIA Practice & Regulatory Settings
        </h2>
        <p className="text-xs text-[#718EBF]">
          Statutory configuration, SEBI license parameters, and fee-only caps.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-800 flex items-center space-x-2">
          <CheckCircle size={20} weight="fill" className="text-emerald-600" />
          <span>Practice settings updated successfully!</span>
        </div>
      )}

      {/* Practice Details Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            SEBI Registration Number
          </span>
          <h3 className="text-xl font-bold font-mono text-[#343C6A] mt-2">
            {advisor.sebiRegNumber}
          </h3>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            ✓ Regulation 15 Validated
          </span>
        </div>

        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            BASL Member ID
          </span>
          <h3 className="text-xl font-bold font-mono text-[#343C6A] mt-2">
            {advisor.baslMembership}
          </h3>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            ✓ BSE Administration Active
          </span>
        </div>

        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            Advisory Model
          </span>
          <h3 className="text-xl font-bold font-space text-emerald-600 mt-2">
            100% Fee-Only
          </h3>
          <span className="text-[11px] text-[#718EBF] block mt-1">
            Zero Distribution Kickbacks
          </span>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-[25px] p-7 border border-[#DFEAF2] shadow-sm space-y-6">
        <h3 className="text-base font-bold font-space text-[#343C6A]">
          Statutory Practice Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-[#343C6A] mb-1">Principal Advisor Name</label>
            <input
              type="text"
              disabled
              value={advisor.name}
              className="w-full px-3.5 py-2.5 bg-[#EEF2F6] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A]"
            />
          </div>
          <div>
            <label className="block font-bold text-[#343C6A] mb-1">Advisory Firm Entity</label>
            <input
              type="text"
              disabled
              value={advisor.firmName}
              className="w-full px-3.5 py-2.5 bg-[#EEF2F6] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-[#343C6A] mb-1">Registered Email Address</label>
            <input
              type="email"
              disabled
              value={advisor.email}
              className="w-full px-3.5 py-2.5 bg-[#EEF2F6] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A]"
            />
          </div>
          <div>
            <label className="block font-bold text-[#343C6A] mb-1">Official Desk Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
            />
          </div>
        </div>

        <div className="text-xs">
          <label className="block font-bold text-[#343C6A] mb-1">Registered Office Address</label>
          <input
            type="text"
            value={officeAddress}
            onChange={(e) => setOfficeAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
          />
        </div>

        <div className="text-xs">
          <label className="block font-bold text-[#343C6A] mb-1">SEBI Statutory Fee-Only Schedule Policy</label>
          <input
            type="text"
            value={feeSchedule}
            onChange={(e) => setFeeSchedule(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-sm"
          />
          <span className="text-[11px] text-[#718EBF] mt-1 block">
            In compliance with SEBI circular SEBI/HO/IMD/DF1/CIR/P/2020/182 (Max ₹1.25 Lakh per family per annum or 2.5% of AUA per annum).
          </span>
        </div>

        <div className="pt-4 border-t border-[#DFEAF2] flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#1814F3] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
          >
            <span>Save Configuration</span>
            <ArrowRight size={16} weight="bold" />
          </button>
        </div>
      </form>
    </div>
  );
}
