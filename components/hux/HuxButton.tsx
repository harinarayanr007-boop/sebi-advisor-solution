"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface HuxButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "neo";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const HuxButton = forwardRef<HTMLButtonElement, HuxButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      className = "",
      ...props
    },
    ref
  ) => {
    // Size maps
    const sizeClasses = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-[6px]",
      md: "h-10 px-4 text-sm gap-2 rounded-[10px]",
      lg: "h-12 px-6 text-base gap-2.5 rounded-[12px] font-semibold",
    };

    // Variant maps
    const variantClasses = {
      primary:
        "bg-[#0038C8] text-white hover:bg-[#002FA7] active:bg-[#00278A] shadow-sm hover:shadow transition-all border border-transparent",
      secondary:
        "bg-[#F3F4F6] text-[#1E1E1E] hover:bg-[#E5E7EB] active:bg-[#D1D5DB] border border-[rgba(0,0,0,0.08)] transition-all",
      outline:
        "bg-white text-[#1E1E1E] border border-[rgba(0,0,0,0.14)] hover:border-[#0038C8] hover:text-[#0038C8] hover:bg-[#F8FBFE] transition-all",
      ghost:
        "bg-transparent text-[#4B5563] hover:text-[#1E1E1E] hover:bg-[#F3F4F6] transition-all",
      destructive:
        "bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C] transition-all",
      neo:
        "bg-white text-[#1E1E1E] border-[1.5px] border-[#1E1E1E] shadow-[3px_3px_0px_#0038C8] hover:shadow-[1px_1px_0px_#0038C8] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center font-medium select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!loading && iconLeft && <span className="shrink-0">{iconLeft}</span>}
        <span>{children}</span>
        {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </button>
    );
  }
);

HuxButton.displayName = "HuxButton";
