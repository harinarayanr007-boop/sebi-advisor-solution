import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { OnboardingProvider } from "@/context/OnboardingContext";
import { FiduciaryProvider } from "@/context/FiduciaryContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurum Fiduciary | SEBI Registered Investment Adviser (INA000015678)",
  description:
    "Pure fee-only fiduciary wealth management for HNIs, family offices, and NRI portfolios. Zero product commissions, zero distribution bias. SEBI RIA INA000015678 | BASL 1892.",
  keywords: [
    "SEBI Registered Investment Adviser",
    "Fee-Only Financial Planner",
    "SEBI RIA Mumbai",
    "Fiduciary Wealth Management",
    "Direct Mutual Fund Advisory",
    "HNI Portfolio Audit",
    "NRI Wealth Advisory",
  ],
  authors: [{ name: "Dr. Aurum Mamal" }],
  openGraph: {
    title: "Aurum Fiduciary | SEBI Registered Investment Adviser",
    description:
      "Pure fee-only fiduciary wealth management for high-net-worth families. SEBI RIA INA000015678.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${roboto.variable} h-full antialiased light`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#030a03] font-sans selection:bg-[#1e90ff]/20 selection:text-[#1e90ff]">
        <OnboardingProvider>
          <FiduciaryProvider>
            <main className="flex-1 flex flex-col w-full">{children}</main>
          </FiduciaryProvider>
        </OnboardingProvider>
      </body>
    </html>
  );
}
