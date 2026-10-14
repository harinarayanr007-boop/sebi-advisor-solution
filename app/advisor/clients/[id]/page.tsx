"use client";

import React, { use, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  ShieldCheck,
  Briefcase,
  Target,
  CheckCircle,
  Eye,
  EyeSlash,
  UploadSimple,
  DownloadSimple,
  LinkSimple,
  ArrowSquareOut,
  Check,
  FileCsv,
} from "@phosphor-icons/react";
import { useFiduciary } from "@/context/FiduciaryContext";
import { formatINR, maskPAN, HoldingAsset } from "@/lib/fiduciary-store";

export default function AdvisorClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    clients,
    assets,
    goals,
    cashFlow,
    insurance,
    updateClient,
    addAsset,
    importClientAssets,
    loginAsClient,
    setShowFactsheetModal,
    setSelectedReportClient,
  } = useFiduciary();

  const client = clients.find((c) => c.id === id);

  const [notes, setNotes] = useState(client?.advisorNotes || "");
  const [revealPan, setRevealPan] = useState(false);
  const [savedNotes, setSavedNotes] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  if (!client) {
    return (
      <div className="space-y-6 text-center py-16">
        <h2 className="text-2xl font-bold font-space text-[#343C6A]">Client Record Not Found</h2>
        <p className="text-xs text-[#718EBF]">The client with ID &quot;{id}&quot; was not found in your active practice roster.</p>
        <Link
          href="/advisor/clients"
          className="inline-block px-5 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
        >
          ← Return to Client Roster
        </Link>
      </div>
    );
  }

  const clientAssets = assets.filter((a) => a.clientId === client.id);
  const clientGoals = goals.filter((g) => g.clientId === client.id);
  const clientCashFlow = cashFlow.filter((cf) => cf.clientId === client.id);
  const clientInsurance = insurance.filter((ins) => ins.clientId === client.id);

  const handleSaveNotes = () => {
    updateClient(client.id, { advisorNotes: notes });
    setSavedNotes(true);
    setTimeout(() => setSavedNotes(false), 2500);
  };

  const handlePrint = () => {
    setSelectedReportClient(client);
    setShowFactsheetModal(true);
  };

  // 1-Click Direct Login as this Client
  const handleDirectLogin = () => {
    loginAsClient(client.id);
    router.push("/client/dashboard");
  };

  // Copy Sharable Magic Link
  const handleCopyMagicLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://sebi-advisor-solution.vercel.app";
    const magicUrl = `${origin}/login?magic=${client.id}`;
    navigator.clipboard.writeText(magicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Export to CSV / Excel
  const handleExportCsv = () => {
    const headers = [
      "Section",
      "Scheme / Instrument Description",
      "Category",
      "ISIN",
      "Folio Number",
      "Current Valuation (INR)",
      "Direct TER (%)",
      "Regular TER (%)",
      "1-Yr Return",
      "Annual Commission Saved (INR)",
    ];

    const holdingRows = clientAssets.map((a) => [
      "Holding",
      `"${(a.name || '').replace(/"/g, '""')}"`,
      `"${a.category || ''}"`,
      a.isin || "N/A",
      a.folio || "Direct Demat",
      a.currentValue || 0,
      a.directExpenseRatio || "0.00%",
      a.regularExpenseRatio || "0.00%",
      a.oneYearReturn || "N/A",
      `"${a.annualDragSaved || ''}"`,
    ]);

    const goalHeaders = [
      "Section",
      "Milestone / Goal Title",
      "Category",
      "Target Year",
      "Target Amount (INR)",
      "Current Funded (INR)",
      "Monthly SIP (INR)",
      "Monte Carlo Probability (%)",
      "Recommended Asset Class",
    ];

    const goalRows = clientGoals.map((g) => [
      "Goal",
      `"${(g.title || '').replace(/"/g, '""')}"`,
      `"${g.category || ''}"`,
      g.targetYear || 2030,
      g.targetAmount || 0,
      g.currentFunded || 0,
      g.monthlySip || 0,
      `${g.probabilityPercent || 90}%`,
      `"${g.recommendedInstrument || ''}"`,
    ]);

    const csvBody = [
      `"SEBI REGISTERED INVESTMENT ADVISER - CLIENT PORTFOLIO EXPORT"`,
      `"Investor Legal Name:","${client.name}"`,
      `"Client ID:","${client.id}"`,
      `"Permanent Account Number (PAN):","${client.pan}"`,
      `"Central KYC (CKYC):","${client.ckycId}"`,
      `"Direct Demat Net Worth:","${client.netWorth}"`,
      `"Annual Commission Drag Eliminated:","${client.dragSaved}"`,
      `"Export Date:","${new Date().toLocaleDateString("en-IN")}"`,
      "",
      `"--- ITEMIZED DIRECT DEMAT HOLDINGS ---"`,
      headers.join(","),
      ...holdingRows.map((r) => r.join(",")),
      "",
      `"--- FINANCIAL GOALS & MILESTONES ---"`,
      goalHeaders.join(","),
      ...goalRows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob([csvBody], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${client.name.replace(/\s+/g, "_")}_Portfolio_Data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import from CSV / Excel file
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) return;

        const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
        if (lines.length < 2) {
          setImportStatus({ type: "error", message: "CSV file is empty or missing data rows." });
          return;
        }

        const parsedHoldings: Omit<HoldingAsset, "id" | "clientId">[] = [];
        const startIndex = lines[0].toLowerCase().includes("scheme") || lines[0].toLowerCase().includes("name") ? 1 : 0;

        for (let i = startIndex; i < lines.length; i++) {
          const row = lines[i];
          if (row.startsWith('"---') || row.startsWith("Section") || row.startsWith('"Section"')) continue;

          const cols = row.split(",").map((c) => c.replace(/^"|"$/g, "").trim());
          if (cols.length >= 2) {
            const isOurExport = cols[0] === "Holding" || cols[0] === '"Holding"';
            const name = isOurExport ? cols[1] : (cols[0] || `Imported Instrument ${i}`);
            const category = isOurExport ? cols[2] : (cols[1] || "Direct Equity / MF");
            const isin = isOurExport
              ? cols[3]
              : (cols[2] && cols[2].startsWith("IN") ? cols[2] : `INF${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
            const folio = isOurExport
              ? cols[4]
              : (cols[3] || `${Math.floor(10000000 + Math.random() * 90000000)}/01`);
            const valCol = isOurExport ? cols[5] : (cols[4] || cols[2]);
            const rawVal = parseFloat(valCol?.replace(/[^0-9.]/g, "") || "500000");
            const val = isNaN(rawVal) || rawVal === 0 ? 500000 : rawVal;
            const directTerCol = isOurExport ? (cols[6] || "0.55%") : (cols[5] || "0.55%");
            const regTerCol = isOurExport ? (cols[7] || "1.55%") : (cols[6] || "1.55%");
            const directTer = directTerCol.includes("%") ? directTerCol : `${directTerCol}%`;
            const regTer = regTerCol.includes("%") ? regTerCol : `${regTerCol}%`;
            const directNum = parseFloat(directTer) || 0.55;
            const regNum = parseFloat(regTer) || 1.55;
            const savedPerYear = Math.round(val * ((regNum - directNum) / 100));

            parsedHoldings.push({
              name,
              category,
              isin,
              folio,
              currentValue: val,
              allocationPercent: 25,
              directExpenseRatio: directTer,
              regularExpenseRatio: regTer,
              oneYearReturn: "+16.8%",
              annualDragSaved: `₹${savedPerYear.toLocaleString("en-IN")}/yr`,
            });
          }
        }

        if (parsedHoldings.length > 0) {
          importClientAssets(client.id, parsedHoldings);
          setImportStatus({
            type: "success",
            message: `Successfully imported ${parsedHoldings.length} direct holding folios into ${client.name}'s portfolio!`,
          });
        } else {
          setImportStatus({ type: "error", message: "No valid holdings recognized. Ensure CSV has scheme and value columns." });
        }
      } catch (err) {
        setImportStatus({ type: "error", message: "Failed to parse CSV file." });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-7">
      {/* Hidden CSV File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv,.txt"
        onChange={handleCsvUpload}
        className="hidden"
      />

      {/* Top Breadcrumb & Action Command Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div>
          <Link
            href="/advisor/clients"
            className="inline-flex items-center space-x-1 text-xs text-[#718EBF] hover:text-[#343C6A] mb-2"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Back to All Clients</span>
          </Link>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold font-space text-[#343C6A]">
              {client.name}
            </h2>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                client.statusBadge?.bg || "bg-emerald-100"
              } ${client.statusBadge?.text || "text-emerald-700"}`}
            >
              {client.tier}
            </span>
          </div>
          <div className="text-xs text-[#718EBF] mt-1 font-mono flex items-center space-x-2">
            <span>Client ID: {client.id} • PAN: {maskPAN(client.pan, revealPan)}</span>
            <button
              type="button"
              onClick={() => setRevealPan(!revealPan)}
              className="text-[#718EBF] hover:text-[#1814F3] transition"
              title={revealPan ? "Mask PAN" : "Reveal PAN"}
            >
              {revealPan ? <EyeSlash size={14} weight="bold" /> : <Eye size={14} weight="bold" />}
            </button>
            <span>• CKYC: {client.ckycId}</span>
          </div>
        </div>

        {/* Action Button Suite */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Import CSV / Excel */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Import portfolio folios from CSV or Excel file"
            className="px-3.5 py-2.5 bg-white border border-[#DFEAF2] hover:bg-[#F5F7FA] text-[#343C6A] rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-2xs"
          >
            <UploadSimple size={15} weight="bold" className="text-[#1814F3]" />
            <span>Import CSV</span>
          </button>

          {/* Export to CSV / Excel */}
          <button
            type="button"
            onClick={handleExportCsv}
            title="Export complete client portfolio & goals to CSV/Excel spreadsheet"
            className="px-3.5 py-2.5 bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-2xs"
          >
            <DownloadSimple size={15} weight="bold" className="text-emerald-600" />
            <span>Export CSV</span>
          </button>

          {/* Copy Sharable Magic Link */}
          <button
            type="button"
            onClick={handleCopyMagicLink}
            title="Copy 1-click passwordless magic login link to send to client"
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-2xs ${
              copiedLink
                ? "bg-emerald-600 text-white"
                : "bg-white border border-purple-200 hover:bg-purple-50 text-purple-700"
            }`}
          >
            {copiedLink ? (
              <>
                <Check size={15} weight="bold" />
                <span>Magic Link Copied!</span>
              </>
            ) : (
              <>
                <LinkSimple size={15} weight="bold" className="text-purple-600" />
                <span>Share Magic Link</span>
              </>
            )}
          </button>

          {/* Direct 1-Click Login as Client */}
          <button
            type="button"
            onClick={handleDirectLogin}
            title="Open client dashboard directly as this investor (no password needed)"
            className="px-3.5 py-2.5 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-2xs"
          >
            <ArrowSquareOut size={15} weight="bold" className="text-indigo-600" />
            <span>Login as Client</span>
          </button>

          {/* Print Fiduciary Dossier */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 bg-[#1814F3] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-1.5 shadow-sm"
          >
            <Printer size={15} weight="bold" />
            <span>Print Fiduciary Dossier</span>
          </button>
        </div>
      </div>

      {/* Import / Notification Banner */}
      {importStatus && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
            importStatus.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <div className="flex items-center space-x-2">
            {importStatus.type === "success" ? (
              <CheckCircle size={18} weight="fill" className="text-emerald-600" />
            ) : (
              <ShieldCheck size={18} weight="fill" className="text-rose-600" />
            )}
            <span>{importStatus.message}</span>
          </div>
          <button
            onClick={() => setImportStatus(null)}
            className="text-xs hover:underline opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            Direct Net Worth
          </span>
          <h3 className="text-xl font-bold font-space text-[#343C6A] mt-1">{client.netWorth}</h3>
          <span className="text-[11px] text-blue-600 block mt-0.5">{clientAssets.length} Direct Folios</span>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
            Annual Commission Drag Saved
          </span>
          <h3 className="text-xl font-bold font-space text-emerald-600 mt-1">{client.dragSaved}</h3>
          <span className="text-[11px] text-[#718EBF] block mt-0.5">0% Distributor Trail</span>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            Risk Classification
          </span>
          <h3 className="text-xl font-bold font-space text-[#343C6A] mt-1">{client.riskTolerance}</h3>
          <span className="text-[11px] text-[#718EBF] block mt-0.5">Hurdle: {client.targetCAGR}</span>
        </div>

        <div className="bg-white rounded-[25px] p-5 border border-[#DFEAF2] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] block">
            CeFCoM Compliance Escrow
          </span>
          <h3 className="text-xl font-bold font-space text-emerald-600 mt-1">100% Settled</h3>
          <span className="text-[10px] text-[#718EBF] block mt-0.5 font-mono">{client.cefcomUrn}</span>
        </div>
      </div>

      {/* Direct Demat Assets Inventory */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold font-space text-[#343C6A]">
            Direct Demat & Mutual Fund Holdings ({clientAssets.length})
          </h3>
        </div>

        {clientAssets.length === 0 ? (
          <p className="text-xs text-[#718EBF] italic p-4 bg-[#F5F7FA] rounded-xl">
            No direct holdings linked yet for this client account.
          </p>
        ) : (
          <div className="border border-[#DFEAF2] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FA] text-[#718EBF] uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Scheme / Asset</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Folio Number</th>
                  <th className="p-3.5">Current Value</th>
                  <th className="p-3.5">Direct TER</th>
                  <th className="p-3.5">Regular TER</th>
                  <th className="p-3.5">Annual Drag Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4F8]">
                {clientAssets.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-[#343C6A]">{a.name}</td>
                    <td className="p-3.5 text-[#718EBF]">{a.category}</td>
                    <td className="p-3.5 font-mono text-[11px] text-[#718EBF]">{a.folio}</td>
                    <td className="p-3.5 font-bold font-space text-[#343C6A]">
                      ₹{a.currentValue.toLocaleString("en-IN")}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-600">{a.directExpenseRatio}</td>
                    <td className="p-3.5 text-rose-500 line-through">{a.regularExpenseRatio}</td>
                    <td className="p-3.5 text-emerald-700 font-bold">{a.annualDragSaved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Goals & Cash Flow Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
          <h3 className="text-base font-bold font-space text-[#343C6A]">
            Financial Goals GPS ({clientGoals.length})
          </h3>
          {clientGoals.length === 0 ? (
            <p className="text-xs text-[#718EBF] italic">No goals registered.</p>
          ) : (
            <div className="space-y-3">
              {clientGoals.map((g) => (
                <div key={g.id} className="p-3.5 bg-[#F5F7FA] rounded-xl border border-[#DFEAF2] flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#343C6A] block">{g.title}</span>
                    <span className="text-[10px] text-[#718EBF]">{g.category} • Target: {g.targetYear}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-space text-[#343C6A] block">{formatINR(g.targetAmount)}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">{g.probabilityPercent}% Monte Carlo</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
          <h3 className="text-base font-bold font-space text-[#343C6A]">
            Insurance Protection Audit ({clientInsurance.length})
          </h3>
          {clientInsurance.length === 0 ? (
            <p className="text-xs text-[#718EBF] italic">No insurance policies audited.</p>
          ) : (
            <div className="space-y-3">
              {clientInsurance.map((ins) => (
                <div key={ins.id} className="p-3.5 bg-[#F5F7FA] rounded-xl border border-[#DFEAF2] flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#343C6A] block">{ins.title}</span>
                    <span className="text-[10px] text-[#718EBF]">{ins.provider}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 block">{ins.status}</span>
                    <span className="text-[10px] text-[#718EBF]">Cover: {ins.sumAssured}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Advisor Fiduciary Notes Editor */}
      <div className="bg-white rounded-[25px] p-6 border border-[#DFEAF2] shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold font-space text-[#343C6A]">
              Advisor Fiduciary Observations & Action Mandate
            </h3>
            <p className="text-xs text-[#718EBF]">
              Confidential compliance notes recorded under SEBI Regulation 17 audit requirements.
            </p>
          </div>
          {savedNotes && (
            <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
              <CheckCircle size={16} weight="fill" />
              <span>Notes Saved!</span>
            </span>
          )}
        </div>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Record suitability notes, regular mutual fund transition steps, or tax-loss harvesting observations..."
          className="w-full p-4 bg-[#F5F7FA] border border-[#DFEAF2] rounded-xl text-xs text-[#343C6A] focus:outline-none focus:border-[#1814F3]"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSaveNotes}
            className="px-5 py-2.5 bg-[#343C6A] text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
          >
            Save Compliance Notes
          </button>
        </div>
      </div>
    </div>
  );
}
