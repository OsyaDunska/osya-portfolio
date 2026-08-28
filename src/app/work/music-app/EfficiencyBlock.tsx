/* eslint-disable @next/next/no-img-element -- local SVGs; next/image's optimizer
   doesn't serve raw SVGs without dangerouslyAllowSVG */

import Image from "next/image";
import { squircleClip } from "./squircle";

// Efficiency & Consistency. Offsets are Figma frame coordinates minus the
// section's origin — the app icon at y 11874.
const ORIGIN = 11874;

const TIGHT = "var(--font-inter-tight)";
const INTER = "var(--font-inter)";
const SF_PRO = '-apple-system, "SF Pro Display", system-ui, sans-serif';

// Figma I6460:23321;5417:21947 / 21949 — the light cone under the app icon and
// the glyph on it. Both are flat vector, so they stay SVG.
const ICON_CONE = "/icons/music-app/efficiency-icon-cone.svg";
const ICON_GLYPH = "/icons/music-app/efficiency-icon-glyph.svg";

// Figma 6460:23327 / 23328 — the two blurred shapes behind the photo, and
// 6460:23331, the four stacked blurred ellipses that make up the whole of the
// left card. Figma sizes a blur's filter region at 2 sigma, which leaves a hard
// edge partway through the falloff; both glows were re-issued with 1.5 sigma
// more room a side, so `bleed` below is Figma's own 2-sigma inset plus that.
const CARD_GLOW_1 = "/glows/music-app/efficiency-card-glow-1.svg";
const CARD_GLOW_2 = "/glows/music-app/efficiency-card-glow-2.svg";
const CARD_GRADIENT = "/mockups/music-app/efficiency-card-gradient.svg";

// Figma 6460:23329's fill, straight out of the file at 1223x1286 — the card
// shows it at 493x518, so this is 2.48x.
const PHOTO = "/mockups/music-app/afterglow-photo.png";

// Both cards are 450 square at radius 56 with corner smoothing at 60%.
const CARD_CLIP = squircleClip(450, 450, 56, 0.6);

/** Figma 6460:23341 — the 4px dot between the album's meta items. */
function Dot() {
  return <span className="size-1 shrink-0 rounded-full bg-[#9d9d9d]" />;
}

