import Link from "next/link";
import Image from "next/image";
import CaseNav from "./CaseNav";
import InterviewCard from "./InterviewCard";
import BoardVideoCard from "./BoardVideoCard";
import ResearchBoards from "./ResearchBoards";
import SurveyCharts from "./SurveyCharts";
import BenchmarkingBoard from "./BenchmarkingBoard";
import UserPersonas from "./UserPersonas";
import Insights from "./Insights";
import Glows from "./Glows";
import Wireframes from "./Wireframes";
import MazeTest from "./MazeTest";
import LazyAutoplayVideo from "../music-app/LazyAutoplayVideo";

// Mentora SaaS case study — Figma frame 6657:12417, 1440x21041 on #171716.
// Built one section at a time. Sections overlap in places (the menu runs down
// the left while the hero mockup already starts beside it), so rather than
// stacking section boxes, everything is placed at its own frame coordinate on
// one canvas — the same numbers the design panel shows.

// Figma 6657:13438's fill, resized to exactly 2x its 1174.43x783.89 box. The
// export she saved is a different crop — 2308x1568, an aspect of 1.4719 against
// the node's 1.4982 — so it would have had to stretch to fit.
//   Lossless WebP, not PNG: 28% of the image is transparent, so it needs an
// alpha channel, and at 2.9MB the PNG was a lot to put on a first screen. WebP
// in lossless mode carries the same pixels — checked, every channel and the
// alpha match the PNG exactly — for 1.74MB. Lossy would have been 0.76 at q100,
// but that is no longer the same image.
const heroMockup = "/mockups/mentora/hero-macbook.webp";

// 6657:13447 and 6657:13463, the two 668x370 frames under About project. Each
// is a screenshot with vector overlays on top, so what is used here is Figma's
// own flattened render of the frame at 2x — 1336x740, exactly twice the box.
// Lossless WebP again: 0.37 and 0.41MB, pixel-identical to the PNG exports.
const aboutLeft = "/mockups/mentora/about-left.webp";
const aboutRight = "/mockups/mentora/about-right.webp";

// 6657:13439 "Frame 2147237389" — 1440x343 at y 631, the ramp that takes the
// bottom of the mockup into the page. Figma's own stops, verbatim.
const heroFade =
  "linear-gradient(-0.49202249119846897deg, rgb(23, 23, 22) 11.709%, " +
  "rgba(23, 23, 22, 0.992) 21.637%, rgba(23, 23, 22, 0.968) 29.226%, " +
  "rgba(23, 23, 22, 0.93) 34.878%, rgba(23, 23, 22, 0.879) 38.995%, " +
  "rgba(23, 23, 22, 0.819) 41.98%, rgba(23, 23, 22, 0.749) 44.235%, " +
  "rgba(23, 23, 22, 0.672) 46.163%, rgba(23, 23, 22, 0.589) 48.167%, " +
  "rgba(23, 23, 22, 0.503) 50.648%, rgba(23, 23, 22, 0.415) 54.01%, " +
  "rgba(23, 23, 22, 0.326) 58.655%, rgba(23, 23, 22, 0.238) 64.985%, " +
  "rgba(23, 23, 22, 0.154) 73.403%, rgba(23, 23, 22, 0.074) 84.311%, " +
  "rgba(23, 23, 22, 0) 98.112%)";

// 6657:13539 "Frame 2147238155" — 1440x193 at y 10282, the ramp that takes the
// bottom of the tablet mockup into the page. Figma's stops, but straightened:
// the file tilts this gradient 2.2deg and that tilt is what made a hard line
// appear along the right side.
//   A CSS gradient's stops are positions along its own axis, so a tilt walks the
// boundary sideways across the box — and the wider the box, the further. The
// mockup is cut off at y 10469 and this ramp exists to bury that cut, but with
// the tilt its cover at that line fell away to the right: 0.922 at 1440, 0.821
// at 2100, 0.761 at 2560, against 1.000 down the left and centre at every
// width. The cut is not faint either — the image's bottom row runs up to 117
// against the page's 23 — so a quarter of a 94-level step was coming through.
//   Straightening it holds 1.000 everywhere at any width. Keeping the tilt and
// covering the cut instead would need the ramp about 442 tall rather than 193,
// which changes the fade far more than dropping 2.2 degrees does.
const tabletFade =
  "linear-gradient(0deg, rgb(23, 23, 22) 19.342%, rgba(23, 23, 22, 0) 88.549%)";

// 6657:12588, the tablet mockup. It grows on screens wider than the canvas, at
// 35% of the window's own growth rather than 1:1 — matched to the window fast
// enough that it does not read as pinned to an invisible 1440 line, slowly
// enough that it does not dwarf the 1440 column of content beside it. Capped at
// 1728 (a scale of 1.2).
//   The cap is not arbitrary. The mockup hangs from its bottom edge, fixed at
// 10469, so that the ramp at 10282 keeps covering where the artwork is cut off;
// growing therefore pushes its top upward, toward the wireframes grid that ends
// at 9354. What saves it is that the top 19.5% of the image is empty: at a scale
// of 1.275 the first opaque pixel finally reaches 9354, so 1.2 leaves room.
const MOCKUP_W = "clamp(1440px, calc(1440px + (100vw - 1440px) * 0.35), 1728px)";
const MOCKUP_H = `calc(${MOCKUP_W} * 1087 / 1440)`;

// --- Hero, right edge: three versions, and why this one -------------------
//
// The mockup runs off the right of the frame in the design, and on a screen
// wider than the canvas something has to give. Three ways have been tried; the
// third is what is here. Keep this list current if it changes again.
//
//   d3c908a  the original. The mockup stays on the canvas at left 286 and a
//            feathered mask hides its cut past 1481. Simple, but the artwork
//            drifts inward from the screen edge as the window grows.
//
//   tag hero-alt-heading-rides-mockup (7adae2a)
//            the mockup follows the window edge at every width, flush, no mask
//            at all — and the heading travels with it, held at 0.117869 of the
//            width in from the mockup's right edge and 0.743586 of the height
//            up from its bottom. Restore with:
//                git show hero-alt-heading-rides-mockup:src/app/work/mentora/page.tsx
//            That commit was amended off the branch, so the tag is the only
//            thing keeping it from being collected. Do not delete it.
//
//   here     the heading stays put in the 1440 column, and the mockup travels
//            only as far as the heading lets it, then the mask covers the rest.
//
// The choice between the last two is a straight trade and neither is free:
//
//                                heading                mockup at 2560
//   rides the mockup    leaves the 1440 column     flush to the screen edge
//   stays in the column  in the column, aligned     394 short of the edge
//                        with "Mentora / 2026"
//
// It is a trade because the design lays the heading over a transparent stretch
// of the artwork. Anchor the heading to the canvas and let the mockup run, and
// that stretch slides out from under it: the artwork behind the text goes from
// 0% brighter than 110 at 1440 to 41% at 1800 and 97% at 2560 — white type on
// the laptop's own white screen. So either they move together, or the mockup
// stops where the heading needs it to.

// The tablet scene's size. 1440 is Figma's, the full width of the canvas; past
// it the scene grows at 35% of the window's growth — the same rate as the hero
// and the tablet ramp — and stops at 1584, which is 1.10, the same ceiling the
// hero takes.
//   It grows DOWNWARD: its top is pinned at 18946.05 and the extra height falls
// past its bottom. Growing upward is what it cannot do — the spacing ruler is
// fixed at 18921 and is drawn over the scene, so a scene that rose would put the
// ruler across the tablet itself. At 1440 the two already overlap by 84, but
// there the frame is empty and dark.
const SCENE_W =
  "clamp(1440px, calc(1440px + (100vw - 1440px) * 0.35), 1584px)";
