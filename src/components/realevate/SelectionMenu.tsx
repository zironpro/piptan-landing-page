"use client";

import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";

export interface CategoryItem {
  id: string;
  categoryKey: "by-the-sea" | "evergreen" | "urban-living" | "rare-gems";
  title: string;
  subtitle: string;
  cardColor: string;
  coverImage: string;
  ticket: string;
  targetIRR: string;
  corridors: string;
  summary: string;
  highlights: string[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "01",
    categoryKey: "by-the-sea",
    title: "By The Sea",
    subtitle: "Strategic Real Assets & Clean Energy",
    cardColor: "#1C1215",
    coverImage: "/images/infrastructure.jpg",
    ticket: "$15M – $80M",
    targetIRR: "18% – 24%",
    corridors: "Kenya · Rwanda · Morocco · Tanzania",
    summary:
      "Capitalizing high-barrier industrial infrastructure, commercial solar micro-grids, and automated dry port cold-chain facilities backed by long-term dollarized off-take contracts.",
    highlights: [
      "15-year dollarized Power Purchase Agreements (PPAs)",
      "Automated intermodal freight hubs under AfCFTA protocols",
      "Sovereign industrial concession security",
    ],
  },
  {
    id: "02",
    categoryKey: "evergreen",
    title: "Evergreen",
    subtitle: "Critical Minerals & Sovereign Concessions",
    cardColor: "#13231B",
    coverImage: "/images/corridors.jpg",
    ticket: "$30M – $150M",
    targetIRR: "24% – 32%",
    corridors: "DRC · Zambia · South Africa · Ghana",
    summary:
      "Direct investment into battery metal beneficiation, lithium processing, and green copper refining, moving Africa from raw ore extraction to high-margin domestic chemical processing.",
    highlights: [
      "Secured domestic mineral refining concessions",
      "Long-term off-take agreements with global battery manufacturers",
      "Direct sovereign royalty alignment & dispute protection",
    ],
  },
  {
    id: "03",
    categoryKey: "urban-living",
    title: "Urban Living",
    subtitle: "Pan-African Fintech & Digital Sovereign Rails",
    cardColor: "#360E13",
    coverImage: "/images/hero_africa.jpg",
    ticket: "$8M – $40M",
    targetIRR: "28% – 38%",
    corridors: "Nigeria · Kenya · Egypt · South Africa",
    summary:
      "Scaling the foundational rails of African digital finance: cross-border real-time gross settlement (RTGS), digital invoice factoring, and Tier-III edge data center infrastructure.",
    highlights: [
      "Eliminating 3–7% cross-border FX currency conversion friction",
      "Sub-4-second commercial B2B payment clearing",
      "45%+ annual revenue growth across enterprise clients",
    ],
  },
  {
    id: "04",
    categoryKey: "rare-gems",
    title: "Rare Gems",
    subtitle: "Institutional DIFC Wealth & Sovereign Syndicates",
    cardColor: "#1A1317",
    coverImage: "/images/boardroom.jpg",
    ticket: "$50M – $250M+",
    targetIRR: "Targeted Alpha",
    corridors: "Dubai DIFC · Abu Dhabi · Riyadh · London",
    summary:
      "Bespoke co-investment conduits pairing Gulf sovereign funds and high-net-worth family offices with transformational African national development assets under English Common Law.",
    highlights: [
      "Offshore SPVs structured under English Common Law in Dubai DIFC",
      "Zero corporate tax & unrestricted foreign capital repatriation",
      "Bilateral Investment Treaty (BIT) cross-jurisdiction enforcement",
    ],
  },
];

interface SelectionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: CategoryItem) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export default function SelectionMenu({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenAbout,
  onOpenContact,
}: SelectionMenuProps) {
  if (!isOpen) return null;

  return (
    <nav
      id="selection-menu"
      className="fixed inset-0 z-10 flex flex-col justify-between bg-[#ECE8E4] p-4 sm:p-8 md:p-12 overflow-hidden animate-in fade-in duration-300"
      aria-label="Our selection"
    >
      {/* 4 Realevate Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full h-[75svh] max-h-[800px] mt-2">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat)}
            className="group relative flex flex-col justify-between w-full h-full rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:brightness-105 border border-white/10"
            style={{ backgroundColor: cat.cardColor }}
          >
            {/* Top / Middle Panel: Monogram Symbol + Rotated Title + Desc */}
            <div className="relative flex-1 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
              {/* Monogram Symbol (matching realevate-symbol-white.svg) */}
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg border border-white/30 flex items-center justify-center text-white font-mono text-xs font-bold">
                  {cat.id}
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Center / Right Rotated Title (the iconic realevate vertical writing mode) */}
              <div className="absolute top-1/2 right-6 -translate-y-1/2 select-none pointer-events-none">
                <span className="vertical-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase opacity-90 group-hover:opacity-100 transition-opacity font-serif">
                  {cat.title}
                </span>
              </div>

              {/* Bottom Description */}
              <div className="relative z-10 max-w-[170px] sm:max-w-[190px] pt-8">
                <span className="text-xs sm:text-sm font-medium text-white/90 leading-snug block">
                  {cat.subtitle}
                </span>
                <span className="text-[10px] font-mono text-[#C5A867] uppercase block mt-1 font-semibold">
                  Target IRR: {cat.targetIRR}
                </span>
              </div>
            </div>

            {/* Bottom Image Cover with Soft Glare (matching realevate .selection-card__cover) */}
            <div className="relative w-full h-[22svh] min-h-[120px] overflow-hidden flex-shrink-0 bg-black/40">
              <Image
                src={cat.coverImage}
                alt={cat.title}
                fill
                unoptimized
                priority
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.18,0.13,0,0.99)] group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-60 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Preview Bar (matching realevate .selection-preview-bar) */}
      <div className="flex items-center justify-between w-full pt-4 pb-2 text-[#1A0A0C] border-t border-[#1A0A0C]/15 font-mono">
        <button
          onClick={onOpenAbout}
          className="link-underline text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1A0A0C] hover:text-[#BC2327] transition-colors"
        >
          About Piptan &amp; Tour
        </button>

        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-full border border-[#BC2327] text-xs font-semibold uppercase tracking-wider text-[#BC2327] hover:bg-[#BC2327] hover:text-white transition-all shadow-md"
        >
          Return to Stage
        </button>

        <button
          onClick={onOpenContact}
          className="link-underline text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1A0A0C] hover:text-[#BC2327] transition-colors"
        >
          Contact Delegation Liaison
        </button>
      </div>
    </nav>
  );
}
