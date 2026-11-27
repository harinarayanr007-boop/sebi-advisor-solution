"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { GROWVELL_100_POSTS, GROWVELL_PILLARS, GrowvellPost } from "@/lib/growvell-posts";
import { GrowvellPortalHeader } from "@/components/growvell/GrowvellPortalHeader";
import {
  CheckCircle2,
  Clock,
  Edit3,
  Download,
  Copy,
  Search,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  XCircle,
  Share2,
  Send,
  RotateCcw,
  CheckCheck,
  ExternalLink,
  Info,
  Cloud,
  CloudCheck,
  RefreshCw,
  Layers,
  LayoutGrid,
  Filter,
} from "lucide-react";

type ApprovalStatus = "approved" | "revision" | "rejected";

export default function GrowvellApprovalPortal() {
  const [statusMap, setStatusMap] = useState<Record<number, ApprovalStatus>>({});
  const [notesMap, setNotesMap] = useState<Record<number, string>>({});
  const [activeNotePostId, setActiveNotePostId] = useState<number | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<number | "all">("all");
  const [selectedSegment, setSelectedSegment] = useState<
    "all" | "Domestic India" | "Global NRI"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "pending" | "approved" | "revision" | "rejected"
  >("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedPostIds, setExpandedPostIds] = useState<Set<number>>(new Set());
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  // Cloud synchronization states
  const [syncState, setSyncState] = useState<"synced" | "syncing" | "error">("synced");
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [lastUpdatedBy, setLastUpdatedBy] = useState<string | null>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Push state to cloud backend
  const pushToCloud = useCallback(
    async (
      newStatus: Record<number, ApprovalStatus>,
      newNotes: Record<number, string>
    ) => {
      setSyncState("syncing");
      try {
        const res = await fetch("/api/growvell/approval", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            statusMap: newStatus,
            notesMap: newNotes,
            updatedBy: "Dhanesh Murali (Founder)",
          }),
        });
        const data = await res.json();
        if (data.success) {
          setSyncState("synced");
          setLastSyncedAt(new Date().toLocaleTimeString());
        } else {
          setSyncState("error");
        }
      } catch (e) {
        console.error("Cloud push failed:", e);
        setSyncState("error");
      }
    },
    []
  );

  // Fetch initial state from cloud on mount
  const fetchFromCloud = useCallback(async (isManual = false) => {
    if (isManual) setSyncState("syncing");
    try {
      const res = await fetch(`/api/growvell/approval?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.statusMap) {
          setStatusMap(data.statusMap);
          setNotesMap(data.notesMap || {});
          if (data.lastUpdated) {
            const dateObj = new Date(data.lastUpdated);
            setLastSyncedAt(dateObj.toLocaleTimeString());
          }
          if (data.updatedBy) {
            setLastUpdatedBy(data.updatedBy);
          }
          // Also update localStorage as local offline cache
          localStorage.setItem("growvell_hook_approvals_v3", JSON.stringify(data.statusMap));
          localStorage.setItem("growvell_hook_notes_v3", JSON.stringify(data.notesMap || {}));
          setSyncState("synced");
          if (isManual) {
            showToast("Fetched latest approvals from cloud!");
          }
          return;
        }
      }
    } catch (e) {
      console.warn("Cloud fetch error, falling back to local storage:", e);
    }

    // Fallback to localStorage if offline
    try {
      const localStatus = localStorage.getItem("growvell_hook_approvals_v3");
      const localNotes = localStorage.getItem("growvell_hook_notes_v3");
      if (localStatus) setStatusMap(JSON.parse(localStatus));
      if (localNotes) setNotesMap(JSON.parse(localNotes));
      setSyncState("synced");
    } catch (e) {
      console.error("Local storage load failed", e);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchFromCloud(false);
  }, [fetchFromCloud]);

  // Synchronize helper (updates local state, caches locally, and schedules cloud push)
  const commitState = (
    updatedStatus: Record<number, ApprovalStatus>,
    updatedNotes: Record<number, string>
  ) => {
    setStatusMap(updatedStatus);
    setNotesMap(updatedNotes);

    // Save to local cache immediately
    try {
      localStorage.setItem("growvell_hook_approvals_v3", JSON.stringify(updatedStatus));
      localStorage.setItem("growvell_hook_notes_v3", JSON.stringify(updatedNotes));
    } catch (e) {
      console.error("Local storage save error", e);
    }

    // Debounce cloud push to prevent flooding on rapid typing
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    syncTimeoutRef.current = setTimeout(() => {
      pushToCloud(updatedStatus, updatedNotes);
    }, 600);
  };

  const setStatus = (id: number, status: ApprovalStatus) => {
    const updated = { ...statusMap };
    if (updated[id] === status) {
      delete updated[id];
    } else {
      updated[id] = status;
    }

    commitState(updated, notesMap);

    if (status === "revision") {
      setActiveNotePostId(id);
    } else if (activeNotePostId === id) {
      setActiveNotePostId(null);
    }
  };

  const setNote = (id: number, note: string) => {
    const updatedNotes = { ...notesMap, [id]: note };
    commitState(statusMap, updatedNotes);
  };

  const toggleExpand = (id: number) => {
    setExpandedPostIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyHookToClipboard = (post: GrowvellPost) => {
    navigator.clipboard.writeText(post.hook);
    setCopiedId(post.id);
    showToast(`Copied Hook #${post.id} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered posts calculation
  const filteredPosts = useMemo(() => {
    return GROWVELL_100_POSTS.filter((post) => {
      if (selectedPillar !== "all" && post.pillarId !== selectedPillar) {
        return false;
      }
      if (selectedSegment !== "all" && post.segment !== selectedSegment) {
        return false;
      }
      const currentStatus = statusMap[post.id] || "pending";
      if (selectedStatus !== "all" && currentStatus !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchHook = post.hook.toLowerCase().includes(q);
        const matchAngle = post.angle.toLowerCase().includes(q);
        const matchFormat = post.format.toLowerCase().includes(q);
        const matchId = post.id.toString() === q;
        if (!matchHook && !matchAngle && !matchFormat && !matchId) {
          return false;
        }
      }
      return true;
    });
  }, [selectedPillar, selectedSegment, selectedStatus, searchQuery, statusMap]);

  // Overall statistics
  const stats = useMemo(() => {
    let approved = 0;
    let revision = 0;
    let rejected = 0;
    for (const post of GROWVELL_100_POSTS) {
      const s = statusMap[post.id];
      if (s === "approved") approved++;
      else if (s === "revision") revision++;
      else if (s === "rejected") rejected++;
    }
    const reviewed = approved + revision + rejected;
    const pending = 100 - reviewed;
    return { approved, revision, rejected, reviewed, pending };
  }, [statusMap]);

  // Pillar specific counts
  const pillarStats = useMemo(() => {
    const map: Record<number, { total: number; approved: number; revision: number; rejected: number }> = {};
    for (const p of GROWVELL_PILLARS) {
      map[p.id] = { total: 0, approved: 0, revision: 0, rejected: 0 };
    }
    for (const post of GROWVELL_100_POSTS) {
      if (map[post.pillarId]) {
        map[post.pillarId].total++;
        const s = statusMap[post.id];
        if (s === "approved") {
          map[post.pillarId].approved++;
        } else if (s === "revision") {
          map[post.pillarId].revision++;
        } else if (s === "rejected") {
          map[post.pillarId].rejected++;
        }
      }
    }
    return map;
  }, [statusMap]);

  const approveAllVisible = () => {
    const updatedStatus = { ...statusMap };
    filteredPosts.forEach((p) => {
      updatedStatus[p.id] = "approved";
    });
    commitState(updatedStatus, notesMap);
    showToast(`Approved ${filteredPosts.length} visible hooks!`);
  };

  const resetAllProgress = () => {
    if (confirm("Are you sure you want to reset all review progress and notes in the cloud?")) {
      commitState({}, {});
      showToast("Progress has been reset.");
    }
  };

  const exportCsv = () => {
    const headers = [
      "ID",
      "Pillar",
      "Audience Segment",
      "Status",
      "Founder Revision Notes",
      "Hook",
      "Angle & Calculation",
      "Recommended Visual Format",
      "Call To Action",
    ];

    const rows = GROWVELL_100_POSTS.map((p) => [
      p.id,
      `"${p.pillar}"`,
      `"${p.segment}"`,
      `"${statusMap[p.id] || "pending"}"`,
      `"${(notesMap[p.id] || "").replace(/"/g, '""')}"`,
      `"${p.hook.replace(/"/g, '""')}"`,
      `"${p.angle.replace(/"/g, '""')}"`,
      `"${p.format.replace(/"/g, '""')}"`,
      `"${p.cta.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `growvell_100_hooks_review_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded complete review CSV!");
  };

  const copyApprovedList = () => {
    const approvedPosts = GROWVELL_100_POSTS.filter((p) => statusMap[p.id] === "approved");
    if (approvedPosts.length === 0) {
      alert("No hooks have been approved yet. Tick some hooks first!");
      return;
    }
    const text = approvedPosts
      .map((p) => `#${p.id} [${p.pillar} | ${p.segment}]\n${p.hook}\nFormat: ${p.format}\n`)
      .join("\n---\n\n");
    navigator.clipboard.writeText(text);
    showToast(`Copied ${approvedPosts.length} approved hooks to clipboard!`);
  };

  // WhatsApp link using Hari's verified phone number: +91 93456 19428
  const generateWhatsAppUrl = () => {
    const approvedCount = stats.approved;
    const revisionPosts = GROWVELL_100_POSTS.filter((p) => statusMap[p.id] === "revision");

    let message = `Hi Hari, Dhanesh here from Growvell.\n\nI have reviewed the 100 content hooks:\n- Approved: ${approvedCount}/100\n- Needs Edit: ${stats.revision}/100\n- Rejected: ${stats.rejected}/100\n- Pending: ${stats.pending}/100\n`;

    if (revisionPosts.length > 0) {
      message += `\nRevision Notes for Selected Hooks:\n`;
      revisionPosts.forEach((p) => {
        const note = notesMap[p.id] || "Minor adjustments needed";
        message += `* Post #${p.id} (${p.pillar}): "${note}"\n`;
      });
    }

    message += `\nAll changes are saved live on the cloud portal. Let us proceed with production on the approved batch!`;

    return `https://wa.me/919345619428?text=${encodeURIComponent(message)}`;
  };

  const activePillarName = useMemo(() => {
    if (selectedPillar === "all") return "All 10 Pillars (100 Posts)";
    const found = GROWVELL_PILLARS.find((p) => p.id === selectedPillar);
    return found ? `${found.id}. ${found.name}` : "Selected Pillar";
  }, [selectedPillar]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#0038C8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[#1E1E1E] font-medium text-sm">Loading Growvell Review Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#1E1E1E] pb-32">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#1E1E1E] text-white px-4 py-2.5 rounded-lg shadow-xl border border-gray-700 flex items-center gap-2.5 animate-fade-in text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Unified Growvell Header */}
      <GrowvellPortalHeader
        activeTab="approval"
        title="100 Content Hooks Approval Portal"
        subtitle="Curated for Dhanesh Murali · 60 Domestic India + 40 Global NRI"
        syncState={syncState}
        lastSyncedAt={lastSyncedAt}
        onRefresh={() => fetchFromCloud(true)}
        whatsAppUrl={generateWhatsAppUrl()}
        extraActions={
          <>
            <button
              onClick={copyApprovedList}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[11px] sm:text-xs font-semibold text-[#1E1E1E] transition border border-gray-300 shrink-0"
            >
              <Copy className="w-3 h-3" />
              <span>Approved ({stats.approved})</span>
            </button>
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[11px] sm:text-xs font-semibold text-[#1E1E1E] transition border border-gray-300 shrink-0"
            >
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </>
        }
      >
          {/* Compact Stats Bar */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3 mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-gray-100 text-center">
            <div className="bg-[#F8FAFC] border border-gray-200 rounded-lg py-1 px-1.5 sm:p-2">
              <div className="text-[9px] sm:text-[11px] font-bold uppercase text-gray-500">
                Reviewed
              </div>
              <div className="text-xs sm:text-base font-black text-[#001B66]">
                {stats.reviewed}<span className="text-[9px] font-normal text-gray-400">/100</span>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg py-1 px-1.5 sm:p-2">
              <div className="text-[9px] sm:text-[11px] font-bold uppercase text-emerald-800">
                Approve
              </div>
              <div className="text-xs sm:text-base font-black text-emerald-700">{stats.approved}</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg py-1 px-1.5 sm:p-2">
              <div className="text-[9px] sm:text-[11px] font-bold uppercase text-amber-800">
                Edit
              </div>
              <div className="text-xs sm:text-base font-black text-amber-700">{stats.revision}</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg py-1 px-1.5 sm:p-2">
              <div className="text-[9px] sm:text-[11px] font-bold uppercase text-red-800">
                Reject
              </div>
              <div className="text-xs sm:text-base font-black text-red-700">{stats.rejected}</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg py-1 px-1.5 sm:p-2">
              <div className="text-[9px] sm:text-[11px] font-bold uppercase text-blue-800">
                Pending
              </div>
              <div className="text-xs sm:text-base font-black text-[#0038C8]">{stats.pending}</div>
            </div>
          </div>

          {/* Micro Progress Bar */}
          <div className="mt-1.5 sm:mt-2">
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-600 transition-all duration-300"
                style={{ width: `${(stats.approved / 100) * 100}%` }}
                title={`${stats.approved} Approved`}
              />
              <div
                className="bg-amber-500 transition-all duration-300"
                style={{ width: `${(stats.revision / 100) * 100}%` }}
                title={`${stats.revision} Needs Edit`}
              />
              <div
                className="bg-red-500 transition-all duration-300"
                style={{ width: `${(stats.rejected / 100) * 100}%` }}
                title={`${stats.rejected} Rejected`}
              />
            </div>
          </div>
      </GrowvellPortalHeader>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">

        {/* 10 CONTENT ARCHETYPES SELECTOR (Mobile Optimized Ribbon + Compact Desktop Grid) */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm mb-3 sm:mb-5">
          {/* Header Row: Title and current active label */}
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0038C8]" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#001B66]">
                Content Archetypes (10)
              </span>
              <span className="text-[10px] text-gray-500 font-semibold hidden sm:inline">
                · Select to filter
              </span>
            </div>

            <button
              onClick={() => setSelectedPillar("all")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition flex items-center gap-1 ${
                selectedPillar === "all"
                  ? "bg-[#001B66] text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>All 100</span>
              <span className="text-[10px] opacity-75">({stats.approved}/100)</span>
            </button>
          </div>

          {/* MOBILE VIEW (block sm:hidden): Sleek horizontal swipeable pill bar - minimal height, zero clutter */}
          <div className="sm:hidden flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none -mx-1 px-1">
            <button
              onClick={() => setSelectedPillar("all")}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                selectedPillar === "all"
                  ? "bg-[#001B66] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              All 100 Posts
            </button>

            {GROWVELL_PILLARS.map((p) => {
              const count = pillarStats[p.id] || { total: 10, approved: 0, revision: 0, rejected: 0 };
              const isSelected = selectedPillar === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPillar(p.id)}
                  className={`shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#0038C8] text-white shadow-sm ring-1 ring-[#001B66]"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <span>{p.id}. {p.name}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                      isSelected
                        ? "bg-white/25 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {count.approved}/10
                  </span>
                </button>
              );
            })}
          </div>

          {/* DESKTOP VIEW (hidden sm:grid): Compact, clean 5-column x 2-row tiles - neat 38px height per card */}
          <div className="hidden sm:grid grid-cols-5 gap-2">
            {GROWVELL_PILLARS.map((p) => {
              const count = pillarStats[p.id] || { total: 10, approved: 0, revision: 0, rejected: 0 };
              const isSelected = selectedPillar === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPillar(isSelected ? "all" : p.id)}
                  className={`text-left px-3 py-2 rounded-lg transition border flex items-center justify-between text-xs ${
                    isSelected
                      ? "bg-[#001B66] text-white border-[#001B66] shadow-sm font-bold"
                      : "bg-[#F8FAFC] hover:bg-white text-gray-800 border-gray-200 hover:border-[#0038C8]"
                  }`}
                  title={p.description}
                >
                  <span className="truncate mr-1">
                    <span className="opacity-60 text-[10px] mr-1">{p.id < 10 ? `0${p.id}` : p.id}.</span>
                    {p.name}
                  </span>
                  <span
                    className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : count.approved > 0
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {count.approved}/10
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Segment Filters (Compact on mobile) */}
        <div className="bg-white rounded-xl border border-gray-200 p-2.5 sm:p-3.5 shadow-sm mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hooks, numbers, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#0038C8] focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Audience Segment Toggle */}
            <div className="flex items-center gap-1.5 justify-between sm:justify-start">
              <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50 text-[11px] sm:text-xs font-medium w-full sm:w-auto">
                <button
                  onClick={() => setSelectedSegment("all")}
                  className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-md transition ${
                    selectedSegment === "all"
                      ? "bg-white text-[#001B66] font-bold shadow-xs"
                      : "text-gray-600 hover:text-[#1E1E1E]"
                  }`}
                >
                  All (100)
                </button>
                <button
                  onClick={() => setSelectedSegment("Domestic India")}
                  className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-md transition ${
                    selectedSegment === "Domestic India"
                      ? "bg-[#0038C8] text-white font-bold shadow-xs"
                      : "text-gray-600 hover:text-[#1E1E1E]"
                  }`}
                >
                  Domestic (60)
                </button>
                <button
                  onClick={() => setSelectedSegment("Global NRI")}
                  className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-md transition ${
                    selectedSegment === "Global NRI"
                      ? "bg-[#001B66] text-white font-bold shadow-xs"
                      : "text-gray-600 hover:text-[#1E1E1E]"
                  }`}
                >
                  NRI (40)
                </button>
              </div>

              {/* Status Select */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="text-[11px] sm:text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#0038C8] shrink-0"
              >
                <option value="all">Status (All)</option>
                <option value="pending">Pending ({stats.pending})</option>
                <option value="approved">Approved ({stats.approved})</option>
                <option value="revision">Needs Edit ({stats.revision})</option>
                <option value="rejected">Rejected ({stats.rejected})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action & Results Count Bar */}
        <div className="flex items-center justify-between mb-3 px-1 text-xs">
          <div className="font-semibold text-gray-700 truncate mr-2">
            Showing <strong className="text-[#001B66]">{filteredPosts.length}</strong> posts
            {selectedPillar !== "all" && (
              <span className="text-gray-500 ml-1">in {activePillarName}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={approveAllVisible}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 text-[11px] font-bold transition"
            >
              <CheckCheck className="w-3 h-3" />
              <span>Approve All Visible</span>
            </button>
            <button
              onClick={resetAllProgress}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition"
              title="Reset progress"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center my-6">
            <Info className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-800">No hooks match your current filters</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              Try resetting the search query or status filter to see more content pieces.
            </p>
            <button
              onClick={() => {
                setSelectedPillar("all");
                setSelectedSegment("all");
                setSelectedStatus("all");
                setSearchQuery("");
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-[#0038C8] text-white text-xs font-bold hover:bg-[#001B66] transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Posts Cards Grid */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {filteredPosts.map((post) => {
            const currentStatus = statusMap[post.id] || "pending";
            const note = notesMap[post.id] || "";
            const isExpanded = expandedPostIds.has(post.id);
            const isNoteOpen = activeNotePostId === post.id;

            let cardBorder = "border-gray-200 hover:border-gray-300";
            let statusBadge = (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">
                Pending
              </span>
            );

            if (currentStatus === "approved") {
              cardBorder = "border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/15";
              statusBadge = (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" /> Approved
                </span>
              );
            } else if (currentStatus === "revision") {
              cardBorder = "border-amber-500 ring-1 ring-amber-500/20 bg-amber-50/15";
              statusBadge = (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                  <Edit3 className="w-2.5 h-2.5" /> Needs Edit
                </span>
              );
            } else if (currentStatus === "rejected") {
              cardBorder = "border-red-300 bg-red-50/15 ring-1 ring-red-300";
              statusBadge = (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
                  <XCircle className="w-2.5 h-2.5 text-red-600" /> Rejected
                </span>
              );
            }

            return (
              <div
                key={post.id}
                className={`bg-white rounded-xl border p-3.5 sm:p-5 shadow-xs transition-all duration-200 ${cardBorder}`}
              >
                {/* Card Top Row: Meta info & Status */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 sm:mb-3">
                  <div className="flex items-center flex-wrap gap-1.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#001B66] text-white text-[11px] font-black">
                      #{post.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-blue-100 text-[#0038C8]">
                      {post.pillarId}. {post.pillar}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${
                        post.segment === "Domestic India"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      {post.segment}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 hidden sm:inline">
                      {post.format}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {statusBadge}
                  </div>
                </div>

                {/* Hook Text (Primary focus) */}
                <div className="my-2 sm:my-3">
                  <h3 className="text-sm sm:text-base font-bold text-[#1E1E1E] leading-snug">
                    &ldquo;{post.hook}&rdquo;
                  </h3>
                  <div className="text-[10px] text-gray-500 font-medium mt-1 sm:hidden">
                    Format: {post.format}
                  </div>
                </div>

                {/* Card Action Controls (Interchanged: Left = Discovery, Right = Decisions) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2.5 sm:pt-3 border-t border-gray-100">
                  {/* LEFT SIDE: View Math & Angle + Copy Hook */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleExpand(post.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[11px] font-bold text-[#0038C8] transition border border-blue-200"
                    >
                      <span>{isExpanded ? "Hide Math" : "View Math"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>

                    <button
                      onClick={() => copyHookToClipboard(post)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[11px] font-semibold text-gray-700 transition border border-gray-200"
                      title="Copy hook to clipboard"
                    >
                      {copiedId === post.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-gray-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* RIGHT SIDE: Approve, Needs Edit, Reject (in Red) */}
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <button
                      onClick={() => setStatus(post.id, "approved")}
                      className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        currentStatus === "approved"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      {currentStatus === "approved" ? "Approved" : "Approve"}
                    </button>

                    <button
                      onClick={() => setStatus(post.id, "revision")}
                      className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        currentStatus === "revision"
                          ? "bg-amber-600 text-white shadow-xs"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-300"
                      }`}
                    >
                      <Edit3 className="w-3 h-3" />
                      {currentStatus === "revision" ? "Editing" : "Edit"}
                    </button>

                    <button
                      onClick={() => setStatus(post.id, "rejected")}
                      className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        currentStatus === "rejected"
                          ? "bg-red-600 text-white shadow-xs ring-1 ring-red-500/20"
                          : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-300"
                      }`}
                    >
                      <XCircle className="w-3 h-3" />
                      {currentStatus === "rejected" ? "Rejected" : "Reject"}
                    </button>
                  </div>
                </div>

                {/* Inline Revision Notes Box */}
                {(isNoteOpen || note) && (
                  <div className="mt-3 pt-2.5 border-t border-amber-200 bg-amber-50/50 -mx-3.5 -mb-3.5 sm:-mx-5 sm:-mb-5 p-3 sm:p-4 rounded-b-xl">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Founder Note:
                      </label>
                      <span className="text-[10px] text-amber-700 font-medium">
                        Auto-saving...
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="e.g., Change ₹15k to ₹25k, make it softer, change focus to IT leads..."
                      value={note}
                      onChange={(e) => setNote(post.id, e.target.value)}
                      className="w-full text-xs p-2 rounded-lg bg-white border border-amber-300 text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                )}

                {/* Expanded Math, Calculation, and CTA Section */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-gray-100 bg-[#F8FAFC] -mx-3.5 -mb-3.5 sm:-mx-5 sm:-mb-5 p-3.5 sm:p-4 rounded-b-xl space-y-2 text-xs">
                    <div>
                      <div className="font-bold text-[#001B66] uppercase tracking-wider text-[10px] mb-1">
                        Forensic Calculation & Angle:
                      </div>
                      <p className="text-gray-700 leading-relaxed font-normal bg-white p-2.5 rounded-lg border border-gray-200 text-[11px] sm:text-xs">
                        {post.angle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <span className="font-bold text-gray-500 text-[9px] uppercase block">
                          Visual Format
                        </span>
                        <span className="font-semibold text-[#1E1E1E] text-[11px] mt-0.5 block">
                          {post.format}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <span className="font-bold text-gray-500 text-[9px] uppercase block">
                          Call To Action (Lead Magnet)
                        </span>
                        <span className="font-semibold text-[#0038C8] text-[11px] mt-0.5 block">
                          {post.cta}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-300 py-2.5 px-3 sm:px-4 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold text-gray-700">
            <div>
              <span className="text-emerald-700 font-black">{stats.approved}</span> Appr
            </div>
            <div className="text-gray-300">|</div>
            <div>
              <span className="text-amber-700 font-black">{stats.revision}</span> Edit
            </div>
            <div className="text-gray-300">|</div>
            <div>
              <span className="text-red-700 font-black">{stats.rejected}</span> Rej
            </div>
            <div className="text-gray-300">|</div>
            <div>
              <span className="text-[#0038C8] font-black">{stats.pending}</span> Pend
            </div>
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
            <button
              onClick={copyApprovedList}
              className="flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[11px] font-bold text-[#1E1E1E] transition border border-gray-300 flex items-center justify-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </button>

            <button
              onClick={exportCsv}
              className="flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[11px] font-bold text-[#1E1E1E] transition border border-gray-300 flex items-center justify-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>CSV</span>
            </button>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-2 sm:flex-initial px-3 py-1.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-[11px] sm:text-xs font-bold transition shadow-sm flex items-center justify-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