const SCENE_H = `calc(${SCENE_W} * 0.75)`;
// How far right of the canvas the scene may travel. While it is growing this is
// exactly half the window's growth, so the scene's right edge sits on the real
// screen's right edge; once the width caps, so does the travel, at 205.71.
const SCENE_TRAVEL = `calc((${SCENE_W} - 1440px) / 0.7)`;

// The hero mockup's size. 1174.43 is Figma's; past the canvas it grows at 35% of
// the window's growth, the same rate as the tablet mockup, and stops at 1291.87
// — 1.10, which is where its top would start to reach the header label.
const HERO_W =
  "clamp(1174.43px, calc(1174.43px + (100vw - 1440px) * 0.35), 1291.87px)";
const HERO_H = `calc(${HERO_W} * 783.89 / 1174.43)`;
// How far right of the canvas the mockup may travel before its bright artwork
// would reach the heading. 0.671 of the width is where that artwork ends at the
// heading's height, measured off the file; the constant is the heading's own x
// past the design width — 1201 — plus 20 so the two never quite touch.
const HERO_TRAVEL = `calc(${HERO_W} * 0.3289 - 279.43px)`;

// 6715:21010, 6715:22357 and 6715:22743 — the three screens under UI Design.
// This is her first export of them: square corners, and a bleed around each
// frame that the export carries even though the drop shadows on these nodes are
// switched off. So each picture is hung by its own bleed — 18.25, 19.75 and
// 44.75 a side — rather than at the node's corner.
//
// A rounded set sits beside these, unused, as *-rounded.webp. It is her second
// export, which is exactly the node with no bleed and carries the file's 10
// radius, plus the 0.8 corner smoothing cut into its alpha here — Figma writes
// no smoothing into a PNG, so the export alone does not have it. To switch,
// point the three src at the -rounded files and use the node's own geometry:
//
//   program   44/14047   664x706
//   material  732/14099  664x602
//   note      238/14827  964x770
//
// Worth knowing before spending time on that: at a radius of 10 the smoothed
// outline sits inside the plain round one by a fraction of a pixel. Measured,
// the corner runs [19, 11, 7, 5, 4, 3, 1, 1] against a circle's [20, 11, 8, 6,
// 4, 3, 1, 0]. Correct rather than visible.
// 6657:13302 — seven swatches on a 368x56 row, each sitting on the row's
// baseline: the y is 56 minus the size, and the x gaps are a constant 24. The
// label is centred in the swatch and drops to 6px on the three smallest, where
// 10 would not fit.
const SPACING_SWATCHES = [
  { n: 8, x: 0, bg: "#E88330", fs: 6 },
  { n: 16, x: 32, bg: "#4DA873", fs: 6 },
  { n: 24, x: 72, bg: "#4996D6", fs: 6 },
  { n: 32, x: 120, bg: "#E5A559", fs: 10 },
  { n: 40, x: 176, bg: "#B1C51D", fs: 10 },
  { n: 48, x: 240, bg: "#E964A4", fs: 10 },
  { n: 56, x: 312, bg: "#9B7BDC", fs: 10 },
];

// 6657:13173 and 6657:13197 — the same thirteen icons twice, 344x248 each and
// 16 apart, the second one 264 below the first. Both put the 216x128 grid at
// 64/60, which centres it in the card.
const ICON_CARDS = [
  {
    top: 17863,
    bg: "#ffffff",
    grid: "/mockups/mentora/icons/icon-grid-light.svg",
    alt: "The Mentora icon set drawn dark on a white card",
  },
  {
    top: 18127,
    bg: "#292621",
    grid: "/mockups/mentora/icons/icon-grid-dark.svg",
    alt: "The same icon set drawn white on a dark card",
  },
];

const UI_SCREENS = [
  { src: "/mockups/mentora/ui-program-page.webp", alt: "The Mentora program page", x: 25.75, y: 14028.75, w: 700.5, h: 742.5 },
  { src: "/mockups/mentora/ui-material-page.webp", alt: "The Mentora material page", x: 712.25, y: 14079.25, w: 703.5, h: 641.5 },
  { src: "/mockups/mentora/ui-note-page.webp", alt: "The Mentora note page, with a lesson video and notes side by side", x: 193.25, y: 14782.25, w: 1053.5, h: 859.5 },
];

// A section here is only a grouping: every child is placed absolutely on the
// canvas, so the section element itself has no height and sits at y 0. An id on
// it would send every menu link to the top of the page, which is what they all
// did. These markers carry the ids at the right y instead.
//   The scroll margin keeps the target clear of the pinned back button, which
// would otherwise sit on top of whatever was just scrolled to.
function Anchor({ id, top }: { id: string; top: number }) {
  return (
    <span
      id={id}
      aria-hidden
      className="absolute"
      style={{ top, left: 0, width: 1, height: 1, scrollMarginTop: 96 }}
    />
  );
}

