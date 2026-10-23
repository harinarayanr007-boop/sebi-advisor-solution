"use client";

import React from "react";

interface WhitepaceEmbedCodeProps {
  onOpenDemoModal?: () => void;
}

export default function WhitepaceEmbedCode({ onOpenDemoModal }: WhitepaceEmbedCodeProps) {
  return (
    <section
      id="client-portal"
      className="bg-[#043873] content-stretch flex flex-col lg:flex-row gap-[60px] lg:gap-[98px] items-center justify-between px-6 md:px-12 lg:px-[120px] xl:px-[220px] py-16 lg:py-[140px] relative w-full overflow-hidden"
      data-node-id="9:1936"
      data-name="Customise it to your needs"
    >
      
      {/* Left Column: Heading, Text, Button (Figma 9:1937) */}
      <div
        className="content-stretch flex flex-col gap-[60px] items-start relative z-10 w-full lg:max-w-[656px]"
        data-node-id="9:1937"
        data-name="Heading"
      >
        <div
          className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
          data-node-id="9:1938"
          data-name="Text-block"
        >
          {/* H1 Heading with Hand-Drawn Yellow Underline SVG (Figma 9:1939) */}
          <div className="relative inline-block w-full">
            <h2
              className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[72px] tracking-[-1.44px] text-white"
              data-node-id="9:1968"
            >
              Use as Extension
            </h2>
            {/* Hand-drawn yellow underline SVG from Figma */}
            <div className="w-[300px] sm:w-[460px] h-[24px] -mt-2 sm:-mt-3 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/0de19280079eed23e73be9b8398ddf6cfff2bade.svg"
                alt=""
                className="w-full h-full object-contain object-left"
              />
            </div>
          </div>

          {/* Paragraph text matching Figma 9:1969 */}
          <p
            className="font-['Inter'] font-normal leading-[30px] relative shrink-0 text-base sm:text-[18px] tracking-[-0.36px] text-white/90 w-full"
            data-node-id="9:1969"
          >
            No more waiting for end-of-month bank statements or scrolling through cluttered spreadsheets. Our private client portal gives your family instant, 24/7 visibility into total wealth performance, cash flows, and direct plan savings across all Indian depositories (NSDL & CDSL).
          </p>
        </div>

        {/* CTA Button matching Figma 9:1970 */}
        <button
          onClick={onOpenDemoModal}
          className="bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex gap-[10px] items-center justify-center px-[40px] py-[20px] relative rounded-[6px] shrink-0 transition-all duration-150 shadow-md hover:shadow-cyan-500/20 active:scale-95"
          data-node-id="9:1970"
          data-name="Btn-get-started"
        >
          <span
            className="[word-break:break-word] font-['Inter'] font-medium leading-[23px] not-italic relative shrink-0 text-[18px] text-white tracking-[-0.36px] whitespace-nowrap"
            data-node-id="9:1971"
          >
            Let’s Go
          </span>
          <div className="relative shrink-0 size-[14px]" data-node-id="9:1973">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/374fd3207ad71baf3edd723befcc3b1c82b90fd3.svg"
              alt="Arrow"
              className="block max-w-none size-full object-contain"
            />
          </div>
        </button>
      </div>

      {/* Right Column: Exact Container Image (Figma 107:52083 bg #c4defd w-[686px] h-[479px]) */}
      <div
        className="bg-[#c4defd] rounded-[8px] w-full lg:w-[600px] xl:w-[686px] min-h-[440px] lg:h-[479px] relative shrink-0 p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
        data-node-id="107:52083"
        data-name="Image"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#043873]/20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-['Inter'] font-bold text-xs uppercase tracking-wider text-[#043873]">
              Malhotra Family Trust Ledger
            </span>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#043873] text-[#ffe492] font-semibold">
            REAL-TIME SYNC
          </span>
        </div>

        {/* Total Net Worth Card */}
        <div className="bg-[#043873] text-white rounded-[8px] p-6 shadow-lg space-y-2">
          <div className="text-xs text-white/70 uppercase tracking-wider font-mono">
            Consolidated Family Net Worth
          </div>
          <div className="flex items-baseline justify-between">
            <div className="font-['Inter'] font-extrabold text-3xl sm:text-4xl text-[#ffe492]">
              ₹12,48,50,000
            </div>
            <div className="text-emerald-400 font-bold text-sm">
              +14.2% XIRR
            </div>
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] text-white/60">
            <span>Direct Mutual Funds: ₹7.2 Cr</span>
            <span>Sovereign G-Secs: ₹4.0 Cr</span>
            <span>SGB Gold: ₹1.28 Cr</span>
          </div>
        </div>

        {/* Tax Dossier & Rebalancing Audit */}
        <div className="space-y-2.5 text-xs">
          <div className="p-3 rounded-[6px] bg-white border border-gray-150 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span>📄</span>
              <span className="font-semibold text-gray-800">FY 2025-26 Capital Gains Tax Dossier</span>
            </div>
            <span className="font-bold text-emerald-600">Ready for CA</span>
          </div>

          <div className="p-3 rounded-[6px] bg-white border border-gray-150 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span className="font-semibold text-gray-800">Quarterly Fiduciary Rebalancing Audit</span>
            </div>
            <span className="font-semibold text-gray-500">Verified Oct 2026</span>
          </div>
        </div>

        <div className="pt-3 border-t border-[#043873]/20 flex justify-between items-center text-[11px] text-[#043873] font-medium">
          <span>🔒 256-bit Bank-Grade Encryption</span>
          <span className="font-mono text-[#043873] font-bold">SEBI INA000015678 Fiduciary Vault</span>
        </div>

      </div>

    </section>
  );
}
