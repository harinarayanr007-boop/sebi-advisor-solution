import { NextResponse } from "next/server";
import { initialGoals, FiduciaryGoal } from "@/lib/fiduciary-store";
import { randomBytes } from "crypto";

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

    const newGoal: FiduciaryGoal = {
      id: `GOAL-${Date.now()}-${randomBytes(2).toString("hex").toUpperCase()}`,
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

    serverGoals.unshift(newGoal);
    return NextResponse.json({ success: true, goal: newGoal }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid goal payload" }, { status: 400 });
  }
}
