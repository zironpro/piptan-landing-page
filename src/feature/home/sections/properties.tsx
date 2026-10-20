"use client";

import Image from "next/image";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useScrollScrub } from "./useScrollScrub";
import { useEntry } from "./useEntry";
import { C, DISPLAY_FF, EASE, IMAGES, SANS_FF, THEMES, clamp, fontVars } from "./luxury";

/* ------------------------------------------------------------------ */
/*  Shared picture block: cover-fit image inside a clipped frame.      */
/*  `innerRef` lets a section drive parallax / zoom without re-render. */
/* ------------------------------------------------------------------ */
function Picture({
  src,
  innerRef,
  className = "",
  style,
  imageOpacity = 1,
  sizes = "100vw",
  children,
}: {
  src: string;
  innerRef?: (el: HTMLDivElement | null) => void;
  className?: string;
  style?: React.CSSProperties;
  imageOpacity?: number;
  sizes?: string;
  children?: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div
        ref={innerRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.12)" }}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
          style={{ opacity: imageOpacity }}
        />
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cover edges: each section slides up OVER the previous one, which   */
/*  stays pinned underneath. The leading edge has its own shape.       */
/* ------------------------------------------------------------------ */
type EdgeShape = "slash" | "slashRev" | "wave" | "steps" | "chevron";

// Points are [x in %, depth 0..1]. depth 1 = lowest point of the edge.
const EDGE_POINTS: Record<EdgeShape, [number, number][]> = {
  slash: [[0, 1], [100, 0]],
  slashRev: [[0, 0], [100, 1]],
  chevron: [[0, 1], [50, 0], [100, 1]],
  wave: Array.from({ length: 41 }, (_, i) => {
    const x = i * 2.5;
    return [x, 0.5 + 0.5 * Math.sin((x / 100) * Math.PI * 4)] as [number, number];
  }),
  steps: (() => {
    const pts: [number, number][] = [];
    const n = 6;
    for (let i = 0; i < n; i++) {
      const y = 1 - i / (n - 1);
      pts.push([(i * 100) / n, y], [((i + 1) * 100) / n, y]);
    }
    return pts;
  })(),
};

const EDGE_DEPTH_VH = 9;

function coverClip(shape: EdgeShape) {
  const top = EDGE_POINTS[shape]
    .map(([x, d]) => `${x}% ${(d * EDGE_DEPTH_VH).toFixed(2)}vh`)
    .join(", ");
  return `polygon(${top}, 100% 100%, 0% 100%)`;
}

function CoverEdge({ shape, color }: { shape: EdgeShape; color: string }) {
  const pts = EDGE_POINTS[shape].map(([x, d]) => `${x},${d * 100}`).join(" ");
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-0 top-0 z-30 w-full"
      style={{ height: `${EDGE_DEPTH_VH}vh` }}
      fill="none"
    >
      <polyline
        points={pts}
        stroke={color}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function coverStyle(
  shape: EdgeShape,
  z: number,
  extra: React.CSSProperties = {},
): React.CSSProperties {
  return {
    position: "relative",
    marginTop: "-100vh",
    zIndex: z,
    clipPath: coverClip(shape),
    ...extra,
  };
}

const Rule = ({
  className = "",
  color,
}: {
  className?: string;
  color: string;
}) => (
  <span
    aria-hidden="true"
    className={`block h-px w-14 ${className}`}
    style={{ background: color }}
  />
);

/* ================================================================== */
/*  1 · MANDATE — statement over a drifting picture + route diagram    */
/* ================================================================== */
const MANDATE =
  "Piptan brings Gulf capital to Africa’s growth corridors, and holds every investment to the standard of an institution.";

const ROUTES = [
  { label: "Energy", d: "M170 70 C 420 10, 700 40, 930 70", x: 930, y: 70 },
  { label: "Logistics", d: "M170 70 C 420 90, 700 140, 960 150", x: 960, y: 150 },
  { label: "Securities", d: "M170 70 C 380 150, 640 230, 900 225", x: 900, y: 225 },
];

export function MandateSection() {
  const T = THEMES.light;
  const ref = useRef<HTMLDivElement>(null);
  const { entered, reduce } = useEntry(ref);
  const lineRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const words = useMemo(() => MANDATE.split(" "), []);

  useScrollScrub(ref, (p) => {
    const n = words.length;
    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      const t = clamp((p * 1.1 * (n + 4) - i) / 4, 0, 1);
      el.style.opacity = String(0.14 + 0.86 * t);
    });

    // Picture slowly pushes in
    if (bgRef.current) {
      bgRef.current.style.transform = `scale(${1.08 + p * 0.18}) translate3d(0, ${p * -24}px, 0)`;
    }

    // Routes draw one after another in the second half
    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      const t = clamp((p - 0.35 - i * 0.12) / 0.3, 0, 1);
      el.style.strokeDashoffset = String(1 - t);
      const node = nodeRefs.current[i];
      if (node) node.style.opacity = String(clamp((t - 0.7) / 0.3, 0, 1));
    });

    if (lineRef.current) lineRef.current.style.transform = `scaleX(${p})`;
  });

  return (
    <section
      ref={ref}
      data-tail="100"
      aria-label="Mandate"
      className={`${fontVars} relative w-full`}
      style={coverStyle("slash", 1, { height: "400vh", backgroundColor: T.bg })}
    >
      <CoverEdge shape="slash" color={T.gold} />
      <div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-8 sm:px-14 md:px-24"
        style={{
          clipPath: entered ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          transition: reduce ? "none" : `clip-path 3200ms ${EASE}`,
        }}
      >
        {/* Picture, feathered into the ink so there are no hard edges */}
        <Picture
          src={IMAGES.mandate}
          innerRef={(el) => {
            bgRef.current = el;
          }}
          imageOpacity={T.imgOpacity}
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 45%, #000 25%, transparent 78%)",
            maskImage:
              "radial-gradient(ellipse at 50% 45%, #000 25%, transparent 78%)",
          }}
        />

        <p
          className="relative max-w-5xl text-balance text-center text-[1.9rem] leading-[1.25] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          style={{
            color: T.text,
            fontFamily: DISPLAY_FF,
            fontWeight: 300,
            letterSpacing: "-0.01em",
            textShadow: T.shadow,
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="inline-block will-change-[opacity]"
              style={{ opacity: 0.14, marginRight: "0.28em" }}
            >
              {w}
            </span>
          ))}
        </p>

        {/* Capital route diagram: Gulf → three corridors */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1100 260"
          className="pointer-events-none absolute bottom-20 left-1/2 hidden w-[min(92vw,1100px)] -translate-x-1/2 md:block"
          fill="none"
        >
          <g>
            <circle cx="170" cy="70" r="5" fill={T.gold} />
            <circle cx="170" cy="70" r="13" stroke={T.gold} strokeOpacity="0.4" />
            <text
              x="170"
              y="105"
              textAnchor="middle"
              fill={T.goldSoft}
              fontSize="14"
              fontFamily="var(--font-display), Georgia, serif"
              letterSpacing="1.5"
            >
              Gulf capital
            </text>
          </g>
          {ROUTES.map((r, i) => (
            <g key={r.label}>
              <path
                ref={(el) => {
                  pathRefs.current[i] = el;
                }}
                d={r.d}
                pathLength={1}
                stroke={T.gold}
                strokeWidth="1.2"
                strokeDasharray="1"
                strokeDashoffset="1"
                strokeLinecap="round"
              />
              <g
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                style={{ opacity: 0 }}
              >
                <circle cx={r.x} cy={r.y} r="4" fill={T.goldSoft} />
                <text
                  x={r.x + 16}
                  y={r.y + 5}
                  fill={T.text}
                  fontSize="15"
                  fontFamily="var(--font-display), Georgia, serif"
                  letterSpacing="1.5"
                >
                  {r.label}
                </text>
              </g>
            </g>
          ))}
        </svg>

        <div
          aria-hidden="true"
          className="absolute bottom-10 h-px w-40 sm:w-64"
          style={{ background: T.hair }}
        >
          <div
            ref={lineRef}
            className="h-full w-full origin-left will-change-transform"
            style={{ background: T.gold, transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  2 · CORRIDORS — pinned horizontal scroll, one picture per corridor */
/* ================================================================== */
const CORRIDORS = [
  {
    numeral: "I",
    image: IMAGES.energy,
    title: "Energy & Micro-Grids",
    text: "Dollarized power purchase off-takes, structured for institutional investors who need predictable, hard-currency returns.",
    points: ["Power purchase off-takes", "Micro-grid infrastructure"],
  },
  {
    numeral: "II",
    image: IMAGES.logistics,
    title: "Logistics & Commercial Hubs",
    text: "Regional commercial hubs and industrial logistics that connect African producers to Gulf and global markets.",
    points: ["Regional commercial hubs", "Industrial logistics"],
  },
  {
    numeral: "III",
    image: IMAGES.securities,
    title: "Securities & Syndication",
    text: "Private capital syndicated across sovereign-grade assets, turning frontier markets into institutional-grade asset classes.",
    points: ["Syndicated private capital", "Institutional-grade structuring"],
  },
];

export function CorridorsSection() {
  const T = THEMES.dark;
  const ref = useRef<HTMLDivElement>(null);
  const { entered, reduce } = useEntry(ref);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const picRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maxShiftRef = useRef(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) {
        maxShiftRef.current = Math.max(0, track.scrollWidth - window.innerWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  useScrollScrub(ref, (p) => {
    const pp = clamp((p - 0.04) / 0.92, 0, 1);
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-pp * maxShiftRef.current}px,0,0)`;
    }
    // Each picture slides against the track → depth
    picRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = (pp * (CORRIDORS.length - 1) - i) * -60;
      el.style.transform = `scale(1.22) translate3d(${offset}px,0,0)`;
    });
    if (barRef.current) barRef.current.style.transform = `scaleX(${pp})`;
  });

  return (
    <section
      ref={ref}
      data-tail="100"
      aria-label="Strategic corridors"
      className={`${fontVars} relative w-full`}
      style={coverStyle("wave", 2, { height: "520vh", backgroundColor: T.bg })}
    >
      <CoverEdge shape="wave" color={T.gold} />
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          clipPath: entered ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
          transition: reduce ? "none" : `clip-path 3200ms ${EASE}`,
        }}
      >
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${CORRIDORS.length * 100}vw` }}
        >
          {CORRIDORS.map((c, i) => (
            <article
              key={c.numeral}
              className="flex h-full w-screen shrink-0 flex-col items-center justify-center gap-7 px-8 pt-16 sm:px-14 md:flex-row md:gap-16 md:px-24"
            >
              <Picture
                src={c.image}
                innerRef={(el) => {
                  picRefs.current[i] = el;
                }}
                sizes="(min-width: 768px) 40vw, 90vw"
                className="h-[36vh] w-full shrink-0 md:h-[64vh] md:w-[38vw]"
                style={{ border: `1px solid ${T.gold}66` }}
              >
                <span
                  className="absolute bottom-3 left-5 italic"
                  style={{
                    color: T.goldSoft,
                    fontFamily: DISPLAY_FF,
                    fontWeight: 300,
                    fontSize: "clamp(3rem, 7vw, 5.5rem)",
                    lineHeight: 1,
                    textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                  }}
                >
                  {c.numeral}
                </span>
              </Picture>

              <div className="w-full max-w-xl text-left">
                <Rule color={T.gold} className="mb-6" />
                <h3
                  className="text-balance text-3xl leading-[1.12] sm:text-4xl md:text-5xl"
                  style={{
                    color: T.text,
                    fontFamily: DISPLAY_FF,
                    fontWeight: 300,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="mt-5 max-w-md text-[13px] font-light leading-[1.85] sm:text-sm md:text-[15px]"
                  style={{
                    color: T.muted,
                    fontFamily: SANS_FF,
                    letterSpacing: "0.015em",
                  }}
                >
                  {c.text}
                </p>
                <ul className="mt-6 space-y-3">
                  {c.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-4 text-[13px] font-light"
                      style={{
                        color: T.text,
                        fontFamily: SANS_FF,
                        letterSpacing: "0.02em",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block h-[5px] w-[5px] rotate-45"
                        style={{ backgroundColor: T.gold }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-10 z-20 flex items-center gap-6 px-8 sm:px-14 md:px-24">
          <span
            className="text-sm font-light tracking-[0.12em] sm:text-base"
            style={{ color: T.goldSoft, fontFamily: DISPLAY_FF }}
          >
            Strategic corridors
          </span>
          <div
            aria-hidden="true"
            className="h-px flex-1"
            style={{ background: T.hair }}
          >
            <div
              ref={barRef}
              className="h-full w-full origin-left will-change-transform"
              style={{ background: T.gold, transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  3 · GOVERNANCE — arch picture + pillars with line icons            */
/* ================================================================== */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PILLARS: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "English Common Law",
    text: "Every structure sits under English Common Law, with fiduciary protections written into the agreements.",
    icon: (
      <g {...stroke}>
        <path d="M12 4v16M6 20h12M5 8h14" />
        <path d="M5 8l-2.5 6a3 3 0 005 0zM19 8l-2.5 6a3 3 0 005 0z" />
      </g>
    ),
  },
  {
    title: "Dollarized returns",
    text: "Power purchase off-takes are denominated in dollars, keeping revenue in hard currency.",
    icon: (
      <g {...stroke}>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.2c-.4-.9-1.4-1.4-2.5-1.4-1.4 0-2.4.8-2.4 1.9 0 2.6 5 1.4 5 4 0 1.1-1.1 1.9-2.6 1.9-1.2 0-2.2-.5-2.6-1.5M12 6.5v1.3M12 15.9v1.6" />
      </g>
    ),
  },
  {
    title: "Syndicated capital",
    text: "Private capital is pooled across partners and deployed into sovereign-grade infrastructure.",
    icon: (
      <g {...stroke}>
        <circle cx="6" cy="7" r="2.2" />
        <circle cx="18" cy="7" r="2.2" />
        <circle cx="12" cy="18" r="2.2" />
        <path d="M8 8l3 8M16 8l-3 8M8.2 7h7.6" />
      </g>
    ),
  },
  {
    title: "Fiduciary governance",
    text: "Frontier assets are managed to institutional standards of oversight and reporting.",
    icon: (
      <g {...stroke}>
        <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </g>
    ),
  },
];

export function GovernanceSection() {
  const T = THEMES.stone;
  const ref = useRef<HTMLDivElement>(null);
  const { entered, reduce } = useEntry(ref);
  const railRef = useRef<HTMLDivElement>(null);
  const picRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useScrollScrub(ref, (p) => {
    const n = PILLARS.length;
    const a = clamp(p * 1.05, 0, 1) * n;

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      const w = clamp(1 - Math.abs(a - (i + 0.5)), 0, 1);
      row.style.opacity = String(0.2 + 0.8 * w);
      row.style.transform = `translate3d(${(1 - w) * 18}px,0,0)`;
      const mark = markRefs.current[i];
      if (mark) mark.style.transform = `scaleX(${w})`;
    });
    if (railRef.current) railRef.current.style.transform = `scaleY(${p})`;
    if (picRef.current) {
      picRef.current.style.transform = `scale(${1.1 + p * 0.14}) translate3d(0, ${p * -30}px, 0)`;
    }
  });

  return (
    <section
      ref={ref}
      data-tail="100"
      aria-label="Governance"
      className={`${fontVars} relative w-full`}
      style={coverStyle("steps", 3, { height: "480vh", backgroundColor: T.bg })}
    >
      <CoverEdge shape="steps" color={T.gold} />
      <div
        className="sticky top-0 flex h-screen w-full items-center overflow-hidden px-8 sm:px-14 md:px-24"
        style={{
          clipPath: entered ? "inset(0% 0% 0% 0%)" : "inset(0% 50% 0% 50%)",
          transition: reduce ? "none" : `clip-path 3200ms ${EASE}`,
        }}
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 pt-6 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          {/* Arch-shaped picture */}
          <Picture
            src={IMAGES.governance}
            innerRef={(el) => {
              picRef.current = el;
            }}
            sizes="(min-width: 768px) 32vw, 70vw"
            className="mx-auto hidden h-[68vh] w-full max-w-[420px] md:block"
            style={{
              borderRadius: "999px 999px 0 0",
              border: `1px solid ${T.gold}55`,
            }}
          />

          <div>
            <Rule color={T.gold} className="mb-5" />
            <h2
              className="mb-8 max-w-xl text-balance text-3xl leading-[1.1] sm:text-4xl md:text-5xl"
              style={{
                color: T.text,
                fontFamily: DISPLAY_FF,
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              Built to protect capital before it grows it.
            </h2>

            <div className="relative pl-8 md:pl-10">
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0 w-px"
                style={{ background: T.hair }}
              >
                <div
                  ref={railRef}
                  className="h-full w-full origin-top will-change-transform"
                  style={{ background: T.gold, transform: "scaleY(0)" }}
                />
              </div>

              <div className="space-y-5 md:space-y-6">
                {PILLARS.map((pl, i) => (
                  <div
                    key={pl.title}
                    ref={(el) => {
                      rowRefs.current[i] = el;
                    }}
                    className="flex items-start gap-4 will-change-[transform,opacity]"
                    style={{ opacity: 0.2 }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="mt-1 h-7 w-7 shrink-0"
                      style={{ color: T.gold }}
                    >
                      {pl.icon}
                    </svg>
                    <div>
                      <span
                        ref={(el) => {
                          markRefs.current[i] = el;
                        }}
                        aria-hidden="true"
                        className="mb-2 block h-px w-10 origin-left"
                        style={{ background: T.gold, transform: "scaleX(0)" }}
                      />
                      <h3
                        className="text-xl sm:text-2xl"
                        style={{
                          color: T.text,
                          fontFamily: DISPLAY_FF,
                          fontWeight: 400,
                        }}
                      >
                        {pl.title}
                      </h3>
                      <p
                        className="mt-1 max-w-md text-[12.5px] font-light leading-[1.7] sm:text-[13px]"
                        style={{
                          color: T.muted,
                          fontFamily: SANS_FF,
                          letterSpacing: "0.015em",
                        }}
                      >
                        {pl.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  3b · PANORAMA — an image far larger than the screen; scrolling     */
/*  pans across it while captions change at the bottom                 */
/* ================================================================== */
// Your image is 1920 × 1728. It is shown at the full width of the screen, and
// its height follows from that shape, so it is only a little taller than the
// screen and the pan stays short. (Never shorter than the screen itself.)
const IMG_W = 1920;
const IMG_H = 1728;
const PAN_HEIGHT = `max(100vh, ${((IMG_H / IMG_W) * 100).toFixed(2)}vw)`;

const LANDSCAPE = [
  {
    numeral: "I",
    title: "Capital",
    text: "Gulf capital, syndicated and ready to deploy.",
    start: 0.04,
    end: 0.36,
  },
  {
    numeral: "II",
    title: "Corridors",
    text: "Power, logistics and trade routes that link African markets to the world.",
    start: 0.37,
    end: 0.68,
  },
  {
    numeral: "III",
    title: "Assets",
    text: "Sovereign-grade infrastructure, built and governed to institutional standards.",
    start: 0.69,
    end: 0.98,
  },
];

export function PanoramaSection() {
  const T = THEMES.dark;
  const ref = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const miniRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maxRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const measure = () => {
      const big = bigRef.current;
      if (!big) return;
      const w = big.offsetWidth;
      const h = big.offsetHeight;
      maxRef.current = {
        x: Math.max(0, w - window.innerWidth),
        y: Math.max(0, h - window.innerHeight),
      };
      // Minimap mirrors the big image's shape; the box is the visible window
      if (miniRef.current) miniRef.current.style.aspectRatio = `${w} / ${h}`;
      if (boxRef.current) {
        boxRef.current.style.width = `${(window.innerWidth / w) * 100}%`;
        boxRef.current.style.height = `${(window.innerHeight / h) * 100}%`;
      }
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  useScrollScrub(ref, (p) => {
    const pp = clamp((p - 0.02) / 0.96, 0, 1);
    const { x, y } = maxRef.current;

    // Camera path: straight down the tall image
    const px = 0;
    const py = pp;
    if (bigRef.current) {
      bigRef.current.style.transform = `translate3d(${-px * x}px, ${-py * y}px, 0)`;
    }

    if (boxRef.current) {
      const bw = parseFloat(boxRef.current.style.width) || 0;
      const bh = parseFloat(boxRef.current.style.height) || 0;
      boxRef.current.style.left = `${px * (100 - bw)}%`;
      boxRef.current.style.top = `${py * (100 - bh)}%`;
    }

    capRefs.current.forEach((el, i) => {
      if (!el) return;
      const st = LANDSCAPE[i];
      const span = 0.05;
      let o = 0;
      let ty = 18;
      if (pp >= st.start && pp <= st.end) {
        if (pp < st.start + span) {
          const t = (pp - st.start) / span;
          o = t;
          ty = 18 * (1 - t);
        } else if (pp > st.end - span) {
          const t = (st.end - pp) / span;
          o = t;
          ty = -18 * (1 - t);
        } else {
          o = 1;
          ty = 0;
        }
      }
      el.style.opacity = String(o);
      el.style.transform = `translate3d(0, ${ty}px, 0)`;
      el.style.visibility = o <= 0.001 ? "hidden" : "visible";
    });

    if (barRef.current) barRef.current.style.transform = `scaleX(${pp})`;
  });

  return (
    <section
      ref={ref}
      data-tail="100"
      aria-label="The landscape"
      className={`${fontVars} relative w-full`}
      style={{
        position: "relative",
        marginTop: "-100vh",
        zIndex: 4,
        height: "340vh",
        backgroundColor: T.bg,
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* The oversized picture — only a window of it is ever visible */}
        <div
          ref={bigRef}
          aria-hidden="true"
          className="absolute left-0 top-0 will-change-transform"
          style={{ width: "100vw", height: PAN_HEIGHT }}
        >
          <Image
            src={IMAGES.panorama}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Top title + progress */}
        <div className="pointer-events-none absolute inset-x-0 top-10 z-20 flex items-center gap-6 px-8 sm:px-14 md:px-24">
          <span
            className="text-sm font-light tracking-[0.12em] sm:text-base"
            style={{
              color: T.text,
              fontFamily: DISPLAY_FF,
              textShadow: "0 1px 14px rgba(0,0,0,0.8)",
            }}
          >
            The landscape
          </span>
          <div
            aria-hidden="true"
            className="h-px flex-1"
            style={{ background: "rgba(244,239,230,0.3)" }}
          >
            <div
              ref={barRef}
              className="h-full w-full origin-left will-change-transform"
              style={{ background: T.gold, transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* Bottom captions, with just enough shade behind them to read */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[46vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,10,0.88) 0%, rgba(8,8,10,0.5) 45%, transparent 100%)",
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-8 pb-12 sm:px-14 md:px-24 md:pb-16">
          <div className="relative mx-auto h-44 max-w-7xl sm:h-48">
            {LANDSCAPE.map((st, i) => (
              <div
                key={st.numeral}
                ref={(el) => {
                  capRefs.current[i] = el;
                }}
                className="absolute bottom-0 left-0 max-w-xl will-change-[transform,opacity]"
                style={{ opacity: 0, visibility: "hidden" }}
              >
                <div className="flex items-end gap-5">
                  <span
                    aria-hidden="true"
                    className="italic"
                    style={{
                      color: T.gold,
                      fontFamily: DISPLAY_FF,
                      fontWeight: 300,
                      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                      lineHeight: 0.9,
                    }}
                  >
                    {st.numeral}
                  </span>
                  <h3
                    className="text-4xl sm:text-5xl md:text-6xl"
                    style={{
                      color: T.text,
                      fontFamily: DISPLAY_FF,
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                      lineHeight: 0.95,
                    }}
                  >
                    {st.title}
                  </h3>
                </div>
                <Rule color={T.gold} className="my-5" />
                <p
                  className="max-w-md text-[13px] font-light leading-[1.8] sm:text-sm md:text-[15px]"
                  style={{
                    color: "rgba(244,239,230,0.85)",
                    fontFamily: SANS_FF,
                    letterSpacing: "0.015em",
                  }}
                >
                  {st.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Minimap: shows how much of the big picture is in view */}
        <div
          ref={miniRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-12 right-8 z-20 hidden w-28 overflow-hidden sm:block md:bottom-16 md:right-24 md:w-36"
          style={{ border: `1px solid ${T.gold}88` }}
        >
          <Image
            src={IMAGES.panorama}
            alt=""
            fill
            sizes="150px"
            className="object-cover opacity-70"
          />
          <div
            ref={boxRef}
            className="absolute"
            style={{
              border: `1px solid ${T.text}`,
              background: "rgba(244,239,230,0.14)",
              width: "38%",
              height: "62%",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  4 · PROCESS — picture cards rise and stack as you scroll           */
/* ================================================================== */
const STEPS = [
  {
    numeral: "I",
    title: "Source",
    text: "We originate opportunities across energy, logistics and infrastructure in Africa’s growth corridors.",
  },
  {
    numeral: "II",
    title: "Structure",
    text: "Each investment is structured under English Common Law, with dollarized revenue and fiduciary protections.",
  },
  {
    numeral: "III",
    title: "Deploy",
    text: "Syndicated private capital from Gulf partners is placed into the asset, on terms agreed up front.",
  },
  {
    numeral: "IV",
    title: "Steward",
    text: "We govern the asset to institutional standards for as long as the capital is invested.",
  },
];

export function ProcessSection() {
  const T = THEMES.oxblood;
  const ref = useRef<HTMLDivElement>(null);
  const { entered, reduce } = useEntry(ref);
  const barRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const picRefs = useRef<(HTMLDivElement | null)[]>([]);

  useScrollScrub(ref, (p) => {
    const n = STEPS.length;
    const a = clamp((p - 0.05) / 0.9, 0, 1) * (n - 1);

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const t = i === 0 ? 1 : clamp(a - (i - 1), 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const buried = clamp(a - i, 0, n);

      el.style.transform = `translate3d(0, ${(1 - eased) * 110 - buried * 3.2}%, 0) scale(${1 - buried * 0.045})`;
      el.style.filter = `brightness(${1 - Math.min(buried, 3) * 0.22})`;
      el.style.visibility = t <= 0.001 && i !== 0 ? "hidden" : "visible";

      // Picture settles as its card arrives
      const pic = picRefs.current[i];
      if (pic) pic.style.transform = `scale(${1.04 + (1 - eased) * 0.2})`;
    });
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
  });

  return (
    <section
      ref={ref}
      data-tail="100"
      aria-label="How we deploy capital"
      className={`${fontVars} relative w-full`}
      style={coverStyle("slashRev", 5, { height: "500vh", backgroundColor: T.bg })}
    >
      <CoverEdge shape="slashRev" color={T.gold} />
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? "scale(1)" : "scale(0.94)",
          transition: reduce
            ? "none"
            : `opacity 2600ms ${EASE}, transform 3000ms ${EASE}`,
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-10 z-20 flex items-center gap-6 px-8 sm:px-14 md:px-24">
          <span
            className="text-sm font-light tracking-[0.12em] sm:text-base"
            style={{ color: T.goldSoft, fontFamily: DISPLAY_FF }}
          >
            How we deploy capital
          </span>
          <div
            aria-hidden="true"
            className="h-px flex-1"
            style={{ background: T.hair }}
          >
            <div
              ref={barRef}
              className="h-full w-full origin-left will-change-transform"
              style={{ background: T.gold, transform: "scaleX(0)" }}
            />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6 pt-16 sm:px-14 md:px-24">
          <div className="relative h-[64vh] w-full max-w-6xl">
            {STEPS.map((s, i) => (
              <div
                key={s.numeral}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute inset-0 grid grid-rows-[28%_1fr] overflow-hidden will-change-[transform,filter] md:grid-cols-2 md:grid-rows-1"
                style={{
                  backgroundColor: T.card,
                  border: `1px solid ${T.gold}33`,
                  transformOrigin: "50% 0%",
                  zIndex: i + 1,
                }}
              >
                <Picture
                  src={IMAGES.process[i]}
                  innerRef={(el) => {
                    picRefs.current[i] = el;
                  }}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-full w-full md:order-last"
                />
                <div className="flex flex-col justify-center p-6 sm:p-10 md:p-14">
                  <span
                    aria-hidden="true"
                    className="block italic"
                    style={{
                      color: T.accent,
                      fontFamily: DISPLAY_FF,
                      fontWeight: 300,
                      fontSize: "clamp(2.5rem, 6vw, 5rem)",
                      lineHeight: 1,
                    }}
                  >
                    {s.numeral}
                  </span>
                  <h3
                    className="mt-3 text-4xl sm:text-5xl"
                    style={{
                      color: T.text,
                      fontFamily: DISPLAY_FF,
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.title}
                  </h3>
                  <Rule color={T.gold} className="my-5" />
                  <p
                    className="max-w-md text-[13px] font-light leading-[1.8] sm:text-sm md:text-[15px]"
                    style={{
                      color: T.muted,
                      fontFamily: SANS_FF,
                      letterSpacing: "0.015em",
                    }}
                  >
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  5 · CONTACT — one orchestrated reveal over a feathered picture     */
/* ================================================================== */
export function ContactSection() {
  const T = THEMES.dark;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [year, setYear] = useState<number | string>("2026");

  useEffect(() => {
    setYear(new Date().getFullYear());
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const rise = (delay: number) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translate3d(0,0,0)" : "translate3d(0,22px,0)",
    transition: `opacity 2000ms ${ease} ${delay}ms, transform 2000ms ${ease} ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      aria-label="Contact"
      className={`${fontVars} relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-8 pt-32 sm:px-14`}
      style={coverStyle("wave", 6, { backgroundColor: T.bg })}
    >
      <CoverEdge shape="wave" color={T.gold} />
      <Picture
        src={IMAGES.contact}
        imageOpacity={0.45}
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 35%, #000 65%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 35%, #000 65%, transparent 100%)",
          opacity: shown ? 1 : 0,
          transition: `opacity 3200ms ${ease}`,
        }}
      />

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <span
          aria-hidden="true"
          className="mb-10 block h-px w-24 origin-center"
          style={{
            background: T.gold,
            transform: shown ? "scaleX(1)" : "scaleX(0)",
            transition: `transform 2600ms ${ease}`,
          }}
        />

        <h2
          className="max-w-3xl text-balance text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            color: T.text,
            fontFamily: DISPLAY_FF,
            fontWeight: 300,
            letterSpacing: "-0.01em",
            textShadow: T.shadow,
            ...rise(500),
          }}
        >
          Discuss a corridor with us.
        </h2>

        <p
          className="mt-6 max-w-md text-[13px] font-light leading-[1.85] sm:text-sm md:text-[15px]"
          style={{
            color: T.muted,
            fontFamily: SANS_FF,
            letterSpacing: "0.015em",
            ...rise(900),
          }}
        >
          Tell us where your capital wants to go. We will reply with how it can
          be structured.
        </p>

        <div style={rise(1300)}>
          {/* TODO: replace with your real contact address */}
          <a
            href="mailto:contact@piptan.com"
            className="mt-12 inline-block px-10 py-4 text-[13px] font-light tracking-[0.2em] transition-colors duration-500 hover:bg-[#c9a96a] hover:text-[#08080a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a96a]"
            style={{
              color: T.goldSoft,
              border: `1px solid ${T.gold}`,
              fontFamily: SANS_FF,
            }}
          >
            Contact Piptan
          </a>
        </div>
      </div>

      <footer
        className="relative mt-24 flex w-full max-w-7xl flex-col items-center gap-6 pb-10 pt-8 sm:flex-row sm:justify-between"
        style={{ borderTop: `1px solid ${T.hair}` }}
      >
        <div className="w-32 opacity-80">
          <Image
            src="/piptan-logo.svg"
            alt="Piptan"
            width={613}
            height={93}
            className="h-auto w-full object-contain brightness-0 invert"
          />
        </div>
        <p
          className="text-[11px] font-light tracking-[0.08em]"
          style={{ color: T.faint, fontFamily: SANS_FF }}
        >
          © {year} Piptan. All rights reserved.
        </p>
      </footer>
    </section>
  );
}