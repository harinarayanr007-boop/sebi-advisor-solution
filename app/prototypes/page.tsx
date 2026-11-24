"use client";

import React from "react";
import Link from "next/link";

interface PrototypeItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  badgeColor: string;
  description: string;
  deliverables: string[];
  href: string;
  mockUrl: string;
  accentColor: string;
}

const prototypes: PrototypeItem[] = [
  {
    id: "stratum",
    title: "Stratum Planning",
    subtitle: "Digital Wealth Mandate Desk",
    category: "Pillar 2: Lead Conversion & Brand",
    badge: "AWWWARDS CANDIDATE",
    badgeColor: "#53A0FD",
    description: "Built for ₹100 Cr+ AUM wealth advisory firms. Replaces 14-page PDF risk questionnaires with an interactive 60-second digital intake desk that qualifies liquid net worth before booking a call.",
    deliverables: [
      "Sub-second page load speeds on mobile and desktop",
      "Interactive liquid net-worth screening calculator",
      "Direct WhatsApp and calendar consultation dispatch",
      "Institutional typography and luxury wealth aesthetic"
    ],
    href: "/stratum",
    mockUrl: "stratum.advisorsolution.com",
    accentColor: "#53A0FD"
  },
  {
    id: "valmont",
    title: "Valmont & Cie",
    subtitle: "Sovereign Private Banking Desk",
    category: "Pillar 2: High-Trust Website",
    badge: "PRIVATE WEALTH DESK",
    badgeColor: "#DA291C",
    description: "Designed to reflect the quiet pedigree of European independent private bankers. Built to protect HNI trust with discreet mandate routing, asset protection workflows, and generational wealth positioning.",
    deliverables: [
      "Bespoke family office and philanthropic mandate modules",
      "Discreet client qualification with zero generic templates",
      "Clean Swiss minimalist design with high-contrast serif typography",
      "Interactive consultation request flow"
    ],
    href: "/private-bank",
    mockUrl: "valmont-cie.advisorsolution.com",
    accentColor: "#DA291C"
  },
  {
    id: "growvell",
    title: "Growvell Wealth Desk",
    subtitle: "HNI Intake & Risk Qualifier",
    category: "Pillar 1: Inbound Lead Qualification",
    badge: "RAPID QUALIFIER DESK",
    badgeColor: "#3EFFB4",
    description: "A frictionless client intake desk for modern Indian wealth advisors. Filters out unqualified retail inquiries while collecting KYC and portfolio parameters from serious HNI prospects in under 2 minutes.",
    deliverables: [
      "3-step liquid net-worth qualifier",
      "Automated fee-drag calculation vs regular mutual funds",
      "Instant WhatsApp dispatch with pre-filled client parameters",
      "SEBI compliance disclosures built into every step"
    ],
    href: "/growvell",
    mockUrl: "growvell.advisorsolution.com",
    accentColor: "#3EFFB4"
  },
  {
    id: "aurum",
    title: "Aurum Fiduciary Wealth",
    subtitle: "SEBI RIA Client Onboarding Desk",
    category: "Pillar 2: Conversion & Compliance",
    badge: "SEBI COMPLIANT DESK",
    badgeColor: "#FFBD2E",
    description: "End-to-end digital onboarding architecture for Indian Registered Investment Advisers. Complete with risk profiling, automated advisory agreement signatures, and mock CeFCoM fee gateway.",
    deliverables: [
      "Mandatory SEBI Risk Profiling Questionnaire (RPQ)",
      "Digital advisory agreement review and signature simulation",
      "Mock BSE/MFU CeFCoM payment gateway flow",
      "Investor Charter and regulatory disclosure modals"
    ],
    href: "/onboarding",
    mockUrl: "aurum.advisorsolution.com",
    accentColor: "#FFBD2E"
  },
  {
    id: "portal",
    title: "Private Client Portal",
    subtitle: "Client Retention & Document Hub",
    category: "Pillar 3: Client Retention",
    badge: "RETENTION DASHBOARD",
    badgeColor: "#9D7BFF",
    description: "A dedicated, clean dashboard for active clients. Eliminates 'Where is my update?' messages by providing a transparent milestone roadmap, document vault, and portfolio review center.",
    deliverables: [
      "Centralized deliverables hub for agreements and quarterly reports",
      "Visual milestone roadmap with live project progress tracking",
      "Step-by-step document checklist for onboarding",
      "Direct secure messaging and meeting scheduler"
    ],
    href: "/client/dashboard",
    mockUrl: "portal.advisorsolution.com",
    accentColor: "#9D7BFF"
  },
  {
    id: "agency",
    title: "Advisor Solution Agency Desk",
    subtitle: "Full Service Showcase & Portfolio",
    category: "Master Agency Desk",
    badge: "MASTER SHOWCASE",
    badgeColor: "#0038C8",
    description: "The complete agency portfolio showcasing our 3-step digital system: 60-day social content engines, conversion-first website redesigns, and private client retention portals.",
    deliverables: [
      "Awwwards-grade responsive masonry portfolio showcase",
      "Interactive 72-hour rapid deployment pilot selector",
      "Comprehensive service tier breakdowns and pricing matrices",
      "Integrated WhatsApp consultation desk (+91 93456 19428)"
    ],
    href: "/agency",
    mockUrl: "advisorsolution.com/agency",
    accentColor: "#0038C8"
  }
];

