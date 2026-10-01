"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface RPQData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  horizon: string;
  netWorth: string; // 'under_50l' | '50l_to_2cr' | '2cr_to_10cr' | 'above_10cr'
  income: string;
  experience: string;
  drawdownReaction: string;
  objective: string;
  liquidityNeed: string;
  riskScore: number;
  riskTier: "Conservative Capital Preservation" | "Balanced Strategic Growth" | "Aggressive Capital Accretion";
  riskProfile?: string;
  isQualified: boolean;
  completedAt?: string;
}

export interface KYCData {
  aadhaarNumber: string;
  otp: string;
  isVerified: boolean;
  verifiedAt: string | null;
  cKycNumber: string | null;
  maskedPan: string | null;
  registeredAddress: string | null;
}

export interface AgreementData {
  isSigned: boolean;
  signedAt: string | null;
  signatureDataUrl: string | null;
  agreementPdfUrl: string | null;
  downloadUrl?: string | null;
  agreementHash?: string | null;
  termsAccepted: boolean;
  clientId: string;
}

export interface PaymentData {
  feeModel: "Fixed" | "AUA";
  amount: number;
  transactionId: string | null;
  isPaid: boolean;
  paidAt: string | null;
  cefcomUrn: string | null;
}

interface OnboardingContextType {
  rpq: RPQData | null;
  kyc: KYCData;
  agreement: AgreementData;
  payment: PaymentData;
  currentStep: number;
  setRPQ: (data: RPQData) => void;
  setKYC: (data: Partial<KYCData>) => void;
  setAgreement: (data: Partial<AgreementData>) => void;
  setPayment: (data: Partial<PaymentData>) => void;
  setCurrentStep: (step: number) => void;
  resetOnboarding: () => void;
}

const defaultKYC: KYCData = {
  aadhaarNumber: "",
  otp: "",
  isVerified: false,
  verifiedAt: null,
  cKycNumber: null,
  maskedPan: null,
  registeredAddress: null,
};

const defaultAgreement: AgreementData = {
  isSigned: false,
  signedAt: null,
  signatureDataUrl: null,
  agreementPdfUrl: null,
  termsAccepted: false,
  clientId: "AURUM-HNI-" + Math.floor(100000 + Math.random() * 900000),
};

const defaultPayment: PaymentData = {
  feeModel: "Fixed",
  amount: 147500, // ₹1,25,000 + 18% GST = ₹1,47,500
  transactionId: null,
  isPaid: false,
  paidAt: null,
  cefcomUrn: null,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [rpq, setRpqState] = useState<RPQData | null>(null);
  const [kyc, setKycState] = useState<KYCData>(defaultKYC);
  const [agreement, setAgreementState] = useState<AgreementData>(defaultAgreement);
  const [payment, setPaymentState] = useState<PaymentData>(defaultPayment);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Restore from sessionStorage on client load if present
  useEffect(() => {
    try {
      const savedRPQ = sessionStorage.getItem("aurum_rpq");
      if (savedRPQ) setRpqState(JSON.parse(savedRPQ));
      const savedKYC = sessionStorage.getItem("aurum_kyc");
      if (savedKYC) setKycState(JSON.parse(savedKYC));
      const savedAgreement = sessionStorage.getItem("aurum_agreement");
      if (savedAgreement) setAgreementState(JSON.parse(savedAgreement));
      const savedPayment = sessionStorage.getItem("aurum_payment");
      if (savedPayment) setPaymentState(JSON.parse(savedPayment));
      const savedStep = sessionStorage.getItem("aurum_step");
      if (savedStep) setCurrentStep(parseInt(savedStep, 10));
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  const setRPQ = (data: RPQData) => {
    setRpqState(data);
    try {
      sessionStorage.setItem("aurum_rpq", JSON.stringify(data));
    } catch {}
  };

  const setKYC = (data: Partial<KYCData>) => {
    setKycState((prev) => {
      const updated = { ...prev, ...data };
      try {
        sessionStorage.setItem("aurum_kyc", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const setAgreement = (data: Partial<AgreementData>) => {
    setAgreementState((prev) => {
      const updated = { ...prev, ...data };
      try {
        sessionStorage.setItem("aurum_agreement", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const setPayment = (data: Partial<PaymentData>) => {
    setPaymentState((prev) => {
      const updated = { ...prev, ...data };
      try {
        sessionStorage.setItem("aurum_payment", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const setStep = (step: number) => {
    setCurrentStep(step);
    try {
      sessionStorage.setItem("aurum_step", step.toString());
    } catch {}
  };

  const resetOnboarding = () => {
    setRpqState(null);
    setKycState(defaultKYC);
    setAgreementState({ ...defaultAgreement, clientId: "AURUM-HNI-" + Math.floor(100000 + Math.random() * 900000) });
    setPaymentState(defaultPayment);
    setCurrentStep(1);
    try {
      sessionStorage.removeItem("aurum_rpq");
      sessionStorage.removeItem("aurum_kyc");
      sessionStorage.removeItem("aurum_agreement");
      sessionStorage.removeItem("aurum_payment");
      sessionStorage.removeItem("aurum_step");
    } catch {}
  };

  return (
    <OnboardingContext.Provider
      value={{
        rpq,
        kyc,
        agreement,
        payment,
        currentStep,
        setRPQ,
        setKYC,
        setAgreement,
        setPayment,
        setCurrentStep: setStep,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
