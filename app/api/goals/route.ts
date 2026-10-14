import { NextResponse } from "next/server";
import { initialGoals, FiduciaryGoal } from "@/lib/fiduciary-store";
import { getServerSupabase, DatabaseGoalRow } from "@/lib/supabase";
import { randomBytes } from "crypto";

let serverGoals: FiduciaryGoal[] = [...initialGoals];

function mapRowToGoal(row: DatabaseGoalRow): FiduciaryGoal {
  return {
    id: row.id,
    clientId: row.client_id,
    title: row.title,
    category: (row.category as any) || "Education",
    targetAmount: Number(row.target_amount) || 0,
    currentFunded: Number(row.current_funded) || 0,
    targetYear: Number(row.target_year) || 2030,
    monthlySip: Number(row.monthly_sip) || 0,
    probabilityPercent: Number(row.probability_percent) || 85,
    recommendedInstrument: row.recommended_instrument || "Direct Flexi-Cap Indexing",
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");

  const supabase = getServerSupabase();
  if (supabase) {
    try {
      let query = supabase.from("fiduciary_goals").select("*").order("created_at", { ascending: false });
      if (clientId) {
        query = query.eq("client_id", clientId);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return NextResponse.json({
          success: true,
          source: "supabase",
          count: data.length,
          goals: data.map(mapRowToGoal),
        });
      }
    } catch (err) {
      console.warn("Supabase goals query failed, falling back to memory:", err);
    }
  }

  const filtered = clientId
    ? serverGoals.filter((g) => g.clientId === clientId)
    : serverGoals;

  return NextResponse.json({
    success: true,
    source: "memory_fallback",
    count: filtered.length,
    goals: filtered,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const clientId = typeof body.clientId === "string" ? body.clientId.trim() : "";
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const targetAmount = Number(body.targetAmount);

    if (!clientId) {
      return NextResponse.json(
        { success: false, error: "Validation error: clientId is required." },
        { status: 400 }
      );
    }

    if (!title || title.length < 2) {
      return NextResponse.json(
        { success: false, error: "Validation error: goal title is required (min 2 chars)." },
        { status: 400 }
      );
    }

    if (isNaN(targetAmount) || targetAmount <= 0) {
      return NextResponse.json(
        { success: false, error: "Validation error: targetAmount must be a positive number." },
        { status: 400 }
      );
    }

    const currentFunded = Number(body.currentFunded) || 0;
    const targetYear = Number(body.targetYear) || (new Date().getFullYear() + 10);
    const monthlySip = Number(body.monthlySip) || 50000;
    const probabilityPercent = Number(body.probabilityPercent) || 85;
    const goalId = body.id || `GOAL-${Date.now()}-${randomBytes(2).toString("hex").toUpperCase()}`;

    const newGoal: FiduciaryGoal = {
      id: goalId,
      clientId,
      title,
      category: body.category || "Education",
      targetAmount,
      currentFunded,
      targetYear,
      monthlySip,
      probabilityPercent,
      recommendedInstrument: body.recommendedInstrument || "Direct Flexi-Cap Indexing",
    };

    const supabase = getServerSupabase();
    if (supabase) {
      try {
        await supabase.from("fiduciary_goals").insert({
          id: newGoal.id,
          client_id: newGoal.clientId,
          title: newGoal.title,
          category: newGoal.category,
          target_amount: newGoal.targetAmount,
          current_funded: newGoal.currentFunded,
          target_year: newGoal.targetYear,
          monthly_sip: newGoal.monthlySip,
          probability_percent: newGoal.probabilityPercent,
          recommended_instrument: newGoal.recommendedInstrument,
        });
      } catch (err) {
        console.warn("Failed to insert goal to Supabase:", err);
      }
    }

    serverGoals.unshift(newGoal);
    return NextResponse.json({ success: true, goal: newGoal }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid goal payload" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Goal id is required" }, { status: 400 });
    }

    const supabase = getServerSupabase();
    if (supabase) {
      await supabase.from("fiduciary_goals").delete().eq("id", id);
    }

    serverGoals = serverGoals.filter((g) => g.id !== id);
    return NextResponse.json({ success: true, message: "Goal deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to delete goal" }, { status: 500 });
  }
}
