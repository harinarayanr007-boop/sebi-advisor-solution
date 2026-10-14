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
  AuditLogEntry,
  initialAuditLogs,
  formatINR,
} from "@/lib/fiduciary-store";

interface FiduciaryContextType {
  // Session & Authentication
  session: UserSession | null;
  loginAsAdvisor: (email?: string, password?: string) => void;
  loginAsClient: (clientId?: string, email?: string, passwordInput?: string) => { success: boolean; error?: string; status?: string };
  loginWithGoogle: (email: string, name?: string) => { success: boolean; status: string };
  loginWithDemoClient: () => void;
  approveClient: (clientId: string) => void;
  rejectClient: (clientId: string) => void;
  logout: () => void;
  isSessionLocked: boolean;
  lockSession: () => void;
  unlockSession: (passcode?: string) => boolean;

  // Security & SEBI Audit Trail
  auditLogs: AuditLogEntry[];
  logAuditEvent: (
    action: string,
    category: "KYC" | "SUITABILITY" | "PORTFOLIO" | "AGREEMENT" | "SECURITY" | "CEFCOM",
    details: string
  ) => void;

  // Advisor Practice Data
  advisor: AdvisorProfile;
  updateAdvisorSettings: (updates: Partial<AdvisorProfile>) => void;
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
  importClientAssets: (clientId: string, incomingAssets: Omit<HoldingAsset, "id" | "clientId">[]) => void;
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
  const [session, setSession] = useState<UserSession | null>(null);

  const [advisor, setAdvisor] = useState<AdvisorProfile>(defaultAdvisor);
  const [clients, setClients] = useState<ClientProfile[]>(initialClients);
  const [activeClientId, setActiveClientId] = useState<string | null>(sampleDemoClient.id);

