"use client";

import React, { useState } from "react";

interface WhitepaceIntakeSuiteProps {
  onOpenDemoModal?: () => void;
}

export default function WhitepaceIntakeSuite({ onOpenDemoModal }: WhitepaceIntakeSuiteProps) {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    { title: "Direct Equity", pct: "55%", desc: "Large-cap blue-chip compounders & direct index leaders" },
    { title: "Sovereign Debt", pct: "30%", desc: "Direct RBI G-Secs & State Development Loans" },
    { title: "Sovereign Gold", pct: "10%", desc: "SGBs & Sovereign Gold Bonds with tax-free redemption" },
    { title: "Liquid Treasury", pct: "5%", desc: "Overnight liquidity runway & opportunistic dry powder" }
  ];

  return (
    <section
      id="work-management"
      className="bg-white content-stretch flex flex-col gap-[100px] lg:gap-[140px] items-start justify-center px-6 md:px-12 lg:px-[120px] xl:px-[220px] py-16 lg:py-[140px] relative w-full overflow-hidden"
      data-node-id="107:52087"
      data-name="Work-management"
    >
      
      {/* ============================================================== */}
      {/* PART 1: DISCIPLINED ASSET ALLOCATION (Figma 107:52088)         */}
      {/* ============================================================== */}
      <div
        className="content-stretch flex flex-col lg:flex-row gap-[60px] items-center justify-between relative w-full"
        data-node-id="107:52088"
        data-name="Content"
      >
        
        {/* Left Headline & Text Block */}
        <div
          className="content-stretch flex flex-col gap-[60px] items-start relative z-10 w-full lg:max-w-[656px]"
          data-node-id="107:52089"
          data-name="Headline"
        >
          <div
            className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
            data-node-id="107:52090"
            data-name="Text-block"
          >
            {/* H1 Heading with EXACT Yellow Underline SVG (107:52091) */}
            <div className="relative inline-block w-full">
              <h2
                className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[72px] tracking-[-1.44px] text-[#212529]"
                data-node-id="107:52120"
              >
                Project Management
              </h2>
              {/* Hand-drawn yellow underline SVG from Figma */}
              <div className="w-[320px] sm:w-[480px] h-[24px] -mt-2 sm:-mt-3 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/figma/a789b4cf820fca69f4d11f0e2989f3232efced9d.svg"
                  alt=""
                  className="w-full h-full object-contain object-left"
                />
              </div>
            </div>

            {/* Paragraph Text matching Figma 107:52121 */}
            <p
              className="font-['Inter'] font-normal leading-[30px] relative shrink-0 text-base sm:text-[18px] tracking-[-0.36px] text-[#212529]/80 w-full"
              data-node-id="107:52121"
            >
              Traditional private banks push high-commission insurance ULIPs and distributor mutual funds. As a SEBI Registered Investment Adviser, we accept zero AMC kickbacks. Every rupee is deployed into 100% direct plans, saving your family ~1.25% annually in broker churn.
            </p>
          </div>

          {/* Button matching Figma 107:52122 */}
          <button
            onClick={onOpenDemoModal}
            className="bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex gap-[10px] items-center justify-center px-[40px] py-[20px] relative rounded-[6px] shrink-0 transition-all duration-150 shadow-md hover:shadow-cyan-500/20 active:scale-95"
            data-node-id="107:52122"
            data-name="Btn-get-started"
          >
            <span
              className="[word-break:break-word] font-['Inter'] font-medium leading-[23px] not-italic relative shrink-0 text-[18px] text-white tracking-[-0.36px] whitespace-nowrap"
              data-node-id="107:52123"
            >
              Get Started
            </span>
            <div className="relative shrink-0 size-[14px]" data-node-id="107:52125">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/374fd3207ad71baf3edd723befcc3b1c82b90fd3.svg"
                alt="Arrow"
                className="block max-w-none size-full object-contain"
              />
            </div>
          </button>
        </div>

        {/* Right Image Container - Matching Figma 107:52128 (bg #c4defd w-[748px] h-[547px]) */}
        <div
          className="bg-[#c4defd] rounded-[8px] w-full lg:w-[680px] xl:w-[748px] min-h-[480px] lg:h-[547px] relative shrink-0 p-6 sm:p-8 flex flex-col justify-between shadow-xl"
          data-node-id="107:52128"
          data-name="Image-container"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#043873]/20">
            <div>
              <div className="font-mono text-xs font-bold text-[#043873] uppercase tracking-wider">
                Asset Allocation Architecture
              </div>
              <div className="font-['Inter'] font-bold text-xl text-[#212529]">
                HNW Balanced Fiduciary Mandate
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#043873] text-[#ffe492] font-mono text-xs font-semibold">
              Zero Distributor Bias
            </span>
          </div>

          {/* Allocation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
            {pillars.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePillar(idx)}
                className={`p-3 rounded-[6px] text-left transition-all ${
                  activePillar === idx
                    ? "bg-[#043873] text-white shadow-md font-bold"
                    : "bg-white/80 hover:bg-white text-gray-700 font-medium"
                }`}
              >
                <div className="text-[11px] uppercase tracking-wide truncate">{p.title}</div>
                <div className="text-lg font-bold mt-0.5">{p.pct}</div>
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <div className="bg-white rounded-[8px] p-5 shadow-sm space-y-2 border border-gray-150">
            <div className="font-['Inter'] font-bold text-sm text-[#043873] flex justify-between">
              <span>{pillars[activePillar].title} Mandate</span>
              <span className="text-emerald-600 font-bold">100% Direct Plan</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {pillars[activePillar].desc}
            </p>
            <div className="pt-2 text-[11px] text-gray-400 border-t border-gray-100 flex justify-between">
              <span>Rebalancing Trigger: Annual or ±5% Deviation</span>
              <span>Direct Demat Execution</span>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="p-3.5 rounded-[6px] bg-[#043873] text-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>Zero commissions accepted from AMCs or PMS providers</span>
            </div>
            <span className="text-[#ffe492] font-mono text-[11px]">INA000015678</span>
          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* PART 2: WORK TOGETHER / FAMILY OFFICE HUB (Figma 107:52345)     */}
      {/* ============================================================== */}
      <div
        id="work-together"
        className="content-stretch flex flex-col-reverse lg:flex-row gap-[60px] lg:gap-[100px] items-center justify-between relative w-full pt-8"
        data-node-id="107:52345"
        data-name="Content"
      >
        
        {/* Left Visual: Exact Circular Constellation Graphic (107:52346) */}
        <div
          className="relative shrink-0 w-full lg:w-[661px] h-[520px] sm:h-[661px] flex items-center justify-center select-none"
          data-node-id="107:52346"
          data-name="Work Together Image"
        >
          {/* Outer Ring Image from Figma (107:52347) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/aefa6d2beeeb6da0ff73d82d0c93959dd30d0e73.png"
              alt=""
              className="w-full h-full max-w-[661px] max-h-[661px] object-contain opacity-90"
            />
          </div>

          {/* Inner Ring Image from Figma (107:52348) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/b41d9e1d7451ca931ba0eb441412702ffc368d1b.png"
              alt=""
              className="w-[387px] h-[387px] object-contain opacity-80"
            />
          </div>

          {/* Orbiting Multi-Stakeholder Avatars: High-Trust Industry Professionals */}
          {/* 1. Chartered Accountant (Tax / Audit) - Top Left */}
          <div className="group absolute top-[5%] sm:top-[7%] left-[16%] sm:left-[19%] flex flex-col items-center z-20 cursor-pointer">
            <div className="w-[60px] sm:w-[76px] h-[60px] sm:h-[76px] rounded-full p-[2.5px] bg-white shadow-[0_10px_25px_rgba(4,56,115,0.18)] border-2 border-white ring-2 ring-[#FFDC4D] group-hover:scale-110 group-hover:ring-[#043873] transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/professionals/chartered_accountant.jpg"
                alt="Chartered Accountant (Tax & HUF)"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="mt-1 px-2.5 py-0.5 bg-white/95 backdrop-blur-sm border border-gray-200 text-[#043873] font-['Inter'] font-semibold text-[10px] sm:text-[11px] rounded-full shadow-sm whitespace-nowrap opacity-95 group-hover:opacity-100 group-hover:bg-[#043873] group-hover:text-white transition-all">
              Chartered Accountant
            </span>
          </div>

          {/* 2. Senior Estate & Trust Counsel - Top Right */}
          <div className="group absolute top-[8%] sm:top-[10%] right-[12%] sm:right-[15%] flex flex-col items-center z-20 cursor-pointer">
            <div className="w-[60px] sm:w-[76px] h-[60px] sm:h-[76px] rounded-full p-[2.5px] bg-white shadow-[0_10px_25px_rgba(4,56,115,0.18)] border-2 border-white ring-2 ring-[#4F9CF9] group-hover:scale-110 group-hover:ring-[#043873] transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/professionals/estate_lawyer.jpg"
                alt="Senior Estate & Trust Counsel"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="mt-1 px-2.5 py-0.5 bg-white/95 backdrop-blur-sm border border-gray-200 text-[#043873] font-['Inter'] font-semibold text-[10px] sm:text-[11px] rounded-full shadow-sm whitespace-nowrap opacity-95 group-hover:opacity-100 group-hover:bg-[#043873] group-hover:text-white transition-all">
              Estate & Trust Counsel
            </span>
          </div>

          {/* 3. SEBI Fiduciary Wealth Advisor - Bottom Left */}
          <div className="group absolute bottom-[12%] sm:bottom-[15%] left-[15%] sm:left-[17%] flex flex-col items-center z-20 cursor-pointer">
            <div className="w-[60px] sm:w-[76px] h-[60px] sm:h-[76px] rounded-full p-[2.5px] bg-white shadow-[0_10px_25px_rgba(4,56,115,0.18)] border-2 border-white ring-2 ring-[#FF6B6B] group-hover:scale-110 group-hover:ring-[#043873] transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/professionals/wealth_fiduciary.jpg"
                alt="SEBI Registered Fiduciary"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="mt-1 px-2.5 py-0.5 bg-white/95 backdrop-blur-sm border border-gray-200 text-[#043873] font-['Inter'] font-semibold text-[10px] sm:text-[11px] rounded-full shadow-sm whitespace-nowrap opacity-95 group-hover:opacity-100 group-hover:bg-[#043873] group-hover:text-white transition-all">
              SEBI Fiduciary Lead
            </span>
          </div>

          {/* 4. Family Office Director / Treasury CFO - Bottom Right */}
          <div className="group absolute bottom-[16%] sm:bottom-[18%] right-[12%] sm:right-[15%] flex flex-col items-center z-20 cursor-pointer">
            <div className="w-[60px] sm:w-[76px] h-[60px] sm:h-[76px] rounded-full p-[2.5px] bg-white shadow-[0_10px_25px_rgba(4,56,115,0.18)] border-2 border-white ring-2 ring-[#FFA048] group-hover:scale-110 group-hover:ring-[#043873] transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/professionals/family_office_cfo.jpg"
                alt="Family Office Director & Treasury"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="mt-1 px-2.5 py-0.5 bg-white/95 backdrop-blur-sm border border-gray-200 text-[#043873] font-['Inter'] font-semibold text-[10px] sm:text-[11px] rounded-full shadow-sm whitespace-nowrap opacity-95 group-hover:opacity-100 group-hover:bg-[#043873] group-hover:text-white transition-all">
              Family Office Director
            </span>
          </div>

          {/* Center Floating Card with Logo Icon (107:53606) */}
          <div
            className="relative z-10 bg-white rounded-[10px] shadow-[0px_4px_50px_-11px_rgba(0,0,0,0.25)] w-[100px] h-[100px] flex items-center justify-center p-4 border border-gray-100"
            data-node-id="107:53606"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/6aefec1f95d714dabeffd98711440a8dc41b49fb.svg"
              alt="Center Fiduciary Icon"
              className="w-[57px] h-[44px] object-contain"
            />
          </div>

        </div>

        {/* Right Headline & Text Block */}
        <div
          className="content-stretch flex flex-col gap-[60px] items-start relative z-10 w-full lg:max-w-[656px]"
          data-node-id="107:53614"
          data-name="Headline"
        >
          <div
            className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
            data-node-id="107:53615"
            data-name="Text-block"
          >
            {/* H1 Heading with Hand-Drawn Yellow Underline SVG (107:53640) */}
            <div className="relative inline-block w-full">
              <h2
                className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[72px] tracking-[-1.44px] text-[#212529]"
                data-node-id="107:53669"
              >
                Work together
              </h2>
              {/* Hand-drawn yellow underline SVG from Figma */}
              <div className="w-[280px] sm:w-[420px] h-[24px] -mt-2 sm:-mt-3 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/figma/53cc757ec85ab8730d9664dd85d08cecc4f0bf0a.svg"
                  alt=""
                  className="w-full h-full object-contain object-left"
                />
              </div>
            </div>

            {/* Paragraph Text matching Figma 107:53670 */}
            <p
              className="font-['Inter'] font-normal leading-[30px] relative shrink-0 text-base sm:text-[18px] tracking-[-0.36px] text-[#212529]/80 w-full"
              data-node-id="107:53670"
            >
              Consolidate your entire family ecosystem into a single unified ledger. We coordinate directly with your Chartered Accountant for advance tax filing, align corporate treasury with family trust deeds, and ensure seamless multi-generational estate succession without legal disputes.
            </p>
          </div>

          {/* Button matching Figma */}
          <button
            onClick={onOpenDemoModal}
            className="bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex gap-[10px] items-center justify-center px-[40px] py-[20px] relative rounded-[6px] shrink-0 transition-all duration-150 shadow-md hover:shadow-cyan-500/20 active:scale-95"
          >
            <span className="font-['Inter'] font-medium leading-[23px] text-[18px] text-white tracking-[-0.36px] whitespace-nowrap">
              Explore Family Office Mandate
            </span>
            <div className="relative shrink-0 size-[14px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/374fd3207ad71baf3edd723befcc3b1c82b90fd3.svg"
                alt="Arrow"
                className="block max-w-none size-full object-contain"
              />
            </div>
          </button>
        </div>

      </div>

    </section>
  );
}
