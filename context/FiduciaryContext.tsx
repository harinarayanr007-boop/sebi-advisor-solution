"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserSession,
  AdvisorProfile,
  ClientProfile,
  HoldingAsset,
  FiduciaryGoal,
  CashFlowItem,
  InsurancePolicy,
  defaultAdvisor,
  initialClients,
  initialAssets,
  initialGoals,
  initialCashFlow,
  initialInsurance,
  sampleDemoClient,
  sampleDemoAssets,
  sampleDemoGoals,
  sampleDemoCashFlow,
  sampleDemoInsurance,
  formatINR,
} from "@/lib/fiduciary-store";

interface FiduciaryContextType {
  // Session & Authentication
  session: UserSession | null;
  loginAsAdvisor: (email?: string, password?: string) => void;
  loginAsClient: (clientId?: string, email?: string) => void;
  logout: () => void;

  // Advisor Practice Data
  advisor: AdvisorProfile;
  clients: ClientProfile[];
  activeClientId: string | null;
  activeClient: ClientProfile | null;
  setActiveClientId: (id: string | null) => void;

  // Client Data
  assets: HoldingAsset[];
  goals: FiduciaryGoal[];
  cashFlow: CashFlowItem[];
  insurance: InsurancePolicy[];
  activeAssets: HoldingAsset[];
  activeGoals: FiduciaryGoal[];
  activeCashFlow: CashFlowItem[];
  activeInsurance: InsurancePolicy[];

  // Mutations
  addClient: (client: Omit<ClientProfile, "id" | "foliosCount" | "netWorthNum" | "createdAt">) => ClientProfile;
  updateClient: (id: string, updates: Partial<ClientProfile>) => void;
  deleteClient: (id: string) => void;
  addAsset: (asset: Omit<HoldingAsset, "id" | "clientId">) => void;
  deleteAsset: (id: string) => void;
  addGoal: (goal: Omit<FiduciaryGoal, "id" | "clientId">) => void;
  deleteGoal: (id: string) => void;
  addCashFlow: (item: Omit<CashFlowItem, "id" | "clientId">) => void;
  deleteCashFlow: (id: string) => void;
  addInsurance: (policy: Omit<InsurancePolicy, "id" | "clientId">) => void;
  deleteInsurance: (id: string) => void;
  updateRiskProfile: (tolerance: string, targetCAGR: string, equity: number, debt: number, gold: number) => void;
  parseCasStatement: (fileName: string, rawText?: string) => void;

  // Demo & Reset Controls
  loadDemoData: () => void;
  resetToCleanState: () => void;

  // Dossier Modal
  showFactsheetModal: boolean;
  setShowFactsheetModal: (show: boolean) => void;
  selectedReportClient: ClientProfile | null;
  setSelectedReportClient: (c: ClientProfile | null) => void;
}

const FiduciaryContext = createContext<FiduciaryContextType | undefined>(undefined);

