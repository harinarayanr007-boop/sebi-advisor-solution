"use client";

import React from "react";

interface WhitepaceIntegrationsProps {
  onOpenDemoModal?: () => void;
}

export default function WhitepaceIntegrations({ onOpenDemoModal }: WhitepaceIntegrationsProps) {
  return (
    <section
      id="apps"
      className="bg-[#043873] content-stretch flex flex-col-reverse lg:flex-row gap-[60px] lg:gap-[100px] items-center justify-between px-6 md:px-12 lg:px-[120px] xl:px-[220px] py-16 lg:py-[140px] relative w-full overflow-hidden"
      data-node-id="9:2521"
      data-name="Apps"
    >
      
      {/* Exact Figma Background Wave Mesh (9:2522) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
        <div className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/b23ae1f05d365d162539a498769faf486d4d5849.svg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Left Visual: Exact Circular Ecosystem Orbit Image (9:2521) */}
      <div className="relative shrink-0 w-full lg:w-[580px] h-[360px] sm:h-[460px] flex items-center justify-center select-none z-10">
        <div className="w-full max-w-[540px] h-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/d0d2bc843f7f4f42c5d4c12dd98ff9f60afc2680.png"
            alt="Ecosystem Apps Orbit"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Right Column: Heading, Text, Button */}
      <div className="content-stretch flex flex-col gap-[60px] items-start relative z-10 w-full lg:max-w-[656px]">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <h2 className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[72px] tracking-[-1.44px] text-white">
            Work with Your Favorite Apps Using whitepace
          </h2>

          <p className="font-['Inter'] font-normal leading-[30px] relative shrink-0 text-base sm:text-[18px] tracking-[-0.36px] text-white/90 w-full">
            Whitepace connects seamlessly with your family’s existing banking, depository, and tax infrastructure. Automatically synchronize CAS statements, export capital gains schedules directly for your CA, and access quarterly reports via WhatsApp or Google Drive.
          </p>
        </div>

        {/* CTA Button matching Figma */}
        <button
          onClick={onOpenDemoModal}
          className="bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex gap-[10px] items-center justify-center px-[40px] py-[20px] relative rounded-[8px] shrink-0 transition-all duration-150 shadow-md hover:shadow-cyan-500/20 active:scale-95"
        >
          <span className="font-['Inter'] font-medium text-[18px] text-white tracking-[-0.36px] whitespace-nowrap">
            Schedule a Tax Optimization Audit
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

    </section>
  );
}
