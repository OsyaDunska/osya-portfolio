import type { Metadata } from "next";

import ThemeRevealCard from "@/components/ThemeRevealCard";

// A bench for the card from Figma 6779:29342, not part of the site. It is not
// linked from anywhere and is kept out of search engines below; delete this
// route once the card has a home in the case.
export const metadata: Metadata = {
  title: "Theme reveal — bench",
  robots: { index: false, follow: false },
};

export default function ThemeRevealBench() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[#171716] p-12 text-white">
      <div className="text-center">
        <h1
          className="text-[24px]"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          Theme reveal
        </h1>
        <p
          className="mt-2 text-[16px] text-white/60"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          668×652, radius 20. The circle grows out of one corner, holds 3.5s,
          shrinks back into the same corner, and the next cycle takes the next
          corner. 600ms each way, ease-in-out.
        </p>
      </div>
      <ThemeRevealCard />
    </main>
  );
}
