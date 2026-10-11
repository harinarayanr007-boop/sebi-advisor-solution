"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import FigmaNavbar from "@/components/FigmaNavbar";
import FigmaFooter from "@/components/FigmaFooter";
import { getAutomatedComplaintsData } from "@/lib/complaints";

export default function ComplaintsDataPage() {
  const { summary, sources, monthlyTrend, annualTrend } = useMemo(
    () => getAutomatedComplaintsData(),
    []
  );

  return (
    <div className="flex flex-col items-start relative w-full bg-white text-[#030a03]">
      <FigmaNavbar />

      {/* Hero Block */}
      <section className="bg-white flex items-center justify-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[96px] w-full border-b border-[#030a03]/5">
        <div className="flex flex-col gap-6 items-start max-w-[1280px] w-full">
          <div className="flex items-center">
            <span className="font-semibold text-[16px] leading-[1.5] text-[#1e90ff]">
              SEBI RIA Compliance &bull; Circular Ref: SEBI/HO/IMD/IMD-II CIS/P/CIR/2021/0686
            </span>
          </div>
          <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.15] text-[#030a03] tracking-[-0.03em] max-w-[960px]">
            Investor Complaints Data
          </h1>
          <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80 max-w-[800px]">
            In compliance with SEBI regulations, client grievance metrics are updated on a monthly basis. Aurum Fiduciary Advisory maintains a 100% zero-unresolved complaints record.
          </p>
        </div>
      </section>

      {/* Table 1: Current Month Data */}
      <section className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-8 max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px]">
            <span className="font-semibold text-[16px] text-[#030a03]">Table 1 &bull; Monthly Disclosure</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] leading-[1.2] tracking-[-0.4px] text-[#030a03]">
              Data for the Month Ending {summary.reportingMonth}
            </h2>
          </div>

          <div className="overflow-x-auto w-full bg-white border border-[rgba(3,10,3,0.15)] rounded-sm shadow-sm">
            <table className="w-full text-left text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#e8f3ff] border-b border-[rgba(3,10,3,0.15)] text-[#030a03] font-semibold">
                  <th className="p-4">Sr. No.</th>
                  <th className="p-4">Received From</th>
                  <th className="p-4 text-center">Pending Last Month</th>
                  <th className="p-4 text-center">Received</th>
                  <th className="p-4 text-center">Resolved</th>
                  <th className="p-4 text-center">Total Pending</th>
                  <th className="p-4 text-center">Pending &gt; 3 Months</th>
                  <th className="p-4 text-center">Avg Resolution Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(3,10,3,0.08)]">
                {sources.map((row) => (
                  <tr key={row.sr} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono">{row.sr}</td>
                    <td className="p-4 font-medium text-[#030a03]">{row.source}</td>
                    <td className="p-4 text-center">{row.pendingLastMonth}</td>
                    <td className="p-4 text-center">{row.received}</td>
                    <td className="p-4 text-center">{row.resolved}</td>
                    <td className="p-4 text-center font-bold text-emerald-700">{row.totalPending}</td>
                    <td className="p-4 text-center">{row.pendingOver3m}</td>
                    <td className="p-4 text-center">{row.avgTimeDays}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-bold border-t-2 border-[rgba(3,10,3,0.15)]">
                  <td colSpan={2} className="p-4">Total / Cumulative</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center text-emerald-700">0</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center">0 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Table 2: Month-wise Trend */}
      <section className="bg-white flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-8 max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px]">
            <span className="font-semibold text-[16px] text-[#030a03]">Table 2 &bull; Trend Analysis</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] leading-[1.2] tracking-[-0.4px] text-[#030a03]">
              Trend of Monthly Disposal of Complaints (FY 2024-25)
            </h2>
          </div>

          <div className="overflow-x-auto w-full bg-white border border-[rgba(3,10,3,0.15)] rounded-sm shadow-sm">
            <table className="w-full text-left text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#e8f3ff] border-b border-[rgba(3,10,3,0.15)] text-[#030a03] font-semibold">
                  <th className="p-4">Month</th>
                  <th className="p-4 text-center">Carried Forward from Previous Month</th>
                  <th className="p-4 text-center">Received</th>
                  <th className="p-4 text-center">Resolved</th>
                  <th className="p-4 text-center">Pending at End of Month</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(3,10,3,0.08)]">
                {monthlyTrend.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-[#030a03]">{row.month}</td>
                    <td className="p-4 text-center">{row.carriedForward}</td>
                    <td className="p-4 text-center">{row.received}</td>
                    <td className="p-4 text-center">{row.resolved}</td>
                    <td className="p-4 text-center font-bold text-emerald-700">{row.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Table 3: Annual Trend */}
      <section className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-8 max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px]">
            <span className="font-semibold text-[16px] text-[#030a03]">Table 3 &bull; Historical Record</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] leading-[1.2] tracking-[-0.4px] text-[#030a03]">
              Trend of Annual Disposal of Complaints
            </h2>
          </div>

          <div className="overflow-x-auto w-full bg-white border border-[rgba(3,10,3,0.15)] rounded-sm shadow-sm">
            <table className="w-full text-left text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-white border-b border-[rgba(3,10,3,0.15)] text-[#030a03] font-semibold">
                  <th className="p-4">Financial Year</th>
                  <th className="p-4 text-center">Carried Forward from Previous Year</th>
                  <th className="p-4 text-center">Received during the Year</th>
                  <th className="p-4 text-center">Resolved during the Year</th>
                  <th className="p-4 text-center">Pending at End of Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(3,10,3,0.08)]">
                {annualTrend.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-[#030a03]">{row.year}</td>
                    <td className="p-4 text-center">{row.carriedForward}</td>
                    <td className="p-4 text-center">{row.received}</td>
                    <td className="p-4 text-center">{row.resolved}</td>
                    <td className="p-4 text-center font-bold text-emerald-700">{row.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="bg-white flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[96px] w-full border-t border-[rgba(3,10,3,0.08)]">
        <div className="relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8 max-w-[1280px] w-full text-white p-8 sm:p-12 lg:p-[56px] rounded-2xl shadow-xl border border-[rgba(3,10,3,0.15)]">
          {/* Background image from home page */}
          <img
            src="/figma/cta-image.png"
            alt="Fiduciary financial mandate"
            className="absolute inset-0 size-full object-cover object-center pointer-events-none select-none"
          />
          {/* Subtle directional gradient: dark on left for text readability, clear on right to showcase the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030a03]/95 via-[#030a03]/55 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-3 max-w-[700px]">
            <span className="font-semibold text-[14px] sm:text-[16px] text-[#1e90ff]">Statutory Accountability</span>
            <h2 className="font-bold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.2] text-white tracking-[-0.3px]">
              Zero Complaints. 100% Conflict-Free.
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-white/85">
              Work with a fiduciary whose incentives are 100% aligned with your family&apos;s compound longevity.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <Link
              href="/book"
              className="bg-[#1e90ff] hover:bg-[#0077e6] text-white px-8 py-3.5 font-medium text-[16px] text-center rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <img src="/figma/call-white.svg" alt="" className="size-4 shrink-0" />
              <span>Book Discovery Call</span>
            </Link>
          </div>
        </div>
      </section>

      <FigmaFooter />
    </div>
  );
}
