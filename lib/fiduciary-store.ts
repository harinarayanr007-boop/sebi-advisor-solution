export type UserRole = "advisor" | "client";

export interface UserSession {
  role: UserRole;
  userId: string;
  name: string;
  email: string;
  clientId?: string;
  sebiReg?: string;
}

export interface AdvisorProfile {
  id: string;
  name: string;
  firmName: string;
  sebiRegNumber: string;
  baslMembership: string;
  email: string;
  phone: string;
  officeAddress: string;
  feeSchedule: string;
  totalAuaTracked: number;
  activeClientCount: number;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  tier: "Emerging HNI" | "Core HNI" | "UHNI";
  netWorth: string;
  netWorthNum: number;
  liquidSurplus: string;
  monthlySurplus: string;
  dragSaved: string;
  riskTolerance: string;
  targetCAGR: string;
  onboardingStage: string;
  statusBadge: {
    label: string;
    bg: string;
    text: string;
  };
  pan: string;
  aadhaarMasked: string;
  ckycId: string;
  cefcomUrn: string;
  employer: string;
  designation: string;
  grossCtc: string;
  equityAlloc: number;
  debtAlloc: number;
  goldAlloc: number;
  foliosCount: number;
  advisorNotes: string;
  createdAt: string;
}

export interface HoldingAsset {
  id: string;
  clientId: string;
  name: string;
  category: string;
  isin: string;
  folio: string;
  currentValue: number;
  allocationPercent: number;
  directExpenseRatio: string;
  regularExpenseRatio: string;
  oneYearReturn: string;
  annualDragSaved: string;
}

export interface FiduciaryGoal {
  id: string;
  clientId: string;
  title: string;
  category: "Education" | "Real Estate" | "Retirement" | "Trust" | "Other";
  targetAmount: number;
  currentFunded: number;
  targetYear: number;
  monthlySip: number;
  probabilityPercent: number;
  recommendedInstrument: string;
}

export interface CashFlowItem {
  id: string;
  clientId: string;
  type: "inflow" | "outflow_emi" | "outflow_living" | "outflow_tax";
  title: string;
  monthlyAmount: number;
  principalRemaining?: number;
  interestRate?: string;
  tenureYears?: number;
}

export interface InsurancePolicy {
  id: string;
  clientId: string;
  type: "term_life" | "health_floater" | "critical_illness" | "ulip_audit";
  title: string;
  provider: string;
  sumAssured: string;
  annualPremium: string;
  status: "100% Adequate" | "Super Top-Up Active" | "Passed - No Drag" | "Needs Review";
  notes: string;
}

export const defaultAdvisor: AdvisorProfile = {
  id: "RIA-SEBI-15845",
  name: "Devendra Vora, CFP",
  firmName: "Aurum Fiduciary Wealth Advisors",
  sebiRegNumber: "INA000015845",
  baslMembership: "BASL-1892",
  email: "advice@aurumfiduciary.in",
  phone: "+91 22 6984 4100",
  officeAddress: "Level 14, Maker Chambers IV, Nariman Point, Mumbai 400021",
  feeSchedule: "SEBI Fiduciary Fee-Only Cap: ₹1,25,000 / yr or 2.5% AUA",
  totalAuaTracked: 0,
  activeClientCount: 0,
};

// CLEAN ZERO-DUMMY INITIAL STATE: Clean production baseline
export const initialClients: ClientProfile[] = [];
export const initialAssets: HoldingAsset[] = [];
export const initialGoals: FiduciaryGoal[] = [];
export const initialCashFlow: CashFlowItem[] = [];
export const initialInsurance: InsurancePolicy[] = [];

