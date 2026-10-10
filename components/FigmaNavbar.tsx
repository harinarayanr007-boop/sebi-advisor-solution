"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const imgLogoWide1 = "/figma/logo-wide-1.svg";
const imgChevronDown = "/figma/chevron-down.svg";
const imgCall = "/figma/call.svg";
const imgCallWhite = "/figma/call-white.svg";

export function CompanyLogo({ className = "h-[36px] w-[84px] relative" }: { className?: string }) {
  return (
    <div className={`overflow-hidden relative ${className}`} data-node-id="4179:8846">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[36px] left-[calc(50%-0.33px)] top-1/2 w-[70px]">
        <img alt="Aurum Fiduciary" className="absolute block inset-0 size-full object-contain" src={imgLogoWide1} />
      </div>
    </div>
  );
}

export default function FigmaNavbar() {
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isComplianceActive = [
    "/fee-drag-calculator",
    "/investor-charter",
    "/complaints-data",
    "/disclosures",
  ].includes(pathname);

  const [mobileComplianceOpen, setMobileComplianceOpen] = useState(isComplianceActive);

  const isHome = pathname === "/";

  const getSectionHref = (hash: string) => {
    return isHome ? hash : `/${hash}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#e8f3ff] flex flex-col h-[72px] items-center justify-center px-5 sm:px-8 md:px-[64px] relative w-full border-b border-[#030a03]/5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between relative max-w-[1280px] w-full">
        
        {/* Logo */}
        <Link href="/" className="flex h-[40px] items-center justify-center relative w-[80px]">
          <CompanyLogo className="h-[36px] w-[84px]" />
        </Link>

        {/* Desktop Nav Links & Action */}
        <div className="hidden lg:flex gap-[32px] items-center justify-center relative">
          <nav className="flex gap-[28px] xl:gap-[32px] items-center justify-end relative">
            <Link
              href={getSectionHref("#services")}
              className={`font-normal text-[16px] leading-[1.5] transition-colors whitespace-nowrap ${
                pathname === "/services" ? "text-[#1e90ff] font-medium" : "text-[#030a03] hover:text-[#1e90ff]"
              }`}
            >
              Services
            </Link>
            <Link
              href="/philosophy"
              className={`font-normal text-[16px] leading-[1.5] transition-colors whitespace-nowrap ${
                pathname === "/philosophy" ? "text-[#1e90ff] font-medium" : "text-[#030a03] hover:text-[#1e90ff]"
              }`}
            >
              Philosophy
            </Link>
            <Link
              href="/fees"
              className={`font-normal text-[16px] leading-[1.5] transition-colors whitespace-nowrap ${
                pathname === "/fees" ? "text-[#1e90ff] font-medium" : "text-[#030a03] hover:text-[#1e90ff]"
              }`}
            >
              Advisory Fees
            </Link>
            <Link
              href={getSectionHref("#faq")}
              className="font-normal text-[16px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors whitespace-nowrap"
            >
              FAQ
            </Link>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="flex gap-[4px] items-center justify-center font-normal text-[16px] leading-[1.5] text-[#030a03] whitespace-nowrap hover:text-[#1e90ff] transition-colors cursor-pointer"
              >
                <span>Compliance &amp; Tools</span>
                <motion.div
                  animate={{ rotate: resourcesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative size-[20px]"
                >
                  <img alt="" className="inset-0 size-full" src={imgChevronDown} />
                </motion.div>
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white border border-[rgba(3,10,3,0.12)] shadow-xl p-2 z-50 rounded-sm"
                  >
                    <Link
                      href="/fee-drag-calculator"
                      onClick={() => setResourcesOpen(false)}
                      className="block px-3 py-2 text-sm text-[#030a03] hover:bg-[#e8f3ff] transition-colors rounded-sm font-medium"
                    >
                      Fee Drag Calculator
                    </Link>
                    <Link
                      href="/investor-charter"
                      onClick={() => setResourcesOpen(false)}
                      className="block px-3 py-2 text-sm text-[#030a03] hover:bg-[#e8f3ff] transition-colors rounded-sm"
                    >
                      Investor Charter (SEBI)
                    </Link>
                    <Link
                      href="/complaints-data"
                      onClick={() => setResourcesOpen(false)}
                      className="block px-3 py-2 text-sm text-[#030a03] hover:bg-[#e8f3ff] transition-colors rounded-sm"
                    >
                      Complaints Audit Data
                    </Link>
                    <Link
                      href="/disclosures"
                      onClick={() => setResourcesOpen(false)}
                      className="block px-3 py-2 text-sm text-[#030a03] hover:bg-[#e8f3ff] transition-colors rounded-sm"
                    >
                      Regulatory Disclosures
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/book"
              className="bg-[#1e90ff] border border-[#1e90ff] flex gap-[8px] h-[44px] items-center justify-center px-[20px] py-[8px] font-medium text-white text-[16px] leading-[1.5] whitespace-nowrap hover:bg-[#0077e6] transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <div className="relative size-[24px] shrink-0">
                <img alt="" className="size-full inset-0 block" src={imgCallWhite} />
              </div>
              <span>Consult Now</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile/Tablet Header Actions: Direct "Book Call" CTA + Hamburger Menu */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          <Link
            href="/book"
            className="bg-[#1e90ff] hover:bg-[#0077e6] text-white text-[13px] sm:text-[14px] font-medium px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-sm transition-all shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <div className="relative size-[14px] sm:size-[16px] shrink-0">
              <img alt="" className="size-full inset-0 block" src={imgCallWhite} />
            </div>
            <span>Book Call</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-1.5 text-[#030a03] hover:text-[#1e90ff] transition-colors cursor-pointer focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute top-[72px] left-0 w-full bg-[#e8f3ff] border-b border-[#030a03]/10 shadow-lg px-6 py-6 lg:hidden flex flex-col gap-3 z-50 overflow-hidden"
          >
            <nav className="flex flex-col gap-1">
              <Link
                href={getSectionHref("#services")}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left font-medium text-[16px] py-2.5 border-b border-[#030a03]/5 transition-colors ${
                  pathname === "/services" ? "text-[#1e90ff]" : "text-[#030a03] hover:text-[#1e90ff]"
                }`}
              >
                Services
              </Link>
              <Link
                href="/philosophy"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left font-medium text-[16px] py-2.5 border-b border-[#030a03]/5 transition-colors ${
                  pathname === "/philosophy" ? "text-[#1e90ff]" : "text-[#030a03] hover:text-[#1e90ff]"
                }`}
              >
                Investment Philosophy
              </Link>
              <Link
                href="/fees"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left font-medium text-[16px] py-2.5 border-b border-[#030a03]/5 transition-colors ${
                  pathname === "/fees" ? "text-[#1e90ff]" : "text-[#030a03] hover:text-[#1e90ff]"
                }`}
              >
                Advisory Fees &amp; Retainer
              </Link>
              <Link
                href={getSectionHref("#faq")}
                onClick={() => setMobileMenuOpen(false)}
                className="text-left font-medium text-[16px] text-[#030a03] hover:text-[#1e90ff] transition-colors py-2.5 border-b border-[#030a03]/5"
              >
                FAQ
              </Link>

              {/* Collapsible Compliance & Tools Accordion */}
              <div className="border-b border-[#030a03]/5 py-1">
                <button
                  type="button"
                  onClick={() => setMobileComplianceOpen(!mobileComplianceOpen)}
                  className="w-full flex items-center justify-between text-left font-medium text-[16px] text-[#030a03] hover:text-[#1e90ff] transition-colors py-2 cursor-pointer"
                  aria-expanded={mobileComplianceOpen}
                >
                  <span className={isComplianceActive ? "text-[#1e90ff]" : ""}>Compliance &amp; Tools</span>
                  <motion.div
                    animate={{ rotate: mobileComplianceOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative size-[20px]"
                  >
                    <img alt="" className="inset-0 size-full" src={imgChevronDown} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {mobileComplianceOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden flex flex-col pl-3 pt-1 pb-2 gap-1 border-l-2 border-[#1e90ff]/30 ml-1.5 my-1"
                    >
                      <Link
                        href="/fee-drag-calculator"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-left text-[14.5px] py-1.5 px-2 rounded-sm transition-colors ${
                          pathname === "/fee-drag-calculator"
                            ? "text-[#1e90ff] font-medium bg-white/60"
                            : "text-[#030a03]/85 hover:text-[#1e90ff] hover:bg-white/40"
                        }`}
                      >
                        Fee Drag Calculator
                      </Link>
                      <Link
                        href="/investor-charter"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-left text-[14.5px] py-1.5 px-2 rounded-sm transition-colors ${
                          pathname === "/investor-charter"
                            ? "text-[#1e90ff] font-medium bg-white/60"
                            : "text-[#030a03]/85 hover:text-[#1e90ff] hover:bg-white/40"
                        }`}
                      >
                        Investor Charter (SEBI)
                      </Link>
                      <Link
                        href="/complaints-data"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-left text-[14.5px] py-1.5 px-2 rounded-sm transition-colors ${
                          pathname === "/complaints-data"
                            ? "text-[#1e90ff] font-medium bg-white/60"
                            : "text-[#030a03]/85 hover:text-[#1e90ff] hover:bg-white/40"
                        }`}
                      >
                        Complaints Audit Data
                      </Link>
                      <Link
                        href="/disclosures"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-left text-[14.5px] py-1.5 px-2 rounded-sm transition-colors ${
                          pathname === "/disclosures"
                            ? "text-[#1e90ff] font-medium bg-white/60"
                            : "text-[#030a03]/85 hover:text-[#1e90ff] hover:bg-white/40"
                        }`}
                      >
                        Regulatory Disclosures
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#1e90ff] text-white py-3 font-medium text-[16px] text-center rounded-sm hover:bg-[#0077e6] transition-colors mt-2 shadow-sm flex items-center justify-center gap-2"
            >
              <div className="relative size-[20px] shrink-0">
                <img alt="" className="size-full inset-0 block" src={imgCallWhite} />
              </div>
              <span>Consult Now</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
