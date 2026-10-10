"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import FigmaNavbar from "@/components/FigmaNavbar";
import FigmaFooter from "@/components/FigmaFooter";

const imgChevronDown = "/figma/chevron-down.svg";
const imgChevronRight = "/figma/chevron-right.svg";
const imgInvestmentPlanning = "/figma/investment-planning.png";
const imgPortfolioManagement = "/figma/portfolio-management.png";
const imgRiskAssessment = "/figma/risk-assessment.png";

export default function FeesPage() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0, 1]);

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqList = [
    {
      q: "How does fee-only advisory compare to commission-based distribution?",
      a: "Under SEBI regulations, distribution intermediaries do not charge an upfront advisory fee to clients because they receive trail commissions (typically 0.5% to 1.5% annually) directly from product manufacturers, embedded within the scheme's NAV. On a ₹1 Crore portfolio, this ongoing trail fee amounts to ₹50,000 to ₹1,50,000 every year. As a fee-only Registered Investment Adviser, we receive zero product commissions and advise exclusively on 100% Direct Plans, where the expense ratio savings often offset our flat fee.",
    },
    {
      q: "How are the advisory fees collected?",
      a: "In compliance with SEBI circular SEBI/HO/MIRSD/MIRSD-PoD-2/P/CIR/2024/38, fees are collected via formal banking channels (NEFT/RTGS/IMPS) with GST invoices or through the Centralized Fee Collection Mechanism (CeFCoM) managed by BSE. We never accept cash or execute trades on your behalf.",
    },
    {
      q: "Do you charge a percentage of my investment returns (profit sharing)?",
      a: "Never. Under SEBI (Investment Advisers) Regulations, 2013, charging performance fees or profit-sharing percentages is strictly prohibited for individual retail fiduciaries. We charge only an agreed-upon flat annual retainer.",
    },
    {
      q: "What is your refund and cancellation policy?",
      a: "As mandated by SEBI, if you decide to terminate the advisory agreement before completion of the term, the unutilized advisory fee is refunded on a proportionate pro-rata basis subject to a maximum break-in processing fee not exceeding one quarter.",
    },
  ];

  return (
    <div className="flex flex-col items-start relative w-full bg-white text-[#030a03]">
      <FigmaNavbar />

      {/* Hero Block */}
      <section className="bg-white flex items-center justify-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[96px] w-full border-b border-[#030a03]/5">
        <div className="flex flex-col gap-6 items-start max-w-[1280px] w-full">
          <div className="flex items-center">
            <span className="font-semibold text-[16px] leading-[1.5] text-[#1e90ff]">
              100% Fee-Only &bull; Zero Commissions &bull; SEBI Regulated
            </span>
          </div>
          <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.15] text-[#030a03] tracking-[-0.03em] max-w-[960px]">
            Transparent Advisory Fee Schedule
          </h1>
          <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80 max-w-[820px]">
            Under SEBI regulations, we operate on a strict fee-only retainer model. You pay solely for professional, conflict-free advice. We accept zero commissions, referral fees, or kickbacks from mutual fund houses, brokers, or insurance companies.
          </p>
        </div>
      </section>

      {/* 3-Tier Fee Packages Block */}
      <section className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[64px] items-start max-w-[1280px] w-full">
          
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">Statutory Pricing</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              Simple, Predictable Retainer Tiers
            </h2>
            <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80">
              Select the engagement model that matches your wealth complexity. All fees are fully capped under SEBI guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-[32px] items-stretch w-full">
            
            {/* Plan 1: Blueprint */}
            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-8 sm:p-10 flex flex-col justify-between gap-8 rounded-sm shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-xs uppercase tracking-wider text-[#030a03]/60">
                    One-Time Engagement
                  </span>
                  <h3 className="font-bold text-[24px] text-[#030a03]">Financial Blueprint &amp; Audit</h3>
                  <p className="text-sm text-[#030a03]/70 leading-relaxed">
                    A thorough forensic diagnostic of your existing assets, commission leakages, and a complete financial roadmap.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold font-roboto text-[38px] text-[#030a03]">₹35,000</span>
                    <span className="text-xs text-[#030a03]/60">+ 18% GST</span>
                  </div>
                  <span className="text-xs text-[#030a03]/60">One-time advisory fee</span>
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-[rgba(3,10,3,0.08)]">
                  <span className="font-semibold text-xs uppercase tracking-wider text-[#030a03]">
                    What&apos;s Included:
                  </span>
                  <ul className="text-sm text-[#030a03]/80 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>CAS portfolio commission leak analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Term &amp; health insurance adequacy audit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Target asset allocation model</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Comprehensive written advisory report</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>45 days implementation support via email</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/book?plan=blueprint"
                className="w-full border border-[rgba(3,10,3,0.15)] hover:bg-[#e8f3ff] text-[#030a03] font-medium py-3 text-center rounded-sm transition-colors block text-sm"
              >
                Choose Blueprint Plan
              </Link>
            </div>

            {/* Plan 2: Comprehensive Wealth Retainer (Highlighted) */}
            <div className="bg-white border-2 border-[#1e90ff] p-8 sm:p-10 flex flex-col justify-between gap-8 rounded-sm shadow-md relative">
              <div className="-top-3.5 left-1/2 -translate-x-1/2 absolute bg-[#1e90ff] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Most Popular &bull; Full Fiduciary
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-xs uppercase tracking-wider text-[#1e90ff]">
                    Ongoing Fiduciary Mandate
                  </span>
                  <h3 className="font-bold text-[24px] text-[#030a03]">Comprehensive Wealth Retainer</h3>
                  <p className="text-sm text-[#030a03]/70 leading-relaxed">
                    Continuous fiduciary stewardship, rebalancing, and tax optimization for family portfolios up to ₹10 Crores+.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold font-roboto text-[38px] text-[#1e90ff]">₹65,000</span>
                    <span className="text-xs text-[#030a03]/60">+ 18% GST</span>
                  </div>
                  <span className="text-xs text-[#030a03]/60">Billed annually (fixed retainer)</span>
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-[rgba(3,10,3,0.08)]">
                  <span className="font-semibold text-xs uppercase tracking-wider text-[#030a03]">
                    Everything in Blueprint, plus:
                  </span>
                  <ul className="text-sm text-[#030a03]/80 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>100% Direct Plan Mutual Fund guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Quarterly portfolio review &amp; rebalancing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Annual tax-loss harvesting execution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Direct WhatsApp &amp; scheduled phone access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Sovereign Gold Bonds &amp; Debt laddering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Annual mandatory statutory RPQ updates</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/book?plan=retainer"
                className="w-full bg-[#1e90ff] hover:bg-[#0077e6] text-white font-medium py-3 text-center rounded-sm transition-all block text-sm shadow-sm"
              >
                Engage Fiduciary Retainer
              </Link>
            </div>

            {/* Plan 3: NRI Mandate */}
            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-8 sm:p-10 flex flex-col justify-between gap-8 rounded-sm shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-xs uppercase tracking-wider text-[#030a03]/60">
                    Cross-Border Mandate
                  </span>
                  <h3 className="font-bold text-[24px] text-[#030a03]">NRI Global Wealth Retainer</h3>
                  <p className="text-sm text-[#030a03]/70 leading-relaxed">
                    Designed specifically for Non-Resident Indians managing capital in India with foreign taxation nuances.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold font-roboto text-[38px] text-[#030a03]">₹85,000</span>
                    <span className="text-xs text-[#030a03]/60">+ 18% GST</span>
                  </div>
                  <span className="text-xs text-[#030a03]/60">Billed annually</span>
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-[rgba(3,10,3,0.08)]">
                  <span className="font-semibold text-xs uppercase tracking-wider text-[#030a03]">
                    Specialized Cross-Border Scope:
                  </span>
                  <ul className="text-sm text-[#030a03]/80 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Everything in Comprehensive Retainer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>NRE/NRO banking &amp; repatriation guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>DTAA &amp; Foreign Tax Credit (FTC) awareness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Indian real estate liquidation allocation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1e90ff] font-bold">✓</span>
                      <span>Collaboration with your family CA/CPA</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/book?plan=nri"
                className="w-full border border-[rgba(3,10,3,0.15)] hover:bg-[#e8f3ff] text-[#030a03] font-medium py-3 text-center rounded-sm transition-colors block text-sm"
              >
                Choose NRI Mandate
              </Link>
            </div>

          </div>

          {/* Statutory Cap Compliance Banner */}
          <div className="bg-white border border-[rgba(3,10,3,0.15)] p-6 sm:p-8 rounded-sm w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-[840px]">
              <span className="font-bold text-sm text-[#030a03]">
                Statutory Compliance with SEBI Fee Regulations:
              </span>
              <p className="text-xs sm:text-sm text-[#030a03]/70 leading-relaxed">
                In compliance with Regulation 15A of SEBI (Investment Advisers) Amendment Regulations, 2020, fees charged by an Investment Adviser shall not exceed ₹1,25,000 per annum per family across all services under the flat fee mode. Our fees (₹35k - ₹85k) operate strictly under this statutory ceiling.
              </p>
            </div>
            <Link
              href="/disclosures"
              className="text-xs font-semibold text-[#1e90ff] hover:underline whitespace-nowrap"
            >
              Verify SEBI Disclosures &rarr;
            </Link>
          </div>

          <p className="text-[11px] text-[#030a03]/60 leading-relaxed italic max-w-[1280px]">
            Investment in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
          </p>

        </div>
      </section>

      {/* FAQ Block */}
      <section className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[64px] items-start max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">Common Inquiries</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              Frequently Asked Questions on Fees
            </h2>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {faqList.map((item, idx) => {
              const isOpen = openFaqs.includes(idx);
              return (
                <div
                  key={idx}
                  className="bg-white border border-[rgba(3,10,3,0.15)] rounded-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#e8f3ff]/20 transition-colors"
                  >
                    <span className="font-semibold text-[18px] text-[#030a03]">{item.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="size-5 shrink-0"
                    >
                      <img alt="" className="size-full" src={imgChevronDown} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6 text-sm text-[#030a03]/80 leading-relaxed border-t border-[rgba(3,10,3,0.06)] pt-4"
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
            <span className="font-semibold text-[14px] sm:text-[16px] text-[#1e90ff]">Take the Next Step</span>
            <h2 className="font-bold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.2] text-white tracking-[-0.3px]">
              Ready for Advice That Serves You First?
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-white/85">
              Schedule a preliminary 30-minute discovery conversation. We will evaluate your portfolio and explain whether our fee-only retainer is a suitable fit.
            </p>
          </div>

          <Link
            href="/book"
            className="relative z-10 bg-[#1e90ff] hover:bg-[#0077e6] text-white px-8 py-3.5 font-medium text-[16px] text-center rounded-sm transition-all shadow-md shrink-0 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <img src="/figma/call-white.svg" alt="" className="size-4 shrink-0" />
            <span>Book Discovery Call</span>
          </Link>
        </div>
      </section>

      <FigmaFooter />
    </div>
  );
}
