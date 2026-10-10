"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import FigmaNavbar from "@/components/FigmaNavbar";
import FigmaFooter from "@/components/FigmaFooter";

const imgMail = "/figma/mail.svg";
const imgCall = "/figma/call.svg";
const imgLocationOn = "/figma/location-on.svg";
const imgChevronRight = "/figma/chevron-right.svg";

function BookingFormInner() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const profileParam = searchParams.get("profile");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolioSize: "₹1 Crore - ₹5 Crores",
    meetingMode: "Google Meet (Video Call)",
    primaryFocus: planParam === "blueprint" 
      ? "Comprehensive Portfolio Audit" 
      : planParam === "nri" 
      ? "Cross-Border NRI Wealth Governance" 
      : "Family Asset Allocation & Retirement",
    notes: profileParam ? `Preliminary RPQ Category: ${profileParam}` : "",
  });

  const [otherFocusText, setOtherFocusText] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (planParam === "blueprint") {
      setFormData((prev) => ({ ...prev, primaryFocus: "Comprehensive Portfolio Audit" }));
    } else if (planParam === "nri") {
      setFormData((prev) => ({ ...prev, primaryFocus: "Cross-Border NRI Wealth Governance" }));
    } else if (planParam === "retainer") {
      setFormData((prev) => ({ ...prev, primaryFocus: "Family Asset Allocation & Retirement" }));
    }

    if (profileParam) {
      setFormData((prev) => ({
        ...prev,
        notes: prev.notes ? prev.notes : `Preliminary RPQ Category: ${profileParam}`,
      }));
    }
  }, [planParam, profileParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const payload = {
        ...formData,
        primaryFocus:
          formData.primaryFocus === "Others" && otherFocusText.trim()
            ? `Others: ${otherFocusText.trim()}`
            : formData.primaryFocus,
        company_fax_hp: honeypot,
      };

      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(data.error || "Failed to submit consultation request. Please try again.");
      }
    } catch {
      setSubmitError("Network connectivity issue. Please try again or reach out directly via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[48px] items-start w-full">
      {/* Left 5 Cols: Fiduciary Assurances & Direct Desk */}
      <div className="lg:col-span-5 flex flex-col gap-6 w-full">
        
        <div className="bg-white border border-[rgba(3,10,3,0.15)] p-6 sm:p-8 rounded-sm shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1e90ff]">
              Direct Engagement
            </span>
            <h2 className="font-semibold text-[24px] sm:text-[28px] text-[#030a03] leading-[1.3] tracking-[-0.3px]">
              What to Expect
            </h2>
            <p className="text-sm text-[#030a03]/75 leading-relaxed">
              This 30-minute discovery conversation evaluates whether our boutique fiduciary model matches your wealth complexity.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[rgba(3,10,3,0.08)]">
            <div className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-[#e8f3ff] text-[#1e90ff] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#030a03]">Zero Sales Pressure</h3>
                <p className="text-xs text-[#030a03]/70 leading-relaxed mt-0.5">
                  We sell zero mutual funds, insurance, or PMS products. You will never encounter an aggressive sales pitch.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-[#e8f3ff] text-[#1e90ff] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#030a03]">Direct Principal Access</h3>
                <p className="text-xs text-[#030a03]/70 leading-relaxed mt-0.5">
                  You speak directly with Dr. Aurum Mamal, not a relationship manager or junior sales rep.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-[#e8f3ff] text-[#1e90ff] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#030a03]">Complete Discretion</h3>
                <p className="text-xs text-[#030a03]/70 leading-relaxed mt-0.5">
                  All discussions and preliminary figures are protected under statutory SEBI RIA confidentiality guidelines.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Office & Contact Info */}
          <div className="pt-4 border-t border-[rgba(3,10,3,0.08)] flex flex-col gap-3 text-xs text-[#030a03]/80">
            <div className="flex items-center gap-2.5">
              <img alt="" className="size-4 shrink-0 opacity-75" src={imgLocationOn} />
              <span>42 Marine Drive, Mumbai 400020, India</span>
            </div>
            <div className="flex items-center gap-2.5">
              <img alt="" className="size-4 shrink-0 opacity-75" src={imgCall} />
              <a href="tel:+919820012345" className="hover:text-[#1e90ff] transition-colors">+91 98200 12345</a>
            </div>
            <div className="flex items-center gap-2.5">
              <img alt="" className="size-4 shrink-0 opacity-75" src={imgMail} />
              <a href="mailto:advice@sebiadvisor.in" className="hover:text-[#1e90ff] transition-colors">advice@sebiadvisor.in</a>
            </div>
            <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-[#030a03]/60 font-mono">
              <span className="bg-[#e8f3ff] px-2 py-0.5 rounded">SEBI: INA000015678</span>
              <span className="bg-[#e8f3ff] px-2 py-0.5 rounded">BASL: 1892</span>
            </div>
          </div>
        </div>

      </div>

      {/* Right 7 Cols: Streamlined 60-Second Intake */}
      <div className="lg:col-span-7 bg-white border border-[rgba(3,10,3,0.15)] p-6 sm:p-8 lg:p-[40px] rounded-sm shadow-sm w-full">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-6 py-4"
          >
            <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                Discovery Session Requested
              </span>
              <h3 className="font-bold text-[26px] sm:text-[30px] text-[#030a03]">
                Thank You, {formData.name || "Investor"}
              </h3>
              <p className="text-sm sm:text-base text-[#030a03]/80 leading-relaxed">
                Your consultation request has been received. Dr. Aurum Mamal&apos;s desk will send a formal calendar invite and Google Meet link to <strong className="text-[#030a03]">{formData.email}</strong> within 1 business day.
              </p>
            </div>

            {/* Session Summary Card */}
            <div className="bg-[#e8f3ff] p-5 rounded-sm border border-[rgba(3,10,3,0.08)] flex flex-col gap-2 text-sm text-[#030a03]">
              <span className="font-bold text-xs uppercase tracking-wider text-[#1e90ff]">Session Summary:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div>
                  <strong>Focus:</strong>{" "}
                  {formData.primaryFocus === "Others" && otherFocusText.trim()
                    ? `Others (${otherFocusText.trim()})`
                    : formData.primaryFocus}
                </div>
                <div><strong>Portfolio Range:</strong> {formData.portfolioSize}</div>
                <div><strong>Format:</strong> {formData.meetingMode}</div>
                <div><strong>Phone / WhatsApp:</strong> {formData.phone}</div>
              </div>
            </div>

            {/* Preparation Document Checklist */}
            <div className="bg-[#fafbfc] border border-[rgba(3,10,3,0.12)] p-5 sm:p-6 rounded-sm flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-base">📋</span>
                <h4 className="font-semibold text-sm sm:text-base text-[#030a03]">
                  How to Prepare for Your Discovery Call (Checklist)
                </h4>
              </div>

              <p className="text-xs text-[#030a03]/75 leading-relaxed">
                To maximize your 30 minutes with Dr. Mamal, we recommend having the following ready to view on your screen:
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-[#030a03]/85">
                <div className="flex items-start gap-2.5">
                  <span className="font-bold text-[#1e90ff] shrink-0">1.</span>
                  <div>
                    <strong className="text-[#030a03]">Consolidated Account Statement (CAS):</strong> Keep your latest CAMS / KFintech or NSDL consolidated statement open to audit regular plan commission drag.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="font-bold text-[#1e90ff] shrink-0">2.</span>
                  <div>
                    <strong className="text-[#030a03]">High-Level Asset Breakdown:</strong> A rough ballpark allocation across Equities, Fixed Deposits/Debt, Real Estate, and PMS/AIFs.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="font-bold text-[#1e90ff] shrink-0">3.</span>
                  <div>
                    <strong className="text-[#030a03]">Insurance Policies Overview:</strong> Basic count/premiums of traditional endowment / ULIP policies vs. pure term life protection.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="font-bold text-[#1e90ff] shrink-0">4.</span>
                  <div>
                    <strong className="text-[#030a03]">Your Top 2 Financial Goals or Frustrations:</strong> E.g. retirement date clarity, capital gains tax optimization, or cleaning up messy broker portfolios.
                  </div>
                </div>
              </div>

              {/* Fiduciary Privacy Guarantee */}
              <div className="bg-emerald-50 border border-emerald-200/70 p-3 rounded-sm text-[11px] sm:text-xs text-emerald-900 flex items-start gap-2">
                <span className="text-emerald-600 font-bold text-sm shrink-0">🔒</span>
                <div>
                  <strong>No File Uploads or Advance KYC Required:</strong> Under statutory SEBI regulations, complete KYC and Risk Profiling are conducted during formal client onboarding. You do not need to email any files or passwords beforehand; keeping them on your screen is sufficient.
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-[rgba(3,10,3,0.08)]">
              <Link
                href="/"
                className="bg-[#1e90ff] hover:bg-[#0077e6] text-white px-6 py-3 text-center text-sm font-medium rounded-sm transition-all"
              >
                Return to Home
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="border border-[rgba(3,10,3,0.15)] hover:bg-black/5 text-[#030a03] px-6 py-3 text-center text-sm font-medium rounded-sm transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
            <div className="flex flex-col gap-1 pb-4 border-b border-[rgba(3,10,3,0.08)]">
              <h3 className="font-bold text-[22px] sm:text-[24px] text-[#030a03]">
                Schedule Your Discovery Call
              </h3>
              <p className="text-xs sm:text-sm text-[#030a03]/70">
                Direct principal engagement. No fee is charged for this introductory session.
              </p>
            </div>

            {/* Hidden Honeypot field for bot trapping */}
            <div style={{ display: "none", opacity: 0, position: "absolute", left: "-9999px" }} aria-hidden="true">
              <label htmlFor="company_fax_hp">Leave this field blank</label>
              <input
                type="text"
                id="company_fax_hp"
                name="company_fax_hp"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-[#030a03]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhania"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="p-3 border border-[rgba(3,10,3,0.15)] rounded-sm text-sm focus:outline-none focus:border-[#1e90ff] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-[#030a03]">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98200 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="p-3 border border-[rgba(3,10,3,0.15)] rounded-sm text-sm focus:outline-none focus:border-[#1e90ff] transition-colors"
                />
              </div>
            </div>

            {/* Email & Investable Portfolio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-[#030a03]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram@familyoffice.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="p-3 border border-[rgba(3,10,3,0.15)] rounded-sm text-sm focus:outline-none focus:border-[#1e90ff] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-[#030a03]">Investable Wealth Range</label>
                <select
                  value={formData.portfolioSize}
                  onChange={(e) => setFormData({ ...formData, portfolioSize: e.target.value })}
                  className="p-3 border border-[rgba(3,10,3,0.15)] rounded-sm text-sm bg-white focus:outline-none focus:border-[#1e90ff] transition-colors cursor-pointer"
                >
                  <option>₹50 Lakhs - ₹1 Crore</option>
                  <option>₹1 Crore - ₹5 Crores</option>
                  <option>₹5 Crores - ₹25 Crores</option>
                  <option>₹25 Crores+</option>
                </select>
              </div>
            </div>

            {/* Meeting Mode & Primary Focus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-[#030a03]">Preferred Format</label>
                <select
                  value={formData.meetingMode}
                  onChange={(e) => setFormData({ ...formData, meetingMode: e.target.value })}
                  className="p-3 border border-[rgba(3,10,3,0.15)] rounded-sm text-sm bg-white focus:outline-none focus:border-[#1e90ff] transition-colors cursor-pointer"
                >
                  <option>Google Meet (Video Call)</option>
                  <option>Telephone Conference</option>
                  <option>In-Person (Marine Drive, Mumbai)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-[#030a03]">Primary Focus Area</label>
                <select
                  value={formData.primaryFocus}
                  onChange={(e) => setFormData({ ...formData, primaryFocus: e.target.value })}
                  className="p-3 border border-[rgba(3,10,3,0.15)] rounded-sm text-sm bg-white focus:outline-none focus:border-[#1e90ff] transition-colors cursor-pointer"
                >
                  <option>Family Asset Allocation &amp; Retirement</option>
                  <option>Comprehensive Portfolio &amp; Commission Audit</option>
                  <option>Cross-Border NRI Wealth Governance</option>
                  <option>Business Owner Capital Succession</option>
                  <option>Others</option>
                </select>
              </div>
            </div>

            {/* Custom Focus Specification if Others is selected */}
            {formData.primaryFocus === "Others" && (
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-xs text-[#030a03]">
                  Specify Focus Area (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Estate transition, ESOP liquidity, Family Trust structure"
                  value={otherFocusText}
                  onChange={(e) => setOtherFocusText(e.target.value)}
                  className="p-3 border border-[rgba(3,10,3,0.15)] rounded-sm text-sm focus:outline-none focus:border-[#1e90ff] transition-colors"
                />
              </div>
            )}

            {/* Short Optional Note */}
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs text-[#030a03]">
                Brief Note or Financial Goal (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Audit regular mutual funds, plan retirement exit, or consolidate scattered PMS."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="p-3 border border-[rgba(3,10,3,0.15)] rounded-sm text-sm focus:outline-none focus:border-[#1e90ff] transition-colors"
              />
            </div>

            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#1e90ff] hover:bg-[#0077e6] disabled:opacity-60 text-white py-3.5 px-6 font-medium text-sm sm:text-base rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Dispatching Request..." : "Confirm Consultation Request"}</span>
              {!isSubmitting && (
                <img alt="" className="size-4 invert group-hover:translate-x-1 transition-transform" src={imgChevronRight} />
              )}
            </button>

            <p className="text-[11px] text-[#030a03]/60 text-center leading-relaxed">
              Advisory services governed by SEBI (Investment Advisers) Regulations, 2013. Consultations are confidential and non-binding.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="flex flex-col items-start relative w-full bg-white text-[#030a03]">
      <FigmaNavbar />

      {/* Hero Block */}
      <section className="bg-white flex items-center justify-center px-5 sm:px-8 md:px-[64px] py-12 sm:py-16 lg:py-[72px] w-full border-b border-[#030a03]/5">
        <div className="flex flex-col gap-4 sm:gap-5 items-start max-w-[1280px] w-full">
          <div className="flex items-center">
            <span className="font-semibold text-[14px] sm:text-[16px] leading-[1.5] text-[#1e90ff]">
              Confidential Discovery Session &bull; 30 Minutes
            </span>
          </div>
          <h1 className="font-bold text-[32px] sm:text-[44px] lg:text-[54px] leading-[1.2] text-[#030a03] tracking-[-0.03em] max-w-[960px]">
            Book Your Fiduciary Consultation
          </h1>
          <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#030a03]/80 max-w-[820px]">
            Direct principal conversation with Dr. Aurum Mamal, SEBI Registered Investment Adviser. We review your family&apos;s current capital allocation, evaluate commission leaks, and determine whether our fee-only retainer fits your goals.
          </p>
        </div>
      </section>

      {/* Main Intake Form Section */}
      <section className="bg-[#e8f3ff] flex flex-col items-center px-5 sm:px-8 md:px-[64px] py-12 sm:py-16 lg:py-[80px] w-full">
        <div className="flex flex-col gap-10 items-start max-w-[1280px] w-full">
          <Suspense
            fallback={
              <div className="w-full bg-white p-12 text-center text-sm text-[#030a03]/60 rounded-sm">
                Loading Consultation Intake Desk...
              </div>
            }
          >
            <BookingFormInner />
          </Suspense>
        </div>
      </section>

      <FigmaFooter />
    </div>
  );
}
