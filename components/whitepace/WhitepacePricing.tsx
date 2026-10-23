"use client";

import React, { useState } from "react";

interface WhitepacePricingProps {
  onOpenDemoModal?: () => void;
}

export default function WhitepacePricing({ onOpenDemoModal }: WhitepacePricingProps) {
  const [feeModel, setFeeModel] = useState<"flat" | "percentage">("flat");

  return (
    <section
      id="pricing"
      className="bg-white content-stretch flex flex-col gap-[60px] items-center justify-center px-6 md:px-12 lg:px-[120px] xl:px-[220px] py-16 lg:py-[140px] relative w-full overflow-hidden"
      data-node-id="9:2149"
      data-name="Pricing"
    >
      
      {/* Section Heading & Subtitle (Figma 9:2150) */}
      <div
        className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full text-center"
        data-node-id="9:2150"
        data-name="Heading"
      >
        <div className="relative inline-block">
          <h2
            className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[72px] tracking-[-1.44px] text-[#212529]"
            data-node-id="9:2180"
          >
            Choose Your Plan
          </h2>
          {/* Hand-drawn yellow underline SVG from Figma (9:2151) */}
          <div className="w-[280px] sm:w-[440px] h-[24px] -mt-2 sm:-mt-3 mx-auto pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/0272eadb4b7453d84f5fede4f2af390b164aefd3.svg"
              alt=""
              className="w-full h-full object-contain object-center"
            />
          </div>
        </div>

        <p
          className="font-['Inter'] font-normal leading-[30px] not-italic relative shrink-0 text-[#212529]/80 text-base sm:text-[18px] tracking-[-0.36px] w-[979px] max-w-full mx-auto"
          data-node-id="9:2181"
        >
          Private banks claim wealth advice is &quot;free&quot; while secretly shaving 1%–2% in mutual fund commissions and distribution cuts from your corpus every single year. We believe in total transparency.
        </p>

        {/* Flat vs Percentage Switcher */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-gray-100 border border-gray-200 mt-2">
          <button
            onClick={() => setFeeModel("flat")}
            className={`px-5 py-2 rounded-full text-xs font-['Inter'] font-semibold transition-all ${
              feeModel === "flat" ? "bg-[#043873] text-white shadow-sm" : "text-gray-600 hover:text-black"
            }`}
          >
            Flat Annual Retainer
          </button>
          <button
            onClick={() => setFeeModel("percentage")}
            className={`px-5 py-2 rounded-full text-xs font-['Inter'] font-semibold transition-all ${
              feeModel === "percentage" ? "bg-[#043873] text-white shadow-sm" : "text-gray-600 hover:text-black"
            }`}
          >
            % of AUM
          </button>
        </div>
      </div>

      {/* Price list Grid - 1:1 Matching Figma 9:2182 */}
      <div
        className="content-stretch flex flex-col lg:flex-row gap-[32px] items-center justify-center relative shrink-0 w-full max-w-[1480px] mx-auto"
        data-node-id="9:2182"
        data-name="Price list"
      >
        
        {/* ============================================================ */}
        {/* CARD 1: PRIVATE CLIENT ADVISORY (Figma 9:2183)               */}
        {/* ============================================================ */}
        <div
          className="bg-white border border-[#ffe492] border-solid content-stretch flex flex-col gap-[25px] items-start justify-center w-full lg:flex-1 px-[32px] xl:px-[44px] py-[40px] relative rounded-[10px] shadow-sm hover:shadow-md transition-shadow"
          data-node-id="9:2183"
          data-name="Price-board"
        >
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 text-[#212529] w-full" data-node-id="9:2184">
            <span className="font-['Inter'] font-semibold leading-[36px] relative shrink-0 text-[24px] text-[#212529]">
              Private Client
            </span>
            <div className="font-['Inter'] font-bold leading-[normal] relative shrink-0 text-[36px] tracking-[-0.72px] text-[#212529]">
              {feeModel === "flat" ? "₹50,000" : "0.60%"}
            </div>
            <span className="font-['Inter'] font-medium leading-[23px] relative shrink-0 text-[16px] tracking-[-0.36px] text-gray-600">
              {feeModel === "flat" ? "/ year • Saves ~₹5.2 Lakhs in broker cuts" : "p.a. on Direct Demat Assets"}
            </span>
          </div>

          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full pt-2" data-node-id="9:2188">
            {[
              "100% Direct Zero-Commission Mutual Funds",
              "Custom Asset Allocation & Risk Profiling (RPQ)",
              "Sovereign Gold Bonds & G-Sec Allocation",
              "Quarterly Fiduciary Performance & Rebalancing",
              "Consolidated Capital Gains Tax Pack for CA",
              "Biometric Encrypted Client Portal Access"
            ].map((text, i) => (
              <div key={i} className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                <div className="relative shrink-0 size-[18px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/figma/f7a5fd1e22b77e50990403bfe1bbbdbf1d653e47.svg"
                    alt=""
                    className="block max-w-none size-full object-contain"
                  />
                </div>
                <span className="[word-break:break-word] flex-1 font-['Inter'] font-normal leading-[20px] text-[#212529] text-[16px] tracking-[-0.32px]">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenDemoModal}
            className="w-full bg-white hover:bg-gray-50 border border-[#ffe492] border-solid content-stretch flex items-center justify-center px-[40px] py-[16px] relative rounded-[8px] shrink-0 mt-4 transition active:scale-95"
            data-node-id="9:2219"
          >
            <span className="font-['Inter'] font-medium leading-[normal] text-[#212529] text-[16px] tracking-[-0.32px] whitespace-nowrap">
              Get Started
            </span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* CARD 2: HNW PROMOTER & FOUNDER (FEATURED TALLER py-[80px])   */}
        {/* Figma 9:2221 bg #043873 drop-shadow px-[44px] py-[80px]      */}
        {/* ============================================================ */}
        <div
          className="bg-[#043873] drop-shadow-[0px_4px_25px_rgba(0,0,0,0.15)] content-stretch flex flex-col gap-[25px] items-start justify-center w-full lg:flex-1 px-[32px] xl:px-[44px] py-[60px] lg:py-[80px] relative rounded-[10px] text-white z-10 border border-[#4f9cf9]/40"
          data-node-id="9:2221"
          data-name="Price-board"
        >
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full" data-node-id="9:2222">
            <div className="flex justify-between items-center w-full">
              <span className="font-['Inter'] font-semibold leading-[36px] relative shrink-0 text-[24px] text-white">
                HNW Promoter & Founder
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded bg-[#ffe492] text-[#043873] font-bold uppercase font-mono">
                POPULAR
              </span>
            </div>
            <div className="font-['Inter'] font-bold leading-[normal] relative shrink-0 text-[#ffe492] text-[36px] tracking-[-0.72px]">
              {feeModel === "flat" ? "₹1,00,000" : "0.40%"}
            </div>
            <span className="font-['Inter'] font-medium leading-[23px] relative shrink-0 text-[16px] tracking-[-0.36px] text-white/90">
              {feeModel === "flat" ? "/ year • Saves ~₹18.5 Lakhs in broker cuts" : "p.a. on Direct Demat Assets"}
            </span>
          </div>

          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full pt-2" data-node-id="9:2226">
            {[
              "Everything in Private Client +",
              "Bespoke Direct Blue-Chip Equity Strategy",
              "Startup Exit & Corporate Liquidity Runway",
              "Multi-Entity Consolidation (HUF & Trusts)",
              "Dedicated Lead Partner (Quarterly In-Person)",
              "Direct Coordination with Family CA & Legal",
              "Priority WhatsApp & Direct Desk Access"
            ].map((text, i) => (
              <div key={i} className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                <div className="relative shrink-0 size-[18px]">
                  {/* Light checkmark icon for blue card */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/figma/043175806193580a7500084a76f22401b7cfc342.svg"
                    alt=""
                    className="block max-w-none size-full object-contain"
                  />
                </div>
                <span className="[word-break:break-word] flex-1 font-['Inter'] font-medium leading-[23px] text-white text-[16px] tracking-[-0.36px]">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenDemoModal}
            className="w-full bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex items-center justify-center px-[40px] py-[16px] relative rounded-[8px] shrink-0 mt-4 transition shadow-lg active:scale-95"
            data-node-id="9:2257"
          >
            <span className="font-['Inter'] font-medium leading-[normal] text-white text-[16px] tracking-[-0.32px] whitespace-nowrap">
              Get Started
            </span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* CARD 3: MULTI-FAMILY OFFICE (Figma 9:2259)                   */}
        {/* ============================================================ */}
        <div
          className="bg-white border border-[#ffe492] border-solid content-stretch flex flex-col gap-[25px] items-start justify-center w-full lg:flex-1 px-[32px] xl:px-[44px] py-[40px] relative rounded-[10px] shadow-sm hover:shadow-md transition-shadow"
          data-node-id="9:2259"
          data-name="Price-board"
        >
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 text-[#212529] w-full" data-node-id="9:2260">
            <span className="font-['Inter'] font-semibold leading-[36px] relative shrink-0 text-[24px] text-[#212529]">
              Family Office Mandate
            </span>
            <div className="font-['Inter'] font-bold leading-[normal] relative shrink-0 text-[36px] tracking-[-0.72px] text-[#212529]">
              {feeModel === "flat" ? "₹2,50,000" : "0.25%"}
            </div>
            <span className="font-['Inter'] font-medium leading-[23px] relative shrink-0 text-[16px] tracking-[-0.36px] text-gray-600">
              {feeModel === "flat" ? "/ year • Saves ~₹45+ Lakhs in broker cuts" : "p.a. on Institutional Assets"}
            </span>
          </div>

          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full pt-2" data-node-id="9:2264">
            {[
              "Dedicated External CIO for Family Committee",
              "Dynastic Succession & Living Trust Structuring",
              "Due Diligence on AIFs & Private Credit",
              "Global Architecture (LRS Compliant)",
              "Quarterly Macro & Governance Meetings",
              "Full Strict Confidentiality Non-Disclosure (NDA)"
            ].map((text, i) => (
              <div key={i} className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                <div className="relative shrink-0 size-[18px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/figma/f7a5fd1e22b77e50990403bfe1bbbdbf1d653e47.svg"
                    alt=""
                    className="block max-w-none size-full object-contain"
                  />
                </div>
                <span className="[word-break:break-word] flex-1 font-['Inter'] font-normal leading-[20px] text-[#212529] text-[16px] tracking-[-0.32px]">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenDemoModal}
            className="w-full bg-white hover:bg-gray-50 border border-[#ffe492] border-solid content-stretch flex items-center justify-center px-[40px] py-[16px] relative rounded-[8px] shrink-0 mt-4 transition active:scale-95"
          >
            <span className="font-['Inter'] font-medium leading-[normal] text-[#212529] text-[16px] tracking-[-0.32px] whitespace-nowrap">
              Get Started
            </span>
          </button>
        </div>

      </div>

    </section>
  );
}
