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
  FileText,
  ArrowRight,
} from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

export default function CompletionStep() {
  const { rpq, agreement, payment } = useOnboarding();

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
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden text-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full border border-slate-200 overflow-hidden shadow-xs shrink-0 bg-white">
              <Image
                src="/images/fiduciary-seal.jpg"
                alt="Institutional Seal"
                width={70}
                height={70}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs text-emerald-700 uppercase tracking-wider block font-bold">
                Statutory Onboarding Complete
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome to Aurum Fiduciary Advisory
              </h1>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs uppercase font-semibold text-slate-500 block">
              Permanent Client Mandate ID
            </span>
            <span className="text-base text-slate-900 font-bold font-mono">
              {agreement.clientId || "AURUM-HNI-881920"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-slate-600">
          {/* Principal Officer with portrait thumbnail */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-full overflow-hidden border border-slate-300 shrink-0">
                <Image
                  src="/images/principal-officer.jpg"
                  alt="Rajesh V. Mehta"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] text-red-600 uppercase font-bold block">
                  Principal Officer
                </span>
                <span className="text-slate-900 font-bold text-xs">Rajesh V. Mehta</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Senior Managing Partner & SEBI Registered Principal Officer (NISM-Series-X-A/B Certified).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs">
              <ShieldCheck className="h-4 w-4" />
              <span>Statutory Compliance Officer</span>
            </div>
            <div className="text-slate-900 font-bold">Neha Singhal</div>
            <p className="text-[11px] text-slate-500">
              Responsible for supervisory audits, conflict checks, and SEBI regulatory reporting.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs">
              <Scale className="h-4 w-4 text-slate-700" />
              <span>Fiduciary Risk Mandate</span>
            </div>
            <div className="text-slate-900 font-bold">{rpq?.riskProfile || "Balanced Strategic Growth"}</div>
            <p className="text-[11px] text-slate-500">
              Calibrated to protect capital, eliminate commission drag, and optimize tax efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Executed Documents & Escrow Receipts Strip */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 text-slate-800 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <FileText className="h-5 w-5 text-slate-700" />
          <span>Statutory Onboarding Documentation</span>
        </h3>
        <p className="text-xs text-slate-500">
          All digital artifacts have been securely stored in compliance with SEBI five-year record-keeping regulations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-900 block">
                Executed SEBI Advisory Agreement
              </span>
              <span className="text-[11px] text-slate-500 font-mono block">
                Ref: {agreement.clientId || "AURUM-HNI-2024-8891"} • Digitally Sealed
              </span>
            </div>
            <a
              href={agreement.downloadUrl || "/api/agreement/download"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-100 shadow-xs"
            >
              <Download className="h-3.5 w-3.5 mr-1.5 text-slate-600" />
              <span>Download PDF</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-900 block">
                CeFCoM Fee Escrow Settlement Receipt
              </span>
              <span className="text-[11px] text-slate-500 font-mono block">
                URN: {payment.cefcomUrn || "BSE-URN-2024-8849201"} • BSE Verified
              </span>
            </div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
              <span>Settled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fiduciary Strategy Consultation Booking */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 overflow-hidden relative text-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-red-600 uppercase font-bold tracking-wider">
              <Calendar className="h-4 w-4 text-red-600" />
              <span>Initial Private Consultation</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Schedule Your 90-Minute Portfolio Architecture Session
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Included in Fiduciary Mandate
          </span>
        </div>

        {bookingConfirmed ? (
          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900">
              Consultation Confirmed with Principal Officer
            </h4>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              Scheduled for <strong className="text-slate-900">{selectedDate}</strong> at{" "}
              <strong className="text-slate-900">{selectedTime}</strong>. A calendar invite with secure boardroom link and meeting dossier has been dispatched to{" "}
              <span className="text-slate-900 font-semibold font-mono">{rpq?.email || "your email"}</span>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Boardroom Preview Thumbnail */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-50">
              <Image
                src="/images/boardroom.jpg"
                alt="Nariman Point Boardroom"
                width={400}
                height={260}
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 text-[11px] text-white">
                <span className="font-bold text-red-300 block">Venue / Video Link:</span>
                Nariman Point Private Chambers or Encrypted Boardroom Telepresence
              </div>
            </div>

            <form onSubmit={handleBooking} className="lg:col-span-7 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Select your preferred date and time slot for a private consultation with Principal Officer Rajesh V. Mehta to formulate your bespoke strategic asset allocation and tax-optimized direct portfolio roadmap.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Consultation Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    min="2026-10-02"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Time Slot</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-red-500 focus:outline-none"
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
                  className="btn-primary-pill px-6 py-3 text-xs font-semibold flex items-center space-x-2 shadow-md group"
                >
                  <span>Confirm Consultation Booking</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
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
          className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <span>Return to Aurum Fiduciary Home</span>
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Link>
      </div>
    </div>
  );
}
