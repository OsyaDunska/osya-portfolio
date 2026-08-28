import Link from "next/link";
import Image from "next/image";
import MusicAppGlow from "./MusicAppGlow";
import SideNav from "./SideNav";
import IconsBlock from "./IconsBlock";
import CardsBlock from "./CardsBlock";
import TypographyColors from "./TypographyColors";
import EfficiencyBlock from "./EfficiencyBlock";
import TakeawayBlock from "./TakeawayBlock";
import UserPersonas from "./UserPersonas";
import { fadeGradient, fadeGradientSolid, fadeSideMask } from "./fadeStyles";

// Figma "Glass" material (Light 60°/60%, Refraction 4, Depth 20, Dispersion 27,
// Frost 59, Splay 26) has no CSS equivalent, so these are baked-in PNG exports
// from Figma rather than a CSS approximation.
const headerIcons = [
  { src: "/icons/music-app/header-karaoke-icon.png", alt: "Karaoke" },
  { src: "/icons/music-app/header-volume-icon.png", alt: "Volume" },
  { src: "/icons/music-app/header-frequency-icon.png", alt: "Frequency" },
  { src: "/icons/music-app/header-karaoke-icon-2.png", alt: "Karaoke" },
];

const albumDetailMockup = "/mockups/music-app/mockup-album-detail-sonic-bloom.png";

// Real Figma diagram (pill nodes + ~15 custom-bent connector lines) exported
// as SVG — exact match, cheaper than reverse-engineering every connector's
// bezier path. Figma's export bakes in the page's own background rect, so
// that rect was stripped from the SVG to keep it transparent (the page glow
// behind this section needs to show through).
const informationArchitectureDiagram = "/diagrams/music-app/information-architecture.svg";

// User-provided transparent 2x export (1510x1780 for the 755x890 box), already
// cut out from its background — higher quality than Figma's own flattened PNG
// render of this mockup.
const handMockup = "/mockups/music-app/mockup-nowplaying-inhand.png";

// 2x export of Figma 65:2864, padded 73px a side for the frame's baked drop
// shadow: 1092x3674 for a 546x1837 box around the 400x1691 screen.
const newScreenMockup = "/mockups/music-app/new-screen-2x.png";

// 2x export of the "Playlist" frame: 704x1528 for a 352x764 box, no padding and
// no baked shadow, so it maps 1:1 onto its container.
const playlistScreenMockup = "/mockups/music-app/playlist-screen-2x.png";

// Card-elements section: Figma's two 632x632 Containers (6460:23237 and
// 6460:23242), exported whole at 2x. Each already has its phone mockup
// positioned and clipped inside — the mockup frames themselves overflow their
// container by a few hundred px, so exporting the containers rather than the
// mockups is what keeps the crop faithful.
const cardMockupBelow = "/mockups/music-app/card-mockup-below-2x.png";
const cardMockupHand = "/mockups/music-app/card-mockup-hand-2x.png";

// The device shot below Typography — Figma 6460:23264 "Container". Unlike the
// two above, this one is a single image fill, so the source bitmap came
// straight out of the file: 1254x1254 for a 632 box, i.e. 1.98x, with the
// background already transparent around the phone.
const newScreenDeviceMockup = "/mockups/music-app/new-screen-device-2x.png";

// The Library screen — Figma 6460:23267, a 400x1777 frame. Exported at 2x
// (800x3554) with the background already transparent, so it maps 1:1 onto its
// box with nothing to crop.
const libraryScreenMockup = "/mockups/music-app/library-screen-2x.png";

// The Radio screen beside it — Figma 6617:13226 "iPhone 17 Pro silver left
// label", a 400x870 frame. Exported at 2x, but unlike the Library one this
// export carries the screen's drop shadow: the solid body measures 800x1740
// inside a 960x1900 canvas, sitting at (80, 72). So at 1x there is 40 of room
// left and right, 36 above and 44 below — the shadow is thrown downward.
const radioScreenMockup = "/mockups/music-app/radio-screen-2x.png";

