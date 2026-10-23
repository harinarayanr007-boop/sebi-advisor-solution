"use client";

import React, { useState } from "react";

interface WhitepaceCustomiseProps {
  onOpenDemoModal?: () => void;
}

export default function WhitepaceCustomise({ onOpenDemoModal }: WhitepaceCustomiseProps) {
  const [selectedPersona, setSelectedPersona] = useState<"founder" | "executive" | "family">("founder");

  const personas = {
    founder: {
      title: "Tech Founder / Business Exit",
      aum: "₹10 Cr – ₹25 Cr+ Liquid Cash",
      strategy: "Capital Preservation & Secondary Growth",
      equity: "45%",
      debt: "45%",
      gold: "10%",
      priority: "Prevent wealth erosion while building risk-free runway for your next venture."
    },
    executive: {
      title: "Senior Executive / Nearing Retirement",
      aum: "₹5 Cr – ₹15 Cr Corpus",
      strategy: "Inflation-Beating Cash Flow Architecture",
      equity: "35%",
      debt: "55%",
      gold: "10%",
      priority: "Predictable monthly cashflow with sovereign debt and zero equity panic."
    },
    family: {
      title: "Multi-Generational Family Office",
      aum: "₹25 Cr+ Consolidated Assets",
      strategy: "Dynastic Compounding & Estate Shield",
      equity: "65%",
      debt: "25%",
      gold: "10%",
      priority: "Succession planning across HUF, corporate LLPs, and family trust entities."
    }
  };

  const current = personas[selectedPersona];

  return (
    <section
      id="customise"
      className="bg-white content-stretch flex flex-col-reverse lg:flex-row gap-[60px] lg:gap-[98px] items-center justify-between px-6 md:px-12 lg:px-[120px] xl:px-[220px] py-16 lg:py-[140px] relative w-full overflow-hidden"
      data-node-id="9:4454"
      data-name="Customise it to your needs"
    >
      
      {/* Left Visual Container matching Figma 9:4455 (bg #c4defd w-[714px] h-[532px]) */}
      <div
        className="bg-[#c4defd] rounded-[8px] w-full lg:w-[620px] xl:w-[714px] min-h-[460px] lg:h-[532px] relative shrink-0 p-6 sm:p-8 flex flex-col justify-between shadow-xl"
        data-node-id="9:4455"
        data-name="Image container"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#043873]/20">
          <div className="font-['Inter'] font-bold text-sm text-[#043873] uppercase tracking-wider">
            Family Goal Mandate Designer
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#043873] text-[#ffe492] font-semibold">
            Interactive Simulator
          </span>
        </div>

        {/* Persona Selector Buttons */}
        <div className="grid grid-cols-3 gap-2 my-2">
          {(["founder", "executive", "family"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPersona(p)}
              className={`p-2.5 rounded-[6px] text-center text-xs font-['Inter'] transition-all ${
                selectedPersona === p
                  ? "bg-[#043873] text-white font-bold shadow-md"
                  : "bg-white/80 hover:bg-white text-gray-700 font-medium"
              }`}
            >
              {p === "founder" ? "Startup Exit" : p === "executive" ? "Retirement" : "Family Office"}
            </button>
          ))}
        </div>

        {/* Live Mandate Result Card */}
        <div className="rounded-[8px] p-5 bg-[#043873] text-white shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/15">
            <div>
              <div className="font-['Inter'] font-bold text-base text-[#ffe492]">{current.title}</div>
              <div className="text-xs text-white/70">{current.aum}</div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 font-mono text-[#ffe492]">
              CUSTOM ARCHITECTURE
            </span>
          </div>

          <p className="text-xs text-white/90 leading-relaxed">
            <strong className="text-[#ffe492]">Strategic Mandate: </strong>
            {current.priority}
          </p>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div className="p-2 rounded bg-white/5">
              <div className="text-[10px] text-white/60">Equity</div>
              <div className="font-bold text-sm text-white">{current.equity}</div>
            </div>
            <div className="p-2 rounded bg-white/5">
              <div className="text-[10px] text-white/60">Debt</div>
              <div className="font-bold text-sm text-white">{current.debt}</div>
            </div>
            <div className="p-2 rounded bg-white/5">
              <div className="text-[10px] text-white/60">Gold / Cash</div>
              <div className="font-bold text-sm text-white">{current.gold}</div>
            </div>
          </div>
        </div>

        {/* Bottom Guarantee */}
        <div className="p-3 rounded-[6px] bg-white text-[#212529] flex items-center justify-between text-xs shadow-sm">
          <span className="font-medium text-gray-700">✓ 100% Direct Plans • Zero AMC Distributor Commissions</span>
          <span className="font-mono text-[#043873] font-bold">SEBI INA000015678</span>
        </div>

      </div>

      {/* Right Column: Heading, Copy, Button (Figma 9:4670) */}
      <div
        className="content-stretch flex flex-col gap-[60px] items-start relative z-10 w-full lg:max-w-[656px]"
        data-node-id="9:4670"
        data-name="Heading"
      >
        <div
          className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
          data-node-id="9:4671"
          data-name="Text-block"
        >
          {/* H1 Heading with Hand-Drawn Yellow Underline SVG (Figma 9:4672) */}
          <div className="relative inline-block w-full">
            <h2
              className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[72px] tracking-[-1.44px] text-[#212529]"
              data-node-id="9:4701"
            >
              Customise it to your needs
            </h2>
            {/* Hand-drawn yellow underline SVG from Figma */}
            <div className="w-[320px] sm:w-[500px] h-[24px] -mt-2 sm:-mt-3 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/47e80256beb482e894b6d452fed9e6f2b7a7a313.svg"
                alt=""
                className="w-full h-full object-contain object-left"
              />
            </div>
          </div>

          {/* Paragraph matching Figma 9:4702 */}
          <p
            className="font-['Inter'] font-normal leading-[30px] relative shrink-0 text-base sm:text-[18px] tracking-[-0.36px] text-[#212529]/80 w-full"
            data-node-id="9:4702"
          >
            Every family’s balance sheet has unique constraints. Whether structuring cash runway after a startup secondary sale, managing retirement cash flows for senior medical doctors, or executing cross-border LRS remittances, our fiduciary mandates are custom engineered around your goals.
          </p>
        </div>

        {/* CTA Button matching Figma 9:4703 */}
        <button
          onClick={onOpenDemoModal}
          className="bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex gap-[10px] items-center justify-center px-[40px] py-[20px] relative rounded-[8px] shrink-0 transition-all duration-150 shadow-md hover:shadow-cyan-500/20 active:scale-95"
          data-node-id="9:4703"
          data-name="Btn-get-started"
        >
          <span
            className="[word-break:break-word] font-['Inter'] font-medium leading-[23px] not-italic relative shrink-0 text-[18px] text-white tracking-[-0.36px] whitespace-nowrap"
            data-node-id="9:4704"
          >
            Let’s Go
          </span>
          <div className="relative shrink-0 size-[14px]" data-node-id="9:4706">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/374fd3207ad71baf3edd723befcc3b1c82b90fd3.svg"
              alt="Arrow"
              className="block max-w-none size-full object-contain"
            />
          </div>
        </button>
      </div>

    </section>
  );
}
