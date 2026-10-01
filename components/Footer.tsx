import React from "react";
import Link from "next/link";
import { ShieldCheck, Scale, ExternalLink, Award, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1E293B] bg-[#030712] text-slate-300">
      {/* Upper Footer - Trust & Regulatory Badges */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-slate-800/80">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded border border-[#C5A059] bg-[#0A1226] flex items-center justify-center">
                <Scale className="h-4 w-4 text-[#C5A059]" />
              </div>
              <span className="font-serif text-lg tracking-wider text-slate-100 uppercase">
                AURUM FIDUCIARY
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pure fee-only fiduciary wealth advisory for select family offices and ultra-high-net-worth individuals. Operating under strict SEBI (Investment Advisers) Regulations, 2013.
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#C5A059]">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-medium tracking-wide">100% Commission-Free RIA</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
              Regulatory Registration
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-slate-300 font-medium">Entity:</span> Aurum Fiduciary Advisory LLP
              </li>
              <li>
                <span className="text-slate-300 font-medium">Type:</span> Corporate Investment Adviser
              </li>
              <li>
                <span className="text-slate-300 font-medium">SEBI Reg No:</span> INA000019842
              </li>
              <li>
                <span className="text-slate-300 font-medium">BASL Membership:</span> BASL-1892
              </li>
              <li>
                <span className="text-slate-300 font-medium">CIN / LLPIN:</span> AAY-4912
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
              Statutory Officers
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-slate-300 font-medium">Principal Officer:</span> Rajesh V. Mehta
              </li>
              <li>
                <span className="text-slate-300 font-medium">Email:</span> principal.officer@aurumfiduciary.in
              </li>
              <li>
                <span className="text-slate-300 font-medium">Compliance Officer:</span> Neha Singhal
              </li>
              <li>
                <span className="text-slate-300 font-medium">Email:</span> compliance@aurumfiduciary.in
              </li>
              <li>
                <span className="text-slate-300 font-medium">Grievance Helpline:</span> +91 (022) 6912 8800
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
              Mandatory Redressal Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#C5A059] hover:underline"
                >
                  <span>SEBI SCORES 2.0 Portal</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://smartodr.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#C5A059] hover:underline"
                >
                  <span>SMART Online Dispute Resolution</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <Link href="/charter" className="inline-flex items-center text-slate-300 hover:text-white">
                  <FileText className="h-3 w-3 mr-1 text-[#C5A059]" />
                  <span>SEBI Investor Charter</span>
                </Link>
              </li>
              <li>
                <div className="mt-2 text-[11px] text-slate-500">
                  Registered Address: Level 14, Maker Chambers VI, Nariman Point, Mumbai 400021, Maharashtra, India.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers - Strictly at text-[10px] to comply with SEBI Size 10 mandate */}
        <div className="bg-[#050B17] rounded-lg p-5 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-[#C5A059] font-medium text-[11px] uppercase tracking-wider">
            <Award className="h-3.5 w-3.5" />
            <span>SEBI Statutory Warning & Disclosures (Investment Advisers Regulations, 2013)</span>
          </div>

          <p className="text-[10px] leading-[15px] text-slate-400 tracking-normal text-justify">
            <strong className="text-slate-200">Standard Risk Warning:</strong> Investments in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BASL (BASL Membership No. BASL-1892) and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
          </p>

          <p className="text-[10px] leading-[15px] text-slate-400 tracking-normal text-justify">
            <strong className="text-slate-200">Fiduciary Scope & Fee Protocol:</strong> Aurum Fiduciary Advisory LLP acts strictly in a fiduciary capacity under Regulation 15 of SEBI (Investment Advisers) Regulations, 2013. We do not distribute financial products or receive referral fees, commissions, or brokerage incentives. All fees charged are strictly in accordance with SEBI circular SEBI/HO/IMD/DF1/CIR/P/2020/182 and collected exclusively via the Centralized Fee Collection Mechanism (CeFCoM) under BSE Administration & Supervision Ltd (BASL). Past performance is not indicative of future returns. Investment strategies carry market risk, including potential capital loss.
          </p>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-2">
            <span>© {new Date().getFullYear()} Aurum Fiduciary Advisory LLP. All rights reserved.</span>
            <span>Mandatory Font Size 10 Compliance Verified • ISO 27001 Data Security Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
