import type { ReactNode } from "react";

/* Two things the page cannot do from inside itself.

   The ground. The case paints its #000208 on a div inside the page, and the
   document underneath stayed the site's white. Chromium fills a tile it has
   not rastered yet with the root element's colour, and rubber-band overscroll
   shows the same, so there was white to fall back to under a page 16363 tall.
   The root carries the case's own colour here instead. It goes on the route
   rather than in globals.css, and unmounts with the route.

   The dither. The glow around the ring falls from 17 of blue to 8 over some
   900 pixels, and eight bit output has nine values in that span. So the ramp
   cannot be a ramp: it comes out as steps, and they are wide. Measured at
   1512 by 900, DPR 2, through display-p3:

     y 358..493  blue 14  135px      y 154..225  blue 11   71px
     y 778..891  blue 10  113px      y 642..694  blue 12   52px

   Neighbouring plateaus differ by one level, which is why a threshold of two
   finds nothing and a screenshot in a bright room shows nothing. On a
   calibrated display the border between two flat fields a hundred pixels deep
   reads as a drawn line. It appears to move while scrolling because a
   different pair of plateaus crosses the viewport.

   Both browsers have it. Safari's version is the same arithmetic seen through
   the display profile, which stretches the distance between near-black levels
   further apart. c7df84a did not cause it; taking the ground from #000105 to
   #000208 moved where the steps fall, which is why it looked new.

   A level of noise gives the step nothing to be seen against. The tile is 128
   square, white at alpha 0 to 5 of 255: it lifts a pixel by at most five and
   on average two and a half, flat across the viewport, so it draws no edge of
   its own. Amplitude picked by measuring what is left of the plateaus —

     none  9 plateaus over 40px, longest 135     0..4  3, longest 88
     0..3  4 plateaus over 40px, longest  69     0..5  0, longest 39
                                                 0..6  2, longest 85

   Fixed rather than scrolled, so it costs one viewport of raster and not
   sixteen thousand pixels of page. Over everything, since the steps are in the
   mockups as well as the gradients. And no gate: both browsers want it, so
   there is nothing to leak — an earlier attempt to hold this to Safari behind
   @supports (-webkit-hyphens: none) reached Chrome, where Blink answers true
   to it. */
export default function MusicAppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`html, body { background: #000208; }`}</style>
      {children}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{
          backgroundImage: "url(/glows/music-app-v2/dither.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </>
  );
}
