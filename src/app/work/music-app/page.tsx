import { Fragment } from "react";

import Image from "next/image";
import Link from "next/link";

import CardsBlock from "./CardsBlock";
import EfficiencyBlock from "./EfficiencyBlock";
import { MULISH_SPECIMEN, SF_PRO_SPECIMEN, SpecimenBlock } from "./TypographyColors";
import ScrollToTop from "@/components/ScrollToTop";

import { MUSIC_APP_SKIN } from "@/components/scrollToTopSkins";

// Figma 6659:11844 — the Music App case, laid out again from the current file.
// Its colours, type and spacing all moved in the last revision, so nothing is
// carried over from the previous version of this page: every value below is
// read off the frame, and the assets are its own exports.
//
// Two rules the whole case is held to:
//   Content sits in a 1440 column. Glows and gradients scale with the window
// instead — pinned to 1440 they leave the page bare past that width and their
// own edges start reading as a rectangle drawn over the artwork.
//   No seams. Checked at more than one width, not just 1440.

const heroMockup = "/mockups/music-app-v2/hero.webp";

// Figma 6659:11859 "Vector 32", exactly as the file exports it.
//
// It was widened once, on the reasoning that its filter region clips its own
// blur: sigma is 92.81, a Gaussian needs about 3 sigma to fade out, and Figma
// leaves 144 to 177 of margin around the shape. That is true, and it is also
// what the design looks like — Figma clips the same blur when it draws the
// frame. Opening the region out let the light spread further than the file
// does, which read as a bigger, softer glow reaching below the mockup.
//   So the clip stays. The reference is the file's own render, not a
// theoretically complete Gaussian.
// Every glow on this page is one exported shape under a Gaussian, and they all
// go down by one rule, read out of the file over the REST API rather than
// reasoned about:
//
//     the canvas corner sits at absoluteRenderBounds, pushed back on
//     whichever side Figma cut
//
// absoluteRenderBounds is the ink as the frame shows it — already cut where the
// shape runs past an edge — while the exported canvas holds it whole. Comparing
// the two says both where the ink starts and which side was cut: the hero loses
// 130.08 off its top, the left personas glow 183.85 off its left, and the other
// two are cut at 1440, which costs them nothing on the corner they are hung
// from. Frame-relative, so less the frame's own 22.544 and 1411.449.
//   The export already carries the rotation, so nothing is turned here, and its
// canvas already holds the whole filter region, so nothing is widened.
//   This replaces three earlier attempts. The exports the Dev Mode MCP hands
// over hold the shape UNROTATED, and placing those as if they were turned is
// what put one glow 358 off the top and left the left-hand one 192 too far in,
// washing out the middle of the personas block. It also explains the numbers
// that never resolved: the x and y in the MCP's metadata are the translation of
// the turned frame, not a corner of the bounding box.
const heroGlow = "/glows/music-app-v2/hero-glow.webp";
const sectionGlow = "/glows/music-app-v2/problem-solution-glow.svg";

// Figma 6659:11883 — ten 64 buttons, two rows of five, 16 apart both ways, in
// a checkerboard: #f5f5f5 opaque, then #000817 at a tenth. Every one carries
// Figma's GLASS, which has no CSS form and does not survive an SVG export, so
// these are the file's own 2x renders — the same call the header buttons made.
const ICON_SET = [
  ["mic-stand", "search", "mic", "radio", "love-song"],
  ["shuffle", "volume", "notes", "waveform", "disc"],
];

// Figma 6861:23685 — three 288 circles, 8 apart. Each holds a solid #2A60E0
// disc under a blur, clipped by the circle, and the disc's size and height are
// what read as the percentage: 62% fills its circle, 17% barely clears the
// floor. The file ships these as three SVGs, but a blurred disc is exactly what
// CSS blur() does, and the radius there is the same sigma Figma exports — so
// they are three divs instead of three more assets.
// The personas block has two glows, the same shape turned two different ways.
// These are Osya's own exports and they carry the turn already applied, which
// is what makes them usable: the MCP hands over the shape unturned, and turning
// that in CSS has to be done about the centre — about a corner it throws the
// thing 358 off the top, which is how the first attempt at this looked.
//   Blur 230, so sigma 115. Each file's filter region runs past its canvas —
// the left one starts at -183 where the canvas starts at 0 — so Figma has
// already cut the tail on that side. Widening them back out is what washed the
// middle of the block: the two shapes sit 205.76 apart and the tails then met.
// So they go in exactly as exported.
//   Each canvas is opened out to its own filter region and no further — the
// left file declares one running from -183.083 where its canvas starts at 0,
// and cropping there left a two-level step at x 96, in plain view. Taking the
// canvas back to the region paints exactly the light Figma paints and adds
// nothing to the middle.
//   Anchored off the panel rather than the file's x and y, which are not
// reliable for turned nodes. The path sits 230 inside its own canvas, so the
// canvas corner is the shape's bounding box less 230 — and for the left one it
// is the right edge that pins it, 590.15, since that side is uncut.
const PERSONA_GLOWS = [
  { src: "/glows/music-app-v2/personas-left.svg", left: -183.85, top: -178.25, w: 908, h: 970 },
  { src: "/glows/music-app-v2/personas-right.svg", left: 572.62, top: -64.96, w: 990, h: 833 },
];

// Figma 6874:26356 and 6874:26348. Four lines each, 20 apart, a hairline of
// #202124 between them.
const GOALS = [
  "Wants to hit play before the train doors close",
  "Needs recommendations that actually match his mood",
  "Wants one place for playlists, podcasts, and radio",
  "Wants to switch moods fast — focus music to chill, without digging",
];
const FEARS = [
  "Losing focus digging through cluttered menus",
  "Getting the same generic suggestions every time",
  "Missing the moment while waiting for the app to load",
  "Second-guessing whether to trust the app's picks or search manually",
];

// Figma trims these lines to cap and baseline; the browser lays out whole line
// boxes. Measured on Inter Tight at 16 on 22: the cap sits 5.36 under the top of
// the box and the baseline 5 over the bottom. As margins they take the boxes
// back to the size the file gives them, and the 20 gaps then land where the
// file puts them — without this the card runs 41 too tall and every rule inside
// it drifts down.
const CAP_TRIM = { marginTop: -5.36, marginBottom: -5 } as const;

const STATS = [
  { label: "Recommendations", value: "21%", disc: 138, blur: 30, cx: 143.49, cy: 242.73 },
  { label: "Navigation", value: "17%", disc: 124.506, blur: 25, cx: 143.5, cy: 269.543 },
  { label: "Extra steps", value: "62%", disc: 230.36, blur: 40, cx: 143.34, cy: 166.97 },
];

// The menu is the case's own table of contents: each line is an anchor down to
// the section it names. The ids are set here, in the order the page runs, and
// each section claims its own as it is built — until then the link is inert,
// which is what an anchor with no target does, rather than an error.
const MENU = [
  { label: "About Project", id: "about-project" },
  { label: "Problem & Solution", id: "problem-solution" },
  { label: "User Personas", id: "user-personas" },
  { label: "Information Architecture", id: "information-architecture" },
  { label: "Icons", id: "icons" },
  { label: "UI Card Elements", id: "ui-card-elements" },
  { label: "Typography & Colors", id: "typography-colors" },
  { label: "Efficiency & Consistency", id: "efficiency-consistency" },
  { label: "Summary", id: "summary" },
];

