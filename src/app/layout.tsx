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
              <path d="M 0.04500,0.00000 L 0.95500,0.00000 L 0.95500,0.00000 L 0.97375,0.00034 L 0.98132,0.00138 L 0.98682,0.00312 L 0.99108,0.00561 L 0.99439,0.00892 L 0.99688,0.01318 L 0.99862,0.01868 L 0.99966,0.02625 L 1.00000,0.04500 L 1.00000,0.95500 L 1.00000,0.95500 L 0.99966,0.97375 L 0.99862,0.98132 L 0.99688,0.98682 L 0.99439,0.99108 L 0.99108,0.99439 L 0.98682,0.99688 L 0.98132,0.99862 L 0.97375,0.99966 L 0.95500,1.00000 L 0.04500,1.00000 L 0.04500,1.00000 L 0.02625,0.99966 L 0.01868,0.99862 L 0.01318,0.99688 L 0.00892,0.99439 L 0.00561,0.99108 L 0.00312,0.98682 L 0.00138,0.98132 L 0.00034,0.97375 L 0.00000,0.95500 L 0.00000,0.04500 L 0.00000,0.04500 L 0.00034,0.02625 L 0.00138,0.01868 L 0.00312,0.01318 L 0.00561,0.00892 L 0.00892,0.00561 L 0.01318,0.00312 L 0.01868,0.00138 L 0.02625,0.00034 L 0.04500,0.00000 Z" />
            </clipPath>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
