"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RiskRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/client/risk");
  }, [router]);
  return null;
}
