"use client";

import React from "react";

interface WhitepaceCtaBannerProps {
  onOpenDemoModal?: () => void;
}

export default function WhitepaceCtaBanner({ onOpenDemoModal }: WhitepaceCtaBannerProps) {
  return (
    <section
      className="bg-[#043873] content-stretch flex flex-col items-center justify-center pb-[80px] lg:pb-[100px] pt-16 lg:pt-[140px] px-6 md:px-12 lg:px-[120px] xl:px-[220px] relative w-full overflow-hidden text-white"
      data-node-id="9:4780"
      data-name="Free Trial"
    >
      
      {/* Content Container (Figma 9:4781) */}
      <div
        className="content-stretch flex flex-col gap-[40px] items-center relative z-10 w-full max-w-[800px] mx-auto text-center"
        data-node-id="9:4781"
        data-name="Heading"
      >
        <div
          className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-center not-italic relative shrink-0 text-center text-white w-full"
          data-node-id="9:4782"
          data-name="Text-block"
        >
          {/* H1 Heading matching Figma 9:4783 (Inter Bold 72px, tracking -1.44px) */}
          <h2
            className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[72px] tracking-[-1.44px] text-white w-full max-w-[640px] mx-auto"
            data-node-id="9:4783"
          >
            Try Whitepace today
          </h2>

          {/* Subtitle matching Figma 9:4784 (Inter Regular 24px, leading 32px, tracking -0.48px) */}
          <div
            className="font-['Inter'] font-normal leading-[32px] relative shrink-0 text-lg sm:text-[24px] tracking-[-0.48px] text-white/90 w-full max-w-[550px] mx-auto"
            data-node-id="9:4784"
          >
            <p className="mb-0">Get started with a free portfolio audit.</p>
            <p>Protect your family capital with zero distributor bias.</p>
          </div>
        </div>

        {/* CTA Button matching Figma 9:4785 (bg #4f9cf9, px 40px, py 20px, rounded 10px) */}
        <button
          onClick={onOpenDemoModal}
          className="bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex gap-[10px] items-center justify-center px-[40px] py-[20px] relative rounded-[10px] shrink-0 transition-all duration-150 shadow-2xl hover:shadow-cyan-500/25 active:scale-95"
          data-node-id="9:4785"
          data-name="Btn-try"
        >
          <span
            className="[word-break:break-word] font-['Inter'] font-medium leading-[normal] not-italic relative shrink-0 text-[18px] text-white tracking-[-0.32px] whitespace-nowrap"
            data-node-id="9:4786"
          >
            Schedule a Confidential Diagnostic
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

        {/* Secondary Contact Link matching Figma 9:4791 */}
        <p
          onClick={onOpenDemoModal}
          className="font-['Inter'] font-normal leading-[32px] not-italic relative shrink-0 text-base sm:text-[24px] text-center text-[#ffe492] hover:text-white cursor-pointer transition tracking-[-0.48px]"
          data-node-id="9:4791"
        >
          Managing ₹10 Cr+? Contact Managing Partner →
        </p>

        {/* App Icons Row matching Figma 9:4792 (Apple, Windows, Android) */}
        <div
          className="content-stretch flex gap-[40px] items-center justify-center relative shrink-0 pt-4"
          data-node-id="9:4792"
          data-name="App-icon"
        >
          {/* Apple Logo (9:4793) */}
          <div className="size-[60px] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/9e1a62d41f9cdc37a4de89c66ebab5abb4abb9a6.svg"
              alt="Apple iOS App"
              className="w-[48px] h-[48px] object-contain"
            />
          </div>

          {/* Windows Logo (9:4798) */}
          <div className="size-[60px] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/6a136de3c9c8d74dd26ba62d9357da879351f807.svg"
              alt="Windows Portal"
              className="w-[48px] h-[48px] object-contain"
            />
          </div>

          {/* Android Logo (9:4805) */}
          <div className="size-[60px] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/8e6fa5ee308baa19936cd0b65cc3f1f7188474d8.svg"
              alt="Android App"
              className="w-[48px] h-[48px] object-contain"
            />
          </div>
        </div>

      </div>

    </section>
  );
}
