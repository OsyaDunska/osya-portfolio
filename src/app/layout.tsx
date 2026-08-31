import type { Metadata } from "next";
import SquircleCorners from "@/components/SquircleCorners";
import {
  Inter,
  Inter_Tight,
  Cormorant_Garamond,
  Alex_Brush,
  Mulish,
  Libre_Baskerville,
} from "next/font/google";
import "./globals.css";

// With the italic face, by the owner's decision. Figma labels the About Me
// heading's one leaning word Semi Bold Italic but draws a slanted upright,
// having no italic Inter to hand — its render sets that line's ink 31 tall
// where the real italic sets it 38, the difference being an f redrawn with a
// descender. The site takes the drawn italic rather than the slant: it is the
// letter the design asks for by name, and the better one.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
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

// The Music App case is set in Mulish, and its Typography & Colors section is
// literally a specimen of it — so it has to be the real face, not a stand-in.
// The Mentora case numbers its personas in Libre Baskerville italic. Figma calls
// the style "Medium Italic", but the family only ships 400 and 700 and the
// italic only at 400 — so 400 is the real face behind that label, and asking for
// a 500 would only get a synthesised slant.
const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${inter.variable} ${interTight.variable} ${cormorant.variable} ${alexBrush.variable} ${mulish.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#171716]">
        <SquircleCorners />
        {children}
      </body>
    </html>
  );
}
