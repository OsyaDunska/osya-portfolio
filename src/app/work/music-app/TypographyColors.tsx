/* eslint-disable @next/next/no-img-element -- local SVG; next/image's optimizer
   doesn't serve raw SVGs without dangerouslyAllowSVG */

import { squircleClip } from "./squircle";

// Typography & Colors. Offsets are Figma frame coordinates minus the section's
// origin — the title at y 9168.
// The specimens below are re-anchored to the current file. Their numbers are
// this component's originals, which were read off the previous revision, and
// the whole page has since moved 202 up: the Mulish column was at 10214.997 and
// is now 10013, its wordmark 10282.996 and now 10081, and the SF Pro pair the
// same 202. So ORIGIN is the specimen block's own top in those old
// coordinates — 9982 on the page plus that 202 — and every top here comes out
// relative to the section it sits in.
//   Only SpecimenBlock is used now; the heading, the wheel and the swatches are
// built in page.tsx against the current file.
const ORIGIN = 10184;

const MULISH = "var(--font-mulish)";
const TIGHT = "var(--font-inter-tight)";
// Figma sets the wordmarks and the second specimen in SF Pro, which is not a
// webfont. The system stack resolves to the real SF Pro on Apple devices and
// degrades to the platform UI face elsewhere.
const SF_PRO = '-apple-system, "SF Pro Display", system-ui, sans-serif';

// The four rings, exported as one SVG — they are stroked arcs whose colours are
// the palette this section is about.
const WHEEL = "/diagrams/music-app/typography-colors-wheel.svg";

// Figma 6460:23432 / 23434 / 23436 / 23438 — pills naming each ring's colour.
const SWATCHES = [
  { hex: "#DAD6D6", left: 279.508, top: 9862.711, width: 87, height: 42 },
  { hex: "#425DEE", left: 451.973, top: 9613.93, width: 81, height: 38 },
  { hex: "#010F23", left: 853.57, top: 9557.25, width: 79, height: 38 },
  // The odd one out: the other three came up 32 with the block, this one did not.
  { hex: "#FFFFFF", left: 1085.973, top: 9894.711, width: 76, height: 38 },
];

