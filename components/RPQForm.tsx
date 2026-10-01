"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Lock,
  Building,
  AlertTriangle,
  FileCheck2,
  Sliders,
  DollarSign,
  UserCheck,
} from "lucide-react";
import { useOnboarding } from "@/context/OnboardingContext";

const rpqSchema = z.object({
  fullName: z.string().min(3, "Legal full name as per PAN is mandatory"),
  email: z.string().email("Valid corporate or personal email required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit Indian mobile number required"),
  age: z.string().min(1, "Please select your age bracket"),
  horizon: z.string().min(1, "Please select your investment time horizon"),
  netWorth: z.string().min(1, "Mandatory net worth disclosure required"),
  income: z.string().min(1, "Mandatory taxable income bracket required"),
  experience: z.string().min(1, "Please indicate your capital market experience"),
  drawdownReaction: z.string().min(1, "Drawdown behavioral selection required"),
  objective: z.string().min(1, "Primary financial objective required"),
  liquidityNeed: z.string().min(1, "Liquidity horizon required"),
  sebiAcknowledge: z.boolean().refine((val) => val === true, {
    message: "Mandatory statutory acknowledgement required by SEBI",
  }),
});

type RPQFormData = z.infer<typeof rpqSchema>;

export default function RPQForm() {
  const router = useRouter();
  const { setRPQ, resetOnboarding } = useOnboarding();
  const [step, setStep] = useState<number>(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RPQFormData>({
    resolver: zodResolver(rpqSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      age: "36-50",
      horizon: "3_to_7_years",
      netWorth: "50l_to_2cr",
      income: "25l_to_75l",
      experience: "direct_equity_mf",
      drawdownReaction: "remain_invested",
      objective: "wealth_preservation_growth",
      liquidityNeed: "moderate",
      sebiAcknowledge: false,
    },
  });

  const selectedNetWorth = watch("netWorth");

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["fullName", "email", "phone", "age", "horizon"]);
    } else if (step === 2) {
      isValid = await trigger(["netWorth", "income", "experience"]);
    }
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const onSubmit = (data: RPQFormData) => {
    // Determine Qualification Filter ("Spam Wall")
    const isUnqualified = data.netWorth === "under_50l";

    // Calculate Risk Capacity Score (0 - 100)
    let score = 50;
    if (data.drawdownReaction === "allocate_more") score += 25;
    if (data.drawdownReaction === "panic_exit") score -= 25;
    if (data.horizon === "7_plus_years") score += 15;
    if (data.horizon === "less_1_year") score -= 20;
    if (data.liquidityNeed === "low") score += 10;
    if (data.liquidityNeed === "high") score -= 15;

    let tier: "Conservative Capital Preservation" | "Balanced Strategic Growth" | "Aggressive Capital Accretion" =
      "Balanced Strategic Growth";
    if (score < 45) {
      tier = "Conservative Capital Preservation";
    } else if (score > 75) {
      tier = "Aggressive Capital Accretion";
    }

    setRPQ({
      ...data,
      riskScore: score,
      riskTier: tier,
      isQualified: !isUnqualified,
    });

    if (isUnqualified) {
      router.push("/not-qualified");
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-slate-800 bg-[#090F1E] shadow-2xl overflow-hidden">
      {/* Progress Bar & Header */}
      <div className="border-b border-slate-800/80 bg-[#050B17] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] text-[#C5A059] uppercase tracking-widest font-mono">
              <Lock className="h-3.5 w-3.5" />
              <span>SEBI Mandated Statutory Suitability Assessment</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-slate-100 font-normal mt-1">
              Risk Profiling Questionnaire (RPQ)
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-slate-400">
              Stage <strong className="text-[#DFC68E]">{step}</strong> of {totalSteps}
            </span>
          </div>
        </div>

        {/* Step progress pills */}
        <div className="grid grid-cols-3 gap-2">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 1 ? "bg-[#C5A059]" : "bg-slate-800"
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 2 ? "bg-[#C5A059]" : "bg-slate-800"
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 3 ? "bg-[#C5A059]" : "bg-slate-800"
            }`}
          />
        </div>
      </div>

      {/* High friction statutory warning banner */}
      <div className="bg-[#0A1226] border-b border-slate-800/80 px-6 py-2.5 flex items-center space-x-2 text-[11px] text-slate-300">
        <ShieldAlert className="h-4 w-4 text-[#C5A059] shrink-0" />
        <span>
          Under Regulation 16 of SEBI (IA) Regulations, 2013, accurate disclosure is a statutory prerequisite for portfolio advice.
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-8">
        {/* STEP 1: IDENTITY & INVESTMENT HORIZON */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg text-slate-100 font-medium">
                Stage 1: Legal Identity & Time Horizon
              </h3>
              <p className="text-xs text-slate-400">
                Ensure details match your Income Tax Department (PAN) records for KYC synchronization.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Full Legal Name (as per PAN Card) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikramaditya Singhania"
                  {...register("fullName")}
                  className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-400">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Official Communication Email *
                </label>
                <input
                  type="email"
                  placeholder="name@familyoffice.com"
                  {...register("email")}
                  className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Mobile Number (Aadhaar Linked) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm text-slate-400 font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9820012345"
                    {...register("phone")}
                    className="w-full rounded-md border border-slate-700 bg-[#050B17] pl-12 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-400">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Age Bracket *</label>
                <select
                  {...register("age")}
                  className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-2.5 text-sm text-slate-100 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                >
                  <option value="21-35">21 – 35 Years (Early Wealth Creation)</option>
                  <option value="36-50">36 – 50 Years (Peak Earnings / Expansion)</option>
                  <option value="51-65">51 – 65 Years (Wealth Consolidation & Succession)</option>
                  <option value="65_plus">Above 65 Years (Intergenerational Trust & Legacy)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Targeted Investment Horizon *
                </label>
                <select
                  {...register("horizon")}
                  className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-2.5 text-sm text-slate-100 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                >
                  <option value="less_1_year">Less than 1 Year (Short-Term Liquidity)</option>
                  <option value="1_to_3_years">1 – 3 Years (Medium-Term Capital)</option>
                  <option value="3_to_7_years">3 – 7 Years (Full Market Cycle Allocation)</option>
                  <option value="7_plus_years">7+ Years (Multi-Decadal & Family Office Legacy)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center px-6 py-3 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-semibold uppercase tracking-wider hover:bg-[#DFC68E] transition-colors"
              >
                <span>Continue to Financial Capacity</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FINANCIAL CAPACITY & THE SPAM WALL FILTER */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg text-slate-100 font-medium">
                Stage 2: Financial Capacity & Investable Assets
              </h3>
              <p className="text-xs text-slate-400">
                SEBI guidelines require verification of liquid investable surplus to establish suitability.
              </p>
            </div>

            {/* THE SPAM WALL: Net Worth Selector */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-200 block">
                Total Liquid Investable Net Worth (Excluding Primary Residence) *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedNetWorth === "under_50l"
                      ? "border-rose-500/80 bg-rose-950/20"
                      : "border-slate-800 bg-[#050B17] hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-200">Below ₹50 Lakhs</div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Retail / Emerging Investor Surplus
                      </div>
                    </div>
                    <input
                      type="radio"
                      value="under_50l"
                      {...register("netWorth")}
                      className="mt-1"
                    />
                  </div>
                  {selectedNetWorth === "under_50l" && (
                    <div className="mt-2.5 pt-2 border-t border-rose-900/40 text-[10px] text-rose-300 flex items-center space-x-1">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      <span>Does not meet our ₹50 Lakhs fiduciary intake mandate.</span>
                    </div>
                  )}
                </label>

                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedNetWorth === "50l_to_2cr"
                      ? "border-[#C5A059] bg-[#0A1226]"
                      : "border-slate-800 bg-[#050B17] hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-200">₹50 Lakhs – ₹2 Crores</div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Qualified Emerging HNI
                      </div>
                    </div>
                    <input
                      type="radio"
                      value="50l_to_2cr"
                      {...register("netWorth")}
                      className="mt-1"
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-emerald-400 font-mono">
                    ✓ Eligible for Bespoke Fiduciary Mandate
                  </div>
                </label>

                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedNetWorth === "2cr_to_10cr"
                      ? "border-[#C5A059] bg-[#0A1226]"
                      : "border-slate-800 bg-[#050B17] hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-200">₹2 Crores – ₹10 Crores</div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        High-Net-Worth Individual (HNI)
                      </div>
                    </div>
                    <input
                      type="radio"
                      value="2cr_to_10cr"
                      {...register("netWorth")}
                      className="mt-1"
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-emerald-400 font-mono">
                    ✓ Eligible for Institutional Multi-Asset Portfolio
                  </div>
                </label>

                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedNetWorth === "above_10cr"
                      ? "border-[#C5A059] bg-[#0A1226]"
                      : "border-slate-800 bg-[#050B17] hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-200">Above ₹10 Crores</div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Ultra-HNI / Single Family Office
                      </div>
                    </div>
                    <input
                      type="radio"
                      value="above_10cr"
                      {...register("netWorth")}
                      className="mt-1"
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-emerald-400 font-mono">
                    ✓ Eligible for Comprehensive Family Office Governance
                  </div>
                </label>
              </div>
              {errors.netWorth && (
                <p className="text-[11px] text-rose-400">{errors.netWorth.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Annual Taxable Household Income *
                </label>
                <select
                  {...register("income")}
                  className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-2.5 text-sm text-slate-100 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                >
                  <option value="under_25l">Below ₹25 Lakhs</option>
                  <option value="25l_to_75l">₹25 Lakhs – ₹75 Lakhs</option>
                  <option value="75l_to_2cr">₹75 Lakhs – ₹2 Crores</option>
                  <option value="above_2cr">Above ₹2 Crores</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Market Experience & Instruments Held *
                </label>
                <select
                  {...register("experience")}
                  className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-2.5 text-sm text-slate-100 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                >
                  <option value="direct_equity_mf">Direct Equities & Mutual Funds (5+ Years)</option>
                  <option value="fixed_income">Sovereign Debt & Corporate Bonds</option>
                  <option value="aif_pms">AIF Category II/III, PMS & Private Equity</option>
                  <option value="fd_conservative">Conservative (Bank FDs & Postal Savings)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center px-4 py-2.5 text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center px-6 py-3 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-semibold uppercase tracking-wider hover:bg-[#DFC68E] transition-colors"
              >
                <span>Continue to Risk Capacity</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DRAWDOWN TOLERANCE & STATUTORY DECLARATION */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg text-slate-100 font-medium">
                Stage 3: Behavioral Risk Capacity & Final Declaration
              </h3>
              <p className="text-xs text-slate-400">
                Statutory evaluation of physiological reaction to simulated equity volatility.
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-medium text-slate-200 block">
                During a severe macroeconomic correction, your portfolio declines by 20% over 90 days. What is your reaction? *
              </label>

              <div className="space-y-2.5">
                <label className="p-3.5 rounded-lg border border-slate-800 bg-[#050B17] flex items-center space-x-3 cursor-pointer hover:border-slate-600">
                  <input
                    type="radio"
                    value="panic_exit"
                    {...register("drawdownReaction")}
                    className="mt-0.5"
                  />
                  <div className="text-xs text-slate-300">
                    <strong className="text-slate-100 block">Liquidate Immediately to Cash:</strong>
                    I cannot tolerate temporary mark-to-market drawdown of capital.
                  </div>
                </label>

                <label className="p-3.5 rounded-lg border border-slate-800 bg-[#050B17] flex items-center space-x-3 cursor-pointer hover:border-slate-600">
                  <input
                    type="radio"
                    value="remain_invested"
                    {...register("drawdownReaction")}
                    className="mt-0.5"
                  />
                  <div className="text-xs text-slate-300">
                    <strong className="text-slate-100 block">Maintain Strategic Asset Allocation:</strong>
                    Remain invested and rebalance according to pre-determined mathematical thresholds.
                  </div>
                </label>

                <label className="p-3.5 rounded-lg border border-slate-800 bg-[#050B17] flex items-center space-x-3 cursor-pointer hover:border-slate-600">
                  <input
                    type="radio"
                    value="allocate_more"
                    {...register("drawdownReaction")}
                    className="mt-0.5"
                  />
                  <div className="text-xs text-slate-300">
                    <strong className="text-slate-100 block">Opportunistic Capital Deployment:</strong>
                    Deploy additional liquid surplus into undervalued high-quality assets.
                  </div>
                </label>
              </div>
              {errors.drawdownReaction && (
                <p className="text-[11px] text-rose-400">{errors.drawdownReaction.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Primary Objective *</label>
                <select
                  {...register("objective")}
                  className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-2.5 text-sm text-slate-100 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                >
                  <option value="wealth_preservation">Capital Preservation (Beat Inflation)</option>
                  <option value="wealth_preservation_growth">Balanced Real Growth (Preservation + Capital Accretion)</option>
                  <option value="aggressive_growth">Aggressive Long-Term Compounding</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Anticipated Liquidity Needs (Next 24 Months) *
                </label>
                <select
                  {...register("liquidityNeed")}
                  className="w-full rounded-md border border-slate-700 bg-[#050B17] px-4 py-2.5 text-sm text-slate-100 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                >
                  <option value="low">Negligible (&lt;10% of surplus required)</option>
                  <option value="moderate">Moderate (10% to 25% earmarked for planned outflows)</option>
                  <option value="high">Substantial (&gt;25% needed in near-term liquid form)</option>
                </select>
              </div>
            </div>

            {/* SEBI Mandatory Acknowledgment Checkbox */}
            <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("sebiAcknowledge")}
                  className="mt-1 h-4 w-4 rounded border-slate-700 text-[#C5A059] focus:ring-[#C5A059]"
                />
                <span className="text-[11px] leading-relaxed text-slate-300">
                  I hereby declare that the financial parameters, net worth bracket, and behavioral inputs provided herein are accurate and reflect my true financial capacity. I acknowledge that Aurum Fiduciary Advisory LLP operates solely as a fee-only SEBI Registered Investment Adviser and does not promise or assure capital appreciation or fixed returns.
                </span>
              </label>
              {errors.sebiAcknowledge && (
                <p className="text-[11px] text-rose-400">{errors.sebiAcknowledge.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center px-4 py-2.5 text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Previous</span>
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-8 py-3.5 rounded border border-[#C5A059] bg-[#C5A059] text-[#050B17] text-xs font-bold uppercase tracking-wider hover:bg-[#DFC68E] transition-all shadow-lg shadow-[#C5A059]/20"
              >
                <span>Execute Suitability Evaluation</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
