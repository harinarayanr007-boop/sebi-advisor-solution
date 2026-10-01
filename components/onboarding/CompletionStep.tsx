"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Building,
} from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

export default function CompletionStep() {
  const { rpq, kyc, agreement, payment } = useOnboarding();

  const [selectedDate, setSelectedDate] = useState("2026-10-06");
  const [selectedTime, setSelectedTime] = useState("11:00 AM IST");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Institutional Activation Banner */}
      <div className="architectural-panel p-8 sm:p-10 shadow-2xl relative overflow-hidden text-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full border-2 border-[#BE9A48] overflow-hidden shadow-lg shrink-0">
              <Image
                src="/images/fiduciary-seal.jpg"
                alt="Institutional Seal"
                width={70}
                height={70}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em] block font-bold">
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
            <span className="font-mono text-base text-[#D8BD80] font-bold">
              {agreement.clientId || "AURUM-HNI-881920"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-slate-300">
          {/* Principal Officer with portrait thumbnail */}
          <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-full overflow-hidden border border-[#BE9A48] shrink-0">
                <Image
                  src="/images/principal-officer.jpg"
                  alt="Rajesh V. Mehta"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] text-[#BE9A48] uppercase font-mono block">
                  Principal Officer
                </span>
                <span className="text-slate-100 font-medium text-xs font-serif">Rajesh V. Mehta</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Senior Managing Partner & SEBI Registered Principal Officer (NISM-Series-X-A/B Certified).
            </p>
          </div>

          <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-medium text-xs font-mono">
              <ShieldCheck className="h-4 w-4" />
              <span>Statutory Compliance Officer</span>
            </div>
            <div className="text-slate-100 font-medium font-serif">Neha Singhal</div>
            <p className="text-[11px] text-slate-400 font-mono">
              Responsible for supervisory audits, conflict checks, and SEBI regulatory reporting.
            </p>
          </div>

          <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-[#D8BD80] font-medium text-xs font-mono">
              <Scale className="h-4 w-4" />
              <span>Fiduciary Risk Mandate</span>
            </div>
            <div className="text-slate-100 font-medium font-serif">{rpq?.riskProfile || "Balanced Strategic Growth"}</div>
            <p className="text-[11px] text-slate-400 font-mono">
              Calibrated to protect capital, eliminate commission drag, and optimize tax efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Executed Documents & Escrow Receipts Strip */}
      <div className="architectural-panel p-6 sm:p-8 space-y-4 text-slate-100">
        <h3 className="font-serif text-lg text-slate-100 flex items-center space-x-2">
          <FileText className="h-5 w-5 text-[#BE9A48]" />
          <span>Statutory Onboarding Documentation</span>
        </h3>
        <p className="text-xs text-slate-400 font-mono">
          All digital artifacts have been securely stored in compliance with SEBI five-year record-keeping regulations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-200 block font-serif">
                Executed SEBI Advisory Agreement
              </span>
              <span className="text-[10px] text-slate-400 font-mono block">
                Ref: {agreement.clientId || "AURUM-HNI-2024-8891"} • Digitally Sealed
              </span>
            </div>
            <a
              href={agreement.downloadUrl || "/api/agreement/download"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-3.5 py-2 rounded-sm border border-[#BE9A48] text-xs text-[#D8BD80] hover:bg-[#142445] font-mono"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              <span>Download PDF</span>
            </a>
          </div>

          <div className="p-4 rounded-sm bg-[#040915] border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-200 block font-serif">
                CeFCoM Fee Escrow Settlement Receipt
              </span>
              <span className="text-[10px] text-slate-400 font-mono block">
                URN: {payment.cefcomUrn || "BSE-URN-2024-8849201"} • BSE Verified
              </span>
            </div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-sm bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              <span>Settled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fiduciary Strategy Consultation Booking */}
      <div className="architectural-panel p-6 sm:p-8 space-y-6 overflow-hidden relative text-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] text-[#D8BD80] uppercase tracking-[0.2em] font-mono">
              <Calendar className="h-3.5 w-3.5 text-[#BE9A48]" />
              <span>Initial Private Consultation</span>
            </div>
            <h3 className="font-serif text-xl text-slate-100 font-normal mt-1">
              Schedule Your 90-Minute Portfolio Architecture Session
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-sm border border-emerald-800/50">
            Included in Fiduciary Mandate
          </span>
        </div>

        {bookingConfirmed ? (
          <div className="p-6 rounded-sm bg-[#040915] border border-emerald-500/40 text-center space-y-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
            <h4 className="font-serif text-lg text-slate-100">
              Consultation Confirmed with Principal Officer
            </h4>
            <p className="text-xs text-slate-300">
              Scheduled for <strong className="text-[#D8BD80]">{selectedDate}</strong> at{" "}
              <strong className="text-[#D8BD80]">{selectedTime}</strong>. A calendar invite with secure boardroom link and meeting dossier has been dispatched to{" "}
              <span className="text-slate-100 font-mono">{rpq?.email || "your email"}</span>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Boardroom Preview Thumbnail */}
            <div className="lg:col-span-5 rounded-sm overflow-hidden border border-slate-800 relative bg-[#040915]">
              <Image
                src="/images/boardroom.jpg"
                alt="Nariman Point Boardroom"
                width={400}
                height={260}
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020611] to-transparent opacity-85" />
              <div className="absolute bottom-2 left-3 right-3 text-[10px] text-slate-300 font-mono">
                <span className="text-[#BE9A48] font-medium block">Venue / Video Link:</span>
                Nariman Point Private Chambers or Encrypted Boardroom Telepresence
              </div>
            </div>

            <form onSubmit={handleBooking} className="lg:col-span-7 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Select your preferred date and time slot for a private consultation with Principal Officer Rajesh V. Mehta to formulate your bespoke strategic asset allocation and tax-optimized direct portfolio roadmap.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Consultation Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    min="2026-10-02"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-sm border border-slate-800 bg-[#040915] px-3 py-2 text-xs text-slate-100 focus:border-[#BE9A48] focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Time Slot</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full rounded-sm border border-slate-800 bg-[#040915] px-3 py-2 text-xs text-slate-100 focus:border-[#BE9A48] focus:outline-none font-mono"
                  >
                    <option value="10:00 AM IST">10:00 AM – 11:30 AM IST (Morning Session)</option>
                    <option value="11:00 AM IST">11:00 AM – 12:30 PM IST (Midday Session)</option>
                    <option value="03:00 PM IST">03:00 PM – 04:30 PM IST (Afternoon Session)</option>
                    <option value="05:00 PM IST">05:00 PM – 06:30 PM IST (Evening Session)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="btn-gold-foil px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-bold flex items-center space-x-2"
                >
                  <span>Confirm Consultation Booking</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Return to Dashboard / Overview Link */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-slate-400 hover:text-[#D8BD80] transition-colors uppercase tracking-wider font-mono"
        >
          <span>Return to Aurum Fiduciary Home</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
        </Link>
      </div>
    </div>
  );
}
