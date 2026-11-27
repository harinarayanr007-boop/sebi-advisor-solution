"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { GROWVELL_100_POSTS } from "@/lib/growvell-posts";
import {
  GrowvellDayContentState,
  DayDeliveryRecord,
  ContentSlot,
  mergeDayState,
} from "@/lib/growvell-content-store";
import { GrowvellPortalHeader } from "@/components/growvell/GrowvellPortalHeader";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Check,
  Download,
  ExternalLink,
  FileText,
  Lock,
  MessageSquarePlus,
  Send,
} from "lucide-react";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function GrowvellContentHubPage() {
  const [contentState, setContentState] = useState<GrowvellDayContentState>(() => mergeDayState(null));
  const [approvedCount, setApprovedCount] = useState<number>(0);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));
  const [syncState, setSyncState] = useState<"synced" | "syncing" | "error">("synced");
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [suggestionDrafts, setSuggestionDrafts] = useState<Record<number, string>>({});
  const [suggestionPlatform, setSuggestionPlatform] = useState<Record<number, "linkedin" | "twitter" | "general">>({});
  const [submittingDay, setSubmittingDay] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadAll = useCallback(async () => {
    setLoading(true);
    setSyncState("syncing");
    try {
      const [appRes, cntRes] = await Promise.all([
        fetch(`/api/growvell/approval?t=${Date.now()}`, { cache: "no-store" }),
        fetch(`/api/growvell/content?t=${Date.now()}`, { cache: "no-store" }),
      ]);
      const appData = await appRes.json();
      const cntData = await cntRes.json();

      if (appData?.statusMap) {
        const count = Object.values(appData.statusMap).filter((s) => s === "approved").length;
        setApprovedCount(count);
      }
      setContentState(mergeDayState(cntData));
      setSyncState("synced");
      setLastSyncedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (err) {
      console.error("Failed loading Growvell content hub:", err);
      setSyncState("error");
      showToast("Failed to refresh latest content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const week1Days: DayDeliveryRecord[] = useMemo(() => {
    return Object.values(contentState.days)
      .filter((d) => d.day >= 1 && d.day <= 7)
      .sort((a, b) => a.day - b.day);
  }, [contentState.days]);

  const week2Days: DayDeliveryRecord[] = useMemo(() => {
    return Object.values(contentState.days)
      .filter((d) => d.day >= 8 && d.day <= 14)
      .sort((a, b) => a.day - b.day);
  }, [contentState.days]);

  const toggleDay = (day: number) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      showToast("Caption copied");
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      showToast("Copy failed, please select text manually");
    }
  };

  const handleAddSuggestion = async (day: number) => {
    const text = (suggestionDrafts[day] || "").trim();
    if (!text) return;
    setSubmittingDay(day);
    try {
      const res = await fetch("/api/growvell/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_suggestion",
          day,
          platform: suggestionPlatform[day] || "general",
          text,
          author: "Dhanesh Murali",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContentState(mergeDayState(data));
        setSuggestionDrafts((prev) => ({ ...prev, [day]: "" }));
        showToast(`Suggestion sent for Day ${day}`);
      } else {
        showToast("Could not save suggestion");
      }
    } catch {
      showToast("Network error saving suggestion");
    } finally {
      setSubmittingDay(null);
    }
  };

  const whatsAppUrl = `https://wa.me/919345619428?text=${encodeURIComponent(
    "Hey Hari, checking in on the Growvell Daily Content Hub."
  )}`;

  const renderSlotCard = (
    day: number,
    platform: "linkedin" | "twitter",
    slotIdx: number,
    slot: ContentSlot
  ) => {
    const isLinkedIn = platform === "linkedin";
    const hasDelivery = slot.status === "ready" && (Boolean(slot.fileUrl) || Boolean(slot.caption));
    const copyKey = `d${day}-${platform}-${slotIdx}`;
    const previewImg =
      slot.previewImageUrl ||
      (/\.(png|jpg|jpeg|webp)$/i.test(slot.fileUrl || "") ? slot.fileUrl : "");
    const isPdf = /\.pdf$/i.test(slot.fileName || slot.fileUrl || "");
    const linkedHook = slot.approvedPostId
      ? GROWVELL_100_POSTS.find((p) => p.id === slot.approvedPostId)
      : undefined;

    return (
      <div className="bg-[#F8FBFE] border border-gray-200 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 ${
                  isLinkedIn ? "bg-[#0038C8]" : "bg-[#1E1E1E]"
                }`}
              >
                {isLinkedIn ? <LinkedInIcon /> : <XIcon />}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs sm:text-sm text-[#1E1E1E] break-words">
                  {slot.label || `${isLinkedIn ? "LinkedIn" : "X"} Post ${slotIdx + 1}`}
                </p>
                {linkedHook && (
                  <p className="text-[10px] text-gray-500 truncate">
                    Hook #{linkedHook.id}
                  </p>
                )}
              </div>
            </div>

            {hasDelivery ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                Ready
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                <Clock className="w-3 h-3" />
                In Progress
              </span>
            )}
          </div>

          {hasDelivery ? (
            <div className="space-y-3">
              {previewImg ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white">
                  <img
                    src={previewImg}
                    alt={`${slot.label} preview`}
                    className="w-full max-h-64 object-contain bg-white"
                  />
                  {isPdf && (
                    <span className="absolute top-2 right-2 bg-[#001B66] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      PDF Carousel
                    </span>
                  )}
                </div>
              ) : slot.fileUrl ? (
                <div className="rounded-lg border border-dashed border-[#0038C8]/40 bg-white p-3 flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-[#0038C8] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#1E1E1E] truncate">
                      {slot.fileName || "Attached Asset"}
                    </p>
                    <p className="text-[10px] text-gray-500">Ready for download</p>
                  </div>
                </div>
              ) : null}

              {slot.fileUrl && (
                <div className="flex flex-col xs:flex-row sm:flex-row gap-2">
                  <a
                    href={slot.fileUrl}
                    download={slot.fileName || true}
                    className="flex-1 min-h-[38px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0038C8] hover:bg-[#001B66] text-white text-xs font-bold transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download {isPdf ? "Carousel PDF" : "Image"}</span>
                  </a>
                  <a
                    href={slot.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[38px] inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-[#1E1E1E] text-xs font-semibold transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open</span>
                  </a>
                </div>
              )}

              {slot.caption && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                      Post Text
                    </span>
                    <button
                      onClick={() => handleCopy(slot.caption, copyKey)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0038C8]/10 hover:bg-[#0038C8]/20 text-[#0038C8] text-[11px] font-bold transition shrink-0"
                    >
                      {copiedKey === copyKey ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs text-[#1E1E1E] whitespace-pre-wrap break-words font-sans leading-relaxed max-h-44 overflow-y-auto">
                    {slot.caption}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-300 rounded-lg p-4 text-center my-1">
              <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-[#1E1E1E]">Content in Progress</p>
              <p className="text-[11px] text-gray-500 mt-1">
                Asset and copy are being finalized. Add suggestions below if needed.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDayAccordion = (dayRecord: DayDeliveryRecord) => {
    const isOpen = openDays.has(dayRecord.day);
    const allSlots = [...dayRecord.linkedin, ...dayRecord.twitter];
    const readyCount = allSlots.filter(
      (s) => s.status === "ready" && (Boolean(s.fileUrl) || Boolean(s.caption))
    ).length;
    const daySuggestions = contentState.suggestions.filter((s) => s.day === dayRecord.day);

    return (
      <div
        key={dayRecord.day}
        className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-xs"
      >
        <button
          type="button"
          onClick={() => toggleDay(dayRecord.day)}
          className="w-full px-3.5 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-2 bg-white hover:bg-[#F8FBFE] transition text-left"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded-lg bg-[#0038C8] text-white text-[11px] sm:text-xs font-extrabold shrink-0">
              Day {dayRecord.day}
            </span>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#1E1E1E] truncate">
                {dayRecord.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-gray-500">
                2 LinkedIn · 2 X Posts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border ${
                readyCount === 4
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : readyCount > 0
                  ? "bg-blue-50 text-[#0038C8] border-blue-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}
            >
              {readyCount}/4 Ready
            </span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E1E1E]" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E1E1E]" />
            )}
          </div>
        </button>

        {isOpen && (
          <div className="px-3.5 pb-4 pt-2 sm:px-5 sm:pb-5 border-t border-gray-200 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-6 h-6 rounded bg-[#0038C8] text-white flex items-center justify-center shrink-0">
                  <LinkedInIcon />
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#001B66] uppercase tracking-wide">
                  LinkedIn (2 Posts: Carousel + Twitter-Style Card)
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {renderSlotCard(dayRecord.day, "linkedin", 0, dayRecord.linkedin[0])}
                {renderSlotCard(dayRecord.day, "linkedin", 1, dayRecord.linkedin[1])}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-6 h-6 rounded bg-[#1E1E1E] text-white flex items-center justify-center shrink-0">
                  <XIcon />
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#1E1E1E] uppercase tracking-wide">
                  X / Twitter (2 Posts)
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {renderSlotCard(dayRecord.day, "twitter", 0, dayRecord.twitter[0])}
                {renderSlotCard(dayRecord.day, "twitter", 1, dayRecord.twitter[1])}
              </div>
            </div>

            <div className="pt-3.5 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquarePlus className="w-4 h-4 text-[#0038C8]" />
                <h5 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wide text-[#1E1E1E]">
                  Add Suggestion for Day {dayRecord.day}
                </h5>
              </div>

              {daySuggestions.length > 0 && (
                <div className="space-y-2 mb-3">
                  {daySuggestions.map((s) => (
                    <div
                      key={s.id}
                      className="bg-[#F4F7FC] border border-gray-200 rounded-lg px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2"
                    >
                      <div className="min-w-0 break-words">
                        <span className="font-bold uppercase text-[10px] px-1.5 py-0.5 rounded bg-[#0038C8] text-white mr-2">
                          {s.platform}
                        </span>
                        <span className="text-[#1E1E1E] font-medium">{s.text}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={suggestionPlatform[dayRecord.day] || "general"}
                  onChange={(e) =>
                    setSuggestionPlatform((prev) => ({
                      ...prev,
                      [dayRecord.day]: e.target.value as "linkedin" | "twitter" | "general",
                    }))
                  }
                  className="text-xs font-semibold border border-gray-300 rounded-lg px-2.5 py-2.5 bg-white text-[#1E1E1E]"
                >
                  <option value="general">Both / General</option>
                  <option value="linkedin">LinkedIn Only</option>
                  <option value="twitter">X / Twitter Only</option>
                </select>

                <input
                  type="text"
                  value={suggestionDrafts[dayRecord.day] || ""}
                  onChange={(e) =>
                    setSuggestionDrafts((prev) => ({
                      ...prev,
                      [dayRecord.day]: e.target.value,
                    }))
                  }
                  placeholder={`Suggestion or edit for Day ${dayRecord.day}...`}
                  className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2.5"
                />

                <button
                  onClick={() => handleAddSuggestion(dayRecord.day)}
                  disabled={
                    submittingDay === dayRecord.day ||
                    !(suggestionDrafts[dayRecord.day] || "").trim()
                  }
                  className="min-h-[40px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E1E1E] hover:bg-[#0038C8] disabled:opacity-40 text-white text-xs font-bold transition shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submittingDay === dayRecord.day ? "Sending..." : "Send"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#1E1E1E]">
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#001B66] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <GrowvellPortalHeader
        activeTab="content"
        title="8-Week Daily Content Hub"
        subtitle={`Curated for Dhanesh Murali · 2 LinkedIn + 2 X Posts Every Day · ${approvedCount} Approved Hooks`}
        syncState={syncState}
        lastSyncedAt={lastSyncedAt}
        onRefresh={loadAll}
        whatsAppUrl={whatsAppUrl}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-gray-500">
            Loading 8-week schedule...
          </div>
        ) : (
          <>
            {/* Week 1 (Days 1 to 7) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base sm:text-lg font-black text-[#001B66]">Week 1</h2>
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-500">
                    Days 1 to 7
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0038C8]/10 text-[#0038C8]">
                  Active
                </span>
              </div>
              <div className="space-y-2.5">{week1Days.map(renderDayAccordion)}</div>
            </section>

            {/* Week 2 (Days 8 to 14) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base sm:text-lg font-black text-[#001B66]">Week 2</h2>
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-500">
                    Days 8 to 14
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0038C8]/10 text-[#0038C8]">
                  Active
                </span>
              </div>
              <div className="space-y-2.5">{week2Days.map(renderDayAccordion)}</div>
            </section>

            {/* Weeks 3 to 8 (Locked - No Info) */}
            <section className="space-y-2.5 pt-2">
              {[3, 4, 5, 6, 7, 8].map((weekNum) => (
                <div
                  key={weekNum}
                  className="bg-white/75 border border-gray-200 rounded-xl px-4 py-3.5 flex items-center justify-between opacity-75 select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm sm:text-base font-extrabold text-gray-500">
                      Week {weekNum}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-500 border border-gray-200">
                    Locked
                  </span>
                </div>
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
