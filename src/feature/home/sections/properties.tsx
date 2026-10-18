"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  MapPin,
  Sparkles,
  Shield,
  CheckCircle,
} from "lucide-react";

export interface InvestmentAsset {
  id: string;
  category: "all" | "energy" | "minerals" | "logistics" | "fintech";
  title: string;
  tagline: string;
  location: string;
  country: string;
  ticketSize: string;
  targetIRR: string;
  structure: string;
  image: string;
  badge?: string;
  metrics: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
  };
  highlights: string[];
}

const CATEGORY_TABS = [
  { key: "all", label: "All Opportunities" },
  { key: "energy", label: "Clean Energy & Grid" },
  { key: "minerals", label: "Critical Minerals" },
  { key: "logistics", label: "Intermodal Logistics" },
  { key: "fintech", label: "Digital Clearing Rails" },
] as const;

const OPPORTUNITIES: InvestmentAsset[] = [
  {
    id: "asset-1",
    category: "energy",
    title: "Rift Valley Industrial Micro-Grid",
    tagline: "Utility-Scale Commercial Solar & Battery Storage",
    location: "Nakuru Industrial Park",
    country: "Kenya",
    ticketSize: "$45,000,000",
    targetIRR: "21.4%",
    structure: "15-Yr Dollarized PPA",
    image: "/images/infrastructure.jpg",
    badge: "Sovereign Backed",
    metrics: {
      label1: "Capacity",
      val1: "65 MW + 120 MWh",
      label2: "Off-Taker",
      val2: "Industrial Anchor Syndicates",
    },
    highlights: [
      "Secured 15-year dollar-pegged Power Purchase Agreements",
      "Full foreign capital repatriation rights under English Common Law",
      "MIGA / DFI political risk insurance backed",
    ],
  },
  {
    id: "asset-2",
    category: "minerals",
    title: "Copperbelt Green Cathode Beneficiation",
    tagline: "High-Margin Battery Chemical Smelting & Refining",
    location: "Ndola Special Economic Zone",
    country: "Zambia",
    ticketSize: "$85,000,000",
    targetIRR: "28.5%",
    structure: "Senior Secured Debt & Equity",
    image: "/images/corridors.jpg",
    badge: "Direct Concession",
    metrics: {
      label1: "Purity Grade",
      val1: "99.99% Grade A LME",
      label2: "Off-Take",
      val2: "10-Yr Tier-1 EV OEM Contract",
    },
    highlights: [
      "Domestic value-add beneficiation bypassing raw export tariffs",
      "Direct 10-year off-take with international EV battery consortia",
      "Sovereign royalty tax optimization & dispute arbitration in London",
    ],
  },
  {
    id: "asset-3",
    category: "logistics",
    title: "Kigali Gateway Dry Port & Cold Hub",
    tagline: "Automated AfCFTA Regional Clearing Terminal",
    location: "Kigali Logistics Hub",
    country: "Rwanda",
    ticketSize: "$35,000,000",
    targetIRR: "19.8%",
    structure: "25-Yr Concession SPV",
    image: "/images/hero_africa.jpg",
    badge: "Trade Corridor",
    metrics: {
      label1: "Annual Throughput",
      val1: "150,000 TEU",
      label2: "Corridor",
      val2: "Central African Multimodal Link",
    },
    highlights: [
      "Customs pre-clearance integration with Mombasa & Dar es Salaam",
      "Temperature-controlled pharmaceutical & agribusiness cold chain",
      "Tax holiday and 100% foreign ownership framework",
    ],
  },
  {
    id: "asset-4",
    category: "fintech",
    title: "AfriSwitch Cross-Border Settlement Rail",
    tagline: "Pan-African B2B Multi-Currency Clearing Engine",
    location: "Lagos ⇄ Nairobi Hub",
    country: "Regional",
    ticketSize: "$50,000,000",
    targetIRR: "32.0%",
    structure: "Series B Growth Equity",
    image: "/images/boardroom.jpg",
    badge: "High Growth",
    metrics: {
      label1: "Clearing Speed",
      val1: "< 3.2 Seconds",
      label2: "Annual Volume",
      val2: "$1.4B B2B Settlement",
    },
    highlights: [
      "Direct liquidity corridors bypassing costly correspondent banking",
      "Licensed across 6 Central Banks under AfCFTA PAPSS framework",
      "Strategic Gulf banking syndicate co-investment participation",
    ],
  },
  {
    id: "asset-5",
    category: "logistics",
    title: "Casablanca Maritime Gateway Expansion",
    tagline: "Deep-Water Container Logistics & Free Zone Depot",
    location: "Tanger-Med / Casablanca",
    country: "Morocco",
    ticketSize: "$65,000,000",
    targetIRR: "18.6%",
    structure: "Infrastructure Co-Investment",
    image: "/images/hero_africa.jpg",
    badge: "EU Gateway",
    metrics: {
      label1: "Berth Depth",
      val1: "16.5m Post-Panamax",
      label2: "Connectivity",
      val2: "Direct Mediterranean & Atlantic",
    },
    highlights: [
      "Strategic transshipment hub linking West Africa and European Union",
      "Zero-carbon electrified gantry crane operations",
      "Dollar & Euro denominated long-term concession tariffs",
    ],
  },
  {
    id: "asset-6",
    category: "minerals",
    title: "Katanga Lithium Beneficiation SPV",
    tagline: "Hard-Rock Lithium Hydroxide Conversion Facility",
    location: "Kolwezi Mining Corridor",
    country: "DRC",
    ticketSize: "$110,000,000",
    targetIRR: "31.2%",
    structure: "Syndicated Project Financing",
    image: "/images/infrastructure.jpg",
    badge: "Strategic Metal",
    metrics: {
      label1: "Resource Life",
      val1: "22+ Years Proven",
      label2: "ESG Standard",
      val2: "Equator Principles Compliant",
    },
    highlights: [
      "Hydroelectric powered processing facility with ultra-low carbon footprint",
      "Bankable feasibility study vetted by top-tier international consultants",
      "Bilateral investment treaty protection with DIFC holding entity",
    ],
  },
];

