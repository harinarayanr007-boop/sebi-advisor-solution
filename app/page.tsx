import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Scale,
  ArrowRight,
  Lock,
  LineChart,
  FileCheck,
  Building2,
  AlertCircle,
  Clock,
  Compass,
  CheckCircle2,
  XCircle,
  BookOpen,
  Landmark,
  Layers,
  FileText,
  Award,
} from "lucide-react";
import FeeDragCalculator from "@/components/interactive/FeeDragCalculator";
import AllocationSimulator from "@/components/interactive/AllocationSimulator";
import AboutFiduciary from "@/components/AboutFiduciary";
import StructuralComparisonLedger from "@/components/StructuralComparisonLedger";
import HeroIntakeTerminal from "@/components/interactive/HeroIntakeTerminal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020611] text-slate-100 bg-architectural-grid">
      {/* EDITORIAL HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#BE9A48]/20 bg-guilloche-subtle">
        {/* Subtle ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/3 -translate-x-1/2 h-[600px] w-[1000px] bg-gradient-to-b from-[#BE9A48]/10 via-[#081022]/40 to-transparent blur-3xl opacity-60" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Masthead */}
            <div className="lg:col-span-7 space-y-6">
              {/* Qualification Hurdle Pill */}
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-sm border border-[#BE9A48]/40 bg-[#081022] text-[#D8BD80] text-[11px] font-mono tracking-wider uppercase shadow-inner">
                <Lock className="h-3.5 w-3.5 text-[#BE9A48]" />
                <span>Statutory Hurdle: Minimum Investable Net Worth ₹50 Lakhs</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-50 leading-[1.14]">
                Pure Fiduciary Wealth Advisory for{" "}
                <span className="font-serif italic text-[#D8BD80] block sm:inline">
                  Select Family Offices
                </span>{" "}
                & Ultra-HNIs.
              </h1>

              <div className="border-l-2 border-[#BE9A48]/70 pl-4 py-1">
                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl">
                  Statutorily bound to act solely in your best financial interest under SEBI (Investment Advisers) Regulations, 2013. We do not sell financial products, accept distributor commissions, or retain broker kickbacks.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/rpq"
                  className="btn-gold-foil inline-flex items-center justify-center px-8 py-4 rounded-sm text-xs uppercase tracking-widest font-bold group shadow-xl"
                >
                  <span>Initiate Suitability Assessment</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#fiduciary-standard"
                  className="inline-flex items-center justify-center px-6 py-4 rounded-sm border border-slate-700 bg-[#081022] text-slate-300 text-xs font-mono uppercase tracking-wider hover:text-slate-100 hover:border-[#BE9A48]/60 transition-colors"
                >
                  <span>Review Fiduciary Charter</span>
                </Link>
              </div>

              {/* Trust validation micro badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#BE9A48]" />
                  <span>SEBI RIA: INA000019842</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Scale className="h-3.5 w-3.5 text-[#BE9A48]" />
                  <span>BASL Membership: BASL-1892</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <Landmark className="h-3.5 w-3.5" />
                  <span>CeFCoM Active</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Institutional Terminal Preview */}
            <div className="lg:col-span-5">
              <HeroIntakeTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL AUDITED METRICS LEDGER */}
      <section className="bg-[#040915] border-b border-[#BE9A48]/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="p-4 sm:px-6 text-center space-y-1">
              <div className="font-serif text-2xl sm:text-3xl text-[#D8BD80] font-medium">
                ₹50,00,000
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Minimum Client Net Worth
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Statutory Intake Hurdle</div>
            </div>

            <div className="p-4 sm:px-6 text-center space-y-1">
              <div className="font-serif text-2xl sm:text-3xl text-slate-100 font-medium">
                0.00%
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Distribution Commission
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Zero Brokerage Kickbacks</div>
            </div>

            <div className="p-4 sm:px-6 text-center space-y-1">
              <div className="font-serif text-2xl sm:text-3xl text-[#D8BD80] font-medium">
                100%
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Direct Portfolio Plans
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Zero Expense Drag on NAV</div>
            </div>

            <div className="p-4 sm:px-6 text-center space-y-1">
              <div className="font-serif text-2xl sm:text-3xl text-slate-100 font-medium">
                Reg. 15
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                SEBI Fiduciary Duty
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Statutory Oath of Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* STRUCTURAL CONFLICT OF INTEREST COMPARISON LEDGER */}
      <section id="fiduciary-standard" className="py-20 bg-[#020611] border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StructuralComparisonLedger />
        </div>
      </section>

      {/* INTERACTIVE FEE DRAG CALCULATOR */}
      <section className="py-20 bg-[#040915] border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeeDragCalculator />
        </div>
      </section>

      {/* BESPOKE ASSET ALLOCATION SIMULATOR */}
      <section id="framework" className="py-20 bg-[#020611] border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AllocationSimulator />
        </div>
      </section>

      {/* ABOUT THE FIDUCIARY */}
      <AboutFiduciary />

      {/* THOUGHT LEADERSHIP & MONOGRAPHS */}
      <section id="insights" className="py-20 bg-[#020611] border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D8BD80]">
                Institutional Whitepapers & Briefings
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-slate-50 font-normal">
                Fiduciary Thought Leadership
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md font-mono">
              Evidence-based market analysis and regulatory teardowns curated for high-net-worth business owners and family office trustees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="architectural-panel p-6 space-y-4 flex flex-col justify-between group hover:border-[#BE9A48] transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#D8BD80]">
                  <span>MONOGRAPH // 01</span>
                  <span>8 Min Read</span>
                </div>
                <h3 className="font-serif text-lg text-slate-100 font-medium group-hover:text-[#F3ECDB] transition-colors">
                  The Arithmetic of Regular Plan Drag: How 1.25% Hidden AMC Commissions Erode ₹1.8 Crore Over 20 Years
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A quantitative empirical study dissecting the compounding destruction inflicted by distributor trailer fees versus direct fiduciary mandates.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-[#D8BD80]">
                <span>Read Whitepaper</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>

            <article className="architectural-panel p-6 space-y-4 flex flex-col justify-between group hover:border-[#BE9A48] transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#D8BD80]">
                  <span>MONOGRAPH // 02</span>
                  <span>11 Min Read</span>
                </div>
                <h3 className="font-serif text-lg text-slate-100 font-medium group-hover:text-[#F3ECDB] transition-colors">
                  Navigating the Sovereign Yield Curve: Sovereign Green Bonds & AAA Corporate Debt Allocations
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Framework for allocating family office liquidity amidst shifting RBI monetary policy stances and corporate credit spread dynamics.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-[#D8BD80]">
                <span>Read Whitepaper</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>

            <article className="architectural-panel p-6 space-y-4 flex flex-col justify-between group hover:border-[#BE9A48] transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#D8BD80]">
                  <span>MONOGRAPH // 03</span>
                  <span>14 Min Read</span>
                </div>
                <h3 className="font-serif text-lg text-slate-100 font-medium group-hover:text-[#F3ECDB] transition-colors">
                  Intergenerational Wealth Continuity: Designing Deterministic Private Family Trusts in India
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tax efficiency, ring-fencing against creditor liabilities, and seamless succession governance for Indian family enterprises.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-[#D8BD80]">
                <span>Read Whitepaper</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* STATUTORY FEE SCHEDULE (SEBI REGULATORY CAPS) */}
      <section id="fees" className="py-20 bg-[#040915] border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[#D8BD80] text-[10px] font-bold tracking-[0.25em] uppercase font-mono">
              Statutory Transparency // SEBI Size 10 Mandated
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-slate-50 font-normal">
              Regulated Advisory Fee Schedule
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              In full compliance with SEBI circular SEBI/HO/IMD/DF1/CIR/P/2020/182. All fees are transparently agreed upon in advance and collected exclusively through the Centralized Fee Collection Mechanism (CeFCoM).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Fixed Retainer Model */}
            <div className="architectural-panel p-8 space-y-6">
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-[#D8BD80] font-mono font-semibold">
                  Fixed Retainer Model
                </div>
                <div className="font-serif text-3xl text-slate-100">
                  ₹1,25,000 <span className="text-xs text-slate-400 font-sans">/ annum + GST</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mandated annual retainer for comprehensive family balance sheet advisory, strategic asset allocation, and quarterly governance reviews.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-300 font-sans">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#BE9A48] shrink-0" />
                  <span>Capped at SEBI statutory maximum for individual clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#BE9A48] shrink-0" />
                  <span>Comprehensive tax & direct portfolio roadmap</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#BE9A48] shrink-0" />
                  <span>Quarterly portfolio stress tests & rebalancing directives</span>
                </div>
              </div>
            </div>

            {/* AUA Percentage Model */}
            <div className="architectural-panel p-8 space-y-6 border-[#BE9A48]/50">
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-[#D8BD80] font-mono font-semibold">
                  Asset-Under-Advice (AUA) Model
                </div>
                <div className="font-serif text-3xl text-[#F3ECDB]">
                  0.75% – 1.25% <span className="text-xs text-slate-400 font-sans">/ annum + GST</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Calibrated for multi-generational family office portfolios requiring ongoing institutional monitoring and active tactical allocation.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-300 font-sans">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D8BD80] shrink-0" />
                  <span>Strictly capped well below the SEBI 2.50% statutory maximum</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D8BD80] shrink-0" />
                  <span>Audited AUA computation on designated valuation dates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D8BD80] shrink-0" />
                  <span>Dedicated Principal Fiduciary Officer assignment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-slate-500 max-w-xl mx-auto font-mono">
            Note: Clients may choose between Fixed Retainer or AUA model upon completing the formal Risk Profiling Assessment and execution of the SEBI Advisory Agreement.
          </div>
        </div>
      </section>

      {/* FINAL SPAM WALL TRIGGER CTA */}
      <section className="py-24 bg-gradient-to-b from-[#040915] via-[#081022] to-[#020611] relative overflow-hidden border-t border-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="h-16 w-16 rounded-full border border-[#BE9A48] bg-[#040915] mx-auto flex items-center justify-center shadow-lg overflow-hidden">
            <Image
              src="/images/fiduciary-seal.jpg"
              alt="Aurum Seal"
              width={64}
              height={64}
              unoptimized
              className="object-cover"
            />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-slate-50 font-normal">
            Begin with the Statutory Suitability Assessment
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-light">
            SEBI regulations mandate comprehensive risk assessment before any advisory relationship is established. Complete the four-minute assessment to verify portfolio eligibility.
          </p>

          <div className="pt-4">
            <Link
              href="/rpq"
              className="btn-gold-foil inline-flex items-center justify-center px-10 py-4 rounded-sm text-xs uppercase tracking-widest font-bold group shadow-2xl"
            >
              <span>Verify Eligibility & Begin Assessment</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-[10px] text-slate-500 tracking-wide font-mono">
            Portfolio criteria: Minimum ₹50 Lakhs liquid investable surplus required for advisory intake.
          </p>
        </div>
      </section>
    </div>
  );
}
