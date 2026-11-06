"use client";

import React, { forwardRef } from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { HuxCard, HuxCardContent } from "./HuxCard";
import { HuxBadge } from "./HuxBadge";

export interface HuxStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "default" | "neo" | "elevated";
  className?: string;
}

export const HuxStatCard = forwardRef<HTMLDivElement, HuxStatCardProps>(
  (
    {
      title,
      value,
      change,
      trend = "neutral",
      subtitle,
      icon,
      variant = "default",
      className = "",
    },
    ref
  ) => {
    return (
      <HuxCard ref={ref} variant={variant} className={`text-left ${className}`}>
        <HuxCardContent className="p-5 flex flex-col justify-between h-full gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-[#6B7280] tracking-tight">
              {title}
            </span>
            {icon && (
              <div className="w-8 h-8 rounded-[8px] bg-[#EEF4FF] text-[#0038C8] flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] tracking-tight">
              {value}
            </span>

            {(change || subtitle) && (
              <div className="flex items-center gap-2 mt-1">
                {change && (
                  <HuxBadge
                    variant={
                      trend === "up"
                        ? "success"
                        : trend === "down"
                        ? "destructive"
                        : "default"
                    }
                    className="text-[11px] font-semibold py-0"
                  >
                    {trend === "up" && <ArrowUpRight className="w-3 h-3 inline mr-0.5" />}
                    {trend === "down" && <ArrowDownRight className="w-3 h-3 inline mr-0.5" />}
                    {trend === "neutral" && <Minus className="w-3 h-3 inline mr-0.5" />}
                    {change}
                  </HuxBadge>
                )}
                {subtitle && (
                  <span className="text-xs text-[#9CA3AF] truncate">{subtitle}</span>
                )}
              </div>
            )}
          </div>
        </HuxCardContent>
      </HuxCard>
    );
  }
);

HuxStatCard.displayName = "HuxStatCard";
