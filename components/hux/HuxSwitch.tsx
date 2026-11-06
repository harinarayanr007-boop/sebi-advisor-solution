"use client";

import React from "react";

export interface HuxSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function HuxSwitch({
  checked,
  onCheckedChange,
  label,
  description,
  disabled = false,
  className = "",
}: HuxSwitchProps) {
  return (
    <label
      className={`inline-flex items-center gap-3 cursor-pointer select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#0038C8] focus:ring-offset-2 ${
          checked ? "bg-[#0038C8]" : "bg-[#D1D5DB]"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && <span className="text-sm font-semibold text-[#1E1E1E]">{label}</span>}
          {description && <span className="text-xs text-[#6B7280]">{description}</span>}
        </div>
      )}
    </label>
  );
}
