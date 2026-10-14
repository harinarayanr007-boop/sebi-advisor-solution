"use client";

import React from "react";
import { motion } from "motion/react";

const imgProcessStep1 = "/figma/process-step-1.png";
const imgProcessStep2 = "/figma/process-step-2.png";
const imgProcessStep3 = "/figma/process-step-3.png";

export default function FiduciaryProcessHero() {
  const steps = [
    {
      number: 1,
      title: "First, we talk",
      description:
        "We sit down and listen. Your goals, your fears, your numbers. Nothing is off the table.",
      image: imgProcessStep1,
    },
    {
      number: 2,
      title: "Then, we plan",
      description:
        "You get a written plan. Clear, direct, and built only for you. No templates, no noise.",
      image: imgProcessStep2,
    },
    {
      number: 3,
      title: "Finally, we act",
      description:
        "We build the portfolio and manage it. You live your life, we watch the road.",
      image: imgProcessStep3,
    },
  ];

  return (
    <div className="w-full h-full min-h-screen bg-[#f8fbff] border-l border-[#dfeaf2] flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
      {/* Section Title (Exact from website home page) */}
      <div className="flex flex-col gap-2 sm:gap-3 items-start max-w-[560px] w-full">
        <div className="flex items-center">
          <span className="font-semibold text-[14px] sm:text-[16px] leading-[1.5] text-[#1e90ff]">
            Process
          </span>
        </div>
        <div className="flex flex-col gap-2 items-start text-[#030a03] w-full">
          <h2 className="font-semibold text-[26px] sm:text-[34px] lg:text-[38px] leading-[1.2] tracking-[-0.48px] text-[#030a03]">
            How we will be working together
          </h2>
          <p className="font-normal text-[14px] sm:text-[16px] leading-[1.5] text-[#030a03]/80">
            Three clear stages. Direct, disciplined execution focused solely on your wealth preservation.
          </p>
        </div>
      </div>

      {/* Process Steps Cards (Exact content & visuals from website home page) */}
      <div className="flex flex-col gap-4 my-6 sm:my-8 w-full max-w-[560px]">
        {steps.map((step) => (
          <motion.div
            key={step.number}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white border border-[rgba(30,144,255,0.16)] shadow-xs hover:border-[#1e90ff]/40 transition"
          >
            {/* Illustration */}
            <div className="w-[100px] h-[90px] sm:w-[130px] sm:h-[110px] relative flex-shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src={step.image}
                alt={step.title}
                className="size-full object-contain pointer-events-none select-none"
              />
            </div>

            {/* Content & Badge */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className="inline-flex">
                <div className="bg-[#a0befe] px-[14px] py-[2px] rounded-full inline-flex items-center justify-center">
                  <span className="font-bold text-[15px] sm:text-[17px] text-[#030a03] leading-none">
                    {step.number}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-[18px] sm:text-[22px] leading-[1.3] tracking-[-0.3px] text-[#030a03]">
                {step.title}
              </h3>
              <p className="font-normal text-[13px] sm:text-[14px] leading-[1.5] text-[#030a03]/80">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle Bottom Trust Bar */}
      <div className="pt-4 border-t border-[rgba(30,144,255,0.12)] flex items-center justify-between text-xs text-[#030a03]/60 font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>SEBI INA000015845</span>
          <span>•</span>
          <span>BASL 1892</span>
        </div>
        <span className="font-sans font-medium text-[#030a03]/70">
          Direct Demat • Pure Fiduciary Mandate
        </span>
      </div>
    </div>
  );
}
