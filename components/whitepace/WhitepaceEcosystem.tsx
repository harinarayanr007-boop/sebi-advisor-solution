"use client";

import React from "react";

export default function WhitepaceEcosystem() {
  return (
    <section
      className="bg-white content-stretch flex flex-col gap-[60px] lg:gap-[100px] items-center justify-center px-6 md:px-12 lg:px-[120px] xl:px-[220px] py-16 lg:py-[140px] relative w-full overflow-hidden"
      data-node-id="9:2461"
      data-name="Our sponsors"
    >
      
      {/* Heading with Hand-Drawn Yellow Underline SVG (Figma 9:2462) */}
      <div className="relative inline-block text-center">
        <h2
          className="font-['Inter'] font-bold leading-[1.08] relative shrink-0 text-4xl sm:text-5xl lg:text-[72px] tracking-[-1.44px] text-[#212529]"
          data-node-id="9:2491"
        >
          Our sponsors
        </h2>
        {/* Hand-drawn yellow underline SVG from Figma */}
        <div className="w-[260px] sm:w-[380px] h-[24px] -mt-2 sm:-mt-3 mx-auto pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/4f1a14b73ff0a22e54eabf5eed37d63a4ad0febb.svg"
            alt=""
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>

      {/* Sponsors Row - 1:1 Matching Figma 9:2492 */}
      <div
        className="content-stretch flex flex-wrap items-center justify-between gap-8 lg:gap-12 relative shrink-0 w-full max-w-[1480px] mx-auto opacity-80 hover:opacity-100 transition-opacity"
        data-node-id="9:2492"
        data-name="sponsors"
      >
        {/* Apple (Figma 9:2493) */}
        <div className="flex items-center justify-center w-[120px] h-[68px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/11703d96e317fb758da592ff3fbd3233c72a85b5.svg"
            alt="Apple"
            className="h-[55px] object-contain"
          />
        </div>

        {/* Microsoft (Figma 9:2498) */}
        <div className="flex items-center justify-center w-[220px] sm:w-[287px] h-[62px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/2bba526aeed6607fdc213164ae1c8d6ed8bf3b03.svg"
            alt="Microsoft"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Slack (Figma 9:2505) */}
        <div className="flex items-center justify-center w-[200px] sm:w-[280px] h-[71px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/0d3be0d2d91834ae59891fdd8817676361d3770c.svg"
            alt="Slack"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Google (Figma 9:2513) */}
        <div className="flex items-center justify-center w-[160px] sm:w-[211px] h-[70px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/figma/307c7de7adfa25a4107843b0d5cfca7bca7c1a64.svg"
            alt="Google"
            className="w-full h-full object-contain"
          />
        </div>

      </div>

    </section>
  );
}
