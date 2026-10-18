"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Footer from "@/feature/home/sections/footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111215] flex flex-col justify-between">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-black/5 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#111215] hover:text-[#bc2327] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Piptan Home"
        >
          <div className="relative w-28 sm:w-36 h-6 sm:h-7">
            <Image
              src="/piptan-logo.svg"
              alt="Piptan Logo"
              fill
              priority
              className="object-contain group-hover:opacity-90 transition-opacity"
            />
          </div>
        </Link>

        <a
          href="https://piptan.ae/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/10 hover:border-black text-xs font-mono uppercase tracking-wider text-[#111215] transition-all hover:scale-[1.02]"
        >
          <span>piptan.ae</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Briefing Information & Contact Details */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-[11px] font-mono uppercase tracking-[0.22em] text-[#6b7280]">
                <Sparkles className="w-3 h-3 text-[#bc2327]" />
                <span>Executive Investor Session</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#0f1115] leading-[1.12]">
                Connect with the{" "}
                <span className="font-serif italic font-normal text-[#bc2327]">
                  Executive Delegation
                </span>.
              </h1>
              <p className="text-sm sm:text-base text-[#525866] leading-relaxed">
                Schedule a confidential, in-person briefing with Piptan’s leadership during our African tour or request the Confidential Investment Memorandum.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 border-t border-b border-black/[0.08] py-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-black/[0.03] text-[#bc2327] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6b7280] block font-semibold">
                    Head Office
                  </span>
                  <a
                    href="https://piptan.ae/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#0f1115] hover:text-[#bc2327] transition-colors"
                  >
                    Business Bay, Dubai, UAE
                  </a>
                  <p className="text-xs text-[#6b7280] mt-0.5">DIFC Sovereign Advisory Desk</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-black/[0.03] text-[#bc2327] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6b7280] block font-semibold">
                    Syndicate Inquiries
                  </span>
                  <a
                    href="mailto:invest@piptan.com"
                    className="text-sm font-medium text-[#0f1115] hover:text-[#bc2327] transition-colors font-mono"
                  >
                    invest@piptan.com
                  </a>
                  <p className="text-xs text-[#6b7280] mt-0.5">Encrypted private desk</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-black/[0.03] text-[#bc2327] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6b7280] block font-semibold">
                    Direct Phone Line
                  </span>
                  <a
                    href="tel:+971564014000"
                    className="text-sm font-medium text-[#0f1115] hover:text-[#bc2327] transition-colors font-mono"
                  >
                    +971 56 401 4000
                  </a>
                  <p className="text-xs text-[#6b7280] mt-0.5">GCC Standard Time (GMT+4)</p>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column: Confidential Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-black/10 shadow-2xl shadow-black/5">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-light text-[#0f1115] tracking-tight">
                      Send a Message
                    </h2>
                    <p className="text-xs text-[#6b7280] mt-1 font-mono uppercase tracking-wider">
                      Please enter your contact details below
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#111215] mb-2 font-semibold">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#bc2327] focus:ring-1 focus:ring-[#bc2327] outline-none text-sm bg-black/[0.01] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#111215] mb-2 font-semibold">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#bc2327] focus:ring-1 focus:ring-[#bc2327] outline-none text-sm bg-black/[0.01] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#111215] mb-2 font-semibold">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+971 50 000 0000"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#bc2327] focus:ring-1 focus:ring-[#bc2327] outline-none text-sm bg-black/[0.01] transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#111215] mb-2 font-semibold">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="How can we assist you? Outline your inquiries or objectives..."
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#bc2327] focus:ring-1 focus:ring-[#bc2327] outline-none text-sm bg-black/[0.01] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#bc2327] hover:bg-[#a11c20] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#bc2327]/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                  >
                    <span>Send Message</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#bc2327]/10 text-[#bc2327] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#bc2327] font-semibold">
                      Transmission Confirmed
                    </span>
                    <h3 className="text-2xl font-light text-[#0f1115]">
                      Message Received
                    </h3>
                    <p className="text-sm text-[#525866] max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold text-[#0f1115]">{formData.name}</span>. Our desk in Dubai has received your details and will get in touch shortly.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-black/10 text-xs font-mono uppercase tracking-wider text-[#111215] hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
