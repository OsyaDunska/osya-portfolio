import Image from "next/image";

type Glow = {
  src: string;
  top: number;
  left: number;
  width: number;
  height: number;
  /** CSS degrees — the negative of Figma's panel value, which counts the other
   *  way round. Set it and left/top/width/height describe the node box rather
   *  than the exported image, and `bleed` says how far the image overhangs it. */
  rotate?: number;
  /** How far the blurred export extends past the node box on every side. */
  bleed?: number;
  /** Fades the glow out over this span (percentages of its own height) so it
   *  cannot show below a section's dark gradient and leave a visible edge. */
  fadeOut?: [start: number, end: number];
};

// Real SVG exports from Figma, not a CSS approximation: each shape is an
// irregular bezier path with a linear gradient (#01163F -> hard-stop ->
// #000105 -> #01163F@60%) and its own Gaussian blur baked in.
//
// Two things had to be corrected on every export:
//
// 1. Figma bakes the page background into the file (a full-canvas #000105
//    rect plus a clip path). Both were stripped so the glows composite over
//    whatever is actually behind them.
// 2. Figma sizes the filter region at 2x the blur's standard deviation, but a
//    Gaussian needs ~3x to reach zero — so every glow was being cut off mid
//    falloff, leaving a faint hard rectangle on all four sides. The filter
//    region and viewBox were grown to ~3.5x sigma, and each glow's left/top
//    shifted by the same amount so nothing moved on screen.
//
// Positions come from the transform inside each export's own clip rect, which
// states where the SVG origin sits in frame coordinates. That is more reliable
// than get_metadata's bounding box, which for the rotated shapes reports areas
// well outside the 1440-wide frame.
//
// 3. Layer opacity. Figma bakes it into the export as `fill-opacity` on the
//    path, so an export's vintage decides how strong the glow reads. Every one
//    of these shapes uses the identical ramp (#01163F -> #000105 -> #01163F at
//    60%) and differs only in that one number, which is what made some read
//    washed out next to others. Vector 3 (6460:24461) is the reference here,
//    and the export in use renders it at 1.0, so Vector 27, 31 and 35 were
//    brought to 1.0 to match — geometry, viewBox and filter region untouched,
//    so nothing moved. Note that node 6460:24461 itself now exports at 0.8: if
//    the reference is ever re-exported it will drop, and the durable fix is to
//    give these layers one opacity in Figma.
//
// Nothing else is applied on top: no blend mode, no CSS filter, no noise or
// dither overlay, no per-shape opacity. Earlier attempts at those (to chase
// gradient banding) were reverted in full and are not what these files carry.
//
// The first five entries are exports that predate the design being reworked by
// hand, and their bodies no longer solve against their nodes' current bounding
// boxes (cos^2 + sin^2 comes out 1.03, 0.94, 0.79, 9.29 and 2.18 instead of 1).
// They are kept because they are what lights the top half of the page — without
// them the hero, User Personas, Information Architecture, the hand mockup and
// the New/Playlist screens all go flat black. Replacing them means fresh
// exports plus re-derived rotation, which is its own job; until then these
// stand, and the numbers above are the reason not to trust them as a reference
// for anything else.
const GLOWS: Glow[] = [
  { src: "/glows/music-app/vector-32.svg", left: -149.88, top: -716.58, width: 1534.36, height: 1763.79 },
  // User personas (6460:22994). Its own falloff runs to y=3246, past the
  // section's dark gradient (2758..2983), which left it showing below the
  // gradient with a hard edge where the gradient ended. Measuring Figma's own
  // render, this glow peaks at y=2680 and is gone by 2920 — so it fades across
  // 2860..2983, keeping the peak intact while ending exactly at the gradient's
  // bottom edge. An earlier 2508..2758 fade cut the peak to a third and made
  // the glow all but invisible.
  {
    src: "/glows/music-app/vector-36.svg",
    left: 140.94,
    top: 1712.72,
    width: 2072.66,
    height: 1533.35,
    fadeOut: [74.8, 82.8],
  },
  // Information Architecture (6460:23007).
  { src: "/glows/music-app/vector-3-ia.svg", left: -167.98, top: 2762.73, width: 1724.28, height: 1423.28 },
  // Behind the hand mockup; kept from spilling below it.
  { src: "/glows/music-app/vector-33.svg", left: -313.32, top: 3281.7, width: 1615.59, height: 1682.12 },
  // Behind the "New" / "Playlist" screens (Figma 6460:24461, "Vector 3").
  { src: "/glows/music-app/vector-3b.svg", left: -510.64, top: 4609.44, width: 1936.03, height: 2102.97 },
  // Behind the icons grid and the card-elements section — the reworked
  // "Vector 31" (Figma 65:2723). Panel: X -39.61, Y 6423.59, 810.7x1382.64,
  // rotation 21.22. Replaces 6460:22992, which was larger and unrotated; that
  // export stays on disk as vector-31.svg.
  // The export is 1291.37x1863.31, the box plus 240.335 of blur a side, which
  // is the -29.65%/-17.38% inset Figma reports.
  {
    src: "/glows/music-app/vector-31.svg",
    left: -81.24,
    top: 6696.348,
    width: 810.7,
    height: 1382.64,
    rotate: -21.22,
    bleed: 564.785,
  },
  // Under the card set — the reworked "Vector 27" (Figma 65:2719 in the current
  // file). Its panel reads X -157.41, Y 7512.28, 931.65x1588.93, rotation 21.22.
  // Replaces the older 6460:22988 shape, which was a different size and
  // unrotated; that export is still on disk as vector-27.svg.
  // The export is 1608.62x2265.9, i.e. the box plus 338.485 of blur on each
  // side — matching the -36.33%/-21.3% inset Figma reports for it.
  // Figma's panel and get_metadata are two different anchors on the same layer,
  // and both are correct once you know which is which:
  //
  //   panel X / Y      the top-left of the ROTATED bounding box
  //   metadata x / y   the untransformed top-left corner
  //
  // They differ by exactly W*sin(21.22): 337.21 for Vector 27, 293.43 for
  // Vector 31, and 149.16 across x for the smoke frame at 30.25. Rotating about
  // `transform-origin: 0 0` needs the untransformed corner, so left/top below
  // are the metadata pair — which lands the bounding box on the panel's X/Y,
  // the position the layer actually shows in Figma.
  //
  // The exports are the unrotated bodies: their exact path bounds measure
  // 931.7x1588.9 and 810.7x1382.6, matching the panel's W/H rather than the
  // rotated extents, so the rotation does have to be applied here. Figma counts
  // rotation the opposite way round from CSS, hence the negated angle.
  //
  // These use the older exports rather than the v2 pair, which are the same
  // path — byte for byte — but come out of Figma with the filter region flush
  // against the shape (x=0 y=0). At sigma 169 and 120 the Gaussian then has
  // nowhere to spread and is clipped at the edge, which left both glows barely
  // visible. The older files carry 2.70 sigma of room around the same path, so
  // `bleed` here is the v2 overhang plus that padding: 338.485 + 456.95, and
  // 240.335 + 324.45 below. Sizes work out to the exports' own 2522.52x3179.8
  // and 1940.27x2512.21, so nothing moves.
  {
    src: "/glows/music-app/vector-27.svg",
    left: -157.41,
    top: 7721.539,
    width: 931.65,
    height: 1588.93,
    rotate: -21.22,
    bleed: 795.435,
  },
  // Beside Typography & Colors — "Vector 35" (Figma 65:2720).
  //
  // Placed from the node's bounding box, not its panel X/Y, because for this
  // one the two disagree outright: the panel reads X 366.51 / Y 9439.41 with
  // rotation -118.88, while get_metadata reads x 1542.84 / y 9843.32,
  // 1176.33x1209 — and 366.51 cannot sit inside a box that starts at 1542.84.
  // The metadata agrees across both Figma files and with this placement, which
  // is the one that was already here.
  //
  // Solving the bounding box for the rotation gives 61.12deg, not 118.88: with
  // a 919.46x836.24 body, |cos| and |sin| that satisfy both 919.46c + 836.24s =
  // 1176.33 and 919.46s + 836.24c = 1209 come out at 0.4830 / 0.8756. The
  // v2 export bakes that rotation into its path, so no CSS transform is needed.
  // Beside Typography & Colors — "Vector 35" (Figma 6460:22989), rotated like
  // the two above. Panel: X 366.51, Y 9331.41, 919.46x836.24, rotation -118.88;
  // metadata origin 1542.839 / 9733.320. Rotating by +118.88 about that origin
  // puts the bounding box at 366.34 / 9331.12 — the panel's own X/Y, which is
  // the check that the pair line up.
  // Same export swap as the others: the v2 file has its filter region flush
  // against the shape, so the blur is clipped and the glow all but disappears.
  // vector-35.svg is the identical path with 2.70 sigma of room, hence a bleed
  // of 338.48 + 456.95 and an image of 2510.32x2427.1.
  {
    src: "/glows/music-app/vector-35.svg",
    left: 1542.839,
    top: 9733.32,
    width: 919.46,
    height: 836.24,
    rotate: 118.88,
    bleed: 795.43,
  },
  // Behind Typography & Colors, low and to the right — "Vector 34"
  // (Figma 6460:22990).
  //
  // The export that was sitting on disk under this name was a DIFFERENT shape:
  // its path and gradient don't match the node in the current file, and its
  // body works out to 775.79 wide against today's 583.76. The design changed
  // under it, so both the file and the coordinates were re-fetched.
  //
  // The node reports no rotation directly, so it comes out of the geometry.
  // get_metadata gives the rotated bounding box, 1304.700x1383.306; the export
  // gives the body, 583.758x1322.348 (1034.55x1773.14 minus 2 sigma of blur a
  // side, matching the -17.05%/-38.61% inset Figma reports). Solving
  //   W*cos + H*sin = 1304.700 and W*sin + H*cos = 1383.306
  // gives cos 0.75832 / sin 0.65189 — which square to 1.000008, so the pair is
  // consistent — i.e. 40.68 degrees.
  //
  // Of the two signs, only CSS -40.68 puts the shape where the design has it.
  // Rendering the whole Figma frame and sampling it, the glow's bright end
  // lands around x 960..1320 at y 10800..10900 and the left edge of the page is
  // untouched there; +40.68 would swing the body out to x -715..443 instead.
  //
  // Padding as with the others: Figma sizes the filter region at 2 sigma, which
  // clips a Gaussian mid-falloff, so the export was re-issued with 2.70 sigma
  // more room (304.29) on every side. bleed is therefore 225.396 + 304.29.
  {
    src: "/glows/music-app/vector-34.svg",
    left: 147.148,
    top: 10143.786,
    width: 583.758,
    height: 1322.348,
    rotate: -40.68,
    bleed: 529.686,
  },
  // Behind the Library and Radio screens — the second "Vector 27"
  // (Figma 6460:22985), a different node from the one under the card set.
  //
  // Same derivation as Vector 34. get_metadata gives the rotated bounding box,
  // 1349.33x2039.66; the export gives the body, 967.42x1874.94 (1393.28x2300.93
  // less 2 sigma of blur a side, matching the -11.36%/-22.01% inset). Solving
  // the pair gives cos 0.97649 / sin 0.21582 — squaring to 1.00012 — i.e.
  // 12.45 degrees.
  //
  // The sign comes from the shape's lean. This body is tall, so its long axis
  // is its own +y; rendering the node and taking the brightest pixel per row
  // shows the ridge drifting right as it descends (x 90 near the top, 350 in
  // the middle, 900 low down). CSS -12.45 sends local +y down AND right; +12.45
  // would send it down and left.
  // Behind Efficiency & Consistency — "Vector 29" (Figma 6460:22984). A
  // different node from the Vector 29 under the Takeaway, and one that had
  // never been on the page at all.
  //
  // Body 928.35x530.59 against a 743.10x1030.50 bounding box gives cos 0.24656
  // / sin 0.96911, squaring to 0.99997, i.e. 75.73 degrees.
  //
  // The sign came from the page, not from the shape. The lean test that settled
  // the other rotated glows says the opposite here — the node's own render has
  // its brightest pixel drifting LEFT as it descends, which reads as -75.73 —
  // but rendering the whole frame puts this glow at x 240..840 around
  // y 11900..12300, with plain background everywhere past x 1000. +75.73 lands
  // it at x 491..1234 (x 205..1520 once the blur is counted); -75.73 would put
  // it at x 1005..1748, exactly where the page measures dark. Where the two
  // tests disagree, where the light actually falls wins.
  //
  // Padding as with the others: Figma sizes the filter region at 2 sigma, so
  // the export was re-issued with 2.70 sigma more (385.52) on every side, and
  // bleed is 285.56 + 385.52. fill-opacity stays at Figma's own 0.8.
  {
    src: "/glows/music-app/vector-29b.svg",
    left: 1005.11,
    top: 11912,
    width: 928.35,
    height: 530.59,
    rotate: 75.73,
    bleed: 671.08,
  },
  {
    src: "/glows/music-app/vector-27b.svg",
    left: -24.51,
    top: 12977.73,
    width: 967.42,
    height: 1874.94,
    rotate: -12.45,
    bleed: 500.4,
  },
  // Under the Takeaway — "Vector 29" (Figma 6460:22987). Body 1024.22x585.38
  // against a 1023.92x1179.58 bounding box gives cos 0.50713 / sin 0.86184,
  // 59.53 degrees.
  //
  // Positive here, unlike the two above. This body is wide, so its long axis is
  // its own +x, and +59.53 sends that right and down — which is the ridge the
  // node's render shows (brightest x drifts 401 to 520 as it descends).
  // Rendering the whole frame agrees: the glow sits at x 240..840, y 15140..
  // 16040, and +59.53 puts the box at x 81..1105, y 14935..16115, while -59.53
  // would put it at x 586..1610, y 14053..15232, where the page is plain.
  //
  // Its export was already on disk under this name — same path, same sigma,
  // already carrying 425.34 of extra room, so only the opacity needed lifting.
  {
    src: "/glows/music-app/vector-29.svg",
    left: 585.86,
    top: 14859.35,
    width: 1024.22,
    height: 585.38,
    rotate: 59.53,
    bleed: 740.39,
  },
];

