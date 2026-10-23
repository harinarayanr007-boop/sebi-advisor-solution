"use client";

import React from "react";
import Link from "next/link";

export default function WhitepaceFooter() {
  return (
    <footer
      className="bg-[#043873] content-stretch flex flex-col items-center justify-center pb-[32px] pt-16 lg:pt-[140px] px-6 md:px-12 lg:px-[120px] xl:px-[220px] relative w-full overflow-hidden text-white border-t border-white/10"
      data-node-id="9:2757"
      data-name="Footer"
    >
      <div className="content-stretch flex flex-col gap-[60px] lg:gap-[100px] items-start relative shrink-0 w-full max-w-[1480px] mx-auto">
        
        {/* Main 5-Column Grid matching Figma 9:2759 */}
        <div
          className="content-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[40px] lg:gap-[50px] xl:gap-[80px] items-start relative shrink-0 w-full"
          data-node-id="9:2759"
          data-name="Info"
        >
          
          {/* Column 1: Logo & Description (9:2760) */}
          <div className="flex flex-col gap-[15px] items-start">
            <Link href="/platform" className="flex items-center gap-[12px] group">
              <div className="w-[37px] h-[29px] relative overflow-hidden flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/figma/bad8e5e690587d96becf39079aa8d96844d91349.svg"
                  alt="Whitepace"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-['Inter'] font-bold text-[28px] text-white leading-none whitespace-nowrap">
                whitepace
              </span>
            </Link>
            <p className="font-['Inter'] font-normal leading-[30px] text-[#f7f7ee] text-[16px] sm:text-[18px] tracking-[-0.36px] max-w-[260px]">
              Whitepace was created for unconflicted wealth stewardship. 100% direct plans, zero commissions.
            </p>
            <div className="text-xs text-white/60 font-mono space-y-1 pt-2">
              <div>SEBI RIA: INA000015678</div>
              <div>BASL Membership: 1842</div>
              <div>Vasant Kunj, New Delhi</div>
            </div>
          </div>

          {/* Column 2: Product (9:2770) */}
          <div className="flex flex-col gap-[15px] items-start text-white">
            <span className="font-['Inter'] font-bold text-[18px] tracking-[-0.36px]">
              Product
            </span>
            <Link href="#work-management" className="font-['Inter'] text-[16px] text-[#ffe492] hover:text-white transition tracking-[-0.32px]">
              Overview
            </Link>
            <Link href="#pricing" className="font-['Inter'] text-[16px] text-white/80 hover:text-white transition tracking-[-0.32px]">
              Pricing
            </Link>
            <Link href="#cross-platform" className="font-['Inter'] text-[16px] text-white/80 hover:text-white transition tracking-[-0.32px]">
              Client Stories
            </Link>
          </div>

          {/* Column 3: Resources (9:2775) */}
          <div className="flex flex-col gap-[16px] items-start text-white">
            <span className="font-['Inter'] font-bold text-[18px] tracking-[-0.36px]">
              Resources
            </span>
            <Link href="/fee-drag-calculator" className="font-['Inter'] text-[16px] text-white/80 hover:text-white transition tracking-[-0.32px]">
              Direct Fee Calculator
            </Link>
            <Link href="/investor-charter" className="font-['Inter'] text-[16px] text-white/80 hover:text-white transition tracking-[-0.32px]">
              SEBI Investor Charter
            </Link>
            <Link href="/complaints-data" className="font-['Inter'] text-[16px] text-white/80 hover:text-white transition tracking-[-0.32px]">
              SCORES / SMART ODR
            </Link>
          </div>

          {/* Column 4: Company (9:2780) */}
          <div className="flex flex-col gap-[16px] items-start text-white">
            <span className="font-['Inter'] font-bold text-[18px] tracking-[-0.36px]">
              Company
            </span>
            <Link href="/philosophy" className="font-['Inter'] text-[16px] text-white/80 hover:text-white transition tracking-[-0.32px]">
              About Us
            </Link>
            <Link href="/disclosures" className="font-['Inter'] text-[16px] text-white/80 hover:text-white transition tracking-[-0.32px]">
              Regulatory Disclosures
            </Link>
            <Link href="#security" className="font-['Inter'] text-[16px] text-white/80 hover:text-white transition tracking-[-0.32px]">
              Capital Safety
            </Link>
          </div>

          {/* Column 5: Try It Today CTA (9:2785) */}
          <div className="flex flex-col gap-[20px] items-start">
            <div className="font-['Inter'] font-bold text-[28px] text-white leading-[36px] tracking-[-0.56px]">
              Try It Today
            </div>
            <p className="font-['Inter'] font-normal text-[16px] text-white/80 leading-[24px] tracking-[-0.32px] max-w-[260px]">
              Get started with an audit. Direct zero-cost plans for your whole family.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById("hero");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#4f9cf9] hover:bg-[#3b82f6] content-stretch flex gap-[10px] items-center justify-center px-[32px] py-[16px] relative rounded-[8px] shrink-0 transition shadow-md active:scale-95"
              data-node-id="9:2788"
            >
              <span className="font-['Inter'] font-medium text-[16px] text-white tracking-[-0.32px] whitespace-nowrap">
                Start today
              </span>
              <div className="relative shrink-0 size-[14px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/figma/374fd3207ad71baf3edd723befcc3b1c82b90fd3.svg"
                  alt=""
                  className="block max-w-none size-full object-contain"
                />
              </div>
            </button>
          </div>

        </div>

        {/* Divider Line from Figma (9:2818) */}
        <div className="w-full h-px bg-white/15 my-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/figma/c6c79b87cdd9946cd45c8632b99b6379612929e2.svg" alt="" className="w-full h-px" />
        </div>

        {/* Bottom Bar matching Figma 9:2794 */}
        <div
          className="content-stretch flex flex-col sm:flex-row items-center justify-between gap-6 relative shrink-0 w-full"
          data-node-id="9:2794"
          data-name="Btm"
        >
          {/* Language and Legal Links (9:2795) */}
          <div className="flex flex-wrap items-center gap-[24px] sm:gap-[40px] text-sm text-white/80">
            {/* Language Selector (9:2796) */}
            <div className="flex items-center gap-2">
              {/* Globe Icon (9:2799) */}
              <div className="w-[19px] h-[19px] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/figma/910c4b303abc95b8f48032531b842acba7707688.svg"
                  alt="Language"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-['Inter'] text-[16px] text-white">English</span>
              {/* Down Arrow (9:2802) */}
              <div className="w-[12px] h-[8px] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/figma/d58b241c0563b47345f1b24aebed3613cabcdd76.svg"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <Link href="/disclosures" className="hover:text-white transition">Terms & privacy</Link>
            <Link href="#security" className="hover:text-white transition">Security</Link>
            <span className="text-emerald-400">● 100% Regulated Status</span>
            <span className="text-white/60">©2026 Echvee Fiduciary. SEBI RIA INA000015678</span>
          </div>

          {/* Social Icons matching Figma 9:2808 (Facebook, Twitter, LinkedIn) */}
          <div className="flex items-center gap-[32px] shrink-0" data-node-id="9:2808">
            {/* Facebook (9:2809) */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/5b729169d8bdfc19f22940ccdb8180940e58b1d6.svg"
                alt="Facebook"
                className="h-[17px] w-auto"
              />
            </a>

            {/* Twitter (9:2811) */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/6a400dc0574856a4f7476ebde0021abf33e6335a.svg"
                alt="Twitter"
                className="h-[14px] w-auto"
              />
            </a>

            {/* LinkedIn (9:2814) */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/8b1ce070012ea74db1d4dadc8e794c4282a44c8e.svg"
                alt="LinkedIn"
                className="size-[15px]"
              />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
