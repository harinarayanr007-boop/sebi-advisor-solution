"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  Layers,
  Lock,
  MessageCircle,
  Sparkles,
} from "lucide-react";

type PillarFilter = "all" | "pillar1" | "pillar2" | "pillar3";

interface PrototypeItem {
  id: string;
  title: string;
  subtitle: string;
  pillar: Exclude<PillarFilter, "all">;
  category: string;
  badge: string;
  description: string;
  deliverables: string[];
  href: string;
  mockUrl: string;
  previewImage: string;
}

const prototypes: PrototypeItem[] = [
  {
    id: "stratum",
    title: "Stratum Planning",
    subtitle: "Modern Wealth Mandate Desk",
    pillar: "pillar2",
    category: "Pillar 2: Lead Conversion & Brand",
    badge: "MODERN WEALTH UI",
    description:
      "Built for ₹100 Cr+ AUM wealth advisory firms. Replaces static PDF questionnaires with an interactive 60-second intake desk that qualifies liquid net worth before booking a call.",
    deliverables: [
      "Sub-second page loads on mobile and desktop",
      "Interactive liquid net-worth screening flow",
      "Direct WhatsApp and calendar booking dispatch",
      "Clean editorial layout with data clarity",
    ],
    href: "/stratum",
    mockUrl: "stratum.advisorsolution.com",
    previewImage: "/prototype_previews/stratum.png",
  },
  {
    id: "valmont",
    title: "Valmont & Cie",
    subtitle: "Heritage Private Banking Desk",
    pillar: "pillar2",
    category: "Pillar 2: High-Trust Website",
    badge: "PRIVATE BANK UI",
    description:
      "Reflects the understated pedigree of European independent private bankers. Built to protect HNI confidence with discreet mandate routing and multi-generational storytelling.",
    deliverables: [
      "Family office and philanthropic mandate architecture",
      "Zero generic directory template clutter",
      "High-contrast serif typography for legacy wealth",
      "Confidential consultation intake flow",
    ],
    href: "/private-bank",
    mockUrl: "valmont-cie.advisorsolution.com",
    previewImage: "/prototype_previews/valmont.png",
  },
  {
    id: "portal",
    title: "Private Client Portal",
    subtitle: "Retention Hub & Portfolio Vault",
    pillar: "pillar3",
    category: "Pillar 3: Client Retention",
    badge: "CLIENT PORTAL",
    description:
      "Private client command center that replaces scattered WhatsApp chats with direct demat valuation, annual commission savings tracking, and milestone goal roadmaps.",
    deliverables: [
      "Centralized agreements, CKYC vault, and reports",
      "Live direct expense ratio savings metrics",
      "Funded Financial Goals GPS milestone tracking",
      "Eliminates repetitive 'What is the status?' pings",
    ],
    href: "/client/dashboard",
    mockUrl: "portal.advisorsolution.com",
    previewImage: "/prototype_previews/aurum_portal.png",
  },
];

const FILTERS: { id: PillarFilter; label: string }[] = [
  { id: "all", label: "All Systems (3)" },
  { id: "pillar2", label: "Websites & Intake (2)" },
  { id: "pillar3", label: "Client Portal (1)" },
];

