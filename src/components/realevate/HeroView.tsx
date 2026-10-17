"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { CATEGORIES, CategoryItem } from "./SelectionMenu";

interface HeroViewProps {
  isSelectionOpen: boolean;
  onToggleSelection: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenMenu: () => void;
  onSelectCategory?: (cat: CategoryItem) => void;
}

interface PillarEditorial {
  id: string;
  code: string;
  key: string;
  categoryKey: "by-the-sea" | "evergreen" | "urban-living" | "rare-gems";
  title: string;
  pillarName: string;
  themeColor: string;
  leftImage: string;
  rightImage: string;
  headline: string;
  specs: string;
  ticket: string;
  irr: string;
  corridors: string;
}

const PILLARS_EDITORIAL: PillarEditorial[] = [
  {
    id: "01",
    code: "01",
    key: "by-the-sea",
    categoryKey: "by-the-sea",
    title: "By The Sea",
    pillarName: "Energy & Industrial Infrastructure",
    themeColor: "#1C1215", // Deep Sovereign Obsidian Noir (harmonizes with #BC2327 logo)
    leftImage: "/images/infrastructure.jpg",
    rightImage: "/images/hero_africa.jpg",
    headline: "EVERY ALLOCATION WAS SELECTED TO CREATE ASSETS THAT ARE SOVEREIGN-BACKED, DOLLARIZED AND EFFORTLESS TO SCALE",
    specs: "15-year dollarized Power Purchase Agreements (PPAs) with credit-enhanced national utilities. 45 MW solar + BESS micro-grids across Kenya and Rwanda. Automated intermodal freight terminals under AfCFTA protocols.",
    ticket: "$15M – $80M",
    irr: "18% – 24%",
    corridors: "Kenya · Rwanda · Morocco · Tanzania",
  },
  {
    id: "02",
    code: "02",
    key: "evergreen",
    categoryKey: "evergreen",
    title: "Evergreen",
    pillarName: "Critical Minerals & Beneficiation",
    themeColor: "#13231B", // Deep Pine Emerald Concession
    leftImage: "/images/corridors.jpg",
    rightImage: "/images/infrastructure.jpg",
    headline: "TRANSFORMING RAW MINERAL RESERVES INTO HIGH-MARGIN REFINED CHEMICAL VALUE ON AFRICAN SOIL",
    specs: "99.99% Grade A cathode refining concessions in Ndola and Katanga. Long-term binding off-take agreements with global battery manufacturers. Direct sovereign royalty alignment and ICSID dispute protection.",
    ticket: "$30M – $150M",
    irr: "24% – 32%",
    corridors: "DRC · Zambia · South Africa · Ghana",
  },
  {
    id: "03",
    code: "66", // Exact index number from reference image
    key: "urban-living",
    categoryKey: "urban-living",
    title: "Urban Living",
    pillarName: "Financial Technology & Payment Rails",
    themeColor: "#360E13", // Royal Piptan Crimson Wine (matches #BC2327 logo)
    leftImage: "/images/hero_africa.jpg",
    rightImage: "/images/corridors.jpg",
    headline: "BUILDING THE MODERN REAL-TIME RAILS THAT POWER INTRA-AFRICAN CROSS-BORDER TRADE AND LIQUIDITY",
    specs: "AfriSwitch sub-3.2 second real-time B2B clearing rails between local currencies. Eliminating 3–7% foreign correspondent banking friction. 45%+ compounding annual revenue growth across West and East Africa.",
    ticket: "$10M – $50M",
    irr: "28% – 38%",
    corridors: "Lagos · Nairobi · Kigali · Dubai DIFC",
  },
  {
    id: "04",
    code: "04",
    key: "rare-gems",
    categoryKey: "rare-gems",
    title: "Rare Gems",
    pillarName: "Sovereign Wealth Advisory & DIFC SPVs",
    themeColor: "#1A1317", // Deep Imperial Obsidian Noir
    leftImage: "/images/boardroom.jpg",
    rightImage: "/images/hero_africa.jpg",
    headline: "BRIDGING GULF SOVEREIGN LIQUIDITY WITH TIER-1 AFRICAN NATIONAL DEVELOPMENT MANDATES",
    specs: "English Common Law legal architecture structured under Dubai International Financial Centre (DIFC) and ADGM. Zero foreign withholding tax via bilateral double taxation treaties. Co-investment conduits alongside sovereign wealth funds.",
    ticket: "$25M – $200M",
    irr: "16% – 22%",
    corridors: "Dubai DIFC Gate ⇄ Pan-African Corridors",
  },
];

