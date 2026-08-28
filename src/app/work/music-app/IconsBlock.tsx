/* eslint-disable @next/next/no-img-element -- local SVGs; next/image's optimizer
   doesn't serve raw SVGs without dangerouslyAllowSVG */

// Figma 6460:23017 "Frame 2147237956" — two rows of five 64x64 circles, gap 16.
// Every other circle is a plain #f5f5f5 fill; the rest carry Figma's native
// "Glass" material.
//
// The Glass effect has no CSS equivalent and the API does not expose it:
// get_design_context flattens it to its tint alone (`bg-[rgba(0,8,23,0.1)]`),
// with no blur, refraction or light data. Figma's own panel reads
//   Light 60 deg / 60%, Refraction 4, Depth 20, Dispersion 27, Frost 59,
//   Splay 26, fill #000817 @ 10%, no stroke
// but Refraction / Dispersion / Splay are chromatic edge distortion specific to
// Figma's renderer. What follows is an approximation matched by eye against the
// frame render: the tint verbatim, Frost as a backdrop blur, and Light as an
// angled sheen plus a rim highlight along the lit edge.
//
// It only works over real content: backdrop-filter has nothing to blur unless
// the page glow actually sits behind these circles.
// Figma's Light sits at 60 deg and reads as a highlight along the top, brightest
// toward the top-left. CSS angles run clockwise from "up" and place the first
// stop opposite the direction, so 150deg is what puts that first stop top-left.
//
// Both the sheen and the rim live on the container itself rather than in overlay
// elements: an absolutely-positioned overlay paints after the glyph and washes
// it out, and a ring built from mask-composite was covering it outright.
const GLASS_BLUR = "blur(16px) saturate(120%)";
// Brightening these was tried and reverted — the disc read better at these
// values. Measuring the frame render backs that up: over a (0,1,5) backdrop
// Figma's glass sits at (4.3,6.0,10.4) in the middle and (8.8,10.4,13.6) at the
// edge, which decomposes to the panel's 10% fill plus a sheen running ~1.7% in
// the centre to ~3.5% at the rim. Raising the fill to 15% and the sheen to 22%
// overshot that.
const GLASS_STYLE: React.CSSProperties = {
  background: [
    "linear-gradient(150deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 35%, rgba(255,255,255,0) 60%)",
    "rgba(0, 8, 23, 0.1)",
  ].join(", "),
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  // Stands in for Refraction / Splay — the lit edge, plus a fainter bounce
  // opposite it.
  boxShadow: [
    "inset 0 1.2px 1.2px -0.4px rgba(255,255,255,0.40)",
    "inset 0 -1px 1.2px -0.6px rgba(255,255,255,0.10)",
  ].join(", "),
};

type Part = {
  src: string;
  /** CSS inset, in Figma's top/right/bottom/left order. */
  inset?: string;
};

type Icon = {
  alt: string;
  glass: boolean;
  /** Glyph box; 28 on the one icon Figma sizes up. */
  size?: number;
  /** Horizontal offset from centre, where Figma nudges the glyph off-axis. */
  nudgeX?: number;
  parts: Part[];
};

const BASE = "/icons/music-app/";

const ROWS: Icon[][] = [
  [
    {
      alt: "Karaoke",
      glass: false,
      parts: [
        { src: "icon01-mic-a.svg", inset: "0 10.7% 59.01% 48.31%" },
        { src: "icon01-mic-b.svg", inset: "28.47% 39.17% 0 10.7%" },
      ],
    },
    { alt: "Search", glass: true, parts: [{ src: "icon02-search.svg" }] },
    { alt: "Microphone", glass: false, parts: [{ src: "icon03-mic.svg" }] },
    { alt: "Radio", glass: true, size: 28, parts: [{ src: "icon04-radio.svg" }] },
    { alt: "Love song", glass: false, parts: [{ src: "icon05-lovesong.svg", inset: "0.07% 0" }] },
  ],
  [
    { alt: "Shuffle", glass: true, parts: [{ src: "icon06-shuffle.svg" }] },
    { alt: "Volume", glass: false, parts: [{ src: "icon07-volume.svg" }] },
    {
      alt: "Music notes",
      glass: true,
      parts: [
        { src: "icon08-notes-a.svg", inset: "0 53.13% 29.3% 0" },
        { src: "icon08-notes-b.svg", inset: "23.83% 0 0 35.16%" },
      ],
    },
    { alt: "Frequency", glass: false, parts: [{ src: "icon09-frequency.svg", inset: "4.17% 1.29% 0 0" }] },
    // Figma 6595:26410 places this glyph at left 22 / top 20 in the 64 box,
    // where centred would be 20 / 20 — 2px right of centre, deliberately.
    {
      alt: "Disc",
      glass: true,
      nudgeX: 2,
      parts: [{ src: "icon10-disc.svg", inset: "4.17% 0 0.52% 0" }],
    },
  ],
];

function Glyph({ icon }: { icon: Icon }) {
  const size = icon.size ?? 24;
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size, left: icon.nudgeX ?? 0 }}
    >
      {icon.parts.map((part) => (
        <img
          key={part.src}
          src={BASE + part.src}
          alt=""
          className="absolute block max-w-none"
          // Figma nests several of these in inset-positioned groups; the inset
          // is what keeps each piece in place inside the 24px box.
          style={part.inset ? { inset: part.inset } : { inset: 0, width: "100%", height: "100%" }}
        />
      ))}
    </div>
  );
}

export default function IconsBlock() {
  return (
    <div className="flex flex-col gap-4">
      {ROWS.map((row, r) => (
        <div key={r} className="flex gap-4">
          {row.map((icon) => (
            <div
              key={icon.alt + r}
              className="relative flex size-16 shrink-0 items-center justify-center rounded-full"
              style={icon.glass ? GLASS_STYLE : { background: "#f5f5f5" }}
              aria-label={icon.alt}
              role="img"
            >
              <Glyph icon={icon} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
