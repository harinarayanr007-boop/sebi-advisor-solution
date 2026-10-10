"use client";

import React from "react";
import Link from "next/link";
import FigmaNavbar from "@/components/FigmaNavbar";
import FigmaFooter from "@/components/FigmaFooter";

const imgInvestmentPlanning = "/figma/investment-planning.png";
const imgPortfolioManagement = "/figma/portfolio-management.png";
const imgRiskAssessment = "/figma/risk-assessment.png";
const imgAboutPhoto = "/figma/about-photo.png";
const imgProcessStep1 = "/figma/process-step-1.png";
const imgProcessStep2 = "/figma/process-step-2.png";
const imgProcessStep3 = "/figma/process-step-3.png";

export default function PhilosophyPage() {
  return (
    <div className="flex flex-col items-start relative w-full bg-white text-[#030a03]">
      <FigmaNavbar />

      {/* Hero Block */}
      <section className="bg-white flex items-center justify-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[96px] w-full border-b border-[#030a03]/5">
        <div className="flex flex-col gap-6 items-start max-w-[1280px] w-full">
          <div className="flex items-center">
            <span className="font-semibold text-[16px] leading-[1.5] text-[#1e90ff]">
              Evidence-Based Stewardship &bull; Academic Finance Principles
            </span>
          </div>
          <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.15] text-[#030a03] tracking-[-0.03em] max-w-[960px]">
            Our Investment Philosophy
          </h1>
          <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80 max-w-[820px]">
            We do not predict macroeconomic cycles, speculate on short-term headlines, or chase hyped stocks. We build disciplined, low-cost, multi-asset portfolios engineered to withstand extreme market panics and compound your family&apos;s wealth for generations.
          </p>
        </div>
      </section>

      {/* 4 Core Pillars Section */}
      <section className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[64px] items-start max-w-[1280px] w-full">
          
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">Core Principles</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              The Four Pillars of Capital Stewardship
            </h2>
            <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80">
              Grounded in Nobel Prize-winning modern portfolio theory and real-world behavioral market discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-[32px] w-full">
            
            {/* Pillar 1 */}
            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-8 sm:p-10 flex flex-col gap-6 rounded-sm shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-[52px] rounded-sm bg-[#e8f3ff] p-2.5 flex items-center justify-center border border-[rgba(3,10,3,0.08)]">
                  <img alt="" className="size-full object-contain" src={imgInvestmentPlanning} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1e90ff]">Pillar 01</span>
                  <h3 className="font-bold text-[22px] text-[#030a03]">Asset Allocation Over Stock Picking</h3>
                </div>
              </div>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#030a03]/80">
                Pioneering academic research demonstrates that over 90% of a portfolio&apos;s return variance is driven by broad asset allocation (Equity vs. Debt vs. Gold vs. Cash), not by individual stock selection or market timing. We engineer an allocation tailored to your specific liquidity timeline so you never become a forced seller.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-8 sm:p-10 flex flex-col gap-6 rounded-sm shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-[52px] rounded-sm bg-[#e8f3ff] p-2.5 flex items-center justify-center border border-[rgba(3,10,3,0.08)]">
                  <img alt="" className="size-full object-contain" src={imgPortfolioManagement} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1e90ff]">Pillar 02</span>
                  <h3 className="font-bold text-[22px] text-[#030a03]">Cost Minimization (The Free Alpha)</h3>
                </div>
              </div>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#030a03]/80">
                In investing, you get what you don&apos;t pay for. High mutual fund distributor expense ratios, trading commissions, and unmanaged taxes silently bleed away up to 35% of compounding returns over 25 years. We utilize 100% Direct Plans, low-cost broad index funds, and tax-loss harvesting to preserve every basis point.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-8 sm:p-10 flex flex-col gap-6 rounded-sm shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-[52px] rounded-sm bg-[#e8f3ff] p-2.5 flex items-center justify-center border border-[rgba(3,10,3,0.08)]">
                  <img alt="" className="size-full object-contain" src={imgRiskAssessment} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1e90ff]">Pillar 03</span>
                  <h3 className="font-bold text-[22px] text-[#030a03]">Systematic, Emotionless Rebalancing</h3>
                </div>
              </div>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#030a03]/80">
                When markets rally aggressively, human psychology tempts investors to buy more at peak valuations. When markets crash, fear triggers panic selling. Our rule-based rebalancing bands automatically trim equities when they become over-extended and deploy cash when valuations are distressed.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-8 sm:p-10 flex flex-col gap-6 rounded-sm shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-[52px] rounded-sm bg-[#e8f3ff] p-2.5 flex items-center justify-center border border-[rgba(3,10,3,0.08)]">
                  <img alt="" className="size-full object-contain" src={imgAboutPhoto} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1e90ff]">Pillar 04</span>
                  <h3 className="font-bold text-[22px] text-[#030a03]">The Behavioral Circuit Breaker</h3>
                </div>
              </div>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#030a03]/80">
                The biggest risk to your family&apos;s wealth is not volatility—it is your own emotional reactions during market turbulence. As an independent fiduciary, our most crucial function is acting as your rational circuit breaker, preventing hasty decisions that permanently impair capital.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* What We Strictly Avoid Block */}
      <section className="bg-white flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[64px] items-start max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">Negative Screening</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              What We Strictly Avoid
            </h2>
            <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80">
              Wealth is built just as much by what you choose NOT to do as by what you do.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[24px] w-full">
            
            <div className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.12)] p-6 rounded-sm flex flex-col gap-3">
              <span className="text-red-600 font-bold text-lg">&times; No F&amp;O Trading</span>
              <p className="text-xs sm:text-sm text-[#030a03]/80 leading-relaxed">
                SEBI studies prove that over 93% of retail traders lose significant money in derivative contracts. We never gamble with client capital.
              </p>
            </div>

            <div className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.12)] p-6 rounded-sm flex flex-col gap-3">
              <span className="text-red-600 font-bold text-lg">&times; No High-Fee ULIPs</span>
              <p className="text-xs sm:text-sm text-[#030a03]/80 leading-relaxed">
                We strictly separate term life insurance from investment. Combining them guarantees hefty upfront commissions and dismal sub-5% returns.
              </p>
            </div>

            <div className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.12)] p-6 rounded-sm flex flex-col gap-3">
              <span className="text-red-600 font-bold text-lg">&times; No Macro Forecasting</span>
              <p className="text-xs sm:text-sm text-[#030a03]/80 leading-relaxed">
                No human or algorithm can reliably forecast where crude oil or the Nifty will trade next month. We prepare, we do not predict.
              </p>
            </div>

            <div className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.12)] p-6 rounded-sm flex flex-col gap-3">
              <span className="text-red-600 font-bold text-lg">&times; No Product Kickbacks</span>
              <p className="text-xs sm:text-sm text-[#030a03]/80 leading-relaxed">
                We refuse 100% of distributor commissions and soft-dollar arrangements. Our loyalty is bound exclusively to you by SEBI statute.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3-Step Execution Framework */}
      <section className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[64px] items-start max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">Execution Framework</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              From Diagnostic to Implementation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[32px] w-full">
            
            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-6 sm:p-8 flex flex-col gap-5 rounded-sm">
              <div className="w-full h-[180px] rounded-sm overflow-hidden bg-[#e8f3ff]">
                <img alt="" className="size-full object-cover" src={imgProcessStep1} />
              </div>
              <h3 className="font-semibold text-[20px] text-[#030a03]">1. Goal &amp; Liability Mapping</h3>
              <p className="font-normal text-[15px] leading-[1.6] text-[#030a03]/80">
                We calculate your family&apos;s net worth, debt liabilities, emergency buffers, and targeted milestone dates before suggesting any investment asset.
              </p>
            </div>

            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-6 sm:p-8 flex flex-col gap-5 rounded-sm">
              <div className="w-full h-[180px] rounded-sm overflow-hidden bg-[#e8f3ff]">
                <img alt="" className="size-full object-cover" src={imgProcessStep2} />
              </div>
              <h3 className="font-semibold text-[20px] text-[#030a03]">2. Direct Allocation Blueprint</h3>
              <p className="font-normal text-[15px] leading-[1.6] text-[#030a03]/80">
                You receive a clear, written advisory dossier detailing exact Direct Plan allocations, target percentages, and sovereign fixed income instruments.
              </p>
            </div>

            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-6 sm:p-8 flex flex-col gap-5 rounded-sm">
              <div className="w-full h-[180px] rounded-sm overflow-hidden bg-[#e8f3ff]">
                <img alt="" className="size-full object-cover" src={imgProcessStep3} />
              </div>
              <h3 className="font-semibold text-[20px] text-[#030a03]">3. Quarterly Fiduciary Oversight</h3>
              <p className="font-normal text-[15px] leading-[1.6] text-[#030a03]/80">
                We monitor portfolio health, track asset drift, execute tax harvesting, and maintain periodic review calls to keep your plan on course.
              </p>
            </div>

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
            <span className="font-semibold text-[14px] sm:text-[16px] text-[#1e90ff]">Align With Evidence</span>
            <h2 className="font-bold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.2] text-white tracking-[-0.3px]">
              Start Your Fiduciary Mandate Today
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-white/85">
              Schedule an introductory consultation to discuss your wealth goals with a SEBI Registered Investment Adviser.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <Link
              href="/book"
              className="bg-[#1e90ff] hover:bg-[#0077e6] text-white px-8 py-3.5 font-medium text-[16px] text-center rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <img src="/figma/call-white.svg" alt="" className="size-4 shrink-0" />
              <span>Book Consultation</span>
            </Link>
            <Link
              href="/fee-drag-calculator"
              className="border border-white/20 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 font-medium text-[16px] text-center rounded-sm transition-colors backdrop-blur-xs"
            >
              Calculate Fee Drag
            </Link>
          </div>
        </div>
      </section>

      <FigmaFooter />
    </div>
  );
}
