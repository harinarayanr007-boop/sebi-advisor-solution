"use client";

import React, { useState } from "react";
import { User, ShieldCheck, DollarSign, Activity, Briefcase, Check } from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function ProfilePage() {
  const { activeClient } = useFiduciary();
  const [editing, setEditing] = useState(false);
  const [city, setCity] = useState(activeClient.city);
  const [employer, setEmployer] = useState(activeClient.employer);
  const [designation, setDesignation] = useState(activeClient.designation);
  const [ctc, setCtc] = useState(activeClient.grossCtc);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-7">
      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#DCFAF8] text-[#16DBCC] flex items-center justify-center shrink-0">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Gross Annual CTC</p>
            <h3 className="text-lg font-bold font-space text-[#343C6A]">
              {activeClient.grossCtc.split(" /")[0]}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#E7EDFF] text-[#396AFF] flex items-center justify-center shrink-0">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Monthly Surplus</p>
            <h3 className="text-lg font-bold font-space text-[#343C6A]">
              {activeClient.monthlySurplus}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#FFE0EB] text-[#FF82AC] flex items-center justify-center shrink-0">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">Employer</p>
            <h3 className="text-sm font-bold text-[#343C6A] truncate max-w-[140px]">
              {activeClient.employer}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#FFF5D9] text-[#FFBB38] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-[#718EBF] font-semibold">CKYC Registry</p>
            <h3 className="text-sm font-bold text-emerald-600 font-space">
              Verified Active
            </h3>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-[25px] p-8 border border-[#DFEAF2] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#F5F7FA] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#343C6A] font-jakarta">
              Client Statutory Identification & Employment Dossier
            </h2>
            <p className="text-xs text-[#718EBF] mt-1">
              Maintained under SEBI Investment Advisers Regulations for {activeClient.name}.
            </p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 rounded-full border border-[#DFEAF2] text-xs font-bold text-[#1814F3] hover:bg-blue-50"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center space-x-2">
            <Check className="w-4 h-4" />
            <span>Profile successfully updated in database.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
          <div>
            <label className="text-xs font-bold text-[#343C6A] block mb-2">
              Full Legal Name
            </label>
            <input
              type="text"
              readOnly
              value={activeClient.name}
              className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] font-semibold border border-[#DFEAF2]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#343C6A] block mb-2">
              Official Email Address
            </label>
            <input
              type="text"
              readOnly
              value={activeClient.email}
              className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm text-[#343C6A] font-semibold border border-[#DFEAF2]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#343C6A] block mb-2">
              Income Tax PAN
            </label>
            <input
              type="text"
              readOnly
              value={activeClient.pan}
              className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm font-space font-semibold text-[#343C6A] border border-[#DFEAF2]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#343C6A] block mb-2">
              Masked Aadhaar UID
            </label>
            <input
              type="text"
              readOnly
              value={activeClient.aadhaarMasked}
              className="w-full bg-[#F5F7FA] rounded-[15px] px-4 py-3 text-sm font-space font-semibold text-[#343C6A] border border-[#DFEAF2]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#343C6A] block mb-2">
              Employer Organization
            </label>
            <input
              type="text"
              readOnly={!editing}
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              className={`w-full rounded-[15px] px-4 py-3 text-sm text-[#343C6A] font-semibold border ${
                editing ? "bg-white border-[#1814F3]" : "bg-[#F5F7FA] border-[#DFEAF2]"
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#343C6A] block mb-2">
              Designation
            </label>
            <input
              type="text"
              readOnly={!editing}
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className={`w-full rounded-[15px] px-4 py-3 text-sm text-[#343C6A] font-semibold border ${
                editing ? "bg-white border-[#1814F3]" : "bg-[#F5F7FA] border-[#DFEAF2]"
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#343C6A] block mb-2">
              Gross Annual CTC
            </label>
            <input
              type="text"
              readOnly={!editing}
              value={ctc}
              onChange={(e) => setCtc(e.target.value)}
              className={`w-full rounded-[15px] px-4 py-3 text-sm text-[#343C6A] font-semibold border ${
                editing ? "bg-white border-[#1814F3]" : "bg-[#F5F7FA] border-[#DFEAF2]"
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#343C6A] block mb-2">
              Residential Domicile
            </label>
            <input
              type="text"
              readOnly={!editing}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`w-full rounded-[15px] px-4 py-3 text-sm text-[#343C6A] font-semibold border ${
                editing ? "bg-white border-[#1814F3]" : "bg-[#F5F7FA] border-[#DFEAF2]"
              }`}
            />
          </div>

          {editing && (
            <div className="md:col-span-2 flex justify-end space-x-3 pt-4 border-t border-[#DFEAF2]">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-5 py-2.5 rounded-full border border-[#DFEAF2] text-xs font-bold text-[#718EBF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#1814F3] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#120ec0]"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
