import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import {
  GrowvellDayContentState,
  DayDeliveryRecord,
  createEmptyDay,
  mergeDayState,
} from "@/lib/growvell-content-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BLOB_PATH = "growvell/content-v2-state.json";

let memoryBackup: GrowvellDayContentState = mergeDayState(null);

async function readState(): Promise<GrowvellDayContentState> {
  try {
    const { blobs } = await list({ prefix: BLOB_PATH });
    const target = blobs.find((b) => b.pathname === BLOB_PATH);
    if (target) {
      const res = await fetch(`${target.url}?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const parsed = await res.json();
        memoryBackup = mergeDayState(parsed);
        return memoryBackup;
      }
    }
  } catch (err) {
    console.error("Growvell Content GET Blob Error:", err);
  }
  return mergeDayState(memoryBackup);
}

async function writeState(state: GrowvellDayContentState): Promise<void> {
  memoryBackup = state;
  await put(BLOB_PATH, JSON.stringify(state), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function GET() {
  const state = await readState();
  return NextResponse.json(
    { success: true, ...state },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const current = await readState();

    if (body.action === "add_suggestion") {
      const text = String(body.text || "").trim();
      const day = Number(body.day);
      const platform = (body.platform || "general") as "linkedin" | "twitter" | "general";
      const author = String(body.author || "Dhanesh Murali").trim();
      if (!text || !day) {
        return NextResponse.json({ success: false, error: "Missing suggestion text or day" }, { status: 400 });
      }
      const nextState: GrowvellDayContentState = {
        ...current,
        suggestions: [
          {
            id: `sug_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            day,
            platform,
            text,
            author,
            createdAt: new Date().toISOString(),
          },
          ...current.suggestions,
        ],
        lastUpdated: new Date().toISOString(),
        updatedBy: author,
      };
      await writeState(nextState);
      return NextResponse.json({ success: true, ...nextState });
    }

    if (body.action === "resolve_suggestion") {
      const suggestionId = String(body.suggestionId || "");
      const nextState: GrowvellDayContentState = {
        ...current,
        suggestions: current.suggestions.filter((s) => s.id !== suggestionId),
        lastUpdated: new Date().toISOString(),
        updatedBy: "Hari Narayan (Admin)",
      };
      await writeState(nextState);
      return NextResponse.json({ success: true, ...nextState });
    }

    if (body.action === "add_day") {
      const existingNums = Object.keys(current.days).map(Number);
      const nextDay = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1;
      const nextState: GrowvellDayContentState = {
        ...current,
        days: {
          ...current.days,
          [nextDay]: createEmptyDay(nextDay, body.title || `Day ${nextDay} Content Drop`),
        },
        lastUpdated: new Date().toISOString(),
        updatedBy: "Hari Narayan (Admin)",
      };
      await writeState(nextState);
      return NextResponse.json({ success: true, ...nextState });
    }

    if (body.action === "save_day") {
      const day = Number(body.day);
      const record = body.record as DayDeliveryRecord;
      if (!day || !record) {
        return NextResponse.json({ success: false, error: "Missing day or record" }, { status: 400 });
      }
      const nextState: GrowvellDayContentState = {
        ...current,
        days: {
          ...current.days,
          [day]: {
            ...record,
            day,
          },
        },
        lastUpdated: new Date().toISOString(),
        updatedBy: body.updatedBy || "Hari Narayan (Admin)",
      };
      await writeState(nextState);
      return NextResponse.json({ success: true, ...nextState });
    }

    return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    console.error("Growvell Content POST Error:", err);
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
