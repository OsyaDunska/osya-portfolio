import Link from "next/link";
import Image from "next/image";
import SocialButtons from "@/components/SocialButtons";

// Exported from Figma and kept in the repo, not linked from figma.com: those
// MCP asset URLs expire seven days after they are issued.
const backArrowIcon = "/icons/back-arrow.svg";

// Both taken from 6832:6250 itself, not from what the page used to carry.
const portrait = "/photos/about-portrait.png";
const osyaScript = "/graphics/about-osya.svg";
const littleMeBg = "/photos/about-little-me-bg.webp";
const littleMePhoto = "/photos/about-little-me.webp";
const littleMeScript = "/graphics/about-little-me.svg";
const signoffMark = "/graphics/about-signoff.svg";

/**
 * How far the sign-off sits below the quote, Figma 6832:6337.
 *
 * It has been moved four times: 89.48, then 104, then 140, then 90, and the
 * file now measures 136 — the quote having become one line, the space under
 * it grew to keep the sign-off where it sits. Kept as a constant so putting
 * it back is one number and nothing else.
 */
const SIGNOFF_GAP = 136;

/**
 * The heading, Figma 6943:14564.
 *
 * A flat 36 over 40, where this used to slide on a clamp whose top was 36 —
 * so it only ever reached the file's size at the design width and sat under
 * it everywhere else. It has been 40/44 and then 32/36 over earlier revisions.
 * The phone keeps its own 32/36 at the breakpoint: three lines of this do not
 * fit 342 at 36.
 */
const HEADING = { size: "36px", leading: "40px" };

const TAGS = [
  "# Design Systems",
  "# UX Research",
  "# Prototyping",
  "# AI-first Workflow",
  "# Usability Testing",
];

// 6953:15118 sets them out in two rows of its own rather than letting five
// wrap: three over two, in a different order, and "# AI-first" without the
// word the wide page carries. The three across measure 344 against 342 of
// column, so a wrap would put two on the first row and three on the second —
// the rows are written out rather than left to fall.
const TAGS_PHONE = [
  ["# Design Systems", "# Prototyping", "# AI-first"],
  ["# Usability Testing", "# UX Research"],
];

// Figma 6832:6250. Stripped back to the top bar on purpose — everything below
// it is being rebuilt from the file block by block rather than corrected in
// place, because what was here had drifted far enough that fixing it one
// measurement at a time cost more than starting again.
//
// The bar is 6832:6410: the back button at the left, the three contact buttons
// at the right, 48 tall, sitting 44.5 in from the frame's edge and 32 down.
// This part is signed off; nothing below it is.
// Figma 6943:14577. Each entry is a position and period, the project, and a
// body — 10 apart inside and 40 between entries. The body lines are the file's
// own hard breaks: Figma exports one paragraph per break, and these come back
// split where the text still had room, so the breaks are the designer's.
// The wide page used to lead with the period alone and then name position and
// project together on one line. 6943:14550 drops that for the phone's own
// arrangement, 6946:14846, which the file now uses at both widths — the same
// two type styles, only the words moved.
// The phone draft writes the first line closed up — "Product Designer/2026" —
// and the wide one spaced; both are spaced here, which is the later call.
// What the two still disagree on is how much of a project's name fits: 342
// takes "(NDA, AG)" and "Diamond E-commerce & Art Store" where 740 has room
// for the full ones, so those two carry a projectWide beside them.
// Hyphenated compounds here carry U+2011, a non-breaking hyphen, where a
// plain one let the browser split them across lines at 342 — "e-" ending one
// line and "commerce" starting the next. It draws the same glyph; only the
// break opportunity is gone.
const EXPERIENCE: {
  period: string;
  position: string;
  project: string;
  /** Only where the wide page names the project at more length than 342 holds. */
  projectWide?: string;
  body: string[][];
}[] = [
  {
    period: "2026",
    position: "Product Designer",
    project: "Learning Platform (SaaS)",
    body: [
      [
        "Designed the MVP for an AI-powered online learning platform — from stakeholder and user interviews and competitor benchmarking to user personas, wireframes, usability testing in Maze, and a token-based design system. Validated priorities with a 63-student survey. Core feature:",
        "an AI planner that builds a personalized study schedule",
      ],
    ],
  },
  {
    period: "Jan 2026 — Aug 2026",
    position: "UI/UX Designer",
    project: "Eyewear E-commerce Brand (NDA)",
    body: [
      [
        "Built a prescription lens configurator guiding customers step-by-step through lens selection. Designed the landing page driving paid traffic straight into the configurator. Built admin panels",
        "and client dashboards for order management and tracking.",
      ],
    ],
  },
  {
    period: "Jan 2025 — Sep 2025",
    position: "UI/UX Designer",
    project: "Medical Cannabis Marketplace (NDA, AG)",
    projectWide: "Medical Cannabis Marketplace (NDA, Agency)",
    body: [
      [
        "Led a full redesign of the homepage, marketplace, and checkout flow. Simplified the onboarding quiz for new patients, cutting completion time from 12 minutes to 6. Redesigned the shopping cart with a progress bar tracking the 100g legal limit, showing which pharmacy would fulfill each order",
        "in this multi-pharmacy marketplace, with quick links to switch pharmacies or add more products before checkout. Added a post‑purchase feedback flow, rewarding reviews with a discount on the next order. Designed the patient personal account, including video‑consultation scheduling and reorder flow.",
      ],
    ],
  },
  {
    period: "2025",
    position: "UI/UX Designer",
    project: "Diamond E-commerce & Art Store",
    projectWide: "Online Gallery & Diamond Retail Site",
    body: [
      [
        "Designed the e-commerce experience for an online art gallery selling a private collection of",
        "Damien Hirst spin paintings. Built the catalog structure with category-based filtering by painting type, individual product pages for each artwork, and a \u201cHow to Buy\u201d flow addressing trust concerns typical for high‑value art purchases.",
      ],
      [
        "Redesigned a diamond e-commerce website — including the homepage, product catalog, and filtering system — helping customers navigate and compare diamonds by key specifications more intuitively.",
      ],
    ],
  },
];

