"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { getAutomatedComplaintsData } from "@/lib/complaints";

export default function RegulatoryDisclosuresModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(7);
  const [complaintData, setComplaintData] = useState(() => getAutomatedComplaintsData().summary);

  useEffect(() => {
    const data = getAutomatedComplaintsData();
    setComplaintData(data.summary);

    // Only show if user hasn't dismissed it in this browser session
    const storageKey = `sebi_disclosure_seen_${data.summary.asOnDate.replace(/\s+/g, "_")}`;
    const alreadySeen = sessionStorage.getItem(storageKey);

    if (!alreadySeen) {
      // Small 1 second delay so the initial page paint feels natural
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Countdown timer to auto-close after 7 seconds
  useEffect(() => {
    if (!isOpen) return;

    if (countdown <= 0) {
      handleClose();
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, countdown]);

  const handleClose = () => {
    setIsOpen(false);
    if (complaintData?.asOnDate) {
      const storageKey = `sebi_disclosure_seen_${complaintData.asOnDate.replace(/\s+/g, "_")}`;
      sessionStorage.setItem(storageKey, "true");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-white rounded-md shadow-2xl max-w-[560px] w-full p-6 sm:p-8 flex flex-col items-center gap-5 border border-slate-200 z-10 text-center"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#1e90ff]">
                Regulatory Disclosures
              </h2>
              <p className="text-[12px] sm:text-[13px] text-[#030a03]/80 leading-relaxed max-w-[480px]">
                <strong>AURUM FIDUCIARY</strong> is a SEBI Registered Investment Advisor (INA000015678). SEBI requires RIAs to disclose complaint status on their homepage. Pursuant to the same, please note:
              </p>
            </div>

            {/* Statutory Table */}
            <div className="w-full border border-slate-200 rounded-sm overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[#030a03]">
                    <th className="py-2.5 px-4 font-bold text-left">
                      Complaint Status as on {complaintData.asOnDate}
                    </th>
                    <th className="py-2.5 px-4 font-bold text-center w-[160px]">
                      Number of complaints
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[#030a03]/80">
                  <tr>
                    <td className="py-2 px-4">At the beginning of month</td>
                    <td className="py-2 px-4 text-center font-semibold">{complaintData.beginningOfMonth}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Received during the month</td>
                    <td className="py-2 px-4 text-center font-semibold">{complaintData.receivedDuringMonth}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Resolved during the month</td>
                    <td className="py-2 px-4 text-center font-semibold">{complaintData.resolvedDuringMonth}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Pending at the ending of the month</td>
                    <td className="py-2 px-4 text-center font-semibold text-emerald-700">{complaintData.pendingAtEndOfMonth}</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-2 px-4 italic text-slate-500">Reason for pendency</td>
                    <td className="py-2 px-4 text-center text-slate-500">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer timer & button */}
            <div className="flex flex-col items-center gap-3 w-full">
              <span className="text-[11px] text-[#030a03]/60">
                This modal closes in {countdown} seconds
              </span>
              <button
                onClick={handleClose}
                className="bg-[#1e90ff] hover:bg-[#0077e6] text-white font-semibold text-xs tracking-wide uppercase px-8 py-2.5 rounded-sm transition-colors cursor-pointer shadow-sm"
              >
                CLOSE
              </button>
            </div>

            {/* Subtle link to full complaints report */}
            <div className="pt-1 border-t border-slate-100 w-full flex justify-between items-center text-[11px] text-[#030a03]/60">
              <Link href="/complaints-data" onClick={handleClose} className="hover:text-[#1e90ff] underline">
                View Full Annual &amp; Trend Disclosure &rarr;
              </Link>
              <Link href="/disclosures" onClick={handleClose} className="hover:text-[#1e90ff] underline">
                All Disclosures &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
