"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import FigmaNavbar from "@/components/FigmaNavbar";
import FigmaFooter from "@/components/FigmaFooter";
import { getAutomatedComplaintsData } from "@/lib/complaints";

export default function DisclosuresPage() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const { summary, sources } = useMemo(() => getAutomatedComplaintsData(), []);

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const sections = [
    {
      id: "regulatory",
      title: "Regulatory Disclosures",
      content: (
        <div className="flex flex-col gap-6 text-sm text-[#030a03]/85 leading-relaxed">
          <p>
            In compliance with SEBI circular <strong>SEBI/HO/IMD/IMD-II CIS/P/CIR/2021/0686</strong>, all SEBI Registered Investment Advisers are mandated to disclose complaints data on a monthly basis by the 7th of the succeeding month.
          </p>

          <div className="border border-slate-200 rounded-sm overflow-hidden text-xs w-full bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#e8f3ff] border-b border-slate-200 text-[#030a03]">
                  <th className="py-3 px-4 font-bold">
                    Complaint Status as on {summary.asOnDate} (for {summary.reportingMonth})
                  </th>
                  <th className="py-3 px-4 font-bold text-center w-[160px]">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-4">At the beginning of month</td>
                  <td className="py-2.5 px-4 text-center font-semibold">{summary.beginningOfMonth}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">Received during the month</td>
                  <td className="py-2.5 px-4 text-center font-semibold">{summary.receivedDuringMonth}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">Resolved during the month</td>
                  <td className="py-2.5 px-4 text-center font-semibold">{summary.resolvedDuringMonth}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">Pending at the ending of the month</td>
                  <td className="py-2.5 px-4 text-center font-semibold text-emerald-700">{summary.pendingAtEndOfMonth}</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-2.5 px-4 text-slate-500 italic">Reason for pendency</td>
                  <td className="py-2.5 px-4 text-center text-slate-500">{summary.reasonForPendency}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              Auto-refreshed according to SEBI 7th-day statutory protocol.
            </span>
            <Link
              href="/complaints-data"
              className="text-xs font-semibold text-[#1e90ff] hover:underline"
            >
              View Detailed Multi-Year Audit Table &rarr;
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: "sebi",
      title: "SEBI Disclosures",
      content: (
        <div className="flex flex-col gap-6 text-sm text-[#030a03]/85 leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#e8f3ff]/40 rounded-sm border border-slate-200">
            <div>
              <span className="text-xs uppercase font-semibold text-slate-500">Entity Name</span>
              <p className="font-bold text-[#030a03] text-base mt-0.5">Aurum Fiduciary</p>
            </div>
            <div>
              <span className="text-xs uppercase font-semibold text-slate-500">SEBI Reg No.</span>
              <p className="font-bold text-[#1e90ff] text-base mt-0.5">INA000015678</p>
            </div>
            <div>
              <span className="text-xs uppercase font-semibold text-slate-500">BASL Membership</span>
              <p className="font-bold text-[#030a03] text-base mt-0.5">BASL - 1892</p>
            </div>
            <div>
              <span className="text-xs uppercase font-semibold text-slate-500">Category</span>
              <p className="font-bold text-[#030a03] text-base mt-0.5">Individual RIA</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-[#030a03]">Zero-Commission &amp; Fee-Only Architecture</h4>
            <p>
              Under Regulation 15(2) and Regulation 22A of SEBI (Investment Advisers) Regulations, 2013, Aurum Fiduciary operates solely on client-remitted advisory fees. We accept <strong>zero commissions, trail fees, kickbacks, or non-cash perks</strong> from any Mutual Fund house, broker, insurer, or platform. All mutual fund advice is strictly rendered for execution in <strong>100% Direct Plans</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-[#030a03]">Statutory Fee Cap Compliance</h4>
            <p>
              Under Regulation 15A of SEBI (IA) Amendment Regulations, 2020, fees charged by an Investment Adviser shall not exceed ₹1,25,000 per annum per family across all services under flat fee mode. Our fees operate strictly within this ceiling.
            </p>
          </div>

          <p className="text-xs text-slate-500 italic pt-2 border-t border-slate-100">
            Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Investment in securities market are subject to market risks. Read all related documents carefully before investing.
          </p>
        </div>
      ),
    },
    {
      id: "charter",
      title: "Investor Charter",
      content: (
        <div className="flex flex-col gap-6 text-sm text-[#030a03]/85 leading-relaxed">
          <p>
            As prescribed under SEBI circular <strong>SEBI/HO/IMD/IMD-II CIS/P/CIR/2021/0686</strong>, the Investor Charter outlines the mission, investor rights, and mandatory code of conduct for Registered Investment Advisers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm">
              <h4 className="font-bold text-sm text-[#030a03] mb-2">Rights of Investors</h4>
              <ul className="space-y-1.5 text-xs text-[#030a03]/80 list-disc list-inside">
                <li>Right to get written investment advice tailored to risk profile.</li>
                <li>Right to know all fees upfront with formal GST invoices.</li>
                <li>Right to direct plan execution with zero commission drag.</li>
                <li>Right to prompt resolution of grievances within 21 calendar days.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm">
              <h4 className="font-bold text-sm text-[#030a03] mb-2">Mandatory Code of Conduct</h4>
              <ul className="space-y-1.5 text-xs text-[#030a03]/80 list-disc list-inside">
                <li>Highest standard of fiduciary duty and undivided client loyalty.</li>
                <li>Complete segregation of advisory activities from distribution.</li>
                <li>Annual risk profiling and objective suitability assessment.</li>
                <li>Strict client data privacy and confidential custody.</li>
              </ul>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/investor-charter"
              className="text-xs font-semibold text-[#1e90ff] hover:underline"
            >
              Read Complete Formal Investor Charter Document &rarr;
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: "grievance",
      title: "Grievance Redressal / Escalation Matrix",
      content: (
        <div className="flex flex-col gap-6 text-sm text-[#030a03]/85 leading-relaxed">
          <p>
            In compliance with SEBI master circular requirements, we maintain a transparent 3-tier escalation mechanism for swift resolution of client grievances.
          </p>

          <div className="space-y-3">
            <div className="p-4 border border-slate-200 rounded-sm bg-white">
              <div className="flex items-center justify-between font-bold text-[#030a03] mb-1">
                <span>Level 1: Investment Adviser / Compliance Officer</span>
                <span className="text-xs text-[#1e90ff] font-semibold">TAT: 21 Days</span>
              </div>
              <p className="text-xs text-slate-600">
                Principal Officer: Dr. Aurum Mamal &bull; Email: <strong>advice@sebiadvisor.in</strong> &bull; Phone: <strong>+91 98200 12345</strong> &bull; Marine Drive, Mumbai 400020.
              </p>
            </div>

            <div className="p-4 border border-slate-200 rounded-sm bg-white">
              <div className="flex items-center justify-between font-bold text-[#030a03] mb-1">
                <span>Level 2: SEBI Complaints Redress System (SCORES)</span>
                <span className="text-xs text-slate-500 font-semibold">Toll Free: 1800 22 7575</span>
              </div>
              <p className="text-xs text-slate-600">
                If the grievance is not redressed within 21 calendar days, you may lodge a complaint on SEBI SCORES portal at{" "}
                <a href="https://scores.sebi.gov.in" target="_blank" rel="noreferrer" className="text-[#1e90ff] underline">
                  scores.sebi.gov.in
                </a>{" "}
                or the SCORES mobile app.
              </p>
            </div>

            <div className="p-4 border border-slate-200 rounded-sm bg-white">
              <div className="flex items-center justify-between font-bold text-[#030a03] mb-1">
                <span>Level 3: SMART ODR Portal (Online Dispute Resolution)</span>
                <span className="text-xs text-slate-500 font-semibold">Arbitration &amp; Conciliation</span>
              </div>
              <p className="text-xs text-slate-600">
                If unsatisfied with SCORES resolution, dispute can be initiated via SEBI's SMART ODR platform at{" "}
                <a href="https://smartodr.in" target="_blank" rel="noreferrer" className="text-[#1e90ff] underline">
                  smartodr.in
                </a>.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      content: (
        <div className="flex flex-col gap-4 text-sm text-[#030a03]/85 leading-relaxed">
          <p>
            We respect the extreme sensitivity of family wealth figures, PAN details, bank records, and personal estate information.
          </p>
          <ul className="space-y-2 text-xs text-[#030a03]/80 list-disc list-inside">
            <li><strong>Zero Data Monetization:</strong> We never sell, lease, or monetize your contact information or portfolio details to any third-party marketing agencies or lenders.</li>
            <li><strong>Statutory Preservation:</strong> As required under Regulation 19 of SEBI (Investment Advisers) Regulations, 2013, records of client agreements, risk assessments, and written advice are securely archived for 5 years in encrypted storage.</li>
            <li><strong>Strict Discretion:</strong> Access to your records is restricted solely to the Principal Officer and certified compliance personnel.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      content: (
        <div className="flex flex-col gap-4 text-sm text-[#030a03]/85 leading-relaxed">
          <p>
            Engagement with Aurum Fiduciary is governed strictly by a formal written bilateral agreement in compliance with SEBI circular SEBI/HO/IMD/DF1/CIR/P/2020/182.
          </p>
          <ul className="space-y-2 text-xs text-[#030a03]/80 list-disc list-inside">
            <li><strong>Advisory Scope:</strong> Our services are purely advisory in nature. We do not provide discretionary portfolio management or custodial fund handling.</li>
            <li><strong>Client Custody:</strong> All investments are transacted directly in client-owned demat/folio accounts on official platforms (e.g., BSE Star MF, MF Central).</li>
            <li><strong>Termination &amp; Refund:</strong> In accordance with SEBI guidelines, client may terminate the agreement anytime, and unutilized advisory fee is refunded on a proportionate pro-rata basis.</li>
            <li><strong>Governing Law:</strong> All terms are subject to SEBI regulations and jurisdiction of courts in Mumbai, Maharashtra.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-start relative w-full bg-white text-[#030a03]">
      <FigmaNavbar />

      {/* Hero Section */}
      <section className="bg-white flex flex-col items-center justify-center px-5 sm:px-8 md:px-[64px] pt-14 sm:pt-20 lg:pt-[96px] pb-10 w-full">
        <div className="flex flex-col items-center gap-4 text-center max-w-[800px] w-full">
          {/* Decorative pill bar matching screenshot */}
          <div className="w-12 h-1 bg-[#1e90ff] rounded-full" />
          
          <h1 className="font-normal text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.15] text-[#030a03] tracking-[-0.03em]">
            Disclosures &amp; <span className="font-bold">Legal</span>
          </h1>
          <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/75 max-w-[640px]">
            Statutory disclosures, SEBI registration verification, investor charters, and grievance redressal mechanisms in strict compliance with SEBI guidelines.
          </p>
        </div>
      </section>

      {/* Accordion Block matching reference screenshot */}
      <section className="bg-[#e8f3ff]/40 flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-10 sm:py-16 lg:py-[72px] w-full border-y border-[rgba(3,10,3,0.06)]">
        <div className="flex flex-col gap-4 max-w-[960px] w-full">
          {sections.map((section, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={section.id}
                className="bg-white border border-[rgba(3,10,3,0.12)] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-200 hover:border-[#1e90ff]/40"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 sm:px-8 py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className="font-semibold text-[17px] sm:text-[19px] text-[#030a03] group-hover:text-[#1e90ff] transition-colors">
                    {section.title}
                  </span>
                  
                  <div className="size-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 group-hover:text-[#1e90ff] group-hover:border-[#1e90ff]/30 shrink-0 transition-all">
                    <span className="text-xl font-light leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-7 pt-2 border-t border-slate-100">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
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

          {/* Above Information Content */}
          <div className="relative z-10 flex flex-col gap-2 max-w-[600px]">
            <h3 className="font-bold text-[22px] sm:text-[28px] text-white tracking-[-0.3px]">
              Ready to work with a fiduciary?
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              Schedule a 30-minute discovery call to evaluate your family portfolio without sales pressure.
            </p>
          </div>
          <Link
            href="/book"
            className="relative z-10 bg-[#1e90ff] hover:bg-[#0077e6] text-white px-7 py-3 rounded-md font-semibold text-sm sm:text-base whitespace-nowrap transition-all shadow-md flex items-center gap-2 shrink-0 hover:shadow-lg"
          >
            <img src="/figma/call-white.svg" alt="" className="size-4" />
            <span>Get Started</span>
          </Link>
        </div>
      </section>

      <FigmaFooter />
    </div>
  );
}
