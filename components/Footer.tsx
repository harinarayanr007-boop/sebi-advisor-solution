import React from "react";
import Link from "next/link";
import { ShieldCheck, Scale, ExternalLink, Award, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      {/* Upper Footer - Trust & Regulatory Badges */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-slate-200">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-sm">
                <Scale className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-base tracking-tight text-slate-900 uppercase">
                AURUM FIDUCIARY
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pure fee-only fiduciary wealth advisory for select family offices and high-net-worth individuals. Operating strictly under SEBI (Investment Advisers) Regulations, 2013.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-700 font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>100% Commission-Free RIA</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-900 font-bold mb-4">
              Regulatory Registration
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <span className="font-semibold text-slate-800">Entity:</span> Aurum Fiduciary Advisory LLP
              </li>
              <li>
                <span className="font-semibold text-slate-800">Category:</span> Individual / Non-Individual RIA
              </li>
              <li>
                <span className="font-semibold text-slate-800">SEBI Reg No:</span> INA000019842
              </li>
              <li>
                <span className="font-semibold text-slate-800">BASL Membership:</span> BASL-1892
              </li>
              <li>
                <span className="font-semibold text-slate-800">Validity:</span> Perpetual (Subject to Compliance)
              </li>
              <li>
                <span className="font-semibold text-slate-800">Registered Office:</span> Level 14, Maker Chambers VI, Nariman Point, Mumbai 400021, India
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-900 font-bold mb-4">
              Statutory Officers & Grievance
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <span className="font-semibold text-slate-800">Principal Officer:</span> Rajesh V. Mehta
              </li>
              <li>
                <span className="font-semibold text-slate-800">Compliance Officer:</span> Neha Singhal
              </li>
              <li>
                <span className="font-semibold text-slate-800">Grievance Email:</span> grievance@aurumfiduciary.in
              </li>
              <li>
                <span className="font-semibold text-slate-800">Helpline:</span> +91 (022) 6912 8800
              </li>
              <li>
                <div className="pt-1.5 border-t border-slate-100 text-[11px] text-slate-500 leading-snug">
                  <span className="font-semibold text-slate-700">SEBI Local Office:</span> SEBI Bhavan, Plot No. C4-A, G Block, BKC, Bandra (E), Mumbai 400051
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-900 font-bold mb-4">
              Mandatory Redressal Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-600 font-semibold hover:underline"
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
                  className="inline-flex items-center text-red-600 font-semibold hover:underline"
                >
                  <span>SMART ODR Portal</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <Link href="/charter" className="inline-flex items-center text-slate-800 font-semibold hover:text-red-600">
                  <FileText className="h-3.5 w-3.5 mr-1.5 text-slate-700" />
                  <span>SEBI Investor Charter</span>
                </Link>
              </li>
              <li>
                <Link href="/charter#complaints" className="inline-flex items-center text-slate-800 font-semibold hover:text-red-600">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                  <span>Monthly Complaints Status (Updated by 7th)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers - Strictly at text-[10px] to comply with SEBI Size 10 mandate */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
            <Award className="h-4 w-4 text-red-600" />
            <span>SEBI Statutory Warning & Disclosures (Investment Advisers Regulations, 2013)</span>
          </div>

          <p className="text-[10px] leading-[16px] text-slate-600 tracking-normal text-justify">
            <strong className="text-slate-900">Standard Risk Warning:</strong> Investments in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BASL (BASL Membership No. BASL-1892) and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
          </p>

          <p className="text-[10px] leading-[16px] text-slate-600 tracking-normal text-justify">
            <strong className="text-slate-900">Fiduciary Scope & Fee Protocol:</strong> Aurum Fiduciary Advisory LLP acts strictly in a fiduciary capacity under Regulation 15 of SEBI (Investment Advisers) Regulations, 2013. We do not distribute financial products or receive referral fees, commissions, or brokerage incentives. All fees charged are strictly in accordance with SEBI circular SEBI/HO/IMD/DF1/CIR/P/2020/182 and collected exclusively via the Centralized Fee Collection Mechanism (CeFCoM) under BSE Administration & Supervision Ltd (BASL). Past performance is not indicative of future returns. Investment strategies carry market risk, including potential capital loss.
          </p>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-2">
            <span>© {new Date().getFullYear()} Aurum Fiduciary Advisory LLP. All rights reserved.</span>
            <span>Mandatory Font Size 10 Compliance Verified • ISO 27001 Data Security Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