// The first gallery card is a video fill in Figma, and its clip is ready at
// /videos/new-screen-card1.mp4 with LazyAutoplayVideo to mount it. For now the
// card stays as the still frame baked into the screen export.
//
// When it goes back in, the artwork box is left 14.5607, top 200.675,
// 336.7154541015625 x 218.41, radius 14.5607 — Figma instance 65:2875 "Gallery"
// at 14.5607/14.5607 inside content-container 65:2874 at -0.03125/116.713, with
// children rendered at 336.7154541015625/370 of design size. Confirmed against
// the export: the artwork reads 200.7 -> 419.1 down the PNG.
//
// Its caption has to be redrawn over the video, and Figma trims those two lines
// to cap-height while the browser does not: the title's caps span y 368-380 (13)
// and the subtitle's 392-402 (11), against browser line boxes of 27.3 and 19.11.
// Without a negative block margin on each, the blurred panel runs 93.7 tall
// instead of ~71 and juts up over the video as a visible band.


// Solid #2A60E0 circles with a uniform Gaussian blur. Figma exports these as
// SVGs whose filter region sits at 2x sigma, so the `inset-[-43.48%]` style
// bleeds on each one work back to sigma 30 / 25 / 40 — which CSS blur()
// reproduces exactly, no image assets needed.
const STATS = [
  { label: "Recommendations", value: "23%", glowSize: 138, blur: 30, glowTop: 173.73 },
  { label: "Navigation", value: "17%", glowSize: 124.506, blur: 25, glowTop: 207.29 },
  { label: "Extra steps", value: "62%", glowSize: 230.36, blur: 40, glowTop: 51.79 },
];


