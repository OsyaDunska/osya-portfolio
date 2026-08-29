import Image from "next/image";

// Figma 6657:12590 "Frame 2147237736" — 1352x1320 at x 44, y 8034. A 2x2 grid of
// 668x652 cells, 16 apart both ways: the copy, the hand sketch, and the two
// greyscale wireframe screens.
//
// The three picture cells are Figma's own 2x exports of the cells themselves,
// 1336x1304, so each one already carries the card's 20 radius as transparent
// corners. That is why none of them takes a border-radius here — adding one
// would round an already-rounded picture and shave the edge twice. Only the
// copy card, which is drawn rather than exported, gets the radius and the fill.
const CARDS = [
  { src: "/mockups/mentora/wireframes-sketch.webp", x: 728, y: 8034, alt: "Hand-drawn sketches of the key screens" },
  { src: "/mockups/mentora/wireframes-team-progress.webp", x: 44, y: 8702, alt: "Greyscale wireframe of the team progress screen" },
  { src: "/mockups/mentora/wireframes-ai-planner.webp", x: 728, y: 8702, alt: "Greyscale wireframe of the AI planner screen" },
];

const W = 668;
const H = 652;

export default function Wireframes() {
  return (
    <>
      {/* The copy card. Figma puts the text block at 32/104 inside it, 604 wide,
          with the heading at 0 and the paragraph at 60 — a 36 heading plus the
          24 gap. Both heights are exact (36 = 24 x 1.5, 96 = four 24 lines), but
          the offsets are written out anyway, the way the rest of this page does
          it. */}
      <div
        className="absolute overflow-hidden bg-[#292621]"
        style={{ left: 44, top: 8034, width: W, height: H, borderRadius: 20 }}
      >
        <div className="absolute" style={{ left: 32, top: 104, width: 604 }}>
          <h3
            className="whitespace-nowrap text-[24px] text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: "-0.264px",
            }}
          >
            Wireframes: testing the flow first
          </h3>
          <p
            className="absolute text-[16px] text-white/50"
            style={{
              left: 0,
              top: 60,
              width: 540,
              fontFamily: "var(--font-inter)",
              lineHeight: "24px",
              letterSpacing: "-0.176px",
            }}
          >
            {/* Figma breaks after "test" by hand — it comes back as two
                paragraphs rather than one. The remaining three lines it does not
                break: solving for the width that reproduces them needs at least
                523.9 and under 564.2, and the box is 540, so they wrap on their
                own and are left to. */}
            I started in Figma Make — building an interactive prototype to test{" "}
            <br />
            how users move through onboarding, lessons, and assignments before
            committing to UI. Then I sketched the key screens by hand to explore
            layout, and turned the validated flow into greyscale wireframes.
          </p>
        </div>
      </div>

      {CARDS.map((c) => (
        <Image
          key={c.src}
          src={c.src}
          alt={c.alt}
          width={W * 2}
          height={H * 2}
          unoptimized
          className="absolute max-w-none"
          style={{ left: c.x, top: c.y, width: W, height: H }}
        />
      ))}
    </>
  );
}