export default function PrototypesPage() {
  const [activeFilter, setActiveFilter] = useState<PillarFilter>("all");

  const visiblePrototypes =
    activeFilter === "all"
      ? prototypes
      : prototypes.filter((item) => item.pillar === activeFilter);

  return (
    <div
      className="min-h-screen bg-[#F8FBFE] text-[#1E1E1E] selection:bg-[#0038C8] selection:text-white"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0, 56, 200, 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 56, 200, 0.045) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      {/* Top Institutional Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-[1.5px] border-[#1E1E1E] px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link
              href="/agency"
              className="inline-flex items-center gap-2 font-black text-sm sm:text-base tracking-tight text-[#001B66] hover:text-[#0038C8] transition-colors shrink-0"
            >
              <span className="w-7 h-7 rounded-lg bg-[#0038C8] border-[1.5px] border-[#1E1E1E] text-white flex items-center justify-center text-xs font-black">
                HN
              </span>
              <span>ADVISOR SOLUTION</span>
            </Link>
            <span className="hidden sm:inline text-gray-300 font-bold">/</span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#EFF6FF] text-[#0038C8] border border-[#0038C8]/30">
              Live Prototypes
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/agency"
              className="hidden md:inline-flex px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#1E1E1E] hover:text-[#0038C8] border-[1.5px] border-transparent hover:border-[#1E1E1E] hover:bg-[#F8FBFE] transition-all"
            >
              Agency Desk
            </Link>
            <Link
              href="/growvell/content"
              className="hidden md:inline-flex px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#1E1E1E] hover:text-[#0038C8] border-[1.5px] border-transparent hover:border-[#1E1E1E] hover:bg-[#F8FBFE] transition-all"
            >
              Client Content Hub
            </Link>
            <a
              href="https://wa.me/919345619428?text=Hi%20Hari,%20I%20am%20reviewing%20your%20interactive%20prototypes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0038C8] hover:bg-[#001B66] text-white text-xs font-bold border-[1.5px] border-[#1E1E1E] shadow-[3px_3px_0px_#1E1E1E] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1E1E1E] transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Book 15-Min Call</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 pt-12 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-[#0038C8] border-[1.5px] border-[#1E1E1E]" />
            <div className="relative rounded-2xl bg-white border-[1.5px] border-[#1E1E1E] p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[#0038C8] text-[#0038C8] text-[11px] font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hari Narayan // Interactive Systems Library</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-[#001B66]">
                  <span className="px-2.5 py-1 rounded-md bg-[#F8FBFE] border border-gray-300">
                    2 to 3 Week Build
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F8FBFE] border border-gray-300">
                    2-Yr Presence Guarantee
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F8FBFE] border border-gray-300">
                    SEBI Compliance Conscious
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#001B66] max-w-4xl leading-[1.1]">
                Explore Live Wealth Desks, Websites & Client Portals.
              </h1>
              <p className="mt-4 text-sm sm:text-base text-gray-700 max-w-2xl leading-relaxed">
                Every prototype below is functional production code built by Hari Narayan to show exactly how founders and SEBI RIAs turn cold traffic into booked calls and organized client relationships.
              </p>

              {/* Interactive Pillar Filter Strip */}
              <div className="mt-7 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-gray-500 mr-1">
                  <Layers className="w-3.5 h-3.5 text-[#0038C8]" />
                  Filter:
                </span>
                {FILTERS.map((filter) => {
                  const active = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border-[1.5px] transition-all cursor-pointer ${
                        active
                          ? "bg-[#0038C8] text-white border-[#1E1E1E] shadow-[2px_2px_0px_#1E1E1E]"
                          : "bg-[#F8FBFE] text-[#1E1E1E] border-gray-300 hover:border-[#0038C8] hover:text-[#0038C8]"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prototypes Grid */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePrototypes.map((item) => (
              <div key={item.id} className="relative group h-full flex flex-col">
                {/* Neo-Brutalist Royal Blue Offset Backing */}
                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-[#0038C8] border-[1.5px] border-[#1E1E1E] transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2" />

                {/* Front White Card */}
                <div className="relative flex-1 rounded-2xl bg-white border-[1.5px] border-[#1E1E1E] flex flex-col justify-between overflow-hidden transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                  <div>
                    {/* Browser Chrome Bar */}
                    <div className="h-9 bg-[#F1F5F9] border-b-[1.5px] border-[#1E1E1E] px-3.5 flex items-center justify-between gap-2 select-none">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1E1E1E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0038C8]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                      </div>
                      <div className="bg-white border border-gray-300 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#1E1E1E] flex items-center gap-1 min-w-0">
                        <Lock className="w-2.5 h-2.5 text-[#0038C8] shrink-0" />
                        <span className="truncate">{item.mockUrl}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#0038C8] shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>LIVE</span>
                      </div>
                    </div>

                    {/* Crisp Visual Screenshot Strip */}
                    <div className="bg-[#F8FBFE] border-b border-gray-200 p-2.5">
                      <div className="aspect-[16/10] w-full rounded-lg overflow-hidden border border-gray-300 bg-white">
                        <img
                          src={item.previewImage}
                          alt={`${item.title} live preview`}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#EFF6FF] text-[#0038C8] border border-[#0038C8]/40">
                          {item.badge}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-500 truncate">
                          {item.category}
                        </span>
                      </div>

                      <h2 className="text-xl font-black text-[#001B66] group-hover:text-[#0038C8] transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-xs font-bold text-[#0038C8] mt-0.5">
                        {item.subtitle}
                      </p>

                      <p className="text-xs text-gray-700 mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                        {item.deliverables.map((bullet, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-xs text-[#1E1E1E]"
                          >
                            <span className="w-4 h-4 rounded bg-[#EFF6FF] border border-[#0038C8]/30 text-[#0038C8] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span className="leading-snug">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                    <Link
                      href={item.href}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#001B66] hover:bg-[#0038C8] text-white font-bold text-xs border-[1.5px] border-[#1E1E1E] transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Launch Interactive Prototype</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Institutional CTA Block */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-[#0038C8] border-[1.5px] border-[#1E1E1E]" />
          <div className="relative rounded-2xl bg-[#001B66] border-[1.5px] border-[#1E1E1E] p-8 sm:p-12 text-center text-white">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider bg-[#0038C8] border border-white/25 px-3 py-1 rounded-lg">
              Direct Founder Build // 2 to 3 Weeks
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-4">
              Need a Custom Intake Desk & Client Portal for Your Firm?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
              I build your LinkedIn content engine, high-trust website, and private client portal under one unified system backed by a 2-Year Presence Guarantee and 6 Months of free updates.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/919345619428?text=Hi%20Hari,%20I%20am%20interested%20in%20a%20custom%20intake%20desk%20pilot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F8FBFE] text-[#001B66] font-extrabold text-xs sm:text-sm border-[1.5px] border-[#1E1E1E] shadow-[3px_3px_0px_#0038C8] transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#0038C8]" />
                <span>WhatsApp Hari (+91 93456 19428)</span>
              </a>
              <Link
                href="/agency"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0038C8] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm border-[1.5px] border-white/30 transition-all"
              >
                <span>View Full Agency Desk</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 bg-white border-t-[1.5px] border-[#1E1E1E] text-center text-xs font-semibold text-gray-600">
        <p>
          Advisor Solution · Built by{" "}
          <a
            href="https://linkedin.com/in/harinarayanfintech"
            target="_blank"
            rel="noreferrer"
            className="text-[#0038C8] font-bold hover:underline"
          >
            Hari Narayan
          </a>{" "}
          · +91 93456 19428 · All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
