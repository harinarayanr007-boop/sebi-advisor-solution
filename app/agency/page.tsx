"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  TrendingUp,
  FileText,
  Calculator,
  Phone,
  MessageCircle,
  ExternalLink,
  Lock,
  Scale,
  Building2,
  Layers,
  Zap,
  Check,
  ChevronRight,
  Sparkles,
  Users,
  Eye,
  X,
  Menu,
  Copy,
} from "lucide-react";

export default function AgencyTemplatePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModalCase, setActiveModalCase] = useState<string | null>(null);

  // Interactive Pre-Qualifier Simulator State
  const [netWorthCr, setNetWorthCr] = useState<number>(3.5);
  const [selectedService, setSelectedService] = useState<string>("fee-only-audit");
  const [hasExistingDemat, setHasExistingDemat] = useState<boolean>(true);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);

  // Dynamic calculations for the simulator
  const simResults = useMemo(() => {
    const nw = Number(netWorthCr);
    let tier = "Mass Affluent Fiduciary Track";
    let priority = "High Priority Review";
    let estFeeDragSaved = Math.round(nw * 10000000 * 0.0125); // 1.25% commission leakage saved
    let suggestedRiskProfile = "Balanced Growth (60:40 Equity to Debt)";
    let deskTurnaround = "48 Hours";

    if (nw < 1.0) {
      tier = "Emerging Wealth Fiduciary Track";
      suggestedRiskProfile = "Capital Accumulation (70:30 Equity to Debt)";
      deskTurnaround = "24 Hours";
    } else if (nw >= 5.0 && nw < 15.0) {
      tier = "High-Net-Worth Sovereign Desk";
      priority = "Institutional VIP Routing";
      suggestedRiskProfile = "Multi-Asset Endowment Model (Global + Real Assets)";
      deskTurnaround = "Same-Day Priority";
    } else if (nw >= 15.0) {
      tier = "Ultra-HNI Family Office Mandate";
      priority = "Direct Senior Partner Onboarding";
      suggestedRiskProfile = "Private Credit, Sovereign Bonds & AIF Category II/III";
      deskTurnaround = "Immediate VIP Access";
    }

    return {
      tier,
      priority,
      estFeeDragSaved: (estFeeDragSaved / 100000).toFixed(1) + " Lakhs",
      suggestedRiskProfile,
      deskTurnaround,
      formattedNW: nw >= 1 ? `₹${nw.toFixed(1)} Cr` : `₹${Math.round(nw * 100)} Lakhs`,
    };
  }, [netWorthCr, selectedService, hasExistingDemat]);

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText("+919345619420");
    setIsCopiedPhone(true);
    setTimeout(() => setIsCopiedPhone(false), 2500);
  };

  const openWhatsAppAudit = () => {
    const text = encodeURIComponent(
      `Hi Hari, I am an RIA / wealth manager reviewing your agency portal. I want to schedule a 15-minute digital desk audit for our firm.`
    );
    window.open(`https://wa.me/919345619420?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1E1E1E] font-sans antialiased selection:bg-[#0038C8] selection:text-white">
      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <div className="bg-[#001B66] text-white text-[12px] sm:text-[13px] font-mono tracking-tight py-2.5 px-4 border-b border-[#0038C8]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">STATUS:</span>
            <span className="hidden sm:inline text-white/90">
              ACCEPTING FAST-ACTION 72-HOUR DESK PILOTS
            </span>
            <span className="sm:hidden text-white/90">72-HR PILOTS ACTIVE</span>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <span className="hidden md:inline font-mono">SEBI (IA) 2013 PROTOCOLS</span>
            <span className="text-white/40">/</span>
            <button
              onClick={openWhatsAppAudit}
              className="hover:text-white underline font-semibold transition-colors flex items-center gap-1"
            >
              <span>Audit Your Practice</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MINIMALIST EDITORIAL NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#1E1E1E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Mark */}
          <Link href="/agency" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#0038C8] text-white flex items-center justify-center font-black text-xl tracking-tighter shadow-[3px_3px_0px_#1E1E1E] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#1E1E1E] transition-all">
              AS
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight leading-none text-[#1E1E1E]">
                ADVISOR SOLUTION
              </span>
              <span className="text-[11px] font-mono text-[#0038C8] font-bold tracking-wider uppercase mt-1">
                FINTECH ONBOARDING LAB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-[#1E1E1E]/80">
            <a href="#work" className="hover:text-[#0038C8] transition-colors">
              Selected Work
            </a>
            <a href="#capabilities" className="hover:text-[#0038C8] transition-colors">
              Capabilities
            </a>
            <a href="#simulator" className="hover:text-[#0038C8] transition-colors">
              Live Intake Dial
            </a>
            <a href="#ledger" className="hover:text-[#0038C8] transition-colors">
              Comparison Ledger
            </a>
            <a href="#pricing" className="hover:text-[#0038C8] transition-colors">
              Pilots & Pricing
            </a>
          </nav>

          {/* Direct CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+919345619420"
              className="text-[13px] font-mono text-[#1E1E1E]/70 hover:text-[#0038C8] transition-colors px-3 py-2 border border-[#1E1E1E]/15 rounded-md"
            >
              +91 93456 19420
            </a>
            <button
              onClick={openWhatsAppAudit}
              className="px-5 py-2.5 bg-[#0038C8] text-white text-[13px] font-bold tracking-wide rounded-md border-[1.5px] border-[#1E1E1E] shadow-[3px_3px_0px_#1E1E1E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#1E1E1E] transition-all flex items-center gap-2"
            >
              <span>Book 15-Min Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md border border-[#1E1E1E]/20 text-[#1E1E1E]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#1E1E1E]/10 px-6 py-6 flex flex-col gap-4 text-base font-medium">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1E1E1E] hover:text-[#0038C8]"
            >
              Selected Work
            </a>
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1E1E1E] hover:text-[#0038C8]"
            >
              Capabilities
            </a>
            <a
              href="#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1E1E1E] hover:text-[#0038C8]"
            >
              Live Intake Dial
            </a>
            <a
              href="#ledger"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1E1E1E] hover:text-[#0038C8]"
            >
              Comparison Ledger
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1E1E1E] hover:text-[#0038C8]"
            >
              Pilots & Pricing
            </a>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <button
                onClick={openWhatsAppAudit}
                className="w-full py-3 bg-[#0038C8] text-white font-bold rounded-md text-center shadow-[3px_3px_0px_#1E1E1E] border-[1.5px] border-[#1E1E1E]"
              >
                Book 15-Min Audit
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION (Webflow 2023 Kinetic High-Impact Style) */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-[#1E1E1E]/10 bg-[#FAFAFA]">
        {/* Subtle geometric background grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#1E1E1E 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Eyebrow Micro-Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[11px] sm:text-[12px] bg-[#EEF4FF] text-[#0038C8] font-bold px-3 py-1 rounded border border-[#0038C8]/20 tracking-wider uppercase">
              [01] // INSTITUTIONAL FINTECH ARCHITECTURE
            </span>
            <span className="font-mono text-[11px] sm:text-[12px] text-gray-500">
              CHENNAI / BANGALORE / DELHI NCR
            </span>
          </div>

          {/* Massive Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1E1E1E] leading-[1.08] max-w-5xl">
            We engineer <span className="text-[#0038C8]">sovereign client desks</span> & intake
            portals for SEBI RIAs and wealth managers.
          </h1>

          {/* Sharp Value Subtitle */}
          <p className="mt-8 text-lg sm:text-xl text-[#1E1E1E]/80 max-w-3xl leading-relaxed font-normal">
            Eliminating 14-page physical PDF friction, informal WhatsApp leakage, and generic GoDaddy
            websites. We transform your advisory practice into an institutional digital desk that
            pre-qualifies liquid net worth and compliance readiness in under 60 seconds.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={openWhatsAppAudit}
              className="px-8 py-4 bg-[#0038C8] text-white text-[15px] font-bold tracking-wide rounded-lg border-[1.5px] border-[#1E1E1E] shadow-[4px_4px_0px_#1E1E1E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#1E1E1E] transition-all flex items-center gap-3 cursor-pointer"
            >
              <span>Schedule Practice Audit</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#work"
              className="px-8 py-4 bg-white text-[#1E1E1E] text-[15px] font-bold tracking-wide rounded-lg border-[1.5px] border-[#1E1E1E] shadow-[4px_4px_0px_#1E1E1E]/20 hover:bg-[#F8F9FA] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span>Inspect Case Studies</span>
              <ChevronRight className="w-4 h-4 text-[#0038C8]" />
            </a>
          </div>

          {/* Compliance & Verification Badges */}
          <div className="mt-12 pt-8 border-t border-[#1E1E1E]/10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0038C8] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-[#1E1E1E]/80">
                SEBI (IA) 2013 Compliant
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#0038C8] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-[#1E1E1E]/80">
                72-Hour Rapid Deployment
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#0038C8] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-[#1E1E1E]/80">
                Zero Data Residency Leakage
              </span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[#0038C8] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-[#1E1E1E]/80">
                ₹10 Cr+ HNI Qualification
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PERFORMANCE TELEMETRY STRIP */}
      <section className="bg-[#001B66] text-white py-10 border-b border-[#0038C8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-l-2 border-[#0038C8] pl-5">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                ₹90 Cr+
              </div>
              <div className="text-xs sm:text-sm text-white/70 font-sans mt-1">
                Combined Pipeline Screened
              </div>
            </div>

            <div className="border-l-2 border-[#0038C8] pl-5">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                60 Sec
              </div>
              <div className="text-xs sm:text-sm text-white/70 font-sans mt-1">
                Average Pre-Qualification Speed
              </div>
            </div>

            <div className="border-l-2 border-[#0038C8] pl-5">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                72 Hours
              </div>
              <div className="text-xs sm:text-sm text-white/70 font-sans mt-1">
                Contract to Production Launch
              </div>
            </div>

            <div className="border-l-2 border-[#0038C8] pl-5">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                4.2x
              </div>
              <div className="text-xs sm:text-sm text-white/70 font-sans mt-1">
                Average Lift in HNI Bookings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELECTED WORK & CASE STUDIES (Core Showcase) */}
      <section id="work" className="py-24 bg-white border-b border-[#1E1E1E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="font-mono text-xs text-[#0038C8] font-bold uppercase tracking-wider mb-2">
                [02] // PROVEN CLIENT DESKS & ARCHITECTURE
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1E1E] tracking-tight">
                Selected Work & Production Deployments
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-md">
              Each engagement delivers a custom digital desk built on Next.js, tailored to your
              specific fiduciary mandate, client intake rubric, and regulatory disclosures.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* CASE 01: Aurum Fiduciary Wealth Desk */}
            <div className="group bg-white rounded-xl border-[1.5px] border-[#1E1E1E] shadow-[5px_5px_0px_#0038C8] p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#EEF4FF] text-[#0038C8] rounded border border-[#0038C8]/20">
                    SEBI RIA CLIENT PORTAL
                  </span>
                  <span className="text-xs font-mono text-gray-500">₹40 Cr+ AUM PRACTICE</span>
                </div>

                <h3 className="text-2xl font-bold text-[#1E1E1E] group-hover:text-[#0038C8] transition-colors">
                  Aurum Fiduciary Wealth Desk
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  Full Next.js sovereign client portal, automated risk profiler, and fee-drag
                  audit ledger.
                </p>

                {/* Problem vs Engineered Solution */}
                <div className="mt-6 space-y-3 bg-[#F8F9FA] p-4 rounded-lg border border-gray-200 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-red-600 uppercase font-mono text-[11px]">
                      The Friction:
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      Prospective clients were handed a 14-page physical PDF risk questionnaire,
                      leading to 68% drop-off before initial consultations.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="font-bold text-emerald-700 uppercase font-mono text-[11px]">
                      The Engineering:
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      Interactive 60-second risk profiling dial, automated fee-drag calculation vs
                      regular mutual fund commissions, and instant SEBI compliance disclosure logs.
                    </p>
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#001B66] text-white text-xs font-mono font-bold rounded">
                    +4.2x Qualified Bookings
                  </span>
                  <span className="px-3 py-1 bg-[#EEF4FF] text-[#0038C8] text-xs font-mono font-semibold rounded">
                    100% Elimination of Physical PDFs
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/"
                  className="text-xs sm:text-sm font-bold text-[#0038C8] hover:underline flex items-center gap-1.5"
                >
                  <span>Inspect Live Aurum Desk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setActiveModalCase("aurum")}
                  className="text-xs font-mono text-gray-600 hover:text-[#1E1E1E] flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Full Architecture</span>
                </button>
              </div>
            </div>

            {/* CASE 02: Echvee Finserv Intake Architecture */}
            <div className="group bg-white rounded-xl border-[1.5px] border-[#1E1E1E] shadow-[5px_5px_0px_#0038C8] p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#EEF4FF] text-[#0038C8] rounded border border-[#0038C8]/20">
                    DELHI NCR ADVISORY REBRAND
                  </span>
                  <span className="text-xs font-mono text-gray-500">VASANT KUNJ, DELHI</span>
                </div>

                <h3 className="text-2xl font-bold text-[#1E1E1E] group-hover:text-[#0038C8] transition-colors">
                  Echvee Finserv Intake Architecture
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  Modern institutional web portal replacing an unverified GoDaddy page with direct
                  HNI net-worth screening.
                </p>

                {/* Problem vs Engineered Solution */}
                <div className="mt-6 space-y-3 bg-[#F8F9FA] p-4 rounded-lg border border-gray-200 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-red-600 uppercase font-mono text-[11px]">
                      The Friction:
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      Senior wealth advisor operating with an outdated GoDaddy site lacking SSL
                      hardening, causing HNI investors to question institutional credibility.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="font-bold text-emerald-700 uppercase font-mono text-[11px]">
                      The Engineering:
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      High-trust portal with automated liquid net-worth pre-qualifier, WhatsApp
                      notification routing, and certified SEBI Investor Charter disclosures.
                    </p>
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#001B66] text-white text-xs font-mono font-bold rounded">
                    72-Hour Turnaround
                  </span>
                  <span className="px-3 py-1 bg-[#EEF4FF] text-[#0038C8] text-xs font-mono font-semibold rounded">
                    100% Institutional Rebrand
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={openWhatsAppAudit}
                  className="text-xs sm:text-sm font-bold text-[#0038C8] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Request Custom Rebrand Deck</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModalCase("echvee")}
                  className="text-xs font-mono text-gray-600 hover:text-[#1E1E1E] flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Case Metrics</span>
                </button>
              </div>
            </div>

            {/* CASE 03: CVR Loans Syndication Desk */}
            <div className="group bg-white rounded-xl border-[1.5px] border-[#1E1E1E] shadow-[5px_5px_0px_#0038C8] p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#EEF4FF] text-[#0038C8] rounded border border-[#0038C8]/20">
                    COMMERCIAL DEBT SYNDICATION
                  </span>
                  <span className="text-xs font-mono text-gray-500">₹5 CR TO ₹50 CR TICKETS</span>
                </div>

                <h3 className="text-2xl font-bold text-[#1E1E1E] group-hover:text-[#0038C8] transition-colors">
                  CVR Loans Commercial Syndication Desk
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  High-ticket loan qualification engine filtering out non-creditworthy retail
                  borrowers automatically.
                </p>

                {/* Problem vs Engineered Solution */}
                <div className="mt-6 space-y-3 bg-[#F8F9FA] p-4 rounded-lg border border-gray-200 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-red-600 uppercase font-mono text-[11px]">
                      The Friction:
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      Loan syndicators were overwhelmed with unqualified retail borrower calls,
                      missing DSCR numbers, and unverified collateral pledges.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="font-bold text-emerald-700 uppercase font-mono text-[11px]">
                      The Engineering:
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      Automated 3-step commercial credit screening desk requiring audited turnover,
                      EBITDA margins, and loan facility selection prior to booking call.
                    </p>
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#001B66] text-white text-xs font-mono font-bold rounded">
                    85% Drop in Junk Inquiries
                  </span>
                  <span className="px-3 py-1 bg-[#EEF4FF] text-[#0038C8] text-xs font-mono font-semibold rounded">
                    Lender-Ready Borrower Packets
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={openWhatsAppAudit}
                  className="text-xs sm:text-sm font-bold text-[#0038C8] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Build Debt Syndication Desk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModalCase("cvr")}
                  className="text-xs font-mono text-gray-600 hover:text-[#1E1E1E] flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View System Architecture</span>
                </button>
              </div>
            </div>

            {/* CASE 04: Fiduciary Authority & Thought Leadership Engine */}
            <div className="group bg-white rounded-xl border-[1.5px] border-[#1E1E1E] shadow-[5px_5px_0px_#0038C8] p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#EEF4FF] text-[#0038C8] rounded border border-[#0038C8]/20">
                    LINKEDIN INBOUND ENGINE
                  </span>
                  <span className="text-xs font-mono text-gray-500">HNI AUDIENCE CAPTURE</span>
                </div>

                <h3 className="text-2xl font-bold text-[#1E1E1E] group-hover:text-[#0038C8] transition-colors">
                  Fiduciary LinkedIn Authority Engine
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  High-converting editorial carousels and commentary desks educating HNIs on
                  fee-only advisory superiority.
                </p>

                {/* Problem vs Engineered Solution */}
                <div className="mt-6 space-y-3 bg-[#F8F9FA] p-4 rounded-lg border border-gray-200 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-red-600 uppercase font-mono text-[11px]">
                      The Friction:
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      Advisors posting generic AI-generated motivational posts that generate zero
                      inbound client conversations or qualified portfolio inquiries.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="font-bold text-emerald-700 uppercase font-mono text-[11px]">
                      The Engineering:
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      Data-driven 4:5 editorial carousels exposing fee drag, commission leakage, and
                      fiduciary standards, driving prospects to the sovereign intake desk.
                    </p>
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#001B66] text-white text-xs font-mono font-bold rounded">
                    40+ Direct HNI Inbounds
                  </span>
                  <span className="px-3 py-1 bg-[#EEF4FF] text-[#0038C8] text-xs font-mono font-semibold rounded">
                    Zero Fluff Fiduciary Education
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/comment-generator"
                  className="text-xs sm:text-sm font-bold text-[#0038C8] hover:underline flex items-center gap-1.5"
                >
                  <span>Open Comment Desk Engine</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={openWhatsAppAudit}
                  className="text-xs font-mono text-gray-600 hover:text-[#1E1E1E] flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Request Inbound Playbook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE PRE-QUALIFICATION SIMULATOR (Proof of Competence) */}
      <section
        id="simulator"
        className="py-24 bg-[#F8F9FA] border-b border-[#1E1E1E]/10 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#0038C8] font-bold uppercase tracking-wider px-3 py-1 bg-white border border-[#0038C8]/20 rounded">
              [03] // LIVE DIGITAL DESK DEMONSTRATOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1E1E] tracking-tight mt-4">
              Test The Client Qualification Engine
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Drag the net-worth dial below to experience how your prospective HNI clients are
              screened, scored, and routed before they ever take up your calendar time.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl border-[1.5px] border-[#1E1E1E] shadow-[8px_8px_0px_#0038C8] p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Controls Column */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-[#1E1E1E] uppercase font-mono tracking-wider">
                      Client Liquid Net Worth:
                    </label>
                    <span className="text-xl font-extrabold text-[#0038C8] font-mono">
                      {simResults.formattedNW}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.25"
                    max="25.0"
                    step="0.25"
                    value={netWorthCr}
                    onChange={(e) => setNetWorthCr(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0038C8]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mt-1">
                    <span>₹25 Lakhs</span>
                    <span>₹10 Crores</span>
                    <span>₹25+ Crores</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E1E1E] uppercase font-mono tracking-wider block mb-2">
                    Primary Fiduciary Need:
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white font-medium text-sm focus:border-[#0038C8] focus:ring-1 focus:ring-[#0038C8] outline-none"
                  >
                    <option value="fee-only-audit">Fee-Only Comprehensive Portfolio Audit</option>
                    <option value="pms-aif-diligence">PMS / AIF Category II/III Due Diligence</option>
                    <option value="commercial-debt">Commercial Loan & Debt Syndication (₹5 Cr+)</option>
                    <option value="family-office">Family Office Structuring & Estate Transition</option>
                  </select>
                </div>

                <div className="p-4 bg-[#EEF4FF] rounded-lg border border-[#0038C8]/20 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#001B66]">Existing Portfolio Demat Ready?</div>
                    <div className="text-[11px] text-[#0038C8]/80">Accelerates verification into 24-hr queue</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasExistingDemat}
                    onChange={(e) => setHasExistingDemat(e.target.checked)}
                    className="w-5 h-5 accent-[#0038C8] cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Output Column */}
              <div className="bg-[#001B66] text-white rounded-xl p-6 flex flex-col justify-between border border-[#0038C8]/40">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                      Desk Qualification Score
                    </span>
                    <span className="text-[11px] font-mono text-white/60">
                      {simResults.priority}
                    </span>
                  </div>

                  <div className="text-xs uppercase font-mono text-white/70">Assigned Client Tier:</div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    {simResults.tier}
                  </div>

                  <div className="mt-5 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="text-white/70">Commission Fee Drag Eliminated:</span>
                      <span className="font-mono font-bold text-emerald-300">
                        {simResults.estFeeDragSaved} / yr
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="text-white/70">Suggested Asset Allocation:</span>
                      <span className="font-semibold text-white/90 text-right max-w-[200px]">
                        {simResults.suggestedRiskProfile}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5">
                      <span className="text-white/70">Calendar SLA Response:</span>
                      <span className="font-mono font-bold text-white">
                        {simResults.deskTurnaround}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={openWhatsAppAudit}
                    className="w-full py-3 bg-[#0038C8] hover:bg-[#0038C8]/90 text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-white/20 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Deploy This Intake Desk for Your Practice</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CAPABILITIES & ARCHITECTURE MATRIX */}
      <section id="capabilities" className="py-24 bg-white border-b border-[#1E1E1E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs text-[#0038C8] font-bold uppercase tracking-wider">
              [04] // THE PRODUCTION STACK
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1E1E] tracking-tight mt-2">
              Capabilities Engineered for High-Trust Wealth Practices
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              We do not build generic WordPress brochure sites. Every system is engineered as an
              institutional asset built on Next.js 15, sovereign code ownership, and SEBI compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Capability 1 */}
            <div className="p-6 bg-[#FAFAFA] rounded-xl border-[1.5px] border-[#1E1E1E] hover:border-[#0038C8] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] text-[#0038C8] flex items-center justify-center mb-4 border border-[#0038C8]/20">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E1E1E]">
                  Sovereign Client Portals
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Fast, custom-coded client portal with automated risk assessment, fee-drag
                  calculators, and client dossier downloads. No vendor lock-in.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs font-mono text-[#0038C8] font-bold">
                NEXT.JS 15 + TAILWIND
              </div>
            </div>

            {/* Capability 2 */}
            <div className="p-6 bg-[#FAFAFA] rounded-xl border-[1.5px] border-[#1E1E1E] hover:border-[#0038C8] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] text-[#0038C8] flex items-center justify-center mb-4 border border-[#0038C8]/20">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E1E1E]">
                  72-Hour Rapid Intake Desks
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Turn your existing unbranded practice or static site into an active HNI lead
                  qualifier in 72 hours with instant WhatsApp notification routing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs font-mono text-[#0038C8] font-bold">
                FAST-ACTION PRODUCTION
              </div>
            </div>

            {/* Capability 3 */}
            <div className="p-6 bg-[#FAFAFA] rounded-xl border-[1.5px] border-[#1E1E1E] hover:border-[#0038C8] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] text-[#0038C8] flex items-center justify-center mb-4 border border-[#0038C8]/20">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E1E1E]">
                  SEBI Regulatory Audit Suite
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Full compliance infrastructure: Investor Charter, complaints matrix, risk
                  disclosures, and audit logging to shield your practice from notices.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs font-mono text-[#0038C8] font-bold">
                SEBI (IA) 2013 STANDARD
              </div>
            </div>

            {/* Capability 4 */}
            <div className="p-6 bg-[#FAFAFA] rounded-xl border-[1.5px] border-[#1E1E1E] hover:border-[#0038C8] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] text-[#0038C8] flex items-center justify-center mb-4 border border-[#0038C8]/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E1E1E]">
                  LinkedIn Inbound Engines
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Curated 4:5 editorial carousels and 4-tier awareness commentary frameworks that
                  consistently bring HNIs from LinkedIn directly to your intake desk.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs font-mono text-[#0038C8] font-bold">
                HNI PIPELINE GENERATION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMPARISON LEDGER (Traditional Agency vs Advisor Solution) */}
      <section id="ledger" className="py-24 bg-[#F8F9FA] border-b border-[#1E1E1E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs text-[#0038C8] font-bold uppercase tracking-wider">
              [05] // THE STRUCTURAL COMPARISON
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1E1E] tracking-tight mt-2">
              Why Generic Web Agencies Fail Financial Advisors
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Wealth management is an institutional trust business. Amateur aesthetics and generic
              brochure sites actively destroy HNI confidence.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border-[1.5px] border-[#1E1E1E] shadow-[6px_6px_0px_#0038C8]">
              <thead>
                <tr className="bg-[#001B66] text-white text-xs sm:text-sm font-mono uppercase tracking-wider border-b border-[#0038C8]">
                  <th className="py-4 px-6">Evaluation Vector</th>
                  <th className="py-4 px-6 text-white/60">Traditional Digital Agency</th>
                  <th className="py-4 px-6 text-white bg-[#0038C8]">
                    Advisor Solution (FinTech Desk)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
                <tr>
                  <td className="py-4 px-6 font-bold text-[#1E1E1E]">Turnaround Speed</td>
                  <td className="py-4 px-6 text-gray-500">6 to 12 weeks of endless revisions</td>
                  <td className="py-4 px-6 font-semibold text-[#0038C8] bg-[#EEF4FF]/40">
                    72-hour guaranteed live production launch
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-[#1E1E1E]">Underlying Architecture</td>
                  <td className="py-4 px-6 text-gray-500">Bloated WordPress / Elementor with vulnerable plugins</td>
                  <td className="py-4 px-6 font-semibold text-[#0038C8] bg-[#EEF4FF]/40">
                    Sovereign Next.js 15, zero database bloat, lightning speed
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-[#1E1E1E]">SEBI RIA Compliance</td>
                  <td className="py-4 px-6 text-gray-500">Zero understanding of RIA 2013 regulations</td>
                  <td className="py-4 px-6 font-semibold text-[#0038C8] bg-[#EEF4FF]/40">
                    Complete Investor Charter, complaints tables, and audit trail
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-[#1E1E1E]">HNI Net-Worth Screening</td>
                  <td className="py-4 px-6 text-gray-500">Generic contact form dumping unverified names into email</td>
                  <td className="py-4 px-6 font-semibold text-[#0038C8] bg-[#EEF4FF]/40">
                    60-second interactive net-worth dial with instant WhatsApp alerts
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-[#1E1E1E]">Design Language</td>
                  <td className="py-4 px-6 text-gray-500">Consumer pink/purple SaaS gradients and generic templates</td>
                  <td className="py-4 px-6 font-semibold text-[#0038C8] bg-[#EEF4FF]/40">
                    Strict institutional royal blue, navy, and high-trust editorial layout
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. TRANSPARENT ENGAGEMENT TIERS & PRICING */}
      <section id="pricing" className="py-24 bg-white border-b border-[#1E1E1E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#0038C8] font-bold uppercase tracking-wider px-3 py-1 bg-[#EEF4FF] rounded border border-[#0038C8]/20">
              [06] // CLEAR FIXED-SCOPE DELIVERABLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1E1E] tracking-tight mt-4">
              Direct, Fixed-Scope Engagements
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Zero ambiguity. Clear timelines. Immediate production deliverables engineered to close
              your next HNI client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* TIER 1: 72-Hour Pilot */}
            <div className="bg-white rounded-xl border-[1.5px] border-[#1E1E1E] p-8 flex flex-col justify-between shadow-[4px_4px_0px_#1E1E1E]">
              <div>
                <span className="font-mono text-xs font-bold text-[#0038C8] uppercase tracking-wider">
                  FAST-ACTION PILOT
                </span>
                <h3 className="text-2xl font-black text-[#1E1E1E] mt-2">
                  72-Hour Intake Desk
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#1E1E1E]">
                    ₹25,000
                  </span>
                  <span className="text-xs text-gray-500 line-through">₹35,000</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Ideal for RIAs and MFDs needing immediate institutional online credibility.
                </p>

                <ul className="mt-6 space-y-3 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0038C8] shrink-0" />
                    <span>Complete 1-page institutional intake desk</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0038C8] shrink-0" />
                    <span>60-second net-worth pre-qualifier</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0038C8] shrink-0" />
                    <span>Direct WhatsApp & calendar routing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0038C8] shrink-0" />
                    <span>72-hour guaranteed live deployment</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={openWhatsAppAudit}
                  className="w-full py-3 bg-white text-[#1E1E1E] font-bold text-sm rounded-lg border-[1.5px] border-[#1E1E1E] shadow-[2px_2px_0px_#1E1E1E] hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Book 72-Hour Pilot
                </button>
              </div>
            </div>

            {/* TIER 2: Sovereign Advisory Portal (Highlighted) */}
            <div className="bg-[#001B66] text-white rounded-xl border-[2px] border-[#0038C8] p-8 flex flex-col justify-between shadow-[6px_6px_0px_#0038C8] relative">
              <div className="absolute -top-3 right-6 bg-[#0038C8] text-white text-[10px] font-mono font-bold px-3 py-1 rounded uppercase tracking-wider border border-white/20">
                MOST POPULAR FOR RIAS
              </div>

              <div>
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  FULL SOVEREIGN ARCHITECTURE
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  Sovereign Client Portal
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                    ₹70,000
                  </span>
                  <span className="text-xs text-white/50">one-time investment</span>
                </div>
                <p className="text-xs text-white/70 mt-1">
                  Complete digital infrastructure for SEBI RIAs handling ₹20 Cr+ AUM practices.
                </p>

                <ul className="mt-6 space-y-3 text-xs sm:text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Full Next.js sovereign RIA website & portal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Interactive Fee-Drag Calculator tool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automated Risk Profile (RPQ) assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>SEBI Investor Charter & complaints ledger</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Custom domain, DNS, and SSL hardening</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={openWhatsAppAudit}
                  className="w-full py-3.5 bg-[#0038C8] hover:bg-[#0038C8]/90 text-white font-bold text-sm rounded-lg border border-white/20 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Commission Sovereign Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TIER 3: Enterprise Syndicate */}
            <div className="bg-white rounded-xl border-[1.5px] border-[#1E1E1E] p-8 flex flex-col justify-between shadow-[4px_4px_0px_#1E1E1E]">
              <div>
                <span className="font-mono text-xs font-bold text-[#0038C8] uppercase tracking-wider">
                  WEALTH SYNDICATE
                </span>
                <h3 className="text-2xl font-black text-[#1E1E1E] mt-2">
                  Enterprise Wealth Desk
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#1E1E1E]">
                    ₹1,50,000+
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Multi-partner wealth practices, commercial debt syndicates, and family offices.
                </p>

                <ul className="mt-6 space-y-3 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0038C8] shrink-0" />
                    <span>Multi-partner routing & separate advisor desks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0038C8] shrink-0" />
                    <span>Commercial loan & debt syndication modules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0038C8] shrink-0" />
                    <span>90-day LinkedIn editorial content engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0038C8] shrink-0" />
                    <span>Bespoke CRM webhook & client intake dossiers</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={openWhatsAppAudit}
                  className="w-full py-3 bg-white text-[#1E1E1E] font-bold text-sm rounded-lg border-[1.5px] border-[#1E1E1E] shadow-[2px_2px_0px_#1E1E1E] hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Inquire For Syndicate Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOUNDER DOSSIER & CONVERSION ACTION SECTION */}
      <section id="contact" className="py-24 bg-[#FAFAFA] border-b border-[#1E1E1E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border-[1.5px] border-[#1E1E1E] shadow-[8px_8px_0px_#1E1E1E] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Founder Info */}
              <div className="lg:col-span-7 space-y-6">
                <div className="font-mono text-xs text-[#0038C8] font-bold uppercase tracking-wider">
                  [07] // CHIEF ARCHITECT & FOUNDER
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1E1E] tracking-tight">
                  Work Directly With Hari Narayan
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  I specialize exclusively in building digital onboarding desks, high-trust websites,
                  and client portals for SEBI Registered Investment Advisers, loan consultants, and
                  wealth management firms across India.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-lg border border-gray-200">
                    <Phone className="w-5 h-5 text-[#0038C8]" />
                    <div>
                      <div className="text-[11px] font-mono text-gray-500 uppercase">Direct Telephone</div>
                      <div className="text-sm font-bold text-[#1E1E1E] font-mono">+91 93456 19420</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-lg border border-gray-200">
                    <ExternalLink className="w-5 h-5 text-[#0038C8]" />
                    <div>
                      <div className="text-[11px] font-mono text-gray-500 uppercase">LinkedIn Profile</div>
                      <a
                        href="https://linkedin.com/in/harinarayanfintech"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold text-[#0038C8] hover:underline"
                      >
                        /in/harinarayanfintech
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={openWhatsAppAudit}
                    className="px-6 py-3.5 bg-[#0038C8] text-white font-bold text-sm rounded-lg border-[1.5px] border-[#1E1E1E] shadow-[3px_3px_0px_#1E1E1E] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Hari Directly</span>
                  </button>

                  <button
                    onClick={copyPhoneNumber}
                    className="px-6 py-3.5 bg-white text-[#1E1E1E] font-bold text-sm rounded-lg border-[1.5px] border-[#1E1E1E] hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isCopiedPhone ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Phone Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-gray-600" />
                        <span>Copy +91 93456 19420</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Fast Direct Request Card */}
              <div className="lg:col-span-5 bg-[#001B66] text-white rounded-xl p-6 sm:p-8 border border-[#0038C8]/40 shadow-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                  FAST 15-MINUTE CONSULTATION
                </span>
                <h3 className="text-xl font-bold text-white">
                  Schedule A Digital Practice Audit
                </h3>
                <p className="text-xs text-white/70 mt-2 mb-6">
                  Walk through your current website, risk profiling flow, and client onboarding
                  bottlenecks. Receive a direct 3-step action plan in 15 minutes.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono text-white/70 uppercase block mb-1">
                      Your Advisory Practice / Firm Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Wealth Advisory LLP"
                      className="w-full p-2.5 rounded bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white"
                      id="audit-firm-name"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-white/70 uppercase block mb-1">
                      Current Website (or GoDaddy / None)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. apexwealth.in or No Website"
                      className="w-full p-2.5 rounded bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white"
                      id="audit-website-url"
                    />
                  </div>

                  <button
                    onClick={() => {
                      const firm = (document.getElementById("audit-firm-name") as HTMLInputElement)
                        ?.value || "Our Practice";
                      const web = (document.getElementById("audit-website-url") as HTMLInputElement)
                        ?.value || "None";
                      const msg = encodeURIComponent(
                        `Hi Hari, I would like to audit our practice (${firm}, website: ${web}). Please let me know your availability for a 15-minute call.`
                      );
                      window.open(`https://wa.me/919345619420?text=${msg}`, "_blank");
                    }}
                    className="w-full py-3 bg-white text-[#001B66] font-bold text-xs uppercase tracking-wider rounded border border-transparent hover:bg-gray-100 transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Audit Inquiry via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. INSTITUTIONAL FOOTER */}
      <footer className="bg-[#1E1E1E] text-white py-14 border-t border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 border-b border-white/10 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#0038C8] text-white flex items-center justify-center font-bold text-base">
                AS
              </div>
              <span className="text-lg font-bold tracking-tight">ADVISOR SOLUTION</span>
              <span className="text-xs font-mono text-white/50 pl-3 border-l border-white/20">
                FINTECH DIGITAL ONBOARDING LAB
              </span>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-white/70 font-mono">
              <Link href="/" className="hover:text-white transition-colors">
                Client Portal Demo
              </Link>
              <Link href="/fee-drag-calculator" className="hover:text-white transition-colors">
                Fee-Drag Engine
              </Link>
              <Link href="/investor-charter" className="hover:text-white transition-colors">
                SEBI Investor Charter
              </Link>
              <Link href="/comment-generator" className="hover:text-white transition-colors">
                Comment Command Desk
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-white/50 gap-4">
            <div>
              &copy; {new Date().getFullYear()} Advisor Solution. Engineered by Hari Narayan. All rights
              reserved.
            </div>
            <div className="max-w-xl text-[11px] leading-relaxed text-white/40">
              Disclaimer: Advisor Solution provides bespoke digital onboarding software, intake desks,
              and sovereign web platforms for financial professionals. All regulatory disclosures
              are designed in accordance with SEBI (Investment Advisers) Regulations, 2013.
            </div>
          </div>
        </div>
      </footer>

      {/* CASE STUDY MODAL PREVIEW */}
      {activeModalCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border-[2px] border-[#1E1E1E] shadow-[8px_8px_0px_#0038C8] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalCase(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModalCase === "aurum" && (
              <div>
                <span className="text-xs font-mono text-[#0038C8] font-bold uppercase">
                  CASE ARCHITECTURE // AURUM FIDUCIARY
                </span>
                <h3 className="text-2xl font-black text-[#1E1E1E] mt-1">
                  Aurum Fiduciary Wealth Desk
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  SEBI Registered Investment Advisory (₹40 Cr+ AUM)
                </p>

                <div className="mt-6 space-y-4 text-sm text-gray-700">
                  <div className="p-4 bg-[#F8F9FA] rounded-lg border border-gray-200">
                    <span className="font-bold text-[#1E1E1E] block mb-1">Architecture Delivered:</span>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li>Next.js App Router with React Server Components for instant load speeds</li>
                      <li>Interactive Risk Profile Questionnaire (RPQ) calculating conservative to aggressive allocations</li>
                      <li>Automated Fee-Drag Calculator comparing 1.25% commission drag vs direct advisory</li>
                      <li>Full SEBI Investor Charter, grievance matrix, and complaints table audit log</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <Link
                      href="/"
                      className="px-5 py-2.5 bg-[#0038C8] text-white font-bold text-xs uppercase tracking-wider rounded border border-[#1E1E1E] shadow-[2px_2px_0px_#1E1E1E]"
                    >
                      Open Live Portal
                    </Link>
                    <button
                      onClick={() => setActiveModalCase(null)}
                      className="text-xs font-bold text-gray-600 hover:text-black"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeModalCase === "echvee" && (
              <div>
                <span className="text-xs font-mono text-[#0038C8] font-bold uppercase">
                  CASE ARCHITECTURE // ECHVEE FINSERV
                </span>
                <h3 className="text-2xl font-black text-[#1E1E1E] mt-1">
                  Echvee Finserv Digital Intake Desk
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  Vasant Kunj, Delhi Advisory Practice
                </p>

                <div className="mt-6 space-y-4 text-sm text-gray-700">
                  <div className="p-4 bg-[#F8F9FA] rounded-lg border border-gray-200">
                    <span className="font-bold text-[#1E1E1E] block mb-1">Architecture Delivered:</span>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li>Modern institutional redesign replacing outdated unbranded GoDaddy layout</li>
                      <li>60-second liquid net-worth pre-qualifier screening prospects above ₹50L</li>
                      <li>Direct WhatsApp notification webhook firing immediately upon lead completion</li>
                      <li>Full mobile responsiveness tested on iOS and Android</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={openWhatsAppAudit}
                      className="px-5 py-2.5 bg-[#0038C8] text-white font-bold text-xs uppercase tracking-wider rounded border border-[#1E1E1E] shadow-[2px_2px_0px_#1E1E1E]"
                    >
                      Request Similar Rebrand
                    </button>
                    <button
                      onClick={() => setActiveModalCase(null)}
                      className="text-xs font-bold text-gray-600 hover:text-black"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeModalCase === "cvr" && (
              <div>
                <span className="text-xs font-mono text-[#0038C8] font-bold uppercase">
                  CASE ARCHITECTURE // CVR LOANS
                </span>
                <h3 className="text-2xl font-black text-[#1E1E1E] mt-1">
                  Commercial Loan Syndication Desk
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  Commercial Debt Consultancy (₹5 Cr to ₹50 Cr)
                </p>

                <div className="mt-6 space-y-4 text-sm text-gray-700">
                  <div className="p-4 bg-[#F8F9FA] rounded-lg border border-gray-200">
                    <span className="font-bold text-[#1E1E1E] block mb-1">Architecture Delivered:</span>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li>Corporate borrower intake screening turnover, DSCR, and collateral readiness</li>
                      <li>Automated lender readiness checklist generating clean borrower dossiers</li>
                      <li>Filtered out 85% of retail non-creditworthy loan queries automatically</li>
                      <li>SSL hardened with bank-grade encryption</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={openWhatsAppAudit}
                      className="px-5 py-2.5 bg-[#0038C8] text-white font-bold text-xs uppercase tracking-wider rounded border border-[#1E1E1E] shadow-[2px_2px_0px_#1E1E1E]"
                    >
                      Build Debt Qualifier Desk
                    </button>
                    <button
                      onClick={() => setActiveModalCase(null)}
                      className="text-xs font-bold text-gray-600 hover:text-black"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
