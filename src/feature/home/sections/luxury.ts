import { Cormorant_Garamond, Manrope } from "next/font/google";

/* Loaded once, shared by the hero and every section after it. */
export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans-lux",
  display: "swap",
});

export const C = {
  INK: "#08080a",
  GOLD: "#c9a96a",
  GOLD_SOFT: "#e6d3a3",
  IVORY: "#f4efe6",
} as const;

export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const fontVars = `${display.variable} ${sans.variable}`;
export const DISPLAY_FF = "var(--font-display), Georgia, serif";
export const SANS_FF = "var(--font-sans-lux), system-ui, sans-serif";

export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/**
 * Section pictures. These default to frames from your hero animation so the
 * page works immediately and stays visually consistent. To use your own
 * photography, drop files in /public/images and swap the paths here.
 */
export const IMAGES = {
  mandate: "/frames/frame_0030.webp",
  energy: "/images/energy_corridor.jpg",
  logistics: "/images/logistics_corridor.jpg",
  securities: "/images/securities_corridor.jpg",
  governance: "/images/governance.jpg",
  // Panorama image: 1920 x 1728 px. It is shown full-width, so the scroll stays short.
  panorama: "/images/panorama.png",
  process: [
    "/images/process_source.jpg",
    "/images/process_structure.jpg",
    "/images/process_deploy.jpg",
    "/images/process_steward.jpg",
  ],
  contact: "/frames/frame_0118.webp",
} as const;

/** Per-section colour themes so the page alternates light and dark. */
export const THEMES = {
  dark: {
    bg: "#08080a",
    card: "#0e0e11",
    text: "#f4efe6",
    muted: "rgba(244,239,230,0.76)",
    faint: "rgba(244,239,230,0.5)",
    hair: "rgba(244,239,230,0.14)",
    gold: "#c9a96a",
    goldSoft: "#e6d3a3",
    accent: "#c9a96a",
    shadow: "0 2px 30px rgba(0,0,0,0.6)",
    imgOpacity: 0.5,
  },
  light: {
    bg: "#f4efe6",
    card: "#fbf8f2",
    text: "#16130f",
    muted: "rgba(22,19,15,0.7)",
    faint: "rgba(22,19,15,0.5)",
    hair: "rgba(22,19,15,0.16)",
    gold: "#8f6f34",
    goldSoft: "#8f6f34",
    accent: "#8f6f34",
    shadow: "none",
    imgOpacity: 0.22,
  },
  stone: {
    bg: "#e6dcc8",
    card: "#f1eadb",
    text: "#16130f",
    muted: "rgba(22,19,15,0.72)",
    faint: "rgba(22,19,15,0.5)",
    hair: "rgba(22,19,15,0.18)",
    gold: "#8a6a30",
    goldSoft: "#8a6a30",
    accent: "#8a6a30",
    shadow: "none",
    imgOpacity: 1,
  },
  oxblood: {
    bg: "#12080a",
    card: "#1b0c0f",
    text: "#f4efe6",
    muted: "rgba(244,239,230,0.78)",
    faint: "rgba(244,239,230,0.5)",
    hair: "rgba(244,239,230,0.14)",
    gold: "#c9a96a",
    goldSoft: "#e6d3a3",
    accent: "#e04347",
    shadow: "0 2px 30px rgba(0,0,0,0.6)",
    imgOpacity: 1,
  },
} as const;