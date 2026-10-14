import { NextResponse } from "next/server";
import { initialAssets, HoldingAsset } from "@/lib/fiduciary-store";
import { getServerSupabase, DatabaseAssetRow } from "@/lib/supabase";
import { randomBytes } from "crypto";

let serverAssets: HoldingAsset[] = [...initialAssets];

function mapRowToAsset(row: DatabaseAssetRow): HoldingAsset {
  return {
    id: row.id,
    clientId: row.client_id,
    name: row.name,
    category: row.category,
    isin: row.isin || "INF879O00000",
    folio: row.folio || "10000000/00",
    currentValue: Number(row.current_value) || 0,
    allocationPercent: Number(row.allocation_percent) || 0,
    directExpenseRatio: row.direct_expense_ratio || "0.45%",
    regularExpenseRatio: row.regular_expense_ratio || "1.45%",
    oneYearReturn: row.one_year_return || "+15.0%",
    annualDragSaved: row.annual_drag_saved || "₹0/yr",
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");

  const supabase = getServerSupabase();
  if (supabase) {
    try {
      let query = supabase.from("holding_assets").select("*").order("created_at", { ascending: false });
      if (clientId) {
        query = query.eq("client_id", clientId);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return NextResponse.json({
          success: true,
          source: "supabase",
          count: data.length,
          assets: data.map(mapRowToAsset),
        });
      }
    } catch (err) {
      console.warn("Supabase assets query failed, falling back to memory:", err);
    }
  }

  const filtered = clientId
    ? serverAssets.filter((a) => a.clientId === clientId)
    : serverAssets;

  return NextResponse.json({
    success: true,
    source: "memory_fallback",
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
    const assetId = body.id || `ASSET-${Date.now()}-${randomBytes(2).toString("hex").toUpperCase()}`;

    const newAsset: HoldingAsset = {
      id: assetId,
      clientId,
      name,
      category: body.category || "Flexi Cap Equity",
      isin: typeof body.isin === "string" && body.isin.trim() ? body.isin.trim().toUpperCase() : "INF879O00000",
      folio: typeof body.folio === "string" && body.folio.trim() ? body.folio.trim() : "10000000/00",
      currentValue,
      allocationPercent,
      directExpenseRatio: body.directExpenseRatio || "0.45%",
      regularExpenseRatio: body.regularExpenseRatio || "1.45%",
      oneYearReturn: body.oneYearReturn || "+15.0%",
      annualDragSaved: body.annualDragSaved || `₹${Math.round(currentValue * 0.01).toLocaleString("en-IN")}/yr`,
    };

    const supabase = getServerSupabase();
    if (supabase) {
      try {
        await supabase.from("holding_assets").insert({
          id: newAsset.id,
          client_id: newAsset.clientId,
          name: newAsset.name,
          category: newAsset.category,
          isin: newAsset.isin,
          folio: newAsset.folio,
          current_value: newAsset.currentValue,
          allocation_percent: newAsset.allocationPercent,
          direct_expense_ratio: newAsset.directExpenseRatio,
          regular_expense_ratio: newAsset.regularExpenseRatio,
          one_year_return: newAsset.oneYearReturn,
          annual_drag_saved: newAsset.annualDragSaved,
        });
      } catch (err) {
        console.warn("Failed to insert asset to Supabase:", err);
      }
    }

    serverAssets.unshift(newAsset);
    return NextResponse.json({ success: true, asset: newAsset }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid asset payload" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Asset id is required" }, { status: 400 });
    }

    const supabase = getServerSupabase();
    if (supabase) {
      await supabase.from("holding_assets").delete().eq("id", id);
    }

    serverAssets = serverAssets.filter((a) => a.id !== id);
    return NextResponse.json({ success: true, message: "Asset deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to delete asset" }, { status: 500 });
  }
}
