"use client";

import { useState } from "react";
import { X, Calendar, CheckCircle2, Download, ShieldCheck, Mail, Building, User, MapPin } from "lucide-react";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    location: "Nairobi (Nov 03–05)",
    ticketSize: "$25M – $100M",
    sector: "Strategic Real Assets & Clean Energy",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-end p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl h-full sm:h-[94vh] sm:rounded-3xl p-6 sm:p-10 bg-white text-[#1A0A0C] shadow-2xl border border-[#BC2327]/20 overflow-y-auto flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#1A0A0C]/5 hover:bg-[#BC2327] hover:text-white text-[#1A0A0C] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6 pt-2">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#BC2327] block font-bold">
                Executive Investor Session
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight uppercase leading-none text-[#1A0A0C]">
                Connect With The Delegation.
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6668] font-light leading-relaxed pt-1">
                Schedule a confidential, in-person briefing with Piptan’s leadership during our African tour or request the Confidential Investment Memorandum.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1A0A0C] mb-1.5 font-bold">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#7A6668]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#1A0A0C]/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1A0A0C] placeholder-[#7A6668] focus:outline-none focus:border-[#BC2327]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1A0A0C] mb-1.5 font-bold">
                    Institutional Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#7A6668]" />
                    <input
                      type="email"
                      required
                      placeholder="david@sovereign-lp.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#1A0A0C]/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1A0A0C] placeholder-[#7A6668] focus:outline-none focus:border-[#BC2327]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1A0A0C] mb-1.5 font-bold">
                    Institution / Family Office *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-[#7A6668]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Crown Sovereign Capital"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#1A0A0C]/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1A0A0C] placeholder-[#7A6668] focus:outline-none focus:border-[#BC2327]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1A0A0C] mb-1.5 font-bold">
                    Preferred Meeting Stop *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#7A6668]" />
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#1A0A0C]/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1A0A0C] focus:outline-none focus:border-[#BC2327] appearance-none"
                    >
                      <option value="Nairobi (Nov 03–05)">Nairobi (Kenya) · Nov 03–05</option>
                      <option value="Kigali (Nov 07–09)">Kigali (Rwanda) · Nov 07–09</option>
                      <option value="Johannesburg (Nov 12–15)">Johannesburg (South Africa) · Nov 12–15</option>
                      <option value="Lagos (Nov 18–21)">Lagos (Nigeria) · Nov 18–21</option>
                      <option value="Casablanca (Nov 24–26)">Casablanca (Morocco) · Nov 24–26</option>
                      <option value="Dubai DIFC (UAE HQ)">Dubai DIFC HQ (UAE)</option>
                      <option value="Virtual Private Briefing">Virtual Confidential Briefing</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1A0A0C] mb-1.5 font-bold">
                    Anticipated Allocation Tier
                  </label>
                  <select
                    value={formData.ticketSize}
                    onChange={(e) => setFormData({ ...formData, ticketSize: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#1A0A0C]/15 rounded-xl px-4 py-2.5 text-xs text-[#1A0A0C] focus:outline-none focus:border-[#BC2327]"
                  >
                    <option value="$5M – $25M">$5M – $25M (Direct Deal)</option>
                    <option value="$25M – $100M">$25M – $100M (Institutional Co-Investment)</option>
                    <option value="$100M+">$100M+ (Sovereign Mandate)</option>
                    <option value="Advisory Only">Wealth &amp; Offshore Structuring Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1A0A0C] mb-1.5 font-bold">
                    Primary Sector Focus
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#1A0A0C]/15 rounded-xl px-4 py-2.5 text-xs text-[#1A0A0C] focus:outline-none focus:border-[#BC2327]"
                  >
                    <option value="Strategic Real Assets & Clean Energy">By The Sea: Real Assets &amp; Energy</option>
                    <option value="Critical Minerals & Sovereign Concessions">Evergreen: Critical Minerals</option>
                    <option value="Pan-African Fintech & Digital Rails">Urban Living: Fintech &amp; BaaS</option>
                    <option value="Institutional DIFC Wealth & Sovereign Syndicates">Rare Gems: Sovereign Syndication</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#1A0A0C] mb-1.5 font-bold">
                  Specific Investment Topics (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share details regarding your investment mandate or specific questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#1A0A0C]/15 rounded-xl p-3 text-xs text-[#1A0A0C] placeholder-[#7A6668] focus:outline-none focus:border-[#BC2327]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-[#7A6668]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Strict NDA &amp; Institutional Governance</span>
                </div>

                <button
                  type="submit"
                  className="px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#BC2327] hover:bg-[#1A0A0C] hover:text-[#C5A867] transition-all shadow-lg cursor-pointer"
                >
                  Submit &amp; Access Deck
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#BC2327]/10 text-[#BC2327] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#BC2327] tracking-widest block font-bold">
                Session Requested
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A0A0C]">
                Confirmed for {formData.location}
              </h3>
              <p className="text-sm text-[#7A6668] font-light max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#1A0A0C]">{formData.name}</strong>. Piptan&apos;s delegation coordinator will contact <strong className="text-[#1A0A0C]">{formData.email}</strong> to coordinate your meeting slot.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#1A0A0C]/15 max-w-md mx-auto flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs font-bold text-[#1A0A0C] block">
                  Piptan Africa 2026 Pitch Deck
                </span>
                <span className="text-[10px] font-mono text-[#7A6668]">
                  PDF · 24 Pages · Confidential Memorandum
                </span>
              </div>
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Confidential Pitch Deck link sent to " + formData.email);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#BC2327] text-white text-xs font-bold hover:bg-[#1A0A0C] hover:text-[#C5A867] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#FAF8F5] border border-[#1A0A0C]/20 text-xs text-[#1A0A0C] uppercase font-mono tracking-wider hover:bg-[#BC2327] hover:text-white transition-colors cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
