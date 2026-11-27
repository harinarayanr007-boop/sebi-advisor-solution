import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growvell | Content & Approval Portal",
  description: "Growvell brand content approvals, daily LinkedIn & X assets, and delivery studio.",
};

export default function GrowvellLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