export default function MentoraCase() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#171716] text-white">
      {/* The page is shorter than a viewport for now, so the backdrop is fixed
          rather than relying on the content to fill it. */}
      <div aria-hidden className="fixed inset-0 -z-10 bg-[#171716]" />

      <div className="relative mx-auto max-w-[1440px]">
        {/* 6657:13556, an instance of "button back case" 6643:2632 — 155x48 at
            x 44, y 24. It is pinned rather than static: this layer spans the
            whole page so the button scrolls with it until it reaches y 24 and
            then holds there. `pointer-events-none` on the layer keeps the rest
            of the page clickable through it; the button itself takes them back.
              Hover is Figma's Variant2, a straight inversion — white pill,
            #292621 label. The pill is a fixed 48 tall with 20 of side padding,
            so the label centres rather than sitting on a baseline. */}
        <div className="pointer-events-none absolute inset-0 z-30">
          <Link
            href="/"
            className="pointer-events-auto sticky flex h-12 w-fit items-center justify-center rounded-[50px] bg-[#292621] px-5 text-[15px] text-white transition-colors duration-200 hover:bg-white hover:text-[#292621] motion-reduce:transition-none"
            style={{ top: 24, marginLeft: 44, fontFamily: "var(--font-inter-tight)", fontWeight: 500 }}
          >
            Back to All Works
          </Link>
        </div>

        {/* 20165.25 is where the tablet scene's light stops once the scene
            is at its widest; the canvas grows as sections land. */}
        <div className="relative" style={{ height: 20165.25 }}>
          {/* Background light for sections 8-9 — under everything else, as in
              the file. */}
          <Glows />
          {/* --- Section 2, Hero -------------------------------------------
              Painted before the header text so the type stays on top of it. */}

          {/* 6657:13438 — 1174.43x783.89 at x 286, y 149 in the file, running
              20.43 past the 1440 frame so the artwork reads as carrying on off
              the edge of the screen.
                It follows the window rather than the canvas, the same
              treatment as the tablet mockup further down, and grows at 35% of
              the window's growth — but only up to a point, and the point is set
              by the heading beside it.
                The design lays that heading over the artwork, on a transparent
              stretch of it, and the heading does not travel: it stays in the
              1440 column, at 1201 past the design width so its right edge lines
              up with "Mentora / 2026". Measuring the file, the artwork's last
              bright pixel at the heading's height is at 0.671 of the width, so
              the transparent stretch is the remaining 0.329. The mockup may
              move right until its bright part comes within 20 of the heading
              and no further. Past that it holds still and only the growth
              continues.
                That works out to overhanging the screen edge as the design does
              all the way to 1771, and falling behind it above that — 394 short
              at 2560. Where it does fall behind, `hero-rock-feather` in
              globals.css softens the cut the artwork ends on.
                It hangs from its BOTTOM, pinned at 932.89, because that edge is
              a hard cut — the bottom row is 97% opaque and runs up to 196
              against the page's 23 — and the ramp below only covers it from
              933.8 down. Nine tenths of a pixel of margin, so it cannot move.
              Growing therefore lifts the top, and the cap is set by the header
              label at y 37.5-56.5: at 1.10 the box top is 70.6 and still clear
              of it, at 1.15 it is 31.4 and no longer is. Room to spare on
              sharpness — the file is 1803 CSS wide against the 1174 it is drawn
              at, so it has 1.54x the pixels it needs.
                This replaces a feathered mask on the right edge; that version
              is commit d3c908a, one revert away.
                Served as the PNG: the optimizer's WebP re-encode bands across
              the dark rock and softens the UI type on the screen. */}
          <Image
            src={heroMockup}
            alt="The Mentora dashboard on a MacBook resting on a rock"
            width={2349}
            height={1568}
            priority
            unoptimized
            className="hero-rock-feather absolute max-w-none"
            style={{
              right: `calc(-20.43px - min(max(0px, (100vw - 1440px) / 2), ${HERO_TRAVEL}))`,
              top: `calc(932.89px - ${HERO_H})`,
              width: HERO_W,
              height: HERO_H,
            }}
          />

          {/* 6657:13439 — the ramp that takes the bottom of the mockup into the
              page, so it is painted over the mockup rather than under it. Below
              it the fade would sit on #171716 laying #171716 over itself, which
              is nothing at all.
                Figma draws it 1440 wide because that is the whole frame, so
              here it takes the whole window rather than the canvas: pinned to
              1440 it stops short of the edge on any wider screen and ends on a
              visible vertical seam. Full-bleed out of a centred canvas is the
              50% / 100vw / -50% trio; the spill past the window is cut by the
              page's own `overflow-x-clip`, the way the Music App glows are. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 w-screen -translate-x-1/2"
            style={{ top: 631, height: 343, background: heroFade }}
          />

          {/* 6657:13537 — 195x105 at x 1127, y 350. Inter Medium 32 on a 1.1
              line, which is 35.2 a line and 105.6 for the three, so the box
              needs no trim correction here. Figma writes it as one layer with
              `lowercase` and per-span `capitalize`, which is how "from scratch"
              stays lowercase; the breaks are the layer's own.
                This stays on the canvas and never travels, so it is inside
              the 1440 column at any width. Its x lives in globals.css, because
              past the design width it shifts from Figma's 1127 to 1201 to line
              its right edge up with "Mentora / 2026" above it. The mockup is
              what yields around it — see its own note. */}
          <p
            className="hero-heading absolute text-white"
            style={{
              top: 350,
              width: 195,
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: 32,
              lineHeight: "35.2px",
            }}
          >
            Building
            <br />
            Ed Platform
            <br />
            from scratch
          </p>

          {/* --- Section 3, About Project -----------------------------------
              6657:13440, a 1352x774 frame at x 44, y 1009. Its text column is
              inset 150, so the copy starts at x 194 on the page; the two
              mockups below sit on the frame's own edges.
                None of this text needs a baseline correction: Figma reports the
              title as 36, which is 24 at 1.5, and each paragraph as 96, which is
              four 24 lines — untrimmed boxes, laid out as a browser lays them. */}
          <Anchor id="about-project" top={1009} />
          <section aria-labelledby="about-project-title">
            {/* 6657:13442 — 157x36 at x 194, y 1009. Figma writes it with
                `lowercase` and an `uppercase` span on the A, which is just
                "About project". */}
            <h2
              id="about-project-title"
              className="absolute whitespace-nowrap text-white"
              style={{
                left: 194,
                top: 1009,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.5,
              }}
            >
              About project
            </h2>

            {/* 6657:13443 — 484x224 at x 194, y 1069: two 96-tall paragraphs
                32 apart. */}
            <div
              className="absolute flex flex-col"
              style={{ left: 194, top: 1069, width: 484, gap: 32 }}
            >
              {/* 6657:13444. This one gets its own 412 rather than the 484 the
                  column gives everything else, because the node in Figma is at
                  odds with itself: the API reports width 484, but its
                  absoluteRenderBounds — and its own render — are 403.3 wide, and
                  it breaks after "for", "provides" and "collaboration". There is
                  no manual break in it and no second text style, so the box is
                  simply not the width the text was laid out at. Solving for the
                  width that reproduces those four lines gives [406.8, 418.7).
                  Left-aligned, so this only decides where it wraps.
                    Worth knowing: if that text is ever edited in Figma it will
                  reflow to the full 484 and want four different lines. */}
              <p
                className="text-[16px] text-white/50"
                style={{ width: 412, fontFamily: "var(--font-inter)", lineHeight: "24px", letterSpacing: "-0.176px" }}
              >
                Mentora is an online learning SaaS platform for students, mentors,
                and administrators. It provides intuitive tools for course
                management, collaboration, personalized paths, AI planning, and
                progress tracking.
              </p>
              <p
                className="text-[16px] text-white/50"
                style={{ fontFamily: "var(--font-inter)", lineHeight: "24px", letterSpacing: "-0.176px" }}
              >
                Design the MVP for the Student role — a focused experience that
                lets learners manage courses, access materials, communicate with
                mentors, and track progress. The core feature: an AI-powered
                planner that builds a personalized study schedule
              </p>
            </div>

            {/* 6657:13446 — the pair at y 1413, 668 wide each, 16 apart. */}
            <Image
              src={aboutLeft}
              alt="The Mentora course view"
              width={1336}
              height={740}
              unoptimized
              className="absolute max-w-none"
              style={{ left: 44, top: 1413, width: 668, height: 370 }}
            />
            <Image
              src={aboutRight}
              alt="The Mentora planner view"
              width={1336}
              height={740}
              unoptimized
              className="absolute max-w-none"
              style={{ left: 728, top: 1413, width: 668, height: 370 }}
            />
          </section>

          {/* --- Section 4, From research to feature priorities --------------
              The heading block sits at x 44, y 1933 with the same 150 inset the
              About column uses, so its copy also starts at x 194. Under it, two
              rows of 668 squares 16 apart: the row tops are 2183 and 2875.
                Figma writes both headings with `lowercase` and a `capitalize`
              span on the first letter, so the layer names read title case while
              the type renders sentence case — "From research to feature
              priorities" is what is actually drawn. */}
          <Anchor id="interviews" top={1933} />
          <section aria-labelledby="interviews-title">
            {/* 6657:12431 — 391x36 at x 194, y 1933. */}
            <h2
              id="interviews-title"
              className="absolute whitespace-nowrap text-white"
              style={{
                left: 194,
                top: 1933,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.5,
              }}
            >
              From research to feature priorities
            </h2>

            {/* 6657:12432 — 452x72 at x 194, y 1993: three 24 lines, the first
                of them ended by the layer's own break rather than by wrapping. */}
            <p
              className="absolute text-[16px] text-white/50"
              style={{
                left: 194,
                top: 1993,
                width: 452,
                fontFamily: "var(--font-inter)",
                lineHeight: "24px",
                letterSpacing: "-0.176px",
              }}
            >
              I defined the feature scope through a series of stakeholder
              <br />
              and user interviews, competitor benchmarking, and feature
              prioritization based on real user needs.
            </p>

            {/* 6657:12435 — the left card of the first row. */}
            <div className="absolute" style={{ left: 44, top: 2183, width: 668, height: 668 }}>
              <InterviewCard
                title="Stakeholders&rsquo; interview"
                body="The stakeholder interview helped clarify the platform's goals, core features, user needs, and business objectives — ensuring the product direction aligns with both user expectations and business strategy."
                href="https://www.figma.com/board/Ps7KjtOAjd9rU8m923HJ3P/Saas?node-id=1-225"
                left={32}
                top={104}
              />
            </div>

            {/* 6657:12444 — the right card of the first row, beside
                Stakeholders'. Figma has it as a still crop of the FigJam board;
                on the page it plays the recording of that board scrolling. No
                link on this one — the written card beside it carries that. */}
            <div className="absolute" style={{ left: 728, top: 2183, width: 668, height: 668 }}>
              <BoardVideoCard />
            </div>

            {/* 6657:12481 — the left card of the second row, the stepping
                board. */}
            <div className="absolute" style={{ left: 44, top: 2875, width: 668, height: 668 }}>
              <ResearchBoards />
            </div>

            {/* 6657:12482 — the right card of the second row. Figma's own href
                on this node is 1-43, but the board it should open is 1-1333,
                so that is what it points at. */}
            <div className="absolute" style={{ left: 728, top: 2875, width: 668, height: 668 }}>
              <InterviewCard
                title="Users&rsquo; interview"
                body="The user interviews explored how people actually experience online learning — their motivations, goals, and the challenges they face. I focused on what drives engagement, which content formats work best, and how these preferences shape different learning styles."
                href="https://www.figma.com/board/Ps7KjtOAjd9rU8m923HJ3P/EdTech-SaaS-Platform?node-id=1-1333"
                left={32}
                top={104}
              />
            </div>
          </section>

          {/* --- Section 5, User Survey -------------------------------------
              6657:12421, 602x187 at x 44, y 3695, with the same 150 inset, so
              the copy starts at x 194 again. Title, then a 12 gap to the count,
              then a 24 gap to the paragraph. */}
          <Anchor id="survey" top={3695} />
          <section aria-labelledby="survey-title">
            {/* 6657:12423 — 138x36. */}
            <h2
              id="survey-title"
              className="absolute whitespace-nowrap text-white"
              style={{
                left: 194,
                top: 3695,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.5,
                letterSpacing: "-0.264px",
              }}
            >
              User Survey
            </h2>

            {/* 6657:12424 — 162x19 at y 3743, on `normal` leading like the
                header's year, so its box is ascent + descent and needs no
                nudge. */}
            <p
              className="absolute whitespace-nowrap text-[16px] text-white/50"
              style={{
                left: 194,
                top: 3743,
                fontFamily: "var(--font-inter)",
                lineHeight: "normal",
                letterSpacing: "-0.176px",
              }}
            >
              63 students surveyed
            </p>

            {/* 6657:12425 — 452x96 at y 3786, four 24 lines. Its -1.1% tracking
                is -0.176 at this size, the same figure the other paragraphs
                carry in px. */}
            <p
              className="absolute text-[16px] text-white/50"
              style={{
                left: 194,
                top: 3786,
                width: 452,
                fontFamily: "var(--font-inter)",
                lineHeight: "24px",
                letterSpacing: "-0.176px",
              }}
            >
              The survey validated interview findings at scale — pinpointing
              which features matter most and how learners actually structure
              their study time. The results directly shaped MVP priorities.
            </p>

            {/* 6657:12491 — the chart scroller, part of this section rather
                than one of its own. */}
            <SurveyCharts />
          </section>

          {/* --- Section 6, Competitor Benchmarking -------------------------
              6657:12426, 650x228 at x 44, y 4642, same 150 inset. The board it
              describes is not in yet — its node has still to be identified. */}
          <Anchor id="benchmarking" top={4642} />
          <section aria-labelledby="benchmarking-title">
            {/* 6657:12427 — 295x36 at x 194, y 4642. Written out in full here,
                unlike the two headings above it: Figma leaves this one without
                the lowercase treatment, so it really is title case. */}
            <h2
              id="benchmarking-title"
              className="absolute whitespace-nowrap text-white"
              style={{
                left: 194,
                top: 4642,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.5,
                letterSpacing: "-0.264px",
              }}
            >
              Competitor Benchmarking
            </h2>

            {/* 6657:12428 — 500x168 at y 4702, seven 24 lines, none of them
                broken by hand.
                  The box is 499 rather than Figma's 500 on purpose. At 500 the
                last two lines came out 45 wrong in both directions — "gaps,"
                rode up onto line 6 — and the reason is not a manual break but
                Figma's text engine measuring about 0.15% narrower than the
                browser, which over a 500 line is enough to fit one more word.
                Solving for the width that reproduces Figma's own seven lines
                gives the window [498.7, 499.4); 499 sits in it. The text is
                left-aligned, so the one pixel changes where it wraps and
                nothing about where it sits. */}
            <p
              className="absolute text-[16px] text-white/50"
              style={{
                left: 194,
                top: 4702,
                width: 499,
                fontFamily: "var(--font-inter)",
                lineHeight: "24px",
                letterSpacing: "-0.176px",
              }}
            >
              I analyzed direct competitors ( Udemy, Khan Academy) and indirect
              ones (Skillshare, Masterclass) to see how they handle similar
              challenges. I reviewed each platform across seven parameters —
              navigation and clarity, learning formats, progress and motivation,
              atmosphere and tone of voice, mobile experience, community and
              support, and course completion — to map their strengths and gaps,
              and to find opportunities Mentora could own.
            </p>

            {/* 6657:13530 — the board itself, playing rather than still. */}
            <BenchmarkingBoard />
          </section>

          {/* --- Section 8, User personas -----------------------------------
              6657:13363, 1352x1001 at x 44, y 5912. Heading block on the same
              150 inset, then the four cards at y 6213. */}
          <Anchor id="user-personas" top={5912} />
          <section aria-labelledby="user-personas-title">
            {/* 6657:13365 — 452x36 at x 194, y 5912. Figma gives this heading a
                fixed 452 box rather than letting it hug the words, unlike the
                ones above it. */}
            <h2
              id="user-personas-title"
              className="absolute text-white"
              style={{
                left: 194,
                top: 5912,
                width: 452,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.5,
                letterSpacing: "-0.264px",
              }}
            >
              User personas
            </h2>

            {/* 6657:13366 at y 5972, five 24 lines.
                  Width 372, not the 452 the metadata reports. Figma's own export
                of this text node is 736x224 — 368x112 in CSS — and its longest
                line measures 367.5, so it wraps far short of 452. The font is
                not the difference: the same line measures 369.8 here, within
                0.6% of Figma's. Reproducing its five breaks needs a width
                between 369.8 and 376.9, and 372 sits in the middle of that. */}
            <p
              className="absolute text-[16px] text-white/50"
              style={{
                left: 194,
                top: 5972,
                width: 372,
                fontFamily: "var(--font-inter)",
                lineHeight: "24px",
                letterSpacing: "-0.176px",
              }}
            >
              The purpose of analyzing user personas was to maintain a strong
              focus on the real needs of users during the development of the MVP.
              This analysis helps to gain a deeper understanding of their goals,
              motivations, pain points, and challenges.
            </p>

            <UserPersonas />
          </section>

          {/* --- Section 9, Key insights ------------------------------------
              Four blocks stepping down and across the page rather than a row:
              64/7033, 406/7379, 748/7702 and 1090/7138 — the block sits 120
              below the personas row, which ends at 6913. The glow behind them
              is its own layer, drawn back at the top of the canvas. */}
          <Anchor id="key-insights" top={7033} />
          <section aria-label="Key insights">
            <Insights />
          </section>

          {/* --- Section 10, Wireframes -------------------------------------
              6657:12590 — a 2x2 grid at 44/8034, cells 668x652 with 16 between:
              the copy, the sketch, and the two wireframe screens. */}
          <Anchor id="wireframes" top={8034} />
          <section aria-label="Wireframes">
            <Wireframes />
          </section>

          {/* --- Section 11, tablet mockup ----------------------------------
              6657:12588 "Group 1597880856" — one image, 1440x1087 at y 9382, on
              her own 2x export.
                Its artwork is opaque right up to x 1440 (a dark forearm), which
              in the design means it runs off the edge of the screen. So it is
              hung off the window's right edge rather than the canvas's: the
              offset is half the overflow, which is exactly 0 at 1440 and pushes
              it out to the window edge above that. min() keeps it at 0 on
              anything narrower. No mask on this one — nothing is cut off, the
              edge it needs is simply the window's.
                6657:12587, a 1475x945 rectangle sitting between this and the
              ramp, is not here: it has no fills, no strokes and no effects, so
              it draws nothing at all. */}
          <Image
            src="/mockups/mentora/tablet-lesson.webp"
            alt="The Mentora lesson screen on a tablet held in two hands"
            width={2880}
            height={2174}
            unoptimized
            className="pointer-events-none absolute max-w-none select-none"
            style={{
              right: "min(0px, calc((1440px - 100vw) / 2))",
              // Hung from its bottom edge at 10469, so the ramp keeps hiding the
              // cut no matter how large it gets.
              top: `calc(10469px - ${MOCKUP_H})`,
              width: MOCKUP_W,
              height: MOCKUP_H,
            }}
          />

          {/* The ramp is painted over the mockup, and takes the whole window
              rather than the canvas — pinned to 1440 it would end on a vertical
              seam, the same as the hero's. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 w-screen -translate-x-1/2"
            style={{ top: 10282, height: 193, background: tabletFade }}
          />

          {/* --- Section 12, the pair of small cards ------------------------
              6657:13540 — two 326 squares at y 10480, 16 apart, in the right
              half of the grid: 728 and 1070.
                The first is drawn rather than exported — it is one colour and
              one vector, so it stays crisp at any zoom for almost no weight.
              The second is Figma's own 2x render. It carries Urbanist, which
              the site does not load and which would be a whole family for two
              strings on one decorative card.
                Note the two exports in this case behave oppositely: the
              wireframe cells came back with their radius as transparent corners,
              this one came back fully opaque, square corners and all. So this
              one does need the radius in CSS. */}
          <div
            className="absolute overflow-hidden bg-[#0a7055]"
            style={{ left: 728, top: 10480, width: 326, height: 326, borderRadius: 20 }}
          >
            <Image
              src="/icons/mentora/logo-mark.svg"
              alt="The Mentora logo"
              width={104}
              height={104}
              unoptimized
              className="absolute"
              style={{ left: 107, top: 111, width: 104, height: 104 }}
            />
          </div>
          <Image
            src="/mockups/mentora/progress-card.webp"
            alt="A course progress dial reading 65 percent, 18 of 30 lessons completed"
            width={652}
            height={652}
            unoptimized
            className="absolute max-w-none"
            style={{ left: 1070, top: 10480, width: 326, height: 326, borderRadius: 20 }}
          />

          {/* --- Section 13, Maze test -------------------------------------
              6657:12527 — heading and paragraph inset 150, then two 668x414
              cards at y 11228. */}
          <Anchor id="maze-test" top={10976} />
          <section aria-label="Usability testing">
            <MazeTest />
          </section>

          {/* --- Section 14, Program page ----------------------------------
              6657:12524 — the same 150 inset as the rest, at y 11812, and then
              6657:13362, the MacBook shot at 126/12064, 1188x725. The image is
              centred in the frame by its own numbers (126 either side), so it
              never meets an edge and needs nothing done to it.
                No ramp under this one, unlike the hero and the tablet: the
              file has none, and the picture does not need it. Its top row
              composites to 26.5 against the page's 23 — the crop is tight to
              the lid but lands on the ground colour, so there is no cut to
              cover. */}
          <section aria-label="Program page">
            <h2
              className="absolute whitespace-nowrap text-[24px] text-white"
              style={{
                left: 194,
                top: 11812,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: "-0.264px",
              }}
            >
              Program page, in context
            </h2>

            {/* 6657:12526 — 387.496 wide, three 24 lines, with a break after
                "now" that Figma has by hand. It has to be written out: solving
                for a box width that would produce these three lines on its own
                comes back empty — line two is 335.9 wide, but line one plus the
                word after it is only 335.0, so any box that holds the second
                would have kept "shown" on the first. The other two lines do
                wrap on their own at 387.496 and are left to. */}
            <p
              className="absolute text-[16px] text-white/50"
              style={{
                left: 194,
                top: 11872,
                width: 387.496,
                fontFamily: "var(--font-inter)",
                lineHeight: "24px",
                letterSpacing: "-0.176px",
              }}
            >
              The same flow that was tested — now{" "}
              <br />
              shown as a complete screen, with navigation, progress, and course
              info working together.
            </p>

            <Image
              src="/mockups/mentora/program-page-macbook.webp"
              alt="The Mentora program page on a MacBook"
              width={2376}
              height={1450}
              unoptimized
              className="absolute max-w-none"
              style={{ left: 126, top: 12064, width: 1188, height: 725 }}
            />
          </section>

          {/* --- Section 15, Moodboard -------------------------------------
              6657:13019 — a 1352x96 label band at y 12969, then a 4x2 grid of
              326x242 cards at y 13121, 16 apart both ways.
                The grid is one image rather than eight. Each card is several
              stacked image fills in the file, so they are flattened anyway, and
              Figma's export bakes the gaps and the cards' 16 corners in the
              page's own colour — every gap pixel is exactly rgb(23,23,22), one
              value, no variation — so the whole thing drops onto the page
              seamlessly and needs no radius of its own.
                Lossless, at 0.97MB against 0.34 for q95. These are photographs,
              where lossy usually earns its keep, but q95 still moved 12% of the
              pixels by more than two levels. */}
          <Anchor id="moodboard" top={12969} />
          <section aria-label="Moodboard">
            <div
              className="absolute flex items-center justify-center overflow-hidden bg-[#292621]"
              style={{ left: 44, top: 12969, width: 1352, height: 96, borderRadius: 24 }}
            >
              <h2
                className="whitespace-nowrap text-[24px] text-white"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: "-0.264px",
                }}
              >
                Moodboard
              </h2>
            </div>

            <Image
              src="/mockups/mentora/moodboard.webp"
              alt="Moodboard: eight reference images for the visual direction"
              width={2704}
              height={1000}
              unoptimized
              className="absolute max-w-none"
              style={{ left: 44, top: 13121, width: 1352, height: 500 }}
            />
          </section>

          {/* --- Section 16, UI Design -------------------------------------
              6657:13016 at 13771, then the three screens the file now shows in
              place of the wide hand mockup that used to sit here: "Program
              page" 664x706 at 44/14047, "Material page" 664x602 at 732/14099,
              and "Note Page" 964x770 at 238/14827.
                Each is her own 2x export, hung by the bleed the export
              carries rather than at the node's corner. See UI_SCREENS for the
              rounded set parked beside these and how to switch to it.
                The band that used to be here is gone from the file, and its
              ramp with it. Both were moved out of the frame in Figma rather
              than deleted, which is how they turned up at x 3652 and 3976. */}
          <Anchor id="ui-design" top={13771} />
          <section aria-label="UI Design">
            <h2
              className="absolute whitespace-nowrap text-[24px] text-white"
              style={{
                left: 194,
                top: 13771,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: "-0.264px",
              }}
            >
              UI Design
            </h2>

            {/* 6657:13018. Figma reports the box as 391.164 but lays the text
                out narrower, the same disagreement this file has at 6657:13444:
                its four lines are 351/360/340/373, and solving for the width
                that produces them gives [372.5, 380.3), which 391.164 is not
                in. 376 sits in the middle of it. Left-aligned, so this only
                decides where it wraps. */}
            <p
              className="absolute text-[16px] text-white/50"
              style={{
                left: 194,
                top: 13831,
                width: 376,
                fontFamily: "var(--font-inter)",
                lineHeight: "24px",
                letterSpacing: "-0.176px",
              }}
            >
              Building on the soft gray and white shades from the moodboard, the
              interface utilizes a clean and neutral palette with accent colors
              strategically placed to draw attention to key elements like CTAs
            </p>

            {UI_SCREENS.map((s) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.alt}
                width={s.w * 2}
                height={s.h * 2}
                unoptimized
                className="absolute max-w-none"
                style={{ left: s.x, top: s.y, width: s.w, height: s.h }}
              />
            ))}
          </section>

          {/* Sections 17 and 18, moved down for now rather than reworked.
              The file has restructured around them: the design system's label
              band is gone, its token block has shifted to 16931.8 and lost 8 of
              its height, and the "built once" video is now 1440 wide at x 0
              rather than a 668 card. What is here is still the old shape, put
              at the new anchors so it clears the UI Design screens above —
              15747.62 for the pair and 16931.8 for the tokens, which is also
              the order the file now has them in. Commit c882432 is where they
              stood before. */}

          {/* --- Section 17-18, Design System ------------------------------
              The file reworked this twice and landed back near where it
              started. What it has now: a plain "Design System" heading and one
              short line at 194/15747 and 194/15807 — no label band any more,
              and the block of colour swatches is gone from the file entirely —
              then 6733:16794, two 668x652 cards at 15975, the copy in the left
              and the recording in the right.
                Both cards take a plain border-radius of 20. The file also
              gives them cornerSmoothing 0.6 and that was tried here, clipped to
              the smoothed path; it is not what she wants, and it cannot be
              checked against the file anyway — Figma drops the smoothing from
              its PNG and SVG exports, and its own render of the node comes back
              with square corners, so there is nothing to compare against.
                The recording is the first one again — the fill still points at
              its hash — cropped with the numbers from that fill's
              videoTransform, 91.5% of the width at an 1.8% offset, and scaled
              to 1336x1304, twice the card. Her second recording is parked
              beside it as -v2.mp4: it is 2434x1420 against the first's
              2378x2146, so it cannot use this crop and would need its own. */}
          <Anchor id="design-system" top={15747} />
          <section aria-label="Design System">
            <h2
              className="absolute whitespace-nowrap text-[24px] text-white"
              style={{
                left: 194,
                top: 15747,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: "-0.264px",
              }}
            >
              Design System
            </h2>

            {/* 6721:27189 — 290.68 wide, two 24 lines. */}
            <p
              className="absolute text-[16px] text-white/50"
              style={{
                left: 194,
                top: 15807,
                width: 290.68,
                fontFamily: "var(--font-inter)",
                lineHeight: "24px",
                letterSpacing: "-0.176px",
              }}
            >
              A single source of truth for every screen in the product.
            </p>

            {/* 6733:16795 — the written card. */}
            <div
              className="absolute overflow-hidden bg-[#292621]"
              style={{ left: 44, top: 15975, width: 668, height: 652, borderRadius: 20 }}
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
                  Built once, scaled everywhere
                </h3>
                {/* 6733:16798. The sentence about Claude that used to close
                    this is gone from the file.
                      The box is 534, not the 604 the node reports — the same
                    disagreement this file has at 6657:13444 and 6657:13018.
                    Figma's own four lines are 494.5/496/518.5/279, and solving
                    for the width that produces them gives [521.4, 546.4), which
                    604 is not in. At 604 the text ran to 589 and the last line
                    fell to a single word. Left-aligned, so this only decides
                    where it wraps. */}
                <p
                  className="absolute text-[16px] text-white/50"
                  style={{
                    left: 0,
                    top: 60,
                    width: 534,
                    fontFamily: "var(--font-inter)",
                    lineHeight: "24px",
                    letterSpacing: "-0.176px",
                  }}
                >
                  I turned the validated flow into a token-based design system:
                  color, typography, spacing, and radius as Figma variables, no
                  hardcoding. Every component in the library pulls from those
                  tokens, so one change propagates across the whole product.
                </p>
              </div>
            </div>

            {/* 6733:16799 — the recording. Its still sits under it: the video
                holds its src until it is near the viewport, so without this the
                card would be blank white on the way down, and the still is also
                what stays if a browser refuses to autoplay. */}
            <div
              className="absolute overflow-hidden bg-white"
              style={{ left: 728, top: 15975, width: 668, height: 652, borderRadius: 20 }}
            >
              <Image
                src="/mockups/mentora/design-system-library-poster.webp"
                alt="The Mentora design system library in Figma: colour styles, typography, spacing and radius tables, and the component set"
                width={1336}
                height={1304}
                unoptimized
                className="absolute max-w-none"
                style={{ left: 0, top: 0, width: 668, height: 652 }}
              />
              <LazyAutoplayVideo
                src="/videos/mentora-design-system-library.mp4"
                className="absolute size-full"
                style={{ left: 0, top: 0, objectFit: "cover" }}
              />
            </div>
          </section>

          {/* --- Section 19, Typography ------------------------------------
              6657:13218 — one card, 1440x886 at y 16777, holding the Urbanist
              specimen: the heading and its paragraph, the Aa on its grid, the
              alphabet and numerals, and the three type-scale rows.
                Her own 2x export, and the whole card rather than the artwork
              alone. The 56 radius is baked into it as transparent corners, so
              it takes none here.
                The trade is the same one the token block made: the heading and
              paragraph live in the picture, so they are not selectable or
              searchable on the page. The file's 0.6 corner smoothing is not in
              the export either — Figma writes none into a PNG — so this corner
              is a plain 56 round. */}
          <section aria-label="Typography">
            <Image
              src="/mockups/mentora/typography-urbanist.webp"
              alt="Urbanist type specimen: the Aa on a baseline grid, the alphabet and numerals, and the heading and body scales"
              width={2880}
              height={1772}
              unoptimized
              className="absolute max-w-none"
              style={{ left: 0, top: 16777, width: 1440, height: 886 }}
            />
          </section>

          {/* --- Section 20, Icons ------------------------------------------
              6657:13164 and 6657:13172 — a copy block on the left and a column
              of two 344x248 cards on the right, the same icon set shown dark on
              white and white on #292621.
                The left frame is 612 wide at x 44 with 150 of left padding, so
              its content starts at 194, where every other heading on this page
              starts. Inside it Figma stacks a 98x36 row (the word, a 12 gap,
              and a 24 icon centred against the 36 line) and then the paragraph
              24 below it.
                The 26 icons are Figma's own SVG of each 216x128 grid rather
              than 26 traced paths, so they stay vector and each card is one
              request. Figma bakes three ancestor grounds into every such
              export — the #AFAFAF page ground, the 1440x22044 frame, and the
              card the node sits in — and all three are stripped; what is left
              is only the icons. The two 24x24 rects still in the files are
              inside <clipPath> and draw nothing.
                The cards carry Figma's 32 radius without its 0.6 corner
              smoothing, the same call as the design system cards above. */}
          <section aria-label="Icons">
            <h2
              className="absolute whitespace-nowrap text-[24px] text-white"
              style={{
                left: 194,
                top: 17863,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                lineHeight: "36px",
                // 6657:13167 is the one heading on this page Figma sets at 0
                // tracking rather than -1.1%.
                letterSpacing: 0,
              }}
            >
              Icons
            </h2>
            <Image
              src="/mockups/mentora/icons/icons-heading.svg"
              alt=""
              aria-hidden
              width={24}
              height={24}
              unoptimized
              className="absolute max-w-none"
              style={{ left: 268, top: 17869, width: 24, height: 24 }}
            />

            {/* 6657:13171 — 410.83 wide, four 24 lines. Solving for the width
                that reproduces Figma's own breaks gives [393.7, 419.8), which
                410.83 is inside, so the box is the file's and the lines are the
                browser's. */}
            <p
              className="absolute text-[16px] text-white/50"
              style={{
                left: 194,
                top: 17923,
                width: 410.83,
                fontFamily: "var(--font-inter)",
                lineHeight: "24px",
                letterSpacing: "-0.176px",
              }}
            >
              A consistent line-icon system — same stroke weight, same visual
              language — ties every screen together, from navigation to media
              controls, without competing with the content.
            </p>

            {ICON_CARDS.map((c) => (
              <div
                key={c.grid}
                className="absolute"
                style={{
                  left: 802,
                  top: c.top,
                  width: 344,
                  height: 248,
                  background: c.bg,
                  borderRadius: 32,
                }}
              >
                <Image
                  src={c.grid}
                  alt={c.alt}
                  width={216}
                  height={128}
                  unoptimized
                  className="absolute max-w-none"
                  style={{ left: 64, top: 60, width: 216, height: 128 }}
                />
              </div>
            ))}
          </section>

          {/* --- Section 22, The tablet scene -------------------------------
              6657:12419, 6657:12420 and 6657:13538 — a blurred light, the
              photographed tablet over it, and a fade that takes the bottom of
              the photograph down into the solid section below.
                It is written before the spacing block rather than after it
              because that is the file's own stacking: the light is child 35 and
              the photograph 36, while the spacing heading is 39 and the ruler
              group 41. The light's box reaches up to 18828 and the ruler group
              starts at 18812, so they do overlap and the order is visible.
                The photograph is the file's own image at 3680x2760 in a
              1440x1080 box — 2.56x, better than the 2x the rest of this page
              runs at — and 63% of it is transparent: it is a cut-out of the
              hands and the tablet, which is why the light behind it shows
              through at all.
                The light is Figma's render of the ellipse rather than a CSS
              gradient. Its export is 1226 square against a 888.4 node: the
              168.3 layer blur is carried in the bounds, 168.8 a side, so it
              hangs 168.8 up and left of the node. It came back opaque with the
              page ground baked in, and its border is exactly #171716, so it
              composites onto the page with no seam. The lift is small and warm
              — +12/+10/+6 at the peak, not neutral — so it is stored as colour
              rather than as white with an alpha, and it is smoothed and
              8x8-ordered-dithered the same way the glows further up are: 15
              levels of red spread over 600px is where contour rings come
              from. */}
          <section aria-label="The Mentora planner on a tablet">
            {/* One box the size of the scene, so the light and the fade ride
                with it: everything inside is a percentage of Figma's 1440x1080,
                which makes all three scale and move together. */}
            <div
              className="absolute"
              style={{
                right: `calc(0px - min(max(0px, (100vw - 1440px) / 2), ${SCENE_TRAVEL}))`,
                top: 18946.05,
                width: SCENE_W,
                height: SCENE_H,
              }}
            >
              <Image
                src="/mockups/mentora/scene-glow.webp"
                alt=""
                aria-hidden
                width={1226}
                height={1226}
                unoptimized
                className="absolute max-w-none"
                style={{
                  left: "6.875%",
                  top: "-10.8917%",
                  width: "85.1389%",
                  height: "113.5185%",
                }}
              />
              <Image
                src="/mockups/mentora/scene-tablet.webp"
                alt="Two hands holding a tablet showing the Mentora month calendar"
                width={3680}
                height={2760}
                unoptimized
                className="absolute max-w-none"
                style={{ left: 0, top: 0, width: "100%", height: "100%" }}
              />
              {/* 6657:13538. Figma's gradient is not vertical — its matrix
                  tilts it 3.92 degrees — and its handles sit inside the box
                  rather than on its edges.
                    The stops in between are written out because the two ends
                  differ in colour as well as in alpha, #171716 to a warmer
                  #201E1A, and Figma interpolates those straight while CSS
                  interpolates premultiplied, which would hold the colour at
                  #171716 the whole way and lose about two levels in the middle.
                    The box is 60 taller than the file's 282 and starts 60
                  higher, and the stops are the ones that keep the ramp
                  identical in page coordinates. Figma's own 282 box cuts the
                  ramp before it reaches nothing: along its top edge the veil is
                  already 0.183 opaque at the right and 0.086 at three quarters
                  across, reaching zero only by 0.527 — and with no fade above
                  that edge, it reads as a hard line across the picture.
                  Extending the box until the ramp finishes inside it removes
                  the edge without moving the fade. */}
              <div
                aria-hidden
                className="absolute"
                style={{
                  left: 0,
                  top: "70.9259%",
                  width: "100%",
                  height: "31.6667%",
                  background:
                    "linear-gradient(356.077deg, rgba(23, 23, 22, 1) 16.58%," +
                    " rgba(25, 25, 23, 0.75) 31.08%, rgba(28, 26, 24, 0.5) 45.57%," +
                    " rgba(30, 28, 25, 0.25) 60.07%, rgba(32, 30, 26, 0) 74.57%)",
                }}
              />
            </div>
          </section>

          {/* --- Section 21, Spacing Scale ----------------------------------
              6657:13298 and 6657:13495 — a centred heading block over a ruler
              that runs nearly the full width of the frame.
                The heading block is 433 wide at x 503, so it is centred on the
              1440 canvas rather than sitting on the 194 gutter the sections
              above use. Everything in it is centred too, which is why the
              heading is given its own 368 box rather than a left edge: our
              "Spacing Scale in Cell Format" measures 327.1 against Figma's 326,
              and centring absorbs the 1.1 instead of shifting the whole line.
                The ruler is Figma's SVG of 6657:13496, text outlined — 24
              numbers as paths, so they stay crisp and need no font. Its canvas
              is 1263 where the node is 1261.88: the 1 stroke bleeds half a pixel
              each side and Figma rounds the box up. It hangs at 88.13, the x its
              render bounds report, not the node's own 88.63.
                The two ends dissolve into the page. In the file that is a pair
              of frames filled with a #171716-to-transparent gradient, one
              flipped in x and the other in y; here they are just the two
              gradients, laid over the ruler. Their handles sit a little outside
              the box: reading the ramp off Figma's own render of the block and
              normalising it gives full ground at -1% and nothing left at
              105.8%, so the stops are written out rather than left at 0 and
              100, which ended the fade about 5 levels early. They are not full-bleed — the
              ruler stops well short of the frame edge and the fades are sized
              to reach it — and they are not the same width: 257 on the left
              against 174 on the right.
                The numbers themselves sit at 80% white, not full white; only
              the 104 that the red tick marks is opaque, and the baseline and
              tick marks stay at 60%. All three are in the SVG, so none of it is
              set here. */}
          <section aria-label="Spacing Scale">
            {/* 6657:13300 — a 368 box at 535.5, the text centred in it. */}
            <div
              className="absolute text-center text-[24px] text-white"
              style={{
                left: 535.5,
                top: 18571,
                width: 368,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                lineHeight: "36px",
                letterSpacing: 0,
              }}
            >
              <h2>Spacing Scale in Cell Format</h2>
            </div>

            {SPACING_SWATCHES.map((sw) => (
              <div
                key={sw.n}
                className="absolute flex items-center justify-center text-white"
                style={{
                  left: 535.5 + sw.x,
                  // The row's own top is 18659; each swatch sits on its floor.
                  top: 18659 + (56 - sw.n),
                  width: sw.n,
                  height: sw.n,
                  background: sw.bg,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  fontSize: sw.fs,
                  lineHeight: 1,
                }}
              >
                {sw.n}
              </div>
            ))}

            {/* 6657:13317 — 433 wide, three centred 24 lines. The width that
                reproduces Figma's own breaks is [419, 441), and 433 is inside
                it, so the box is the file's and the lines are the browser's. */}
            <p
              className="absolute text-center text-[16px] text-white/50"
              style={{
                left: 503,
                top: 18771,
                width: 433,
                fontFamily: "var(--font-inter)",
                lineHeight: "24px",
                letterSpacing: "-0.176px",
              }}
            >
              A modular spacing scale — from 8px to 56px — keeps rhythm
              consistent across cards, lists, and page sections, so density
              feels intentional rather than accidental.
            </p>

            <Image
              src="/mockups/mentora/spacing-ruler.svg"
              alt="A spacing ruler from 8 to 192 in steps of 8, with 104 marked in red"
              width={1263}
              height={31}
              unoptimized
              className="absolute max-w-none"
              style={{ left: 88.13, top: 18921.45, width: 1263, height: 31 }}
            />

            {/* 6657:13529 and 6657:13528 — over the ruler, so after it. */}
            <div
              aria-hidden
              className="absolute"
              style={{
                left: 35,
                top: 18812.55,
                width: 257,
                height: 218,
                background:
                  "linear-gradient(to right, #171716 -1%, rgba(23, 23, 22, 0) 105.8%)",
              }}
            />
            <div
              aria-hidden
              className="absolute"
              style={{
                left: 1233,
                top: 18812.55,
                width: 174,
                height: 218,
                background:
                  "linear-gradient(to left, #171716 -1%, rgba(23, 23, 22, 0) 105.8%)",
              }}
            />
          </section>


          {/* --- Section 1, Header / Nav ------------------------------------ */}

          {/* 6657:13479 — 118x19 at x 1278, y 37.5. Its line height is `normal`,
              which for Inter at 16 is 19.4: ascent + descent, so Figma's box top
              and the browser's line box agree here and the y needs no nudge. */}
          <p
            className="absolute whitespace-nowrap text-[16px] text-[#888]"
            style={{ left: 1278, top: 37.5, fontFamily: "var(--font-inter)", lineHeight: "normal" }}
          >
            Mentora / 2026
          </p>

          {/* 6657:13437 — the menu, at x 44, y 149, and no baseline correction.
                Figma reports this box as 364, which is exactly its 14 lines at
              26 — an untrimmed stack of line boxes, laid out the way a browser
              lays them out, so the first baseline already lands in the same
              place and the top maps straight across. It briefly carried a
              -3.32 nudge borrowed from the Music App side menu; that one is
              trimmed to cap height (Figma calls it 258 where the browser makes
              264) and needs the correction, this one does not. The heading and
              the year say the same: 105 against 105.6, 19 against 19.5. */}
          <div className="absolute" style={{ left: 44, top: 149 }}>
            <CaseNav />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The previous section 18, kept rather than deleted while the new one is on
