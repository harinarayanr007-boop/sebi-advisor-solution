"use client";

import React from "react";
import Link from "next/link";
import { Cloud, RefreshCw, Send } from "lucide-react";

interface GrowvellPortalHeaderProps {
  activeTab: "approval" | "content";
  title: string;
  subtitle: string;
  syncState: "synced" | "syncing" | "error";
  lastSyncedAt?: string | null;
  onRefresh?: () => void;
  whatsAppUrl: string;
  extraActions?: React.ReactNode;
  children?: React.ReactNode;
}

export function GrowvellPortalHeader({
  activeTab,
  title,
  subtitle,
  syncState,
  lastSyncedAt,
  onRefresh,
  whatsAppUrl,
  extraActions,
  children,
}: GrowvellPortalHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#0038C8] text-white">
                Growvell
              </span>
              <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
                Client Portal
              </span>

              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-gray-200 bg-gray-50">
                {syncState === "syncing" && (
                  <>
                    <RefreshCw className="w-2.5 h-2.5 text-[#0038C8] animate-spin" />
                    <span className="text-[#0038C8]">Syncing...</span>
                  </>
                )}
                {syncState === "synced" && (
                  <>
                    <Cloud className="w-2.5 h-2.5 text-emerald-600" />
                    <span className="text-emerald-700">
                      Synced {lastSyncedAt ? `(${lastSyncedAt})` : ""}
                    </span>
                  </>
                )}
                {syncState === "error" && (
                  <>
                    <Cloud className="w-2.5 h-2.5 text-amber-600" />
                    <span className="text-amber-700">Saved Locally</span>
                  </>
                )}
              </div>

              {/* Unified Tab Switcher */}
              <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-[11px] font-bold border border-gray-200 ml-0 sm:ml-2">
                <Link
                  href="/growvell/approval"
                  className={`px-2.5 py-1 rounded-md transition whitespace-nowrap ${
                    activeTab === "approval"
                      ? "bg-[#0038C8] text-white shadow-xs"
                      : "text-gray-600 hover:text-[#1E1E1E]"
                  }`}
                >
                  Hook Approvals
                </Link>
                <Link
                  href="/growvell/content"
                  className={`px-2.5 py-1 rounded-md transition whitespace-nowrap ${
                    activeTab === "content"
                      ? "bg-[#0038C8] text-white shadow-xs"
                      : "text-gray-600 hover:text-[#1E1E1E]"
                  }`}
                >
                  Daily Content Hub
                </Link>
              </div>
            </div>

            <h1 className="text-base sm:text-2xl font-black text-[#001B66] tracking-tight mt-1 truncate">
              {title}
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-600 truncate">
              {subtitle}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[11px] sm:text-xs font-semibold text-[#1E1E1E] transition border border-gray-300 shrink-0"
                title="Refresh cloud state"
              >
                <RefreshCw className={`w-3 h-3 ${syncState === "syncing" ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Pull Cloud</span>
              </button>
            )}
            {extraActions}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-[11px] sm:text-xs font-bold transition shadow-sm shrink-0"
            >
              <Send className="w-3 h-3" />
              <span>Contact</span>
            </a>
          </div>
        </div>

        {children}
      </div>
    </header>
  );
}