// Figma's Glass material has no CSS form and does not survive the export: all
// the file hands over is an rgba(0,8,23,0.1) fill, with none of the refraction,
// depth or rim light that makes it read as glass. So these come in as the
// file's own 2x renders instead.
//
// A baked render of glass is normally the wrong trade — it carries a frozen
// copy of whatever was behind it, and the moment the background moves it shows
// as a patch. It is safe here because nothing moves behind this row: measured
// on the page, the ground under it is rgb(0,2,8) at 1440 and the same at 2560,
// the glow having faded to nothing well before it. The colour baked into the
// PNGs is rgb(0,3,10) — a level or two lighter, which no eye resolves.
//   Anywhere the glow does reach, this trade stops holding and the glass has to
// go back to backdrop-filter.
const GLASS_BUTTONS = {
  back: { src: "/icons/music-app-v2/btn-back.png", w: 155, h: 48 },
  mobile: { src: "/icons/music-app-v2/btn-mobile.png", w: 115, h: 48 },
  uiux: { src: "/icons/music-app-v2/btn-uiux.png", w: 128, h: 48 },
};

/** Figma 6659:11863 — four 56 circles, 8 apart. */
// Figma 6659:11863 — the row runs microphone, volume, frequency, karaoke. Both
// end frames are called "Karaoke Icon" in the file, so the names do not settle
// which way round they go; the order here is the one Osya confirmed.
const ICONS = [
  { name: "Microphone", src: "/icons/music-app-v2/btn-mic.png" },
  { name: "Volume", src: "/icons/music-app-v2/btn-volume.png" },
  { name: "Frequency", src: "/icons/music-app-v2/btn-frequency.png" },
  { name: "Karaoke", src: "/icons/music-app-v2/btn-karaoke.png" },
];

