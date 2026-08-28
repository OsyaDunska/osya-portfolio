"use client";

import { useEffect, useState } from "react";

/**
 * Figma 6641:2544 "ButtonUp" — 56px circle, 16 of padding around a 24 arrow.
 * Default is white with a #171716 arrow, Variant2 is #2A60E0 with a white one,
 * and Variant2 is the hover state here.
 *
 * The two variants export as the same path with a different `fill`, so this is
 * one inline SVG painted with `currentColor`: the swap is then a plain CSS
 * hover on the button's text colour, with no second file and no JS.
 */
const ARROW_PATH =
  "M11.4479 4.47232C11.7603 4.1599 12.2666 4.15989 12.579 4.47232L18.5894 10.4827C18.9017 " +
  "10.7952 18.9018 11.3014 18.5894 11.6138C18.277 11.9262 17.7707 11.9261 17.4583 11.6138L12.8242 " +
  "6.97965L12.8235 7.46234V19.0481C12.8234 19.4899 12.4656 19.8477 12.0238 19.8478C11.582 19.8477 " +
  "11.2242 19.49 11.2242 19.0481V7.44162L11.2235 6.95894L6.5686 11.6138C6.25623 11.9261 5.74991 " +
  "11.926 5.43751 11.6138C5.1251 11.3014 5.12514 10.7952 5.43751 10.4827L11.4479 4.47232ZM18.9195 " +
  "11.4895C18.9041 11.5207 18.8879 11.5516 18.8691 11.5814C18.8879 11.5516 18.9041 11.5207 18.9195 " +
  "11.4895ZM18.1199 12.0433C18.1741 12.0381 18.2278 12.0277 18.2808 12.0136C18.2278 12.0277 18.1741 " +
  "12.0381 18.1199 12.0433ZM19.0189 11.1443C19.0137 11.1985 19.0033 11.2522 18.9892 11.3052C19.0033 " +
  "11.2522 19.0137 11.1985 19.0189 11.1443ZM18.9506 10.6726C18.9627 10.7026 18.9732 10.733 18.9823 " +
  "10.7638C18.9732 10.733 18.9627 10.7026 18.9506 10.6726Z";

/**
 * The design puts the button 120 from the bottom and the right at the 1440
 * frame. A flat 120 would eat a third of a phone screen, so the offset is a
 * line through the two ends instead: 22 at 375 wide, 120 at 1440.
 *
 *   slope     (120 - 22) / (1440 - 375) = 0.092  ->  9.2vw
 *   intercept 22 - 0.092 * 375           = -12.48px
 *
 * clamp holds it at 20 below ~354px and at exactly 120 past 1440, so wider
 * screens keep the design's number rather than drifting past it.
 */
const OFFSET = "clamp(20px, 9.2vw - 12.48px, 120px)";

export default function ScrollToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // One viewport down before it appears — the case opens on a full-height
    // hero, so this keeps the button off that first screen.
    const update = () => setShown(window.scrollY > window.innerHeight);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      // z-40 clears everything on the page: the glows sit at z-0, the content
      // at z-10, the header at z-20 and the sticky back link at z-30. It shares
      // the viewport with only one other fixed element, the page's dark
      // backdrop at -z-10, and with the back link — which lives in the opposite
      // corner, so neither covers the other.
      className={`fixed z-40 flex size-14 items-center justify-center rounded-full bg-white text-[#171716] transition-[opacity,transform,background-color,color] duration-300 hover:bg-[#2a60e0] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a60e0] motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
      style={{ bottom: OFFSET, right: OFFSET }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d={ARROW_PATH} fill="currentColor" />
      </svg>
    </button>
  );
}
