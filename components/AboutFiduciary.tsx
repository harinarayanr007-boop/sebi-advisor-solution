import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Building2,
  Lock,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function AboutFiduciary() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Leadership & Fiduciary Governance Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Executive Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
              <Image
                src="/images/principal-officer.jpg"
                alt="Rajesh V. Mehta - Principal Officer, Aurum Fiduciary Advisory"
                width={800}
                height={800}
                unoptimized
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-600 block">
                  Statutory Principal Officer
                </span>
                <h4 className="text-lg font-bold text-slate-900">
                  Rajesh V. Mehta
                </h4>
                <p className="text-xs text-slate-600">
                  Managing Partner • SEBI Registered Principal Officer • NISM Series X-A / X-B Certified
                </p>
              </div>
            </div>

            {/* Embossed Seal Floating Badge */}
            <div className="absolute -bottom-4 -right-4 hidden sm:block h-24 w-24 rounded-full overflow-hidden border-2 border-white shadow-xl bg-white">
              <Image
                src="/images/fiduciary-seal.jpg"
                alt="SEBI RIA Fiduciary Seal"
                width={150}
                height={150}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Fiduciary Profile & Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Statutory Fiduciary Stewardship</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Led by Seasoned Institutional Capital Allocators
              </h2>
            </div>

            <p className="text-base text-slate-700 leading-relaxed font-normal">
              Aurum Fiduciary was founded with an uncompromising premise: high-net-worth investors in India deserve pure, fee-only wealth advice entirely uncorrupted by product distributor commissions.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              With over 24 years orchestrating multi-generational capital across Indian debt and equity cycles, our Principal Officer maintains personal fiduciary liability under SEBI Regulation 15. We do not manage retail volumes; we maintain a deliberate 1:25 partner-to-family ratio to guarantee bespoke attention.
            </p>

            {/* Qualifications Matrix */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-2xl text-slate-900 font-extrabold">24+ Years</div>
                <div className="text-xs text-slate-700 font-bold">Capital Market Experience</div>
                <div className="text-[11px] text-slate-500">Navigated 5 Major Market Cycles</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-2xl text-slate-900 font-extrabold">1:25 Max</div>
                <div className="text-xs text-slate-700 font-bold">Partner-to-Family Ratio</div>
                <div className="text-[11px] text-slate-500">Strict Capacity Caps Enforced</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-2xl text-slate-900 font-extrabold">NISM X-A/B</div>
                <div className="text-xs text-slate-700 font-bold">Statutory Certification</div>
                <div className="text-[11px] text-slate-500">National Institute of Securities Markets</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-2xl text-slate-900 font-extrabold">INA000019842</div>
                <div className="text-xs text-slate-700 font-bold">SEBI Registration</div>
                <div className="text-[11px] text-slate-500">Corporate RIA Category</div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Facilities & Presence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8 border-t border-slate-200">
          <div className="rounded-3xl overflow-hidden border border-slate-200 relative group bg-white shadow-sm">
            <Image
              src="/images/boardroom.jpg"
              alt="Aurum Fiduciary Boardroom in Nariman Point, Mumbai"
              width={800}
              height={500}
              unoptimized
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-bold text-red-300 uppercase tracking-wider block">
                Private Advisory Boardroom
              </span>
              <h4 className="text-base font-bold text-white">
                Level 14, Maker Chambers VI, Nariman Point
              </h4>
              <p className="text-xs text-slate-200">
                Dedicated confidential family office chambers overlooking the Arabian Sea.
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 relative group bg-white shadow-sm">
            <Image
              src="/images/nariman-point.jpg"
              alt="Nariman Point Financial District, Mumbai"
              width={800}
              height={500}
              unoptimized
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-bold text-red-300 uppercase tracking-wider block">
                Mumbai Financial Core
              </span>
              <h4 className="text-base font-bold text-white">
                Direct Proximity to BSE, RBI & Institutional Clearing
              </h4>
              <p className="text-xs text-slate-200">
                Operating within India&apos;s foremost regulatory and banking ecosystem.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Governance Accordion */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block">
              Institutional Governance • Reg. 15 Disclosures
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              Statutory Fiduciary Disclosures & Frequently Addressed Questions
            </h3>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-slate-900">
                How does Aurum Fiduciary eliminate commissions on mutual funds and securities?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-sm">
                Under Regulation 15 of SEBI (Investment Advisers) Regulations, 2013, our practice is prohibited from receiving distribution fees, commissions, or trailer incentives. When we recommend mutual fund portfolios, we advise solely on Direct Plans. Direct Plans have zero distribution expense ratio, saving you 0.75% to 1.50% in annual management expenses compared to distributor Regular Plans.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-slate-900">
                Do you hold custody or execution Power of Attorney (POA) over my demat account?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-sm">
                No. We never take custody of your capital, securities, or demat accounts, nor do we request discretionary Power of Attorney. You retain 100% custody and execution authority at your chosen custodian or depository participant (such as HDFC Sec, Zerodha, ICICI Direct). We provide rigorous advisory mandates, allocation directives, and rebalancing roadmaps for your execution.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-slate-900">
                Why must advisory fee payments be routed via the BSE/MFU CeFCoM network?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-sm">
                In compliance with SEBI circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/78, all registered investment advisory fees in India must be settled via the Centralized Fee Collection Mechanism (CeFCoM) managed by recognized clearing entities (BSE/MFU). This prevents illicit cash handling, ensures verified fee caps, and gives clients an immutable clearing receipt recognized by statutory auditors.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-slate-900">
                What happens during the initial 90-minute Portfolio Architecture consultation?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-sm">
                Following your digital KYC and CeFCoM settlement, you will meet with Principal Officer Rajesh V. Mehta for a confidential 90-minute session. We analyze your entire family balance sheet, audit existing portfolios for hidden regular plan drag and tax inefficiencies, formulate your multi-asset target allocation, and deliver your implementation blueprint.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
