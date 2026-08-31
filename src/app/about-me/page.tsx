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
 * It has been moved twice: 89.48, then 104, now 140. Kept as a constant so
 * putting it back is one number and nothing else — the page's own end follows
 * from it, since the bottom padding below is measured to the frame's height.
 */
const SIGNOFF_GAP = 140;

const TAGS = [
  "# Design Systems",
  "# UX Research",
  "# Prototyping",
  "# AI-first Workflow",
  "# Usability Testing",
];

// Figma 6832:6250. Stripped back to the top bar on purpose — everything below
// it is being rebuilt from the file block by block rather than corrected in
// place, because what was here had drifted far enough that fixing it one
// measurement at a time cost more than starting again.
//
// The bar is 6832:6410: the back button at the left, the three contact buttons
// at the right, 48 tall, sitting 44.5 in from the frame's edge and 32 down.
// This part is signed off; nothing below it is.
// Figma 6832:6277. Each entry is a period, a role and a body, 16 apart inside
// and 32 between entries. The body lines are the file's own hard breaks — Figma
// exports one paragraph per break, and these come back split where the text
// still had room, so the breaks are the designer's.
const EXPERIENCE: { period: string; role: string; body: string[][] }[] = [
  {
    period: "2026",
    role: "Product Designer — Learning Platform (SaaS)",
    body: [
      [
        "Designed the MVP for an AI-powered online learning platform — from stakeholder and user interviews and competitor benchmarking to user personas, wireframes, usability testing in Maze, and a token-based design system. Validated priorities with a 63-student survey. Core feature:",
        "an AI planner that builds a personalized study schedule",
      ],
    ],
  },
  {
    period: "Jan 2026 — Aug 2026",
    role: "UI/UX Designer at an Eyewear E-commerce Brand (NDA)",
    body: [
      [
        "Built a prescription lens configurator guiding customers step-by-step through lens selection. Designed the landing page driving paid traffic straight into the configurator. Built admin panels",
        "and client dashboards for order management and tracking.",
      ],
    ],
  },
  {
    period: "Jan 2025 — Sep 2025",
    role: "UI/UX Designer at a Medical Cannabis Marketplace (NDA, Agency)",
    body: [
      [
        "Led a full redesign of the homepage, marketplace, and checkout flow. Simplified the onboarding quiz for new patients, cutting completion time from 12 minutes to 6. Redesigned the shopping cart with a progress bar tracking the 100g legal limit, showing which pharmacy would fulfill each order",
        "in this multi-pharmacy marketplace, with quick links to switch pharmacies or add more products before checkout. Added a post-purchase feedback flow, rewarding reviews with a discount on the next order. Designed the patient personal account, including video-consultation scheduling and reorder flow.",
      ],
    ],
  },
  {
    period: "2025",
    role: "E-commerce Designer — Online Gallery & Diamond Retail Site",
    body: [
      [
        "Designed the e-commerce experience for an online art gallery selling a private collection of",
        "Damien Hirst spin paintings. Built the catalog structure with category-based filtering by painting type, individual product pages for each artwork, and a \u201cHow to Buy\u201d flow addressing trust concerns typical for high-value art purchases.",
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
    <main className="mx-auto w-full max-w-[1440px] px-6 pt-8 pb-[12.46px] md:px-11">
      <div className="mb-[88px] flex items-center justify-between">
        <Link
          href="/"
          className="flex h-12 w-12 items-center justify-center rounded-[28px] bg-transparent transition-colors hover:bg-[#f5f5f5]"
          aria-label="Back to all works"
        >
          <Image src={backArrowIcon} alt="" width={24} height={24} unoptimized />
        </Link>
        <SocialButtons />
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
          <div
            className="absolute"
            style={{ left: 108, top: 138, width: 112.2476, height: 48 }}
          >
            <Image src={osyaScript} alt="Osya" fill unoptimized />
          </div>
        </div>

        {/* Figma 6832:6264 — Inter Semi Bold 40/44, -1.2 of tracking, centred,
            32 below the photo. Three lines, broken where the file breaks them.
            The first carries the node's own 40% grey; the other two override it
            to #292621, and only "first" leans, with the space inside the
            leaning run rather than around it.
              "first" is set in Inter's italic, the face the file names. Figma
            itself only slants the upright there, having no italic Inter
            installed — its render sets this line's ink 31 tall where the drawn
            italic sets it 38, an f with a descender being the difference. The
            drawn letter is the one kept, by the owner's decision.
              Below 768 the size drops to 28 and the leading with it, in the
            file's own 1.1 ratio; three lines of this at 40 do not fit a
            phone. */}
        <h1
          className="mt-8 text-[28px] font-semibold leading-[32px] md:text-[40px] md:leading-[44px]"
          style={{ letterSpacing: "-1.2px", fontFamily: "var(--font-inter)" }}
        >
          <span className="block text-[rgba(41,38,33,0.4)]">I own the full design process</span>
          <span className="block text-[#292621]">
            {"from the "}
            <span className="italic">{"first "}</span>
            {"sketch to "}
          </span>
          <span className="block text-[#292621]">a dev-ready screen</span>
        </h1>

        {/* Figma 6832:6253 — five pills in a row 702 wide, 32 below the
            heading, 8 apart. Each is 33 tall: 8 of padding over a 17 line over
            8 again, on 12 of side padding, so the widths fall out at 143, 122,
            114, 148 and 143.
              The hash is part of the label rather than added in the markup,
            so a tag can carry its own spacing if it ever needs to. The file has
            the last one set without a space; here all five are spaced alike, by
            the owner's decision. */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f5f5f5] px-3 py-2 text-[14px] leading-[17px] text-[#111]"
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
      <div className="mx-auto mt-12 flex w-full max-w-[740px] flex-col">
        <div
          className="flex flex-col gap-6 text-[16px] leading-[24px] text-[#292621]"
          style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.176px" }}
        >
          <p>
            {"Hi, I'm Osya — a UI/UX & Product Designer with 2,5 years of hands-on experience across"}
            <br />
            {"e-commerce, SaaS, and healthtech products."}
          </p>
          <p>
            {"I work primarily in Figma (component libraries, "}
            <span className="font-semibold italic text-[#171716]">design tokens</span>
            {", Auto Layout, Variants), and I apply"}
            <br />
            {"an "}
            <span className="font-semibold italic text-[#171716]">
              {"AI-first approach — Claude, Figma Make, Midjourney "}
            </span>
            {"— to move faster through research and prototyping without losing quality. I even built this very site myself, together with Claude — from structure to final details."}
          </p>
          <p>
            {"I'm always open to learning and creating, and I love that about myself. Design is not just my"}
            <br />
            {"work — it's also my hobby and something I genuinely enjoy. I'm lucky to do what I love every day."}
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-6">
          <h2
            className="text-[16px] font-semibold uppercase leading-[19px] text-[#171716]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            How I Work
          </h2>
          <p
            className="text-[16px] leading-[24px] text-[#292621]"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.176px" }}
          >
            {"I start every project by understanding the problem before touching a single pixel. I talk to stakeholders when possible, research users, and do my best to understand the needs of both business owners and users — to find the most beneficial solution for both sides. I also benchmark competitors, to make sure I'm solving the right problem, not just the obvious one."}
          </p>
        </div>

        {/* Figma 6832:6277 — 64 below the block above it, which is the gap the
            file puts between them. The period sits on 26 of leading against the
            body's 24, and reads at 60% of #292621; the role is Semi Bold on
            #171716 at the 19 the file measures rather than a named leading.
              All four periods are Inter at 60%; an earlier revision had one of
            them in Inter Tight and the set at 80%, and both are gone. */}
        <div className="mt-16 flex flex-col gap-6">
          <h2
            className="text-[16px] font-semibold uppercase leading-[19px] text-[#171716]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Experience
          </h2>

          <div className="flex flex-col gap-8 text-[16px]">
            {EXPERIENCE.map(({ period, role, body }) => (
              <div key={role} className="flex flex-col gap-4">
                <p
                  className="leading-[26px] text-[rgba(41,38,33,0.6)]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {period}
                </p>
                <div className="flex flex-col gap-2">
                  <p
                    className="font-semibold leading-[19px] text-[#171716]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {role}
                  </p>
                  <div
                    className="flex flex-col gap-6 leading-[24px] text-[#292621]"
                    style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.176px" }}
                  >
                    {body.map((lines) => (
                      <p key={lines[0].slice(0, 32)}>
                        {lines.map((line, i) => (
                          <span key={i}>
                            {i > 0 && <br />}
                            {line}
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
            className="text-[16px] font-semibold uppercase leading-[19px] text-[#171716]"
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
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Figma 6832:6325 */}
        <div className="mt-16 flex flex-col gap-6">
          <h2
            className="text-[16px] font-semibold uppercase leading-[19px] text-[#171716]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Languages:
          </h2>
          <p
            className="text-[16px] leading-[24px] text-[#292621]"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.176px" }}
          >
            {"Ukrainian & Russian (native), English (working proficiency)"}
          </p>
        </div>

        {/* Figma 6832:6334 — its label is 16, not the 18 the sections above
            use — every section heading is 16 now — and it sits on the
            file's own 19 rather than the 24 the others take.
              84 above it, where the file reads 64. The four headings above
            are set on 19 of leading by the owner's decision while the file
            still has them on 24, which takes 5 off each and 20 off the column;
            the 20 goes back here so this block, and everything below it, lands
            on the file's own coordinates. If those headings ever go to 19 in
            the file too, this returns to 64. */}
        <div className="mt-[84px] flex flex-col gap-6 text-[16px]">
          <h2
            className="font-semibold uppercase leading-[19px] text-[#171716]"
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
            {"When I'm not designing, I'm probably planning my next trip — exploring new places inspires"}
            <br />
            {"me to create. Music has been a constant in my life for as long as I can remember, and dancing"}
            <br />
            {"is where I go to fully switch off — no screens, just movement. I started dancing when I was  six,"}
            <br />
            {"and it's stayed part of who I am ever since — probably why I feel music so deeply, even outside"}
            <br />
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
      <div className="mt-[120px] flex flex-col items-center">
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
      <p
        className="mt-6 text-center text-[14px] leading-[normal] text-[#292621]"
        style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.0128px" }}
      >
        {"\u201cThe determination hasn\u2019t changed. Only the skill set has.\u201d"}
      </p>

      {/* Figma 6832:6337 and 6832:6340 — the sign-off below the quote,
          then the mark 16 under it. See SIGNOFF_GAP for the distance. Cormorant Garamond SemiBold at 60% of
          #292621, the name underlined, 6 between the two.
            Its leading is the file's 19, not "normal": normal gives Cormorant a
          20 line box here, and that one pixel walks the mark below it and the
          page's own end along with it. */}
      <div
        className="flex items-center justify-center gap-1.5 text-[16px] leading-[19px] text-[rgba(41,38,33,0.6)]"
        style={{
          marginTop: SIGNOFF_GAP,
          fontFamily: "var(--font-cormorant)",
          fontWeight: 600,
          letterSpacing: "0.0128px",
        }}
      >
        <span>Made with love by</span>
        <span className="underline decoration-solid [text-underline-position:from-font]">
          Osya Dunska
        </span>
      </div>

      <div className="mt-4 flex justify-center">
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
