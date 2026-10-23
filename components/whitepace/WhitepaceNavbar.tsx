"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface WhitepaceNavbarProps {
  onOpenDemoModal?: () => void;
}

export default function WhitepaceNavbar({ onOpenDemoModal }: WhitepaceNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#043873] border-b border-white/10 text-white">
      <div className="w-full max-w-[1920px] mx-auto h-[92px] px-6 md:px-12 lg:px-[120px] xl:px-[220px] py-[16px] flex items-center justify-between">
        
        {/* Brand Logo - 1:1 Matching Figma 9:314 */}
        <Link href="/platform" className="flex items-center gap-[12px] group shrink-0">
          <div className="w-[37px] h-[29px] relative overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/bad8e5e690587d96becf39079aa8d96844d91349.svg"
              alt="Whitepace Fiduciary Logo Icon"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-['Inter'] font-bold text-[28px] tracking-[-0.56px] text-white leading-none whitespace-nowrap">
              echvee<span className="text-[#ffe492]">fiduciary</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 mt-0.5">
              SEBI RIA INA000015678
            </span>
          </div>
        </Link>

        {/* Navigation Menu - 1:1 Matching Figma 9:324 (DM Sans Medium 18px) */}
        <nav className="hidden xl:flex items-center gap-[32px]">
          
          {/* Wealth Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-[10px] font-['DM_Sans'] font-medium text-[18px] leading-[23px] text-white hover:text-[#ffe492] transition-colors py-2 whitespace-nowrap">
              <span>Wealth Services</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/6eacb7ddf6f4f38cfb31f5b273625bb614c7ac1c.svg"
                alt=""
                className={`w-[14px] h-[12px] transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`}
              />
            </button>

            {activeDropdown === "services" && (
              <div className="absolute top-full left-0 w-[380px] bg-[#021C3E] border border-white/15 rounded-[10px] shadow-[0px_10px_35px_rgba(0,0,0,0.4)] p-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="#work-management"
                  onClick={() => setActiveDropdown(null)}
                  className="p-3 rounded-lg hover:bg-white/5 transition flex flex-col"
                >
                  <span className="font-['Inter'] font-semibold text-[15px] text-white">Private Wealth Management</span>
                  <span className="text-[12px] text-white/60">Bespoke fiduciary asset allocation for portfolios ₹2 Cr – ₹25 Cr+</span>
                </Link>
                <Link
                  href="#work-together"
                  onClick={() => setActiveDropdown(null)}
                  className="p-3 rounded-lg hover:bg-white/5 transition flex flex-col"
                >
                  <span className="font-['Inter'] font-semibold text-[15px] text-[#ffe492]">Family Office & Living Trusts</span>
                  <span className="text-[12px] text-white/60">Multi-entity consolidation: HUFs, holding companies, and promoter trusts</span>
                </Link>
                <Link
                  href="#customise"
                  onClick={() => setActiveDropdown(null)}
                  className="p-3 rounded-lg hover:bg-white/5 transition flex flex-col"
                >
                  <span className="font-['Inter'] font-semibold text-[15px] text-[#4f9cf9]">Startup Exit & Cash Runway</span>
                  <span className="text-[12px] text-white/60">Capital preservation architecture for tech founders and business promoters</span>
                </Link>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-[10px] font-['DM_Sans'] font-medium text-[18px] leading-[23px] text-white hover:text-[#ffe492] transition-colors py-2 whitespace-nowrap">
              <span>Solutions</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/6eacb7ddf6f4f38cfb31f5b273625bb614c7ac1c.svg"
                alt=""
                className={`w-[14px] h-[12px] transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`}
              />
            </button>

            {activeDropdown === "solutions" && (
              <div className="absolute top-full left-0 w-[360px] bg-[#021C3E] border border-white/15 rounded-[10px] shadow-[0px_10px_35px_rgba(0,0,0,0.4)] p-4 flex flex-col gap-2">
                <Link href="#work-management" onClick={() => setActiveDropdown(null)} className="p-2.5 rounded-lg hover:bg-white/5 transition text-sm text-white">
                  Direct Equity Blue-Chip Portfolios
                </Link>
                <Link href="#your-data" onClick={() => setActiveDropdown(null)} className="p-2.5 rounded-lg hover:bg-white/5 transition text-sm text-white">
                  Sovereign Debt & RBI G-Sec Mandates
                </Link>
                <Link href="#apps" onClick={() => setActiveDropdown(null)} className="p-2.5 rounded-lg hover:bg-white/5 transition text-sm text-white">
                  Automated CA Capital Gains Tax Dossiers
                </Link>
              </div>
            )}
          </div>

          {/* Resources */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("resources")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-[10px] font-['DM_Sans'] font-medium text-[18px] leading-[23px] text-white hover:text-[#ffe492] transition-colors py-2 whitespace-nowrap">
              <span>Resources</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/6eacb7ddf6f4f38cfb31f5b273625bb614c7ac1c.svg"
                alt=""
                className={`w-[14px] h-[12px] transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`}
              />
            </button>

            {activeDropdown === "resources" && (
              <div className="absolute top-full left-0 w-[320px] bg-[#021C3E] border border-white/15 rounded-[10px] shadow-[0px_10px_35px_rgba(0,0,0,0.4)] p-4 flex flex-col gap-2">
                <Link href="/fee-drag-calculator" className="p-2.5 rounded-lg hover:bg-white/5 transition text-sm text-white">
                  Direct Plan Fee Drag Calculator
                </Link>
                <Link href="/investor-charter" className="p-2.5 rounded-lg hover:bg-white/5 transition text-sm text-white">
                  SEBI Investor Charter
                </Link>
                <Link href="/complaints-data" className="p-2.5 rounded-lg hover:bg-white/5 transition text-sm text-white">
                  Complaints Matrix (SCORES / SMART ODR)
                </Link>
              </div>
            )}
          </div>

          {/* Pricing */}
          <Link
            href="#pricing"
            className="flex items-center gap-[10px] font-['DM_Sans'] font-medium text-[18px] leading-[23px] text-white hover:text-[#ffe492] transition-colors py-2 whitespace-nowrap"
          >
            <span>Pricing</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/figma/6eacb7ddf6f4f38cfb31f5b273625bb614c7ac1c.svg"
              alt=""
              className="w-[14px] h-[12px]"
            />
          </Link>
        </nav>

        {/* Buttons Group - 1:1 Matching Figma 9:337 */}
        <div className="hidden lg:flex items-center gap-[24px] h-[60px] shrink-0">
          
          {/* Btn-login - 1:1 Matching Figma 9:338 */}
          <button
            onClick={() => {
              const el = document.getElementById("client-portal");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-[#ffe492] hover:bg-[#fed968] text-[#043873] font-['Inter'] font-medium text-[18px] tracking-[-0.36px] h-[60px] px-[40px] py-[16px] rounded-[8px] transition-all duration-150 shadow-sm active:scale-95"
          >
            Login
          </button>

          {/* Btn-free-trial - 1:1 Matching Figma 9:340 */}
          <button
            onClick={onOpenDemoModal}
            className="bg-[#4f9cf9] hover:bg-[#3b82f6] text-white font-['Inter'] font-medium text-[18px] tracking-[-0.36px] h-[60px] px-[24px] py-[16px] rounded-[8px] flex items-center gap-[10px] transition-all duration-150 shadow-md hover:shadow-cyan-500/20 active:scale-95"
          >
            <span>Try Whitepace free</span>
            {/* Arrow icon from Figma 9:343 */}
            <div className="w-[10px] h-[10px] relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/figma/54c2044f4e0835845b3339d0e72fdea762328b7c.svg"
                alt="Arrow"
                className="w-full h-full object-contain"
              />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2.5 rounded-lg bg-white/10 text-white"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#021C3E] border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <Link href="#work-management" onClick={() => setMobileMenuOpen(false)} className="text-lg font-['DM_Sans'] text-white py-1">
            Wealth Services
          </Link>
          <Link href="#work-together" onClick={() => setMobileMenuOpen(false)} className="text-lg font-['DM_Sans'] text-white py-1">
            Family Office & Trusts
          </Link>
          <Link href="#customise" onClick={() => setMobileMenuOpen(false)} className="text-lg font-['DM_Sans'] text-white py-1">
            Startup Exit Solutions
          </Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-['DM_Sans'] text-white py-1">
            Fee Schedule
          </Link>
          <div className="flex flex-col gap-3 pt-4 border-t border-white/15">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDemoModal) onOpenDemoModal();
              }}
              className="w-full bg-[#4f9cf9] text-white font-['Inter'] font-medium text-[18px] py-3.5 rounded-[8px] flex items-center justify-center gap-2"
            >
              <span>Try Whitepace free</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/figma/54c2044f4e0835845b3339d0e72fdea762328b7c.svg" alt="" className="w-3 h-3" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#ffe492] text-[#043873] font-['Inter'] font-medium text-[18px] py-3.5 rounded-[8px]"
            >
              Login
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
