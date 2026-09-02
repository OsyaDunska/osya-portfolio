import Link from "next/link";

// Both case studies are drawn on a fixed 1440 canvas of absolute coordinates —
// 127 positioned elements in the Music App one alone — so there is no width at
// which they merely reflow. Below 1440 the page's own overflow clip simply cut
// them off on the right, which reads as a broken site rather than an unfinished
// one, and that is what a phone was getting.
//
// So until each block has a flow layout of its own, a narrow window gets this
// instead: the case's name, one line about where to open it, and the way back.
// It carries the case's own ground and text colour, so arriving here still
// feels like the same site rather than an error page.
//
// This is scaffolding. It comes out block by block as the responsive layout
// lands — the switch is the `min-[1440px]` pair, here and on the case itself.
export default function DesktopOnlyCase({
  title,
  year,
  background,
  muted,
}: {
  title: string;
  year: string;
  /** The case's own page colour, so the notice is not a different site. */
  background: string;
  /** Tailwind colour class for the secondary lines. */
  muted: string;
}) {
  return (
    <main
      className="flex min-h-screen flex-col px-6 pt-5 pb-16 text-white min-[1440px]:hidden"
      style={{ backgroundColor: background }}
    >
      <Link
        href="/"
        className="flex h-12 w-fit items-center justify-center rounded-[50px] bg-white/10 px-5 text-[15px] text-white transition-colors duration-200 hover:bg-white hover:text-black motion-reduce:transition-none"
        style={{ fontFamily: "var(--font-inter-tight)", fontWeight: 500 }}
      >
        Back to All Works
      </Link>

      <div className="flex flex-1 flex-col justify-center gap-4 pb-24">
        <p className={`text-[15px] ${muted}`} style={{ fontFamily: "var(--font-inter)" }}>
          {title} / {year}
        </p>
        <h1
          className="max-w-[15ch] text-[32px] leading-[38px]"
          style={{ fontFamily: "var(--font-inter-tight)", fontWeight: 600, letterSpacing: "-0.5px" }}
        >
          Best read on a wider screen.
        </h1>
        <p
          className={`max-w-[34ch] text-[16px] leading-[24px] ${muted}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          This case is laid out full width, and the mobile version is being built
          now. Open it on a desktop in the meantime.
        </p>
      </div>
    </main>
  );
}
