"use client";

import React, { HTMLAttributes, forwardRef } from "react";

export interface HuxCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "neo" | "glass";
  hoverable?: boolean;
}

export const HuxCard = forwardRef<HTMLDivElement, HuxCardProps>(
  ({ children, variant = "default", hoverable = false, className = "", ...props }, ref) => {
    const variantClasses = {
      default: "bg-white border border-[rgba(0,0,0,0.08)] shadow-sm",
      elevated: "bg-white border border-[rgba(0,0,0,0.06)] shadow-md hover:shadow-lg transition-shadow",
      outline: "bg-transparent border border-[rgba(0,0,0,0.14)]",
      neo: "bg-white border-[1.5px] border-[#1E1E1E] shadow-[4px_4px_0px_#0038C8]",
      glass: "bg-white/80 backdrop-blur-md border border-white/40 shadow-sm",
    };

    const hoverClass = hoverable
      ? "hover:-translate-y-0.5 hover:border-[rgba(0,56,200,0.3)] transition-all cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={`rounded-[14px] overflow-hidden ${variantClasses[variant]} ${hoverClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
HuxCard.displayName = "HuxCard";

export const HuxCardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`p-5 pb-3 flex flex-col gap-1.5 ${className}`} {...props}>
      {children}
    </div>
  )
);
HuxCardHeader.displayName = "HuxCardHeader";

export const HuxCardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className = "", ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-base sm:text-lg font-bold text-[#1E1E1E] tracking-tight leading-snug ${className}`}
      {...props}
    >
      {children}
    </h3>
  )
);
HuxCardTitle.displayName = "HuxCardTitle";

export const HuxCardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className = "", ...props }, ref) => (
    <p ref={ref} className={`text-xs sm:text-sm text-[#6B7280] leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  )
);
HuxCardDescription.displayName = "HuxCardDescription";

export const HuxCardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`p-5 pt-2 ${className}`} {...props}>
      {children}
    </div>
  )
);
HuxCardContent.displayName = "HuxCardContent";

export const HuxCardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`p-5 pt-3 border-t border-[rgba(0,0,0,0.06)] bg-[#FBFBFC] flex items-center justify-between ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
HuxCardFooter.displayName = "HuxCardFooter";
