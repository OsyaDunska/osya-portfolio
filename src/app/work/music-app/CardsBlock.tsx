import Image from "next/image";
import LazyAutoplayVideo from "@/components/LazyAutoplayVideo";
import { squircleClip, squirclePath } from "./squircle";

// Figma 6460:23040 "Group 1597880835" — the card set, x 80 y 8342, 1280x664.
//
// Artwork comes from flattened 2x composites rather than the raw fill stacks.
// get_design_context hands each card back as several stacked <img> layers (the
// video thumbnail alone is seven, one of them mix-blend-luminosity), which is
// how Figma decomposes a single image fill with effects. Compositing them once,
// offline, beats shipping sixteen requests and reproducing blend modes in CSS —
// and the sources are large enough to composite at 2x, so this is sharper than
// Figma's own 1x node render would be.
const BASE = "/mockups/music-app/";
const ART = {
  chasingStars: BASE + "card-song-chasing-stars-2x.png",
  rhythm: BASE + "card-song-rhythm-2x.png",
  video: BASE + "card-video-chillwave-2x.png",
  interview: BASE + "card-interview-groove-lab-2x.png",
  mellowVibes: BASE + "card-mellow-vibes-2x.png",
};

// The "Mellow Acoustic" card is a video fill in Figma, which is why the node
// came back through the API with its title panel and no image at all. Recorded
// off the canvas and transcoded to 728x540 — the card is 370x240, so that is 2x
// with a little room for the cover crop (the source is 4:3, the card is wider,
// so it fills on width and crops top and bottom).
const MELLOW_ACOUSTIC_VIDEO = "/videos/card-mellow-acoustic.mp4";

// Every card in this set is rounded to 20 with corner smoothing at 59% — the
// iOS radius, and what the design has. Sizes are fixed per card, and the path is
// built in px, so each one gets its own.
const SMOOTHING = 0.59;
const clip = (w: number, h: number) => squircleClip(w, h, 20, SMOOTHING);
const CLIP = {
  song: clip(180, 180),
  music: clip(370, 240),
  video: clip(152, 104),
  interview: clip(200, 110),
  playlist: clip(212, 258),
};

/**
 * The card outline, drawn rather than bordered.
 *
 * A CSS `border` was wrong on two counts. It follows `border-radius`, not the
 * smoothed corner the card is clipped to; and it paints on the element itself,
 * so an absolutely positioned artwork at `inset: 0` stops at the padding box —
 * the image ended 1px short on every side and a semi-transparent stroke
 * composited against the page instead of against the artwork, which is what
 * made these read darker and flatter than the design.
 *
 * Figma draws the stroke inside the frame, over the fill. This does the same:
 * the artwork now runs the full box, and the outline is the very same squircle
 * path stroked at width 2 — the outer half falls outside the parent's clip and
 * is cut, leaving exactly 1px hugging the clipped edge.
 */
function CardStroke({
  w,
  h,
  color,
  opacity,
  gradient,
  id,
}: {
  w: number;
  h: number;
  color: string;
  opacity?: number;
  /** Two stops plus the gradient axis, in the card's own coordinates. */
  gradient?: { from: string; to: string; x2: number; y2: number };
  id?: string;
}) {
  const gid = `card-stroke-${id}`;
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
    >
      {gradient && (
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2={gradient.x2} y2={gradient.y2} gradientUnits="userSpaceOnUse">
            <stop stopColor={gradient.from} />
            <stop offset="1" stopColor={gradient.to} />
          </linearGradient>
        </defs>
      )}
      <path
        d={squirclePath(w, h, 20, SMOOTHING)}
        stroke={gradient ? `url(#${gid})` : color}
        strokeOpacity={opacity}
        strokeWidth={2}
      />
    </svg>
  );
}

const FONT_INTER = "var(--font-inter)";
const FONT_TIGHT = "var(--font-inter-tight)";

/** The 14px bold title + light artist pair that sits under most of these cards. */
function CardCaption({ title, sub, width = 179 }: { title: string; sub: string; width?: number }) {
  return (
    // Figma gives each of these lines a 17-tall box, which is the face's
    // ascent + descent at 14px; the browser's `normal` adds the line gap on top
    // and renders 19, making the pair 48 instead of 40. See the note on the
    // Titles block below — same cause, and there it pushed a whole card down.
    <div className="flex flex-col gap-1.5 text-[14px]" style={{ width, lineHeight: "17px" }}>
      <p className="whitespace-nowrap font-bold text-white" style={{ fontFamily: FONT_INTER }}>
        {title}
      </p>
      <p
        className="whitespace-nowrap text-white/80"
        style={{ fontFamily: FONT_TIGHT, fontWeight: 300 }}
      >
        {sub}
      </p>
    </div>
  );
}