// trial. It is here as line comments and not as a JSX comment on purpose: the
// block contains */ of its own, which would close a /* ... */ wrapper early
// and break the build.
//
// It was a 668 written card beside a 668 video card, both at y 15772. The file
// has since split them: the copy stands alone at 15747 and the video is a
// 1440-wide card at 16047 that fits the recording instead of cropping it.
//
// {/* --- Section 18, Built once ------------------------------------
// 6657:13531 — a written card at 44/15772 and a picture card beside
// it at 728, both 668x652 at radius 20.
// The right one is a video in the file — the library being walked
// through in Figma. It could not be pulled out of Figma (the MCP
// hands over images and SVGs, and export_video renders animated
// timelines, not a video fill), so it is her own recording, cropped
// and scaled to the card: 2378x2146 down to 1336x1304, which is
// exactly twice the card, using the crop Figma itself applies —
// 91.5% of the width at an 1.8% offset, from the fill's
// videoTransform. 135MB to 9.5.
// Figma's 2x still of the same card sits under it. The video
// carries no src until it is near the viewport, so without this the
// card would be blank white on the way down; once the video loads it
// covers the still. The still is also what stays if a browser
// refuses to autoplay.
// Corners come back opaque on the still, so this card takes its
// radius in CSS. */}
// <section aria-label="Design system in use">
// <div
// className="absolute overflow-hidden bg-[#292621]"
// style={{ left: 44, top: 15747.62, width: 668, height: 652, borderRadius: 20 }}
// >
// <div className="absolute" style={{ left: 32, top: 104, width: 604 }}>
// <h3
// className="whitespace-nowrap text-[24px] text-white"
// style={{
// fontFamily: "var(--font-inter)",
// fontWeight: 500,
// lineHeight: 1.5,
// letterSpacing: "-0.264px",
// }}
// >
// Built once, scaled everywhere
// </h3>
// {/* 6657:13535 — 554.346 wide, five 24 lines, with a break after
// "no hardcoding." that Figma makes by hand. */}
// <p
// className="absolute text-[16px] text-white/50"
// style={{
// left: 0,
// top: 60,
// width: 554.346,
// fontFamily: "var(--font-inter)",
// lineHeight: "24px",
// letterSpacing: "-0.176px",
// }}
// >
// I turned the validated flow into a token-based design system:
// color, typography, spacing, and radius as Figma variables, no
// hardcoding.{" "}
// <br />
// Every component in the library pulls from those tokens, so one
// change propagates across the whole product. I built the design
// system with the AI assistant Claude.
// </p>
// </div>
// </div>
//
// <div
// className="absolute overflow-hidden bg-white"
// style={{ left: 728, top: 15747.62, width: 668, height: 652, borderRadius: 20 }}
// >
// <Image
// src="/mockups/mentora/design-system-library-poster.webp"
// alt="The Mentora design system library in Figma: colour styles, typography, spacing and radius tables, and the component set"
// width={1336}
// height={1304}
// unoptimized
// className="absolute max-w-none"
// style={{ left: 0, top: 0, width: 668, height: 652 }}
// />
// <LazyAutoplayVideo
// src="/videos/mentora-design-system-library.mp4"
// className="absolute size-full"
// style={{ left: 0, top: 0, objectFit: "cover" }}
// />
// </div>
// </section>
