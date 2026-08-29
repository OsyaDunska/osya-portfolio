"use client";

// Figma 6657:13437 — one text layer, 104x364 at x 44, y 149. Fourteen 26px
// lines: "MENU", a blank one, then twelve entries.
//
// The anchors are written now and the sections arrive later, so a click on an
// id that does not exist yet falls through to the browser instead of being
// swallowed by a preventDefault.
const SECTIONS = [
  { id: "about-project", label: "About Project" },
  { id: "interviews", label: "Interviews" },
  { id: "survey", label: "Survey" },
  { id: "benchmarking", label: "Benchmarking" },
  // Figma writes this one as "D" + "ATA SYNTHESIS" lowercased, under a
  // `capitalize` on the layer, which renders as "Data synthesis". It carries
  // the same weight and colour as the entries around it, not the bold "MENU"
  // treatment, so it is listed as an entry rather than a second heading.
  { id: "data-synthesis", label: "Data synthesis" },
  { id: "user-personas", label: "User Personas" },
  // Figma writes this one "Key insights"; the layer's `capitalize` is what
  // renders the second word with a capital.
  { id: "key-insights", label: "Key Insights" },
  { id: "wireframes", label: "Wireframes" },
  { id: "maze-test", label: "Maze Test" },
  { id: "moodboard", label: "Moodboard" },
  { id: "ui-design", label: "UI Design" },
  { id: "design-system", label: "Design System" },
] as const;

const LINE = 26;

export default function CaseNav() {
  return (
    <nav className="w-[104px] text-[16px] text-white/50">
      <p
        className="font-bold"
        style={{ fontFamily: "var(--font-inter)", lineHeight: `${LINE}px` }}
      >
        MENU
      </p>
      {/* Figma's own blank line, kept as a spacer rather than an empty
          paragraph so the list stays a list. */}
      <div aria-hidden style={{ height: LINE }} />
      <ul>
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                const target = document.getElementById(id);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="block whitespace-nowrap transition-colors hover:text-white/80"
              style={{ fontFamily: "var(--font-inter-tight)", lineHeight: `${LINE}px` }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