/** Figma 6460:23063 — seven rounded bars, played over the second song card. */
const SOUND_BARS = [
  { w: 3.329, h: 11.096 },
  { w: 3.236, h: 20.065 },
  { w: 3.329, h: 13.315 },
  { w: 3.329, h: 6.658 },
  { w: 3.329, h: 15.534 },
  { w: 3.236, h: 11.003 },
  { w: 3.329, h: 13.315 },
];

function SoundBars() {
  return (
    <div
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
      style={{ gap: 2.219, height: 19.973 }}
    >
      {SOUND_BARS.map((bar, i) => (
        <div
          key={i}
          className="shrink-0 bg-white"
          style={{ width: bar.w, height: bar.h, borderRadius: 110.959 }}
        />
      ))}
    </div>
  );
}

function SongCard({
  art,
  alt,
  title,
  sub,
  bars = false,
}: {
  art: string;
  alt: string;
  title: string;
  sub: string;
  bars?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative size-[180px] overflow-hidden"
        style={{ borderRadius: 20, clipPath: CLIP.song }}
      >
        <Image src={art} alt={alt} width={180} height={180} className="absolute inset-0 size-full object-cover" />
        {bars && <SoundBars />}
        <CardStroke w={180} h={180} color="rgb(89,92,110)" opacity={0.6} id={title.replace(/\W/g, "")} />
      </div>
      <CardCaption title={title} sub={sub} />
    </div>
  );
}

