import { NextResponse } from "next/server";
import { initialClients, ClientProfile, formatINR } from "@/lib/fiduciary-store";
import { randomBytes } from "crypto";

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

    // Strict input validation (reject insecure defaults)
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const pan = typeof body.pan === "string" ? body.pan.trim().toUpperCase() : "";

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Validation error: Client legal name is required (min 2 chars)." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Validation error: A valid email address is required." },
        { status: 400 }
      );
    }

    if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      return NextResponse.json(
        { success: false, error: "Validation error: A valid 10-digit PAN (e.g. ABCDE1234F) is required." },
        { status: 400 }
      );
    }

    const netWorthInput = typeof body.netWorth === "string" ? body.netWorth : String(body.netWorth || "0");
    const rawNum = parseInt(netWorthInput.replace(/[^0-9]/g, ""), 10) || 0;
    const tier = (body.tier === "Emerging HNI" || body.tier === "UHNI") ? body.tier : "Core HNI";

    const newClient: ClientProfile = {
      id: `CLIENT-${tier.substring(0, 4).toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}`,
      name,
      email,
      phone: (typeof body.phone === "string" && body.phone.trim()) ? body.phone.trim() : "+91 98000 00000",
      city: (typeof body.city === "string" && body.city.trim()) ? body.city.trim() : "Mumbai",
      tier,
      netWorth: formatINR(rawNum),
      netWorthNum: rawNum,
      liquidSurplus: body.liquidSurplus || "₹0",
      monthlySurplus: body.monthlySurplus || "₹0",
      dragSaved: body.dragSaved || `₹${Math.round(rawNum * 0.0095).toLocaleString("en-IN")} / yr`,
      riskTolerance: body.riskTolerance || "Balanced Strategic Growth",
      targetCAGR: body.targetCAGR || "11.5% CAGR",
      onboardingStage: "Direct Onboarding // Form B Active",
      statusBadge: {
        label: "Active Mandate",
        bg: "bg-emerald-100",
        text: "text-emerald-700",
      },
      pan,
      aadhaarMasked: body.aadhaarMasked || "XXXX-XXXX-0000",
      ckycId: body.ckycId || `IN-CKYC-2026-${Math.floor(1000000 + Math.random() * 9000000)}`,
      cefcomUrn: `URN-BASL-15845-${Math.floor(1000 + Math.random() * 9000)}`,
      employer: body.employer || "Private Corporation",
      designation: body.designation || "Director",
      grossCtc: body.grossCtc || "₹70,00,000 / annum",
      equityAlloc: Number(body.equityAlloc) || 65,
      debtAlloc: Number(body.debtAlloc) || 25,
      goldAlloc: Number(body.goldAlloc) || 10,
      foliosCount: 0,
      advisorNotes: body.advisorNotes || "Client onboarded via Aurum Fiduciary API.",
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
      password: pan,
      authProvider: "advisor_manual",
    };

    serverClients.unshift(newClient);
    return NextResponse.json({ success: true, client: newClient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid client payload" }, { status: 400 });
  }
}
