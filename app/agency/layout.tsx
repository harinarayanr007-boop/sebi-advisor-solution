import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advisor Solution | Sovereign Intake Desks & Client Portals for SEBI RIAs",
  description:
    "We engineer high-trust digital intake desks, sovereign client portals, and institutional rebrands for SEBI Registered Investment Advisers, boutique wealth managers, and loan consultants.",
};

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