export default function PropertiesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedAsset, setSelectedAsset] = useState<InvestmentAsset | null>(null);

  const filteredAssets =
    activeCategory === "all"
      ? OPPORTUNITIES
      : OPPORTUNITIES.filter((p) => p.category === activeCategory);

  return (
    <section
      id="properties"
      className="relative z-10 w-full pt-16 sm:pt-24 pb-28 sm:pb-36 bg-white text-[#111215] overflow-hidden border-t border-black/5"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 pb-10 md:pb-12 border-b border-black/[0.08]">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-[11px] font-mono uppercase tracking-[0.22em] text-[#6b7280]">
              <Sparkles className="w-3 h-3 text-[#bc2327]" />
              <span>Investment Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#0f1115] leading-[1.12]">
              Sovereign-grade assets,{" "}
              <span className="font-serif italic font-normal text-[#bc2327]">
                verified growth corridors
              </span>.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#525866] font-normal leading-relaxed">
            Every transaction within the Piptan pipeline is vetted for structural de-risking, long-term foreign currency cash flows, and institutional capital preservation.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 pb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-black/[0.03] border border-black/[0.06]">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#111215] text-white shadow-md font-semibold"
                      : "text-[#6b7280] hover:text-[#0f1115] hover:bg-black/[0.03]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Counter Badge */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#6b7280]">
            <span className="w-2 h-2 rounded-full bg-[#bc2327]" />
            <span>Showing {filteredAssets.length} Active Co-Investment Mandates</span>
          </div>
        </div>

        {/* Properties Grid (Full-bleed photographic cards matching reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAssets.map((asset) => (
            <article
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="group relative rounded-lg overflow-hidden aspect-[4/5] sm:aspect-[3/4] shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between p-7 sm:p-9 border border-black/10 select-none"
            >
              {/* Background Full-Bleed Image */}
              <Image
                src={asset.image}
                alt={asset.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 group-hover:via-black/25 transition-all duration-500" />

              {/* Top Area: Large Bold Headline (Matching reference "Mortgage Services", "Property Management", etc.) */}
              <div className="relative z-10 max-w-[16ch]">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c5a867] block mb-2 font-semibold">
                  {asset.country} &middot; {asset.category.toUpperCase()}
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-[1.15]">
                  {asset.title}
                </h3>
              </div>

              {/* Bottom Area: Frosted Oval Pill "Learn More ->" Button (Matching reference) */}
              <div className="relative z-10 flex items-end justify-between">
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#BC2327] backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 group-hover:bg-white group-hover:text-[#111215] shadow-lg">
                  <span>Learn More</span>
                  <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </div>

                <div className="text-right text-white/90">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">Target IRR</span>
                  <span className="text-base sm:text-lg font-light font-serif text-[#c5a867] font-semibold">{asset.targetIRR}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Portfolio Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-black/[0.02] border border-black/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#bc2327]/10 text-[#bc2327] flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-[#0f1115]">
                Bilateral Co-Investment SPV Structure
              </h4>
              <p className="text-xs sm:text-sm text-[#6b7280] mt-0.5">
                All participant allocations are ring-fenced through DIFC / English Common Law SPVs with sovereign protection.
              </p>
            </div>
          </div>

          <a
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-full bg-[#111215] hover:bg-[#bc2327] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02]"
          >
            Schedule Investor Briefing
          </a>
        </div>
      </div>

      {/* Modal / Quick View Drawer for Selected Asset */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#bc2327] font-semibold">
                  {selectedAsset.location} · {selectedAsset.country}
                </span>
                <h3 className="text-2xl font-light text-[#0f1115] mt-1">
                  {selectedAsset.title}
                </h3>
                <p className="text-xl font-serif text-[#0f1115] mt-1 font-semibold">
                  {selectedAsset.ticketSize} · Target IRR {selectedAsset.targetIRR}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#111215] transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden">
              <Image
                src={selectedAsset.image}
                alt={selectedAsset.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center py-3 bg-black/[0.02] rounded-xl border border-black/5">
              <div>
                <span className="text-[10px] font-mono text-[#6b7280] uppercase">Target Return</span>
                <p className="text-sm font-semibold text-[#bc2327]">{selectedAsset.targetIRR} Net IRR</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#6b7280] uppercase">Syndicate Size</span>
                <p className="text-sm font-semibold text-[#0f1115]">{selectedAsset.ticketSize}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono text-[#6b7280] uppercase">Legal SPV</span>
                <p className="text-sm font-semibold text-[#0f1115]">DIFC Common Law</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6b7280] block font-semibold">
                Investment Highlights
              </span>
              <ul className="space-y-2">
                {selectedAsset.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#1f242e]">
                    <CheckCircle className="w-4 h-4 text-[#bc2327] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="px-5 py-2.5 rounded-full border border-black/10 text-xs font-semibold uppercase tracking-wider text-[#111215] hover:bg-black/5 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Executive briefing requested for ${selectedAsset.title}. Our delegation will contact your office.`);
                  setSelectedAsset(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#bc2327] hover:bg-[#a11c20] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Request Confidential Teaser
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
