"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SitePreloaderProps {
  onComplete: () => void;
}

export default function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const previewImages = [
    "/images/infrastructure.jpg",
    "/images/corridors.jpg",
    "/images/boardroom.jpg",
    "/images/hero_africa.jpg",
  ];

  useEffect(() => {
    // Rapid image frame cycling
    const frameInterval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % previewImages.length);
    }, 240);

    // Counter animation 00 to 99
    const start = performance.now();
    const duration = 1200; // 1.2s rapid counter

    const updateCounter = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const val = Math.floor(progress * 99);
      setCount(val);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        clearInterval(frameInterval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 150);
      }
    };

    const animId = requestAnimationFrame(updateCounter);

    return () => {
      clearInterval(frameInterval);
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  const tens = Math.floor(count / 10);
  const ones = count % 10;

  return (
    <div
      className={`fixed inset-0 z-[1200] grid place-items-center transition-all duration-700 ease-[cubic-bezier(0.7,0.6,0,1)] ${
        isExiting
          ? "opacity-0 pointer-events-none scale-105"
          : "opacity-100 bg-[#140809]"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Rapid Cycling Image Frame (matching realevate .site-preloader__frames) */}
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden shadow-2xl border border-[#BC2327]/40 shadow-[0_20px_60px_rgba(188,35,39,0.25)]">
          {previewImages.map((src, idx) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-200 ${
                currentFrame === idx ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <Image
                src={src}
                alt="Piptan Preloader Visual"
                fill
                priority
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140809]/80 to-transparent" />
        </div>

        {/* Rolling Counter (matching realevate .site-preloader__counter) */}
        <div className="flex items-center text-white font-mono text-3xl sm:text-4xl tracking-tighter">
          <span className="w-6 text-center text-[#C5A867]">{tens}</span>
          <span className="w-6 text-center text-[#C5A867]">{ones}</span>
          <span className="text-xs uppercase font-sans tracking-widest text-white/60 ml-2">
            %
          </span>
        </div>

        <div className="text-[11px] uppercase tracking-[0.3em] text-[#BC2327] font-semibold font-mono">
          PIPTAN® · AFRICA &apos;26
        </div>
      </div>
    </div>
  );
}