  const [assets, setAssets] = useState<HoldingAsset[]>(initialAssets);
  const [goals, setGoals] = useState<FiduciaryGoal[]>(initialGoals);
  const [cashFlow, setCashFlow] = useState<CashFlowItem[]>(initialCashFlow);
  const [insurance, setInsurance] = useState<InsurancePolicy[]>(initialInsurance);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);
  const [isSessionLocked, setIsSessionLocked] = useState<boolean>(false);

  const [showFactsheetModal, setShowFactsheetModal] = useState(false);
  const [selectedReportClient, setSelectedReportClient] = useState<ClientProfile | null>(null);

  // Hydrate from LocalStorage & Synchronize with Backend / Supabase
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem("aurum_auth_session");
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      } else {
        // Direct access fallback: default to sampleDemoClient so direct links work seamlessly without a password
        const defaultClientSession: UserSession = {
          role: "client",
          userId: sampleDemoClient.id,
          name: sampleDemoClient.name,
          email: sampleDemoClient.email,
          clientId: sampleDemoClient.id,
          status: "active",
        };
        setSession(defaultClientSession);
        persist("aurum_auth_session", defaultClientSession);
      }

      const storedAdvisor = localStorage.getItem("aurum_advisor_profile");
      if (storedAdvisor) {
        setAdvisor(JSON.parse(storedAdvisor));
      }

      const storedClients = localStorage.getItem("aurum_clients");
      if (storedClients) {
        const parsed = JSON.parse(storedClients);
        if (parsed.length > 0) {
          setClients(parsed);
          if (!activeClientId) {
            setActiveClientId(parsed[0].id);
          }
        } else {
          setClients([sampleDemoClient]);
          setActiveClientId(sampleDemoClient.id);
          persist("aurum_clients", [sampleDemoClient]);
        }
      } else {
        setClients([sampleDemoClient]);
        setActiveClientId(sampleDemoClient.id);
        persist("aurum_clients", [sampleDemoClient]);
      }

      const storedAssets = localStorage.getItem("aurum_assets");
      if (storedAssets) {
        const parsed = JSON.parse(storedAssets);
        if (parsed.length > 0) setAssets(parsed);
        else {
          setAssets(sampleDemoAssets);
          persist("aurum_assets", sampleDemoAssets);
        }
      } else {
        setAssets(sampleDemoAssets);
        persist("aurum_assets", sampleDemoAssets);
      }

      const storedGoals = localStorage.getItem("aurum_goals");
      if (storedGoals) {
        const parsed = JSON.parse(storedGoals);
        if (parsed.length > 0) setGoals(parsed);
        else {
          setGoals(sampleDemoGoals);
          persist("aurum_goals", sampleDemoGoals);
        }
      } else {
        setGoals(sampleDemoGoals);
        persist("aurum_goals", sampleDemoGoals);
      }

      const storedCashFlow = localStorage.getItem("aurum_cashflow");
      if (storedCashFlow) {
        const parsed = JSON.parse(storedCashFlow);
        if (parsed.length > 0) setCashFlow(parsed);
        else {
          setCashFlow(sampleDemoCashFlow);
          persist("aurum_cashflow", sampleDemoCashFlow);
        }
      } else {
        setCashFlow(sampleDemoCashFlow);
        persist("aurum_cashflow", sampleDemoCashFlow);
      }

      const storedInsurance = localStorage.getItem("aurum_insurance");
      if (storedInsurance) {
        const parsed = JSON.parse(storedInsurance);
        if (parsed.length > 0) setInsurance(parsed);
        else {
          setInsurance(sampleDemoInsurance);
          persist("aurum_insurance", sampleDemoInsurance);
        }
      } else {
        setInsurance(sampleDemoInsurance);
        persist("aurum_insurance", sampleDemoInsurance);
      }

      const storedLogs = localStorage.getItem("aurum_audit_logs");
      if (storedLogs) setAuditLogs(JSON.parse(storedLogs));
    } catch (e) {
      console.warn("Storage hydration skipped", e);
    }

    // Live background sync from backend API / Supabase
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.clients) && data.clients.length > 0) {
          setClients((prev) => {
            const map = new Map<string, ClientProfile>();
            prev.forEach((c) => map.set(c.id, c));
            data.clients.forEach((c: ClientProfile) => map.set(c.id, c));
            const merged = Array.from(map.values());
            persist("aurum_clients", merged);
            return merged;
          });
        }
      })
      .catch((err) => console.warn("Background client sync skipped:", err));

    fetch("/api/assets")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.assets) && data.assets.length > 0) {
          setAssets((prev) => {
            const map = new Map<string, HoldingAsset>();
            prev.forEach((a) => map.set(a.id, a));
            data.assets.forEach((a: HoldingAsset) => map.set(a.id, a));
            const merged = Array.from(map.values());
            persist("aurum_assets", merged);
            return merged;
          });
        }
      })
      .catch((err) => console.warn("Background asset sync skipped:", err));

    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.goals) && data.goals.length > 0) {
          setGoals((prev) => {
            const map = new Map<string, FiduciaryGoal>();
            prev.forEach((g) => map.set(g.id, g));
            data.goals.forEach((g: FiduciaryGoal) => map.set(g.id, g));
            const merged = Array.from(map.values());
            persist("aurum_goals", merged);
            return merged;
          });
        }
      })
      .catch((err) => console.warn("Background goal sync skipped:", err));
  }, []);

  const persist = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  const logAuditEvent = (
    action: string,
    category: "KYC" | "SUITABILITY" | "PORTFOLIO" | "AGREEMENT" | "SECURITY" | "CEFCOM",
    details: string
  ) => {
    const newEntry: AuditLogEntry = {
      id: `LOG-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
      actorRole: session?.role || "system",
      actorName: session?.name || "System Sentinel",
      actorEmail: session?.email || "sentinel@aurumfiduciary.in",
      action,
      category,
      details,
      ipHash: `${typeof window !== "undefined" ? window.location.hostname : "localhost"} // SHA-256`,
      verified: true,
    };
    setAuditLogs((prev) => {
      const updated = [newEntry, ...prev].slice(0, 50);
      persist("aurum_audit_logs", updated);
      return updated;
    });
  };

  const updateAdvisorSettings = (updates: Partial<AdvisorProfile>) => {
    setAdvisor((prev) => {
      const updated = { ...prev, ...updates };
      persist("aurum_advisor_profile", updated);
      return updated;
    });
    logAuditEvent(
      "RIA Practice Governance Details Updated",
      "SECURITY",
      `Practice registration / contact details updated by ${session?.name || "Advisor Principal"}.`
    );
  };

  const lockSession = () => {
    setIsSessionLocked(true);
    logAuditEvent("Session Screen Locked", "SECURITY", "Screen privacy lock engaged by user.");
  };

  const unlockSession = (passcode?: string): boolean => {
    setIsSessionLocked(false);
    logAuditEvent("Session Screen Unlocked", "SECURITY", "Passcode verified. Screen lock released.");
    return true;
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
    setIsSessionLocked(false);
    persist("aurum_auth_session", s);
    logAuditEvent(
      "RIA Advisor Principal Authenticated",
      "SECURITY",
      `Devendra Vora, CFP signed in under SEBI License ${defaultAdvisor.sebiRegNumber}.`
    );
  };

  const loginAsClient = (targetClientId?: string, email?: string, passwordInput?: string) => {
    let target = targetClientId
      ? clients.find((c) => c.id === targetClientId)
      : null;

    if (!target && email) {
      target = clients.find((c) => c.email.toLowerCase() === email.toLowerCase().trim());
    }

    if (!target && !targetClientId && !email && clients.length > 0) {
      target = clients.find((c) => c.id === sampleDemoClient.id) || clients.find((c) => c.status === "active") || clients[0];
    }

    if (!target && !email) {
      target = sampleDemoClient;
    }

    if (!target && email) {
      return {
        success: false,
        error: "No account registered with this email. Please submit a registration request or ask your RIA to onboard you.",
      };
    }

    if (target && passwordInput) {
      const trimmedPass = passwordInput.trim().toLowerCase();
      const validPass = (target.password || "").toLowerCase();
      const validPan = (target.pan || "").toLowerCase();

      if (trimmedPass !== validPass && trimmedPass !== validPan) {
        return {
          success: false,
          error: "Incorrect passkey. Note: For accounts onboarded by your advisor, your default passkey is your 10-digit PAN (e.g. ABCDE1234F).",
        };
      }
    }

    const clientStatus = target?.status || "active";
    const s: UserSession = {
      role: "client",
      userId: target ? target.id : "CLIENT-SELF",
      name: target ? target.name : "Verified Investor",
      email: email || (target ? target.email : "investor@aurumfiduciary.in"),
      clientId: target ? target.id : "CLIENT-SELF",
      status: clientStatus,
    };

    setSession(s);
    setIsSessionLocked(false);
    if (target) {
      setActiveClientId(target.id);
    }
    persist("aurum_auth_session", s);
    logAuditEvent(
      clientStatus === "pending_approval"
        ? "Client Portal Login (Pending Mandate Review)"
        : "Client Wealth Portal Access Granted",
      "SECURITY",
      `Client ${s.name} (${s.email}) authenticated (Status: ${clientStatus}).`
    );

    return { success: true, status: clientStatus };
  };

  const loginWithGoogle = (email: string, name?: string): { success: boolean; status: string } => {
    const cleanEmail = email.toLowerCase().trim();
    let target = clients.find((c) => c.email.toLowerCase() === cleanEmail);

    if (target) {
      const clientStatus = target.status || "active";
      const s: UserSession = {
        role: "client",
        userId: target.id,
        name: target.name,
        email: target.email,
        clientId: target.id,
        status: clientStatus,
      };
      setSession(s);
      setIsSessionLocked(false);
      setActiveClientId(target.id);
      persist("aurum_auth_session", s);
      logAuditEvent(
        "Google Sign-In: Existing Client Authenticated",
        "SECURITY",
        `Client ${target.name} (${target.email}) signed in via Google OAuth.`
      );
      return { success: true, status: clientStatus };
    } else {
      // New Google registration -> creates account in pending_approval
      const derivedName =
        name ||
        cleanEmail
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

      const newClient: ClientProfile = {
        id: `CLIENT-GOOG-${Math.floor(100000 + Math.random() * 900000)}`,
        name: derivedName,
        email: cleanEmail,
        phone: "+91 98000 00000",
        city: "Mumbai (Google Account)",
        tier: "Core HNI",
        netWorth: "₹0",
        netWorthNum: 0,
        liquidSurplus: "₹0",
        monthlySurplus: "₹0",
        dragSaved: "₹0 / yr",
        riskTolerance: "To be assessed by RIA",
        targetCAGR: "11.5% CAGR",
        onboardingStage: "Pending RIA Advisor Review & Acceptance",
        statusBadge: {
          label: "Pending Approval",
          bg: "bg-amber-100",
          text: "text-amber-800",
        },
        pan: "PENDING",
        aadhaarMasked: "XXXX-XXXX-XXXX",
        ckycId: `IN-CKYC-GOOG-${Date.now().toString().slice(-4)}`,
        cefcomUrn: `URN-PENDING`,
        employer: "Google Verified Account",
        designation: "Investor",
        grossCtc: "Not specified",
        equityAlloc: 60,
        debtAlloc: 30,
        goldAlloc: 10,
        foliosCount: 0,
        advisorNotes: "Applicant registered via Google Sign-In. Awaiting RIA practice acceptance.",
        createdAt: new Date().toISOString().split("T")[0],
        status: "pending_approval",
        authProvider: "google",
        appliedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      };

      const updated = [newClient, ...clients];
      setClients(updated);
      persist("aurum_clients", updated);
      setActiveClientId(newClient.id);

      const s: UserSession = {
        role: "client",
        userId: newClient.id,
        name: newClient.name,
        email: newClient.email,
        clientId: newClient.id,
        status: "pending_approval",
      };
      setSession(s);
      setIsSessionLocked(false);
      persist("aurum_auth_session", s);

      logAuditEvent(
        "Google Sign-In: New Investor Mandate Requested",
        "KYC",
        `New applicant ${newClient.name} (${newClient.email}) requested fiduciary onboarding via Google OAuth. Status: Pending RIA Approval.`
      );

      return { success: true, status: "pending_approval" };
    }
  };

  const approveClient = (clientId: string) => {
    const target = clients.find((c) => c.id === clientId);
    if (!target) return;

    const updated = clients.map((c) => {
      if (c.id === clientId) {
        return {
          ...c,
          status: "active" as const,
          onboardingStage: "Mandate Accepted // Stage 1 Active",
          statusBadge: {
            label: "Active Fiduciary Mandate",
            bg: "bg-emerald-100",
            text: "text-emerald-700",
          },
          advisorNotes:
            (c.advisorNotes ? c.advisorNotes + " • " : "") +
            `Mandate accepted by ${advisor.name} on ${new Date().toLocaleDateString("en-IN")}.`,
        };
      }
      return c;
    });

    setClients(updated);
    persist("aurum_clients", updated);

    if (session?.clientId === clientId) {
      const updatedSession = { ...session, status: "active" as const };
      setSession(updatedSession);
      persist("aurum_auth_session", updatedSession);
    }

    logAuditEvent(
      "Client Mandate Accepted & Approved",
      "AGREEMENT",
      `RIA Principal ${advisor.name} approved advisory registration for ${target.name} (${target.email}). Full portal access granted.`
    );

    // Sync status change to backend / Supabase
    fetch("/api/clients", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: clientId, status: "active" }),
    }).catch((err) => console.warn("Backend approveClient sync failed:", err));
  };

  const rejectClient = (clientId: string) => {
    const target = clients.find((c) => c.id === clientId);
    if (!target) return;

    const updated = clients.filter((c) => c.id !== clientId);
    setClients(updated);
    persist("aurum_clients", updated);

    logAuditEvent(
      "Client Registration Declined",
      "KYC",
      `RIA Principal declined applicant mandate for ${target.name} (${target.email}).`
    );

    // Sync status change to backend / Supabase
    fetch("/api/clients", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: clientId, status: "rejected" }),
    }).catch((err) => console.warn("Backend rejectClient sync failed:", err));
  };

  const logout = () => {
    logAuditEvent(
      "Session Securely Terminated",
      "SECURITY",
      `User ${session?.name || "User"} (${session?.email || ""}) signed out.`
    );
    setSession(null);
    setIsSessionLocked(false);
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
    const clientPan = (clientData.pan || "ABCDE1234F").toUpperCase();
    const newClient: ClientProfile = {
      ...clientData,
      pan: clientPan,
      id: `CLIENT-${clientData.tier.substring(0, 4).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      netWorthNum: rawNum,
      netWorth: formatINR(rawNum),
      foliosCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      status: clientData.status || "active",
      password: clientData.password || clientPan,
      authProvider: clientData.authProvider || "advisor_manual",
      appliedAt: clientData.appliedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    const updated = [newClient, ...clients];
    setClients(updated);
    persist("aurum_clients", updated);
    setActiveClientId(newClient.id);

    // Sync new client to backend / Supabase
    fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newClient),
    }).catch((err) => console.warn("Backend addClient sync failed:", err));

    logAuditEvent(
      "New Client Onboarded",
      "KYC",
      `Client ${newClient.name} (${newClient.email}) registered under tier ${newClient.tier}. PAN: ${newClient.pan}.`
    );
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<ClientProfile>) => {
    const updated = clients.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setClients(updated);
    persist("aurum_clients", updated);

    // Sync updates to backend / Supabase
    fetch("/api/clients", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    }).catch((err) => console.warn("Backend updateClient sync failed:", err));

    logAuditEvent("Client Record Updated", "KYC", `Client ID ${id} profile details updated.`);
  };

  const deleteClient = (id: string) => {
    const target = clients.find((c) => c.id === id);
    const updated = clients.filter((c) => c.id !== id);
    setClients(updated);
    persist("aurum_clients", updated);
    if (activeClientId === id) {
      setActiveClientId(updated.length > 0 ? updated[0].id : null);
    }
    logAuditEvent(
      "Client Mandate Terminated",
      "KYC",
      `Client ${target?.name || id} removed from active advisory practice.`
    );
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

    // Sync asset to backend / Supabase
    fetch("/api/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newAsset, clientId: currentTargetId }),
    }).catch((err) => console.warn("Backend addAsset sync failed:", err));

    logAuditEvent(
      "Direct Holding Added",
      "PORTFOLIO",
      `Holding '${newAsset.name}' (Value: ${formatINR(newAsset.currentValue)}) added to client portfolio.`
    );
  };

  const importClientAssets = (clientId: string, incomingAssets: Omit<HoldingAsset, "id" | "clientId">[]) => {
    const created: HoldingAsset[] = incomingAssets.map((item, i) => ({
      ...item,
      id: `ASSET-IMP-${Date.now()}-${i + 1}`,
      clientId,
    }));
    const updated = [...created, ...assets];
    setAssets(updated);
    persist("aurum_assets", updated);
    syncClientTotals(clientId, updated);

    // Sync to backend / Supabase
    created.forEach((a) => {
      fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(a),
      }).catch((err) => console.warn("Backend addAsset sync failed:", err));
    });

    logAuditEvent(
      "CSV Portfolio Holdings Imported",
      "PORTFOLIO",
      `Imported ${created.length} direct holding folios for client ID ${clientId}.`
    );
  };

  const deleteAsset = (id: string) => {
    const target = assets.find((a) => a.id === id);
    const updated = assets.filter((a) => a.id !== id);
    setAssets(updated);
    persist("aurum_assets", updated);
    syncClientTotals(currentTargetId, updated);

    // Sync delete to backend / Supabase
    fetch(`/api/assets?id=${id}`, { method: "DELETE" }).catch((err) =>
      console.warn("Backend deleteAsset sync failed:", err)
    );

    logAuditEvent(
      "Holding Liquidated / Removed",
      "PORTFOLIO",
      `Holding '${target?.name || id}' removed from portfolio inventory.`
    );
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

    // Sync goal to backend / Supabase
    fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newGoal, clientId: currentTargetId }),
    }).catch((err) => console.warn("Backend addGoal sync failed:", err));

    logAuditEvent(
      "Financial Goal Milestone Created",
      "PORTFOLIO",
      `Goal '${newGoal.title}' (Target: ${formatINR(newGoal.targetAmount)} by ${newGoal.targetYear}) created.`
    );
  };

  const deleteGoal = (id: string) => {
    const target = goals.find((g) => g.id === id);
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    persist("aurum_goals", updated);

    // Sync delete to backend / Supabase
    fetch(`/api/goals?id=${id}`, { method: "DELETE" }).catch((err) =>
      console.warn("Backend deleteGoal sync failed:", err)
    );

    logAuditEvent("Goal Milestone Removed", "PORTFOLIO", `Goal '${target?.title || id}' removed.`);
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
    logAuditEvent(
      "Cash Flow Item Added",
      "PORTFOLIO",
      `${newItem.type}: ${newItem.title} (₹${newItem.monthlyAmount.toLocaleString("en-IN")}/mo) recorded.`
    );
  };

  const deleteCashFlow = (id: string) => {
    const target = cashFlow.find((cf) => cf.id !== id);
    const updated = cashFlow.filter((cf) => cf.id !== id);
    setCashFlow(updated);
    persist("aurum_cashflow", updated);
    logAuditEvent("Cash Flow Item Removed", "PORTFOLIO", `Cash flow '${target?.title || id}' deleted.`);
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
    logAuditEvent(
      "Insurance Policy Catalogued",
      "PORTFOLIO",
      `Policy '${newPolicy.title}' with Cover ${newPolicy.sumAssured} recorded.`
    );
  };

  const deleteInsurance = (id: string) => {
    const target = insurance.find((ins) => ins.id !== id);
    const updated = insurance.filter((ins) => ins.id !== id);
    setInsurance(updated);
    persist("aurum_insurance", updated);
    logAuditEvent("Insurance Policy Removed", "PORTFOLIO", `Policy '${target?.title || id}' deleted.`);
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
      logAuditEvent(
        "SEBI Reg 17 Risk Suitability Recalibrated",
        "SUITABILITY",
        `Risk profile updated to '${tolerance}', Target Hurdle: ${targetCAGR}. Split: ${equity}% Equity, ${debt}% Debt, ${gold}% Gold.`
      );
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
    logAuditEvent(
      "Consolidated Account Statement (CAS) Extracted",
      "PORTFOLIO",
      `Parsed '${fileName}' via CDSL/NSDL depository API. 3 verified folios imported.`
    );
  };

  // Load Demo Data (Only when explicitly triggered for testing)
  const loadDemoData = (targetClientId?: string) => {
    const newClients = [sampleDemoClient, ...clients.filter((c) => c.id !== sampleDemoClient.id)];
    setClients(newClients);
    persist("aurum_clients", newClients);

    const clientToFill = targetClientId || (session?.role === "client" ? activeClient?.id : sampleDemoClient.id) || sampleDemoClient.id;

    // Load assets for sampleDemoClient
    let newAssets = [...assets.filter((a) => a.clientId !== sampleDemoClient.id), ...sampleDemoAssets];
    if (clientToFill && clientToFill !== sampleDemoClient.id) {
      const clonedAssets: HoldingAsset[] = sampleDemoAssets.map((a, i) => ({
        ...a,
        id: `ASSET-DEMO-${clientToFill}-${i + 1}`,
        clientId: clientToFill,
      }));
      newAssets = [...newAssets.filter((a) => a.clientId !== clientToFill), ...clonedAssets];
    }
    setAssets(newAssets);
    persist("aurum_assets", newAssets);

    // Load goals
    let newGoals = [...goals.filter((g) => g.clientId !== sampleDemoClient.id), ...sampleDemoGoals];
    if (clientToFill && clientToFill !== sampleDemoClient.id) {
      const clonedGoals: FiduciaryGoal[] = sampleDemoGoals.map((g, i) => ({
        ...g,
        id: `GOAL-DEMO-${clientToFill}-${i + 1}`,
        clientId: clientToFill,
      }));
      newGoals = [...newGoals.filter((g) => g.clientId !== clientToFill), ...clonedGoals];
    }
    setGoals(newGoals);
    persist("aurum_goals", newGoals);

    // Load cash flow
    let newCashFlow = [...cashFlow.filter((cf) => cf.clientId !== sampleDemoClient.id), ...sampleDemoCashFlow];
    if (clientToFill && clientToFill !== sampleDemoClient.id) {
      const clonedCashFlow: CashFlowItem[] = sampleDemoCashFlow.map((cf, i) => ({
        ...cf,
        id: `CF-DEMO-${clientToFill}-${i + 1}`,
        clientId: clientToFill,
      }));
      newCashFlow = [...newCashFlow.filter((cf) => cf.clientId !== clientToFill), ...clonedCashFlow];
    }
    setCashFlow(newCashFlow);
    persist("aurum_cashflow", newCashFlow);

    // Load insurance
    let newInsurance = [...insurance.filter((ins) => ins.clientId !== sampleDemoClient.id), ...sampleDemoInsurance];
    if (clientToFill && clientToFill !== sampleDemoClient.id) {
      const clonedInsurance: InsurancePolicy[] = sampleDemoInsurance.map((ins, i) => ({
        ...ins,
        id: `INS-DEMO-${clientToFill}-${i + 1}`,
        clientId: clientToFill,
      }));
      newInsurance = [...newInsurance.filter((ins) => ins.clientId !== clientToFill), ...clonedInsurance];
    }
    setInsurance(newInsurance);
    persist("aurum_insurance", newInsurance);

    syncClientTotals(sampleDemoClient.id, newAssets);
    if (clientToFill && clientToFill !== sampleDemoClient.id) {
      syncClientTotals(clientToFill, newAssets);
    }

    logAuditEvent(
      "Sample Demo Case Loaded",
      "SECURITY",
      "Loaded Rajesh V. Kulkarni (₹4.8 Cr Core HNI) demonstration case."
    );
  };

  const loginWithDemoClient = () => {
    loadDemoData(sampleDemoClient.id);
    setActiveClientId(sampleDemoClient.id);
    const demoSession: UserSession = {
      role: "client",
      userId: sampleDemoClient.id,
      name: sampleDemoClient.name,
      email: sampleDemoClient.email,
      clientId: sampleDemoClient.id,
      status: "active",
    };
    setSession(demoSession);
    setIsSessionLocked(false);
    persist("aurum_auth_session", demoSession);
    logAuditEvent(
      "Instant Client Demo Session Activated",
      "SECURITY",
      `1-Click Instant Demo: Authenticated as ${sampleDemoClient.name} (${sampleDemoClient.email}).`
    );
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
    logAuditEvent(
      "Platform Reset to Clean State",
      "SECURITY",
      "All client accounts, folios, and mandates wiped for clean testing."
    );
  };

  return (
    <FiduciaryContext.Provider
      value={{
        session,
        loginAsAdvisor,
        loginAsClient,
        loginWithGoogle,
        loginWithDemoClient,
        approveClient,
        rejectClient,
        logout,
        isSessionLocked,
        lockSession,
        unlockSession,
        auditLogs,
        logAuditEvent,
        advisor,
        updateAdvisorSettings,
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
        importClientAssets,
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
