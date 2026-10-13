import { NextResponse } from "next/server";
import { initialClients, ClientProfile, formatINR } from "@/lib/fiduciary-store";

// In-memory runtime cache for serverless environments
let serverClients: ClientProfile[] = [...initialClients];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: serverClients.length,
    clients: serverClients,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawNum = parseInt((body.netWorth || "50000000").replace(/[^0-9]/g, ""), 10) || 0;
    const newClient: ClientProfile = {
      id: `CLIENT-${(body.tier || "CORE").substring(0, 4).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      name: body.name || "Untitled Client",
      email: body.email || "client@domain.com",
      phone: body.phone || "+91 98000 00000",
      city: body.city || "Mumbai",
      tier: body.tier || "Core HNI",
      netWorth: formatINR(rawNum),
      netWorthNum: rawNum,
      liquidSurplus: body.liquidSurplus || "₹0",
      monthlySurplus: body.monthlySurplus || "₹0",
      dragSaved: body.dragSaved || `₹${Math.round(rawNum * 0.0095).toLocaleString("en-IN")} / yr`,
      riskTolerance: body.riskTolerance || "Balanced Strategic Growth",
      targetCAGR: body.targetCAGR || "11.5% CAGR",
      onboardingStage: body.onboardingStage || "Direct Onboarding // Form B Active",
      statusBadge: {
        label: "Active Mandate",
        bg: "bg-emerald-100",
        text: "text-emerald-700",
      },
      pan: (body.pan || "ABCDE1234F").toUpperCase(),
      aadhaarMasked: body.aadhaarMasked || "XXXX-XXXX-0000",
      ckycId: body.ckycId || `IN-CKYC-2026-${Math.floor(1000000 + Math.random() * 9000000)}`,
      cefcomUrn: `URN-BASL-15845-${Math.floor(1000 + Math.random() * 9000)}`,
      employer: body.employer || "Private Corporation",
      designation: body.designation || "Director",
      grossCtc: body.grossCtc || "₹70,00,000 / annum",
      equityAlloc: body.equityAlloc || 65,
      debtAlloc: body.debtAlloc || 25,
      goldAlloc: body.goldAlloc || 10,
      foliosCount: 0,
      advisorNotes: body.advisorNotes || "Client onboarded via Aurum Fiduciary API.",
      createdAt: new Date().toISOString().split("T")[0],
    };

    serverClients.unshift(newClient);
    return NextResponse.json({ success: true, client: newClient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid client payload" }, { status: 400 });
  }
}
