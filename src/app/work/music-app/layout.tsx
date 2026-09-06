import type { ReactNode } from "react";

/* The case paints its #000208 on a div inside the page, while the document
   underneath it stays the site's white. Chromium takes the colour it fills
   unpainted tiles with from the root element, so on a page 16363 tall it had
   white to fall back to: scrolling showed it as the ground going light and
   dark again, and as edges where one tile had been rastered and its neighbour
   had not. The root carries the case's own colour here instead, so there is
   nothing lighter beneath the page to surface. It goes on the route rather
   than in globals.css, and unmounts with the route.

   Rubber-band overscroll at either end came from the same white. */
export default function MusicAppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`html, body { background: #000208; }`}</style>
      {children}
    </>
  );
}
