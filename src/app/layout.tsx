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
  style: ["normal", "italic"],
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
              <path d="M 0.06500,0.00000 L 0.93500,0.00000 L 0.93500,0.00000 L 0.96209,0.00050 L 0.97301,0.00199 L 0.98096,0.00451 L 0.98711,0.00811 L 0.99189,0.01289 L 0.99549,0.01904 L 0.99801,0.02699 L 0.99950,0.03791 L 1.00000,0.06500 L 1.00000,0.93500 L 1.00000,0.93500 L 0.99950,0.96209 L 0.99801,0.97301 L 0.99549,0.98096 L 0.99189,0.98711 L 0.98711,0.99189 L 0.98096,0.99549 L 0.97301,0.99801 L 0.96209,0.99950 L 0.93500,1.00000 L 0.06500,1.00000 L 0.06500,1.00000 L 0.03791,0.99950 L 0.02699,0.99801 L 0.01904,0.99549 L 0.01289,0.99189 L 0.00811,0.98711 L 0.00451,0.98096 L 0.00199,0.97301 L 0.00050,0.96209 L 0.00000,0.93500 L 0.00000,0.06500 L 0.00000,0.06500 L 0.00050,0.03791 L 0.00199,0.02699 L 0.00451,0.01904 L 0.00811,0.01289 L 0.01289,0.00811 L 0.01904,0.00451 L 0.02699,0.00199 L 0.03791,0.00050 L 0.06500,0.00000 Z" />
            </clipPath>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
