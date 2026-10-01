import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OnboardingProvider } from "@/context/OnboardingContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurum Fiduciary Advisory | SEBI Registered Investment Adviser (RIA)",
  description:
    "Institutional Fee-Only Wealth Advisory & Fiduciary Capital Allocation for Select Indian Family Offices & Ultra-HNIs. SEBI Reg: INA000019842. Zero commissions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050B17] text-slate-100 font-sans selection:bg-[#C5A059]/20 selection:text-[#DFC68E]">
        <OnboardingProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </OnboardingProvider>
      </body>
    </html>
  );
}