export default function EfficiencyBlock() {
  return (
    <>
      {/* Button — 6460:23321, x 676 y 11874, 88x88. The app icon sits on a 5px
          bar with a light cone spilling down from it. */}
      <div className="absolute" style={{ left: 676, top: 11874 - ORIGIN, width: 88, height: 88 }}>
        <div className="absolute left-1/2 top-0 h-[5px] w-16 -translate-x-1/2 rounded-[20px] bg-[#4460f6]" />
        <img
          src={ICON_CONE}
          alt=""
          aria-hidden
          className="absolute left-1/2 top-[5px] h-[83px] w-[76px] -translate-x-1/2"
        />
        <div className="absolute left-1/2 top-[calc(50%+0.5px)] flex w-7 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
          {/* The glyph comes from the nested instance (…;5417:21949;…;22080
              "Layer 2"), not from the wrapper: asking Figma for the wrapper's
              asset hands back the component's default house, while the design
              overrides it with this grid. It is inset 4.17% top and left,
              1.76% right, 1.78% bottom inside the 28 box. */}
          <div className="relative size-7 overflow-hidden">
            <img
              src={ICON_GLYPH}
              alt=""
              aria-hidden
              className="absolute max-w-none"
              style={{ left: "4.17%", top: "4.17%", right: "1.76%", bottom: "1.78%" }}
            />
          </div>
          {/* Figma trims this to cap-height inside a 22 line box, leaving 7. */}
          <p
            className="whitespace-nowrap text-center text-[10px] text-white"
            style={{ fontFamily: SF_PRO, fontWeight: 510, lineHeight: "7px" }}
          >
            New
          </p>
        </div>
      </div>

      {/* Frame 2147238107 — 6460:23322, x 546.93 y 12004, 346.14 wide, centred,
          title and paragraph 44 apart. */}
      <div
        className="absolute flex flex-col items-center text-center"
        style={{ left: 546.93, top: 12004 - ORIGIN, width: 346.141, gap: 44 }}
      >
        <h2
          className="w-full text-[48px] font-semibold leading-[1.15] text-white"
          style={{ fontFamily: TIGHT }}
        >
          Efficiency
          <br />& Consistency
        </h2>
        {/* Figma trims this to cap-height and baseline, so its three 22 lines
            measure 56 rather than 66. The trim is margins on the <p> inside a
            flow-root wrapper: on the flex item itself they would eat the 44
            gap, and without the wrapper's own formatting context they would
            collapse through it. Inter Tight at 16px has ascent 15.9, descent
            3.5 and cap 11.6, so with a 22 line box the half-leading is 1.3 and
            the trims are 1.3 + (15.9 - 11.6) on top, 3.5 + 1.3 underneath.
               The breaks are Figma's own: the text node carries a newline after
            "screen," and after "where", so all three lines are set, not
            wrapped. */}
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
            One modular system runs through every screen,
            <br />
            so the interface stays predictable no matter where
            <br />
            a user lands.
          </p>
        </div>
      </div>

      {/* Group 1597880900 — 6460:23325. Two 450 squares at y 12278, x 262 and
          728, both clipped to the smoothed 56 corner. */}
      {/* Frame 2147238060 — 6460:23330, the gradient card. Figma paints white
          under a 45% white layer, i.e. plain white, and lays the blurred group
          over it at left -113.35, top 65.68. */}
      <div
        className="absolute overflow-hidden bg-white"
        style={{
          left: 262,
          top: 12278 - ORIGIN,
          width: 450,
          height: 450,
          borderRadius: 56,
          clipPath: CARD_CLIP,
        }}
      >
        <img
          src={CARD_GRADIENT}
          alt=""
          aria-hidden
          className="absolute max-w-none"
          // The export carries 91.9 of blur room on three sides and none at the
          // bottom, which is the -11.64%/-11.44%/0 inset Figma reports.
          style={{ left: -113.35 - 91.9, top: 65.68 - 91.9, width: 987.273, height: 881.555 }}
        />
      </div>

      {/* Frame 2147238059 — 6460:23326, the photo card on #202124. */}
      <div
        className="absolute overflow-hidden bg-[#202124]"
        style={{
          left: 728,
          top: 12278 - ORIGIN,
          width: 450,
          height: 450,
          borderRadius: 56,
          clipPath: CARD_CLIP,
        }}
      >
        <img
          src={CARD_GLOW_1}
          alt=""
          aria-hidden
          className="absolute max-w-none"
          style={{ left: 3.46 - 350, top: -73.21 - 350, width: 1335.41, height: 996.974 }}
        />
        <img
          src={CARD_GLOW_2}
          alt=""
          aria-hidden
          className="absolute max-w-none"
          // Centred on the card: Figma has it at left calc(50% - 0.5px) of a
          // 375.926 box, so 225 - 0.5 - 375.926 / 2 = 36.537 before the bleed.
          style={{ left: 36.537 - 342.79, top: -62.92 - 342.79, width: 1061.515, height: 908.599 }}
        />
        {/* 6460:23329 — a 545.5 box hung off the card's left edge, with the
            photo inset inside it. */}
        <div className="absolute" style={{ left: -47.64, top: 0, width: 545.5, height: 545.5 }}>
          <Image
            src={PHOTO}
            alt="Listener wearing over-ear headphones"
            width={493}
            height={518}
            // Served as the original PNG: the optimizer's re-encode bands across
            // the dark gradient behind the headphones.
            unoptimized
            className="absolute max-w-none"
            style={{
              left: "6.18%",
              top: "3.83%",
              width: "90.36%",
              height: "95.02%",
            }}
          />
        </div>
      </div>

      {/* Album info — 6460:23336, x 871 y 12768, 164x62, centred under the
          photo card. Figma trims all four lines, which is what makes them 12 /
          12 / 10 rather than the browser's 19 / 19 / 17. */}
      <div
        className="absolute flex flex-col items-center text-center"
        style={{ left: 871, top: 12768 - ORIGIN, width: 164, gap: 14 }}
      >
        <p
          className="w-full text-[16px] font-bold text-white"
          style={{ fontFamily: INTER, lineHeight: "12px" }}
        >
          Afterglow
        </p>
        <p
          className="w-full text-[16px] text-[#4460f6]"
          style={{ fontFamily: INTER, lineHeight: "12px" }}
        >
          Jaylen Cross
        </p>
        <div
          className="flex w-full items-center justify-center gap-2 text-[14px] text-[#9d9d9d]"
          style={{ fontFamily: INTER, lineHeight: "10px" }}
        >
          <p className="whitespace-nowrap">Hip-Hop</p>
          <Dot />
          <p className="whitespace-nowrap">2024</p>
          <Dot />
          <p className="whitespace-nowrap">Orbit</p>
        </div>
      </div>
    </>
  );
}