export default function MusicAppCase() {
  return (
    <div className="relative min-h-screen overflow-clip bg-[#000208] text-white">
      {/* Figma 6900:15665 "button back case" — 155 x 48 at x 80, y 36, corner
          50. Pinned the way Mentora's is, and for the same reason it has to sit
          here rather than in the hero: the layer has to span the whole page, or
          the button comes unstuck the moment the hero scrolls past. It rides
          the content down, then holds at 36 for the rest of the case.
            pointer-events-none on the layer keeps the page clickable through
          it; the button takes them back for itself.
            The pill is drawn, not exported — an image cannot cross-fade to its
          hover. The file no longer asks for glass here: it is a solid #01091c,
          and the hover is Variant2, a straight inversion to white with a
          #000208 label. */}
      <div className="pointer-events-none absolute inset-0 z-30">
        {/* h-full is load-bearing: a sticky element can only travel inside its
            own containing block, so this column has to be as tall as the page
            or the button comes unstuck the moment it is scrolled past. */}
        <div className="mx-auto h-full w-[1440px]">
          <Link
            href="/"
            className="pointer-events-auto sticky flex h-12 w-fit items-center justify-center rounded-[50px] bg-[#01091c] px-5 text-[15px] text-white transition-colors duration-200 hover:bg-white hover:text-[#000208] motion-reduce:transition-none"
            style={{ top: 36, marginTop: 36, marginLeft: 80, fontFamily: "var(--font-inter-tight)", fontWeight: 500 }}
          >
            Back to All Works
          </Link>
        </div>
      </div>
      {/* The canvas: 1440 of content, centred, with everything positioned
          against it. The glow below is the one thing that escapes it. */}
      <div id="about-project" className="relative mx-auto w-[1440px]" style={{ height: 700 }}>
        {/* Figma 6659:11859. Fixed inside the column, not scaled with the
            window: this glow sits inside the 1440 and belongs to the mockup it
            lights, so stretching it would move the light off the phone.
              The node is 490.91 x 600.26 turned 20.36 degrees at x 200.5,
            y -54.22, filled with a linear gradient — #01163F and #000105 both
            at 1%, then #01163F at 60% at the far end — under a 185.62 layer
            blur. Blend mode Normal, layer at 100%. The rotation is baked into
            the exported path.
              The source is Figma's own PNG render of the node, not the SVG
            export, and it is drawn at its own size, 993 x 886, unstretched.
            The SVG export bakes the 92.81 sigma into a filter region clipped
            to the canvas, so the blur never reaches zero: it leaves a flat
            wash about one level below the page across the whole box and cuts
            it off on a line at the edge. Measured against the file's own
            render, the page read (0, 1.09, 7.09) at y 750 where the file
            reads a clean (0, 2, 8), and stepped back to background at the
            canvas edge — the seam that showed under the ramp, which paints a
            true #000208 and so read lighter than the darkened ground around
            it. The PNG's alpha falls to exactly 0 on all four sides and
            composites to (0, 2, 8), so there is no edge to see.
              It is dithered, and that is deliberate. A glow this faint spends
            its whole range inside a handful of levels above a near-black page,
            so 8 bits quantise it into rings — colouring each level of the blue
            channel separately draws them plainly. The file's own render is
            speckled rather than ringed, because Figma dithers its output; the
            browser compositing a transparent PNG does not. So the 2x export is
            averaged down to 993 x 886 in floating point, where 57 per cent of
            pixels land between levels, and half a level of noise is added
            before rounding. The mean is unmoved (-0.004 of a level over the
            whole field), no pixel shifts by more than 3, and the rings break
            into grain. Noise costs entropy: 432KB became 629KB.
              Figma's own markup wraps it in a box inset -37.81% and
            -30.92% of the bounding box, which works out to 1175 x 1187 — but
            stretching the file inflates the blur with it, 92.81 of sigma
            becoming 126, and the light comes out a third too wide and burning
            on under the mockup. At 1:1 the sigma stays the 92.81 the file
            asks for, which is half of the 185.62 it states, Figma giving the
            diameter where the filter wants the deviation.
              The position is measured, not derived: the file's own render of
            this area was sampled down three verticals — x 274 and x 430 in the
            open, x 720 under the phone — and the corner solved for until the
            page matched. Fifteen samples of the blue channel, five levels of
            error in total. On those lines the file peaks at 13 against a
            ground of 8, is back to 8 by y 620 in the open and by 692 under the
            phone, and the ramp at 650.55 takes it from there.
              Fixed pixels, not a share of the window: this glow lights the
            mockup, and scaling it with the viewport would slide the light off
            the phone. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: 28.23, top: -130.08, width: 993, height: 886 }}
        >
          <Image src={heroGlow} alt="" fill unoptimized className="max-w-none" />
        </div>

        {/* Figma 6659:11863 — 249 x 56 at x 595.5, y 32. */}
        <div className="absolute flex items-center gap-2" style={{ left: 595.5, top: 32 }}>
          {ICONS.map(({ name, src }) => (
            <Image
              key={name}
              src={src}
              alt=""
              aria-hidden
              width={112}
              height={112}
              unoptimized
              className="size-14"
            />
          ))}
        </div>

        {/* Figma 6659:11872 — Inter Regular 16 at 80% white. */}
        <p
          className="absolute whitespace-nowrap text-[16px] text-white/80"
          style={{ left: 1226, top: 50.5, fontFamily: "var(--font-inter)" }}
        >
          Music App / 2025
        </p>

        {/* Figma 6803:54600 — 476 x 501 at x 482, y 186. The export is the
            node's own render at 952 x 1002, which is twice the box, so it goes
            in as it is. The file's own markup crops a larger source to reach
            this picture; applying that crop to an export that already is the
            picture stretches it to nothing. */}
        <Image
          src={heroMockup}
          alt="The Flowtune player on a phone"
          width={952}
          height={1002}
          priority
          unoptimized
          className="absolute max-w-none"
          style={{ left: 482, top: 186, width: 476, height: 501 }}
        />

        {/* Figma 6803:54602 — 511 x 48 at x 464.5, y 650.55: the ramp that
            buries the bottom edge of the mockup. Its own stops, verbatim. */}
        <div
          aria-hidden
          className="absolute"
          style={{
            left: 464.5,
            top: 650.55,
            width: 511,
            height: 48,
            background:
              "linear-gradient(to bottom, rgba(0,2,8,0) 9.92%, #000208 80.2%)",
          }}
        />

        {/* Figma 6659:12313 — MENU over its list, 30 apart, at x 80, y 288. One
            colour for the whole column, rgba(255,255,255,0.55), set on the nav
            the way the file sets it on the frame — the heading and the list ran
            at 50 and 60 before, which read as two greys where the design has
            one. Each line carries its own 55 as well, so the hover can lift a
            single one to 90 without the rest of the column moving with it. The
            column is 187.065 wide, which is what keeps "Efficiency &
            Consistency" on one line: it sets 182.6, and the 180.898 the file
            carried before wrapped it. */}
        <nav
          className="absolute flex flex-col gap-[30px] text-[16px] text-white/60"
          style={{ left: 80, top: 288, width: 187.0653, letterSpacing: "-0.176px" }}
        >
          <p className="leading-[24px] font-medium" style={{ fontFamily: "var(--font-inter)" }}>
            MENU
          </p>
          <ul className="leading-[26px]" style={{ fontFamily: "var(--font-inter)" }}>
            {MENU.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-white/60 transition-colors duration-200 hover:text-white/90"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Figma 6861:23679 — the title over its two tags, 14 apart, at x 1110,
            y 375.5. Flowtune is Inter Bold 52 on #145AFB. */}
        <div className="absolute flex flex-col gap-[14px]" style={{ left: 1110, top: 375.5, width: 250 }}>
          <p
            className="text-[52px] font-bold capitalize text-[#145AFB]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Flowtune
          </p>
          {/* Figma 6832:6214 and 6832:6212 — 115 and 128 wide, 6 apart. Both
              are the file's own 2x renders, for the same reason the icons are:
              the Glass they carry has no CSS form. */}
          <div className="flex items-center gap-1.5">
            {[GLASS_BUTTONS.mobile, GLASS_BUTTONS.uiux].map(({ src, w, h }, i) => (
              <Image
                key={src}
                src={src}
                alt={i === 0 ? "Mobile App" : "UI/UX Design"}
                width={w * 2}
                height={h * 2}
                unoptimized
                style={{ width: w, height: h }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Problem & solution ─────────────────────────────────────────
          Page y 700 to 1938, where the next section's title starts. Every
          offset below is that page value less 700. */}
      <section
        id="problem-solution"
        className="relative mx-auto w-[1440px]"
        style={{ height: 1238 }}
      >
        {/* Figma 6867:23792 — panel X 282.01, Y 857.94, W 328.46 x H 401.62
            turned 20.36 degrees, blur 185.62. The W and H are the export's
            699.687 x 772.851 less 185.62 a side, which is how the file builds
            the box.
              Figma cuts the blur off at that box, and 185.62 of padding is only
            1.85 sigma — the Gaussian still has height when it hits the edge, so
            it ends on a straight vertical step. One level of blue, which is
            nothing in a number and a visible seam on a near-black ground.
              So the filter region is opened out by 120 a side, to roughly 3
            sigma, and the box here grows by the same 120 with the corner moved
            back by it. The shape, the sigma and the position on the page are
            untouched; the only difference is that the tail now finishes inside
            the canvas instead of being sliced. Drawn 1:1, see sectionGlow. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: 105.32, top: 46.04, width: 787, height: 716 }}
        >
          <Image src={sectionGlow} alt="" fill unoptimized className="max-w-none" />
        </div>

        {/* Figma 6659:12206 — 48 SemiBold at x 244, y 867. The ampersand is
            set apart: Inter Tight Medium Italic where the rest is upright. */}
        <h2
          className="absolute whitespace-nowrap text-[48px] font-semibold text-white"
          style={{ left: 244, top: 167, lineHeight: 1.15, fontFamily: "var(--font-inter-tight)" }}
        >
          {"Problem "}
          <span className="font-medium italic">{"& "}</span>
          solution
        </h2>

        {/* Figma 6678:3766 — 261 wide at x 434, y 994. Two paragraphs, which
            is the file's way of saying the break after "too many" is hard.
              Set to the file's y as it stands, 294. The file trims this text
            to cap and baseline, so 994 is the top of the capitals while CSS
            lays out the whole line box, and Inter Tight at 16 on 24 puts the
            cap top 6.36 lower — subtracting that would give 287.64. Osya asked
            for the untrimmed value, so it stays 294 and the 6.36 is written
            down here rather than applied. */}
        <div
          className="absolute text-[16px] text-white/60"
          style={{
            left: 434,
            top: 294,
            width: 261,
            lineHeight: "22px",
            letterSpacing: "-0.176px",
            fontFamily: "var(--font-inter)",
          }}
        >
          <p>Cluttered navigation, generic recommendations, and too many</p>
          <p>
            taps before the first song plays — users lose momentum before they even start
            listening
          </p>
        </div>

        {/* Figma 6867:23757 — 84 x 40 turned 8 degrees, its centre at x 357.375,
            y 1181.341. The file reports the turned bounding box, 88.749 x
            51.301; the size here is solved back out of it, and checks out
            against the text's own 14 and 8 insets. */}
        <div
          className="absolute flex items-center justify-center rounded-full bg-white"
          style={{
            left: 315.375,
            top: 461.341,
            width: 84,
            height: 40,
            transform: "rotate(-8deg)",
            filter: "drop-shadow(7px 12px 8px rgba(255,255,255,0.25))",
          }}
        >
          <span
            className="text-[16px] text-[#000208]"
            style={{ lineHeight: "24px", letterSpacing: "-0.176px", fontFamily: "var(--font-inter-tight)" }}
          >
            Problem
          </span>
        </div>

        {/* Figma 6861:23685 — 880 wide at x 434, y 1174: three 288 circles, 8
            apart. */}
        <div className="absolute flex items-center gap-2" style={{ left: 434, top: 474 }}>
          {STATS.map(({ label, value, disc, blur, cx, cy }) => (
            <div
              key={label}
              className="relative size-[288px] shrink-0 overflow-clip rounded-full bg-[#202124]"
            >
              <div
                aria-hidden
                className="absolute rounded-full bg-[#2a60e0]"
                style={{
                  left: cx - disc / 2,
                  top: cy - disc / 2,
                  width: disc,
                  height: disc,
                  filter: `blur(${blur}px)`,
                }}
              />
              <p
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[18px] font-medium text-white"
                style={{ letterSpacing: "-0.198px", fontFamily: "var(--font-inter)" }}
              >
                {label}
              </p>
              <p
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[16px] text-white"
                style={{
                  top: 232,
                  lineHeight: "24px",
                  letterSpacing: "-0.176px",
                  fontFamily: "var(--font-inter-tight)",
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Figma 6659:12362 — 87 x 40 turned 14 degrees the other way, centre at
            x 1031.723, y 1503.93. Solved out of its 94.093 x 59.859 box the
            same way, and its text's 16 and 4 insets agree. */}
        <div
          className="absolute flex items-center justify-center rounded-full bg-[#2a60e0]"
          style={{
            left: 988.223,
            top: 783.93,
            width: 87,
            height: 40,
            transform: "rotate(14deg)",
            boxShadow: "-7px 10px 16.4px 0 rgba(42,96,224,0.45)",
          }}
        >
          <span
            className="text-[16px] text-white"
            style={{ lineHeight: "32px", letterSpacing: "-0.176px", fontFamily: "var(--font-inter-tight)" }}
          >
            Solution
          </span>
        </div>

        {/* Figma 6867:23756 — 274 wide at x 730, y 1554, the file's value as
            it stands; the same 6.36 cap trim would put it at 847.64. Three paragraphs, the middle one empty: that blank line is the
            gap between the two halves of the answer. Nine lines, which is what
            the file's 204 works out to. */}
        <div
          className="absolute text-[16px] text-white/60"
          style={{
            left: 730,
            top: 854,
            width: 274,
            lineHeight: "22px",
            letterSpacing: "-0.176px",
            fontFamily: "var(--font-inter)",
          }}
        >
          <p>
            Streamlined navigation cuts the taps needed to start playback. A modular interface
            creates a consistent system across screens
          </p>
          <p>&nbsp;</p>
          <p>
            Smarter recommendations surface relevant content first. Fewer, clearer steps make
            key actions easier to find and complete
          </p>
        </div>
      </section>
      {/* ── User personas ───────────────────────────────────────────────
          Page y 1938 to 2568. Offsets below are that value less 1938.
            Both glows belong to this block, whatever the metadata says: it
          places Vector 39 at y 2511.92, while the file's own panel puts it at
          1956.99, up beside Maya. The panel is the one to trust — it is also
          the only place the rotation is written down, and these two are turned
          far enough that it shows. */}
      <section
        id="user-personas"
        className="relative mx-auto w-[1440px]"
        style={{ height: 630 }}
      >
        {PERSONA_GLOWS.map(({ src, left, top, w, h }) => (
          <div
            key={src}
            aria-hidden
            className="pointer-events-none absolute"
            style={{ left, top, width: w, height: h }}
          >
            <Image src={src} alt="" fill unoptimized className="max-w-none" />
          </div>
        ))}

        {/* Figma 6874:26349 — 48 SemiBold at x 244, y 1938. */}
        <h2
          className="absolute whitespace-nowrap text-[48px] font-semibold text-white"
          style={{ left: 244, top: 0, lineHeight: 1.15, fontFamily: "var(--font-inter-tight)" }}
        >
          User personas
        </h2>

        {/* Figma 6874:26351 — 278 wide at x 434, y 2097. One paragraph now, and
            the file's 60 is three lines of 24 less the cap trim. */}
        <div
          className="absolute text-[16px] text-white/60"
          style={{
            left: 434,
            top: 159,
            width: 278,
            lineHeight: "22px",
            letterSpacing: "-0.176px",
            fontFamily: "var(--font-inter)",
          }}
        >
          <p>
            I created user personas to map real listening habits — from quick mood switches
            to podcast marathons
          </p>
        </div>

        {/* Figma 6878:26368 and 6874:26313 — Maya's portrait at x 241, y 2065,
            her name under it at y 2229. The photo is taller than its frame and
            hangs a pixel over the top; the frame clips it. */}
        <div className="absolute" style={{ left: 241, top: 127 }}>
          <PersonaPortrait src="/personas/music-app-v2/maya-card.webp" />
        </div>
        <div className="absolute" style={{ left: 241, top: 291 }}>
          <PersonaName name="Maya, 27" role="Freelance Designer" />
        </div>

        {/* Figma 6874:26356 and 6874:26348 — 248 wide at x 730 and x 1050,
            y 2229. */}
        <PersonaCard
          left={730}
          pill="Goals"
          pillClass="bg-[rgba(29,54,22,0.6)] text-[#7ad764]"
          pillTransform="rotate(0.33deg) skewX(0.08deg)"
          lines={GOALS}
        />
        <PersonaCard
          left={1050}
          pill="Fears"
          pillClass="bg-[#291313] text-[#bc433d]"
          pillTransform="skewX(-0.08deg)"
          lines={FEARS}
        />

        {/* Figma 6878:26375 — Daniel at x 1353.84, y 2065, 174.84 wide, so at
            1440 the frame cuts him 86.16 in and the rest is off the edge. That
            is the design. Osya's rule for wider screens is that he keeps that
            same footing against the right of the window rather than against the
            1440 column, so he hangs off a full-width band instead: 174.84 less
            86.16 of him showing puts his right edge 88.68 past the window. */}
        <div
          className="absolute left-1/2 w-screen -translate-x-1/2"
          style={{ top: 127, height: 225 }}
        >
          {/* Daniel is turned where Maya is straight: -5.86 in the file, which
              is +5.86 here — Figma counts anticlockwise and CSS the other way.
                Turned about the centre, which is where the file leaves it: his
              vertical centre is 2178.5 before the turn and after it, so the
              footing against the right of the window is unchanged. */}
          <div
            className="absolute flex flex-col gap-10"
            style={{ right: -88.68, width: 174.84, transform: "rotate(5.86deg)" }}
          >
            <PersonaPortrait src="/personas/music-app-v2/daniel-card.webp" />
            <PersonaName name="Daniel, 34" role="Manager at a Tech Company" />
          </div>
        </div>
      </section>

      {/* ── Information Architecture ────────────────────────────────────
          Page y 2568 to 3677, where the diagram ends. Offsets are that value
          less 2568.
            One element of this block is still missing: Figma 6659:12364, 806 x
          105 at x 632.84, y 2534.55. The MCP hit its daily limit before it
          could be read, and it is not among the exports on the desktop. */}
      <section
        id="information-architecture"
        className="relative mx-auto w-[1440px]"
        style={{ height: 1109 }}
      >
        {/* Figma 6803:54625 — Vector 36, a 793.11 x 1270.64 shape turned
            -142.96 under a 176.98 blur, bounding box 1398.46 x 1492 at x 258.48,
            y 2500.87. Placed by the rule above. It reaches 1753 across, past
            the 1440 column and off the right of the window — which is the point:
            nothing here is cut at 1440, so a wider screen simply shows more of
            it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: 124.2, top: 149.73, width: 1672, height: 1159 }}
        >
          <Image
            src="/glows/music-app-v2/information-architecture-glow.svg"
            alt=""
            fill
            unoptimized
            className="max-w-none"
          />
        </div>

        {/* Figma 6659:11861 — Vector 33, blur 150, cut 14.14 off its left by the
            frame. It starts inside this block and runs on past it, down to
            4784, so it sits under whatever comes next. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: -14.14, top: 937.94, width: 1211, height: 1278 }}
        >
          <Image
            src="/glows/music-app-v2/information-architecture-glow-2.svg"
            alt=""
            fill
            unoptimized
            className="max-w-none"
          />
        </div>

        {/* Figma 6659:12364 — 806 x 105 at x 632.84, y 2534.55. Not a row of
            buttons, whatever its name suggests: a fill of #000208 running from
            nothing to solid, the same smoke that closes the hero. The file's
            handles put the gradient at 80.2 per cent of the box, so it is opaque
            for the last fifth. It sits over the foot of the personas block, and
            over the glow behind it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: 632.846,
            top: -33.449,
            width: 806,
            height: 105,
            background: "linear-gradient(to bottom, rgba(0,2,8,0) 0%, #000208 80.2%)",
          }}
        />

        {/* Figma 6659:11875 — 314 wide at x 563, y 2748, centred. Its 110 is
            two lines of 55.2, which is what 314 makes of the two words. */}
        <h2
          className="absolute text-center text-[48px] font-semibold text-white"
          style={{ left: 563, top: 180, width: 314, lineHeight: 1.15, fontFamily: "var(--font-inter-tight)" }}
        >
          Information Architecture
        </h2>

        {/* Figma 6659:11876 — 280 wide at x 580, y 2903, centred. No cap trim on
            this one, and its 48 is exactly two lines of 24. */}
        <div
          className="absolute text-center text-[16px] text-white/60"
          style={{
            left: 580,
            top: 335,
            width: 280,
            lineHeight: "22px",
            letterSpacing: "-0.176px",
            fontFamily: "var(--font-inter)",
          }}
        >
          <p>How the app&apos;s core screens connect,</p>
          <p>and what each one is made of</p>
        </div>

        {/* Figma 6766:17064 — 1195 x 636 at x 102, y 3041. Osya's own export,
            with every label already drawn as outlines, so it carries no font
            and renders the same everywhere. Vector rather than the 2x PNG
            beside it: the diagram is all hairlines and small type and stays
            sharp at any zoom. 196k on disk, 69k over the wire. */}
        <div className="absolute" style={{ left: 102, top: 473, width: 1195, height: 636 }}>
          <Image
            src="/diagrams/music-app-v2/information-architecture.svg"
            alt="How the app's core screens connect, and what each one is made of"
            fill
            unoptimized
            className="max-w-none"
          />
        </div>
      </section>

      {/* ── The hand, and the two smokes that close it ──────────────────
          Page y 3677 to 4923. Offsets are that value less 3677.
            The layers interlock, and the order is the file's: Vector 3 under
          everything, then the mockup, then the wide smoke, then the tilted one
          over it. The app screens go above all of it next.
            What the two smokes are for is worth writing down. The tilted one
          covers 4282 to 4923, the wide one 4421 to 4781, so they stack for 360
          — and stacked, two fades to the same colour compound: where each alone
          is at half, together they reach three quarters. That is what cuts the
          foot of the hand away on a diagonal, which one fade cannot do.
            They also close out Vector 33 from the block above, which runs down
          to 4784. The file's own render goes black between 4700 and 4850 — 8
          and 9 against a ground of 8, right across the width — and Vector 3
          only starts again at 5031. That band is the test: if anything glows
          there, a layer is in the wrong place. */}
      <section className="relative mx-auto w-[1440px]" style={{ height: 1246 }}>
        {/* Figma 6659:11852 — Vector 3, blur 200, cut 221.93 off its left by
            the frame. Deepest layer on the page; it begins below this section
            and carries on into the next. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: -221.93, top: 1354.48, width: 1239, height: 1384 }}
        >
          <Image src="/glows/music-app-v2/hand-glow.svg" alt="" fill unoptimized className="max-w-none" />
        </div>

        {/* Figma 6659:12000 — 755 x 890 at x 197, y 3831. */}
        <Image
          src="/mockups/music-app-v2/hand.webp"
          alt="The app running on a phone held in one hand"
          width={1510}
          height={1780}
          unoptimized
          className="absolute max-w-none"
          style={{ left: 197, top: 154, width: 755, height: 890 }}
        />

        {/* Figma 6659:12001 — 1445 x 360 at x 0, y 4421. Not content, so it
            runs the width of the window rather than the column: the file
            already draws it 5 wider than the frame, which says the same. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 w-screen -translate-x-1/2"
          style={{
            top: 744,
            height: 360,
            background: "linear-gradient(to bottom, rgba(0,2,8,0) 0%, #000208 80.2%)",
          }}
        />

        {/* Figma 6659:12003 — 685 x 341.88 turned 30.25, its bounding box
            centred on 338.06, 4602.46. The frame cuts its left corner at x 0;
            here it is left whole, so past 1440 the window shows what the frame
            hides. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: -4.44,
            top: 754.52,
            width: 685,
            height: 341.88,
            transform: "rotate(30.25deg)",
            background: "linear-gradient(to bottom, rgba(0,2,8,0) 0%, #000208 80.2%)",
          }}
        />
      </section>

      {/* ── The two screens ─────────────────────────────────────────────
          Page y 4923 to 6566. Offsets are that value less 4923.
            Both sit above the smokes of the block before, which is why they are
          here rather than there — the file paints them last. */}
      <section className="relative mx-auto w-[1440px]" style={{ height: 1643 }}>
        {/* Figma 6659:12005 — the frame is 400 x 1691 at x 882, y 4875, but its
            children throw glows 73 past every side, so what Figma exports is
            546 x 1837 and it hangs from x 809, y 4802. Placed by the render
            bounds, not the frame, or the whole thing sits 73 low and right.
              It starts 121 above this section: the block before ends at 4923
            and the screen's glow begins at 4802. */}
        <Image
          src="/mockups/music-app-v2/new.webp"
          alt="The New screen: new songs, new releases, more to explore"
          width={1092}
          height={3674}
          unoptimized
          className="absolute max-w-none"
          style={{ left: 808.996, top: -121, width: 546, height: 1837 }}
        />

        {/* Figma 6659:12365 — 352 x 764 at x 230, y 5111, no effects over its
            edges, so the export is exactly twice the frame. */}
        <Image
          src="/mockups/music-app-v2/playlist.webp"
          alt="A playlist screen"
          width={704}
          height={1528}
          unoptimized
          className="absolute max-w-none"
          style={{ left: 230, top: 188, width: 352, height: 764 }}
        />
      </section>

      {/* ── Stylish Icons ───────────────────────────────────────────────
          Page y 6566 to 7223. Offsets are that value less 6566. */}
      <section id="icons" className="relative mx-auto w-[1440px]" style={{ height: 657 }}>
        {/* Figma 6659:11860 — Vector 31, cut 292.92 off its left and 307.16 off
            its top by the frame. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: -292.92, top: -307.16, width: 1634, height: 1631 }}
        >
          <Image src="/glows/music-app-v2/icons-glow.svg" alt="" fill unoptimized className="max-w-none" />
        </div>

        {/* Figma 6659:12117 — 346 wide at x 547, centred, the heading and its
            line 44 apart. The body is Inter here, not Inter Tight.
              Its three breaks are set by hand. The file only breaks once, after
            "radio," — but its second line comes to 343.5 in a box of 346, and
            the same words measure 346.8 in the browser. Eight tenths of a pixel
            over, and "radio," drops to a line of its own, four lines where the
            file has three. The file's own render gives lines of 293.0, 343.5 and
            241.5 wide, and those measure back to these three; ours come to
            293.1, 346.7 and 242.9. Wrapping is off: with the breaks set by hand
            there is nothing left for it to decide, and its one remaining effect
            would be to undo them over that same eight tenths. */}
        <div className="absolute flex flex-col items-center" style={{ left: 547, top: 186, width: 346, gap: 44 }}>
          <h2
            className="text-center text-[48px] font-semibold text-white"
            style={{ lineHeight: "55.2px", fontFamily: "var(--font-inter-tight)" }}
          >
            Stylish Icons
          </h2>
          <p
            className="whitespace-nowrap text-center text-[16px] text-white/60"
            style={{ lineHeight: "22px", letterSpacing: "-0.176px", fontFamily: "var(--font-inter)" }}
          >
            {"A consistent icon set that keeps actions"}
            <br />
            {"instantly recognizable — search, shuffle, radio,"}
            <br />
            {"and more — without extra labels."}
          </p>
        </div>

        {/* Figma 6659:11883 — 388 x 144 at x 526, y 6995. */}
        <div className="absolute flex flex-col gap-4" style={{ left: 526, top: 429 }}>
          {ICON_SET.map((row, i) => (
            <div key={i} className="flex gap-4">
              {row.map((name) => (
                <Image
                  key={name}
                  src={`/icons/music-app-v2/set/${name}.webp`}
                  alt=""
                  aria-hidden
                  width={128}
                  height={128}
                  unoptimized
                  className="size-16"
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Two cards ───────────────────────────────────────────────────
          Page y 7223 to 8159. Offsets are that value less 7223. The
          block below starts 80 under the foot of this text, which ends at
          8059. */}
      <section id="ui-card-elements" className="relative mx-auto w-[1440px]" style={{ height: 936 }}>
        {/* Figma 6659:11856 — Vector 27, the widest glow in the case: its ink
            fills the frame edge to edge, 1440 of the 2003 the canvas carries,
            so 563 of it is cut on the left. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: -563, top: -105.79, width: 2003, height: 1999 }}
        >
          <Image src="/glows/music-app-v2/cards-glow.svg" alt="" fill unoptimized className="max-w-none" />
        </div>

        {/* Figma 6659:12107 — 1280 wide at x 80, two 632 squares 16 apart, each
            #e8e8eb on a 48 corner with a phone hanging over its edge and cut by
            it. Taken whole from the file rather than rebuilt: the mockups
            overflow their frames and one carries a shadow, and the export
            already resolves all of it. These are the previous build's assets —
            checked against the file and identical, 0.24 of a level apart with
            nothing over 16. */}
        <div className="absolute flex gap-4" style={{ left: 80, top: 0 }}>
          {[
            ["card-below", "The app seen from below, on a phone"],
            ["card-hand", "The app on a phone held in one hand"],
          ].map(([file, alt]) => (
            <Image
              key={file}
              src={`/mockups/music-app-v2/${file}.webp`}
              alt={alt}
              width={1264}
              height={1264}
              unoptimized
              className="size-[632px] max-w-none"
            />
          ))}
        </div>

        {/* Figma 6659:12106 — 314 wide at x 728, y 7975, ranged left. Its four
            breaks are set by hand off the file's own render, which gives lines
            of 265.5, 249.5, 283.0 and 292.0; ours come to 266.7, 250.3, 284.6
            and 295.5. */}
        {/* The file trims this one to cap and baseline: four lines of 24 come
            to a box of 84, not 96, and that is what leaves exactly 80 between
            its foot and the card set below. Margins do the trim — 6.36 off the
            top and 6 off the bottom, measured on Inter at 16 on 24 — inside a
            flow-root wrapper so they cannot collapse through it. */}
        <div style={{ position: "absolute", left: 728, top: 752, display: "flow-root" }}>
        <p
          className="whitespace-nowrap text-[16px] text-white/60"
          style={{
            marginTop: -5.36,
            marginBottom: -5,
            lineHeight: "22px",
            letterSpacing: "-0.176px",
            fontFamily: "var(--font-inter)",
          }}
        >
          {"Reusable card components adapt to"}
          <br />
          {"different content types — albums,"}
          <br />
          {"playlists, and artist collections — while"}
          <br />
          {"keeping one consistent visual language."}
        </p>
        </div>
      </section>

      {/* ── The card set ────────────────────────────────────────────────
          Page y 8159 to 8823, Figma 6659:11910.
            This one is the previous build's component, kept whole. Its card
          sizes are the file's to the pixel — 180, 370 x 240, 152 x 104,
          200 x 110, 212 x 258 — and it already answers the things this set is
          made of: the 20 corner at 59 per cent smoothing, the stroke drawn as a
          path rather than a border so it hugs that corner, the cap trim done in
          margins, and the line heights Figma sets where the browser's "normal"
          runs taller. Rebuilding it would be rewriting all of that from the
          same file it was read from.
            It places itself from the block's own top left, so it only needs the
          section under it. */}
      <section className="relative mx-auto w-[1440px]" style={{ height: 664 }}>
        <CardsBlock />
      </section>

      {/* ── Typography & Colors ─────────────────────────────────────────
          Page y 8823 to 9982. Offsets are that value less 8823.
            The wheel is Osya's own export, and it had to be: the API crops a
            group's SVG to its ink — 763 x 462 of the 1031.55 square — and says
            nothing about where that crop sits, while the app exports the whole
            frame with a viewBox to match. The previous build's wheel is a
            different shape and could not stand in; its paths diverge by
            hundreds once aligned. */}
      <section id="typography-colors" className="relative mx-auto w-[1440px]" style={{ height: 1159 }}>
        {/* Figma 6659:11857 and 6659:11858. */}
        {[
          { src: "/glows/music-app-v2/type-glow-1.svg", left: 96.39, top: 224.11, w: 1759, h: 1313 },
          { src: "/glows/music-app-v2/type-glow-2.svg", left: 24.77, top: 768.02, w: 1568, h: 1449 },
        ].map(({ src, left, top, w, h }) => (
          <div
            key={src}
            aria-hidden
            className="pointer-events-none absolute"
            style={{ left, top, width: w, height: h }}
          >
            <Image src={src} alt="" fill unoptimized className="max-w-none" />
          </div>
        ))}

        {/* Figma 6659:11877 — 363 wide at x 538.5, the heading and its line 44
            apart. The heading breaks after "Typography" in the file. */}
        <div className="absolute flex flex-col items-center" style={{ left: 538.5, top: 186, width: 363, gap: 44 }}>
          <h2
            className="text-center text-[48px] font-semibold text-white"
            style={{ lineHeight: "55.2px", fontFamily: "var(--font-inter-tight)" }}
          >
            {/* The file sets the ampersand apart, as it does in every heading
                that carries one: Inter Tight Medium Italic where the rest of
                the line is SemiBold upright. Here the run covers the sign
                alone, not the space after it. */}
            Typography
            <br />
            <span className="font-medium italic">&amp;</span> Colors
          </h2>
          <p
            className="text-center text-[16px] text-white/60"
            style={{
              width: 307.29,
              lineHeight: "22px",
              letterSpacing: "-0.176px",
              fontFamily: "var(--font-inter)",
            }}
          >
            A dark palette built around one accent blue, paired with SF Pro for headings and
            Mulishfor body text — consistent across every screen.
          </p>
        </div>

        {/* Figma 6659:12120 — four concentric arcs, #dad6d6, #425dee, #010f23
            and white, filling a 1031.55 square at x 204, y 9178. */}
        <div aria-hidden className="absolute" style={{ left: 204, top: 375, width: 1031.55, height: 1031.55 }}>
          <Image
            src="/diagrams/music-app-v2/typography-wheel.svg"
            alt=""
            fill
            unoptimized
            className="max-w-none"
          />
        </div>

        {/* Figma 6659:12125 — seven rounded bars at the wheel's centre, 46.89 x
            25.12 at x 696.56, y 9602.59. Each bar's own size and place, read
            off the file rather than stepped: they are not evenly spaced. */}
        <div aria-hidden className="absolute" style={{ left: 696.56, top: 779.59, width: 46.89, height: 25.12 }}>
          {[
            [0, 5.39, 4.31, 14.35],
            [7.17, -0.42, 4.19, 25.95],
            [14.23, 3.95, 4.31, 17.22],
            [21.41, 8.26, 4.31, 8.61],
            [28.58, 2.52, 4.31, 20.09],
            [35.76, 5.45, 4.19, 14.23],
            [42.82, 3.95, 4.31, 17.22],
          ].map(([x, y, w, h], i) => (
            <div
              key={i}
              className="absolute bg-white"
              style={{ left: x, top: y, width: w, height: h, borderRadius: 143.53 }}
            />
          ))}
        </div>

        {/* Figma 6659:12294, 12292, 12288 and 12290 — the colour labels, each a
            100-corner pill of white at 16 per cent carrying Figma's GLASS. Same
            call as the icons: glass has no CSS form and no SVG export, so these
            are the file's own 2x renders. */}
        {[
          { file: "ink", label: "#010F23", left: 834.15, top: 554.55, w: 79, h: 38 },
          { file: "blue", label: "#425DEE", left: 457.5, top: 607.55, w: 81, h: 38 },
          { file: "white", label: "#FFFFFF", left: 1081.46, top: 850.55, w: 76, h: 38 },
          { file: "grey", label: "#DAD6D6", left: 272.46, top: 858.55, w: 87, h: 42 },
        ].map(({ file, label, left, top, w, h }) => (
          <Image
            key={file}
            src={`/icons/music-app-v2/swatches/${file}.webp`}
            alt={label}
            width={w * 2}
            height={h * 2}
            unoptimized
            className="absolute max-w-none"
            style={{ left, top, width: w, height: h }}
          />
        ))}
      </section>

      {/* ── The two type specimens ──────────────────────────────────────
          Page y 9982 to 10956, Figma 6659:11960.
            Both are the previous build's, re-anchored: an oversized letter, the
          face's name beside it, two 124 squares carrying the sizes, and three
          lines of the alphabet. Mulish for the body, SF Pro for the headings —
          and SF Pro is not a webfont, so it resolves through the system stack
          and lands as the real face on Apple hardware. */}
      <section className="relative mx-auto w-[1440px]" style={{ height: 974 }}>
        <SpecimenBlock s={MULISH_SPECIMEN} />
        <SpecimenBlock s={SF_PRO_SPECIMEN} />
      </section>

      {/* ── Efficiency & Consistency ────────────────────────────────────
          Page y 10956 to 12775. Offsets are that value less 10956. */}
      <section id="efficiency-consistency" className="relative mx-auto w-[1440px]" style={{ height: 1819 }}>
        {/* Figma 6659:11853 and 6659:11854. The second fills the frame edge to
            edge and loses 223 off its left. */}
        {[
          { src: "/glows/music-app-v2/efficiency-glow-1.svg", left: 19.4, top: 383.35, w: 1255, h: 1463 },
          { src: "/glows/music-app-v2/efficiency-glow-2.svg", left: -223, top: 1556.44, w: 1663, h: 2136 },
        ].map(({ src, left, top, w, h }) => (
          <div key={src} aria-hidden className="pointer-events-none absolute" style={{ left, top, width: w, height: h }}>
            <Image src={src} alt="" fill unoptimized className="max-w-none" />
          </div>
        ))}

        {/* Figma 6659:12135 — 604 x 527 at x 418, y 10956, an image fill on a
            frame that clips it. */}
        <Image
          src="/mockups/music-app-v2/efficiency.webp"
          alt="The app playing a track"
          width={1208}
          height={1054}
          unoptimized
          className="absolute max-w-none"
          style={{ left: 418, top: 0, width: 604, height: 527 }}
        />

        {/* Figma 6659:12136 — 520.88 x 123.29 at x 464.24, y 11371.66. It lies
            over the last 111 of the mockup and runs 12 past its foot, which is
            what takes the bottom edge into the page instead of ending it on a
            line. Its own child sits below its box and is clipped away entirely,
            so nothing of it shows. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: 464.24,
            top: 415.66,
            width: 520.88,
            height: 123.29,
            background: "linear-gradient(to bottom, rgba(0,2,8,0) 0%, #000208 80.2%)",
          }}
        />

        <EfficiencyBlock />
      </section>

      {/* ── Library, and the phone beside it ────────────────────────────
          Page y 12775 to 14738.45. Offsets are that value less 12775. */}
      <section className="relative mx-auto w-[1440px]" style={{ height: 1963.45 }}>
        {/* Figma 6659:11855. */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: -7.78, top: 1604.56, width: 1309, height: 1736 }}
        >
          <Image src="/glows/music-app-v2/library-glow.svg" alt="" fill unoptimized className="max-w-none" />
        </div>

        {/* Figma 6659:12138 — 400 x 1777 at x 882, corner 34, under a 60 drop
            shadow offset 13 down in rgba(0, 13, 36, 0.6). The shadow moved here
            from the phone beside it.
              The shadow is drawn, not baked into the export. Figma renders it
            into a 520 x 1897 image hung from x 822, y 12728, and that reads
            right, but it is a raster — fixed at 2x and resampled at any other
            density. drop-shadow follows the image's own alpha, so it takes the
            34 corner exactly and stays sharp at every screen; the image is then
            the plain screen, twice the frame with nothing over its edges.
              The blur is 20, not the file's 60. Figma's shadow radius is not
            the CSS blur length: at 60 the falloff runs half again as far as the
            file's own render — 13 against 9 at thirty pixels out, still 11 at
            fifty where Figma is back to the ground. Matched by measurement
            instead, both laid on the same #000208 and read across the falloff:
            20 lands within half a level, where 60 is out by two. */}
        <Image
          src="/mockups/music-app-v2/library.webp"
          alt="The Library screen"
          width={800}
          height={3554}
          unoptimized
          className="absolute max-w-none"
          style={{
            left: 882,
            top: 0,
            width: 400,
            height: 1777,
            filter: "drop-shadow(0 13px 20px rgba(0, 13, 36, 0.6))",
          }}
        />

        {/* Figma 6659:12459 — 400 x 870 at x 204.64, y 13109.85, corner 34.
            Its drop shadow has gone over to the Library screen, so nothing
            hangs over its edges now and the export is twice the frame. */}
        <Image
          src="/mockups/music-app-v2/iphone17.webp"
          alt="The app on an iPhone 17 Pro"
          width={800}
          height={1740}
          unoptimized
          className="absolute max-w-none"
          style={{ left: 204.64, top: 334.85, width: 400, height: 870 }}
        />
      </section>

      {/* ── The Takeaway ────────────────────────────────────────────────
          Page y 14738.45 to the foot of the frame at 16363. Offsets are that
          value less 14738.45. Built against the current file rather than
          carried over.
            The frame ends at 16363 and the closing block runs to 16625.38, so
            Figma cuts it — 262 of its 598 never show. The page ends where the
            frame does and the root's clip does the same cut: nothing follows
            the word. */}
      <section id="summary" className="relative mx-auto w-[1440px]" style={{ height: 1624.55 }}>
        {/* Figma 6659:11880 — 346 wide at x 547, the heading over its line 44
            apart. The heading is 48 on 60 here, not the 55.2 the other
            headings use. */}
        <div className="absolute flex flex-col items-center" style={{ left: 547, top: 0, width: 346, gap: 44 }}>
          <h2
            className="w-full text-center text-[48px] font-semibold text-white"
            style={{ lineHeight: "60px", fontFamily: "var(--font-inter-tight)" }}
          >
            The Takeaway
          </h2>
          <p
            className="w-full text-center text-[16px] text-white/60"
            style={{ lineHeight: "22px", letterSpacing: "-0.176px", fontFamily: "var(--font-inter)" }}
          >
            Large content blocks, clear visual patterns, and short paths to every action —
            nothing extra between a user and the music.
          </p>
        </div>

        {/* Figma 6659:12296 — 573.36 x 1060.18 at x 498, y 14988.4. */}
        <Image
          src="/mockups/music-app-v2/takeaway-hand.webp"
          alt="The app on a phone held in one hand"
          width={1147}
          height={2121}
          unoptimized
          className="absolute max-w-none"
          style={{ left: 498, top: 249.95, width: 573.36, height: 1060.18 }}
        />

        {/* Figma 6659:12201 — 289.27 wide at x 120.46, y 15040.55: a 64 tile on a
            35 corner in #7951ec carrying a 28 glyph, then the line 40 under it.
              The tile's 4 of extra size on every side is a stroke, not a glow:
            4 wide, drawn outside, rgb(176,163,214) at a fifth. CSS puts a
            border inside the box, so it goes on as a ring instead — an outline
            would follow the border-radius but sit square to it. */}
        <div className="absolute flex flex-col" style={{ left: 120.46, top: 302.1, width: 289.27, gap: 40 }}>
          <div
            className="flex size-16 shrink-0 items-center justify-center bg-[#7951ec]"
            style={{ borderRadius: 35, boxShadow: "0 0 0 4px rgba(176, 163, 214, 0.2)" }}
          >
            <Image
              src="/icons/music-app-v2/takeaway/magic-wand.svg"
              alt=""
              aria-hidden
              width={28}
              height={28}
              unoptimized
              className="size-7"
            />
          </div>
          {/* Five lines, set by hand. The file breaks once itself, before "a
              user lands.", and wraps the rest; its own render gives 218.5,
              259.5, 284.5, 251.5 and 91.5 wide, and these words measure back to
              219.2, 260.9, 285.1, 251.8 and 94.1. */}
          <p
            className="whitespace-nowrap text-[16px] text-white/60"
            style={{
              marginTop: -5.36,
              marginBottom: -5,
              lineHeight: "22px",
              letterSpacing: "-0.176px",
              fontFamily: "var(--font-inter)",
            }}
          >
            {"One consistent system, fewer"}
            <br />
            {"decisions per screen, and a shorter"}
            <br />
            {"path from open to play — the interface"}
            <br />
            {"stays predictable no matter where"}
            <br />
            {"a user lands."}
          </p>
        </div>

        {/* Figma 6659:12297 — 1440 x 598 at y 16027.38 on its own #000105, and
            it clips. "Thanks" is 400 on 520, which starts 70 above the frame's
            top: the frame cuts the word's own ascent, and that crop is the
            design. Full width, like the fade over it.
              Order is the file's, and it is not the reading order: this frame
            is #36, the fade #37 and the small screen #38. So the fade falls
            over the word rather than under it, and the screen sits clear of
            both. */}
        <div
          className="absolute left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#000105]"
          style={{ top: 1288.93, height: 598 }}
        >
          <div className="relative mx-auto h-full w-[1440px]">
            <p
              className="absolute whitespace-nowrap text-[400px] font-bold text-[#203bca]"
              style={{ left: 29.5, top: -70, lineHeight: "520px", fontFamily: "var(--font-inter-tight)" }}
            >
              Thanks
            </p>

            {/* Figma 6659:12299 — 353 x 92 at x 542.97, y 16239.38: the mark
                over the closing line, 48 apart.
                  That line reads as Aeonik Pro TRIAL on the node, but not one
                of its 92 characters uses it — two runs of overrides cover the
                whole string in Inter, and the base style is left holding
                nothing. Inter it is. */}
            <Image
              src="/icons/music-app-v2/takeaway/asterisk.svg"
              alt=""
              aria-hidden
              width={24}
              height={24}
              unoptimized
              className="absolute size-6"
              style={{ left: 707.47, top: 212 }}
            />
            {/* Two runs, and they differ: the file fills the first at 60 per
                cent and leaves the second at full. Read off its own render —
                153 of alpha against 255. */}
            <p
              className="absolute text-center text-[16px]"
              style={{
                left: 542.97,
                top: 270,
                width: 353,
                lineHeight: "22px",
                letterSpacing: "-0.176px",
                fontFamily: "var(--font-inter)",
              }}
            >
              <span className="text-white/60">
                Thanks for reading through the process, not just the pixels.{" "}
              </span>
              <span className="text-white">Let&apos;s build something together.</span>
            </p>
          </div>
        </div>
        {/* Figma 6659:12303 — 1440 x 356.25 at y 15741.92, #010209 at nothing
            through to #000105 solid at 80.2 per cent. It takes the foot of the
            hand into the closing frame's own ground, which is that same
            #000105. Not content, so it runs the width of the window. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 w-screen -translate-x-1/2"
          style={{
            top: 1003.47,
            height: 356.25,
            background: "linear-gradient(to bottom, rgba(1,2,9,0) 0%, #000105 80.2%)",
          }}
        />

        {/* Figma 6659:12306 — 310 square at x 1010.46, y 15903 on #e6e6e6, a
            phone screen inside it already clipped by the export. */}
        <Image
          src="/mockups/music-app-v2/takeaway-container.webp"
          alt="A screen from the app"
          width={620}
          height={620}
          unoptimized
          className="absolute max-w-none"
          style={{ left: 1010.46, top: 1164.55, width: 310, height: 310 }}
        />

      </section>

      {/* Figma 6641:2544 — the same button Mentora carries, and the same
          behaviour: 56 across on a 28 corner, 16 around a 24 arrow, pinned and
          shown once you are a viewport down. Only the pair of colours differs —
          white with a #171716 arrow, turning #2a60e0 with a white one. */}
      <ScrollToTop base={MUSIC_APP_SKIN.base} hover={MUSIC_APP_SKIN.hover} />
    </div>
  );
}

// Figma 6878:26369 and 6874:26345 — 124 square, a 2 white stroke, corner 20,
// #2a60e0 behind the cut-out. These are the file's own renders of the whole
// frame, blue and stroke and portrait together: the portrait is a cut-out, and
// rebuilding it here meant flattening its transparency and burying the blue.
//   The stroke is drawn centred, so the render is 126 and hangs a pixel out on
// every side. The 124 box is what the layout above measures against.
function PersonaPortrait({ src }: { src: string }) {
  return (
    <div className="relative size-[124px] shrink-0">
      <Image
        src={src}
        alt=""
        width={252}
        height={252}
        className="absolute max-w-none"
        style={{ left: -1, top: -1, width: 126, height: 126 }}
      />
    </div>
  );
}

// Figma 6874:26313 and 6878:26371 — the name at 32, the role at 16 on white at
// half, 12 apart, 63 tall.
function PersonaName({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex flex-col gap-3" style={{ fontFamily: "var(--font-inter-tight)" }}>
      <p className="text-[32px] font-medium text-white" style={{ lineHeight: "32px", letterSpacing: "-0.352px" }}>
        {name}
      </p>
      {/* The file's "normal" resolves to 19 here — its 63 is 32, 12 and 19 —
          where the browser makes it 24 and drops the role lower. */}
      {/* Inter, not Inter Tight — the file sets the role in the plain face,
          the same as the line under the block's heading. */}
      <p
        className="whitespace-nowrap text-[16px] text-white/50"
        style={{ lineHeight: "19px", fontFamily: "var(--font-inter)" }}
      >
        {role}
      </p>
    </div>
  );
}

function PersonaCard({
  left,
  pill,
  pillClass,
  pillTransform,
  lines,
}: {
  left: number;
  pill: string;
  pillClass: string;
  pillTransform: string;
  lines: readonly string[];
}) {
  return (
    <div className="absolute flex flex-col gap-10" style={{ left, top: 291, width: 248 }}>
      <div className="flex items-center" style={{ width: 74.177 }}>
        <div style={{ transform: pillTransform }}>
          <div
            className={`flex h-10 w-[74px] items-center justify-center rounded-full ${pillClass}`}
          >
            <span
              className="whitespace-nowrap text-[16px]"
              style={{ lineHeight: "24px", letterSpacing: "-0.176px", fontFamily: "var(--font-inter-tight)" }}
            >
              {pill}
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-5">
        {lines.map((line, i) => (
          <Fragment key={line}>
            {i > 0 && <div className="h-px w-full bg-[#202124]" />}
            <p
              className="text-[16px] text-white/50"
              style={{
                ...CAP_TRIM,
                lineHeight: "22px",
                letterSpacing: "-0.176px",
                fontFamily: "var(--font-inter-tight)",
              }}
            >
              {line}
            </p>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
