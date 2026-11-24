import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ApprovalPayload {
  statusMap: Record<number, "approved" | "revision" | "rejected">;
  notesMap: Record<number, string>;
  lastUpdated?: string;
  updatedBy?: string;
}

// In-memory fallback if blob network is unreachable
let memoryBackupState: ApprovalPayload = {
  statusMap: {},
  notesMap: {},
  lastUpdated: new Date().toISOString(),
  updatedBy: "System Initializer",
};

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "growvell/approval-state.json" });
    const targetBlob = blobs.find((b) => b.pathname === "growvell/approval-state.json");

    if (targetBlob) {
      // Add timestamp to bypass any CDN edge cache
      const fetchUrl = `${targetBlob.url}?t=${Date.now()}`;
      const res = await fetch(fetchUrl, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        // Update memory backup
        memoryBackupState = data;
        return NextResponse.json(
          { success: true, ...data },
          {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
      }
    }

    // Return in-memory fallback if file doesn't exist yet
    return NextResponse.json(
      { success: true, ...memoryBackupState },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error: any) {
    console.error("Growvell Approval GET Error:", error);
    return NextResponse.json(
      { success: true, ...memoryBackupState, warning: "Served from in-memory backup" },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ApprovalPayload;
    const { statusMap, notesMap, updatedBy } = body;

    const payload: ApprovalPayload = {
      statusMap: statusMap || {},
      notesMap: notesMap || {},
      lastUpdated: new Date().toISOString(),
      updatedBy: updatedBy || "Growvell Portal User",
    };

    // Update in-memory fallback immediately
    memoryBackupState = payload;

    // Persist permanently in Vercel Blob store
    const blob = await put("growvell/approval-state.json", JSON.stringify(payload), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    return NextResponse.json({
      success: true,
      lastUpdated: payload.lastUpdated,
      blobUrl: blob.url,
      message: "State successfully persisted to Vercel Cloud Storage",
    });
  } catch (error: any) {
    console.error("Growvell Approval POST Error:", error);
    // Even if Blob has a hiccup, memory fallback preserves the state
    return NextResponse.json({
      success: true,
      lastUpdated: new Date().toISOString(),
      warning: "Saved to memory backup, Blob persistence error logged",
    });
  }
}