// The shell uses overflow-x-clip rather than hidden: `hidden` would turn it
// into a scroll container and break the sticky header. Clipping here lets the
// glows spill past the 1440px frame and fade out at the real screen edge
// instead of being cut at the frame's boundary.
export default function MusicAppCase() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#000105] text-white">
      {/* The glows are absolutely positioned and nothing clips them vertically,
          so they hold the document open past the last section — where the white
          <body> would otherwise show through behind them. Clipping them instead
          would cut a hard edge through whichever glow is mid-body at that point.
          A fixed layer covers the viewport at any scroll position. */}
      <div aria-hidden className="fixed inset-0 -z-10 bg-[#000105]" />

      <div className="relative mx-auto max-w-[1440px]">
        <MusicAppGlow />

        <div className="relative z-10">
          {/* Only the back link follows the scroll; the icons and the case
              label belong to the top of the page and scroll away with it.
              The link lives in its own full-height overlay rather than in the
              header, because a sticky element can only travel inside its own
              containing block — left in the 88px header it would stick for 88px
              and then leave with it. The overlay spans the whole page, so the
              link runs its full length.
              `top-8` matches the header's own `pt-8`, so it starts exactly
              where it sits in the design and holds that offset once stuck. */}
          <div className="pointer-events-none absolute inset-0 z-30 px-[80px] pt-8">
            <div className="sticky top-8 flex h-14 items-center">
              <Link
                href="/"
                className="pointer-events-auto text-[16px] text-white/80 transition-colors hover:text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Back to All Works
              </Link>
            </div>
          </div>

          {/* The header and side menu sit on an 80px margin in Figma; the
              sections below keep their own 120px one. */}
          <header className="relative z-20 px-[80px] pt-8">
            <div className="relative flex h-14 items-center">
              {/* Figma puts this 248px-wide group at x=595.5. Inside the 80px
                  padding the centre lands at 596, hence the half-pixel nudge. */}
              <div className="absolute left-[calc(50%-0.5px)] flex -translate-x-1/2 items-center gap-2">
                {headerIcons.map((icon, i) => (
                  <Image
                    key={i}
                    src={icon.src}
                    alt={icon.alt}
                    width={56}
                    height={56}
                    className="size-14"
                  />
                ))}
              </div>

              <p
                className="ml-auto text-[16px] text-white/80"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Music App / 2025
              </p>
            </div>
          </header>

          {/* 801, not 800: Figma starts the next section's title at y=889. */}
          <div id="about-project" className="relative h-[801px]">
            <div className="absolute left-[80px] top-[180px] w-[176px]">
              <SideNav />
            </div>

            {/* Frame 2147238145 — page y 429, i.e. 341 inside this section. */}
            <div
              className="absolute flex flex-col items-end gap-4 text-right"
              style={{ left: 1124, top: 341, width: 236 }}
            >
              <p
                className="text-[52px] font-bold capitalize leading-none text-[#145afb]"
                // Figma trims this to cap-height (38px tall, not 52), which is
                // what puts the block's total at 73.
                style={{ fontFamily: "var(--font-inter)", marginBlock: -7.1 }}
              >
                Flowtune
              </p>
              <p
                className="text-[16px] text-white/60"
                style={{
                  fontFamily: "var(--font-inter)",
                  letterSpacing: "-0.176px",
                  lineHeight: "normal",
                }}
              >
                UI/UX Design
              </p>
            </div>

            <div className="absolute left-[284px] top-[138px] h-[498px] w-[872px] overflow-hidden">
              <Image
                src={albumDetailMockup}
                alt="Sonic Bloom album detail screen, phone mockup"
                fill
                sizes="872px"
                // Served as the original PNG. Even at quality 95 the optimizer
                // re-encodes this to WebP (900KB -> 122KB), and WebP's lossy
                // chroma handling bands visibly across the near-black gradients
                // that make up most of this shot.
                unoptimized
                className="object-cover"
              />
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute left-[434px] top-[614.55px] h-[29px] w-[545px]"
              style={{
                background: fadeGradient,
                WebkitMaskImage: fadeSideMask,
                maskImage: fadeSideMask,
              }}
            />
          </div>

          {/* Re-synced to Figma frame 6460:22983. Section starts at page y=889
              (the title) and runs to 1908, leaving User Personas at 2061.
              Figma trims its text boxes to cap-height, which the browser does
              not, so every paragraph carries a -5px block margin — without it
              each one runs 10px tall and the dividers drift. */}
          <section id="problem-solution" className="relative h-[1019px]">
            <h1
              className="absolute left-[120px] top-0 w-[222px] text-[48px] font-semibold leading-[1.15] text-white"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              Problem
              <br />& solution
            </h1>

            <div
              className="absolute w-[328px] text-[16px] text-white/50"
              style={{
                left: 728,
                top: 176,
                fontFamily: "var(--font-inter-tight)",
                letterSpacing: "-0.176px",
                marginBlock: -5,
              }}
            >
              <p className="leading-[22px]">Most listening sessions start with friction,</p>
              <p className="leading-[22px]">
                not music. Cluttered navigation, generic recommendations, and too many
                taps before
              </p>
              <p className="leading-[22px]">
                the first song plays — users lose momentum before they even start
                listening.
              </p>
            </div>

            <span
              className="absolute flex h-10 w-[84px] items-center justify-center rounded-full bg-[#21242c] text-[16px] text-white"
              style={{ left: 380, top: 274, fontFamily: "var(--font-inter-tight)" }}
            >
              Problem
            </span>

            <div
              className="absolute flex h-[288px] w-[896px] gap-4"
              style={{ left: 424, top: 346 }}
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="relative h-[288px] w-[288px] overflow-hidden rounded-full bg-[#202124]"
                >
                  <div
                    className="absolute left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: stat.glowSize,
                      height: stat.glowSize,
                      top: stat.glowTop,
                      background: "#2A60E0",
                      filter: `blur(${stat.blur}px)`,
                    }}
                  />
                  <p
                    className="absolute left-1/2 top-[133px] -translate-x-1/2 whitespace-nowrap text-[18px] text-white"
                    style={{
                      fontFamily: "var(--font-inter)",
                      letterSpacing: "-0.198px",
                      lineHeight: "normal",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="absolute left-1/2 top-[232px] -translate-x-1/2 whitespace-nowrap text-[16px] leading-6 text-white"
                    style={{ fontFamily: "var(--font-inter-tight)", letterSpacing: "-0.176px" }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Figma reports the rotated bounds (95.1 x 64.93) at 988.36,1547;
                at -18deg that resolves to an 87x40 pill centred on 1035.91,
                1579.47 — i.e. 992.41,670.47 inside this section. */}
            <span
              className="absolute flex h-10 w-[87px] items-center justify-center rounded-full bg-[#2a60e0] text-[16px] text-white"
              style={{
                left: 992.41,
                top: 670.47,
                fontFamily: "var(--font-inter-tight)",
                lineHeight: "32px",
                letterSpacing: "-0.176px",
                transform: "rotate(18deg)",
                boxShadow: "-1px 10px 16px 0px rgba(42,96,224,0.35)",
              }}
            >
              Solution
            </span>

            <div
              className="absolute flex flex-col gap-5 text-[16px] text-white/50"
              style={{
                left: 728,
                top: 744,
                width: 302,
                fontFamily: "var(--font-inter-tight)",
                letterSpacing: "-0.176px",
              }}
            >
              {/* Items 1 and 3 are broken by hand in Figma; 2 and 4 wrap on
                  their own at 302px. */}
              <div style={{ marginBlock: -5 }}>
                <p className="leading-[22px]">Simplified navigation reduces the steps</p>
                <p className="leading-[22px]">to start playback.</p>
              </div>
              <div className="h-px w-full bg-[#202124]" />
              <p className="leading-[22px]" style={{ marginBlock: -5 }}>
                Content prioritization surfaces relevant content first.
              </p>
              <div className="h-px w-full bg-[#202124]" />
              <div style={{ marginBlock: -5 }}>
                <p className="leading-[22px]">
                  A modular interface creates a consistent system across screens and
                  simplifies
                </p>
                <p className="leading-[22px]">interaction.</p>
              </div>
              <div className="h-px w-full bg-[#202124]" />
              <p className="leading-[22px]" style={{ marginBlock: -5 }}>
                Predictable interactions use consistent patterns to make actions easier
                to find and understand.
              </p>
            </div>
          </section>

          {/* Rebuilt against the newer Figma frame 6460:22983. Spans the
              title at y=2061 to where Information Architecture starts at
              y=3093, so the block that follows keeps its own coordinates. */}
          <section id="user-personas" className="relative mt-[153px] h-[981px]">
            <UserPersonas />
          </section>

          {/* Starts at Figma y=3042, so the gap from the Fears column's last
              line (2852) is the designed 190. Runs to the bottom of the rotated
              "New" screen (5004 + 1691 = 6695, i.e. 3653 in here). The
              "Playlist" screen still has to go back in below it, so this height
              will grow again. */}
          <section id="information-architecture" className="relative h-[3653px]">
            <div className="absolute left-[120px] top-0 flex w-[314px] flex-col gap-[32px]">
              <h2
                className="text-[48px] font-semibold leading-[1.15] text-white"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Information Architecture
              </h2>
              <p
                className="text-[16px] leading-[22px] text-white/50"
                style={{ fontFamily: "var(--font-inter-tight)", letterSpacing: "-0.176px" }}
              >
                How the app&apos;s core screens connect, and what each one is made of.
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG; next/image's optimizer doesn't serve raw SVGs without dangerouslyAllowSVG */}
            <img
              src={informationArchitectureDiagram}
              alt="Information architecture diagram: Home, New, Radio, and Library screen flows"
              className="absolute"
              style={{ left: 136.12, top: 312, width: 1167.76, height: 464 }}
            />

            {/* Figma 6460:23129 at frame y=3961.32; the section now starts at
                3042, so 919.32 inside it. The PNG is a 2x export (1510x1780)
                for the 755x890 box — same aspect, so object-contain fills it
                with no letterbox. */}
            <div
              className="absolute"
              style={{ left: 197.95, top: 919.32, width: 755, height: 890 }}
            >
              <Image
                src={handMockup}
                alt="Now Playing screen shown on a phone held in hand"
                fill
                sizes="755px"
                // Served as the original PNG, same as the album mockup above:
                // even at quality 95 the optimizer re-encodes this to an 8-bit
                // colormap (2.0MB -> 520KB), and 256 colours band visibly
                // across the near-black gradients around the hand.
                unoptimized
                className="object-contain"
              />
            </div>

            {/* Figma stacks these as big-then-small; the small one is the
                rotated Frame 2147238045, drawn on top. Together they fade the
                mockup's cut-off forearm into the page.
                6460:23130 — frame y=4521.55, i.e. 1479.55 inside this section. */}
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                left: -2.36,
                top: 1479.55,
                width: 1445,
                height: 360,
                background: fadeGradientSolid,
                WebkitMaskImage: fadeSideMask,
                maskImage: fadeSideMask,
              }}
            />
            {/* Frame 2147238045 — 685x296.08, rotation -30.25 in Figma's panel
                (counter-clockwise positive), i.e. +30.25deg in CSS.
                Figma's panel puts it at X -20.85, Y 4402.25; the section starts
                at 3042, so top = 1360.25.
                Do NOT take x/y from get_metadata for this node: for a rotated
                frame it reports x=128.3125, which is the panel's X plus
                296.08*sin(30.25) = 149.16 — the bounding box measured with the
                rotation mirrored. Only its y (4402.25) agrees with the panel.
                transform-origin is pinned to the top-left because Figma rotates
                about the layer's own origin, while CSS defaults to the centre;
                with that set, left/top are the panel's X/Y verbatim. */}
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                left: -20.85,
                top: 1360.25,
                width: 685,
                height: 296.08,
                background: fadeGradientSolid,
                WebkitMaskImage: fadeSideMask,
                maskImage: fadeSideMask,
                transformOrigin: "0 0",
                transform: "rotate(30.25deg)",
              }}
            />

            {/* "New" screen — Figma 65:2864, x 882 y 5004, 400x1691; the section
                starts at 3042, so top = 1962.
                The export is padded by 73px a side for the frame's baked drop
                shadow (1092x3674 at 2x = 546x1837 at 1x), so the image sits at
                -73/-73 at its full padded size and the container's own rounded
                rect clips the padding away. Radius + overflow:hidden here is
                what guarantees the corners: the PNG's corners are transparent,
                but relying on that alone left square edges on earlier exports.
                The baked shadow is dropped and redrawn in CSS — in 8-bit it
                steps one unit at a time and bands visibly on the near-black
                page. */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: 882,
                top: 1962,
                width: 400,
                height: 1691,
                borderRadius: 34,
                boxShadow: "0px 0px 60px 13px rgba(0,13,36,0.6)",
              }}
            >
              <Image
                src={newScreenMockup}
                alt="New screen showing curated playlists, latest songs, and new releases"
                width={546}
                height={1837}
                // Original PNG: the optimizer re-encodes to an 8-bit colormap,
                // which bands across this screen's dark gradients.
                unoptimized
                className="absolute max-w-none"
                style={{ left: -73, top: -73 }}
              />
            </div>

            {/* "Playlist" screen — Figma's panel: X 230, Y 5338, 352x764,
                rotation 0, corner radius 30. The section starts at 3042, so
                top = 2296.
                overflow:hidden keeps the corners rounded whatever the PNG's own
                corners do — measuring the radius off the export's alpha read 33,
                three too many, so the panel value is the one to trust. */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: 230,
                top: 2296,
                width: 352,
                height: 764,
                borderRadius: 30,
              }}
            >
              <Image
                src={playlistScreenMockup}
                alt="Skyline by Jaylen Cross album detail screen with play and shuffle controls"
                width={352}
                height={764}
                unoptimized
                className="absolute inset-0 max-w-none"
              />
            </div>
          </section>

          {/* Icons — Figma puts the title block at y 6891 and the grid at 7142,
              so the section runs 6891..7286 and starts 196 below the one above
              (which ends at 6695). Both blocks are centred on the 1440 frame:
              the title is 346 wide at x 547, the grid 388 at x 526. */}
          <section id="icons" className="relative mt-[196px] h-[385px]">
            <div className="absolute left-[547px] top-0 w-[346px] text-center">
              <h2
                className="text-[48px] font-semibold leading-[1.15] text-white"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Stylish Icons
              </h2>
              {/* 6460:23248 — y 99, i.e. 44 below the 55-tall title, in a
                  56-tall box. Figma trims it to cap-height and baseline, so its
                  three 22 lines measure 56 rather than 66; the margins do that
                  inside a flow-root wrapper, which is what carries the position
                  (they cannot go on an absolutely positioned <p> without moving
                  it). The <br /> is Figma's own break, after "radio,". */}
              <div
                className="absolute left-0 top-[99px]"
                style={{ width: 346, display: "flow-root" }}
              >
                <p
                  className="text-[16px] text-white/60"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    lineHeight: "22px",
                    letterSpacing: "-0.176px",
                    marginTop: -5.6,
                    marginBottom: -4.8,
                  }}
                >
                  A consistent icon set that keeps actions instantly recognizable — search,
                  shuffle, radio,
                  <br />
                  and more — without extra labels.
                </p>
              </div>
            </div>

            <div className="absolute left-[526px] top-[241px]">
              <IconsBlock />
            </div>
          </section>

          {/* Card elements — Figma 6460:23236 puts the pair of containers at
              y 7390 and the paragraph at 8174, so the section runs 7390..8252,
              104 below the icons (which end at 7286). There is no title node for
              this one in the frame; the paragraph stands alone.
              Radius 47 measured off the exports' alpha; overflow:hidden keeps the
              corners rounded whatever the PNGs' own corners do. */}
          <section id="ui-card-elements" className="relative mt-[86px] h-[852px]">
            {[
              { src: cardMockupBelow, left: 80, alt: "New screen on an iPhone shot from below" },
              { src: cardMockupHand, left: 728, alt: "Search screen on an iPhone held in hand" },
            ].map((card) => (
              <div
                key={card.src}
                className="absolute top-0 overflow-hidden"
                style={{ left: card.left, width: 632, height: 632, borderRadius: 47 }}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={632}
                  height={632}
                  // Served as the original PNG, same as the other mockups here:
                  // the optimizer's re-encode bands across the dark screens.
                  unoptimized
                  className="absolute inset-0 max-w-none"
                />
              </div>
            ))}

            {/* 6460:23235 — one of the page's six body paragraphs, all Inter
                Tight Regular 16/22 at white 60% with -0.176 tracking. Trimmed
                to cap-height and baseline like the rest, so its four 22 lines
                measure 78 rather than 88 — hence the flow-root wrapper, which
                carries the position while the margins do the trim. */}
            <div
              className="absolute"
              style={{ left: 728, top: 774, width: 314, display: "flow-root" }}
            >
              <p
                className="text-[16px] text-white/60"
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  lineHeight: "22px",
                  letterSpacing: "-0.176px",
                  marginTop: -5.6,
                  marginBottom: -4.8,
                }}
              >
                Reusable card components adapt to different content types — albums,
                playlists, and artist collections — while keeping one consistent visual
                language.
              </p>
            </div>
          </section>

          {/* The card set — Figma 6460:23040, x 80 y 8342, 1280x664, so 90 below
              the section above (which ends at 8252). */}
          <section id="card-set" className="relative mt-[90px] h-[664px]">
            <CardsBlock />
          </section>

          {/* Typography & Colors — starts 200 below the card set (which ends at
              8968) and runs 9168..10972, where the specimen group (6611:26415)
              ends. */}
          <section id="typography-colors" className="relative mt-[200px] h-[1804px]">
            <TypographyColors />
          </section>

          {/* The "New" screen on a device — Figma 6460:23263, x 417.64
              y 11167.55, 604x538.95, so 195.55 below Typography (which ends at
              10972).
                 The container (6460:23264) is 604x527 and clips its fill. The
              fill is the same 604-square shot as before — byte for byte, so no
              re-export — but it now hangs 14.62% of the container above its top
              and is cut there: the design crops the phone's head rather than
              showing the whole square. Percentages rather than pixels below
              because that is how Figma states it, and they resolve against the
              container: -14.62% of 527 is -77.05, 114.62% is 604.05. */}
          <section id="new-screen-device" className="relative mt-[195.55px] h-[538.95px]">
            <div
              className="absolute overflow-hidden"
              style={{ left: 417.636, top: 0, width: 604, height: 527 }}
            >
              <Image
                src={newScreenDeviceMockup}
                alt="The New screen running on an iPhone"
                width={604}
                height={604}
                // Same as the other mockups here: the optimizer's re-encode
                // bands across the dark screen.
                unoptimized
                className="absolute max-w-none"
                style={{ left: "0.06%", top: "-14.62%", width: "100%", height: "114.62%" }}
              />
            </div>

            {/* Figma 6460:23265 — the fade that blends the phone's cut-off
                bottom into the page. Solid to the bottom, not the tailed ramp:
                the mockup is opaque right to the crop, so a tail would uncover
                it. The side mask stays: this box is 520.877 wide against a 1440
                frame, and vector-34 runs behind it, so without feathering its
                left and right edges read as straight vertical lines. */}
            <div
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                left: 463.876,
                top: 415.655,
                width: 520.877,
                height: 123.29,
                background: fadeGradientSolid,
                WebkitMaskImage: fadeSideMask,
                maskImage: fadeSideMask,
              }}
            />
          </section>

          {/* Efficiency & Consistency — Figma 6460:23321 (the app icon) through
              6460:23336 (the album caption), y 11874..12830, so 167.504 below
              the device shot, which ends at 11706.496. */}
          <section id="efficiency-consistency" className="relative mt-[167.504px] h-[956px]">
            <EfficiencyBlock />
          </section>

          {/* The two full screens — Figma 6460:23267 "Library" at x 882 y 13000,
              400x1777, and 6617:13226 "Radio" at x 204.64 y 13334.85, 400x870.
              The section spans the taller of the two, 13000..14777, so 170
              below Efficiency (which ends at 12830). */}
          <section id="library-screens" className="relative mt-[170px] h-[1777px]">
            <Image
              src={radioScreenMockup}
              alt="The Radio screen, showing live stations and recently played tracks"
              width={480}
              height={950}
              unoptimized
              className="absolute max-w-none"
              // Placed by the shadow's offsets, not the screen's own box: the
              // 400x870 frame starts at 204.64 / 13334.85, so the export hangs
              // 40 to its left and 36 above it.
              style={{ left: 204.64 - 40, top: 13334.85 - 36 - 13000, width: 480, height: 950 }}
            />
            <Image
              src={libraryScreenMockup}
              alt="The Library screen, listing search shortcuts and recently played albums"
              width={400}
              height={1777}
              // Served as the original PNG, like the other screens here: the
              // optimizer's re-encode bands across the dark background.
              unoptimized
              className="absolute top-0 max-w-none"
              style={{ left: 882 }}
            />
          </section>

          {/* The Takeaway — Figma 6460:23014 (the title) through 6460:23450
              (the small screen bottom right) and 6460:23441 (the closing
              frame), y 14973..16668 (the frame's own bottom, which clips the closing
              frame short), so 196 below the Library screens, which
              end at 14777. The closing frame carries the page's last 598px and
              is painted before 6460:23450, which is what keeps that screen on
              top of the word behind it. */}
          <section id="takeaway" className="relative mt-[196px] h-[1695px]">
            <TakeawayBlock />
          </section>
        </div>
      </div>
    </div>
  );
}
