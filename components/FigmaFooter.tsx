"use client";

import React from "react";
import Link from "next/link";
import { CompanyLogo } from "./FigmaNavbar";

const imgDivider = "/figma/divider.svg";

export default function FigmaFooter() {
  return (
    <>
      {/* 1. FOOTER / 6 / (LINKS FOOTER) */}
      <footer className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-12 sm:py-16 lg:py-[80px] relative w-full" data-node-id="10373:69021" data-name="Footer / 6 /">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[80px] items-start max-w-[1280px] w-full" data-node-id="10373:69022" data-name="Container">
          
          {/* Top Divider */}
          <div className="h-0 relative w-full border-t border-[rgba(3,10,3,0.15)]" data-node-id="10373:69034" data-name="Divider">
            <img alt="" className="block w-full" src={imgDivider} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-[40px] items-start w-full" data-node-id="10373:69035" data-name="Links">
            
            {/* Column 1: Our firm */}
            <div className="flex flex-col gap-[16px] items-start w-full" data-node-id="10373:69036" data-name="Column">
              <p className="font-semibold text-[16px] leading-[1.5] text-[#030a03] w-full" data-node-id="10373:69037">
                Our firm
              </p>
              <div className="flex flex-col items-start w-full" data-node-id="10373:69038" data-name="Footer Links">
                <Link href="/#about" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  About me
                </Link>
                <Link href="/philosophy" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Investment Philosophy
                </Link>
                <Link href="/#process" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  How we work
                </Link>
                <Link href="/#faq" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  FAQs
                </Link>
                <Link href="/fees" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Fee Schedule
                </Link>
              </div>
            </div>

            {/* Column 2: Our services */}
            <div className="flex flex-col gap-[16px] items-start w-full" data-node-id="10373:69049" data-name="Column">
              <p className="font-semibold text-[16px] leading-[1.5] text-[#030a03] w-full" data-node-id="10373:69050">
                Our services
              </p>
              <div className="flex flex-col items-start w-full" data-node-id="10373:69051" data-name="Footer Links">
                <Link href="/#services" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Financial planning
                </Link>
                <Link href="/#services" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Portfolio management
                </Link>
                <Link href="/fee-drag-calculator" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Fee Drag Calculator
                </Link>
                <Link href="/#services" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Risk assessment
                </Link>
              </div>
            </div>

            {/* Column 3: Legal */}
            <div className="flex flex-col gap-[16px] items-start w-full" data-node-id="10373:69075" data-name="Column">
              <p className="font-semibold text-[16px] leading-[1.5] text-[#030a03] w-full" data-node-id="10373:69076">
                Legal
              </p>
              <div className="flex flex-col items-start w-full" data-node-id="10373:69077" data-name="Footer Links">
                <Link href="/disclosures" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Disclosures &amp; Terms
                </Link>
                <Link href="/investor-charter" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Investor Rights
                </Link>
                <Link href="/complaints-data" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Complaints Audit
                </Link>
                <Link href="/disclosures#grievance" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Grievance Redressal
                </Link>
                <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  SEBI SCORES Portal &nearr;
                </a>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div className="flex flex-col gap-[16px] items-start w-full" data-node-id="10373:69088" data-name="Column">
              <p className="font-semibold text-[16px] leading-[1.5] text-[#030a03] w-full" data-node-id="10373:69089">
                Contact
              </p>
              <div className="flex flex-col items-start w-full" data-node-id="10373:69090" data-name="Footer Links">
                <Link href="/book" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Schedule consultation
                </Link>
                <a href="mailto:advice@sebiadvisor.in" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  advice@sebiadvisor.in
                </a>
                <a href="tel:+919820012345" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  +91 98200 12345
                </a>
                <span className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] text-left">
                  Mumbai, Marine Drive
                </span>
                <span className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] text-left">
                  Mon - Fri (Market Hours)
                </span>
              </div>
            </div>

            {/* Column 5: Regulatory */}
            <div className="flex flex-col gap-[16px] items-start w-full col-span-2 sm:col-span-1" data-node-id="10373:69101" data-name="Column">
              <p className="font-semibold text-[16px] leading-[1.5] text-[#030a03] w-full" data-node-id="10373:69102">
                Regulatory
              </p>
              <div className="flex flex-col items-start w-full" data-node-id="10373:69103" data-name="Footer Links">
                <Link href="/disclosures" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  SEBI Registration details
                </Link>
                <Link href="/investor-charter" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Investor charter
                </Link>
                <Link href="/complaints-data" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  Complaints Audit (Monthly)
                </Link>
                <a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  SMART ODR Portal &nearr;
                </a>
                <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="py-[6px] sm:py-[8px] font-normal text-[14px] leading-[1.5] text-[#030a03] hover:text-[#1e90ff] transition-colors text-left">
                  SCORES Portal &nearr;
                </a>
              </div>
            </div>

          </div>

          {/* Credits Row */}
          <div className="flex flex-col gap-6 sm:gap-[32px] items-start w-full" data-node-id="10373:69114" data-name="Credits">
            <div className="h-0 relative w-full border-t border-[rgba(3,10,3,0.15)]" data-node-id="10373:69115" data-name="Divider">
              <img alt="" className="block w-full" src={imgDivider} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full" data-node-id="10373:69116" data-name="Row">
              <CompanyLogo className="h-[36px] w-[84px]" />
              <div className="flex items-center" data-node-id="10373:69118" data-name="Credits">
                <p className="font-normal text-[14px] leading-[1.5] text-[#030a03] text-center sm:text-right" data-node-id="10373:69119">
                  &copy; 2025 Aurum Fiduciary Advisory. SEBI Reg: INA000015678. All rights reserved.
                </p>
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* 2. FOOTER / 6 / (REGULATORY DISCLOSURES CONTAINER) */}
      <section id="disclosures" className="bg-white flex flex-col items-center pb-12 sm:pb-16 lg:pb-[80px] px-5 sm:px-8 md:px-[64px] relative w-full" data-node-id="10384:1091" data-name="Footer / 6 /">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[80px] items-start max-w-[1280px] w-full" data-node-id="10384:1092" data-name="Container">
          
          <div className="h-0 relative w-full border-t border-[rgba(3,10,3,0.15)]" data-node-id="10384:1104" data-name="Divider">
            <img alt="" className="block w-full" src={imgDivider} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[40px] items-start w-full" data-node-id="10384:1105" data-name="Links">
            
            {/* Box 1 (Left) */}
            <div className="bg-[#e8f3ff] flex flex-col gap-8 sm:gap-[56px] min-h-[380px] lg:min-h-[454px] items-start p-6 sm:p-[32px] w-full border border-[rgba(3,10,3,0.08)] rounded-sm" data-node-id="10384:1106" data-name="Column">
              
              <div className="flex flex-col gap-[16px] items-start w-full" data-node-id="10384:1218">
                <div className="flex flex-col items-start w-full" data-node-id="10384:1191">
                  <p className="font-semibold text-[16px] leading-[1.5] text-[#030a03] w-full" data-node-id="10384:1107">
                    Important Disclosures
                  </p>
                </div>
                <p className="font-normal text-[14px] leading-[1.5] text-[#030a03] max-w-[620px]" data-node-id="10384:1110">
                  Investment in securities market are subject to market risks. Read all the related documents carefully before investing.
                </p>
                <div className="flex items-start py-[8px] w-full" data-node-id="10384:1161">
                  <p className="flex-1 font-normal text-[14px] leading-[1.5] text-[#030a03]" data-node-id="10384:1162">
                    Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-[16px] items-start text-[#030a03] leading-[1.5] w-full" data-node-id="10384:1192">
                <p className="font-semibold text-[16px] w-full" data-node-id="10384:1193">
                  Operation &amp; Zero Commission Model
                </p>
                <p className="font-normal text-[14px] w-full" data-node-id="10384:1194">
                  We operate strictly on a fee-only advisory model. We do not distribute financial products or receive any commission, brokerage, referral fees, or inducements from any Asset Management Companies (AMCs), insurance providers, or third-party financial institutions. All investment recommendations are executed strictly in Direct Plans.
                </p>
              </div>

            </div>

            {/* Box 2 (Right) */}
            <div className="bg-[#e8f3ff] flex flex-col items-start p-6 sm:p-[32px] w-full min-h-[380px] lg:min-h-[454px] border border-[rgba(3,10,3,0.08)] rounded-sm" data-node-id="10384:1219">
              <div className="flex flex-col gap-6 sm:gap-[46px] items-start w-full" data-node-id="10384:1158" data-name="Column">
                
                <div className="flex flex-col gap-[16px] items-start leading-[1.5] text-[#030a03] w-full" data-node-id="10384:1217">
                  <p className="font-semibold text-[16px] w-full" data-node-id="10384:1159">
                    Regulatory Registration
                  </p>
                  <p className="font-normal text-[14px] max-w-[620px]" data-node-id="10384:1198">
                    Entity Name : Aurum Fiduciary
                  </p>
                  <p className="font-normal text-[14px] max-w-[620px]" data-node-id="10384:1199">
                    Type : Individual SEBI Registered Investment Adviser
                  </p>
                  <p className="font-normal text-[14px] max-w-[620px]" data-node-id="10384:1200">
                    SEBI Reg No. : INA000015678 (Earlier Ref: INA0000019842)
                  </p>
                  <p className="font-normal text-[14px] max-w-[620px]" data-node-id="10384:1201">
                    BASL Membership : BASL - 1892
                  </p>
                </div>

                <div className="flex flex-col items-start w-full" data-node-id="10384:1216">
                  <div className="flex flex-col gap-[16px] items-start leading-[1.5] text-[#030a03] w-full" data-node-id="10384:1210">
                    <p className="font-semibold text-[16px] w-full" data-node-id="10384:1211">
                      Statutory Officers &amp; Grievance
                    </p>
                    <p className="font-normal text-[14px] w-full" data-node-id="10384:1212">
                      Principal Officer: Dr. Aurum Mamal
                    </p>
                    <p className="font-normal text-[14px] w-full" data-node-id="10384:1213">
                      Grievance Email : advice@sebiadvisor.in (Escalation: fafniu@gmail.com)
                    </p>
                    <p className="font-normal text-[14px] w-full" data-node-id="10384:1214">
                      Compliance Officer: Dr. Aurum Mamal
                    </p>
                    <p className="font-normal text-[14px] w-full" data-node-id="10384:1215">
                      SEBI Local Office: SEBI Bhavan, Bandra Kurla Complex (BKC), Mumbai
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
