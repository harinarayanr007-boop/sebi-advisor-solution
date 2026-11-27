"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { GROWVELL_100_POSTS, GrowvellPost } from "@/lib/growvell-posts";
import {
  GrowvellContentState,
  PostDeliveryRecord,
  PlatformAsset,
  createEmptyPlatformAsset,
  mergeWithDefaults,
} from "@/lib/growvell-content-store";
import {
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Save,
  Search,
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

type ApprovalStatus = "approved" | "revision" | "rejected";

export default function GrowvellContentAdminPage() {
  const [statusMap, setStatusMap] = useState<Record<number, ApprovalStatus>>({});
  const [notesMap, setNotesMap] = useState<Record<number, string>>({});
  const [contentState, setContentState] = useState<GrowvellContentState>(() => mergeWithDefaults(null));
  const [draftPosts, setDraftPosts] = useState<Record<number, PostDeliveryRecord>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [appRes, cntRes] = await Promise.all([
        fetch(`/api/growvell/approval?t=${Date.now()}`, { cache: "no-store" }),
        fetch(`/api/growvell/content?t=${Date.now()}`, { cache: "no-store" }),
      ]);
      const appData = await appRes.json();
      const cntData = await cntRes.json();

      if (appData?.statusMap) setStatusMap(appData.statusMap);
      if (appData?.notesMap) setNotesMap(appData.notesMap);
      const merged = mergeWithDefaults(cntData);
      setContentState(merged);
      setDraftPosts(merged.posts);
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

  const visiblePosts = useMemo(() => {
    return GROWVELL_100_POSTS.filter((p) => {
      if (!showAllPosts && statusMap[p.id] !== "approved") return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.hook.toLowerCase().includes(q) ||
          p.pillar.toLowerCase().includes(q) ||
          String(p.id).includes(q)
        );
      }
      return true;
    });
  }, [showAllPosts, statusMap, searchQuery]);

  const getDraft = (postId: number): PostDeliveryRecord => {
    return (
      draftPosts[postId] || {
        postId,
        linkedin: createEmptyPlatformAsset(),
        twitter: createEmptyPlatformAsset(),
      }
    );
  };

  const updateField = (
    postId: number,
    platform: "linkedin" | "twitter",
    field: keyof PlatformAsset,
    value: string
  ) => {
    setDraftPosts((prev) => {
      const current = prev[postId] || {
        postId,
        linkedin: createEmptyPlatformAsset(),
        twitter: createEmptyPlatformAsset(),
      };
      return {
        ...prev,
        [postId]: {
          ...current,
          [platform]: {
            ...current[platform],
            [field]: value,
          },
        },
      };
    });
  };

  const updateCustomTitle = (postId: number, customTitle: string) => {
    setDraftPosts((prev) => {
      const current = getDraft(postId);
      return {
        ...prev,
        [postId]: {
          ...current,
          customTitle,
        },
      };
    });
  };

  const handleFileUpload = async (
    postId: number,
    platform: "linkedin" | "twitter",
    kind: "main" | "preview",
    file: File
  ) => {
    const key = `${postId}-${platform}-${kind}`;
    setUploadingKey(key);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("postId", String(postId));
      fd.append("platform", `${platform}-${kind}`);

      const res = await fetch("/api/growvell/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) {
        showToast(data.error || "Upload failed");
        return;
      }

      setDraftPosts((prev) => {
        const current = prev[postId] || {
          postId,
          linkedin: createEmptyPlatformAsset(),
          twitter: createEmptyPlatformAsset(),
        };
        const platObj = { ...current[platform] };
        if (kind === "main") {
          platObj.fileUrl = data.url;
          platObj.fileName = data.fileName;
          platObj.status = "ready";
          if (/\.(png|jpg|jpeg|webp)$/i.test(data.fileName)) {
            platObj.previewImageUrl = data.url;
          }
        } else {
          platObj.previewImageUrl = data.url;
        }
        return {
          ...prev,
          [postId]: {
            ...current,
            [platform]: platObj,
          },
        };
      });
      showToast(`Uploaded ${file.name}. Click Save Post to publish.`);
    } catch {
      showToast("Upload failed");
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSavePost = async (postId: number) => {
    setSavingId(postId);
    try {
      const record = getDraft(postId);
      const res = await fetch("/api/growvell/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_post",
          postId,
          record,
          updatedBy: "Hari Narayan (Admin)",
        }),
      });
      const data = await res.json();
      if (data.success) {
        const merged = mergeWithDefaults(data);
        setContentState(merged);
        setDraftPosts(merged.posts);
        showToast(`Saved post #${postId} live to /growvell/content`);
      } else {
        showToast(data.error || "Save failed");
      }
    } catch {
      showToast("Network error while saving");
    } finally {
      setSavingId(null);
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
        setContentState(mergeWithDefaults(data));
        showToast("Suggestion marked resolved");
      }
    } catch {
      showToast("Could not resolve suggestion");
    }
  };

  const renderAdminPlatformEditor = (
    post: GrowvellPost,
    platform: "linkedin" | "twitter",
    asset: PlatformAsset
  ) => {
    const isLinkedIn = platform === "linkedin";
    return (
      <div className="bg-[#F8FBFE] border border-gray-300 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {isLinkedIn ? <LinkedInIcon /> : <XIcon />}
            <span className="text-sm font-extrabold text-[#1E1E1E]">
              {isLinkedIn ? "LinkedIn Deliverable" : "Twitter / X Deliverable"}
            </span>
          </div>

          <select
            value={asset.status}
            onChange={(e) =>
              updateField(post.id, platform, "status", e.target.value as "in_progress" | "ready")
            }
            className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
              asset.status === "ready"
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-amber-50 text-amber-800 border-amber-300"
            }`}
          >
            <option value="ready">Ready to Publish</option>
            <option value="in_progress">Content in Progress</option>
          </select>
        </div>

        {/* File upload & manual URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-[#0038C8] bg-white hover:bg-[#0038C8]/5 text-[#0038C8] text-xs font-bold cursor-pointer transition">
            <Upload className="w-3.5 h-3.5" />
            <span>
              {uploadingKey === `${post.id}-${platform}-main`
                ? "Uploading..."
                : "Upload Main PDF / PNG"}
            </span>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(post.id, platform, "main", f);
              }}
            />
          </label>

          <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-gray-400 bg-white hover:bg-gray-50 text-[#1E1E1E] text-xs font-semibold cursor-pointer transition">
            <Upload className="w-3.5 h-3.5" />
            <span>
              {uploadingKey === `${post.id}-${platform}-preview`
                ? "Uploading..."
                : "Upload Cover Thumbnail"}
            </span>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(post.id, platform, "preview", f);
              }}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Download File URL
            </label>
            <input
              type="text"
              value={asset.fileUrl}
              onChange={(e) => updateField(post.id, platform, "fileUrl", e.target.value)}
              placeholder="/growvell_content/... or https://..."
              className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
              Download Filename
            </label>
            <input
              type="text"
              value={asset.fileName}
              onChange={(e) => updateField(post.id, platform, "fileName", e.target.value)}
              placeholder="filename.pdf or .png"
              className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
            Preview Thumbnail URL (Optional for PDF)
          </label>
          <input
            type="text"
            value={asset.previewImageUrl || ""}
            onChange={(e) => updateField(post.id, platform, "previewImageUrl", e.target.value)}
            placeholder="/growvell_content/carousel_cover.png"
            className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
            Copy-Paste Post Caption
          </label>
          <textarea
            rows={5}
            value={asset.caption}
            onChange={(e) => updateField(post.id, platform, "caption", e.target.value)}
            placeholder={`Write the ready-to-paste ${isLinkedIn ? "LinkedIn" : "Twitter / X"} caption...`}
            className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white leading-relaxed"
          />
        </div>
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
              Growvell Content Admin Studio
            </h1>
            <p className="text-[11px] text-blue-200">
              Edit captions, upload PNGs/PDFs, toggle Ready status, and manage Dhanesh suggestions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/growvell/content"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#001B66] text-xs font-bold hover:bg-blue-50 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Client View</span>
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

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Client Suggestions Inbox */}
        <section className="bg-white border-2 border-[#1E1E1E] rounded-2xl p-4 shadow-[3px_3px_0px_#0038C8]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-extrabold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#0038C8]" />
              <span>Client Suggestions Inbox ({contentState.suggestions.length})</span>
            </h2>
          </div>

          {contentState.suggestions.length === 0 ? (
            <p className="text-xs text-gray-500">
              No pending suggestions from Dhanesh right now.
            </p>
          ) : (
            <div className="space-y-2">
              {contentState.suggestions.map((s) => (
                <div
                  key={s.id}
                  className="bg-[#F8FBFE] border border-gray-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="text-xs">
                    <span className="font-extrabold text-[#001B66] mr-2">Post #{s.postId}</span>
                    <span className="uppercase text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0038C8] text-white mr-2">
                      {s.platform}
                    </span>
                    <span className="text-[#1E1E1E] font-medium">{s.text}</span>
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

        {/* Controls */}
        <div className="bg-white border border-gray-300 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter posts by #ID, hook, or pillar..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg"
            />
          </div>

          <label className="inline-flex items-center gap-2 text-xs font-bold text-[#1E1E1E] cursor-pointer">
            <input
              type="checkbox"
              checked={showAllPosts}
              onChange={(e) => setShowAllPosts(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span>Show all 100 posts (not just Approved)</span>
          </label>
        </div>

        {/* Post Editors */}
        <div className="space-y-6">
          {visiblePosts.map((post) => {
            const draft = getDraft(post.id);
            const isApproved = statusMap[post.id] === "approved";
            const founderNote = notesMap[post.id];

            return (
              <div
                key={post.id}
                className="bg-white border-2 border-[#1E1E1E] rounded-2xl p-5 shadow-[3px_3px_0px_#1E1E1E]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-gray-200 mb-4">
                  <div className="flex-1 min-w-[240px]">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-[#001B66] text-white text-[11px] font-extrabold">
                        #{post.id}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px] font-semibold">
                        {post.pillar} · {post.segment}
                      </span>
                      {isApproved && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Client Approved
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={draft.customTitle ?? post.hook}
                      onChange={(e) => updateCustomTitle(post.id, e.target.value)}
                      className="w-full text-sm font-bold text-[#1E1E1E] border border-gray-300 rounded-lg px-3 py-1.5"
                    />
                    {founderNote && (
                      <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded px-2.5 py-1 mt-2 inline-block">
                        Approval Note: {founderNote}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleSavePost(post.id)}
                    disabled={savingId === post.id}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0038C8] hover:bg-[#001B66] text-white text-xs font-extrabold transition shrink-0"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingId === post.id ? "Saving..." : `Save Post #${post.id}`}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {renderAdminPlatformEditor(post, "linkedin", draft.linkedin)}
                  {renderAdminPlatformEditor(post, "twitter", draft.twitter)}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
