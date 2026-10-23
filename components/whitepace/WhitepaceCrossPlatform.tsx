"use client";

import React, { useState } from "react";

interface WhitepaceCrossPlatformProps {
  onOpenDemoModal?: () => void;
}

export default function WhitepaceCrossPlatform({ onOpenDemoModal }: WhitepaceCrossPlatformProps) {
  const [activeDevice, setActiveDevice] = useState<"mobile" | "tablet" | "desktop">("mobile");

  return (
    <section
      id="cross-platform"
      className="bg-[#043873] content-stretch flex flex-col items-center justify-center px-6 md:px-12 lg:px-[120px] xl:px-[220px] py-16 lg:py-[140px] relative w-full overflow-hidden"
      data-node-id="9:2297"
      data-name="Your-work"
    >
      
      {/* Exact Figma Background Concentric Spiral Mesh (Figma 9:2332) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 select-none">
        <div className="absolute -top-[30%] -left-[10%] w-[840px] h-[840px] -rotate-105">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/060bdafc0516058ad4d889a4d6dd08aa8dfbb0b6.svg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[840px] h-[840px] rotate-75">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/4d921838a4186f4869fea213df247c5ea74960d0.svg"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Heading & Text Block (Figma 9:2298) */}
      <div
        className="content-stretch flex flex-col gap-[40px] lg:gap-[60px] items-center relative z-10 w-full text-center"
        data-node-id="9:2298"
        data-name="Heading"
      >
        <div
          className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[1064px] max-w-full mx-auto"
          data-node-id="9:2299"
          data-name="Text-block"
        >
          {/* H1 Heading with Hand-Drawn Yellow Underline SVG (Figma 9:2300) */}
          <div className="relative inline-block">
            <h2
              className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[72px] tracking-[-1.44px] text-white"
              data-node-id="9:2329"
            >
              Your work, everywhere you are
            </h2>
            {/* Hand-drawn yellow underline SVG from Figma */}
            <div className="w-[300px] sm:w-[460px] h-[24px] -mt-2 sm:-mt-3 mx-auto pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/9a787478db589f5673f86d8a9b3b6b6fad4f4b32.svg"
                alt=""
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>

          <p
            className="font-['Inter'] font-normal leading-[30px] min-w-full not-italic relative shrink-0 text-white/90 text-base sm:text-[18px] tracking-[-0.36px]"
            data-node-id="9:2330"
          >
            Access your family investment ledger, asset allocations, and verified tax documents from your computer, phone, or tablet. Real-time synchronisation across iOS, Android, and macOS.
          </p>
        </div>

        {/* CTA Button matching Figma 9:2331 */}
        <button
          onClick={onOpenDemoModal}
          className="bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex gap-[10px] items-center justify-center px-[40px] py-[20px] relative rounded-[8px] shrink-0 transition-all duration-150 shadow-xl hover:shadow-cyan-500/20 active:scale-95"
          data-node-id="9:2331"
          data-name="Btn-try"
        >
          <span className="font-['Inter'] font-medium text-[18px] text-white tracking-[-0.36px] whitespace-nowrap">
            Access Private Portal
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

        {/* Device Mode Switcher */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-[8px] bg-[#021C3E] border border-white/20 mt-4">
          {(["mobile", "tablet", "desktop"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setActiveDevice(d)}
              className={`px-4 py-2 rounded-[6px] text-xs font-['Inter'] font-semibold transition-all ${
                activeDevice === d ? "bg-[#4f9cf9] text-white shadow-md" : "text-white/60 hover:text-white"
              }`}
            >
              {d === "mobile" ? "📱 Mobile View" : d === "tablet" ? "💻 Tablet View" : "🖥️ Desktop Portal"}
            </button>
          ))}
        </div>

        {/* Device Frame Display */}
        <div className="w-full max-w-[800px] mt-6 rounded-[12px] bg-[#021C3E] border-2 border-[#4f9cf9]/40 p-6 sm:p-8 shadow-2xl text-left">
          <div className="flex justify-between items-center pb-4 border-b border-white/10 text-xs text-white/60 font-mono">
            <span>portal.echveefinserv.com</span>
            <span className="text-emerald-400 font-bold">256-BIT ENCRYPTED</span>
          </div>

          <div className="py-6 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-white/70">Consolidated Liquid Portfolio:</span>
              <span className="font-['Inter'] font-bold text-2xl sm:text-3xl text-[#ffe492]">₹8,45,20,000</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-[6px] bg-white/5 border border-white/10">
                <div className="text-white/60">Equities</div>
                <div className="font-bold text-white mt-1">₹4.65 Cr</div>
              </div>
              <div className="p-3 rounded-[6px] bg-white/5 border border-white/10">
                <div className="text-white/60">G-Secs</div>
                <div className="font-bold text-white mt-1">₹2.50 Cr</div>
              </div>
              <div className="p-3 rounded-[6px] bg-white/5 border border-white/10">
                <div className="text-white/60">SGB Gold</div>
                <div className="font-bold text-white mt-1">₹85.0 L</div>
              </div>
              <div className="p-3 rounded-[6px] bg-white/5 border border-white/10">
                <div className="text-white/60">Overnight</div>
                <div className="font-bold text-white mt-1">₹45.2 L</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-white/50">
            <span>Custodian: NSDL & CDSL Direct Demat</span>
            <span className="text-[#ffe492]">SEBI RIA INA000015678</span>
          </div>
        </div>

      </div>

    </section>
  );
}
