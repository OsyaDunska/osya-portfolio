import Image from "next/image";

// Figma 6657:13367 — the persona row, 1352x700 at y 6213, holding four 326x700
// cards 16 apart and the four numerals that sit over their top left corners.
//
// A card is a 644-tall body on #292621, rounded 20 at the top only, with a white
// 56 footer rounded 12 at the bottom. The avatars are cropped to the 68x116 box
// at 2x here rather than in CSS: the sources run from 208x264 to 2048x3072, and
// Figma covers them centred, so the crop is done once, the same way, in the file.
const CARD_W = 326;
const BODY_H = 644;
const FOOTER_H = 56;

type Persona = {
  n: string;
  name: string;
  avatar: string;
  /** Figma nudges the first card's text block by 0.43. */
  textLeft: number;
  background: string;
  goals: string;
  pains: string;
};

const PERSONAS: Persona[] = [
  {
    n: "01",
    name: "The Creative Explorer",
    avatar: "/mockups/mentora/persona-1-creative-explorer.webp",
    textLeft: 20.43,
    background:
      "24, student experienced with online courses; loves interactive learning, challenges, and peer-to-peer feedback. Used to taking notes and experimenting.",
    goals:
      "Wants a platform that builds skills through practice, interactive tasks, and community support. Needs to feel progress and confidence.",
    pains:
      "Dislikes dry content with no emotional hook. Information gets lost in group chats, and weak mentor feedback kills motivation.",
  },
  {
    n: "02",
    name: "The Organized Practitioner",
    avatar: "/mockups/mentora/persona-2-organized-practitioner.webp",
    textLeft: 20,
    background:
      "Marketer who takes online courses regularly. Uses notes, calendar, and cloud tools to stay organized.",
    goals:
      "Wants to learn at her own pace, get quality feedback, apply knowledge in practice, and see clear progress.",
    pains:
      "Dislikes theory without practice. Gets lost across too many messages and tools; feels a lack of mentor support.",
  },
  {
    n: "03",
    name: "The Mobile Listener",
    avatar: "/mockups/mentora/persona-3-mobile-listener.webp",
    textLeft: 20,
    background:
      "Studies on the go — between classes or on walks. Used to mobile apps and quick content consumption.",
    goals:
      "Wants to learn anywhere without a laptop. Values listening to lessons in the background, moving fast, and staying motivated without constant reminders.",
    pains:
      "Unstable mobile internet, no mobile optimization, lessons too long, and no offline access.",
  },
  {
    n: "04",
    name: "The Overloaded Professional",
    avatar: "/mockups/mentora/persona-4-overloaded-professional.webp",
    textLeft: 20,
    background:
      "Works full-time, balancing study with personal life. Usually studies in the evening or on the go; values a flexible format.",
    goals:
      "Wants practical skills without overload, learning at a convenient pace, with access to materials even after the course ends.",
    pains:
      "Lack of time, constant distractions, unstable internet, and an overly complex or cluttered platform interface.",
  },
];

// x of each card and of each numeral inside the row.
const CARD_X = [0, 342, 684, 1026];
const NUM_X = [22.5, 367.5, 712.5, 1048];

// The three blocks sit at fixed offsets inside the 379-tall column — 0, 140 and
// 280 — with fixed heights of 120, 120 and 99, whatever the text does. Stacking
// them with a gap instead looked right on the first card only, where the copy
// happens to fill all four lines; on the other three the shorter paragraphs
// pulled everything up.
const BLOCK_TOP = [0, 140, 280];
const BLOCK_H = [120, 120, 99];

/** A label and its paragraph, 12 apart. */
function Block({
  label,
  body,
  width,
  top,
  height,
}: {
  label: string;
  body: string;
  width: number;
  top: number;
  height: number;
}) {
  return (
    <div className="absolute flex flex-col" style={{ left: 0, top, width, height, gap: 12 }}>
      <p
        className="whitespace-nowrap text-[16px] text-white"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 500,
          lineHeight: 1.5,
          letterSpacing: "-0.176px",
        }}
      >
        {label}
      </p>
      <p
        className="text-[14px] text-white/50"
        style={{ fontFamily: "var(--font-inter)", lineHeight: 1.5, letterSpacing: "-0.154px" }}
      >
        {body}
      </p>
    </div>
  );
}

export default function UserPersonas() {
  return (
    <>
      {PERSONAS.map((p, i) => (
        <div
          key={p.n}
          className="absolute"
          style={{ left: 44 + CARD_X[i], top: 6213, width: CARD_W, height: BODY_H + FOOTER_H }}
        >
          <div
            className="relative overflow-hidden bg-[#292621]"
            style={{
              width: CARD_W,
              height: BODY_H,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Image
              src={p.avatar}
              alt=""
              aria-hidden
              width={136}
              height={232}
              unoptimized
              className="absolute"
              style={{ left: (CARD_W - 68) / 2 - 0.5, top: 44, width: 68, height: 116 }}
            />
            <div
              className="absolute"
              style={{ left: p.textLeft, top: 208, width: 286, height: 379 }}
            >
              <Block
                label="Background"
                body={p.background}
                width={284}
                top={BLOCK_TOP[0]}
                height={BLOCK_H[0]}
              />
              <Block
                label="Goals"
                body={p.goals}
                width={284}
                top={BLOCK_TOP[1]}
                height={BLOCK_H[1]}
              />
              <Block
                label="Pain points"
                body={p.pains}
                // Figma declares 286 for all four of these, but at 286 card 4's
                // middle line takes one word too many. Solving each card for the
                // width that gives Figma's own lines leaves a shared window of
                // [284.4, 285.3): card 1 needs at least 284.4 for its longest
                // line, card 4 needs under 285.3. 285 is the only whole number
                // in it.
                width={285}
                top={BLOCK_TOP[2]}
                height={BLOCK_H[2]}
              />
            </div>
          </div>

          <div
            className="flex items-center justify-center overflow-hidden bg-white"
            style={{
              width: CARD_W,
              height: FOOTER_H,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
          >
            <p
              className="whitespace-nowrap text-[14px] text-[#292621]"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                lineHeight: "normal",
                letterSpacing: "-0.154px",
              }}
            >
              {p.name}
            </p>
          </div>
        </div>
      ))}

      {/* 6657:13428-13431 — the numerals, drawn over the cards rather than in
          them, which is how Figma has them. */}
      {PERSONAS.map((p, i) => (
        <p
          key={`n-${p.n}`}
          aria-hidden
          className="absolute whitespace-nowrap text-[32px] text-white/30"
          style={{
            left: 44 + NUM_X[i],
            top: 6242,
            fontFamily: "var(--font-libre-baskerville)",
            fontStyle: "italic",
            lineHeight: 1.5,
            letterSpacing: "-0.352px",
          }}
        >
          {p.n}
        </p>
      ))}
    </>
  );
}
