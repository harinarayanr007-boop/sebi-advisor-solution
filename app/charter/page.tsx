import React from "react";
import Link from "next/link";
import { Scale, ArrowLeft, ShieldCheck, CheckCircle2, FileText, ExternalLink } from "lucide-react";

export default function InvestorCharterPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Return to Homepage</span>
        </Link>

        {/* Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-red-600 uppercase tracking-wider">
            <FileText className="h-4 w-4" />
            <span>SEBI Statutory Disclosure • Circular SEBI/HO/IMD/DF1/CIR/P/2021/678</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Investor Charter for Investment Advisers
          </h1>
          <p className="text-sm text-slate-600">
            Prescribed by the Securities and Exchange Board of India (SEBI) to facilitate investor awareness and protection.
          </p>
        </div>

        {/* Section A: Vision and Mission Statements */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>A. Vision and Mission of Investment Advisers</span>
          </h2>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong className="text-slate-900">Vision:</strong> To protect the interests of investors in securities and to promote the development of, and to regulate the securities market by providing unbiased financial and investment advisory services.
            </p>
            <p>
              <strong className="text-slate-900">Mission:</strong> To act in a fiduciary capacity, maintaining highest standards of integrity, transparency, and competence, and providing advice purely suited to the client’s risk profile and financial capacity.
            </p>
          </div>
        </div>

        {/* Section B: Details of Business Transacted */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">B. Services Provided to Investors</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Mandatory execution of legally binding Investment Advisory Agreement with clearly defined scope and fee caps.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Comprehensive Risk Profiling and Suitability Assessment before rendering any investment recommendation.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Complete disclosure of any potential conflicts of interest, holding nature, or affiliated business ties.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Maintenance of comprehensive records of all client advice, research reports, and risk profiling for at least five years.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Strict adherence to SEBI fee collection circulars through the Centralized Fee Collection Mechanism (CeFCoM).</span>
            </li>
          </ul>
        </div>

        {/* Section C: Grievance Redressal Mechanism */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">C. Grievance Redressal Protocol</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            In case of any grievance or dispute regarding investment advisory services rendered by Aurum Fiduciary Advisory LLP:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase">Step 1: Direct Redressal</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contact our Compliance Officer at <span className="text-slate-900 font-semibold">compliance@aurumfiduciary.in</span>. We commit to acknowledging grievances within 24 hours and resolution within 21 business days.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase">Step 2: SEBI SCORES 2.0</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                If unresolved, file a formal complaint with SEBI on the centralized SCORES portal.
              </p>
              <a
                href="https://scores.sebi.gov.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs text-red-600 font-semibold hover:underline"
              >
                <span>Visit SCORES Portal</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase">Step 3: SMART ODR</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Escalate dispute to the Online Dispute Resolution (ODR) Portal under SEBI conciliation and arbitration guidelines.
              </p>
              <a
                href="https://smartodr.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs text-red-600 font-semibold hover:underline"
              >
                <span>Visit SMART ODR</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Section D: Responsibilities of Investors */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">D. Responsibilities of Investors</h2>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5 leading-relaxed">
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
