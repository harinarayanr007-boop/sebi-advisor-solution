"use client";

import React from "react";
import Link from "next/link";
import { Scale, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-2 px-4 sm:px-6 pointer-events-none">
      <div className="mx-auto max-w-5xl pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-full px-4 sm:px-6 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-between gap-4 transition-all">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-red-600 transition-colors shadow-sm">
              <Scale className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-sm tracking-tight text-slate-900">
                  Aurum Fiduciary
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60 hidden sm:inline-flex items-center">
                  <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                  RIA
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-tight hidden sm:block">
                SEBI Reg: INA000019842
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-medium text-slate-600">
            <Link
              href="/#mandates"
              className="hover:text-slate-900 transition-colors"
            >
              Fiduciary Mandates
            </Link>
            <Link
              href="/#comparison"
              className="hover:text-slate-900 transition-colors"
            >
              Fee Transparency
            </Link>
            <Link
              href="/#calculator"
              className="hover:text-slate-900 transition-colors"
            >
              Fee Drag Calculator
            </Link>
            <Link
              href="/charter"
              className="hover:text-slate-900 transition-colors"
            >
              Investor Charter
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2.5">
            <Link
              href="/book"
              className="btn-primary-pill inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs font-semibold tracking-tight shadow-md group"
            >
              <span>Consult Now</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
