import { NextResponse } from "next/server";
import { initialClients, ClientProfile, formatINR } from "@/lib/fiduciary-store";
import { getServerSupabase, isSupabaseConfigured, DatabaseClientRow } from "@/lib/supabase";
import { randomBytes } from "crypto";

// Runtime in-memory cache for fallback when Supabase is not connected
let serverClients: ClientProfile[] = [...initialClients];

function mapRowToClient(row: DatabaseClientRow): ClientProfile {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || "+91 98000 00000",
    city: row.city || "Mumbai",
    tier: (row.tier as any) || "Core HNI",
    netWorth: row.net_worth || "₹0",
    netWorthNum: Number(row.net_worth_num) || 0,
    liquidSurplus: row.liquid_surplus || "₹0",
    monthlySurplus: row.monthly_surplus || "₹0",
    dragSaved: row.drag_saved || "₹0 / yr",
    riskTolerance: row.risk_tolerance || "Balanced Strategic Growth",
    targetCAGR: row.target_cagr || "11.5% CAGR",
    onboardingStage: row.onboarding_stage || "Direct Onboarding // Form B Active",
    statusBadge: {
      label: row.status === "active" ? "Active Mandate" : row.status === "pending_approval" ? "Pending Approval" : "Rejected",
      bg: row.status === "active" ? "bg-emerald-100" : row.status === "pending_approval" ? "bg-amber-100" : "bg-rose-100",
      text: row.status === "active" ? "text-emerald-700" : row.status === "pending_approval" ? "text-amber-800" : "text-rose-700",
    },
    pan: row.pan,
    aadhaarMasked: row.aadhaar_masked || "XXXX-XXXX-0000",
    ckycId: row.ckyc_id || "",
    cefcomUrn: row.cefcom_urn || "",
    employer: row.employer || "Private Corporation",
    designation: row.designation || "Director",
    grossCtc: row.gross_ctc || "₹70,00,000 / annum",
    equityAlloc: Number(row.equity_alloc) || 65,
    debtAlloc: Number(row.debt_alloc) || 25,
    goldAlloc: Number(row.gold_alloc) || 10,
    foliosCount: Number(row.folios_count) || 0,
    advisorNotes: row.advisor_notes || "",
    createdAt: row.created_at ? new Date(row.created_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    status: row.status || "active",
    password: row.password || row.pan,
    authProvider: (row.auth_provider as any) || "advisor_manual",
  };
}

export async function GET() {
  const supabase = getServerSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error fetching clients:", error);
      } else if (data && data.length > 0) {
        return NextResponse.json({
          success: true,
          source: "supabase",
          count: data.length,
          clients: data.map(mapRowToClient),
        });
      }
    } catch (err) {
      console.warn("Supabase query failed, falling back to local memory store:", err);
    }
  }

  return NextResponse.json({
    success: true,
    source: "memory_fallback",
    count: serverClients.length,
    clients: serverClients,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
    const tier = body.tier === "Emerging HNI" || body.tier === "UHNI" ? body.tier : "Core HNI";

    const clientId = body.id || `CLIENT-${tier.substring(0, 4).toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}`;
    const status = body.status || "active";
    const password = body.password || pan;
    const authProvider = body.authProvider || "advisor_manual";

    const newClient: ClientProfile = {
      id: clientId,
      name,
      email,
      phone: typeof body.phone === "string" && body.phone.trim() ? body.phone.trim() : "+91 98000 00000",
      city: typeof body.city === "string" && body.city.trim() ? body.city.trim() : "Mumbai",
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
        label: status === "active" ? "Active Mandate" : "Pending Approval",
        bg: status === "active" ? "bg-emerald-100" : "bg-amber-100",
        text: status === "active" ? "text-emerald-700" : "text-amber-800",
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
      foliosCount: Number(body.foliosCount) || 0,
      advisorNotes: body.advisorNotes || "Client onboarded via Aurum Fiduciary API.",
      createdAt: new Date().toISOString().split("T")[0],
      status,
      password,
      authProvider,
    };

    const supabase = getServerSupabase();
    if (supabase) {
      try {
        const { error } = await supabase.from("clients").upsert({
          id: newClient.id,
          name: newClient.name,
          email: newClient.email,
          phone: newClient.phone,
          city: newClient.city,
          tier: newClient.tier,
          net_worth: newClient.netWorth,
          net_worth_num: newClient.netWorthNum,
          liquid_surplus: newClient.liquidSurplus,
          monthly_surplus: newClient.monthlySurplus,
          drag_saved: newClient.dragSaved,
          risk_tolerance: newClient.riskTolerance,
          target_cagr: newClient.targetCAGR,
          onboarding_stage: newClient.onboardingStage,
          pan: newClient.pan,
          aadhaar_masked: newClient.aadhaarMasked,
          ckyc_id: newClient.ckycId,
          cefcom_urn: newClient.cefcomUrn,
          employer: newClient.employer,
          designation: newClient.designation,
          gross_ctc: newClient.grossCtc,
          equity_alloc: newClient.equityAlloc,
          debt_alloc: newClient.debtAlloc,
          gold_alloc: newClient.goldAlloc,
          folios_count: newClient.foliosCount,
          advisor_notes: newClient.advisorNotes,
          status: newClient.status,
          password: newClient.password,
          auth_provider: newClient.authProvider,
        });

        if (error) {
          console.error("Supabase upsert error:", error);
        }
      } catch (err) {
        console.warn("Failed to write to Supabase, continuing with in-memory fallback:", err);
      }
    }

    serverClients.unshift(newClient);
    return NextResponse.json({ success: true, client: newClient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid client payload" }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json({ success: false, error: "Client id is required" }, { status: 400 });
    }

    const supabase = getServerSupabase();
    if (supabase) {
      const updates: any = {};
      if (body.status) updates.status = body.status;
      if (body.advisorNotes) updates.advisor_notes = body.advisorNotes;
      if (body.tier) updates.tier = body.tier;
      if (body.targetCAGR) updates.target_cagr = body.targetCAGR;

      await supabase.from("clients").update(updates).eq("id", id);
    }

    const clientIdx = serverClients.findIndex((c) => c.id === id);
    if (clientIdx !== -1) {
      serverClients[clientIdx] = {
        ...serverClients[clientIdx],
        ...body,
      };
    }

    return NextResponse.json({ success: true, message: "Client updated successfully" });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to update client" }, { status: 500 });
  }
}
