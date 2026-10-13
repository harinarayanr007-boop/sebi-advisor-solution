import { NextResponse } from "next/server";
import { initialAssets, HoldingAsset } from "@/lib/fiduciary-store";

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
    const newAsset: HoldingAsset = {
      id: `ASSET-${Date.now()}`,
      clientId: body.clientId || "AURUM-HNI-340777",
      name: body.name || "Direct Mutual Fund",
      category: body.category || "Flexi Cap Equity",
      isin: body.isin || "INF879O00000",
      folio: body.folio || "10000000/00",
      currentValue: Number(body.currentValue) || 1000000,
      allocationPercent: Number(body.allocationPercent) || 10,
      directExpenseRatio: body.directExpenseRatio || "0.45%",
      regularExpenseRatio: body.regularExpenseRatio || "1.45%",
      oneYearReturn: body.oneYearReturn || "+15.0%",
      annualDragSaved: body.annualDragSaved || "₹10,000/yr",
    };

    serverAssets.unshift(newAsset);
    return NextResponse.json({ success: true, asset: newAsset }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid asset payload" }, { status: 400 });
  }
}