// Figma 6460:23255 — the equalizer mark at the centre of the wheel.
const SOUND_BARS = [
  { x: 0, y: 6.4286, w: 5.1429, h: 17.1429 },
  { x: 8.5714, y: -0.5, w: 5, h: 31 },
  { x: 17, y: 4.7143, w: 5.1429, h: 20.5714 },
  { x: 25.5714, y: 9.8571, w: 5.1429, h: 10.2857 },
  { x: 34.1429, y: 3, w: 5.1429, h: 24 },
  { x: 42.7143, y: 6.5, w: 5, h: 17 },
  { x: 51.1429, y: 4.7143, w: 5.1429, h: 20.5714 },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Figma rounds the two squares to 20 with corner smoothing at 60%. Neither half
// of that is reachable from CSS on its own — `border-radius` draws a plain arc,
// and the project's `.squircle` is a proportional clip-path whose corner is 6.5%
// of the box, i.e. 8px on a 124px square, less than half the radius asked for.
const SQUIRCLE_124 = squircleClip(124, 124, 20, 0.6);

type Specimen = {
  /**
   * The oversized letter. `leading` is the face's ascent + descent at 200px —
   * see the note on the element below for why that number and not `height`.
   */
  letter: { left: number; top: number; width: number; leading: number; weight: number };
  /** The font's name, set in SF Pro Compressed. */
  word: { text: string; left: number; top: number; scaleX: number };
  /** The two swatch squares plus the alphabet, stacked with a 40 gap. */
  column: { left: number; top: number; width: number };
  boxes: { label: string; size: string; bg: string; sizeLeft: number }[];
  /** Figma trims every alphabet line to cap height; this is that height. */
  lineHeight: number;
  /** Face used for the letter, the labels and the alphabet. */
  font: string;
  /** Weights for the square label and the alphabet, which differ per face. */
  labelWeight: number;
};

// Group 1597880847 — 6460:23090, the Mulish specimen.
export const MULISH_SPECIMEN: Specimen = {
  letter: { left: 80, top: 10123.996, width: 149, leading: 251, weight: 600 },
  word: { text: "Mulish", left: 252.95, top: 10282.996, scaleX: 0.675 },
  column: { left: 380, top: 10214.997, width: 346 },
  boxes: [
    { label: "B1", size: "16", bg: "#010f23", sizeLeft: 69 },
    { label: "B2", size: "14", bg: "#425dee", sizeLeft: 73 },
  ],
  lineHeight: 23,
  font: MULISH,
  labelWeight: 500,
};

// Group 1597880846 — 6460:23110, the SF Pro specimen. Same construction, but
// SF Pro's cap height is shorter, so Figma trims its lines to 21 rather than 23.
export const SF_PRO_SPECIMEN: Specimen = {
  letter: { left: 732, top: 10595, width: 134.997, leading: 238, weight: 590 },
  word: { text: "SF Pro", left: 890.996, top: 10744, scaleX: 0.6636 },
  column: { left: 1014.009, top: 10676, width: 345.991 },
  boxes: [
    { label: "H1", size: "16", bg: "#010f23", sizeLeft: 69 },
    { label: "H2", size: "14", bg: "#425dee", sizeLeft: 73 },
  ],
  lineHeight: 21,
  font: SF_PRO,
  labelWeight: 510,
};

export function SpecimenBlock({ s }: { s: Specimen }) {
  return (
    <>
      {/* The letter and the wordmark share a baseline in the design, and getting
          that right means matching how Figma positions a line rather than
          copying its box height.
             Figma puts the top of a text box ON the ascender line: the baseline
          lands at top + ascent, full stop. CSS instead centres the font's
          content area in the line box, so the baseline lands at
          top + (line-height - (ascent + descent)) / 2 + ascent.
             The two agree only when line-height equals ascent + descent, which
          zeroes the half-leading — 251 for Mulish at 200px, 238 for SF Pro.
          Figma's own box heights (215 / 205) are neither of those, and using
          them lifted the glyph 17 above the wordmark's baseline. The wordmarks
          below already sit right for the same reason: their 53 IS SF Pro's
          ascent + descent at 44px. */}
      <p
        className="absolute text-[200px] text-white"
        style={{
          left: s.letter.left,
          top: s.letter.top - ORIGIN,
          width: s.letter.width,
          lineHeight: `${s.letter.leading}px`,
          fontFamily: s.font,
          fontWeight: s.letter.weight,
        }}
      >
        A
      </p>

      {/* Figma sets these in SF Pro Compressed at width axis 47. No browser can
          reach that axis — `font-stretch` is ignored on the system face and the
          compressed cut is not a webfont — so the text renders ~1.5x too wide
          and used to run into the squares. Scaling the box horizontally is what
          gets it back to Figma's 87px: measured natural width 128.9, target 87.
          Vertically it stays untouched, which is what a width axis does too. */}
      <p
        className="absolute whitespace-nowrap text-[44px] text-white"
        style={{
          left: s.word.left,
          top: s.word.top - ORIGIN,
          fontFamily: SF_PRO,
          fontWeight: 540,
          lineHeight: "53px",
          transform: `scaleX(${s.word.scaleX})`,
          transformOrigin: "left top",
        }}
      >
        {s.word.text}
      </p>

      <div
        className="absolute flex flex-col gap-10"
        style={{ left: s.column.left, top: s.column.top - ORIGIN, width: s.column.width }}
      >
        <div className="flex items-center gap-2">
          {s.boxes.map((b) => (
            <div
              key={b.label}
              className="relative size-[124px] shrink-0 overflow-hidden"
              style={{
                background: b.bg,
                borderRadius: 20, // fallback if path() clipping is unsupported
                clipPath: SQUIRCLE_124,
              }}
            >
              <p
                className="absolute whitespace-nowrap text-[24px] uppercase leading-normal text-white"
                style={{ left: 41, top: 52, fontFamily: s.font, fontWeight: s.labelWeight }}
              >
                {b.label}
              </p>
              <p
                className="absolute whitespace-nowrap text-[16px] lowercase leading-normal text-white"
                style={{ left: b.sizeLeft, top: 41, fontFamily: s.font }}
              >
                {b.size}
              </p>
            </div>
          ))}
        </div>

        {/* Figma trims each of these to cap height, so the browser's taller line
            box (27 for 18px Mulish against Figma's 23) stacked up and pushed the
            column past its 320. Pinning line-height is what fixes it — a
            negative block margin would too, but it also eats into the flex gap
            and drags the 32s down to 28. */}
        <div
          className="flex w-full flex-col gap-6 text-[18px] text-white/60"
          style={{ fontFamily: s.font, lineHeight: `${s.lineHeight}px` }}
        >
          <p className="whitespace-nowrap">{ALPHABET} </p>
          <p className="lowercase">{ALPHABET} </p>
          <div className="whitespace-nowrap lowercase">
            <p>1234567890!</p>
            <p>{`@£$%^&*()_+{}|”?!`}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function TypographyColors() {
  return (
    <>
      {/* Frame 2147238017 — 6460:23011, x 547 y 9168, 346x210: a 110-tall
          title and a 56-tall paragraph 44 apart. */}
      <div
        className="absolute flex flex-col items-center text-center"
        style={{ left: 547, top: 9168 - ORIGIN, width: 346, gap: 44 }}
      >
        <h2
          className="w-full text-[48px] font-semibold leading-[1.15] text-white"
          style={{ fontFamily: TIGHT }}
        >
          Typography
          <br />& Colors
        </h2>
        {/* Figma trims this to cap-height and baseline, so its three 22 lines
            measure 56 rather than 66. Margins on the <p> inside a flow-root
            wrapper: on the flex item itself they would eat the 44 gap, and
            without the wrapper's own formatting context they would collapse
            through it. Inter Tight at 16px has ascent 15.9, descent 3.5 and
            cap 11.6 — the same across its weights — so with a 22 line box the
            half-leading is 1.3.
               The <br /> is Figma's own hard break, not a guess: the text node
            carries a newline after "body", which is what puts "text —" at the
            head of the last line instead of leaving "text" on the second. */}
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
            A dark palette built around one accent blue, paired with SF Pro for headings
            and Mulish for body
            <br />
            text — consistent across every screen.
          </p>
        </div>
      </div>

      {/* Group 1597880904 — 6460:23249, x 204.22 y 9378.09, 1031.55 square. */}
      <img
        src={WHEEL}
        alt="Colour palette shown as four concentric rings"
        // max-w-none: preflight caps images at 100% of the parent, which squashes
        // this 1031-wide ring set against its own fixed height on any viewport
        // narrower than the 1440 frame.
        className="absolute max-w-none"
        style={{
          left: 204.224,
          top: 9376.094 - ORIGIN,
          width: 1031.551,
          height: 1031.551,
        }}
      />

      {/* 6460:23254 — 56x30 at the wheel's centre. */}
      <div
        aria-hidden
        className="absolute"
        style={{ left: 692, top: 9802.711 - ORIGIN, width: 56, height: 30 }}
      >
        {SOUND_BARS.map((bar, i) => (
          <div
            key={i}
            className="absolute bg-white"
            style={{ left: bar.x, top: bar.y, width: bar.w, height: bar.h, borderRadius: 100 }}
          />
        ))}
      </div>

      {SWATCHES.map((s) => (
        <div
          key={s.hex}
          className="absolute flex items-center justify-center rounded-full"
          style={{
            left: s.left,
            top: s.top - ORIGIN,
            width: s.width,
            height: s.height,
            background: "rgba(255,255,255,0.16)",
          }}
        >
          <p
            className="whitespace-nowrap text-[14px] font-medium text-white"
            style={{ fontFamily: MULISH, lineHeight: 1.3 }}
          >
            {s.hex}
          </p>
        </div>
      ))}

      {/* Group 1597880905 — 6611:26415, the two specimens. */}
      <SpecimenBlock s={MULISH_SPECIMEN} />
      <SpecimenBlock s={SF_PRO_SPECIMEN} />
    </>
  );
}
