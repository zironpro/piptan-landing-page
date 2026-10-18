"use client";

import React, { useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <section
      id="executive-film"
      className="relative z-10 w-full pt-16 sm:pt-24 pb-28 sm:pb-36 bg-white text-[#111215] overflow-hidden border-t border-black/5"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 pb-10 md:pb-14 border-b border-black/[0.08] text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0 space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-[11px] font-mono uppercase tracking-[0.22em] text-[#6b7280]">
              <Sparkles className="w-3 h-3 text-[#bc2327]" />
              <span>Executive Briefing Film</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#0f1115] leading-[1.12]">
              The bilateral thesis,{" "}
              <span className="font-serif italic font-normal text-[#bc2327]">
                captured in motion
              </span>.
            </h2>
          </div>

          <p className="max-w-md mx-auto md:mx-0 text-sm sm:text-base text-[#525866] font-normal leading-relaxed">
            A comprehensive executive documentary detailing how Piptan Investment &amp; Securities bridges Gulf institutional liquidity with sovereign-grade African real asset corridors.
          </p>
        </div>

        {/* Autoplay Video Player Container */}
        <div className="pt-12 sm:pt-16">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-[#0c0d11] shadow-2xl shadow-black/15 border border-black/10 group">
            {/* HTML5 Video Element - Clean Autoplay, loop, muted */}
            <video
              ref={videoRef}
              src="/video/piptan.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