// OPTIONAL DEMO PRESET: ONLY activated when tester explicitly clicks "Load Sample Demo Case"
export const sampleDemoClient: ClientProfile = {
  id: "CLIENT-DEMO-001",
  name: "Rajesh V. Kulkarni",
  email: "rajesh.kulkarni@techindia.org",
  phone: "+91 98201 55902",
  city: "Mumbai, Maharashtra",
  tier: "Core HNI",
  netWorth: "₹4,80,00,000",
  netWorthNum: 48000000,
  liquidSurplus: "₹3,90,00,000",
  monthlySurplus: "₹2,60,000",
  dragSaved: "₹3,84,000 / yr",
  riskTolerance: "Balanced Strategic Growth",
  targetCAGR: "11.5% CAGR",
  onboardingStage: "Stage 3 Cleared // CeFCoM Escrow Settled",
  statusBadge: {
    label: "Active Fiduciary Mandate",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
  pan: "AAFPK8821L",
  aadhaarMasked: "XXXX-XXXX-4912",
  ckycId: "IN-CKYC-2026-881920",
  cefcomUrn: "URN-BASL-15845-8819",
  employer: "Cognizant Technology Solutions",
  designation: "Senior Director, Enterprise Architecture",
  grossCtc: "₹72,00,000 / annum",
  equityAlloc: 65,
  debtAlloc: 25,
  goldAlloc: 10,
  foliosCount: 8,
  advisorNotes: "Completed regular-to-direct mutual fund transition. ₹3.84L annual commission drag eliminated.",
  createdAt: "2026-02-14",
};

export const sampleDemoAssets: HoldingAsset[] = [
  {
    id: "ASSET-DEMO-1",
    clientId: "CLIENT-DEMO-001",
    name: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth",
    category: "Flexi Cap Equity",
    isin: "INF879O01019",
    folio: "10984512/88",
    currentValue: 18500000,
    allocationPercent: 38.5,
    directExpenseRatio: "0.62%",
    regularExpenseRatio: "1.44%",
    oneYearReturn: "+21.4%",
    annualDragSaved: "₹1,51,700/yr",
  },
  {
    id: "ASSET-DEMO-2",
    clientId: "CLIENT-DEMO-001",
    name: "UTI Nifty 50 Index Fund - Direct Plan - Growth",
    category: "Large Cap Index",
    isin: "INF789F01X85",
    folio: "99401258/01",
    currentValue: 12000000,
    allocationPercent: 25.0,
    directExpenseRatio: "0.21%",
    regularExpenseRatio: "0.85%",
    oneYearReturn: "+16.2%",
    annualDragSaved: "₹76,800/yr",
  },
  {
    id: "ASSET-DEMO-3",
    clientId: "CLIENT-DEMO-001",
    name: "HDFC Short Term Debt Fund - Direct Plan - Growth",
    category: "Short Duration Debt",
    isin: "INF179K01BF4",
    folio: "78841209/44",
    currentValue: 12000000,
    allocationPercent: 25.0,
    directExpenseRatio: "0.32%",
    regularExpenseRatio: "0.89%",
    oneYearReturn: "+7.4%",
    annualDragSaved: "₹68,400/yr",
  },
  {
    id: "ASSET-DEMO-4",
    clientId: "CLIENT-DEMO-001",
    name: "Nippon India Sovereign Gold ETF (Direct Demat Units)",
    category: "Commodities / Gold",
    isin: "INF204KB1881",
    folio: "Demat IN300126",
    currentValue: 5500000,
    allocationPercent: 11.5,
    directExpenseRatio: "0.18%",
    regularExpenseRatio: "0.75%",
    oneYearReturn: "+18.9%",
    annualDragSaved: "₹31,350/yr",
  },
];

export const sampleDemoGoals: FiduciaryGoal[] = [
  {
    id: "GOAL-DEMO-1",
    clientId: "CLIENT-DEMO-001",
    title: "Higher Education - Imperial College London",
    category: "Education",
    targetAmount: 12000000,
    currentFunded: 6500000,
    targetYear: 2031,
    monthlySip: 75000,
    probabilityPercent: 94,
    recommendedInstrument: "Direct Large & Flexi-Cap Equity",
  },
  {
    id: "GOAL-DEMO-2",
    clientId: "CLIENT-DEMO-001",
    title: "Financial Independence & Early Retirement",
    category: "Retirement",
    targetAmount: 80000000,
    currentFunded: 24500000,
    targetYear: 2038,
    monthlySip: 110000,
    probabilityPercent: 89,
    recommendedInstrument: "Direct Dynamic Multi-Asset Allocation",
  },
];

export const sampleDemoCashFlow: CashFlowItem[] = [
  {
    id: "CF-DEMO-1",
    clientId: "CLIENT-DEMO-001",
    type: "inflow",
    title: "Net Take-Home Salary (Enterprise Architecture)",
    monthlyAmount: 480000,
  },
  {
    id: "CF-DEMO-2",
    clientId: "CLIENT-DEMO-001",
    type: "outflow_emi",
    title: "Home Mortgage EMI (Bandra Residence)",
    monthlyAmount: 110000,
    principalRemaining: 9500000,
    interestRate: "8.35% p.a.",
    tenureYears: 9,
  },
  {
    id: "CF-DEMO-3",
    clientId: "CLIENT-DEMO-001",
    type: "outflow_living",
    title: "Household Living, Schooling & Utilities",
    monthlyAmount: 110000,
  },
];

export const sampleDemoInsurance: InsurancePolicy[] = [
  {
    id: "INS-DEMO-1",
    clientId: "CLIENT-DEMO-001",
    type: "term_life",
    title: "Pure Term Life Insurance Policy",
    provider: "HDFC Life Click2Protect 3D",
    sumAssured: "₹10.00 Cr",
    annualPremium: "₹65,000 / yr",
    status: "100% Adequate",
    notes: "Human Life Value benchmark verified (15x gross annual income).",
  },
  {
    id: "INS-DEMO-2",
    clientId: "CLIENT-DEMO-001",
    type: "health_floater",
    title: "Family Floater + Super Top-Up Health Shield",
    provider: "Care Supreme + Super Top-Up",
    sumAssured: "₹1.00 Cr",
    annualPremium: "₹32,000 / yr",
    status: "Super Top-Up Active",
    notes: "₹25L Base + ₹75L Super Top-Up with ₹0 room rent capping.",
  },
];

export function formatINR(val: number): string {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} L`;
  }
  return `₹${val.toLocaleString("en-IN")}`;
}
