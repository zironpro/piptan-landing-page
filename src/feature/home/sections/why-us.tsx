"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Scale,
  Users2,
  Lock,
  Globe2,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Building,
  Coins,
} from "lucide-react";

interface AdvantageCard {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  stat: string;
  statLabel: string;
  points: string[];
}

const ADVANTAGES: AdvantageCard[] = [
  {
    id: "fiduciary",
    category: "Legal & Fiduciary",
    title: "English Common Law Ring-Fencing",
    description:
      "All bilateral capital structures are domiciled under DIFC, ADGM, or LCIA jurisdictions with enforceable creditor and equity rights.",
    icon: Scale,
    stat: "100%",
    statLabel: "Repatriation Rights",
    points: [
      "No currency transfer restriction barriers",
      "Multilateral Investment Guarantee (MIGA) eligible",
      "Ring-fenced SPVs per sovereign project asset",
    ],
  },
  {
    id: "syndication",
    category: "Capital Power",
    title: "Gulf Institutional Syndicate Liquidity",
    description:
      "Direct co-investment syndicate access partnering with Tier-1 sovereign wealth funds, family offices, and sovereign development banks.",
    icon: Coins,
    stat: "$1.8B+",
    statLabel: "Deployed Mandates",
    points: [
      "Bespoke ticket sizing from $15M to $150M+",
      "Direct sovereign ministry alignment",
      "Pre-negotiated anchor LP equity commitments",
    ],
  },
  {
    id: "derisking",
    category: "De-Risking",
    title: "Dollarized Long-Term Cash Flows",
    description:
      "Every infrastructure and industrial asset operates under 15-to-25 year sovereign dollar or euro-pegged off-take agreements.",
    icon: TrendingUp,
    stat: "18%–32%",
    statLabel: "Target Net IRR",
    points: [
      "Dollar-indexed tariff escalation clauses",
      "Inflation & exchange-rate hedged cash flows",
      "Guaranteed priority sovereign grid dispatch",
    ],
  },
  {
    id: "execution",
    category: "Ground Intelligence",
    title: "Boots-on-the-Ground Sovereign Corridors",
    description:
      "Decades of direct ministerial, port authority, and regulatory relationships across Kenya, Rwanda, Zambia, DRC, Morocco, and South Africa.",
    icon: Globe2,
    stat: "14+",
    statLabel: "Active Corridors",
    points: [
      "Fast-track regulatory licensing & environmental permits",
      "Bespoke local stakeholder equity alignment",
      "Zero reliance on intermediary brokers",
    ],
  },
];

const COMPARISONS = [
  {
    feature: "Jurisdiction & Dispute Resolution",
    piptan: "DIFC / ADGM / London LCIA (English Common Law)",
    traditional: "Fragmented local courts with high delay risk",
  },
  {
    feature: "Currency & Repatriation Security",
    piptan: "100% Dollarized / Euro contracts with offshore accounts",
    traditional: "Local currency volatility & trapped foreign exchange",
  },
  {
    feature: "Off-Take Agreements",
    piptan: "15–25 Year sovereign & multinational backed PPAs",
    traditional: "Merchant risk & short-term commercial contracts",
  },
  {
    feature: "Co-Investment Partnering",
    piptan: "Direct syndicate parity alongside Gulf sovereign wealth",
    traditional: "Blind-pool funds with high 2/20 management fee drag",
  },
];

export default function WhyUsSection() {
  const [activeCard, setActiveCard] = useState<string>("fiduciary");

  return (
    <section
      id="why-us"
      className="relative z-10 w-full pt-16 sm:pt-24 pb-28 sm:pb-36 bg-white text-[#111215] overflow-hidden border-t border-black/5"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 pb-10 md:pb-14 border-b border-black/[0.08] text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0 space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-[11px] font-mono uppercase tracking-[0.22em] text-[#6b7280]">
              <Sparkles className="w-3 h-3 text-[#bc2327]" />
              <span>Institutional Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#0f1115] leading-[1.12]">
              Why leading institutional allocators{" "}
              <span className="font-serif italic font-normal text-[#bc2327]">
                choose Piptan
              </span>.
            </h2>
          </div>

          <p className="max-w-md mx-auto md:mx-0 text-sm sm:text-base text-[#525866] font-normal leading-relaxed">
            Investing in high-growth African infrastructure requires uncompromised legal governance, sovereign syndication, and disciplined risk-mitigated execution.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-14">
          {ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            const isSelected = activeCard === adv.id;
            return (
              <div
                key={adv.id}
                onClick={() => setActiveCard(adv.id)}
                className={`relative p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? "bg-[#111215] text-white border-[#111215] shadow-2xl scale-[1.02]"
                    : "bg-white text-[#111215] border-black/[0.08] hover:border-black/25 hover:shadow-xl"
                }`}
              >
                <div>
                  {/* Category & Stat Header */}
                  <div className="flex items-center justify-between pb-6">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${
                        isSelected ? "text-[#c5a867]" : "text-[#bc2327]"
                      }`}
                    >
                      {adv.category}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-white/10 text-[#c5a867]"
                          : "bg-black/[0.04] text-[#bc2327] group-hover:bg-[#bc2327] group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-light tracking-tight mb-2 font-serif">
                    {adv.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed mb-6 ${
                      isSelected ? "text-white/70" : "text-[#525866]"
                    }`}
                  >
                    {adv.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2 pb-6 border-t border-white/10 pt-4">
                    {adv.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                            isSelected ? "text-[#c5a867]" : "text-[#bc2327]"
                          }`}
                        />
                        <span className={isSelected ? "text-white/85" : "text-[#1f242e]"}>
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stat Box Bottom */}
                <div
                  className={`pt-4 border-t ${
                    isSelected ? "border-white/10" : "border-black/[0.06]"
                  }`}
                >
                  <span
                    className={`text-2xl font-light font-serif block ${
                      isSelected ? "text-white" : "text-[#0f1115]"
                    }`}
                  >
                    {adv.stat}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      isSelected ? "text-white/60" : "text-[#6b7280]"
                    }`}
                  >
                    {adv.statLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional Comparison Table */}
        <div className="mt-20 rounded-3xl bg-black/[0.02] border border-black/[0.08] p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#bc2327] block font-semibold mb-2">
              The Piptan Standard vs. Traditional PE
            </span>
            <h3 className="text-2xl font-light text-[#0f1115]">
              Structural superiority engineered for global capital.
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/[0.08] text-[11px] font-mono uppercase tracking-wider text-[#6b7280]">
                  <th className="py-4 pr-6 font-medium">Evaluation Criterion</th>
                  <th className="py-4 px-6 font-semibold text-[#bc2327]">Piptan Co-Investment SPV</th>
                  <th className="py-4 pl-6 font-medium">Traditional Emerging Market PE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] text-xs sm:text-sm">
                {COMPARISONS.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-4 pr-6 font-medium text-[#0f1115]">
                      {comp.feature}
                    </td>
                    <td className="py-4 px-6 text-[#111215] font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#bc2327] shrink-0" />
                      <span>{comp.piptan}</span>
                    </td>
                    <td className="py-4 pl-6 text-[#6b7280]">
                      {comp.traditional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Roadshow Executive Callout Strip */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#111215] text-white relative overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#bc2327]/25 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a867] block font-semibold">
              Africa Roadshow November 2026
            </span>
            <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white">
              Schedule a Private Delegation Session
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Meet our Managing Partners in Nairobi, Kigali, Johannesburg, Lagos, or Casablanca to discuss syndicated participation.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#bc2327] hover:bg-white hover:text-[#111215] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span>Request Meeting Slot</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
