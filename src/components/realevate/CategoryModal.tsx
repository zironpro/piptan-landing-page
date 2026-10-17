"use client";

import { X, ArrowRight, ShieldCheck, CheckCircle2, Download, Calendar } from "lucide-react";
import Image from "next/image";
import { CategoryItem } from "./SelectionMenu";

interface CategoryModalProps {
  category: CategoryItem | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export default function CategoryModal({
  category,
  onClose,
  onOpenBooking,
}: CategoryModalProps) {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-end p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-2xl h-full sm:h-[94vh] sm:rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto text-white flex flex-col justify-between"
        style={{ backgroundColor: category.cardColor }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="space-y-6 pt-2">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/60 block">
              Investment Mandate · Pillar {category.id}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase leading-none">
              {category.title}
            </h2>
            <p className="text-base text-white/90 font-medium pt-1">
              {category.subtitle}
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
            <Image
              src={category.coverImage}
              alt={category.title}
              fill
              unoptimized
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
              <span className="text-[10px] font-mono uppercase text-white/60 block">
                Target IRR
              </span>
              <span className="text-lg font-bold text-white mt-0.5 block">
                {category.targetIRR}
              </span>
            </div>
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
              <span className="text-[10px] font-mono uppercase text-white/60 block">
                Allocation Ticket
              </span>
              <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">
                {category.ticket}
              </span>
            </div>
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
              <span className="text-[10px] font-mono uppercase text-white/60 block">
                Jurisdiction
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block truncate">
                {category.corridors}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/70">
              Investment Thesis
            </h3>
            <p className="text-sm text-white/85 font-light leading-relaxed">
              {category.summary}
            </p>
          </div>

          {/* Key Strategic Pillars */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/70 mb-3">
              Key Strategic Concessions &amp; Safeguards
            </h3>
            <div className="space-y-2.5">
              {category.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2.5 text-xs text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="pt-8 mt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] text-white/70 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Offshore English Law SPV · DIFC Aligned</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#BC2327] text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-[#1A0A0C] transition-colors shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
