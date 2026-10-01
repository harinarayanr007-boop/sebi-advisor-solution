"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  Download,
  ShieldCheck,
  Scale,
  Award,
  Clock,
  UserCheck,
  FileText,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

export default function CompletionStep() {
  const { rpq, kyc, agreement, payment, resetOnboarding } = useOnboarding();

  const [selectedDate, setSelectedDate] = useState("2026-10-06");
  const [selectedTime, setSelectedTime] = useState("11:00 AM IST");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Institutional Activation Banner */}
      <div className="rounded-xl border border-emerald-500/50 bg-gradient-to-b from-emerald-950/30 to-[#090F1E] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block">
                Statutory Onboarding Complete
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-slate-100 font-normal">
                Welcome to Aurum Fiduciary Advisory
              </h1>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">
              Permanent Client Mandate ID
            </span>
            <span className="font-mono text-base text-[#DFC68E] font-bold">
              {agreement.clientId || "AURUM-HNI-881920"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-slate-300">
          <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-[#C5A059] font-medium text-xs">
              <UserCheck className="h-4 w-4" />
              <span>Assigned Principal Officer</span>
            </div>
            <div className="text-slate-100 font-medium">Rajesh V. Mehta</div>
            <p className="text-[11px] text-slate-400">
              Senior Managing Partner & SEBI Registered Principal Officer (NISM-Series-X-A/B Certified).
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-medium text-xs">
              <ShieldCheck className="h-4 w-4" />
              <span>Statutory Compliance Officer</span>
            </div>
            <div className="text-slate-100 font-medium">Neha Singhal</div>
            <p className="text-[11px] text-slate-400">
              Responsible for supervisory audits, conflict checks, and SEBI regulatory reporting.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-[#DFC68E] font-medium text-xs">
              <Scale className="h-4 w-4" />
              <span>Fiduciary Risk Mandate</span>
            </div>
            <div className="text-slate-100 font-medium">{rpq?.riskTier || "Balanced Strategic Growth"}</div>
            <p className="text-[11px] text-slate-400">
              Calibrated to protect capital, eliminate commission drag, and optimize tax efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Executed Documents & Escrow Receipts Strip */}
      <div className="rounded-xl border border-slate-800 bg-[#090F1E] p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-lg text-slate-100 flex items-center space-x-2">
          <FileText className="h-5 w-5 text-[#C5A059]" />
          <span>Statutory Onboarding Documentation</span>
        </h3>
        <p className="text-xs text-slate-400">
          All digital artifacts have been securely stored in compliance with SEBI five-year record-keeping regulations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-200 block">
                Executed SEBI Advisory Agreement
              </span>
              <span className="text-[10px] text-slate-400 font-mono block">
                Ref: {agreement.clientId} • Digitally Sealed
              </span>
            </div>
            <a
              href={agreement.agreementPdfUrl || "/api/agreement/download?agreementId=AURUM-001"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded border border-[#C5A059] text-[11px] text-[#DFC68E] hover:bg-[#C5A059]/10"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              <span>Download PDF</span>
            </a>
          </div>

          <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-200 block">
                CeFCoM Fee Escrow Settlement Receipt
              </span>
              <span className="text-[10px] text-slate-400 font-mono block">
                URN: {payment.cefcomUrn || "URN-BASL-99821"} • BSE Verified
              </span>
            </div>
            <div className="inline-flex items-center px-3 py-1.5 rounded bg-emerald-950/40 border border-emerald-800/60 text-[11px] text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              <span>Settled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fiduciary Strategy Consultation Booking */}
      <div className="rounded-xl border border-[#C5A059]/40 bg-[#0A1226] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] text-[#C5A059] uppercase tracking-widest font-mono">
              <Calendar className="h-3.5 w-3.5" />
              <span>Initial Private Consultation</span>
            </div>
            <h3 className="font-serif text-xl text-slate-100 font-normal mt-1">
              Schedule Your 90-Minute Portfolio Architecture Session
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded border border-emerald-800/50">
            Included in Fiduciary Mandate
          </span>
        </div>

        {bookingConfirmed ? (
          <div className="p-6 rounded-lg bg-[#050B17] border border-emerald-500/40 text-center space-y-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
            <h4 className="font-serif text-lg text-slate-100">
              Consultation Confirmed with Principal Officer
            </h4>
            <p className="text-xs text-slate-300">
              Scheduled for <strong className="text-[#DFC68E]">{selectedDate}</strong> at{" "}
              <strong className="text-[#DFC68E]">{selectedTime}</strong>. A calendar invite with secure boardroom link and meeting dossier has been dispatched to{" "}
              <span className="text-slate-100 font-mono">{rpq?.email || "your email"}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Select your preferred date and time slot for a private consultation with Principal Officer Rajesh V. Mehta to formulate your bespoke strategic asset allocation and tax-optimized direct portfolio roadmap.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Consultation Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-10-02"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-2.5 text-xs text-slate-100 focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Time Slot</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-2.5 text-xs text-slate-100 focus:border-[#C5A059] focus:outline-none"
                >
                  <option value="10:00 AM IST">10:00 AM – 11:30 AM IST (Morning Session)</option>
                  <option value="11:00 AM IST">11:00 AM – 12:30 PM IST (Midday Session)</option>
                  <option value="03:00 PM IST">03:00 PM – 04:30 PM IST (Afternoon Session)</option>
                  <option value="05:00 PM IST">05:00 PM – 06:30 PM IST (Evening Session)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-bold uppercase tracking-wider hover:bg-[#DFC68E] transition-all shadow-md shadow-[#C5A059]/20"
              >
                <span>Confirm Consultation Booking</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Return to Dashboard / Overview Link */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-slate-400 hover:text-[#C5A059] transition-colors uppercase tracking-wider font-mono"
        >
          <span>Return to Aurum Fiduciary Home</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
        </Link>
      </div>
    </div>
  );
}
