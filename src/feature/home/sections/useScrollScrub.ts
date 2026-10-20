"use client";

import { RefObject, useEffect, useRef } from "react";
import { clamp } from "./luxury";

/**
 * Same engine as the hero: scroll sets a target (0 → 1) for a tall container,
 * a smoothed value chases it, and the loop sleeps when nothing is moving or
 * the section is off-screen. `onUpdate` receives the smoothed progress.
 */
export function useScrollScrub(
  containerRef: RefObject<HTMLElement | null>,
  onUpdate: (progress: number) => void,
  smoothing = 12,
) {
  const cb = useRef(onUpdate);
  cb.current = onUpdate;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    let current = 0;
    let target = 0;
    let raf: number | null = null;
    let last = 0;
    let inView = true;

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const diff = target - current;
      current =
        reduce || Math.abs(diff) < 0.0005
          ? target
          : current + diff * (1 - Math.exp(-dt * smoothing));

      cb.current(current);

      if (current === target || !inView) {
        raf = null;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf !== null) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      // data-tail="100" = the next section slides over the last 100vh
      const tail = (parseFloat(el.dataset.tail ?? "0") / 100) * window.innerHeight;
      const scrollable = el.offsetHeight - window.innerHeight - tail;
      if (scrollable <= 0) return;
      target = clamp(-el.getBoundingClientRect().top / scrollable, 0, 1);

      // Off-screen: jump straight to the end state (0 or 1) so the section is
      // already in the right place when it scrolls back into view.
      if (!inView) {
        if (current !== target) {
          current = target;
          cb.current(current);
        }
        return;
      }
      start();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        onScroll();
      },
      { threshold: 0, rootMargin: "20% 0px" },
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    cb.current(0);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [containerRef, smoothing]);
}