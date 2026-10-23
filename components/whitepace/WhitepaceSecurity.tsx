"use client";

import React from "react";

interface WhitepaceSecurityProps {
  onOpenDemoModal?: () => void;
}

export default function WhitepaceSecurity({ onOpenDemoModal }: WhitepaceSecurityProps) {
  return (
    <section
      id="security"
      className="bg-white content-stretch flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-[120px] xl:px-[220px] py-16 lg:py-[140px] relative w-full overflow-hidden"
      data-node-id="9:2362"
      data-name="Your data"
    >
      
      {/* Left Column: Heading, Text, Button (Figma 9:2363) */}
      <div
        className="content-stretch flex flex-col gap-[60px] items-start relative z-10 w-full lg:max-w-[656px]"
        data-node-id="9:2363"
        data-name="Heading"
      >
        <div
          className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
          data-node-id="9:2364"
          data-name="Text-block"
        >
          {/* H1 Heading with Hand-Drawn Yellow Underline SVG (Figma 9:2365) */}
          <div className="relative inline-block w-full">
            <h2
              className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[72px] tracking-[-1.44px] text-[#212529]"
              data-node-id="9:2394"
            >
              100% your data
            </h2>
            {/* Hand-drawn yellow underline SVG from Figma */}
            <div className="w-[300px] sm:w-[460px] h-[24px] -mt-2 sm:-mt-3 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/1e1b23593a02e850fb816ae1fbf1f0fec1e896e6.svg"
                alt=""
                className="w-full h-full object-contain object-left"
              />
            </div>
          </div>

          <p
            className="font-['Inter'] font-normal leading-[30px] relative shrink-0 text-base sm:text-[18px] tracking-[-0.36px] text-[#212529]/80 w-full"
            data-node-id="9:2395"
          >
            We never touch, hold, or pool your family’s investment capital. Your money never enters our bank accounts. Every rupee is invested directly in your own name with regulated national depositories (NSDL / CDSL / RBI).
          </p>

          <div className="space-y-3 w-full pt-2">
            {[
              "Direct Demat Holding: All shares, bonds, and direct mutual fund units sit in your PAN folio",
              "SEBI Registered INA000015678: Fiduciary code of conduct prohibiting commission rebates",
              "Client-Side AES-256 Vault: Confidential tax records stored strictly on Indian servers"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#EBF4FE] text-[#043873] flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </span>
                <span className="text-sm font-medium text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button matching Figma 9:2396 */}
        <button
          onClick={onOpenDemoModal}
          className="bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex gap-[10px] items-center justify-center px-[40px] py-[20px] relative rounded-[8px] shrink-0 transition-all duration-150 shadow-md hover:shadow-cyan-500/20 active:scale-95"
          data-node-id="9:2396"
          data-name="Btn-try"
        >
          <span className="font-['Inter'] font-medium text-[18px] text-white tracking-[-0.36px] whitespace-nowrap">
            Read more
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

      {/* Right Column: Exact Figma Data Protection Graphic (Figma 9:2402) */}
      <div
        className="relative shrink-0 w-full lg:w-[680px] h-[400px] sm:h-[480px] flex items-center justify-center mt-12 lg:mt-0 select-none"
        data-node-id="9:2402"
        data-name="Element"
      >
        {/* Semicircle dome from Figma (9:2403) */}
        <div className="absolute top-[10%] w-[90%] max-w-[600px] h-[300px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/11cd1770db03f10cbd8d6cdf44086acf607f39b2.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Horizontal base line (9:2404) */}
        <div className="absolute top-[72%] w-[90%] max-w-[600px] h-0 border-b-2 border-[#a7cefc]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/ce769ec92d320c861636f58cc09ab5c12b0074eb.svg"
            alt=""
            className="w-full"
          />
        </div>

        {/* Floating Dashed Protection Center Card (9:2407) */}
        <div className="absolute top-[56%] left-1/2 -translate-x-1/2 w-[136px] h-[136px] border-2 border-dashed border-[#a7cefc] rounded-[10px] flex items-center justify-center">
          <div className="bg-white rounded-[10px] shadow-[0px_4px_50px_-11px_rgba(0,0,0,0.2)] w-[82px] h-[82px] flex items-center justify-center p-3 border border-gray-100">
            {/* Database & Lock Icon */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/72b66524c3c0f33f11f1373b525bfc0b29ff218a.svg"
              alt="Security"
              className="w-[48px] h-[48px] object-contain"
            />
          </div>
        </div>

        {/* Left Side Protection Node (9:2409) */}
        <div className="absolute top-[62%] left-[10%] bg-white rounded-[10px] shadow-[0px_4px_50px_-11px_rgba(0,0,0,0.2)] w-[82px] h-[82px] flex flex-col items-center justify-center p-2 border border-gray-150">
          <span className="font-['Inter'] font-bold text-xs text-[#043873]">NSDL</span>
          <span className="text-[9px] text-gray-500 font-mono">Demat</span>
        </div>

        {/* Right Side Protection Node */}
        <div className="absolute top-[62%] right-[10%] bg-white rounded-[10px] shadow-[0px_4px_50px_-11px_rgba(0,0,0,0.2)] w-[82px] h-[82px] flex flex-col items-center justify-center p-2 border border-gray-150">
          <span className="font-['Inter'] font-bold text-xs text-[#043873]">CDSL</span>
          <span className="text-[9px] text-gray-500 font-mono">Custody</span>
        </div>

      </div>

    </section>
  );
}
