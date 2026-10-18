"use client";

import React from "react";
import Link from "next/link";
import HeroSection from "./sections/hero";
import VideoSection from "./sections/video";
import WhyUsSection from "./sections/why-us";
import PropertiesSection from "./sections/properties";
import Footer from "./sections/footer";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section (includes scroll pin + About section) */}
      <HeroSection />

      {/* Executive Video Briefing Section */}
      <VideoSection />

      {/* Why Us / Institutional Advantages Section */}
      <WhyUsSection />

      {/* Curated Opportunities / Properties Section */}
      <PropertiesSection />

      {/* Executive Institutional Footer */}
      <Footer />
    </main>
  );
}
