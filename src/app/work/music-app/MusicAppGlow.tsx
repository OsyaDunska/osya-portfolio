type Glow = {
  top: number;
  left: number;
  width: number;
  height: number;
  blur: number;
};

// Positions/sizes copied from the 12 blur vectors in the Figma "Music App" frame
// (node 6252:13341, design width 1440px). Blur scales with each shape's size,
// matching the ~63-106px feGaussianBlur std-deviation measured in the source SVGs.
const GLOWS: Glow[] = [
  { top: -9, left: 152, width: 931, height: 1066, blur: 82 },
  { top: 1737, left: 1236, width: 1096, height: 960, blur: 63 },
  { top: 2544, left: 50, width: 1129, height: 1485, blur: 100 },
  { top: 3738, left: 18, width: 1062, height: 1327, blur: 100 },
  { top: 5032, left: -45, width: 1004, height: 1258, blur: 97 },
  { top: 6677, left: -40, width: 1256, height: 1582, blur: 100 },
  { top: 7850, left: -157, width: 1444, height: 1818, blur: 100 },
  { top: 9843, left: 1543, width: 1176, height: 1209, blur: 93 },
  { top: 9890, left: 1257, width: 1533, height: 1320, blur: 100 },
  { top: 12313, left: 1005, width: 743, height: 1031, blur: 79 },
  { top: 13459, left: -25, width: 1349, height: 2040, blur: 100 },
  { top: 15501, left: 586, width: 1024, height: 1180, blur: 91 },
];

// Renders once behind the Music App case page. Requires an ancestor with
// `position: relative` sized to the full page (e.g. the page's <main>) so
// `inset-0` covers the whole scroll length, not just the viewport.
export default function MusicAppGlow() {
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {GLOWS.map((glow, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: glow.top,
            left: glow.left,
            width: glow.width,
            height: glow.height,
            background:
              "radial-gradient(circle, rgba(1,22,63,0.85) 0%, rgba(1,22,63,0) 70%)",
            filter: `blur(${glow.blur}px)`,
          }}
        />
      ))}
    </div>
  );
}
