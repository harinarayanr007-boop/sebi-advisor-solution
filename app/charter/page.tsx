import React from "react";
import Link from "next/link";
import { Scale, ArrowLeft, ShieldCheck, CheckCircle2, FileText, ExternalLink } from "lucide-react";

export default function InvestorCharterPage() {
  return (
    <div className="min-h-screen bg-[#050B17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:text-[#DFC68E] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-2" />
          <span>Return to Homepage</span>
        </Link>

        {/* Header */}
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#C5A059] uppercase tracking-wider">
            <FileText className="h-4 w-4" />
            <span>SEBI Statutory Disclosure • Circular SEBI/HO/IMD/DF1/CIR/P/2021/678</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-slate-50 font-normal">
            Investor Charter for Investment Advisers
          </h1>
          <p className="text-xs text-slate-400">
            Prescribed by the Securities and Exchange Board of India (SEBI) to facilitate investor awareness and protection.
          </p>
        </div>

        {/* Section A: Vision and Mission Statements */}
        <div className="rounded-xl border border-slate-800 bg-[#090F1E] p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl text-slate-100 flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-[#C5A059]" />
            <span>A. Vision and Mission of Investment Advisers</span>
          </h2>
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              <strong className="text-slate-100">Vision:</strong> To protect the interests of investors in securities and to promote the development of, and to regulate the securities market by providing unbiased financial and investment advisory services.
            </p>
            <p>
              <strong className="text-slate-100">Mission:</strong> To act in a fiduciary capacity, maintaining highest standards of integrity, transparency, and competence, and providing advice purely suited to the client’s risk profile and financial capacity.
            </p>
          </div>
        </div>

        {/* Section B: Details of Business Transacted */}
        <div className="rounded-xl border border-slate-800 bg-[#090F1E] p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl text-slate-100">B. Services Provided to Investors</h2>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>Mandatory execution of legally binding Investment Advisory Agreement with clearly defined scope and fee caps.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>Comprehensive Risk Profiling and Suitability Assessment before rendering any investment recommendation.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>Complete disclosure of any potential conflicts of interest, holding nature, or affiliated business ties.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>Maintenance of comprehensive records of all client advice, research reports, and risk profiling for at least five years.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>Strict adherence to SEBI fee collection circulars through the Centralized Fee Collection Mechanism (CeFCoM).</span>
            </li>
          </ul>
        </div>

        {/* Section C: Grievance Redressal Mechanism */}
        <div className="rounded-xl border border-[#C5A059]/30 bg-[#0A1226] p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl text-[#DFC68E]">C. Grievance Redressal Protocol</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            In case of any grievance or dispute regarding investment advisory services rendered by Aurum Fiduciary Advisory LLP:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-[#C5A059] uppercase">Step 1: Direct Redressal</div>
              <p className="text-[11px] text-slate-300">
                Contact our Compliance Officer at <span className="text-slate-100 font-medium">compliance@aurumfiduciary.in</span>. We commit to acknowledging grievances within 24 hours and resolution within 21 business days.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-[#C5A059] uppercase">Step 2: SEBI SCORES 2.0</div>
              <p className="text-[11px] text-slate-300">
                If unresolved, file a formal complaint with SEBI on the centralized SCORES portal.
              </p>
              <a
                href="https://scores.sebi.gov.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-[10px] text-[#DFC68E] hover:underline"
              >
                <span>Visit SCORES Portal</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="p-4 rounded-lg bg-[#050B17] border border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-[#C5A059] uppercase">Step 3: SMART ODR</div>
              <p className="text-[11px] text-slate-300">
                Escalate dispute to the Online Dispute Resolution (ODR) Portal under SEBI conciliation and arbitration guidelines.
              </p>
              <a
                href="https://smartodr.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-[10px] text-[#DFC68E] hover:underline"
              >
                <span>Visit SMART ODR</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Section D: Responsibilities of Investors */}
        <div className="rounded-xl border border-slate-800 bg-[#090F1E] p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl text-slate-100">D. Responsibilities of Investors</h2>
          <ul className="space-y-2 text-xs text-slate-300 list-disc pl-5 leading-relaxed">
            <li>Provide genuine, verified, and complete financial details during the Risk Profiling Questionnaire.</li>
            <li>Execute the mandatory SEBI Advisory Agreement before availing any advisory services.</li>
            <li>Make all advisory fee payments exclusively through the approved banking/CeFCoM channels; never pay cash.</li>
            <li>Retain copies of all signed agreements, research rationale, and communications with the adviser.</li>
            <li>Understand that investments in securities markets are subject to market risks; past performance does not assure future returns.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
