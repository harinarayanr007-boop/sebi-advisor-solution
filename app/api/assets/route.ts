import { NextResponse } from "next/server";
import { initialAssets, HoldingAsset } from "@/lib/fiduciary-store";
import { randomBytes } from "crypto";

let serverAssets: HoldingAsset[] = [...initialAssets];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");
  const filtered = clientId
    ? serverAssets.filter((a) => a.clientId === clientId)
    : serverAssets;

  return NextResponse.json({
    success: true,
    count: filtered.length,
    assets: filtered,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const clientId = typeof body.clientId === "string" ? body.clientId.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const currentValue = Number(body.currentValue);

    if (!clientId) {
      return NextResponse.json(
        { success: false, error: "Validation error: clientId is required." },
        { status: 400 }
      );
    }

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Validation error: asset name is required (min 2 chars)." },
        { status: 400 }
      );
    }

    if (isNaN(currentValue) || currentValue <= 0) {
      return NextResponse.json(
        { success: false, error: "Validation error: currentValue must be a positive number." },
        { status: 400 }
      );
    }

    const allocationPercent = Number(body.allocationPercent) || 10;

    const newAsset: HoldingAsset = {
      id: `ASSET-${Date.now()}-${randomBytes(2).toString("hex").toUpperCase()}`,
      clientId,
      name,
      category: body.category || "Flexi Cap Equity",
      isin: (typeof body.isin === "string" && body.isin.trim()) ? body.isin.trim().toUpperCase() : "INF879O00000",
      folio: (typeof body.folio === "string" && body.folio.trim()) ? body.folio.trim() : "10000000/00",
      currentValue,
      allocationPercent,
      directExpenseRatio: body.directExpenseRatio || "0.45%",
      regularExpenseRatio: body.regularExpenseRatio || "1.45%",
      oneYearReturn: body.oneYearReturn || "+15.0%",
      annualDragSaved: body.annualDragSaved || `₹${Math.round(currentValue * 0.01).toLocaleString("en-IN")}/yr`,
    };

    serverAssets.unshift(newAsset);
    return NextResponse.json({ success: true, asset: newAsset }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid asset payload" }, { status: 400 });
  }
}
