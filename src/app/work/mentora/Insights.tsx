// Figma 6657:13432, 13480, 13485 and 13490 — four insight blocks scattered down
// the page rather than set in a row: each has its own x and y, and they overlap
// in bands. All are 298 wide.
//
// Inside each: heading, 20, body, 20, attribution. The body is two paragraphs 20
// apart, the second opening with a heavy arrow in white.
//
// The lines are Figma's, written out rather than left to the browser. Every text
// box in the file is 298 wide, so the obvious thing is to set 298 and let it
// wrap — but that gives different lines. Solving for the width that would
// reproduce Figma's own breaks shows no such width exists: block 1 needs at
// least 259.5 to keep "routine — they don't lack materials," on one line, while
// block 3 needs under 251.6 or "keeps" joins "→ Built-in mentor feedback". The
// breaks are typed in, so they are typed in here too.
//
// Widths were read off Figma's own 2x exports of the four blocks and each line
// solved against them; all eight paragraphs matched within about 2px with no
// words left over.
type Insight = {
  x: number;
  y: number;
  /** y of the body and of the attribution inside the block, from Figma. */
  bodyY: number;
  fromY: number;
  heading: string[];
  lead: string[];
  answer: string[];
  from: string;
};

const INSIGHTS: Insight[] = [
  {
    x: 64,
    y: 7033,
    bodyY: 69,
    fromY: 229,
    heading: ["Insights #1: Structure is the", "real problem, not content"],
    lead: [
      "71% of learners have no stable",
      "routine — they don't lack materials,",
      "they lack a system to stay on track.",
    ],
    answer: ["Mentora's core value is planning", "and consistency, not just content."],
    from: "From: The Overloaded Professional",
  },
  {
    x: 406,
    y: 7379,
    bodyY: 46,
    fromY: 206,
    heading: ["Insights #2: Progress is invisible"],
    lead: [
      "Across competitors, progress is",
      "buried inside individual courses",
      "— effort feels unmeasured.",
    ],
    answer: ["Always-visible progress tracking", "becomes a key retention driver."],
    from: "From: The Organized Practitioner",
  },
  {
    x: 748,
    y: 7702,
    bodyY: 46,
    fromY: 211,
    heading: ["Insights #3: Learning feels lonely"],
    lead: [
      "Communication is scattered",
      "across Telegram, email, and links",
      "— learners lose momentum.",
    ],
    answer: ["Built-in mentor feedback", "keeps learners engaged."],
    from: "From: The Creative Explorer",
  },
  {
    x: 1090.43,
    y: 7137.55,
    bodyY: 72,
    fromY: 232,
    heading: ["Insights #4: Motivation fades", "without milestones"],
    lead: [
      "Streaks and a sense of",
      "achievement are missing —",
      "completion feels anticlimactic.",
    ],
    answer: ["Milestones and a meaningful", "finish sustain motivation."],
    from: "From: The Mobile Listener",
  },
];

/**
 * Figma opens the second paragraph with → in Inter Black, white. The character
 * cannot be used: U+2192 is in none of the subsets Google serves for Inter —
 * the latin range carries U+2191 and U+2193 and skips the one between — so it
 * always fell through to a system font. That fallback measured 17.14 against
 * Figma's ~12.8, and was identical at weight 400 and 900, which is what made the
 * shape wrong on the page.
 *
 * So it is drawn, traced off Figma's export: a chevron head rather than a solid
 * triangle, one 2.5 stroke throughout, ink 11.5 x 12.5. The 17.2 box and the left
 * inset are the glyph's own advance and left bearing, which keep the words after
 * it where Figma puts them.
 *
 * The canvas is 1 larger than the ink on every side because a stroked path is
 * not contained by its own points: at the 90-degree tip the miter runs
 * 2.5/2*sqrt(2) = 1.77 past the vertex, and each arm's butt end reaches 0.88
 * beyond its endpoint. Sized to the ink, that cut the tip off. So the vertex
 * sits at 10.73, not at the ink's 12.5, and the arms end 0.88 inside the edges
 * they are meant to touch.
 */
function Arrow() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 17.2,
        height: 14,
        // 1 of the 2 left bearing; the canvas carries the other 1.
        paddingLeft: 1,
        // Puts the ink 6.5 below the line box top, where Figma has it.
        verticalAlign: "baseline",
        position: "relative",
        top: 2.26,
      }}
    >
      <svg width="13.5" height="14" viewBox="0 0 13.5 14" fill="none" display="block">
        <path
          d="M1 7H10.73M5.37 1.634 10.73 7 5.37 12.366"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    </span>
  );
}

/** Figma's lines, kept as lines. The trailing space is not rendered — it sits
 *  against a forced break — but it keeps the words apart for anything reading
 *  the text rather than looking at it. */
function Lines({ of }: { of: string[] }) {
  return (
    <>
      {of.map((line, i) => (
        <span key={line}>
          {i < of.length - 1 ? `${line} ` : line}
          {i < of.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export default function Insights() {
  return (
    <>
      {INSIGHTS.map((it) => (
        // The three parts sit at the offsets Figma gives them rather than
        // stacking with a gap. Stacked, the first block's attribution landed 3
        // low and the third's 5 high: Figma trims the two-line heading to 49
        // where the browser makes 52, and gives the third block's body a 145 box
        // for 140 of text. Fixed offsets sidestep both.
        <div
          key={it.from}
          className="absolute"
          style={{ left: it.x, top: it.y, width: 298 }}
        >
          <div>
            <h3
              className="text-[18px] text-white"
              style={{
                width: 298,
                fontFamily: "var(--font-inter-tight)",
                fontWeight: 600,
                lineHeight: "26px",
                letterSpacing: "-0.198px",
              }}
            >
              <Lines of={it.heading} />
            </h3>
            <div
              className="absolute text-[16px] text-white/60"
              style={{
                left: 0,
                top: it.bodyY,
                width: 298,
                fontFamily: "var(--font-inter)",
                lineHeight: "24px",
                letterSpacing: "-0.2074px",
              }}
            >
              <p style={{ marginBottom: 20 }}>
                <Lines of={it.lead} />
              </p>
              <p>
                <span className="text-white">
                  <Arrow />
                </span>{" "}
                <Lines of={it.answer} />
              </p>
            </div>
          </div>
          <p
            className="absolute whitespace-nowrap text-[14px] text-white/40 italic"
            style={{
              left: 0,
              top: it.fromY,
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              lineHeight: "normal",
              letterSpacing: "-0.154px",
            }}
          >
            {it.from}
          </p>
        </div>
      ))}
    </>
  );
}
