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
  Clock,
  Copy,
  Check,
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  MessageSquarePlus,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  ArrowLeft,
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

type ApprovalStatus = "approved" | "revision" | "rejected";

export default function GrowvellContentHubPage() {
  const [statusMap, setStatusMap] = useState<Record<number, ApprovalStatus>>({});
  const [notesMap, setNotesMap] = useState<Record<number, string>>({});
  const [contentState, setContentState] = useState<GrowvellContentState>(() => mergeWithDefaults(null));
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<"all" | "Domestic India" | "Global NRI">("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [suggestionDrafts, setSuggestionDrafts] = useState<Record<number, string>>({});
  const [suggestionPlatform, setSuggestionPlatform] = useState<Record<number, "linkedin" | "twitter" | "general">>({});
  const [submittingPostId, setSubmittingPostId] = useState<number | null>(null);
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
      if (cntData?.posts) setContentState(mergeWithDefaults(cntData));
    } catch (err) {
      console.error("Failed loading Growvell content hub:", err);
      showToast("Failed to refresh latest content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const approvedPosts = useMemo(() => {
    return GROWVELL_100_POSTS.filter((p) => {
      if (statusMap[p.id] !== "approved") return false;
      if (segmentFilter !== "all" && p.segment !== segmentFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const customTitle = contentState.posts[p.id]?.customTitle || "";
        return (
          p.hook.toLowerCase().includes(q) ||
          customTitle.toLowerCase().includes(q) ||
          p.pillar.toLowerCase().includes(q) ||
          String(p.id).includes(q)
        );
      }
      return true;
    });
  }, [statusMap, segmentFilter, searchQuery, contentState.posts]);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      showToast("Caption copied to clipboard");
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      showToast("Copy failed, please select text manually");
    }
  };

  const handleAddSuggestion = async (postId: number) => {
    const text = (suggestionDrafts[postId] || "").trim();
    if (!text) return;
    setSubmittingPostId(postId);
    try {
      const res = await fetch("/api/growvell/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_suggestion",
          postId,
          platform: suggestionPlatform[postId] || "general",
          text,
          author: "Dhanesh Murali",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContentState(mergeWithDefaults(data));
        setSuggestionDrafts((prev) => ({ ...prev, [postId]: "" }));
        showToast("Suggestion sent to Hari");
      } else {
        showToast("Could not save suggestion");
      }
    } catch {
      showToast("Network error saving suggestion");
    } finally {
      setSubmittingPostId(null);
    }
  };

  const renderPlatformCard = (
    post: GrowvellPost,
    platform: "linkedin" | "twitter",
    asset: PlatformAsset
  ) => {
    const isLinkedIn = platform === "linkedin";
    const label = isLinkedIn ? "LinkedIn" : "Twitter / X";
    const hasDelivery = asset.status === "ready" && (Boolean(asset.fileUrl) || Boolean(asset.caption));
    const copyKey = `${post.id}-${platform}`;
    const previewImg =
      asset.previewImageUrl ||
      (/\.(png|jpg|jpeg|webp)$/i.test(asset.fileUrl || "") ? asset.fileUrl : "");
    const isPdf = /\.pdf$/i.test(asset.fileName || asset.fileUrl || "");

    return (
      <div className="bg-[#F8FBFE] border border-[#1E1E1E]/15 rounded-xl p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${
                  isLinkedIn ? "bg-[#0038C8]" : "bg-[#1E1E1E]"
                }`}
              >
                {isLinkedIn ? <LinkedInIcon /> : <XIcon />}
              </div>
              <span className="font-bold text-sm text-[#1E1E1E]">{label}</span>
            </div>

            {hasDelivery ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                Ready to Post
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <Clock className="w-3 h-3" />
                Content in Progress
              </span>
            )}
          </div>

          {hasDelivery ? (
            <div className="space-y-3">
              {previewImg ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white">
                  <img
                    src={previewImg}
                    alt={`${label} preview for post #${post.id}`}
                    className="w-full max-h-72 object-contain bg-white"
                  />
                  {isPdf && (
                    <span className="absolute top-2 right-2 bg-[#001B66] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      PDF Carousel
                    </span>
                  )}
                </div>
              ) : asset.fileUrl ? (
                <div className="rounded-lg border border-dashed border-[#0038C8]/40 bg-white p-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#0038C8] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#1E1E1E] truncate">
                      {asset.fileName || "Attached File"}
                    </p>
                    <p className="text-[11px] text-gray-500">Ready for download</p>
                  </div>
                </div>
              ) : null}

              {asset.fileUrl && (
                <div className="flex flex-wrap gap-2">
                  <a
                    href={asset.fileUrl}
                    download={asset.fileName || true}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0038C8] hover:bg-[#001B66] text-white text-xs font-bold transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download {isPdf ? "Carousel PDF" : "Image"}</span>
                  </a>
                  <a
                    href={asset.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-[#1E1E1E] text-xs font-semibold transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open</span>
                  </a>
                </div>
              )}

              {asset.caption && (
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                      Post Caption (Copy & Paste)
                    </span>
                    <button
                      onClick={() => handleCopy(asset.caption, copyKey)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0038C8]/10 hover:bg-[#0038C8]/20 text-[#0038C8] text-[11px] font-bold transition"
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
                  <pre className="text-xs text-[#1E1E1E] whitespace-pre-wrap font-sans leading-relaxed max-h-48 overflow-y-auto">
                    {asset.caption}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-300 rounded-lg p-5 text-center my-1">
              <Clock className="w-7 h-7 text-amber-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-[#1E1E1E]">Content in Progress</p>
              <p className="text-[11px] text-gray-500 mt-1">
                Our team is designing the {label} asset and caption for this approved hook. Add any suggestion below if you want a specific angle.
              </p>
            </div>
          )}
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

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b-2 border-[#1E1E1E]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0038C8] text-white font-black flex items-center justify-center text-sm border border-[#1E1E1E]">
              G
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-[#1E1E1E]">
                Growvell Content Delivery Hub
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                Approved posts ready for LinkedIn & Twitter / X
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/growvell/approval"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-[#1E1E1E] transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Hook Approvals</span>
            </Link>
            <button
              onClick={loadAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0038C8] hover:bg-[#001B66] text-white text-xs font-bold transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Sync</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white border-2 border-[#1E1E1E] rounded-xl p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-[3px_3px_0px_#0038C8]">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search approved posts by #ID, topic, or pillar..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0038C8]"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg text-xs font-semibold">
            {(["all", "Domestic India", "Global NRI"] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => setSegmentFilter(seg)}
                className={`px-3 py-1.5 rounded-md transition ${
                  segmentFilter === seg
                    ? "bg-[#0038C8] text-white font-bold"
                    : "text-gray-600 hover:text-[#1E1E1E]"
                }`}
              >
                {seg === "all" ? "All Approved" : seg}
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-sm text-gray-500">
            Loading approved posts and creative assets...
          </div>
        ) : approvedPosts.length === 0 ? (
          <div className="bg-white border-2 border-[#1E1E1E] rounded-xl p-10 text-center">
            <Sparkles className="w-8 h-8 text-[#0038C8] mx-auto mb-2" />
            <h2 className="text-base font-bold text-[#1E1E1E]">No Approved Posts Found</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              Approve any hook in the Hook Approvals portal and it will appear here immediately with LinkedIn and Twitter deliverables.
            </p>
            <Link
              href="/growvell/approval"
              className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-lg bg-[#0038C8] text-white text-xs font-bold"
            >
              Go to Hook Approvals
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {approvedPosts.map((post) => {
              const delivery: PostDeliveryRecord = contentState.posts[post.id] || {
                postId: post.id,
                linkedin: createEmptyPlatformAsset(),
                twitter: createEmptyPlatformAsset(),
              };
              const postSuggestions = contentState.suggestions.filter((s) => s.postId === post.id);
              const approvalNote = notesMap[post.id];

              return (
                <section
                  key={post.id}
                  className="bg-white border-2 border-[#1E1E1E] rounded-2xl p-5 shadow-[4px_4px_0px_#0038C8]"
                >
                  {/* Post Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-gray-200 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#001B66] text-white text-[11px] font-extrabold">
                          #{post.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#0038C8]/10 text-[#0038C8] text-[11px] font-bold">
                          {post.pillar}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-semibold">
                          {post.segment}
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-extrabold text-[#1E1E1E]">
                        {delivery.customTitle || post.hook}
                      </h2>
                      {approvalNote && (
                        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-2.5 py-1 mt-2 inline-block">
                          Founder Approval Note: {approvalNote}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Two Platform Columns: LinkedIn & Twitter */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderPlatformCard(post, "linkedin", delivery.linkedin)}
                    {renderPlatformCard(post, "twitter", delivery.twitter)}
                  </div>

                  {/* Suggestions Box */}
                  <div className="mt-5 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-2.5">
                      <MessageSquarePlus className="w-4 h-4 text-[#0038C8]" />
                      <h3 className="text-xs font-extrabold uppercase tracking-wide text-[#1E1E1E]">
                        Add Suggestion or Edit Request
                      </h3>
                    </div>

                    {postSuggestions.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {postSuggestions.map((s) => (
                          <div
                            key={s.id}
                            className="bg-[#F4F7FC] border border-gray-200 rounded-lg px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2"
                          >
                            <div>
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
                        value={suggestionPlatform[post.id] || "general"}
                        onChange={(e) =>
                          setSuggestionPlatform((prev) => ({
                            ...prev,
                            [post.id]: e.target.value as "linkedin" | "twitter" | "general",
                          }))
                        }
                        className="text-xs font-semibold border border-gray-300 rounded-lg px-2.5 py-2 bg-white text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#0038C8]"
                      >
                        <option value="general">Both / General</option>
                        <option value="linkedin">LinkedIn Only</option>
                        <option value="twitter">Twitter / X Only</option>
                      </select>

                      <input
                        type="text"
                        value={suggestionDrafts[post.id] || ""}
                        onChange={(e) =>
                          setSuggestionDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        placeholder="Request a text tweak, new chart, or specific angle..."
                        className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0038C8]"
                      />

                      <button
                        onClick={() => handleAddSuggestion(post.id)}
                        disabled={submittingPostId === post.id || !(suggestionDrafts[post.id] || "").trim()}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E1E1E] hover:bg-[#0038C8] disabled:opacity-40 text-white text-xs font-bold transition"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{submittingPostId === post.id ? "Sending..." : "Send Suggestion"}</span>
                      </button>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