// Figma 6832:6297. Three labelled lists, 24 apart, each label 16 above its
// items and the items 6 apart. The bullets are the file's own: a disc at 24 of
// indent, not a dash or a custom marker.
/** The one phrase the phone draft drops from a tools line. */
const DESKTOP_ONLY_TAIL = " — working knowledge";

const TOOLS: { label: string; items: string[] }[] = [
  {
    label: "Design & Prototyping:",
    items: [
      "Figma (component libraries, Auto Layout, Variants, Figma Variables, design tokens)",
      "FigJam",
      "Photoshop",
      "Illustrator (icons & banner assets — working knowledge)",
      "Figma Make",
      "Motion Design (Figma)",
      "Maze",
    ],
  },
  {
    label: "AI-first workflow:",
    items: ["Claude", "ChatGPT", "Midjourney", "Krea AI", "Freepik / Magnific", "Adobe Firefly"],
  },
  {
    label: "Development & Deployment:",
    items: ["GitHub", "Vercel", "Claude Code"],
  },
];

export default function AboutMe() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pt-8 pb-[20.46px] md:px-11">
      {/* 6943:14662 keeps only the button up here on a phone — the social row
          goes to the foot, past the quote — and the button carries the file's
          Variant2, which is the grey the desktop one only takes on hover. The
          button ends at 88 and the portrait starts at 120, so 32 under it
          rather than the 88 the wide page leaves. */}
      <div className="mb-8 flex items-center justify-between md:mb-[88px]">
        <Link
          href="/"
          className="flex h-12 w-12 items-center justify-center rounded-[28px] bg-[#f5f5f5] transition-colors md:bg-transparent md:hover:bg-[#f5f5f5]"
          aria-label="Back to all works"
        >
          <Image src={backArrowIcon} alt="" width={24} height={24} unoptimized />
        </Link>
        <SocialButtons className="hidden md:flex" />
      </div>

      {/* Figma 6832:6251 and 6832:6252 — the portrait with the script hanging
          off its lower right.
            The photo is 148x160 on a 16 radius, and the crop is the file's own
          rather than object-cover: the source is scaled to 377.06% x 523.38%
          of the frame and pulled -188.53% left and -180.34% up, which is what
          puts her face where the design has it.
            The script is 112.25 x 48, set 108 across and 138 down from the
          photo's corner — 72.25 past its right edge and 26 below its bottom.
          Positioned, not laid out, so that overhang costs the column no
          height.
            Its file is the export from the desktop, with the four duplicate
          stroke paths dropped. Figma exports this vector twice over, once
          filled and once stroked, and the stroke carries no width — so a
          browser draws it at 1px and every letter comes out about a pixel
          fatter than the file draws it. The fills alone are the letterform. */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mx-auto w-[148px]">
          <div className="relative h-[160px] w-[148px] overflow-hidden rounded-[16px] bg-[#e9e9e9]">
            <Image
              src={portrait}
              alt="Osya Dunska"
              width={853}
              height={1280}
              unoptimized
              className="absolute max-w-none"
              style={{ left: "-188.53%", top: "-180.34%", width: "377.06%", height: "523.38%" }}
            />
          </div>
          {/* 108/138 at the design width; the phone draft hangs it at 111.9
              and 134.4 off the same corner. */}
          <div
            className="absolute left-[112px] top-[134px] md:left-[108px] md:top-[138px]"
            style={{ width: 112.2476, height: 48 }}
          >
            <Image src={osyaScript} alt="Osya" fill unoptimized />
          </div>
        </div>

        {/* Figma 6832:6264 — Inter Semi Bold, -1.2 of tracking, centred, 32
            below the photo; see HEADING for the size. Three lines, broken where the file breaks them.
            The first carries the node's own 40% grey; the other two override it
            to #292621, and only "first" leans, with the space inside the
            leaning run rather than around it.
              "first" is set in Inter's italic, the face the file names. Figma
            itself only slants the upright there, having no italic Inter
            installed — its render sets this line's ink 31 tall where the drawn
            italic sets it 38, an f with a descender being the difference. The
            drawn letter is the one kept, by the owner's decision.
*/}
        <h1
          className="mt-6 text-[32px] leading-[36px] font-semibold md:mt-8 md:text-[length:var(--heading-size)] md:leading-[var(--heading-leading)]"
          style={
            {
              "--heading-size": HEADING.size,
              "--heading-leading": HEADING.leading,
              letterSpacing: "-1.2px",
              fontFamily: "var(--font-inter)",
            } as React.CSSProperties
          }
        >
          {/* 6943:14769 breaks this one in two on a phone — "I own the full"
              over "design process" — where the wide page keeps it whole. */}
          <span className="block text-[rgba(41,38,33,0.4)]">
            {"I own the full "}
            <br className="md:hidden" />
            {"design process"}
          </span>
          <span className="block text-[#292621]">
            {"from the "}
            <span className="italic">{"first "}</span>
            {"sketch to "}
          </span>
          <span className="block text-[#292621]">a dev-ready screen</span>
        </h1>

        {/* Figma 6832:6253 — five pills in a row 706 wide, 8 apart; see
            HEADING_TO_TAGS for the distance above them. Each is 33 tall: 8 of padding over a 17 line over
            8 again, on 12 of side padding, so the widths fall out at 143, 122,
            114, 148 and 143.
              The hash is part of the label rather than added in the markup,
            so a tag can carry its own spacing if it ever needs to. The file has
            the last one set without a space; here all five are spaced alike, by
            the owner's decision. */}
        {/* 6953:15118 — two rows, 8 apart across and 10 down, 32 clear of the
            heading above and of the body below. 10 of side padding rather than
            the 12 the wide page uses. */}
        <div className="mt-8 flex flex-col items-center gap-2.5 md:hidden">
          {TAGS_PHONE.map((row) => (
            <div key={row[0]} className="flex items-center justify-center gap-2">
              {row.map((tag) => (
                <span
                  key={tag}
                  className="flex h-[34px] items-center rounded-full bg-[#f5f5f5] px-2.5 text-[14px] leading-[17px] whitespace-nowrap text-[#111]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="hidden md:mt-8 md:flex md:flex-wrap md:justify-center md:gap-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="flex h-[34px] items-center rounded-full bg-[#f5f5f5] px-3 text-[14px] leading-[17px] text-[#111]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Figma 6832:6268 — the body column: 740 wide, left-aligned, centred on
          the canvas, 48 below the tags. Inter Regular 16/24 at -0.176 of
          tracking on #292621, with 24 between paragraphs. The gaps between the
          sections below are set on each section rather than on this column,
          because the file does not space them alike: 56 to "How I Work" and 64
          to each section after it.
            Three of these carry a hard break, because the file does: Figma
          exports one paragraph per explicit break, and the long "How I Work"
          text comes back as a single one while these come back split. So the
          breaks after "across", "and I apply" and "not just my" are the
          designer's, not the column's, and they are set with <br /> rather than
          left to the wrap. Below 740 each half still wraps on its own.
            The emphasised runs are Inter Semi Bold Italic on #171716 — a real
          italic face, and the same one the heading uses. */}
      {/* text-wrap is inherited, so the whole column takes the file's own
          setting in one place. Figma emits text-pretty on these paragraphs —
          it keeps a last line from being one short word — and the wide page
          goes back to plain wrap, where the breaks are written by hand anyway. */}
      <div className="mx-auto mt-8 flex w-full max-w-[740px] flex-col text-pretty md:mt-12 md:text-wrap">
        <div
          className="flex flex-col gap-6 text-[16px] leading-[24px] text-[#292621] md:gap-4"
          style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.176px" }}
        >
          <p>
            {"Hi, I'm Osya — a UI/UX & Product Designer "}
            <br className="md:hidden" />
            {"with 2 years of hands-on experience across "}
            <br className="hidden md:inline" />
            {"e‑commerce, SaaS, and healthtech products."}
          </p>
          <p>
            {"I work primarily in Figma (component libraries, "}
            <span className="font-semibold italic text-[#171716]">design tokens</span>
            {", Auto Layout, Variants), and I apply "}
            <br className="hidden md:inline" />
            {"an "}
            <span className="font-semibold italic text-[#171716]">
              {"AI-first approach — Claude, Figma Make, Midjourney "}
            </span>
            {"— to move faster through research and prototyping without losing quality. I even built this very site myself, together with Claude — from structure to final details."}
          </p>
          <p>
            {"I'm always open to learning and creating, and I love that about myself. Design is not just my "}
            <br className="hidden md:inline" />
            {"work — it's also my hobby and something I genuinely enjoy. I'm lucky to do what I love every day."}
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-6">
          <h2
            className="text-[24px] leading-[29px] font-semibold uppercase text-[#171716]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            How I Work
          </h2>
          <p
            className="text-[16px] leading-[24px] text-balance text-[#292621] md:text-wrap"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.176px" }}
          >
            {"I start every project by understanding the problem before touching a single pixel. I talk to stakeholders when possible, research users, and do my best to understand the needs of both business owners and users — to find the most beneficial solution for both sides. I also benchmark competitors, to make sure I'm solving the right problem, not just the obvious one."}
          </p>
        </div>

        {/* Figma 6832:6277 — 64 below the block above it, which is the gap the
            file puts between them. The period sits on 26 of leading against the
            body's 24, and reads at 60% of #292621; the project is Semi Bold
            on #171716 at the 19 the file measures rather than a named leading.
              All four periods are Inter at 60%; an earlier revision had one of
            them in Inter Tight and the set at 80%, and both are gone. */}
        <div className="mt-16 flex flex-col gap-6">
          <h2
            className="text-[24px] leading-[29px] font-semibold uppercase text-[#171716]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Experience
          </h2>

          {/* 40 between entries at both widths; 8 inside them on a phone
              against the 10 the wide page measures. */}
          <div className="flex flex-col gap-10 text-[16px]">
            {EXPERIENCE.map(({ period, position, project, projectWide, body }) => (
              <div key={`${position} ${period}`} className="flex flex-col gap-2 md:gap-2.5">
                <p
                  className="leading-[26px] text-[rgba(41,38,33,0.6)]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {position} / {period}
                </p>
                <div className="flex flex-col gap-2 md:gap-2.5">
                  <p
                    className="font-semibold leading-[19px] text-[#171716]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="md:hidden">{project}</span>
                    <span className="hidden md:inline">{projectWide ?? project}</span>
                  </p>
                  <div
                    className="flex flex-col gap-6 leading-[24px] text-[#292621]"
                    style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.176px" }}
                  >
                    {body.map((lines) => (
                      <p key={lines[0].slice(0, 32)}>
                        {lines.map((line, i) => (
                          <span key={i}>
                            {i > 0 && <br className="hidden md:inline" />}
                            {`${line} `}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Figma 6832:6297 — 64 below Experience, the gap the file puts
            between every section of this column from here down. */}
        <div className="mt-16 flex flex-col gap-6">
          <h2
            className="text-[24px] leading-[29px] font-semibold uppercase text-[#171716]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Tools I Use
          </h2>

          <div className="flex flex-col gap-6 text-[16px]">
            {TOOLS.map(({ label, items }) => (
              <div key={label} className="flex flex-col gap-4">
                <p
                  className="font-semibold leading-[19px] text-[#171716]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {label}
                </p>
                <ul
                  className="flex list-disc flex-col gap-1.5 ps-6 leading-[24px] text-[#292621]"
                  style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.176px" }}
                >
                  {items.map((item) => {
                    // 6946:14908 carries no "— working knowledge" on this one,
                    // so the tail is held for the wide page and the phone
                    // reads the file's shorter line.
                    const [head, tail] = item.split(DESKTOP_ONLY_TAIL);
                    return (
                      <li key={item}>
                        {head}
                        {tail !== undefined && (
                          <>
                            <span className="hidden md:inline">{DESKTOP_ONLY_TAIL}</span>
                            {tail}
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Figma 6832:6325 */}
        <div className="mt-16 flex flex-col gap-6">
          <h2
            className="text-[24px] leading-[29px] font-semibold uppercase text-[#171716]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Languages:
          </h2>
          <p
            className="text-[16px] leading-[24px] text-[#292621]"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.176px" }}
          >
            {/* The comma joins the two on one line at the design width; on a
                phone they are two lines and it goes. */}
            {"Ukrainian & Russian (native)"}
            <span className="hidden md:inline">{", "}</span>
            <br className="md:hidden" />
            {"English (working proficiency)"}
          </p>
        </div>

        {/* Figma 6832:6334 — its label is 16, not the 18 the sections above
            use — every section heading is 16 now — and it sits on the
            file's own 19 rather than the 24 the others take.
              64 above it, the file's own number. It read 84 for a while: the
            headings above were set on 19 of leading before the file was, which
            took 5 off each of four sections and 20 off the column, and the 20
            had to go back here. The file now sets them auto, which is 19, and
            the two agree — so the compensation is gone. */}
        <div className="mt-16 flex flex-col gap-6 text-[16px]">
          <h2
            className="text-[24px] leading-[29px] font-semibold uppercase text-[#171716]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Beyond Design
          </h2>
          {/* All five lines are the file's, set with breaks rather than left to
              wrap. Figma measures this text about 5 wider than the browser over
              a line of it — enough that "and" fits here and does not there, so
              a free wrap drifts a word out of step from the third line on.
                whitespace-pre-wrap keeps the double space the file has in "when
              I was  six". */}
          <p
            className="whitespace-pre-wrap leading-[24px] text-[#292621]"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.176px" }}
          >
            {"When I'm not designing, I'm probably planning my next trip — exploring new places inspires "}
            <br className="hidden md:inline" />
            {"me to create. Music has been a constant in my life for as long as I can remember, and dancing "}
            <br className="hidden md:inline" />
            {"is where I go to fully switch off — no screens, just movement. I started dancing when I was  six, "}
            <br className="hidden md:inline" />
            {"and it's stayed part of who I am ever since — probably why I feel music so deeply, even outside "}
            <br className="hidden md:inline" />
            {"the studio."}
          </p>
        </div>
      </div>

      {/* Figma 6832:6265 and 6832:6267 — the second photo, 120 below the text.
          132x150 on a 16 radius, two layers deep: a backdrop scaled to 121.1%
          x 139.92% and pulled 20.91% left, and the cut-out over it at 173x228
          placed at -28.19 / -10. Both are the file's own, resampled to twice
          their display size — the originals are 1086 and 1117 wide for a box of
          132, which is 3.5MB to draw a thumbnail.
            The script rises 23.98 above the photo's top and starts 61.94 across
          it, and fills its 121.94 x 46.26 box rather than fitting inside: the
          export is 120.2 x 40.2 with preserveAspectRatio="none", so Figma
          stretches it too. */}
      {/* 114 at the design width, 6943:14550 measuring the body's end at 3158
          against the photo's 3272. The phone had 104 from 6943:14662 and now
          takes 124: 6953:15088 moves the photo down 24, its column ending at
          4109 against the photo's 4233. */}
      <div className="mt-[124px] flex flex-col items-center md:mt-[134px]">
        <div className="relative w-[132px]">
          <div className="relative h-[150px] w-[132px] overflow-hidden rounded-[16px] bg-[#e9e9e9]">
            <Image
              src={littleMeBg}
              alt=""
              aria-hidden
              width={320}
              height={426}
              unoptimized
              className="absolute max-w-none"
              style={{ left: "-20.91%", top: 0, width: "121.1%", height: "139.92%" }}
            />
            <Image
              src={littleMePhoto}
              alt="Osya as a child"
              width={346}
              height={456}
              unoptimized
              className="absolute max-w-none object-cover"
              style={{ left: -28.19, top: -10, width: 173, height: 228 }}
            />
          </div>
          <div
            className="absolute"
            style={{ left: 61.9424, top: -23.9766, width: 121.9387, height: 46.2594 }}
          >
            <Image src={littleMeScript} alt="little me" fill unoptimized />
          </div>
        </div>
      </div>

      {/* Figma 6832:6328 — 24 below the photo. Inter Regular 14 with positive
          tracking, unlike everything above it. */}
      {/* 6946:14937 sets it apart from the wide node on three counts: 60 per
          cent of #292621 rather than 80, 20 of leading rather than 22, and its
          own break after "changed." — the file writes the two lines out rather
          than letting 241 of measure find them. All three are held below md.
            The wording differs too, and that is not from the file: the wide
          page joins the halves with a dash where the phone keeps them as two
          sentences, so it sets one line where the phone sets two. */}
      <p
        className="mt-6 text-center text-[14px] leading-[20px] text-[rgba(41,38,33,0.6)] md:mt-4 md:leading-[22px] md:text-[rgba(41,38,33,0.8)]"
        style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.0128px" }}
      >
        {/* Two different sentences, not one text with a break in it: the wide
            page reads "changed - only", the phone "changed. Only", so each
            width carries its own rather than one being cut up to make the
            other. */}
        <span className="md:hidden">
          {"\u201cThe determination hasn\u2019t changed. "}
          <br />
          {"Only the skill set has.\u201d"}
        </span>
        <span className="hidden md:inline">
          {"\u201cThe determination hasn\u2019t changed - only the skill set has.\u201d"}
        </span>
      </p>

      {/* 6947:14960 — on a phone the social row lands here, between the quote
          and the sign-off: 192 across, three 56 circles on 12 of gap, centred.
          It has sat 96 and then 104 under the quote; 6953:15099 now measures
          114, the sign-off following it down to 4649. At the design width the
          row is still up in the header, so this only shows below md. */}
      <SocialButtons className="mt-[114px] justify-center md:hidden" />

      {/* Figma 6832:6337 and 6832:6340 — the sign-off below the quote,
          then the mark 16 under it. See SIGNOFF_GAP for the distance. Cormorant Garamond SemiBold at 60% of
          #292621, the name underlined, 6 between the two.
            Its leading is the file's 19, not "normal": normal gives Cormorant a
          20 line box here, and that one pixel walks the mark below it and the
          page's own end along with it. */}
      <div
        className="mt-8 flex items-center justify-center gap-1.5 text-[16px] leading-[19px] text-[rgba(41,38,33,0.6)] md:mt-[var(--signoff-gap)]"
        style={
          {
            "--signoff-gap": `${SIGNOFF_GAP}px`,
            fontFamily: "var(--font-cormorant)",
            fontWeight: 600,
            letterSpacing: "0.0128px",
          } as React.CSSProperties
        }
      >
        <span>Made with love by</span>
        <span className="underline decoration-solid [text-underline-position:from-font]">
          Osya Dunska
        </span>
      </div>

      <div className="mt-6 flex justify-center md:mt-4">
        <Image
          src={signoffMark}
          alt=""
          aria-hidden
          width={32.0931}
          height={54.5203}
          unoptimized
        />
      </div>
    </main>
  );
}
