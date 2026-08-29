"use client";

import { useEffect, useState } from "react";
import LazyAutoplayVideo from "../music-app/LazyAutoplayVideo";

// Figma 6657:13530 "Frame 2147237949" — 1440x772 at x 0, y 4990. In the file it
// is a still of the FigJam benchmarking board; here it is the recording of that
// board being panned.
//
// Width follows the window past 1440, height stays at Figma's 772. Growing the
// height instead would push every section below out of place, since the whole
// page is laid out on fixed coordinates. No corner radius: the file gives this
// frame none, and the block runs edge to edge.
//
// Two recordings, because one shape cannot serve both widths. The box is
// W x 772, so what is lost depends on how each clip's proportion sits against
// W / 772:
//
//                     at 1440                 at 1800
//   narrow, 1.670     45px off top and bottom  153px off top and bottom
//   wide, 2.323       176px off each side      about 2px
//
// So the narrow one is right at the design width and the wide one on a large
// screen, and the page picks between them.
const NARROW = "/videos/mentora-benchmarking-board-v1.mp4";
const WIDE = "/videos/mentora-benchmarking-board.mp4";

// Where to swap. 1440 is the design width and the obvious line to draw, though
// the two clips actually break even nearer 1604: between 1441 and there, the
// wide one still loses more to the sides than the narrow one loses top and
// bottom. Move this if those middle widths matter more than the round number.
const SWAP_ABOVE = 1440;

export default function BenchmarkingBoard() {
  // Null until measured, so the server render and the first client render agree.
  // Nothing is lost by the wait: the video is lazy and would not have started
  // loading yet anyway.
  const [wide, setWide] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${SWAP_ABOVE + 1}px)`);
    const read = () => setWide(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  return (
    // Full-bleed width out of the centred canvas — the 50% / 100vw / -50% trio
    // the hero fade uses. The spill past the window is cut by the page's own
    // overflow clip.
    <div
      className="absolute left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      style={{ top: 4990, height: 772 }}
    >
      {wide !== null && (
        <LazyAutoplayVideo
          src={wide ? WIDE : NARROW}
          className="size-full"
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
}
