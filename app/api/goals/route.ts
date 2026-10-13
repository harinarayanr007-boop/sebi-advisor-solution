import { NextResponse } from "next/server";
import { initialGoals, FiduciaryGoal } from "@/lib/fiduciary-store";

let serverGoals: FiduciaryGoal[] = [...initialGoals];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");
  const filtered = clientId
    ? serverGoals.filter((g) => g.clientId === clientId)
    : serverGoals;

  return NextResponse.json({
    success: true,
    count: filtered.length,
    goals: filtered,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newGoal: FiduciaryGoal = {
      id: `GOAL-${Date.now()}`,
      clientId: body.clientId || "AURUM-HNI-340777",
      title: body.title || "Long Term Wealth Goal",
      category: body.category || "Education",
      targetAmount: Number(body.targetAmount) || 10000000,
      currentFunded: Number(body.currentFunded) || 1000000,
      targetYear: Number(body.targetYear) || 2035,
      monthlySip: Number(body.monthlySip) || 50000,
      probabilityPercent: Number(body.probabilityPercent) || 90,
      recommendedInstrument: body.recommendedInstrument || "Direct Flexi-Cap Indexing",
    };

    serverGoals.unshift(newGoal);
    return NextResponse.json({ success: true, goal: newGoal }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid goal payload" }, { status: 400 });
  }
}
