/**
 * Converts px to rem
 *
 * @param px Desired px to convert to rem
 * @param basePx Calculation based on a root font-size (default 16px)
 */
export function pxToRem(px: number, basePx: number = 16) {
  return `${px / basePx}rem`;
}
