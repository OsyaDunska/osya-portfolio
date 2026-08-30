"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

/**
 * The light/dark card from Figma 6779:29342, switching themes under a circle
 * that grows out of one of its corners.
 *
 * The file holds the two ends of the motion rather than a description of it:
 * variant Default carries a 6.023px circle at zero opacity, Variant2 the same
 * circle at 1327.85px filled #292621. So the reveal is a hard-edged circle, not
 * a fade, and #292621 is the colour arriving under it — the dark card itself.
 *
 * Both themes are flat renders, the way every other mockup on this page is
 * done, and they are stacked rather than crossfaded: the dark one is clipped to
 * the circle and the light one lies underneath, so what the circle uncovers is
 * the real dark card and not a blend of the two.
 *
 * Both renders are stills lifted from the screen recording of this same card
 * (1332x1300, so very nearly the 2x of 668x652 the rest of the page uses).
 * They carry the recording's H.264 compression; two 2x PNG exports of variants
 * Default and Variant2 would drop straight in over them.
 *   Neither is `priority`: the card is bound for the middle of a 20,000px page,
 * where a preload hint would be wrong. They are eager rather than lazy so both
 * themes are decoded before the circle first opens.
 *
 * The 110px the content sits lower in the dark render is the file's own — its
 * Default has the block at top -100 and Variant2 at top 10 — so it comes along
 * with the renders and needs nothing here. Inside the circle the content is at
 * its dark position while outside it is still at its light one, which is what
 * the recording of this shows too.
 */

const W = 668;
const H = 652;

/**
 * The corners, in the order the circle walks them. A circle at a corner has to
 * reach the opposite corner to cover the card, so the radius is the card's own
 * diagonal — 933.45 — the same for all four.
 */
const ORIGINS = [
  { x: 0, y: 0 },
  { x: W, y: 0 },
  { x: W, y: H },
  { x: 0, y: H },
] as const;

const RADIUS = Math.hypot(W, H);

/** Long enough to read as a sweep, short enough not to be waited on. */
const GROW_MS = 600;
/** How long each theme stands before the circle moves again. */
const HOLD_MS = 3500;

type Props = { className?: string; style?: CSSProperties };

export default function ThemeRevealCard({ className, style }: Props) {
  const veil = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = veil.current;
    const box = host.current;
    if (!el || !box) return;

    const clip = (r: number, o: { x: number; y: number }, animate: boolean) => {
      el.style.transition = animate
        ? `clip-path ${GROW_MS}ms ease-in-out`
        : "none";
      el.style.clipPath = `circle(${r}px at ${o.x}px ${o.y}px)`;
    };

    // Someone who has asked for less motion gets the light card and no loop.
    // The dark one stays in the DOM, clipped away, so nothing reflows.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clip(0, ORIGINS[0], false);
      return;
    }

    let corner = 0;
    let open = false;
    let timer = 0;

    const step = () => {
      const o = ORIGINS[corner % ORIGINS.length];
      if (open) {
        // Back into the corner it came from, then the next corner is chosen.
        clip(0, o, true);
        open = false;
        corner += 1;
      } else {
        // Move the origin while the circle is nothing, so the jump is unseen —
        // and read a layout property in between, or the browser coalesces the
        // two writes and the circle slides across the card instead of growing.
        clip(0, o, false);
        void el.offsetWidth;
        clip(RADIUS, o, true);
        open = true;
      }
      timer = window.setTimeout(step, GROW_MS + HOLD_MS);
    };

    // The page it will live on is 20,000px tall, so the loop only runs while
    // the card is actually on screen. Leaving the viewport closes the circle
    // and the next entry starts the sequence again from the corner it was on.
    const start = () => {
      if (timer) return;
      timer = window.setTimeout(step, HOLD_MS);
    };
    const stop = () => {
      window.clearTimeout(timer);
      timer = 0;
      open = false;
      clip(0, ORIGINS[corner % ORIGINS.length], false);
    };

    clip(0, ORIGINS[0], false);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.2 },
    );
    io.observe(box);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <figure
      ref={host}
      className={`relative overflow-hidden bg-white ${className ?? ""}`}
      style={{ width: W, height: H, borderRadius: 20, ...style }}
    >
      {/* Both renders fill the card, so the two themes line up pixel for pixel
          and the circle's edge falls on the same content in each. */}
      <Image
        src="/mockups/mentora/theme-reveal-light.webp"
        alt="The Mentora component library in its light theme: calendar cells, search fields, buttons and chips"
        width={1332}
        height={1300}
        loading="eager"
        unoptimized
        className="absolute inset-0 size-full max-w-none"
      />
      <div
        ref={veil}
        aria-hidden
        className="absolute inset-0"
        style={{ clipPath: `circle(0px at ${ORIGINS[0].x}px ${ORIGINS[0].y}px)` }}
      >
        <Image
          src="/mockups/mentora/theme-reveal-dark.webp"
          alt=""
          width={1332}
          height={1300}
          loading="eager"
          unoptimized
          className="absolute inset-0 size-full max-w-none"
        />
      </div>
    </figure>
  );
}
