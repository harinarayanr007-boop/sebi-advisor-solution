"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import FigmaNavbar from "@/components/FigmaNavbar";
import FigmaFooter from "@/components/FigmaFooter";

const imgInvestmentPlanning = "/figma/investment-planning.png";
const imgPortfolioManagement = "/figma/portfolio-management.png";
const imgRiskAssessment = "/figma/risk-assessment.png";
const imgChevronRight = "/figma/chevron-right.svg";

export default function FeeDragCalculatorPage() {
  // Calculator state
  const [portfolio, setPortfolio] = useState<number>(10000000); // ₹1 Crore
  const [monthlySip, setMonthlySip] = useState<number>(50000); // ₹50,000/mo
  const [horizon, setHorizon] = useState<number>(20); // 20 years
  const [expectedReturn, setExpectedReturn] = useState<number>(12); // 12% p.a.
  const [commissionRate, setCommissionRate] = useState<number>(1.15); // 1.15% p.a.
  const [flatFee, setFlatFee] = useState<number>(50000); // ₹50,000/year

  // Financial calculations
  const mathResults = useMemo(() => {
    const rDirect = expectedReturn / 100;
    const rRegular = Math.max(0, (expectedReturn - commissionRate) / 100);

    const calculateFv = (rate: number, years: number) => {
      // Annual compounding approximation with monthly SIP
      const months = years * 12;
      const monthlyRate = Math.pow(1 + rate, 1 / 12) - 1;
      
      const lumpSumFv = portfolio * Math.pow(1 + rate, years);
      const sipFv = monthlyRate > 0 
        ? monthlySip * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
        : monthlySip * months;
      
      return lumpSumFv + sipFv;
    };

    const directFv = calculateFv(rDirect, horizon);
    const regularFv = calculateFv(rRegular, horizon);
    const grossCommissionLoss = directFv - regularFv;
    const totalRiaFeePaid = flatFee * horizon;
    const netSavings = Math.max(0, grossCommissionLoss - totalRiaFeePaid);
    const percentageLost = directFv > 0 ? (grossCommissionLoss / directFv) * 100 : 0;

    // Milestones at 5, 10, 15, 20, 25 years
    const milestoneYears = [5, 10, 15, 20, 25].filter((y) => y <= Math.max(horizon, 15));
    if (!milestoneYears.includes(horizon)) {
      milestoneYears.push(horizon);
      milestoneYears.sort((a, b) => a - b);
    }

    const milestones = milestoneYears.map((yr) => {
      const dFv = calculateFv(rDirect, yr);
      const rFv = calculateFv(rRegular, yr);
      const loss = dFv - rFv;
      return {
        year: yr,
        direct: dFv,
        regular: rFv,
        loss,
      };
    });

    return {
      directFv,
      regularFv,
      grossCommissionLoss,
      totalRiaFeePaid,
      netSavings,
      percentageLost,
      milestones,
    };
  }, [portfolio, monthlySip, horizon, expectedReturn, commissionRate, flatFee]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${Math.round(val).toLocaleString("en-IN")}`;
  };

  return (
    <div className="flex flex-col items-start relative w-full bg-white text-[#030a03]">
      <FigmaNavbar />

      {/* Hero Block */}
      <section className="bg-white flex items-center justify-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[96px] w-full border-b border-[#030a03]/5">
        <div className="flex flex-col gap-6 items-start max-w-[1280px] w-full">
          <div className="flex items-center">
            <span className="font-semibold text-[16px] leading-[1.5] text-[#1e90ff]">
              Fiduciary Economics &bull; Direct vs Regular Mutual Funds
            </span>
          </div>
          <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.15] text-[#030a03] tracking-[-0.03em] max-w-[960px]">
            The Mutual Fund Fee Drag Calculator
          </h1>
          <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80 max-w-[820px]">
            Banks and distributors pitch regular plans as &quot;free advice.&quot; In reality, they silently pocket 1% to 1.5% of your total portfolio every year directly from the NAV. See the tens of lakhs you save by switching to pure fee-only Direct Plans.
          </p>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[64px] items-start max-w-[1280px] w-full">
          
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">Real-time Compounding Audit</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              Simulate Your Portfolio Cost Drag
            </h2>
            <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80">
              Adjust your portfolio parameters below to measure the exact terminal wealth destroyed by distributor commissions over time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[40px] items-start w-full">
            
            {/* Input Sliders (Left 7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-[rgba(3,10,3,0.15)] p-6 sm:p-8 lg:p-[40px] rounded-sm flex flex-col gap-8 shadow-sm w-full">
              
              {/* Slider 1: Portfolio Size */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-[16px] text-[#030a03]">Existing Portfolio / Lump Sum</label>
                  <span className="font-bold text-[18px] text-[#1e90ff]">{formatCurrency(portfolio)}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={100000000}
                  step={500000}
                  value={portfolio}
                  onChange={(e) => setPortfolio(Number(e.target.value))}
                  className="w-full accent-[#1e90ff] cursor-pointer h-2 bg-[#e8f3ff] rounded-lg"
                />
                <div className="flex justify-between text-xs text-[#030a03]/50">
                  <span>₹10 Lakh</span>
                  <span>₹1 Crore</span>
                  <span>₹10 Crore</span>
                </div>
              </div>

              {/* Slider 2: Monthly SIP */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-[16px] text-[#030a03]">Ongoing Monthly SIP</label>
                  <span className="font-bold text-[18px] text-[#1e90ff]">{formatCurrency(monthlySip)}/mo</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500000}
                  step={5000}
                  value={monthlySip}
                  onChange={(e) => setMonthlySip(Number(e.target.value))}
                  className="w-full accent-[#1e90ff] cursor-pointer h-2 bg-[#e8f3ff] rounded-lg"
                />
                <div className="flex justify-between text-xs text-[#030a03]/50">
                  <span>₹0</span>
                  <span>₹1 Lakh</span>
                  <span>₹5 Lakh</span>
                </div>
              </div>

              {/* Slider 3: Investment Horizon */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-[16px] text-[#030a03]">Investment Horizon</label>
                  <span className="font-bold text-[18px] text-[#1e90ff]">{horizon} Years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={horizon}
                  onChange={(e) => setHorizon(Number(e.target.value))}
                  className="w-full accent-[#1e90ff] cursor-pointer h-2 bg-[#e8f3ff] rounded-lg"
                />
                <div className="flex justify-between text-xs text-[#030a03]/50">
                  <span>5 Yrs</span>
                  <span>15 Yrs</span>
                  <span>30 Yrs</span>
                </div>
              </div>

              {/* Slider 4: Expected Market Return */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-[16px] text-[#030a03]">Expected Equity Return (CAGR)</label>
                  <span className="font-bold text-[18px] text-[#030a03]">{expectedReturn}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={16}
                  step={0.5}
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full accent-[#1e90ff] cursor-pointer h-2 bg-[#e8f3ff] rounded-lg"
                />
                <div className="flex justify-between text-xs text-[#030a03]/50">
                  <span>8% (Conservative)</span>
                  <span>12% (Balanced)</span>
                  <span>16% (Aggressive)</span>
                </div>
              </div>

              {/* Slider 5: Regular Plan Commission */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-[16px] text-[#030a03]">Distributor Commission / Regular Drag</label>
                  <span className="font-bold text-[18px] text-red-600">-{commissionRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={2.0}
                  step={0.05}
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer h-2 bg-red-100 rounded-lg"
                />
                <div className="flex justify-between text-xs text-[#030a03]/50">
                  <span>0.5% (Large Cap)</span>
                  <span>1.15% (Industry Avg)</span>
                  <span>2.0% (Mid/Small Cap)</span>
                </div>
              </div>

              {/* Slider 6: Fee-Only RIA Retainer */}
              <div className="flex flex-col gap-3 pt-4 border-t border-[rgba(3,10,3,0.08)]">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="font-medium text-[16px] text-[#030a03]">Flat Fee-Only Advisory Retainer</label>
                    <p className="text-xs text-[#030a03]/60">Fixed fee paid to RIA, irrespective of AUM growth</p>
                  </div>
                  <span className="font-bold text-[18px] text-[#1e90ff]">₹{flatFee.toLocaleString("en-IN")}/yr</span>
                </div>
                <input
                  type="range"
                  min={25000}
                  max={125000}
                  step={5000}
                  value={flatFee}
                  onChange={(e) => setFlatFee(Number(e.target.value))}
                  className="w-full accent-[#1e90ff] cursor-pointer h-2 bg-[#e8f3ff] rounded-lg"
                />
                <div className="flex justify-between text-xs text-[#030a03]/50">
                  <span>₹25k</span>
                  <span>₹50k (Standard)</span>
                  <span>₹1.25L (SEBI Statutory Cap)</span>
                </div>
              </div>

            </div>

            {/* Live Results Panel (Right 5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 w-full">
              
              {/* Highlight Card */}
              <div className="bg-[#030a03] text-white p-8 sm:p-10 rounded-sm flex flex-col gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1e90ff]/20 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="text-[#1e90ff] font-semibold text-sm uppercase tracking-wider">
                    Net Wealth Saved in Your Pocket
                  </span>
                  <div className="font-bold font-roboto text-[44px] sm:text-[52px] leading-[1.1] text-white">
                    {formatCurrency(mathResults.netSavings)}
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    By eliminating commissions in Direct Plans (even after accounting for full fee-only retainer).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 relative z-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/60">Commission Siphoned</span>
                    <span className="font-bold text-lg text-red-400">
                      {formatCurrency(mathResults.grossCommissionLoss)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/60">Portfolio Drain</span>
                    <span className="font-bold text-lg text-amber-400">
                      {mathResults.percentageLost.toFixed(1)}% Lost
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-white/10 relative z-10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/80">Direct Plan Terminal Value:</span>
                    <span className="font-semibold text-[#1e90ff]">{formatCurrency(mathResults.directFv)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/80">Regular Plan Terminal Value:</span>
                    <span className="font-semibold text-white/80">{formatCurrency(mathResults.regularFv)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/80">Total RIA Fees Paid ({horizon} yrs):</span>
                    <span className="font-semibold text-white/80">{formatCurrency(mathResults.totalRiaFeePaid)}</span>
                  </div>
                </div>

                <Link
                  href="/book"
                  className="mt-2 bg-[#1e90ff] hover:bg-[#0077e6] text-white text-center font-medium py-3 px-6 rounded-sm transition-all flex items-center justify-center gap-2 group relative z-10"
                >
                  <span>Recover Your Siphoned Wealth</span>
                  <img alt="" className="size-4 invert group-hover:translate-x-1 transition-transform" src={imgChevronRight} />
                </Link>
              </div>

              {/* Small Explanatory Notice */}
              <div className="bg-white border border-[rgba(3,10,3,0.15)] p-6 rounded-sm text-xs text-[#030a03]/80 leading-relaxed">
                <span className="font-bold text-[#030a03] block mb-1">How This Math Works:</span>
                Mutual fund commissions are deducted daily from the NAV before the price is published. This 1.15% compound fee eats away not only the commission itself, but every rupee of compounding returns that money would have generated over {horizon} years.
              </div>

            </div>

          </div>

          {/* Milestone Breakdown Table */}
          <div className="bg-white border border-[rgba(3,10,3,0.15)] p-6 sm:p-8 lg:p-[40px] rounded-sm w-full flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-[20px] text-[#030a03]">Year-by-Year Wealth Divergence</h3>
              <p className="text-sm text-[#030a03]/70">Notice how the commission gap expands exponentially as compounding takes hold:</p>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#030a03]/10 text-xs uppercase tracking-wider text-[#030a03]/60 bg-[#e8f3ff]/40">
                    <th className="py-3 px-4 font-semibold">Horizon</th>
                    <th className="py-3 px-4 font-semibold text-[#1e90ff]">Direct Plan Portfolio</th>
                    <th className="py-3 px-4 font-semibold text-[#030a03]/70">Regular Plan Portfolio</th>
                    <th className="py-3 px-4 font-semibold text-red-600">Commission Siphoned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#030a03]/5">
                  {mathResults.milestones.map((m) => (
                    <tr key={m.year} className="hover:bg-[#e8f3ff]/20 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#030a03]">{m.year} Years</td>
                      <td className="py-3.5 px-4 font-bold text-[#1e90ff]">{formatCurrency(m.direct)}</td>
                      <td className="py-3.5 px-4 text-[#030a03]/80">{formatCurrency(m.regular)}</td>
                      <td className="py-3.5 px-4 font-semibold text-red-600">-{formatCurrency(m.loss)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Educational Micro-Image Cards */}
      <section className="bg-white flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[112px] w-full">
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[64px] items-start max-w-[1280px] w-full">
          <div className="flex flex-col gap-3 max-w-[768px] w-full">
            <span className="font-semibold text-[16px] text-[#030a03]">The Mechanics of Extraction</span>
            <h2 className="font-normal text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
              Why Most Investors Never Notice the Fee
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[32px] w-full">
            
            {/* Card 1 */}
            <div className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.12)] p-6 sm:p-8 flex flex-col gap-5 rounded-sm">
              <div className="w-[48px] h-[48px] rounded-sm bg-white p-2 flex items-center justify-center border border-[rgba(3,10,3,0.1)]">
                <img alt="" className="size-full object-contain" src={imgInvestmentPlanning} />
              </div>
              <h3 className="font-semibold text-[20px] text-[#030a03]">Invisible NAV Deductions</h3>
              <p className="font-normal text-[15px] leading-[1.6] text-[#030a03]/80">
                You never receive an invoice. The fund house simply skims the distributor&apos;s cut from the fund&apos;s Net Asset Value every midnight before announcing the day&apos;s returns.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.12)] p-6 sm:p-8 flex flex-col gap-5 rounded-sm">
              <div className="w-[48px] h-[48px] rounded-sm bg-white p-2 flex items-center justify-center border border-[rgba(3,10,3,0.1)]">
                <img alt="" className="size-full object-contain" src={imgPortfolioManagement} />
              </div>
              <h3 className="font-semibold text-[20px] text-[#030a03]">The Exponential Drain</h3>
              <p className="font-normal text-[15px] leading-[1.6] text-[#030a03]/80">
                A 1.15% fee sounds harmless when your portfolio is small. But as your capital compounds into crores, that small percentage extracts tens of lakhs in cash every single year.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#e8f3ff] border border-[rgba(3,10,3,0.12)] p-6 sm:p-8 flex flex-col gap-5 rounded-sm">
              <div className="w-[48px] h-[48px] rounded-sm bg-white p-2 flex items-center justify-center border border-[rgba(3,10,3,0.1)]">
                <img alt="" className="size-full object-contain" src={imgRiskAssessment} />
              </div>
              <h3 className="font-semibold text-[20px] text-[#030a03]">Perverse Sales Incentives</h3>
              <p className="font-normal text-[15px] leading-[1.6] text-[#030a03]/80">
                Distributors earn higher commissions on volatile thematic funds and NFOs than on stable index funds. Their paycheck is tied to products that pay them most, not what protects you best.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Audit CTA Block */}
      <section className="bg-white flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-14 sm:py-20 lg:py-[96px] w-full border-t border-[rgba(3,10,3,0.08)]">
        <div className="relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8 max-w-[1280px] w-full text-white p-8 sm:p-12 lg:p-[56px] rounded-2xl shadow-xl border border-[rgba(3,10,3,0.15)]">
          {/* Background image from home page */}
          <img
            src="/figma/cta-image.png"
            alt="Fiduciary financial mandate"
            className="absolute inset-0 size-full object-cover object-center pointer-events-none select-none"
          />
          {/* Subtle directional gradient: dark on left for text readability, clear on right to showcase the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030a03]/95 via-[#030a03]/55 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-3 max-w-[700px]">
            <span className="font-semibold text-[14px] sm:text-[16px] text-[#1e90ff]">Complimentary Fee Audit</span>
            <h2 className="font-bold text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.2] text-white tracking-[-0.3px]">
              Find Out Exactly How Much You Are Leaking Today
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-white/85">
              Upload your CAS (Consolidated Account Statement) for a 100% confidential fiduciary audit. We will calculate your exact annual commission leak down to the rupee.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <Link
              href="/book"
              className="bg-[#1e90ff] hover:bg-[#0077e6] text-white px-8 py-3.5 font-medium text-[16px] text-center rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <img src="/figma/call-white.svg" alt="" className="size-4 shrink-0" />
              <span>Book Fee Audit</span>
            </Link>
            <Link
              href="/fees"
              className="border border-white/20 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 font-medium text-[16px] text-center rounded-sm transition-colors backdrop-blur-xs"
            >
              View Transparent Fees
            </Link>
          </div>
        </div>
      </section>

      <FigmaFooter />
    </div>
  );
}