export default function CardsBlock() {
  return (
    <>
      {/* "New song card" — 6460:23043, x 80 y 8304, w 370. */}
      <div className="absolute left-[80px] top-0 flex w-[370px] flex-col gap-4">
        {/* Titles — 6460:23044, 219x78: three lines of 19 / 24 / 19 with 8
            between. Those heights are each face's ascent + descent at its size;
            the browser's `normal` adds the font's line gap on top and rendered
            24 / 30 / 24, making the block 94. That is what pushed the artwork
            below to 8414 while every other card in the set starts at 8398 —
            the misalignment, not the gap, which was 16 all along. */}
        <div className="flex w-[219px] flex-col gap-2">
          <p
            className="whitespace-nowrap text-[16px] uppercase leading-[19px] text-white/80"
            style={{ fontFamily: FONT_TIGHT }}
          >
            Soundtrack the season
          </p>
          <p
            className="whitespace-nowrap text-[20px] font-medium leading-[24px] text-white"
            style={{ fontFamily: FONT_INTER }}
          >
            Winter warmers
          </p>
          <p
            className="whitespace-nowrap text-[16px] capitalize leading-[19px] text-white/80"
            style={{ fontFamily: FONT_TIGHT }}
          >
            Apple music chill
          </p>
        </div>

        <div
          className="relative flex h-[240px] w-full flex-col justify-end overflow-hidden bg-[#d7d7da]"
          style={{ borderRadius: 20, clipPath: CLIP.music }}
        >
          <LazyAutoplayVideo
            src={MELLOW_ACOUSTIC_VIDEO}
            className="absolute inset-0 size-full object-cover"
          />
          {/* Knocks the footage back so the title panel over it reads. Sits
              between the video and the panel, so the panel's own blur and
              gradient still work off the darkened image. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "rgba(0,0,0,0.15)" }}
          />
          {/* Figma 6460:23049 "Title". */}
          <div
            className="relative flex w-full flex-col justify-end rounded-t-[20px] p-4"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              backgroundImage:
                "linear-gradient(179.886deg, rgba(116,116,116,0) 0.357%, rgba(107,107,107,0.32) 95.165%)",
            }}
          >
            <div className="flex w-full flex-col gap-3 text-white">
              {/* 24, not `normal`: 20px Inter's ascent + descent. `normal` adds
                  the line gap and renders 30, which alone made the panel 6
                  taller than the design. */}
              <p
                className="whitespace-nowrap text-[20px] font-extrabold leading-[24px]"
                style={{ fontFamily: FONT_INTER }}
              >
                Mellow Acoustic
              </p>
              {/* Figma trims this one to cap-height on top and to the baseline
                  underneath — its own export says so, as
                  `text-box-trim: trim-both; text-box-edge: cap alphabetic`.
                  That property only landed in Chrome 133 / Safari 18.2 and is
                  still missing in Firefox, so the trim is done with margins,
                  measured off Inter Tight at 14px (ascent 14, descent 3, cap
                  10.19, line-height 20, so half-leading 1.5):
                    top    1.5 + (14 - 10.19) = 5.31
                    bottom 3 + 1.5           = 4.5
                  Two lines of 20 minus those is 30.19 against the untrimmed 40,
                  and the panel lands at 98 like the design instead of 114.
                  The margins go on the <p> inside a flow-root wrapper: on the
                  flex item itself they would have eaten into the 12 gap, and
                  without the wrapper's own block formatting context they would
                  collapse straight through it. */}
              <div style={{ display: "flow-root" }}>
                <p
                  className="text-[14px] leading-5"
                  style={{ fontFamily: FONT_TIGHT, marginTop: -5.31, marginBottom: -4.5 }}
                >
                  Willow Creek, River Wilde, The Northern Lights, Misty Mountains
                </p>
              </div>
            </div>
          </div>
          {/* Figma reports this stroke as the flat #595C6E, but that is only its
              dark end: rendering the node and reading the outline shows a
              gradient running #C0C7EE at the top-left to #5A5D6F at the
              bottom-right — 238 down to 111 in blue, far too wide a range to be
              anything else, and the hue is constant throughout. The axis comes
              from fitting the perimeter samples: the value falls 0.257 per px
              across and 0.133 per px down, i.e. right and 27 degrees down. */}
          <CardStroke
            w={370}
            h={240}
            color="#595c6e"
            gradient={{ from: "#C0C7EE", to: "#5A5D6F", x2: 390, y2: 202.5 }}
            id="mellow-acoustic"
          />
        </div>
      </div>

      {/* Frame 2147237677 — 6460:23053, x 606 y 8436 (94 into the block). */}
      <div className="absolute left-[606px] top-[94px] flex items-start" style={{ gap: 226 }}>
        <div className="flex items-center gap-4">
          <SongCard
            art={ART.chasingStars}
            alt="Astral poster artwork"
            title="Chasing Stars"
            sub="The Night Owls"
          />
          <SongCard
            art={ART.rhythm}
            alt="Portrait in red light"
            title="Rhythm of the Night"
            sub="DJ Dreamer"
            bars
          />
        </div>

        <div className="flex w-[152px] flex-col gap-4">
          <div
            className="relative h-[104px] w-full overflow-hidden"
            style={{ borderRadius: 20, clipPath: CLIP.video }}
          >
            <Image
              src={ART.video}
              alt="Chillwave video thumbnail"
              width={152}
              height={104}
              className="absolute inset-0 size-full object-cover"
            />
            <CardStroke w={152} h={104} color="rgb(197,197,197)" opacity={0.4} id="chillwave" />
          </div>
          <CardCaption title="Chillwave, Indie Pop" sub="Kai Wachi" width={152} />
        </div>
      </div>

      {/* Frame 2147237678 — 6460:23079, x 419 y 8748 (406 into the block).
          Its two cards are 166 and 258 tall and vertically centred, which is
          what puts the interview card 46 down. */}
      <div
        className="absolute left-[419px] top-[406px] flex items-center justify-between"
        style={{ width: 781.516 }}
      >
        <div className="flex w-[200px] flex-col gap-4">
          <div
            className="relative h-[110px] w-full overflow-hidden"
            style={{ borderRadius: 20, clipPath: CLIP.interview }}
          >
            <Image
              src={ART.interview}
              alt="The Groove Lab interview thumbnail"
              width={200}
              height={110}
              className="absolute inset-0 size-full object-cover"
            />
            <CardStroke w={200} h={110} color="rgb(89,92,110)" opacity={0.4} id="groove-lab" />
          </div>
          <CardCaption title="The Groove Lab" sub="DJ Serenity" />
        </div>

        <div
          className="relative flex h-[258px] w-[212px] flex-col justify-end overflow-hidden"
          style={{ borderRadius: 20, clipPath: CLIP.playlist }}
        >
          <Image
            src={ART.mellowVibes}
            alt="Mellow Vibes playlist artwork"
            width={212}
            height={258}
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="relative flex w-full flex-col justify-center"
            style={{
              padding: "18px 14px",
              backdropFilter: "blur(8.87px)",
              WebkitBackdropFilter: "blur(8.87px)",
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 52.062%)",
            }}
          >
            <div className="flex w-[184px] flex-col gap-3">
              <p
                className="whitespace-nowrap text-[20px] font-extrabold leading-normal text-white"
                style={{ fontFamily: FONT_INTER }}
              >
                Mellow Vibes
              </p>
              <p
                className="text-[14px] leading-5 text-white/80"
                style={{ fontFamily: FONT_TIGHT }}
              >
                Lana Del Rey, Lord Huron, Bon Iver, Fleet Foxes
              </p>
            </div>
          </div>
          {/* 6460:23085. The stroke went from the near-black rgba(10,17,54,0.8)
              to this light blue-grey, so the card now reads as outlined rather
              than edge-to-edge. Unlike the first card's, this one measures flat:
              solving the render's outline against the artwork behind it lands
              between (110,116,153) and (100,111,166) around the perimeter,
              which is Figma's own value within the noise of the estimate. */}
          <CardStroke w={212} h={258} color="rgb(102,109,147)" opacity={0.8} id="mellow-vibes" />
        </div>
      </div>
    </>
  );
}
