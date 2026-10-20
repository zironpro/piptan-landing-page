"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Fires once, the first time a section scrolls into view.
 * `reduce` is true for visitors who asked their device for less motion;
 * sections use it to skip the transition and show their content straight away.
 */
export function useEntry(
  ref: RefObject<HTMLElement | null>,
  rootMargin = "0px 0px -25% 0px",
) {
  const [entered, setEntered] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      setEntered(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return { entered, reduce };
}
