"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFiduciary } from "@/context/FiduciaryContext";

export default function DashboardRedirect() {
  const router = useRouter();
  const { session } = useFiduciary();

  useEffect(() => {
    if (session?.role === "advisor") {
      router.replace("/advisor/dashboard");
    } else if (session?.role === "client") {
      router.replace("/client/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router, session]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6 text-center">
      <div className="space-y-3">
        <div className="w-10 h-10 border-4 border-[#1814F3] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-[#718EBF]">Redirecting to authorized portal...</p>
      </div>
    </div>
  );
}
