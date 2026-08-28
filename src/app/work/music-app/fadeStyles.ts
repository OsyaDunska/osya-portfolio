// Shared by every "fade" rectangle on the Music App page — the gradients that
// sit over the bottom of a mockup or a text column and blend it into the page.
//
// The vertical ramp is Figma's own: transparent to solid #000105 by 80.2%. It
// has to stay opaque, because in the Information Architecture section it is
// what hides the hand mockup's cut-off forearm (the PNG ends mid-arm).
//
// What it must NOT do is end in a hard-edged rectangle. Each of these boxes is
// narrower than the page, so wherever a background glow sat behind one, its
// left and right edges read as perfectly straight vertical lines. The side mask
// feathers those edges — that, not the gradient direction, is what removes the
// seam.
// Figma's ramp is `rgba(1,2,9,0) 0% -> #000105 80.2%`, holding solid to the
// bottom. Ending solid drew a horizontal edge wherever a glow continued below
// the box, so this variant returns to transparent past 88%. Use it only where
// nothing bright sits that low in the box — over a mockup that is cut off near
// the bottom, the tail uncovers the cut. See fadeGradientSolid.
export const fadeGradient =
  "linear-gradient(to bottom, rgba(1,2,9,0) 0%, #000105 80.2%, #000105 88%, rgba(1,2,9,0) 100%)";

// Figma's ramp verbatim — transparent to #000105 by 80.2%, then solid to the
// bottom. The two smoke layers over the in-hand mockup need this one.
//
// The mockup PNG ends mid-forearm at page y 4851.3, still ~41% opaque and up to
// luminance 190. In the wide fade (6460:23130, y 4521.55, h 360) that lands at
// 91.6% of the box — inside the tail's 88%..100% ramp back to transparent — so
// 30% of the cut edge showed through as a bright horizontal line under the arm.
// Holding solid covers it, which is what the design does.
//
// Safe to end solid here: nothing lights the area below this box. vector-3b
// sits well to the left of it, vector-33's painted body ends around y 4611
// (well above the box's bottom at 4881.5), and below that the page is plain
// #000105 — the same colour the ramp ends on, so there is no edge to see.
export const fadeGradientSolid =
  "linear-gradient(to bottom, rgba(1,2,9,0) 0%, #000105 80.2%, #000105 100%)";

export const fadeSideMask =
  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";
