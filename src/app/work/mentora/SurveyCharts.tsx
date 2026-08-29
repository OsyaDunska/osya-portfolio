import Image from "next/image";

// Figma 6657:12491 "Frame 2147237351" — 1440x500 at y 3992, holding four
// 778-wide cards at x 44, 838, 1632 and 2426, 16 apart.
//
// It does not scroll. The strip is 3204 wide against a 1440 frame, and what runs
// past the edge simply stays there: at 1440 that is the first card whole and a
// slice of the second, exactly as the design shows. The block takes the real
// width of the window rather than the 1440 canvas, so a wider screen reveals
// more of the strip on its own — the cards themselves never resize.
type Chart = {
  src: string;
  alt: string;
  /** The export's own size in CSS px — the 778x237 node plus its shadow bleed. */
  w: number;
  h: number;
  /** How far the bleed reaches past the node on each side. */
  bleed: number;
  file: [number, number];
};

// Each file is Figma's own 2x export of the chart node, shadow and rounded
// corners baked in: 1583x501 is 791.5x250.5 in CSS, which is the 778x237 node
// with 6.75 of bleed a side. So no border-radius, no box-shadow and no white
// underlay here — the picture already carries all three, and adding CSS ones
// would double them. The bleed differs a little per shot, hence the per-file
// numbers.
//   The order is Figma's, read off the layer names, and it is not the order the
// filenames sort in: card two pairs 17.43.42 with 17.43.54, card three pairs
// 17.43.46 with 17.43.50.
const CARDS: Chart[][] = [
  [
    { src: "/mockups/mentora/survey-1a.webp", alt: "Survey chart: working schedule", w: 791.5, h: 250.5, bleed: 6.75, file: [1583, 501] },
    { src: "/mockups/mentora/survey-1b.webp", alt: "Survey chart: how many courses at once", w: 788.5, h: 247.5, bleed: 5.25, file: [1577, 495] },
  ],
  [
    { src: "/mockups/mentora/survey-2a.webp", alt: "Survey chart: when people study", w: 790, h: 249, bleed: 6, file: [1580, 498] },
    { src: "/mockups/mentora/survey-2b.webp", alt: "Survey chart: how people are reminded of tasks", w: 791.5, h: 250.5, bleed: 6.75, file: [1583, 501] },
  ],
  [
    { src: "/mockups/mentora/survey-3a.webp", alt: "Survey results chart", w: 790, h: 249, bleed: 6, file: [1580, 498] },
    { src: "/mockups/mentora/survey-3b.webp", alt: "Survey results chart", w: 791.5, h: 250.5, bleed: 6.75, file: [1583, 501] },
  ],
  [
    { src: "/mockups/mentora/survey-4a.webp", alt: "Survey results chart", w: 790, h: 249, bleed: 6, file: [1580, 498] },
    { src: "/mockups/mentora/survey-4b.webp", alt: "Survey results chart", w: 790, h: 249, bleed: 6, file: [1580, 498] },
  ],
];

// The first card starts at x 44 on the 1440 canvas. The canvas is centred, so in
// window terms that is (100vw - 1440) / 2 + 44 once the window is wider than the
// canvas, and a plain 44 before that — which is what the max() resolves to.
const EDGE = "max(44px, calc(50vw - 676px))";

export default function SurveyCharts() {
  return (
    <div
      className="absolute left-1/2 flex w-screen -translate-x-1/2 gap-4 overflow-hidden"
      style={{ top: 3992, height: 500, paddingInline: EDGE }}
    >
      {CARDS.map((card, i) => (
        <div key={i} className="flex shrink-0 flex-col" style={{ width: 778, gap: 24 }}>
          {card.map((c) => (
            // The box stays Figma's 778x237; the picture is hung on it by its
            // own bleed so the shadow falls outside, where it belongs.
            <div key={c.src} className="relative shrink-0" style={{ width: 778, height: 237 }}>
              <Image
                src={c.src}
                alt={c.alt}
                width={c.file[0]}
                height={c.file[1]}
                unoptimized
                className="absolute max-w-none"
                style={{ left: -c.bleed, top: -c.bleed, width: c.w, height: c.h }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
