import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Piptan Estates | Find What Moves You",
  description:
    "Expert agents. Real guidance. A clear path to find what's next. Discover premier residences, luxury penthouses, and private architectural estates.",
  keywords: [
    "Piptan Estates",
    "Luxury Real Estate",
    "Penthouses",
    "Architectural Homes",
    "Private Estates",
    "Find What Moves You",
  ],
  openGraph: {
    title: "Piptan Estates | Find What Moves You",
    description:
      "Expert agents. Real guidance. A clear path to find what's next. Discover premier residences, luxury penthouses, and private estates.",
    images: ["/hero/house.webp"],
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
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#f7f8fa] text-[#14161a] font-sans selection:bg-[#18181b] selection:text-[#ffffff] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

