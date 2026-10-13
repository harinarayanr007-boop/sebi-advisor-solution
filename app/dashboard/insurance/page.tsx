"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InsuranceRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/client/insurance");
  }, [router]);
  return null;
}
