"use client";

import { X, Globe2, ShieldCheck, TrendingUp, MapPin, Building, ArrowRight } from "lucide-react";
import Image from "next/image";

interface AboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function AboutDrawer({ isOpen, onClose, onOpenContact }: AboutDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-end p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl h-full sm:h-[94vh] sm:rounded-3xl p-6 sm:p-10 bg-[#16080A] text-white shadow-2xl border border-[#BC2327]/30 overflow-y-auto flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#BC2327] text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A867] block font-bold">
              About Piptan
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight uppercase leading-none">
              Architects of Bilateral Capital.
            </h2>
            <p className="text-sm text-white/80 font-light leading-relaxed pt-2">
              Piptan Investment &amp; Securities operates at the nexus of Gulf institutional liquidity, global family wealth, and high-growth African development corridors.
            </p>
          </div>

          {/* Boardroom Photography */}
          <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-[#BC2327]/25 shadow-xl">
            <Image
              src="/images/boardroom.jpg"
              alt="Piptan Delegation Leadership"
              fill
              unoptimized
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16080A]/85 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 text-[10px] font-mono text-white/90">
              Dubai DIFC Headquarters · Cross-Border Syndicate Review
            </span>
          </div>

          {/* Core Mandate Grid */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-2xl font-black text-[#C5A867] block">$1.8B+</span>
              <span className="text-xs font-mono text-white/70 uppercase">
                Global Capital Deployed
              </span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="text-2xl font-black text-white block">14+</span>
              <span className="text-xs font-mono text-white/70 uppercase">
                Active Sovereign Corridors
              </span>
            </div>
          </div>

          {/* The Africa Delegation 2026 Narrative */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#C5A867] font-semibold">
              The Africa Investor Roadshow Mission
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Our executive leadership team is traveling across Africa to meet institutional asset managers, sovereign wealth representatives, and family offices. We structure direct co-investments into verified critical mineral refining, renewable industrial micro-grids, and pan-African payment switching infrastructure with full foreign capital repatriation protections under English Common Law.
            </p>
          </div>

          {/* Tour Stops */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">
              Tour Cities (November 2026)
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-[#BC2327]/20 border border-[#BC2327]/40 text-white">Nairobi (Nov 03–05)</span>
              <span className="px-2.5 py-1 rounded-md bg-[#BC2327]/20 border border-[#BC2327]/40 text-white">Kigali (Nov 07–09)</span>
              <span className="px-2.5 py-1 rounded-md bg-[#BC2327]/20 border border-[#BC2327]/40 text-white">Johannesburg (Nov 12–15)</span>
              <span className="px-2.5 py-1 rounded-md bg-[#BC2327]/20 border border-[#BC2327]/40 text-white">Lagos (Nov 18–21)</span>
              <span className="px-2.5 py-1 rounded-md bg-[#BC2327]/20 border border-[#BC2327]/40 text-white">Casablanca (Nov 24–26)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-white/60">
            Piptan Investment &amp; Securities
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#BC2327] text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-[#1A0A0C] transition-colors cursor-pointer shadow-lg"
          >
            <span>Schedule Briefing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
