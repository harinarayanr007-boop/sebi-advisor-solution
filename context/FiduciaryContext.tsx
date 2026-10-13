"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ClientProfile,
  HoldingAsset,
  FiduciaryGoal,
  CashFlowItem,
  InsurancePolicy,
  initialClients,
  initialAssets,
  initialGoals,
  initialCashFlow,
  initialInsurance,
} from "@/lib/fiduciary-store";

interface FiduciaryContextType {
  clients: ClientProfile[];
  activeClient: ClientProfile;
  setActiveClientId: (id: string) => void;
  viewMode: "client" | "advisor";
  setViewMode: (mode: "client" | "advisor") => void;
  assets: HoldingAsset[];
  goals: FiduciaryGoal[];
  cashFlow: CashFlowItem[];
  insurance: InsurancePolicy[];
  addClient: (client: Omit<ClientProfile, "id" | "foliosCount" | "netWorthNum">) => void;
  addAsset: (asset: Omit<HoldingAsset, "id" | "clientId">) => void;
  deleteAsset: (id: string) => void;
  addGoal: (goal: Omit<FiduciaryGoal, "id" | "clientId">) => void;
  deleteGoal: (id: string) => void;
  addCashFlow: (item: Omit<CashFlowItem, "id" | "clientId">) => void;
  deleteCashFlow: (id: string) => void;
  addInsurance: (policy: Omit<InsurancePolicy, "id" | "clientId">) => void;
  deleteInsurance: (id: string) => void;
  updateRiskProfile: (tolerance: string, targetCAGR: string, equity: number, debt: number, gold: number) => void;
  parseCasStatement: (fileName: string) => void;
  showFactsheetModal: boolean;
  setShowFactsheetModal: (show: boolean) => void;
  showInviteModal: boolean;
  setShowInviteModal: (show: boolean) => void;
}

const FiduciaryContext = createContext<FiduciaryContextType | undefined>(undefined);

