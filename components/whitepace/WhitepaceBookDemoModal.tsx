"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ArrowRight, ShieldCheck, Phone, Calendar, Clock, Lock } from "lucide-react";

interface WhitepaceBookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhitepaceBookDemoModal({ isOpen, onClose }: WhitepaceBookDemoModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    entityName: "",
    phone: "",
    email: "",
    aumTier: "₹5 Cr – ₹15 Cr",
    objective: "Direct Plan Fee Savings & Portfolio Review"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Capt. Varma & Hari, I would like to schedule a confidential 30-minute wealth diagnostic for my family (${formData.name}, ${formData.entityName}). Liquid corpus category: ${formData.aumTier}. Objective: ${formData.objective}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[540px] rounded-2xl bg-[#043873] border-2 border-[#C4DEFD] shadow-2xl p-6 sm:p-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FFE492] text-xs font-bold uppercase mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>Confidential Fiduciary Consultation</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white">
              Schedule Your Private <br />
              <span className="text-[#FFE492]">Wealth Consultation</span>
            </h3>

            <p className="text-xs sm:text-sm text-white/80 mt-2">
              Review your existing portfolio with our lead fiduciary partners. Zero product pitches, zero sales pressure. Pure unconflicted advice.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">Your Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Vikram Malhotra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#021C3E] border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#4F9CF9]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">Family / Trust Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Malhotra Family Trust"
                    value={formData.entityName}
                    onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#021C3E] border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#4F9CF9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">WhatsApp / Phone</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#021C3E] border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#4F9CF9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">Family Investable Corpus</label>
                  <select
                    value={formData.aumTier}
                    onChange={(e) => setFormData({ ...formData, aumTier: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#021C3E] border border-white/20 text-white text-sm focus:outline-none focus:border-[#4F9CF9]"
                  >
                    <option value="₹1 Cr – ₹5 Cr">₹1 Cr – ₹5 Cr (Private Wealth)</option>
                    <option value="₹5 Cr – ₹15 Cr">₹5 Cr – ₹15 Cr (High Net Worth)</option>
                    <option value="₹15 Cr – ₹50 Cr">₹15 Cr – ₹50 Cr (Promoter & VHNW)</option>
                    <option value="₹50 Cr+">₹50 Cr+ (Family Office Mandate)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="name@personal.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#021C3E] border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#4F9CF9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">Primary Objective</label>
                <select
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#021C3E] border border-white/20 text-white text-sm focus:outline-none focus:border-[#4F9CF9]"
                >
                  <option value="Direct Plan Fee Savings & Portfolio Review">Direct Plan Fee Savings & Portfolio Review</option>
                  <option value="Startup Exit & Business Liquidity Planning">Startup Exit & Business Liquidity Planning</option>
                  <option value="Retirement Runway & Sovereign Cash Flow">Retirement Runway & Sovereign Cash Flow</option>
                  <option value="Family Living Trust & Estate Structuring">Family Living Trust & Estate Structuring</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-[#4F9CF9] hover:bg-[#3b82f6] text-white font-bold text-base flex items-center justify-center gap-2 transition shadow-xl"
              >
                <span>Confirm Confidential Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-white/60 flex items-center justify-center gap-1.5 pt-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict Non-Disclosure Guarantee • Zero distributor sales pitches</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              Consultation Confirmed
            </h3>

            <p className="text-sm text-white/80 max-w-[400px] mx-auto">
              Thank you, <span className="text-[#FFE492] font-semibold">{formData.name}</span>. Our founding partners will reach out within 2 hours to confirm your private 30-minute portfolio diagnostic.
            </p>

            <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-left text-xs space-y-1.5 max-w-[420px] mx-auto">
              <div className="flex justify-between text-white/70">
                <span>Family / Entity:</span>
                <span className="font-semibold text-white">{formData.entityName}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Corpus Category:</span>
                <span className="font-semibold text-white">{formData.aumTier}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Direct Contact:</span>
                <span className="font-semibold text-emerald-400">{formData.phone}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5 max-w-[420px] mx-auto">
              <a
                href={`https://wa.me/919345619420?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg"
              >
                <span>Direct WhatsApp with Founder Hari (+91 93456 19420)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-white/60 hover:text-white transition"
              >
                Return to Fiduciary Overview
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
