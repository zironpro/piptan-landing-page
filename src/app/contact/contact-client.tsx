"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building,
  CheckCircle2,
  Download,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import {
  C,
  DISPLAY_FF,
  SANS_FF,
  THEMES,
  fontVars,
} from "@/feature/home/sections/luxury";

export default function ContactPageClient() {
  const T = THEMES.dark;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [year, setYear] = useState<number | string>("2026");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main
      className={`${fontVars} relative min-h-screen w-full overflow-hidden bg-[#08080a] text-[#f4efe6]`}
      style={{ fontFamily: SANS_FF }}
    >
      {/* Background ambient lighting and luxury watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(201,169,106,0.14) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(201,169,106,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Top Header Navigation */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8 sm:px-12 md:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-xs font-light tracking-[0.2em] text-[#e6d3a3] transition-colors duration-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>RETURN TO HOME</span>
        </Link>

        <Link href="/" className="w-28 opacity-90 transition-opacity hover:opacity-100 sm:w-36">
          <Image
            src="/piptan-logo.svg"
            alt="Piptan"
            width={613}
            height={93}
            className="h-auto w-full object-contain brightness-0 invert"
          />
        </Link>
      </header>

      {/* Main Content Container */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-6 sm:px-12 md:pb-28">
        <div className="mb-12 text-center md:mb-16">
          <span
            aria-hidden="true"
            className="mx-auto mb-6 block h-px w-20"
            style={{ background: C.GOLD }}
          />
          <span
            className="text-xs uppercase tracking-[0.35em] text-[#c9a96a] sm:text-sm"
            style={{ fontFamily: SANS_FF }}
          >
            Executive Capital Conduit
          </span>
          <h1
            className="mt-4 text-balance text-4xl leading-[1.1] sm:text-5xl md:text-6xl"
            style={{
              fontFamily: DISPLAY_FF,
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Discuss a Corridor with Piptan.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-[#f4efe6]/70 sm:text-base">
            Tell us where your capital wants to deploy. Connect directly with our
            investment committee to structure institutional energy, logistics, and
            sovereign conduits between the Gulf and Africa.
          </p>

          {/* Official Contact Badges */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-4 text-xs font-light tracking-[0.08em] sm:gap-6">
            <a
              href="https://piptan.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#16161a]/80 px-4 py-2 text-[#e6d3a3] transition-colors hover:border-[#c9a96a] hover:text-white"
            >
              <Globe className="h-3.5 w-3.5 text-[#c9a96a]" />
              <span>Business Bay, Dubai, UAE</span>
            </a>
            <a
              href="tel:+971564014000"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#16161a]/80 px-4 py-2 text-[#e6d3a3] transition-colors hover:border-[#c9a96a] hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-[#c9a96a]" />
              <span>+971 56 401 4000</span>
            </a>
            <a
              href="mailto:invest@piptan.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#16161a]/80 px-4 py-2 text-[#e6d3a3] transition-colors hover:border-[#c9a96a] hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-[#c9a96a]" />
              <span>invest@piptan.com</span>
            </a>
          </div>
        </div>

        {/* Card Form Container */}
        <div
          className="relative mx-auto max-w-3xl rounded-2xl border p-6 sm:p-10 md:p-12"
          style={{
            backgroundColor: "#0e0e11",
            borderColor: "rgba(201,169,106,0.25)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-light uppercase tracking-wider text-[#e6d3a3]">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#c9a96a]/70" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Sterling"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-white/10 bg-[#16161a] py-3 pl-11 pr-4 text-sm text-[#f4efe6] placeholder-[#f4efe6]/30 transition-colors focus:border-[#c9a96a] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-light uppercase tracking-wider text-[#e6d3a3]">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#c9a96a]/70" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. david@piptan.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-white/10 bg-[#16161a] py-3 pl-11 pr-4 text-sm text-[#f4efe6] placeholder-[#f4efe6]/30 transition-colors focus:border-[#c9a96a] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-light uppercase tracking-wider text-[#e6d3a3]">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-[#c9a96a]/70" />
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-[#16161a] py-3 pl-11 pr-4 text-sm text-[#f4efe6] placeholder-[#f4efe6]/30 transition-colors focus:border-[#c9a96a] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-light uppercase tracking-wider text-[#e6d3a3]">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your requirements or investment inquiries..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#16161a] p-4 text-sm text-[#f4efe6] placeholder-[#f4efe6]/30 transition-colors focus:border-[#c9a96a] focus:outline-none"
                />
              </div>

              <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
                <div className="flex items-center gap-2 text-xs font-light text-[#f4efe6]/50">
                  <ShieldCheck className="h-4 w-4 text-[#c9a96a]" />
                  <span>Your information is kept strictly confidential</span>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#08080a] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                  style={{
                    backgroundColor: C.GOLD,
                    boxShadow: "0 4px 20px rgba(201,169,106,0.35)",
                  }}
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 py-8 text-center">
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(201,169,106,0.15)", color: C.GOLD }}
              >
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <span className="block text-xs uppercase tracking-widest text-[#c9a96a]">
                  Message Received
                </span>
                <h2
                  className="text-3xl sm:text-4xl"
                  style={{ fontFamily: DISPLAY_FF, fontWeight: 300 }}
                >
                  Thank You for Contacting Piptan
                </h2>
                <p className="mx-auto max-w-md text-sm font-light leading-relaxed text-[#f4efe6]/70">
                  Thank you, <strong className="text-white">{formData.name}</strong>.
                  Our team will contact you at{" "}
                  <strong className="text-white">{formData.email}</strong> or{" "}
                  <strong className="text-white">{formData.phone}</strong> shortly.
                </p>
              </div>

              <div
                className="mx-auto flex max-w-md items-center justify-between rounded-xl border p-4 text-left"
                style={{
                  backgroundColor: "#16161a",
                  borderColor: "rgba(201,169,106,0.25)",
                }}
              >
                <div>
                  <span className="block text-xs font-medium text-[#f4efe6]">
                    Piptan Sovereign Conduits Memorandum
                  </span>
                  <span className="text-[10px] text-[#f4efe6]/50">
                    PDF · Confidential Institutional Overview
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    alert(`Confidential Memorandum dispatched to ${formData.email}`)
                  }
                  className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium text-[#08080a] transition-colors"
                  style={{ backgroundColor: C.GOLD }}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>

              <Link
                href="/"
                className="inline-block rounded-full border border-white/20 px-6 py-2.5 text-xs uppercase tracking-wider text-[#e6d3a3] transition-colors hover:border-[#c9a96a] hover:text-white"
              >
                Return to Overview
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/10 px-6 py-8 text-xs font-light sm:flex-row sm:px-12"
      >
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="text-[#f4efe6]/50">© {year} Piptan. All rights reserved.</p>
          <p className="tracking-widest text-[#c9a96a]">
            GULF · AFRICA · GLOBAL SYNDICATION
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#f4efe6]/70 sm:justify-end sm:gap-6">
          <a
            href="https://piptan.ae/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Business Bay, Dubai, UAE
          </a>
          <span>·</span>
          <a href="tel:+971564014000" className="transition-colors hover:text-white">
            +971 56 401 4000
          </a>
          <span>·</span>
          <a
            href="mailto:invest@piptan.com"
            className="text-[#e6d3a3] transition-colors hover:text-white"
          >
            invest@piptan.com
          </a>
        </div>
      </footer>
    </main>
  );
}
