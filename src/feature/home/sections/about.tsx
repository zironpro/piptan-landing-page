"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Globe2, 
  ArrowUpRight, 
  Award, 
  Compass, 
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  sub: string;
}

const STATS: StatItem[] = [
  {
    value: "$1.8B+",
    label: "Global Capital Deployed",
    sub: "Across bilateral luxury developments & sovereign corridors",
  },
  {
    value: "14+",
    label: "Sovereign Corridors",
    sub: "Direct presence across Europe, the Gulf & Africa",
  },
  {
    value: "99.4%",
    label: "Private Portfolio Retention",
    sub: "Ultra-high-net-worth clients & family offices",
  },
  {
    value: "25+ Yrs",
    label: "Institutional Heritage",
    sub: "Pioneering bespoke architectural & advisory standards",
  },
];

const PILLARS = [
  {
    icon: Building2,
    tag: "Architectural Distinction",
    title: "Rare & Curated Enclaves",
    description:
      "We source, develop, and broker only architectural landmarks and trophy parcels that redefine prime residential living.",
  },
  {
    icon: ShieldCheck,
    tag: "Discretion & Security",
    title: "Sovereign-Grade Fiduciary",
    description:
      "Every acquisition is structured under premier legal frameworks with complete confidentiality and tax-efficient syndication.",
  },
  {
    icon: TrendingUp,
    tag: "Yield & Appreciation",
    title: "Generational Wealth Preservation",
    description:
      "Data-driven advisory paired with boots-on-the-ground intelligence ensures enduring capital preservation across market cycles.",
  },
];

const TIMELINE = [
  {
    year: "2001",
    title: "Inception & Gulf Foundation",
    detail: "Established as a bespoke real estate advisory for distinguished private family estates.",
  },
  {
    year: "2012",
    title: "Cross-Border Expansion",
    detail: "Formed dual-corridor syndicates linking London, Zurich, and Dubai prime assets.",
  },
  {
    year: "2020",
    title: "Piptan Estates Flagship",
    detail: "Consolidated high-value residential development and private wealth placement.",
  },
  {
    year: "2026",
    title: "The Bilateral Horizon",
    detail: "Spearheading $1.8B+ across prime European retreats and high-growth African corridors.",
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"vision" | "heritage" | "governance">("vision");

  return (
<section
  id="about"
  className="relative z-10 w-full -mt-[12vh] pt-10 sm:pt-16 pb-28 sm:pb-36 bg-white text-[#111215] overflow-hidden"
>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-14 border-b border-black/[0.08]">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-[11px] font-mono uppercase tracking-[0.22em] text-[#6b7280]">
              <Sparkles className="w-3 h-3 text-[#bc2327]" />
              <span>Legacy &amp; Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#0f1115] leading-[1.12]">
              Architects of bilateral capital, catalysts of <span className="font-serif italic font-normal text-[#bc2327]">industrial growth</span>.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#525866] font-normal leading-relaxed">
            Piptan Investment &amp; Securities operates at the nexus of Gulf institutional capital, sovereign wealth, and high-growth African real asset corridors.
          </p>
        </div>

        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 items-center">
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-black/10 group">
              <Image
                src="/images/boardroom.jpg"
                alt="Piptan Delegation Leadership"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Tabs */}
          <div className="lg:col-span-6 space-y-8">
            {/* Interactive Tab Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-black/[0.04] border border-black/[0.06]">
              {(["vision", "heritage", "governance"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-white text-[#0f1115] shadow-sm font-semibold"
                      : "text-[#6b7280] hover:text-[#0f1115]"
                  }`}
                >
                  {tab === "vision" ? "Our Vision" : tab === "heritage" ? "Heritage" : "Governance"}
                </button>
              ))}
            </div>

            {/* Tab 1: Vision */}
            {activeTab === "vision" && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h3 className="text-2xl sm:text-3xl font-light text-[#0f1115]">
                  Redefining prime estates through <span className="font-serif italic text-[#bc2327]">meticulous curation</span>.
                </h3>
                <p className="text-sm sm:text-base text-[#525866] leading-relaxed">
                  We reject the commonplace. Every property in the Piptan portfolio undergoes a rigorous 140-point architectural, environmental, and financial assessment before presentation to our clients.
                </p>
                <ul className="space-y-3 pt-2">
                  {[
                    "Unmatched privacy and bespoke security standards",
                    "Sustainable architecture honoring natural topography",
                    "Direct access to off-market trophy estates and private islands",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#1f242e] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#bc2327] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab 2: Heritage */}
            {activeTab === "heritage" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-2xl sm:text-3xl font-light text-[#0f1115]">
                  Over a quarter-century of <span className="font-serif italic text-[#bc2327]">monumental milestones</span>.
                </h3>
                <div className="space-y-4 pt-2">
                  {TIMELINE.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 pb-3 border-b border-black/[0.06] last:border-0">
                      <span className="text-xs font-mono font-bold text-[#bc2327] pt-0.5 w-12 shrink-0">
                        {item.year}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-[#0f1115]">{item.title}</h4>
                        <p className="text-xs text-[#6b7280] mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Governance */}
            {activeTab === "governance" && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h3 className="text-2xl sm:text-3xl font-light text-[#0f1115]">
                  Fiduciary precision under <span className="font-serif italic text-[#bc2327]">English Common Law</span>.
                </h3>
                <p className="text-sm sm:text-base text-[#525866] leading-relaxed">
                  We guarantee total discretion and institutional rigor. Our bilateral transactional frameworks are optimized for sovereign wealth, institutional capital, and ultra-high-net-worth single family offices.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm">
                    <span className="text-xs font-mono text-[#bc2327] uppercase tracking-wider block font-semibold">Jurisdiction</span>
                    <p className="text-sm font-medium text-[#0f1115] mt-1">DIFC · ADGM · London</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm">
                    <span className="text-xs font-mono text-[#bc2327] uppercase tracking-wider block font-semibold">Compliance</span>
                    <p className="text-sm font-medium text-[#0f1115] mt-1">Full AML / KYC Fiduciary</p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA action */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#111215] hover:bg-[#bc2327] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02]"
              >
                <span>Discover Our Heritage</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-xs font-mono text-[#6b7280]">
                Private consultations available
              </span>
            </div>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-3xl bg-white border border-black/[0.07] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-black/[0.04] text-[#bc2327] flex items-center justify-center mb-6 group-hover:bg-[#bc2327] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#6b7280] block mb-2 font-medium">
                  {pillar.tag}
                </span>
                <h4 className="text-xl font-light text-[#0f1115] mb-3 group-hover:text-[#bc2327] transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-sm text-[#525866] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* High-Impact Statistics Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#111215] text-white relative overflow-hidden shadow-2xl border border-white/10">
          <div 
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#bc2327]/25 via-transparent to-transparent" 
            aria-hidden="true" 
          />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <div key={i} className={`${i > 0 ? "pt-6 lg:pt-0 lg:pl-8" : ""}`}>
                <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white block mb-1 font-serif">
                  {stat.value}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#c5a867] block font-semibold mb-1">
                  {stat.label}
                </span>
                <p className="text-xs text-white/60 leading-normal">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
