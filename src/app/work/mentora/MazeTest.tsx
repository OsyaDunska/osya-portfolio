import Image from "next/image";

// Figma 6657:12527 "Frame 2147238152" — 1352x666 at x 44, y 10976. A heading
// block inset 150 like the rest of the page, then a row of two 668x414 cards
// 16 apart on #f7f7f7 at radius 20.
//
// Inside each card is a Maze screenshot with a heat map on it, 342 tall and
// centred both ways. Neither is redrawn: the first card carries a whole video
// player overlaid on the shot — dozens of vector and text pieces set in
// Urbanist, which the site does not load — and the second is a single bitmap.
//
// Both pictures are wider and taller than the node they came from because the
// export carries the screenshot's drop shadow with it, so each is hung by its
// own bleed rather than at the node's own 94/36 and 95/36:
//
//   lesson  480x342 node, 524x387 export -> 22 and 22.5 a side
//   notes   478x342 node, 525x390 export -> 23.5 and 24 a side
//
// The first came back with a transparent ground and the second opaque, with the
// card's own #f7f7f7 baked into the shadow's margin. Over a #f7f7f7 card the two
// composite identically, so the difference does not show.
const CARD_W = 668;
const CARD_H = 414;

const CARDS = [
  {
    src: "/mockups/mentora/maze-lesson-heatmap.webp",
    alt: "Maze heat map over the lesson page, with the video player open",
    x: 44,
    left: 72,
    top: 13.5,
    w: 524,
    h: 387,
  },
  {
    src: "/mockups/mentora/maze-notes-heatmap.webp",
    alt: "Maze heat map over the notes and homework page",
    x: 728,
    left: 71.5,
    top: 12,
    w: 525,
    h: 390,
  },
];

export default function MazeTest() {
  return (
    <>
      <h2
        className="absolute whitespace-nowrap text-[24px] text-white"
        style={{
          left: 194,
          top: 10976,
          fontFamily: "var(--font-inter)",
          fontWeight: 500,
          lineHeight: 1.5,
          letterSpacing: "-0.264px",
        }}
      >
        Usability testing: where users actually clicked
      </h2>

      {/* 6657:12530 — 435.747 wide, three 24 lines. */}
      <p
        className="absolute text-[16px] text-white/50"
        style={{
          left: 194,
          top: 11036,
          width: 435.747,
          fontFamily: "var(--font-inter)",
          lineHeight: "24px",
          letterSpacing: "-0.176px",
        }}
      >
        I tested the key flows in Maze: lesson page, homework, and notes. Heatmaps
        showed where users clicked and hesitated, confirming the main flows worked
        as intended.
      </p>

      {CARDS.map((c) => (
        <div
          key={c.src}
          className="absolute overflow-hidden bg-[#f7f7f7]"
          style={{ left: c.x, top: 11228, width: CARD_W, height: CARD_H, borderRadius: 20 }}
        >
          <Image
            src={c.src}
            alt={c.alt}
            width={c.w * 2}
            height={c.h * 2}
            unoptimized
            className="absolute max-w-none"
            style={{ left: c.left, top: c.top, width: c.w, height: c.h }}
          />
        </div>
      ))}
    </>
  );
}
