import { NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  const configured = isSupabaseConfigured();

  if (!configured) {
    return NextResponse.json({
      success: true,
      configured: false,
      status: "offline_fallback",
      message: "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set. The platform is running smoothly using high-speed in-memory & local client storage fallback.",
    });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({
      success: false,
      configured: false,
      error: "Could not initialize Supabase client.",
    }, { status: 500 });
  }

  try {
    // Check clients table
    const { data: clientsData, error: clientsError } = await supabase
      .from("clients")
      .select("count", { count: "exact", head: true });

    // Check assets table
    const { data: assetsData, error: assetsError } = await supabase
      .from("holding_assets")
      .select("count", { count: "exact", head: true });

    // Check goals table
    const { data: goalsData, error: goalsError } = await supabase
      .from("fiduciary_goals")
      .select("count", { count: "exact", head: true });

    return NextResponse.json({
      success: true,
      configured: true,
      status: "connected",
      message: "Supabase PostgreSQL database is online and connected.",
      tables: {
        clients: !clientsError,
        holding_assets: !assetsError,
        fiduciary_goals: !goalsError,
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      configured: true,
      status: "error",
      error: err.message || "Failed to query Supabase tables. Ensure supabase/schema.sql has been executed in the Supabase SQL editor.",
    }, { status: 500 });
  }
}
