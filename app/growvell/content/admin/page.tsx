"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { GROWVELL_100_POSTS } from "@/lib/growvell-posts";
import {
  GrowvellDayContentState,
  DayDeliveryRecord,
  ContentSlot,
  createEmptyDay,
  mergeDayState,
} from "@/lib/growvell-content-store";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  AlertCircle,
} from "lucide-react";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#0038C8]" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#1E1E1E]" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function GrowvellContentAdminPage() {
  const [contentState, setContentState] = useState<GrowvellDayContentState>(() => mergeDayState(null));
  const [draftDays, setDraftDays] = useState<Record<number, DayDeliveryRecord>>({});
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));
  const [loading, setLoading] = useState(true);
  const [savingDay, setSavingDay] = useState<number | null>(null);
  const [addingDay, setAddingDay] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/growvell/content?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      const merged = mergeDayState(data);
      setContentState(merged);
      setDraftDays(merged.days);
    } catch (err) {
      console.error("Admin load error:", err);
      showToast("Failed to load content state");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const sortedDays = useMemo(() => {
    return Object.values(draftDays).sort((a, b) => a.day - b.day);
  }, [draftDays]);

  const toggleDay = (day: number) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const updateDayTitle = (day: number, title: string) => {
    setDraftDays((prev) => {
      const cur = prev[day] || createEmptyDay(day);
      return { ...prev, [day]: { ...cur, title } };
    });
  };

  const updateSlotField = (
    day: number,
    platform: "linkedin" | "twitter",
    slotIdx: 0 | 1,
    field: keyof ContentSlot,
    value: string | number | undefined
  ) => {
    setDraftDays((prev) => {
      const cur = prev[day] || createEmptyDay(day);
      const list = [...cur[platform]] as [ContentSlot, ContentSlot];
      list[slotIdx] = { ...list[slotIdx], [field]: value };
      return {
        ...prev,
        [day]: { ...cur, [platform]: list },
      };
    });
  };

  const handleFileUpload = async (
    day: number,
    platform: "linkedin" | "twitter",
    slotIdx: 0 | 1,
    kind: "main" | "preview",
    file: File
  ) => {
    const key = `d${day}-${platform}-${slotIdx}-${kind}`;
    setUploadingKey(key);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("postId", `day${day}-${slotIdx + 1}`);
      fd.append("platform", `${platform}-${kind}`);

      const res = await fetch("/api/growvell/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) {
        showToast(data.error || "Upload failed");
        return;
      }

      setDraftDays((prev) => {
        const cur = prev[day] || createEmptyDay(day);
        const list = [...cur[platform]] as [ContentSlot, ContentSlot];
        const nextSlot = { ...list[slotIdx] };
        if (kind === "main") {
          nextSlot.fileUrl = data.url;
          nextSlot.fileName = data.fileName;
          nextSlot.status = "ready";
          if (/\.(png|jpg|jpeg|webp)$/i.test(data.fileName)) {
            nextSlot.previewImageUrl = data.url;
          }
        } else {
          nextSlot.previewImageUrl = data.url;
        }
        list[slotIdx] = nextSlot;
        return { ...prev, [day]: { ...cur, [platform]: list } };
      });
      showToast(`Uploaded ${file.name}. Click Save Day ${day} to publish.`);
    } catch {
      showToast("Upload failed");
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSaveDay = async (day: number) => {
    setSavingDay(day);
    try {
      const record = draftDays[day];
      const res = await fetch("/api/growvell/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_day",
          day,
          record,
          updatedBy: "Hari Narayan (Admin)",
        }),
      });
      const data = await res.json();
      if (data.success) {
        const merged = mergeDayState(data);
        setContentState(merged);
        setDraftDays(merged.days);
        showToast(`Saved Day ${day} live to /growvell/content`);
      } else {
        showToast(data.error || "Save failed");
      }
    } catch {
      showToast("Network error saving Day");
    } finally {
      setSavingDay(null);
    }
  };

  const handleAddDay = async () => {
    setAddingDay(true);
    try {
      const res = await fetch("/api/growvell/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_day" }),
      });
      const data = await res.json();
      if (data.success) {
        const merged = mergeDayState(data);
        setContentState(merged);
        setDraftDays(merged.days);
        const maxDay = Math.max(...Object.keys(merged.days).map(Number));
        setOpenDays((prev) => new Set(prev).add(maxDay));
        showToast(`Added Day ${maxDay}`);
      }
    } catch {
      showToast("Could not add new Day");
    } finally {
      setAddingDay(false);
    }
  };

  const handleResolveSuggestion = async (suggestionId: string) => {
    try {
      const res = await fetch("/api/growvell/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resolve_suggestion", suggestionId }),
      });
      const data = await res.json();
      if (data.success) {
        setContentState(mergeDayState(data));
        showToast("Suggestion marked resolved");
      }
    } catch {
      showToast("Could not resolve suggestion");
    }
  };

  const renderSlotEditor = (
    day: number,
    platform: "linkedin" | "twitter",
    slotIdx: 0 | 1,
    slot: ContentSlot
  ) => {
    const isLinkedIn = platform === "linkedin";
    return (
      <div className="bg-[#F8FBFE] border border-gray-300 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {isLinkedIn ? <LinkedInIcon /> : <XIcon />}
            <span className="text-xs sm:text-sm font-extrabold text-[#1E1E1E]">
              {isLinkedIn ? `LinkedIn Post ${slotIdx + 1}` : `X Post ${slotIdx + 1}`}
            </span>
          </div>

          <select
            value={slot.status}
            onChange={(e) =>
              updateSlotField(day, platform, slotIdx, "status", e.target.value as "in_progress" | "ready")
            }
            className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
              slot.status === "ready"
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-amber-50 text-amber-800 border-amber-300"
            }`}
          >
            <option value="ready">Ready to Post</option>
            <option value="in_progress">Content in Progress</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Slot Format / Label
            </label>
            <input
              type="text"
              value={slot.label}
              onChange={(e) => updateSlotField(day, platform, slotIdx, "label", e.target.value)}
              placeholder={isLinkedIn ? "Carousel PDF / Twitter-Style Card" : "X Post"}
              className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Linked Hook # (Optional)
            </label>
            <select
              value={slot.approvedPostId || ""}
              onChange={(e) =>
                updateSlotField(
                  day,
                  platform,
                  slotIdx,
                  "approvedPostId",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white"
            >
              <option value="">None</option>
              {GROWVELL_100_POSTS.map((p) => (
                <option key={p.id} value={p.id}>
                  #{p.id} - {p.hook.slice(0, 48)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-[#0038C8] bg-white hover:bg-[#0038C8]/5 text-[#0038C8] text-xs font-bold cursor-pointer transition">
            <Upload className="w-3.5 h-3.5" />
            <span>
              {uploadingKey === `d${day}-${platform}-${slotIdx}-main`
                ? "Uploading..."
                : "Upload PDF / PNG"}
            </span>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(day, platform, slotIdx, "main", f);
              }}
            />
          </label>

          <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-gray-400 bg-white hover:bg-gray-50 text-[#1E1E1E] text-xs font-semibold cursor-pointer transition">
            <Upload className="w-3.5 h-3.5" />
            <span>
              {uploadingKey === `d${day}-${platform}-${slotIdx}-preview`
                ? "Uploading..."
                : "Upload Cover Thumbnail"}
            </span>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(day, platform, slotIdx, "preview", f);
              }}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={slot.fileUrl}
            onChange={(e) => updateSlotField(day, platform, slotIdx, "fileUrl", e.target.value)}
            placeholder="Download URL (/growvell_content/...)"
            className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white"
          />
          <input
            type="text"
            value={slot.fileName}
            onChange={(e) => updateSlotField(day, platform, slotIdx, "fileName", e.target.value)}
            placeholder="Filename (e.g. carousel.pdf)"
            className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white"
          />
        </div>

        <input
          type="text"
          value={slot.previewImageUrl || ""}
          onChange={(e) => updateSlotField(day, platform, slotIdx, "previewImageUrl", e.target.value)}
          placeholder="Preview Thumbnail URL (optional for PDF)"
          className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white"
        />

        <textarea
          rows={4}
          value={slot.caption}
          onChange={(e) => updateSlotField(day, platform, slotIdx, "caption", e.target.value)}
          placeholder={`Write ready-to-copy ${isLinkedIn ? "LinkedIn" : "X / Twitter"} text...`}
          className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white leading-relaxed"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#1E1E1E]">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#001B66] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <header className="sticky top-0 z-30 bg-[#001B66] text-white border-b-2 border-[#1E1E1E]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-base sm:text-lg font-extrabold">
              Growvell Daily Content Admin Studio
            </h1>
            <p className="text-[11px] text-blue-200">
              Manage Day 1, Day 2, Day 3+ accordions · 2 LinkedIn + 2 X posts per day
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddDay}
              disabled={addingDay}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{addingDay ? "Adding..." : "Add New Day"}</span>
            </button>
            <Link
              href="/growvell/content"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#001B66] text-xs font-bold hover:bg-blue-50 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Client View</span>
            </Link>
            <button
              onClick={loadAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0038C8] text-white text-xs font-bold border border-white/20"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Reload</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-5">
        {/* Suggestions Inbox */}
        <section className="bg-white border-2 border-[#1E1E1E] rounded-2xl p-4 shadow-[3px_3px_0px_#0038C8]">
          <h2 className="text-sm font-extrabold flex items-center gap-2 mb-2.5">
            <AlertCircle className="w-4 h-4 text-[#0038C8]" />
            <span>Client Suggestions Inbox ({contentState.suggestions.length})</span>
          </h2>
          {contentState.suggestions.length === 0 ? (
            <p className="text-xs text-gray-500">No pending suggestions from Dhanesh.</p>
          ) : (
            <div className="space-y-2">
              {contentState.suggestions.map((s) => (
                <div
                  key={s.id}
                  className="bg-[#F8FBFE] border border-gray-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="text-xs">
                    <span className="font-extrabold text-[#001B66] mr-2">Day {s.day}</span>
                    <span className="uppercase text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0038C8] text-white mr-2">
                      {s.platform}
                    </span>
                    <span className="font-medium">{s.text}</span>
                    <span className="text-gray-400 ml-2">
                      ({s.author} · {new Date(s.createdAt).toLocaleString()})
                    </span>
                  </div>
                  <button
                    onClick={() => handleResolveSuggestion(s.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Resolve</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Day Accordions */}
        {sortedDays.map((dayRecord) => {
          const isOpen = openDays.has(dayRecord.day);
          return (
            <section
              key={dayRecord.day}
              className="bg-white border-2 border-[#1E1E1E] rounded-2xl overflow-hidden shadow-[3px_3px_0px_#1E1E1E]"
            >
              <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 bg-white">
                <button
                  type="button"
                  onClick={() => toggleDay(dayRecord.day)}
                  className="flex items-center gap-3 text-left flex-1 min-w-[200px]"
                >
                  <span className="px-3 py-1 rounded-lg bg-[#0038C8] text-white text-xs font-extrabold">
                    Day {dayRecord.day}
                  </span>
                  <span className="font-extrabold text-sm text-[#1E1E1E]">{dayRecord.title}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                <button
                  onClick={() => handleSaveDay(dayRecord.day)}
                  disabled={savingDay === dayRecord.day}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0038C8] hover:bg-[#001B66] text-white text-xs font-extrabold transition"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>
                    {savingDay === dayRecord.day ? "Saving..." : `Save Day ${dayRecord.day}`}
                  </span>
                </button>
              </div>

              {isOpen && (
                <div className="px-5 pb-5 pt-3 border-t border-gray-200 space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
                      Day Accordion Title
                    </label>
                    <input
                      type="text"
                      value={dayRecord.title}
                      onChange={(e) => updateDayTitle(dayRecord.day, e.target.value)}
                      className="w-full text-sm font-bold border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wide text-[#001B66] mb-2.5">
                      LinkedIn (2 Posts: Carousel + Twitter-Style Card)
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {renderSlotEditor(dayRecord.day, "linkedin", 0, dayRecord.linkedin[0])}
                      {renderSlotEditor(dayRecord.day, "linkedin", 1, dayRecord.linkedin[1])}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wide text-[#1E1E1E] mb-2.5">
                      X / Twitter (2 Posts)
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {renderSlotEditor(dayRecord.day, "twitter", 0, dayRecord.twitter[0])}
                      {renderSlotEditor(dayRecord.day, "twitter", 1, dayRecord.twitter[1])}
                    </div>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}
