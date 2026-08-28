/* eslint-disable @next/next/no-img-element -- local SVG; next/image's optimizer
   doesn't serve raw SVGs without dangerouslyAllowSVG */

import Image from "next/image";
import { fadeGradientSolid } from "./fadeStyles";

// The Takeaway. Offsets are Figma frame coordinates minus the section's
// origin — the title at y 14973.
const ORIGIN = 14973;

const TIGHT = "var(--font-inter-tight)";

// Figma 6460:23347 — the glyph on the purple tile.
const MAGIC_WAND = "/icons/music-app/takeaway-magic-wand.svg";
// Figma 6460:23444 — the mark above the closing line.
const ASTERISK = "/icons/music-app/takeaway-asterisk.svg";

// 6460:23440, a 573.36x1060.18 rounded rectangle whose fill is this shot, and
// 6460:23450 "Container", 310 square with the screen inside it already clipped.
// Both exported at 2x — 1147x2121 and 620x620 — with the background cut out.
const HAND = "/mockups/music-app/takeaway-hand-2x.png";
const CONTAINER = "/mockups/music-app/takeaway-container-2x.png";

export default function TakeawayBlock() {
  return (
    <>
      {/* Frame 2147238108 — 6460:23014, x 547 y 14973, 346x160: a 60-tall title
          and a 56-tall paragraph 44 apart. */}
      <div
        className="absolute flex flex-col items-center text-center"
        style={{ left: 547, top: 14973 - ORIGIN, width: 346, gap: 44 }}
      >
        <h2
          className="w-full text-[48px] font-semibold leading-[1.25] text-white"
          style={{ fontFamily: TIGHT }}
        >
          The Takeaway
        </h2>
        {/* Trimmed to cap-height and baseline in Figma, so its 22-line box pair
            measures 56 rather than 66. Same construction as the Efficiency
            paragraph: margins on the <p> inside a flow-root wrapper, so they
            cannot eat the 44 gap or collapse through it. Inter Tight Regular at 16px
            has ascent 15.9, descent 3.5 and cap 11.6, and with a 22 line box
            the half-leading is 1.3. */}
        <div style={{ display: "flow-root", width: "100%" }}>
          <p
            className="text-[16px] text-white/60"
            style={{
              fontFamily: TIGHT,
              lineHeight: "22px",
              letterSpacing: "-0.176px",
              marginTop: -5.6,
              marginBottom: -4.8,
            }}
          >
            Large content blocks, clear visual patterns, and short paths to every
            action — nothing extra between a user and the music.
          </p>
        </div>
      </div>

      {/* Frame 2147238067 — 6460:23345, x 120 y 15275.93, 282x182: the purple
          tile, then 40, then a 78-tall paragraph. */}
      <div
        className="absolute flex flex-col items-start"
        style={{ left: 120, top: 15275.93 - ORIGIN, width: 282, gap: 40 }}
      >
        <div className="relative flex size-16 items-center justify-center rounded-[35px] bg-[#7951ec]">
          {/* 28 now, and centred: the glyph used to be 24 with a 2px nudge
              right of centre, and Figma has since replaced both. */}
          <img
            src={MAGIC_WAND}
            alt=""
            aria-hidden
            className="absolute size-7"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          />
        </div>
        <div style={{ display: "flow-root", width: "100%" }}>
          <p
            className="text-[16px] text-white/60"
            style={{
              fontFamily: TIGHT,
              lineHeight: "22px",
              letterSpacing: "-0.176px",
              marginTop: -5.6,
              marginBottom: -4.8,
            }}
          >
            One consistent system, fewer decisions per screen, and a shorter path
            from open to play — the interface stays predictable no matter where a
            user lands.
          </p>
        </div>
      </div>

      {/* 6460:23440 — the phone in hand. */}
      <Image
        src={HAND}
        alt="The now-playing screen on a phone held in one hand"
        width={573.36}
        height={1060.18}
        // Served as the original PNG: the optimizer's re-encode bands across the
        // dark screen and the soft shadow on the hand.
        unoptimized
        className="absolute max-w-none"
        style={{ left: 498, top: 15223 - ORIGIN, width: 573.36, height: 1060.18 }}
      />

      {/* 6460:23448 — the fade that takes the mockup's bottom into the page.
          Full frame width, so unlike the narrower ones on this page it needs no
          side mask: there are no vertical edges to feather. Figma's ramp
          verbatim, solid from 80.2% down, which is what covers the cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: -0.027,
          top: 15976.47 - ORIGIN,
          width: 1440,
          height: 356.25,
          background: fadeGradientSolid,
        }}
      />

      {/* Frame 2147237727 — 6460:23441, x -0.03 y 16261.93, 1440x598, on its
          own #000105. It starts just under the mockup (which ends at 16283.18),
          so the fill closes the page off rather than covering anything.
             Its box is 598 tall but the page frame stops at 16736, so Figma
          clips the last 191.93 of it — and that clip cuts through the word: the
          design's own render still has blue ink on its bottom row. Height here
          is therefore the visible 406.07, with the children still placed from
          the box's real top so nothing inside shifts. */}
      <div
        className="absolute overflow-hidden bg-[#000105]"
        style={{ left: -0.027, top: 16261.93 - ORIGIN, width: 1440, height: 406.07 }}
      >
        {/* 6460:23442 — 400px Inter Tight Bold at 1.3, which is the 520-tall
            box Figma reports. Left is calc(50% - 690.5) of the 1440 frame, so
            29.5. */}
        <p
          className="absolute left-[29.5px] top-0 whitespace-nowrap text-[400px] font-bold text-[#2e4496]"
          style={{ fontFamily: TIGHT, lineHeight: 1.3 }}
        >
          Thanks
        </p>

        {/* 6460:23443 — 353x92 at x 543, y 282 inside the frame. Pinned to
            those numbers rather than to the frame's centre: the frame's box is
            598 but it renders clipped to 398.07, so anything measured off 50%
            here rides up with the clip. */}
        <div
          className="absolute flex flex-col items-center"
          style={{ left: 543, top: 282, width: 353, gap: 24 }}
        >
          <img src={ASTERISK} alt="" aria-hidden className="size-6" />
          {/* Two runs in one paragraph — the first white/60, the second white.
              Figma leaves these untrimmed: two 22 lines make the 44 that,
              with the icon and the gap, is the block's 92. */}
          <p
            className="w-full text-center text-[16px] text-white/60"
            style={{ fontFamily: "var(--font-inter)", lineHeight: "22px", letterSpacing: "-0.176px" }}
          >
            Thanks for reading through the process, not just the pixels.{" "}
            <span className="text-white">Let&rsquo;s build something together.</span>
          </p>
        </div>
      </div>

      {/* 6460:23450 — painted after the fade and after the closing frame, which
          is what keeps it clear of the darkening and on top of the word. */}
      <Image
        src={CONTAINER}
        alt="A tablet-sized view of the same library"
        width={310}
        height={310}
        unoptimized
        className="absolute max-w-none"
        style={{ left: 1010, top: 16138 - ORIGIN, width: 310, height: 310 }}
      />
    </>
  );
}
