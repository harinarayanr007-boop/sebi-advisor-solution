"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Eye,
  Printer,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function ClientManagementPage() {
  const {
    clients,
    activeClient,
    setActiveClientId,
    setViewMode,
    setShowFactsheetModal,
    setShowInviteModal,
  } = useFiduciary();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.employer.toLowerCase().includes(search.toLowerCase()) ||
      c.pan.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());

    if (filter === "ALL") return matchesSearch;
    if (filter === "READY") return matchesSearch && c.statusBadge.label.includes("Ready");
    if (filter === "PENDING")
      return (
        matchesSearch &&
        (c.statusBadge.label.includes("E-Sign") ||
          c.statusBadge.label.includes("Audit") ||
          c.statusBadge.label.includes("Pending"))
      );
    if (filter === "ACTIVE") return matchesSearch && c.statusBadge.label.includes("Active");
    return matchesSearch;
  });

  return (
    <div className="space-y-7">
      {/* Action Bar & Filter Pills */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          <span className="text-xs font-bold text-[#718EBF] uppercase tracking-wider mr-2">
            Status Filter:
          </span>
          {[
            { key: "ALL", label: `All Clients (${clients.length})` },
            { key: "READY", label: "Ready for Execution" },
            { key: "PENDING", label: "Needs Review / E-Sign" },
            { key: "ACTIVE", label: "Mandate Active" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === f.key
                  ? "bg-[#1814F3] text-white"
                  : "bg-[#F5F7FA] text-[#718EBF] hover:text-[#343C6A]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-[#1814F3] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 hover:bg-[#120ec0] transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Onboard New Client</span>
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-[25px] p-6 sm:p-8 border border-[#DFEAF2] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold font-jakarta text-[#343C6A]">
              SEBI RIA Practice Client Directory
            </h2>
            <p className="text-xs text-[#718EBF] mt-0.5">
              Click &apos;Inspect Portal&apos; to view that client&apos;s full wealth portal, or &apos;Print Dossier&apos; for their 1-page factsheet.
            </p>
          </div>
          <span className="text-xs font-bold font-space px-3 py-1 rounded-full bg-blue-50 text-[#1814F3] self-start sm:self-auto">
            Showing {filteredClients.length} of {clients.length} Profiles
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#DFEAF2] text-xs font-bold text-[#718EBF]">
                <th className="pb-3 font-semibold">Client Name & Organization</th>
                <th className="pb-3 font-semibold">Tier</th>
                <th className="pb-3 font-semibold">Direct Net Worth</th>
                <th className="pb-3 font-semibold">Monthly Surplus</th>
                <th className="pb-3 font-semibold">Onboarding Stage</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F7FA] text-xs font-semibold text-[#343C6A]">
              {filteredClients.map((client) => {
                const isCurrentActive = activeClient.id === client.id;
                return (
                  <tr
                    key={client.id}
                    className={`hover:bg-[#F5F7FA]/70 transition-colors ${
                      isCurrentActive ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {client.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-bold text-sm text-[#343C6A]">{client.name}</p>
                            {isCurrentActive && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-[#1814F3]">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#718EBF]">
                            {client.employer} • {client.city}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="text-xs font-bold font-space text-[#343C6A]">
                        {client.tier}
                      </span>
                    </td>

                    <td className="py-4">
                      <p className="font-bold font-space text-sm text-[#343C6A]">
                        {client.netWorth}
                      </p>
                      <p className="text-[10px] text-emerald-600 font-space">
                        Saves {client.dragSaved}
                      </p>
                    </td>

                    <td className="py-4 font-space text-[#343C6A]">
                      {client.monthlySurplus}
                    </td>

                    <td className="py-4">
                      <span className="text-[11px] font-medium text-[#718EBF] block max-w-[200px] truncate">
                        {client.onboardingStage}
                      </span>
                    </td>

                    <td className="py-4">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${client.statusBadge.bg} ${client.statusBadge.text}`}
                      >
                        {client.statusBadge.label}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => {
                            setActiveClientId(client.id);
                            setViewMode("client");
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#1814F3] text-white text-xs font-bold hover:bg-[#120ec0] transition-colors flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveClientId(client.id);
                            setShowFactsheetModal(true);
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#F5F7FA] border border-[#DFEAF2] text-[#343C6A] hover:text-[#1814F3] text-xs font-bold transition-colors"
                        >
                          Print Dossier
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
