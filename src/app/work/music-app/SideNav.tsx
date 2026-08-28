"use client";

const SECTIONS = [
  { id: "about-project", label: "About Project" },
  { id: "problem-solution", label: "Problem & Solution" },
  { id: "user-personas", label: "User Personas" },
  { id: "information-architecture", label: "Information Architecture" },
  { id: "icons", label: "Icons" },
  { id: "ui-card-elements", label: "UI Card Elements" },
  { id: "typography-colors", label: "Typography & Colors" },
  { id: "efficiency-consistency", label: "Efficiency & Consistency" },
  { id: "summary", label: "Summary" },
] as const;

// Static block (not sticky) — part of the first-screen layout, scrolls away
// with the rest of the page. No active-state; hover only, 50% -> 80% white.
export default function SideNav() {
  // flex, not block: the list's negative bottom margin below would otherwise
  // collapse through and leave the frame 6px taller than Figma's 258.
  return (
    <nav className="flex w-[176px] shrink-0 flex-col">
      <p
        className="text-[16px] text-white/50"
        style={{ fontFamily: "var(--font-inter-tight)", fontWeight: 500 }}
      >
        MENU
      </p>
      {/* Figma trims this list to cap-height/alphabetic-baseline while leaving
          "MENU" untrimmed, so the frame reads 24 + 30 + 204 = 258. The browser's
          full line boxes make the list 216 instead, pushing every item ~6px low
          — the offsets below take that back so the caps land where Figma has
          them and the block measures 258. */}
      <ul className="flex flex-col" style={{ marginTop: 23.7, marginBottom: -6.1 }}>
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="block text-[16px] leading-6 text-white/50 transition-colors hover:text-white/80"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
