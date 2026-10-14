import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Client environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Checks whether Supabase environment variables are properly configured.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("https://") &&
    !supabaseUrl.includes("your-project")
  );
}

/**
 * Singleton client-side Supabase client.
 * Returns null if Supabase is not yet configured in environment variables.
 */
let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return clientInstance;
}

/**
 * Server-side Supabase client using Service Role Key (bypasses RLS) if present,
 * falling back to Anon Key.
 */
export function getServerSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  const key = supabaseServiceKey || supabaseAnonKey;
  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Database schema types for TypeScript safety
export interface DatabaseClientRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  tier: string;
  net_worth: string;
  net_worth_num: number;
  liquid_surplus: string;
  monthly_surplus: string;
  drag_saved: string;
  risk_tolerance: string;
  target_cagr: string;
  onboarding_stage: string;
  pan: string;
  aadhaar_masked: string;
  ckyc_id: string;
  cefcom_urn: string;
  employer: string;
  designation: string;
  gross_ctc: string;
  equity_alloc: number;
  debt_alloc: number;
  gold_alloc: number;
  folios_count: number;
  advisor_notes: string;
  status: "active" | "pending_approval" | "rejected";
  password?: string;
  auth_provider: string;
  created_at: string;
}

export interface DatabaseAssetRow {
  id: string;
  client_id: string;
  name: string;
  category: string;
  isin: string;
  folio: string;
  current_value: number;
  allocation_percent: number;
  direct_expense_ratio: string;
  regular_expense_ratio: string;
  one_year_return: string;
  annual_drag_saved: string;
  created_at?: string;
}

export interface DatabaseGoalRow {
  id: string;
  client_id: string;
  title: string;
  category: string;
  target_amount: number;
  current_funded: number;
  target_year: number;
  monthly_sip: number;
  probability_percent: number;
  recommended_instrument: string;
  created_at?: string;
}

export interface DatabaseAuditLogRow {
  id: string;
  timestamp: string;
  actor_role: string;
  actor_name: string;
  actor_email: string;
  action: string;
  category: string;
  details: string;
  ip_hash: string;
  verified: boolean;
  created_at?: string;
}

export interface DatabaseConsultationRow {
  id: string;
  client_name: string;
  email: string;
  phone: string;
  slot_time: string;
  portfolio_size: string;
  focus_area: string;
  status: string;
  notes?: string;
  created_at?: string;
}
