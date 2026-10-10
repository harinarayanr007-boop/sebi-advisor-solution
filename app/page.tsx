"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import FigmaNavbar from "@/components/FigmaNavbar";
import FigmaFooter from "@/components/FigmaFooter";
import RegulatoryDisclosuresModal from "@/components/RegulatoryDisclosuresModal";

// Asset paths matching downloaded Figma assets
const imgLogoWide1 = "/figma/logo-wide-1.svg";
const imgHeroImage = "/figma/hero-image.png";
const imgInvestmentPlanning = "/figma/investment-planning.png";
const imgPortfolioManagement = "/figma/portfolio-management.png";
const imgRiskAssessment = "/figma/risk-assessment.png";
const imgAboutPhoto = "/figma/about-photo.png";
const imgProcessStep1 = "/figma/process-step-1.png";
const imgProcessStep2 = "/figma/process-step-2.png";
const imgProcessStep3 = "/figma/process-step-3.png";
const imgAvatar1 = "/figma/avatar-1.png";
const imgAvatar2 = "/figma/avatar-2.png";
const imgAvatar3 = "/figma/avatar-3.png";
const imgCtaImage = "/figma/cta-image.png";
const imgChevronDown = "/figma/chevron-down.svg";
const imgChevronRight = "/figma/chevron-right.svg";
const imgChevronRight1 = "/figma/chevron-right-1.svg";
const imgPlaceholderLogo = "/figma/placeholder-logo.svg";
const imgClose = "/figma/close.svg";
const imgMail = "/figma/mail.svg";
const imgCall = "/figma/call.svg";
const imgCallWhite = "/figma/call-white.svg";
const imgLocationOn = "/figma/location-on.svg";
const imgDivider = "/figma/divider.svg";

function CompanyLogo({ className = "h-[36px] w-[84px] relative" }: { className?: string }) {
  return (
    <div className={`overflow-hidden relative ${className}`} data-node-id="4179:8846">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[36px] left-[calc(50%-0.33px)] top-1/2 w-[70px]">
        <img alt="Company Logo" className="absolute block inset-0 size-full object-contain" src={imgLogoWide1} />
      </div>
    </div>
  );
}

