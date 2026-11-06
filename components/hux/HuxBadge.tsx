"use client";

import React, { HTMLAttributes, forwardRef } from "react";

export interface HuxBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "destructive" | "outline" | "neo";
  dot?: boolean;
}

export const HuxBadge = forwardRef<HTMLSpanElement, HuxBadgeProps>(
  ({ children, variant = "default", dot = false, className = "", ...props }, ref) => {
    const variantClasses = {
      default: "bg-[#F3F4F6] text-[#374151] border border-[rgba(0,0,0,0.06)]",
      primary: "bg-[#EEF4FF] text-[#0038C8] border border-[rgba(0,56,200,0.2)] font-semibold",
      success: "bg-[#ECFDF5] text-[#065F46] border border-[rgba(16,185,129,0.25)]",
      warning: "bg-[#FFFBEB] text-[#92400E] border border-[rgba(245,158,11,0.25)]",
      destructive: "bg-[#FEF2F2] text-[#991B1B] border border-[rgba(239,68,68,0.25)]",
      outline: "bg-transparent text-[#4B5563] border border-[rgba(0,0,0,0.15)]",
      neo: "bg-[#0038C8] text-white border-[1px] border-[#001B66] shadow-[2px_2px_0px_#001B66] font-bold uppercase tracking-wider text-[10px]",
    };

    const dotColors = {
      default: "bg-[#9CA3AF]",
      primary: "bg-[#0038C8]",
      success: "bg-[#10B981] animate-pulse",
      warning: "bg-[#F59E0B]",
      destructive: "bg-[#EF4444]",
      outline: "bg-[#6B7280]",
      neo: "bg-[#60A5FA]",
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
        <span>{children}</span>
      </span>
    );
  }
);

HuxBadge.displayName = "HuxBadge";
