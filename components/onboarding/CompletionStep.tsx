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
  Sparkles,
  MessageSquare,
  Lock,
  Building2,
  UserCheck,
} from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

export default function CompletionStep() {
  const { rpq, agreement, payment } = useOnboarding();

  const [selectedDate, setSelectedDate] = useState("2026-10-16");
  const [selectedTime, setSelectedTime] = useState("11:00 AM IST");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Dossier Header Tab */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1.5 rounded-t-xl text-[11px] font-space font-bold uppercase tracking-wider -mb-px shadow-xs">
          <span>📁 MANDATE DOSSIER // ONBOARDING COMPLETE</span>
          <span className="text-[9px] bg-emerald-200 px-1.5 py-0.5 rounded font-mono">SEBI ACTIVATED</span>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-[10px] font-space text-slate-500 uppercase tracking-widest">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>PORTFOLIO MANDATE LIVE</span>
        </div>
      </div>

      {/* Institutional Activation Card */}
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 shadow-2xl relative overflow-hidden text-slate-800 space-y-8">
        {/* Subtle radial ambient aura */}
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-48 h-48 bg-gradient-to-br from-emerald-400/15 via-teal-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full border-2 border-amber-300/80 overflow-hidden shadow-md shrink-0 bg-white p-0.5">
              <Image
                src="/images/fiduciary-seal.jpg"
                alt="Institutional Seal"
                width={70}
                height={70}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-emerald-700 uppercase tracking-wider font-space font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Statutory Clearance Finalized
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-jakarta font-extrabold tracking-tight text-slate-950 mt-0.5">
                Welcome to Aurum Fiduciary Advisory
              </h1>
              <p className="text-xs text-slate-500 font-space mt-1">
                SEBI Registered Investment Adviser • Registration No. INA000019842
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left sm:text-right shrink-0">
            <span className="text-[10px] uppercase font-space font-bold text-slate-400 block tracking-wider">
              Permanent Client Mandate ID
            </span>
            <span className="text-base text-slate-950 font-bold font-mono block mt-0.5">
              {agreement.clientId || "AURUM-HNI-2024-8891"}
            </span>
            <span className="text-[10px] text-emerald-700 font-space font-semibold block mt-0.5">
              STATUS: ACTIVE & VERIFIED ✓
            </span>
          </div>
        </div>

        {/* Governance Triad Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Principal Officer with portrait thumbnail */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-full overflow-hidden border border-slate-300 shrink-0 shadow-2xs">
                <Image
                  src="/images/principal-officer.jpg"
                  alt="Rajesh V. Mehta"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] text-rose-600 uppercase font-space font-bold block">
                  Principal Officer
                </span>
                <span className="text-slate-950 font-jakarta font-bold text-sm">Rajesh V. Mehta</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-space leading-relaxed">
              Senior Managing Partner & SEBI Registered Principal Officer (NISM-Series-X-A/B Certified).
            </p>
          </div>

          {/* Compliance Officer */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-700 uppercase font-space font-bold block">
                  Compliance Officer
                </span>
                <span className="text-slate-950 font-jakarta font-bold text-sm">Neha Singhal</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-space leading-relaxed">
              Responsible for supervisory statutory audits, conflict checks, and BASL/SEBI reporting.
            </p>
          </div>

          {/* Fiduciary Mandate */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-full bg-cyan-100 flex items-center justify-center shrink-0 border border-cyan-200">
                <Scale className="h-5 w-5 text-cyan-700" />
              </div>
              <div>
                <span className="text-[10px] text-cyan-700 uppercase font-space font-bold block">
                  Fiduciary Risk Mandate
                </span>
                <span className="text-slate-950 font-jakarta font-bold text-sm">
                  {rpq?.riskProfile || "Balanced Strategic Growth"}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-space leading-relaxed">
              Calibrated to protect capital, eliminate commission drag, and optimize tax efficiency.
            </p>
          </div>
        </div>

        {/* Executed Documents & Escrow Receipts Strip */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 sm:p-8 space-y-4 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <h3 className="text-sm font-jakarta font-bold text-white flex items-center space-x-2">
              <FileText className="h-4 w-4 text-cyan-400" />
              <span>Statutory Compliance Documentation Vault</span>
            </h3>
            <span className="text-[10px] font-space text-slate-400 uppercase tracking-wider">
              SEBI 5-Year Regulatory Archive Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-jakarta font-bold text-white block">
                  Executed SEBI Advisory Indenture
                </span>
                <span className="text-[11px] text-slate-400 font-space font-mono block">
                  Ref: {agreement.clientId || "AURUM-HNI-2024-8891"} • Digitally Sealed
                </span>
              </div>
              <a
                href={agreement.downloadUrl || "/api/agreement/download"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-3.5 py-2 rounded-full bg-white text-slate-950 font-space text-xs font-semibold hover:bg-slate-100 transition-colors shadow-xs"
              >
                <Download className="h-3.5 w-3.5 mr-1.5 text-slate-700" />
                <span>PDF</span>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-jakarta font-bold text-white block">
                  CeFCoM Escrow Settlement Receipt
                </span>
                <span className="text-[11px] text-slate-400 font-space font-mono block">
                  URN: {payment.cefcomUrn || "BSE-URN-2024-8849201"} • BSE Verified
                </span>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/60 font-space text-xs font-bold">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                <span>Settled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fiduciary Strategy Consultation Booking */}
        <div className="rounded-2xl bg-slate-50/90 border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-rose-600 uppercase font-space font-bold tracking-wider">
                <Calendar className="h-4 w-4 text-rose-600" />
                <span>Executive Strategy Consultation</span>
              </div>
              <h3 className="text-xl font-jakarta font-extrabold tracking-tight text-slate-950 mt-1">
                Schedule Your 90-Minute Portfolio Architecture Session
              </h3>
            </div>
            <span className="text-xs font-space font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto shadow-2xs">
              Included in Retainer
            </span>
          </div>

          {bookingConfirmed ? (
            <div className="p-8 rounded-2xl bg-emerald-50/70 border-2 border-dashed border-emerald-300 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-jakarta font-extrabold text-slate-950">
                Consultation Confirmed with Principal Officer
              </h4>
              <p className="text-xs text-slate-600 font-space max-w-lg mx-auto leading-relaxed">
                Scheduled for <strong className="text-slate-950">{selectedDate}</strong> at{" "}
                <strong className="text-slate-950">{selectedTime}</strong>. A calendar invite with secure boardroom link and pre-meeting dossier has been dispatched to{" "}
                <span className="text-slate-950 font-semibold font-mono">{rpq?.email || "your registered email"}</span>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Boardroom Preview Thumbnail */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-900 shadow-sm">
                <Image
                  src="/images/boardroom.jpg"
                  alt="Nariman Point Boardroom"
                  width={400}
                  height={260}
                  className="w-full h-44 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] text-white font-space">
                  <span className="font-bold text-cyan-300 block uppercase text-[10px]">Venue / Link:</span>
                  Nariman Point Private Chambers or Encrypted Boardroom Telepresence
                </div>
              </div>

              <form onSubmit={handleBooking} className="lg:col-span-7 space-y-4">
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Select your preferred date and time slot for a private consultation with Principal Officer Rajesh V. Mehta to formulate your bespoke strategic asset allocation and tax-optimized direct portfolio roadmap.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-xs font-space font-semibold text-slate-700 block">
                      Consultation Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      min="2026-10-02"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-space text-slate-950 focus:border-slate-900 focus:outline-none shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-space font-semibold text-slate-700 block">
                      Time Slot
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-space text-slate-950 focus:border-slate-900 focus:outline-none shadow-2xs"
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
                    className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white font-space font-semibold px-6 py-3.5 rounded-full text-xs shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center space-x-2 group"
                  >
                    <span>Confirm Consultation Booking</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Quick Concierge Pill Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center space-x-3 text-xs font-space">
            <span className="text-slate-400">Direct Concierge:</span>
            <a
              href="https://wa.me/919820019842?text=Hello%20Aurum%20Concierge,%20I%20have%20completed%20statutory%20onboarding."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1 text-emerald-700 font-semibold hover:underline"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp Priority Line</span>
            </a>
          </div>

          <Link
            href="/"
            className="inline-flex items-center text-xs font-space font-semibold text-slate-600 hover:text-slate-950 transition-colors"
          >
            <span>Return to Aurum Fiduciary Home</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
