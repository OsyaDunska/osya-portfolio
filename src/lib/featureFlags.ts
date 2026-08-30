/**
 * What the site serves where. One constant per thing that is finished enough to
 * work on but not finished enough to publish.
 *
 * These split environments, not branches. The work stays on the same branch and
 * in the same history as everything else, and the only difference between the
 * machine it is written on and the machine it is served from is which of the
 * two renders each page picks.
 */

/**
 * The Music App case at /work/music-app.
 *
 * True while developing, false in a production build — so the real case is what
 * opens on localhost, and the deployed site answers with a placeholder saying
 * it is coming. Nothing is deleted, nothing is on another branch, and the home
 * page keeps its two Music App cards and keeps linking here; which of the two
 * pages that link opens is decided by this and nothing else.
 *
 * NODE_ENV is inlined at build time, so this costs nothing at runtime and the
 * unused half is dropped from the bundle it is not in.
 *
 * NEXT_PUBLIC_SHOW_MUSIC_APP_CASE overrides it either way, for showing the real
 * case from a deployed preview without a code change: set it to "true" to force
 * the case on, "false" to force the placeholder on locally.
 *
 * When the case is ready this becomes `true`, or the whole constant goes and
 * the guard in the page with it.
 */
const override = process.env.NEXT_PUBLIC_SHOW_MUSIC_APP_CASE;

export const SHOW_MUSIC_APP_CASE =
  override === "true" ? true : override === "false" ? false : process.env.NODE_ENV === "development";
