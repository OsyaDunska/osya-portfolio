"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * The still to hold until the first frame arrives. It goes on the video's own
   * `poster`, not into a second element underneath, because two stacked layers
   * inside one rounded clip each get their own antialiased edge: along the
   * corner arc the video's part-alpha pixel lands on the still's part-alpha
   * pixel and the two together read lighter than either. Against a dark frame
   * that shows up as a grey corner. One layer has one edge, and no seam.
   */
  poster?: string;
  /** How early to start fetching, in pixels beyond the viewport. */
  marginPx?: number;
};

// An autoplaying background video that does not download until it is near the
// viewport. Both cases use it, which is why it lives here rather than in either
// of them.
//
// `preload="metadata"` does not hold an autoplaying video back: the browser
// fetches the whole file so it can start playing. The Music App card that
// prompted this carries a 4.4MB clip ~5200px down the page, and it was arriving
// on first paint, accounting for ~99% of the transfer. Withholding `src` until
// the element is close is what actually defers it.
//
// IntersectionObserver drives this, with a rect check on scroll behind it: the
// observer silently never fires in some embedded and offscreen renderers, and a
// video that never loads is a worse failure than one that loads slightly early.
export default function LazyAutoplayVideo({
  src,
  className,
  style,
  poster,
  marginPx = 300,
}: Props) {
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

  // Play when the browser says it can play through, not the moment a few
  // frames exist. A screen recording spends most of its bitrate on the second
  // or two where the picture actually moves, so playback that starts straight
  // away reaches that burst before the burst has arrived, hangs there, and runs
  // clean ever after off the cache — a stall on the first pass only, which is
  // the worst kind to chase. canplaythrough is the browser's own estimate that
  // it can reach the end without stopping.
  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldLoad) return;

    let timer = 0;
    const start = () => {
      stop();
      // Rejects where the tab forbids playback without a gesture; the poster
      // stays up, which is what the old attribute left behind too.
      void el.play().catch(() => {});
    };
    function stop() {
      el?.removeEventListener("canplaythrough", start);
      if (timer) clearTimeout(timer);
      timer = 0;
    }

    el.addEventListener("canplaythrough", start);
    // The estimate is only an estimate, and on a long file over a slow line it
    // can stay out of reach. Rather than leave a still card for good, take
    // whatever is buffered after this and accept the risk of one hitch.
    timer = window.setTimeout(start, 8000);

    return stop;
  }, [shouldLoad]);


  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={shouldLoad ? src : undefined}
      poster={poster}
      loop
      // Required: without it the browser blocks autoplay.
      muted
      // Required on iOS Safari: without it playback goes fullscreen.
      playsInline
      // "none" until the element is near, then the whole file: the point is
      // to be buffered before the first reveal, not to trickle in behind it.
      preload={shouldLoad ? "auto" : "none"}
    />
  );
}