export default function Home() {
  // Interactive FAQ state: all open by default to match 1:1 Figma canvas, with interactive toggle
  const [openFaqs, setOpenFaqs] = useState<number[]>([0, 1, 2, 3, 4]);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqItems = [
    {
      q: "Are you SEBI registered?",
      a: "Yes. My registration number is INA000015678. You can verify it on the SEBI website before we ever shake hands.",
    },
    {
      q: "How do you charge?",
      a: "A flat fee. No commissions, no kickbacks, no hidden cuts. You pay for advice, not for products.",
    },
    {
      q: "What is your strategy?",
      a: "Long term, low cost, and built for your risk. We do not chase tips or time the market. We build a plan and stick to it.",
    },
    {
      q: "How do we start?",
      a: "We talk first. You bring your numbers and your goals. Then I write the plan and we go from there.",
    },
    {
      q: "Do you sell products?",
      a: "Never. I am an advisor, not a salesman. My only product is the plan and the discipline to follow it.",
    },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-start relative w-full bg-white text-[#030a03] overflow-x-hidden" data-node-id="10373:67369" data-name="Home • Desktop">
      
      {/* 1. NAVBAR / 1 / */}
      <FigmaNavbar />
      <RegulatoryDisclosuresModal />

      {/* 2. HEADER / 1 / (HERO) */}
      <section className="bg-white flex items-start justify-center overflow-hidden px-5 sm:px-8 md:px-[64px] py-12 sm:py-20 lg:py-[112px] relative w-full" data-node-id="10373:67519" data-name="Header / 1 /">
        <div className="flex flex-1 flex-col items-start max-w-[1280px] w-full" data-node-id="10373:67520" data-name="Container">
          <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-[80px] items-center w-full" data-node-id="10373:67521" data-name="Component">
            
            <div className="flex flex-1 flex-col gap-6 sm:gap-[32px] items-start w-full text-left" data-node-id="10373:67522" data-name="Column">
              <div className="flex flex-col gap-4 sm:gap-[24px] items-start text-[#030a03] w-full" data-node-id="10373:67523" data-name="Content">
                <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.2] tracking-[-0.64px] w-full" data-node-id="10373:67524">
                  Fiduciary Wealth Governance for High-Net-Worth Families
                </h1>
                <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03] w-full" data-node-id="10373:67525">
                  Independent capital allocation and retirement architecture for business owners, CXOs, and global NRIs. Bound by SEBI fiduciary regulations to eliminate product commissions, bank kickbacks, and distribution bias.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-[16px] items-stretch sm:items-start w-full sm:w-auto" data-node-id="10373:67526" data-name="Actions">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/book"
                    className="bg-[#1e90ff] border border-[#1e90ff] flex gap-[8px] h-[44px] items-center justify-center px-[20px] py-[8px] font-medium text-white text-[16px] leading-[1.5] whitespace-nowrap hover:bg-[#0077e6] transition-all cursor-pointer shadow-sm hover:shadow text-center"
                    data-node-id="10393:1855"
                    data-name="Button"
                  >
                    <div className="relative size-[24px] shrink-0" data-node-id="10393:1856">
                      <img alt="" className="inset-0 size-full block" src={imgCallWhite} />
                    </div>
                    <span>Consult Now</span>
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="w-full max-w-[500px] lg:max-w-none lg:w-[601px] h-[320px] sm:h-[460px] lg:h-[599px] relative shrink-0 overflow-hidden flex items-center justify-center" data-node-id="10392:1213" data-name="image 53">
              <div className="relative size-full pointer-events-none flex items-center justify-center">
                <img
                  alt="Registered SEBI Advisor illustration"
                  className="size-full object-contain"
                  src={imgHeroImage}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. STATS / 52 / */}
      <section className="bg-[#e8f3ff] flex flex-col items-center overflow-hidden px-4 sm:px-8 md:px-[64px] py-10 sm:py-16 lg:py-[112px] relative w-full" data-node-id="10391:1182" data-name="Stats / 52 /">
        <div className="flex flex-col gap-6 sm:gap-10 lg:gap-[80px] items-start max-w-[1280px] w-full" data-node-id="10391:1183" data-name="Container">
          <div className="flex flex-col gap-2 sm:gap-[16px] items-start w-full">
            <h2 className="font-semibold text-[26px] sm:text-[36px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03] w-full" data-node-id="10391:1184">
              The numbers speak for themselves
            </h2>
            <p className="font-normal text-[15px] sm:text-[18px] leading-[1.5] text-[#030a03]/80 sm:text-[#030a03] w-full" data-node-id="10392:1275">
              A focused, boutique practice intentionally capped to preserve fiduciary depth.
            </p>
          </div>

          <div className="flex flex-col items-start w-full" data-node-id="10391:1185" data-name="Content">
            <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-[32px] w-full" data-node-id="10391:1186" data-name="Row">
              
              {/* Stat 1 */}
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.06)" }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-[rgba(3,10,3,0.12)] rounded-xl sm:rounded-none flex flex-col gap-1 sm:gap-[8px] items-center justify-center p-2.5 sm:p-5 lg:p-[32px] w-full cursor-default text-center shadow-xs sm:shadow-none"
                data-node-id="10391:1187"
                data-name="Stat"
              >
                <p className="font-bold font-roboto text-[22px] sm:text-[44px] lg:text-[80px] leading-[1.2] text-[#030a03] text-center whitespace-nowrap" data-node-id="10391:1188">
                  ₹120Cr+
                </p>
                <p className="font-medium text-[10px] sm:text-[15px] lg:text-[20px] leading-[1.3] text-[#030a03]/80 sm:text-[#030a03] text-center" data-node-id="10391:1189">
                  Active Advisory Assets
                </p>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.06)" }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-[rgba(3,10,3,0.12)] rounded-xl sm:rounded-none flex flex-col gap-1 sm:gap-[8px] items-center justify-center p-2.5 sm:p-5 lg:p-[32px] text-center w-full cursor-default shadow-xs sm:shadow-none"
                data-node-id="10391:1190"
                data-name="Stat"
              >
                <p className="font-bold font-roboto text-[22px] sm:text-[44px] lg:text-[80px] leading-[1.2] text-[#030a03] text-center whitespace-nowrap" data-node-id="10391:1191">
                  15
                </p>
                <p className="font-medium text-[10px] sm:text-[15px] lg:text-[20px] leading-[1.3] text-[#030a03]/80 sm:text-[#030a03] text-center" data-node-id="10391:1192">
                  Years of Experience
                </p>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.06)" }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-[rgba(3,10,3,0.12)] rounded-xl sm:rounded-none flex flex-col gap-1 sm:gap-[8px] items-center justify-center p-2.5 sm:p-5 lg:p-[32px] text-center w-full cursor-default shadow-xs sm:shadow-none"
                data-node-id="10391:1193"
                data-name="Stat"
              >
                <p className="font-bold font-roboto text-[22px] sm:text-[44px] lg:text-[80px] leading-[1.2] text-[#030a03] text-center whitespace-nowrap" data-node-id="10391:1194">
                  65+
                </p>
                <p className="font-medium text-[10px] sm:text-[15px] lg:text-[20px] leading-[1.3] text-[#030a03]/80 sm:text-[#030a03] text-center" data-node-id="10391:1195">
                  Clients on board
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. LAYOUT / 249 / (SERVICES) */}
      <section id="services" className="bg-white flex flex-col items-center overflow-hidden px-4 sm:px-8 md:px-[64px] py-10 sm:py-16 lg:py-[112px] relative w-full" data-node-id="10391:1090" data-name="Layout / 249 /">
        <div className="flex flex-col gap-8 sm:gap-14 lg:gap-[80px] items-start max-w-[1280px] w-full" data-node-id="10391:1091" data-name="Container">
          
          <div className="flex flex-col gap-2.5 sm:gap-[16px] items-start max-w-[768px] w-full" data-node-id="10391:1092" data-name="Section Title">
            <div className="flex items-center" data-node-id="10391:1093" data-name="Tagline Wrapper">
              <span className="font-semibold text-[14px] sm:text-[16px] leading-[1.5] text-[#1e90ff] sm:text-[#030a03]" data-node-id="10391:1094">
                Services
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:gap-[24px] items-start text-[#030a03] w-full" data-node-id="10391:1095" data-name="Content">
              <h2 className="font-semibold text-[26px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] w-full" data-node-id="10391:1096">
                Designed for Capital Preservation &amp; Compound Longevity
              </h2>
              <p className="font-normal text-[14px] sm:text-[18px] leading-[1.5] w-full text-[#030a03]/80 sm:text-[#030a03]" data-node-id="10391:1097">
                Three services. Each one built to keep your money honest and your future clear. No products pushed, no commissions taken.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start w-full" data-node-id="10391:1098" data-name="Content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-[48px] items-start w-full" data-node-id="10391:1099" data-name="Row">
              
              {/* Service 1 */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3 sm:gap-6 lg:gap-[32px] items-start w-full overflow-hidden p-4 sm:p-5 lg:p-0 rounded-2xl bg-[#f8fbff] lg:bg-transparent border border-[rgba(30,144,255,0.12)] lg:border-none shadow-xs lg:shadow-none"
                data-node-id="10391:1100"
                data-name="Column"
              >
                <div className="h-[130px] sm:h-[220px] lg:h-[302px] relative w-full overflow-hidden flex items-center justify-center rounded-xl bg-white lg:bg-transparent" data-node-id="10391:1101" data-name="Investment planning illustration">
                  <img alt="Investment planning" className="size-full object-contain pointer-events-none" src={imgInvestmentPlanning} />
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-3 lg:gap-[24px] items-start text-[#030a03] w-full" data-node-id="10391:1102" data-name="Content">
                  <h3 className="font-semibold text-[20px] sm:text-[28px] lg:text-[40px] leading-[1.3] tracking-[-0.3px] w-full" data-node-id="10391:1103">
                    Investment planning
                  </h3>
                  <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] w-full text-[#030a03]/80 sm:text-[#030a03]" data-node-id="10391:1104">
                    We map your income, your spending, and your goals into one written plan.
                  </p>
                </div>
              </motion.div>

              {/* Service 2 */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3 sm:gap-6 lg:gap-[32px] items-start w-full overflow-hidden p-4 sm:p-5 lg:p-0 rounded-2xl bg-[#f8fbff] lg:bg-transparent border border-[rgba(30,144,255,0.12)] lg:border-none shadow-xs lg:shadow-none"
                data-node-id="10391:1105"
                data-name="Column"
              >
                <div className="h-[130px] sm:h-[220px] lg:h-[302px] relative w-full overflow-hidden flex items-center justify-center rounded-xl bg-white lg:bg-transparent" data-node-id="10391:1106" data-name="Portfolio management illustration">
                  <img alt="Portfolio management" className="size-full object-contain pointer-events-none" src={imgPortfolioManagement} />
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-3 lg:gap-[24px] items-start text-[#030a03] w-full" data-node-id="10391:1107" data-name="Content">
                  <h3 className="font-semibold text-[20px] sm:text-[28px] lg:text-[40px] leading-[1.3] tracking-[-0.3px] w-full" data-node-id="10391:1108">
                    Portfolio management
                  </h3>
                  <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] w-full text-[#030a03]/80 sm:text-[#030a03]" data-node-id="10391:1109">
                    We build the portfolio, rebalance it, and watch it like a hawk.
                  </p>
                </div>
              </motion.div>

              {/* Service 3 */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3 sm:gap-6 lg:gap-[32px] items-start w-full overflow-hidden p-4 sm:p-5 lg:p-0 rounded-2xl bg-[#f8fbff] lg:bg-transparent border border-[rgba(30,144,255,0.12)] lg:border-none shadow-xs lg:shadow-none"
                data-node-id="10391:1110"
                data-name="Column"
              >
                <div className="h-[130px] sm:h-[220px] lg:h-[299px] relative w-full overflow-hidden flex items-center justify-center rounded-xl bg-white lg:bg-transparent" data-node-id="10391:1111" data-name="Risk assessment illustration">
                  <img alt="Risk assessment" className="size-full object-contain pointer-events-none" src={imgRiskAssessment} />
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-3 lg:gap-[24px] items-start text-[#030a03] w-full" data-node-id="10391:1112" data-name="Content">
                  <h3 className="font-semibold text-[20px] sm:text-[28px] lg:text-[40px] leading-[1.3] tracking-[-0.3px] w-full" data-node-id="10391:1113">
                    Risk assessment
                  </h3>
                  <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] w-full text-[#030a03]/80 sm:text-[#030a03]" data-node-id="10391:1114">
                    We measure what you can afford to lose before you ever lose it.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          <div className="flex items-center" data-node-id="10391:1115" data-name="Actions">
            <Link
              href="/philosophy"
              className="flex gap-[8px] items-center justify-center font-medium text-[16px] leading-[1.5] text-[#003066] hover:text-[#1e90ff] transition-colors whitespace-nowrap cursor-pointer group"
              data-node-id="10391:1117"
              data-name="Button"
            >
              <span>More Services</span>
              <div className="relative size-[24px] group-hover:translate-x-1 transition-transform">
                <img alt="" className="inset-0 size-full block" src={imgChevronRight} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. LAYOUT / 19 / (ABOUT ME) */}
      <section id="about" className="bg-[#e8f3ff] flex flex-col items-center overflow-hidden px-4 sm:px-8 md:px-[64px] py-10 sm:py-16 lg:py-[112px] relative w-full" data-node-id="10373:67928" data-name="Layout / 19 /">
        <div className="flex flex-col items-start max-w-[1280px] w-full" data-node-id="10373:67929" data-name="Container">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-14 lg:gap-[80px] items-center w-full" data-node-id="10373:67930" data-name="Component">
            
            <div className="flex flex-1 flex-col gap-4 sm:gap-6 lg:gap-[32px] items-start w-full text-left" data-node-id="10373:67931" data-name="Content">
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-[32px] items-start w-full" data-node-id="10373:67932" data-name="Content">
                <div className="flex flex-col gap-2 sm:gap-[16px] items-start w-full" data-node-id="10373:67933" data-name="Section Title">
                  <div className="flex items-center" data-node-id="10373:67934" data-name="Tagline Wrapper">
                    <span className="font-semibold text-[14px] sm:text-[16px] leading-[1.5] text-[#1e90ff] sm:text-[#030a03]" data-node-id="10373:67935">
                      About me
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5 sm:gap-[24px] items-start text-[#030a03] w-full" data-node-id="10373:67936" data-name="Content">
                    <h2 className="font-bold text-[28px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]" data-node-id="10373:67937">
                      Dr. Aurum Mamal
                    </h2>
                    <div className="flex flex-col gap-2 sm:gap-3 font-normal text-[14px] sm:text-[18px] leading-[1.5] text-[#030a03]/85 sm:text-[#030a03] w-full" data-node-id="10373:67938">
                      <p>
                        As a SEBI Registered Investment Adviser (INA000015678), I operate under a legal fiduciary charter: I am statutorily bound to act solely in your financial interest.
                      </p>
                      <p>
                        Having stewarded capital across fifteen years of Indian market cycles, my philosophy rejects speculative stock-picking, expensive PMS structures, and bank-driven regular mutual funds. My sole function is to construct a disciplined, low-cost asset architecture that protects your family&apos;s financial freedom.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:gap-[16px] items-start w-full" data-node-id="10373:67939" data-name="List">
                  <div className="flex items-center w-full" data-node-id="10373:68182" data-name="List Item">
                    <ul className="block flex-1 font-medium text-[14px] sm:text-[16px] leading-[1.5] text-[#030a03]">
                      <li className="list-disc ms-[18px] sm:ms-[24px]">
                        <span>SEBI registered advisor INA000015678</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center w-full" data-node-id="10373:68184" data-name="List Item">
                    <ul className="block flex-1 font-medium text-[14px] sm:text-[16px] leading-[1.5] text-[#030a03]">
                      <li className="list-disc ms-[18px] sm:ms-[24px]">
                        <span>Fifteen years of market experience</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center w-full" data-node-id="10373:68186" data-name="List Item">
                    <ul className="block flex-1 font-medium text-[14px] sm:text-[16px] leading-[1.5] text-[#030a03]">
                      <li className="list-disc ms-[18px] sm:ms-[24px]">
                        <span>Certified financial planner</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-3 sm:gap-[24px] items-center w-full sm:w-auto" data-node-id="10373:67946" data-name="Actions">
                <Link
                  href="#services"
                  className="flex gap-[6px] items-center justify-center font-medium text-[14px] sm:text-[16px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors whitespace-nowrap cursor-pointer group"
                  data-node-id="10373:67948"
                  data-name="Button"
                >
                  <span>View Services</span>
                  <div className="relative size-[20px] sm:size-[24px] group-hover:translate-x-1 transition-transform">
                    <img alt="" className="inset-0 size-full block" src={imgChevronRight1} />
                  </div>
                </Link>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/book"
                    className="bg-[#1e90ff] border border-[#1e90ff] flex gap-[8px] h-[40px] sm:h-[44px] items-center justify-center px-[16px] sm:px-[20px] py-[6px] sm:py-[8px] font-medium text-white text-[14px] sm:text-[16px] leading-[1.5] whitespace-nowrap hover:bg-[#0077e6] transition-all cursor-pointer shadow-sm hover:shadow text-center"
                    data-node-id="10393:1881"
                    data-name="Button"
                  >
                    <div className="relative size-[20px] sm:size-[24px] shrink-0" data-node-id="10393:1882">
                      <img alt="" className="inset-0 size-full block" src={imgCallWhite} />
                    </div>
                    <span>Consult Now</span>
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="w-full max-w-[500px] lg:max-w-none lg:w-[631px] h-[260px] sm:h-[420px] lg:h-[703px] relative shrink-0 overflow-hidden rounded-xl sm:rounded-sm shadow-sm" data-node-id="10391:1204" data-name="unsplash:FLIzAeVvHLo">
              <img alt="Dr. Aurum Mamal" className="absolute inset-0 object-cover size-full pointer-events-none" src={imgAboutPhoto} />
            </div>

          </div>
        </div>
      </section>

      {/* 6. LAYOUT / 249 / (PROCESS) */}
      <section id="process" className="bg-white flex flex-col items-center overflow-hidden px-4 sm:px-8 md:px-[64px] py-10 sm:py-16 lg:py-[112px] relative w-full" data-node-id="10373:67749" data-name="Layout / 249 /">
        <div className="flex flex-col gap-8 sm:gap-14 lg:gap-[80px] items-start max-w-[1280px] w-full" data-node-id="10373:67750" data-name="Container">
          
          <div className="flex flex-col gap-2.5 sm:gap-[16px] items-start max-w-[768px] w-full" data-node-id="10373:67751" data-name="Section Title">
            <div className="flex items-center" data-node-id="10373:67752" data-name="Tagline Wrapper">
              <span className="font-semibold text-[14px] sm:text-[16px] leading-[1.5] text-[#1e90ff] sm:text-[#030a03]" data-node-id="10373:67753">
                Process
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:gap-[24px] items-start text-[#030a03] w-full" data-node-id="10373:67754" data-name="Content">
              <h2 className="font-semibold text-[26px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] w-full" data-node-id="10373:67755">
                How we will be working together
              </h2>
              <p className="font-normal text-[14px] sm:text-[18px] leading-[1.5] w-full text-[#030a03]/80 sm:text-[#030a03]" data-node-id="10373:67756">
                Three clear stages. Direct, disciplined execution focused solely on your wealth preservation.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start w-full" data-node-id="10373:68038" data-name="Content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-[48px] items-start w-full" data-node-id="10373:68037" data-name="Row">
              
              {/* Step 1 */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3 sm:gap-6 lg:gap-[36px] items-center justify-center w-full overflow-hidden p-4 sm:p-5 lg:p-0 rounded-2xl bg-[#f8fbff] lg:bg-transparent border border-[rgba(30,144,255,0.12)] lg:border-none shadow-xs lg:shadow-none"
                data-node-id="10373:68006"
                data-name="Column"
              >
                <div className="h-[120px] sm:h-[200px] lg:h-[284px] relative w-full overflow-hidden flex items-center justify-center rounded-xl bg-white lg:bg-transparent" data-node-id="10391:1126" data-name="image 52">
                  <img alt="First, we talk" className="size-full object-contain pointer-events-none" src={imgProcessStep1} />
                </div>
                <div className="bg-[#1e90ff]/10 lg:bg-[#a0befe] border border-[#1e90ff]/20 lg:border-none flex items-center justify-center size-[36px] sm:size-[44px] lg:w-auto lg:h-auto lg:px-[20px] lg:py-[4px] rounded-full lg:rounded-[100px]" data-node-id="10391:1138">
                  <span className="font-bold text-[18px] sm:text-[22px] lg:text-[40px] leading-none lg:leading-[1.3] text-[#1e90ff] lg:text-[#030a03] text-center tracking-[-0.4px] whitespace-nowrap" data-node-id="10391:1129">
                    1
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-3 lg:gap-[24px] items-center text-[#030a03] w-full text-center" data-node-id="10373:68008" data-name="Content">
                  <h3 className="font-semibold text-[20px] sm:text-[28px] lg:text-[40px] leading-[1.3] tracking-[-0.3px] w-full text-center" data-node-id="10373:68009">
                    First, we talk 
                  </h3>
                  <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] w-full text-center text-[#030a03]/80 sm:text-[#030a03]" data-node-id="10373:68010">
                    We sit down and listen. Your goals, your fears, your numbers. Nothing is off the table.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3 sm:gap-6 lg:gap-[32px] items-center justify-center w-full overflow-hidden p-4 sm:p-5 lg:p-0 rounded-2xl bg-[#f8fbff] lg:bg-transparent border border-[rgba(30,144,255,0.12)] lg:border-none shadow-xs lg:shadow-none"
                data-node-id="10373:68011"
                data-name="Column"
              >
                <div className="h-[120px] sm:h-[200px] lg:h-[293px] relative w-full overflow-hidden flex items-center justify-center rounded-xl bg-white lg:bg-transparent" data-node-id="10391:1122" data-name="image 51">
                  <img alt="Then, we plan" className="size-full object-contain pointer-events-none" src={imgProcessStep2} />
                </div>
                <div className="bg-[#1e90ff]/10 lg:bg-[#a0befe] border border-[#1e90ff]/20 lg:border-none flex items-center justify-center size-[36px] sm:size-[44px] lg:w-auto lg:h-auto lg:px-[20px] lg:py-[4px] rounded-full lg:rounded-[100px]" data-node-id="10391:1142">
                  <span className="font-bold text-[18px] sm:text-[22px] lg:text-[40px] leading-none lg:leading-[1.3] text-[#1e90ff] lg:text-[#030a03] text-center tracking-[-0.4px] whitespace-nowrap" data-node-id="10391:1143">
                    2
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-3 lg:gap-[24px] items-center text-[#030a03] w-full text-center" data-node-id="10373:68013" data-name="Content">
                  <h3 className="font-semibold text-[20px] sm:text-[28px] lg:text-[40px] leading-[1.3] tracking-[-0.3px] w-full text-center" data-node-id="10373:68014">
                    Then, we plan 
                  </h3>
                  <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] w-full text-center text-[#030a03]/80 sm:text-[#030a03]" data-node-id="10373:68015">
                    You get a written plan. Clear, direct, and built only for you. No templates, no noise.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3 sm:gap-6 lg:gap-[32px] items-center justify-center w-full overflow-hidden p-4 sm:p-5 lg:p-0 rounded-2xl bg-[#f8fbff] lg:bg-transparent border border-[rgba(30,144,255,0.12)] lg:border-none shadow-xs lg:shadow-none"
                data-node-id="10373:68016"
                data-name="Column"
              >
                <div className="h-[120px] sm:h-[200px] lg:h-[299px] relative w-full overflow-hidden flex items-center justify-center rounded-xl bg-white lg:bg-transparent" data-node-id="10376:1166" data-name="Risk assessment illustration">
                  <img alt="Finally, we act" className="size-full object-contain pointer-events-none" src={imgProcessStep3} />
                </div>
                <div className="bg-[#1e90ff]/10 lg:bg-[#a0befe] border border-[#1e90ff]/20 lg:border-none flex items-center justify-center size-[36px] sm:size-[44px] lg:w-auto lg:h-auto lg:px-[20px] lg:py-[4px] rounded-full lg:rounded-[100px]" data-node-id="10391:1145">
                  <span className="font-bold text-[18px] sm:text-[22px] lg:text-[40px] leading-none lg:leading-[1.3] text-[#1e90ff] lg:text-[#030a03] text-center tracking-[-0.4px] whitespace-nowrap" data-node-id="10391:1146">
                    3
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-3 lg:gap-[24px] items-center text-[#030a03] w-full text-center" data-node-id="10373:68018" data-name="Content">
                  <h3 className="font-semibold text-[20px] sm:text-[28px] lg:text-[40px] leading-[1.3] tracking-[-0.3px] w-full text-center" data-node-id="10373:68019">
                    Finally, we act
                  </h3>
                  <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.5] w-full text-center text-[#030a03]/80 sm:text-[#030a03]" data-node-id="10373:68020">
                    We build the portfolio and manage it. You live your life, we watch the road.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          <div className="flex gap-[24px] items-center" data-node-id="10373:67773" data-name="Actions">
            <Link
              href="/book"
              className="border border-[rgba(3,10,3,0.15)] flex items-center justify-center px-[24px] py-[10px] font-medium text-[#030a03] text-[16px] leading-[1.5] whitespace-nowrap cursor-pointer transition-colors hover:bg-[rgba(3,10,3,0.03)]"
              data-node-id="10373:67774"
              data-name="Button"
            >
              Book a Call
            </Link>
            <motion.button
              whileHover={{ x: 3 }}
              onClick={() => scrollToSection("faq")}
              className="flex gap-[8px] items-center justify-center font-medium text-[#030a03] text-[16px] leading-[1.5] whitespace-nowrap cursor-pointer"
              data-node-id="10373:67775"
              data-name="Button"
            >
              <span>More</span>
              <div className="relative size-[24px]">
                <img alt="" className="inset-0 size-full" src={imgChevronRight} />
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* 7. FAQ / 4 / */}
      <section id="faq" className="bg-white flex flex-col items-center overflow-hidden px-4 sm:px-8 md:px-[64px] py-10 sm:py-16 lg:py-[112px] relative w-full" data-node-id="10373:68374" data-name="FAQ / 4 /">
        <div className="flex flex-col gap-6 sm:gap-12 lg:gap-[80px] items-center max-w-[1280px] w-full" data-node-id="10373:68375" data-name="Container">
          
          <div className="flex flex-col gap-2 sm:gap-[24px] items-center max-w-[768px] text-center text-[#030a03] w-full" data-node-id="10373:68376" data-name="Section Title">
            <h2 className="font-semibold text-[26px] sm:text-[36px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] w-full" data-node-id="10373:68377">
              FAQs
            </h2>
            <p className="font-normal text-[14px] sm:text-[18px] leading-[1.5] w-full text-[#030a03]/80 sm:text-[#030a03]">
              Straight answers to the questions that matter before you put money on the line.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-[16px] items-start max-w-[768px] w-full" data-node-id="10373:68379" data-name="Accordion List">
            {faqItems.map((item, index) => {
              const isOpen = openFaqs.includes(index);
              return (
                <div
                  key={index}
                  className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.12)] flex flex-col items-start w-full overflow-hidden transition-colors rounded-xl sm:rounded-sm shadow-xs"
                  data-node-id="10373:68844"
                  data-name="Accordion"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex gap-3 sm:gap-[24px] items-center justify-between p-3.5 sm:px-[24px] sm:py-[20px] w-full cursor-pointer text-left select-none"
                    data-node-id="10373:68845"
                    data-name="Question"
                  >
                    <p className="flex-1 font-semibold sm:font-bold text-[15px] sm:text-[18px] leading-[1.4] text-[#030a03]" data-node-id="10373:68846">
                      {item.q}
                    </p>
                    <motion.div
                      animate={{ rotate: isOpen ? 0 : 45 }}
                      transition={{ duration: 0.2 }}
                      className="relative size-[20px] sm:size-[24px] shrink-0"
                      data-node-id="10373:68847"
                      data-name="close"
                    >
                      <img alt="" className="inset-0 size-full" src={imgClose} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden w-full"
                      >
                        <div className="flex items-start pb-3.5 sm:pb-[24px] px-3.5 sm:px-[24px] w-full" data-node-id="10373:68848" data-name="Answer">
                          <p className="flex-1 font-normal text-[13.5px] sm:text-[16px] leading-[1.5] text-[#030a03]/85 sm:text-[#030a03]" data-node-id="10373:68849">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2.5 sm:gap-[12px] items-center max-w-[560px] w-full text-center" data-node-id="10373:68410" data-name="Content">
            <div className="flex flex-col items-center text-[#030a03] w-full" data-node-id="10373:68411" data-name="Content">
              <p className="font-normal text-[15px] sm:text-[18px] leading-[1.5] text-[#030a03] text-center w-full" data-node-id="10373:68413">
                Still have questions?
              </p>
            </div>
            <div className="flex items-center" data-node-id="10373:68414" data-name="Actions">
              <Link
                href="/book"
                className="border border-[#1e3a8a] flex items-center justify-center px-[20px] sm:px-[24px] py-[8px] sm:py-[10px] font-medium text-[#030a03] text-[14px] sm:text-[16px] leading-[1.5] whitespace-nowrap cursor-pointer transition-colors hover:bg-[#e8f3ff] rounded-sm"
                data-node-id="10373:68415"
                data-name="Button"
              >
                Contact Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DIRECT CONTACT COORDINATES (Above Book a Call CTA) */}
      <section id="contact" className="bg-white flex flex-col items-center overflow-hidden px-4 sm:px-8 md:px-[64px] py-10 sm:py-16 lg:py-[96px] relative w-full border-t border-[rgba(3,10,3,0.06)]" data-node-id="10373:68607" data-name="Contact / 24 /">
        <div className="flex flex-col gap-6 sm:gap-12 lg:gap-[64px] items-start max-w-[1280px] w-full" data-node-id="10373:68608" data-name="Container">
          
          <div className="flex flex-col gap-2 sm:gap-[16px] items-start max-w-[768px] w-full" data-node-id="10373:68609" data-name="Section Title">
            <div className="flex items-center w-full" data-node-id="10373:68610" data-name="Tagline Wrapper">
              <span className="font-semibold text-[14px] sm:text-[16px] leading-[1.5] text-[#1e90ff]" data-node-id="10373:68611">
                Direct Principal Access
              </span>
            </div>
            <div className="flex flex-col gap-1.5 sm:gap-2 items-start text-[#030a03] w-full" data-node-id="10373:68612" data-name="Content">
              <h2 className="font-semibold text-[26px] sm:text-[36px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] w-full" data-node-id="10373:68613">
                Reach out to me
              </h2>
              <p className="font-normal text-[14px] sm:text-[18px] leading-[1.5] text-[#030a03]/80 w-full" data-node-id="10373:68614">
                The door is open. Bring your numbers and your questions.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start w-full" data-node-id="10373:69404" data-name="Content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-[48px] items-stretch w-full" data-node-id="10373:69403" data-name="Row">
              
              {/* Email */}
              <motion.div
                whileHover={{ y: -3 }}
                className="flex flex-row md:flex-col gap-3.5 sm:gap-4 lg:gap-[20px] items-center md:items-start w-full p-4 md:p-0 rounded-xl bg-[#f8fbff] md:bg-transparent border border-[rgba(30,144,255,0.12)] md:border-none shadow-xs md:shadow-none"
                data-node-id="10373:69342"
                data-name="Content"
              >
                <div className="size-[42px] sm:size-[48px] rounded-xl bg-white md:bg-transparent border border-[rgba(3,10,3,0.06)] md:border-none flex items-center justify-center p-2.5 shrink-0 shadow-xs md:shadow-none" data-node-id="10373:69343" data-name="mail">
                  <img alt="" className="size-full" src={imgMail} />
                </div>
                <div className="flex flex-col gap-1 md:gap-3 items-start text-[#030a03] flex-1 min-w-0" data-node-id="10373:69344" data-name="Contact Info">
                  <div className="flex flex-col gap-0.5 md:gap-1 items-start w-full" data-node-id="10373:69345" data-name="Content">
                    <h3 className="font-bold text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] leading-[1.2] text-[#030a03] tracking-[-0.3px]" data-node-id="10373:69346">
                      Email
                    </h3>
                    <p className="font-normal text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.4] text-[#030a03]/80" data-node-id="10373:69347">
                      Write to me directly. I answer every letter myself.
                    </p>
                  </div>
                  <a
                    href="mailto:advice@sebiadvisor.in"
                    className="font-medium text-[13px] sm:text-[15px] lg:text-[16px] leading-[1.4] underline text-[#1e90ff] md:text-[#030a03] md:hover:text-[#1e90ff] transition-colors truncate max-w-full"
                    data-node-id="10373:69348"
                  >
                    advice@sebiadvisor.in
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ y: -3 }}
                className="flex flex-row md:flex-col gap-3.5 sm:gap-4 lg:gap-[20px] items-center md:items-start w-full p-4 md:p-0 rounded-xl bg-[#f8fbff] md:bg-transparent border border-[rgba(30,144,255,0.12)] md:border-none shadow-xs md:shadow-none"
                data-node-id="10373:69358"
                data-name="Content"
              >
                <div className="size-[42px] sm:size-[48px] rounded-xl bg-white md:bg-transparent border border-[rgba(3,10,3,0.06)] md:border-none flex items-center justify-center p-2.5 shrink-0 shadow-xs md:shadow-none" data-node-id="10373:69359" data-name="call">
                  <img alt="" className="size-full" src={imgCall} />
                </div>
                <div className="flex flex-col gap-1 md:gap-3 items-start text-[#030a03] flex-1 min-w-0" data-node-id="10373:69360" data-name="Contact Info">
                  <div className="flex flex-col gap-0.5 md:gap-1 items-start w-full" data-node-id="10373:69361" data-name="Content">
                    <h3 className="font-bold text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] leading-[1.2] text-[#030a03] tracking-[-0.3px]" data-node-id="10373:69362">
                      Phone
                    </h3>
                    <p className="font-normal text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.4] text-[#030a03]/80" data-node-id="10373:69363">
                      Call during market hours. If I am with a client, leave a message.
                    </p>
                  </div>
                  <a
                    href="tel:+919820012345"
                    className="font-medium text-[13px] sm:text-[15px] lg:text-[16px] leading-[1.4] underline text-[#1e90ff] md:text-[#030a03] md:hover:text-[#1e90ff] transition-colors"
                    data-node-id="10373:69364"
                  >
                    +91 98200 12345
                  </a>
                </div>
              </motion.div>

              {/* Office */}
              <motion.div
                whileHover={{ y: -3 }}
                className="flex flex-row md:flex-col gap-3.5 sm:gap-4 lg:gap-[20px] items-center md:items-start w-full p-4 md:p-0 rounded-xl bg-[#f8fbff] md:bg-transparent border border-[rgba(30,144,255,0.12)] md:border-none shadow-xs md:shadow-none"
                data-node-id="10373:69366"
                data-name="Content"
              >
                <div className="size-[42px] sm:size-[48px] rounded-xl bg-white md:bg-transparent border border-[rgba(3,10,3,0.06)] md:border-none flex items-center justify-center p-2.5 shrink-0 shadow-xs md:shadow-none" data-node-id="10373:69367" data-name="location_on">
                  <img alt="" className="size-full" src={imgLocationOn} />
                </div>
                <div className="flex flex-col gap-1 md:gap-3 items-start text-[#030a03] flex-1 min-w-0" data-node-id="10373:69368" data-name="Contact Info">
                  <div className="flex flex-col gap-0.5 md:gap-1 items-start w-full" data-node-id="10373:69369" data-name="Content">
                    <h3 className="font-bold text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] leading-[1.2] text-[#030a03] tracking-[-0.3px]" data-node-id="10373:69370">
                      Office
                    </h3>
                    <p className="font-normal text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.4] text-[#030a03]/80" data-node-id="10373:69371">
                      A quiet room in Mumbai. Come for the first talk.
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=42+Marine+Drive+Mumbai"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[13px] sm:text-[15px] lg:text-[16px] leading-[1.4] underline text-[#1e90ff] md:text-[#030a03] md:hover:text-[#1e90ff] transition-colors truncate max-w-full"
                    data-node-id="10373:69372"
                  >
                    42 Marine Drive, Mumbai 400020, India
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA / 31 / (Begin Your Fiduciary Mandate Now !) */}
      <section id="cta" className="bg-[#e8f3ff] flex flex-col items-center overflow-hidden px-4 sm:px-8 md:px-[64px] py-10 sm:py-16 lg:py-[112px] relative w-full" data-node-id="10373:68530" data-name="CTA / 31 /">
        <div className="flex flex-col gap-6 sm:gap-12 lg:gap-[80px] items-center max-w-[1280px] w-full" data-node-id="10373:68531" data-name="Container">
          
          <div className="flex flex-col gap-4 sm:gap-[32px] items-center max-w-[768px] text-center w-full" data-node-id="10373:68532" data-name="Content">
            <div className="flex flex-col gap-2.5 sm:gap-[24px] items-center text-[#030a03] w-full" data-node-id="10373:68533" data-name="Content">
              <h2 className="font-semibold text-[26px] sm:text-[36px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] w-full text-center" data-node-id="10373:68534">
                Begin Your Fiduciary Mandate Now !
              </h2>
              <p className="font-normal text-[14px] sm:text-[18px] leading-[1.5] w-full text-center text-[#030a03]/85 sm:text-[#030a03]" data-node-id="10373:68535">
                Direct principal engagement. Due to the high-touch nature of our written wealth governance, we onboard a maximum of three new client families each month.
              </p>
            </div>
            <div className="flex items-start" data-node-id="10373:68536" data-name="Actions">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/book"
                  className="bg-[#1e90ff] border border-[#1e90ff] flex gap-[8px] h-[44px] items-center justify-center px-[20px] py-[8px] font-medium text-white text-[16px] leading-[1.5] whitespace-nowrap hover:bg-[#0077e6] transition-all cursor-pointer shadow-sm hover:shadow"
                  data-node-id="10393:1875"
                  data-name="Button"
                >
                  <div className="relative size-[24px] shrink-0" data-node-id="10393:1876">
                    <img alt="" className="inset-0 size-full block" src={imgCallWhite} />
                  </div>
                  <span>Book a Call</span>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="aspect-[16/9] sm:aspect-[1280/738] relative w-full overflow-hidden rounded-xl sm:rounded-sm shadow-sm" data-node-id="10393:1873" data-name="Indian currency financial mandate">
            <img alt="Fiduciary financial mandate wealth planning with Indian currency and calculator" className="absolute inset-0 object-cover size-full pointer-events-none" src={imgCtaImage} />
          </div>

        </div>
      </section>

      {/* 11 & 12. FIGMA FOOTER & REGULATORY DISCLOSURES */}
      <FigmaFooter />

    </div>
  );
}
