"use client";

import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

export interface HuxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const HuxInput = forwardRef<HTMLInputElement, HuxInputProps>(
  ({ label, helperText, error, iconLeft, iconRight, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs sm:text-sm font-semibold text-[#1E1E1E]">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {iconLeft && (
            <span className="absolute left-3 text-[#9CA3AF] pointer-events-none shrink-0 flex items-center justify-center">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-[#F9FAFB] text-[#1E1E1E] text-sm rounded-[10px] border border-[rgba(0,0,0,0.12)] px-3.5 py-2.5 transition-all outline-none placeholder:text-[#9CA3AF] focus:bg-white focus:border-[#0038C8] focus:ring-2 focus:ring-[rgba(0,56,200,0.15)] disabled:opacity-50 disabled:bg-[#E5E7EB] ${
              iconLeft ? "pl-10" : ""
            } ${iconRight ? "pr-10" : ""} ${error ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[rgba(239,68,68,0.2)]" : ""} ${className}`}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 text-[#9CA3AF] pointer-events-none shrink-0 flex items-center justify-center">
              {iconRight}
            </span>
          )}
        </div>
        {error && <span className="text-xs text-[#DC2626] font-medium">{error}</span>}
        {!error && helperText && <span className="text-xs text-[#6B7280]">{helperText}</span>}
      </div>
    );
  }
);
HuxInput.displayName = "HuxInput";

export interface HuxTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const HuxTextarea = forwardRef<HTMLTextAreaElement, HuxTextareaProps>(
  ({ label, helperText, error, className = "", id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label htmlFor={textareaId} className="text-xs sm:text-sm font-semibold text-[#1E1E1E]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={4}
          className={`w-full bg-[#F9FAFB] text-[#1E1E1E] text-sm rounded-[10px] border border-[rgba(0,0,0,0.12)] p-3.5 transition-all outline-none placeholder:text-[#9CA3AF] focus:bg-white focus:border-[#0038C8] focus:ring-2 focus:ring-[rgba(0,56,200,0.15)] disabled:opacity-50 disabled:bg-[#E5E7EB] resize-y ${
            error ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[rgba(239,68,68,0.2)]" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-[#DC2626] font-medium">{error}</span>}
        {!error && helperText && <span className="text-xs text-[#6B7280]">{helperText}</span>}
      </div>
    );
  }
);
HuxTextarea.displayName = "HuxTextarea";
