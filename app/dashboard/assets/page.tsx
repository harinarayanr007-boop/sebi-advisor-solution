"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AssetsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/client/assets");
  }, [router]);
  return null;
}
