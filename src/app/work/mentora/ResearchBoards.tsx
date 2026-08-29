"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Figma 6657:12481, an instance of the component set 6256:16567. The card is a
// 668 window over a strip of four 668 panels — 2672 wide — that steps sideways
// on a timer.
const PANELS = [
  { src: "/mockups/mentora/research-1-user-stories.webp", alt: "User stories grouped by dashboard, support and content" },
  { src: "/mockups/mentora/research-2-user-script.webp", alt: "Interview scripts and a session summary" },
  { src: "/mockups/mentora/research-3-interview-keys.webp", alt: "User interview keys: target user, pain points, needs, insights" },
  { src: "/mockups/mentora/research-4-user-story-table.webp", alt: "User stories mapped to tasks and possible UX solutions" },
];

// How long each panel is held before the slide to the next one starts. The
// prototype's own delays are 1600 before Variant2 and 1800 before Variant3, but
// these are dense boards of small type and that is not long enough to read one,
// so the hold is longer here by choice. One number, easy to retune.
const HOLD_MS = 3000;

// The slide itself is Figma's: Smart animate, Ease out, 600ms.
const SLIDE_MS = 600;
const EASE = "cubic-bezier(0, 0, 0.58, 1)";

export default function ResearchBoards() {
  const [index, setIndex] = useState(0);
  // The wrap from the last panel back to the first is a cut, not a slide —
  // running the strip backwards past all four would read as a rewind. This flag
  // drops the transition for that one frame.
  const [animate, setAnimate] = useState(true);
  const running = useRef(true);
  // The timer reads the current panel from here rather than from a setState
  // updater. Deciding the wrap inside the updater meant calling setAnimate from
  // inside it, which is a side effect in a function React is free to run more
  // than once — in development it does exactly that, and the strip can drop the
  // transition on a step that should have slid.
  const indexRef = useRef(0);
  const hostRef = useRef<HTMLDivElement>(null);

  // Bring the transition back only once the browser has painted the jump,
  // otherwise it animates the very move it was turned off for. Two frames: one
  // for the style change to commit, one to be sure it was painted.
  useEffect(() => {
    if (animate) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      if (inner) cancelAnimationFrame(inner);
    };
  }, [animate]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // No point stepping a card nobody is looking at.
    const host = hostRef.current;
    let io: IntersectionObserver | null = null;
    if (host && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          running.current = entries.some((e) => e.isIntersecting);
        },
        { rootMargin: "100px" },
      );
      io.observe(host);
    }

    const timer = window.setInterval(() => {
      if (!running.current) return;
      const next = (indexRef.current + 1) % PANELS.length;
      indexRef.current = next;
      // Both land in one render, so the jump is painted without a transition
      // rather than being animated and then corrected.
      setAnimate(next !== 0);
      setIndex(next);
    }, HOLD_MS);

    return () => {
      window.clearInterval(timer);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} className="size-full overflow-clip rounded-[20px] bg-[#f7f7f7]">
      <div
        className="flex h-full w-max"
        style={{
          transform: `translateX(${-index * 668}px)`,
          transition: animate ? `transform ${SLIDE_MS}ms ${EASE}` : "none",
        }}
      >
        {PANELS.map((p) => (
          <div key={p.src} className="relative size-[668px] shrink-0">
            <Image src={p.src} alt={p.alt} width={1336} height={1336} unoptimized className="size-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
