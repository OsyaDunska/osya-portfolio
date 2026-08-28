import Image from "next/image";
import { fadeGradient, fadeSideMask } from "./fadeStyles";

// User Personas, against Figma frame 6460:22983. Offsets are frame coordinates
// minus the section's origin (the "User personas" title at y=2061).
const ORIGIN = 2061;

// Maya's card is a 188x220 rounded rectangle, Daniel's a 232px circle — the two
// are deliberately different shapes and are staggered down the page.
const CARDS = [
  {
    name: "Maya, 27",
    nameWeight: 400,
    photo: "/personas/music-app/maya.png",
    glow: "/personas/music-app/glow-maya.svg",
    left: 120,
    top: 2196 - ORIGIN,
    frame: { width: 188, height: 220, radius: 20 },
    // Figma nests the photo in an inner box that is itself offset, so the crop
    // is expressed against that box rather than the card.
    inner: { left: -11.78, top: -10.99, width: 194.316, height: 260.178 },
    crop: { width: "109.29%", height: "122.43%", left: "-4.64%", top: "0%" },
    glowSize: 182.006,
    glowCentre: { x: 94 - 112.34, y: 167.6 + 91 },
    role: ["Freelance Designer, Always on the Move"],
    roleWidth: 155.492,
  },
  {
    name: "Daniel, 34",
    nameWeight: 500,
    photo: "/personas/music-app/daniel.png",
    glow: "/personas/music-app/glow-daniel.svg",
    left: 364,
    top: 2476 - ORIGIN,
    frame: { width: 232, height: 232, radius: 1000 },
    inner: null,
    crop: { width: "84.49%", height: "127.22%", left: "13.93%", top: "0%" },
    glowSize: 525.739,
    glowCentre: { x: 116 - 104.96, y: 187.1 + 119.688 },
    // Figma breaks this one by hand rather than letting it wrap.
    role: ["Commuter, Manager", "at a Tech Company"],
    roleWidth: 146,
  },
];

const GOALS = [
  "Wants to hit play before the train doors close",
  "Needs recommendations that actually match his mood",
  "Wants one place for playlists, podcasts, and radio",
  "Wants to switch moods fast — focus music to chill, without digging",
  "Wants to pick up right where she left off, on any device",
  "Wants music playing within seconds of opening the app",
];

const FEARS = [
  "Losing focus digging through cluttered menus",
  "Getting the same generic suggestions every time",
  "Feeling stuck with the same playlist no matter her mood",
  "Second-guessing whether to trust the app's picks or search manually",
  "Struggling to find the right track between meetings and errands",
  // Figma repeats this line as the sixth item.
  "Second-guessing whether to trust the app's picks or search manually",
];

function Column({
  items,
  label,
  left,
  top,
  pillBg,
  pillColor,
  rotate = 0,
}: {
  items: string[];
  label: string;
  left: number;
  top: number;
  pillBg: string;
  pillColor: string;
  rotate?: number;
}) {
  return (
    <div
      className="absolute flex flex-col gap-12"
      style={{ left, top, width: 260, fontFamily: "var(--font-inter-tight)" }}
    >
      <span
        className="flex h-10 w-[74px] items-center justify-center rounded-full text-[16px]"
        style={{
          background: pillBg,
          color: pillColor,
          letterSpacing: "-0.176px",
          lineHeight: "24px",
          transform: rotate ? `rotate(${rotate}deg)` : undefined,
        }}
      >
        {label}
      </span>

      <div className="flex flex-col gap-5">
        {items.map((item, i) => (
          <div key={`${item}-${i}`} className="flex flex-col gap-5">
            {i > 0 && <div className="h-px w-full bg-[#202124]" />}
            <p
              className="text-[16px] leading-[22px] text-white/50"
              // Figma trims these to cap-height; without this each runs 10px
              // tall and the dividers drift down the column.
              style={{ letterSpacing: "-0.176px", marginBlock: -5 }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UserPersonas() {
  return (
    <>
      <h2
        className="absolute left-[120px] top-0 w-[314px] text-[48px] font-semibold leading-[1.15] text-white"
        style={{ fontFamily: "var(--font-inter-tight)" }}
      >
        User personas
      </h2>

      {CARDS.map((card) => (
        <div
          key={card.name}
          className="absolute flex flex-col gap-6"
          style={{ left: card.left, top: card.top, width: card.frame.width }}
        >
          <div
            className="relative overflow-hidden bg-[#202020]"
            style={{
              width: card.frame.width,
              height: card.frame.height,
              borderRadius: card.frame.radius,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG; next/image won't serve raw SVGs without dangerouslyAllowSVG */}
            <img
              src={card.glow}
              alt=""
              aria-hidden
              className="pointer-events-none absolute max-w-none"
              style={{
                left: card.glowCentre.x - card.glowSize / 2,
                top: card.glowCentre.y - card.glowSize / 2,
                width: card.glowSize,
                height: card.glowSize,
              }}
            />
            <div
              className="absolute overflow-hidden"
              style={
                card.inner
                  ? {
                      left: card.inner.left,
                      top: card.inner.top,
                      width: card.inner.width,
                      height: card.inner.height,
                    }
                  : { inset: 0 }
              }
            >
              <Image
                src={card.photo}
                alt={card.name}
                width={1024}
                height={1536}
                quality={95}
                className="absolute max-w-none"
                style={card.crop}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p
              className="whitespace-nowrap text-[16px] text-white"
              style={{
                fontFamily: "var(--font-inter-tight)",
                fontWeight: card.nameWeight,
                lineHeight: "32px",
                letterSpacing: "-0.176px",
              }}
            >
              {card.name}
            </p>
            <p
              className="text-[16px] text-white/50"
              style={{
                fontFamily: "var(--font-inter-tight)",
                lineHeight: 1.35,
                width: card.roleWidth,
              }}
            >
              {card.role.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      ))}

      <Column
        label="Goals"
        items={GOALS}
        left={728}
        top={2196 - ORIGIN}
        pillBg="rgba(29,54,22,0.6)"
        pillColor="#7ad764"
        rotate={0.33}
      />
      <Column
        label="Fears"
        items={FEARS}
        left={1082}
        top={2354.28 - ORIGIN}
        pillBg="#321313"
        pillColor="#bc433d"
      />

      {/* Frame 2147238126 — fades the bottom of the block into the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: 728.16,
          top: 2758 - ORIGIN,
          width: 712,
          height: 225,
          background: fadeGradient,
          WebkitMaskImage: fadeSideMask,
          maskImage: fadeSideMask,
        }}
      />
    </>
  );
}