// Renders once behind the Music App case page. Requires an ancestor with
// `position: relative` sized to the full page (e.g. the page's <main>) so
// `inset-0` covers the whole scroll length, not just the viewport.
//
// The wrapper deliberately carries no overflow clip: seven of these glows
// extend past the 1440px frame, and clipping them at its edge cut them
// mid-falloff and drew a hard vertical line down the page. The page shell
// clips at the viewport instead.
export default function MusicAppGlow() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 pointer-events-none"
      // Clipped vertically, visible horizontally. The Figma frame clips its
      // glows at the top and bottom edges, and without this their transparent
      // filter padding holds the document ~390px open past the last section —
      // an empty tail after the closing word. The horizontal axis stays
      // visible: several of these extend well past the 1440 frame on purpose,
      // and cutting them there drew a hard vertical line down the page.
      style={{ overflow: "visible clip" }}
    >
      {GLOWS.map((glow, i) => {
        // A rotated glow needs a wrapper: Figma turns a layer about its own
        // top-left, while CSS defaults to the centre, so the box is placed and
        // rotated first and the overhanging export hangs off it by `bleed`.
        if (glow.rotate !== undefined) {
          const bleed = glow.bleed ?? 0;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: glow.left,
                top: glow.top,
                width: glow.width,
                height: glow.height,
                transformOrigin: "0 0",
                transform: `rotate(${glow.rotate}deg)`,
              }}
            >
              <Image
                src={glow.src}
                alt=""
                width={glow.width + bleed * 2}
                height={glow.height + bleed * 2}
                className="absolute max-w-none"
                style={{ left: -bleed, top: -bleed }}
              />
            </div>
          );
        }

        return (
          <Image
            key={i}
            src={glow.src}
            alt=""
            width={glow.width}
            height={glow.height}
            className="absolute max-w-none"
            style={{
              left: glow.left,
              top: glow.top,
              ...(glow.fadeOut && {
                WebkitMaskImage: `linear-gradient(to bottom, black ${glow.fadeOut[0]}%, transparent ${glow.fadeOut[1]}%)`,
                maskImage: `linear-gradient(to bottom, black ${glow.fadeOut[0]}%, transparent ${glow.fadeOut[1]}%)`,
              }),
            }}
          />
        );
      })}
    </div>
  );
}
