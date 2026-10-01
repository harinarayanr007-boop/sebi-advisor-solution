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
} from "lucide-react";
import FeeDragCalculator from "@/components/interactive/FeeDragCalculator";
import AllocationSimulator from "@/components/interactive/AllocationSimulator";
import AboutFiduciary from "@/components/AboutFiduciary";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050B17] text-slate-100">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 border-b border-slate-800/80">
        {/* Subtle radial background glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] bg-gradient-to-b from-[#C5A059]/10 via-[#0A1226]/40 to-transparent blur-3xl opacity-70" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Qualification Hurdle Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#0A1226]/80 text-[#DFC68E] text-[11px] font-medium tracking-wide uppercase">
              <Lock className="h-3 w-3 text-[#C5A059]" />
              <span>Mandatory Suitability Hurdle: Minimum Investable Net Worth ₹50 Lakhs</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-50 leading-[1.15]">
              Pure Fiduciary Wealth Advisory for{" "}
              <span className="font-serif italic text-[#DFC68E]">
                Select Family Offices
              </span>{" "}
              & Ultra-HNIs.
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Legally bound to act solely in your interest under SEBI (Investment Advisers) Regulations, 2013. We do not sell financial products, accept distributor commissions, or retain broker kickbacks.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/rpq"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-semibold tracking-wider uppercase hover:bg-[#DFC68E] hover:border-[#DFC68E] transition-all duration-200 shadow-lg shadow-[#C5A059]/10 group"
              >
                <span>Initiate Suitability Assessment</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#fiduciary-standard"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded border border-slate-700 bg-[#0A1226]/60 text-slate-300 text-xs font-semibold tracking-wider uppercase hover:text-slate-100 hover:border-slate-500 transition-colors"
              >
                <span>Review Fiduciary Charter</span>
              </Link>
            </div>

            {/* Trust validation micro badges */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] text-slate-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
                <span>SEBI Reg: INA000019842</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="h-4 w-4 text-[#C5A059]" />
                <span>BASL Membership: BASL-1892</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-[#C5A059]" />
                <span>CeFCoM Centralized Clearing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL METRICS STRIP */}
      <section className="bg-[#030712] border-b border-slate-800/80 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl text-[#DFC68E] font-medium">₹50,00,000</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Minimum Client Net Worth
              </div>
              <div className="text-[10px] text-slate-500">Statutory Regulatory Hurdle</div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl text-slate-100 font-medium">0.00%</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Distribution Commission
              </div>
              <div className="text-[10px] text-slate-500">Zero AMC Brokerage Kickbacks</div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl text-[#DFC68E] font-medium">100%</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Direct Portfolio Plans
              </div>
              <div className="text-[10px] text-slate-500">Zero Expense Drag on Capital</div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl text-slate-100 font-medium">Reg. 15</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                SEBI Fiduciary Duty
              </div>
              <div className="text-[10px] text-slate-500">Legally Bound Standard of Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* STRUCTURAL CONFLICT OF INTEREST COMPARISON */}
      <section id="fiduciary-standard" className="py-20 bg-[#050B17] border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[#C5A059] text-xs font-semibold tracking-widest uppercase">
              The Structural Divide
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-slate-50 font-normal">
              Commercial Distribution vs. Pure Fiduciary Advisory
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Most wealth managers in India operate as distributors disguised as advisors. Examine the regulatory and financial distinctions under Indian securities law.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Commercial Distributor / Bank RM */}
            <div className="rounded-xl border border-slate-800 bg-[#090F1E] p-8 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase tracking-wider text-rose-400 font-medium">Commercial Channel</span>
                  <h3 className="font-serif text-xl text-slate-200 mt-1">Bank Wealth Desks & Distributors</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-rose-950/40 border border-rose-800/40 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-rose-400" />
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-300">
                <li className="flex items-start space-x-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong className="text-slate-100">Revenue Source:</strong> Covert trailer commissions paid by AMCs and PMS providers (0.75% to 1.75% annually deducted from your compounding).</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong className="text-slate-100">Legal Duty:</strong> Caveat Emptor (Buyer Beware). No statutory obligation to prioritize client financial longevity.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong className="text-slate-100">Product Incentives:</strong> Churning and pushing structured products with upfront distributor payouts.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong className="text-slate-100">Account Custody:</strong> Often request discretionary power of attorney or platform lock-in.</span>
                </li>
              </ul>
            </div>

            {/* Aurum Fiduciary RIA */}
            <div className="rounded-xl border border-[#C5A059]/40 bg-gradient-to-b from-[#0E1B38] to-[#0A1226] p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-28 w-28 bg-[#C5A059]/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-[#C5A059]/20">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#DFC68E] font-medium">Registered RIA</span>
                  <h3 className="font-serif text-xl text-slate-50 mt-1">Aurum Fiduciary Advisory</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/60 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-[#DFC68E]" />
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-200">
                <li className="flex items-start space-x-3">
                  <span className="text-[#C5A059] font-bold">✓</span>
                  <span><strong className="text-slate-50">Revenue Source:</strong> 100% direct client invoice via SEBI CeFCoM mechanism. Zero vendor kickbacks.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#C5A059] font-bold">✓</span>
                  <span><strong className="text-slate-50">Legal Duty:</strong> Regulation 15 Fiduciary Duty. Legally liable under SEBI mandate to place client capital safety first.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#C5A059] font-bold">✓</span>
                  <span><strong className="text-slate-50">Direct Portfolio:</strong> Exclusively recommends Direct Mutual Funds, Sovereign Bonds, and Direct Equity (saving 1%–1.5% annually).</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#C5A059] font-bold">✓</span>
                  <span><strong className="text-slate-50">Client Custody:</strong> You maintain 100% ownership and custody of all demat accounts; we provide advisory directives only.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FEE DRAG CALCULATOR */}
      <section className="py-20 bg-[#030712] border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeeDragCalculator />
        </div>
      </section>

      {/* INTERACTIVE ASSET ALLOCATION ARCHITECTURE */}
      <section id="framework" className="py-20 bg-[#050B17] border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AllocationSimulator />
        </div>
      </section>

      {/* ABOUT THE FIDUCIARY & GOVERNANCE */}
      <AboutFiduciary />

      {/* THOUGHT LEADERSHIP (LINKEDIN ROUTING) */}
      <section id="insights" className="py-20 bg-[#030712] border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#C5A059] text-xs font-semibold tracking-widest uppercase">
                Institutional Whitepapers
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-slate-50 font-normal mt-2">
                Fiduciary Thought Leadership
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Evidence-based market analysis and regulatory teardowns curated for high-net-worth business owners and family office trustees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="rounded-lg border border-slate-800 bg-[#090F1E] p-6 space-y-4 flex flex-col justify-between hover:border-[#C5A059]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[11px] text-[#C5A059]">
                  <Clock className="h-3 w-3" />
                  <span>8 Min Read • Portfolio Economics</span>
                </div>
                <h3 className="font-serif text-lg text-slate-100 font-medium">
                  The Arithmetic of Regular Plan Drag: How 1.25% Hidden AMC Commissions Erode ₹1.8 Crore Over 20 Years
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A quantitative empirical study dissecting the compounding destruction inflicted by distributor trailer fees versus direct fiduciary mandates.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-[#DFC68E]">
                <span>Read Whitepaper</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </article>

            <article className="rounded-lg border border-slate-800 bg-[#090F1E] p-6 space-y-4 flex flex-col justify-between hover:border-[#C5A059]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[11px] text-[#C5A059]">
                  <Clock className="h-3 w-3" />
                  <span>11 Min Read • Macro Debt Strategy</span>
                </div>
                <h3 className="font-serif text-lg text-slate-100 font-medium">
                  Navigating the Sovereign Yield Curve: Sovereign Green Bonds & AAA Corporate Debt Allocations
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Framework for allocating family office liquidity amidst shifting RBI monetary policy stances and corporate credit spread dynamics.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-[#DFC68E]">
                <span>Read Whitepaper</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </article>

            <article className="rounded-lg border border-slate-800 bg-[#090F1E] p-6 space-y-4 flex flex-col justify-between hover:border-[#C5A059]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[11px] text-[#C5A059]">
                  <Clock className="h-3 w-3" />
                  <span>14 Min Read • Private Trusts</span>
                </div>
                <h3 className="font-serif text-lg text-slate-100 font-medium">
                  Intergenerational Wealth Continuity: Designing Deterministic Private Family Trusts in India
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tax efficiency, ring-fencing against creditor liabilities, and seamless succession governance for Indian family enterprises.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-[#DFC68E]">
                <span>Read Whitepaper</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* STATUTORY FEE SCHEDULE (SEBI REGULATORY CAPS) */}
      <section id="fees" className="py-20 bg-[#050B17] border-b border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[#C5A059] text-xs font-semibold tracking-widest uppercase">
              Statutory Transparency
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-slate-50 font-normal">
              Regulated Advisory Fee Schedule
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              In full compliance with SEBI circular SEBI/HO/IMD/DF1/CIR/P/2020/182. All fees are transparently agreed upon in advance and collected through the Centralized Fee Collection Mechanism (CeFCoM).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Fixed Retainer Model */}
            <div className="rounded-xl border border-slate-800 bg-[#090F1E] p-8 space-y-6">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">Fixed Fee Model</div>
                <div className="font-serif text-3xl text-slate-100">
                  ₹1,25,000 <span className="text-sm text-slate-400 font-sans">/ annum + GST</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mandated annual retainer for comprehensive family balance sheet advisory, strategic asset allocation, and quarterly governance reviews.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#C5A059]" />
                  <span>Capped at SEBI statutory maximum for individual clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#C5A059]" />
                  <span>Comprehensive tax & direct portfolio roadmap</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#C5A059]" />
                  <span>Quarterly portfolio stress tests & rebalancing directives</span>
                </div>
              </div>
            </div>

            {/* AUA Percentage Model */}
            <div className="rounded-xl border border-[#C5A059]/40 bg-[#0A1226] p-8 space-y-6">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-[#DFC68E] font-medium">Asset-Under-Advice (AUA) Model</div>
                <div className="font-serif text-3xl text-[#DFC68E]">
                  0.75% – 1.25% <span className="text-sm text-slate-400 font-sans">/ annum + GST</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Calibrated for multi-generational family office portfolios requiring ongoing institutional monitoring and active tactical allocation.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#DFC68E]" />
                  <span>Strictly capped well below the SEBI 2.50% statutory maximum</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#DFC68E]" />
                  <span>Audited AUA computation on designated valuation dates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#DFC68E]" />
                  <span>Dedicated Principal Fiduciary Officer assignment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-slate-500 max-w-xl mx-auto">
            Note: Clients may choose between Fixed Retainer or AUA model upon completing the formal Risk Profiling Assessment and execution of the SEBI Advisory Agreement.
          </div>
        </div>
      </section>

      {/* FINAL SPAM WALL TRIGGER CTA */}
      <section className="py-24 bg-gradient-to-b from-[#050B17] via-[#0A1226] to-[#030712] relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="h-16 w-16 rounded-full border border-[#C5A059]/60 bg-[#050B17] mx-auto flex items-center justify-center shadow-lg overflow-hidden">
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

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            SEBI regulations mandate comprehensive risk assessment before any advisory relationship is established. Complete the four-minute assessment to verify portfolio eligibility.
          </p>

          <div className="pt-4">
            <Link
              href="/rpq"
              className="inline-flex items-center justify-center px-10 py-4 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-bold tracking-widest uppercase hover:bg-[#DFC68E] hover:border-[#DFC68E] transition-all duration-200 shadow-xl shadow-[#C5A059]/20 group"
            >
              <span>Verify Eligibility & Begin Assessment</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-[11px] text-slate-400 tracking-wide">
            Portfolio criteria: Minimum ₹50 Lakhs liquid investable surplus required for advisory intake.
          </p>
        </div>
      </section>
    </div>
  );
}
