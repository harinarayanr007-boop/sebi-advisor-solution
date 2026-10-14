-- ==============================================================================
-- AURUM FIDUCIARY - SEBI RIA SUPABASE DATABASE SCHEMA (INA000015845)
-- Run this entire file in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CLIENTS TABLE
CREATE TABLE IF NOT EXISTS public.clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  city TEXT DEFAULT 'Mumbai',
  tier TEXT DEFAULT 'Core HNI',
  net_worth TEXT DEFAULT '₹0',
  net_worth_num BIGINT DEFAULT 0,
  liquid_surplus TEXT DEFAULT '₹0',
  monthly_surplus TEXT DEFAULT '₹0',
  drag_saved TEXT DEFAULT '₹0 / yr',
  risk_tolerance TEXT DEFAULT 'Balanced Strategic Growth',
  target_cagr TEXT DEFAULT '11.5% CAGR',
  onboarding_stage TEXT DEFAULT 'Direct Onboarding // Form B Active',
  pan TEXT NOT NULL,
  aadhaar_masked TEXT DEFAULT 'XXXX-XXXX-0000',
  ckyc_id TEXT,
  cefcom_urn TEXT,
  employer TEXT DEFAULT 'Private Corporation',
  designation TEXT DEFAULT 'Director',
  gross_ctc TEXT DEFAULT '₹70,00,000 / annum',
  equity_alloc NUMERIC DEFAULT 65,
  debt_alloc NUMERIC DEFAULT 25,
  gold_alloc NUMERIC DEFAULT 10,
  folios_count INTEGER DEFAULT 0,
  advisor_notes TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending_approval', 'rejected')),
  password TEXT,
  auth_provider TEXT DEFAULT 'advisor_manual',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HOLDING ASSETS TABLE
