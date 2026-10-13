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

export const initialClients: ClientProfile[] = [
  {
    id: "AURUM-HNI-340777",
    name: "Vikramaditya Singhania",
    email: "vikram.singhania@cloudcorp.com",
    phone: "+91 98200 19842",
    city: "Worli, Mumbai",
    tier: "Core HNI",
    netWorth: "₹5,20,00,000",
    netWorthNum: 52000000,
    liquidSurplus: "₹4,25,00,000",
    monthlySurplus: "₹2,80,000",
    dragSaved: "₹4,20,000 / yr",
    riskTolerance: "Balanced Strategic Growth",
    targetCAGR: "11.5% CAGR",
    onboardingStage: "Stage 3 Cleared // CeFCoM Escrow Settled",
    statusBadge: {
      label: "Ready for Execution",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
    pan: "AAACB1693K",
    aadhaarMasked: "XXXX-XXXX-1284",
    ckycId: "IN-CKYC-2026-9707178",
    cefcomUrn: "URN-BASL-15845-8169",
    employer: "Microsoft India R&D",
    designation: "Vice President, Cloud Architecture",
    grossCtc: "₹75,00,000 / annum",
    equityAlloc: 65,
    debtAlloc: 25,
    goldAlloc: 10,
    foliosCount: 14,
    advisorNotes:
      "All 14 regular mutual fund folios flagged. Ready to transition ₹4.25 Cr into Direct Demat. Form B sealed, CeFCoM escrow settled.",
  },
  {
    id: "AURUM-UHNI-891024",
    name: "Radhika Merchant-Parekh",
    email: "radhika.parekh@sunpharma.holding",
    phone: "+91 98199 44102",
    city: "Malabar Hill, Mumbai",
    tier: "UHNI",
    netWorth: "₹24,50,00,000",
    netWorthNum: 245000000,
    liquidSurplus: "₹18,20,00,000",
    monthlySurplus: "₹11,50,000",
    dragSaved: "₹19,60,000 / yr",
    riskTolerance: "Aggressive Equity Compounding",
    targetCAGR: "13.2% CAGR",
    onboardingStage: "Stage 2 In-Progress // Form B Indenture Pending",
    statusBadge: {
      label: "Needs E-Sign",
      bg: "bg-amber-100",
      text: "text-amber-800",
    },
    pan: "ABCPM4401J",
    aadhaarMasked: "XXXX-XXXX-9902",
    ckycId: "IN-CKYC-2026-1104882",
    cefcomUrn: "URN-BASL-15845-9014",
    employer: "Sun Pharma Family Office",
    designation: "Executive Director",
    grossCtc: "₹3,40,00,000 / annum",
    equityAlloc: 75,
    debtAlloc: 15,
    goldAlloc: 10,
    foliosCount: 28,
    advisorNotes:
      "Form B Fiduciary Indenture dispatched via DigiLocker. Client reviewing family trust carve-out clause with legal counsel.",
  },
  {
    id: "AURUM-HNI-554201",
    name: "Rohan Murty-Iyer",
    email: "rohan@finflow.technology",
    phone: "+91 98450 78219",
    city: "Indiranagar, Bengaluru",
    tier: "Core HNI",
    netWorth: "₹8,40,00,000",
    netWorthNum: 84000000,
    liquidSurplus: "₹6,80,00,000",
    monthlySurplus: "₹4,20,000",
    dragSaved: "₹6,72,000 / yr",
    riskTolerance: "Moderately Aggressive",
    targetCAGR: "12.0% CAGR",
    onboardingStage: "Stage 1 Cleared // CAS Statement Extracted",
    statusBadge: {
      label: "Audit In-Progress",
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    pan: "AFZPM9932B",
    aadhaarMasked: "XXXX-XXXX-3341",
    ckycId: "IN-CKYC-2026-4402195",
    cefcomUrn: "URN-BASL-15845-7729",
    employer: "FinFlow Technologies",
    designation: "Founder & CTO",
    grossCtc: "₹1,20,00,000 / annum",
    equityAlloc: 70,
    debtAlloc: 20,
    goldAlloc: 10,
    foliosCount: 19,
    advisorNotes:
      "CAS parsed. Discovered ₹2.1 Cr locked in high-expense regular plan distributor AUM with 1.45% drag. Transition schedule prepared.",
  },
  {
    id: "AURUM-EHNI-120938",
    name: "Amit Mittal",
    email: "a.mittal@kkr-india.pe",
    phone: "+91 99100 48821",
    city: "Golf Links, New Delhi",
    tier: "Emerging HNI",
    netWorth: "₹3,80,00,000",
    netWorthNum: 38000000,
    liquidSurplus: "₹3,10,00,000",
    monthlySurplus: "₹2,10,000",
    dragSaved: "₹3,04,000 / yr",
    riskTolerance: "Balanced Strategic",
    targetCAGR: "11.0% CAGR",
    onboardingStage: "Fully Onboarded // Mandate Active",
    statusBadge: {
      label: "Mandate Active",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
    pan: "AQWPM3382R",
    aadhaarMasked: "XXXX-XXXX-6612",
    ckycId: "IN-CKYC-2025-8849120",
    cefcomUrn: "URN-BASL-15845-3310",
    employer: "KKR Private Equity India",
    designation: "Vice President",
    grossCtc: "₹65,00,000 / annum",
    equityAlloc: 60,
    debtAlloc: 30,
    goldAlloc: 10,
    foliosCount: 9,
    advisorNotes:
      "Fully rebalanced into 100% Direct Demat. Quarterly review conducted in January. 0% distributor trail verified.",
  },
  {
    id: "AURUM-UHNI-771920",
    name: "Priyadarshini Rao",
    email: "priyadarshini.rao@trilegal-law.com",
    phone: "+91 98210 55193",
    city: "Bandra Kurla Complex, Mumbai",
    tier: "UHNI",
    netWorth: "₹18,20,00,000",
    netWorthNum: 182000000,
    liquidSurplus: "₹14,90,00,000",
    monthlySurplus: "₹8,40,000",
    dragSaved: "₹14,56,000 / yr",
    riskTolerance: "Strategic Capital Preservation",
    targetCAGR: "10.5% CAGR",
    onboardingStage: "Stage 3 Cleared // CeFCoM Escrow Settled",
    statusBadge: {
      label: "Ready for Execution",
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
    pan: "AWZPR1129Q",
    aadhaarMasked: "XXXX-XXXX-5540",
    ckycId: "IN-CKYC-2026-6638910",
    cefcomUrn: "URN-BASL-15845-6619",
    employer: "Trilegal Senior Partnership",
    designation: "Senior Equity Partner",
    grossCtc: "₹2,80,00,000 / annum",
    equityAlloc: 55,
    debtAlloc: 35,
    goldAlloc: 10,
    foliosCount: 22,
    advisorNotes:
      "Fiduciary agreement sealed. Mandate incorporates strict conflict-of-interest firewall for listed corporate clients.",
  },
  {
    id: "AURUM-HNI-640192",
    name: "Siddharth Deshmukh",
    email: "siddharth.d@swiggy.tech",
    phone: "+91 97400 89211",
    city: "Koramangala, Bengaluru",
    tier: "Core HNI",
    netWorth: "₹6,10,00,000",
    netWorthNum: 61000000,
    liquidSurplus: "₹4,90,00,000",
    monthlySurplus: "₹3,40,000",
    dragSaved: "₹4,88,000 / yr",
    riskTolerance: "Aggressive Equity",
    targetCAGR: "12.8% CAGR",
    onboardingStage: "Stage 1 Cleared // Awaiting CeFCoM Deposit",
    statusBadge: {
      label: "Escrow Pending",
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
    pan: "BBMPD9012F",
    aadhaarMasked: "XXXX-XXXX-8821",
    ckycId: "IN-CKYC-2026-8802991",
    cefcomUrn: "URN-BASL-15845-4421",
    employer: "Swiggy Technologies",
    designation: "Chief AI Officer",
    grossCtc: "₹95,00,000 / annum",
    equityAlloc: 70,
    debtAlloc: 20,
    goldAlloc: 10,
    foliosCount: 16,
    advisorNotes:
      "ESOP monetization completed. Awaiting client's CeFCoM central fee escrow deposit to seal Form B agreement.",
  },
];

export const initialAssets: HoldingAsset[] = [
  {
    id: "ASSET-1",
    clientId: "AURUM-HNI-340777",
    name: "Parag Parikh Flexi Cap Fund",
    category: "Flexi Cap Equity",
    isin: "INF879O01019",
    folio: "10984210/89",
    currentValue: 14500000,
    allocationPercent: 27.9,
    directExpenseRatio: "0.58%",
    regularExpenseRatio: "1.42%",
    oneYearReturn: "+22.4%",
    annualDragSaved: "₹1,45,000/yr",
  },
  {
    id: "ASSET-2",
    clientId: "AURUM-HNI-340777",
    name: "UTI Nifty 50 Index Fund",
    category: "Large Cap Index",
    isin: "INF789F01X09",
    folio: "50491028/11",
    currentValue: 12000000,
    allocationPercent: 23.1,
    directExpenseRatio: "0.18%",
    regularExpenseRatio: "0.85%",
    oneYearReturn: "+18.7%",
    annualDragSaved: "₹96,000/yr",
  },
  {
    id: "ASSET-3",
    clientId: "AURUM-HNI-340777",
    name: "ICICI Prudential All Seasons Bond",
    category: "Dynamic Debt",
    isin: "INF109K01912",
    folio: "33891048/90",
    currentValue: 13000000,
    allocationPercent: 25.0,
    directExpenseRatio: "0.45%",
    regularExpenseRatio: "1.25%",
    oneYearReturn: "+8.2%",
    annualDragSaved: "₹1,04,000/yr",
  },
  {
    id: "ASSET-4",
    clientId: "AURUM-HNI-340777",
    name: "Sovereign Gold Bonds (RBI SGB)",
    category: "Sovereign Gold",
    isin: "IN0020210137",
    folio: "Demat-CDSL-8849",
    currentValue: 5200000,
    allocationPercent: 10.0,
    directExpenseRatio: "0.00%",
    regularExpenseRatio: "0.65%",
    oneYearReturn: "+16.1%",
    annualDragSaved: "₹35,000/yr",
  },
  {
    id: "ASSET-5",
    clientId: "AURUM-HNI-340777",
    name: "HDFC Arbitrage Fund",
    category: "Arbitrage Liquid",
    isin: "INF179K01WT4",
    folio: "77192048/33",
    currentValue: 7300000,
    allocationPercent: 14.0,
    directExpenseRatio: "0.32%",
    regularExpenseRatio: "0.95%",
    oneYearReturn: "+7.4%",
    annualDragSaved: "₹40,000/yr",
  },
];

export const initialGoals: FiduciaryGoal[] = [
  {
    id: "GOAL-1",
    clientId: "AURUM-HNI-340777",
    title: "Daughter's Ivy League Education",
    category: "Education",
    targetAmount: 25000000,
    currentFunded: 17000000,
    targetYear: 2031,
    monthlySip: 110000,
    probabilityPercent: 94,
    recommendedInstrument: "Direct US Index + Indian Flexi-Cap",
  },
  {
    id: "GOAL-2",
    clientId: "AURUM-HNI-340777",
    title: "Coastal Retirement Villa (Alibaug)",
    category: "Real Estate",
    targetAmount: 60000000,
    currentFunded: 25200000,
    targetYear: 2036,
    monthlySip: 120000,
    probabilityPercent: 88,
    recommendedInstrument: "Direct Mid & Flexi-Cap Indexing",
  },
  {
    id: "GOAL-3",
    clientId: "AURUM-HNI-340777",
    title: "Generational Private Family Trust",
    category: "Trust",
    targetAmount: 100000000,
    currentFunded: 9800000,
    targetYear: 2040,
    monthlySip: 50000,
    probabilityPercent: 99,
    recommendedInstrument: "Direct Sovereign Gold & Nifty 50",
  },
];

export const initialCashFlow: CashFlowItem[] = [
  {
    id: "CF-1",
    clientId: "AURUM-HNI-340777",
    type: "inflow",
    title: "Take-home Monthly Salary (VP Cloud Architecture)",
    monthlyAmount: 520000,
  },
  {
    id: "CF-2",
    clientId: "AURUM-HNI-340777",
    type: "outflow_emi",
    title: "HDFC Home Loan — Worli Penthouse",
    monthlyAmount: 115000,
    principalRemaining: 12000000,
    interestRate: "8.40% p.a.",
    tenureYears: 11,
  },
  {
    id: "CF-3",
    clientId: "AURUM-HNI-340777",
    type: "outflow_living",
    title: "Household Living & International Schooling",
    monthlyAmount: 125000,
  },
];

export const initialInsurance: InsurancePolicy[] = [
  {
    id: "INS-1",
    clientId: "AURUM-HNI-340777",
    type: "term_life",
    title: "Pure Term Mortality Cover",
    provider: "HDFC Life Click2Protect 3D Plus",
    sumAssured: "₹10.00 Cr",
    annualPremium: "₹68,000 / yr",
    status: "100% Adequate",
    notes: "Pure mortality cover. Zero investment mixing. Verified 100% income replacement ratio.",
  },
  {
    id: "INS-2",
    clientId: "AURUM-HNI-340777",
    type: "health_floater",
    title: "Family Comprehensive Health Floater",
    provider: "Care Supreme + Super Top-Up",
    sumAssured: "₹1.00 Cr",
    annualPremium: "₹34,500 / yr",
    status: "Super Top-Up Active",
    notes: "Base ₹25L + ₹75L Super Top-Up. Worldwide emergency medical cover included.",
  },
  {
    id: "INS-3",
    clientId: "AURUM-HNI-340777",
    type: "ulip_audit",
    title: "ULIP & Endowment Toxic Drag Audit",
    provider: "Fiduciary Portfolio Audit",
    sumAssured: "₹0 Commission Leak",
    annualPremium: "₹0 Drag",
    status: "Passed - No Drag",
    notes: "Audit passed. Client holds zero high-cost opaque traditional insurance policies.",
  },
];
