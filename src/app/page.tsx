"use client";

import { useState } from "react";
import SitePreloader from "@/components/realevate/SitePreloader";
import SelectionMenu, { CategoryItem, CATEGORIES } from "@/components/realevate/SelectionMenu";
import HeroView from "@/components/realevate/HeroView";
import CategoryScrollPage from "@/components/realevate/CategoryScrollPage";
import AboutDrawer from "@/components/realevate/AboutDrawer";
import ContactDrawer from "@/components/realevate/ContactDrawer";
import NavMenuDrawer from "@/components/realevate/NavMenuDrawer";

export default function Home() {
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectCategory = (cat: CategoryItem) => {
    setActiveCategory(cat);
    setIsSelectionOpen(false);
  };

  const handleReturnHome = () => {
    setActiveCategory(null);
    setIsSelectionOpen(false);
  };

  return (
    <div className="relative w-full h-[100svh] overflow-hidden bg-[#ECE8E4]">
      {/* 01. The Signature Realevate Preloader with rolling digits & cycling frames */}
      {isPreloaderActive && (
        <SitePreloader onComplete={() => setIsPreloaderActive(false)} />
      )}

      {/* 02. The Iconic "Our Selection" 4-Card Radial Deck Drawer */}
      <SelectionMenu
        isOpen={isSelectionOpen}
        onClose={() => setIsSelectionOpen(false)}
        onSelectCategory={handleSelectCategory}
        onOpenAbout={() => {
          setIsSelectionOpen(false);
          setIsAboutOpen(true);
        }}
        onOpenContact={() => {
          setIsSelectionOpen(false);
          setIsContactOpen(true);
        }}
      />

      {/* 03. Either Main Homepage Stage OR Complete Scrollable Category Page (matching realevate.agency) */}
      {!activeCategory ? (
        <HeroView
          isSelectionOpen={isSelectionOpen}
          onToggleSelection={() => setIsSelectionOpen(!isSelectionOpen)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onSelectCategory={handleSelectCategory}
        />
      ) : (
        <CategoryScrollPage
          category={activeCategory}
          onReturnHome={handleReturnHome}
          onOpenSelection={() => setIsSelectionOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />
      )}

      {/* Truly Viewport-Fixed "Our Selection" Button on Homepage */}
      {!activeCategory && !isSelectionOpen && !isPreloaderActive && (
        <div className="fixed z-40 bottom-6 sm:bottom-8 right-6 sm:right-10 flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsSelectionOpen(true)}
            className="group relative inline-flex items-center justify-center gap-3 h-[46px] sm:h-[50px] px-6 rounded-full border border-[#BC2327] text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#BC2327] overflow-hidden transition-all duration-500 hover:text-[#1A0A0C] hover:border-[#C5A867] shadow-[0_15px_40px_rgba(188,35,39,0.35)] cursor-pointer"
            aria-label="Open Our Selection deck"
          >
            <span className="absolute inset-0 bg-[#C5A867] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0.6,0,1)]" />
            <span className="relative z-10">Our Selection</span>
            <svg
              className="relative z-10 w-3.5 h-3.5 fill-current"
              viewBox="0 0 13 13"
              aria-hidden="true"
            >
              <rect width="4" height="4" />
              <rect x="9" width="4" height="4" />
              <rect y="9" width="4" height="4" />
              <rect x="9" y="9" width="4" height="4" />
            </svg>
          </button>
        </div>
      )}

      {/* 04. About Drawer (Slides in on About click) */}
      <AboutDrawer
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenContact={() => {
          setIsAboutOpen(false);
          setIsContactOpen(true);
        }}
      />

      {/* 05. Contact & Delegation Booking Drawer (Slides in on Contact click) */}
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* 06. Nav Menu Drawer (Slides in on Menu hamburger click) */}
      <NavMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCategory={handleSelectCategory}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenSelection={() => setIsSelectionOpen(true)}
      />
    </div>
  );
}
