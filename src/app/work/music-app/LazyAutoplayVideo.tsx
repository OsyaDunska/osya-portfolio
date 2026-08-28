"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** How early to start fetching, in pixels beyond the viewport. */
  marginPx?: number;
};

// An autoplaying background video that does not download until it is near the
// viewport.
//
// `preload="metadata"` does not hold an autoplaying video back: the browser
// fetches the whole file so it can start playing, so this card's 4.4MB clip was
// arriving on first paint and accounted for ~99% of the page's transfer, even
// though it sits ~5200px down. Withholding `src` until the element is close is
// what actually defers it.
//
// IntersectionObserver drives this, with a rect check on scroll behind it: the
// observer silently never fires in some embedded and offscreen renderers, and a
// video that never loads is a worse failure than one that loads slightly early.
export default function LazyAutoplayVideo({ src, className, style, marginPx = 300 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let io: IntersectionObserver | null = null;

    const stop = () => {
      io?.disconnect();
      io = null;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const load = () => {
      setShouldLoad(true);
      stop();
    };

    const check = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + marginPx && r.bottom > -marginPx) load();
    };

    function schedule() {
      if (!raf) raf = requestAnimationFrame(check);
    }

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) load();
        },
        { rootMargin: `${marginPx}px` },
      );
      io.observe(el);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Covers landing mid-page (a #hash link, or a restored scroll position).
    // Goes through rAF, so no state is set synchronously in the effect body.
    schedule();

    return stop;
  }, [marginPx]);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={shouldLoad ? src : undefined}
      autoPlay
      loop
      // Required: without it the browser blocks autoplay.
      muted
      // Required on iOS Safari: without it playback goes fullscreen.
      playsInline
      preload="none"
    />
  );
}
