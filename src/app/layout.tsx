import type { Metadata } from "next";
import { Outfit, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Piptan | Africa Investor Summit & Global Capital Gateway",
  description:
    "Piptan connects global liquidity and institutional GCC capital with high-yield frontier investments across Africa. Direct investments, strategic infrastructure, and fintech growth.",
  keywords: [
    "Piptan",
    "Piptan Group",
    "Africa Investors",
    "African Investment Summit",
    "GCC Africa Capital",
    "Private Equity Africa",
    "Cross Border Wealth Advisory",
  ],
  openGraph: {
    title: "Piptan | Africa Investor Summit & Global Capital Gateway",
    description:
      "Architects of cross-border capital deployment. Meeting sovereign and institutional investors across Africa.",
    images: ["/images/hero_africa.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#07090e] text-[#e8ecf4] font-sans selection:bg-[#c5a867] selection:text-[#0a0c10] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

