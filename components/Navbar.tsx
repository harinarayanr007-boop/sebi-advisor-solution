import React from "react";
import Link from "next/link";
import { Scale, ArrowRight, ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1E293B] bg-[#050B17]/90 backdrop-blur-md">
      {/* Top micro-bar for regulatory verification */}
      <div className="bg-[#030712] border-b border-slate-900 py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-400">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-[#C5A059]">
              <ShieldCheck className="h-3 w-3 mr-1 inline" />
              SEBI Registered Investment Adviser
            </span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-slate-300">Reg: INA000019842</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="font-mono text-slate-400 hidden sm:inline">BASL: BASL-1892</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 font-mono text-[10px] tracking-wide flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block mr-1.5 animate-pulse"></span>
              CeFCoM Gateway Active
            </span>
            <span className="text-slate-500 hidden md:inline">Pure Fee-Only • Zero Distribution Commissions</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded border border-[#C5A059]/80 bg-[#0A1226] flex items-center justify-center group-hover:border-[#DFC68E] transition-colors shadow-inner">
              <Scale className="h-5 w-5 text-[#C5A059] group-hover:text-[#DFC68E] transition-colors" />
            </div>
            <div>
              <span className="font-serif text-lg tracking-wider text-slate-100 font-bold block uppercase">
                Aurum Fiduciary
              </span>
              <span className="text-[10px] tracking-widest text-[#C5A059] uppercase block font-medium">
                Private Wealth Advisory
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-xs tracking-wider uppercase font-medium text-slate-300">
            <Link href="/#fiduciary-standard" className="hover:text-[#C5A059] transition-colors">
              Fiduciary Charter
            </Link>
            <Link href="/#framework" className="hover:text-[#C5A059] transition-colors">
              Advisory Framework
            </Link>
            <Link href="/#insights" className="hover:text-[#C5A059] transition-colors">
              Thought Leadership
            </Link>
            <Link href="/#fees" className="hover:text-[#C5A059] transition-colors">
              Statutory Fee Schedule
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/rpq"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded border border-[#C5A059] bg-gradient-to-r from-[#C5A059]/10 to-[#DFC68E]/20 text-[#DFC68E] text-xs font-semibold tracking-wide uppercase hover:from-[#C5A059]/20 hover:to-[#DFC68E]/30 hover:border-[#DFC68E] transition-all duration-200 shadow-sm group"
            >
              <span>Suitability Assessment</span>
              <ArrowRight className="h-3.5 w-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
