// Figma's corner smoothing, as an SVG path.
//
// A CSS `border-radius` corner is a quarter circle: it meets the straight edge
// at a hard curvature jump, which is the "pill" look Figma's smoothing exists to
// avoid. With smoothing at s, Figma keeps an arc of the same radius but sweeps
// it only 90*(1-s) degrees, and blends each end into the edge with a cubic. The
// corner then eats (1+s)*R of the side instead of R.
//
// Reproducing it here rather than approximating: `border-radius` cannot express
// it, and the project's `.squircle` clip-path is a single fixed proportional
// corner (6.5% of the box), which is not this shape at any particular radius.
//
// Only the shape changes — the smoothed corner and the plain one touch the same
// point on the 45-degree diagonal (both are arcs of radius R centred there), and
// everywhere else the smoothed outline sits inside the round rect, by under
// 0.3px at R 20. So a `border-radius: R` fallback under one of these clip paths
// costs nothing, and a 1px border drawn on the round rect survives the clip.
function corner(radius: number, smoothing: number, budget: number) {
  const p = Math.min((1 + smoothing) * radius, budget);
  const rad = (deg: number) => (deg * Math.PI) / 180;

  const arcMeasure = 90 * (1 - smoothing);
  const arcLength = Math.sin(rad(arcMeasure / 2)) * radius * Math.SQRT2;

  const alpha = (90 - arcMeasure) / 2;
  const beta = 45 * smoothing;
  const c = radius * Math.tan(rad(alpha / 2)) * Math.cos(rad(beta));
  const d = c * Math.tan(rad(beta));

  const b = (p - arcLength - c - d) / 3;
  const a = 2 * b;

  return { a, b, c, d, p, arcLength };
}

/** One rounded rectangle with Figma-style corner smoothing, in px. */
export function squirclePath(width: number, height: number, radius: number, smoothing: number) {
  const { a, b, c, d, p, arcLength } = corner(radius, smoothing, Math.min(width, height) / 2);
  const n = (v: number) => +v.toFixed(4);

  const ab = n(a + b);
  const abc = n(a + b + c);
  const bc = n(b + c);
  const r = n(radius);
  const L = n(arcLength);

  return [
    `M ${n(width - p)} 0`,
    `c ${n(a)} 0 ${ab} 0 ${abc} ${n(d)}`,
    `a ${r} ${r} 0 0 1 ${L} ${L}`,
    `c ${n(d)} ${n(c)} ${n(d)} ${bc} ${n(d)} ${abc}`,
    `L ${n(width)} ${n(height - p)}`,
    `c 0 ${n(a)} 0 ${ab} ${n(-d)} ${abc}`,
    `a ${r} ${r} 0 0 1 ${n(-arcLength)} ${L}`,
    `c ${n(-c)} ${n(d)} ${n(-bc)} ${n(d)} ${n(-(a + b + c))} ${n(d)}`,
    `L ${n(p)} ${n(height)}`,
    `c ${n(-a)} 0 ${n(-(a + b))} 0 ${n(-(a + b + c))} ${n(-d)}`,
    `a ${r} ${r} 0 0 1 ${n(-arcLength)} ${n(-arcLength)}`,
    `c ${n(-d)} ${n(-c)} ${n(-d)} ${n(-bc)} ${n(-d)} ${n(-(a + b + c))}`,
    `L 0 ${n(p)}`,
    `c 0 ${n(-a)} 0 ${n(-(a + b))} ${n(d)} ${n(-(a + b + c))}`,
    `a ${r} ${r} 0 0 1 ${L} ${n(-arcLength)}`,
    `c ${n(c)} ${n(-d)} ${bc} ${n(-d)} ${abc} ${n(-d)}`,
    "Z",
  ].join(" ");
}

/** Ready-to-use `clip-path` value for a box of this exact size. */
export function squircleClip(width: number, height: number, radius: number, smoothing: number) {
  return `path("${squirclePath(width, height, radius, smoothing)}")`;
}
