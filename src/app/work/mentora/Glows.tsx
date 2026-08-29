import Image from "next/image";

// Two soft blurred lights behind the personas row and the insight blocks: one
// at the left edge of the frame, one at the right. Both carry a heavy layer
// blur, and in the file they sit under the personas row and the blocks.
//
// The right one is two ellipses, not one — 6657:12519 and 6657:12522, both
// named "Ellipse 9029" — baked together here because they overlap and read as a
// single light. Two more ellipses sit beside them in the file, 12520 and 12523,
// both named "Ellipse 9030"; neither is included because neither draws
// anything: Figma exports both as a 1x1 image. Light adds, so the two live ones
// are summed before the alpha is derived, and each export carries only its own
// node, so nothing is counted twice.
//
// These are Figma's own renders, not gradients built by eye: each export came
// back opaque with the page ground baked in, so the ground was subtracted and
// the remaining lift stored as white with alpha. The lift is exactly neutral
// (R=G=B), so plain white is the right colour.
//
// Taken straight, they banded badly. The gradient is very shallow — the whole
// left blob spans 23 to 75 over about 170px — so Figma's 8-bit export has only
// 53 distinct levels to spend on it, and out in the tail one level covers 50px
// of screen. That reads as hard contour rings, not as light.
//
// Two steps fix it, both at build time rather than on the page. First the
// quantised field is smoothed back into the continuous one it came from: a
// Gaussian of 9 CSS px, against a blob whose own scale is ~150, which flattens
// the plateaus without moving the shape. Then the alpha is laid down with an
// 8x8 ordered dither, so a value between two levels is carried by the mix
// rather than snapped to one. Checked against Figma's own render of the frame
// along y 7420 — +49.0/+40.6/+26.0/+11.3/+5.2/+0.1 at x 0/40/80/120/140/180
// against its +51/+42/+27/+11/+4/+0.
//
// One more detail: the lift is the mean of the three channels, not their max.
// Max picks up whichever channel the render's own noise pushed highest, which
// biased the whole field up by about a level.
//
// Each blob is CUT by the frame edge — that is the shape, not an accident:
//
//   glow-left     first column reads 54 against a peak of 54 — the frame cuts
//                 straight through the blob's centre
//   glow-right    last column reads 17 of a peak of 28
//
// Figma also leaves a one-pixel antialiasing spike on the column it crops at,
// and it is easy to mistake for content: on 12522 that column averaged 152
// against 2.2 beside it, which is ten times the blob's own peak. It is replaced
// with its neighbour. 12519 came back clean, so the repair is conditional.
//
// Worth being clear about what that abrupt side is, because it looks like the
// 2-sigma clipping Figma does to blur bounds and is not. Top, bottom and the
// far side of every one of these ends at alpha 0, so those falloffs are whole.
// The cut side has no tail left to restore: the blob is simply centred on the
// frame edge, which is what the file shows too.
//
// Which is also why they hang off the viewport edges rather than off the 1440
// canvas. The canvas is centred, so anchoring them to it left a dark band
// between each blob and the real edge of a wider screen. They sit in their own
// full-bleed layer instead, the same 50% / 100vw / -50% trio the hero backdrop
// and the benchmarking board use, and each one is pinned to the side it was cut
// on. Their size is Figma's and is not scaled with the window: the shape is a
// blur, and stretching it to the window would smear it rather than enlarge it.
//
// Nothing is cropped vertically, so there each export is centred on its node's
// box.
type Glow = {
  src: string;
  /** The frame edge the blob is cut on — and so the viewport edge it hangs off. */
  edge: "left" | "right";
  y: number;
  w: number;
  h: number;
};

const GLOWS: Glow[] = [
  // The insight blocks moved down 16 at one point; these did not. 12519 still
  // reports the y its predecessor had, so the left blob keeps the position
  // measured off Figma's own render of the frame.
  { src: "/mockups/mentora/glow-left.webp", edge: "left", y: 7230.95, w: 196, h: 384 },
  { src: "/mockups/mentora/glow-right.webp", edge: "right", y: 6745.24, w: 262, h: 393 },
];

export default function Glows() {
  return (
    // A zero-height full-bleed layer: the children still place themselves by
    // their own top, and the width is the window's rather than the canvas's.
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 w-screen -translate-x-1/2"
      style={{ top: 0, height: 0 }}
    >
      {GLOWS.map((g) => (
        <Image
          key={g.src}
          src={g.src}
          alt=""
          width={g.w * 2}
          height={g.h * 2}
          unoptimized
          className="absolute max-w-none select-none"
          style={{
            ...(g.edge === "left" ? { left: 0 } : { right: 0 }),
            top: g.y,
            width: g.w,
            height: g.h,
          }}
        />
      ))}
    </div>
  );
}
