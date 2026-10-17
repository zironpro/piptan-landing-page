"use client";

import { X, ArrowUpRight } from "lucide-react";
import { CATEGORIES, CategoryItem } from "./SelectionMenu";

interface NavMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: CategoryItem) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenSelection: () => void;
}

export default function NavMenuDrawer({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenAbout,
  onOpenContact,
  onOpenSelection,
}: NavMenuDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-end sm:items-center justify-end p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-[#16080A] text-white border border-[#BC2327]/30 rounded-t-3xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#BC2327] text-white transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6 pt-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A867] block font-bold">
              Menu Navigation
            </span>
            <span className="text-xl font-serif font-bold tracking-tight uppercase text-white mt-1 block">
              Piptan Investment &amp; Advisory
            </span>
          </div>

          {/* 4 Pillars Links */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
              Investment Mandates
            </span>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onClose();
                    onSelectCategory(cat);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-colors group cursor-pointer border border-transparent hover:border-[#BC2327]/30"
                >
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-[#C5A867] transition-colors">
                      {cat.title}
                    </span>
                    <span className="text-xs text-white/60 block mt-0.5">
                      {cat.subtitle}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Core Actions */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenAbout();
              }}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider text-center cursor-pointer transition-colors"
            >
              About Tour
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="py-3 px-4 rounded-xl bg-[#BC2327] text-white text-xs font-bold uppercase tracking-wider text-center hover:bg-white hover:text-[#1A0A0C] transition-colors cursor-pointer shadow-lg"
            >
              Contact Liaison
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
          <span>Africa Delegation 2026</span>
          <button
            onClick={() => {
              onClose();
              onOpenSelection();
            }}
            className="text-[#C5A867] hover:underline cursor-pointer"
          >
            Open 4-Card Deck →
          </button>
        </div>
      </div>
    </div>
  );
}
