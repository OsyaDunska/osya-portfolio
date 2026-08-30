// Figma 6657:12444 — the board beside "Stakeholders' interview". In the file it
// is a static crop of the FigJam board, a white 668 square of sticky notes on
// #292621; here it is the screen recording of that same board scrolling, so the
// card shows the research rather than a frozen slice of it.
//
// The clip is 1330x1336, which is exactly twice the 668 square it sits in.
//
// Not a link. On this row only the written cards carry one — Stakeholders' to
// its board, Users' to its own — and the two media cards beside them are just
// media.
import LazyAutoplayVideo from "@/components/LazyAutoplayVideo";

const VIDEO = "/videos/mentora-stakeholders-interview.mp4";

export default function BoardVideoCard() {
  return (
    <div className="size-full overflow-clip rounded-[20px] bg-[#292621]">
      <LazyAutoplayVideo src={VIDEO} className="size-full object-cover" />
    </div>
  );
}
