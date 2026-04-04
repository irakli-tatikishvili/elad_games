/**
 * Central helpers for game images under /public/images/.
 * Drop a .webp next to any .png with the same basename for smaller downloads.
 */

/** @param {string} pngUrl e.g. /images/english/match-the-word/cat.png */
export function imageSourcesFromPngUrl(pngUrl) {
  const trimmed = pngUrl.replace(/\.png$/i, '')
  return {
    png: `${trimmed}.png`,
    webp: `${trimmed}.webp`,
  }
}

/** Base path without extension, e.g. /images/hebrew/draw-the-letter/lion */
export function imageSourcesFromBase(basePath) {
  const b = basePath.replace(/\.(png|webp)$/i, '')
  return { png: `${b}.png`, webp: `${b}.webp` }
}