export function FiduciaryProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<ClientProfile[]>(initialClients);
  const [activeClientId, setActiveClientId] = useState<string>(initialClients[0].id);
  const [viewMode, setViewMode] = useState<"client" | "advisor">("client");
  const [assets, setAssets] = useState<HoldingAsset[]>(initialAssets);
  const [goals, setGoals] = useState<FiduciaryGoal[]>(initialGoals);
  const [cashFlow, setCashFlow] = useState<CashFlowItem[]>(initialCashFlow);
  const [insurance, setInsurance] = useState<InsurancePolicy[]>(initialInsurance);
  const [showFactsheetModal, setShowFactsheetModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Initialize from LocalStorage on mount
  useEffect(() => {
    try {
      const storedClients = localStorage.getItem("aurum_clients");
      if (storedClients) setClients(JSON.parse(storedClients));

      const storedAssets = localStorage.getItem("aurum_assets");
      if (storedAssets) setAssets(JSON.parse(storedAssets));

      const storedGoals = localStorage.getItem("aurum_goals");
      if (storedGoals) setGoals(JSON.parse(storedGoals));

      const storedCashFlow = localStorage.getItem("aurum_cashflow");
      if (storedCashFlow) setCashFlow(JSON.parse(storedCashFlow));

      const storedInsurance = localStorage.getItem("aurum_insurance");
      if (storedInsurance) setInsurance(JSON.parse(storedInsurance));
    } catch (e) {
      console.warn("LocalStorage unavailable, using in-memory state", e);
    }
  }, []);

  // Save changes to LocalStorage
  const persist = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("LocalStorage write failed", e);
    }
  };

  const activeClient = clients.find((c) => c.id === activeClientId) || clients[0];

  // Client-specific filtered slices
  const activeAssets = assets.filter((a) => a.clientId === activeClient.id);
  const activeGoals = goals.filter((g) => g.clientId === activeClient.id);
  const activeCashFlow = cashFlow.filter((cf) => cf.clientId === activeClient.id);
  const activeInsurance = insurance.filter((ins) => ins.clientId === activeClient.id);

  // Actions
  const addClient = (newClientData: Omit<ClientProfile, "id" | "foliosCount" | "netWorthNum">) => {
    const rawNum = parseInt(newClientData.netWorth.replace(/[^0-9]/g, ""), 10) || 50000000;
    const newClient: ClientProfile = {
      ...newClientData,
      id: `AURUM-${newClientData.tier.substring(0, 4).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      netWorthNum: rawNum,
      foliosCount: 12,
    };
    const updated = [newClient, ...clients];
    setClients(updated);
    persist("aurum_clients", updated);
    setActiveClientId(newClient.id);
  };

  const addAsset = (assetData: Omit<HoldingAsset, "id" | "clientId">) => {
    const newAsset: HoldingAsset = {
      ...assetData,
      id: `ASSET-${Date.now()}`,
      clientId: activeClient.id,
    };
    const updated = [newAsset, ...assets];
    setAssets(updated);
    persist("aurum_assets", updated);
  };

  const deleteAsset = (id: string) => {
    const updated = assets.filter((a) => a.id !== id);
    setAssets(updated);
    persist("aurum_assets", updated);
  };

  const addGoal = (goalData: Omit<FiduciaryGoal, "id" | "clientId">) => {
    const newGoal: FiduciaryGoal = {
      ...goalData,
      id: `GOAL-${Date.now()}`,
      clientId: activeClient.id,
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

  const addCashFlow = (itemData: Omit<CashFlowItem, "id" | "clientId">) => {
    const newItem: CashFlowItem = {
      ...itemData,
      id: `CF-${Date.now()}`,
      clientId: activeClient.id,
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

  const addInsurance = (policyData: Omit<InsurancePolicy, "id" | "clientId">) => {
    const newPolicy: InsurancePolicy = {
      ...policyData,
      id: `INS-${Date.now()}`,
      clientId: activeClient.id,
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

  const updateRiskProfile = (
    tolerance: string,
    targetCAGR: string,
    equity: number,
    debt: number,
    gold: number
  ) => {
    const updatedClients = clients.map((c) => {
      if (c.id === activeClient.id) {
        return {
          ...c,
          riskTolerance: tolerance,
          targetCAGR,
          equityAlloc: equity,
          debtAlloc: debt,
          goldAlloc: gold,
        };
      }
      return c;
    });
    setClients(updatedClients);
    persist("aurum_clients", updatedClients);
  };

  const parseCasStatement = (fileName: string) => {
    // Generates parsed direct holdings and appends them
    const parsedFolios: HoldingAsset[] = [
      {
        id: `CAS-${Date.now()}-1`,
        clientId: activeClient.id,
        name: "Mirae Asset Large Cap Fund (Direct)",
        category: "Large Cap Equity",
        isin: "INF769K01018",
        folio: "99104829/44",
        currentValue: 8500000,
        allocationPercent: 16.3,
        directExpenseRatio: "0.52%",
        regularExpenseRatio: "1.55%",
        oneYearReturn: "+21.2%",
        annualDragSaved: "₹87,550/yr",
      },
      {
        id: `CAS-${Date.now()}-2`,
        clientId: activeClient.id,
        name: "Kotak Emerging Equity Fund (Direct)",
        category: "Mid Cap Equity",
        isin: "INF174K01842",
        folio: "88491028/19",
        currentValue: 6200000,
        allocationPercent: 11.9,
        directExpenseRatio: "0.68%",
        regularExpenseRatio: "1.72%",
        oneYearReturn: "+26.8%",
        annualDragSaved: "₹64,480/yr",
      },
    ];
    const updated = [...parsedFolios, ...assets];
    setAssets(updated);
    persist("aurum_assets", updated);
  };

  return (
    <FiduciaryContext.Provider
      value={{
        clients,
        activeClient,
        setActiveClientId,
        viewMode,
        setViewMode,
        assets: activeAssets,
        goals: activeGoals,
        cashFlow: activeCashFlow,
        insurance: activeInsurance,
        addClient,
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
        showFactsheetModal,
        setShowFactsheetModal,
        showInviteModal,
        setShowInviteModal,
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
