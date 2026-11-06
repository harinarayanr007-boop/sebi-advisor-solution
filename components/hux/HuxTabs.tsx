"use client";

import React, { createContext, useContext, useState } from "react";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (val: string) => void;
  variant: "pill" | "underline" | "segment";
}

const TabsContext = createContext<TabsContextType>({
  activeTab: "",
  setActiveTab: () => {},
  variant: "pill",
});

export interface HuxTabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (val: string) => void;
  variant?: "pill" | "underline" | "segment";
  children: React.ReactNode;
  className?: string;
}

export function HuxTabs({
  defaultValue,
  value,
  onValueChange,
  variant = "segment",
  children,
  className = "",
}: HuxTabsProps) {
  const [internalTab, setInternalTab] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalTab;

  const setActiveTab = (tab: string) => {
    if (value === undefined) setInternalTab(tab);
    onValueChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      <div className={`flex flex-col gap-4 w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export function HuxTabList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { variant } = useContext(TabsContext);

  const listClasses = {
    segment: "bg-[#F3F4F6] p-1 rounded-[10px] inline-flex items-center gap-1 border border-[rgba(0,0,0,0.06)]",
    pill: "inline-flex items-center gap-2",
    underline: "border-b border-[rgba(0,0,0,0.1)] inline-flex items-center gap-6",
  };

  return <div className={`${listClasses[variant]} ${className}`}>{children}</div>;
}

export function HuxTabTrigger({
  value,
  children,
  icon,
  badge,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}) {
  const { activeTab, setActiveTab, variant } = useContext(TabsContext);
  const isActive = activeTab === value;

  const triggerClasses = {
    segment: isActive
      ? "bg-white text-[#1E1E1E] font-semibold shadow-xs"
      : "text-[#6B7280] hover:text-[#1E1E1E]",
    pill: isActive
      ? "bg-[#0038C8] text-white font-medium shadow-xs"
      : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]",
    underline: isActive
      ? "border-b-2 border-[#0038C8] text-[#0038C8] font-semibold pb-2 -mb-px"
      : "text-[#6B7280] hover:text-[#1E1E1E] pb-2",
  };

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={`px-3.5 py-1.5 rounded-[8px] text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer ${triggerClasses[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {badge && <span className="shrink-0">{badge}</span>}
    </button>
  );
}

export function HuxTabContent({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;

  return <div className={`w-full animate-in fade-in duration-200 ${className}`}>{children}</div>;
}