export default function HeroView({
  isSelectionOpen,
  onToggleSelection,
  onOpenAbout,
  onOpenContact,
  onOpenMenu,
  onSelectCategory,
}: HeroViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Performance-critical DOM refs for Hero scroll expansion
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageElementRef = useRef<HTMLDivElement>(null);
  const contrastOverlayRef = useRef<HTMLDivElement>(null);
  const initialBadgeRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroFooterRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  // Dual-speed parallax refs for each pillar
  const pillarLeftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillarRightRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Only one boolean state needed for the nav background theme threshold
  const isScrolledRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Direct GPU-accelerated frame update without React re-rendering
  const updateScrollProgress = useCallback((progress: number) => {
    // 1. Image clip-path: expands from centered card to 100% full-width
    if (imageWrapperRef.current) {
      const radius = Math.max(0, (1 - progress) * 24);
      imageWrapperRef.current.style.clipPath = `inset(calc(${1 - progress} * (50% - 120px)) calc(${1 - progress} * (50% - 120px)) round ${radius.toFixed(1)}px)`;
    }

    // 2. Subtle image scale for depth
    if (imageElementRef.current) {
      const scale = 1 + progress * 0.08;
      imageElementRef.current.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;
    }

    // 3. Contrast overlay
    if (contrastOverlayRef.current) {
      const overlayOpacity = 0.25 + progress * 0.45;
      contrastOverlayRef.current.style.opacity = overlayOpacity.toFixed(3);
    }

    // 4. Initial card badge
    if (initialBadgeRef.current) {
      const badgeOpacity = Math.max(0, 1 - progress * 4);
      initialBadgeRef.current.style.opacity = badgeOpacity.toFixed(3);
    }

    // 5. Grand reveal text on full-width image
    if (revealRef.current) {
      const revealOpacity = Math.max(0, (progress - 0.3) / 0.7);
      const revealY = (1 - progress) * 35;
      revealRef.current.style.opacity = revealOpacity.toFixed(3);
      revealRef.current.style.transform = `translate3d(0, ${revealY.toFixed(1)}px, 0)`;
    }

    // 6. Running marquee ticker
    if (marqueeRef.current) {
      const marqueeOpacity = Math.max(0, 1 - progress * 2.2);
      marqueeRef.current.style.opacity = marqueeOpacity.toFixed(3);
    }

    // 7. Hero bottom headline & subhead
    if (heroTextRef.current) {
      const textOpacity = Math.max(0, 1 - progress * 2.2);
      const textY = progress * -30;
      heroTextRef.current.style.opacity = textOpacity.toFixed(3);
      heroTextRef.current.style.transform = `translate3d(0, ${textY.toFixed(1)}px, 0)`;
    }

    // 8. Hero footer
    if (heroFooterRef.current) {
      const footerOpacity = Math.max(0, 1 - progress * 3);
      heroFooterRef.current.style.opacity = footerOpacity.toFixed(3);
    }

    // 9. Card shadow
    if (shadowRef.current) {
      const shadowOpacity = Math.max(0, 1 - progress * 2.5);
      shadowRef.current.style.opacity = shadowOpacity.toFixed(3);
    }
  }, []);

  // Dual-speed parallax scroll update for the 4 pillars
  const updateDualSpeedParallax = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const vh = window.innerHeight || 800;

    PILLARS_EDITORIAL.forEach((_, idx) => {
      const leftEl = pillarLeftRefs.current[idx];
      const rightEl = pillarRightRefs.current[idx];
      if (!leftEl || !rightEl) return;

      const rect = leftEl.getBoundingClientRect();
      // Progress of this pillar relative to viewport center: -0.5 to +0.5
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.min(Math.max(progress, 0), 1);
      const centered = clamped - 0.5;

      // LEFT COLUMN: Speedily scroll (starts shifted down at the bottom, rises swiftly upward)
      const leftOffset = centered * -140;
      leftEl.style.transform = `translate3d(0, ${leftOffset.toFixed(1)}px, 0)`;

      // RIGHT COLUMN: Slowly scroll (positive offset resists scroll and glides slowly)
      const rightOffset = centered * 60;
      rightEl.style.transform = `translate3d(0, ${rightOffset.toFixed(1)}px, 0)`;
    });
  }, []);

  // Optimized RAF scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          if (!container) return;
          const st = container.scrollTop;
          const vh = window.innerHeight || 800;
          const progress = Math.min(Math.max(st / vh, 0), 1);

          updateScrollProgress(progress);
          updateDualSpeedParallax();

          // Update nav theme only when crossing threshold
          const nowScrolled = progress > 0.25;
          if (nowScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nowScrolled;
            setIsScrolled(nowScrolled);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial positioning
    onScroll();

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updateScrollProgress, updateDualSpeedParallax]);

  // When selection drawer opens, reset scroll to top
  useEffect(() => {
    if (isSelectionOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSelectionOpen]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="page-stage"
      ref={scrollContainerRef}
      onClick={isSelectionOpen ? onToggleSelection : undefined}
      className={`relative w-full h-[100svh] overflow-y-auto overflow-x-hidden bg-white text-[#1A0A0C] z-[2] will-change-scroll overscroll-y-contain transition-transform duration-700 ease-[cubic-bezier(0.7,0.6,0,1)] ${
        isSelectionOpen
          ? "scale-[0.38] translate-y-[52svh] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] cursor-pointer select-none"
          : "cursor-default"
      }`}
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* PERSISTENT FLOATING NAVIGATION BAR */}
      <nav
        className={`sticky top-0 z-50 w-full flex items-center justify-between px-6 sm:px-12 py-5 transition-all duration-300 select-none ${
          isScrolled
            ? "bg-[#160809]/92 backdrop-blur-md border-b border-[#BC2327]/30 text-white shadow-xl"
            : "bg-transparent text-[#1A0A0C] border-b border-transparent"
        }`}
        style={{
          marginBottom: "-76px",
        }}
      >
        {/* Left: About Link */}
        <button
          onClick={(e) => {
            if (isSelectionOpen) return;
            e.stopPropagation();
            onOpenAbout();
          }}
          className="link-underline text-xs sm:text-sm font-semibold uppercase tracking-wider hover:text-[#BC2327] transition-colors cursor-pointer"
        >
          About
        </button>

        {/* Center: Official Piptan Logo */}
        <div className="flex flex-col items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (isSelectionOpen) {
                onToggleSelection();
              } else if (isScrolled) {
                scrollToTop();
              }
            }}
            className="group cursor-pointer flex flex-col items-center gap-1"
          >
            <Image
              src="/piptan-logo.svg"
              alt="Piptan Logo"
              width={160}
              height={28}
              priority
              className={`h-6 sm:h-7 md:h-8 w-auto object-contain transition-all duration-300 group-hover:opacity-85 ${
                isScrolled ? "brightness-0 invert drop-shadow" : ""
              }`}
            />
            <span
              className={`text-[8px] sm:text-[9px] font-mono tracking-[0.28em] uppercase transition-colors duration-300 ${
                isScrolled ? "text-white/70" : "text-[#7A6668]"
              }`}
            >
              GLOBAL INVESTMENT &amp; ADVISORY
            </span>
          </a>
        </div>

        {/* Right: Contact Link */}
        <button
          onClick={(e) => {
            if (isSelectionOpen) return;
            e.stopPropagation();
            onOpenContact();
          }}
          className="link-underline text-xs sm:text-sm font-semibold uppercase tracking-wider hover:text-[#BC2327] transition-colors cursor-pointer"
        >
          Contact
        </button>
      </nav>

      {/* 01. STICKY SCROLL TRACK: HERO TO FULL-WIDTH IMAGE TRANSITION */}
      <div className="relative w-full" style={{ height: "200vh" }}>
        {/* Sticky stage pinning the view while scrolling through the track */}
        <div className="sticky top-0 w-full h-[100svh] overflow-hidden flex flex-col justify-center items-center">
          {/* Continuous Running Marquee Ticker */}
          <div
            ref={marqueeRef}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none z-0 will-change-transform"
          >
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-[10vw] sm:text-[12vw] md:text-[13vw] font-black tracking-tighter uppercase text-[#BC2327]/[0.055] leading-none pr-8">
                Elevating Capital · Africa Roadshow · Bilateral Growth ·
              </span>
              <span className="text-[10vw] sm:text-[12vw] md:text-[13vw] font-black tracking-tighter uppercase text-[#BC2327]/[0.055] leading-none pr-8">
                Elevating Capital · Africa Roadshow · Bilateral Growth ·
              </span>
            </div>
          </div>

          {/* Card Shadow element at initial stage */}
          <div
            ref={shadowRef}
            className="absolute z-5 w-[240px] h-[240px] rounded-3xl shadow-[0_25px_60px_-10px_rgba(188,35,39,0.25)] pointer-events-none will-change-transform"
          />

          {/* THE EXPANDING IMAGE WRAPPER: Fixed 100% size, animated via GPU clip-path (Zero layout reflow) */}
          <div
            ref={imageWrapperRef}
            className="absolute inset-0 z-10 w-full h-full will-change-[clip-path] pointer-events-none"
            style={{
              clipPath: "inset(calc(50% - 120px) calc(50% - 120px) round 24px)",
            }}
          >
            <div ref={imageElementRef} className="relative w-full h-full will-change-transform">
              <Image
                src="/images/hero_africa.jpg"
                alt="Piptan Africa Roadshow Visual"
                fill
                unoptimized
                priority
                className="object-cover"
              />

              {/* Dynamic contrast overlays */}
              <div
                ref={contrastOverlayRef}
                className="absolute inset-0 bg-[#160809] will-change-transform"
                style={{ opacity: 0.25 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

              {/* Initial Badge on small card */}
              <div
                ref={initialBadgeRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
              >
                <div className="mt-40">
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-white/95 bg-[#160809]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 inline-block shadow-md">
                    Nairobi · Kigali · Jo&apos;burg · Lagos
                  </span>
                </div>
              </div>

              {/* FULL-WIDTH REVEAL OVERLAY: Revealed as image approaches full width */}
              <div
                ref={revealRef}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white pointer-events-none will-change-transform"
                style={{
                  opacity: 0,
                  transform: "translate3d(0, 35px, 0)",
                }}
              >
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white font-bold mb-3 bg-[#BC2327] backdrop-blur-md px-4 py-1.5 rounded-full border border-[#C5A867]/40 shadow-lg">
                  Pan-African Capital Summit · 2026
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl text-white leading-tight drop-shadow-xl font-serif">
                  Deploying Institutional Capital Across Sovereign Corridors
                </h2>
                <p className="mt-4 text-xs sm:text-base md:text-lg font-medium text-white/90 max-w-2xl mx-auto drop-shadow">
                  Direct concessions, high-barrier infrastructure, and cross-border settlement rails structured through Dubai DIFC.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {[
                    { label: "$1.85B+", desc: "Pipeline" },
                    { label: "15-Yr", desc: "Dollarized PPA" },
                    { label: "DIFC SPV", desc: "Common Law Shield" },
                    { label: "4 Hubs", desc: "Nairobi · Kigali · Jo'burg · Lagos" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md"
                    >
                      <span className="font-bold text-[#C5A867]">{item.label}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-[10px] text-white/80">{item.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-2 text-white/80 text-[10px] sm:text-xs font-mono tracking-widest uppercase animate-bounce">
                  <span>Scroll down to inspect sectors</span>
                  <span>↓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Bottom Headline & Subhead */}
          <div
            ref={heroTextRef}
            className="absolute bottom-16 inset-x-0 text-center max-w-lg mx-auto space-y-1 z-10 px-4 pointer-events-none will-change-transform"
          >
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-[#1A0A0C] tracking-tight leading-snug">
              Deploying Institutional Capital Across Africa&apos;s High-Yield Sovereign &amp; Frontier Corridors.
            </h1>
            <p className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#7A6668] uppercase font-semibold">
              Sovereign &amp; Institutional Allocations from $5,000,000
            </p>
          </div>

          {/* Hero Footer row */}
          <footer
            ref={heroFooterRef}
            className="absolute bottom-0 inset-x-0 flex items-center justify-between px-6 sm:px-12 py-4 text-xs text-[#7A6668] font-mono z-30 select-none pointer-events-none will-change-transform"
          >
            <span>Piptan® 2026 · Africa Delegation Summit</span>
            <div className="flex items-center gap-1.5 animate-pulse text-[#BC2327] font-semibold">
              <span className="text-[10px] tracking-wider uppercase">Scroll to expand</span>
              <span>↓</span>
            </div>
            <span className="hidden sm:inline">Dubai DIFC Gateway ⇄ Pan-African Corridors</span>
          </footer>
        </div>
      </div>

      {/* 02. SECTION: FOUR PILLARS OF INSTITUTIONAL ALPHA (Dual-Speed Parallax Scroll Editorial Layout) */}
      <section className="relative w-full bg-[#FAF8F5] text-[#1A0A0C] py-20 sm:py-32 px-4 sm:px-8 md:px-14 lg:px-20 z-10 border-t border-[#1A0A0C]/10 select-none">
        <div className="max-w-[1440px] mx-auto space-y-24 sm:space-y-36">
          
          {/* Section Introduction Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#1A0A0C]/15">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#BC2327] font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#BC2327]" />
                <span>Sovereign Asset Corridors · 2026 Roadshow</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-tight text-[#1A0A0C] font-bold">
                Four Pillars of Institutional Alpha
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#7A6668] uppercase">
              <span>Dual-Speed Parallax Editorial</span>
              <span>·</span>
              <span>Scroll to Explore All 4</span>
            </div>
          </div>

          {/* ALL 4 PILLARS IN SEQUENTIAL SCROLL WITH DUAL-SPEED PARALLAX */}
          {PILLARS_EDITORIAL.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-6 border-b border-[#1A0A0C]/10 pb-20 sm:pb-32 last:border-b-0"
            >
              {/* LEFT COLUMN (SPEEDILY SCROLL): Situated in bottom area, accelerates upward */}
              <div
                ref={(el) => {
                  pillarLeftRefs.current[idx] = el;
                }}
                className="lg:col-span-5 flex flex-col gap-6 will-change-transform lg:mt-32 xl:mt-44 self-end"
              >
                {/* Dark colored frame with vertical indicator strip and inset image */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden p-3 sm:p-5 flex gap-4 sm:gap-6 shadow-2xl transition-transform duration-100"
                  style={{ backgroundColor: pillar.themeColor, minHeight: "480px" }}
                >
                  {/* Left Vertical Indicator Strip (matching "66" & "SCROLL ↓" in ref) */}
                  <div className="flex flex-col items-center justify-between py-2 w-10 sm:w-12 select-none border-r border-white/15 pr-3 sm:pr-4">
                    {/* Index number */}
                    <span className="font-mono font-bold text-xl sm:text-2xl text-white tracking-widest">
                      {pillar.code}
                    </span>

                    {/* Vertical Rotated Text "SCROLL" with downward tick */}
                    <div className="flex flex-col items-center gap-2 my-auto">
                      <span
                        className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-white/70 uppercase"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        SCROLL
                      </span>
                      <div className="w-[1px] h-12 sm:h-16 bg-white/40 relative">
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-white/90">↓</span>
                      </div>
                    </div>

                    {/* Pillar progress dots */}
                    <div className="flex flex-col gap-1.5">
                      {PILLARS_EDITORIAL.map((p, i) => (
                        <div
                          key={p.id}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            i === idx ? "bg-[#C5A867] h-3.5" : "bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Inset Photo (matching floral / terrace framing in ref) */}
                  <div className="relative flex-1 rounded-xl overflow-hidden shadow-inner group">
                    <Image
                      src={pillar.leftImage}
                      alt={pillar.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 inline-block">
                        {pillar.corridors}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (SLOWLY SCROLL): Resists scroll and glides smoothly */}
              <div
                ref={(el) => {
                  pillarRightRefs.current[idx] = el;
                }}
                className="lg:col-span-7 flex flex-col justify-between gap-6 sm:gap-8 will-change-transform"
              >
                {/* Top Right Header & Links (matching SELECT AN APARTMENT / BOOK A CALL in ref) */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#BC2327] font-bold">
                      Pillar {pillar.id} of 04 · {pillar.pillarName}
                    </span>
                    <span className="text-xs font-mono text-[#7A6668] uppercase">
                      Corridors: {pillar.corridors}
                    </span>
                  </div>

                  {/* Links: SELECT A PILLAR (with underline) / BOOK A CALL / CONTACT */}
                  <div className="flex flex-col items-start sm:items-end gap-1 select-none">
                    <button
                      onClick={onToggleSelection}
                      className="font-serif font-bold text-lg sm:text-xl tracking-wider text-[#BC2327] uppercase border-b-2 border-[#BC2327] hover:text-[#1A0A0C] hover:border-[#1A0A0C] transition-all pb-0.5 cursor-pointer"
                    >
                      SELECT A PILLAR
                    </button>
                    <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#7A6668] uppercase font-semibold">
                      <button
                        onClick={onOpenContact}
                        className="hover:text-[#BC2327] transition-colors cursor-pointer"
                      >
                        BOOK A CALL
                      </button>
                      <span>·</span>
                      <button
                        onClick={onOpenContact}
                        className="hover:text-[#BC2327] transition-colors cursor-pointer"
                      >
                        CONTACT
                      </button>
                    </div>
                  </div>
                </div>

                {/* Panoramic Feature Photograph */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-[#1A0A0C]/10 group">
                  <Image
                    src={pillar.rightImage}
                    alt={pillar.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Target badges on panoramic photo */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-white bg-[#BC2327] backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A867]/35 shadow-md">
                      Target IRR: {pillar.irr}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-md">
                      Ticket: {pillar.ticket}
                    </span>
                  </div>
                </div>

                {/* Condensed Luxury Editorial Headline */}
                <div>
                  <h3 className="font-serif uppercase font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[38px] leading-[1.08] tracking-tight text-[#1A0A0C]">
                    {pillar.headline}
                  </h3>
                </div>

                {/* Editorial Specifications description paragraph below headline */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-2 border-t border-[#1A0A0C]/10">
                  <p className="text-xs sm:text-sm text-[#7A6668] leading-relaxed max-w-xl font-medium">
                    {pillar.specs}
                  </p>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        const cat = CATEGORIES.find((c) => c.categoryKey === pillar.categoryKey) || CATEGORIES[0];
                        if (onSelectCategory) {
                          onSelectCategory(cat);
                        } else {
                          onToggleSelection();
                        }
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#BC2327] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#1A0A0C] hover:text-[#C5A867] transition-all duration-300 shadow-md cursor-pointer group"
                    >
                      <span>Explore {pillar.title} Dossier</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Roadshow CTA Box */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2E0F13] via-[#1A0A0C] to-[#0D0506] border border-[#BC2327]/30 text-white p-8 sm:p-14 shadow-2xl mt-16">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#BC2327]/25 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A867] font-bold">
                2026 Sovereign Investor Summit
              </span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif uppercase text-white tracking-tight leading-tight font-bold">
                Request Institutional Allocation &amp; Delegation Briefing
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-xl font-medium">
                Connect directly with African finance delegations, sovereign fund CIOs, and concession operators structured through our Dubai DIFC gate.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onToggleSelection}
                  className="px-6 py-3.5 rounded-full bg-[#BC2327] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-white hover:text-[#1A0A0C] transition-colors duration-300 shadow-xl cursor-pointer"
                >
                  Explore 4-Card Deck
                </button>
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3.5 rounded-full border border-white/30 text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                >
                  Book Delegation Access
                </button>
              </div>
            </div>
          </div>

          {/* Section 2 Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 border-t border-[#1A0A0C]/10 text-xs font-mono text-[#7A6668]">
            <div>
              <span>Piptan Global Investment &amp; Advisory · DIFC Gate Precinct, Dubai</span>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-[#BC2327] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
