import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Prototypes | Hari Narayan | Advisor Solution",
  description:
    "Interactive fintech onboarding desks, custom wealth management websites, and private client portals engineered by Hari Narayan.",
};

export default function PrototypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