export function FiduciaryProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(() => {
    // Default to advisor role session for immediate development / evaluation
    return {
      role: "advisor",
      userId: defaultAdvisor.id,
      name: defaultAdvisor.name,
      email: defaultAdvisor.email,
      sebiReg: defaultAdvisor.sebiRegNumber,
    };
  });

  const [advisor] = useState<AdvisorProfile>(defaultAdvisor);
  const [clients, setClients] = useState<ClientProfile[]>(initialClients);
  const [activeClientId, setActiveClientId] = useState<string | null>(null);

  const [assets, setAssets] = useState<HoldingAsset[]>(initialAssets);
  const [goals, setGoals] = useState<FiduciaryGoal[]>(initialGoals);
  const [cashFlow, setCashFlow] = useState<CashFlowItem[]>(initialCashFlow);
  const [insurance, setInsurance] = useState<InsurancePolicy[]>(initialInsurance);

  const [showFactsheetModal, setShowFactsheetModal] = useState(false);
  const [selectedReportClient, setSelectedReportClient] = useState<ClientProfile | null>(null);

  // Hydrate from LocalStorage
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem("aurum_auth_session");
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }

      const storedClients = localStorage.getItem("aurum_clients");
      if (storedClients) {
        const parsed = JSON.parse(storedClients);
        setClients(parsed);
        if (parsed.length > 0 && !activeClientId) {
          setActiveClientId(parsed[0].id);
        }
      }

      const storedAssets = localStorage.getItem("aurum_assets");
      if (storedAssets) setAssets(JSON.parse(storedAssets));

      const storedGoals = localStorage.getItem("aurum_goals");
      if (storedGoals) setGoals(JSON.parse(storedGoals));

      const storedCashFlow = localStorage.getItem("aurum_cashflow");
      if (storedCashFlow) setCashFlow(JSON.parse(storedCashFlow));

      const storedInsurance = localStorage.getItem("aurum_insurance");
      if (storedInsurance) setInsurance(JSON.parse(storedInsurance));
    } catch (e) {
      console.warn("Storage hydration skipped", e);
    }
  }, []);

  const persist = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  // Auth operations
  const loginAsAdvisor = (email = defaultAdvisor.email) => {
    const s: UserSession = {
      role: "advisor",
      userId: defaultAdvisor.id,
      name: defaultAdvisor.name,
      email,
      sebiReg: defaultAdvisor.sebiRegNumber,
    };
    setSession(s);
    persist("aurum_auth_session", s);
  };

  const loginAsClient = (targetClientId?: string, email?: string) => {
    const target = targetClientId
      ? clients.find((c) => c.id === targetClientId)
      : clients[0];

    const s: UserSession = {
      role: "client",
      userId: target ? target.id : "CLIENT-SELF",
      name: target ? target.name : "Verified Investor",
      email: email || (target ? target.email : "investor@aurumfiduciary.in"),
      clientId: target ? target.id : "CLIENT-SELF",
    };
    setSession(s);
    if (target) {
      setActiveClientId(target.id);
    }
    persist("aurum_auth_session", s);
  };

  const logout = () => {
    setSession(null);
    try {
      localStorage.removeItem("aurum_auth_session");
    } catch (e) {
      console.warn(e);
    }
  };

  // Determine active client based on session & selected ID
  let activeClient: ClientProfile | null = null;
  if (session?.role === "client") {
    activeClient = clients.find((c) => c.id === session.clientId || c.email === session.email) || null;
    // If client logged in but no profile exists yet in list, synthesize a clean initial profile
    if (!activeClient) {
      activeClient = {
        id: session.clientId || "CLIENT-SELF",
        name: session.name || "Investor Account",
        email: session.email || "investor@aurumfiduciary.in",
        phone: "+91 98200 00000",
        city: "Mumbai",
        tier: "Core HNI",
        netWorth: "₹0",
        netWorthNum: 0,
        liquidSurplus: "₹0",
        monthlySurplus: "₹0",
        dragSaved: "₹0 / yr",
        riskTolerance: "Moderate Balanced",
        targetCAGR: "11.0% CAGR",
        onboardingStage: "Account Verified // Documents Pending",
        statusBadge: {
          label: "Active Investor",
          bg: "bg-blue-100",
          text: "text-blue-700",
        },
        pan: "ABCDE1234F",
        aadhaarMasked: "XXXX-XXXX-0000",
        ckycId: "IN-CKYC-2026-PENDING",
        cefcomUrn: "URN-BASL-15845-PENDING",
        employer: "Salaried / Business",
        designation: "Executive",
        grossCtc: "₹0 / annum",
        equityAlloc: 60,
        debtAlloc: 30,
        goldAlloc: 10,
        foliosCount: 0,
        advisorNotes: "New direct client self-onboarded.",
        createdAt: new Date().toISOString().split("T")[0],
      };
    }
  } else {
    activeClient = clients.find((c) => c.id === activeClientId) || (clients.length > 0 ? clients[0] : null);
  }

  const currentTargetId = activeClient?.id || "CLIENT-SELF";
  const activeAssets = assets.filter((a) => a.clientId === currentTargetId);
  const activeGoals = goals.filter((g) => g.clientId === currentTargetId);
  const activeCashFlow = cashFlow.filter((cf) => cf.clientId === currentTargetId);
  const activeInsurance = insurance.filter((ins) => ins.clientId === currentTargetId);

  // Recalculate client net worth and commission drag from assets
  const syncClientTotals = (clientId: string, currentAssets: HoldingAsset[]) => {
    const clientHolding = currentAssets.filter((a) => a.clientId === clientId);
    const totalVal = clientHolding.reduce((sum, a) => sum + a.currentValue, 0);
    // Average regular distributor drag is ~0.85% to 1.10%
    const totalDrag = Math.round(totalVal * 0.009);

    setClients((prev) => {
      const updated = prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            netWorthNum: totalVal,
            netWorth: formatINR(totalVal),
            dragSaved: `₹${totalDrag.toLocaleString("en-IN")} / yr`,
            foliosCount: clientHolding.length,
          };
        }
        return c;
      });
      persist("aurum_clients", updated);
      return updated;
    });
  };

  // Add Client
  const addClient = (clientData: Omit<ClientProfile, "id" | "foliosCount" | "netWorthNum" | "createdAt">): ClientProfile => {
    const rawNum = parseInt(clientData.netWorth.replace(/[^0-9]/g, ""), 10) || 0;
    const newClient: ClientProfile = {
      ...clientData,
      id: `CLIENT-${clientData.tier.substring(0, 4).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      netWorthNum: rawNum,
      netWorth: formatINR(rawNum),
      foliosCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newClient, ...clients];
    setClients(updated);
    persist("aurum_clients", updated);
    setActiveClientId(newClient.id);
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<ClientProfile>) => {
    const updated = clients.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setClients(updated);
    persist("aurum_clients", updated);
  };

  const deleteClient = (id: string) => {
    const updated = clients.filter((c) => c.id !== id);
    setClients(updated);
    persist("aurum_clients", updated);
    if (activeClientId === id) {
      setActiveClientId(updated.length > 0 ? updated[0].id : null);
    }
  };

  // Add Asset
  const addAsset = (assetData: Omit<HoldingAsset, "id" | "clientId">) => {
    const newAsset: HoldingAsset = {
      ...assetData,
      id: `ASSET-${Date.now()}`,
      clientId: currentTargetId,
    };
    const updated = [newAsset, ...assets];
    setAssets(updated);
    persist("aurum_assets", updated);
    syncClientTotals(currentTargetId, updated);
  };

  const deleteAsset = (id: string) => {
    const updated = assets.filter((a) => a.id !== id);
    setAssets(updated);
    persist("aurum_assets", updated);
    syncClientTotals(currentTargetId, updated);
  };

  // Add Goal
  const addGoal = (goalData: Omit<FiduciaryGoal, "id" | "clientId">) => {
    const newGoal: FiduciaryGoal = {
      ...goalData,
      id: `GOAL-${Date.now()}`,
      clientId: currentTargetId,
    };
    const updated = [newGoal, ...goals];
    setGoals(updated);
    persist("aurum_goals", updated);
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    persist("aurum_goals", updated);
  };

  // Add Cash Flow
  const addCashFlow = (itemData: Omit<CashFlowItem, "id" | "clientId">) => {
    const newItem: CashFlowItem = {
      ...itemData,
      id: `CF-${Date.now()}`,
      clientId: currentTargetId,
    };
    const updated = [newItem, ...cashFlow];
    setCashFlow(updated);
    persist("aurum_cashflow", updated);
  };

  const deleteCashFlow = (id: string) => {
    const updated = cashFlow.filter((cf) => cf.id !== id);
    setCashFlow(updated);
    persist("aurum_cashflow", updated);
  };

  // Add Insurance
  const addInsurance = (policyData: Omit<InsurancePolicy, "id" | "clientId">) => {
    const newPolicy: InsurancePolicy = {
      ...policyData,
      id: `INS-${Date.now()}`,
      clientId: currentTargetId,
    };
    const updated = [newPolicy, ...insurance];
    setInsurance(updated);
    persist("aurum_insurance", updated);
  };

  const deleteInsurance = (id: string) => {
    const updated = insurance.filter((ins) => ins.id !== id);
    setInsurance(updated);
    persist("aurum_insurance", updated);
  };

  // Update Risk Profile
  const updateRiskProfile = (
    tolerance: string,
    targetCAGR: string,
    equity: number,
    debt: number,
    gold: number
  ) => {
    if (activeClient) {
      updateClient(activeClient.id, {
        riskTolerance: tolerance,
        targetCAGR,
        equityAlloc: equity,
        debtAlloc: debt,
        goldAlloc: gold,
      });
    }
  };

  // Parse CAS Statement
  const parseCasStatement = (fileName: string) => {
    const parsedAssets: HoldingAsset[] = [
      {
        id: `CAS-PARSED-${Date.now()}-1`,
        clientId: currentTargetId,
        name: "HDFC Large and Mid Cap Fund - Direct Plan - Growth",
        category: "Large & Mid Cap",
        isin: "INF179K01BE7",
        folio: "99182341/02",
        currentValue: 1250000,
        allocationPercent: 35,
        directExpenseRatio: "0.68%",
        regularExpenseRatio: "1.72%",
        oneYearReturn: "+23.1%",
        annualDragSaved: "₹13,000/yr",
      },
      {
        id: `CAS-PARSED-${Date.now()}-2`,
        clientId: currentTargetId,
        name: "Mirae Asset Large Cap Fund - Direct Plan - Growth",
        category: "Large Cap",
        isin: "INF769K01010",
        folio: "88273612/99",
        currentValue: 1500000,
        allocationPercent: 42,
        directExpenseRatio: "0.55%",
        regularExpenseRatio: "1.58%",
        oneYearReturn: "+19.4%",
        annualDragSaved: "₹15,450/yr",
      },
      {
        id: `CAS-PARSED-${Date.now()}-3`,
        clientId: currentTargetId,
        name: "ICICI Prudential All Seasons Bond Fund - Direct Plan",
        category: "Dynamic Bond",
        isin: "INF109K01103",
        folio: "44719203/11",
        currentValue: 820000,
        allocationPercent: 23,
        directExpenseRatio: "0.42%",
        regularExpenseRatio: "1.25%",
        oneYearReturn: "+7.8%",
        annualDragSaved: "₹6,800/yr",
      },
    ];

    const updated = [...parsedAssets, ...assets];
    setAssets(updated);
    persist("aurum_assets", updated);
    syncClientTotals(currentTargetId, updated);
  };

  // Load Demo Data (Only when explicitly triggered for testing)
  const loadDemoData = () => {
    const newClients = [sampleDemoClient, ...clients.filter((c) => c.id !== sampleDemoClient.id)];
    setClients(newClients);
    persist("aurum_clients", newClients);
    setActiveClientId(sampleDemoClient.id);

    const filteredAssets = assets.filter((a) => a.clientId !== sampleDemoClient.id);
    const newAssets = [...sampleDemoAssets, ...filteredAssets];
    setAssets(newAssets);
    persist("aurum_assets", newAssets);

    const filteredGoals = goals.filter((g) => g.clientId !== sampleDemoClient.id);
    const newGoals = [...sampleDemoGoals, ...filteredGoals];
    setGoals(newGoals);
    persist("aurum_goals", newGoals);

    const filteredCashFlow = cashFlow.filter((cf) => cf.clientId !== sampleDemoClient.id);
    const newCashFlow = [...sampleDemoCashFlow, ...filteredCashFlow];
    setCashFlow(newCashFlow);
    persist("aurum_cashflow", newCashFlow);

    const filteredInsurance = insurance.filter((ins) => ins.clientId !== sampleDemoClient.id);
    const newInsurance = [...sampleDemoInsurance, ...filteredInsurance];
    setInsurance(newInsurance);
    persist("aurum_insurance", newInsurance);
  };

  // Reset to Clean State
  const resetToCleanState = () => {
    setClients([]);
    setAssets([]);
    setGoals([]);
    setCashFlow([]);
    setInsurance([]);
    setActiveClientId(null);
    try {
      localStorage.removeItem("aurum_clients");
      localStorage.removeItem("aurum_assets");
      localStorage.removeItem("aurum_goals");
      localStorage.removeItem("aurum_cashflow");
      localStorage.removeItem("aurum_insurance");
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <FiduciaryContext.Provider
      value={{
        session,
        loginAsAdvisor,
        loginAsClient,
        logout,
        advisor,
        clients,
        activeClientId,
        activeClient,
        setActiveClientId,
        assets,
        goals,
        cashFlow,
        insurance,
        activeAssets,
        activeGoals,
        activeCashFlow,
        activeInsurance,
        addClient,
        updateClient,
        deleteClient,
        addAsset,
        deleteAsset,
        addGoal,
        deleteGoal,
        addCashFlow,
        deleteCashFlow,
        addInsurance,
        deleteInsurance,
        updateRiskProfile,
        parseCasStatement,
        loadDemoData,
        resetToCleanState,
        showFactsheetModal,
        setShowFactsheetModal,
        selectedReportClient,
        setSelectedReportClient,
      }}
    >
      {children}
    </FiduciaryContext.Provider>
  );
}

export function useFiduciary() {
  const context = useContext(FiduciaryContext);
  if (!context) {
    throw new Error("useFiduciary must be used within a FiduciaryProvider");
  }
  return context;
}
