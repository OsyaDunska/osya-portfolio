import type { Metadata } from "next";
import { Inter, Inter_Tight, Cormorant_Garamond, Alex_Brush } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Osya Dunska — Product Designer",
  description:
    "Product Designer based in Kyiv, Ukraine. UI/UX, design systems, and AI-first workflows.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${cormorant.variable} ${alexBrush.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#171716]">
        {/* Squircle clip-path definition (used by .squircle class for iOS/Figma-style corner smoothing) */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.09000,0.00000 L 0.91000,0.00000 L 0.91000,0.00000 L 0.94750,0.00069 L 0.96263,0.00276 L 0.97364,0.00625 L 0.98216,0.01123 L 0.98877,0.01784 L 0.99375,0.02636 L 0.99724,0.03737 L 0.99931,0.05250 L 1.00000,0.09000 L 1.00000,0.91000 L 1.00000,0.91000 L 0.99931,0.94750 L 0.99724,0.96263 L 0.99375,0.97364 L 0.98877,0.98216 L 0.98216,0.98877 L 0.97364,0.99375 L 0.96263,0.99724 L 0.94750,0.99931 L 0.91000,1.00000 L 0.09000,1.00000 L 0.09000,1.00000 L 0.05250,0.99931 L 0.03737,0.99724 L 0.02636,0.99375 L 0.01784,0.98877 L 0.01123,0.98216 L 0.00625,0.97364 L 0.00276,0.96263 L 0.00069,0.94750 L 0.00000,0.91000 L 0.00000,0.09000 L 0.00000,0.09000 L 0.00069,0.05250 L 0.00276,0.03737 L 0.00625,0.02636 L 0.01123,0.01784 L 0.01784,0.01123 L 0.02636,0.00625 L 0.03737,0.00276 L 0.05250,0.00069 L 0.09000,0.00000 Z" />
            </clipPath>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
