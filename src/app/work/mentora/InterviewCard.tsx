import Image from "next/image";

// Figma 6657:12435 and 6657:12482 — the two research cards. Same construction
// either way: a 668 square on #292621 at radius 20, a title and a paragraph
// inset from the top left, and a round button top right that opens the FigJam
// board the research actually lives on.
//
// The arrow is Figma's own export, kept in the repo rather than linked: the
// MCP asset URLs it comes from expire seven days after they are issued.
const ARROW = "/icons/mentora/arrow-out.svg";

type Props = {
  title: string;
  body: string;
  href: string;
  /** The text block's own offsets — Figma sets them per card. */
  left: number;
  top: number;
};

export default function InterviewCard({ title, body, href, left, top }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block size-full overflow-clip rounded-[20px] bg-[#292621]"
    >
      {/* Title and body, 24 apart. Both boxes are untrimmed in Figma — 36 for
          the title at 24/1.5, and a whole number of 24 lines for the body — so
          neither needs a baseline correction. */}
      <div className="absolute flex flex-col" style={{ left, top, width: 530, gap: 24 }}>
        <p
          className="whitespace-nowrap text-[24px] text-white"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: "-0.264px",
          }}
        >
          {title}
        </p>
        <p
          className="text-[16px] text-white/50"
          style={{
            fontFamily: "var(--font-inter)",
            lineHeight: "24px",
            letterSpacing: "-0.176px",
          }}
        >
          {body}
        </p>
      </div>

      {/* 56 square at x 580, y 32, on #171716, with the 24 glyph inset 16. */}
      <span
        aria-hidden
        className="absolute flex items-center justify-center rounded-[28px] bg-[#171716]"
        style={{ left: 580, top: 32, width: 56, height: 56 }}
      >
        <Image src={ARROW} alt="" width={24} height={24} unoptimized className="size-6" />
      </span>
    </a>
  );
}
