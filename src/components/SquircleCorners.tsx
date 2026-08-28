"use client";

import { useEffect } from "react";
import { squircleClip } from "@/lib/squircle";

// Corner smoothing, off. `.squircle`'s plain `border-radius: 20px` draws the
// corner and this component stays dormant — that is the shipped state, chosen
// after trying 60%, 30% and a fitted 60% on the live page.
//
// Raising it back to 0.6 restores the iOS corner, and two corrections needed to
// make that work are already applied below, both found the hard way:
//
//   - The corner width is what reads as wrong, not the curve. This construction
//     spends (1 + smoothing) x radius on the corner, so handing it Figma's 20 at
//     60% took 32px of each edge. Measured off a zoomed screenshot of the card
//     in Figma, with the 56px button as the ruler, the corner there takes about
//     20 — it stays inside the radius. Hence the divide in `apply`, which holds
//     the span at 20 and lets the smoothing only shape the curve inside it.
//   - The element must not keep a border-radius under the clip. Two nearly
//     coincident antialiased edges — one from the rounded background box, one
//     from the clip — compose into a pale hairline down the corner, plainly
//     visible on the dark cards against white. `apply` zeroes the radius so one
//     shape defines the corner. `overflow: hidden` then clips children to a
//     square box, which costs nothing: the clip-path already covers them.
//
// One more thing, if this is ever retuned: the value cannot be read back from an
// export. Figma's PNG and SVG exports both drop corner smoothing — a card comes
// back as a plain `<rect rx="20">` either way — so only a zoomed side-by-side
// against the Figma canvas can judge it.
const SMOOTHING = 0;

const SELECTOR = ".squircle, [data-corner-smooth]";

/**
 * Keeps every target clipped to Figma's smoothed corner.
 *
 * That shape cannot be written as static CSS: `border-radius` has no smoothing,
 * and a `clip-path` needs pixels, while these cards are fluid — the path has to
 * be rebuilt on every resize. The clip this page used to carry was in
 * objectBoundingBox units, so its corner was a fraction of the box: 33.3px at a
 * 512 card, 22.9px at 352, 19.5px at 300, never the 20 Figma asks for.
 */
export default function SquircleCorners() {
  useEffect(() => {
    // At 0 the path is a plain rounded rect, which is what the CSS border-radius
    // already draws — nothing to set, so this stays dormant.
    if (SMOOTHING <= 0) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (targets.length === 0) return;

    // Each element's radius is its own — 20 on the cards, 12 on the Aura badge —
    // so it is read from the stylesheet rather than hard-coded, and cached now,
    // before the first write. Re-reading it later would return whatever this
    // function last set, and every resize would scale an already-scaled radius.
    const base = new WeakMap<HTMLElement, number>();
    for (const el of targets) {
      base.set(el, parseFloat(getComputedStyle(el).borderTopLeftRadius));
    }

    const apply = (el: HTMLElement) => {
      const { width, height } = el.getBoundingClientRect();
      const span = base.get(el);
      if (width < 1 || height < 1 || !span) return;
      // `span` is the corner width Figma states — 20 on the cards, 12 on the
      // badge. The path grows it by (1 + SMOOTHING), so divide it back out.
      const radius = span / (1 + SMOOTHING);
      el.style.clipPath = squircleClip(width, height, radius, SMOOTHING);
      // Set together with the clip, never before it, so the corner is never
      // square for a frame.
      el.style.borderRadius = "0";
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) apply(entry.target as HTMLElement);
    });
    for (const el of targets) {
      apply(el);
      ro.observe(el);
    }
    return () => {
      ro.disconnect();
      for (const el of targets) {
        el.style.clipPath = "";
        el.style.borderRadius = "";
      }
    };
  }, []);

  return null;
}
