"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Lock,
  ArrowRight,
  CheckCircle2,
  FileText,
  Sliders,
  DollarSign,
  Download,
  Sparkles,
} from "lucide-react";
import {
  HuxButton,
  HuxCard,
  HuxCardFooter,
  HuxBadge,
  HuxTabs,
  HuxTabList,
  HuxTabTrigger,
  HuxTabContent,
  HuxInput,
  HuxTextarea,
  HuxSwitch,
  HuxStatCard,
} from "./index";

export default function HuxWealthDeskShowcase() {
  const [taxHarvesting, setTaxHarvesting] = useState(true);
  const [autoRebalance, setAutoRebalance] = useState(false);
  const [auditNotifications, setAuditNotifications] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [intakeSuccess, setIntakeSuccess] = useState(false);

  // Intake form state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [netWorthBand, setNetWorthBand] = useState("₹5 Cr - ₹15 Cr");

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIntakeSuccess(true);
      setTimeout(() => setIntakeSuccess(false), 4000);
    }, 1200);
  };

  return (
    <section className="w-full bg-[#FBFBFC] border-y border-[rgba(0,0,0,0.08)] py-16 sm:py-24 px-4 sm:px-8 md:px-12 relative overflow-hidden">
      {/* Background Accent Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#0038C8_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2">
              <HuxBadge variant="neo">HUX UI SYSTEM</HuxBadge>
              <HuxBadge variant="primary" dot>Live Wealth Desk Engine</HuxBadge>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight leading-[1.15]">
              Institutional-Grade Client Portal & Onboarding Desk
            </h2>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Engineered exclusively for SEBI-registered RIAs and multi-family wealth offices. Clean micro-borders, instantaneous state feedback, and zero clutter.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <HuxButton
              variant="outline"
              size="md"
              onClick={() => {
                const el = document.getElementById("hux-interactive-demo");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Components
            </HuxButton>
            <HuxButton
              variant="primary"
              size="md"
              iconRight={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                window.location.href = "/book";
              }}
            >
              Request Custom Build
            </HuxButton>
          </div>
        </div>

        {/* Live Hux Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <HuxStatCard
            title="PORTFOLIO ASSETS (AUM)"
            value="₹48.50 Cr"
            change="+18.4% YoY"
            trend="up"
            subtitle="vs. Nifty 50 TRI"
            icon={<TrendingUp className="w-4 h-4" />}
          />
          <HuxStatCard
            title="ACTIVE UHNI FAMILIES"
            value="24 Retainers"
            change="+3 This Quarter"
            trend="up"
            subtitle="100% Direct Plans"
            icon={<Users className="w-4 h-4" />}
          />
          <HuxStatCard
            title="AVERAGE TICKET SIZE"
            value="₹2.02 Cr"
            change="Zero Commission"
            trend="neutral"
            subtitle="Fiduciary Fee-Only"
            icon={<DollarSign className="w-4 h-4" />}
          />
          <HuxStatCard
            title="SEBI AUDIT INTEGRITY"
            value="100.0%"
            change="Fully Compliant"
            trend="up"
            subtitle="INA000015678"
            icon={<ShieldCheck className="w-4 h-4" />}
            variant="neo"
          />
        </div>

        {/* Interactive Hux UI Component Sandbox */}
        <div id="hux-interactive-demo" className="w-full">
          <HuxCard variant="elevated" className="border-[rgba(0,0,0,0.1)] bg-white shadow-xl overflow-hidden">
            <HuxTabs defaultValue="portal" variant="segment" className="gap-0">
              {/* Card Header with Hux Segmented Tabs */}
              <div className="p-6 border-b border-[rgba(0,0,0,0.06)] bg-[#FAFAFC] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1E1E1E] text-lg">Interactive Advisor Workstation</span>
                    <HuxBadge variant="success" dot className="text-[11px]">Realtime State</HuxBadge>
                  </div>
                  <span className="text-xs text-[#6B7280]">
                    Toggle tabs below to preview the integrated RIA digital experience.
                  </span>
                </div>

                <HuxTabList>
                  <HuxTabTrigger value="portal">
                    Client Wealth Desk
                  </HuxTabTrigger>
                  <HuxTabTrigger value="intake">
                    Intake & KYC
                  </HuxTabTrigger>
                  <HuxTabTrigger value="compliance">
                    SEBI Vault & Audit
                  </HuxTabTrigger>
                </HuxTabList>
              </div>

              {/* Tab 1: Client Wealth Desk */}
              <HuxTabContent value="portal">
                <div className="p-6 sm:p-8 flex flex-col lg:flex-row gap-8">
                  {/* Left Column: Asset Allocation Breakdown */}
                  <div className="flex-1 flex flex-col gap-6 text-left">
                    <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-4">
                      <div>
                        <h4 className="font-bold text-[#1E1E1E] text-base sm:text-lg">Varma Family Trust Allocation</h4>
                        <p className="text-xs text-[#6B7280]">Consolidated Pan-India Accounts • Refreshed 10m ago</p>
                      </div>
                      <HuxBadge variant="primary">Conservative Growth (65:35)</HuxBadge>
                    </div>

                    {/* Allocation Bars */}
                    <div className="flex flex-col gap-3.5">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#1E1E1E]">Direct Large-Cap Equity</span>
                          <span className="text-[#0038C8]">₹21.80 Cr (45%)</span>
                        </div>
                        <div className="h-2.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0038C8] rounded-full" style={{ width: "45%" }} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#1E1E1E]">Direct Mid & Flexi-Cap</span>
                          <span className="text-[#001B66]">₹9.70 Cr (20%)</span>
                        </div>
                        <div className="h-2.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div className="h-full bg-[#001B66] rounded-full" style={{ width: "20%" }} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#1E1E1E]">Target Maturity Debt & Sovereign Gold Bonds</span>
                          <span className="text-[#0284C7]">₹12.12 Cr (25%)</span>
                        </div>
                        <div className="h-2.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0284C7] rounded-full" style={{ width: "25%" }} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#1E1E1E]">Liquid Emergency Reserve (Overnight Index)</span>
                          <span className="text-[#10B981]">₹4.88 Cr (10%)</span>
                        </div>
                        <div className="h-2.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div className="h-full bg-[#10B981] rounded-full" style={{ width: "10%" }} />
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Tiles */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-[10px] bg-[#F9FAFB] border border-[rgba(0,0,0,0.06)] flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[8px] bg-[#EEF4FF] text-[#0038C8] flex items-center justify-center shrink-0">
                          <Sliders className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#1E1E1E]">Current Beta</div>
                          <div className="text-sm font-bold text-[#0038C8]">0.84 (Defensive)</div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-[10px] bg-[#F9FAFB] border border-[rgba(0,0,0,0.06)] flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[8px] bg-[#ECFDF5] text-[#065F46] flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#1E1E1E]">Drawdown Cap</div>
                          <div className="text-sm font-bold text-[#065F46]">-7.5% Stress Test</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Hux Interactive Toggles */}
                  <div className="w-full lg:w-[360px] flex flex-col gap-5 p-5 bg-[#FAFAFC] rounded-[12px] border border-[rgba(0,0,0,0.06)] text-left">
                    <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-3">
                      <span className="text-sm font-bold text-[#1E1E1E]">Advisor Automation Controls</span>
                      <HuxBadge variant="outline">HuxSwitch</HuxBadge>
                    </div>

                    <div className="flex flex-col gap-4">
                      <HuxSwitch
                        checked={taxHarvesting}
                        onCheckedChange={setTaxHarvesting}
                        label="Tax-Loss Harvesting Autopilot"
                        description="Flag capital loss offsets before March 31 financial year-end."
                      />

                      <div className="h-px bg-[rgba(0,0,0,0.06)]" />

                      <HuxSwitch
                        checked={autoRebalance}
                        onCheckedChange={setAutoRebalance}
                        label="5% Drift Threshold Alert"
                        description="Notify client when equity deviates more than ±5% from policy."
                      />

                      <div className="h-px bg-[rgba(0,0,0,0.06)]" />

                      <HuxSwitch
                        checked={auditNotifications}
                        onCheckedChange={setAuditNotifications}
                        label="SEBI Timestamped Receipts"
                        description="Auto-generate audit logs for all advisory recommendations."
                      />
                    </div>

                    <div className="pt-2">
                      <HuxButton
                        variant="neo"
                        size="md"
                        className="w-full justify-center"
                        iconLeft={<Download className="w-4 h-4" />}
                        onClick={() => alert("Quarterly Fiduciary Performance Report generated.")}
                      >
                        Export Client PDF Report
                      </HuxButton>
                    </div>
                  </div>
                </div>
              </HuxTabContent>

              {/* Tab 2: Digital Intake & KYC */}
              <HuxTabContent value="intake">
                <div className="p-6 sm:p-8">
                  <form onSubmit={handleIntakeSubmit} className="max-w-2xl mx-auto flex flex-col gap-6 text-left">
                    <div className="flex flex-col gap-1 border-b border-[rgba(0,0,0,0.06)] pb-4">
                      <h4 className="font-bold text-[#1E1E1E] text-lg">Fast-Track Fiduciary Client Intake</h4>
                      <p className="text-xs text-[#6B7280]">
                        No paperwork friction. Captures investor profile, risk tolerance, and investment mandate under SEBI (Investment Advisers) Regulations, 2013.
                      </p>
                    </div>

                    {intakeSuccess && (
                      <div className="p-4 rounded-[10px] bg-[#ECFDF5] border border-[#10B981] text-[#065F46] flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <div className="text-xs sm:text-sm font-semibold">
                          Intake profile saved! Advisor agreement generated with timestamped SHA-256 audit hash.
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <HuxInput
                        label="Full Name of Primary Account Holder"
                        placeholder="e.g. Capt. Hemantkumar Varma"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                      />
                      <HuxInput
                        label="Confidential Email Address"
                        placeholder="hemant@echveefinserv.com"
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-xs sm:text-sm font-semibold text-[#1E1E1E]">
                          Target Investable Surplus
                        </label>
                        <select
                          value={netWorthBand}
                          onChange={(e) => setNetWorthBand(e.target.value)}
                          className="w-full bg-[#F9FAFB] text-[#1E1E1E] text-sm rounded-[10px] border border-[rgba(0,0,0,0.12)] px-3.5 py-2.5 outline-none focus:bg-white focus:border-[#0038C8]"
                        >
                          <option>₹1 Cr - ₹3 Cr (Private Wealth Core)</option>
                          <option>₹3 Cr - ₹10 Cr (Family Office Retainer)</option>
                          <option>₹10 Cr+ (Institutional Multi-Asset)</option>
                        </select>
                      </div>

                      <HuxInput
                        label="Permanent Account Number (PAN)"
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        helperText="Verified directly via NSDL sandbox"
                      />
                    </div>

                    <HuxTextarea
                      label="Primary Goals & Fiduciary Mandate"
                      placeholder="Describe legacy succession requirements, current mutual fund portfolio size, tax drag pain points..."
                      rows={3}
                    />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <Lock className="w-4 h-4 text-[#0038C8]" />
                        <span>256-bit AES encrypted. Client data never shared.</span>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <HuxButton
                          type="button"
                          variant="secondary"
                          size="md"
                          onClick={() => {
                            setClientName("Capt. Hemantkumar Varma");
                            setClientEmail("hemant@echveefinserv.com");
                          }}
                        >
                          Fill Sample Lead
                        </HuxButton>
                        <HuxButton
                          type="submit"
                          variant="primary"
                          size="md"
                          loading={isSubmitting}
                        >
                          Submit & Generate Agreement
                        </HuxButton>
                      </div>
                    </div>
                  </form>
                </div>
              </HuxTabContent>

              {/* Tab 3: SEBI Vault & Audit */}
              <HuxTabContent value="compliance">
                <div className="p-6 sm:p-8 flex flex-col gap-6 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-4">
                    <div>
                      <h4 className="font-bold text-[#1E1E1E] text-lg">SEBI Audit Trail & Disclosure Ledger</h4>
                      <p className="text-xs text-[#6B7280]">
                        Regulation 19(1) compliant. All client risk disclosures and asset allocation notes are immutable.
                      </p>
                    </div>
                    <HuxBadge variant="neo">AUDIT READY • 2026</HuxBadge>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-[rgba(0,0,0,0.08)] bg-[#FAFAFC] text-[#6B7280] font-semibold">
                          <th className="py-3 px-4">TIMESTAMP (IST)</th>
                          <th className="py-3 px-4">EVENT TYPE</th>
                          <th className="py-3 px-4">ACCOUNT</th>
                          <th className="py-3 px-4">STATUS</th>
                          <th className="py-3 px-4 text-right">VERIFIED HASH</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgba(0,0,0,0.06)] font-mono text-xs">
                        <tr>
                          <td className="py-3.5 px-4 font-sans text-[#1E1E1E]">Nov 02, 2026 18:42</td>
                          <td className="py-3.5 px-4 font-sans font-medium text-[#1E1E1E]">Risk Profiling Refresh</td>
                          <td className="py-3.5 px-4 font-sans text-[#4B5563]">Varma Family Trust</td>
                          <td className="py-3.5 px-4 font-sans">
                            <HuxBadge variant="success" dot>Accepted</HuxBadge>
                          </td>
                          <td className="py-3.5 px-4 text-right text-[#0038C8]">0x8f3a...91e2</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-sans text-[#1E1E1E]">Nov 02, 2026 14:15</td>
                          <td className="py-3.5 px-4 font-sans font-medium text-[#1E1E1E]">Advisory Fee Debit Consent</td>
                          <td className="py-3.5 px-4 font-sans text-[#4B5563]">Sengupta Legacy A/C</td>
                          <td className="py-3.5 px-4 font-sans">
                            <HuxBadge variant="primary">Signed (Aadhaar eSign)</HuxBadge>
                          </td>
                          <td className="py-3.5 px-4 text-right text-[#0038C8]">0x3b1c...44a7</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-sans text-[#1E1E1E]">Nov 01, 2026 11:30</td>
                          <td className="py-3.5 px-4 font-sans font-medium text-[#1E1E1E]">Zero-Commission Disclosure</td>
                          <td className="py-3.5 px-4 font-sans text-[#4B5563]">Dr. K. Ramaswamy</td>
                          <td className="py-3.5 px-4 font-sans">
                            <HuxBadge variant="success" dot>Delivered</HuxBadge>
                          </td>
                          <td className="py-3.5 px-4 text-right text-[#0038C8]">0x2e9f...77d1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[10px] bg-[#EEF4FF] border border-[rgba(0,56,200,0.15)]">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#0038C8] shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#001B66]">
                        SEBI Inspection Pack for FY 2026-27 is compiled and ready for one-click audit download.
                      </span>
                    </div>
                    <HuxButton
                      variant="neo"
                      size="sm"
                      iconLeft={<Download className="w-3.5 h-3.5" />}
                      onClick={() => alert("Downloading SEBI Compliance Pack...")}
                    >
                      Download Audit ZIP
                    </HuxButton>
                  </div>
                </div>
              </HuxTabContent>

              {/* Footer with Component Token Specs */}
              <HuxCardFooter className="flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <Sparkles className="w-4 h-4 text-[#0038C8]" />
                  <span>Tokens: Primary <code className="text-[#0038C8] font-bold">#0038C8</code> • Border <code className="text-[#1E1E1E] font-bold">#1E1E1E</code> • Radius 10px/14px • Strict Zero Pink</span>
                </div>
                <HuxBadge variant="outline" className="font-mono text-[10px]">Production React 19 Ready</HuxBadge>
              </HuxCardFooter>
            </HuxTabs>
          </HuxCard>
        </div>
      </div>
    </section>
  );
}
