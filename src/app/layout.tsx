import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/animations/Preloader";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-[#ffffff] dark:bg-[#030303] text-[#111111] dark:text-[#ffffff] antialiased selection:bg-[#c9a96e]/30 selection:text-[#000000] dark:selection:text-white transition-colors duration-700`}
      >
        <Preloader />
        <div className="grain-overlay opacity-50 dark:opacity-100" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
