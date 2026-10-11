"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import FigmaNavbar from "@/components/FigmaNavbar";
import FigmaFooter from "@/components/FigmaFooter";

export default function InvestorCharterPage() {
  const dos = [
    "Always deal with SEBI registered Investment Advisers (RIA) only.",
    "Verify the registration certificate of the Investment Adviser on the SEBI portal before engagement.",
    "Ensure you sign a formal Investment Advisory Agreement outlining scope, fees, and responsibilities.",
    "Complete the mandatory Risk Profiling Questionnaire (RPQ) transparently and accurately.",
    "Insist on written advisory notes and rationales for all recommended asset allocation decisions.",
    "Pay advisory fees solely through official banking channels (NEFT/RTGS/UPI) with proper tax receipts.",
  ];

  const donts = [
    "Do not deal with unregistered entities or social media 'tipsters' offering guaranteed returns.",
    "Do not provide power of attorney or trading login credentials to any adviser to execute trades.",
    "Do not pay fees into personal cash accounts or without formal invoices with GST details.",
    "Do not expect or demand assured, risk-free, or guaranteed market returns from any intermediary.",
    "Do not invest in complex derivative products without understanding your risk capacity.",
    "Do not hesitate to escalate unresolved complaints to SEBI SCORES or SMART ODR portal.",
  ];

  return (
    <div className="flex flex-col items-start relative w-full bg-white text-[#030a03]">
      <FigmaNavbar />

      {/* Hero Block */}
      <section className="bg-white flex items-center justify-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[96px] w-full border-b border-[#030a03]/5">
        <div className="flex flex-col gap-6 items-start max-w-[1280px] w-full">
          <div className="flex items-center">
            <span className="font-semibold text-[16px] leading-[1.5] text-[#1e90ff]">
              SEBI Mandate &bull; Circular Ref: SEBI/HO/IMD/IMD-II CIS/P/CIR/2021/0686
            </span>
          </div>
          <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.15] text-[#030a03] tracking-[-0.03em] max-w-[960px]">
            Investor Charter for Investment Advisers
          </h1>
          <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80 max-w-[800px]">
            In accordance with SEBI guidelines, this Charter outlines the rights, responsibilities, and dispute resolution mechanisms available to clients engaging SEBI Registered Investment Advisers.
          </p>
        </div>
      </section>

      {/* Vision & Mission Block */}
      <section className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[64px] items-start max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">Pillars of Fiduciary Duty</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              Vision &amp; Mission of Investment Advisers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-[32px] w-full">
            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-8 sm:p-[40px] flex flex-col gap-4 rounded-sm">
              <span className="font-semibold text-[20px] text-[#1e90ff]">A. Vision Statement</span>
              <p className="font-normal text-[16px] leading-[1.6] text-[#030a03]">
                To protect the interests of investors in securities and to promote the development of, and to regulate the securities market by fostering transparent, unbiased, and professional investment advisory services in India.
              </p>
            </div>

            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-8 sm:p-[40px] flex flex-col gap-4 rounded-sm">
              <span className="font-semibold text-[20px] text-[#1e90ff]">B. Mission Statement</span>
              <p className="font-normal text-[16px] leading-[1.6] text-[#030a03]">
                To provide tailored investment advice solely based on the client&apos;s financial goals, investment horizon, and risk tolerance, maintaining true fiduciary independence, without receiving commissions or promoting third-party products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Rights Block */}
      <section className="bg-white flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[64px] items-start max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">Statutory Protections</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              Your Rights as an Investor
            </h2>
            <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80">
              Under SEBI (Investment Advisers) Regulations, 2013, every client is entitled to the following statutory rights:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[32px] w-full">
            {[
              {
                num: "01",
                title: "Right to Transparent Assessment",
                desc: "Right to be asked about your financial situation, risk profile, and investment goals before any recommendation is rendered.",
              },
              {
                num: "02",
                title: "Right to Written Rationale",
                desc: "Right to receive a written investment advisory report containing complete rationales for recommended allocations.",
              },
              {
                num: "03",
                title: "Right to Conflict-Free Advice",
                desc: "Right to know all actual or potential conflicts of interest, and zero commission kickbacks from any product providers.",
              },
              {
                num: "04",
                title: "Right to Direct Plan Execution",
                desc: "Right to receive recommendations executed exclusively in Direct Plans of mutual funds, eliminating intermediary expense ratios.",
              },
              {
                num: "05",
                title: "Right to Complete Privacy",
                desc: "Right to maintain strict confidentiality of your financial details, PAN records, and investment holdings.",
              },
              {
                num: "06",
                title: "Right to Redressal & SCORES",
                desc: "Right to escalate grievances to the Principal Officer, followed by SEBI SCORES portal and SMART Online Dispute Resolution (ODR).",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.12)] p-6 sm:p-8 flex flex-col gap-3 rounded-sm">
                <span className="font-mono font-bold text-[18px] text-[#1e90ff]">{item.num}</span>
                <h3 className="font-semibold text-[20px] text-[#030a03]">{item.title}</h3>
                <p className="font-normal text-[15px] leading-[1.5] text-[#030a03]/85">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dos and Don'ts Block */}
      <section className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[64px] items-start max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">Operational Guidelines</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              DOs and DON&apos;Ts for Investors
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[40px] w-full">
            {/* DOs Card */}
            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-6 sm:p-10 flex flex-col gap-6 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                  &check;
                </div>
                <h3 className="font-bold text-[24px] text-emerald-800">DOs</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {dos.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-[15px] leading-[1.5] text-[#030a03]">
                    <span className="text-emerald-600 font-bold shrink-0">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'Ts Card */}
            <div className="bg-white border border-[rgba(3,10,3,0.15)] p-6 sm:p-10 flex flex-col gap-6 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold">
                  &times;
                </div>
                <h3 className="font-bold text-[24px] text-rose-800">DON&apos;Ts</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {donts.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-[15px] leading-[1.5] text-[#030a03]">
                    <span className="text-rose-600 font-bold shrink-0">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Grievance Redressal Mechanism */}
      <section className="bg-white flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-8 max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">Dispute Resolution</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              Grievance Escalation Matrix
            </h2>
            <p className="font-normal text-[16px] leading-[1.5] text-[#030a03]/80">
              If you have any grievance or complaint regarding our investment advisory services, please follow these sequential escalation channels:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.15)] p-6 flex flex-col gap-3 rounded-sm">
              <span className="font-bold text-[#1e90ff]">Level 1: Internal Redressal</span>
              <p className="text-[15px] leading-[1.5] text-[#030a03]">
                Contact our Principal &amp; Compliance Officer directly:
                <br />
                <strong>Dr. Aurum Mamal</strong>
                <br />
                Email: <a href="mailto:advice@sebiadvisor.in" className="underline">advice@sebiadvisor.in</a>
                <br />
                Phone: +91 98200 12345
                <br />
                Response timeline: Within 21 working days.
              </p>
            </div>

            <div className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.15)] p-6 flex flex-col gap-3 rounded-sm">
              <span className="font-bold text-[#1e90ff]">Level 2: SEBI SCORES Portal</span>
              <p className="text-[15px] leading-[1.5] text-[#030a03]">
                If your grievance is not resolved within 30 days, lodge it on SEBI SCORES:
                <br />
                Web: <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="underline">scores.sebi.gov.in</a>
                <br />
                SEBI Toll Free Helpline: 1800 22 7575 / 1800 266 7575
                <br />
                SEBI Office: SEBI Bhavan, BKC, Mumbai 400051.
              </p>
            </div>

            <div className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.15)] p-6 flex flex-col gap-3 rounded-sm">
              <span className="font-bold text-[#1e90ff]">Level 3: SMART ODR Portal</span>
              <p className="text-[15px] leading-[1.5] text-[#030a03]">
                In case of dissatisfaction with SCORES resolution, initiate online conciliation or arbitration via SMART ODR:
                <br />
                Web: <a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="underline">smartodr.in</a>
                <br />
                SEBI Online Dispute Resolution Circular No. SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131.
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
            <span className="font-semibold text-[14px] sm:text-[16px] text-[#1e90ff]">Fiduciary Governance</span>
            <h2 className="font-bold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.2] text-white tracking-[-0.3px]">
              Experience Fiduciary Transparency First-Hand
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-white/85">
              Schedule a confidential 30-minute discovery conversation to review your rights under the Investor Charter and explore our conflict-free advisory retainer.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <Link
              href="/book"
              className="bg-[#1e90ff] hover:bg-[#0077e6] text-white px-8 py-3.5 font-medium text-[16px] text-center rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <img src="/figma/call-white.svg" alt="" className="size-4 shrink-0" />
              <span>Book Discovery Call</span>
            </Link>
          </div>
        </div>
      </section>

      <FigmaFooter />
    </div>
  );
}
