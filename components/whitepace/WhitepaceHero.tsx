"use client";

import React, { useState } from "react";

interface WhitepaceHeroProps {
  onOpenDemoModal?: () => void;
}

export default function WhitepaceHero({ onOpenDemoModal }: WhitepaceHeroProps) {
  // Investor Portfolio Simulator States
  const [aumTier, setAumTier] = useState<number>(5); // In Crores (₹5 Cr)
  const [portfolioType, setPortfolioType] = useState<"preservation" | "balanced" | "growth">("balanced");
  const [isSimulatingUpload, setIsSimulatingUpload] = useState<boolean>(false);

  // Direct Plan Compounding Calculation vs 1.25% Distributor Commission Drag
  const directPlanSavingsLakhs = Math.round(aumTier * 1.25 * 10 * 0.85);

  return (
    <section
      id="hero"
      className="bg-[#043873] content-stretch flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-[120px] xl:px-[220px] py-16 lg:py-[140px] relative w-full overflow-hidden"
      data-node-id="9:102"
      data-name="Hero-section"
    >
      
      {/* Exact Figma Background Wave Mesh Element (9:103) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
        <div className="absolute -top-[10%] -left-[20%] w-[160%] h-[120%]">
          {/* Layered exact SVG wave curves from Figma */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/961e40678148e746b9987c9e36129cae9617dd19.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/b3dea67ca01ba52311e0b9723c2da8dc8fe3ccbd.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/443e0bdb1908705eaf213f262f6c3883273157a9.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/21f2d72b4dc98201ce49c57c746e2a4dcc1a5fe4.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        </div>
      </div>

      {/* Left Column: Heading, Copy, Button - 1:1 Matching Figma 9:170 */}
      <div
        className="content-stretch flex flex-col gap-[60px] items-start relative z-10 w-full lg:max-w-[656px]"
        data-node-id="9:170"
        data-name="Heading"
      >
        <div
          className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start not-italic relative shrink-0 text-white w-full"
          data-node-id="9:171"
          data-name="Text-block"
        >
          {/* Eyebrow Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-white/10 text-[#ffe492] font-['Inter'] font-semibold text-xs tracking-wider uppercase">
            <span>SEBI Registered Investment Adviser • Zero Commissions</span>
          </div>

          {/* H1 Heading - Exactly matching Figma 9:172 (Inter Bold 64px, tracking -1.28px) */}
          <h1
            className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[64px] tracking-[-1.28px] text-white w-full"
            data-node-id="9:172"
          >
            Unconflicted Wealth Stewardship for <span className="text-[#ffe492]">HNW Families</span>
          </h1>

          {/* Paragraph - Exactly matching Figma 9:173 (Inter Regular 18px, leading 30px, tracking -0.36px) */}
          <p
            className="font-['Inter'] font-normal leading-[30px] relative shrink-0 text-base sm:text-[18px] tracking-[-0.36px] text-white/90 w-full"
            data-node-id="9:173"
          >
            We do not sell products, take distributor kickbacks, or earn hidden commissions. We provide pure fee-only fiduciary advisory and invest 100% in direct zero-commission plans—protecting and compounding your family capital.
          </p>
        </div>

        {/* CTA Button - Exactly matching Figma 9:174 (bg #4f9cf9, p 20px, rounded 8px) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenDemoModal}
            className="bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex gap-[10px] items-center justify-center p-[20px] px-[40px] relative rounded-[8px] shrink-0 transition-all duration-150 shadow-xl hover:shadow-cyan-500/25 active:scale-95"
            data-node-id="9:174"
            data-name="Btn-free-trial"
          >
            <span
              className="[word-break:break-word] font-['Inter'] font-medium leading-[23px] not-italic relative shrink-0 text-[18px] text-white tracking-[-0.36px] whitespace-nowrap"
              data-node-id="9:175"
            >
              Start Confidential Intake (60s)
            </span>
            <div className="relative shrink-0 size-[10px]" data-node-id="9:176">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/54c2044f4e0835845b3339d0e72fdea762328b7c.svg"
                alt=""
                className="block max-w-none size-full object-contain"
              />
            </div>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById("pricing");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-['Inter'] font-medium text-[16px] text-white/80 hover:text-white px-4 py-3 transition text-center"
          >
            View Fee Schedule →
          </button>
        </div>

        {/* Institutional Trust Stats */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/15 w-full">
          <div>
            <div className="font-['Inter'] font-bold text-2xl lg:text-3xl text-[#ffe492]">₹0</div>
            <div className="text-xs text-white/70 mt-0.5">Commissions Accepted</div>
          </div>
          <div>
            <div className="font-['Inter'] font-bold text-2xl lg:text-3xl text-[#4f9cf9]">100%</div>
            <div className="text-xs text-white/70 mt-0.5">Direct Zero-Cost Plans</div>
          </div>
          <div>
            <div className="font-['Inter'] font-bold text-2xl lg:text-3xl text-white">₹45 Cr+</div>
            <div className="text-xs text-white/70 mt-0.5">Fiduciary AUM Stewarded</div>
          </div>
        </div>

      </div>

      {/* Right Column: Exact Figma Frame Container (9:179) - bg #c4defd h-[549px] w-[824px] */}
      <div
        className="bg-[#c4defd] rounded-[10px] w-full lg:w-[760px] xl:w-[824px] min-h-[520px] lg:h-[549px] relative shrink-0 p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden mt-12 lg:mt-0 z-10"
        data-node-id="9:179"
        data-name="Image-container"
      >
        {/* Top Header Card */}
        <div className="rounded-[8px] bg-[#043873] text-white p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-['Inter'] font-semibold text-xs tracking-wide uppercase text-white/90">
                Direct Plan Compounding Engine
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#ffe492]">
              SEBI INA000015678
            </span>
          </div>

          {/* Interactive Corpus Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline text-xs">
              <span className="text-white/70">Family Investable Capital:</span>
              <span className="font-['Inter'] font-bold text-xl text-[#ffe492]">₹{aumTier}.0 Crores</span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              step={1}
              value={aumTier}
              onChange={(e) => setAumTier(Number(e.target.value))}
              className="w-full accent-[#4f9cf9] cursor-pointer h-2 bg-white/20 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-white/50 font-mono">
              <span>₹1 Cr (Affluent)</span>
              <span>₹10 Cr (High Net Worth)</span>
              <span>₹25 Cr+ (Family Office)</span>
            </div>
          </div>
        </div>

        {/* Compounding Comparison Ledger */}
        <div className="rounded-[8px] bg-white text-[#212529] p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              10-Year Direct Plan Wealth Gain
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
              Zero Distributor Cut
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="font-['Inter'] font-extrabold text-3xl sm:text-4xl text-[#043873]">
              +₹{directPlanSavingsLakhs}.0 Lakhs
            </div>
            <div className="text-xs text-emerald-600 font-bold">
              Saved in Bank Churn
            </div>
          </div>

          <p className="text-[11px] text-gray-500 leading-normal">
            Calculated vs 1.25% mutual fund regular plan commission drag paid to private bank relationship managers.
          </p>
        </div>

        {/* Encrypted Statement Upload Box */}
        <div
          onClick={() => {
            setIsSimulatingUpload(true);
            setTimeout(() => {
              setIsSimulatingUpload(false);
              if (onOpenDemoModal) onOpenDemoModal();
            }, 1200);
          }}
          className="rounded-[8px] border-2 border-dashed border-[#043873]/30 hover:border-[#043873] bg-white/60 hover:bg-white p-4 text-center cursor-pointer transition-all duration-200"
        >
          {isSimulatingUpload ? (
            <div className="text-xs font-bold text-[#043873] animate-pulse">
              🔒 Encrypting CAS statement with AES-256 client-side vault...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl">📂</span>
              <div className="text-left">
                <div className="font-['Inter'] font-bold text-xs text-[#043873]">
                  Drop NSDL / CDSL CAS Statement for Instant Fee Diagnostic
                </div>
                <div className="text-[10px] text-gray-600">
                  Client-side encrypted. 100% confidential. No unencrypted WhatsApp.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA trigger */}
        <button
          onClick={onOpenDemoModal}
          className="w-full bg-[#043873] hover:bg-[#021C3E] text-white font-['Inter'] font-medium text-sm py-3 rounded-[6px] transition flex items-center justify-center gap-2"
        >
          <span>Schedule 30-Min Confidential Portfolio Diagnostic</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/figma/54c2044f4e0835845b3339d0e72fdea762328b7c.svg" alt="" className="w-2.5 h-2.5" />
        </button>

      </div>

    </section>
  );
}
