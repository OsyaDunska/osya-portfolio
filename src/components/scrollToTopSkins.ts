/**
 * The two colour pairs for the pinned "back to top" button.
 *
 * They live here rather than in ScrollToTop.tsx because that file is a client
 * component, and Next turns every export of a "use client" module into a client
 * reference — so a server page importing the object from there gets a proxy,
 * reads undefined off it, and silently falls back to the component's defaults.
 * A plain module has no such boundary and the values arrive intact.
 */
export type Skin = { bg: string; arrow: string };

/** Music App, Figma 6641:2544 — white, going blue under the cursor. */
export const MUSIC_APP_SKIN: { base: Skin; hover: Skin } = {
  base: { bg: "#ffffff", arrow: "#171716" },
  hover: { bg: "#2a60e0", arrow: "#ffffff" },
};

/**
 * Mentora, Figma 6779:25369 — the inverse: dark by default, white on hover.
 * It read the other way round at first (base white, hover #292621 with a white
 * arrow); to go back to that, swap the two lines below.
 */
export const MENTORA_SKIN: { base: Skin; hover: Skin } = {
  base: { bg: "#292621", arrow: "#ffffff" },
  hover: { bg: "#ffffff", arrow: "#171716" },
};