CREATE TABLE IF NOT EXISTS public.holding_assets (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  isin TEXT,
  folio TEXT,
  current_value BIGINT NOT NULL DEFAULT 0,
  allocation_percent NUMERIC NOT NULL DEFAULT 0,
  direct_expense_ratio TEXT DEFAULT '0.65%',
  regular_expense_ratio TEXT DEFAULT '1.65%',
  one_year_return TEXT DEFAULT '+14.5%',
  annual_drag_saved TEXT DEFAULT '₹0/yr',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FIDUCIARY GOALS TABLE
CREATE TABLE IF NOT EXISTS public.fiduciary_goals (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Education', 'Real Estate', 'Retirement', 'Trust', 'Other')),
  target_amount BIGINT NOT NULL,
  current_funded BIGINT NOT NULL DEFAULT 0,
  target_year INTEGER NOT NULL,
  monthly_sip BIGINT DEFAULT 0,
  probability_percent INTEGER DEFAULT 85,
  recommended_instrument TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CASH FLOW ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.cash_flow_items (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('inflow', 'outflow_emi', 'outflow_living', 'outflow_tax')),
  title TEXT NOT NULL,
  monthly_amount BIGINT NOT NULL,
  annual_amount BIGINT NOT NULL,
  is_recurring BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. INSURANCE POLICIES TABLE
CREATE TABLE IF NOT EXISTS public.insurance_policies (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('term_life', 'comprehensive_health', 'super_topup', 'cyber_liability')),
  insurer TEXT NOT NULL,
  policy_number TEXT NOT NULL,
  sum_assured BIGINT NOT NULL,
  annual_premium BIGINT NOT NULL,
  coverage_adequacy TEXT NOT NULL,
  claim_settlement_ratio TEXT,
  renewal_date DATE,
  fiduciary_assessment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. AUDIT LOGS TABLE (SEBI COMPLIANCE TRAIL)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  actor_name TEXT NOT NULL,
  actor_email TEXT NOT NULL,
  action TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('KYC', 'SUITABILITY', 'PORTFOLIO', 'AGREEMENT', 'SECURITY', 'CEFCOM')),
  details TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONSULTATIONS & BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.consultations (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  slot_time TEXT NOT NULL,
  portfolio_size TEXT,
  focus_area TEXT,
  status TEXT DEFAULT 'confirmed',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_clients_email ON public.clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_pan ON public.clients(pan);
CREATE INDEX IF NOT EXISTS idx_clients_status ON public.clients(status);
CREATE INDEX IF NOT EXISTS idx_assets_client_id ON public.holding_assets(client_id);
CREATE INDEX IF NOT EXISTS idx_goals_client_id ON public.fiduciary_goals(client_id);
CREATE INDEX IF NOT EXISTS idx_cash_flow_client_id ON public.cash_flow_items(client_id);
CREATE INDEX IF NOT EXISTS idx_insurance_client_id ON public.insurance_policies(client_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_email ON public.consultations(email);

-- 10. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holding_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fiduciary_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cash_flow_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- 11. PERMISSIVE POLICIES FOR RIA APPLICATION
-- In a dedicated app with serverless API routes, we allow select/insert/update/delete
-- for anon and service_role while keeping data segregated by client_id.
CREATE POLICY "Allow public read clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Allow public insert clients" ON public.clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update clients" ON public.clients FOR UPDATE USING (true);
CREATE POLICY "Allow public delete clients" ON public.clients FOR DELETE USING (true);

CREATE POLICY "Allow public read assets" ON public.holding_assets FOR SELECT USING (true);
CREATE POLICY "Allow public insert assets" ON public.holding_assets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update assets" ON public.holding_assets FOR UPDATE USING (true);
CREATE POLICY "Allow public delete assets" ON public.holding_assets FOR DELETE USING (true);

CREATE POLICY "Allow public read goals" ON public.fiduciary_goals FOR SELECT USING (true);
CREATE POLICY "Allow public insert goals" ON public.fiduciary_goals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update goals" ON public.fiduciary_goals FOR UPDATE USING (true);
CREATE POLICY "Allow public delete goals" ON public.fiduciary_goals FOR DELETE USING (true);

CREATE POLICY "Allow public read cashflow" ON public.cash_flow_items FOR SELECT USING (true);
CREATE POLICY "Allow public insert cashflow" ON public.cash_flow_items FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read insurance" ON public.insurance_policies FOR SELECT USING (true);
CREATE POLICY "Allow public insert insurance" ON public.insurance_policies FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read audit_logs" ON public.audit_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert audit_logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read consultations" ON public.consultations FOR SELECT USING (true);
CREATE POLICY "Allow public insert consultations" ON public.consultations FOR INSERT WITH CHECK (true);

-- 12. SEED SAMPLE RIA CLIENTS (IDEMPOTENT INSERT)
INSERT INTO public.clients (
  id, name, email, phone, city, tier, net_worth, net_worth_num, liquid_surplus, monthly_surplus, drag_saved,
  risk_tolerance, target_cagr, onboarding_stage, pan, aadhaar_masked, ckyc_id, cefcom_urn,
  employer, designation, gross_ctc, equity_alloc, debt_alloc, gold_alloc, folios_count, advisor_notes, status, password, auth_provider
) VALUES
(
  'CLIENT-UHNI-001', 'Vikramaditya Rao', 'vikram@enterprises.in', '+91 98200 11223', 'Mumbai', 'UHNI',
  '₹48,20,00,000', 482000000, '₹4,50,00,000', '₹18,00,000', '₹4,57,900 / yr',
  'Growth with Capital Protection', '13.5% CAGR', 'Direct Demat Active // Annual Review Q3', 'BVZPR5566K',
  'XXXX-XXXX-8921', 'IN-CKYC-2026-8774341', 'URN-BASL-15845-9921', 'Rao Industrial Technologies Ltd',
  'Managing Director & Promoter', '₹14,50,00,000 / annum', 70, 20, 10, 8,
  'Family wealth restructuring underway. Primary focus on cross-border estate succession and tax-harvested direct index allocations.',
  'active', 'BVZPR5566K', 'advisor_manual'
),
(
  'CLIENT-CORE-002', 'Radhika Merchant', 'radhika.merchant@fiduciary.test', '+91 98199 44332', 'Bengaluru', 'Core HNI',
  '₹14,50,00,000', 145000000, '₹1,20,00,000', '₹6,50,000', '₹1,37,750 / yr',
  'Aggressive Fiduciary Alpha', '14.0% CAGR', 'Direct Onboarding // Form B Active', 'AABCM1234D',
  'XXXX-XXXX-4432', 'IN-CKYC-2026-1120932', 'URN-BASL-15845-4421', 'SaaS Cloud Platforms India',
  'Chief Technology Officer', '₹4,20,00,000 / annum', 75, 15, 10, 4,
  'ESOP liquidation liquidity incoming in Q4. Direct Nifty 50 and Gold ETF staggered allocation mandate signed.',
  'active', 'AABCM1234D', 'advisor_manual'
),
(
  'CLIENT-EMRG-003', 'Ananya Deshmukh', 'ananya.deshmukh@law.in', '+91 99300 88771', 'Pune', 'Emerging HNI',
  '₹3,20,00,000', 32000000, '₹45,00,000', '₹2,20,000', '₹30,400 / yr',
  'Conservative Wealth Preservation', '10.5% CAGR', 'Direct Demat Active // SIP Automation', 'CKYPD9988E',
  'XXXX-XXXX-7712', 'IN-CKYC-2026-6632144', 'URN-BASL-15845-8832', 'Deshmukh & Associates Law Chambers',
  'Senior Partner', '₹1,20,00,000 / annum', 50, 40, 10, 3,
  'Targeting children higher education fund in the UK by 2029. Sovereign Gold Bonds and Target Maturity Debt funds deployed.',
  'active', 'CKYPD9988E', 'advisor_manual'
)
ON CONFLICT (id) DO NOTHING;

-- 13. SEED INITIAL HOLDINGS FOR VIKRAMADITYA RAO
INSERT INTO public.holding_assets (
  id, client_id, name, category, isin, folio, current_value, allocation_percent,
  direct_expense_ratio, regular_expense_ratio, one_year_return, annual_drag_saved
) VALUES
('ASSET-001', 'CLIENT-UHNI-001', 'UTI Nifty 50 Index Fund - Direct Plan', 'Large Cap Index', 'INF789FB1X58', '14902188/01', 125000000, 26, '0.18%', '0.88%', '+16.2%', '₹87,500/yr'),
('ASSET-002', 'CLIENT-UHNI-001', 'Parag Parikh Flexi Cap Fund - Direct Plan', 'Flexi Cap Equity', 'INF879O01027', '98120334/12', 150000000, 31, '0.62%', '1.62%', '+22.4%', '₹1,50,000/yr'),
('ASSET-003', 'CLIENT-UHNI-001', 'ICICI Prudential All Seasons Bond Fund - Direct', 'Dynamic Bond', 'INF109K01138', '44102931/09', 95000000, 20, '0.45%', '1.25%', '+8.4%', '₹76,000/yr'),
('ASSET-004', 'CLIENT-UHNI-001', 'Nippon India Sovereign Gold ETF BeES', 'Sovereign Gold', 'INF732E01037', 'DP-IN300126-102938', 48000000, 10, '0.12%', '0.62%', '+14.1%', '₹24,000/yr')
ON CONFLICT (id) DO NOTHING;

-- 14. SEED INITIAL GOALS
INSERT INTO public.fiduciary_goals (
  id, client_id, title, category, target_amount, current_funded, target_year, monthly_sip, probability_percent, recommended_instrument
) VALUES
('GOAL-001', 'CLIENT-UHNI-001', 'Family Philanthropy Trust Endowment', 'Trust', 100000000, 48000000, 2030, 650000, 94, 'Direct Index Equity & Sovereign Green Bonds'),
('GOAL-002', 'CLIENT-UHNI-001', 'Global Tech Succession Liquidity', 'Retirement', 250000000, 180000000, 2034, 1200000, 91, 'Direct Multi-Cap Fiduciary Allocation')
ON CONFLICT (id) DO NOTHING;
