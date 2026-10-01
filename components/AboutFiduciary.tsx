import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Scale,
  Award,
  Building2,
  Lock,
  FileCheck2,
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
    <section className="py-24 bg-[#050B17] border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Leadership & Fiduciary Governance Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Executive Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl shadow-black/80 bg-[#0A1226]">
              <Image
                src="/images/principal-officer.jpg"
                alt="Rajesh V. Mehta - Principal Officer, Aurum Fiduciary Advisory"
                width={800}
                height={800}
                unoptimized
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B17] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#050B17]/90 backdrop-blur-md border border-[#C5A059]/30 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
                  Statutory Principal Officer
                </span>
                <h4 className="font-serif text-lg text-slate-100 font-medium">
                  Rajesh V. Mehta
                </h4>
                <p className="text-[11px] text-slate-400">
                  Managing Partner • SEBI Registered Principal Officer • NISM Series X-A / X-B Certified
                </p>
              </div>
            </div>

            {/* Embossed Seal Floating Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block h-28 w-28 rounded-full overflow-hidden border-2 border-[#C5A059] shadow-2xl shadow-black bg-[#0A1226]">
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
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C5A059]">
                <ShieldCheck className="h-4 w-4" />
                <span>Statutory Fiduciary Stewardship</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-50 font-normal">
                Led by Seasoned Institutional Capital Allocators
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Aurum Fiduciary was founded with an uncompromising premise: high-net-worth investors in India deserve pure, fee-only wealth advice entirely uncorrupted by product distributor commissions.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              With over 24 years orchestrating multi-generational capital across Indian debt and equity cycles, our Principal Officer maintains personal fiduciary liability under SEBI Regulation 15. We do not manage retail volumes; we maintain a deliberate 1:25 partner-to-family ratio to guarantee bespoke attention.
            </p>

            {/* Qualifications Matrix */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#090F1E] border border-slate-800 space-y-1">
                <div className="font-serif text-xl text-[#DFC68E]">24+ Years</div>
                <div className="text-xs text-slate-300 font-medium">Capital Market Experience</div>
                <div className="text-[10px] text-slate-500">Navigated 5 Major Market Cycles</div>
              </div>

              <div className="p-4 rounded-xl bg-[#090F1E] border border-slate-800 space-y-1">
                <div className="font-serif text-xl text-slate-100">1:25 Max</div>
                <div className="text-xs text-slate-300 font-medium">Partner-to-Family Ratio</div>
                <div className="text-[10px] text-slate-500">Strict Capacity Caps Enforced</div>
              </div>

              <div className="p-4 rounded-xl bg-[#090F1E] border border-slate-800 space-y-1">
                <div className="font-serif text-xl text-[#DFC68E]">NISM X-A/B</div>
                <div className="text-xs text-slate-300 font-medium">Statutory Certification</div>
                <div className="text-[10px] text-slate-500">National Institute of Securities Markets</div>
              </div>

              <div className="p-4 rounded-xl bg-[#090F1E] border border-slate-800 space-y-1">
                <div className="font-serif text-xl text-slate-100">INA000019842</div>
                <div className="text-xs text-slate-300 font-medium">SEBI Registration</div>
                <div className="text-[10px] text-slate-500">Corporate RIA Category</div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Facilities & Presence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8 border-t border-slate-800/80">
          <div className="rounded-2xl overflow-hidden border border-slate-800 relative group bg-[#0A1226]">
            <Image
              src="/images/boardroom.jpg"
              alt="Aurum Fiduciary Boardroom in Nariman Point, Mumbai"
              width={800}
              height={500}
              unoptimized
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B17] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block">
                Private Advisory Boardroom
              </span>
              <h4 className="font-serif text-base text-slate-100 font-medium">
                Level 14, Maker Chambers VI, Nariman Point
              </h4>
              <p className="text-[11px] text-slate-400">
                Dedicated confidential family office chambers overlooking the Arabian Sea.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 relative group bg-[#0A1226]">
            <Image
              src="/images/nariman-point.jpg"
              alt="Nariman Point Financial District, Mumbai"
              width={800}
              height={500}
              unoptimized
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B17] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block">
                Mumbai Financial Core
              </span>
              <h4 className="font-serif text-base text-slate-100 font-medium">
                Direct Proximity to BSE, RBI & Institutional Clearing
              </h4>
              <p className="text-[11px] text-slate-400">
                Operating within India&apos;s foremost regulatory and banking ecosystem.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Governance Accordion */}
        <div className="rounded-2xl border border-slate-800 bg-[#090F1E] p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">
              Institutional Governance
            </span>
            <h3 className="font-serif text-2xl text-slate-100 font-normal">
              Statutory Fiduciary Disclosures & Frequently Addressed Questions
            </h3>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How does Aurum Fiduciary eliminate commissions on mutual funds and securities?
              </AccordionTrigger>
              <AccordionContent>
                Under Regulation 15 of SEBI (Investment Advisers) Regulations, 2013, our practice is prohibited from receiving distribution fees, commissions, or trailer incentives. When we recommend mutual fund portfolios, we advise solely on Direct Plans. Direct Plans have zero distribution expense ratio, saving you 0.75% to 1.50% in annual management expenses compared to distributor Regular Plans.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Do you hold custody or execution Power of Attorney (POA) over my demat account?
              </AccordionTrigger>
              <AccordionContent>
                No. We never take custody of your capital, securities, or demat accounts, nor do we request discretionary Power of Attorney. You retain 100% custody and execution authority at your chosen custodian or depository participant (such as HDFC Sec, Zerodha, ICICI Direct). We provide rigorous advisory mandates, allocation directives, and rebalancing roadmaps for your execution.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Why must advisory fee payments be routed via the BSE/MFU CeFCoM network?
              </AccordionTrigger>
              <AccordionContent>
                In compliance with SEBI circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/78, all registered investment advisory fees in India must be settled via the Centralized Fee Collection Mechanism (CeFCoM) managed by recognized clearing entities (BSE/MFU). This prevents illicit cash handling, ensures verified fee caps, and gives clients an immutable clearing receipt recognized by statutory auditors.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                What happens during the initial 90-minute Portfolio Architecture consultation?
              </AccordionTrigger>
              <AccordionContent>
                Following your digital KYC and CeFCoM settlement, you will meet with Principal Officer Rajesh V. Mehta for a confidential 90-minute session. We analyze your entire family balance sheet, audit existing portfolios for hidden regular plan drag and tax inefficiencies, formulate your multi-asset target allocation, and deliver your implementation blueprint.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
