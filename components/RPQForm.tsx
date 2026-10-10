"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useOnboarding } from "@/context/OnboardingContext";

const rpqSchema = z.object({
  fullName: z.string().min(3, "Legal full name as per PAN is mandatory"),
  email: z.string().email("Valid corporate or personal email required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit Indian mobile number required"),
  entityType: z.string().min(1, "Entity classification is required"),
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
  const searchParams = useSearchParams();
  const initialTier = searchParams.get("tier");

  const { setRPQ } = useOnboarding();
  const [step, setStep] = useState<number>(1);
  const totalSteps = 3;

  const defaultNetWorth =
    initialTier === "sub_50l"
      ? "under_50l"
      : initialTier === "10cr_plus"
      ? "above_10cr"
      : initialTier === "50l_to_2cr"
      ? "50l_to_2cr"
      : "2cr_to_10cr";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RPQFormData>({
    resolver: zodResolver(rpqSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      entityType: "individual_hni",
      age: "36-50",
      horizon: "3_to_7_years",
      netWorth: defaultNetWorth,
      income: "75l_to_2cr",
      experience: "direct_equity_mf",
      drawdownReaction: "remain_invested",
      objective: "wealth_preservation_growth",
      liquidityNeed: "moderate",
      sebiAcknowledge: false,
    },
  });

  const selectedNetWorth = watch("netWorth");
  const selectedReaction = watch("drawdownReaction");
  const selectedHorizon = watch("horizon");
  const selectedEntityType = watch("entityType");
  const selectedAge = watch("age");
  const selectedIncome = watch("income");
  const selectedExperience = watch("experience");

  // Dynamic Risk Score calculation for live gauge
  const computeRiskScore = () => {
    let score = 50;
    if (selectedReaction === "allocate_more") score += 25;
    if (selectedReaction === "panic_exit") score -= 25;
    if (selectedHorizon === "7_plus_years") score += 15;
    if (selectedHorizon === "less_1_year") score -= 20;
    if (selectedNetWorth === "above_10cr") score += 10;
    if (selectedNetWorth === "under_50l") score -= 15;
    return Math.max(10, Math.min(95, score));
  };

  const riskScore = computeRiskScore();
  const isQualified = selectedNetWorth !== "under_50l";

  const getProfileTitle = () => {
    if (riskScore < 40) return "Conservative Capital Preservation";
    if (riskScore <= 70) return "Balanced Strategic Growth";
    return "Capital Accretion & Expansion";
  };

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["fullName", "email", "phone", "entityType", "age", "horizon"]);
    } else if (step === 2) {
      isValid = await trigger(["netWorth", "income", "experience"]);
    }
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const onSubmit = (data: RPQFormData) => {
    const isUnqualified = data.netWorth === "under_50l";

    let calculatedTier: "Conservative Capital Preservation" | "Balanced Strategic Growth" | "Aggressive Capital Accretion" = "Balanced Strategic Growth";
    if (riskScore < 40) calculatedTier = "Conservative Capital Preservation";
    if (riskScore > 70) calculatedTier = "Aggressive Capital Accretion";

    setRPQ({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      netWorth: data.netWorth,
      income: data.income,
      experience: data.experience,
      age: data.age,
      horizon: data.horizon,
      drawdownReaction: data.drawdownReaction,
      objective: data.objective,
      liquidityNeed: data.liquidityNeed,
      riskScore,
      riskTier: calculatedTier,
      riskProfile: calculatedTier,
      isQualified: !isUnqualified,
      completedAt: new Date().toISOString(),
    });

    if (isUnqualified) {
      router.push("/not-qualified");
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: STATUTORY AUDIT RAIL & SUITABILITY SCORECARD */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 text-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Scale className="h-4 w-4 text-slate-900" />
              <span className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Statutory Dossier Rail
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">SEBI Reg. 16/17</span>
          </div>

          {/* Real-time Risk Capacity Dial */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Risk Capacity Index
              </span>
              <span className="text-xs text-slate-900 font-bold">{riskScore} / 100</span>
            </div>

            {/* Gauge Graphic */}
            <div className="relative pt-2">
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-600 transition-all duration-300"
                  style={{ width: `${riskScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-semibold text-slate-500 pt-1.5">
                <span>CONSERVATIVE</span>
                <span>BALANCED</span>
                <span>ACCRETION</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80">
              <span className="text-[11px] text-slate-500 block">Indicated Mandate:</span>
              <span className="text-xs text-slate-900 font-bold block mt-0.5">
                {getProfileTitle()}
              </span>
            </div>
          </div>

          {/* Spam Wall Clearance Status */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isQualified
                ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                : "bg-rose-50/70 border-rose-200 text-rose-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {isQualified ? (
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0" />
              )}
              <div>
                <span className="text-xs uppercase tracking-wider block font-bold">
                  {isQualified ? "Hurdle Gate: PASSED" : "Hurdle Gate: SUB-THRESHOLD"}
                </span>
                <span className="text-[11px] opacity-80 block leading-tight mt-0.5">
                  {isQualified
                    ? "Portfolio >= ₹50L qualifies for direct RIA fee-only mandate"
                    : "Net worth < ₹50L will be redirected to educational waitlist"}
                </span>
              </div>
            </div>
          </div>

          {/* Compliance Audit Trail Checkpoints */}
          <div className="space-y-2 text-xs">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
              SEBI Audit Trail Verification
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2.5 text-slate-700">
                <div
                  className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step >= 1 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  1
                </div>
                <span className={step === 1 ? "text-slate-900 font-bold" : "font-medium"}>
                  PAN & Domicile Clearance
                </span>
              </div>

              <div className="flex items-center space-x-2.5 text-slate-700">
                <div
                  className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step >= 2 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  2
                </div>
                <span className={step === 2 ? "text-slate-900 font-bold" : "font-medium"}>
                  Capital Capacity (Spam Wall)
                </span>
              </div>

              <div className="flex items-center space-x-2.5 text-slate-700">
                <div
                  className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step >= 3 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  3
                </div>
                <span className={step === 3 ? "text-slate-900 font-bold" : "font-medium"}>
                  Crisis Drawdown & Fiduciary Oath
                </span>
              </div>
            </div>
          </div>

          {/* Principal Officer Endorsement */}
          <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
            <span className="text-slate-900 block font-bold">Supervising Principal Officer:</span>
            <span>Rajesh V. Mehta (SEBI RIA: INA000019842)</span>
            <div className="text-[11px] text-slate-400 pt-0.5">
              Strict 1:25 partner-to-family ratio enforced.
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: THE INTERACTIVE QUALIFICATION MATRIX */}
      <div className="lg:col-span-8">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-9 shadow-sm space-y-8">
          {/* Stage Breadcrumb Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="space-y-0.5">
              <span className="text-xs uppercase tracking-wider text-red-600 font-bold">
                Stage 0{step} of 0{totalSteps}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {step === 1 && "Identity, Entity Classification & Investment Horizon"}
                {step === 2 && "Capital Allocation Capacity & Economic Hurdle Gate"}
                {step === 3 && "Crisis Drawdown Stress Testing & Fiduciary Execution"}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-700 block">ENCRYPTED</span>
              <span className="text-[10px] text-slate-400">256-Bit SSL</span>
            </div>
          </div>

          {/* STAGE 1: IDENTITY & ENTITY STRUCTURE */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              {/* Entity Type Selector */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-semibold text-slate-700 block">
                  Legal Entity Classification *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "individual_hni", label: "Individual HNI" },
                    { id: "family_trust", label: "Private Family Trust" },
                    { id: "corporate_treasury", label: "Corporate Treasury" },
                    { id: "huf", label: "HUF Entity" },
                  ].map((ent) => (
                    <button
                      key={ent.id}
                      type="button"
                      onClick={() => setValue("entityType", ent.id)}
                      className={`p-3 text-left rounded-2xl border text-xs font-semibold transition-all ${
                        selectedEntityType === ent.id
                          ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="block">{ent.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Legal Name */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-semibold text-slate-700 block">
                  Full Legal Name (as per Income Tax PAN) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikramaditya Singhania"
                  {...register("fullName")}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-600 font-semibold">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-semibold text-slate-700 block">
                    Official Communication Email *
                  </label>
                  <input
                    type="email"
                    placeholder="v.singhania@familyoffice.in"
                    {...register("email")}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 font-semibold">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-semibold text-slate-700 block">
                    Aadhaar-Linked Mobile Number *
                  </label>
                  <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 focus-within:bg-white focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100 transition-all">
                    <span className="text-xs font-semibold text-slate-500 mr-2 border-r border-slate-200 pr-2">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="9820012345"
                      {...register("phone")}
                      className="w-full bg-transparent py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-rose-600 font-semibold">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Age Bracket & Investment Horizon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-semibold text-slate-700 block">
                    Investor Age Bracket *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "under_35", label: "Under 35 Yrs" },
                      { id: "36-50", label: "36 – 50 Yrs" },
                      { id: "51-65", label: "51 – 65 Yrs" },
                      { id: "above_65", label: "Above 65 Yrs" },
                    ].map((ag) => (
                      <button
                        key={ag.id}
                        type="button"
                        onClick={() => setValue("age", ag.id)}
                        className={`p-2.5 text-center rounded-xl border text-xs font-semibold transition-all ${
                          selectedAge === ag.id
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {ag.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-semibold text-slate-700 block">
                    Mandate Time Horizon *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "less_1_year", label: "< 1 Year (Tactical)" },
                      { id: "1_to_3_years", label: "1 – 3 Years" },
                      { id: "3_to_7_years", label: "3 – 7 Years (Full Cycle)" },
                      { id: "7_plus_years", label: "7+ Yrs (Multi-Gen)" },
                    ].map((hz) => (
                      <button
                        key={hz.id}
                        type="button"
                        onClick={() => setValue("horizon", hz.id)}
                        className={`p-2.5 text-center rounded-xl border text-xs font-semibold transition-all ${
                          selectedHorizon === hz.id
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {hz.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Stage Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary-pill px-8 py-3.5 text-xs font-semibold flex items-center space-x-2 shadow-md group"
                >
                  <span>Proceed to Capital Capacity Hurdle</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: CAPITAL CAPACITY (THE SPAM WALL) */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              {/* THE SPAM WALL MATRIX: 4 BESPOKE CARDS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-semibold text-slate-700 block">
                    Statutory Net Worth Disclosure (Liquid Investable Surplus) *
                  </label>
                  <span className="text-xs text-red-600 font-semibold">
                    Hurdle Mandate: Minimum ₹50 Lakhs
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* TIER 0: SUB-50L (THE FILTER) */}
                  <div
                    onClick={() => setValue("netWorth", "under_50l")}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                      selectedNetWorth === "under_50l"
                        ? "bg-rose-50/80 border-rose-400 ring-2 ring-rose-300"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[10px] uppercase font-bold text-rose-700">
                        Sub-Fiduciary Hurdle
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-200 text-rose-800">
                        FILTER ACTIVE
                      </span>
                    </div>
                    <span className="text-lg text-slate-900 block font-bold">
                      Below ₹50 Lakhs
                    </span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      At this capital scale, RIA fixed retainers incur adverse fee drag. Re-routed to direct index guidelines.
                    </p>
                  </div>

                  {/* TIER 1: 50L - 2CR */}
                  <div
                    onClick={() => setValue("netWorth", "50l_to_2cr")}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                      selectedNetWorth === "50l_to_2cr"
                        ? "bg-red-50/40 border-red-500 ring-2 ring-red-200"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[10px] uppercase font-bold text-emerald-700">
                        Statutory Hurdle Met
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        QUALIFIED
                      </span>
                    </div>
                    <span className="text-lg text-slate-900 block font-bold">
                      ₹50 Lakhs – ₹2 Crores
                    </span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Emerging HNI core mandate. Direct mutual fund architecture, sovereign debt allocation, zero commission.
                    </p>
                  </div>

                  {/* TIER 2: 2CR - 10CR */}
                  <div
                    onClick={() => setValue("netWorth", "2cr_to_10cr")}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                      selectedNetWorth === "2cr_to_10cr"
                        ? "bg-red-50/40 border-red-500 ring-2 ring-red-200"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[10px] uppercase font-bold text-emerald-700">
                        Multi-Asset Architecture
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        CORE WEALTH
                      </span>
                    </div>
                    <span className="text-lg text-slate-900 block font-bold">
                      ₹2 Crores – ₹10 Crores
                    </span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Established private wealth. Direct stock mandates, SGB hedging, multi-account family portfolio governance.
                    </p>
                  </div>

                  {/* TIER 3: ABOVE 10CR */}
                  <div
                    onClick={() => setValue("netWorth", "above_10cr")}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                      selectedNetWorth === "above_10cr"
                        ? "bg-red-50/40 border-red-500 ring-2 ring-red-200"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-[10px] uppercase font-bold text-slate-900">
                        Single Family Office Desk
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">
                        ULTRA-HNI
                      </span>
                    </div>
                    <span className="text-lg text-slate-900 block font-bold">
                      Above ₹10 Crores
                    </span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Institutional family office retainer. Dedicated Investment Committee, private trust succession, global hedging.
                    </p>
                  </div>
                </div>
              </div>

              {/* Taxable Income & Experience Matrices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-semibold text-slate-700 block">
                    Annual Taxable Household Income *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "under_25l", label: "Under ₹25 Lakhs" },
                      { id: "25l_to_75l", label: "₹25L – ₹75 Lakhs" },
                      { id: "75l_to_2cr", label: "₹75L – ₹2 Crores" },
                      { id: "above_2cr", label: "Above ₹2 Crores" },
                    ].map((inc) => (
                      <button
                        key={inc.id}
                        type="button"
                        onClick={() => setValue("income", inc.id)}
                        className={`p-2.5 text-center rounded-xl border text-xs font-semibold transition-all ${
                          selectedIncome === inc.id
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {inc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-semibold text-slate-700 block">
                    Capital Market Experience *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "fd_conservative", label: "Bank FDs / Debt" },
                      { id: "direct_equity_mf", label: "Equities & MFs (5+ Yrs)" },
                      { id: "aif_pms", label: "AIF / PMS / PE" },
                      { id: "fixed_income", label: "Sovereign G-Secs" },
                    ].map((exp) => (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() => setValue("experience", exp.id)}
                        className={`p-2.5 text-center rounded-xl border text-xs font-semibold transition-all ${
                          selectedExperience === exp.id
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous Stage</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary-pill px-8 py-3.5 text-xs font-semibold flex items-center space-x-2 shadow-md group"
                >
                  <span>Proceed to Crisis Stress Testing</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: BEHAVIORAL CRISIS TESTING & STATUTORY DECLARATION */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              {/* Historical Crisis Stress Test */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                      Historical Crisis Scenario Simulation
                    </span>
                    <span className="text-slate-800 font-semibold">
                      Simulated -25% Broad Market Dislocation (e.g. March 2020 Covid Crash)
                    </span>
                  </div>
                  <span className="text-rose-600 text-xs font-bold">-25.0% Drawdown</span>
                </div>

                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-amber-500 w-[25%]" />
                </div>

                {/* 3 Behavioral Response Options */}
                <div className="space-y-2.5 pt-2">
                  {[
                    {
                      id: "panic_exit",
                      title: "Capital Preservation Priority: Liquidate to Risk-Free Debt",
                      desc: "I cannot endure mark-to-market drawdown and prefer preserving remaining principal in liquid sovereign instruments.",
                      badge: "CONSERVATIVE PROTOCOL",
                    },
                    {
                      id: "remain_invested",
                      title: "Fiduciary Rebalance: Maintain Target Asset Allocation",
                      desc: "Execute pre-determined mathematical rebalancing rules between equity and debt without emotional intervention.",
                      badge: "BALANCED PROTOCOL",
                    },
                    {
                      id: "allocate_more",
                      title: "Opportunistic Deployment: Deploy Dry-Powder into Compounding Equities",
                      desc: "Capitalize on systemic valuation compression to accelerate long-term capital compounding.",
                      badge: "EXPANSION PROTOCOL",
                    },
                  ].map((proto) => (
                    <div
                      key={proto.id}
                      onClick={() => setValue("drawdownReaction", proto.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedReaction === proto.id
                          ? "bg-white border-red-500 ring-2 ring-red-100 shadow-sm"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                          {proto.badge}
                        </span>
                        {selectedReaction === proto.id && (
                          <CheckCircle2 className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <span className="text-sm text-slate-900 font-bold block">
                        {proto.title}
                      </span>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {proto.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEBI Statutory Acknowledgement Checkbox */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("sebiAcknowledge")}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 block font-bold mb-0.5">
                      Statutory Investor Charter & Risk Disclosure Acknowledgement
                    </strong>
                    <span>
                      I hereby declare that all financial disclosures provided are true and accurate. I acknowledge that investments in securities markets are subject to market risks, and that Aurum Fiduciary Advisory LLP operates strictly in a fee-only fiduciary capacity under SEBI (Investment Advisers) Regulations, 2013 without guaranteeing returns.
                    </span>
                  </div>
                </label>
                {errors.sebiAcknowledge && (
                  <p className="text-xs text-rose-600 font-semibold">
                    {errors.sebiAcknowledge.message}
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous Stage</span>
                </button>

                <button
                  type="submit"
                  className="btn-primary-pill px-9 py-4 text-xs font-semibold flex items-center space-x-2 shadow-lg group"
                >
                  <span>Submit Dossier & Verify Suitability</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
