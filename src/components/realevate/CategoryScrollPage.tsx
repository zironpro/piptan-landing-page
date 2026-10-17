"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck, Calendar } from "lucide-react";
import { CategoryItem, CATEGORIES } from "./SelectionMenu";

interface CategoryScrollPageProps {
  category: CategoryItem;
  onReturnHome: () => void;
  onOpenSelection: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onSelectCategory: (cat: CategoryItem) => void;
}

export default function CategoryScrollPage({
  category,
  onReturnHome,
  onOpenSelection,
  onOpenAbout,
  onOpenContact,
  onSelectCategory,
}: CategoryScrollPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderIndex, setSliderIndex] = useState(0);

  // Scroll to top whenever category changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [category]);

  // Find next category in the 4-card sequence
  const currentIndex = CATEGORIES.findIndex((c) => c.id === category.id);
  const nextCategory = CATEGORIES[(currentIndex + 1) % CATEGORIES.length];

  // Specific projects / assets for each category
  const categoryProjects: Record<
    string,
    Array<{
      title: string;
      location: string;
      image: string;
      metric: string;
      metricLabel: string;
    }>
  > = {
    "by-the-sea": [
      {
        title: "Rift Valley Industrial Micro-Grid",
        location: "Nakuru, Kenya",
        image: "/images/infrastructure.jpg",
        metric: "45 MW Solar + BESS",
        metricLabel: "Capacity",
      },
      {
        title: "Kigali Gateway Dry Port & Cold Hub",
        location: "Kigali Special Economic Zone, Rwanda",
        image: "/images/corridors.jpg",
        metric: "120,000 TEU",
        metricLabel: "Annual Throughput",
      },
      {
        title: "Casablanca Maritime Container Terminal",
        location: "Casablanca Port, Morocco",
        image: "/images/hero_africa.jpg",
        metric: "15-Yr Dollarized PPA",
        metricLabel: "Concession",
      },
      {
        title: "Dar es Salaam Intermodal Freight Rail",
        location: "Tanzania SADC Corridor",
        image: "/images/infrastructure.jpg",
        metric: "$65M Co-Investment",
        metricLabel: "Syndicated Debt",
      },
    ],
    evergreen: [
      {
        title: "Copperbelt Cathode Refining Plant",
        location: "Ndola, Zambia",
        image: "/images/corridors.jpg",
        metric: "99.99% Grade A",
        metricLabel: "Purity",
      },
      {
        title: "Katanga Green Lithium Beneficiation",
        location: "Kolwezi Concession, DRC",
        image: "/images/infrastructure.jpg",
        metric: "10-Yr Battery Off-take",
        metricLabel: "Secured Off-Take",
      },
      {
        title: "Bushveld Vanadium Energy Storage",
        location: "North West Province, South Africa",
        image: "/images/boardroom.jpg",
        metric: "28% Realized IRR",
        metricLabel: "Target Return",
      },
      {
        title: "Ashanti Strategic Mineral Smelter",
        location: "Western Region, Ghana",
        image: "/images/corridors.jpg",
        metric: "State Sovereign Royalty",
        metricLabel: "Governance",
      },
    ],
    "urban-living": [
      {
        title: "AfriSwitch Pan-African Settlement Rail",
        location: "Lagos, Nigeria ⇄ Nairobi, Kenya",
        image: "/images/hero_africa.jpg",
        metric: "< 3.2 Seconds",
        metricLabel: "B2B Clearing Time",
      },
      {
        title: "Nairobi Edge Hyperscale Data Center",
        location: "Tatu City Tech District, Kenya",
        image: "/images/corridors.jpg",
        metric: "Tier-III Carrier Neutral",
        metricLabel: "Specification",
      },
      {
        title: "Cairo Digital Trade Factoring Engine",
        location: "New Administrative Capital, Egypt",
        image: "/images/boardroom.jpg",
        metric: "$180M Volume",
        metricLabel: "Annual Invoices",
      },
      {
        title: "Jo'burg Cross-Border BaaS Cloud",
        location: "Sandton Financial Apex, South Africa",
        image: "/images/hero_africa.jpg",
        metric: "45%+ YoY Growth",
        metricLabel: "ARR Surge",
      },
    ],
    "rare-gems": [
      {
        title: "Dubai DIFC Sovereign Co-Investment SPV",
        location: "DIFC Gate Precinct, Dubai, UAE",
        image: "/images/boardroom.jpg",
        metric: "English Common Law",
        metricLabel: "Jurisdiction",
      },
      {
        title: "GCC ⇄ African Agribusiness Sovereign Fund",
        location: "Abu Dhabi Global Market ⇄ Ghana",
        image: "/images/infrastructure.jpg",
        metric: "$250M Target",
        metricLabel: "Fund Mandate",
      },
      {
        title: "London-Dubai Sovereign Debt Conduit",
        location: "Mayfair, London ⇄ DIFC, Dubai",
        image: "/images/corridors.jpg",
        metric: "Zero Foreign Tax",
        metricLabel: "Bilateral Treaty",
      },
      {
        title: "Pan-African Intergenerational Family Trust",
        location: "DIFC Family Wealth Centre, Dubai",
        image: "/images/boardroom.jpg",
        metric: "Multi-Jurisdiction",
        metricLabel: "Asset Shield",
      },
    ],
  };

  const projects = categoryProjects[category.categoryKey] || categoryProjects["by-the-sea"];

  // Category specific quotes
  const categoryQuotes: Record<
    string,
    {
      quote: string;
      author: string;
      source: string;
      introTitle: string;
      introDesc: string;
      values: Array<{ stat: string; desc: string; image: string }>;
      pullQuote: string;
    }
  > = {
    "by-the-sea": {
      introTitle: "The Compounding Yield of Strategic Real Assets",
      introDesc:
        "High-barrier tangible assets offering verified sovereign demand, 15-year dollarized off-take agreements, and direct hedge protection against frontier inflationary cycles.",
      quote:
        "“Frontier infrastructure and commercial clean energy continue to command institutional premiums because African industrial demand is compounding while un-syndicated, bankable deal flow remains scarce.”",
      author: "Piptan Strategic Global Research Desk",
      source: "/ Institutional Africa Capital Outlook / 2026",
      values: [
        {
          stat: "High\nDemand",
          desc: "Industrial manufacturing and logistics hubs across Africa face chronic energy deficits, creating urgent sovereign demand for distributed renewable micro-grids.",
          image: "/images/infrastructure.jpg",
        },
        {
          stat: "Dollar\nPremiums",
          desc: "All off-take power contracts and port terminal clearance tariffs are structured in US Dollars or UAE Dirhams, eliminating local currency devaluation risks.",
          image: "/images/corridors.jpg",
        },
        {
          stat: "Sovereign\nBacking",
          desc: "Long-term state concessions and Bilateral Investment Treaties ensure full investor rights protection, dispute arbitration in DIFC, and guaranteed capital repatriation.",
          image: "/images/hero_africa.jpg",
        },
      ],
      pullQuote:
        "“Essential utility and logistics assets are the bedrock of emerging market resilience. Even during volatile global credit cycles, critical freight terminals and captive power plants generate uninterrupted dollar cash flows.”",
    },
    evergreen: {
      introTitle: "Unlocking Critical Minerals Beneficiation",
      introDesc:
        "Africa holds over 70% of the world's cobalt, 50% of manganese, and vast unexploited lithium reserves. Piptan finances domestic chemical refining to capture high-margin value-add.",
      quote:
        "“The global clean energy transition cannot occur without African critical minerals. The true alpha lies not in raw extraction, but in domestic high-purity chemical beneficiation.”",
      author: "Energy & Minerals Syndicate Group",
      source: "/ Global Battery Metals Review / 2026",
      values: [
        {
          stat: "4.2x Value\nCreation",
          desc: "Refining raw battery ore locally into battery-grade chemical precursor yields up to a 4.2x multiple over raw export revenues.",
          image: "/images/corridors.jpg",
        },
        {
          stat: "Long-Term\nOff-Take",
          desc: "Projects are anchored by 10-year purchase agreements with leading global electric vehicle and battery storage manufacturers in Europe and Asia.",
          image: "/images/infrastructure.jpg",
        },
        {
          stat: "Sovereign\nAlignment",
          desc: "National governments provide 25-year mineral concessions and royalty sharing models that guarantee operational continuity.",
          image: "/images/boardroom.jpg",
        },
      ],
      pullQuote:
        "“By replacing raw ore shipping with domestically refined cathode and chemical exports, sovereign states protect their mineral wealth while delivering exceptional risk-adjusted equity returns to co-investors.”",
    },
    "urban-living": {
      introTitle: "The Sovereign Rails of African Fintech",
      introDesc:
        "Category-defining financial technology platforms eliminating the $5.2B annual friction in intra-African trade, cross-border payments, and SME working capital liquidity.",
      quote:
        "“Pan-African B2B payment clearing is transitioning from slow Western intermediary correspondent banks to instant real-time settlement rails running across Dubai and African hubs.”",
      author: "Fintech & Venture Desk",
      source: "/ Pan-African Digital Liquidity Report / 2026",
      values: [
        {
          stat: "Sub-4s\nSettlement",
          desc: "B2B transactions clear in under 4 seconds between local African currencies, eliminating 3–7% foreign exchange intermediary fees.",
          image: "/images/hero_africa.jpg",
        },
        {
          stat: "Rapid\nScalability",
          desc: "Portfolio enterprise platforms are expanding at 45%+ annual revenue growth rates, compounding client volume under AfCFTA free trade protocols.",
          image: "/images/corridors.jpg",
        },
        {
          stat: "Dual-Listing\nExits",
          desc: "Clear liquidity pathways via strategic M&A by global payment conglomerates or dual IPOs across Dubai Financial Market (DFM) and London.",
          image: "/images/boardroom.jpg",
        },
      ],
      pullQuote:
        "“Digital financial rails are the highways of modern African trade. Companies that own the settlement switches and underwriting engines represent the highest multiple opportunity of the decade.”",
    },
    "rare-gems": {
      introTitle: "Bridging Gulf Sovereigns with African Alpha",
      introDesc:
        "Private wealth structuring and institutional co-investment conduits linking GCC sovereign wealth funds, family offices, and Tier-1 African national development mandates.",
      quote:
        "“Dubai DIFC has established itself as the indispensable legal and financial bridge for global institutional capital deploying into high-conviction African enterprises.”",
      author: "Piptan Wealth & Advisory Practice",
      source: "/ GCC ⇄ Africa Capital Flows / 2026",
      values: [
        {
          stat: "English\nCommon Law",
          desc: "All holding companies are incorporated under DIFC / ADGM legal jurisdiction, providing absolute regulatory clarity and independent arbitration.",
          image: "/images/boardroom.jpg",
        },
        {
          stat: "Zero Capital\nFriction",
          desc: "Unrestricted foreign exchange mobility ensures profits, dividends, and exit proceeds are repatriated in US Dollars or AED without delay.",
          image: "/images/corridors.jpg",
        },
        {
          stat: "Bilateral\nTreaties",
          desc: "Comprehensive Double Taxation Treaties and Bilateral Investment Treaties protect family office assets across all operating jurisdictions.",
          image: "/images/infrastructure.jpg",
        },
      ],
      pullQuote:
        "“For institutional investors, structuring is everything. Pairing world-class English Common Law governance in Dubai with ground-level African execution creates an unassailable risk-adjusted investment vehicle.”",
    },
  };

  const activeQuote = categoryQuotes[category.categoryKey] || categoryQuotes["by-the-sea"];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-y-auto overflow-x-hidden text-white transition-colors duration-700 ease-[cubic-bezier(0.7,0.6,0,1)] select-none"
      style={{ backgroundColor: category.cardColor }}
    >
      {/* 01. SECTION: CATEGORY HERO STAGE (matching realevate .category-hero) */}
      <section className="relative w-full min-h-[100svh] flex flex-col justify-between p-[4.5vw]">
        {/* Top Navigation */}
        <nav className="flex items-center justify-between w-full z-30">
          {/* Back to Home Button */}
          <button
            onClick={onReturnHome}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Homepage</span>
          </button>

          {/* Center Brand */}
          <div className="flex flex-col items-center">
            <Image
              src="/piptan-logo.svg"
              alt="Piptan Logo"
              width={140}
              height={26}
              className="h-6 w-auto brightness-0 invert drop-shadow"
            />
            <span className="text-[9px] font-mono tracking-widest text-[#C5A867] uppercase mt-0.5 font-bold">
              {category.title}
            </span>
          </div>

          {/* Right Contact Button */}
          <button
            onClick={onOpenContact}
            className="link-underline text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:opacity-80 transition-opacity"
          >
            Contact
          </button>
        </nav>

        {/* Center Visual + Marquee (matching realevate .hero-top) */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-center py-4 my-auto">
          {/* Running Continuous Marquee Ticker */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none z-0">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-[12vw] sm:text-[14vw] font-black tracking-tighter uppercase text-white/[0.08] leading-none pr-8">
                {category.title} · {category.subtitle} · Piptan Mandate ·
              </span>
              <span className="text-[12vw] sm:text-[14vw] font-black tracking-tighter uppercase text-white/[0.08] leading-none pr-8">
                {category.title} · {category.subtitle} · Piptan Mandate ·
              </span>
            </div>
          </div>

          {/* Centered Hero Visual Frame */}
          <div className="relative z-10 w-[36vw] max-w-[210px] sm:max-w-[260px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/20 group transition-all duration-700 hover:scale-105">
            <Image
              src={category.coverImage}
              alt={category.title}
              fill
              unoptimized
              priority
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.18,0.13,0,0.99)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
              <span className="text-[9px] font-mono uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 inline-block">
                Target IRR: {category.targetIRR}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Headline & Benchmarks (matching realevate .hero-bottom) */}
        <div className="text-center max-w-xl mx-auto space-y-1 z-10 mb-2">
          <h1 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
            {category.subtitle}
          </h1>
          <p className="text-xs font-mono tracking-widest text-white/70 uppercase font-semibold">
            Typical Allocation {category.ticket} · {category.corridors}
          </p>
        </div>

        {/* Footer with Scroll Cue */}
        <footer className="flex items-center justify-between text-xs text-white/60 font-mono z-30 pt-2 border-t border-white/10">
          <span>(Scroll to Explore Projects)</span>
          <span>Piptan® 2026 · Africa Delegation Summit</span>
        </footer>
      </section>

      {/* 02. SECTION: CATEGORY GALLERY & PROJECTS SLIDER (matching realevate .category-gallery) */}
      <section className="relative w-full py-20 px-[4.5vw] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Intro with Accent Line */}
          <div className="space-y-4 max-w-3xl">
            <div className="w-12 h-[2px] bg-white/40" />
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {activeQuote.introTitle}
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
              {activeQuote.introDesc}
            </p>
          </div>

          {/* Projects Slider Header & Controls */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/60">
              Active Project Pipeline ({projects.length} Verified Concessions)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSliderIndex((prev) => Math.max(0, prev - 1))}
                disabled={sliderIndex === 0}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white disabled:opacity-30 disabled:hover:border-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setSliderIndex((prev) => Math.min(projects.length - 2, prev + 1))
                }
                disabled={sliderIndex >= projects.length - 2}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white disabled:opacity-30 disabled:hover:border-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Slider Cards Track (matching realevate .projects-slider-track) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500">
            {projects.slice(sliderIndex, sliderIndex + 2).map((proj) => (
              <div
                key={proj.title}
                onClick={onOpenContact}
                className="group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-black/25 border border-white/15 p-6 hover:border-white/40 transition-all duration-500 cursor-pointer shadow-2xl hover:-translate-y-1.5"
              >
                <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.18,0.13,0,0.99)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {proj.location}
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#F3DFB5] transition-colors">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-white/70 block mt-1">
                      {proj.metricLabel}: <strong className="text-white">{proj.metric}</strong>
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#BC2327] text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. SECTION: CATEGORY QUOTE (matching realevate .category-quote) */}
      <section className="relative w-full py-24 px-[4.5vw] bg-black/20 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Square Editorial Photo Frame */}
          <div className="lg:col-span-4 relative aspect-square rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <Image
              src="/images/boardroom.jpg"
              alt="Piptan Strategic Global Research"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Right: Monumental Quotation & Attribution */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug tracking-tight">
              {activeQuote.quote}
            </h2>

            <div className="pt-2 border-t border-white/15">
              <p className="text-sm font-bold text-white uppercase tracking-wider">
                {activeQuote.author}
              </p>
              <p className="text-xs font-mono text-white/60 mt-0.5">
                {activeQuote.source}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04. SECTION: CINEMATIC FULL-WIDTH PARALLAX BREAK (matching realevate .category-parallax) */}
      <section className="relative w-full h-[55vh] sm:h-[70vh] overflow-hidden border-t border-b border-white/10">
        <Image
          src="/images/hero_africa.jpg"
          alt="African Financial Corridors Panoramic View"
          fill
          unoptimized
          className="object-cover filter brightness-90 saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        <div className="absolute bottom-8 left-[4.5vw]">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/80 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            Pan-African Trade Corridors · AfCFTA Deployment
          </span>
        </div>
      </section>

      {/* 05. SECTION: STRATEGIC VALUES & METRICS ROWS (matching realevate .category-values) */}
      <section className="relative w-full py-24 px-[4.5vw]">
        <div className="max-w-6xl mx-auto space-y-20">
          {activeQuote.values.map((val, idx) => {
            const isReverse = idx % 2 === 1;
            return (
              <div
                key={val.stat}
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${
                  isReverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Column */}
                <div
                  className={`md:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/20 shadow-2xl ${
                    isReverse ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <Image
                    src={val.image}
                    alt={val.stat}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Copy Column */}
                <div
                  className={`md:col-span-6 space-y-4 ${
                    isReverse ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight whitespace-pre-line leading-none">
                    {val.stat}
                  </h3>
                  <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-lg">
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 06. SECTION: CATEGORY PULL-QUOTE (matching realevate .category-pull-quote) */}
      <section className="relative w-full py-20 px-[4.5vw] bg-black/25 border-t border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-5xl sm:text-6xl font-serif text-white/30 block leading-none">
            &ldquo;
          </span>
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-relaxed tracking-tight">
            {activeQuote.pullQuote}
          </p>
          <div className="pt-4">
            <span className="text-xs font-mono uppercase tracking-widest text-white/70">
              Piptan Institutional Investment Memorandum · 2026 Mandate
            </span>
          </div>
        </div>
      </section>

      {/* 07. SECTION: SECOND PARALLAX PANORAMIC BREAK (matching realevate second parallax) */}
      <section className="relative w-full h-[50vh] sm:h-[65vh] overflow-hidden">
        <Image
          src="/images/infrastructure.jpg"
          alt="Sustainable Infrastructure Landscape"
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </section>

      {/* 08. SECTION: CATEGORY CALL TO ACTION (matching realevate .category-cta) */}
      <section className="relative w-full py-24 px-[4.5vw] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-12 h-[2px] bg-white/40 mx-auto" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Secure Your Allocation in {category.title}
          </h2>
          <p className="text-base text-white/80 font-light max-w-xl mx-auto leading-relaxed">
            Connect directly with Piptan&apos;s traveling executive partners during our November 2026 Africa Roadshow to review detailed project data rooms.
          </p>

          <div className="pt-4">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#BC2327] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-[#1A0A0C] transition-all shadow-2xl group cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Delegation Session</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 09. SECTION: CATEGORY NEXT TEASER (matching realevate .category-next) */}
      <section
        onClick={() => onSelectCategory(nextCategory)}
        className="group relative w-full py-16 px-[4.5vw] border-t border-white/15 cursor-pointer transition-all duration-500 hover:brightness-110"
        style={{ backgroundColor: nextCategory.cardColor }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/60 block">
              Next Investment Mandate · Pillar {nextCategory.id}
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-black text-white uppercase tracking-tight group-hover:text-[#C5A867] transition-colors">
              Explore {nextCategory.title} →
            </h3>
            <span className="text-xs text-white/80 font-mono block">
              {nextCategory.subtitle} · Target IRR {nextCategory.targetIRR}
            </span>
          </div>

          <div className="relative w-36 h-24 rounded-2xl overflow-hidden border border-white/20 shadow-xl flex-shrink-0">
            <Image
              src={nextCategory.coverImage}
              alt={nextCategory.title}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Floating Action Bar on Category Page */}
      <div className="fixed z-[100] bottom-[5vw] right-[4.5vw] flex items-center gap-2">
        <button
          onClick={onOpenSelection}
          className="group relative inline-flex items-center justify-center gap-3 h-[46px] sm:h-[50px] px-6 rounded-full border border-[#BC2327] text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#BC2327] overflow-hidden transition-all duration-500 hover:text-[#1A0A0C] hover:border-[#C5A867] shadow-2xl cursor-pointer"
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
    </div>
  );
}
