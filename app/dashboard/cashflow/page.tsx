"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CashflowRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/client/cashflow");
  }, [router]);
  return null;
}
