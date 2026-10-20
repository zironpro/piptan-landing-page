"use client";

import Image from "next/image";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Fonts — the Piptan logo stays an untouched SVG; these only style   */
/*  the supporting copy.                                               */
/* ------------------------------------------------------------------ */
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans-lux",
  display: "swap",
});

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */
const TOTAL_FRAMES = 120;
const READY_FRAMES = 12; // reveal once this many are decoded
const BATCH_SIZE = 6; // frames requested in parallel (keeps network sane)
const SMOOTHING = 14; // higher = snappier scroll follow

const INK = "#08080a";
const GOLD = "#c9a96a";
const GOLD_SOFT = "#e6d3a3";
const IVORY = "#f4efe6";

const getFramePath = (index: number) =>
  `/frames/frame_${String(index).padStart(4, "0")}.webp`;

const STORY_STAGES = [
  {
    start: 24,
    end: 55,
    numeral: "I",
    title: "Bridging Gulf Capital with African Growth Corridors",
    description:
      "Deploying syndicated private capital across institutional energy, industrial logistics, and high-alpha sovereign infrastructure.",
    align: "left" as const,
  },
  {
    start: 56,
    end: 88,
    numeral: "II",
    title: "Sovereign-Grade Micro-Grids & Logistics Hubs",
    description:
      "Dollarized power purchase off-takes and regional commercial hubs structured under English Common Law fiduciary protections.",
    align: "right" as const,
  },
  {
    start: 89,
    end: 118,
    numeral: "III",
    title: "The Next Era of Multilateral Co-Investment",
    description:
      "Transforming frontier markets into institutional-grade asset classes with unmatched fiduciary governance.",
    align: "center" as const,
  },
];

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const lastDrawnRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const inViewRef = useRef(true);
  const reducedMotionRef = useRef(false);

  const [isReady, setIsReady] = useState(false);

  /* ---------- draw (cover-fit, falls back to nearest loaded frame) --- */
  const drawFrame = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // Find the closest decoded frame at or before the requested one,
    // then after it, so scrubbing never shows a blank canvas.
    let idx = frame;
    const loaded = loadedRef.current;
    if (!loaded[idx - 1]) {
      let found = 0;
      for (let d = 1; d < TOTAL_FRAMES; d++) {
        if (idx - d >= 1 && loaded[idx - d - 1]) {
          found = idx - d;
          break;
        }
        if (idx + d <= TOTAL_FRAMES && loaded[idx + d - 1]) {
          found = idx + d;
          break;
        }
      }
      if (!found) return;
      idx = found;
    }

    if (lastDrawnRef.current === idx) return;
    const img = imagesRef.current[idx - 1];
    if (!img || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const ratio = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const rw = img.naturalWidth * ratio;
    const rh = img.naturalHeight * ratio;

    ctx.drawImage(img, (cw - rw) / 2, (ch - rh) / 2, rw, rh);
    lastDrawnRef.current = idx;
  }, []);

  /* ---------- frame preloading (batched, key frame first) ------------ */
  useEffect(() => {
    let active = true;
    let loadedCount = 0;
    let revealed = false;

    const images: HTMLImageElement[] = Array.from(
      { length: TOTAL_FRAMES },
      () => new window.Image(),
    );
    imagesRef.current = images;

    const markLoaded = (index: number, ok: boolean) => {
      if (!active) return;
      if (ok) loadedRef.current[index - 1] = true;
      loadedCount++;

      if (index === 1 && ok) drawFrame(1);

      if (!revealed && loadedCount >= READY_FRAMES) {
        revealed = true;
        drawFrame(Math.round(currentFrameRef.current));
        setIsReady(true);
      }
    };

    const loadOne = (index: number) =>
      new Promise<void>((resolve) => {
        const img = images[index - 1];
        img.decoding = "async";
        img.onload = () => {
          // decode() moves the expensive work off the scroll path
          (img.decode ? img.decode() : Promise.resolve())
            .catch(() => undefined)
            .then(() => {
              markLoaded(index, true);
              resolve();
            });
        };
        img.onerror = () => {
          markLoaded(index, false);
          resolve();
        };
        img.src = getFramePath(index);
      });

    (async () => {
      await loadOne(1); // first frame alone → fastest possible first paint
      for (let i = 2; i <= TOTAL_FRAMES && active; i += BATCH_SIZE) {
        const batch: Promise<void>[] = [];
        for (let j = i; j < i + BATCH_SIZE && j <= TOTAL_FRAMES; j++) {
          batch.push(loadOne(j));
        }
        await Promise.all(batch);
      }
    })();

    return () => {
      active = false;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [drawFrame]);

  /* ---------- canvas sizing (debounced) ------------------------------ */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d", { alpha: false });
    if (ctxRef.current) ctxRef.current.imageSmoothingQuality = "high";

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        if (ctxRef.current) ctxRef.current.imageSmoothingQuality = "high";
        lastDrawnRef.current = 0; // force redraw after resize
        drawFrame(Math.round(currentFrameRef.current));
      }
    };

    const onResize = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(resize, 120);
    };

    resize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, [drawFrame]);

  /* ---------- scroll → frame, with an on-demand animation loop ------- */
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const applyOverlays = (frame: number) => {
      // Logo fades out over the first ~18 frames
      const logo = logoRef.current;
      if (logo) {
        const p = clamp((frame - 1) / 18, 0, 1);
        const o = 1 - p;
        logo.style.opacity = String(o);
        logo.style.transform = `translate3d(0, ${-p * 24}px, 0) scale(${1 + p * 0.06})`;
        logo.style.visibility = o <= 0.001 ? "hidden" : "visible";
      }

      // Chapter captions
      STORY_STAGES.forEach((stage, i) => {
        const el = stageRefs.current[i];
        if (!el) return;
        const span = 6;
        let opacity = 0;
        let y = 20;

        if (frame >= stage.start && frame <= stage.end) {
          if (frame < stage.start + span) {
            const p = (frame - stage.start) / span;
            opacity = p;
            y = 20 * (1 - p);
          } else if (frame > stage.end - span) {
            const p = (stage.end - frame) / span;
            opacity = p;
            y = -20 * (1 - p);
          } else {
            opacity = 1;
            y = 0;
          }
        }
        el.style.opacity = String(opacity);
        el.style.transform = `translate3d(0, ${y}px, 0)`;
        el.style.visibility = opacity <= 0.001 ? "hidden" : "visible";
      });

      // Gold progress rail
      const rail = railRef.current;
      if (rail) {
        rail.style.transform = `scaleY(${(frame - 1) / (TOTAL_FRAMES - 1)})`;
      }
    };

    const stop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const loop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;

      let next = current;
      if (reducedMotionRef.current || Math.abs(diff) < 0.02) {
        next = target;
      } else {
        next = current + diff * (1 - Math.exp(-dt * SMOOTHING));
      }
      currentFrameRef.current = next;

      drawFrame(clamp(Math.round(next), 1, TOTAL_FRAMES));
      applyOverlays(next);

      // Idle → stop burning frames until the next scroll event
      if (next === target || !inViewRef.current) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (rafRef.current !== null) return;
      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const rect = el.getBoundingClientRect();
      const progress = clamp(-rect.top / scrollable, 0, 1);
      targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);
      start();
    };

    // Pause everything while the hero is off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) onScroll();
      },
      { threshold: 0 },
    );
    if (containerRef.current) io.observe(containerRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    applyOverlays(1);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      stop();
    };
  }, [drawFrame]);

  /* ---------- render -------------------------------------------------- */
  return (
    <div
      ref={containerRef}
      className={`${display.variable} ${sans.variable} relative w-full`}
      style={{ height: "450vh", backgroundColor: INK }}
    >
      <div className="sticky top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="h-full w-full object-cover transition-opacity duration-1000 ease-out"
          style={{ opacity: isReady ? 1 : 0 }}
        />

        {/* Hairline frame — quiet luxury detail */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 z-10 sm:inset-5 md:inset-7"
          style={{ border: `1px solid ${GOLD}22` }}
        />

        {/* Opening scene: logo (unchanged) + subtitle */}
        <div
          ref={logoRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center will-change-[transform,opacity]"
          style={{ opacity: isReady ? 1 : 0 }}
        >
          <div className="relative w-[85%] max-w-[560px] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[800px] drop-shadow-[0_8px_40px_rgba(0,0,0,0.75)]">
            <Image
              src="/piptan-logo.svg"
              alt="Piptan Logo"
              width={613}
              height={93}
              priority
              className="h-auto w-full object-contain brightness-0 invert"
            />
          </div>

          <div className="mt-8 flex items-center gap-4 sm:gap-5">
            <span
              className="h-px w-8 sm:w-14"
              style={{
                background: `linear-gradient(to right, transparent, ${GOLD})`,
              }}
            />
            <p
              className="text-[10px] font-light uppercase tracking-[0.42em] sm:text-xs md:text-[13px]"
              style={{
                color: IVORY,
                fontFamily: "var(--font-sans-lux), system-ui, sans-serif",
                textShadow: "0 4px 18px rgba(0,0,0,0.8)",
              }}
            >
              Investment
              <Diamond />
              Securities
              <Diamond />
              Sovereign Corridors
            </p>
            <span
              className="h-px w-8 sm:w-14"
              style={{
                background: `linear-gradient(to left, transparent, ${GOLD})`,
              }}
            />
          </div>
        </div>

        {/* Story chapters */}
        <div className="pointer-events-none absolute inset-0 z-20 mx-auto flex max-w-7xl items-center justify-center px-8 sm:px-14 md:px-24">
          {STORY_STAGES.map((stage, idx) => {
            const alignClass =
              stage.align === "left"
                ? "left-8 sm:left-14 md:left-24 text-left items-start"
                : stage.align === "right"
                  ? "right-8 sm:right-14 md:right-24 ml-auto text-right items-end"
                  : "inset-x-0 mx-auto text-center items-center";

            return (
              <div
                key={stage.numeral}
                ref={(el) => {
                  stageRefs.current[idx] = el;
                }}
                className={`absolute flex w-full max-w-2xl flex-col will-change-[transform,opacity] ${alignClass}`}
                style={{ opacity: 0, visibility: "hidden" }}
              >
                {/* Soft local scrim instead of a blurred card (cheaper to paint) */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-x-10 -inset-y-12 -z-10"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(8,8,10,0.62) 0%, rgba(8,8,10,0.35) 55%, transparent 78%)",
                  }}
                />

                <span
                  className="mb-5 text-3xl italic sm:text-4xl"
                  style={{
                    color: GOLD,
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  {stage.numeral}
                </span>

                <span
                  aria-hidden="true"
                  className="mb-6 block h-px w-14"
                  style={{ background: GOLD }}
                />

                <h2
                  className="text-balance text-[1.75rem] leading-[1.12] sm:text-4xl md:text-5xl lg:text-[3.35rem]"
                  style={{
                    color: IVORY,
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontWeight: 300,
                    letterSpacing: "-0.01em",
                    textShadow: "0 2px 24px rgba(0,0,0,0.55)",
                  }}
                >
                  {stage.title}
                </h2>

                <p
                  className="mt-6 max-w-md text-[13px] font-light leading-[1.85] sm:text-sm md:text-[15px]"
                  style={{
                    color: "rgba(244,239,230,0.74)",
                    fontFamily: "var(--font-sans-lux), system-ui, sans-serif",
                    letterSpacing: "0.015em",
                  }}
                >
                  {stage.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Gold scroll-progress rail */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-1/2 z-20 hidden h-40 w-px -translate-y-1/2 md:right-10 md:block"
          style={{ background: "rgba(244,239,230,0.14)" }}
        >
          <div
            ref={railRef}
            className="h-full w-full origin-top will-change-transform"
            style={{
              background: `linear-gradient(to bottom, ${GOLD_SOFT}, ${GOLD})`,
              transform: "scaleY(0)",
            }}
          />
        </div>

        {/* Blend into next section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
          style={{
            background: `linear-gradient(to top, ${INK} 0%, ${INK}66 45%, transparent 100%)`,
          }}
        />

        {/* Scroll cue */}
        <div
          className="pointer-events-none absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 transition-opacity duration-700"
          style={{ opacity: isReady ? 0.85 : 0 }}
        >
          <span
            className="text-[10px] font-light uppercase tracking-[0.4em]"
            style={{
              color: "rgba(244,239,230,0.65)",
              fontFamily: "var(--font-sans-lux), system-ui, sans-serif",
            }}
          >
            Scroll to explore
          </span>
          <span
            aria-hidden="true"
            className="relative block h-10 w-px overflow-hidden"
            style={{ background: "rgba(244,239,230,0.18)" }}
          >
            <span
              className="absolute inset-x-0 top-0 block h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] motion-reduce:animate-none"
              style={{ background: GOLD }}
            />
          </span>
        </div>

        {/* Loader */}
        <div
          className="absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-700"
          style={{
            backgroundColor: INK,
            opacity: isReady ? 0 : 1,
            visibility: isReady ? "hidden" : "visible",
          }}
          aria-hidden={isReady}
        >
          <span
            className="block h-px w-24 origin-left animate-[loadline_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
            style={{ background: GOLD }}
          />
        </div>
      </div>

      {/* Keyframes scoped to this component */}
      <style>{`
        @keyframes scrollcue {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes loadline {
          0%   { transform: scaleX(0); opacity: .4; }
          50%  { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: .4; transform-origin: right; }
        }
      `}</style>
    </div>
  );
}

/* Small gold diamond used as a separator in the subtitle */
function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="mx-3 inline-block h-[5px] w-[5px] rotate-45 align-middle sm:mx-4"
      style={{ backgroundColor: GOLD }}
    />
  );
}