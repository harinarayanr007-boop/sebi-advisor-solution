"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  MagnifyingGlass,
  UserPlus,
  Trash,
  Printer,
  Sparkle,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function AdvisorClientsPage() {
  const {
    clients,
    deleteClient,
    setShowFactsheetModal,
    setSelectedReportClient,
    loadDemoData,
  } = useFiduciary();

  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const filteredClients = clients.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.pan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTier = tierFilter === "all" || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-space text-[#343C6A]">
            Client Management Roster & Fiduciary Mandates
          </h2>
          <p className="text-xs text-[#718EBF]">
            Directory of onboarded HNI families, KYC statuses, and Form B compliance records.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/advisor/onboard"
            className="px-4 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-2 shadow-sm"
          >
            <UserPlus size={16} weight="bold" />
            <span>+ Onboard New Client</span>
          </Link>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <MagnifyingGlass size={16} weight="bold" className="text-[#718EBF] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by legal name, email, or PAN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-xs text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-xs font-bold text-[#718EBF]">Filter Tier:</span>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-xs text-[#343C6A] focus:outline-none"
          >
            <option value="all">All Tiers ({clients.length})</option>
            <option value="Emerging HNI">Emerging HNI</option>
            <option value="Core HNI">Core HNI</option>
            <option value="UHNI">UHNI</option>
          </select>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
        {filteredClients.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-[#DFEAF2] rounded-2xl space-y-3">
            <Users size={36} weight="duotone" className="text-[#718EBF] mx-auto opacity-40" />
            <h4 className="text-sm font-bold text-[#343C6A]">No clients match criteria</h4>
            <p className="text-xs text-[#718EBF] max-w-sm mx-auto">
              {clients.length === 0
                ? "Start by adding your first client family to begin fiduciary advisory."
                : "No clients found matching your search or tier filter."}
            </p>
            {clients.length === 0 && (
              <div className="flex justify-center space-x-3 pt-2">
                <Link
                  href="/advisor/onboard"
                  className="px-5 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
                >
                  + Onboard Client
                </Link>
                <button
                  onClick={loadDemoData}
                  className="px-4 py-2.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-bold hover:bg-amber-100 transition"
                >
                  ⚡ Load Sample Case
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="border border-[#DFEAF2] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FA] text-[#718EBF] uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Client Legal Name</th>
                  <th className="p-3.5">Tax PAN & CKYC</th>
                  <th className="p-3.5">Advisory Tier</th>
                  <th className="p-3.5">Direct Net Worth</th>
                  <th className="p-3.5">Annual Drag Saved</th>
                  <th className="p-3.5">Risk Profile</th>
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F8]">
                {filteredClients.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5">
                      <span className="font-bold text-[#343C6A] block">{c.name}</span>
                      <span className="text-[10px] text-[#718EBF] font-mono">{c.email}</span>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-[#718EBF]">
                      <div>PAN: {c.pan}</div>
                      <div className="text-[10px]">{c.ckycId}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-[#343C6A]">{c.tier}</span>
                    </td>
                    <td className="p-3.5 font-bold font-space text-[#343C6A]">
                      {c.netWorth}
                    </td>
                    <td className="p-3.5 text-emerald-600 font-bold">
                      {c.dragSaved}
                    </td>
                    <td className="p-3.5 text-[#718EBF]">
                      {c.riskTolerance}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          c.statusBadge?.bg || "bg-emerald-100"
                        } ${c.statusBadge?.text || "text-emerald-700"}`}
                      >
                        {c.statusBadge?.label || "Active"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <Link
                        href={`/advisor/clients/${c.id}`}
                        className="px-3 py-1.5 bg-[#E7EDFF] text-[#1814F3] font-bold rounded-lg hover:bg-blue-200 transition text-[11px]"
                      >
                        Inspect Dossier
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedReportClient(c);
                          setShowFactsheetModal(true);
                        }}
                        className="px-3 py-1.5 bg-slate-100 text-[#343C6A] font-bold rounded-lg hover:bg-slate-200 transition text-[11px]"
                      >
                        Print
                      </button>
                      <button
                        onClick={() => deleteClient(c.id)}
                        title="Remove client"
                        className="p-1.5 text-[#718EBF] hover:text-rose-600 transition"
                      >
                        <Trash size={16} weight="bold" className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