export default function PrototypesPage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white selection:bg-[#53A0FD]/30 selection:text-[#53A0FD]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/[0.08] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/agency"
              className="text-lg font-bold tracking-tight text-white hover:text-[#53A0FD] transition-colors"
            >
              ADVISOR SOLUTION
            </Link>
            <span className="text-white/30 text-xs font-mono">/</span>
            <span className="text-xs font-mono text-[#53A0FD] uppercase tracking-wider bg-[#53A0FD]/10 border border-[#53A0FD]/20 px-2 py-0.5 rounded-full">
              Interactive Prototypes
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <Link
              href="/agency"
              className="text-white/70 hover:text-white transition-colors"
            >
              Agency Desk
            </Link>
            <a
              href="https://wa.me/919345619428?text=Hi%20Hari,%20I%20am%20reviewing%20your%20interactive%20prototypes"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#0038C8] hover:bg-[#53A0FD] text-white hover:text-black font-semibold transition-all flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,56,200,0.3)]"
            >
              <span>WhatsApp Hari</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 border-b border-white/[0.08] bg-gradient-to-b from-[#0B0F19] to-[#070A12]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#53A0FD]/10 border border-[#53A0FD]/25 text-[#53A0FD] text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#53A0FD] animate-pulse" />
            <span>Interactive Client Desks & Live Prototypes</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
            Explore Our Live Prototypes & Custom Wealth Desks
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/60 max-w-2xl font-light">
            Every prototype below is a functional, production-ready system designed to demonstrate how we gather, convert, and retain clients for wealth management firms.
          </p>
        </div>
      </section>

      {/* Grid of Prototypes */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prototypes.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-white/[0.12] bg-[#0E1322] hover:border-[#53A0FD] hover:shadow-[0_16px_40px_rgba(83,160,253,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Browser Chrome Header */}
                <div className="h-[36px] bg-[#121624] border-b border-white/[0.08] px-4 flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                  </div>
                  <div className="bg-black/50 border border-white/10 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white/70 flex items-center gap-1">
                    <span className="text-[9px] text-[#53A0FD]">🔒</span>
                    <span className="truncate max-w-[140px]">{item.mockUrl}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-[#53A0FD]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#53A0FD] animate-pulse" />
                    <span>LIVE</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border uppercase"
                        style={{
                          color: item.badgeColor,
                          borderColor: `${item.badgeColor}40`,
                          backgroundColor: `${item.badgeColor}15`
                        }}
                      >
                        {item.badge}
                      </span>
                      <span className="text-[11px] font-mono text-white/40">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#53A0FD] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-[#53A0FD] mt-0.5">
                      {item.subtitle}
                    </p>

                    <p className="text-xs text-white/70 mt-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Deliverables Bullet List */}
                    <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-1.5">
                      {item.deliverables.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-white/60">
                          <span className="text-[#3EFFB4] font-mono text-xs">✓</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Launch Button */}
                  <div className="mt-6 pt-4 border-t border-white/[0.08]">
                    <Link
                      href={item.href}
                      className="w-full py-2.5 px-4 rounded-lg bg-white/5 hover:bg-[#53A0FD] text-white hover:text-black font-semibold text-xs font-mono border border-white/10 hover:border-[#53A0FD] transition-all flex items-center justify-center gap-2 group/btn shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                    >
                      <span>Launch Interactive Prototype</span>
                      <span className="text-sm group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 border-t border-white/[0.08] bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono text-[#3EFFB4] uppercase tracking-wider bg-[#3EFFB4]/10 border border-[#3EFFB4]/20 px-3 py-1 rounded-full">
            72-Hour Rapid Deployment
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-4">
            Need a Custom Digital Intake Desk for Your Firm?
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-xl mx-auto">
            We build and launch modern intake flows, wealth branding, and client portals tailored to your advisory practice in 2 to 3 weeks.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919345619428?text=Hi%20Hari,%20I%20am%20interested%20in%20a%20custom%20intake%20desk%20pilot"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-[#0038C8] hover:bg-[#53A0FD] text-white hover:text-black font-semibold text-xs font-mono transition-all shadow-[0_4px_16px_rgba(0,56,200,0.4)]"
            >
              Book 15-Minute Strategy Call on WhatsApp
            </a>
            <Link
              href="/agency"
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs font-mono border border-white/10 transition-all"
            >
              View Full Agency Desk
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/[0.08] text-center text-xs text-white/40 font-mono">
        <p>Advisor Solution // Built by Hari Narayan (+91 93456 19428) // All Rights Reserved</p>
      </footer>
    </div>
  );
}
